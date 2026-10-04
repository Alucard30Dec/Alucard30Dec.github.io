# Hoang Van Thien Portfolio

Recruiter-facing single-page portfolio for Hoang Van Thien, focused on .NET backend and full-stack development.

The site is self-contained at runtime and uses HTML, CSS, and JavaScript, with Three.js vendored locally for the interactive hero pet. Portfolio content is maintained in `portfolio-data.js` and rendered into `index.html` by `script.js`.

## Run locally

Open this repository in VS Code and press `Ctrl+Shift+B`. The default build task, `Run Portfolio Web`, opens `index.html` in the default browser.

The same action is defined in `.vscode/tasks.json`; it starts Python's local HTTP server on port `5500` and opens the portfolio in the default browser. No package install or frontend build step is required.

## Main files

- `index.html` - semantic page structure.
- `style.css` - responsive local styling with no external CSS/font dependency.
- `portfolio-data.js` - portfolio content, experience, projects, skills, awards, and contact data.
- `script.js` - safe data rendering and mobile navigation.
- `pet-3d.js` - interactive low-poly coding-cat scene built with Three.js.
- `vendor/three/` - locally hosted Three.js, OrbitControls, and upstream license used by the pet.
- `CV_HOANGVANTHIEN.pdf` - public resume linked from the hero section.
- `favicon.svg`, `robots.txt`, `sitemap.xml` - browser identity and search-engine discovery metadata.

GitHub Pages publishes only the runtime files and assets assembled into `_site` by `.github/workflows/deploy-pages.yml`.
