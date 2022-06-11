(() => {
  if (typeof window !== 'undefined' && !!window.self) {
    self.addEventListener('push', ev => {
      const pushData = JSON.parse(ev.data.text());
      ev.waitUntil(
        self.registration.showNotification(pushData.title, {
          body: pushData.data,
          icon: '/icon=192x192.png'
        })
      );
    });
  }
})();
