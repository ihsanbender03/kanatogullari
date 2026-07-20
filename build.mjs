// =========================================================
//  Kanatoğulları Turizm — statik site üretici (bağımlılıksız)
//  Çalıştır:  node build.mjs
//  Çıktı:     public/  (cPanel public_html'e yüklenir)
// =========================================================
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, stats, nav, services, fleet, documents, whyUs, values } from "./src/content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "public");

/* ---------------- helpers ---------------- */
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const svc = (slug) => services.find((s) => s.slug === slug);
const url = (p) => site.domain + p;

/* ---------------- ikon seti (lucide tarzı, stroke) ---------------- */
const P = {
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5S18 4 16.5 5.5L13 9 4.8 7.2c-.3-.1-.7 0-.9.3l-.5.5c-.3.4-.2 1 .2 1.2L11 13l-3 3-2-.5c-.3-.1-.6 0-.8.2l-.3.3c-.4.4-.3 1 .2 1.2l3 1.5 1.5 3c.2.5.9.6 1.2.2l.3-.3c.2-.2.3-.5.2-.8L11 21l3-3 4.8 4.4c.4.3 1 .2 1.2-.2l.5-.5c.2-.3.3-.6.3-.9Z"/>',
  crown: '<path d="m3 7 3.5 4L12 4l5.5 7L21 7l-2 12H5L3 7Z"/><path d="M5 19h14"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  student: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/><path d="M22 10v6"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15 9-3.5 1.5L10 14l3.5-1.5L15 9Z"/>',
  car: '<path d="M5 13 6.5 8.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"/><path d="M4 13h16v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4Z"/><circle cx="7.5" cy="15.5" r="1"/><circle cx="16.5" cy="15.5" r="1"/>',
  catering: '<path d="M4 3v7a3 3 0 0 0 6 0V3"/><path d="M7 3v18"/><path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  star: '<path d="M12 3.5 14.6 9l5.9.7-4.4 4 1.2 5.8L12 16.7 6.7 19.5 7.9 13.7 3.5 9.7 9.4 9 12 3.5Z"/>',
  medal: '<circle cx="12" cy="14" r="6"/><path d="m9 8-3-5m9 5 3-5M9.5 3h5"/><path d="m12 11 1 2 2 .2-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L10 13.2l2-.2 1-2Z"/>',
  phone: '<path d="M6 3c-1 0-2 1-2 2 0 8 6 14 14 14 1 0 2-1 2-2v-2.5c0-.5-.3-.9-.8-1l-3-.7c-.4-.1-.8 0-1 .3l-1 1.2A12 12 0 0 1 8.4 9.8l1.2-1c.3-.3.4-.7.3-1l-.7-3C9.1 4.3 8.7 4 8.2 4H6Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"/><path d="M8.5 8.5c-.3 0-.6.1-.8.4-.3.3-.9.9-.9 2s.9 2.3 1 2.5c.1.2 1.7 2.8 4.3 3.8 2.1.8 2.6.7 3 .6.6-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3l-1.5-.7c-.2-.1-.4-.1-.6.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.4-.6-2.2-1.6-.6-.7-.4-.9-.2-1.1l.4-.6c.1-.2.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.6-.4h-.2Z" fill="currentColor" stroke="none"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M14 9h3V5.5h-3c-2 0-3.5 1.5-3.5 3.5v2H8v3.5h2.5V22h3.5v-7.5h2.7l.3-3.5H14V9.5c0-.3.2-.5.5-.5Z" fill="currentColor" stroke="none"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.3 2.3 4.7-4.6"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-4 4 3 3-2 4 3"/>',
  headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2Zm16 0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2Z"/><path d="M18 19a4 4 0 0 1-4 3h-2"/>',
};
const icon = (name, cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ""}</svg>`;

/* Logo — stilize altın kanat */
const logoMark = `<svg class="brand__mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7cd86"/><stop offset="1" stop-color="#c9a24b"/></linearGradient></defs>
  <rect width="48" height="48" rx="12" fill="#09244b"/>
  <path d="M10 30c8-1 13-4 18-11 1 6-2 12-8 14-4 1.4-8 .5-10-3Z" fill="url(#g)"/>
  <path d="M14 33c6-.5 10-3 13-8-.2 4.5-3 8-7 9-3 .9-5 .2-6-1Z" fill="#0d2f5e"/>
</svg>`;

/* ---------------- bileşenler ---------------- */
function header(active) {
  const items = nav
    .map((n) => {
      const cur = active === n.href ? ' aria-current="page"' : "";
      if (n.children === "services") {
        const sub = services
          .map((s) => `<a href="/${s.slug}/">${esc(s.menu)}</a>`)
          .join("");
        return `<li class="nav__item nav__item--has"><a href="${n.href}"${cur}>${esc(n.label)}</a><div class="nav__dropdown">${sub}</div></li>`;
      }
      return `<li class="nav__item"><a href="${n.href}"${cur}>${esc(n.label)}</a></li>`;
    })
    .join("");
  return `<header class="site-header">
  <div class="container nav">
    <a class="brand" href="/" aria-label="${esc(site.name)} ana sayfa">${logoMark}<span>Kanatoğulları<small>Turizm · ${esc(site.city)}</small></span></a>
    <nav aria-label="Ana menü"><ul class="nav__menu" id="mainmenu">${items}</ul></nav>
    <div class="nav__actions">
      <a class="nav__phone" href="tel:${site.phoneHref}">${icon("phone")}<span>${esc(site.phone)}</span></a>
      <a class="btn btn--gold btn--sm" href="/iletisim/">Teklif Al</a>
      <button class="nav__toggle" type="button" aria-label="Menüyü aç/kapat" aria-controls="mainmenu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>`;
}

function footer() {
  const svcLinks = services.map((s) => `<a href="/${s.slug}/">${esc(s.title)}</a>`).join("");
  const corp = [["Kurumsal", "/kurumsal/"], ["Araç Filomuz", "/arac-filomuz/"], ["Belgelerimiz", "/belgelerimiz/"], ["İletişim", "/iletisim/"]]
    .map(([l, h]) => `<a href="${h}">${esc(l)}</a>`).join("");
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/">${logoMark}<span>Kanatoğulları<small>Turizm</small></span></a>
        <p>Afyonkarahisar merkezli olarak ${site.foundedYears} yıla yakın süredir personel, öğrenci ve VIP taşımacılık ile tur ve catering hizmetlerinde güvenilir çözümler sunuyoruz.</p>
        <div class="social">
          <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
          <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
        </div>
      </div>
      <div><h4>Hizmetler</h4><nav class="footer-links" aria-label="Hizmet bağlantıları">${svcLinks}</nav></div>
      <div><h4>Kurumsal</h4><nav class="footer-links" aria-label="Kurumsal bağlantılar">${corp}</nav></div>
      <div>
        <h4>İletişim</h4>
        <ul class="footer-contact">
          <li>${icon("pin")}<span>${esc(site.address)}</span></li>
          <li>${icon("phone")}<a href="tel:${site.phoneHref}">${esc(site.phone)}</a></li>
          <li>${icon("mail")}<a href="mailto:${site.email}">${esc(site.email)}</a></li>
          <li>${icon("clock")}<span>${esc(site.hours)}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${esc(site.name)}. Tüm hakları saklıdır.</span>
      <nav aria-label="Alt bağlantılar"><a href="/iletisim/">İletişim</a> · <a href="/kurumsal/">Hakkımızda</a></nav>
    </div>
  </div>
</footer>
<div class="floaters">
  <a class="fab-wa" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp ile yazın">${icon("whatsapp")}</a>
  <a class="fab-call" href="tel:${site.phoneHref}" aria-label="Hemen arayın">${icon("phone")}</a>
</div>`;
}

/* JSON-LD */
function jsonLd(extra = []) {
  const org = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: site.domain,
    telephone: site.phone,
    email: site.email,
    image: site.domain + "/assets/img/og-default.jpg",
    logo: site.domain + "/assets/img/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dairecep Mah. Gazlıgöl Cad. No:35",
      addressLocality: "Merkez",
      addressRegion: "Afyonkarahisar",
      postalCode: site.postalCode,
      addressCountry: "TR",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: "Afyonkarahisar",
    priceRange: "₺₺",
    openingHours: "Mo-Su 00:00-23:59",
    sameAs: [site.social.instagram, site.social.facebook],
  };
  return [org, ...extra].map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n");
}

/* HTML iskeleti */
function layout({ title, desc, active = "", canonical, body, ld = "", ogType = "website", bodyClass = "" }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#09244b">
<meta name="author" content="${esc(site.name)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="tr_TR">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.domain}/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${site.domain}/assets/img/og-default.jpg">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@600;700;800&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap"></noscript>
<link rel="stylesheet" href="/assets/css/style.css">
${ld}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<a class="skip-link" href="#main">İçeriğe geç</a>
${header(active)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

/* Ortak parçalar */
const mediaFrame = (label = "Görsel eklenecek") =>
  `<div class="media-frame">${icon("image")}<span>${esc(label)}</span></div>`;

function serviceCards(list = services, opts = {}) {
  return list
    .map((s, i) => {
      const navy = opts.firstNavy && i === 0 ? " card--navy" : "";
      return `<article class="card${navy}" data-reveal data-delay="${i % 3}">
      <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
      <div class="card__icon">${icon(s.icon)}</div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.short)}</p>
      <a class="card__link" href="/${s.slug}/">Detaylı Bilgi ${icon("arrow")}</a>
    </article>`;
    })
    .join("");
}

const ctaBand = (title = "Yolculuğunuzu birlikte planlayalım", text = "Transfer, tur, servis ve catering ihtiyaçlarınız için hemen teklif alın.") =>
  `<section class="section"><div class="container"><div class="cta-band" data-reveal>
    <span class="eyebrow" style="justify-content:center">Bize Ulaşın</span>
    <h2 class="title">${esc(title)}</h2>
    <p class="lead mx-auto" style="color:#c9d6ea">${esc(text)}</p>
    <div class="hero__actions">
      <a class="btn btn--gold" href="tel:${site.phoneHref}">${icon("phone")} Hemen Ara</a>
      <a class="btn btn--outline-light" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">${icon("whatsapp")} WhatsApp</a>
    </div>
  </div></div></section>`;

/* ---------------- SAYFALAR ---------------- */
function pageHome() {
  const statBoxes = stats
    .map((s) => `<div class="hero__stat"><b${s.raw ? "" : ` data-count="${s.value}" data-suffix="${s.suffix}"`}>${s.raw ? s.value + s.suffix : "0"}</b><span>${esc(s.label)}</span></div>`)
    .join("");
  const whyCards = whyUs
    .map((w, i) => `<div class="feature" data-reveal data-delay="${i % 3}"><div class="feature__icon">${icon(w.icon)}</div><div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div></div>`)
    .join("");

  const body = `
<section class="hero">
  <div class="hero__bg" aria-hidden="true"></div>
  <div class="container hero__inner">
    <div class="hero__content" data-reveal>
      <span class="eyebrow hero__eyebrow">${site.foundedYears} Yıllık Tecrübe · ${esc(site.city)}</span>
      <h1>Güvenli ve Konforlu <span class="accent-serif">Yolculuk</span> Deneyimi</h1>
      <p class="hero__sub">Kanatoğulları Turizm; Afyonkarahisar merkezli olarak ${site.foundedYears} yıla yakın süredir personel, öğrenci ve VIP taşımacılık, tur organizasyonları ve catering hizmetleri sunar.</p>
      <div class="hero__actions">
        <a class="btn btn--gold" href="/iletisim/">Teklif Alın ${icon("arrow")}</a>
        <a class="btn btn--outline-light" href="/hizmetlerimiz/">Hizmetlerimiz</a>
      </div>
      <div class="hero__stats">${statBoxes}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal>
      <span class="eyebrow" style="justify-content:center">Taşımacılık Hizmetlerimiz</span>
      <h2 class="title">İhtiyacınıza Özel Ulaşım Çözümleri</h2>
      <p class="lead mx-auto">Havalimanı transferinden VIP ulaşıma, öğrenci servisinden tur ve catering'e kadar tek elden, güvenilir ve profesyonel hizmet.</p>
    </div>
    <div class="grid cols-4">${serviceCards(services, { firstNavy: true })}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container split">
    <div class="split__media" data-reveal>${mediaFrame("Bakımlı VIP filo")}
      <div class="split__badge">${icon("medal", "")}<div><b>${site.foundedYears}+</b><span>yıllık yol tecrübesi</span></div></div>
    </div>
    <div data-reveal data-delay="1">
      <span class="eyebrow">Amacımız ve Değerlerimiz</span>
      <h2 class="title">Güvenli ve Konforlu Yolculuk Deneyimi</h2>
      <div class="gold-line"></div>
      <p class="lead">Yaklaşık ${site.foundedYears} yıllık sektörel tecrübemizle personel taşımacılığı, öğrenci servisleri, VIP transfer, tur organizasyonları ve catering hizmetlerinde güvenilir çözümler sunuyoruz.</p>
      <ul class="checklist">
        <li>${icon("check")}<span><b>Deneyimli operasyon ekibi:</b> Her yolculuğu planlı, güvenli ve sorunsuz yönetiriz.</span></li>
        <li>${icon("check")}<span><b>Bakımlı ve konforlu araçlar:</b> Güvenli, zamanında ve rahat ulaşım sağlarız.</span></li>
        <li>${icon("check")}<span><b>Dakiklik odaklı hizmet:</b> Kesintisiz transfer için söz verdiğimiz saatte oradayız.</span></li>
      </ul>
      <a class="btn btn--ghost" href="/kurumsal/">Kurumsal ${icon("arrow")}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal>
      <span class="eyebrow" style="justify-content:center">Neden Kanatoğulları?</span>
      <h2 class="title">Bizi Tercih Etmeniz İçin Nedenler</h2>
    </div>
    <div class="grid cols-4">${whyCards}</div>
  </div>
</section>

<section class="section section--navy">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal>
      <span class="eyebrow" style="justify-content:center">VIP Standartlar</span>
      <h2 class="title">Konforlu ve Prestijli Transfer Hizmetleri</h2>
      <p class="lead mx-auto">Üst segment araçlarımız ve özel hizmet anlayışımızla iş ve özel seyahatlerinize değer katıyoruz.</p>
    </div>
    <div class="stats-strip" data-reveal>
      ${stats.map((s) => `<div class="stat"><b${s.raw ? "" : ` data-count="${s.value}" data-suffix="${s.suffix}"`}>${s.raw ? s.value + s.suffix : "0"}</b><span>${esc(s.label)}</span></div>`).join("")}
    </div>
  </div>
</section>

${ctaBand()}`;

  const ld = jsonLd([
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.domain,
    },
  ]);
  return layout({
    title: `${site.name} | Havalimanı Transfer, VIP Ulaşım & Servis · ${site.city}`,
    desc: `Afyonkarahisar merkezli ${site.name}. ${site.foundedYears} yıla yakın tecrübeyle havalimanı transferi, VIP ulaşım, personel ve öğrenci servisi, özel tur ve catering hizmetleri. Güvenli, konforlu ve dakik.`,
    active: "/",
    canonical: url("/"),
    body,
    ld,
  });
}

function pageService(s) {
  const idx = services.indexOf(s);
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);
  const feats = s.features
    .map((f, i) => `<div class="feature" data-reveal data-delay="${i % 3}"><div class="feature__icon">${icon(f.icon)}</div><div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div></div>`)
    .join("");
  const benefits = s.benefits.map((b) => `<li>${icon("check")}<span>${esc(b)}</span></li>`).join("");
  const routes = s.routes.map((r) => `<li>${esc(r)}</li>`).join("");

  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <a href="/hizmetlerimiz/">Hizmetlerimiz</a> / <span>${esc(s.title)}</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Hizmet</span>
    <h1>${esc(s.title)}</h1>
    <p>${esc(s.short)}</p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div data-reveal>
      <span class="eyebrow">Hizmet Detayı</span>
      <h2 class="title">${esc(s.title)} ile güvenli çözüm</h2>
      <div class="gold-line"></div>
      <p class="lead">${esc(s.lead)}</p>
      <ul class="checklist">${benefits}</ul>
      <div class="hero__actions" style="margin-top:1.4em">
        <a class="btn btn--gold" href="/iletisim/">Teklif Alın ${icon("arrow")}</a>
        <a class="btn btn--ghost" href="tel:${site.phoneHref}">${icon("phone")} ${esc(site.phone)}</a>
      </div>
    </div>
    <div class="split__media" data-reveal data-delay="1">${mediaFrame(esc(s.title))}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal>
      <span class="eyebrow" style="justify-content:center">Öne Çıkanlar</span>
      <h2 class="title">Neden bu hizmette bizi seçmelisiniz?</h2>
    </div>
    <div class="grid cols-4">${feats}</div>
  </div>
</section>

<section class="section">
  <div class="container split split--reverse">
    <div class="split__media" data-reveal>${mediaFrame("Uygulama alanları")}</div>
    <div data-reveal data-delay="1">
      <span class="eyebrow">Uygulama Alanları</span>
      <h2 class="title">Sıkça tercih edilen kullanım örnekleri</h2>
      <div class="gold-line"></div>
      <div class="prose"><ul>${routes}</ul></div>
      <p class="lead">İhtiyacınıza en uygun aracı ve planı birlikte belirleyelim; ${site.city} ve çevresinde tek elden çözüm sunuyoruz.</p>
    </div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal><span class="eyebrow" style="justify-content:center">Diğer Hizmetler</span><h2 class="title">İlginizi çekebilecek diğer çözümler</h2></div>
    <div class="grid cols-3">${serviceCards(others)}</div>
  </div>
</section>

${ctaBand(`${s.title} için hemen teklif alın`, "Uygun araç, güzergâh ve fiyat için bir telefon kadar yakınız.")}`;

  const ld = jsonLd([
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: s.title,
      provider: { "@type": "TravelAgency", name: site.name, telephone: site.phone, url: site.domain },
      areaServed: { "@type": "AdministrativeArea", name: "Afyonkarahisar" },
      description: s.metaDesc,
      url: url(`/${s.slug}/`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: url("/") },
        { "@type": "ListItem", position: 2, name: "Hizmetlerimiz", item: url("/hizmetlerimiz/") },
        { "@type": "ListItem", position: 3, name: s.title, item: url(`/${s.slug}/`) },
      ],
    },
  ]);
  return layout({
    title: `${s.metaTitle} | ${site.shortName} Turizm`,
    desc: s.metaDesc,
    active: "/hizmetlerimiz/",
    canonical: url(`/${s.slug}/`),
    body,
    ld,
  });
}

function pageServicesIndex() {
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <span>Hizmetlerimiz</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Ne Sunuyoruz</span>
    <h1>Hizmetlerimiz</h1>
    <p>Havalimanı transferinden VIP ulaşıma, personel ve öğrenci servisinden tur ve catering'e kadar tüm ulaşım ihtiyaçlarınız için tek adres.</p>
  </div>
</section>
<section class="section">
  <div class="container"><div class="grid cols-3">${serviceCards(services, { firstNavy: true })}</div></div>
</section>
${ctaBand()}`;
  const ld = jsonLd([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: url("/") },
        { "@type": "ListItem", position: 2, name: "Hizmetlerimiz", item: url("/hizmetlerimiz/") },
      ],
    },
  ]);
  return layout({
    title: `Hizmetlerimiz | Transfer, VIP, Servis, Tur & Catering · ${site.shortName}`,
    desc: `${site.name} hizmetleri: havalimanı transferi, VIP transfer, personel ve öğrenci taşımacılığı, özel tur, rehberlik, araç kiralama ve catering. Afyonkarahisar ve çevresinde güvenilir çözümler.`,
    active: "/hizmetlerimiz/",
    canonical: url("/hizmetlerimiz/"),
    body,
    ld,
  });
}

function pageKurumsal() {
  const valueCards = values
    .map((v, i) => `<div class="feature" data-reveal data-delay="${i % 3}"><div class="feature__icon">${icon(v.icon)}</div><div><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></div></div>`)
    .join("");
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <span>Kurumsal</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Hakkımızda</span>
    <h1>Kurumsal</h1>
    <p>Afyonkarahisar merkezli, ${site.foundedYears} yıla yakın tecrübeye sahip köklü bir taşımacılık ve turizm markası.</p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div data-reveal>
      <span class="eyebrow">Biz Kimiz?</span>
      <h2 class="title">30 yıla yakın yol tecrübesi</h2>
      <div class="gold-line"></div>
      <p class="lead">Kanatoğulları Turizm; Afyonkarahisar merkezli olarak ${site.foundedYears} yıla yakın süredir personel, öğrenci ve VIP taşımacılık hizmetleri sunmaktadır.</p>
      <p>Yaklaşık ${site.foundedYears} yıllık sektörel tecrübemizle personel taşımacılığı, öğrenci servisleri, VIP transfer, tur organizasyonları ve catering hizmetlerinde güvenilir çözümler üretiyoruz. Deneyimli operasyon ekibimizle her yolculuğu planlı, güvenli ve sorunsuz şekilde yönetiyoruz.</p>
      <p>Bakımlı ve konforlu araçlarımız sayesinde güvenli, zamanında ve rahat ulaşım sağlıyor; dakiklik odaklı operasyonumuzla kesintisiz transfer hizmeti sunuyoruz.</p>
    </div>
    <div class="split__media" data-reveal data-delay="1">${mediaFrame("Kanatoğulları Turizm")}
      <div class="split__badge">${icon("medal")}<div><b>${site.foundedYears}+</b><span>yıllık tecrübe</span></div></div>
    </div>
  </div>
</section>

<section class="section section--navy">
  <div class="container">
    <div class="grid cols-2" style="align-items:start;gap:clamp(24px,5vw,56px)">
      <div data-reveal>
        <span class="eyebrow">Misyonumuz</span>
        <h2 class="title">Her yolculukta güven ve konfor</h2>
        <p class="lead">Yolcularımızı güvenli, konforlu ve zamanında ulaştırmak; verdiğimiz her sözün arkasında durarak taşımacılıkta güvenilir çözüm ortağı olmak.</p>
      </div>
      <div data-reveal data-delay="1">
        <span class="eyebrow">Vizyonumuz</span>
        <h2 class="title">Bölgenin öncü turizm markası</h2>
        <p class="lead">Teknolojiyi, deneyimi ve müşteri memnuniyetini birleştirerek Afyonkarahisar ve çevresinde tercih edilen, öncü taşımacılık ve turizm markası olmak.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal><span class="eyebrow" style="justify-content:center">Değerlerimiz</span><h2 class="title">Bizi biz yapan ilkeler</h2></div>
    <div class="grid cols-4">${valueCards}</div>
  </div>
</section>

<section class="section section--alt">
  <div class="container">
    <div class="section-head text-center mx-auto" data-reveal><span class="eyebrow" style="justify-content:center">Ne Yapıyoruz</span><h2 class="title">Hizmet alanlarımız</h2></div>
    <div class="grid cols-4">${serviceCards(services)}</div>
  </div>
</section>

${ctaBand()}`;
  const ld = jsonLd([
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Kurumsal — " + site.name,
      url: url("/kurumsal/"),
    },
  ]);
  return layout({
    title: `Kurumsal | Hakkımızda · ${site.name}`,
    desc: `${site.name} hakkında: Afyonkarahisar merkezli, ${site.foundedYears} yıla yakın tecrübeyle personel, öğrenci ve VIP taşımacılık, tur ve catering hizmetleri. Misyon, vizyon ve değerlerimiz.`,
    active: "/kurumsal/",
    canonical: url("/kurumsal/"),
    body,
    ld,
  });
}

function pageFleet() {
  const cards = fleet
    .map((f, i) => `<article class="card fleet-card" data-reveal data-delay="${i % 3}">
      ${mediaFrame(esc(f.name))}
      <div class="fleet-card__body">
        <h3>${esc(f.name)}</h3>
        <p style="margin:.2em 0 0;color:var(--accent-strong);font-weight:700">${esc(f.cap)}</p>
        <p>${esc(f.desc)}</p>
        <div class="tags">${f.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </article>`)
    .join("");
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <span>Araç Filomuz</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Filo</span>
    <h1>Araç Filomuz</h1>
    <p>Bakımlı, sigortalı ve konforlu araçlarımızla her ölçekteki ulaşım ihtiyacına uygun çözümler.</p>
  </div>
</section>
<section class="section"><div class="container"><div class="grid cols-3">${cards}</div></div></section>
<section class="section section--navy"><div class="container">
  <div class="section-head text-center mx-auto" data-reveal><span class="eyebrow" style="justify-content:center">Filo Güvencesi</span><h2 class="title">Her araç, her sefer denetimli</h2></div>
  <div class="grid cols-4">
    ${[["shield","Düzenli bakım","Periyodik teknik bakım ve muayeneden geçen araçlar."],["check","Tam sigorta","Koltuk ve yolcu sigortası ile güvenceli seferler."],["star","Hijyen","Her sefer öncesi temizlik ve düzenli dezenfeksiyon."],["users","Deneyimli şoför","Güzergâha hâkim, profesyonel sürücü kadrosu."]].map(([ic,t,d],i)=>`<div class="feature" data-reveal data-delay="${i%3}"><div class="feature__icon">${icon(ic)}</div><div><h3>${t}</h3><p>${d}</p></div></div>`).join("")}
  </div>
</div></section>
${ctaBand("Grubunuza en uygun aracı birlikte seçelim", "Kişi sayısı ve güzergâhınıza göre en doğru aracı öneriyoruz.")}`;
  return layout({
    title: `Araç Filomuz | VIP, Minibüs, Otobüs · ${site.name}`,
    desc: `${site.name} araç filosu: Mercedes V-Class VIP, Vito, Sprinter, midibüs ve otobüs. Bakımlı, sigortalı ve konforlu araçlarla Afyonkarahisar'da güvenli taşımacılık.`,
    active: "/arac-filomuz/",
    canonical: url("/arac-filomuz/"),
    body,
  });
}

function pageDocuments() {
  const cards = documents
    .map((d, i) => `<article class="card doc-card" data-reveal data-delay="${i % 3}">${mediaFrame("Belge")}<div class="fleet-card__body"><h3 style="font-size:1.1rem">${esc(d.name)}</h3><p>${esc(d.desc)}</p></div></article>`)
    .join("");
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <span>Belgelerimiz</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Güvence</span>
    <h1>Belgelerimiz</h1>
    <p>Yasal yetki belgeleri ve sigorta güvencemizle şeffaf ve güvenilir hizmet sunuyoruz.</p>
  </div>
</section>
<section class="section"><div class="container">
  <div class="section-head text-center mx-auto" data-reveal><p class="lead mx-auto">Tüm faaliyetlerimizi ilgili mevzuata uygun, gerekli yetki belgeleri ve sigorta poliçeleriyle yürütüyoruz. Belge görselleri en güncel hâliyle bu sayfada yayınlanır.</p></div>
  <div class="grid cols-3">${cards}</div>
</div></section>
${ctaBand("Belgelerimiz hakkında bilgi alın", "Sözleşmeli hizmetlerimiz ve güvencelerimiz için bizimle iletişime geçin.")}`;
  return layout({
    title: `Belgelerimiz | Yetki & Sigorta Belgeleri · ${site.name}`,
    desc: `${site.name} yetki belgeleri ve sigorta güvencesi: TÜRSAB, D2 yetki belgesi, okul servis uygunluk belgesi, koltuk ve yolcu sigortası. Şeffaf ve güvenilir taşımacılık.`,
    active: "/belgelerimiz/",
    canonical: url("/belgelerimiz/"),
    body,
  });
}

function pageContact() {
  const options = services.map((s) => `<option value="${esc(s.title)}">${esc(s.title)}</option>`).join("");
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const body = `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> / <span>İletişim</span></nav>
    <span class="eyebrow" style="color:var(--gold-300)">Bize Ulaşın</span>
    <h1>İletişim</h1>
    <p>Transfer, tur, servis ve catering talepleriniz için 7/24 buradayız. Size en kısa sürede dönüş yapalım.</p>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div data-reveal>
      <span class="eyebrow">İletişim Bilgileri</span>
      <h2 class="title">Bir telefon kadar yakınız</h2>
      <div class="gold-line"></div>
      <div class="info-item"><div class="info-item__icon">${icon("pin")}</div><div><b>Adres</b><p>${esc(site.address)}</p></div></div>
      <div class="info-item"><div class="info-item__icon">${icon("phone")}</div><div><b>Telefon</b><a href="tel:${site.phoneHref}">${esc(site.phone)}</a></div></div>
      <div class="info-item"><div class="info-item__icon">${icon("whatsapp")}</div><div><b>WhatsApp</b><a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">Mesaj gönderin</a></div></div>
      <div class="info-item"><div class="info-item__icon">${icon("mail")}</div><div><b>E-posta</b><a href="mailto:${site.email}">${esc(site.email)}</a><br><a href="mailto:${site.email2}">${esc(site.email2)}</a></div></div>
      <div class="info-item"><div class="info-item__icon">${icon("clock")}</div><div><b>Çalışma Saatleri</b><p>${esc(site.hours)}</p></div></div>
      <div class="social" style="margin-top:20px">
        <a href="${site.social.instagram}" target="_blank" rel="noopener" aria-label="Instagram" style="background:var(--bg-alt);color:var(--navy-800)">${icon("instagram")}</a>
        <a href="${site.social.facebook}" target="_blank" rel="noopener" aria-label="Facebook" style="background:var(--bg-alt);color:var(--navy-800)">${icon("facebook")}</a>
      </div>
    </div>
    <div data-reveal data-delay="1">
      <form class="form" data-contact-form data-mailto="${site.email}" aria-label="İletişim formu">
        <div class="row">
          <div class="field"><label for="ad">Ad Soyad</label><input id="ad" name="ad" type="text" required autocomplete="name" placeholder="Adınız Soyadınız"></div>
          <div class="field"><label for="telefon">Telefon</label><input id="telefon" name="telefon" type="tel" required autocomplete="tel" placeholder="05xx xxx xx xx"></div>
        </div>
        <div class="field"><label for="email">E-posta</label><input id="email" name="email" type="email" autocomplete="email" placeholder="ornek@eposta.com"></div>
        <div class="field"><label for="hizmet">İlgilendiğiniz Hizmet</label><select id="hizmet" name="hizmet"><option value="">Seçiniz…</option>${options}<option value="Diğer">Diğer</option></select></div>
        <div class="field"><label for="mesaj">Mesajınız</label><textarea id="mesaj" name="mesaj" required placeholder="Tarih, kişi sayısı, güzergâh gibi detayları yazabilirsiniz."></textarea></div>
        <button class="btn btn--gold btn--block" type="submit">${icon("mail")} Talebi Gönder</button>
        <p style="font-size:.82rem;color:var(--muted);margin:0">Form, e-posta uygulamanızı açarak talebinizi iletir. Dilerseniz doğrudan arayabilir veya WhatsApp'tan yazabilirsiniz.</p>
      </form>
    </div>
  </div>
</section>

<section class="section section--alt" style="padding-top:0;background:transparent">
  <div class="container">
    <iframe class="map-embed" title="${esc(site.name)} konum haritası" src="${mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  </div>
</section>`;
  const ld = jsonLd([
    { "@context": "https://schema.org", "@type": "ContactPage", name: "İletişim — " + site.name, url: url("/iletisim/") },
  ]);
  return layout({
    title: `İletişim | Teklif & Rezervasyon · ${site.name}`,
    desc: `${site.name} iletişim: ${site.phone}, ${site.email}. Adres: ${site.addressShort}. Transfer, tur ve catering için 7/24 teklif ve rezervasyon.`,
    active: "/iletisim/",
    canonical: url("/iletisim/"),
    body,
    ld,
  });
}

function page404() {
  const body = `<section class="section" style="text-align:center;padding-block:clamp(80px,14vw,160px)">
    <div class="container">
      <span class="pill">404</span>
      <h1 class="title-lg" style="margin-top:.5em">Sayfa bulunamadı</h1>
      <p class="lead mx-auto">Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Ana sayfaya dönebilir ya da hizmetlerimize göz atabilirsiniz.</p>
      <div class="hero__actions" style="justify-content:center;margin-top:1.5em">
        <a class="btn btn--gold" href="/">Ana Sayfa</a>
        <a class="btn btn--ghost" href="/hizmetlerimiz/">Hizmetlerimiz</a>
      </div>
    </div>
  </section>`;
  return layout({ title: `Sayfa Bulunamadı (404) · ${site.name}`, desc: "Aradığınız sayfa bulunamadı.", canonical: url("/404.html"), body });
}

/* ---------------- statik dosyalar ---------------- */
function sitemapXml() {
  const urls = [
    { loc: "/", pr: "1.0", cf: "weekly" },
    { loc: "/kurumsal/", pr: "0.8", cf: "monthly" },
    { loc: "/hizmetlerimiz/", pr: "0.9", cf: "monthly" },
    ...services.map((s) => ({ loc: `/${s.slug}/`, pr: "0.8", cf: "monthly" })),
    { loc: "/arac-filomuz/", pr: "0.7", cf: "monthly" },
    { loc: "/belgelerimiz/", pr: "0.6", cf: "yearly" },
    { loc: "/iletisim/", pr: "0.7", cf: "yearly" },
  ];
  const today = new Date().toISOString().slice(0, 10);
  const body = urls
    .map((u) => `  <url><loc>${url(u.loc)}</loc><lastmod>${today}</lastmod><changefreq>${u.cf}</changefreq><priority>${u.pr}</priority></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`;

const webmanifest = JSON.stringify(
  {
    name: site.name,
    short_name: site.shortName,
    description: "Afyonkarahisar merkezli taşımacılık, transfer, tur ve catering hizmetleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#09244b",
    icons: [
      { src: "/assets/img/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  null,
  2
);

const htaccess = `# Kanatoğulları Turizm — Apache/cPanel yapılandırması
Options -Indexes
DirectoryIndex index.html

# HTTPS ve www yönlendirmesi (www'suz + https)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]

  # /sayfa -> /sayfa/ (sondaki slash tutarlılığı)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} !(\\.[a-zA-Z0-9]{1,5}|/)$
  RewriteRule ^(.*)$ /$1/ [L,R=301]
</IfModule>

ErrorDocument 404 /404.html

# Sıkıştırma
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml text/xml application/xml
</IfModule>

# Tarayıcı önbelleği
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Güvenlik başlıkları
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
`;

/* Favicon (SVG) — altın kanat */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#09244b"/><path d="M10 30c8-1 13-4 18-11 1 6-2 12-8 14-4 1.4-8 .5-10-3Z" fill="#d4af37"/><path d="M14 33c6-.5 10-3 13-8-.2 4.5-3 8-7 9-3 .9-5 .2-6-1Z" fill="#0d2f5e"/></svg>`;

/* ---------------- yazım ---------------- */
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const entry of await fs.readdir(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}
async function write(rel, content) {
  const full = path.join(OUT, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, content, "utf8");
}

async function build() {
  await fs.rm(OUT, { recursive: true, force: true });
  await fs.mkdir(OUT, { recursive: true });

  // Sayfalar (klasör bazlı URL yapısı — eski WP URL'leriyle birebir)
  await write("index.html", pageHome());
  await write("kurumsal/index.html", pageKurumsal());
  await write("hizmetlerimiz/index.html", pageServicesIndex());
  for (const s of services) await write(`${s.slug}/index.html`, pageService(s));
  await write("arac-filomuz/index.html", pageFleet());
  await write("belgelerimiz/index.html", pageDocuments());
  await write("iletisim/index.html", pageContact());
  await write("404.html", page404());

  // Statik SEO/altyapı dosyaları
  await write("sitemap.xml", sitemapXml());
  await write("robots.txt", robotsTxt);
  await write("site.webmanifest", webmanifest);
  await write(".htaccess", htaccess);
  await write("assets/img/favicon.svg", faviconSvg);

  // Varlıklar
  await copyDir(path.join(__dirname, "assets"), path.join(OUT, "assets"));

  const total = 3 + services.length + 3;
  console.log(`✓ Build tamam — ${total} HTML sayfa + SEO dosyaları → public/`);
}

build().catch((e) => {
  console.error("Build hatası:", e);
  process.exit(1);
});
