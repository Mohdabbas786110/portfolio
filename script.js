
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // 1. MOBILE NAVIGATION MENU
  // ========================================
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".nav nav");
  const navLinks = document.querySelectorAll(".nav nav a");

  function closeMenu() {
    if (!menuButton || !nav) return;

    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.textContent = "☰";
  }

  if (menuButton && nav) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedMenuButton = menuButton.contains(event.target);

      if (!clickedInsideNav && !clickedMenuButton) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  // ========================================
  // 2. DARK / LIGHT THEME TOGGLE
  // ========================================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const savedTheme = getSavedTheme();

  function getSavedTheme() {
    try {
      return localStorage.getItem("portfolio-theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      // Theme still works if browser storage is unavailable.
    }
  }

  function applyTheme(theme) {
    const isLight = theme === "light";

    body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
      themeToggle.textContent = isLight ? "🌙" : "☀️";
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute("title", isLight ? "Dark mode" : "Light mode");
    }
  }

  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyLight = body.classList.contains("light-theme");
      const nextTheme = isCurrentlyLight ? "dark" : "light";

      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  // ========================================
  // 3. SCROLL REVEAL ANIMATIONS
  // ========================================
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  // ========================================
  // 4. FOOTER CURRENT YEAR
  // ========================================
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // ========================================
  // 5. SMOOTH SCROLL FOR INTERNAL LINKS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        if (targetId === "#home") {
          history.replaceState(null, "", window.location.pathname + window.location.search);
        } else {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });

  // ========================================
  // 6. IMAGE FALLBACK
  // ========================================
  const profileImage = document.querySelector(".avatar img");

  if (profileImage) {
    profileImage.addEventListener("error", () => {
      profileImage.style.display = "none";
      profileImage.parentElement.classList.add("image-unavailable");
      profileImage.parentElement.setAttribute(
        "aria-label",
        "Profile photo unavailable"
      );
    });
  }
});
