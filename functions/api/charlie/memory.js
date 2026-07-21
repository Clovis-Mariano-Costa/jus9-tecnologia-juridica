import { getSession, jsonResponse } from "../../_shared/oauth.js";
import { getPermissions } from "../../_shared/permissions.js";
import {
  deleteUserMemoryRecord,
  readUserMemoryRecord,
  saveUserMemoryRecord
} from "../../_shared/user-memory.js";

function hasPermission(session, permission) {
  return getPermissions(session?.profile).includes(permission);
}

async function requireSession(request, env, permission) {
  const session = await getSession(request, env);
  if (!session) return { response: jsonResponse({ authenticated: false }, 401) };
  if (!hasPermission(session, permission)) {
    return { response: jsonResponse({ ok: false, error: "perfil_sem_permissao", permission }, 403) };
  }
  return { session };
}

export async function onRequestGet({ request, env }) {
  const auth = await requireSession(request, env, "memory:read");
  if (auth.response) return auth.response;
  const result = await readUserMemoryRecord(env, auth.session);
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}

export async function onRequestPost({ request, env }) {
  const auth = await requireSession(request, env, "memory:write");
  if (auth.response) return auth.response;
  const result = await saveUserMemoryRecord(env, auth.session, request, await request.json().catch(() => null));
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}

export async function onRequestDelete({ request, env }) {
  const auth = await requireSession(request, env, "memory:delete");
  if (auth.response) return auth.response;
  const confirmation = String(request.headers.get("X-Jus9-Confirm-Memory-Delete") || "").trim();
  if (confirmation !== "EXCLUIR MINHA MEMORIA") {
    return jsonResponse({ ok: false, error: "confirmacao_explicita_obrigatoria", confirmation: "EXCLUIR MINHA MEMORIA" }, 409);
  }
  const result = await deleteUserMemoryRecord(env, auth.session);
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}
