/* =====================================================
   Altivision — Interactivity
   ===================================================== */

// ---------- Sticky navbar shadow on scroll ----------
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (window.scrollY > 12) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Mobile menu ----------
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

const openIcon  = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const setMenuOpen = (open) => {
  mobileMenu.classList.toggle('hidden', !open);
  menuBtn.innerHTML = open ? closeIcon : openIcon;
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};

menuBtn.addEventListener('click', () => {
  setMenuOpen(mobileMenu.classList.contains('hidden'));
});

// Close mobile menu on link tap
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => setMenuOpen(false));
});

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

// ---------- Courses data + render ----------
const COURSES = [
  {
    code: 'SF',
    title: 'SAP SuccessFactors',
    grad: 'linear-gradient(135deg,#6366F1,#8B5CF6)',
    desc: 'Cloud HCM suite. Master Employee Central, Recruiting, Performance, Onboarding 2.0 and LMS.',
    skills: ['Employee Central', 'Recruiting', 'Performance', 'LMS', 'Onboarding 2.0'],
  },
  {
    code: 'MM',
    title: 'SAP MM · S/4 HANA',
    grad: 'linear-gradient(135deg,#06B6D4,#3B82F6)',
    desc: 'Procurement and inventory management on S/4 HANA. Configure purchasing, MRP and invoice verification.',
    skills: ['Procurement', 'Inventory', 'MRP', 'Pricing', 'Invoice Verification'],
  },
  {
    code: 'FI',
    title: 'SAP FICO · S/4 HANA',
    grad: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
    desc: 'Financial Accounting & Controlling. GL, AP/AR, Asset Accounting, Cost Centers, CO-PA.',
    skills: ['General Ledger', 'AP / AR', 'Asset Acc.', 'Cost Centers', 'CO-PA'],
  },
  {
    code: 'SD',
    title: 'SAP SD',
    grad: 'linear-gradient(135deg,#F59E0B,#EF4444)',
    desc: 'Sales & Distribution mastery. Order-to-cash, pricing, shipping, billing and credit management.',
    skills: ['Order Mgmt', 'Pricing', 'Shipping', 'Billing', 'Credit Mgmt'],
  },
  {
    code: 'WM',
    title: 'SAP EWM',
    grad: 'linear-gradient(135deg,#10B981,#06B6D4)',
    desc: 'Extended Warehouse Management. Inbound, outbound, RF framework, slotting and wave management.',
    skills: ['Inbound', 'Outbound', 'RF Framework', 'Slotting', 'Wave Mgmt'],
  },
  {
    code: 'PP',
    title: 'SAP PP',
    grad: 'linear-gradient(135deg,#EF4444,#F59E0B)',
    desc: 'Production Planning end-to-end. BOM, work centers, routings, MRP runs and capacity planning.',
    skills: ['BOM', 'Routings', 'MRP', 'Capacity', 'Discrete Mfg'],
  },
  {
    code: 'AB',
    title: 'SAP ABAP',
    grad: 'linear-gradient(135deg,#1E3A8A,#6366F1)',
    desc: 'SAP programming. Reports, ALV, Smart Forms, OOPS ABAP, BAPIs and OData services.',
    skills: ['Reports', 'ALV', 'Smart Forms', 'OOPS ABAP', 'OData'],
  },
  {
    code: 'CPI',
    title: 'SAP CPI',
    grad: 'linear-gradient(135deg,#0EA5E9,#22D3EE)',
    desc: 'Cloud Platform Integration. Build iFlows, adapters and mappings between cloud and on-premise SAP.',
    skills: ['iFlows', 'Adapters', 'Mapping', 'OAuth', 'SF Integration'],
  },
];

const coursesGrid = document.getElementById('coursesGrid');
if (coursesGrid) {
  coursesGrid.innerHTML = COURSES.map((c, i) => `
    <article class="course-card" data-reveal style="transition-delay:${i * 40}ms">
      <span class="accent"></span>
      <div class="course-icon" style="background:${c.grad}">${c.code}</div>
      <h3>${c.title}</h3>
      <p class="desc">${c.desc}</p>
      <div class="course-skills">
        ${c.skills.map(s => `<span class="skill-chip">${s}</span>`).join('')}
      </div>
      <div class="course-cta">
        <a href="#contact">Enroll Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <span class="text-xs text-ink-400 font-medium">3–5 months</span>
      </div>
    </article>
  `).join('');

  // Re-observe new reveal nodes
  coursesGrid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

// ---------- Training partners data + render ----------
const PARTNERS = [
  { name: 'Educenter',            tag: 'Training Partner', url: 'http://www.educenter.org.in/' },
  { name: 'CompCare IT Solution', tag: 'Training Partner', url: 'https://www.compcareitsolution.com/' },
];

const partnersGrid = document.getElementById('partnersGrid');
if (partnersGrid) {
  partnersGrid.innerHTML = PARTNERS.map((p, i) => {
    const arrow = p.url ? '<span class="c-arrow" aria-hidden="true">↗</span>' : '';
    const inner = `<span class="c-name">${p.name}${arrow}</span>${p.tag ? `<span class="c-tag">${p.tag}</span>` : ''}`;
    return p.url
      ? `<a class="client-card" href="${p.url}" target="_blank" rel="noopener" data-reveal style="transition-delay:${(i % 3) * 60}ms">${inner}</a>`
      : `<div class="client-card" data-reveal style="transition-delay:${(i % 3) * 60}ms">${inner}</div>`;
  }).join('');
  partnersGrid.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
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

// ---------- Contact form ----------
const form   = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.email || !data.phone || !data.course) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // No backend wired yet — surface success state and log payload.
    // Replace with your endpoint, EmailJS, Formspree or WhatsApp deeplink.
    console.log('[Altivision] Contact form submission:', data);

    showStatus('Thanks! Our counselor will reach out within 24 hours.', 'ok');
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
