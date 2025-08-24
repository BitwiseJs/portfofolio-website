document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    const icon = mobileMenuButton.querySelector("i");

    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuButton.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Animate skill bars on scroll
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-bar");

    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";

      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }

  // Initialize animations when skills section is in view
  const skillsSection = document.getElementById("skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  // ambil semua link
  document.querySelectorAll('a[href]:not([href^="#"])').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer"); // best practice
  });
});

// Animated counter
function animateCounters() {
  const counters = document.querySelectorAll(".count-up");
  const speed = 200; // The lower the slower

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);

    if (count < target) {
      counter.innerText = Math.min(count + increment, target);
      setTimeout(() => animateCounters(), 1);
    }
  });
}

// Intersection Observer untuk trigger animasi saat section terlihat
const statsSection = document.querySelector(".bg-dark-300");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.9 }
);

if (statsSection) {
  observer.observe(statsSection);
}
