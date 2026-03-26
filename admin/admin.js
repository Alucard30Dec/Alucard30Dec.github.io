function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function joinLines(items) {
  return (items || []).join("\n");
}

function joinParagraphs(items) {
  return (items || []).join("\n\n");
}

function joinLinks(items) {
  return (items || []).map(function (item) {
    return (item.label || "") + " | " + (item.url || "");
  }).join("\n");
}

function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map(function (item) { return item.trim(); })
    .filter(Boolean);
}

function splitParagraphs(value) {
  return String(value || "")
    .split(/\r?\n\s*\r?\n/)
    .map(function (item) { return item.trim(); })
    .filter(Boolean);
}

function splitLinks(value) {
  return splitLines(value).map(function (line) {
    var parts = line.split("|");
    return {
      label: (parts[0] || "").trim(),
      url: parts.slice(1).join("|").trim()
    };
  }).filter(function (item) {
    return item.label || item.url;
  });
}

var dom = {};
var state = null;
var store = null;

function getFieldValue(name) {
  var field = dom.editorRoot.querySelector('[data-field="' + name + '"]');
  return field ? field.value.trim() : "";
}

function getFieldChecked(name) {
  var field = dom.editorRoot.querySelector('[data-field="' + name + '"]');
  return !!(field && field.checked);
}

function field(label, name, value, options) {
  var config = options || {};
  var type = config.type || "text";
  var fullClass = config.full ? " field--full" : "";
  var hint = config.hint ? '<small>' + escapeHtml(config.hint) + "</small>" : "";

  if (type === "textarea") {
    return '<div class="field' + fullClass + '"><label>' + escapeHtml(label) + '</label><textarea data-field="' + escapeHtml(name) + '">' + escapeHtml(value) + "</textarea>" + hint + "</div>";
  }

  if (type === "select") {
    var optionsHtml = (config.items || []).map(function (item) {
      var selected = item.value === value ? ' selected' : "";
      return '<option value="' + escapeHtml(item.value) + '"' + selected + ">" + escapeHtml(item.label) + "</option>";
    }).join("");

    return '<div class="field' + fullClass + '"><label>' + escapeHtml(label) + '</label><select data-field="' + escapeHtml(name) + '">' + optionsHtml + "</select>" + hint + "</div>";
  }

  if (type === "checkbox") {
    var checked = value ? " checked" : "";
    return '<label class="inline-toggle"><input type="checkbox" data-field="' + escapeHtml(name) + '"' + checked + " /><span>" + escapeHtml(label) + "</span></label>";
  }

  return '<div class="field' + fullClass + '"><label>' + escapeHtml(label) + '</label><input type="' + escapeHtml(type) + '" data-field="' + escapeHtml(name) + '" value="' + escapeHtml(value) + '" />' + hint + "</div>";
}

function section(title, description, body) {
  return '<section class="editor-section"><div class="editor-section__header"><div><h2 class="editor-section__title">' + escapeHtml(title) + '</h2><p class="editor-section__desc">' + escapeHtml(description) + '</p></div></div>' + body + "</section>";
}

function repeaterItem(title, body, action, index) {
  return '<div class="repeater-item" data-index="' + index + '"><div class="repeater-item__header"><h3 class="repeater-item__title">' + escapeHtml(title) + '</h3>' + (action || "") + "</div>" + body + "</div>";
}

function renderSiteSection() {
  return section(
    "Site",
    "Thong tin tong quan duoc dung cho tieu de va thuong hieu portfolio.",
    '<div class="editor-grid">' +
      field("Tieu de trang", "site.title", state.site.title) +
      field("Ten chu so huu", "site.ownerName", state.site.ownerName) +
      field("Portfolio URL", "site.portfolioUrl", state.site.portfolioUrl) +
      field("Resume URL", "site.resumeUrl", state.site.resumeUrl) +
    "</div>"
  );
}

function renderNavigationSection() {
  var items = state.navigation.links.map(function (link, index) {
    return repeaterItem(
      "Link " + (index + 1),
      '<div class="editor-grid">' +
        field("Nhan", 'navigation.links.' + index + '.label', link.label) +
        field("Target", 'navigation.links.' + index + '.target', link.target, { hint: "Vi du: #projects" }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-nav-link" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Navigation",
    "Menu tren header va footer mobile.",
    '<div class="repeater" id="navRepeater">' + items + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-nav-link">Them link</button></div>'
  );
}

function renderHeroSection() {
  var actions = state.hero.actions.map(function (action, index) {
    return repeaterItem(
      "Action " + (index + 1),
      '<div class="editor-grid">' +
        field("Label", 'hero.actions.' + index + '.label', action.label) +
        field("URL", 'hero.actions.' + index + '.url', action.url) +
        field("Style", 'hero.actions.' + index + '.style', action.style, {
          type: "select",
          items: [
            { label: "Dark", value: "dark" },
            { label: "Light", value: "light" }
          ]
        }) +
        field("Mo tab moi", 'hero.actions.' + index + '.newTab', action.newTab, { type: "checkbox" }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-hero-action" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  var socials = state.hero.socialLinks.map(function (link, index) {
    return repeaterItem(
      "Social " + (index + 1),
      '<div class="editor-grid">' +
        field("Icon", 'hero.socialLinks.' + index + '.icon', link.icon, {
          type: "select",
          items: [
            { label: "GitHub", value: "github" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Codeforces", value: "codeforces" },
            { label: "LeetCode", value: "leetcode" },
            { label: "Generic Link", value: "link" }
          ]
        }) +
        field("Label", 'hero.socialLinks.' + index + '.label', link.label) +
        field("URL", 'hero.socialLinks.' + index + '.url', link.url, { full: true }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-social-link" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Hero",
    "Phan gioi thieu dau trang, nut hanh dong va mang xa hoi.",
    '<div class="editor-grid">' +
      field("Avatar", "hero.avatar", state.hero.avatar) +
      field("Avatar alt", "hero.avatarAlt", state.hero.avatarAlt) +
      field("Intro label", "hero.introLabel", state.hero.introLabel) +
      field("Ten hien thi", "hero.name", state.hero.name) +
      field("Vai tro", "hero.role", state.hero.role) +
      field("Tagline", "hero.tagline", state.hero.tagline, { full: true }) +
    '</div><div class="section-actions"><span class="mini-button">Hero actions</span></div><div class="repeater">' + actions + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-hero-action">Them action</button></div><div class="section-actions"><span class="mini-button">Social links</span></div><div class="repeater">' + socials + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-social-link">Them social link</button></div>'
  );
}

function renderAboutSection() {
  var highlights = state.about.highlights.map(function (item, index) {
    return repeaterItem(
      "Highlight " + (index + 1),
      '<div class="editor-grid">' +
        field("Tieu de", 'about.highlights.' + index + '.title', item.title) +
        field("Mo ta", 'about.highlights.' + index + '.description', item.description) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-highlight" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "About",
    "Noi dung profile, hoc van va cac highlight.",
    '<div class="editor-grid">' +
      field("Kicker", "about.kicker", state.about.kicker) +
      field("Tieu de", "about.title", state.about.title) +
      field("Anh", "about.image", state.about.image) +
      field("Alt text", "about.imageAlt", state.about.imageAlt) +
      field("Education title", "about.educationTitle", state.about.educationTitle) +
      field("School", "about.educationSchool", state.about.educationSchool) +
      field("Degree", "about.educationDegree", state.about.educationDegree, { full: true }) +
      field("Cac doan van", "about.paragraphs", joinParagraphs(state.about.paragraphs), { type: "textarea", full: true, hint: "Moi doan van cach nhau bang 1 dong trong." }) +
    '</div><div class="section-actions"><span class="mini-button">Highlights</span></div><div class="repeater">' + highlights + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-highlight">Them highlight</button></div>'
  );
}

function renderSkillsSection() {
  var groups = state.skills.groups.map(function (group, index) {
    return repeaterItem(
      "Skill group " + (index + 1),
      '<div class="editor-grid editor-grid--full">' +
        field("Tieu de nhom", 'skills.groups.' + index + '.title', group.title) +
        field("Danh sach ky nang", 'skills.groups.' + index + '.items', joinLines(group.items), { type: "textarea", full: true, hint: "Moi dong la 1 ky nang." }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-skill-group" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Skills",
    "Cac nhom ky nang va danh sach ben trong moi nhom.",
    '<div class="editor-grid">' +
      field("Kicker", "skills.kicker", state.skills.kicker) +
      field("Tieu de", "skills.title", state.skills.title) +
    '</div><div class="repeater">' + groups + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-skill-group">Them nhom ky nang</button></div>'
  );
}

function renderAchievementsSection() {
  var groups = state.achievements.groups.map(function (group, index) {
    return repeaterItem(
      "Achievement group " + (index + 1),
      '<div class="editor-grid editor-grid--full">' +
        field("Tieu de nhom", 'achievements.groups.' + index + '.title', group.title) +
        field("Danh sach muc", 'achievements.groups.' + index + '.items', joinLines(group.items), { type: "textarea", full: true, hint: "Moi dong la 1 achievement." }) +
        field("Links", 'achievements.groups.' + index + '.links', joinLinks(group.links), { type: "textarea", full: true, hint: "Dinh dang moi dong: Label | URL" }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-achievement-group" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Achievements",
    "Thanh tich, hoat dong va cac link tham chieu.",
    '<div class="editor-grid">' +
      field("Kicker", "achievements.kicker", state.achievements.kicker) +
      field("Tieu de", "achievements.title", state.achievements.title) +
    '</div><div class="repeater">' + groups + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-achievement-group">Them nhom achievement</button></div>'
  );
}

function renderProjectsSection() {
  var items = state.projects.items.map(function (project, index) {
    return repeaterItem(
      "Project " + (index + 1),
      '<div class="editor-grid">' +
        field("Title", 'projects.items.' + index + '.title', project.title) +
        field("Image", 'projects.items.' + index + '.image', project.image) +
        field("GitHub URL", 'projects.items.' + index + '.github', project.github) +
        field("Demo URL", 'projects.items.' + index + '.demo', project.demo) +
        field("Report URL", 'projects.items.' + index + '.report', project.report) +
        field("Score", 'projects.items.' + index + '.score', project.score) +
        field("Thoi gian", 'projects.items.' + index + '.period', project.period) +
        field("Summary", 'projects.items.' + index + '.summary', project.summary, { type: "textarea", full: true }) +
        field("Tech stack", 'projects.items.' + index + '.tech', joinLines(project.tech), { type: "textarea", full: true, hint: "Moi dong la 1 cong nghe / ky thuat." }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-project" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Projects",
    "Carousel project va chi tiet tung du an.",
    '<div class="editor-grid">' +
      field("Kicker", "projects.kicker", state.projects.kicker) +
      field("Tieu de", "projects.title", state.projects.title) +
      field("Mo ta mo dau", "projects.description", state.projects.description, { full: true }) +
    '</div><div class="repeater">' + items + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-project">Them project</button></div>'
  );
}

function renderContactSection() {
  var methods = state.contact.methods.map(function (method, index) {
    return repeaterItem(
      "Contact method " + (index + 1),
      '<div class="editor-grid">' +
        field("Loai", 'contact.methods.' + index + '.type', method.type, {
          type: "select",
          items: [
            { label: "Email", value: "email" },
            { label: "Phone", value: "phone" },
            { label: "Link", value: "link" }
          ]
        }) +
        field("Label", 'contact.methods.' + index + '.label', method.label) +
        field("URL", 'contact.methods.' + index + '.url', method.url, { full: true }) +
      "</div>",
      '<button class="mini-button mini-button--danger" type="button" data-action="remove-contact-method" data-index="' + index + '">Xoa</button>',
      index
    );
  }).join("");

  return section(
    "Contact",
    "Tieu de, mo ta va cac nut lien he.",
    '<div class="editor-grid">' +
      field("Tieu de", "contact.title", state.contact.title) +
      field("Mo ta", "contact.description", state.contact.description, { full: true }) +
    '</div><div class="repeater">' + methods + '</div><div class="section-actions"><button class="mini-button mini-button--soft" type="button" data-action="add-contact-method">Them contact method</button></div>'
  );
}

function renderFooterSection() {
  return section(
    "Footer",
    "Noi dung cuoi trang.",
    '<div class="editor-grid">' +
      field("Copyright", "footer.copyright", state.footer.copyright, { full: true }) +
      field("Portfolio label", "footer.portfolioLabel", state.footer.portfolioLabel) +
      field("Portfolio URL", "footer.portfolioUrl", state.footer.portfolioUrl) +
    "</div>"
  );
}

function renderEditor() {
  dom.editorRoot.innerHTML = [
    renderSiteSection(),
    renderNavigationSection(),
    renderHeroSection(),
    renderAboutSection(),
    renderSkillsSection(),
    renderAchievementsSection(),
    renderProjectsSection(),
    renderContactSection(),
    renderFooterSection()
  ].join("");
}

function collectFormData() {
  return store.normalizePortfolioData({
    site: {
      title: getFieldValue("site.title"),
      ownerName: getFieldValue("site.ownerName"),
      portfolioUrl: getFieldValue("site.portfolioUrl"),
      resumeUrl: getFieldValue("site.resumeUrl")
    },
    navigation: {
      links: state.navigation.links.map(function (_, index) {
        return {
          label: getFieldValue('navigation.links.' + index + '.label'),
          target: getFieldValue('navigation.links.' + index + '.target')
        };
      })
    },
    hero: {
      avatar: getFieldValue("hero.avatar"),
      avatarAlt: getFieldValue("hero.avatarAlt"),
      introLabel: getFieldValue("hero.introLabel"),
      name: getFieldValue("hero.name"),
      role: getFieldValue("hero.role"),
      tagline: getFieldValue("hero.tagline"),
      actions: state.hero.actions.map(function (_, index) {
        return {
          label: getFieldValue('hero.actions.' + index + '.label'),
          url: getFieldValue('hero.actions.' + index + '.url'),
          style: getFieldValue('hero.actions.' + index + '.style'),
          newTab: getFieldChecked('hero.actions.' + index + '.newTab')
        };
      }),
      socialLinks: state.hero.socialLinks.map(function (_, index) {
        return {
          icon: getFieldValue('hero.socialLinks.' + index + '.icon'),
          label: getFieldValue('hero.socialLinks.' + index + '.label'),
          url: getFieldValue('hero.socialLinks.' + index + '.url')
        };
      })
    },
    about: {
      kicker: getFieldValue("about.kicker"),
      title: getFieldValue("about.title"),
      image: getFieldValue("about.image"),
      imageAlt: getFieldValue("about.imageAlt"),
      educationTitle: getFieldValue("about.educationTitle"),
      educationSchool: getFieldValue("about.educationSchool"),
      educationDegree: getFieldValue("about.educationDegree"),
      paragraphs: splitParagraphs(getFieldValue("about.paragraphs")),
      highlights: state.about.highlights.map(function (_, index) {
        return {
          title: getFieldValue('about.highlights.' + index + '.title'),
          description: getFieldValue('about.highlights.' + index + '.description')
        };
      })
    },
    skills: {
      kicker: getFieldValue("skills.kicker"),
      title: getFieldValue("skills.title"),
      groups: state.skills.groups.map(function (_, index) {
        return {
          title: getFieldValue('skills.groups.' + index + '.title'),
          items: splitLines(getFieldValue('skills.groups.' + index + '.items'))
        };
      })
    },
    achievements: {
      kicker: getFieldValue("achievements.kicker"),
      title: getFieldValue("achievements.title"),
      groups: state.achievements.groups.map(function (_, index) {
        return {
          title: getFieldValue('achievements.groups.' + index + '.title'),
          items: splitLines(getFieldValue('achievements.groups.' + index + '.items')),
          links: splitLinks(getFieldValue('achievements.groups.' + index + '.links'))
        };
      })
    },
    projects: {
      kicker: getFieldValue("projects.kicker"),
      title: getFieldValue("projects.title"),
      description: getFieldValue("projects.description"),
      items: state.projects.items.map(function (_, index) {
        return {
          title: getFieldValue('projects.items.' + index + '.title'),
          image: getFieldValue('projects.items.' + index + '.image'),
          github: getFieldValue('projects.items.' + index + '.github'),
          demo: getFieldValue('projects.items.' + index + '.demo'),
          report: getFieldValue('projects.items.' + index + '.report'),
          score: getFieldValue('projects.items.' + index + '.score'),
          period: getFieldValue('projects.items.' + index + '.period'),
          summary: getFieldValue('projects.items.' + index + '.summary'),
          tech: splitLines(getFieldValue('projects.items.' + index + '.tech'))
        };
      })
    },
    contact: {
      title: getFieldValue("contact.title"),
      description: getFieldValue("contact.description"),
      methods: state.contact.methods.map(function (_, index) {
        return {
          type: getFieldValue('contact.methods.' + index + '.type'),
          label: getFieldValue('contact.methods.' + index + '.label'),
          url: getFieldValue('contact.methods.' + index + '.url')
        };
      })
    },
    footer: {
      copyright: getFieldValue("footer.copyright"),
      portfolioLabel: getFieldValue("footer.portfolioLabel"),
      portfolioUrl: getFieldValue("footer.portfolioUrl")
    }
  });
}

function syncStateFromForm() {
  state = collectFormData();
}

function showStatus(message, tone) {
  dom.statusMessage.textContent = message;
  dom.statusMessage.className = "admin-status";

  if (tone === "success") {
    dom.statusMessage.classList.add("admin-status--success");
  }

  if (tone === "error") {
    dom.statusMessage.classList.add("admin-status--error");
  }
}

function exportJson() {
  syncStateFromForm();
  var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = "portfolio-data.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showStatus("Da export file portfolio-data.json.", "success");
}

function importJson(file) {
  var reader = new FileReader();
  reader.onload = function () {
    try {
      var parsed = JSON.parse(String(reader.result || ""));
      state = store.normalizePortfolioData(parsed);
      state = store.savePortfolioData(state);
      renderEditor();
      showStatus("Da import va luu du lieu moi.", "success");
    } catch (error) {
      console.error("Import failed.", error);
      showStatus("Import that bai. Kiem tra lai file JSON.", "error");
    }
  };
  reader.onerror = function () {
    showStatus("Khong doc duoc file JSON.", "error");
  };
  reader.readAsText(file);
}

function handleAction(action, index) {
  syncStateFromForm();

  if (action === "add-nav-link") {
    state.navigation.links.push({ label: "New Link", target: "#section" });
  } else if (action === "remove-nav-link") {
    state.navigation.links.splice(index, 1);
  } else if (action === "add-hero-action") {
    state.hero.actions.push({ label: "New Action", url: "#", style: "light", newTab: false });
  } else if (action === "remove-hero-action") {
    state.hero.actions.splice(index, 1);
  } else if (action === "add-social-link") {
    state.hero.socialLinks.push({ icon: "link", label: "New Social", url: "https://" });
  } else if (action === "remove-social-link") {
    state.hero.socialLinks.splice(index, 1);
  } else if (action === "add-highlight") {
    state.about.highlights.push({ title: "New Highlight", description: "Description" });
  } else if (action === "remove-highlight") {
    state.about.highlights.splice(index, 1);
  } else if (action === "add-skill-group") {
    state.skills.groups.push({ title: "New Skill Group", items: ["New skill"] });
  } else if (action === "remove-skill-group") {
    state.skills.groups.splice(index, 1);
  } else if (action === "add-achievement-group") {
    state.achievements.groups.push({ title: "New Achievement Group", items: ["New achievement"], links: [] });
  } else if (action === "remove-achievement-group") {
    state.achievements.groups.splice(index, 1);
  } else if (action === "add-project") {
    state.projects.items.push({
      title: "New Project",
      image: "Images/project.png",
      github: "#",
      demo: "#",
      report: "#",
      score: "",
      period: "",
      summary: "",
      tech: ["Technology"]
    });
  } else if (action === "remove-project") {
    state.projects.items.splice(index, 1);
  } else if (action === "add-contact-method") {
    state.contact.methods.push({ type: "link", label: "New Contact", url: "https://" });
  } else if (action === "remove-contact-method") {
    state.contact.methods.splice(index, 1);
  }

  renderEditor();
}

function bindEvents() {
  dom.saveBtn.addEventListener("click", function () {
    try {
      syncStateFromForm();
      state = store.savePortfolioData(state);
      renderEditor();
      showStatus("Da luu thay doi vao trinh duyet hien tai.", "success");
    } catch (error) {
      console.error("Save failed.", error);
      showStatus("Khong the luu du lieu.", "error");
    }
  });

  dom.resetBtn.addEventListener("click", function () {
    if (!window.confirm("Khoi phuc du lieu mac dinh va xoa ban da luu hien tai?")) {
      return;
    }

    try {
      state = store.resetPortfolioData();
      renderEditor();
      showStatus("Da khoi phuc du lieu mac dinh.", "success");
    } catch (error) {
      console.error("Reset failed.", error);
      showStatus("Khong the reset du lieu.", "error");
    }
  });

  dom.exportBtn.addEventListener("click", exportJson);
  dom.importBtn.addEventListener("click", function () {
    dom.importFile.click();
  });

  dom.importFile.addEventListener("change", function (event) {
    var file = event.target.files && event.target.files[0];
    if (file) {
      importJson(file);
    }
    event.target.value = "";
  });

  dom.editorRoot.addEventListener("click", function (event) {
    var button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    var action = button.getAttribute("data-action");
    var index = parseInt(button.getAttribute("data-index"), 10);
    handleAction(action, isNaN(index) ? -1 : index);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  store = window.PortfolioStore;

  if (!store) {
    console.error("PortfolioStore is not available.");
    return;
  }

  dom.editorRoot = document.getElementById("editorRoot");
  dom.statusMessage = document.getElementById("statusMessage");
  dom.saveBtn = document.getElementById("saveBtn");
  dom.resetBtn = document.getElementById("resetBtn");
  dom.exportBtn = document.getElementById("exportBtn");
  dom.importBtn = document.getElementById("importBtn");
  dom.importFile = document.getElementById("importFile");

  state = store.getPortfolioData();
  renderEditor();
  bindEvents();
});
