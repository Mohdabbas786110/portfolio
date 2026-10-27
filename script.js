
/* =========================
   MOBILE MENU
========================= */
const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menu.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    menu.textContent = isOpen ? "✕" : "☰";
  });

  // Close menu when a navigation link is clicked
  document.querySelectorAll(".nav nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
      menu.textContent = "☰";
    });
  });

  // Close mobile menu when switching back to desktop layout
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
      menu.textContent = "☰";
    }
  });
}

/* =========================
   DARK / LIGHT THEME TOGGLE
========================= */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  // Restore previously selected theme, if available
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    // Continue normally if browser storage is unavailable
  }

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  // Show the icon that switches to the opposite theme
  function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
    themeToggle.setAttribute(
      "title",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");

    updateThemeButton();

    try {
      localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
      );
    } catch (error) {
      // Theme still works if browser storage is unavailable
    }
  });
}

/* =========================
   SCROLL REVEAL
========================= */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("show");
  });
}
