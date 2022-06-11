(() => {
  if (typeof window !== 'undefined' && !!window.self) {
    self.addEventListener('push', ev => {
      const data = JSON.parse(ev.data.text());
      ev.waitUntil(
        self.registration.showNotification(data.title, {
          body: data.message,
          icon: '/icon=192x192.png'
        })
      );
    });
  }
})();
