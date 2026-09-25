# Portfolio Refresh Design

Date: 2026-09-25

## Goal

Refresh the existing portfolio into a clear, recruiter-facing portfolio for .NET backend and full-stack roles. Keep the site static, responsive, evidence-based, and publishable through the existing GitHub Pages workflow. Preserve the user's pending Git changes.

## Selected approach

Keep the current HTML, CSS, and JavaScript site and its data-driven rendering. Improve its content hierarchy and visual system without introducing a framework, build pipeline, backend, or new package dependency. Keep the existing VS Code `Run Portfolio Web` build task as the local launch path and verify it after the changes.

The site currently loads Tailwind and Inter from external CDNs. Replace those runtime dependencies with semantic, local CSS and a system font stack so the layout works when opened locally and does not need a network connection for styling.

## Audience and language

- Primary audience: recruiters and engineering teams hiring junior .NET backend or full-stack developers.
- Portfolio language: English, consistent with the latest CV.
- Main positioning: Software Engineering student with hands-on .NET business application and warehouse management experience.

## Content structure

Use this order to surface relevant evidence early:

1. Hero: concise role, summary, contact action, current CV, GitHub, and LinkedIn.
2. Professional experience: TKSolution, Full-stack Developer Intern, WMS, Apr–Sep 2026. Summarize warehouse master data, inbound/outbound workflows, Excel import/export, validation, transactions, cache synchronization, reporting, and warehouse process analysis.
3. Selected projects:
   - Construction Payment Request Management System, Mar–Apr 2026, with its verified GitHub and demo links.
   - Online Sales & Inventory Management System, Dec 2025–Jan 2026, with its verified GitHub link.
   - Warehouse Management Foundation Application, the distinct 17-function Blazor/.NET 8, EF Core, and PostgreSQL training project.
   - Facebook Group Posting Automation Tool, described as a 2026 project without a public link or unverified test count.
4. Skills: compact groups emphasizing C#/.NET, ASP.NET Core, Blazor, SQL/data access, relational databases, React/TypeScript, authorization, transactions, caching, Excel, and reporting.
5. Profile and education: UEF Software Engineering degree program, GPA 3.16/4, and a concise professional summary.
6. Awards: FIT Code Contest placements and UEF Math Olympiad placement with existing source links.
7. Contact: existing verified email, phone, GitHub, and LinkedIn details.

Do not list the TKS WMS internship again as a separate project. The foundation application is separate and has distinct scope and technology evidence. Do not claim production deployment, measured outcomes, team leadership, ownership of the full WebPhotocopyHub solution, or “147 tests passing.”

## Current CV file

The portfolio-root `CV_HOANGVANTHIEN.pdf` predates the TKSolution experience. Use the newer CV from the experience folder for the site's CV download, after removing the unverified “147 tests passing” claim. Keep the automation testing description factual and qualitative. The source CV in OneDrive remains untouched.

## Visual and interaction design

- Use a light, restrained visual system with dark readable text, a blue accent, clear section hierarchy, and consistent spacing.
- Replace the 3D carousel with a responsive project-card grid that makes project names, descriptions, technologies, and available links scannable.
- Use the existing Construction Payment image. For projects without retained screenshots, use locally styled typographic covers; do not restore deleted assets or show remote placeholder images.
- Keep the available profile images and make local image fallbacks self-contained.
- Use semantic headings and landmarks, visible keyboard focus, accessible link names, an accessible mobile navigation toggle, sufficient contrast, and reduced-motion support.
- Keep the existing public contact and social destinations.

## Runtime and publishing

- Keep `index.html`, `style.css`, `script.js`, `portfolio-data.js`, local images, and the existing GitHub Pages assembly workflow.
- Keep portfolio content in `portfolio-data.js`; keep DOM rendering and navigation behavior in `script.js`.
- Remove the Tailwind CDN configuration and remote Google Font stylesheet; provide the required layout and components in `style.css`.
- Retain the default Ctrl+Shift+B VS Code task that opens the local page, and document the keyboard shortcut in `README.md`.
- Keep the deployment workflow's existing static file list aligned with retained assets and the current CV filename.

## Accessibility and content safety

- Preserve HTML escaping for rendered text and URL validation for outbound links.
- Use native anchors and buttons for keyboard operation.
- Ensure mobile navigation exposes its expanded state and closes after choosing a link.
- Honor `prefers-reduced-motion` and avoid requiring animation to understand content.
- Provide local visual fallbacks for unavailable project screenshots.

## Verification

- Launch using Ctrl+Shift+B and confirm the page opens with local styles, scripts, images, and the CV link available.
- Manually review the layout at desktop and narrow mobile widths, the navigation interaction, keyboard focus, and reduced-motion styling.
- Check all local image/PDF paths and project/social links against the current portfolio data.
- Review Git status and diffs to confirm pre-existing staged, unstaged, moved, and deleted user files remain intact.
- Do not add or run a test suite as part of this work; the requested local launch behavior will be checked directly.

## Expected files

- `index.html`: semantic structure, section order, and removal of CDN-loaded utilities.
- `style.css`: local responsive visual system and project-card styling.
- `script.js`: project-grid rendering and accessible navigation behavior.
- `portfolio-data.js`: fact-checked copy, skills, links, and project entries.
- `CV_HOANGVANTHIEN.pdf`: replace with the current CV after removing its unverified test-count claim.
- `README.md`: explain local launch with Ctrl+Shift+B.
- `.vscode/tasks.json`: retain and verify the existing ignored local task; change only if direct verification finds it does not launch the site.

## Constraints and risks

- The supplied source documents disagree about the automation project's passing test count; the master profile and observed failed test run take precedence, so no count will be published.
- Exact start/end dates for some side projects are not established. Use only verified ranges or the year, and do not infer a precise date range.
- The existing project screenshots for Hotel Management, Private Clinic, and other deleted items are user deletions and will stay deleted.
- No work-history details or external project ownership will be invented to fill visual space.
