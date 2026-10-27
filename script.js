
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
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
      menu.textContent = "☰";
    });
  });

  // Reset mobile menu on desktop resize
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
   DARK / LIGHT THEME
========================= */
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("portfolio-theme");
  } catch (error) {
    // Continue if browser storage is unavailable
  }

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  function updateThemeButton() {
    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    const label = isLight
      ? "Switch to dark theme"
      : "Switch to light theme";

    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
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
      // Theme toggle still works without storage
    }
  });
}

/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}
