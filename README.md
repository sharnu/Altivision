# Altivision — SAP Training Institute (Static Website)

A modern, premium, conversion-focused single-page website for **Altivision**, an SAP training institute in Pune. Built as a pure static site — no build step required.

## Stack

- **HTML5** — semantic, SEO-optimized markup
- **TailwindCSS** — via CDN with inline `tailwind.config` for custom theme tokens
- **Vanilla JavaScript** — sticky nav, mobile menu, scroll reveal, FAQ accordion, contact form, course rendering
- **Google Fonts** — Plus Jakarta Sans (headings) + Inter (body)

## Project structure

```
Altivision/
├── index.html              # Single-page site, all 12 sections
├── assets/
│   ├── styles.css          # Custom styles beyond Tailwind (animations, components)
│   └── script.js           # Interactivity + courses data
└── README.md
```

## Run locally

No build step is required. Open `index.html` directly, or serve over HTTP for best results (some browsers throttle file:// loading):

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

## Sections

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

## Customizing content

### Phone / email / WhatsApp
Current details (from altivision.co.in):
- **Phone (primary)**: +91 86238 57899
- **Phone (secondary)**: +91 82371 91400
- **Email**: info@altivision.co.in · connect@altivision.co.in
- **WhatsApp**: wa.me/918623857899
- **Hours**: Mon–Sat · 9:00 AM – 7:00 PM
- **Address**: Shop No 4, Goodwill Zest County, Lohegaon, Pune – 411027

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

### Brand colors
Tweak `tailwind.config.theme.extend.colors.brand` inside the `<script>` tag at the top of `index.html`, plus the `--grad` CSS variable in `assets/styles.css`.

### Wiring the contact form
The form currently logs to console and shows a success message. To actually receive leads, swap the `form.addEventListener('submit', …)` handler in `assets/script.js` for one of:

- **Formspree** — `fetch('https://formspree.io/f/<your-id>', { method: 'POST', body: new FormData(form) })`
- **EmailJS** — call `emailjs.sendForm(...)`
- **WhatsApp deeplink** — build `https://wa.me/<num>?text=...` and `window.open(...)`
- **Custom endpoint** — `fetch('/api/lead', { method: 'POST', body: JSON.stringify(data) })`

## SEO checklist

- ✅ Semantic `<header>`, `<section>`, `<article>`, `<footer>`
- ✅ Single `<h1>` in hero, logical heading hierarchy
- ✅ Meta description, keywords, canonical
- ✅ Open Graph + Twitter Card tags
- ✅ JSON-LD `EducationalOrganization` schema
- ✅ `lazy` loaded iframe for map
- ✅ Mobile-first responsive

## Accessibility

- ✅ `aria-label` on icon buttons
- ✅ Focus-visible styles on form inputs
- ✅ `prefers-reduced-motion` honored
- ✅ Sufficient color contrast on text against gradient backgrounds

## Performance notes

- Tailwind is loaded via CDN for setup simplicity. For production, run the Tailwind CLI to generate a minified utility-only stylesheet:
  ```bash
  npx tailwindcss -i ./input.css -o ./assets/tailwind.min.css --minify
  ```
  …then swap the `<script src="https://cdn.tailwindcss.com">` for `<link rel="stylesheet" href="assets/tailwind.min.css">`.
- All animations are GPU-friendly (`transform`, `opacity`).
- Scroll reveal uses `IntersectionObserver` (no scroll listeners).

---

Built for SAP careers · Pune, India
