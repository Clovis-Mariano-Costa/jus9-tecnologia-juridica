const JUS9_CACHE = 'jus9-pwa-v1-2026-05-23';
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
  '/app-ia-profissional.html',
  '/instalar-app.html',
  '/offline.html',
  '/style.css',
  '/script.js',
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
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== JUS9_CACHE).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  const sameOrigin = requestUrl.origin === self.location.origin;
  const acceptsHtml = event.request.headers.get('accept')?.includes('text/html');

  if (!sameOrigin) return;

  if (acceptsHtml) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok) {
            caches.open(JUS9_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match('/offline.html')))
    );
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
        .catch(() => caches.match('/offline.html'));
    })
  );
});
