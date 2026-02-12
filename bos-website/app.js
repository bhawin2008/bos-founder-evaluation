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

  // ==================== Smooth Scroll ====================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (id === "#") return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = document.querySelector(".nav").offsetHeight;
        var y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    });
  });

  // ==================== Nav Background on Scroll ====================

  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }, { passive: true });

  // ==================== Scroll Fade-in ====================

  var fadeElements = document.querySelectorAll(
    ".problem-card, .framework-card, .how-item, .filter-card, " +
    ".process-step, .philosophy-card, .what-col"
  );

  fadeElements.forEach(function (el) {
    el.classList.add("fade-up");
  });

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
});
