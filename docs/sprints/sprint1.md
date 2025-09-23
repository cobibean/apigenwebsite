# 60‑Minute Sprint — Today (Sep 22, 2025)

**Goal:** render Home from JSON with working theme and skeleton sections.

**00–10 min — Theme & Fonts**

* Add fonts (variable if available) via `next/font`.
* Create `src/styles/theme.css` with CSS vars (colors/spacing/typography).
* Extend Tailwind config to reference tokens.

**10–25 min — Renderer Core**

* Implement `lib/content-source.ts` (types + interface).
* Implement `components/RenderBlocks.tsx` and `lib/registry.ts`.
* Add `components/AppLink.tsx`, `components/AppImage.tsx`.

**25–40 min — Sections (stubs)**

* Create `src/sections/Hero.tsx`, `FeatureGrid.tsx`, `CTA.tsx`, `Footer.tsx`, `Nav.tsx`.
* Ensure prop‑only; defaults included; no fetch/router/window.

**40–50 min — Routing & JSON**

* Add `app/[...slug]/page.tsx` to read Local JSON and render blocks.
* Create `content/pages.json` with `"/"` (Home) using the above sections.

**50–60 min — Smoke Test**

* Boot dev server; verify Home renders.
* Quick a11y pass (landmarks, alt text, focus rings).
* Commit: `feat(core): renderer + home blocks`

**Stretch (if time remains)**

* Add Contact form skeleton (React Hook Form + Zod).
