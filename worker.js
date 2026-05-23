export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);

    const headers = new Headers(response.headers);

    if (url.pathname.endsWith(".css")) {
      headers.set("content-type", "text/css; charset=utf-8");
    }

    if (url.pathname.endsWith(".js")) {
      headers.set("content-type", "application/javascript; charset=utf-8");
    }

    if (url.pathname.endsWith(".svg")) {
      headers.set("content-type", "image/svg+xml");
    }

    if (url.pathname.endsWith(".png")) {
      headers.set("content-type", "image/png");
    }

    if (url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg")) {
      headers.set("content-type", "image/jpeg");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};