import {
  getGoogleCallbackUrl,
  htmlResponse,
  missingGoogleConfig,
  normalizeAuthReturnTo,
  randomToken,
  serializeCookie,
  sha256Base64url,
  signPayload
} from "../../_shared/oauth.js";

export async function onRequestGet({ request, env }) {
  const missing = missingGoogleConfig(env);
  if (missing.length) {
    return htmlResponse(`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Login Google em preparacao</title></head>
<body><h1>Login Google preparado com seguranca.</h1>
<p>Configure as variaveis de ambiente do backend antes de ativar o OAuth real.</p>
<p>Variaveis pendentes: <code>${missing.join(", ")}</code>.</p>
<p>Nenhum segredo deve ser publicado no GitHub.</p></body></html>`, 501);
  }

  const state = randomToken();
  const verifier = randomToken(48);
  const challenge = await sha256Base64url(verifier);
  const nonce = randomToken();
  const returnTo = normalizeAuthReturnTo(new URL(request.url).searchParams.get("return_to"));
  const tx = await signPayload(
    {
      kind: "google_oauth_tx",
      state,
      verifier,
      nonce,
      returnTo,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000
    },
    env
  );
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: getGoogleCallbackUrl(env),
    response_type: "code",
    scope: "openid email profile",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    prompt: "select_account"
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      "Cache-Control": "no-store, max-age=0",
      "Set-Cookie": serializeCookie("jus9_oauth_tx", tx, { maxAge: 600 })
    }
  });
}
