const CACHE_NAME = 'gail-energy-connect-v8';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/audio.js',
  './js/game-data.js',
  './js/social-card.js',
  './js/game.js',
  './js/pwa.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/crop2-corridor.jpg',
  './assets/dark-3d-india-map.jpg',
  './assets/wah-kya-energy-hai-transparent.png',
  './assets/WhatsApp Image 2026-09-15 at 08.48.18.jpeg',
  './assets/WhatsApp Image 2026-09-15 at 16.45.22.jpeg',
  './assets/WhatsApp Image 2026-09-15 at 20.21.52.jpeg',
  './assets/gail-map-legend-complete.png'
];

// Install: Pre-cache static shell assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate: Purge old cache versions and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch: Network-First with Cache fallback (ensures latest version always loads immediately)
self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (request.url.startsWith('https://fonts.googleapis.com') ||
           request.url.startsWith('https://fonts.gstatic.com') ||
           request.url.startsWith(self.location.origin))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache if network fails (offline support)
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
        });
      })
  );
});
