// Portfolio JavaScript - Samuel Sánchez Heredia

// ==========================================
// Mobile Menu Toggle
// ==========================================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// Cerrar menú al hacer click en un link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
  });
});

// ==========================================
// Active Link on Scroll
// ==========================================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

// ==========================================
// Scroll to Top Button
// ==========================================
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollButton() {
  if (window.pageYOffset > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

window.addEventListener('scroll', toggleScrollButton);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.about__info-item, .project__card, .skill, .contact__card');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Inicializar elementos para animación
window.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.about__info-item, .project__card, .skill, .contact__card');
  reveals.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
  });
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Ejecutar al cargar

// ==========================================
// Animar barras de habilidades cuando sean visibles
// ==========================================
function animateSkillBars() {
  const skillsSection = document.querySelector('.skills');
  const skillBars = document.querySelectorAll('.skill__percentage');

  if (!skillsSection) return;

  const sectionTop = skillsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });

    // Remover el listener después de animar
    window.removeEventListener('scroll', animateSkillBars);
  }
}

window.addEventListener('scroll', animateSkillBars);

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    // Aquí puedes integrar con un servicio como Formspree, EmailJS, etc.
    console.log('Formulario enviado:', formData);

    // Mostrar mensaje de éxito
    alert('¡Gracias por tu mensaje! Te responderé pronto.');

    // Limpiar formulario
    contactForm.reset();

    // Nota: Para producción, integra con un servicio real de envío de emails
    // Por ejemplo: https://formspree.io/ o https://www.emailjs.com/
  });
}

// ==========================================
// Header Scroll Effect
// ==========================================
const header = document.querySelector('.header');

function scrollHeader() {
  if (window.pageYOffset > 50) {
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  }
}

window.addEventListener('scroll', scrollHeader);

// ==========================================
// Typing Effect (opcional para el hero)
// ==========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Descomentar para activar efecto de escritura
// window.addEventListener('DOMContentLoaded', () => {
//   const heroTitle = document.querySelector('.hero__name');
//   if (heroTitle) {
//     const text = heroTitle.textContent;
//     typeWriter(heroTitle, text, 100);
//   }
// });

// ==========================================
// Lazy Loading de Imágenes
// ==========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  // Observar todas las imágenes con data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==========================================
// Dark Mode Toggle (opcional)
// ==========================================
function initDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  if (!darkModeToggle) return;

  // Verificar preferencia guardada
  const darkMode = localStorage.getItem('darkMode');

  if (darkMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', null);
    }
  });
}

// Descomentar para activar modo oscuro
// initDarkMode();

// ==========================================
// Performance: Debounce function
// ==========================================
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Aplicar debounce a eventos de scroll
const efficientScroll = debounce(() => {
  scrollActive();
  toggleScrollButton();
  revealOnScroll();
});

window.addEventListener('scroll', efficientScroll);

// ==========================================
// Console Message
// ==========================================
console.log('%c¡Hola! 👋', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c¿Estás revisando el código? ¡Me gusta tu curiosidad!', 'font-size: 14px; color: #6b7280;');
console.log('%cSi quieres trabajar juntos, no dudes en contactarme.', 'font-size: 14px; color: #6b7280;');

// ==========================================
// Service Worker Registration (PWA)
// ==========================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Descomentar cuando tengas un service worker
    // navigator.serviceWorker.register('/service-worker.js')
    //   .then(registration => {
    //     console.log('Service Worker registrado:', registration);
    //   })
    //   .catch(error => {
    //     console.log('Error al registrar Service Worker:', error);
    //   });
  });
}

// ==========================================
// Image Lightbox
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

let currentImageIndex = 0;
let imagesData = [];

// Recopilar todas las imágenes de proyectos
function initLightbox() {
  const projectViewButtons = document.querySelectorAll('.project__link--view');

  imagesData = Array.from(projectViewButtons).map(btn => ({
    src: btn.dataset.image,
    title: btn.dataset.title
  }));

  projectViewButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openLightbox(index);
    });
  });
}

// Abrir lightbox
function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Cerrar lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Actualizar imagen del lightbox
function updateLightboxImage() {
  if (imagesData[currentImageIndex]) {
    lightboxImage.src = imagesData[currentImageIndex].src;
    lightboxImage.alt = imagesData[currentImageIndex].title;
    lightboxCaption.textContent = imagesData[currentImageIndex].title;
  }

  // Ocultar botones prev/next si no hay suficientes imágenes
  lightboxPrev.style.display = imagesData.length > 1 ? 'flex' : 'none';
  lightboxNext.style.display = imagesData.length > 1 ? 'flex' : 'none';
}

// Navegación: imagen anterior
function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + imagesData.length) % imagesData.length;
  updateLightboxImage();
}

// Navegación: imagen siguiente
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % imagesData.length;
  updateLightboxImage();
}

// Event Listeners del Lightbox
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', showNextImage);
}

// Cerrar con tecla ESC y navegar con flechas
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  }
});

// Inicializar lightbox cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}

