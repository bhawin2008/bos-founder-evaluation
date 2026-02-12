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
    ".process-step, .philosophy-card, .what-col, .overview-card, " +
    ".event-card, .program-card, .resource-card, .value-card, " +
    ".stat-card, .testimonial-card, .about-visual-item, .program-benefit"
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

  // ==================== Events Tabs ====================

  var eventsTabs = document.querySelectorAll(".events-tab");
  if (eventsTabs.length > 0) {
    var upcomingGrid = document.getElementById("events-upcoming");
    var pastGrid = document.getElementById("events-past");

    eventsTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        eventsTabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");

        var tabName = tab.getAttribute("data-tab");
        if (tabName === "upcoming") {
          if (upcomingGrid) upcomingGrid.style.display = "";
          if (pastGrid) pastGrid.style.display = "none";
        } else if (tabName === "past") {
          if (upcomingGrid) upcomingGrid.style.display = "none";
          if (pastGrid) pastGrid.style.display = "";
        }
      });
    });
  }

  // ==================== Resources Filtering ====================

  var domainFilters = document.querySelectorAll("#filter-domain .filter-btn");
  var typeFilters = document.querySelectorAll("#filter-type .filter-btn");
  var resourceCards = document.querySelectorAll("#resources-grid .resource-card");

  var activeDomain = "all";
  var activeType = "all";

  function filterResources() {
    resourceCards.forEach(function (card) {
      var cardDomain = card.getAttribute("data-domain");
      var cardType = card.getAttribute("data-type");
      var domainMatch = activeDomain === "all" || cardDomain === activeDomain;
      var typeMatch = activeType === "all" || cardType === activeType;

      if (domainMatch && typeMatch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  if (domainFilters.length > 0) {
    domainFilters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        domainFilters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeDomain = btn.getAttribute("data-domain");
        filterResources();
      });
    });
  }

  if (typeFilters.length > 0) {
    typeFilters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        typeFilters.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        activeType = btn.getAttribute("data-type");
        filterResources();
      });
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
