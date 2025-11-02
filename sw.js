// sw.js - Avero PWA
const CACHE_NAME = 'avero-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/login.html',
  '/register.html',
  '/questionario.html',
  '/home.html',
  '/css/style.css',
  '/js/main.js',
  '/assets/logo.png',
  '/assets/iris.png'
];

// Instala o service worker e faz cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Busca no cache ou faz download
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualiza o cache quando houver nova versão
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
});
