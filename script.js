const projects = [
  {
    title: "Private Clinic Management System",
    category: "Role-based web application",
    period: "Sep 2025 - Oct 2025",
    image: "Images/PrivateClinicManagementSystem.jpg",
    github: "https://github.com/Alucard30Dec/Private-Clinic",
    demo: null,
    summary:
      "A clinic management platform for handling doctors, receptionists, appointments, and patient records with role-based access and maintainable business flows.",
    highlights: [
      "Implemented authentication and role-based authorization across admin and staff workflows.",
      "Organized the system with a 3-layer architecture to keep UI, business logic, and data access separated.",
      "Covered core management scenarios including scheduling, records handling, and CRUD-based operations."
    ],
    stack: ["C#", "ASP.NET MVC", "Entity Framework", "SQL Server", "HTML", "CSS"]
  },
  {
    title: "Hotel Management System",
    category: "Management information system",
    period: "Feb 2025 - Apr 2025",
    image: "Images/HotelManagementSystem.jpg",
    github: null,
    demo: null,
    summary:
      "A web-based management system for rooms, bookings, customers, and reporting, designed to support operational hotel workflows and structured data handling.",
    highlights: [
      "Built booking and room management flows around relational data and admin operations.",
      "Focused on clean separation between interface, business rules, and persistence logic.",
      "Delivered a practical dashboard-style experience for staff-facing usage."
    ],
    stack: ["C#", "ASP.NET MVC", "Entity Framework", "SQL Server", "HTML", "CSS"]
  },
  {
    title: "Personal Expense Tracker",
    category: "Android application",
    period: "Oct 2025 - Nov 2025",
    image: "Images/PersonalExpenseTracker.png",
    github: "https://github.com/Alucard30Dec/Personal-Expense-Tracker",
    demo: null,
    summary:
      "A lightweight Android app for tracking expenses, organizing categories, and viewing spending insights through a simple, fast personal finance workflow.",
    highlights: [
      "Stored user expense records locally with SQLite for reliable on-device persistence.",
      "Implemented CRUD operations for entries and category management.",
      "Added a statistics view to make monthly spending patterns easier to understand."
    ],
    stack: ["Java", "Android SDK", "AndroidX", "SQLite", "Gradle"]
  }
];

function projectLink(label, href, variant) {
  if (!href) {
    return `<span class="button ${variant} is-disabled" aria-disabled="true">${label}</span>`;
  }

  return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="button ${variant}">${label}</a>`;
}

function buildCard(project, roleClass, index) {
  const cardIndex = String(index + 1).padStart(2, "0");
  const projectStatus = project.github ? "Source available" : "Private / offline";

  return `
    <article class="card3d ${roleClass}" data-index="${index}">
      <div class="project-card-body">
        <div class="project-card-head">
          <span class="project-card-index">${cardIndex}</span>
          <span>${project.category}</span>
        </div>
        <div class="project-card-media">
          <img
            src="${project.image}"
            alt="${project.title}"
            loading="lazy"
          >
        </div>
        <div class="project-card-meta">
          <span>${project.period}</span>
          <span>${projectStatus}</span>
        </div>
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-summary">${project.summary}</p>
        <div class="project-card-actions">
          ${projectLink("Source", project.github, "button-secondary")}
          ${projectLink("Live Demo", project.demo, "button-ghost")}
        </div>
      </div>
    </article>
  `;
}

function smoothScrollToSection(sectionId) {
  const target = document.querySelector(sectionId);
  if (!target) {
    return;
  }

  const headerOffset = 96;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileLinks = document.querySelectorAll("[data-mobile-link]");
  const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  const revealItems = document.querySelectorAll(".reveal");
  const yearNode = document.getElementById("currentYear");

  const track = document.getElementById("projTrack");
  const detail = document.getElementById("projDetail");
  const btnPrev = document.getElementById("projPrev");
  const btnNext = document.getElementById("projNext");

  let activeProject = 0;
  let isAnimating = false;

  function setHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function closeMobileMenu() {
    if (!navToggle || !mobileMenu) {
      return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  function toggleMobileMenu() {
    if (!navToggle || !mobileMenu) {
      return;
    }

    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  }

  function setActiveNavLink() {
    const sections = document.querySelectorAll("main section[id]");
    const scrollPosition = window.scrollY + 120;

    let currentId = "#home";
    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentId = `#${section.id}`;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === currentId);
    });
  }

  function setupRevealAnimation() {
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  function renderCards() {
    if (!track) {
      return;
    }

    const previousIndex = (activeProject - 1 + projects.length) % projects.length;
    const nextIndex = (activeProject + 1) % projects.length;

    track.innerHTML = `
      ${buildCard(projects[previousIndex], "card3d--left", previousIndex)}
      ${buildCard(projects[activeProject], "card3d--active", activeProject)}
      ${buildCard(projects[nextIndex], "card3d--right", nextIndex)}
    `;

    Array.from(track.children).forEach((card) => {
      const index = Number(card.getAttribute("data-index"));
      if (Number.isNaN(index)) {
        return;
      }

      card.addEventListener("click", () => setActiveProject(index));
      card.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => event.stopPropagation());
      });
    });
  }

  function renderDetail() {
    if (!detail) {
      return;
    }

    const project = projects[activeProject];
    const techMarkup = project.stack.map((item) => `<li>${item}</li>`).join("");
    const highlightMarkup = project.highlights.map((item) => `<li>${item}</li>`).join("");

    detail.innerHTML = `
      <div class="project-detail-head">
        <div>
          <p class="card-kicker">${project.category}</p>
          <h3>${project.title}</h3>
          <div class="project-detail-meta">
            <span class="project-meta-pill">${project.period}</span>
            <span class="project-meta-pill">${project.stack.length} key technologies</span>
          </div>
        </div>
        <div class="detail-actions">
          ${projectLink("View Source", project.github, "button-secondary")}
          ${projectLink("Live Demo", project.demo, "button-ghost")}
        </div>
      </div>
      <p class="project-detail-copy">${project.summary}</p>
      <div class="project-detail-grid">
        <section class="project-panel">
          <h4>Implementation highlights</h4>
          <ul class="project-list">${highlightMarkup}</ul>
        </section>
        <section class="project-panel">
          <h4>Stack and tools</h4>
          <ul class="project-list">${techMarkup}</ul>
        </section>
      </div>
    `;
  }

  function setTrackAnimationState(opacity, translateY) {
    if (!track) {
      return;
    }

    track.style.opacity = String(opacity);
    track.style.transform = `translateY(${translateY}px)`;
  }

  function setActiveProject(index) {
    if (!track || isAnimating || projects.length === 0) {
      return;
    }

    isAnimating = true;
    setTrackAnimationState(0, 14);

    window.setTimeout(() => {
      activeProject = (index + projects.length) % projects.length;
      renderCards();
      renderDetail();

      window.requestAnimationFrame(() => {
        setTrackAnimationState(1, 0);
        window.setTimeout(() => {
          isAnimating = false;
        }, 220);
      });
    }, 150);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const sectionId = anchor.getAttribute("href");
      if (!sectionId || sectionId === "#") {
        return;
      }

      const target = document.querySelector(sectionId);
      if (!target) {
        return;
      }

      event.preventDefault();
      smoothScrollToSection(sectionId);

      if (anchor.hasAttribute("data-mobile-link")) {
        closeMobileMenu();
      }
    });
  });

  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  document.addEventListener("click", (event) => {
    if (!mobileMenu || !navToggle) {
      return;
    }

    const clickTarget = event.target;
    if (!(clickTarget instanceof Node)) {
      return;
    }

    const clickedInsideMenu = mobileMenu.contains(clickTarget);
    const clickedToggle = navToggle.contains(clickTarget);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
      return;
    }

    if (event.key === "ArrowLeft") {
      setActiveProject(activeProject - 1);
    }

    if (event.key === "ArrowRight") {
      setActiveProject(activeProject + 1);
    }
  });

  if (btnPrev) {
    btnPrev.addEventListener("click", () => setActiveProject(activeProject - 1));
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => setActiveProject(activeProject + 1));
  }

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  renderCards();
  renderDetail();
  setupRevealAnimation();
  setHeaderState();
  setActiveNavLink();

  window.addEventListener("scroll", () => {
    setHeaderState();
    setActiveNavLink();
  });

  window.addEventListener("resize", closeMobileMenu);
});
