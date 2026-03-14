function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isUsableUrl(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

function getSocialIcon(icon) {
  var icons = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.488.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.03-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.819c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.202 2.393.1 2.646.64.698 1.03 1.592 1.03 2.682 0 3.842-2.338 4.685-4.566 4.935.359.309.678.92.678 1.853 0 1.338-.012 2.419-.012 2.747 0 .267.18.577.688.48C19.135 20.165 22 16.418 22 12 22 6.477 17.523 2 12 2z" clip-rule="evenodd"></path></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>',
    codeforces: '<svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path d="M3 21h3v-8H3v8zm4 0h3V11H7v10zm4 0h3V3h-3v18zm4 0h3v-6h-3v6zm4 0h3V7h-3v14z"></path></svg>',
    leetcode: '<svg fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6"><path d="M12.92 11.64h2.71v-1.46h-2.71v1.46zm-4.32 0h2.7v-1.46h-2.7v1.46zm-4.31 0h2.7v-1.46H4.29v1.46zm14 3.6h-2.71v1.46h2.71v-1.46zm-4.32 0h-2.7v1.46h2.7v-1.46zm-4.31 0H8.6v1.46h2.7v-1.46zm-4.3 0H4.3v1.46h2.7v-1.46zm14-5.06h-2.71v1.46h2.71v-1.46zM20.9 2H3.1C2.5 2 2 2.5 2 3.1v17.8C2 21.5 2.5 22 3.1 22h17.8c.6 0 1.1-.5 1.1-1.1V3.1C22 2.5 21.5 2 20.9 2zM19.44 19.54H4.56V4.46h14.88v15.08z"></path></svg>'
  };

  return icons[icon] || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14L21 3m0 0h-7m7 0v7"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10v7a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h7"></path></svg>';
}

function getContactIcon(type) {
  if (type === "email") {
    return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>';
  }

  if (type === "phone") {
    return '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>';
  }

  return '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 115.656 5.656l-1.5 1.5"></path></svg>';
}

function renderLinks(container, links, className) {
  if (!container) {
    return;
  }

  container.innerHTML = links.map(function (link) {
    return '<a href="' + escapeHtml(link.target) + '" class="' + className + '">' + escapeHtml(link.label) + "</a>";
  }).join("");
}

function renderHeroActions(actions) {
  var container = document.getElementById("heroActions");
  if (!container) {
    return;
  }

  container.innerHTML = actions.map(function (action) {
    var classes = action.style === "dark" ? "btn btn-dark" : "btn btn-light";
    var target = action.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<a href="' + escapeHtml(action.url) + '" class="' + classes + '"' + target + ">" + escapeHtml(action.label) + "</a>";
  }).join("");
}

function renderHeroSocials(links) {
  var container = document.getElementById("heroSocials");
  if (!container) {
    return;
  }

  container.innerHTML = links.map(function (link) {
    return '<a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="' + escapeHtml(link.label) + '">' + getSocialIcon(link.icon) + "</a>";
  }).join("");
}

function setTextAndToggleVisibility(id, value) {
  var element = document.getElementById(id);
  if (!element) {
    return;
  }

  var text = String(value || "").trim();
  element.textContent = text;
  element.style.display = text ? "" : "none";
}

function renderAbout(data) {
  setTextAndToggleVisibility("aboutKicker", data.kicker);
  document.getElementById("aboutTitle").textContent = data.title;

  var image = document.getElementById("aboutImage");
  image.src = data.image;
  image.alt = data.imageAlt;

  document.getElementById("aboutEducationTitle").textContent = data.educationTitle;
  document.getElementById("aboutEducationSchool").textContent = data.educationSchool;
  document.getElementById("aboutEducationDegree").textContent = data.educationDegree;

  document.getElementById("aboutParagraphs").innerHTML = data.paragraphs.map(function (paragraph, index) {
    var marginClass = index === 0 ? "" : " mt-4";
    return '<p class="text-lg text-gray-700 leading-relaxed' + marginClass + '">' + escapeHtml(paragraph) + "</p>";
  }).join("");

  document.getElementById("aboutHighlights").innerHTML = data.highlights.map(function (highlight) {
    return '<div class="bg-white p-4 rounded-xl card-border"><p class="font-semibold text-gray-800 mb-1">' + escapeHtml(highlight.title) + '</p><p class="text-gray-600">' + escapeHtml(highlight.description) + "</p></div>";
  }).join("");
}

function renderSkills(data) {
  setTextAndToggleVisibility("skillsKicker", data.kicker);
  document.getElementById("skillsTitle").textContent = data.title;

  document.getElementById("skillsGroups").innerHTML = data.groups.map(function (group) {
    return '<section class="skill-card bg-gray-50 p-4 sm:p-5 rounded-xl border border-gray-200">' +
      '<div class="skill-card__head">' +
      '<h3 class="text-base sm:text-lg font-semibold">' + escapeHtml(group.title) + '</h3>' +
      '<p class="skill-card__meta">' + group.items.length + " skills</p>" +
      "</div>" +
      '<div class="skill-chip-list">' + group.items.map(function (item) {
        return '<span class="skill-chip"><span class="skill-chip__icon" aria-hidden="true"><svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></span><span class="skill-chip__label">' + escapeHtml(item) + "</span></span>";
      }).join("") + "</div>" +
      "</section>";
  }).join("");
}

function renderAchievements(data) {
  setTextAndToggleVisibility("achievementsKicker", data.kicker);
  document.getElementById("achievementsTitle").textContent = data.title;

  document.getElementById("achievementGroups").innerHTML = data.groups.map(function (group) {
    var inlineLinks = group.items.length > 0 && group.items.length === group.links.length;
    var links = !inlineLinks && group.links.length ? '<div class="mt-4 flex flex-wrap gap-3">' + group.links.map(function (link) {
      return '<a href="' + escapeHtml(link.url) + '" class="btn btn-light text-sm" target="_blank" rel="noopener noreferrer">' + escapeHtml(link.label) + "</a>";
    }).join("") + "</div>" : "";

    return '<div class="bg-white p-8 rounded-2xl card-border"><h3 class="text-2xl font-semibold mb-4">' + escapeHtml(group.title) + '</h3><ul class="space-y-3 text-left text-gray-700 list-disc list-inside">' + group.items.map(function (item, index) {
      var link = inlineLinks ? group.links[index] : null;

      if (link && isUsableUrl(link.url)) {
        return '<li><a href="' + escapeHtml(link.url) + '" class="achievement-inline-link" target="_blank" rel="noopener noreferrer">' + escapeHtml(item) + "</a></li>";
      }

      return "<li>" + escapeHtml(item) + "</li>";
    }).join("") + "</ul>" + links + "</div>";
  }).join("");
}

function buildProjectLink(label, url, className, disabled) {
  if (disabled || !isUsableUrl(url)) {
    return '<span class="btn-pill btn-disabled ' + className + '">' + escapeHtml(label) + "</span>";
  }

  return '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener" class="btn-pill ' + className + '">' + escapeHtml(label) + "</a>";
}

function buildCard(project, roleClass, index) {
  if (!project) {
    return "";
  }

  return '<article class="card3d card3d--frame ' + roleClass + '" data-index="' + index + '"><div class="p-6 text-center"><div class="card-media"><img src="' + escapeHtml(project.image) + '" alt="' + escapeHtml(project.title) + '" onerror="this.src=\'https://placehold.co/600x600/cccccc/999?text=Image+Not+Found\'; this.onerror=null;"></div><h3 class="project-title">' + escapeHtml(project.title) + '</h3><div class="project-buttons">' + buildProjectLink("Github", project.github, "btn-dark-solid") + buildProjectLink("Demo", project.demo, "btn-light-outline", project.demoDisabled) + "</div></div></article>";
}

function renderContact(data) {
  document.getElementById("contactTitle").textContent = data.title;
  document.getElementById("contactDescription").textContent = data.description;

  document.getElementById("contactMethods").innerHTML = data.methods.map(function (method) {
    var newTab = method.type === "link" || method.type === "email";
    var target = newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<a href="' + escapeHtml(method.url) + '" class="inline-flex items-center justify-center space-x-3 bg-white text-gray-800 font-medium px-8 py-4 rounded-full card-border btn-pill text-lg w-full sm:w-auto"' + target + ">" + getContactIcon(method.type) + "<span>" + escapeHtml(method.label) + "</span></a>";
  }).join("");
}

function renderFooter(data, navigationLinks) {
  document.getElementById("footerCopyright").textContent = data.copyright;
  document.getElementById("footerPortfolioLabel").textContent = data.portfolioLabel + " ";

  var link = document.getElementById("footerPortfolioLink");
  link.href = data.portfolioUrl;
  link.textContent = data.portfolioUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  renderLinks(document.getElementById("footerNavLinks"), navigationLinks, "text-gray-700 hover:text-black transition-colors");
}

function initializeProjects(projects) {
  var track = document.getElementById("projTrack");
  var detail = document.getElementById("projDetail");
  var btnPrev = document.getElementById("projPrev");
  var btnNext = document.getElementById("projNext");
  var stage = track ? track.parentNode : null;

  if (!track || !detail || !btnPrev || !btnNext) {
    return;
  }

  if (!projects.length) {
    track.innerHTML = "";
    detail.innerHTML = '<div class="empty-state">No project has been added yet.</div>';
    btnPrev.disabled = true;
    btnNext.disabled = true;
    return;
  }

  var active = Math.min(1, projects.length - 1);
  var animating = false;
  var transitionDuration = 420;

  function normalizeIndex(index) {
    return (index + projects.length) % projects.length;
  }

  function getDirection(nextIndex) {
    var normalized = normalizeIndex(nextIndex);

    if (projects.length <= 2) {
      return normalized === normalizeIndex(active + 1) ? 1 : -1;
    }

    if (normalized === normalizeIndex(active + 1)) {
      return 1;
    }

    if (normalized === normalizeIndex(active - 1)) {
      return -1;
    }

    return normalized > active ? 1 : -1;
  }

  function clearMotionClasses() {
    detail.classList.remove("is-enter-left", "is-enter-right");
  }

  function removeGhost(selector) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (node) {
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function getVisibleState(activeIndex) {
    if (projects.length === 1) {
      return [{ index: 0, roleClass: "card3d--active" }];
    }

    if (projects.length === 2) {
      return [
        { index: activeIndex === 0 ? 1 : 0, roleClass: "card3d--left" },
        { index: activeIndex, roleClass: "card3d--active" }
      ];
    }

    return [
      { index: normalizeIndex(activeIndex - 1), roleClass: "card3d--left" },
      { index: activeIndex, roleClass: "card3d--active" },
      { index: normalizeIndex(activeIndex + 1), roleClass: "card3d--right" }
    ];
  }

  function clearCardInlineMotion() {
    Array.prototype.forEach.call(track.children, function (card) {
      card.classList.remove("card3d--no-motion");
      card.style.removeProperty("--card-flip-x");
      card.style.removeProperty("--card-flip-y");
      card.style.removeProperty("--card-opacity");
    });
  }

  function createExitGhosts(nextVisibleState, direction) {
    if (!stage) {
      return;
    }

    removeGhost(".card3d-ghost");

    var nextIndexes = {};
    nextVisibleState.forEach(function (item) {
      nextIndexes[item.index] = true;
    });

    var stageRect = stage.getBoundingClientRect();

    Array.prototype.forEach.call(track.children, function (element) {
      var index = parseInt(element.dataset.index, 10);
      var rect;
      var ghost;

      if (nextIndexes[index]) {
        return;
      }

      rect = element.getBoundingClientRect();
      ghost = element.cloneNode(true);
      ghost.className = element.className + " card3d-ghost " + (direction > 0 ? "card3d-ghost--exit-left" : "card3d-ghost--exit-right");
      ghost.style.left = rect.left - stageRect.left + "px";
      ghost.style.top = rect.top - stageRect.top + "px";
      ghost.style.width = rect.width + "px";
      ghost.style.height = rect.height + "px";
      stage.appendChild(ghost);
    });
  }

  function createDetailGhost() {
    if (!detail.innerHTML.trim()) {
      return null;
    }

    removeGhost(".proj-detail-ghost");

    var ghost = document.createElement("div");
    ghost.className = "proj-detail-ghost";
    ghost.innerHTML = detail.innerHTML;
    detail.appendChild(ghost);
    return ghost;
  }

  function renderCards() {
    track.innerHTML = getVisibleState(active).map(function (item) {
      return buildCard(projects[item.index], item.roleClass, item.index);
    }).join("");

    Array.prototype.forEach.call(track.children, function (element) {
      var index = parseInt(element.dataset.index, 10);
      if (!isNaN(index)) {
        element.onclick = function () {
          setActive(index);
        };
      }
    });
  }

  function renderDetail() {
    var project = projects[active];

    detail.innerHTML = '<h3 class="text-3xl md:text-4xl font-bold mb-3">' + escapeHtml(project.title) + "</h3>" +
      (project.score ? '<p class="text-gray-600 mb-1"><span class="font-semibold">Score:</span> ' + escapeHtml(project.score) + "</p>" : "") +
      '<p class="text-gray-600 mb-4"><span class="font-semibold">Context:</span> ' + escapeHtml(project.period) + "</p>" +
      '<p class="text-gray-700 font-semibold">Summary:</p>' +
      '<p class="text-gray-600 mb-4">' + escapeHtml(project.summary) + "</p>" +
      '<p class="text-gray-700 font-semibold">Technologies &amp; Techniques:</p>' +
      '<ul class="text-gray-600 max-w-4xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-2 text-left mt-2 mb-2 list-disc list-inside">' +
      project.tech.map(function (tech) {
        return "<li>" + escapeHtml(tech) + "</li>";
      }).join("") +
      "</ul>";
  }

  function animateAndRender(nextIndex, forceDirection) {
    if (animating || projects.length < 2) {
      return;
    }

    var normalizedNext = normalizeIndex(nextIndex);
    if (normalizedNext === active) {
      return;
    }

    var direction = forceDirection || getDirection(normalizedNext);
    var nextVisibleState = getVisibleState(normalizedNext);
    var beforeRects = {};
    var enterClass = direction > 0 ? "is-enter-right" : "is-enter-left";
    var detailGhost = createDetailGhost();

    animating = true;
    clearMotionClasses();

    Array.prototype.forEach.call(track.children, function (element) {
      var index = parseInt(element.dataset.index, 10);
      beforeRects[index] = element.getBoundingClientRect();
    });

    createExitGhosts(nextVisibleState, direction);
    if (detailGhost) {
      detailGhost.classList.add(direction > 0 ? "is-exit-left" : "is-exit-right");
    }

    active = normalizedNext;
    renderCards();
    renderDetail();
    clearMotionClasses();

    Array.prototype.forEach.call(track.children, function (element) {
      var index = parseInt(element.dataset.index, 10);
      var beforeRect = beforeRects[index];
      var afterRect = element.getBoundingClientRect();

      element.classList.add("card3d--no-motion");

      if (beforeRect) {
        element.style.setProperty("--card-flip-x", beforeRect.left - afterRect.left + "px");
        element.style.setProperty("--card-flip-y", beforeRect.top - afterRect.top + "px");
      } else {
        element.style.setProperty("--card-flip-x", (direction > 0 ? 88 : -88) + "px");
        element.style.setProperty("--card-opacity", "0");
      }
    });

    void track.offsetWidth;
    void detail.offsetWidth;

    requestAnimationFrame(function () {
      Array.prototype.forEach.call(track.children, function (element) {
        element.classList.remove("card3d--no-motion");
        element.style.setProperty("--card-flip-x", "0px");
        element.style.setProperty("--card-flip-y", "0px");
        element.style.setProperty("--card-opacity", "1");
      });

      detail.classList.add(enterClass);

      setTimeout(function () {
        clearCardInlineMotion();
        clearMotionClasses();
        removeGhost(".card3d-ghost");
        removeGhost(".proj-detail-ghost");
        animating = false;
      }, transitionDuration);
    });
  }

  function setActive(index) {
    animateAndRender(index);
  }

  btnPrev.disabled = projects.length < 2;
  btnNext.disabled = projects.length < 2;
  btnPrev.addEventListener("click", function () {
    animateAndRender(active - 1, -1);
  });
  btnNext.addEventListener("click", function () {
    animateAndRender(active + 1, 1);
  });

  renderCards();
  renderDetail();
}

function bindSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      var targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }

      var targetElement = document.querySelector(targetId);
      if (!targetElement) {
        return;
      }

      event.preventDefault();

      var headerOffset = 80;
      var elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      var targetPosition = elementPosition - headerOffset;
      smoothScrollTo(targetPosition, 900);
    });
  });
}

function smoothScrollTo(targetPosition, duration) {
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }

    var timeElapsed = currentTime - startTime;
    var progress = Math.min(timeElapsed / duration, 1);
    var ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

function renderPortfolio(data) {
  document.title = data.site.title;
  document.getElementById("siteBrand").textContent = data.site.ownerName;
  document.getElementById("heroAvatar").src = data.hero.avatar;
  document.getElementById("heroAvatar").alt = data.hero.avatarAlt;
  document.getElementById("heroIntro").textContent = data.hero.introLabel;
  document.getElementById("heroName").textContent = data.hero.name;
  document.getElementById("heroRole").textContent = data.hero.role;
  document.getElementById("heroTagline").textContent = data.hero.tagline;
  renderLinks(document.getElementById("desktopNavLinks"), data.navigation.links, "text-gray-700 hover:text-black transition-colors");
  renderHeroActions(data.hero.actions);
  renderHeroSocials(data.hero.socialLinks);
  renderAbout(data.about);
  renderSkills(data.skills);
  renderAchievements(data.achievements);
  setTextAndToggleVisibility("projectsKicker", data.projects.kicker);
  document.getElementById("projectsTitle").textContent = data.projects.title;
  setTextAndToggleVisibility("projectsDescription", data.projects.description);
  renderContact(data.contact);
  renderFooter(data.footer, data.navigation.links);
  initializeProjects(data.projects.items);
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var store = window.PortfolioStore;
    if (!store) {
      throw new Error("PortfolioStore is not available.");
    }

    renderPortfolio(store.getPortfolioData());
    bindSmoothScrolling();
  } catch (error) {
    console.error("Failed to render portfolio.", error);
  }
});
