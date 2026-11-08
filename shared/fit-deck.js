(() => {
  const frame = document.getElementById('presentation');
  const deck = new URL('deck.html', location.href);
  deck.search = location.search;
  deck.hash = location.hash;
  if (deck.searchParams.has('print')) {
    location.replace(deck);
    return;
  }

  // Render the designed slide canvas once and scale it as a unit.
  function fit() {
    const viewport = document.documentElement;
    const scale = Math.min(viewport.clientWidth / 1600, viewport.clientHeight / 900);
    frame.style.setProperty('--deck-scale', String(scale));
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      frame.contentDocument.getElementById('fullscreenNotice')?.removeAttribute('hidden');
    }
  }

  frame.addEventListener('load', () => {
    const doc = frame.contentDocument;
    const active = doc.querySelector('#deck');
    if (!active) return;
    const syncHash = () => {
      const hash = frame.contentWindow.location.hash;
      if (hash && hash !== location.hash) history.replaceState(null, '', hash);
    };
    new MutationObserver(syncHash).observe(active, {
      attributes: true, attributeFilter: ['class'], subtree: true
    });
    syncHash();
    doc.addEventListener('keydown', event => {
      if (event.key.toLowerCase() !== 'f' || event.metaKey || event.ctrlKey || event.altKey ||
          event.target.closest?.('input, textarea, [contenteditable]')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleFullscreen();
    }, true);
    doc.addEventListener('click', event => {
      if (!event.target.closest?.('#fullscreenButton')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      toggleFullscreen();
    }, true);
  });

  window.addEventListener('resize', fit);
  window.addEventListener('hashchange', () => {
    const number = location.hash.match(/^#slide-(\d+)$/)?.[1] || '1';
    const slides = [...(frame.contentDocument?.querySelectorAll('#progress button') || [])];
    slides.find(button => button.title.startsWith(number + '.'))?.click();
  });
  document.addEventListener('fullscreenchange', () => {
    fit();
    const button = frame.contentDocument?.getElementById('fullscreenButton');
    if (button) button.textContent = document.fullscreenElement ? 'Exit full screen' : 'Full screen';
  });
  document.addEventListener('keydown', event => {
    const id = {ArrowLeft: 'previous', ArrowRight: 'next'}[event.key];
    if (id) {
      event.preventDefault();
      frame.contentDocument?.getElementById(id)?.click();
    }
    if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !event.altKey) toggleFullscreen();
  });
  fit();
  frame.src = deck.href;
})();
