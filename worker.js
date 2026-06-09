import {
  GOOGLE_CALENDAR_EVENTS_SCOPE,
  createCalendarEvent,
  getCalendarStatus,
  listCalendarEvents,
  missingCalendarConfig,
  putCalendarGrant
} from "./functions/_shared/calendar.js";
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

    if (request.method === "OPTIONS" && isAuthCorsPath(originalUrl.pathname)) {
      return new Response(null, {
        status: 204,
        headers: getAuthCorsHeaders(request)
      });
    }

    if (originalUrl.pathname === "/auth/google/start" || originalUrl.pathname === "/auth/google/start/") {
      return handleGoogleStart(request, env);
    }

    if (originalUrl.pathname === "/auth/google/calendar/start" || originalUrl.pathname === "/auth/google/calendar/start/") {
      return handleGoogleCalendarStart(request, env);
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

    if (originalUrl.pathname === "/api/auth/context") {
      return handleAuthContext(request, env);
    }

    if (originalUrl.pathname === "/api/profile-requests") {
      return handleProfileRequests(request, env);
    }

    if (originalUrl.pathname === "/api/profile-requests/action") {
      return handleProfileRequestAction(request, env);
    }

    if (originalUrl.pathname === "/api/profile-requests/audit") {
      return handleProfileRequestAudit(request, env);
    }

    if (originalUrl.pathname === "/api/calendar/status") {
      return handleCalendarStatus(request, env);
    }

    if (originalUrl.pathname === "/api/calendar/events") {
      return handleCalendarEvents(request, env);
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

    if (assetUrl.pathname === "/chat-charlie" || assetUrl.pathname === "/chat-charlie/") {
      assetUrl.pathname = "/app-chat-charlie-echo.html";
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

async function handleGoogleCalendarStart(request, env) {
  const missing = [...missingGoogleConfig(env), ...missingCalendarConfig(env)];
  if (missing.length) {
    return jsonResponse({ ok: false, error: "calendar_configuracao_pendente", missing }, 501);
  }

  const session = await getSession(request, env);
  if (!session) return jsonResponse({ ok: false, error: "sessao_obrigatoria" }, 401);
  if (!hasPermission(session, "calendar:write")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "calendar:write" }, 403);
  }

  const state = randomToken();
  const verifier = randomToken(48);
  const challenge = await sha256Base64url(verifier);
  const nonce = randomToken();
  const returnTo = normalizeAuthReturnTo(new URL(request.url).searchParams.get("return_to")) || "/app-agenda.html";
  const tx = await signPayload(
    {
      kind: "google_calendar_oauth_tx",
      state,
      verifier,
      nonce,
      returnTo,
      sessionGoogleSubHash: session.googleSubHash,
      sessionEmailHash: session.emailHash,
      sessionProfile: session.profile,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 10 * 60 * 1000
    },
    env
  );
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: getGoogleCallbackUrl(env),
    response_type: "code",
    scope: `openid email profile ${GOOGLE_CALENDAR_EVENTS_SCOPE}`,
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
    access_type: "offline",
    include_granted_scopes: "true",
    prompt: "consent"
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
      "Cache-Control": "no-store, max-age=0",
      "Set-Cookie": serializeCookie("jus9_calendar_oauth_tx", tx, { maxAge: 600 })
    }
  });
}

async function handleGoogleCallback(request, env) {
  const missing = missingGoogleConfig(env);
  if (missing.length) {
    return jsonResponse({ ok: false, error: "oauth_configuracao_pendente", missing }, 501);
  }

  const url = new URL(request.url);
  const cookies = parseCookies(request);
  const calendarTx = await verifyPayload(cookies.jus9_calendar_oauth_tx, env);
  if (calendarTx?.kind === "google_calendar_oauth_tx" && calendarTx.state === url.searchParams.get("state")) {
    return handleGoogleCalendarCallback(request, env, url, calendarTx);
  }

  const tx = await verifyPayload(cookies.jus9_oauth_tx, env);
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

async function handleGoogleCalendarCallback(request, env, url, tx) {
  const missing = [...missingGoogleConfig(env), ...missingCalendarConfig(env)];
  if (missing.length) {
    return jsonResponse({ ok: false, error: "calendar_configuracao_pendente", missing }, 501);
  }
  if (url.searchParams.get("error")) {
    return jsonResponse({ ok: false, error: "google_calendar_recusado" }, 400);
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
      return jsonResponse({ ok: false, error: "falha_token_google_calendar" }, 502);
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
    const googleSubHash = await sha256Base64url(String(userInfo.sub || ""));
    const emailHash = await sha256Base64url(email);
    if (!email || userInfo.email_verified !== true || !profile || googleSubHash !== tx.sessionGoogleSubHash || emailHash !== tx.sessionEmailHash) {
      return jsonResponse({ ok: false, error: "agenda_conta_nao_confere" }, 403);
    }

    await putCalendarGrant(
      env,
      {
        provider: "google",
        profile: tx.sessionProfile,
        emailHash,
        googleSubHash
      },
      token,
      userInfo
    );

    const headers = new Headers({
      Location: getAuthSuccessRedirect(env, normalizeAuthReturnTo(tx.returnTo)),
      "Cache-Control": "no-store, max-age=0"
    });
    headers.append("Set-Cookie", clearCookie("jus9_calendar_oauth_tx"));
    return new Response(null, { status: 302, headers });
  } catch (error) {
    console.error("auth.google.calendar.callback", { message: error.message });
    return jsonResponse({ ok: false, error: "falha_oauth_google_calendar" }, 502);
  }
}

async function handleAuthMe(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  return jsonResponse({
    authenticated: true,
    provider: session.provider,
    profile: session.profile,
    emailHash: session.emailHash,
    expiresAt: new Date(session.expiresAt).toISOString()
  }, 200, corsHeaders);
}

async function handleAuthPermissions(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  return jsonResponse({
    authenticated: true,
    profile: session.profile,
    permissions: getPermissions(session.profile)
  }, 200, corsHeaders);
}

async function handleAuthContext(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);

  const url = new URL(request.url);
  const email = await emailForSession(env, session);
  const moduleCode = normalizeModuleCode(url.searchParams.get("module"));
  const originHint = normalizeOriginHint(url.searchParams.get("origin") || request.headers.get("origin") || request.headers.get("referer") || "");
  const profile = profileContext(session.profile);
  const identity = {
    profile,
    permissions: getPermissions(session.profile),
    origin: originContext(originHint),
    module: moduleContext(moduleCode),
    user: userContext(email, session.profile)
  };

  return jsonResponse({
    authenticated: true,
    provider: session.provider,
    profile: session.profile,
    emailHash: session.emailHash,
    expiresAt: new Date(session.expiresAt).toISOString(),
    identity
  }, 200, corsHeaders);
}

async function handleProfileRequests(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!env.JUS9_PROFILE_REQUESTS) {
    return jsonResponse({ ok: false, error: "profile_requests_configuracao_pendente" }, 501, corsHeaders);
  }

  if (request.method === "POST") {
    if (!hasPermission(session, "auth:read")) {
      return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "auth:read" }, 403, corsHeaders);
    }
    const result = await saveProfileRequest(env, session, request, await request.json().catch(() => null));
    return jsonResponse(result.payload, result.status, corsHeaders);
  }

  if (request.method === "GET") {
    if (!hasPermission(session, "audit:write")) {
      return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "audit:write" }, 403, corsHeaders);
    }
    const result = await listProfileRequests(env);
    return jsonResponse(result.payload, result.status, corsHeaders);
  }

  return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET, POST" });
}

async function handleProfileRequestAction(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!env.JUS9_PROFILE_REQUESTS) {
    return jsonResponse({ ok: false, error: "profile_requests_configuracao_pendente" }, 501, corsHeaders);
  }
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "POST" });
  }
  if (!hasPermission(session, "audit:write")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "audit:write" }, 403, corsHeaders);
  }
  const result = await updateProfileRequestStatus(env, session, request, await request.json().catch(() => null));
  return jsonResponse(result.payload, result.status, corsHeaders);
}

async function handleProfileRequestAudit(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!env.JUS9_PROFILE_REQUESTS) {
    return jsonResponse({ ok: false, error: "profile_requests_configuracao_pendente" }, 501, corsHeaders);
  }
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  if (!hasPermission(session, "audit:write")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "audit:write" }, 403, corsHeaders);
  }
  const items = await env.JUS9_PROFILE_REQUESTS.get("profile-requests:audit", "json").catch(() => null);
  return jsonResponse({ ok: true, items: Array.isArray(items) ? items : [] }, 200, corsHeaders);
}

async function handleCalendarStatus(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!hasPermission(session, "calendar:read")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "calendar:read" }, 403, corsHeaders);
  }
  return jsonResponse({
    authenticated: true,
    profile: session.profile,
    calendar: await getCalendarStatus(env, session)
  }, 200, corsHeaders);
}

async function handleCalendarEvents(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);

  if (request.method === "GET") {
    if (!hasPermission(session, "calendar:read")) {
      return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "calendar:read" }, 403, corsHeaders);
    }
    const result = await listCalendarEvents(env, session);
    return jsonResponse(result.payload, result.status, corsHeaders);
  }

  if (request.method === "POST") {
    if (!hasPermission(session, "calendar:write")) {
      return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "calendar:write" }, 403, corsHeaders);
    }
    const result = await createCalendarEvent(env, session, await request.json().catch(() => null));
    return jsonResponse(result.payload, result.status, corsHeaders);
  }

  return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET, POST" });
}

function handleLogout(request) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "POST" });
  }
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Set-Cookie": clearCookie("jus9_session"),
      ...corsHeaders
    }
  });
}

function isAuthCorsPath(pathname) {
  return pathname === "/api/auth/me" ||
    pathname === "/api/auth/permissions" ||
    pathname === "/api/auth/context" ||
    pathname === "/api/profile-requests" ||
    pathname === "/api/profile-requests/action" ||
    pathname === "/api/profile-requests/audit" ||
    pathname === "/api/calendar/status" ||
    pathname === "/api/calendar/events" ||
    pathname === "/auth/logout";
}

function getAuthCorsHeaders(request) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigins = new Set([
    "https://jus9tecnologia.com.br",
    "https://www.jus9tecnologia.com.br",
    "https://equipe.jus9tecnologia.com.br",
    "https://laboratorio.jus9tecnologia.com.br",
    "https://universidadedofuturo.jus9tecnologia.com.br"
  ]);
  if (!allowedOrigins.has(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function hasPermission(session, permission) {
  return getPermissions(session?.profile).includes(permission);
}

async function saveProfileRequest(env, session, request, payload) {
  if (!payload || typeof payload !== "object") {
    return { status: 400, payload: { ok: false, error: "payload_invalido" } };
  }
  const scope = sanitizeToken(payload.scope, 32) || "equipe";
  const name = sanitizeText(payload.name, 120);
  const email = sanitizeEmail(payload.email);
  const profile = sanitizeText(payload.profile, 80);
  const module = sanitizeText(payload.module, 80);
  const notes = sanitizeText(payload.notes, 900);
  const imagePolicy = sanitizeText(payload.imagePolicy, 80) || "sem_imagem";
  if (!name || !email || !profile) {
    return { status: 400, payload: { ok: false, error: "campos_obrigatorios", required: ["name", "email", "profile"] } };
  }

  const now = new Date().toISOString();
  const id = `profile-request-${Date.now()}-${randomToken(8)}`;
  const requesterEmail = await emailForSession(env, session);
  const origin = normalizeOriginHint(request.headers.get("origin") || request.headers.get("referer") || "");
  const record = {
    id,
    status: "pendente_revisao_humana",
    classification: "INTERNO",
    scope,
    name,
    email,
    profile,
    module,
    notes,
    imagePolicy,
    requester: {
      email: requesterEmail,
      profile: session.profile,
      emailHash: session.emailHash
    },
    origin,
    createdAt: now,
    updatedAt: now
  };
  await env.JUS9_PROFILE_REQUESTS.put(id, JSON.stringify(record));
  await appendProfileRequestIndex(env, {
    id,
    status: record.status,
    scope,
    name,
    email,
    profile,
    module,
    origin,
    requesterProfile: session.profile,
    createdAt: now
  });
  return {
    status: 201,
    payload: {
      ok: true,
      id,
      status: record.status,
      classification: record.classification,
      message: "Solicitacao de perfil registrada para revisao humana."
    }
  };
}

async function appendProfileRequestIndex(env, item) {
  const key = "profile-requests:index";
  const current = await env.JUS9_PROFILE_REQUESTS.get(key, "json").catch(() => null);
  const items = Array.isArray(current) ? current : [];
  items.unshift(item);
  await env.JUS9_PROFILE_REQUESTS.put(key, JSON.stringify(items.slice(0, 200)));
}

async function listProfileRequests(env) {
  const items = await env.JUS9_PROFILE_REQUESTS.get("profile-requests:index", "json").catch(() => null);
  return { status: 200, payload: { ok: true, items: Array.isArray(items) ? items : [] } };
}

async function updateProfileRequestStatus(env, session, request, payload) {
  if (!payload || typeof payload !== "object") {
    return { status: 400, payload: { ok: false, error: "payload_invalido" } };
  }
  const id = sanitizeText(payload.id, 120);
  const action = sanitizeToken(payload.action, 32);
  const notes = sanitizeText(payload.notes, 500);
  const statusByAction = {
    aprovar: "aprovada_revisao_humana",
    reprovar: "reprovada_revisao_humana",
    pendente: "pendente_revisao_humana"
  };
  const nextStatus = statusByAction[action];
  if (!id || !nextStatus) {
    return { status: 400, payload: { ok: false, error: "acao_invalida", allowed: Object.keys(statusByAction) } };
  }

  const record = await env.JUS9_PROFILE_REQUESTS.get(id, "json").catch(() => null);
  if (!record || record.id !== id) {
    return { status: 404, payload: { ok: false, error: "solicitacao_nao_encontrada" } };
  }

  const now = new Date().toISOString();
  const reviewerEmail = await emailForSession(env, session);
  const auditItem = {
    at: now,
    action,
    status: nextStatus,
    notes,
    reviewer: {
      email: reviewerEmail,
      profile: session.profile,
      emailHash: session.emailHash
    },
    origin: normalizeOriginHint(request.headers.get("origin") || request.headers.get("referer") || "")
  };
  const updated = {
    ...record,
    status: nextStatus,
    reviewNotes: notes,
    reviewedAt: now,
    reviewedByProfile: session.profile,
    updatedAt: now,
    audit: Array.isArray(record.audit) ? [...record.audit, auditItem].slice(-30) : [auditItem]
  };
  await env.JUS9_PROFILE_REQUESTS.put(id, JSON.stringify(updated));
  await updateProfileRequestIndexItem(env, id, {
    status: nextStatus,
    reviewNotes: notes,
    reviewedAt: now,
    reviewedByProfile: session.profile
  });
  await appendProfileRequestAudit(env, { id, name: record.name, email: record.email, ...auditItem });
  return {
    status: 200,
    payload: {
      ok: true,
      id,
      status: nextStatus,
      message: "Solicitacao atualizada com trilha de auditoria."
    }
  };
}

async function updateProfileRequestIndexItem(env, id, patch) {
  const key = "profile-requests:index";
  const current = await env.JUS9_PROFILE_REQUESTS.get(key, "json").catch(() => null);
  const items = Array.isArray(current) ? current : [];
  const updated = items.map((item) => item.id === id ? { ...item, ...patch } : item);
  await env.JUS9_PROFILE_REQUESTS.put(key, JSON.stringify(updated.slice(0, 200)));
}

async function appendProfileRequestAudit(env, item) {
  const key = "profile-requests:audit";
  const current = await env.JUS9_PROFILE_REQUESTS.get(key, "json").catch(() => null);
  const items = Array.isArray(current) ? current : [];
  items.unshift(item);
  await env.JUS9_PROFILE_REQUESTS.put(key, JSON.stringify(items.slice(0, 300)));
}

function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeToken(value, maxLength) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, maxLength);
}

function sanitizeEmail(value) {
  const email = String(value || "").trim().toLowerCase().slice(0, 180);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email;
}

async function emailForSession(env, session) {
  const allowedUsers = parseAllowedUsers(env);
  for (const email of allowedUsers.keys()) {
    const emailHash = await sha256Base64url(email);
    if (emailHash === session.emailHash) return email;
  }
  return "";
}

function normalizeOriginHint(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    return new URL(text).hostname.toLowerCase();
  } catch (_) {
    return text.replace(/^https?:\/\//i, "").split("/")[0].toLowerCase();
  }
}

function normalizeModuleCode(value) {
  const code = String(value || "").toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  return code.slice(0, 32);
}

function profileContext(profile) {
  const profiles = {
    admin_sistema: ["Administrador do sistema", "governanca, auditoria, agenda, documentos e revisao operacional"],
    advogado_lider: ["Advogado lider", "direcao juridica, revisao humana e validacao de uso real"],
    advogado: ["Advogado", "analise juridica, DAJ, documentos, processos e agenda"],
    assessor_chefe: ["Assessor chefe", "coordenacao de apoio, documentos e auditoria"],
    assessor: ["Assessor", "apoio juridico, documentos e processos"],
    secretaria: ["Secretaria", "organizacao, documentos e agenda"],
    estagio: ["Estagio", "apoio supervisionado e estudo"],
    academia: ["Academia", "ensino, pesquisa e universidade"],
    estudante: ["Estudante", "trilha de estudo e aprendizagem"],
    cidadao: ["Cidadao", "orientacao publica demonstrativa"],
    perito: ["Perito", "apoio tecnico e documentos"],
    parceiro: ["Parceiro", "parcerias, demonstracao e relacionamento"],
    escritorio: ["Escritorio juridico", "fluxo de equipe, documentos e processos"],
    empresa: ["Empresa", "juridico interno, documentos e compliance"],
    orgao_publico: ["Orgao publico", "fluxo institucional e processo administrativo demonstrativo"],
    magistrado: ["Magistrado", "apoio demonstrativo de gabinete"],
    ministerio_publico: ["Ministerio Publico", "apoio demonstrativo institucional"],
    autoridade_policial: ["Autoridade policial", "apoio demonstrativo de fluxo policial"]
  };
  const item = profiles[profile] || ["Perfil governado", "uso demonstrativo com limite humano"];
  return { id: profile || "nao_informado", label: item[0], scope: item[1] };
}

function originContext(hostname) {
  const origins = {
    "jus9tecnologia.com.br": ["Portal principal", "MVPs, IA Profissional, agenda e cartorio demonstrativo"],
    "www.jus9tecnologia.com.br": ["Portal principal", "MVPs, IA Profissional, agenda e cartorio demonstrativo"],
    "equipe.jus9tecnologia.com.br": ["Equipe Jus 9", "perfis, familia virtual, equipe humana e cadastros internos"],
    "laboratorio.jus9tecnologia.com.br": ["Laboratorio Jus 9", "experimentos, prototipos e validacao tecnica"],
    "universidadedofuturo.jus9tecnologia.com.br": ["Universidade do Futuro", "aprendizagem, liberdade criativa de IAs e chats de estudo"]
  };
  const item = origins[hostname] || ["Ambiente Jus 9", "contexto nao classificado; manter cautela"];
  return { host: hostname || "", label: item[0], scope: item[1] };
}

function moduleContext(code) {
  const modules = {
    DAJ: ["Advogar / DAJ", "atendimento juridico demonstrativo, triagem, documentos e pesquisa juridica"],
    DAA: ["Professor / Academia", "aulas, orientacao academica e materiais"],
    DEJ: ["Estudante", "estudo juridico, trilhas e revisao"],
    DIC: ["Cidadao", "orientacao publica e encaminhamento seguro"],
    DPJ: ["Perito Judicial", "quesitos, diligencias, laudos e cadeia tecnica"],
    DIP: ["Investidor / Parceiro", "parcerias, pitch, due diligence e follow-up"],
    DEE: ["Escritorio Juridico", "equipe, clientes ficticios, tarefas e fluxos"],
    DEJI: ["Empresa / Juridico Interno", "compliance, contratos e riscos"],
    DOI: ["Orgao Publico", "setores, memorandos e processos administrativos ficticios"],
    DGE: ["Administrador Jus 9", "governanca, auditoria, versionamento e seguranca"],
    DMG: ["Magistrado", "gabinete demonstrativo, filas e minutas estruturais"],
    DMP: ["Ministerio Publico", "apoio demonstrativo institucional"],
    DAP: ["Autoridade Policial", "fluxos ficticios e cautela maxima"]
  };
  const item = modules[code] || ["Modulo Jus 9", "ambiente generico; diferenciar pelo pedido e pela pagina"];
  return { code: code || "", label: item[0], scope: item[1] };
}

function userContext(email, profile) {
  const known = {
    "clovis@jus9tecnologia.com.br": ["Clovis Mariano da Costa", "fundador_humano", true],
    "charlieecho@jus9tecnologia.com.br": ["Charlie Echo da Costa", "familia_virtual", false],
    "charliejuris@jus9tecnologia.com.br": ["Charlie Juris da Costa", "familia_virtual", false],
    "charliedelta@jus9tecnologia.com.br": ["Charlie Delta da Costa", "familia_virtual", false],
    "charliefox@jus9tecnologia.com.br": ["Charlie Fox da Costa", "familia_virtual", false]
  };
  const lower = String(email || "").toLowerCase();
  const item = known[lower];
  const domain = lower.includes("@") ? lower.split("@").pop() : "";
  return {
    email: lower || "",
    domain,
    label: item ? item[0] : "",
    family: item ? item[1] : (domain === "jus9tecnologia.com.br" ? "equipe_jus9" : ""),
    founder: item ? item[2] : profile === "admin_sistema",
    teamEmailPattern: domain === "jus9tecnologia.com.br"
  };
}
