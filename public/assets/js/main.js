/* Kanatoğulları Turizm — hafif etkileşim scripti (bağımlılıksız) */
(function () {
  "use strict";
  var d = document;

  /* Mobil menü */
  var toggle = d.querySelector(".nav__toggle");
  var menu = d.querySelector(".nav__menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      d.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a") && !e.target.closest(".nav__item--has > a")) {
        menu.classList.remove("is-open");
        d.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Header gölge (scroll) */
  var header = d.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Scroll reveal */
  var reveals = d.querySelectorAll("[data-reveal]");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Sayaç animasyonu */
  var counters = d.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = 0, t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / dur, 1);
          var val = Math.floor((start + (target - start) * (0.5 - Math.cos(p * Math.PI) / 2)));
          el.textContent = val.toLocaleString("tr-TR") + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* İletişim formu — mailto ile gönderim (sunucusuz çalışır) */
  var form = d.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto") || "kanatogullari@hotmail.com";
      var name = (form.elements.namedItem("ad") || {}).value || "";
      var phone = (form.elements.namedItem("telefon") || {}).value || "";
      var email = (form.elements.namedItem("email") || {}).value || "";
      var service = (form.elements.namedItem("hizmet") || {}).value || "";
      var msg = (form.elements.namedItem("mesaj") || {}).value || "";
      var subject = "Web Talebi: " + (service || "İletişim") + " — " + name;
      var body =
        "Ad Soyad: " + name + "\n" +
        "Telefon: " + phone + "\n" +
        "E-posta: " + email + "\n" +
        "Hizmet: " + service + "\n\n" +
        "Mesaj:\n" + msg;
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* Aktif yıl */
  var y = d.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
