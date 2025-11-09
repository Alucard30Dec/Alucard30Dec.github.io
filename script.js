// ====== DATA (projects) ======
const projects = [
  {
    title: "Hotel Management System",
    image: "Images/HotelManagementSystem.jpg",
    github: "#",
    demo: "#",
    period: "",
    summary:
      "In progress",
    tech: [""],
  },
  {
    title: "Private Clinic Management System",
    image: "Images/PrivateClinicManagementSystem.jpg",
    github: "https://github.com/Alucard30Dec/Private-Clinic",
    demo: "#",
    period: "09/2025 – 10/2025",
    summary:
      "A clinic management system designed to manage doctors, receptionists, and patients efficiently. Supports appointment scheduling, patient records, and staff management with role-based authentication and a layered architecture for scalability and maintainability.",
    tech: [
      "Programming Language: Java, HTML, CSS",
      "Framework: ASP.NET MVC, Entity Framework",
      "Database: Microsoft SQL Server / T-SQL",
      "Architecture: 3-layer architecture (UI / Business Logic / Data Access)",
      "Features: Admin module, authentication, role-based authorization, CRUD operations",
      "Tools: Git, Visual Studio, SQL scripts",
    ],
  },
  {
    title: "Personal Expense Tracker",
    image: "Images/PersonalExpenseTracker.png",
    github: "https://github.com/Alucard30Dec/Personal-Expense-Tracker",
    demo: "#",
    period: "10/2025 – 11/2025",
    summary:
      "A mobile app for recording and analyzing personal spending. Supports adding expenses with basic details and category management, plus a statistics screen for quick insights into monthly totals and trends. Built as a lightweight Android project focused on smooth local-first use.",
    tech: [
      "Programming Language: Java (Android)",
      "Framework/SDK: Android SDK with AndroidX, Gradle (Kotlin DSL)",
      "Database: SQLite for on-device persistence",
      "Architecture: Layered approach separating UI and data access",
      "Features: CRUD operations for expenses, category management, statistics module",
      "Tools: Git, Android Studio, Gradle build scripts",
    ],
  },
];

// ====== Helpers to build & render ======
function buildCard(project, roleClass, index) {
  if (!project) return "";
  return `
    <article class="card3d card3d--frame ${roleClass}" data-index="${index}">
      <div class="p-6 text-center">
        <div class="card-media">
          <img src="${project.image}" alt="${project.title}"
               onerror="this.src='https://placehold.co/600x600/cccccc/999?text=Image+Not+Found'; this.onerror=null;">
        </div>

        <h3 class="project-title">${project.title}</h3>

        <div class="project-buttons">
          <a href="${project.github}" target="_blank" rel="noopener" class="btn-pill btn-dark-solid">Github</a>
          <a href="${project.demo}" target="_blank" rel="noopener" class="btn-pill btn-light-outline">Demo</a>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("projTrack");
  const detail = document.getElementById("projDetail");
  const btnPrev = document.getElementById("projPrev");
  const btnNext = document.getElementById("projNext");
  let active = 1;
  let animating = false;

  function renderCards() {
    const prevIndex = (active - 1 + projects.length) % projects.length;
    const nextIndex = (active + 1) % projects.length;

    track.innerHTML = `
      ${buildCard(projects[prevIndex], 'card3d--left', prevIndex)}
      ${buildCard(projects[active], 'card3d--active', active)}
      ${buildCard(projects[nextIndex], 'card3d--right', nextIndex)}
    `;

    // Allow click to focus a side card
    Array.from(track.children).forEach((el) => {
      const index = parseInt(el.dataset.index, 10);
      if (!isNaN(index)) el.onclick = () => setActive(index);
    });
  }

  function renderDetail() {
    const p = projects[active];
    detail.style.opacity = 0;
    detail.style.transform = "translateY(20px)";
    detail.innerHTML = `
      <h3 class="text-3xl md:text-4xl font-bold mb-3">${p.title}</h3>
      ${p.score ? `<p class="text-gray-600 mb-1"><span class="font-semibold">Score:</span> ${p.score}</p>` : ""}
      <p class="text-gray-600 mb-4"><span class="font-semibold">Time:</span> ${p.period}</p>
      <p class="text-gray-700 font-semibold">Summary:</p>
      <p class="text-gray-600 mb-4">${p.summary}</p>
      <p class="text-gray-700 font-semibold">Technologies & Techniques:</p>
      <ul class="text-gray-600 max-w-4xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-2 text-left mt-2 mb-2">
        ${p.tech.map(t => `<li>• ${t}</li>`).join("")}
      </ul>
    `;
    setTimeout(() => {
      detail.style.opacity = 1;
      detail.style.transform = "translateY(0)";
    }, 80);
  }

  // Hiệu ứng mượt khi chuyển (fade + slide nhẹ) cho track
  function animateAndRender(nextIndex) {
    if (animating) return;
    animating = true;

    // Fade out nhẹ
    track.style.opacity = 0;
    track.style.transform = "translateY(8px)";

    // Đợi ngắn rồi cập nhật DOM, sau đó fade in
    setTimeout(() => {
      active = (nextIndex + projects.length) % projects.length;
      renderCards();
      renderDetail();

      requestAnimationFrame(() => {
        track.style.opacity = 1;
        track.style.transform = "translateY(0)";
        setTimeout(() => { animating = false; }, 200);
      });
    }, 140);
  }

  function setActive(i) { animateAndRender(i); }

  // Buttons
  if (btnPrev) btnPrev.addEventListener("click", () => animateAndRender(active - 1));
  if (btnNext) btnNext.addEventListener("click", () => animateAndRender(active + 1));

  // Initial render
  renderCards();
  renderDetail();

  // ===== Smooth Scrolling for internal anchors =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - headerOffset;
      smoothScrollTo(targetPosition, 900);
    });
  });

  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const t = Math.min(timeElapsed / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      window.scrollTo(0, startPosition + distance * ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  }
});
