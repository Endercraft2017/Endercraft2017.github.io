/* Authored AFK³ progressive enhancement. Native animation; no hidden initial state. */
(function () {
  'use strict';
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  var active = new Map();
  function stop() { active.forEach(function (animation) { animation.cancel(); }); active.clear(); }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var element = entry.target;
      observer.unobserve(element);
      if (preference.matches || element.contains(document.activeElement)) return;
      var index = Array.prototype.indexOf.call(element.parentNode.children, element);
      var animation = element.animate([
        { opacity: 0.72, transform: 'translateY(10px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: 420, delay: Math.min(index * 55, 110), easing: 'cubic-bezier(.22,1,.36,1)' });
      active.set(element, animation);
      animation.finished.then(function () { active.delete(element); }, function () { active.delete(element); });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  document.querySelectorAll('.engagement-map, .choice-grid .path-card, .journey-steps li, .services .scard, .products .product-card').forEach(function (element) { observer.observe(element); });
  document.addEventListener('focusin', function (event) { active.forEach(function (animation, element) { if (element.contains(event.target)) { animation.cancel(); active.delete(element); } }); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });
  if (preference.addEventListener) preference.addEventListener('change', function () { if (preference.matches) stop(); });
}());
