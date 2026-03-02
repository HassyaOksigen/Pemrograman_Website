// Hamburger menu (shared across all pages)
(function () {
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.querySelector('.navbar__links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('navbar__links--open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('navbar__links--open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelector('i').className = 'fa-solid fa-bars';
    }
  });
})();
