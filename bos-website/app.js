document.addEventListener("DOMContentLoaded", function () {

  // ==================== Mobile Navigation ====================

  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("active");
      links.classList.toggle("active");
    });

    links.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("active");
        links.classList.remove("active");
      });
    });
  }

  // ==================== Nav Background on Scroll ====================

  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }, { passive: true });
  }

  // ==================== Scroll Fade-in ====================

  var fadeElements = document.querySelectorAll(
    ".problem-card, .framework-card, .how-item, .filter-card, " +
    ".process-step, .philosophy-card, .what-col, .overview-card"
  );

  fadeElements.forEach(function (el) {
    el.classList.add("fade-up");
  });

  if (fadeElements.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ==================== Application Form ====================

  var form = document.getElementById("apply-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.textContent = "Application Submitted";
      btn.disabled = true;
      btn.style.opacity = "0.6";
      btn.style.cursor = "default";
    });
  }
});
