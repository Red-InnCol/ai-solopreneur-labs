(() => {
  'use strict';
  document.querySelectorAll('.website-activity').forEach(activity => {
    const tabs = Array.from(activity.querySelectorAll('[role="tab"]'));

    function selectTab(tab) {
      tabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
    }

    tabs.forEach(tab => tab.addEventListener('click', () => selectTab(tab)));
    activity.querySelector('[role="tablist"]').addEventListener('keydown', event => {
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
      selectTab(tabs[target]);
      tabs[target].focus();
    });
  });

  // Keep copying available when clipboard access is unavailable in an embedded browser.
  function copyUsingSelection(text, button) {
    const input = document.createElement('textarea');
    input.value = text;
    input.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
    (button.closest('dialog') || document.body).append(input);
    input.select();
    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch {
      copied = false;
    } finally {
      input.remove();
      button.focus({preventScroll: true});
    }
    return copied;
  }

  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy-prompt]');
    if (!button) return;
    const source = document.getElementById(button.dataset.copyPrompt);
    if (!source) return;
    const prompt = source.textContent;
    let copied = false;
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(prompt);
      copied = true;
    } catch {
      copied = copyUsingSelection(prompt, button);
    } finally {
      button.disabled = false;
    }
    const label = button.querySelector('[data-copy-label]');
    const status = button.parentElement.querySelector('[data-copy-status]') ||
      button.closest('[role="tabpanel"]')?.querySelector('[data-copy-status]');
    const idleLabel = label?.dataset.idleLabel || label?.textContent || 'Copy prompt';
    if (label) label.dataset.idleLabel = idleLabel;
    if (label) label.textContent = copied ? 'Copied!' : 'Select and copy';
    if (status) status.textContent = copied ? 'Prompt copied to your clipboard.' : 'Select the prompt text and copy it.';
    if (!copied) {
      const range = document.createRange();
      range.selectNodeContents(source);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    setTimeout(() => {
      if (label) label.textContent = idleLabel;
    }, 2000);
  });
})();
