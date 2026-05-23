export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    if (url.pathname.endsWith(".css")) {
      headers.set("content-type", "text/css; charset=utf-8");
    } else if (url.pathname.endsWith(".js")) {
      headers.set("content-type", "application/javascript; charset=utf-8");
    } else if (url.pathname.endsWith(".svg")) {
      headers.set("content-type", "image/svg+xml");
    } else if (url.pathname.endsWith(".png")) {
      headers.set("content-type", "image/png");
    } else if (url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg")) {
      headers.set("content-type", "image/jpeg");
    } else if (url.pathname.endsWith(".webp")) {
      headers.set("content-type", "image/webp");
    } else if (url.pathname.endsWith(".ico")) {
      headers.set("content-type", "image/x-icon");
    } else if (url.pathname.endsWith(".html") || url.pathname === "/" || !url.pathname.includes(".")) {
      headers.set("content-type", "text/html; charset=utf-8");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
