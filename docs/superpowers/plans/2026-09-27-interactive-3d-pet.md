# Interactive 3D Portfolio Pet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current flat hero pet with a locally hosted Three.js low-poly cat scene that can rotate 360 degrees and zoom with mouse wheel or touch pinch while preserving the existing SVG fallback.

**Architecture:** Keep the portfolio as a static HTML/CSS/JavaScript site. Add one ES-module renderer, vendor Three.js and OrbitControls locally, use the existing pet CSS variables as the material palette, and let the current SVG remain visible until WebGL initialization succeeds.

**Tech Stack:** HTML, CSS, vanilla JavaScript ES modules, Three.js `0.186.1`, OrbitControls, GitHub Pages, Python local HTTP server.

**Spec:** `docs/superpowers/specs/2026-09-27-interactive-3d-pet-design.md`

## Global Constraints

- Keep the existing static site; do not add React, another application framework, a backend, or a build pipeline.
- Store Three.js and OrbitControls locally in the repository; the published pet must not require a runtime CDN.
- Preserve the recognizable reference composition: low-poly cat, wooden desk, teal laptop, small plant, mug, and soft contact shadow.
- Support unrestricted horizontal orbit, controlled vertical orbit, mouse-wheel zoom, one-finger rotate, and two-finger pinch zoom; disable panning.
- Keep an isometric-style default camera and clamp zoom so the scene cannot disappear inside or outside the useful framing range.
- Keep the existing SVG pet as the default-visible fallback and hide it only after successful WebGL initialization.
- Keep the 3D canvas transparent and compatible with both current light and dark themes.
- Cap renderer pixel ratio at `2`, resize only with the pet host, and stop the render loop while the document is hidden.
- Honor `prefers-reduced-motion` by avoiding autonomous animation; direct orbit and zoom remain enabled.
- Preserve the user's current staged, unstaged, renamed, deleted, and untracked work. Never use `git add -A`, `git reset`, `git checkout`, or whole-file replacement from `HEAD` on shared modified files.
- Do not add a new automated test framework for this visual, reversible feature. Use syntax/import checks, local HTTP smoke checks, and direct browser interaction verification.

## Review Focus

- WebGL or module initialization failure: the SVG fallback must remain visible and the rest of the portfolio must continue working.
- Touch input inside the pet: one finger rotates and two fingers zoom without enabling camera pan; page scrolling remains normal outside the pet host.
- Very small or high-density viewport: the renderer follows the host size, uses at most device pixel ratio `2`, and does not create horizontal overflow.
- Theme changes after initialization: pet materials/light balance refresh when `html[data-theme]` changes without rebuilding the whole page.
- Page hide/resume and teardown: animation stops while hidden, restarts on visibility return, and observers/renderer/controls are disposed on page teardown.

## File Structure

- `vendor/three/three.module.js`: vendored Three.js `0.186.1` ES module.
- `vendor/three/three.core.js`: core module imported by `three.module.js` in Three.js `0.186.1`.
- `vendor/three/OrbitControls.js`: matching OrbitControls module from the same Three.js release.
- `vendor/three/LICENSE`: upstream MIT license for the vendored files.
- `pet-3d.js`: owns scene construction, materials, camera, OrbitControls, resize/theme/visibility handling, fallback transition, and cleanup.
- `index.html`: keeps the existing SVG fallback, adds the WebGL host/import map/module script, and changes the pet wrapper from button semantics to a labeled interactive visual container.
- `style.css`: owns canvas/fallback stacking, pointer/touch behavior, ready-state transitions, responsive sizing, and the existing pet palette variables.
- `script.js`: removes the old fake tilt/click animation so it cannot conflict with OrbitControls.
- `.github/workflows/deploy-pages.yml`: copies `pet-3d.js` and `vendor/three/` into `_site`.
- `README.md`: documents the 3D module and local vendored dependency without changing the existing launch flow.

---

### Task 1: Vendor the Three.js Runtime

**Files:**
- Create: `vendor/three/three.module.js`
- Create: `vendor/three/three.core.js`
- Create: `vendor/three/OrbitControls.js`
- Create: `vendor/three/LICENSE`

**Interfaces:**
- Produces the local module specifier target `./vendor/three/three.module.js` for the import map in Task 3.
- Produces the relative module `./vendor/three/OrbitControls.js` imported by `pet-3d.js` in Task 2.
- Both JavaScript files must come from the same Three.js release: `0.186.1`.

- [ ] **Step 1: Acquire the exact upstream release into a temporary directory**

Use `npm pack three@0.186.1` only as an acquisition step. Extract the tarball outside the repository and copy only `build/three.module.js`, `build/three.core.js`, `examples/jsm/controls/OrbitControls.js`, and `LICENSE` into `vendor/three/`. Do not add `package.json`, `package-lock.json`, or `node_modules`.

- [ ] **Step 2: Verify the vendored modules are parseable and version-matched**

Run:

```powershell
Get-Content -Raw vendor/three/three.module.js | node --input-type=module --check
Get-Content -Raw vendor/three/three.core.js | node --input-type=module --check
Get-Content -Raw vendor/three/OrbitControls.js | node --input-type=module --check
Select-String -Path vendor/three/OrbitControls.js -Pattern "from 'three'"
```

Expected: all syntax checks exit `0`; `three.module.js` can resolve its sibling `three.core.js`, and OrbitControls keeps its upstream bare `three` import so Task 3's import map resolves it locally.

- [ ] **Step 3: Commit only the new vendor directory**

```powershell
git add -- vendor/three
git commit -m "chore: vendor threejs for 3d pet" -- vendor/three
```

Do not stage any existing portfolio, workflow, CV, image, or documentation changes.

### Task 2: Build the Procedural 3D Pet Module

**Files:**
- Create: `pet-3d.js`
- Read: `style.css` pet color variables.

**Interfaces:**
- Consumes: `#voxelPet`, `[data-pet-3d-host]`, the CSS pet palette variables, the import-map specifier `three`, and `./vendor/three/OrbitControls.js`.
- Produces: a transparent `<canvas class="pet-3d-canvas">` inside `[data-pet-3d-host]` and adds `is-3d-ready` to `#voxelPet` only after the first successful render.
- Internal entry point: `initializePet3D()`; invoke it once when the module loads because the module script is placed at the end of `body`.
- Cleanup entry point: `disposePet3D()`; call it on `pagehide`.

- [ ] **Step 1: Create renderer, scene, camera, and controls with fixed interaction bounds**

In `pet-3d.js`, import `* as THREE` from `three` and `OrbitControls` from `./vendor/three/OrbitControls.js`. Configure:

- `PerspectiveCamera(30, aspect, 0.1, 100)` at `(7.5, 6.2, 8.5)`.
- Orbit target `(0, 2.2, 0)`.
- `enableDamping = true`, `dampingFactor = 0.08`, `enablePan = false`, `rotateSpeed = 0.7`, `zoomSpeed = 0.8`.
- `minDistance = 7`, `maxDistance = 15`, `minPolarAngle = 0.55`, `maxPolarAngle = 1.45`.
- No azimuth limits, so horizontal orbit can complete 360 degrees.
- `touches.ONE = THREE.TOUCH.ROTATE` and `touches.TWO = THREE.TOUCH.DOLLY_ROTATE`.
- `WebGLRenderer({ alpha: true, antialias: true })`, transparent clear color, sRGB output, shadows enabled, and pixel ratio `Math.min(window.devicePixelRatio || 1, 2)`.

- [ ] **Step 2: Build the low-poly scene from primitive geometry**

Use reusable small helpers for box/mesh creation and keep all objects in one `THREE.Group` centered around the OrbitControls target. Match the reference composition with these relative placements:

- Desk top centered at about `y = 1.8`, with four legs below it.
- Cat centered slightly behind the laptop, with block body/head, two low-poly ears, muzzle/eyes, front paws, and a tail extending to the right/rear.
- Teal laptop in the front-center of the desk with a tilted screen and simple contrasting code-mark geometry.
- Small plant on the left side of the desk and mug on the right side.
- Shadow-receiving plane just below the desk legs; do not render an opaque ground/background.

Use `MeshStandardMaterial`/flat-shaded primitive geometry and reuse materials rather than creating a unique material per mesh.

- [ ] **Step 3: Bind materials to the current theme**

Read the existing CSS variables `--pet-fur-top`, `--pet-fur-front`, `--pet-fur-side`, `--pet-fur-dark`, `--pet-desk-top`, `--pet-desk-front`, `--pet-desk-side`, `--pet-laptop`, `--pet-laptop-dark`, and `--pet-laptop-light` through `getComputedStyle(document.documentElement)`. Use fixed muted colors for plant/mug only where no current variable exists.

Observe `html[data-theme]` with a `MutationObserver`; on changes, update the shared material colors and the shadow/light balance in place.

- [ ] **Step 4: Add resize, visibility, ready-state, error fallback, and cleanup**

Use `ResizeObserver` on `[data-pet-3d-host]` to update renderer size and camera aspect. Maintain one `requestAnimationFrame` loop while `document.hidden === false`; stop it on `visibilitychange` when hidden and restart when visible. Update controls before every render so damping settles correctly.

Wrap initialization in `try/catch`. On success, render once and add `is-3d-ready`; on failure, log one warning and leave the class absent so the SVG remains visible. In `disposePet3D()`, cancel the frame, disconnect both observers, dispose controls/renderer/geometries/materials, and remove the canvas.

- [ ] **Step 5: Run module syntax verification**

Run:

```powershell
Get-Content -Raw pet-3d.js | node --input-type=module --check
```

Expected: exit `0` with no syntax error.

- [ ] **Step 6: Commit only the new renderer module**

```powershell
git add -- pet-3d.js
git commit -m "feat: add interactive 3d pet renderer" -- pet-3d.js
```

Do not stage `index.html`, `style.css`, `script.js`, or any pre-existing user changes.

### Task 3: Integrate the Canvas with the Existing Hero and SVG Fallback

**Files:**
- Modify: `index.html:81-150,269-270`
- Modify: `style.css:818-1037,2005-2010,2121-2127,2236-2244,2282-2287`
- Modify: `script.js:514-550,574-589`

**Interfaces:**
- `#voxelPet` becomes the stable container consumed by `pet-3d.js`; keep the same ID.
- `[data-pet-3d-host]` is the exact canvas mount point.
- `.pet-fallback` contains the current SVG and stays visible until `#voxelPet.is-3d-ready` exists.
- `script.js` no longer owns pet pointer/click behavior.

- [ ] **Step 1: Replace button semantics with a labeled interactive visual container**

In `index.html`, keep `.pet-dock` in its current hero location. Change the current `button.voxel-pet` to a non-button container with `id="voxelPet"`, `role="img"`, and an accessible label describing both the coding-cat scene and the pointer gestures. Inside `.pet-stage-inner`, add an empty `<span data-pet-3d-host></span>` and wrap the complete existing SVG in `.pet-fallback` without redrawing or deleting it.

Change the visual helper label text to `drag · rotate · zoom`.

- [ ] **Step 2: Add the local import map and renderer module**

Before loading `pet-3d.js`, add an import map mapping `three` to `./vendor/three/three.module.js`. Keep `portfolio-data.js` and `script.js` as classic scripts and add `<script type="module" src="pet-3d.js"></script>` after them.

- [ ] **Step 3: Replace faux 3D styling with canvas/fallback stacking**

In `style.css`, preserve the current `.pet-dock` responsive position rules. Make `.pet-stage-inner` a positioned 4:3 stage; make `[data-pet-3d-host]` and `.pet-fallback` occupy the same inset; make `.pet-3d-canvas` fill the host; set `touch-action: none` and grab/grabbing cursors only on the 3D host.

Keep the fallback visible by default. Use `.voxel-pet.is-3d-ready` to reveal the WebGL host and fade/hide `.pet-fallback`. Keep the current pet color variables because Task 2 reads them.

Remove `--pet-rotate-x`, `--pet-rotate-y`, the old pointer-tilt transforms, `is-playing` selectors, and `petTailWag`/`petHello`/`petHeadTilt` keyframes. Update the reduced-motion rule so it no longer references deleted fake-animation selectors.

- [ ] **Step 4: Remove the old JavaScript pet interaction**

Delete `initializeVoxelPet()` and its `DOMContentLoaded` call from `script.js`. Do not change theme, navigation, reveal, project rendering, or hash-restoration behavior.

- [ ] **Step 5: Check shared-file diffs without staging them**

Run:

```powershell
git diff --check -- index.html style.css script.js
git diff -- index.html style.css script.js
```

Expected: no whitespace errors; the diff is limited to the pet markup/module tags, pet styling, and removal of the old pet initializer.

Do not commit these shared files yet because they already contain pending user work from the portfolio refresh.

### Task 4: Publish the Local Modules and Verify the Finished Interaction

**Files:**
- Modify: `.github/workflows/deploy-pages.yml:32-38`
- Modify: `README.md:13-21`
- Verify: `.vscode/tasks.json`
- Verify: `index.html`, `style.css`, `script.js`, `pet-3d.js`, `vendor/three/*`

**Interfaces:**
- Local server stays `http://localhost:5500/` through the existing `Run Portfolio Web` task.
- GitHub Pages artifact must contain root `pet-3d.js` and `vendor/three/{three.module.js,three.core.js,OrbitControls.js,LICENSE}`.

- [ ] **Step 1: Extend GitHub Pages assembly for the 3D runtime**

Keep the existing asset copies. Change the assembly block so it creates `_site/vendor/three`, copies `pet-3d.js` with the root runtime files, and copies the four vendored files into `_site/vendor/three/`.

- [ ] **Step 2: Update the README runtime file list**

Add `pet-3d.js` as the interactive Three.js pet module and note that `vendor/three/` contains the locally hosted Three.js/OrbitControls runtime. Keep the existing Ctrl+Shift+B instructions unchanged.

- [ ] **Step 3: Run static and HTTP smoke checks**

Start the existing local server, then request these paths:

```text
/
/pet-3d.js
/vendor/three/three.module.js
/vendor/three/three.core.js
/vendor/three/OrbitControls.js
```

Expected: HTTP `200` for every path. Check DevTools Network and confirm the pet does not request `unpkg`, `jsdelivr`, or another Three.js CDN.

- [ ] **Step 4: Verify desktop interaction in a real browser**

At a desktop viewport, verify the initial composition matches the supplied low-poly reference, drag can orbit through a full horizontal revolution, vertical drag stops at the configured polar limits, wheel zoom stops at both distance limits, and the scene remains centered with no pan.

Toggle light/dark theme after initialization and confirm materials/light balance update without recreating the page. Switch to another browser tab long enough to trigger `document.hidden`, return, and confirm rendering resumes.

In DevTools, dispatch `pagehide` once and confirm the canvas is removed and no new animation frame/error continues afterward; reload the page before the remaining checks.

- [ ] **Step 5: Verify touch and responsive behavior**

Use browser mobile emulation or a touch device at approximately `390px` width. Verify one-finger rotate, two-finger pinch zoom, no camera pan, no horizontal page overflow, and normal document scrolling when the gesture begins outside the pet.

- [ ] **Step 6: Verify the SVG fallback path**

Block `pet-3d.js` or the Three.js module request in DevTools and reload. Expected: the original SVG pet remains visible, no `is-3d-ready` class appears, and portfolio navigation/theme/content still work.

- [ ] **Step 7: Run final repository checks**

Run:

```powershell
git diff --check
git status --short
```

Confirm the pet-specific edits are present and all unrelated staged/unstaged/deleted/renamed files retain their prior state. Do not use bulk staging. Leave shared dirty files uncommitted for the user's existing portfolio-refresh work unless the user explicitly asks to commit them.

## Execution Notes

- Run Tasks 1-4 sequentially because the local module paths, DOM host, CSS ready state, and deployment artifact depend on one another.
- Build on the current working tree; do not create a clean worktree from `HEAD` because the pet must integrate with the user's already modified hero layout.
- The attached reference image is the visual target for proportions and object placement, especially the cat silhouette, desk, teal laptop, plant, and mug.
- Keep the renderer procedural and small; do not add a GLB/GLTF asset, texture pack, GUI panel, physics engine, or autonomous animation.
- If browser verification reveals that touch gestures fight page scrolling, adjust only the pet host's `touch-action`/pointer handling; do not disable scrolling at the page level.
