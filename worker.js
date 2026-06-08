import {
  clearCookie,
  getAuthSuccessRedirect,
  getGoogleCallbackUrl,
  getSession,
  htmlResponse,
  jsonResponse,
  missingGoogleConfig,
  normalizeAuthReturnTo,
  parseAllowedUsers,
  parseCookies,
  randomToken,
  serializeCookie,
  sha256Base64url,
  signPayload,
  verifyPayload
} from "./functions/_shared/oauth.js";
import { getPermissions } from "./functions/_shared/permissions.js";

export default {
  async fetch(request, env) {
    const originalUrl = new URL(request.url);
    const assetUrl = new URL(request.url);

    if (originalUrl.pathname === "/auth/google/start" || originalUrl.pathname === "/auth/google/start/") {
      return handleGoogleStart(request, env);
    }

    if (originalUrl.pathname === "/auth/google/callback" || originalUrl.pathname === "/auth/google/callback/") {
      return handleGoogleCallback(request, env);
    }

    if (originalUrl.pathname === "/api/auth/me") {
      return handleAuthMe(request, env);
    }

    if (originalUrl.pathname === "/api/auth/permissions") {
      return handleAuthPermissions(request, env);
    }

    if (originalUrl.pathname === "/auth/logout") {
      return handleLogout(request);
    }

    if (assetUrl.pathname === "/" || assetUrl.pathname === "") {
      assetUrl.pathname = "/index.html";
    }

    if (assetUrl.pathname === "/mvp" || assetUrl.pathname === "/mvp/") {
      assetUrl.pathname = "/mvp.html";
    }

    if (assetUrl.pathname === "/instalar-app" || assetUrl.pathname === "/instalar-app/") {
      assetUrl.pathname = "/instalar-app.html";
    }

    if (assetUrl.pathname === "/ia-profissional" || assetUrl.pathname === "/ia-profissional/") {
      assetUrl.pathname = "/ia-profissional.html";
    }

    const assetRequest = new Request(assetUrl.toString(), request);
    const response = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(response.headers);

    if (assetUrl.pathname.endsWith(".css")) {
      headers.set("content-type", "text/css; charset=utf-8");
    } else if (assetUrl.pathname.endsWith(".js")) {
      headers.set("content-type", "application/javascript; charset=utf-8");
    } else if (assetUrl.pathname.endsWith(".svg")) {
      headers.set("content-type", "image/svg+xml");
    } else if (assetUrl.pathname.endsWith(".png")) {
      headers.set("content-type", "image/png");
    } else if (assetUrl.pathname.endsWith(".jpg") || assetUrl.pathname.endsWith(".jpeg")) {
      headers.set("content-type", "image/jpeg");
    } else if (assetUrl.pathname.endsWith(".webp")) {
      headers.set("content-type", "image/webp");
    } else if (assetUrl.pathname.endsWith(".ico")) {
      headers.set("content-type", "image/x-icon");
    } else if (assetUrl.pathname.endsWith(".html") || !originalUrl.pathname.includes(".")) {
      headers.set("content-type", "text/html; charset=utf-8");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};

async function handleGoogleStart(request, env) {
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

async function handleGoogleCallback(request, env) {
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

async function handleAuthMe(request, env) {
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  return jsonResponse({
    authenticated: true,
    provider: session.provider,
    profile: session.profile,
    emailHash: session.emailHash,
    expiresAt: new Date(session.expiresAt).toISOString()
  });
}

async function handleAuthPermissions(request, env) {
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  return jsonResponse({
    authenticated: true,
    profile: session.profile,
    permissions: getPermissions(session.profile)
  });
}

function handleLogout(request) {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { Allow: "POST" });
  }
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Set-Cookie": clearCookie("jus9_session")
    }
  });
}
