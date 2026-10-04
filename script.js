(function () {
  "use strict";

  document.documentElement.classList.add("motion-ready");

  var THEME_STORAGE_KEY = "portfolio-theme";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function isUsableUrl(url) {
    if (typeof url !== "string") {
      return false;
    }

    var value = url.trim();
    if (!value || /[\r\n]/.test(value)) {
      return false;
    }

    if (/^(https:\/\/|mailto:|tel:|#)/i.test(value)) {
      return true;
    }

    return !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.startsWith("//");
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.textContent = value || "";
    }
  }

  function setImage(id, src, alt) {
    var element = document.getElementById(id);
    if (!element) {
      return;
    }

    if (src) {
      element.src = src;
    }

    element.alt = alt || "";
  }

  function renderLinks(element, links, className) {
    if (!element) {
      return;
    }

    element.innerHTML = (links || []).filter(function (link) {
      return link && isUsableUrl(link.target);
    }).map(function (link) {
      return '<a href="' + escapeHtml(link.target) + '" class="' + className + '">' + escapeHtml(link.label) + "</a>";
    }).join("");
  }

  function getSocialIcon(icon) {
    if (icon === "github") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.36-3.9-1.36-.52-1.34-1.29-1.69-1.29-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.71 1.27 3.37.97.1-.75.4-1.27.73-1.56-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.71 5.39-5.28 5.68.41.36.78 1.06.78 2.14v3.25c0 .31.21.67.79.56A11.5 11.5 0 0 0 12 .7Z"/></svg>';
    }

    if (icon === "linkedin") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.37 7.98H1.74V22h3.63V7.98ZM3.56 2A2.11 2.11 0 1 0 3.56 6.22 2.11 2.11 0 0 0 3.56 2ZM22.26 13.96c0-4.22-2.25-6.18-5.25-6.18-2.42 0-3.5 1.33-4.1 2.27V7.98H9.28c.05 1.37 0 14.02 0 14.02h3.63v-7.83c0-.42.03-.84.15-1.14.26-.84 1.09-1.71 2.36-1.71 1.67 0 2.34 1.27 2.34 3.14V22h3.63l.87-8.04Z"/></svg>';
    }

    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M10 14a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15M14 10a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 19l1.15-1.15"/></svg>';
  }

  function getContactIcon(type) {
    if (type === "email") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 5h18v14H3zM3 7l9 7 9-7"/></svg>';
    }

    if (type === "phone") {
      return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2Z"/></svg>';
    }

    return getSocialIcon(type);
  }

  function renderHeroActions(element, actions) {
    if (!element) {
      return;
    }

    element.innerHTML = (actions || []).filter(function (action) {
      return action && isUsableUrl(action.url);
    }).map(function (action) {
      var styleClass = action.style === "primary" ? "button button-primary" : "button button-secondary";
      if (action.download) {
        styleClass += " button-download";
      }
      var target = action.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      var download = action.download ? " download" : "";
      return '<a href="' + escapeHtml(action.url) + '" class="' + styleClass + '"' + target + download + ">" + escapeHtml(action.label) + "</a>";
    }).join("");
  }

  function renderSocialLinks(element, links) {
    if (!element) {
      return;
    }

    element.innerHTML = (links || []).filter(function (link) {
      return link && isUsableUrl(link.url);
    }).map(function (link) {
      return '<a href="' + escapeHtml(link.url) + '" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(link.label) + '">' + getSocialIcon(link.icon) + "</a>";
    }).join("");
  }

  function renderHeroStats(element, stats) {
    if (!element) {
      return;
    }

    element.innerHTML = (stats || []).map(function (stat) {
      return '<div class="hero-stat"><strong>' + escapeHtml(stat.value) + '</strong><span>' + escapeHtml(stat.label) + "</span></div>";
    }).join("");
  }

  function renderAbout(about) {
    setText("aboutKicker", about.kicker);
    setText("aboutTitle", about.title);
    setImage("aboutImage", about.image, about.imageAlt);
    setText("aboutEducationTitle", about.educationTitle);
    setText("aboutEducationSchool", about.educationSchool);
    setText("aboutEducationDegree", about.educationDegree);

    var highlights = document.getElementById("aboutHighlights");
    if (highlights) {
      highlights.innerHTML = (about.highlights || []).map(function (highlight) {
        return '<article class="highlight-card"><h3>' + escapeHtml(highlight.title) + '</h3><p>' + escapeHtml(highlight.description) + "</p></article>";
      }).join("");
    }

    var paragraphs = document.getElementById("aboutParagraphs");
    if (paragraphs) {
      paragraphs.innerHTML = (about.paragraphs || []).map(function (paragraph) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      }).join("");
    }
  }

  function renderExperience(experience) {
    setText("experienceKicker", experience.kicker);
    setText("experienceTitle", experience.title);

    var element = document.getElementById("experienceItems");
    if (!element) {
      return;
    }

    element.innerHTML = (experience.items || []).map(function (item) {
      var bullets = (item.bullets || []).map(function (bullet) {
        return "<li>" + escapeHtml(bullet) + "</li>";
      }).join("");

      return '<article class="experience-card">' +
        '<div class="experience-header">' +
          '<div class="experience-title-row"><span class="experience-logo" aria-hidden="true">TKS</span><div><h3>' + escapeHtml(item.role) + '</h3><p class="experience-company">' + escapeHtml(item.company) + " · " + escapeHtml(item.project) + "</p></div></div>" +
          '<div class="experience-meta"><span>' + escapeHtml(item.period) + "</span><span>" + escapeHtml(item.location) + "</span></div>" +
        "</div>" +
        '<ul class="experience-bullets">' + bullets + "</ul>" +
      "</article>";
    }).join("");
  }

  function initializeProjects(projects) {
    var element = document.getElementById("projTrack");
    if (!element) {
      return;
    }

    var allowedThemes = ["workflow", "commerce", "warehouse", "automation"];

    element.innerHTML = (projects || []).map(function (project, index) {
      var theme = allowedThemes.indexOf(project.coverTheme) >= 0 ? project.coverTheme : "workflow";
      var media = "";

      if (project.image && isUsableUrl(project.image)) {
        media = '<div class="project-media"><img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + '" loading="lazy" /></div>';
      } else {
        media = '<div class="project-cover project-cover-' + theme + '" aria-hidden="true"><span class="project-cover-grid"></span><span>' + escapeHtml(project.coverLabel || project.title) + "</span></div>";
      }

      var tags = (project.tags || []).map(function (tag) {
        return '<span class="project-tag">' + escapeHtml(tag) + "</span>";
      }).join("");

      var details = (project.tech || []).map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");

      var actions = [];
      if (isUsableUrl(project.github)) {
        actions.push('<a class="project-link" href="' + escapeHtml(project.github) + '" target="_blank" rel="noopener noreferrer">GitHub</a>');
      }
      if (isUsableUrl(project.demo)) {
        actions.push('<a class="project-link project-link-secondary" href="' + escapeHtml(project.demo) + '" target="_blank" rel="noopener noreferrer">Live Demo</a>');
      }

      var cardClass = index === 0 ? "project-card project-card-featured reveal" : "project-card reveal";

      return '<article class="' + cardClass + '">' +
        media +
        '<div class="project-body">' +
          '<div class="project-topline"><p class="project-period">' + escapeHtml(project.period) + '</p><span class="project-index">0' + (index + 1) + "</span></div>" +
          "<h3>" + escapeHtml(project.title) + "</h3>" +
          '<p class="project-summary">' + escapeHtml(project.summary) + "</p>" +
          (tags ? '<div class="project-tags">' + tags + "</div>" : "") +
          '<ul class="project-detail-list">' + details + "</ul>" +
          (actions.length ? '<div class="project-actions">' + actions.join("") + "</div>" : "") +
        "</div>" +
      "</article>";
    }).join("");
  }

  function renderSkills(skills) {
    setText("skillsKicker", skills.kicker);
    setText("skillsTitle", skills.title);

    var element = document.getElementById("skillsGroups");
    if (!element) {
      return;
    }

    var skillMarks = ["C#", ".N", "DB", "UI"];

    element.innerHTML = (skills.groups || []).map(function (group, index) {
      var items = (group.items || []).map(function (item) {
        return '<span class="skill-chip">' + escapeHtml(item) + "</span>";
      }).join("");

      return '<article class="skill-card reveal" data-index="0' + (index + 1) + '">' +
        '<h3 class="skill-card-title"><span class="skill-icon" aria-hidden="true">' + escapeHtml(skillMarks[index] || "+") + "</span>" + escapeHtml(group.title) + "</h3>" +
        '<div class="skill-list">' + items + "</div>" +
      "</article>";
    }).join("");
  }

  function renderAchievements(achievements) {
    setText("achievementsKicker", achievements.kicker);
    setText("achievementsTitle", achievements.title);

    var element = document.getElementById("achievementGroups");
    if (!element) {
      return;
    }

    element.innerHTML = (achievements.groups || []).map(function (group) {
      var links = group.links || [];
      var items = (group.items || []).map(function (item, index) {
        var link = links[index];
        if (link && isUsableUrl(link.url)) {
          return '<li><a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item) + "</a></li>";
        }
        return "<li>" + escapeHtml(item) + "</li>";
      }).join("");

      return '<article class="award-card reveal"><h3>' + escapeHtml(group.title) + '</h3><ul>' + items + "</ul></article>";
    }).join("");
  }

  function renderContact(contact) {
    setText("contactTitle", contact.title);
    setText("contactDescription", contact.description);

    var element = document.getElementById("contactMethods");
    if (!element) {
      return;
    }

    element.innerHTML = (contact.methods || []).filter(function (method) {
      return method && isUsableUrl(method.url);
    }).map(function (method) {
      var external = /^https:\/\//i.test(method.url);
      var target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return '<a class="contact-link" href="' + escapeHtml(method.url) + '"' + target + ">" +
        '<span class="contact-icon">' + getContactIcon(method.type) + "</span>" +
        "<span>" + escapeHtml(method.label) + "</span>" +
      "</a>";
    }).join("");
  }

  function renderFooter(data) {
    renderLinks(document.getElementById("footerNavLinks"), data.navigation.links, "footer-nav-link");
    setText("footerCopyright", data.footer.copyright);
    setText("footerPortfolioLabel", data.footer.portfolioLabel);

    var link = document.getElementById("footerPortfolioLink");
    if (link && isUsableUrl(data.footer.portfolioUrl)) {
      link.href = data.footer.portfolioUrl;
      link.textContent = data.footer.portfolioUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  function renderPortfolio(data) {
    document.title = data.site.title;
    setText("siteBrand", data.site.ownerName);
    renderLinks(document.getElementById("desktopNavLinks"), data.navigation.links, "nav-link");
    renderLinks(document.getElementById("mobileNavMenu"), data.navigation.links, "mobile-nav-link");

    setText("heroStatus", data.hero.status);
    setText("heroIntro", data.hero.introLabel);
    setText("heroName", data.hero.name);
    setText("heroRole", data.hero.role);
    setText("heroTagline", data.hero.tagline);
    setImage("heroAvatar", data.hero.avatar, data.hero.avatarAlt);
    renderHeroActions(document.getElementById("heroActions"), data.hero.actions);
    renderSocialLinks(document.getElementById("heroSocials"), data.hero.socialLinks);
    renderHeroStats(document.getElementById("heroStats"), data.hero.stats);

    renderExperience(data.experience);
    setText("projectsKicker", data.projects.kicker);
    setText("projectsTitle", data.projects.title);
    setText("projectsDescription", data.projects.description);
    initializeProjects(data.projects.items);
    renderSkills(data.skills);
    renderAbout(data.about);
    renderAchievements(data.achievements);
    renderContact(data.contact);
    renderFooter(data);
  }

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      return;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    var normalizedTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", normalizedTheme);

    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      var nextTheme = normalizedTheme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
      toggle.setAttribute("aria-pressed", String(normalizedTheme === "dark"));
      toggle.title = "Switch to " + nextTheme + " theme";
    }

    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", normalizedTheme === "dark" ? "#0b1220" : "#f7f9fc");
    }
  }

  function initializeTheme() {
    var storedTheme = getStoredTheme();
    applyTheme(storedTheme === "dark" || storedTheme === "light" ? storedTheme : getSystemTheme());

    var toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        var nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        setStoredTheme(nextTheme);
      });
    }

    if (window.matchMedia) {
      var media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", function (event) {
        if (!getStoredTheme()) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  }

  function initializeMobileNavigation() {
    var button = document.getElementById("mobileNavToggle");
    var menu = document.getElementById("mobileNavMenu");
    if (!button || !menu) {
      return;
    }

    function setOpen(open) {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      menu.hidden = !open;
      button.classList.toggle("is-open", open);
    }

    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860) {
        setOpen(false);
      }
    });

    setOpen(false);
  }

  function initializeHeaderState() {
    var header = document.getElementById("siteHeader");
    if (!header) {
      return;
    }

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function initializeActiveNavigation() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link, .mobile-nav-link"));
    var targets = links.map(function (link) {
      var target = link.getAttribute("href");
      return target && target.charAt(0) === "#" ? document.querySelector(target) : null;
    }).filter(Boolean);

    if (!targets.length) {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        var hash = "#" + entry.target.id;
        links.forEach(function (link) {
          var isActive = link.getAttribute("href") === hash;
          link.classList.toggle("is-active", isActive);
          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, {
      rootMargin: "-22% 0px -68% 0px",
      threshold: 0
    });

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function initializeRevealAnimations() {
    var elements = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!elements.length) {
      return;
    }

    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08
    });

    elements.forEach(function (element, index) {
      element.style.transitionDelay = Math.min(index % 4, 3) * 55 + "ms";
      observer.observe(element);
    });
  }

  function restoreHashPosition() {
    if (!window.location.hash) {
      return;
    }

    var id = window.location.hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch (error) {
      return;
    }

    var target = document.getElementById(id);
    if (!target) {
      return;
    }

    window.requestAnimationFrame(function () {
      target.scrollIntoView({ block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeTheme();

    if (!window.PortfolioStore || typeof window.PortfolioStore.getPortfolioData !== "function") {
      document.documentElement.classList.remove("motion-ready");
      return;
    }

    renderPortfolio(window.PortfolioStore.getPortfolioData());
    initializeMobileNavigation();
    initializeHeaderState();
    initializeActiveNavigation();
    initializeRevealAnimations();
    restoreHashPosition();
  });
})();
