// =============================================
//   iLandscape - script.js
// =============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- FORM SUBMIT ----
  // Handle all form submissions
  const forms = document.querySelectorAll('form[action*="formspree"]');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      // Let the form submit naturally to Formspree
      // After a short delay, clear the form
      setTimeout(function() {
        form.reset(); // Clear all form fields
        
        // Reset any custom styling
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(function(input) {
          input.style.borderColor = '';
        });
        
        // Find and reset the submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = '✔ Sent! Form cleared.';
          submitBtn.style.background = '#1b5e20';
          
          setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
          }, 2000);
        }
      }, 500);
    });
  });

  // Legacy support for old formBtn
  const formBtn = document.getElementById('formBtn');
  if (formBtn) {
    formBtn.addEventListener('click', function () {
      const inputs = document.querySelectorAll('.form-box input[type="text"], .form-box input[type="tel"], .form-box input[type="email"]');
      let allFilled = true;

      inputs.forEach(function (input) {
        if (input.value.trim() === '') {
          allFilled = false;
          input.style.borderColor = '#b71c1c';
        } else {
          input.style.borderColor = '#2e7d32';
        }
      });

      if (allFilled) {
        formBtn.textContent = '✔ Request Sent!';
        formBtn.style.background = '#1b5e20';
        formBtn.disabled = true;

        // Reset after 3s
        setTimeout(function () {
          formBtn.textContent = 'Get Started Today';
          formBtn.style.background = '';
          formBtn.disabled = false;
          inputs.forEach(function (input) {
            input.value = '';
            input.style.borderColor = '';
          });
        }, 3000);
      } else {
        formBtn.textContent = '⚠ Please fill required fields';
        formBtn.style.background = '#b71c1c';
        setTimeout(function () {
          formBtn.textContent = 'Get Started Today';
          formBtn.style.background = '';
        }, 2500);
      }
    });
  }

  // ---- SCROLL ANIMATION: fade-in service cards ----
  const cards = document.querySelectorAll('.service-card, .review-card, .feature-item');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(function (card) {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // ---- NAVBAR ACTIVE HIGHLIGHT on scroll ----
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.navbar a');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current || (current === '' && href === '#')) {
        link.classList.add('active');
      }
    });
  });

  // ---- PHONE NUMBER CLICK TRACKING (log only) ----
  const phoneLinks = document.querySelectorAll('a[href^="tel"]');
  phoneLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      console.log('Phone clicked:', this.href);
    });
  });

});

// ---- ADD FADE-IN CSS DYNAMICALLY ----
(function injectFadeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .navbar a.active {
      background: rgba(0,0,0,0.25);
    }
  `;
  document.head.appendChild(style);
})();