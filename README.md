# Altivision — SAP Training & Enterprise Support (Static Website)

A modern, premium, conversion-focused static website for **Altivision IT Solutions**, a Pune SAP firm. It covers two business verticals:

1. **`index.html`** — SAP **training** for students & professionals (courses, batches, placement).
2. **`sap-support.html`** — **enterprise SAP support / AMS** for companies, sold as annual maintenance contracts (services, support plans, anonymized portfolio, request-a-quote).

The two pages share the same design system, stylesheet and Tailwind build, and cross-link from the navbar and footer.

## Stack

- **HTML5** — semantic, SEO-optimized markup
- **TailwindCSS** — pre-built via local CLI (`npm run build:css`) into `assets/tailwind.css`
- **Vanilla JavaScript** — sticky nav, mobile menu, scroll reveal, FAQ accordion, contact form, course rendering
- **Google Fonts** — Plus Jakarta Sans (headings) + Inter (body)

## Project structure

```
Altivision/
├── index.html              # Training vertical (students) — all sections
├── sap-support.html        # Enterprise SAP support / AMS vertical (companies)
├── assets/
│   ├── logo.webp           # Site logo
│   ├── tailwind.css        # Built, purged Tailwind (output — do not edit)
│   ├── styles.css          # Custom styles beyond Tailwind (animations, components)
│   ├── script.js           # index.html interactivity + COURSES data
│   └── support.js          # sap-support.html interactivity + SERVICES & PORTFOLIO data
├── src/
│   └── input.css           # Tailwind entry (@tailwind base/components/utilities)
├── tailwind.config.js      # Tailwind theme + content scan paths (both .html + both .js)
├── package.json            # build:css / watch:css scripts
└── README.md
```

## Build the stylesheet

Tailwind compiles locally into `assets/tailwind.css`. Run once after cloning, and again whenever you add new utility classes to any scanned file (`index.html`, `sap-support.html`, `assets/script.js`, `assets/support.js` — all listed in `tailwind.config.js` `content`):

```bash
npm install
npm run build:css        # one-shot, minified
npm run watch:css        # rebuild on save during development
```

Commit `assets/tailwind.css` so deploys don't need a build step.

## Run locally

After building the stylesheet, open `index.html` directly, or serve over HTTP for best results (some browsers throttle file:// loading):

```bash
# Option 1 — Python
python3 -m http.server 5173

# Option 2 — Node (npx)
npx serve .

# Option 3 — VS Code "Live Server" extension
```

Then visit `http://localhost:5173`.

## Deploy

Drag the project folder into any static host:

- **Netlify** — drop the folder onto app.netlify.com
- **Vercel** — `vercel` in the project directory
- **GitHub Pages** — push to `gh-pages` branch and enable Pages
- **Cloudflare Pages** — connect the repo, no build command needed (output dir = `/`)

## Sections — `index.html` (Training)

1. Sticky glass navbar with mobile drawer
2. Hero with gradient blobs, animated headline, feature pills
3. Trust metrics strip (students, trainers, placement, batches, certifications)
4. About Altivision
5. Why Choose Altivision — 7 feature cards with hover gradient border
6. SAP Courses — 8 modules with skills chips (rendered from `COURSES` in `script.js`)
7. Career Outcomes — dark gradient section
8. Learning Experience — 6-step timeline
9. CTA banner
10. Testimonials — 6 student cards
11. Batch timings (Morning / Afternoon / Evening / Weekend)
12. FAQ accordion
13. Contact (cards + form + embedded Google Map)
14. Footer with quick links, modules, contact, social
15. Floating WhatsApp button with pulse animation

The homepage also has a **"For Businesses"** teaser band (before Career Outcomes) linking to the enterprise page.

## Sections — `sap-support.html` (Enterprise SAP Support / AMS)

1. Navbar + mobile drawer (cross-links back to Training)
2. Hero with an SLA "Support Snapshot" card
3. Trust metrics strip (enterprises supported, SLA, coverage, modules, tenure)
4. About — why outsource SAP support / annual maintenance value prop
5. Services — 8 cards rendered from `SERVICES` in `support.js` (AMS, Basis, S/4HANA migration, implementation, enhancements, integration, enablement, functional consulting)
6. Engagement models — dark section (Annual AMS Retainer / Dedicated Team / T&M / Staff Aug)
7. Annual support plans — 3 quote-based tiers (Essential / Professional / Enterprise), middle one featured
8. Portfolio — anonymized, sector-based case studies rendered from `PORTFOLIO` in `support.js`
9. Why Altivision — 6 differentiator cards
10. Onboarding — 4-step timeline (Discovery → KT → Steady-state → Continuous improvement)
11. Testimonials — 3 anonymized enterprise quotes
12. CTA banner + FAQ accordion
13. Request-a-Quote contact (B2B form + contact cards)
14. Footer + floating WhatsApp button

> **Placeholders:** The portfolio entries, trust metrics and testimonials on the enterprise page are realistic but **illustrative** — replace them with real (NDA-cleared) client engagements, numbers and quotes before publishing.

## Customizing content

### Phone / email / WhatsApp
Current details (from altivision.co.in):
- **Phone (primary)**: +91 86238 57899
- **Phone (secondary)**: +91 82371 91400
- **Email**: info@altivision.co.in · connect@altivision.co.in
- **WhatsApp**: wa.me/918623857899
- **Hours**: Mon–Sat · 9:00 AM – 7:00 PM
- **Address**: Office No 4, Goodwill Zest County, Lohegaon, Pune – 411027

To change, search-and-replace these strings inside `index.html`:
- `+91 86238 57899` / `+918623857899`
- `+91 82371 91400` / `+918237191400`
- `info@altivision.co.in` / `connect@altivision.co.in`
- `wa.me/918623857899` (WhatsApp deeplinks)

### Courses
Edit the `COURSES` array near the top of `assets/script.js`. Each item:

```js
{
  code: 'FI',
  title: 'SAP FICO · S/4 HANA',
  grad: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
  desc: '…',
  skills: ['General Ledger', 'AP / AR', …],
}
```

### Services & portfolio (enterprise page)
Edit the `SERVICES` and `PORTFOLIO` arrays near the top of `assets/support.js`. `SERVICES` items take an `icon` (Tailwind colour classes), inline SVG `svg` path(s), `title`, `desc` and `chips`. `PORTFOLIO` items take a `sector`, `name`, `scope` and a `stats` array of `[value, label]` pairs. Replace the sample portfolio entries with real, NDA-cleared engagements. Support-plan tiers are static markup in `sap-support.html` (the `.plan-card` blocks).

### Brand colors
Tweak `theme.extend.colors.brand` in `tailwind.config.js`, run `npm run build:css`, and update the `--grad` CSS variable in `assets/styles.css` to match.

### Wiring the contact form
Both forms (the training enquiry in `assets/script.js` and the request-a-quote in `assets/support.js`) currently log to console and show a success message. To actually receive leads, swap the `form.addEventListener('submit', …)` handler for one of:

- **Formspree** — `fetch('https://formspree.io/f/<your-id>', { method: 'POST', body: new FormData(form) })`
- **EmailJS** — call `emailjs.sendForm(...)`
- **WhatsApp deeplink** — build `https://wa.me/<num>?text=...` and `window.open(...)`
- **Custom endpoint** — `fetch('/api/lead', { method: 'POST', body: JSON.stringify(data) })`

## SEO checklist

- ✅ Semantic `<header>`, `<section>`, `<article>`, `<footer>`
- ✅ Single `<h1>` in hero, logical heading hierarchy
- ✅ Meta description, keywords, canonical
- ✅ Open Graph + Twitter Card tags
- ✅ JSON-LD — `EducationalOrganization`/`LocalBusiness` + `Course`/`FAQPage` (training); `ProfessionalService`/`Service` + `FAQPage` (enterprise support)
- ✅ `lazy` loaded iframe for map
- ✅ Mobile-first responsive

## Accessibility

- ✅ `aria-label` on icon buttons
- ✅ Focus-visible styles on form inputs
- ✅ `prefers-reduced-motion` honored
- ✅ Sufficient color contrast on text against gradient backgrounds

## Performance notes

- Tailwind is **pre-built and purged** via the local CLI (`npm run build:css`) — no Play CDN runtime JIT in the browser.
- Logo ships as WebP (`assets/logo.webp`) and is preloaded with `fetchpriority="high"`.
- Google Fonts load non-blocking via the `media="print" onload="this.media='all'"` pattern (with a `<noscript>` fallback).
- `assets/script.js` is `defer`-loaded so it never blocks HTML parsing.
- All animations are GPU-friendly (`transform`, `opacity`).
- Scroll reveal uses `IntersectionObserver` (no scroll listeners).

---

Built for SAP careers · Pune, India
