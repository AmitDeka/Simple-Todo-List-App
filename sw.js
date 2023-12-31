self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then(async (cache) => {
      try {
        return await cache.addAll([
          "./",
          "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
          "./assets/style.css",
          "./assets/global.js",
          "./assets/images/favicon/android-chrome-192x192.png",
          "./assets/images/favicon/android-chrome-512x512.png",
          "./assets/images/favicon/apple-touch-icon.png",
          "./assets/images/favicon/favicon-16x16.png",
          "./assets/images/favicon/favicon-32x32.png",
          "./assets/images/favicon/favicon.ico",
          "./assets/images/Icon-144.png",
          "./assets/images/Icon-192.png",
          "./assets/images/Icon-196.png",
          "./assets/images/Icon-512.png",
          "./assets/images/ToDoList.svg",
        ]);
      } catch (error) {
        console.error("Cache addAll error:", error);
      }
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
