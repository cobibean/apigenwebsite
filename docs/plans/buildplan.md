# buildplan.md — 5‑Phase Build Plan (Apigen)

Purpose: a precise, editor‑ready plan to implement the PRD using Next.js App Router, Tailwind + shadcn/ui, Lucide, and a swappable content adapter. Sections are prop‑driven only; pages render from blocks via a central registry and renderer. No full file examples included.

---

## Phase 1 — Scaffold & Foundations

Goals

- Establish the block/registry architecture, local JSON content adapter, catch‑all routing, preview/ISR, shared primitives, and SEO utility.

Deliverables

- Types and interfaces: `Block`, `PageData`, `ContentSource` with `getPage(slug, { preview? })`, `getMenu()`.
- Local JSON adapter (default) that reads from `content/` JSON files and implements `ContentSource`.
- Core renderer `components/RenderBlocks.tsx` with unknown‑block fail‑safe, `data-block`/`data-variant` attributes, and child block rendering.
- Registry `lib/registry.ts` mapping `type → Component` (single source of truth).
- Provider‑aware rich text helper `lib/rich-text.tsx` (no editor SDKs in sections).
- Shared primitives: `components/AppLink.tsx` (present), `components/AppImage.tsx` (add; absolute URLs, alt, width/height or Next/Image props).
- Routing: `app/[...slug]/page.tsx` renders via adapter; 404 on null.
- Preview: `/api/preview` toggles draft mode; preview bypasses cache.
- SEO: `lib/seo.ts` that consumes `PageData.seo` with fallbacks; hook into App Router metadata.
- Content seed: `content/pages.json`, `content/menu.json` with Home/About/Brands/News/Contact (and optional role/investors stubs).

Key Tasks

- Configure tokens via CSS variables and Tailwind theme extension; ensure light/dark readiness.
- Implement `providers/local.ts` and JSON structure for pages/menus; ensure slug arrays map predictably.
- Implement `RenderBlocks` iteration with safety for unknown types and a clear developer warning.
- Implement `registry` export and a typed `register` pattern to reduce drift.
- Add `AppImage` wrapper; forbid direct `next/image` usage inside sections.
- Implement catch‑all route and metadata generation using adapter data.
- Implement preview route (draft mode on/off) and honor it in adapter methods.
- Add a tiny analytics event helper (no‑op in dev) using `data-*` hooks.

Acceptance Criteria

- App boots with only Local JSON (no provider keys) and renders Home through `[...slug]` using blocks + registry.
- Preview works; ISR defaults on non‑preview.
- No section imports CMS/editor SDKs; no fetch/router/window/context in `sections/**`.

---

## Phase 2 — Section System v1

Goals

- Implement first‑wave sections with strict prop APIs and sensible defaults. Ensure Storybook coverage (min/typical/max) and a11y.

Deliverables

- Sections: `Hero`, `LogoCloud`, `FeatureGrid`, `Stats`/`KPIs`, `BrandCard`, `CTA`, `NewsList` (list only), `DocList`, `Disclaimer`, `Footer`.
- Prop conventions: primitives/enums/arrays only; `variant`, `theme`, `align` enums for visual variations.
- All links via `AppLink`; all images via `AppImage`; `data-block` and `data-variant` on roots.
- Storybook setup and stories for each section.
- Basic motion (optional), respecting `prefers-reduced-motion`.

Key Tasks

- Define stable prop contracts per section with sensible defaults so each renders with minimal props.
- Ensure components that nest content receive child blocks via `children?: Block[]` and render them using the renderer.
- Add a11y checks: semantic landmarks, keyboard focus, contrast (≥4.5:1), alt text.
- Verify no Danger Patterns: no fetch/router/window/context; no CMS/editor imports in sections.

Acceptance Criteria

- All v1 sections render in Storybook with min/typical/max stories and pass basic a11y checks.
- Unknown block types fail safely in the renderer without crashing pages.

---

## Phase 3 — Page Assembly & Routing

Goals

- Compose all MVP pages from blocks using the local adapter; wire navigation; ensure SEO and 404 behavior.

Deliverables

- Pages assembled from blocks: Home, About, Brands/Products, News (list), Contact, For‑Doctors, For‑Pharmacists, For‑Patients; optional Investors stub.
- Header/Nav and Footer as sections consuming props from route‑level data (adapter), never fetching inside the components.
- `lib/seo.ts` integrated to produce metadata per page using `PageData.seo` fallbacks.
- ISR defaults for live pages; preview bypasses cache.

Key Tasks

- Expand `content/pages.json` to include block arrays for each route in the MVP sitemap.
- Build `Header` (as a section) that accepts a menu prop from the route loader.
- Ensure `app/[...slug]/page.tsx` gracefully returns 404 when adapter returns null.
- Confirm brands grid cards can link externally via `AppLink` with `newTab` support when needed.

Acceptance Criteria

- All MVP routes render solely from blocks + registry via the adapter.
- SEO metadata present or defaulted; 404 behavior verified on unknown slugs.

---

## Phase 4 — Data Extensions & Interactivity

Goals

- Add functional pieces: Contact form API, extended News features, optional Investors blocks, analytics hooks.

Deliverables

- `ContactForm` section that posts to an API route and shows a client‑visible success state.
- API route that forwards to an email/provider/webhook (adapter‑friendly; provider is swappable later).
- News enhancements: categories/tags labeling, date formatting; optional single post route stub (keep out of scope if not needed).
- Investors (optional): `DocList`, `FinancialsByPeriod`, `ShareStructure` sections sourcing from local JSON.
- Analytics helper integrated for key interactions (e.g., CTA clicks), gated by an env flag.

Key Tasks

- Define API contract for contact submissions; add validation and safe error states.
- Extend local JSON for news categories/tags and investors docs/financials/share structure.
- Keep sections prop‑driven; all provider specifics live in adapters/API routes.

Acceptance Criteria

- Contact form submits successfully and shows success; errors handled gracefully.
- News list shows tags/categories and dates correctly; optional single post stubbed.
- Optional investors content renders from JSON when enabled.

---

## Phase 5 — Editor Readiness, QA & Performance

Goals

- Finalize adapter swap readiness, testing/QA, performance polish, and docs. Prepare staging → prod.

Deliverables

- Adapter stubs: commented `providers/builder.ts` and `providers/storyblok.ts` implementing `ContentSource` (commented where SDKs are referenced) and mapping rich text via `lib/rich-text.tsx`.
- Testing: snapshot test for renderer (sample page JSON); smoke tests for routes.
- Performance: explicit image sizes via `AppImage`, lazy‑load heavy blocks; aim Lighthouse ≥90 on Home + one heavy page.
- Docs: `EDITOR.md` (how to swap adapters), `README.md` (dev/run/deploy), complete content JSON for all pages.
- Staging on Vercel with ISR; production readiness checklist.

Key Tasks

- Validate no section imports CMS/editor SDKs; adapters only.
- Ensure project boots with Local JSON when provider env vars are missing.
- Complete Storybook coverage; run an a11y pass.
- Add sitemap/robots; ensure SEO fallbacks and OG image are present.

Acceptance Criteria

- Plan/Rulebook compliance: blocks + registry only; prop‑driven sections; preview/ISR operational.
- Snapshot renderer test passes; Storybook builds.
- Lighthouse ≥90 on target pages in staging.

---

Notes & Cadence

- Daily EOD note: shipped → next → risks.
- Follow Danger Patterns and Required Files lists from the Rulebook and workspace rules strictly.
- All links via `AppLink`; all images via `AppImage`; no data fetching or router/window access in `sections/**`.
