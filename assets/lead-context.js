/* Shared marketing provenance only. Never store names, emails, credentials or client data. */
(function () {
  'use strict';
  var KEYS = {utm_source:'s',utm_medium:'m',utm_campaign:'c',ref:'r'};
  var ALLOWED = /^[A-Za-z0-9_-]{1,40}$/;
  var STORAGE = 'afk3_acquisition_v1';
  var params = new URLSearchParams(window.location.search), context = {}, errors = [];
  var stored = {};
  try { stored = JSON.parse(sessionStorage.getItem(STORAGE) || '{}'); } catch (_) { stored = {}; }
  if (!stored || Array.isArray(stored) || typeof stored !== 'object') stored = {};
  Object.keys(KEYS).forEach(function (key) {
    var k = KEYS[key], incoming = params.get(key);
    if (typeof stored[k] === 'string' && ALLOWED.test(stored[k])) context[k] = stored[k];
    if (incoming !== null) {
      if (!ALLOWED.test(incoming)) errors.push(key + ' must contain 1–40 letters, digits, underscores or hyphens.');
      else if (!context[k]) context[k] = incoming;
    }
  });
  try { sessionStorage.setItem(STORAGE, JSON.stringify(context)); } catch (_) { /* Links/hidden fields retain this page's source. */ }
  function serialize(intent) {
    var data = Object.assign({}, context, {i:intent || 'workflow'});
    if (!ALLOWED.test(data.i)) throw new Error('Invalid inquiry type.');
    var json = JSON.stringify(data);
    if (json.length > 236) throw new Error('Campaign details exceed the supported limit.');
    if (errors.length) throw new Error(errors.join(' '));
    return json;
  }
  function decorate() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var raw = a.getAttribute('href');
      if (!raw || raw[0] === '#' || /^(mailto:|tel:)/i.test(raw)) return;
      var url; try { url = new URL(raw, window.location.href); } catch (_) { return; }
      var own = url.origin === window.location.origin;
      var marketing = /^(afkcube\.com|otom\.afkcube\.com)$/.test(url.hostname);
      if ((!own && !marketing) || !/^https?:$/.test(url.protocol)) return;
      if (/^\/(api|site|sandbox|_platform|m)(\/|$)/.test(url.pathname)) return;
      if (errors.length) return;
      Object.keys(KEYS).forEach(function (key) { if (context[KEYS[key]]) url.searchParams.set(key,context[KEYS[key]]); });
      // Relative on-site URLs remain portable to the local preview.
      a.href = own ? url.pathname + url.search + url.hash : url.href;
    });
  }
  function display() {
    var form = document.querySelector('[data-acquisition-form]') || document.getElementById('contact-form');
    if (!form) return;
    var details = document.createElement('details'); details.className='attribution-status';
    var summary = document.createElement('summary');summary.textContent='Referral and campaign details';
    var line = document.createElement('p');line.textContent=Object.keys(context).length ? JSON.stringify(context) : 'No campaign or referral code supplied.';
    var help = document.createElement('p');help.textContent='Codes identify the source of an inquiry. Referral credit is confirmed separately with AFK³. If a code is wrong, mention the correction in your message.';
    details.append(summary,line,help);form.appendChild(details);
    if (errors.length) {
      var error=document.createElement('p');error.setAttribute('role','alert');error.className='attribution-error';error.textContent=errors.join(' ');
      var clean=document.createElement('a');clean.href=window.location.pathname;clean.textContent='Continue without invalid campaign parameters';
      error.append(document.createTextNode(' '),clean);form.prepend(error);
    }
  }
  window.AFKLead = {serialize:serialize,errors:errors.slice(),decorate:decorate,context:Object.assign({},context)};
  decorate();display();
})();
