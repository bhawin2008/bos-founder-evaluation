// ==================== Mobile Navigation Toggle ====================

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("active");
    });

    // Close mobile nav when a link is clicked
    links.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("active");
      });
    });
  }

  // ==================== Smooth Scroll for Anchor Links ====================

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector(".nav").offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // ==================== Scroll Fade-in Animation ====================

  var observerOptions = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    ".feature-card, .tool-card, .step-card, .hero-stats"
  ).forEach(function (el) {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});
