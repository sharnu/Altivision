# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pure static marketing site for **Altivision IT Solutions** (a Pune SAP firm). No framework, no bundler, no runtime build — just hand-authored HTML, one custom CSS file, vanilla JS, and a pre-built Tailwind stylesheet. There are two pages, one per business vertical:

- `index.html` — SAP **training** for students/professionals (courses, batches, placement, training-institute partners).
- `sap-support.html` — enterprise **SAP implementation & support (AMS)** for companies (implementation & rollouts plus services, support plans, named client wall, anonymized portfolio, request-a-quote).

The two pages share the same design system, `assets/styles.css`, and `assets/tailwind.css`, and cross-link via navbar/footer.

## Commands

```bash
npm install            # one-time, installs tailwindcss CLI (devDependency only)
npm run build:css      # compile + purge + minify -> assets/tailwind.css
npm run watch:css      # rebuild on save during development
python3 -m http.server 5173   # serve locally (open http://localhost:5173)
```

There is **no test/lint suite**. "Building" means rebuilding the Tailwind stylesheet.

## The Tailwind build is the one real gotcha

`assets/tailwind.css` is **pre-built, purged, and committed to git**. The Azure deploy (see below) uploads the repo as-is and runs **no build step**, so an out-of-date or unbuilt `tailwind.css` ships broken styling to production.

Therefore, whenever you add/change utility classes in any scanned file:

1. Ensure the file is listed in `tailwind.config.js` → `content` (currently `index.html`, `sap-support.html`, `assets/script.js`, `assets/support.js`). **A new HTML/JS file not added here will have its classes purged out** and appear unstyled.
2. Run `npm run build:css`.
3. Commit the regenerated `assets/tailwind.css` alongside your markup changes.

Verify a class survived purge with e.g. `grep -F 'lg\:grid-cols-3' assets/tailwind.css` (note `:` and `.` are backslash-escaped in the output).

## Architecture / conventions

- **Styling is split deliberately.** Reusable component classes (`.btn-primary`, `.section-title`, `.eyebrow`, `.feature-card`, `.course-card`, `.plan-card`, `.portfolio-card`, `.client-card`, etc.) live in `assets/styles.css`. Tailwind utilities handle layout/spacing inline in the HTML. `styles.css` is linked **before** `tailwind.css` so utilities win on conflicts. Prefer reusing an existing component class over inventing new utility soup.
- **Brand tokens are defined twice and must stay in sync.** Colors/shadows/animations live in `tailwind.config.js` (`theme.extend`), and the gradient is *also* hardcoded as the `--grad` CSS variable at the top of `assets/styles.css`. Change one, change the other.
- **Card-grid content is JS-rendered from data arrays, not hardcoded HTML.** `assets/script.js` renders `COURSES` into `#coursesGrid` and `PARTNERS` into `#partnersGrid`; `assets/support.js` renders `SERVICES` into `#servicesGrid`, `PORTFOLIO` into `#portfolioGrid`, and `CLIENTS` into `#clientsGrid`. To change those sections, edit the arrays — not the markup. Each page loads exactly one JS file (`script.js` / `support.js`); the shared interaction code (sticky nav, mobile menu, `IntersectionObserver` scroll-reveal via `[data-reveal]`→`.is-visible`, FAQ accordion, footer year) is duplicated across both rather than shared, so fixes to that behavior must be applied in both files.
- **Client / partner logos are self-hosted in `assets/logos/` and wired by data, not markup.** Each `CLIENTS` / `PARTNERS` item carries an optional `logo` (path under `assets/logos/`), `url`, and (partners) `desc`. The shared `.client-card` render branches: a `logo` → logo image + name caption (`.client-card--logo`); a `desc` additionally → description + "Visit website" CTA (`.client-card--rich`, used by partner cards); otherwise a plain styled name card. Logos display full-colour on all devices (no hover-only treatment, so mobile/touch renders correctly). Add new logos as real image files committed to `assets/logos/` (don't hotlink third-party URLs).
- **Forms have no backend.** Both the training enquiry form and the enterprise quote form only validate, `console.log`, and show a success message. Wiring to Formspree/EmailJS/a webhook is documented in `README.md`.
- **SEO is first-class and per-page.** Each HTML file carries its own `<title>`/meta/OpenGraph, a `canonical`, and a JSON-LD `@graph` (`EducationalOrganization`+`Course`+`FAQPage` on the homepage; `ProfessionalService`+`Service`+`FAQPage` on the support page). FAQ accordion copy is mirrored in the JSON-LD `FAQPage` — keep them consistent. `sitemap.xml` is maintained by hand; add new pages/anchors there.
- **The named `CLIENTS`/`PARTNERS` lists are real; the `PORTFOLIO` is still placeholder.** The `CLIENTS` wall (support page) and `PARTNERS` wall (homepage) name real organizations with their logos. By contrast the `PORTFOLIO` case studies, trust metrics, and testimonials in/around `sap-support.html` remain realistic but illustrative (flagged with code comments) and should be replaced with real, NDA-cleared data before relying on them publicly — its intro copy is deliberately worded so the named wall above it doesn't contradict the NDA framing.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/azure-static-web-apps-*.yml`) deploys to **production** via Azure Static Web Apps. The workflow uploads `/` as-is (`output_location: "."`) with **no build command**, which is why the committed `tailwind.css` matters. Pull requests get automatic preview deployments and a PR comment with the URL. Because `main` is auto-deployed, treat any push to `main` as publishing to the live site.
