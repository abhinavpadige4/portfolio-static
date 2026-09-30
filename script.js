document.addEventListener('DOMContentLoaded', () => {
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');
  const contactForm = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit-button');

  // Mobile navigation toggle
  mobileNavToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    mobileNavToggle.setAttribute('aria-expanded', navMenu.classList.contains('hidden') ? 'false' : 'true');
  });

  // Smooth scrolling behavior
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
        navMenu.classList.add('hidden');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Basic contact form validation (client-side)
  contactForm.addEventListener('submit', event => {
    let isValid = true;
    if (!validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.classList.add('border-red-500');
      emailInput.setAttribute('aria-invalid', 'true');
    } else {
      emailInput.classList.remove('border-red-500');
      emailInput.setAttribute('aria-invalid', 'false');
    }
    if (messageInput.value.trim() === '') {
      isValid = false;
      messageInput.classList.add('border-red-500');
      messageInput.setAttribute('aria-invalid', 'true');
    } else {
      messageInput.classList.remove('border-red-500');
      messageInput.setAttribute('aria-invalid', 'false');
    }
    if (!isValid) {
      event.preventDefault();
      submitButton.focus();
    }
  });

  // Accessibility enhancements (focus management)
  navLinks.forEach(link => {
    link.addEventListener('focus', () => {
      link.classList.add('outline-none', 'ring-2', 'ring-primary');
    });
    link.addEventListener('blur', () => {
      link.classList.remove('outline-none', 'ring-2', 'ring-primary');
    });
  });

  function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }
});