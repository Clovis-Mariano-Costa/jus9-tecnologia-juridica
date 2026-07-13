import {
  GOOGLE_CALENDAR_EVENTS_SCOPE,
  createCalendarEvent,
  getCalendarStatus,
  isCalendarOAuthEnabled,
  listCalendarEvents,
  missingCalendarConfig,
  putCalendarGrant
} from "./functions/_shared/calendar.js";
import {
  clearCookie,
  getAuthNucleusFromReturnTo,
  getAuthSuccessRedirect,
  getGoogleCallbackUrl,
  getSession,
  htmlResponse,
  isKnownAuthProfile,
  jsonResponse,
  missingGoogleConfig,
  normalizeAuthReturnTo,
  parseAllowedUsers,
  parseCookies,
  randomToken,
  resolveGoogleAuthProfile,
  serializeCookie,
  sha256Base64url,
  signPayload,
  verifyPayload
} from "./functions/_shared/oauth.js";
import { getPermissions } from "./functions/_shared/permissions.js";
import {
  deleteUserMemoryRecord,
  readUserMemoryRecord,
  saveUserMemoryRecord
} from "./functions/_shared/user-memory.js";
import {
  publicDataJudStatus,
  searchDataJud
} from "./functions/_shared/datajud.js";

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

    if (originalUrl.pathname === "/api/governed-profiles") {
      return handleGovernedProfiles(request, env);
    }

    if (originalUrl.pathname === "/api/charlie/memory") {
      return handleCharlieMemory(request, env);
    }

    if (originalUrl.pathname === "/api/attachments/extract") {
      return handleAttachmentExtract(request, env);
    }

    if (originalUrl.pathname === "/api/calendar/status") {
      return handleCalendarStatus(request, env);
    }

    if (originalUrl.pathname === "/api/calendar/events") {
      return handleCalendarEvents(request, env);
    }

    if (originalUrl.pathname === "/api/tribunais/datajud/status") {
      return handleDataJudStatus(request, env);
    }

    if (originalUrl.pathname === "/api/tribunais/datajud/search") {
      return handleDataJudSearch(request, env);
    }

    if (originalUrl.pathname === "/api/daj-process-links/readiness") {
      return handleDajProcessLinksReadiness(request, env);
    }

    if (originalUrl.pathname === "/api/daj-process-links") {
      return handleDajProcessLinks(request, env);
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

    if (assetUrl.pathname === "/livro-vivo" || assetUrl.pathname === "/livro-vivo/") {
      assetUrl.pathname = "/livro-vivo.html";
    }

    if (assetUrl.pathname === "/portal-transparencia" || assetUrl.pathname === "/portal-transparencia/") {
      assetUrl.pathname = "/portal-transparencia.html";
    }

    if (assetUrl.pathname === "/cadastro-governado" || assetUrl.pathname === "/cadastro-governado/") {
      assetUrl.pathname = "/cadastro-governado.html";
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
  if (!isCalendarOAuthEnabled(env)) {
    return jsonResponse({ ok: false, error: "calendar_oauth_nao_ativado" }, 403);
  }

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
      sessionAccessMode: session.accessMode || "legacy",
      sessionAuthNucleus: session.authNucleus || "principal",
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
    const resolvedProfile = resolveGoogleAuthProfile(email, env);
    if (!email || userInfo.email_verified !== true || !resolvedProfile) {
      return jsonResponse({ ok: false, error: "email_nao_autorizado" }, 403);
    }

    const emailHash = await sha256Base64url(email);
    const authNucleus = getAuthNucleusFromReturnTo(tx.returnTo);
    const session = await signPayload(
      {
        kind: "jus9_session",
        provider: "google",
        emailHash,
        googleSubHash: await sha256Base64url(String(userInfo.sub || "")),
        profile: resolvedProfile.profile,
        accessMode: resolvedProfile.accessMode,
        authNucleus,
        issuedAt: Date.now(),
        expiresAt: Date.now() + 8 * 60 * 60 * 1000
      },
      env
    );
    console.info("auth.login", {
      provider: "google",
      profile: resolvedProfile.profile,
      accessMode: resolvedProfile.accessMode,
      authNucleus,
      emailHash
    });

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
    const googleSubHash = await sha256Base64url(String(userInfo.sub || ""));
    const emailHash = await sha256Base64url(email);
    const sessionProfile = String(tx.sessionProfile || "");
    if (
      !email ||
      userInfo.email_verified !== true ||
      !isKnownAuthProfile(sessionProfile) ||
      googleSubHash !== tx.sessionGoogleSubHash ||
      emailHash !== tx.sessionEmailHash
    ) {
      return jsonResponse({ ok: false, error: "agenda_conta_nao_confere" }, 403);
    }

    await putCalendarGrant(
      env,
      {
        provider: "google",
        profile: sessionProfile,
        accessMode: tx.sessionAccessMode || "legacy",
        authNucleus: tx.sessionAuthNucleus || "agenda",
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
    accessMode: session.accessMode || "legacy",
    authNucleus: session.authNucleus || "principal",
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
    accessMode: session.accessMode || "legacy",
    authNucleus: session.authNucleus || "principal",
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
  const governedProfile = await governedProfileForEmail(env, email);
  const moduleCode = normalizeModuleCode(url.searchParams.get("module"));
  const originHint = normalizeOriginHint(url.searchParams.get("origin") || request.headers.get("origin") || request.headers.get("referer") || "");
  const profile = profileContext(session.profile);
  const identity = {
    profile,
    permissions: getPermissions(session.profile),
    origin: originContext(originHint),
    module: moduleContext(moduleCode),
    user: userContext(email, session.profile, governedProfile)
  };

  return jsonResponse({
    authenticated: true,
    provider: session.provider,
    profile: session.profile,
    accessMode: session.accessMode || "legacy",
    authNucleus: session.authNucleus || "principal",
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

async function handleGovernedProfiles(request, env) {
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
  const items = await listGovernedProfiles(env);
  return jsonResponse({ ok: true, items }, 200, corsHeaders);
}

async function handleCharlieMemory(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!hasPermission(session, "auth:read")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "auth:read" }, 403, corsHeaders);
  }

  if (request.method === "GET") {
    const result = await readUserMemoryRecord(env, session);
    return jsonResponse({ authenticated: true, profile: session.profile, ...result.payload }, result.status, corsHeaders);
  }

  if (request.method === "POST") {
    const result = await saveUserMemoryRecord(env, session, request, await request.json().catch(() => null));
    return jsonResponse({ authenticated: true, profile: session.profile, ...result.payload }, result.status, corsHeaders);
  }

  if (request.method === "DELETE") {
    const result = await deleteUserMemoryRecord(env, session);
    return jsonResponse({ authenticated: true, profile: session.profile, ...result.payload }, result.status, corsHeaders);
  }

  return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET, POST, DELETE" });
}

async function handleAttachmentExtract(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "POST" });
  }
  const contentType = String(request.headers.get("content-type") || "").toLowerCase();
  if (!contentType.includes("multipart/form-data")) {
    return jsonResponse({ ok: false, error: "multipart_obrigatorio" }, 400, corsHeaders);
  }

  const session = await getSession(request, env).catch(() => null);
  if (session && !hasPermission(session, "auth:read")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "auth:read" }, 403, corsHeaders);
  }

  const form = await request.formData().catch(() => null);
  if (!form) return jsonResponse({ ok: false, error: "formulario_invalido" }, 400, corsHeaders);

  const maxChars = clampNumber(form.get("limit"), 1000, ATTACHMENT_MAX_EXTRACTED_CHARS, ATTACHMENT_MAX_EXTRACTED_CHARS);
  const moduleCode = normalizeModuleCode(form.get("module"));
  const files = form.getAll("file").filter((item) => item && typeof item.arrayBuffer === "function").slice(0, ATTACHMENT_MAX_FILES);
  if (!files.length) {
    return jsonResponse({ ok: false, error: "arquivo_obrigatorio" }, 400, corsHeaders);
  }

  let remaining = maxChars;
  const extracted = [];
  for (const file of files) {
    const result = await extractGovernedAttachment(file, remaining);
    remaining = Math.max(0, remaining - String(result.text || "").length);
    extracted.push(result);
  }

  return jsonResponse({
    ok: true,
    authenticated: Boolean(session),
    profile: session?.profile || "anonimo_demo",
    module: moduleCode,
    classification: "UPLOAD_TEMPORARIO_GOVERNADO",
    storage: "nao_salvo",
    retention: "somente_resposta_atual",
    policy: "Use apenas texto extraido. Nao afirme conteudo de arquivo sem texto extraido. PDF escaneado, imagem e DOC antigo exigem OCR/conversao.",
    files: extracted
  }, 200, corsHeaders);
}

async function handleCalendarStatus(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!isCalendarOAuthEnabled(env)) {
    return jsonResponse({
      authenticated: true,
      profile: session.profile,
      calendar: {
        enabled: false,
        connected: false,
        reason: "calendar_oauth_nao_ativado"
      }
    }, 200, corsHeaders);
  }
  if (!hasPermission(session, "calendar:read")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "calendar:read" }, 403, corsHeaders);
  }
  return jsonResponse({
    authenticated: true,
    profile: session.profile,
    calendar: {
      enabled: true,
      ...(await getCalendarStatus(env, session))
    }
  }, 200, corsHeaders);
}

async function handleCalendarEvents(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!isCalendarOAuthEnabled(env)) {
    return jsonResponse({ ok: false, error: "calendar_oauth_nao_ativado" }, 403, corsHeaders);
  }

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

async function handleDataJudStatus(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  return jsonResponse({
    ok: true,
    gateway: "tribunais-datajud",
    ...publicDataJudStatus(env),
  }, 200, corsHeaders);
}

async function handleDataJudSearch(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "POST" });
  }
  const expectedToken = String(env.JUS9_TRIBUNAIS_GATEWAY_TOKEN || "").trim();
  if (!expectedToken) {
    return jsonResponse({
      ok: false,
      error: "gateway_tribunais_token_pendente",
      missing: ["JUS9_TRIBUNAIS_GATEWAY_TOKEN"],
    }, 501, corsHeaders);
  }
  const providedToken = String(request.headers.get("x-jus9-internal-token") || "").trim();
  if (providedToken !== expectedToken) {
    return jsonResponse({ ok: false, error: "gateway_tribunais_nao_autorizado" }, 401, corsHeaders);
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return jsonResponse({ ok: false, error: "json_obrigatorio" }, 400, corsHeaders);
  }
  const result = await searchDataJud(env, body);
  return jsonResponse(result.payload, result.status, corsHeaders);
}

async function handleDajProcessLinksReadiness(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  if (request.method !== "GET") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET" });
  }
  return jsonResponse({
    ok: true,
    service: "daj-process-links",
    storage: "JUS9_DAJ_PROCESS_LINKS",
    configured: Boolean(env.JUS9_DAJ_PROCESS_LINKS),
    authRequired: true,
    rules: [
      "cada DAJ corresponde a um unico processo",
      "nome e CPF podem reunir varios DAJs",
      "CPF integral nao deve ser persistido",
      "alteracao exige perfil com dajs:write e processes:read"
    ]
  }, 200, corsHeaders);
}

async function handleDajProcessLinks(request, env) {
  const corsHeaders = getAuthCorsHeaders(request);
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401, corsHeaders);
  if (!hasPermission(session, "dajs:read") && !hasPermission(session, "processes:read")) {
    return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "dajs:read|processes:read" }, 403, corsHeaders);
  }
  if (!env.JUS9_DAJ_PROCESS_LINKS) {
    return jsonResponse({
      ok: false,
      error: "daj_process_links_configuracao_pendente",
      missing: ["JUS9_DAJ_PROCESS_LINKS"],
      fallback: "usar indice local demonstrativo ate provisionar KV proprio"
    }, 501, corsHeaders);
  }

  if (request.method === "GET") {
    const result = await listDajProcessLinks(env, new URL(request.url));
    return jsonResponse({ authenticated: true, profile: session.profile, ...result.payload }, result.status, corsHeaders);
  }

  if (request.method === "POST") {
    if (!hasPermission(session, "dajs:write") || !hasPermission(session, "processes:read")) {
      return jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "dajs:write+processes:read" }, 403, corsHeaders);
    }
    const result = await saveDajProcessLink(env, session, request, await request.json().catch(() => null));
    return jsonResponse({ authenticated: true, profile: session.profile, ...result.payload }, result.status, corsHeaders);
  }

  return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET, POST" });
}

function handleLogout(request) {
  const corsHeaders = getAuthCorsHeaders(request);
  const url = new URL(request.url);
  if (request.method === "GET") {
    return logoutPage(url.searchParams.get("done") === "1");
  }
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "metodo_nao_permitido" }, 405, { ...corsHeaders, Allow: "GET, POST" });
  }
  if (url.searchParams.get("redirect") === "1") {
    return new Response(null, {
      status: 303,
      headers: {
        Location: "/auth/logout?done=1",
        "Cache-Control": "no-store, max-age=0",
        "Set-Cookie": clearCookie("jus9_session"),
        ...corsHeaders
      }
    });
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

function logoutPage(done = false) {
  return htmlResponse(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${done ? "Sessao encerrada" : "Sair da Jus 9"}</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;background:#f7f8fb;color:#172033}
    main{max-width:560px;margin:12vh auto;padding:32px;background:#fff;border:1px solid #d9deea;border-radius:8px}
    h1{font-size:28px;margin:0 0 12px}
    p{line-height:1.5;color:#45536a}
    button,a{display:inline-block;margin-top:12px;padding:10px 14px;border-radius:6px;border:1px solid #1f5eff;background:#1f5eff;color:#fff;text-decoration:none;font-weight:700;cursor:pointer}
    a.secondary{background:#fff;color:#1f5eff}
  </style>
</head>
<body>
  <main>
    <h1>${done ? "Sessao encerrada" : "Sair da Jus 9"}</h1>
    <p>${done ? "Sua sessao local foi encerrada neste navegador." : "Clique no botao abaixo para encerrar sua sessao Google local na Jus 9."}</p>
    ${done ? '<a href="/api/auth/me" class="secondary">Verificar sessao</a> <a href="/mvp.html">Voltar ao MVP</a>' : '<form method="post" action="/auth/logout?redirect=1"><button type="submit">Sair com seguranca</button></form>'}
  </main>
</body>
</html>`);
}

function isAuthCorsPath(pathname) {
  return pathname === "/api/auth/me" ||
    pathname === "/api/auth/permissions" ||
    pathname === "/api/auth/context" ||
    pathname === "/api/profile-requests" ||
    pathname === "/api/profile-requests/action" ||
    pathname === "/api/profile-requests/audit" ||
    pathname === "/api/governed-profiles" ||
    pathname === "/api/charlie/memory" ||
    pathname === "/api/attachments/extract" ||
    pathname === "/api/calendar/status" ||
    pathname === "/api/calendar/events" ||
    pathname === "/api/tribunais/datajud/status" ||
    pathname === "/api/tribunais/datajud/search" ||
    pathname === "/api/daj-process-links/readiness" ||
    pathname === "/api/daj-process-links" ||
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
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Jus9-Internal-Token",
    "Vary": "Origin"
  };
}

function hasPermission(session, permission) {
  return getPermissions(session?.profile).includes(permission);
}

const ATTACHMENT_MAX_FILES = 3;
const ATTACHMENT_MAX_BYTES = 2 * 1024 * 1024;
const ATTACHMENT_MAX_EXTRACTED_CHARS = 24000;

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(number)));
}

async function extractGovernedAttachment(file, remainingChars) {
  const base = {
    name: sanitizeFilename(file.name || "arquivo"),
    type: sanitizeText(file.type || "tipo nao informado", 120),
    size: Number(file.size || 0),
    readable: false,
    truncated: false,
    text: "",
    extractionMode: "backend_none",
    confidence: "nenhuma",
    classification: "UPLOAD_TEMPORARIO_GOVERNADO",
    storage: "nao_salvo",
    note: "Arquivo recebido pelo backend extrator, mas sem extracao textual disponivel."
  };

  const limit = Math.max(0, Math.min(remainingChars || 0, ATTACHMENT_MAX_EXTRACTED_CHARS));
  if (!limit) {
    return { ...base, note: "Limite de texto da resposta ja foi atingido antes deste arquivo." };
  }
  if (base.size > ATTACHMENT_MAX_BYTES) {
    return { ...base, note: "Arquivo acima do limite governado de 2 MB para extracao temporaria." };
  }

  const buffer = await file.arrayBuffer();
  const kind = classifyAttachmentKind(base.name, base.type);
  let extracted;
  if (kind === "text") {
    extracted = extractPlainText(buffer, limit);
    return finalizeAttachmentExtraction(base, extracted, "text_backend_reader", "alta", "Texto extraido no backend temporario.");
  }
  if (kind === "pdf") {
    extracted = extractPdfTextFromBuffer(buffer, limit);
    return finalizeAttachmentExtraction(base, extracted, "pdf_backend_text_heuristic", extracted.text.length >= 800 ? "media" : "baixa", "PDF textual extraido no backend em modo heuristico.");
  }
  if (kind === "docx") {
    extracted = await extractDocxTextFromBuffer(buffer, limit);
    return finalizeAttachmentExtraction(base, extracted, "docx_backend_xml", extracted.text.length >= 800 ? "media" : "baixa", "DOCX extraido no backend a partir do XML interno do documento.");
  }

  return {
    ...base,
    extractionMode: "backend_unsupported",
    note: "Formato sem extrator governado nesta versao; use transcricao, OCR ou conversao para PDF textual/DOCX."
  };
}

function finalizeAttachmentExtraction(base, extracted, mode, confidence, successNote) {
  const text = normalizeExtractedText(extracted?.text || "").slice(0, ATTACHMENT_MAX_EXTRACTED_CHARS);
  const readable = text.length >= 20;
  return {
    ...base,
    readable,
    truncated: Boolean(extracted?.truncated || text.length < normalizeExtractedText(extracted?.text || "").length),
    text,
    extractionMode: mode,
    confidence: readable ? confidence : "nenhuma",
    note: readable ? successNote : "Nao encontrei texto pesquisavel suficiente; use OCR, transcricao ou backend especializado antes de afirmar conteudo."
  };
}

function sanitizeFilename(value) {
  return String(value || "arquivo")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/[<>:"/\\|?*]+/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180) || "arquivo";
}

function classifyAttachmentKind(name, type) {
  const lowerName = String(name || "").toLowerCase();
  const lowerType = String(type || "").toLowerCase();
  if (lowerType === "application/pdf" || /\.pdf$/i.test(lowerName)) return "pdf";
  if (lowerType.includes("officedocument.wordprocessingml.document") || /\.docx$/i.test(lowerName)) return "docx";
  if (/^text\//.test(lowerType) || /(json|xml|csv|markdown|javascript|html|rtf)/.test(lowerType) || /\.(txt|md|markdown|csv|json|html?|xml|rtf|log)$/i.test(lowerName)) return "text";
  return "unsupported";
}

function extractPlainText(buffer, limit) {
  const text = normalizeExtractedText(new TextDecoder("utf-8", { fatal: false }).decode(buffer));
  return {
    text: text.slice(0, limit),
    truncated: text.length > limit
  };
}

function binaryStringFromArrayBuffer(buffer) {
  const bytes = new Uint8Array(buffer || []);
  let output = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    output += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return output;
}

function normalizeExtractedText(text) {
  return String(text || "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodePdfLiteralString(value) {
  const text = String(value || "").replace(/\\\r?\n/g, "");
  return text
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)))
    .replace(/\\([nrtbf()\\])/g, (_, code) => {
      const map = { n: "\n", r: "\r", t: "\t", b: "\b", f: "\f", "(": "(", ")": ")", "\\": "\\" };
      return Object.prototype.hasOwnProperty.call(map, code) ? map[code] : code;
    });
}

function decodePdfHexString(value) {
  let clean = String(value || "").replace(/\s+/g, "");
  if (!clean || clean.length < 2) return "";
  if (clean.length % 2) clean += "0";
  const bytes = [];
  for (let i = 0; i < clean.length; i += 2) {
    const byte = parseInt(clean.slice(i, i + 2), 16);
    if (Number.isFinite(byte)) bytes.push(byte);
  }
  if (bytes[0] === 0xFE && bytes[1] === 0xFF) {
    let utf16 = "";
    for (let i = 2; i + 1 < bytes.length; i += 2) utf16 += String.fromCharCode((bytes[i] << 8) + bytes[i + 1]);
    return utf16;
  }
  return bytes.map((byte) => String.fromCharCode(byte)).join("");
}

function collectPdfTextChunk(chunks, text) {
  const clean = normalizeExtractedText(text);
  if (clean && (/[A-Za-z0-9]/.test(clean) || clean.length >= 6)) chunks.push(clean);
}

function extractPdfTextFromBuffer(buffer, limit) {
  const raw = binaryStringFromArrayBuffer(buffer);
  const scan = raw.slice(0, 3 * 1024 * 1024);
  const chunks = [];
  const literalRegex = /\((?:\\.|[^\\()]){1,4000}\)\s*Tj/g;
  const hexRegex = /<([0-9A-Fa-f\s]{2,4000})>\s*Tj/g;
  const arrayRegex = /\[((?:.|\r|\n){1,4000}?)\]\s*TJ/g;
  let match;
  while ((match = literalRegex.exec(scan))) {
    collectPdfTextChunk(chunks, decodePdfLiteralString(match[0].replace(/\)\s*Tj\s*$/, "").slice(1)));
    if (chunks.join(" ").length > limit * 1.5) break;
  }
  while ((match = hexRegex.exec(scan))) {
    collectPdfTextChunk(chunks, decodePdfHexString(match[1]));
    if (chunks.join(" ").length > limit * 1.5) break;
  }
  while ((match = arrayRegex.exec(scan))) {
    const parts = [];
    match[1].replace(/\((?:\\.|[^\\()]){1,1000}\)|<([0-9A-Fa-f\s]{2,2000})>/g, (part, hexPart) => {
      if (part.charAt(0) === "(") parts.push(decodePdfLiteralString(part.slice(1, -1)));
      else if (hexPart) parts.push(decodePdfHexString(hexPart));
      return part;
    });
    collectPdfTextChunk(chunks, parts.join(" "));
    if (chunks.join(" ").length > limit * 1.5) break;
  }
  const joined = normalizeExtractedText(chunks.join("\n"));
  return {
    text: joined.slice(0, limit),
    truncated: raw.length > scan.length || joined.length > limit
  };
}

async function extractDocxTextFromBuffer(buffer, limit) {
  const entries = await readZipEntries(buffer, (name) => /^word\/(?:document|footnotes|endnotes|comments|header\d+|footer\d+)\.xml$/i.test(name));
  const chunks = [];
  for (const entry of entries) {
    const xml = new TextDecoder("utf-8", { fatal: false }).decode(entry.bytes);
    const text = extractDocxXmlText(xml);
    if (text) chunks.push(text);
    if (chunks.join(" ").length > limit * 1.5) break;
  }
  const joined = normalizeExtractedText(chunks.join("\n"));
  return {
    text: joined.slice(0, limit),
    truncated: joined.length > limit
  };
}

function extractDocxXmlText(xml) {
  const normalized = String(xml || "")
    .replace(/<w:tab\s*\/>/g, "\t")
    .replace(/<w:(?:br|cr)[^>]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<\/w:tr>/g, "\n");
  const chunks = [];
  normalized.replace(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g, (_, text) => {
    chunks.push(decodeXmlEntities(text));
    return text;
  });
  return normalizeExtractedText(chunks.join(" "));
}

function decodeXmlEntities(text) {
  return String(text || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

async function readZipEntries(buffer, includeName) {
  const bytes = new Uint8Array(buffer || []);
  const centralOffset = findZipCentralDirectoryOffset(bytes);
  if (centralOffset < 0) return [];
  const entries = [];
  let offset = centralOffset;
  while (readUint32LE(bytes, offset) === 0x02014b50) {
    const method = readUint16LE(bytes, offset + 10);
    const compressedSize = readUint32LE(bytes, offset + 20);
    const nameLength = readUint16LE(bytes, offset + 28);
    const extraLength = readUint16LE(bytes, offset + 30);
    const commentLength = readUint16LE(bytes, offset + 32);
    const localOffset = readUint32LE(bytes, offset + 42);
    const name = new TextDecoder("utf-8", { fatal: false }).decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    if (includeName(name)) {
      const localNameLength = readUint16LE(bytes, localOffset + 26);
      const localExtraLength = readUint16LE(bytes, localOffset + 28);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = bytes.subarray(dataStart, dataStart + compressedSize);
      entries.push({ name, bytes: await inflateZipEntry(compressed, method) });
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

function findZipCentralDirectoryOffset(bytes) {
  const min = Math.max(0, bytes.length - 65558);
  for (let offset = bytes.length - 22; offset >= min; offset--) {
    if (readUint32LE(bytes, offset) === 0x06054b50) return readUint32LE(bytes, offset + 16);
  }
  return -1;
}

async function inflateZipEntry(compressed, method) {
  if (method === 0) return compressed;
  if (method !== 8 || typeof DecompressionStream !== "function") return new Uint8Array();
  const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function readUint16LE(bytes, offset) {
  return (bytes[offset] || 0) | ((bytes[offset + 1] || 0) << 8);
}

function readUint32LE(bytes, offset) {
  return ((bytes[offset] || 0) |
    ((bytes[offset + 1] || 0) << 8) |
    ((bytes[offset + 2] || 0) << 16) |
    ((bytes[offset + 3] || 0) << 24)) >>> 0;
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
  const roleDetail = sanitizeText(payload.roleDetail, 120);
  const ageGroup = sanitizeText(payload.ageGroup, 80) || "nao_informado";
  const professionalDocumentStatus = sanitizeText(payload.professionalDocumentStatus, 80) || "nao_informado";
  const responsibleReview = sanitizeText(payload.responsibleReview, 120);
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
    roleDetail,
    notes,
    imagePolicy,
    ageGroup,
    professionalDocumentStatus,
    responsibleReview,
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
    roleDetail,
    ageGroup,
    imagePolicy,
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
  if (nextStatus === "aprovada_revisao_humana") {
    await upsertGovernedProfile(env, updated, auditItem);
  } else {
    await removeGovernedProfile(env, id);
  }
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

async function listGovernedProfiles(env) {
  const current = await env.JUS9_PROFILE_REQUESTS.get("governed-profiles:index", "json").catch(() => null);
  return Array.isArray(current) ? current : [];
}

async function upsertGovernedProfile(env, record, auditItem) {
  const key = "governed-profiles:index";
  const current = await listGovernedProfiles(env);
  const approved = {
    sourceRequestId: record.id,
    status: "ativo_revisao_humana",
    classification: "INTERNO",
    scope: record.scope || "equipe",
    name: record.name || "",
    email: record.email || "",
    profile: record.profile || "",
    module: record.module || "",
    roleDetail: record.roleDetail || "",
    origin: record.origin || "",
    imagePolicy: record.imagePolicy || "sem_imagem",
    ageGroup: record.ageGroup || "nao_informado",
    professionalDocumentStatus: record.professionalDocumentStatus || "nao_informado",
    approvedAt: auditItem.at,
    approvedByProfile: auditItem.reviewer?.profile || "",
    updatedAt: auditItem.at
  };
  const withoutCurrent = current.filter((item) => item.sourceRequestId !== record.id && item.email !== record.email);
  withoutCurrent.unshift(approved);
  await env.JUS9_PROFILE_REQUESTS.put(key, JSON.stringify(withoutCurrent.slice(0, 500)));
}

async function removeGovernedProfile(env, id) {
  const key = "governed-profiles:index";
  const current = await listGovernedProfiles(env);
  const updated = current.filter((item) => item.sourceRequestId !== id);
  await env.JUS9_PROFILE_REQUESTS.put(key, JSON.stringify(updated.slice(0, 500)));
}

async function governedProfileForEmail(env, email) {
  if (!env.JUS9_PROFILE_REQUESTS || !email) return null;
  const lower = String(email || "").toLowerCase();
  const items = await listGovernedProfiles(env);
  const item = items.find((profile) => String(profile.email || "").toLowerCase() === lower);
  if (!item) return null;
  return {
    status: item.status || "",
    scope: item.scope || "",
    profile: item.profile || "",
    module: item.module || "",
    roleDetail: item.roleDetail || "",
    ageGroup: item.ageGroup || "",
    imagePolicy: item.imagePolicy || "",
    sourceRequestId: item.sourceRequestId || "",
    approvedAt: item.approvedAt || ""
  };
}

async function listDajProcessLinks(env, url) {
  const items = await readDajProcessLinkIndex(env);
  const searchType = sanitizeToken(url.searchParams.get("searchType"), 32);
  const dajId = normalizeDajIdForLink(url.searchParams.get("dajId") || url.searchParams.get("daj"));
  const processDigits = normalizeCnjDigits(url.searchParams.get("numeroProcesso") || url.searchParams.get("processNumber"));
  const nome = normalizeComparableText(url.searchParams.get("nome") || url.searchParams.get("name"));
  const cpfMasked = maskCpfForLink(url.searchParams.get("cpf") || url.searchParams.get("cpfMasked"));

  let filtered = items;
  if (searchType === "daj" && dajId) {
    filtered = items.filter((item) => item.id === dajId);
  } else if ((searchType === "numeroprocesso" || searchType === "processo") && processDigits) {
    filtered = items.filter((item) => item.processDigits === processDigits);
  } else if (searchType === "nome" && nome) {
    filtered = items.filter((item) =>
      normalizeComparableText(item.partyName).includes(nome) ||
      normalizeComparableText(item.title).includes(nome)
    );
  } else if (searchType === "cpf" && cpfMasked) {
    filtered = items.filter((item) => String(item.cpfMasked || "").slice(-2) === cpfMasked.slice(-2));
  }

  return {
    status: 200,
    payload: {
      ok: true,
      configured: true,
      classification: "JURIDICO_PUBLICO_CONTROLADO",
      total: filtered.length,
      items: filtered.map(publicDajProcessLink)
    }
  };
}

async function saveDajProcessLink(env, session, request, payload) {
  if (!payload || typeof payload !== "object") {
    return { status: 400, payload: { ok: false, error: "payload_invalido" } };
  }
  const dajId = normalizeDajIdForLink(payload.dajId || payload.daj);
  const processDigits = normalizeCnjDigits(payload.processNumber || payload.numeroProcesso);
  const processNumber = formatCnjForLink(processDigits);
  const tribunal = sanitizeToken(payload.tribunal, 16) || "nao_informado";
  const tribunalLabel = sanitizeText(payload.tribunalLabel, 120);
  const title = sanitizeText(payload.title, 160) || "DAJ vinculado a processo";
  const partyName = sanitizeText(payload.partyName || payload.nome, 160);
  const cpfMasked = maskCpfForLink(payload.cpf || payload.cpfMasked);
  const origin = normalizeOriginHint(request.headers.get("origin") || request.headers.get("referer") || "");

  if (!dajId || !/^DAJ-\d{4}-\d{4}$/.test(dajId)) {
    return { status: 400, payload: { ok: false, error: "daj_invalido", expected: "DAJ-2026-0001" } };
  }
  if (processDigits.length !== 20) {
    return { status: 400, payload: { ok: false, error: "numero_cnj_invalido" } };
  }

  const items = await readDajProcessLinkIndex(env);
  const current = items.find((item) => item.id === dajId);
  if (current && current.processDigits && current.processDigits !== processDigits) {
    await appendDajProcessLinkAudit(env, session, {
      action: "bloqueio_daj_ja_vinculado",
      dajId,
      processNumber,
      previousProcessNumber: current.processNumber,
      origin
    });
    return {
      status: 409,
      payload: {
        ok: false,
        error: "daj_ja_vinculado",
        dajId,
        current: publicDajProcessLink(current),
        message: "Um DAJ nao deve receber segundo processo sem revisao humana."
      }
    };
  }

  const processOwner = items.find((item) => item.processDigits === processDigits && item.id !== dajId);
  if (processOwner) {
    await appendDajProcessLinkAudit(env, session, {
      action: "bloqueio_processo_ja_vinculado",
      dajId,
      processNumber,
      currentDajId: processOwner.id,
      origin
    });
    return {
      status: 409,
      payload: {
        ok: false,
        error: "processo_ja_vinculado",
        dajId: processOwner.id,
        current: publicDajProcessLink(processOwner),
        message: "O processo ja possui DAJ no indice governado."
      }
    };
  }

  const now = new Date().toISOString();
  const existingIndex = items.findIndex((item) => item.id === dajId);
  const previous = existingIndex >= 0 ? items[existingIndex] : null;
  const record = {
    ...(previous || {}),
    id: dajId,
    title,
    processNumber,
    processDigits,
    tribunal,
    tribunalLabel,
    partyName: partyName || previous?.partyName || "",
    cpfMasked: cpfMasked || previous?.cpfMasked || "",
    status: "vinculado",
    classification: "JURIDICO_PUBLICO_CONTROLADO",
    createdAt: previous?.createdAt || now,
    updatedAt: now,
    updatedByProfile: session.profile,
    updatedByEmailHash: session.emailHash || "",
    origin
  };
  if (existingIndex >= 0) {
    items[existingIndex] = record;
  } else {
    items.unshift(record);
  }
  await env.JUS9_DAJ_PROCESS_LINKS.put("daj-process-links:index", JSON.stringify(items.slice(0, 500)));
  await appendDajProcessLinkAudit(env, session, {
    action: previous ? "atualiza_vinculo_daj_processo" : "cria_vinculo_daj_processo",
    dajId,
    processNumber,
    tribunal,
    origin
  });

  return {
    status: previous ? 200 : 201,
    payload: {
      ok: true,
      item: publicDajProcessLink(record),
      message: previous ? "Vinculo DAJ-processo atualizado." : "Vinculo DAJ-processo criado."
    }
  };
}

async function readDajProcessLinkIndex(env) {
  const current = await env.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:index", "json").catch(() => null);
  return Array.isArray(current) ? current : [];
}

async function appendDajProcessLinkAudit(env, session, item) {
  if (!env.JUS9_DAJ_PROCESS_LINKS) return;
  const current = await env.JUS9_DAJ_PROCESS_LINKS.get("daj-process-links:audit", "json").catch(() => null);
  const items = Array.isArray(current) ? current : [];
  items.unshift({
    at: new Date().toISOString(),
    agent: "worker",
    profile: session?.profile || "nao_autenticado",
    emailHash: session?.emailHash || "",
    result: "registrado",
    ...item
  });
  await env.JUS9_DAJ_PROCESS_LINKS.put("daj-process-links:audit", JSON.stringify(items.slice(0, 300)));
}

function publicDajProcessLink(item) {
  return {
    id: item.id || "",
    title: item.title || "",
    processNumber: item.processNumber || "",
    tribunal: item.tribunal || "",
    tribunalLabel: item.tribunalLabel || "",
    partyName: item.partyName || "",
    cpfMasked: item.cpfMasked || "",
    status: item.status || "em_triagem",
    classification: item.classification || "JURIDICO_PUBLICO_CONTROLADO",
    createdAt: item.createdAt || "",
    updatedAt: item.updatedAt || ""
  };
}

function normalizeDajIdForLink(value) {
  const raw = String(value || "").trim().toUpperCase();
  if (!raw) return "";
  if (/^\d{1,4}$/.test(raw)) return `DAJ-2026-${raw.padStart(4, "0")}`;
  const match = raw.match(/DAJ[\s_-]*(\d{4})[\s_-]*(\d{1,4})/i);
  if (match) return `DAJ-${match[1]}-${match[2].padStart(4, "0")}`;
  return raw.replace(/\s+/g, "-").slice(0, 24);
}

function normalizeCnjDigits(value) {
  return String(value || "").replace(/\D/g, "").slice(0, 24);
}

function formatCnjForLink(digits) {
  const clean = normalizeCnjDigits(digits);
  if (clean.length !== 20) return "";
  return clean.replace(/^(\d{7})(\d{2})(\d{4})(\d)(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
}

function maskCpfForLink(value) {
  const raw = String(value || "").trim();
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11) return `***.***.***-${digits.slice(-2)}`;
  if (/^\*\*\*\.\*\*\*\.\*\*\*-\d{2}$/.test(raw)) return raw;
  return "";
}

function normalizeComparableText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
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
    autoridade_policial: ["Autoridade policial", "apoio demonstrativo de fluxo policial"],
    autor_editor: ["Autor / editor", "obra, autoria, revisao e publicacao demonstrativa"]
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

function userContext(email, profile, governedProfile = null) {
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
    teamEmailPattern: domain === "jus9tecnologia.com.br",
    governedProfile: governedProfile || null
  };
}
