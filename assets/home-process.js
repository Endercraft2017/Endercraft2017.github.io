/* AFK³'s real delivery method, progressively enhanced with manual selection. */
(function () {
  'use strict';
  var root = document.querySelector('[data-process-explorer]');
  if (!root) return;
  var items = Array.from(root.querySelectorAll('.engagement-map__steps li'));
  var panel = root.querySelector('[data-process-panel]');
  var title = root.querySelector('[data-process-title]');
  var description = root.querySelector('[data-process-description]');
  if (!panel || !title || !description || items.length !== 3) return;
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var running;
  var content = [
    ['Start with one real process.', 'Bring the current spreadsheet, form or handoff. We identify the inputs, people and point where work gets stuck.'],
    ['Build the agreed next step.', 'Choose a focused system or connection around that process. Confirm the scope and acceptance checks before implementation.'],
    ['Test it with your team.', 'Check the agreed outputs together, resolve issues, and hand over the workflow with usable guidance.']
  ];
  var buttons = items.map(function (item, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'engagement-map__step';
    button.setAttribute('aria-controls', panel.id);
    button.setAttribute('aria-pressed', String(index === 0));
    var copy = item.querySelector('div');
    if (copy) {
      var inlineCopy = document.createElement('span');
      inlineCopy.className = 'engagement-map__step-copy';
      while (copy.firstChild) inlineCopy.appendChild(copy.firstChild);
      copy.replaceWith(inlineCopy);
    }
    while (item.firstChild) button.appendChild(item.firstChild);
    item.appendChild(button);
    button.addEventListener('click', function () {
      if (button.getAttribute('aria-pressed') === 'true') return;
      if (running) running.cancel();
      buttons.forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
      panel.setAttribute('aria-live', 'polite');
      title.textContent = content[index][0];
      description.textContent = content[index][1];
      if (!preference.matches && panel.animate) {
        running = panel.animate([{opacity: 0.8, transform: 'translateY(4px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 180, easing: 'cubic-bezier(.2,0,0,1)'});
      }
    });
    return button;
  });
  root.classList.add('process-ready');
  if (preference.addEventListener) preference.addEventListener('change', function () { if (preference.matches && running) running.cancel(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden && running) running.cancel(); });
}());
