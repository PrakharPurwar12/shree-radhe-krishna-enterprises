const CACHE_VERSION = "2026-06-v1";
const CACHE_NAME = `srk-cache-${CACHE_VERSION}`;
const OFFLINE_URL = "pages/offline.html";

// Assets to precache immediately on install
const PRECACHE_ASSETS = [
  "pages/index.html",
  "pages/products.html",
  "pages/gallery.html",
  "pages/about.html",
  "pages/contact.html",
  "pages/cart.html",
  OFFLINE_URL,
  "assets/css/styles.css",
  "assets/js/script.js",
  "assets/js/interactions.js",
  "assets/js/pwa.js",
  "assets/logo.png",
  "manifest.json",
  "assets/icons/icon-72x72.png",
  "assets/icons/icon-96x96.png",
  "assets/icons/icon-128x128.png",
  "assets/icons/icon-192x192.png",
  "assets/icons/icon-256x256.png",
  "assets/icons/icon-512x512.png",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
];

// 1. Install Event: Pre-cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching highest priority assets");
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Removing old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Intercept network calls & apply PWA strategies
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests (e.g. form submissions)
  if (request.method !== "GET") return;

  // Cache strategy rules based on resource type
  const isHTML = request.mode === "navigate" || request.headers.get("accept").includes("text/html");
  const isCSSorJS = request.destination === "style" || request.destination === "script" || url.pathname.endsWith(".css") || url.pathname.endsWith(".js");
  const isImage = request.destination === "image" || url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg") || url.pathname.endsWith(".jpeg") || url.pathname.endsWith(".svg") || url.pathname.endsWith(".webp") || url.href.includes("unsplash.com") || url.href.includes("placehold.co");

  if (isHTML) {
    // --- HTML: Network First Strategy ---
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Update cache with latest page content
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          // If network fails, serve from cache or fallback to offline page
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match(OFFLINE_URL);
          });
        })
    );
  } else if (isCSSorJS) {
    // --- CSS/JS: Stale-While-Revalidate Strategy ---
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          }).catch((err) => {
            console.log("[Service Worker] CSS/JS network request failed:", err);
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (isImage) {
    // --- Images: Cache First Strategy ---
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Return cached copy immediately
        }
        return fetch(request).then((networkResponse) => {
          // Cache the new image for subsequent views
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        }).catch((err) => {
          console.log("[Service Worker] Image fetch failed:", err);
        });
      })
    );
  } else {
    // --- Default: Stale-While-Revalidate Strategy for fonts, manifests, and external scripts ---
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse.clone()));
          return networkResponse;
        }).catch(() => {});
        return cachedResponse || fetchPromise;
      })
    );
  }
});

// 4. Update Event: Listen to update requests
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
