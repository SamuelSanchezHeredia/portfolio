// Interacciones del portfolio de Samuel Sánchez Heredia.

document.body.classList.add('js-ready');

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const scrollTopButton = document.getElementById('scroll-top');
const sections = document.querySelectorAll('section[id]');

function setMenuState(isOpen) {
  if (!navMenu || !navToggle) return;
  navMenu.classList.toggle('show', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  const icon = navToggle.querySelector('i');
  icon?.classList.toggle('fa-bars', !isOpen);
  icon?.classList.toggle('fa-times', isOpen);
}

navToggle?.addEventListener('click', () => {
  setMenuState(!navMenu?.classList.contains('show'));
});

navLinks.forEach(link => link.addEventListener('click', () => setMenuState(false)));

function updateScrollState() {
  const scrollY = window.scrollY;
  header?.classList.toggle('header--scrolled', scrollY > 24);
  scrollTopButton?.classList.toggle('show', scrollY > 400);

  sections.forEach(section => {
    const link = document.querySelector(`.nav__link[href="#${section.id}"]`);
    if (!link) return;
    const isActive = scrollY >= section.offsetTop - 140 && scrollY < section.offsetTop + section.offsetHeight - 140;
    link.classList.toggle('active', isActive);
  });
}

let scrollFrame;
function scheduleScrollUpdate() {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    updateScrollState();
    scrollFrame = undefined;
  });
}

window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate, { passive: true });
scrollTopButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealItems = document.querySelectorAll('.about__info-item, .project__card, .skill, .contact__card');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px' });
  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const skillsSection = document.querySelector('.skills');
if (skillsSection && 'IntersectionObserver' in window) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    skillsSection.classList.add('skills--visible');
    observer.disconnect();
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const projectButtons = [...document.querySelectorAll('.project__link--view')];
const imagesData = projectButtons.map(button => ({
  src: button.dataset.image,
  title: button.dataset.title
}));
let currentImageIndex = 0;

function updateLightbox() {
  const image = imagesData[currentImageIndex];
  if (!image || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.title;
  lightboxCaption.textContent = image.title;
}

function openLightbox(index) {
  if (!lightbox || !imagesData.length) return;
  currentImageIndex = index;
  updateLightbox();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox() {
  lightbox?.classList.remove('active');
  lightbox?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

projectButtons.forEach((button, index) => button.addEventListener('click', () => openLightbox(index)));
document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox__overlay')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev')?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
  updateLightbox();
});
document.getElementById('lightbox-next')?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % imagesData.length;
  updateLightbox();
});
document.addEventListener('keydown', event => {
  if (!lightbox?.classList.contains('active')) return;
  if (event.key === 'Escape') closeLightbox();
  if (event.key === 'ArrowLeft') document.getElementById('lightbox-prev')?.click();
  if (event.key === 'ArrowRight') document.getElementById('lightbox-next')?.click();
});

const yearElement = document.getElementById('current-year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
updateScrollState();
