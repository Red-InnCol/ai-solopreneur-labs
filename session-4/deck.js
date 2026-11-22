(() => {
  'use strict';
  const get = id => document.getElementById(id);
  const stage = get('stage');
  const space = stage.parentElement;
  const slides = Array.from(stage.children).filter(slide => slide.classList.contains('lab-slide'));
  const progress = get('progress');
  const overview = get('overview');
  const grid = get('overview-grid');
  const notes = get('notes');
  const notice = get('fullscreen-notice');
  const screenButton = get('fullscreen-button');
  if (!slides.length) return;

  const titles = slides.map((slide, i) => slide.dataset.title || slide.querySelector('h1,h2,.lab-title')?.textContent.trim() || 'Slide ' + (i + 1));
  const dots = [];
  const cards = [];
  let current = -1;
  let noticeTimer;

  function fitStage() {
    const scale = Math.min(space.clientWidth / 1440, space.clientHeight / 810);
    stage.style.setProperty('--deck-scale', String(scale));
  }
  fitStage();
  if ('ResizeObserver' in window) new ResizeObserver(fitStage).observe(space);
  window.addEventListener('resize', fitStage);

  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', (i + 1) + ' of ' + slides.length + '. ' + titles[i]);
    slide.hidden = true;
    const description = (i + 1) + '. ' + titles[i];
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.title = description;
    dot.setAttribute('aria-label', 'Go to slide ' + description);
    dot.addEventListener('click', () => go(i));
    progress.append(dot);
    dots.push(dot);

    const card = document.createElement('button');
    const number = document.createElement('b');
    const title = document.createElement('span');
    number.textContent = String(i + 1).padStart(2, '0');
    title.textContent = titles[i];
    card.type = 'button';
    card.append(number, title);
    card.addEventListener('click', () => {
      overview.close();
      go(i);
    });
    grid.append(card);
    cards.push(card);
  });

  function buildNotes() {
    const slide = slides[current];
    const title = titles[current];
    get('notes-number').textContent = 'SLIDE ' + (current + 1) + ' / ' + slides.length;
    get('notes-title').textContent = title;
    const transcriptNode = slide.querySelector('[data-transcript]');
    let transcript = slide.dataset.transcript || transcriptNode?.dataset.transcript || transcriptNode?.textContent;
    if (!transcript) {
      const readable = slide.cloneNode(true);
      readable.querySelectorAll('footer,.lab-folio,[role="tablist"],button,[aria-hidden="true"],script,style,defs,desc').forEach(node => node.remove());
      readable.querySelectorAll('img').forEach(node => node.replaceWith(node.alt ? node.alt + '\n' : ''));
      readable.querySelectorAll('br').forEach(node => node.replaceWith(' '));
      readable.querySelectorAll('h1,h2,h3,p,li,div,text,figcaption').forEach(node => node.append('\n'));
      transcript = readable.textContent;
    }
    const lines = transcript.split(/\n/).map(line => line.trim()).filter(Boolean);
    if (lines[0]?.toLowerCase() === title.toLowerCase()) lines.shift();
    const content = get('notes-text');
    content.replaceChildren();
    for (const line of lines) {
      const paragraph = document.createElement('p');
      if (['Slide Objective', 'Concept Explanations', 'Notes', 'Sources'].includes(line)) {
        const strong = document.createElement('strong');
        strong.textContent = line;
        paragraph.append(strong);
      } else {
        const url = line.match(/https?:\/\/[^\s]+$/);
        if (url) {
          const link = document.createElement('a');
          link.href = url[0];
          link.textContent = line.slice(0, url.index).replace(/:\s*$/, '') || url[0];
          link.target = '_blank';
          link.rel = 'noopener';
          paragraph.append(link);
        } else paragraph.textContent = line;
      }
      content.append(paragraph);
    }
    get('reader-previous').disabled = current === 0;
    get('reader-next').disabled = current === slides.length - 1;
    notes.scrollTop = 0;
  }

  function show(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (target === current) return;
    const focusDot = progress.contains(document.activeElement);
    current = target;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.hidden = !active;
      slide.classList.toggle('active', active);
      dots[i].tabIndex = active ? 0 : -1;
      if (active) {
        dots[i].setAttribute('aria-current', 'step');
        cards[i].setAttribute('aria-current', 'step');
      } else {
        dots[i].removeAttribute('aria-current');
        cards[i].removeAttribute('aria-current');
      }
    });
    get('position').textContent = String(current + 1).padStart(2, '0') + ' / ' + slides.length;
    get('previous').disabled = current === 0;
    get('next').disabled = current === slides.length - 1;
    get('slide-status').textContent = 'Slide ' + (current + 1) + ' of ' + slides.length + '. ' + titles[current];
    if (notes.open) buildNotes();
    if (focusDot) dots[current].focus({preventScroll: true});
  }

  function fromUrl() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    show(match ? Number(match[1]) - 1 : 0);
    const canonical = '#slide-' + (current + 1);
    if (location.hash !== canonical) history.replaceState(null, '', canonical);
  }
  function go(index) {
    const target = Math.max(0, Math.min(slides.length - 1, index));
    if (current === target) return;
    history.pushState(null, '', '#slide-' + (target + 1));
    show(target);
  }

  function openOverview() {
    overview.showModal();
    cards[current].focus({preventScroll: true});
    cards[current].scrollIntoView({block: 'nearest'});
  }
  function openNotes() {
    buildNotes();
    notes.showModal();
  }
  function screenState() {
    const active = !!(document.fullscreenElement || document.webkitFullscreenElement);
    screenButton.setAttribute('aria-pressed', String(active));
    screenButton.textContent = active ? 'Exit full screen' : 'Full screen';
    fitStage();
  }
  async function toggleScreen() {
    const doc = document.documentElement;
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        await (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        const enter = doc.requestFullscreen || doc.webkitRequestFullscreen;
        if (!enter) throw new Error('Fullscreen unavailable');
        await enter.call(doc);
      }
      screenState();
    } catch {
      notice.textContent = 'Full screen is unavailable in this browser.';
      notice.hidden = false;
      clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => { notice.hidden = true; }, 3200);
    }
  }
  document.addEventListener('fullscreenchange', screenState);
  document.addEventListener('webkitfullscreenchange', screenState);

  get('next').addEventListener('click', () => go(current + 1));
  get('previous').addEventListener('click', () => go(current - 1));
  get('reader-next').addEventListener('click', () => go(current + 1));
  get('reader-previous').addEventListener('click', () => go(current - 1));
  get('overview-button').addEventListener('click', openOverview);
  get('notes-button').addEventListener('click', openNotes);
  screenButton.addEventListener('click', toggleScreen);
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  overview.addEventListener('close', () => get('overview-button').focus({preventScroll: true}));
  notes.addEventListener('close', () => get('notes-button').focus({preventScroll: true}));
  notes.addEventListener('click', event => {
    if (event.target === notes && event.clientX < notes.getBoundingClientRect().left) notes.close();
  });

  for (const activity of stage.querySelectorAll('.firmographic-activity')) {
    const tablist = activity.querySelector('[role="tablist"]');
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function selectTab(selected) {
      for (const tab of tabs) {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        get(tab.getAttribute('aria-controls')).hidden = !active;
      }
    }

    tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab)));
    tablist.addEventListener('keydown', event => {
      const index = tabs.indexOf(event.target);
      if (index < 0) return;
      let next;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });

    for (const copy of activity.querySelectorAll('[data-copy-prompt]')) {
      const panel = copy.closest('[role="tabpanel"]');
      const copyStatus = panel.querySelector('[data-copy-status]');
      const prompt = panel.querySelector('.activity-prompt');
      let copyTimer;
      copy.addEventListener('click', async () => {
        let copied = false;
        try {
          await navigator.clipboard.writeText(prompt.textContent);
          copied = true;
        } catch {
          const range = document.createRange();
          range.selectNodeContents(prompt);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          try {
            copied = document.execCommand('copy');
          } catch {
            // Leave the prompt selected so the participant can copy it directly.
          }
          if (copied) selection.removeAllRanges();
        }
        copy.textContent = copied ? 'Copied!' : 'Text selected';
        copyStatus.textContent = copied ? 'Prompt copied to your clipboard.' : 'Use your copy shortcut to copy the selected prompt.';
        clearTimeout(copyTimer);
        copyTimer = setTimeout(() => { copy.textContent = 'Copy prompt'; }, 2000);
      });
    }
  }

  document.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
    if (overview.open || notes.open) return;
    const key = event.key;
    if (key === ' ' && event.target.closest('button,a')) return;
    if (event.target.closest('[role="tablist"],[role="tabpanel"]') &&
        ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(key)) return;
    if (key === 'ArrowRight' || key === 'PageDown' || key === ' ' || key === 'ArrowDown') go(current + 1);
    else if (key === 'ArrowLeft' || key === 'PageUp' || key === 'ArrowUp') go(current - 1);
    else if (key === 'Home') go(0);
    else if (key === 'End') go(slides.length - 1);
    else if (key.toLowerCase() === 'o') openOverview();
    else if (key.toLowerCase() === 'n') openNotes();
    else if (key.toLowerCase() === 'f') toggleScreen();
    else return;
    event.preventDefault();
  });

  let start;
  space.addEventListener('touchstart', event => {
    start = null;
    if (event.touches.length !== 1 || event.target.closest('a,button,input')) return;
    const finger = event.touches[0];
    start = {x: finger.clientX, y: finger.clientY, id: finger.identifier};
  }, {passive: true});
  space.addEventListener('touchend', event => {
    if (!start) return;
    const finger = Array.from(event.changedTouches).find(item => item.identifier === start.id);
    if (finger) {
      const dx = finger.clientX - start.x;
      const dy = finger.clientY - start.y;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > 1.5 * Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
    }
    start = null;
  }, {passive: true});
  space.addEventListener('touchcancel', () => { start = null; }, {passive: true});
  window.addEventListener('popstate', fromUrl);
  window.addEventListener('hashchange', fromUrl);
  fromUrl();
})();
