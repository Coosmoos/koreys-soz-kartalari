// Ilovani internetsiz ham ochish uchun. Kod yangilansa, keyingi ochilishda o'zi yangilanadi.
const CACHE = "danEo-v6";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const own = url.origin === location.origin;
  const fonts = url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com";
  if (!own && !fonts) return;                       // Gemini, Google, rasm xizmatlari — har doim internetdan
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    // Sahifa: avval internetdan (yangi versiya), bo'lmasa saqlangan nusxa
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Ikonka, shriftlar: saqlangan nusxa darhol, orqada yangilanadi
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
