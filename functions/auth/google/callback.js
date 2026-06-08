import {
  clearCookie,
  getAuthSuccessRedirect,
  getGoogleCallbackUrl,
  jsonResponse,
  missingGoogleConfig,
  normalizeAuthReturnTo,
  parseAllowedUsers,
  parseCookies,
  serializeCookie,
  sha256Base64url,
  signPayload,
  verifyPayload
} from "../../_shared/oauth.js";

export async function onRequestGet({ request, env }) {
  const missing = missingGoogleConfig(env);
  if (missing.length) {
    return jsonResponse({ ok: false, error: "oauth_configuracao_pendente", missing }, 501);
  }

  const url = new URL(request.url);
  const tx = await verifyPayload(parseCookies(request).jus9_oauth_tx, env);
  if (!tx || tx.kind !== "google_oauth_tx" || tx.state !== url.searchParams.get("state")) {
    return jsonResponse({ ok: false, error: "oauth_state_invalido" }, 400);
  }
  if (url.searchParams.get("error")) {
    return jsonResponse({ ok: false, error: "google_oauth_recusado" }, 400);
  }
  const code = url.searchParams.get("code");
  if (!code) {
    return jsonResponse({ ok: false, error: "codigo_oauth_ausente" }, 400);
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: getGoogleCallbackUrl(env),
        grant_type: "authorization_code",
        code_verifier: tx.verifier
      })
    });
    if (!tokenResponse.ok) {
      return jsonResponse({ ok: false, error: "falha_token_google" }, 502);
    }

    const token = await tokenResponse.json();
    const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${token.access_token}` }
    });
    if (!userInfoResponse.ok) {
      return jsonResponse({ ok: false, error: "falha_perfil_google" }, 502);
    }

    const userInfo = await userInfoResponse.json();
    const email = String(userInfo.email || "").toLowerCase();
    const allowedUsers = parseAllowedUsers(env);
    const profile = allowedUsers.get(email);
    if (!email || userInfo.email_verified !== true || !profile) {
      return jsonResponse({ ok: false, error: "email_nao_autorizado" }, 403);
    }

    const emailHash = await sha256Base64url(email);
    const session = await signPayload(
      {
        kind: "jus9_session",
        provider: "google",
        emailHash,
        googleSubHash: await sha256Base64url(String(userInfo.sub || "")),
        profile,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 8 * 60 * 60 * 1000
      },
      env
    );
    console.info("auth.login", { provider: "google", profile, emailHash });

    const headers = new Headers({
      Location: getAuthSuccessRedirect(env, normalizeAuthReturnTo(tx.returnTo)),
      "Cache-Control": "no-store, max-age=0"
    });
    headers.append("Set-Cookie", clearCookie("jus9_oauth_tx"));
    headers.append("Set-Cookie", serializeCookie("jus9_session", session, { maxAge: 8 * 60 * 60 }));

    return new Response(null, {
      status: 302,
      headers
    });
  } catch (error) {
    console.error("auth.google.callback", { message: error.message });
    return jsonResponse({ ok: false, error: "falha_oauth_google" }, 502);
  }
}
