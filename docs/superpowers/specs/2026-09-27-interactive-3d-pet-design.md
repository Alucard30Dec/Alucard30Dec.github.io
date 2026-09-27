# Interactive 3D Portfolio Pet Design

Date: 2026-09-27

## Goal

Replace the current flat SVG coding-cat interaction in the hero with a real-time 3D low-poly scene inspired by the interaction style on craftz.dog. Preserve the existing visual identity: a cat at a desk with a laptop, plant, and mug.

The 3D pet must support full horizontal orbiting, controlled vertical orbiting, mouse-wheel zoom, touch drag, and pinch zoom while fitting naturally into the current hero layout on desktop and mobile.

## Selected approach

Use Three.js directly in the existing static HTML/CSS/JavaScript site. Keep the portfolio free from React, a framework migration, or a build pipeline.

Store Three.js and OrbitControls locally in the repository so the published GitHub Pages site does not depend on a runtime CDN. Build the low-poly scene procedurally from simple geometry rather than adding a large external model file.

## Scene composition

The scene keeps the same recognizable objects as the current SVG pet:

- Low-poly cat with block-shaped body, head, ears, paws, muzzle, eyes, and tail.
- Wooden desk with top and four legs.
- Teal laptop with screen, base, and simple code-mark detail.
- Small potted plant.
- Mug beside the laptop.
- Soft contact shadow beneath the scene.

Use flat-shaded materials and restrained colors that match the current light/dark theme palette.

## Interaction

- Drag with mouse or one finger to rotate around the pet.
- Allow a full 360-degree horizontal orbit.
- Limit vertical orbit to avoid flipping underneath the scene.
- Use wheel on desktop and pinch on touch devices to zoom.
- Clamp zoom to a useful near/far range so the pet stays visible.
- Disable panning because the pet should remain centered in its dock.
- Start from an isometric-style camera angle similar to the supplied reference image.
- Use light damping so rotation feels smooth without requiring continuous autonomous animation.

## Integration

Keep the existing `pet-dock` location inside the hero. Replace the visible SVG with a transparent WebGL canvas while retaining the SVG as a fallback for unsupported WebGL or initialization failure.

Implementation files:

- `index.html`: add the 3D canvas host and local module script while preserving the SVG fallback markup.
- `style.css`: size the WebGL stage, preserve responsive placement, cursor/touch behavior, fallback visibility, and theme compatibility.
- `script.js`: remove the old faux 3D tilt behavior and keep only portfolio behavior unrelated to the renderer.
- `pet-3d.js`: create the Three.js scene, geometry, camera, lighting, OrbitControls, resize handling, theme updates, WebGL fallback, and cleanup.
- `vendor/three/`: local Three.js module and OrbitControls dependency.

## Accessibility and fallback

The 3D canvas is decorative and will not replace meaningful page content. Keep an accessible label on the pet container so keyboard and screen-reader users understand the visual element.

If WebGL cannot initialize, keep the current SVG pet visible. Honor `prefers-reduced-motion` by disabling nonessential autonomous motion; direct user-controlled orbit and zoom remain available.

## Performance

Use only simple geometry and a small number of materials. Cap device pixel ratio to avoid excessive GPU work on high-density screens. Resize the renderer only when the pet container changes size.

Pause rendering when the page is hidden and resume when it becomes visible. Avoid loading textures or large 3D assets.

## Verification

Verify the implementation with the existing local static server and check:

- Pet renders in both light and dark themes.
- Mouse drag rotates around the scene.
- Horizontal rotation can complete a full orbit.
- Wheel zoom is clamped to the intended range.
- Touch drag and pinch zoom work without breaking page scrolling outside the pet.
- Layout remains usable at desktop, tablet, and narrow mobile widths.
- SVG fallback remains available when WebGL setup fails.
- Existing navigation, theme toggle, reveal effects, and portfolio rendering still work.
- GitHub Pages runtime files include the local Three.js modules.

## Scope

This change only replaces the hero pet rendering and interaction. It does not redesign the rest of the portfolio, alter portfolio content, or introduce a new application framework.
