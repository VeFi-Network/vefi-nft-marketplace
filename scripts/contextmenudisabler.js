(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('contextmenu', ev => {
      ev.preventDefault();
      return false;
    });
  }
})();
