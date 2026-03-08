self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
        type: "window",
      });
      clients.forEach((client) => {
        client.navigate(client.url);
      });
    })(),
  );
});
