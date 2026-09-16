/* =====================================================================
   AFK³ Solutions — interactions
   Vanilla JS. Every effect degrades cleanly and respects reduced motion.
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- Footer year ---------- */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Sticky header state ---------- */
  var header = $("#siteHeader");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  var navToggle = $("#navToggle");
  var navMenu = $("#navMenu");
  if (navToggle && navMenu) {
    var setNav = function (open) {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("is-open", open);
      document.body.style.overflow = open && window.innerWidth <= 900 ? "hidden" : "";
    };
    navToggle.addEventListener("click", function () {
      setNav(navToggle.getAttribute("aria-expanded") !== "true");
    });
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setNav(false);
    });
  }

  /* ---------- Reveal on scroll (Level 2 entrance) ---------- */
  var revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revObserver.observe(el); });
  }

  /* ---------- Generic "add class when in view" helper ---------- */
  function whenInView(el, cb, opts) {
    if (!el) return;
    if (reduceMotion || !("IntersectionObserver" in window)) { cb(); return; }
    var o = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { cb(); o.unobserve(entry.target); }
      });
    }, opts || { threshold: 0.35 });
    o.observe(el);
  }

  /* ---------- Hero load sequence ---------- */
  var hero = $(".hero");
  if (hero) {
    if (reduceMotion) {
      hero.classList.add("is-ready");
    } else {
      window.requestAnimationFrame(function () {
        window.setTimeout(function () { hero.classList.add("is-ready"); }, 120);
      });
    }
  }

  /* ---------- Hero flow card: live pipeline loop ----------
     A signal pulse walks New request -> Intake -> Workflow -> Completed on a
     loop: each connector charges, each node lights as the pulse lands, then it
     restarts. Driven from JS so the pulse stays aligned with nodes of differing
     height. Runs only while the card is on screen; stays put under reduced motion
     (the CSS above already neutralises every flow-card animation in that case). */
  var flowcard = $("#flowcard");
  if (flowcard && hero && !reduceMotion) {
    var fNodes = $$(".fnode", flowcard);
    var fLines = $$(".fline", flowcard);
    var fPacket = $("#heroPacket");
    var fIdx = 0;
    var fTimer = null;
    var fRunning = false;
    var fStarted = false;
    var STEP_MS = 950;

    var placePacket = function (node) {
      if (!fPacket || !node) return;
      var y = node.offsetTop + node.offsetHeight / 2 - 4.5;
      fPacket.style.transform = "translate(-50%, " + y + "px)";
    };

    /* Motion trail: sample the packet's rendered position each frame and set the
       trail length from its speed, so it stretches while moving and retracts to
       nothing at rest. */
    var trailRAF = null;
    var setTrail = function (len, opacity) {
      if (!fPacket) return;
      fPacket.style.setProperty("--trail", len + "px");
      fPacket.style.setProperty("--trail-o", String(opacity));
    };
    var readPacketY = function () {
      var m = /matrix(3d)?\(([^)]+)\)/.exec(window.getComputedStyle(fPacket).transform);
      if (!m) return 0;
      var parts = m[2].split(",");
      return parseFloat(m[1] ? parts[13] : parts[5]) || 0;
    };
    var runTrail = function () {
      if (!fPacket || !window.requestAnimationFrame) return;
      window.cancelAnimationFrame(trailRAF);
      var t0 = window.performance && performance.now ? performance.now() : Date.now();
      var lastY = readPacketY(), lastT = t0, stillFrames = 0;
      var step = function (now) {
        var y = readPacketY();
        var dy = y - lastY;
        var v = Math.abs(dy) / (now - lastT || 16);   /* px per ms */
        lastY = y; lastT = now;
        /* keep the trail on the side the dot came from: above when heading
           down the pipe, below on the upward loop back to the top */
        if (Math.abs(dy) > 0.3) {
          fPacket.style.setProperty("--trail-sy", dy > 0 ? "-1" : "1");
        }
        stillFrames = v < 0.015 ? stillFrames + 1 : 0;
        if (stillFrames < 4 && now - t0 < 1000) {
          setTrail(Math.min(46, v * 85).toFixed(1), Math.min(0.8, v * 1.5).toFixed(2));
          trailRAF = window.requestAnimationFrame(step);
        } else {
          setTrail(0, 0);
        }
      };
      trailRAF = window.requestAnimationFrame(step);
    };

    var fTick = function () {
      var node = fNodes[fIdx];
      fNodes.forEach(function (n) { if (n !== node) n.classList.remove("is-lit"); });

      /* charge the connector leading into this node */
      var line = fIdx > 0 ? fLines[fIdx - 1] : null;
      if (line) {
        line.classList.remove("is-charged");
        void line.offsetWidth;              /* restart the keyframe */
        line.classList.add("is-charged");
      }

      placePacket(node);
      runTrail();
      node.classList.add("is-lit");

      var last = fIdx === fNodes.length - 1;
      fIdx = last ? 0 : fIdx + 1;
      fTimer = window.setTimeout(fTick, last ? Math.round(STEP_MS * 2.2) : STEP_MS);
    };

    var fStart = function () {
      if (fRunning || !fNodes.length) return;
      fRunning = true;
      fIdx = 0;
      flowcard.classList.add("is-live");
      fTimer = window.setTimeout(fTick, fStarted ? 200 : 1100);
      fStarted = true;
    };
    var fStop = function () {
      fRunning = false;
      window.clearTimeout(fTimer);
      if (window.cancelAnimationFrame) window.cancelAnimationFrame(trailRAF);
      setTrail(0, 0);
      fNodes.forEach(function (n) { n.classList.remove("is-lit"); });
      fLines.forEach(function (l) { l.classList.remove("is-charged"); });
    };

    var fInView = function () {
      var r = flowcard.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.bottom > 0 && r.top < vh;
    };

    if ("IntersectionObserver" in window) {
      var fObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { fStart(); }
          else if (!fInView()) { fStop(); }
        });
      }, { threshold: 0 });
      fObs.observe(flowcard);
    }
    /* Belt and braces: start now if the card is already on screen, in case the
       observer is slow to deliver its first entry. */
    if (fInView()) { fStart(); }

    var fResizeTimer = null;
    window.addEventListener("resize", function () {
      if (!fRunning) return;
      window.clearTimeout(fResizeTimer);
      fResizeTimer = window.setTimeout(function () {
        var lit = flowcard.querySelector(".fnode.is-lit");
        if (lit) placePacket(lit);
      }, 150);
    }, { passive: true });
  }

  /* ---------- Hero cursor glow (desktop only) ---------- */
  var glow = $("#cursorGlow");
  if (glow && hero && finePointer && !reduceMotion) {
    var raf = null, gx = 0, gy = 0;
    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      gx = e.clientX - rect.left;
      gy = e.clientY - rect.top;
      glow.style.opacity = "1";
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        glow.style.transform = "translate(" + gx + "px," + gy + "px)";
        raf = null;
      });
    });
    hero.addEventListener("pointerleave", function () { glow.style.opacity = "0"; });
  }

  /* ---------- Problem grid: scatter -> organized ---------- */
  var probGrid = $("#probGrid");
  whenInView(probGrid, function () { probGrid.classList.add("is-organized"); }, { threshold: 0.4 });

  /* ---------- MVP visual ---------- */
  var mvpViz = $(".mvp__viz");
  whenInView(mvpViz, function () { mvpViz.classList.add("is-in"); });

  /* ---------- How We Work: activate steps as they enter ---------- */
  var steps = $$("#steps .step");
  if (steps.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      steps.forEach(function (s) { s.classList.add("is-active"); });
    } else {
      var stepObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            stepObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      steps.forEach(function (s) { stepObs.observe(s); });
    }
  }

  /* ---------- AFK³ model: accordion + scroll progress ---------- */
  var stageBtns = $$(".stage__btn");
  stageBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      stageBtns.forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
        var p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) p.hidden = true;
      });
      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.hidden = false;
      }
    });
  });

  var modelTrack = $("#modelTrack");
  var modelProgress = $("#modelProgress");
  var stages = $$(".stage");
  if (modelTrack && stages.length) {
    if (reduceMotion) {
      stages.forEach(function (s) { s.classList.add("is-active"); });
      if (modelProgress) modelProgress.style.setProperty("--model-fill", "100%");
    } else {
      var updateModel = function () {
        var rect = modelTrack.getBoundingClientRect();
        var vh = window.innerHeight;
        var progress = (vh * 0.75 - rect.top) / (rect.height + vh * 0.25);
        progress = Math.max(0, Math.min(1, progress));
        if (modelProgress) modelProgress.style.setProperty("--model-fill", (progress * 100).toFixed(1) + "%");
        var activeCount = Math.round(progress * stages.length);
        stages.forEach(function (s, i) { s.classList.toggle("is-active", i < activeCount); });
      };
      updateModel();
      window.addEventListener("scroll", updateModel, { passive: true });
      window.addEventListener("resize", updateModel);
    }
  }

  /* ---------- Before / After toggle ---------- */
  var baOpts = $$(".ba__opt");
  var baPanels = $$(".ba__panel");
  baOpts.forEach(function (opt) {
    opt.addEventListener("click", function () {
      var view = opt.getAttribute("data-view");
      baOpts.forEach(function (o) {
        var on = o === opt;
        o.classList.toggle("is-active", on);
        o.setAttribute("aria-pressed", String(on));
      });
      baPanels.forEach(function (p) {
        var on = p.getAttribute("data-panel") === view;
        p.classList.toggle("is-active", on);
        p.hidden = !on;
      });
    });
  });

  /* ---------- Contact form ----------
     Posts JSON to /api/contact (a Vercel serverless function that emails via Resend).
     The custom success / error UI is kept; the form still degrades to a normal POST
     without JS, and the function redirects those back to ?sent=1. */
  var form = $("#inquiryForm");
  if (form) {
    var successBox = $("#formSuccess");
    var messageBox = $("#formMessage");
    var submitBtn = form.querySelector('button[type="submit"]');
    var ENDPOINT = form.getAttribute("action") || "/api/contact";

    var setMessage = function (text, kind) {
      if (!messageBox) return;
      messageBox.textContent = text || "";
      messageBox.hidden = !text;
      messageBox.className = "form__message" + (kind ? " form__message--" + kind : "");
    };

    var showSuccess = function () {
      if (submitBtn) submitBtn.textContent = "Sent";
      form.querySelectorAll("input, select, textarea, button").forEach(function (el) { el.disabled = true; });
      setMessage("");
      if (successBox) {
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        if (successBox.focus) successBox.focus();
      }
    };

    /* Came back from a no-JS submit */
    if (/[?&]sent=1(&|$)/.test(window.location.search)) showSuccess();

    var showError = function (input, msg) {
      var box = form.querySelector('[data-error-for="' + input.id + '"]');
      if (box) box.textContent = msg || "";
      input.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    var validateField = function (input) {
      var val = (input.value || "").trim();
      if (input.hasAttribute("required") && !val) { showError(input, "This field is required."); return false; }
      if (input.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        showError(input, "Enter a valid email address."); return false;
      }
      if (input.type === "url" && val && !/^https?:\/\/.+/i.test(val)) {
        showError(input, "Include http:// or https://"); return false;
      }
      showError(input, "");
      return true;
    };

    /* Any required field, plus email/url fields for format checks — generic so
       this wires up the business form (contact.html, small-business.html) and
       the lighter-weight student form (students.html) without per-field IDs. */
    var fields = $$('input[required], select[required], textarea[required], input[type="email"], input[type="url"]', form);
    fields.forEach(function (f) {
      f.addEventListener("blur", function () { validateField(f); });
      f.addEventListener("input", function () {
        if (f.getAttribute("aria-invalid") === "true") validateField(f);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      setMessage("");
      var ok = true;
      fields.forEach(function (f) { if (!validateField(f)) ok = false; });
      if (!ok) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        setMessage("Please fix the highlighted fields.", "error");
        return;
      }

      /* Build the payload — multiple "need" checkboxes collapse into an array. */
      var data = {};
      new FormData(form).forEach(function (v, k) {
        if (k === "need") { (data.need = data.need || []).push(v); }
        else { data[k] = v; }
      });

      var original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (body) {
            return { ok: res.ok, status: res.status, body: body };
          });
        })
        .then(function (r) {
          if (r.ok) { showSuccess(); return; }
          /* Server responded with an error — surface its message (validation, rate limit, …). */
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = original; }
          var msg = (r.body && (r.body.error || r.body.message)) ||
            (r.status === 429
              ? "Too many attempts. Please try again in a few minutes."
              : "Something went wrong (" + r.status + "). Please email contact@afkcube.com.");
          setMessage(msg, "error");
        })
        .catch(function (err) {
          /* Never reached the server (offline, blocked, DNS). */
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = original; }
          setMessage("Couldn't reach the server. Please email us directly at contact@afkcube.com.", "error");
          if (window.console) console.error("[AFK³] contact form failed:", err);
        });
    });
  }

  /* ---------- "Go AFK" easter egg ---------- */
  var afkToggle = $("#afkToggle");
  var afkToast = $("#afkToast");
  var afkTimer = null;
  if (afkToggle) {
    afkToggle.addEventListener("click", function () {
      var going = !document.body.classList.contains("is-afk");
      document.body.classList.toggle("is-afk", going);
      afkToggle.textContent = going ? "Come back" : "Go AFK";
      if (afkToast) {
        window.clearTimeout(afkTimer);
        if (going) {
          afkToast.hidden = false;
          window.requestAnimationFrame(function () { afkToast.classList.add("is-show"); });
          afkTimer = window.setTimeout(function () {
            afkToast.classList.remove("is-show");
            window.setTimeout(function () { afkToast.hidden = true; }, 350);
          }, 2600);
        } else {
          afkToast.classList.remove("is-show");
          window.setTimeout(function () { afkToast.hidden = true; }, 350);
        }
      }
    });
  }
})();
