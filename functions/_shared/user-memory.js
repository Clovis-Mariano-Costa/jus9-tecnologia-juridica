export const USER_MEMORY_VERSION = "user-memory-v2";

const MEMORY_PREFIX = "charlie:user-memory:v1";

export function userMemoryStore(env) {
  if (env?.JUS9_USER_MEMORY) return { kv: env.JUS9_USER_MEMORY, binding: "JUS9_USER_MEMORY", fallback: false };
  if (env?.JUS9_PROFILE_REQUESTS) return { kv: env.JUS9_PROFILE_REQUESTS, binding: "JUS9_PROFILE_REQUESTS_FALLBACK", fallback: true };
  return null;
}

export function userMemoryStorageStatus(env) {
  const store = userMemoryStore(env);
  if (!store) return { configured: false, binding: "", fallback: false };
  return { configured: true, binding: store.binding, fallback: store.fallback };
}

export function userMemoryKey(session) {
  const subject = userMemoryOwnerKey(session);
  if (!subject) return "";
  return `${MEMORY_PREFIX}:${subject}`;
}

export function userMemoryOwnerKey(session) {
  return String(session?.googleSubHash || session?.emailHash || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 96);
}

export async function readUserMemoryRecord(env, session) {
  const status = userMemoryStorageStatus(env);
  if (!status.configured) {
    return {
      status: 200,
      payload: {
        ok: true,
        configured: false,
        exists: false,
        ownerKey: userMemoryOwnerKey(session),
        source: "local_only",
        message: "Memoria oficial por login ainda sem KV configurado."
      }
    };
  }

  const key = userMemoryKey(session);
  if (!key) return { status: 400, payload: { ok: false, configured: true, error: "identidade_sem_hash" } };
  const store = userMemoryStore(env);
  const record = await store.kv.get(key, "json").catch(() => null);
  if (!record || record.deletedAt) {
    return {
      status: 200,
      payload: {
        ok: true,
        configured: true,
        exists: false,
        ownerKey: userMemoryOwnerKey(session),
        storage: status,
        userMemory: defaultUserMemory(),
        instruments: {},
        updatedAt: ""
      }
    };
  }
  return {
    status: 200,
    payload: {
      ok: true,
      configured: true,
      exists: true,
      ownerKey: userMemoryOwnerKey(session),
      storage: status,
      ...safeUserMemoryRecord(record)
    }
  };
}

export async function saveUserMemoryRecord(env, session, request, payload) {
  const status = userMemoryStorageStatus(env);
  if (!status.configured) {
    return { status: 501, payload: { ok: false, configured: false, error: "user_memory_kv_configuracao_pendente" } };
  }
  if (!payload || typeof payload !== "object") {
    return { status: 400, payload: { ok: false, configured: true, error: "payload_invalido" } };
  }

  const key = userMemoryKey(session);
  if (!key) return { status: 400, payload: { ok: false, configured: true, error: "identidade_sem_hash" } };
  const store = userMemoryStore(env);
  const existing = await store.kv.get(key, "json").catch(() => null);
  const now = new Date().toISOString();
  const moduleCode = normalizeModuleCode(payload.module || payload.code);
  const userMemory = sanitizeUserMemory(payload.userMemory);
  userMemory.reviewAt = userMemory.retentionDays > 0
    ? new Date(Date.now() + userMemory.retentionDays * 86_400_000).toISOString()
    : "";
  const instrument = sanitizeInstrumentSettings(payload.instrument || payload.instrumentSettings);
  const currentInstruments = existing && typeof existing === "object" && existing.instruments && typeof existing.instruments === "object"
    ? existing.instruments
    : {};
  const instruments = { ...currentInstruments };
  if (moduleCode) instruments[moduleCode] = { ...instrument, updatedAt: now };

  const record = {
    version: USER_MEMORY_VERSION,
    classification: "INTERNO",
    storage: status,
    owner: {
      provider: sanitizeToken(session?.provider, 40),
      profile: sanitizeToken(session?.profile, 40),
      accessMode: sanitizeToken(session?.accessMode || "legacy", 40),
      authNucleus: sanitizeToken(session?.authNucleus || "principal", 40),
      emailHash: sanitizeHash(session?.emailHash),
      googleSubHash: sanitizeHash(session?.googleSubHash)
    },
    origin: normalizeOriginHint(payload.origin || request?.headers?.get("origin") || request?.headers?.get("referer") || ""),
    module: moduleCode,
    focus: sanitizeText(payload.focus, 240),
    userMemory: { ...userMemory, updatedAt: now },
    retention: {
      mode: "review_only",
      days: userMemory.retentionDays,
      reviewAt: userMemory.reviewAt,
      automaticDeletion: false
    },
    instruments,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };

  await store.kv.put(key, JSON.stringify(record));
  return {
    status: 200,
    payload: {
      ok: true,
      configured: true,
      exists: true,
      ownerKey: userMemoryOwnerKey(session),
      storage: status,
      message: "Memoria oficial por login atualizada.",
      ...safeUserMemoryRecord(record)
    }
  };
}

export async function deleteUserMemoryRecord(env, session) {
  const status = userMemoryStorageStatus(env);
  if (!status.configured) {
    return { status: 200, payload: { ok: true, configured: false, deleted: false, source: "local_only" } };
  }
  const key = userMemoryKey(session);
  if (!key) return { status: 400, payload: { ok: false, configured: true, error: "identidade_sem_hash" } };
  const store = userMemoryStore(env);
  if (typeof store.kv.delete === "function") {
    await store.kv.delete(key);
  } else {
    await store.kv.put(key, JSON.stringify({ version: USER_MEMORY_VERSION, deletedAt: new Date().toISOString() }));
  }
  return { status: 200, payload: { ok: true, configured: true, deleted: true, storage: status } };
}

export function safeUserMemoryRecord(record) {
  return {
    version: record?.version || USER_MEMORY_VERSION,
    classification: record?.classification || "INTERNO",
    module: sanitizeText(record?.module, 32),
    focus: sanitizeText(record?.focus, 240),
    userMemory: sanitizeUserMemory(record?.userMemory),
    retention: sanitizeRetention(record?.retention || record?.userMemory),
    instruments: sanitizeInstrumentMap(record?.instruments),
    createdAt: sanitizeText(record?.createdAt, 40),
    updatedAt: sanitizeText(record?.updatedAt, 40)
  };
}

export function defaultUserMemory() {
  return {
    enabled: true,
    syncDrive: true,
    name: "",
    role: "",
    preferences: "",
    avoid: "",
    standingInstructions: "",
    retentionDays: 365,
    reviewAt: "",
    updatedAt: ""
  };
}

export function sanitizeUserMemory(value) {
  const input = value && typeof value === "object" ? value : {};
  return {
    enabled: input.enabled !== false,
    syncDrive: input.syncDrive !== false,
    name: sanitizeText(input.name, 120),
    role: sanitizeText(input.role, 180),
    preferences: sanitizeText(input.preferences, 1200),
    avoid: sanitizeText(input.avoid, 900),
    standingInstructions: sanitizeText(input.standingInstructions, 1600),
    retentionDays: normalizeRetentionDays(input.retentionDays),
    reviewAt: sanitizeText(input.reviewAt, 40),
    updatedAt: sanitizeText(input.updatedAt, 40)
  };
}

export function sanitizeInstrumentSettings(value) {
  const input = value && typeof value === "object" ? value : {};
  return {
    enabled: input.enabled !== false,
    name: sanitizeText(input.name, 180),
    role: sanitizeText(input.role, 260),
    autonomy: allowed(input.autonomy, ["assistida", "proativa", "estrita"], "assistida"),
    drive: allowed(input.drive, ["auto_governado", "manual", "restrito"], "auto_governado"),
    response: allowed(input.response, ["relatorio_e_acao", "checklist", "parecer", "roteiro", "aula"], "relatorio_e_acao"),
    sources: allowed(input.sources, ["oficiais_academicas", "oficiais", "academicas", "internas"], "oficiais_academicas"),
    notes: sanitizeText(input.notes, 1600),
    updatedAt: sanitizeText(input.updatedAt, 40)
  };
}

function sanitizeInstrumentMap(value) {
  const input = value && typeof value === "object" ? value : {};
  return Object.fromEntries(Object.entries(input).slice(0, 40).map(([key, settings]) => [
    normalizeModuleCode(key),
    sanitizeInstrumentSettings(settings)
  ]).filter(([key]) => key));
}

function allowed(value, values, fallback) {
  const text = sanitizeToken(value, 40);
  return values.includes(text) ? text : fallback;
}

function normalizeRetentionDays(value) {
  const days = Number(value);
  return [0, 90, 180, 365, 730, 1825].includes(days) ? days : 365;
}

function sanitizeRetention(value) {
  const input = value && typeof value === "object" ? value : {};
  const days = normalizeRetentionDays(input.days ?? input.retentionDays);
  const reviewAt = sanitizeText(input.reviewAt, 40);
  return {
    mode: "review_only",
    days,
    reviewAt,
    reviewDue: Boolean(reviewAt && Date.parse(reviewAt) <= Date.now()),
    automaticDeletion: false
  };
}

function normalizeModuleCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 32);
}

function normalizeOriginHint(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  try {
    return new URL(text).hostname.toLowerCase();
  } catch (_) {
    return text.replace(/^https?:\/\//i, "").split("/")[0].toLowerCase().slice(0, 160);
  }
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

function sanitizeHash(value) {
  return String(value || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 96);
}
