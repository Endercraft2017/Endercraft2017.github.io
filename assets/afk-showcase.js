/* Carry an allowlisted screen choice into the existing inquiry form. */
(function () {
  'use strict';
  var allowed = ['attendance', 'payroll', 'mobile', 'inventory', 'production', 'sales'];
  document.querySelectorAll('[data-product-showcase]').forEach(function (root) {
    var link = root.querySelector('[data-afk-showcase-inquiry]');
    if (!link) return;
    function update(id) {
      if (allowed.indexOf(id) < 0) return;
      var url;
      try { url = new URL(link.getAttribute('href'), window.location.href); } catch (_) { return; }
      url.searchParams.set('screen', id);
      link.setAttribute('href', url.pathname + url.search + url.hash);
      if (window.AFKLead) window.AFKLead.decorate();
    }
    root.addEventListener('otom:screenchange', function (event) {
      if (event.detail) update(event.detail.id);
    });
    var active = root.querySelector('[data-tour-screen][aria-pressed=true]');
    if (active) update(active.dataset.tourScreen);
  });
}());
