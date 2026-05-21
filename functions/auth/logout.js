import { clearCookie } from "../_shared/oauth.js";

export async function onRequestPost() {
  return new Response(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Set-Cookie": clearCookie("jus9_session")
    }
  });
}
