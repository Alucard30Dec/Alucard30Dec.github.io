(function () {
  var app = document.getElementById("app");

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeUrl(url) {
    if (!url) {
      return "#";
    }

    if (/^(https?:|mailto:|tel:|#)/i.test(url)) {
      return url;
    }

    return encodeURI(url);
  }

  function renderAnchor(link, className) {
    var href = normalizeUrl(link && link.url);
    var external = /^https?:/i.test(href);
    var attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return '<a class="' + className + '" href="' + escapeHtml(href) + '"' + attrs + ">" + escapeHtml(link && link.label ? link.label : "Open") + "</a>";
  }

  function renderList(items, itemRenderer) {
    return (items || []).map(itemRenderer).join("");
  }

  function renderProject(project) {
    var stats = renderList(project.stats, function (stat) {
      return '<article class="stat-card"><small>' + escapeHtml(stat.label) + '</small><div class="stat-value-lg">' + escapeHtml(stat.value) + '</div><p>' + escapeHtml(stat.note) + "</p></article>";
    });

    var highlights = renderList(project.highlights, function (item, index) {
      return '<article class="highlight-card"><div class="index-badge">' + escapeHtml(String(index + 1).padStart(2, "0")) + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + "</p></article>";
    });

    var gallery = renderList(project.gallery, function (item) {
      return '<article class="gallery-card"><img src="' + escapeHtml(normalizeUrl(item.src)) + '" alt="' + escapeHtml(item.alt || project.title) + '"><div class="gallery-caption">' + escapeHtml(item.caption || "") + "</div></article>";
    });

    var modules = renderList(project.modules, function (module) {
      var files = renderList(module.files, function (file) {
        return renderAnchor(file, "mini-link");
      });
      return '<article class="module-card"><small>Module</small><h3>' + escapeHtml(module.title) + '</h3><p>' + escapeHtml(module.text) + '</p><div class="module-files">' + files + "</div></article>";
    });

    var architecture = renderList(project.architecture, function (item) {
      return '<article class="architecture-card"><div class="architecture-badge">' + escapeHtml(item.badge || "") + '</div><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + "</p></article>";
    });

    var credentials = renderList(project.credentials, function (item) {
      return '<article class="credential-card"><small>Context</small><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + "</p></article>";
    });

    var sourceFiles = renderList(project.sourceFiles, function (item) {
      var links = renderList(item.links, function (link) {
        return renderAnchor(link, "mini-link");
      });
      return '<article class="source-card"><span class="source-type">' + escapeHtml(item.type || "Source") + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p><div class="source-actions">' + links + "</div></article>";
    });

    var tags = renderList(project.tags, function (tag) {
      return '<span class="tag">' + escapeHtml(tag) + "</span>";
    });

    return [
      '<div class="shell">',
      '  <div class="topbar">',
      '    <a class="brand" href="' + escapeHtml(normalizeUrl(project.backUrl || "index.html#projects")) + '">',
      '      <span class="brand-mark">HV</span>',
      '      <span class="brand-copy"><small>Portfolio project demo</small><span>' + escapeHtml(project.title) + "</span></span>",
      "    </a>",
      '    <div class="hero-actions">',
             renderAnchor(project.secondaryCta || { label: "Back To Portfolio", url: "index.html#projects" }, "btn btn-secondary"),
             renderAnchor(project.primaryCta || { label: "Open GitHub Repository", url: project.repoUrl || "#" }, "btn btn-primary"),
      "    </div>",
      "  </div>",
      '  <section class="hero">',
      '    <div class="hero-grid">',
      "      <div>",
      '        <span class="eyebrow">' + escapeHtml(project.eyebrow || "Project demo") + "</span>",
      "        <h1>" + escapeHtml(project.title) + "</h1>",
      '        <p class="hero-intro">' + escapeHtml(project.subtitle || "") + "</p>",
      '        <p class="hero-intro">' + escapeHtml(project.description || "") + "</p>",
      '        <div class="meta-grid">',
      '          <div class="meta-card"><span class="meta-label">Period</span><div class="meta-value">' + escapeHtml(project.period || "") + "</div></div>",
      '          <div class="meta-card"><span class="meta-label">Stack</span><div class="meta-value">' + escapeHtml(project.stackLabel || "") + "</div></div>",
      '          <div class="meta-card"><span class="meta-label">Status</span><div class="meta-value">' + escapeHtml(project.status || "") + "</div></div>",
      "        </div>",
      '        <div class="tag-list">' + tags + "</div>",
      "      </div>",
      '      <div class="hero-visual">',
      '        <img class="hero-photo" src="' + escapeHtml(normalizeUrl(project.image || "")) + '" alt="' + escapeHtml(project.imageAlt || project.title) + '">',
      '        <div class="floating-note"><strong>' + escapeHtml(project.visualNoteTitle || "Demo note") + "</strong>" + escapeHtml(project.visualNote || "") + "</div>",
      "      </div>",
      "    </div>",
      "  </section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Snapshot</small><h2>What this online demo covers</h2><p>This page gives reviewers a practical overview and quick entry points into the real source.</p></div></div><div class="stats-grid">' + stats + "</div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Highlights</small><h2>Key value of the project</h2><p>The strongest technical and product-facing parts of the implementation are summarized here.</p></div></div><div class="highlights-grid">' + highlights + "</div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Visuals</small><h2>Assets from the project</h2><p>Images below are loaded directly from the repository assets.</p></div></div><div class="gallery-grid">' + gallery + "</div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Modules</small><h2>System walkthrough</h2><p>Each module links to files or repositories that represent the real implementation.</p></div></div><div class="module-grid">' + modules + "</div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Architecture</small><h2>How the application is organized</h2><p>This keeps the project readable for reviewers before they open the source files.</p></div></div><div class="architecture-grid">' + architecture + "</div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Context</small><h2>Important delivery notes</h2><p>These notes explain what is online now and what still needs full backend hosting.</p></div></div><div class="credentials-grid">' + credentials + '</div><div class="notice"><strong>' + escapeHtml((project.deliveryNote && project.deliveryNote.title) || "Delivery note") + "</strong><p>" + escapeHtml((project.deliveryNote && project.deliveryNote.body) || "") + "</p></div></section>",
      '  <section class="section"><div class="section-head"><div class="section-copy"><small>Source</small><h2>Open the real implementation</h2><p>' + escapeHtml(project.sourceIntro || "") + '</p></div></div><div class="source-grid">' + sourceFiles + '</div><p class="footer-note">If you later deploy the backend to a real host, you can point the Demo button to that live application URL.</p></section>',
      "</div>"
    ].join("");
  }

  function renderMissing(slug) {
    return [
      '<section class="not-found">',
      "  <small>Project demo</small>",
      "  <h1>Project not found</h1>",
      '  <p>The slug <strong>' + escapeHtml(slug || "(empty)") + '</strong> does not exist. Update the Demo URL or add a matching project entry.</p>',
      '  <p><a class="btn btn-primary" href="index.html#projects">Back to portfolio</a></p>',
      "</section>"
    ].join("");
  }

  function renderError(message) {
    return [
      '<section class="not-found">',
      "  <small>Project demo</small>",
      "  <h1>Unable to render demo</h1>",
      "  <p>" + escapeHtml(message) + "</p>",
      '  <p><a class="btn btn-primary" href="index.html#projects">Back to portfolio</a></p>',
      "</section>"
    ].join("");
  }

  if (!app) {
    return;
  }

  try {
    var catalog = window.projectDemoCatalog || {};
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("project") || "online-sales-management-system";
    var project = catalog[slug];

    document.title = project ? project.title + " - Demo" : "Project Demo";
    app.innerHTML = project ? renderProject(project) : renderMissing(slug);
  } catch (error) {
    console.error("Failed to render project demo.", error);
    app.innerHTML = renderError(error && error.message ? error.message : "Unknown script error.");
  }
})();
