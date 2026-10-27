/* Original, dependency-free product carousel. Captures are demonstrations, never a live ERP session. */
(function () {
  'use strict';
  document.querySelectorAll('[data-product-showcase]').forEach(function (root) {
    if (root.dataset.showcaseReady) return;
    var buttons = Array.from(root.querySelectorAll('[data-tour-screen]'));
    var stage = root.querySelector('[data-tour-media]');
    var figure = root.querySelector('.tour-figure');
    var original = stage && stage.querySelector('img');
    var play = root.querySelector('[data-showcase-play]');
    if (!buttons.length || !original || !figure || !play) return;
    var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    var status = root.querySelector('[data-tour-status]');
    var feedback = root.querySelector('[data-showcase-feedback]');
    var inquiry = root.querySelector('[data-tour-inquiry]');
    var held = preference.matches;
    var visible = false;
    var hovering = false;
    var active = 0;
    var request = 0;
    var pending = false;
    var timer = null;
    var progressAnimation = null;
    var pointerPlayIntent;
    var progress = root.querySelector('.showcase-progress > span');
    var delay = 5500;
    var loaded = new Set();
    var slides = buttons.map(function (button, index) {
      var slide = document.createElement('div');
      slide.className = 'showcase-slide';
      slide.dataset.showcaseSlide = button.dataset.tourScreen;
      slide.dataset.device = button.dataset.tourDevice || 'desktop';
      var image = index === 0 ? original : new Image();
      image.src = button.dataset.tourImage;
      image.alt = button.dataset.tourAlt || button.textContent.trim();
      image.width = Number(button.dataset.tourWidth) || 1440;
      image.height = Number(button.dataset.tourHeight) || 960;
      image.loading = index < 2 || index === buttons.length - 1 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      slide.appendChild(image);
      stage.appendChild(slide);
      return slide;
    });
    function announce(message) { if (status) status.textContent = message; }
    function clearTimer() {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
      if (progressAnimation) { progressAnimation.cancel(); progressAnimation = null; }
      root.removeAttribute('data-showcase-running');
    }
    function sync() {
      clearTimer();
      var reduced = preference.matches;
      root.dataset.showcaseMotion = reduced ? 'reduced' : 'full';
      var state = reduced ? 'reduced' : held ? 'paused' : visible && !hovering && !document.hidden && !pending ? 'running' : 'waiting';
      root.dataset.showcaseState = state;
      play.disabled = reduced;
      play.setAttribute('aria-label', reduced ? 'Automatic slideshow disabled by reduced motion preference' : held ? 'Play automatic slideshow' : 'Pause automatic slideshow');
      root.querySelector('[data-showcase-play-label]').textContent = held || reduced ? 'Play' : 'Pause';
      root.querySelector('[data-showcase-play-icon]').textContent = held || reduced ? '▷' : 'Ⅱ';
      var stateLabel = root.querySelector('[data-showcase-state-label]');
      if (stateLabel) stateLabel.textContent = reduced ? 'Reduced motion' : held ? 'Paused — explore at your pace' : 'Automatic tour';
      if (state !== 'running') return;
      root.setAttribute('data-showcase-running', '');
      if (progress && progress.animate) {
        progressAnimation = progress.animate([{transform: 'scaleX(0)'}, {transform: 'scaleX(1)'}], {duration: delay, easing: 'linear', fill: 'both'});
      }
      timer = window.setTimeout(function () { timer = null; select((active + 1) % buttons.length, 'auto'); }, delay);
    }
    function stop() { held = true; sync(); }
    function render(index, source) {
      active = index;
      var button = buttons[index];
      root.dataset.showcaseSource = source;
      slides.forEach(function (slide, i) {
        var distance = (i - index + slides.length) % slides.length;
        if (distance > slides.length / 2) distance -= slides.length;
        slide.dataset.position = distance === 0 ? 'active' : distance === -1 ? 'previous' : distance === 1 ? 'next' : 'away';
        slide.setAttribute('aria-hidden', String(i !== index));
        slide.inert = i !== index;
        var image = slide.querySelector('img');
        if (i === index) image.setAttribute('data-tour-image', '');
        else image.removeAttribute('data-tour-image');
      });
      buttons.forEach(function (item, i) { item.setAttribute('aria-pressed', String(i === index)); });
      stage.dataset.device = button.dataset.tourDevice || 'desktop';
      figure.querySelector('[data-tour-title]').textContent = button.dataset.tourTitle;
      figure.querySelector('[data-tour-description]').textContent = button.dataset.tourDescription;
      root.querySelector('[data-tour-full]').href = button.dataset.tourImage;
      var count = root.querySelector('[data-showcase-count]');
      if (count) count.textContent = (index + 1) + ' / ' + buttons.length;
      if (source === 'manual') announce('Showing ' + button.textContent.trim() + '. ' + button.dataset.tourTitle);
      root.dispatchEvent(new CustomEvent('otom:screenchange', {bubbles: true, detail: {id: button.dataset.tourScreen, title: button.dataset.tourTitle, brief: button.dataset.tourBrief || '', source: source}}));
    }
    function load(index) {
      var source = buttons[index].dataset.tourImage;
      if (loaded.has(source)) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        var image = new Image();
        var timeout = window.setTimeout(function () { finish(false); }, 10000);
        var done = false;
        function finish(ok) {
          if (done) return;
          done = true;
          window.clearTimeout(timeout);
          image.onload = image.onerror = null;
          if (ok) { loaded.add(source); slides[index].querySelector('img').src = source; resolve(); }
          else reject(new Error('Image unavailable'));
        }
        image.onload = function () { finish(image.naturalWidth > 0); };
        image.onerror = function () { finish(false); };
        image.src = source;
      });
    }
    function select(index, source, instant) {
      if (source === 'manual') held = true;
      root.dataset.showcaseInstant = String(Boolean(instant));
      clearTimer();
      if (index === active && !pending) { sync(); return; }
      var token = ++request;
      pending = true;
      figure.setAttribute('aria-busy', 'true');
      if (inquiry) inquiry.disabled = true;
      if (feedback) { feedback.hidden = true; feedback.textContent = ''; }
      if (source === 'manual') announce('Loading ' + buttons[index].textContent.trim() + ' screen.');
      sync();
      load(index).then(function () {
        if (token !== request) return;
        pending = false;
        render(index, source);
        figure.setAttribute('aria-busy', 'false');
        if (inquiry) inquiry.disabled = false;
        sync();
      }).catch(function () {
        if (token !== request) return;
        pending = false;
        held = true;
        figure.setAttribute('aria-busy', 'false');
        if (inquiry) inquiry.disabled = false;
        var message = 'That screen could not be loaded. The previous view is still shown. Select a screen to try again.';
        if (feedback) { feedback.textContent = message; feedback.hidden = false; }
        announce(message);
        sync();
      });
    }
    buttons.forEach(function (button, index) { button.addEventListener('click', function (event) { select(index, 'manual', event.detail === 0); }); });
    root.querySelector('[data-showcase-prev]').addEventListener('click', function (event) { select((active - 1 + buttons.length) % buttons.length, 'manual', event.detail === 0); });
    root.querySelector('[data-showcase-next]').addEventListener('click', function (event) { select((active + 1) % buttons.length, 'manual', event.detail === 0); });
    play.addEventListener('pointerdown', function () { pointerPlayIntent = held; });
    play.addEventListener('pointercancel', function () { pointerPlayIntent = undefined; });
    play.addEventListener('keydown', function () { pointerPlayIntent = undefined; });
    play.addEventListener('click', function (event) {
      if (preference.matches) return;
      held = !(typeof pointerPlayIntent === 'boolean' ? pointerPlayIntent : held);
      pointerPlayIntent = undefined;
      announce(held ? 'Automatic slideshow paused.' : 'Automatic slideshow playing.');
      sync();
    });
    root.addEventListener('focusin', stop);
    root.addEventListener('pointerenter', function (event) { if (event.pointerType === 'mouse' || !event.pointerType) { hovering = true; sync(); } });
    root.addEventListener('pointerleave', function () { hovering = false; sync(); });
    root.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.target.closest('input,textarea,select')) return;
      event.preventDefault();
      select((active + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length, 'manual', true);
    });
    var touch = null;
    stage.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
      touch = {id: event.pointerId, x: event.clientX, y: event.clientY};
    });
    stage.addEventListener('pointerup', function (event) {
      if (!touch || touch.id !== event.pointerId) return;
      var x = event.clientX - touch.x;
      var y = event.clientY - touch.y;
      touch = null;
      if (Math.abs(x) >= 45 && Math.abs(x) > Math.abs(y) * 1.5) select((active + (x < 0 ? 1 : -1) + buttons.length) % buttons.length, 'manual');
    });
    stage.addEventListener('pointercancel', function () { touch = null; });
    document.addEventListener('visibilitychange', sync);
    window.addEventListener('pagehide', clearTimer);
    window.addEventListener('pageshow', sync);
    function motionChanged() { held = true; sync(); }
    if (preference.addEventListener) preference.addEventListener('change', motionChanged);
    else if (preference.addListener) preference.addListener(motionChanged);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.35; sync(); }, {threshold: [0, 0.35]}).observe(stage);
    }
    root.dataset.showcaseReady = 'true';
    root.querySelector('[data-tour-controls]').hidden = false;
    root.querySelector('[data-showcase-transport]').hidden = false;
    if (inquiry) inquiry.hidden = false;
    var fallback = root.querySelector('[data-tour-fallback]');
    if (fallback) fallback.hidden = true;
    if (original.complete && original.naturalWidth) loaded.add(buttons[0].dataset.tourImage);
    original.addEventListener('error', function () { announce('The attendance image is unavailable. Choose another screen or request a guided demonstration.'); });
    render(0, 'initial');
    sync();
  });
})();
