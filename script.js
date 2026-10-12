const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('serviceSelect');
    if (select) select.value = link.dataset.service;
  });
});

document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio inquiry: ${data.get('service')}`);
  const body = encodeURIComponent(
`Hello Akber Ali Khan,

I'd like to discuss a digital marketing project.

Name: ${data.get('name')}
Business: ${data.get('business') || 'Not provided'}
Email: ${data.get('email')}
Phone / WhatsApp: ${data.get('phone') || 'Not provided'}
Service: ${data.get('service')}

Project goals:
${data.get('message')}

Sent from your portfolio website.`
  );
  const status = document.getElementById('formStatus');
  status.textContent = 'Your email draft is ready. Choose your email app to review and send it. This website has not sent or stored your information.';
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

document.getElementById('privacyLink')?.addEventListener('click', event => {
  event.preventDefault();
  const note = document.getElementById('privacyNote');
  note.hidden = !note.hidden;
  if (!note.hidden) note.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
