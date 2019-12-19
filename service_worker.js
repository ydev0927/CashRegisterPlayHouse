// キャッシュファイルの指定
const CACHE_NAME = 'pwa-crph-caches';
const urlsToCache = [
  "index.html",
  "js/bootstrap-native-v4.min.js",
  "js/DecoderWorker.js",
  "js/main.js",
  "js/qrcode.js",
  "js/vue.min.js",
  "js/webcodecamjs.js",
  "css/app.css",
  "css/bootstrap.min.css"
];

// インストール処理
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        return response ? response : fetch(event.request);
      })
  );
});