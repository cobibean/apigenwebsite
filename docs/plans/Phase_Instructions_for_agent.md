# Phase_Instructions_for_agent.md — Execution Playbook

Purpose: one-stop, step-by-step instructions for an autonomous agent to execute Phases 1–5 without missing critical context scattered across docs. Always comply with `docs/Rulebook.md`.

---

## Golden Guidance (always-on)

- Source of truth:
  - North star: `docs/plans/buildplan.md` (overview + acceptance per phase)
  - Details: `docs/plans/buildplan_phase{1..5}.md`
  - Decisions: `docs/questions.md` (Q1–Q4 motion, JourneyRow, SEO)
  - Rules: `docs/Rulebook.md`
  - Visual tokens and component notes: `src/styles/theme.css`, `docs/brand/brand-tokens.md`, `docs/siteandcomponents/*`
- Danger Patterns (fail): no fetch/router/window/context inside `src/sections/**`; links via `AppLink`, images via `AppImage` only.
- Motion policy: renderer-level only with modern Motion API; respect reduced-motion; preview disables motion; header/footer/legal never wrapped.
- A11y & Perf: images sized; contrast rules; semantic landmarks; Lighthouse ≥90 target.

---

## Phase 1 — Scaffold & Foundations (do in this order)

1) Types & adapter
   - Implement `src/lib/content-source.ts` interfaces.
   - Implement `src/providers/local.ts` to read `src/content/pages.json` and `src/content/menu.json`.
2) Registry & renderer
   - Create `src/lib/registry.tsx` map and `src/components/RenderBlocks.tsx` with unknown-block guard and `data-*` attributes.
3) Primitives
   - Add `src/components/AppLink.tsx` and `src/components/AppImage.tsx`.
4) Routing & preview
   - Create `src/app/[...slug]/page.tsx` to render via adapter; 404 on null.
   - Add `src/app/api/preview/route.ts` (toggle draft mode; adapter honors `preview`).
5) SEO wiring
   - Implement `src/lib/seo.ts` and call from `generateMetadata` in `[...slug]/page.tsx`.
   - Add `src/config/site.ts` with `SITE_URL`, `SITE_NAME`, `DEFAULT_SEO`.
6) Styling & motion
   - Ensure `src/styles/theme.css` and import in `src/app/globals.css`.
   - Add `src/styles/motion.css` and `src/styles/motion.ts`.
   - Add `src/components/motion/Appear.tsx` and `AppearStack.tsx` and integrate in renderer for non-exempt blocks.
7) Seed content
   - Ensure Home exists in `src/content/pages.json` and renders.

Exit checks: acceptance in `buildplan_phase1.md`.

---

## Phase 2 — Section System v1

1) Build sections with strict props and defaults (see `buildplan_phase2.md`).
2) Implement `JourneyRow` as finalized in `docs/questions.md` (Q2). Use `AppLink`/`AppImage`, scrim/contrast, analytics data attributes.
3) Add Storybook stories (min/typ/max) and a basic renderer snapshot including `JourneyRow`.
4) Wrap with `Appear`/`AppearStack` where appropriate; never wrap header/footer/legal.

Exit checks: acceptance in `buildplan_phase2.md`.

---

## Phase 3 — Page Assembly & Routing

1) Expand `src/content/pages.json` to assemble MVP pages.
2) Implement `Header` per navbar guide (reads props; no fetch inside section).
3) Complete SEO config in `src/config/site.ts`, `generateMetadata`, canonical, robots by env; ensure assets exist.

Exit checks: acceptance in `buildplan_phase3.md`.

---

## Phase 4 — Data Extensions & Interactivity

1) Implement `ContactForm` section and `app/api/contact/route.ts` with validation and provider stub.
2) Wire analytics helper (no-op in dev) and Journey events (`view`, `hover`, `click`, `cta_click`).
3) Extend News (tags/categories, dates); optional Investors.

Exit checks: acceptance in `buildplan_phase4.md`.

---

## Phase 5 — Editor Readiness, QA & Performance

1) Add adapter stubs (`providers/builder.ts`, `providers/storyblok.ts`), commented SDK spots and mapping via `lib/rich-text.tsx`.
2) Ensure Local JSON boot without provider env vars.
3) Complete Storybook and a11y pass; renderer snapshot green.
4) Add sitemap/robots; run Lighthouse and tune to ≥90.

Exit checks: acceptance in `buildplan_phase5.md`.

---

## Checklists to run after each phase

- Rulebook compliance: no Danger Patterns; sections are pure.
- Motion: respects reduced-motion; preview disables.
- A11y: alt text, focus rings, semantics, contrast (incl. scrim rules over images).
- Perf: `AppImage` sizes/dimensions set; avoid CLS; lazy-load heavy blocks.
- SEO: metadata present or defaulted; canonical absolute; robots by env.


