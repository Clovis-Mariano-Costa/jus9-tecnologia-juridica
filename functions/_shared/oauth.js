const textEncoder = new TextEncoder();

export const AUTH_PROFILES = new Set([
  "admin_sistema",
  "advogado_lider",
  "advogado",
  "assessor_chefe",
  "assessor",
  "secretaria",
  "estagio",
  "academia",
  "estudante",
  "cidadao",
  "perito",
  "parceiro",
  "escritorio",
  "empresa",
  "orgao_publico",
  "magistrado",
  "ministerio_publico",
  "autoridade_policial"
]);

export function getPublicSiteOrigin(env) {
  return env.PUBLIC_SITE_ORIGIN || "https://www.jus9tecnologia.com.br";
}

export function getGoogleCallbackUrl(env) {
  return env.GOOGLE_CALLBACK_URL || `${getPublicSiteOrigin(env)}/auth/google/callback`;
}

export function getAuthSuccessRedirect(env, returnTo = "") {
  if (/^https:\/\/[a-z0-9.-]+\.jus9tecnologia\.com\.br(?:\/|$)/i.test(returnTo)) return returnTo;
  if (returnTo) return `${getPublicSiteOrigin(env)}${returnTo}`;
  return env.AUTH_SUCCESS_REDIRECT || `${getPublicSiteOrigin(env)}/app.html`;
}

export function normalizeAuthReturnTo(value) {
  const rawValue = String(value || "").trim();
  if (!rawValue) return "";
  if (/[\u0000-\u001f\u007f]/.test(rawValue)) return "";
  if (rawValue.includes("\\") || rawValue.startsWith("//")) return "";
  if (rawValue.includes("..")) return "";
  const allowedOrigins = new Set([
    "https://jus9tecnologia.com.br",
    "https://www.jus9tecnologia.com.br",
    "https://equipe.jus9tecnologia.com.br",
    "https://laboratorio.jus9tecnologia.com.br",
    "https://universidadedofuturo.jus9tecnologia.com.br"
  ]);
  const isAbsolute = /^[a-z][a-z0-9+.-]*:/i.test(rawValue);

  let parsed;
  try {
    parsed = new URL(rawValue, isAbsolute ? undefined : "https://jus9.invalid");
  } catch (_) {
    return "";
  }

  if (isAbsolute && !allowedOrigins.has(parsed.origin)) return "";
  if (!isAbsolute && parsed.origin !== "https://jus9.invalid") return "";
  const path = parsed.pathname || "/";
  if (path.includes("..")) return "";

  const allowedExactPaths = new Set([
    "/",
    "/index.html",
    "/app.html",
    "/mvp.html",
    "/ia-profissional.html",
    "/app-ia-profissional.html",
    "/app-agenda.html",
    "/app-daj.html",
    "/app-clientes.html",
    "/app-processos.html",
    "/app-prazos.html",
    "/app-cofre.html",
    "/app-equipe.html",
    "/app-whatsapp.html",
    "/app-atendimento-inicial.html",
    "/app-grupos.html",
    "/app-gravacoes.html",
    "/app-retorno.html",
    "/equipe.html",
    "/skill.md"
  ]);
  const allowedPattern = /^\/(?:app-(?:demo|ia|documentos|perfis|workspace)-[a-z0-9-]+|demo-\d{2}-[a-z0-9-]+)\.html$/;
  if (!allowedExactPaths.has(path) && !allowedPattern.test(path)) return "";

  const target = `${path}${parsed.search}${parsed.hash}`;
  return isAbsolute ? `${parsed.origin}${target}` : target;
}

export function missingGoogleConfig(env) {
  return [
    ["GOOGLE_CLIENT_ID", env.GOOGLE_CLIENT_ID],
    ["GOOGLE_CLIENT_SECRET", env.GOOGLE_CLIENT_SECRET],
    ["AUTH_COOKIE_SECRET", env.AUTH_COOKIE_SECRET],
    ["AUTH_ALLOWED_EMAILS", env.AUTH_ALLOWED_EMAILS]
  ]
    .filter(([, value]) => !value || value === "troque-esta-chave")
    .map(([name]) => name);
}

export function htmlResponse(html, status = 200, headers = {}) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...headers
    }
  });
}

export function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...headers
    }
  });
}

export function parseCookies(request) {
  return String(request.headers.get("cookie") || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separator = cookie.indexOf("=");
      if (separator === -1) return cookies;
      cookies[decodeURIComponent(cookie.slice(0, separator))] = decodeURIComponent(cookie.slice(separator + 1));
      return cookies;
    }, {});
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  parts.push(`Path=${options.path || "/"}`);
  if (options.httpOnly !== false) parts.push("HttpOnly");
  if (options.secure !== false) parts.push("Secure");
  parts.push(`SameSite=${options.sameSite || "Lax"}`);
  return parts.join("; ");
}

export function clearCookie(name) {
  return serializeCookie(name, "", { maxAge: 0 });
}

export function randomToken(bytes = 32) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return base64urlBytes(data);
}

export async function sha256Base64url(value) {
  const digest = await crypto.subtle.digest("SHA-256", textEncoder.encode(value));
  return base64urlBytes(new Uint8Array(digest));
}

export function parseAllowedUsers(env) {
  return new Map(
    String(env.AUTH_ALLOWED_EMAILS || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [rawEmail, rawProfile = "advogado"] = item.split(":").map((value) => value.trim());
        const profile = AUTH_PROFILES.has(rawProfile) ? rawProfile : "advogado";
        return [rawEmail.toLowerCase(), profile];
      })
  );
}

export async function signPayload(payload, env) {
  const secret = env.AUTH_COOKIE_SECRET;
  if (!secret || secret === "troque-esta-chave") {
    throw new Error("AUTH_COOKIE_SECRET nao configurado");
  }
  const encoded = base64urlString(JSON.stringify(payload));
  const signature = await hmac(encoded, secret);
  return `${encoded}.${signature}`;
}

export async function verifyPayload(value, env) {
  const secret = env.AUTH_COOKIE_SECRET;
  if (!secret || !value || !value.includes(".")) return null;
  const [encoded, signature] = value.split(".");
  const expected = await hmac(encoded, secret);
  if (!constantTimeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(base64urlDecode(encoded));
    if (payload.expiresAt && Date.now() > payload.expiresAt) return null;
    return payload;
  } catch (_) {
    return null;
  }
}

export async function getSession(request, env) {
  const session = await verifyPayload(parseCookies(request).jus9_session, env);
  if (!session || session.kind !== "jus9_session") return null;
  return session;
}

async function hmac(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));
  return base64urlBytes(new Uint8Array(signature));
}

function base64urlString(value) {
  return btoa(unescape(encodeURIComponent(value))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlBytes(bytes) {
  let value = "";
  bytes.forEach((byte) => {
    value += String.fromCharCode(byte);
  });
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return decodeURIComponent(escape(atob(padded)));
}

function constantTimeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return mismatch === 0;
}
