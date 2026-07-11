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

async function requireSession(request, env) {
  const session = await getSession(request, env);
  if (!session) return { response: jsonResponse({ authenticated: false }, 401) };
  if (!hasPermission(session, "auth:read")) {
    return { response: jsonResponse({ ok: false, error: "perfil_sem_permissao", permission: "auth:read" }, 403) };
  }
  return { session };
}

export async function onRequestGet({ request, env }) {
  const auth = await requireSession(request, env);
  if (auth.response) return auth.response;
  const result = await readUserMemoryRecord(env, auth.session);
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}

export async function onRequestPost({ request, env }) {
  const auth = await requireSession(request, env);
  if (auth.response) return auth.response;
  const result = await saveUserMemoryRecord(env, auth.session, request, await request.json().catch(() => null));
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}

export async function onRequestDelete({ request, env }) {
  const auth = await requireSession(request, env);
  if (auth.response) return auth.response;
  const result = await deleteUserMemoryRecord(env, auth.session);
  return jsonResponse({ authenticated: true, profile: auth.session.profile, ...result.payload }, result.status);
}
