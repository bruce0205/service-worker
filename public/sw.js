let CACHE = 'v117';

const PRECACHE_URLS = [
  '/',
  'index.html',
  '/dice2.png',
  '/dice4.png',
  '/jquery.min.js',
  '/bootstrap.min.css',
  '/bootstrap-theme.min.css',
  '/bootstrap.min.js',
  '/manifest.json',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'

]

const ignoreFetch = [
  /https?:\/\/ajax.googleapis.com\//,
  /https?:\/\/maxcdn.bootstrapcdn.com\//
];

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');

  evt.waitUntil(precache()); // 確保 Service Worker 在安裝完畢後才去快取這些檔案。

  caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      console.log('[after] key of cache: ' + key)
    }));
  })
});

self.addEventListener('fetch', function (evt) {
  console.log('fetch.url: ' + evt.request.url);
  evt.respondWith(fromCache(evt.request));
});

self.addEventListener('activate', function (event) {
  console.log('activated!')

  // delete old cache
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (CACHE.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

function precache() {
  return caches.open(CACHE).then((cache) => {
    return cache.addAll(PRECACHE_URLS);
  });
}

function fromCache(request) {

  return caches.open(CACHE).then((cache) => {
    return cache.match(request).then((matching) => {
      return matching || Promise.reject('no-match');
    });
  });
}
