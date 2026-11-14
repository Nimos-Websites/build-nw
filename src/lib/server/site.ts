/**
 * THE SITE BUILDER — brief in, top-tier site out.
 *
 * Generates a modern, responsive, accessible static site from a brief.
 * No invented content: empty fields remove sections instead of filling them.
 */

export type SiteService = { label: string; detail?: string };
export type SiteProof = { label: string; detail?: string };
export type SiteTestimonial = { quote: string; name: string; role?: string };
export type SiteFaq = { q: string; a: string };

export type SiteVertical = "trades" | "professional" | "service" | "retail" | "hospitality";

export type SiteInput = {
  businessName: string;
  trade: string;
  city: string;
  region?: string;
  vertical?: SiteVertical;
  phone?: string;
  email?: string;
  domain?: string;
  headline?: string;
  lede?: string;
  about?: string;
  accent?: string;
  paper?: string;
  ink?: string;
  stone?: string;
  formEndpoint?: string;
  services?: SiteService[];
  proof?: SiteProof[];
  testimonials?: SiteTestimonial[];
  faq?: SiteFaq[];
  gallery?: string[];
};

const esc = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const where = (city: string, region?: string): string =>
  region ? `${city}, ${region}` : city;

export function buildSite(input: SiteInput): Record<string, string> {
  const {
    businessName,
    trade,
    city,
    region = "BC",
    vertical = "trades",
    phone,
    email,
    services = [],
    proof = [],
    testimonials = [],
    faq = [],
    gallery = [],
    about = "",
    domain = "",
    accent = "#9a4a2a",
    paper = "#faf8f5",
    ink = "#1a1714",
    stone = "#6b6560",
    headline = "",
    lede = "",
    formEndpoint = "/api/lead",
  } = input;

  const place = where(city, region);
  const title = `${businessName} — ${trade} in ${city}`;
  const description = `${businessName}: ${trade} in ${place}. ${about || "Quality work, honest pricing, one crew."}`.slice(0, 158);

  const serviceRows = services
    .map(
      (s, i) => `
        <article class="svc-card">
          <span class="svc-num">${String(i + 1).padStart(2, "0")}</span>
          <h3>${esc(s.label)}</h3>
          ${s.detail ? `<p>${esc(s.detail)}</p>` : ""}
        </article>`,
    )
    .join("");

  const proofCells = proof
    .map(
      (p) => `
        <div class="proof-cell">
          <p class="proof-k">${esc(p.label)}</p>
          ${p.detail ? `<p class="proof-d">${esc(p.detail)}</p>` : ""}
        </div>`,
    )
    .join("");

  const testimonialCards = testimonials
    .map(
      (t) => `
        <blockquote class="testimonial">
          <p class="testimonial-quote">"${esc(t.quote)}"</p>
          <footer>
            <strong>${esc(t.name)}</strong>
            ${t.role ? `<span>${esc(t.role)}</span>` : ""}
          </footer>
        </blockquote>`,
    )
    .join("");

  const faqItems = faq
    .map(
      (f) => `
        <details class="faq-item">
          <summary>${esc(f.q)}</summary>
          <p>${esc(f.a)}</p>
        </details>`,
    )
    .join("");

  const galleryItems = gallery
    .map(
      (g) => `
        <div class="gallery-item">
          <img src="${esc(g)}" alt="${esc(businessName)} work" loading="lazy" />
        </div>`,
    )
    .join("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    description,
    areaServed: place,
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(domain ? { url: `https://${domain}` } : {}),
  };

  const html = `<!DOCTYPE html>
<html lang="en-CA">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
${domain ? `<link rel="canonical" href="https://${esc(domain)}" />` : `<meta name="robots" content="noindex" />`}
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:type" content="website" />
<meta name="theme-color" content="${paper}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/styles.css" />
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="#main">
      <span class="brand-mark" aria-hidden></span>
      <span>${esc(businessName)}</span>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      ${phone ? `<a class="nav-tel" href="tel:${esc(phone.replace(/[^+\d]/g, ""))}">${esc(phone)}</a>` : ""}
    </nav>
    <button class="mobile-menu" aria-label="Menu" onclick="document.querySelector('.nav').classList.toggle('open')">☰</button>
  </div>
</header>

<main id="main">
  <!-- Hero -->
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${esc(trade)} · ${esc(place)}</p>
        <h1>${esc(headline || `${trade} in ${city}. Done right.`)}</h1>
        <p class="lede">${esc(lede || about || "Written quotes, one crew, and work that is still there when the next owner moves in.")}</p>
        <div class="acts">
          ${phone ? `<a class="btn btn-primary" href="tel:${esc(phone.replace(/[^+\d]/g, ""))}">Call ${esc(phone)}</a>` : ""}
          <a class="btn btn-ghost" href="#services">Our services</a>
        </div>
        <p class="micro">${esc(place)}${email ? ` · ${esc(email)}` : ""}</p>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="hero-card">
          <div class="hero-card-inner">
            <span class="hero-badge">Licensed &amp; Insured</span>
            <p class="hero-quote">"${esc(lede || about || "Quality work that lasts.")}"</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust bar -->
  ${proofCells ? `
  <section class="trust-bar">
    <div class="wrap trust-grid">${proofCells}</div>
  </section>` : ""}

  <!-- About -->
  ${about ? `
  <section class="about" id="about">
    <div class="wrap about-grid">
      <div class="about-label">
        <p class="eyebrow">About us</p>
        <h2>Who we are</h2>
      </div>
      <div class="about-content">
        <p class="about-copy">${esc(about)}</p>
      </div>
    </div>
  </section>` : ""}

  <!-- Services -->
  ${serviceRows ? `
  <section class="services" id="services">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">What we do</p>
          <h2>Our services</h2>
        </div>
        <p>Done properly, on time, with a written quote. If it's not on the list, ask — the answer is usually yes or a straight no.</p>
      </div>
      <div class="svc-grid">${serviceRows}</div>
    </div>
  </section>` : ""}

  <!-- Gallery -->
  ${galleryItems ? `
  <section class="gallery" id="gallery">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Our work</p>
          <h2>Recent projects</h2>
        </div>
      </div>
      <div class="gallery-grid">${galleryItems}</div>
    </div>
  </section>` : ""}

  <!-- Testimonials -->
  ${testimonialCards ? `
  <section class="testimonials" id="testimonials">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">What clients say</p>
          <h2>Testimonials</h2>
        </div>
      </div>
      <div class="testimonial-grid">${testimonialCards}</div>
    </div>
  </section>` : ""}

  <!-- FAQ -->
  ${faqItems ? `
  <section class="faq" id="faq">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Questions</p>
          <h2>Frequently asked</h2>
        </div>
      </div>
      <div class="faq-list">${faqItems}</div>
    </div>
  </section>` : ""}

  <!-- Contact -->
  <section class="contact" id="contact">
    <div class="wrap contact-grid">
      <div class="contact-info">
        <p class="eyebrow">Get in touch</p>
        <h2>Let's talk about your project</h2>
        <p class="contact-p">A photo and a sentence is enough to get a real answer. We reply the same day we can, and we'll tell you if the job isn't ours to take.</p>
        <dl class="details">
          ${phone ? `<div><dt>Phone</dt><dd><a href="tel:${esc(phone.replace(/[^+\d]/g, ""))}">${esc(phone)}</a></dd></div>` : ""}
          ${email ? `<div><dt>Email</dt><dd><a href="mailto:${esc(email)}">${esc(email)}</a></dd></div>` : ""}
          <div><dt>Area</dt><dd>${esc(place)}</dd></div>
        </dl>
      </div>
      <form class="form" action="${esc(formEndpoint)}" method="post" data-lead-form>
        <div class="field">
          <label for="name">Your name</label>
          <input id="name" name="name" autocomplete="name" required placeholder="Jane Smith" />
        </div>
        <div class="field">
          <label for="email">Email or phone</label>
          <input id="email" name="email" autocomplete="email" required placeholder="jane@example.com" />
        </div>
        <div class="field">
          <label for="message">What needs doing?</label>
          <textarea id="message" name="message" rows="4" required placeholder="Describe your project..."></textarea>
        </div>
        <button class="btn btn-primary wide" type="submit">Send message</button>
        <p class="form-note" data-lead-note>No newsletter, no list. This goes to the person who does the work.</p>
      </form>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">
      <span class="brand-mark" aria-hidden></span>
      <span>${esc(businessName)}</span>
    </div>
    <div class="foot-links">
      <a href="#services">Services</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>
    <p class="foot-copy">© ${new Date().getFullYear()} ${esc(businessName)} · ${esc(place)}</p>
  </div>
</footer>

<script src="/site.js" defer></script>
</body>
</html>
`;

  const css = `/* ${businessName} — generated by Nimos Build */
:root {
  --paper: ${paper};
  --ink: ${ink};
  --stone: ${stone};
  --accent: ${accent};
  --accent-light: color-mix(in srgb, ${accent} 15%, ${paper});
  --line: color-mix(in srgb, ${ink} 10%, transparent);
  --line-strong: color-mix(in srgb, ${ink} 20%, transparent);
  --display: "Playfair Display", Georgia, "Times New Roman", serif;
  --body: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
  --wrap: 1200px;
  --radius: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,.12);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font: 16px/1.6 var(--body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.wrap { width: min(var(--wrap), 100% - 2.5rem); margin-inline: auto; }

.skip { position: absolute; left: -9999px; }
.skip:focus { left: 1rem; top: 1rem; background: var(--ink); color: var(--paper); padding: .6rem 1rem; z-index: 100; border-radius: 4px; }

/* Header */
.top { position: sticky; top: 0; z-index: 50; background: color-mix(in srgb, var(--paper) 92%, transparent); backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.top-in { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding: 1rem 0; }
.brand { display: flex; align-items: center; gap: .6rem; font-weight: 600; font-size: 1.1rem; letter-spacing: -.01em; }
.brand-mark { width: .7rem; height: .7rem; background: var(--accent); display: inline-block; border-radius: 2px; }
.nav { display: flex; align-items: center; gap: 1.8rem; font-size: .88rem; color: var(--stone); }
.nav a { transition: color .2s; }
.nav a:hover { color: var(--ink); }
.nav-tel { font-variant-numeric: tabular-nums; color: var(--ink); border-bottom: 1px solid var(--accent); padding-bottom: 2px; font-weight: 500; }
.mobile-menu { display: none; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--ink); }

/* Hero */
.hero { padding: clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); gap: clamp(2rem, 5vw, 5rem); align-items: center; }
.eyebrow { font: 600 .7rem/1 var(--body); letter-spacing: .18em; text-transform: uppercase; color: var(--accent); margin: 0 0 1.2rem; }
h1 { font-family: var(--display); font-weight: 700; font-size: clamp(2.4rem, 5.5vw, 4.2rem); line-height: 1.05; letter-spacing: -.02em; margin: 0; }
.lede { font-size: clamp(1.05rem, 1.4vw, 1.2rem); color: var(--stone); max-width: 50ch; margin: 1.4rem 0 0; line-height: 1.7; }
.acts { display: flex; flex-wrap: wrap; gap: .8rem; margin-top: 2rem; }
.btn { display: inline-flex; align-items: center; justify-content: center; padding: .9rem 1.6rem; font: 600 .9rem/1 var(--body); border-radius: var(--radius); transition: all .2s ease; cursor: pointer; border: 2px solid transparent; }
.btn-primary { background: var(--ink); color: var(--paper); border-color: var(--ink); }
.btn-primary:hover { background: var(--accent); border-color: var(--accent); transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn-ghost { background: transparent; color: var(--ink); border-color: var(--line-strong); }
.btn-ghost:hover { border-color: var(--ink); transform: translateY(-2px); }
.btn.wide { width: 100%; }
.micro { font-size: .82rem; color: var(--stone); margin-top: 1.4rem; }

.hero-visual { display: flex; justify-content: center; }
.hero-card { width: 100%; max-width: 400px; aspect-ratio: 4/3; background: linear-gradient(135deg, var(--accent-light), color-mix(in srgb, ${accent} 8%, ${paper})); border-radius: 16px; padding: 2rem; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-lg); position: relative; overflow: hidden; }
.hero-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 30% 20%, color-mix(in srgb, ${accent} 20%, transparent), transparent 60%); }
.hero-card-inner { position: relative; z-index: 1; text-align: center; }
.hero-badge { display: inline-block; padding: .4rem .9rem; background: var(--paper); border-radius: 100px; font-size: .78rem; font-weight: 600; color: var(--accent); margin-bottom: 1rem; box-shadow: var(--shadow-sm); }
.hero-quote { font-family: var(--display); font-size: 1.15rem; font-style: italic; color: var(--ink); line-height: 1.5; max-width: 28ch; margin: 0 auto; }

/* Trust bar */
.trust-bar { padding: 2.5rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: color-mix(in srgb, ${ink} 3%, ${paper}); }
.trust-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
.proof-cell { text-align: center; }
.proof-k { font-family: var(--display); font-size: 1.15rem; font-weight: 600; margin: 0; color: var(--ink); }
.proof-d { color: var(--stone); font-size: .88rem; margin: .4rem 0 0; }

/* About */
.about { padding: clamp(3rem, 6vw, 5rem) 0; }
.about-grid { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 3rem; align-items: start; }
.about-label h2 { font-family: var(--display); font-size: 1.8rem; font-weight: 600; margin: .5rem 0 0; }
.about-copy { font-size: 1.1rem; line-height: 1.8; color: var(--stone); max-width: 65ch; }

/* Services */
.services { padding: clamp(3rem, 6vw, 5rem) 0; background: color-mix(in srgb, ${ink} 2%, ${paper}); }
.section-head { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
.section-head h2 { font-family: var(--display); font-weight: 600; font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1.1; margin: .4rem 0 0; letter-spacing: -.01em; }
.section-head p { margin: 0; color: var(--stone); font-size: .95rem; max-width: 45ch; line-height: 1.6; }
.svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.svc-card { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius); padding: 2rem; transition: all .25s ease; }
.svc-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--accent); }
.svc-num { font: 600 .75rem/1 var(--body); color: var(--accent); letter-spacing: .1em; display: block; margin-bottom: .8rem; }
.svc-card h3 { font-family: var(--display); font-size: 1.25rem; font-weight: 600; margin: 0 0 .6rem; letter-spacing: -.01em; }
.svc-card p { color: var(--stone); font-size: .92rem; line-height: 1.6; margin: 0; }

/* Gallery */
.gallery { padding: clamp(3rem, 6vw, 5rem) 0; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
.gallery-item { border-radius: var(--radius); overflow: hidden; aspect-ratio: 4/3; }
.gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
.gallery-item:hover img { transform: scale(1.05); }

/* Testimonials */
.testimonials { padding: clamp(3rem, 6vw, 5rem) 0; background: color-mix(in srgb, ${ink} 3%, ${paper}); }
.testimonial-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.testimonial { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius); padding: 2rem; margin: 0; }
.testimonial-quote { font-family: var(--display); font-size: 1.05rem; font-style: italic; line-height: 1.6; margin: 0 0 1.2rem; color: var(--ink); }
.testimonial footer { display: flex; flex-direction: column; gap: .2rem; }
.testimonial footer strong { font-weight: 600; font-size: .9rem; }
.testimonial footer span { font-size: .82rem; color: var(--stone); }

/* FAQ */
.faq { padding: clamp(3rem, 6vw, 5rem) 0; }
.faq-list { max-width: 720px; }
.faq-item { border-bottom: 1px solid var(--line); padding: 1.2rem 0; }
.faq-item summary { font-weight: 600; cursor: pointer; font-size: 1rem; list-style: none; display: flex; justify-content: space-between; align-items: center; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: "+"; font-size: 1.4rem; color: var(--accent); font-weight: 300; }
.faq-item[open] summary::after { content: "−"; }
.faq-item p { color: var(--stone); margin: .8rem 0 0; line-height: 1.7; font-size: .95rem; }

/* Contact */
.contact { padding: clamp(3rem, 6vw, 5rem) 0; border-top: 1px solid var(--line); }
.contact-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, .85fr); gap: clamp(2rem, 5vw, 4rem); }
.contact h2 { font-family: var(--display); font-weight: 600; font-size: clamp(1.8rem, 3vw, 2.4rem); line-height: 1.1; margin: .4rem 0 0; letter-spacing: -.01em; }
.contact-p { color: var(--stone); margin: 1rem 0 0; max-width: 45ch; line-height: 1.7; }
.details { margin: 2rem 0 0; display: grid; gap: .8rem; }
.details div { display: grid; grid-template-columns: 90px minmax(0, 1fr); gap: 1rem; border-top: 1px solid var(--line); padding-top: .7rem; }
.details dt { font: 600 .68rem/1.6 var(--body); letter-spacing: .14em; text-transform: uppercase; color: var(--stone); }
.details dd { margin: 0; font-variant-numeric: tabular-nums; }
.details a { border-bottom: 1px solid var(--accent); padding-bottom: 1px; }

.form { display: grid; gap: 1rem; align-content: start; }
.field { display: grid; gap: .4rem; }
.field label { font: 600 .7rem/1 var(--body); letter-spacing: .12em; text-transform: uppercase; color: var(--stone); }
.field input, .field textarea { width: 100%; background: transparent; border: 1px solid var(--line-strong); border-radius: var(--radius); padding: .85rem 1rem; font: inherit; color: inherit; outline: none; transition: border-color .2s; }
.field input:focus, .field textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.field input::placeholder, .field textarea::placeholder { color: color-mix(in srgb, ${stone} 50%, transparent); }
.form-note { font-size: .78rem; color: var(--stone); margin: .2rem 0 0; }

/* Footer */
.foot { border-top: 1px solid var(--line); padding: 2rem 0; }
.foot-in { display: flex; justify-content: space-between; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.foot-brand { display: flex; align-items: center; gap: .5rem; font-weight: 600; font-size: .95rem; }
.foot-links { display: flex; gap: 1.5rem; font-size: .85rem; color: var(--stone); }
.foot-links a:hover { color: var(--ink); }
.foot-copy { font-size: .8rem; color: var(--stone); margin: 0; }

/* Responsive */
@media (max-width: 900px) {
  .hero-grid, .contact-grid, .about-grid { grid-template-columns: 1fr; }
  .nav a:not(.nav-tel) { display: none; }
  .mobile-menu { display: block; }
  .nav.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--paper); padding: 1rem 1.5rem; border-bottom: 1px solid var(--line); gap: .8rem; }
  .section-head { flex-direction: column; align-items: start; }
  .hero-visual { order: -1; }
  .hero-card { max-width: 100%; aspect-ratio: 16/9; }
}
@media (max-width: 600px) {
  .svc-grid { grid-template-columns: 1fr; }
  .testimonial-grid { grid-template-columns: 1fr; }
  .gallery-grid { grid-template-columns: 1fr 1fr; }
  .trust-grid { grid-template-columns: 1fr 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
  html { scroll-behavior: auto; }
}
@media (prefers-color-scheme: dark) {
  /* Keep light theme for brand consistency */
}
`;

  const js = `// ${businessName} — form handling. No tracking, no dependencies.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-lead-form]");
  if (!form) return;
  const note = form.querySelector("[data-lead-note]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const data = Object.fromEntries(new FormData(form).entries());
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    try {
      const r = await fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error("bad status");
      form.reset();
      if (note) note.textContent = "Got it. We'll get back to you today or first thing tomorrow.";
      if (btn) btn.textContent = "Sent ✓";
    } catch {
      if (note) note.textContent = "That didn't go through. Call instead — the number is above.";
      if (btn) { btn.disabled = false; btn.textContent = "Send message"; }
    }
  });
  // Mobile menu toggle
  const menuBtn = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  }
});
`;

  const lead = `// Lead endpoint for ${businessName}.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const name = String(body.name || "").trim().slice(0, 120);
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) && !/^[+\\d][\\d\\s().-]{6,}$/.test(email)) {
    return res.status(400).json({ error: "contact" });
  }
  if (message.length < 3 || message.length > 4000) return res.status(400).json({ error: "message" });
  console.log("lead", JSON.stringify({ name, email, message: message.slice(0, 200) }));
  return res.status(200).json({ ok: true });
}
`;

  return {
    "index.html": html,
    "styles.css": css,
    "site.js": js,
    "api/lead.js": lead,
    "robots.txt": domain ? `User-agent: *\nAllow: /\nSitemap: https://${domain}/sitemap.xml\n` : "User-agent: *\nDisallow: /\n",
  };
}
