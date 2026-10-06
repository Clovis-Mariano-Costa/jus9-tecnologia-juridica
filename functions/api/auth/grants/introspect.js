import { jsonResponse } from "../../../_shared/oauth.js";
import { introspectComiasGrant } from "../../../_shared/comias-grants.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  try {
    const result = await introspectComiasGrant({ token: body?.token, env });
    return jsonResponse({ ok: true, ...result });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error?.message || "grant_invalid") }, 401);
  }
}
