document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('hmfYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Navbar scroll state
  var nav = document.getElementById('hmfNav');
  function handleNavScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  // Close mobile menu on link click
  var collapseEl = document.getElementById('hmfNavLinks');
  document.querySelectorAll('#hmfNavLinks .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });

  // Back to top button
  var backToTop = document.getElementById('hmfBackToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Active nav link highlighting based on section in view (index.html sections)
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('#hmfNavLinks .nav-link[href*="#"]');
  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        var link = document.querySelector('#hmfNavLinks .nav-link[href$="#' + id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

});
