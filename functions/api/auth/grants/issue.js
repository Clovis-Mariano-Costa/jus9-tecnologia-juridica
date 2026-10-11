import { getSession, jsonResponse } from "../../../_shared/oauth.js";
import { issueComiasGrant } from "../../../_shared/comias-grants.js";

export async function onRequestPost({ request, env }) {
  const session = await getSession(request, env);
  if (!session) return jsonResponse({ ok: false, error: "authentication_required" }, 401);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  try {
    const result = await issueComiasGrant({
      session,
      requested_scopes: body?.scopes,
      object: body?.object,
      env
    });
    return jsonResponse({
      ok: true,
      token: result.token,
      grant: result.grant,
      principal: result.principal
    }, 201);
  } catch (error) {
    const reason = String(error?.message || "grant_issue_failed");
    const forbidden = reason === "grant_scope_not_permitted";
    return jsonResponse({ ok: false, error: reason }, forbidden ? 403 : 400);
  }
}
