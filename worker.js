export default {
  async fetch(request, env) {
    const originalUrl = new URL(request.url);
    const assetUrl = new URL(request.url);

    if (assetUrl.pathname === "/" || assetUrl.pathname === "") {
      assetUrl.pathname = "/index.html";
    }

    if (assetUrl.pathname === "/mvp" || assetUrl.pathname === "/mvp/") {
      assetUrl.pathname = "/mvp.html";
    }

    const assetRequest = new Request(assetUrl.toString(), request);
    const response = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(response.headers);

    if (assetUrl.pathname.endsWith(".css")) {
      headers.set("content-type", "text/css; charset=utf-8");
    } else if (assetUrl.pathname.endsWith(".js")) {
      headers.set("content-type", "application/javascript; charset=utf-8");
    } else if (assetUrl.pathname.endsWith(".svg")) {
      headers.set("content-type", "image/svg+xml");
    } else if (assetUrl.pathname.endsWith(".png")) {
      headers.set("content-type", "image/png");
    } else if (assetUrl.pathname.endsWith(".jpg") || assetUrl.pathname.endsWith(".jpeg")) {
      headers.set("content-type", "image/jpeg");
    } else if (assetUrl.pathname.endsWith(".webp")) {
      headers.set("content-type", "image/webp");
    } else if (assetUrl.pathname.endsWith(".ico")) {
      headers.set("content-type", "image/x-icon");
    } else if (assetUrl.pathname.endsWith(".html") || !originalUrl.pathname.includes(".")) {
      headers.set("content-type", "text/html; charset=utf-8");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};