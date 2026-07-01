import { sha256Base64url } from "./oauth.js";

export const GOOGLE_CALENDAR_EVENTS_SCOPE = "https://www.googleapis.com/auth/calendar.events";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 180;

export function isCalendarOAuthEnabled(env) {
  return /^(1|true|yes|on|enabled)$/i.test(String(env.GOOGLE_CALENDAR_OAUTH_ENABLED || "").trim());
}

export function missingCalendarConfig(env) {
  return env.JUS9_CALENDAR_TOKENS ? [] : ["JUS9_CALENDAR_TOKENS"];
}

export function calendarTokenKey(session) {
  const subject = session?.googleSubHash || session?.emailHash;
  if (!subject) return "";
  return `calendar:${subject}`;
}

export async function getCalendarGrant(env, session) {
  const key = calendarTokenKey(session);
  if (!env.JUS9_CALENDAR_TOKENS || !key) return null;
  const encrypted = await env.JUS9_CALENDAR_TOKENS.get(key);
  if (!encrypted) return null;
  return decryptJson(encrypted, env);
}

export async function putCalendarGrant(env, session, token, userInfo = {}) {
  if (!env.JUS9_CALENDAR_TOKENS) throw new Error("JUS9_CALENDAR_TOKENS nao configurado");
  const key = calendarTokenKey(session);
  if (!key) throw new Error("sessao sem identificador de agenda");

  const previous = await getCalendarGrant(env, session);
  const now = Date.now();
  const grant = {
    provider: "google_calendar",
    accessToken: token.access_token,
    refreshToken: token.refresh_token || previous?.refreshToken || "",
    scope: String(token.scope || ""),
    expiresAt: now + Number(token.expires_in || 3600) * 1000,
    issuedAt: now,
    updatedAt: now,
    emailHash: userInfo.email ? await sha256Base64url(String(userInfo.email).toLowerCase()) : session.emailHash,
    googleSubHash: userInfo.sub ? await sha256Base64url(String(userInfo.sub)) : session.googleSubHash
  };
  await env.JUS9_CALENDAR_TOKENS.put(key, await encryptJson(grant, env), { expirationTtl: TOKEN_TTL_SECONDS });
  return grant;
}

export async function getCalendarStatus(env, session) {
  const grant = await getCalendarGrant(env, session);
  if (!grant) return { connected: false };
  return {
    connected: true,
    scope: grant.scope || "",
    expiresAt: grant.expiresAt ? new Date(grant.expiresAt).toISOString() : null,
    hasRefreshToken: Boolean(grant.refreshToken)
  };
}

export async function getValidCalendarAccessToken(env, session) {
  const grant = await getCalendarGrant(env, session);
  if (!grant) return null;
  if (grant.accessToken && grant.expiresAt && Date.now() < grant.expiresAt - 120_000) {
    return grant.accessToken;
  }
  if (!grant.refreshToken) return null;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: grant.refreshToken
    })
  });
  if (!response.ok) return null;
  const refreshed = await response.json();
  const updated = {
    ...grant,
    accessToken: refreshed.access_token,
    scope: refreshed.scope || grant.scope || "",
    expiresAt: Date.now() + Number(refreshed.expires_in || 3600) * 1000,
    updatedAt: Date.now()
  };
  await env.JUS9_CALENDAR_TOKENS.put(calendarTokenKey(session), await encryptJson(updated, env), { expirationTtl: TOKEN_TTL_SECONDS });
  return updated.accessToken;
}

export async function listCalendarEvents(env, session) {
  const accessToken = await getValidCalendarAccessToken(env, session);
  if (!accessToken) return { ok: false, status: 403, payload: { ok: false, error: "agenda_google_nao_conectada" } };
  const params = new URLSearchParams({
    calendarId: "primary",
    maxResults: "10",
    singleEvents: "true",
    orderBy: "startTime",
    timeMin: new Date().toISOString()
  });
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!response.ok) {
    const reason = await safeGoogleErrorReason(response);
    return { ok: false, status: 502, payload: { ok: false, error: "falha_listar_agenda_google", reason } };
  }
  const data = await response.json();
  return {
    ok: true,
    status: 200,
    payload: {
      ok: true,
      events: (data.items || []).map((item) => ({
        id: item.id,
        summary: item.summary || "Sem titulo",
        start: item.start?.dateTime || item.start?.date || null,
        end: item.end?.dateTime || item.end?.date || null,
        htmlLink: item.htmlLink || ""
      }))
    }
  };
}

export async function createCalendarEvent(env, session, input) {
  const accessToken = await getValidCalendarAccessToken(env, session);
  if (!accessToken) return { ok: false, status: 403, payload: { ok: false, error: "agenda_google_nao_conectada" } };
  const event = normalizeCalendarEventInput(input);
  if (!event) return { ok: false, status: 400, payload: { ok: false, error: "evento_invalido" } };

  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });
  if (!response.ok) {
    const reason = await safeGoogleErrorReason(response);
    return { ok: false, status: 502, payload: { ok: false, error: "falha_criar_evento_google", reason } };
  }
  const data = await response.json();
  return {
    ok: true,
    status: 201,
    payload: {
      ok: true,
      id: data.id,
      htmlLink: data.htmlLink || "",
      summary: data.summary || event.summary
    }
  };
}

function normalizeCalendarEventInput(input) {
  const title = cleanText(input?.title, 120);
  const description = cleanText(input?.description, 800);
  const location = cleanText(input?.location, 160) || "Jus 9 Tecnologia Juridica";
  const start = new Date(input?.start || "");
  const end = new Date(input?.end || "");
  if (!title || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) return null;
  return {
    summary: title,
    description,
    location,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() }
  };
}

function cleanText(value, limit) {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

async function safeGoogleErrorReason(response) {
  try {
    const payload = await response.clone().json();
    const reason = payload?.error?.errors?.[0]?.reason || payload?.error?.status || payload?.error || "";
    return cleanText(reason, 80) || `google_http_${response.status}`;
  } catch (_) {
    return `google_http_${response.status}`;
  }
}

async function encryptJson(payload, env) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await encryptionKey(env);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    textEncoder.encode(JSON.stringify(payload))
  );
  return `${base64urlBytes(iv)}.${base64urlBytes(new Uint8Array(encrypted))}`;
}

async function decryptJson(value, env) {
  const [rawIv, rawData] = String(value || "").split(".");
  if (!rawIv || !rawData) return null;
  try {
    const key = await encryptionKey(env);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: base64urlToBytes(rawIv) },
      key,
      base64urlToBytes(rawData)
    );
    return JSON.parse(textDecoder.decode(decrypted));
  } catch (_) {
    return null;
  }
}

async function encryptionKey(env) {
  const secret = `${env.AUTH_COOKIE_SECRET || ""}:google-calendar-token-store`;
  const digest = await crypto.subtle.digest("SHA-256", textEncoder.encode(secret));
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

function base64urlBytes(bytes) {
  let value = "";
  bytes.forEach((byte) => {
    value += String.fromCharCode(byte);
  });
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64urlToBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}
