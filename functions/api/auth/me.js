import { getSession, jsonResponse } from "../../_shared/oauth.js";

export async function onRequestGet({ request, env }) {
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ authenticated: false }, 401);
  return jsonResponse({
    authenticated: true,
    provider: session.provider,
    subject_id: session.emailHash ? `human:${session.emailHash}` : null,
    profile: session.profile,
    accessMode: session.accessMode || "legacy",
    authNucleus: session.authNucleus || "principal",
    emailHash: session.emailHash,
    expiresAt: new Date(session.expiresAt).toISOString()
  });
}
