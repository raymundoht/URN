/* =========================================================
   URN Landing – lógica: carreras, modales, formularios, WhatsApp
   ========================================================= */
(function () {
  var C = window.URN_CONFIG || {};
  var track = window.urnTrack || function () {};

  /* ---------- Datos de carreras ---------- */
  var CAREERS = [
    {
      id: "derecho", cat: "personas", name: "Licenciatura en Derecho", short: "Derecho",
      hook: "Prepárate para defender, argumentar y destacar.",
      text: "Aprende con abogados y especialistas con experiencia profesional, y desarrolla habilidades para participar en juicios orales.",
      desc: "Formamos abogados que saben argumentar y defender desde el aula. Vives el derecho como se ejerce: con casos reales, simulaciones de juicios y maestros que litigan todos los días.",
      diffs: ["Profesores abogados y especialistas en activo", "Práctica en simulaciones de juicios orales", "Desarrollo de argumentación y oratoria"],
      cta: "Quiero estudiar Derecho"
    },
    {
      id: "comunicacion", cat: "creativas", name: "Licenciatura en Comunicación", short: "Comunicación",
      hook: "De la teoría a la producción real.",
      text: "Desarrolla tus habilidades en estudios de televisión, radio y laboratorios de marketing digital.",
      desc: "Crea contenido desde el primer semestre. Produce, graba, edita y lanza campañas en instalaciones profesionales, con un enfoque en los medios y plataformas que mueven al mundo hoy.",
      diffs: ["Estudio de televisión y cabina de radio", "Laboratorio de marketing digital", "Producción de contenido real desde el inicio"],
      cta: "Quiero estudiar Comunicación"
    },
    {
      id: "psicologia", cat: "personas", name: "Licenciatura en Psicología", short: "Psicología",
      hook: "Entiende la mente. Comprende a las personas.",
      text: "Explora el comportamiento humano y aprende con instalaciones especializadas, incluyendo cámaras Gesell.",
      desc: "Descubre cómo piensan, sienten y actúan las personas. Aprende a evaluar, observar e intervenir con herramientas profesionales y práctica supervisada.",
      diffs: ["Cámaras Gesell para observación profesional", "Instalaciones especializadas", "Práctica supervisada por especialistas"],
      cta: "Quiero estudiar Psicología"
    },
    {
      id: "empresas", cat: "negocios", name: "Licenciatura en Creación y Desarrollo de Empresas", short: "Creación y Desarrollo de Empresas",
      hook: "Tu idea puede convertirse en un negocio.",
      text: "Aprende desde cero cómo planear, desarrollar y administrar una empresa.",
      desc: "Convierte tus ideas en proyectos rentables. Aprende a validar, planear, financiar y operar un negocio, acompañado de profesores con experiencia emprendedora.",
      diffs: ["Desarrolla tu propio proyecto de negocio", "Planeación, finanzas y administración desde cero", "Profesores con experiencia emprendedora"],
      cta: "Quiero emprender"
    },
    {
      id: "negocios", cat: "negocios", name: "Licenciatura en Negocios Internacionales", short: "Negocios Internacionales",
      hook: "Prepárate para hacer negocios sin fronteras.",
      text: "Aprende de comercio internacional, importaciones, exportaciones y negociaciones globales.",
      desc: "Prepárate para un mercado global. Domina la logística, el comercio exterior y la negociación para llevar productos y empresas a cualquier parte del mundo.",
      diffs: ["Comercio internacional, importaciones y exportaciones", "Negociación en entornos globales", "Visión de mercado internacional"],
      cta: "Quiero más información"
    },
    {
      id: "turismo", cat: "negocios", name: "Licenciatura en Turismo", short: "Turismo",
      hook: "Convierte tu pasión por viajar en tu profesión.",
      text: "Prepárate para desarrollar negocios turísticos, crear experiencias y explorar oportunidades laborales internacionales.",
      desc: "Diseña experiencias que la gente recuerde. Aprende a crear y gestionar negocios turísticos con una visión internacional y oportunidades en todo el mundo.",
      diffs: ["Creación de experiencias y negocios turísticos", "Oportunidades laborales internacionales", "Aprendizaje práctico en el sector"],
      cta: "Quiero estudiar Turismo"
    },
    {
      id: "gastronomia", cat: "creativas", name: "Licenciatura en Gastronomía", short: "Gastronomía",
      hook: "Haz de tu pasión por la cocina una profesión.",
      text: "Aprende con chefs profesionales y desarrolla tus habilidades en laboratorios especializados.",
      desc: "Cocina desde el primer día. Domina técnicas, ingredientes y la gestión de cocina profesional junto a chefs con trayectoria, en laboratorios equipados.",
      diffs: ["Chefs profesionales como profesores", "Laboratorios de cocina especializados", "Técnica, creatividad y gestión de negocio"],
      cta: "Quiero estudiar Gastronomía"
    },
    {
      id: "nutricion", cat: "personas", name: "Licenciatura en Nutrición", short: "Nutrición",
      hook: "Transforma vidas a través de la alimentación.",
      text: "Desarrolla tus conocimientos y habilidades con aprendizaje práctico e instalaciones especializadas.",
      desc: "Ayuda a las personas a vivir mejor. Aprende a evaluar, diseñar planes de alimentación y promover la salud con práctica real e instalaciones especializadas.",
      diffs: ["Aprendizaje práctico desde el inicio", "Instalaciones especializadas", "Enfoque en salud y bienestar real"],
      cta: "Quiero estudiar Nutrición"
    }
  ];
  var byId = {};
  CAREERS.forEach(function (c) { byId[c.id] = c; });

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  /* ---------- Fallback de fotos: si la imagen no existe, queda el marcador ---------- */
  function wirePhoto(img) {
    var box = img.closest(".photo");
    function ok() { if (box) box.classList.add("is-loaded"); }
    function bad() { img.style.display = "none"; if (box) box.classList.remove("is-loaded"); }
    if (img.complete && img.naturalWidth) ok();
    else if (img.complete && img.getAttribute("src")) bad();
    img.addEventListener("load", function () { img.style.display = ""; ok(); });
    img.addEventListener("error", bad);
  }

  /* ---------- Selects de carrera ---------- */
  function fillSelects() {
    $$("[data-career-select]").forEach(function (sel) {
      sel.innerHTML = '<option value="" disabled selected>Selecciona una carrera</option>' +
        CAREERS.map(function (c) { return '<option value="' + c.short + '">' + esc(c.name) + "</option>"; }).join("") +
        '<option value="Aún no lo decido">Aún no lo decido</option>';
    });
  }

  /* ---------- Tarjetas de carrera ---------- */
  var CAT_LABEL = { negocios: "Negocios", personas: "Personas y salud", creativas: "Creativas" };
  var grid = $("#career-grid");
  function renderCards() {
    grid.innerHTML = CAREERS.map(function (c, i) {
      return (
        '<article class="pcard" data-cat="' + c.cat + '" data-detail="' + c.id + '">' +
          '<div class="pcard__img photo" data-label="Foto: ' + esc(c.short) + '"><img src="img/carrera-' + c.id + '.jpg" alt="" loading="lazy"></div>' +
          '<div class="pcard__meta"><span>' + (i < 9 ? "0" : "") + (i + 1) + "</span><span>" + CAT_LABEL[c.cat] + "</span></div>" +
          "<h3>" + esc(c.short) + "</h3>" +
          '<p class="pcard__hook">' + esc(c.hook) + "</p>" +
          '<p class="pcard__text">' + esc(c.text) + "</p>" +
          '<div class="pcard__foot">' +
            '<button class="pill pill--outline" data-detail="' + c.id + '">' + esc(c.cta) + "</button>" +
            '<button class="circle" data-detail="' + c.id + '" aria-label="Ver detalles de ' + esc(c.name) + '"><svg class="ic"><use href="#i-arrow"/></svg></button>' +
          "</div>" +
        "</article>"
      );
    }).join("");
    $$("img", grid).forEach(wirePhoto);
  }

  function updateProgress() {
    var bar = $("#career-progress"); if (!bar) return;
    var max = grid.scrollWidth - grid.clientWidth;
    var ratio = grid.clientWidth / grid.scrollWidth;
    bar.style.width = Math.max(ratio * 100, 12) + "%";
    var p = max > 0 ? grid.scrollLeft / max : 0;
    bar.style.transform = "translateX(" + (p * (100 / Math.max(ratio, .12) - 100)) + "%)";
  }
  grid.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  $$(".tab").forEach(function (t) {
    t.addEventListener("click", function () {
      var f = t.getAttribute("data-filter");
      $$(".tab").forEach(function (x) { x.classList.toggle("is-on", x === t); x.setAttribute("aria-selected", String(x === t)); });
      $$(".pcard", grid).forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.classList.toggle("is-out", !show);
        if (show) { card.style.animation = "none"; card.offsetHeight; card.style.animation = ""; }
      });
      grid.scrollTo({ left: 0, behavior: "smooth" });
      setTimeout(updateProgress, 50);
    });
  });
  $$("[data-scroll]").forEach(function (b) {
    b.addEventListener("click", function () {
      var card = $(".pcard:not(.is-out)", grid);
      var step = card ? card.getBoundingClientRect().width + 14 : 400;
      grid.scrollBy({ left: step * +b.getAttribute("data-scroll"), behavior: "smooth" });
    });
  });
  /* ---------- Modales ---------- */
  var lastScrollY = 0;
  function openModal(d) {
    if (!d) return;
    $$("dialog[open]").forEach(function (o) { if (o !== d && o.id !== "privacy-modal") o.close(); });
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    document.documentElement.classList.add("no-scroll");
  }
  function closeModal(d) {
    if (typeof d.close === "function") d.close(); else d.removeAttribute("open");
  }
  $$("dialog.modal").forEach(function (d) {
    d.addEventListener("close", function () {
      if (!$("dialog[open]")) document.documentElement.classList.remove("no-scroll");
    });
    d.addEventListener("click", function (e) { if (e.target === d) closeModal(d); }); // clic en el fondo
    $$("[data-close]", d).forEach(function (b) { b.addEventListener("click", function () { closeModal(d); }); });
  });

  function openCareer(id) {
    var c = byId[id]; if (!c) return;
    var m = $("#career-modal");
    $("#cm-title").textContent = c.name;
    $("#cm-hook").textContent = c.hook;
    $("#cm-desc").textContent = c.desc;
    $("#cm-short").textContent = c.short;
    $("#cm-career").value = c.short;
    $("#cm-diffs").innerHTML = c.diffs.map(function (t, i) {
      return '<li><span>0' + (i + 1) + "</span>" + esc(t) + "</li>";
    }).join("");
    var media = $("#cm-media");
    media.setAttribute("data-label", "Foto o video: " + c.short);
    var img = $("#cm-img");
    img.style.display = "";
    media.classList.remove("is-loaded");
    img.alt = "Alumnos de " + c.short + " en la URN";
    img.src = "img/carrera-" + c.id + (window.innerWidth >= 1024 ? ".jpg" : "-wide.jpg");
    $("#cm-wa").setAttribute("data-career", c.short);
    resetForm($(".lead-form", m));
    openModal(m);
    m.scrollTop = 0;
    track("career_view", { carrera: c.short });
  }
  wirePhoto($("#cm-img"));

  function openLead(source, careerShort) {
    var m = $("#lead-modal");
    var f = $(".lead-form", m);
    resetForm(f);
    f.setAttribute("data-source", "modal_" + (source || "cta"));
    if (careerShort) f.carrera.value = careerShort;
    openModal(m);
    setTimeout(function () { var n = $("#lm-name"); if (n && window.innerWidth > 768) n.focus(); }, 60);
  }

  document.addEventListener("click", function (e) {
    var t;
    if ((t = e.target.closest("[data-detail]"))) { e.preventDefault(); openCareer(t.getAttribute("data-detail")); return; }
    if ((t = e.target.closest("[data-open-lead]"))) { e.preventDefault(); openLead(t.getAttribute("data-source"), t.getAttribute("data-career")); return; }
    if ((t = e.target.closest("[data-open-privacy]"))) { e.preventDefault(); openModal($("#privacy-modal")); return; }
    if ((t = e.target.closest("[data-whatsapp]"))) {
      e.preventDefault();
      var career = t.getAttribute("data-career") || "";
      var msg = (C.whatsappMessage || "Hola, quiero información de la URN.")
        .replace("{carrera}", career || "mi interés");
      if (!career) msg = msg.replace("sobre la carrera de mi interés", "sobre las carreras");
      track("whatsapp_click", { carrera: career || "general", origen: t.getAttribute("data-source") || "" });
      var url = "https://wa.me/" + (C.whatsappNumber || "") + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");
    }
  });

  /* ---------- UTM / click IDs (atribución Meta & Google Ads) ---------- */
  var ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "gbraid", "wbraid"];
  var attribution = {};
  try {
    var qs = new URLSearchParams(location.search);
    var stored = JSON.parse(sessionStorage.getItem("urn_attr") || "{}");
    ATTR_KEYS.forEach(function (k) { attribution[k] = qs.get(k) || stored[k] || ""; });
    sessionStorage.setItem("urn_attr", JSON.stringify(attribution));
  } catch (err) { ATTR_KEYS.forEach(function (k) { attribution[k] = ""; }); }

  /* ---------- Formularios ---------- */
  function setError(field, msg) {
    var wrap = field.closest(".field") || field.closest(".consent");
    if (!wrap) return;
    wrap.classList.toggle("has-error", !!msg);
    var e = $(".field__err", wrap);
    if (msg) {
      if (!e) { e = document.createElement("small"); e.className = "field__err"; wrap.appendChild(e); }
      e.textContent = msg;
    } else if (e) e.remove();
  }
  function validate(form) {
    var ok = true, first = null;
    var name = form.nombre, phone = form.telefono, career = form.carrera, consent = form.consentimiento;
    function fail(f, m) { setError(f, m); ok = false; if (!first) first = f; }

    if (!name.value.trim() || name.value.trim().length < 3) fail(name, "Escribe tu nombre completo.");
    else setError(name, "");

    var digits = phone.value.replace(/\D/g, "");
    if (digits.length < 10) fail(phone, "Escribe un número de 10 dígitos.");
    else setError(phone, "");

    if (career && career.tagName === "SELECT") {
      if (!career.value) fail(career, "Selecciona una carrera.");
      else setError(career, "");
    }
    if (consent && !consent.checked) fail(consent, "Necesitamos tu autorización para contactarte.");
    else if (consent) setError(consent, "");

    if (first) first.focus();
    return ok;
  }
  function resetForm(form) {
    if (!form) return;
    form.reset();
    $$(".has-error", form).forEach(function (w) { w.classList.remove("has-error"); });
    $$(".field__err", form).forEach(function (e) { e.remove(); });
    var btn = $("button[type=submit]", form);
    if (btn && btn._html) { btn.innerHTML = btn._html; btn.disabled = false; }
  }

  function showToast(name) {
    var t = $("#toast");
    $("#toast-name").textContent = (name || "").split(" ")[0];
    t.hidden = false;
    requestAnimationFrame(function () { t.classList.add("is-on"); });
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      t.classList.remove("is-on");
      setTimeout(function () { t.hidden = true; }, 300);
    }, 5000);
  }

  $$(".lead-form").forEach(function (form) {
    // Solo dígitos en teléfono
    form.telefono.addEventListener("input", function () {
      this.value = this.value.replace(/[^\d ]/g, "").slice(0, 14);
    });
    $$("input, select", form).forEach(function (f) {
      f.addEventListener("change", function () {
        if ((f.closest(".field") || f.closest(".consent") || {}).classList &&
            (f.closest(".field") || f.closest(".consent")).classList.contains("has-error")) validate(form);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;

      var btn = $("button[type=submit]", form);
      btn._html = btn._html || btn.innerHTML;
      btn.textContent = "Enviando…";
      btn.disabled = true;

      var lead = Object.assign({
        nombre: form.nombre.value.trim(),
        telefono: form.telefono.value.replace(/\D/g, ""),
        carrera: form.carrera.value,
        origen: form.getAttribute("data-source"),
        consentimiento: true,
        pagina: location.href.split("?")[0],
        fecha: new Date().toISOString()
      }, attribution);

      var send = C.leadEndpoint
        ? fetch(C.leadEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), mode: "cors" })
            .catch(function () {
              // Respaldo para endpoints sin CORS (p. ej. Google Apps Script)
              return fetch(C.leadEndpoint, { method: "POST", body: JSON.stringify(lead), mode: "no-cors" });
            })
        : Promise.resolve(console.info("[URN lead – modo prueba, configura leadEndpoint en config.js]", lead));

      send.then(function () {
        track("lead_submit", { carrera: lead.carrera, origen: lead.origen });
        var dlg = form.closest("dialog");
        if (dlg) closeModal(dlg);
        resetForm(form);
        showToast(lead.nombre);
      }).catch(function () {
        btn.innerHTML = btn._html;
        btn.disabled = false;
        alert("No pudimos enviar tus datos. Intenta de nuevo o escríbenos por WhatsApp.");
      });
    });
  });

  /* ---------- Scroll suave (Lenis) ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    window.urnLenis = lenis;
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    // Pausar el scroll de la página mientras hay un modal abierto
    new MutationObserver(function () {
      if (document.documentElement.classList.contains("no-scroll")) lenis.stop(); else lenis.start();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  }
  // Anclas internas con desplazamiento suave
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var el = document.querySelector(id); if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el, { offset: -70 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- Header / menú móvil ---------- */
  var header = $(".header");
  var toggle = $(".menu-toggle");
  var mnav = $("#mobile-nav");
  var frame = $("#hero-frame");
  var curve = $("#curve");
  var projectSec = $(".project");
  var lastY = 0;
  if (curve) {
    var len = curve.getTotalLength();
    curve.style.strokeDasharray = len;
    curve.style.strokeDashoffset = len;
  }
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 60);
    if (!header.classList.contains("is-open")) header.classList.toggle("is-hidden", y > 400 && y > lastY + 2);
    if (y < lastY - 2) header.classList.remove("is-hidden");
    lastY = y;
    // Hero: el bloque se reduce suavemente al bajar
    if (frame && !reduce) {
      var h = frame.offsetHeight || 1;
      var p = Math.min(Math.max(y / h, 0), 1);
    }
    // Línea curva que se dibuja en el proyecto integrador
    if (curve && projectSec) {
      var r = projectSec.getBoundingClientRect();
      var prog = Math.min(Math.max((window.innerHeight - r.top) / (r.height + window.innerHeight * .4), 0), 1);
      curve.style.strokeDashoffset = (curve.getTotalLength() * (1 - prog)).toFixed(1);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mnav.hidden = open;
    header.classList.toggle("is-open", !open);
  });
  $$("a", mnav).forEach(function (a) {
    a.addEventListener("click", function () {
      toggle.setAttribute("aria-expanded", "false"); mnav.hidden = true; header.classList.remove("is-open");
    });
  });

  /* ---------- Animaciones al aparecer ---------- */
  var sticky = $(".sticky-cta");
  if ("IntersectionObserver" in window) {
    var hideOn = [$(".hero__copy .pill"), $(".hero__form"), $("#admisiones .card-form")];
    var visible = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      sticky.classList.toggle("is-hidden", visible.size > 0);
    }, { threshold: 0.2 });
    hideOn.forEach(function (el) { if (el) io.observe(el); });

    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    $$("[data-lines], .reveal-up, .reveal-clip, .panel").forEach(function (el) {
      if (!el.closest(".hero")) rev.observe(el);
    });
    // Escalonar elementos hermanos
    $$(".benefits, .figures__grid").forEach(function (g) {
      $$(".reveal-up", g).forEach(function (el, i) { el.style.transitionDelay = (i * 0.08) + "s"; });
    });
  } else {
    $$("[data-lines], .reveal-up, .reveal-clip, .panel").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Intro del hero ---------- */
  function intro() {
    var root = document.documentElement;
    root.classList.add("is-ready");
    requestAnimationFrame(function () {
      root.classList.remove("preload");
      setTimeout(function () {
        $$(".hero [data-lines], .hero .reveal-up").forEach(function (el, i) {
          setTimeout(function () { el.classList.add("in"); }, i * 120);
        });
      }, reduce ? 0 : 450);
    });
  }
  var heroImg = $(".hero__media img");
  if (heroImg && !heroImg.complete) {
    var done = false;
    var go = function () { if (!done) { done = true; intro(); } };
    heroImg.addEventListener("load", go); heroImg.addEventListener("error", go);
    setTimeout(go, 1200);
  } else intro();

  /* ---------- Examen vocacional (Google Forms) ---------- */
  $$("[data-vocational]").forEach(function (a) {
    if (C.vocationalTestUrl) a.href = C.vocationalTestUrl;
    a.addEventListener("click", function (e) {
      track("vocational_click", { origen: a.getAttribute("data-source") || "" });
      if (!C.vocationalTestUrl) {
        e.preventDefault();
        console.warn("[URN] Configura vocationalTestUrl en config.js con el link del Google Forms.");
      }
    });
  });

  /* ---------- Init ---------- */
  fillSelects();
  renderCards();
  updateProgress();
  $$(".photo > img").forEach(wirePhoto);
  var yEl = $("#year"); if (yEl) yEl.textContent = new Date().getFullYear();
  var pl = $("#privacy-full-link");
  if (pl) { if (C.privacyUrl) pl.href = C.privacyUrl; else pl.removeAttribute("href"); }
  // Abrir una carrera directo desde un anuncio: index.html#carrera-derecho
  var hm = location.hash.match(/^#carrera-(\w+)/);
  if (hm && byId[hm[1]]) setTimeout(function () { openCareer(hm[1]); }, 600);
})();
