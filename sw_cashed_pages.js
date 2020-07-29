// MAKE SURE SERVICE WORKER IS SUPPORTED
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw_cashed_pages.js")
      .then((reg) => console.log("Service Worker Registered"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}

const cacheName = "v1";

// CALL INSTALL EVENT
self.addEventListener("install", (e) => {
  console.log("Service Worker Installed");
});

// CALL ACTIVATE EVENT
self.addEventListener("activate", (e) => {
  console.log("Service Worker Activated");

  // REMOVE UNWANTED CACHES
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// CALL FETCH EVENT
self.addEventListener("fetch", (e) => {
  console.log("Service Worker: Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // MAKE COPY/CLONE OF RESPONSE
        const resClone = res.clone();
        // OPEN CACHE
        caches.open(cacheName).then((cache) => {
          // ADD RESPONSE TO CACHE
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
