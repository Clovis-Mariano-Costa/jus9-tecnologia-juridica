/*
  Jus 9 Tecnologia Jurídica — Service Worker PWA
  Escopo: experiência instalável leve para Android/PWA.
  Não armazena dados sensíveis. Não altera login, backend ou rotas protegidas.
*/

const JUS9_CACHE = 'jus9-pwa-v2-2026-05-31';
const JUS9_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/favicon.svg',
  '/assets/jus9-logo.svg',
  '/mvp.html',
  '/demo-01-advogado-defensor.html',
  '/mvp-o-que-ja-funciona.html',
  '/instalar-app',
  '/instalar-app.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(JUS9_CACHE)
      .then((cache) => cache.addAll(JUS9_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== JUS9_CACHE).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/auth/') || url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        if (response.ok && url.origin === self.location.origin) {
          caches.open(JUS9_CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
  );
});
