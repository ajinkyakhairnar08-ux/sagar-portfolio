/* script.js - with skeleton loader + reveal + nav toggle + contact form */

/* ------------------------
   SKELETON LIFECYCLE
   Creates overlay quickly, removes on window.load
   -------------------------*/
(function(){
  // create skeleton DOM right away
  const skel = document.createElement('div');
  skel.className = 'site-skeleton';
  skel.innerHTML = `
    <div class="skel-inner" aria-hidden="true">
      <div class="skel skel-header"></div>

      <div class="skel-hero">
        <div class="skel left skel"></div>
        <div class="skel right skel"></div>
      </div>

      <div class="skel-about">
        <div class="img skel"></div>
        <div class="text skel"></div>
      </div>

      <div class="skel-gallery">
        <div class="skel-thumb skel"></div>
        <div class="skel-thumb skel"></div>
        <div class="skel-thumb skel"></div>
        <div class="skel-thumb skel"></div>
      </div>

      <div class="skel-contact">
        <div class="row skel"></div>
        <div class="row skel"></div>
        <div class="textarea skel"></div>
        <div class="row skel" style="width:40%"></div>
      </div>
    </div>
  `;
  // prepend to body so it's visible immediately
  document.documentElement.prepend(skel);

  // add a class to body to indicate skeleton active (optional)
  document.documentElement.classList.add('skeleton-active');

  // When everything loads (images/fonts etc), fade the skeleton
  window.addEventListener('load', () => {
    // small delay to keep smooth effect on fast devices
    setTimeout(() => {
      document.documentElement.classList.add('skeleton-loaded'); // used in CSS
      skel.classList.add('hidden');
      // remove from DOM after fade
      setTimeout(() => skel.remove(), 600);
    }, 350);
  });

  // safety: if load doesn't fire within X seconds, hide skeleton
  setTimeout(() => {
    if (!document.documentElement.classList.contains('skeleton-loaded')) {
      document.documentElement.classList.add('skeleton-loaded');
      skel.classList.add('hidden');
      setTimeout(()=> skel.remove(), 600);
    }
  }, 6000);
})();

/* ------------------------
   SCROLL-REVEAL (existing behaviour kept, improved)
   - activates .reveal elements via intersection observer
   -------------------------*/
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => obs.observe(r));
  } else {
    // fallback to scroll event
    const onScroll = () => {
      reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
})();

/* ------------------------
   NAV TOGGLE (preserve your existing function)
   -------------------------*/
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  // prefer aria-expanded
  const expanded = nav.getAttribute('data-open') === 'true';
  if (expanded) {
    nav.style.display = 'none';
    nav.setAttribute('data-open', 'false');
  } else {
    nav.style.display = 'flex';
    nav.setAttribute('data-open', 'true');
  }
}

/* ------------------------
   Smooth scroll to contact
   -------------------------*/
function scrollToContact() {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------
   Contact form handling (preserve behaviour)
   -------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // basic validation visual hint (tiny)
      const name = form.querySelector('input[type="text"]');
      const email = form.querySelector('input[type="email"]');
      if (!name.value.trim() || !email.value.trim()) {
        alert('Please enter your name and email.');
        return;
      }
      // simulate sending
      form.querySelector('button[type="submit"]').textContent = 'Sending…';
      setTimeout(() => {
        alert('Message sent successfully!');
        form.reset();
        form.querySelector('button[type="submit"]').textContent = 'Send Message';
      }, 900);
    });
  }

  // close mobile nav when clicking a link
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = document.getElementById('navLinks');
      if (window.innerWidth <= 900 && nav) {
        nav.style.display = 'none';
        nav.setAttribute('data-open','false');
      }
    });
  });
});
