/* =====================================================
   Altivision — Enterprise SAP Support page interactivity
   Self-contained: shares the same patterns as script.js so
   index.html stays untouched.
   ===================================================== */

// ---------- Sticky navbar shadow on scroll ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 12) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Mobile menu ----------
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

const openIcon  = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

if (menuBtn && mobileMenu) {
  const setMenuOpen = (open) => {
    mobileMenu.classList.toggle('hidden', !open);
    menuBtn.innerHTML = open ? closeIcon : openIcon;
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => {
    setMenuOpen(mobileMenu.classList.contains('hidden'));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setMenuOpen(false));
  });
}

// ---------- Scroll reveal (IntersectionObserver) ----------
const reveal = (entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  });
};
const io = new IntersectionObserver(reveal, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// ---------- Services data + render ----------
const SERVICES = [
  {
    icon: 'bg-emerald-100 text-emerald-600',
    svg: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    title: 'SAP Implementation & Rollouts',
    desc: 'Greenfield and brownfield implementations plus country, plant and company-code rollouts — fit-gap, configuration, data migration and go-live support.',
    chips: ['Greenfield', 'Rollouts', 'Fit-Gap', 'Go-Live'],
  },
  {
    icon: 'bg-indigo-100 text-brand-indigo',
    svg: '<path d="M9 12l2 2 4-4"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 5c0 1.66 4 3 9 3s9-1.34 9-3-4-3-9-3-9 1.34-9 3z"/>',
    title: 'Application Management & Support (AMS)',
    desc: 'Day-to-day functional & technical support across your modules — incidents, service requests, bug fixes and month-end support, all under agreed SLAs.',
    chips: ['Incidents', 'Service Requests', 'Month-end', 'SLA-bound'],
  },
  {
    icon: 'bg-purple-100 text-brand-purple',
    svg: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    title: 'S/4HANA Migration & Upgrades',
    desc: 'ECC-to-S/4HANA conversions, EHP and support-pack upgrades, readiness checks, custom-code remediation and full regression testing.',
    chips: ['ECC → S/4', 'Readiness', 'Testing'],
  },
  {
    icon: 'bg-cyan-100 text-brand-cyan',
    svg: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    title: 'SAP Basis & HANA Administration',
    desc: 'System monitoring, performance tuning, transport management, kernel & support-pack patching, backups, DR and user & security administration.',
    chips: ['Monitoring', 'Patching', 'Security', 'Backups'],
  },
  {
    icon: 'bg-amber-100 text-amber-600',
    svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    title: 'Enhancements & Development',
    desc: 'Custom reports, forms, workflows and interfaces built right — ABAP, OOPS, Fiori / UI5, CDS views and BTP extensions on top of your standard processes.',
    chips: ['ABAP', 'Fiori / UI5', 'Workflow', 'Forms'],
  },
  {
    icon: 'bg-rose-100 text-rose-500',
    svg: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>',
    title: 'Integration Support',
    desc: 'Keep your interfaces flowing — SAP Cloud Integration (CPI), PI / PO, IDocs, EDI and REST / OData APIs to banks, portals and third-party systems.',
    chips: ['CPI', 'PI / PO', 'EDI', 'APIs'],
  },
  {
    icon: 'bg-indigo-100 text-brand-indigo',
    svg: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    title: 'End-User Enablement',
    desc: 'Key-user and end-user training, process documentation and change management — backed by Altivision’s training arm to lift adoption across your teams.',
    chips: ['Training', 'Documentation', 'Change Mgmt'],
  },
  {
    icon: 'bg-cyan-100 text-brand-cyan',
    svg: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    title: 'Functional Consulting (On-Demand)',
    desc: 'Configuration changes, new process design and optimisation across FICO, MM, SD, PP, EWM and SuccessFactors — drawn down as you need them.',
    chips: ['Config', 'Process Design', 'Optimisation'],
  },
];

const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
  servicesGrid.innerHTML = SERVICES.map((s, i) => `
    <article class="feature-card service-card" data-reveal style="transition-delay:${(i % 3) * 60}ms">
      <span class="feature-icon ${s.icon}">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${s.svg}</svg>
      </span>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="course-skills">
        ${s.chips.map(c => `<span class="skill-chip">${c}</span>`).join('')}
      </div>
    </article>
  `).join('');
  servicesGrid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ---------- Portfolio (anonymized case studies) data + render ----------
// NOTE: These are realistic, illustrative engagements for layout/SEO.
// Replace with real (NDA-cleared) client engagements before publishing.
const PORTFOLIO = [
  {
    sector: 'Manufacturing',
    name: 'Auto-components manufacturer · Pune',
    scope: 'End-to-end AMS across MM, SD, PP and FICO on S/4HANA — incident resolution, month-end close support and continuous enhancements.',
    stats: [['250+', 'Users'], ['99.6%', 'SLA met'], ['4 yrs', 'Engagement']],
  },
  {
    sector: 'Pharma & Life Sciences',
    name: 'Mid-size pharmaceutical company · Hyderabad',
    scope: '24×7 support for S/4HANA with EWM, including batch & GxP-sensitive processes, validation support and integration monitoring.',
    stats: [['24×7', 'Coverage'], ['S/4HANA', 'Landscape'], ['2022', 'Since']],
  },
  {
    sector: 'FMCG & Retail',
    name: 'Packaged-foods company · Mumbai',
    scope: 'AMS for SD, MM and FICO plus a Fiori launchpad rollout — order-to-cash optimisation and distributor-portal interfaces.',
    stats: [['180+', 'Users'], ['Fiori', 'Rollout'], ['99.4%', 'SLA met']],
  },
  {
    sector: 'Logistics & Warehousing',
    name: '3PL & warehousing operator · Bhiwandi',
    scope: 'EWM-centric support with RF, wave and slotting tuning, plus EDI / API integration support to customer ERP systems.',
    stats: [['EWM', 'Core'], ['99.4%', 'SLA met'], ['3 yrs', 'Engagement']],
  },
  {
    sector: 'Automotive · Gulf',
    name: 'Automotive distributor · UAE',
    scope: 'S/4HANA upgrade followed by ongoing AMS for FICO and SD — multi-currency, VAT compliance and dealer-network reporting.',
    stats: [['S/4 Upgrade', 'Delivered'], ['Gulf', 'Region'], ['AMS', 'Ongoing']],
  },
  {
    sector: 'Engineering & EPC',
    name: 'Engineering services firm · Pune',
    scope: 'Project-systems-led AMS spanning PS, MM and FICO with custom enhancements for project billing and resource planning.',
    stats: [['PS · MM · FICO', 'Scope'], ['Custom', 'Enhancements'], ['16×5', 'Support']],
  },
];

const portfolioGrid = document.getElementById('portfolioGrid');
if (portfolioGrid) {
  portfolioGrid.innerHTML = PORTFOLIO.map((p, i) => `
    <article class="portfolio-card" data-reveal style="transition-delay:${(i % 3) * 60}ms">
      <span class="portfolio-tag">${p.sector}</span>
      <h3>${p.name}</h3>
      <p class="pf-scope">${p.scope}</p>
      <div class="pf-meta">
        ${p.stats.map(([n, l]) => `<div class="pf-stat"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('')}
      </div>
    </article>
  `).join('');
  portfolioGrid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ---------- Clients (named) data + render ----------
const CLIENTS = [
  { name: 'Gera Realty',                       url: 'https://www.gera.in/',                logo: 'assets/logos/gera.webp' },
  { name: 'Tech Point IT Solutions',           url: 'https://techpointsolution.com/',      logo: 'assets/logos/techpoint.png' },
  { name: 'Intellect Bizware',                 url: 'https://intellectbizware.com',        logo: 'assets/logos/intellect-bizware.png' },
  { name: 'SCOPE T&M Pvt Ltd',                 url: 'https://www.scopetnm.com/',           logo: 'assets/logos/scope-tm.png' },
  { name: 'Mitashi Global',                    url: 'https://www.mitashiglobal.com/',      logo: 'assets/logos/mitashi-global.png' },
  { name: 'Suved Engineering',                 url: 'https://suvedengineering.com/',        logo: 'assets/logos/suved-engineering.png' },
  { name: 'Mechem Technologies',                                                           logo: 'assets/logos/mechem.png' },
  { name: 'Premium Chick Feeds Pvt Ltd',       url: 'https://premiumchickfeeds.in/',       logo: 'assets/logos/premium-chick-feeds.png' },
  { name: 'Maxlord Global Industries Pvt Ltd', url: 'https://www.maxlordindustries.com/', logo: 'assets/logos/maxlord.png' },
  { name: 'Nutrivana Private Limited',                                                     logo: 'assets/logos/nutrivana.webp' },
];

const clientsGrid = document.getElementById('clientsGrid');
if (clientsGrid) {
  clientsGrid.innerHTML = CLIENTS.map((c, i) => {
    const arrow = c.url && !c.logo ? '<span class="c-arrow" aria-hidden="true">↗</span>' : '';
    const inner = c.logo
      ? `<img class="c-logo" src="${c.logo}" alt="${c.name} logo" loading="lazy" decoding="async"><span class="c-name">${c.name}</span>`
      : `<span class="c-name">${c.name}${arrow}</span>`;
    const cls = c.logo ? 'client-card client-card--logo' : 'client-card';
    return c.url
      ? `<a class="${cls}" href="${c.url}" target="_blank" rel="noopener" data-reveal style="transition-delay:${(i % 3) * 60}ms">${inner}</a>`
      : `<div class="${cls}" data-reveal style="transition-delay:${(i % 3) * 60}ms">${inner}</div>`;
  }).join('');
  clientsGrid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ---------- FAQ accordion: close others on open ----------
const faqs = document.querySelectorAll('#faqList .faq');
faqs.forEach(faq => {
  faq.addEventListener('toggle', () => {
    if (faq.open) {
      faqs.forEach(other => { if (other !== faq) other.open = false; });
    }
  });
});

// ---------- Quote form ----------
const form   = document.getElementById('quoteForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.company || !data.name || !data.email || !data.phone) {
      showStatus('Please fill in your company, name, email and phone.', 'error');
      return;
    }

    // No backend wired yet — surface success state and log payload.
    // Replace with your endpoint, EmailJS, Formspree or a CRM webhook.
    console.log('[Altivision] Quote request:', data);

    showStatus('Thanks! Our SAP support team will reach out within one business day.', 'ok');
    form.reset();
  });
}

function showStatus(msg, kind) {
  if (!status) return;
  status.textContent = msg;
  status.classList.remove('hidden', 'text-emerald-600', 'text-rose-600');
  status.classList.add(kind === 'ok' ? 'text-emerald-600' : 'text-rose-600');
  if (kind === 'ok') {
    setTimeout(() => status.classList.add('hidden'), 6000);
  }
}

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
