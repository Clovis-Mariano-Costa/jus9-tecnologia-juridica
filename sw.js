const JUS9_CACHE = 'jus9-mvp-app-v2';
const JUS9_ASSETS = [
  '/',
  '/app.html',
  '/app-demo.html',
  '/app-agenda.html',
  '/app-clientes.html',
  '/app-daj.html',
  '/app-prazos.html',
  '/app-documentos.html',
  '/app-whatsapp.html',
  '/app-ia-profissional.html',
  '/mvp.html',
  '/offline.html',
  '/style.css',
  '/script.js',
  '/assets/js/whatsapp-local-demo.js',
  '/assets/favicon.svg',
  '/assets/jus9-logo.svg',
  '/assets/css/visual-jus9-fase-final.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(JUS9_CACHE).then((cache) => cache.addAll(JUS9_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== JUS9_CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          if (response.ok && new URL(event.request.url).origin === self.location.origin) {
            caches.open(JUS9_CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match('/offline.html'));
    })
  );
});
