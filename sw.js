/* Offline service worker.

   VERSION must equal the newest entry in js/releases.js (tools/check-release.mjs
   checks it): changing it is what makes installed copies download the new build.
   A new build waits until the reader taps "Update now" (APP-STANDARDS §2).

   Every app on bryanwoo988.github.io shares one cache storage, so only caches
   with this app's prefix are ever deleted (APP-STANDARDS §4). */
const VERSION = '1.1.0';
const PREFIX = 'sql-syntax-';
const CACHE = PREFIX + VERSION;
const ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'favicon.ico',
  'css/style.css',
  'js/icons.js',
  'js/qrcode.js',
  'js/whatsnew.js',
  'js/releases.js',
  'js/sqlcompat.js',
  'js/problems.js',
  'js/lessons.js',
  'js/app.js',
  'vendor/sql-wasm.js',
  'vendor/sql-wasm.wasm',
  'icons/icon-32.png',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-192.png',
  'icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Fetched past the HTTP cache, one by one: a single failure must not block the rest.
    const results = await Promise.allSettled(ASSETS.map(url => cache.add(new Request(url, { cache: 'reload' }))));
    const failed = results.map((r, i) => (r.status === 'rejected' ? ASSETS[i] : null)).filter(Boolean);
    if (failed.length) console.warn('[sw] could not precache:', failed);
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n.startsWith(PREFIX) && n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match('index.html');
      if (hit) return hit;
      try { return await fetch(req); } catch (e) { return new Response('Offline', { status: 503 }); }
    })());
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try { return await fetch(req); } catch (e) { return new Response('', { status: 504 }); }
  })());
});
