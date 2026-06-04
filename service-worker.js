/*
  Jus 9 Tecnologia Jurídica — Service Worker PWA
  Escopo: experiência instalável leve para Android/PWA.
  Não armazena dados sensíveis. Não altera login, backend ou rotas protegidas.
*/

const JUS9_CACHE = 'jus9-pwa-v4-2026-06-04-charlie-rooms-v4-4-1';
const JUS9_ASSETS = [
  '/',
  '/index.html',
  '/mvp.html',
  '/mvp-o-que-ja-funciona.html',
  '/demo-01-advogado-defensor.html',
  '/app-demo-advogar.html',
  '/app-agenda.html',
  '/app-clientes.html',
  '/app-daj.html',
  '/app-prazos.html',
  '/app-documentos.html',
  '/app-whatsapp.html',
  '/instalar-app',
  '/instalar-app.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/assets/js/whatsapp-local-demo.js',
  '/assets/favicon.svg',
  '/assets/jus9-logo.svg',
  '/assets/css/visual-jus9-fase-final.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(JUS9_CACHE).then((cache) =>
      Promise.allSettled(JUS9_ASSETS.map((asset) => cache.add(asset)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== JUS9_CACHE).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function isFreshMvpAsset(url, request) {
  const pathname = url.pathname;
  const isAppIaPage = /^\/app-ia-[^/]+\.html$/.test(pathname);
  const isCoreScript = pathname === '/script.js';
  const isCoreStyle = pathname === '/style.css';
  const acceptsHtml = request.mode === 'navigate' ||
    (request.headers.get('accept') || '').includes('text/html');

  return isCoreScript || isCoreStyle || (acceptsHtml && isAppIaPage);
}

function networkFirst(request) {
  return fetch(request, { cache: 'reload' })
    .then((response) => {
      const copy = response.clone();
      if (response.ok) {
        caches.open(JUS9_CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline.html')));
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const sameOrigin = requestUrl.origin === self.location.origin;
  const acceptsHtml = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') || '').includes('text/html');

  if (!sameOrigin) return;
  if (requestUrl.pathname.startsWith('/auth/') || requestUrl.pathname.startsWith('/api/')) return;

  if (isFreshMvpAsset(requestUrl, event.request)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (acceptsHtml) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok) {
            caches.open(JUS9_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => Response.error());
    })
  );
});
