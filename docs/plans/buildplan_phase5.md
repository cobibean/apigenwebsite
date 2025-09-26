# buildplan_phase5.md — Phase 5: Editor Readiness, QA & Performance

Goal: finalize adapter-swap readiness, tests/QA, performance polish, and docs; prepare staging → production.

---

## Deliverables

- Adapter stubs: commented `src/providers/builder.ts` and `src/providers/storyblok.ts` implementing `ContentSource`, mapping rich text via `src/lib/rich-text.tsx` (SDK imports commented as stubs).
- Testing: renderer snapshot test with a sample page JSON; smoke tests for key routes.
- Performance: explicit image sizes via `AppImage`, lazy-load heavy blocks; Lighthouse ≥90 on Home + one heavy page.
- SEO/Robots: env-driven robots (index in prod; noindex in preview/staging) mirrored in metadata and `robots.txt`.
- Docs: `EDITOR.md` (how to swap adapters), `README.md` (dev/run/deploy), complete content JSON for all pages.

---

## Motion Performance & A11y

- Use `will-change` only during active animations; remove afterwards.
- Animate opacity/transform only; avoid animating blur/box-shadow radius.
- Respect `prefers-reduced-motion`; ensure wrappers drop to opacity-only.
- Verify scrim/contrast rules on image-over-text sections (incl. `JourneyRow`).
- Focus rings visible and ≥3:1 over imagery.

---

## Tasks

1) Validate no section imports CMS/editor SDKs; all provider code is in adapters only.
2) Confirm app boots with Local JSON when provider env vars are missing.
3) Complete Storybook coverage (min/typical/max for each section) and run an a11y pass.
4) Add sitemap/robots; ensure SEO fallbacks and OG image exist.
5) Run Lighthouse on staging; fix regressions to hit ≥90.

---

## Acceptance Criteria

- Plan/Rulebook compliance: blocks + registry only; prop-driven sections; preview/ISR operational.
- Renderer snapshot test passes; Storybook builds.
- Lighthouse ≥90 on target pages in staging.
- SEO/canonical/robots behave by env; Organization JSON-LD present.


