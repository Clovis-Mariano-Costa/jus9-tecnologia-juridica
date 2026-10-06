import { getPermissions } from "./permissions.js";
import { randomToken, signPayload, verifyPayload } from "./oauth.js";

const ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,199}$/;
const TOKEN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,99}$/;
const HASH = /^sha256:[a-f0-9]{64}$/i;
const DEFAULT_TTL_MS = 5 * 60 * 1000;
const MAX_TTL_MS = 10 * 60 * 1000;

const SCOPE_PERMISSION = Object.freeze({
  "thread.read": "comias:thread:read",
  "thread.append": "comias:thread:append",
  manifestation: "comias:manifestation",
  archive: "comias:archive"
});

function cleanObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("grant_object_required");
  }
  if (typeof value.id !== "string" || !ID.test(value.id)) {
    throw new Error("grant_object_id_invalid");
  }
  if (typeof value.version !== "string" || !TOKEN.test(value.version)) {
    throw new Error("grant_object_version_invalid");
  }
  if (typeof value.hash !== "string" || !HASH.test(value.hash)) {
    throw new Error("grant_object_hash_invalid");
  }
  return Object.freeze({
    id: value.id,
    version: value.version,
    hash: value.hash.toLowerCase()
  });
}

function subjectId(session) {
  if (!session?.emailHash || typeof session.emailHash !== "string") {
    throw new Error("grant_subject_unavailable");
  }
  const value = `human:${session.emailHash}`;
  if (!ID.test(value)) throw new Error("grant_subject_invalid");
  return value;
}

function cleanScopes(requested, profile) {
  if (!Array.isArray(requested) || requested.length === 0 || requested.length > 8) {
    throw new Error("grant_scopes_invalid");
  }
  const profilePermissions = new Set(getPermissions(profile));
  const out = [];
  for (const raw of requested) {
    const scope = typeof raw === "string" ? raw.trim() : "";
    const permission = SCOPE_PERMISSION[scope];
    if (!permission) throw new Error("grant_scope_unsupported");
    if (!profilePermissions.has(permission)) throw new Error("grant_scope_not_permitted");
    if (!out.includes(scope)) out.push(scope);
  }
  return Object.freeze(out);
}

export async function issueComiasGrant({
  session,
  requested_scopes,
  object,
  env,
  now = Date.now(),
  ttl_ms = DEFAULT_TTL_MS
}) {
  if (!session || session.kind !== "jus9_session") {
    throw new Error("grant_session_required");
  }
  if (!Number.isFinite(now)) throw new Error("grant_now_invalid");
  if (!Number.isInteger(ttl_ms) || ttl_ms <= 0 || ttl_ms > MAX_TTL_MS) {
    throw new Error("grant_ttl_invalid");
  }

  const clean = cleanObject(object);
  const scopes = cleanScopes(requested_scopes, session.profile);
  const issuedAt = now;
  const expiresAt = now + ttl_ms;
  const grantId = `grant:${randomToken(18)}`;
  const subject = subjectId(session);
  const grant = Object.freeze({
    grant_id: grantId,
    status: "active",
    subject_id: subject,
    scopes,
    object: clean,
    issued_at: new Date(issuedAt).toISOString(),
    expires_at: new Date(expiresAt).toISOString()
  });

  const token = await signPayload({
    kind: "jus9_comias_grant",
    ...grant,
    issuedAt,
    expiresAt
  }, env);

  return Object.freeze({
    token,
    grant,
    principal: Object.freeze({ kind: "human", id: subject })
  });
}

export async function introspectComiasGrant({ token, env, now = Date.now() }) {
  if (typeof token !== "string" || !token.includes(".")) {
    throw new Error("grant_token_required");
  }
  if (!Number.isFinite(now)) throw new Error("grant_now_invalid");

  const payload = await verifyPayload(token, env);
  if (!payload || payload.kind !== "jus9_comias_grant") {
    throw new Error("grant_token_invalid");
  }
  if (!Number.isFinite(payload.expiresAt) || now >= payload.expiresAt) {
    throw new Error("grant_expired");
  }

  const object = cleanObject(payload.object);
  const scopes = Array.isArray(payload.scopes)
    ? payload.scopes.filter((scope) => Object.prototype.hasOwnProperty.call(SCOPE_PERMISSION, scope))
    : [];
  if (scopes.length === 0) throw new Error("grant_scopes_invalid");
  if (typeof payload.subject_id !== "string" || !ID.test(payload.subject_id)) {
    throw new Error("grant_subject_invalid");
  }
  if (typeof payload.grant_id !== "string" || !ID.test(payload.grant_id)) {
    throw new Error("grant_id_invalid");
  }

  const issuedAtIso = new Date(payload.issuedAt).toISOString();
  const expiresAtIso = new Date(payload.expiresAt).toISOString();
  return Object.freeze({
    principal: Object.freeze({ kind: "human", id: payload.subject_id }),
    authentication_assertion: Object.freeze({
      status: "verified",
      trust_source: "trusted_gateway",
      subject_id: payload.subject_id,
      method: "central_grant_introspection",
      proof_id: payload.grant_id,
      verification_mode: "gateway_introspection",
      introspection_verified: true,
      issued_at: issuedAtIso,
      expires_at: expiresAtIso
    }),
    grant: Object.freeze({
      grant_id: payload.grant_id,
      status: "active",
      subject_id: payload.subject_id,
      scopes: Object.freeze([...new Set(scopes)]),
      object,
      expires_at: expiresAtIso
    })
  });
}

export const COMIAS_GRANT_SCOPES = Object.freeze(Object.keys(SCOPE_PERMISSION));
