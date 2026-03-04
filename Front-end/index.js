/* ===========================
   STERKSPRUIT JSS — index.js
   Sidebar | Carousel | Scroll FX
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  // ─── SIDEBAR ───────────────────────────────────────────────
  const hamburger = document.getElementById("hamburger-btn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const sidebarClose = document.getElementById("sidebar-close");

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburger.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", () => {
    sidebar.classList.contains("active") ? closeSidebar() : openSidebar();
  });

  sidebarClose?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  // Close sidebar on sidebar link click
  sidebar?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // Keyboard: Escape closes sidebar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebar();
  });

  // ─── STICKY HEADER ─────────────────────────────────────────
  const header = document.querySelector("header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // ─── CAROUSEL ──────────────────────────────────────────────
  const slides = document.querySelectorAll(".carousel-slide");
  const cards = document.querySelectorAll(".hero-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const hero = document.getElementById("hero");

  let current = 0;
  let autoInterval = null;
  const INTERVAL_MS = 5000;

  function goTo(index) {
    // Deactivate current
    slides[current].classList.remove("active");
    cards[current].classList.remove("active");
    dots[current].classList.remove("active");

    // Update index
    current = (index + slides.length) % slides.length;

    // Activate new
    slides[current].classList.add("active");
    dots[current].classList.add("active");

    // Slight delay so card animates in after slide fades
    setTimeout(() => {
      cards[current].classList.add("active");
    }, 120);
  }

  function startAuto() {
    stopAuto();
    autoInterval = setInterval(() => goTo(current + 1), INTERVAL_MS);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  prevBtn?.addEventListener("click", () => {
    goTo(current - 1);
    startAuto(); // reset timer
  });

  nextBtn?.addEventListener("click", () => {
    goTo(current + 1);
    startAuto();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.dot));
      startAuto();
    });
  });

  // Pause on hover
  hero?.addEventListener("mouseenter", stopAuto);
  hero?.addEventListener("mouseleave", startAuto);

  // Touch / swipe support
  let touchStartX = 0;

  hero?.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      stopAuto();
    },
    { passive: true },
  );

  hero?.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    startAuto();
  });

  // Keyboard arrow navigation when focused on hero
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  // Kickstart
  goTo(0);
  startAuto();

  // ─── SCROLL REVEAL ─────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealEls.forEach((el) => observer.observe(el));

  // ─── ANIMATED STAT COUNTERS ────────────────────────────────
  const statNums = document.querySelectorAll(".stat-num");

  function animateCount(el) {
    const target = parseInt(el.textContent);
    const suffix = el.textContent.replace(/[0-9]/g, "");
    let count = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 28);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statNums.forEach((el) => statsObserver.observe(el));
});
