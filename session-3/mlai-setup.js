(() => {
  'use strict';
  const setup = document.querySelector('.mlai-setup');
  if (!setup) return;
  const tabs = Array.from(setup.querySelectorAll('[role="tab"]'));
  const tablist = setup.querySelector('[role="tablist"]');
  function select(tab) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
  }
  tabs.forEach(tab => tab.addEventListener('click', () => select(tab)));
  tablist.addEventListener('keydown', event => {
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') target = 0;
    else if (event.key === 'End') target = tabs.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    select(tabs[target]);
    tabs[target].focus();
  });
})();
