import { getSession, jsonResponse } from "../../_shared/oauth.js";
import { getPermissions } from "../../_shared/permissions.js";

export async function onRequestGet({ request, env }) {
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  return jsonResponse({
    authenticated: true,
    profile: session.profile,
    permissions: getPermissions(session.profile)
  });
}
