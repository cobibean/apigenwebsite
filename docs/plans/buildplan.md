# buildplan.md — 5‑Phase Build Plan (Apigen)

Purpose: a precise, editor‑ready plan to implement the PRD using Next.js App Router, Tailwind + shadcn/ui, Lucide, and a swappable content adapter. Sections are prop‑driven only; pages render from blocks via a central registry and renderer. No full file examples included.

See also: `docs/ComponentImportGuide.md` for third‑party component import workflow and checks.

---

## Docs Index

- **Overview**: [Build Plan](./buildplan.md)
- **Phases**:
  - [Phase 1 — Scaffold & Foundations](./buildplan_phase1.md)
  - [Phase 2 — Section System v1](./buildplan_phase2.md)
  - [Phase 3 — Page Assembly & Routing](./buildplan_phase3.md)
  - [Phase 4 — Data Extensions & Interactivity](./buildplan_phase4.md)
  - [Phase 5 — Editor Readiness, QA & Performance](./buildplan_phase5.md)
- **Guardrails**: [Visual-Editor Compatibility Rulebook](../Rulebook.md)
- **Brand Tokens**: [brand-tokens.md](../brand/brand-tokens.md)
- **Q&A / Decisions**: [questions.md](../questions.md)
- **Site & Components**: [siteandcomponents/](../siteandcomponents/)

This root document remains the high‑level overview and acceptance bar. Phase files contain step‑by‑step tasks, file lists, and QA checklists.

Agent playbook: see `docs/plans/Phase_Instructions_for_agent.md` for an end‑to‑end execution guide that consolidates rules, decisions, and per‑phase steps.

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

Motion (baseline)
- Add appear-on-scroll animation at the renderer wrapper level using Framer Motion.
- Q1 defaults (locked): fade-in + 16px rise; duration 320ms; easing `cubic-bezier(0.2, 0, 0, 1)`; trigger once (appearOnce); viewport amount = 0.2; stagger = 80ms.
- Compositor-only: entrances animate `transform` + `opacity` only. No layout-affecting properties.
- Observer-based: use viewport/Intersection-style triggers; avoid scroll handlers.
- Reduced motion: opacity-only.
- Global kill switch: when the motion token indicates `none`, motion is disabled entirely (render static).
- Preview: motion is disabled when preview mode is active (flag passed from route/adapter).
- Block opt-outs: `Header`, `Footer`, and Legal/Compliance do not animate.
- Tokenization: duration, ease, distance, stagger, viewport amount/margin are tokens; changing tokens updates feel without component edits.

Motion files (implementation path)
- `src/components/motion/Appear.tsx` — single element entrance wrapper (modern Motion API)
- `src/components/motion/AppearStack.tsx` — list/grid with stagger using `delayChildren: stagger(..)`
- `src/styles/motion.css` — CSS tokens for motion
- `src/styles/motion.ts` — TS mirror of tokens for type‑safe use

### Styling Implementation (files)
- `docs/brand/brand-tokens.md`
  - Source of truth for palette, semantic tokens, type scale, and letter-spacing.
- `src/styles/theme.css`
  - Define CSS variables for semantic tokens from the brand doc (light/dark): `--bg`, `--fg`, `--card`, `--muted`, `--border`, `--ring`, `--input`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--success`, `--warning`, `--error`, `--info`.
  - Define font CSS variables: `--font-sans` (Open Sans), `--font-body` (Inter), `--font-mono` (IBM Plex Mono), `--font-serif` (Instrument Serif).
  - Provide optional tokens for radii/spacing/shadows/motion; all values adjustable via variables.
- `src/app/layout.tsx`
  - Load Next fonts: Open Sans (SemiBold available), Inter (Medium), IBM Plex Mono, Instrument Serif.
  - Attach the returned font class names to the `<body>` using the CSS variables above (no hard-coded font-family in sections).
- `src/app/globals.css`
  - Import `src/styles/theme.css`. Ensure Tailwind layers are included. No brand hex values here; reference CSS variables only.
  - Import `src/styles/motion.css` when tokens are added.
  
### Motion tokens & DX

- Maintain motion tokens for: duration, ease, distance, stagger, viewport amount, (optional) viewport margin, appearOnce, reduced-motion mode.
- Provide a TS mirror in `src/styles/motion.ts`. Changes in tokens should not require component edits.
- Document how preview flag is passed (route/adapter → renderer → motion wrappers).

Rules for styling
- In `sections/**`: never use raw hex or editor SDK styles. Use semantic CSS variables only; links must use `AppLink`, images via `AppImage`.
- Adjustments happen by editing `docs/brand/brand-tokens.md` → mirror into `src/styles/theme.css`. Sections remain unchanged when tokens evolve.
- Tailwind v4: Prefer CSS variables for colors; extend theme only when necessary (fonts, letterSpacing names) without leaking brand hex into sections.
 - Reiterate: provide `AppImage` `sizes` (or width/height when not using `fill`) to avoid CLS across over-photo media.

Rules for motion
- Motion is applied by the renderer wrapper only; sections remain pure and prop-driven.
- Heavy/complex motion (parallax, staggered grids, timelines) deferred to Phase 2 sections.
- Keep hot motion out of React: no per-frame/scroll-driven values via React state/props; use motion values/WAAPI if continuous motion is introduced later.
 - Do not include luminance/canvas utilities inside `sections/**`. If needed, compute in a renderer/client island or at build time in the adapter and pass as a prop. Default to CSS scrims.

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
- Journey (finalized in Q2): `JourneyRow` — four photo link cards (desktop: single row of 4; mobile: stacked). Direction‑aware hover on desktop; keyboard focus reveals text; reduced‑motion = opacity‑only. Each card links to `/contact`. A footer CTA button below the row also links to `/contact`.
- Prop conventions: primitives/enums/arrays only; `variant`, `theme`, `align` enums for visual variations.
- All links via `AppLink`; all images via `AppImage`; `data-block` and `data-variant` on roots.
- Storybook setup and stories for each section.
- Basic motion (optional), respecting `prefers-reduced-motion`.

JourneyRow build notes (summary; see Q2 in `docs/questions.md` for full spec)
- Layout: desktop 3:2 aspect (row of 4), mobile 16:9 (stacked); use `AppImage` with `fill` + object-cover and `sizes` to avoid CLS.
- Text: title always visible; body reveals on hover/focus (desktop) and is always visible on mobile.
- A11y: each card is a single link with descriptive `aria-label`; visible focus rings.
- Analytics: `journey_card_view`, `journey_card_hover` (desktop only), `journey_card_click`, `journey_cta_click`.
- Data attributes: root `data-block="Journey"` + `data-variant="row-4"`; each card `data-item-index`.
- Fallback: when image absent, render gradient from brand `primary → accent` tokens.

Navigation build (reference)
- When building the sticky glass header, follow: `docs/siteandcomponents/howtobuildnavbar.md`.
- Read links/CTA from: `docs/siteandcomponents/navconfigts.md` (do not hard-code in sections).
- Compose header from primitives; keep it prop‑driven. Replace any links/images with `AppLink`/`AppImage`.
- Primary CTA (“Get in touch”) must use our tokens and button sizing/radius consistent with site tokens to visually match the header and the rest of the site.

Key Tasks

- Define stable prop contracts per section with sensible defaults so each renders with minimal props.
- Ensure components that nest content receive child blocks via `children?: Block[]` and render them using the renderer.
- Add a11y checks: semantic landmarks, keyboard focus, contrast (≥4.5:1), alt text.
- Verify no Danger Patterns: no fetch/router/window/context; no CMS/editor imports in sections.

Motion wrappers (files used)
- Wrap typical sections with `src/components/motion/Appear.tsx`.
- For lists/grids, use `src/components/motion/AppearStack.tsx` and its `AppearItem` child.

### Motion wrappers (policy)

- Animated wrappers will be added later; they must be memoized and isolated to avoid re-renders from CMS preview.
- Wrappers live under `src/components/motion/*`.
- Supported variants (policy): `fadeUp`, `fade`, `scaleIn`. Under reduced motion, `fadeUp` drops translate; `scaleIn` drops scale.
- CMS motion schema (static config only):
  - `appear?: boolean`
  - `variant?: 'fadeUp' | 'fade' | 'scaleIn'`
  - `delayMs?: number`
  - `disabled?: boolean`
- No per-frame values in CMS (e.g., scroll progress, counters). Adapter maps CMS fields to motion props; sections remain pure/prop-driven.
- Stagger guidance: use the modern stagger pattern (delay children); 80–120ms depending on density (80ms for dense UI, 100–120ms for hero/logo walls).
- Modern API note: Use Motion’s current API; `delayChildren: stagger(..)` supersedes `staggerChildren`.

Acceptance Criteria

- All v1 sections render in Storybook with min/typical/max stories and pass basic a11y checks.
- Unknown block types fail safely in the renderer without crashing pages.

---

## Visual tokens (Q3) — Layout, Radii, Shadows, Spacing, Icons, Contrast

### Containers & Grid

- Max container width: 1280px; 12‑column grid.
- Gutters: 16px (sm), 24px (md, lg). Long‑form copy width: 72ch.
- Full‑bleed helper: `--bleed-offset: calc((100vw - var(--container-max)) / 2)`.

CSS tokens (reference):
```css
:root {
  --container-max: 1280px; --grid-cols: 12;
  --gutter-sm: 16px; --gutter-md: 24px; --gutter-lg: 24px;
  --content-max: 72ch; --bleed-offset: calc((100vw - var(--container-max)) / 2);
}
```

Tailwind mapping (optional; must reference CSS vars):
```ts
export default {
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', sm: '16px', md: '24px', lg: '24px' }, screens: { '2xl': '1280px' } },
    extend: { maxWidth: { content: '72ch' }, gridTemplateColumns: { '12': 'repeat(12, minmax(0, 1fr))' }, gap: { gutter: 'var(--gutter-lg)' } },
  },
};
```

Usage: default 12‑col grid with `gap-x-gutter`; long‑form `max-w-content`; full‑bleed opt‑in via `--bleed-offset`.

### Border Radii

- Soft‑premium scale: 0, 6, 10, 14, 20, full.

CSS tokens:
```css
:root { --radius-0: 0px; --radius-1: 6px; --radius-2: 10px; --radius-3: 14px; --radius-4: 20px; --radius-full: 9999px; }
```

Tailwind (optional): map `borderRadius` to the tokens.

### Shadows / Elevation

- Subtle single‑shadow recipes; dark theme tuned.

CSS tokens:
```css
:root { --shadow-e0:none; --shadow-e1:0 1px 1px rgba(0,0,0,.06); --shadow-e2:0 2px 6px rgba(0,0,0,.08); --shadow-e3:0 6px 16px rgba(0,0,0,.10); --shadow-e4:0 10px 24px rgba(0,0,0,.12); --shadow-e5:0 20px 48px rgba(0,0,0,.16); --backdrop:rgba(0,0,0,.45); }
:root[data-theme="dark"] { --shadow-e1:0 1px 1px rgba(0,0,0,.40); --shadow-e2:0 2px 6px rgba(0,0,0,.50); --shadow-e3:0 6px 16px rgba(0,0,0,.55); --shadow-e4:0 10px 24px rgba(0,0,0,.60); --shadow-e5:0 20px 48px rgba(0,0,0,.65); --backdrop:rgba(0,0,0,.60); }
```

Tailwind (optional): map `boxShadow` to `e0..e5`; add `colors.backdrop`.

Guidance: focus rings are not shadows; always show `:focus-visible`. Animate opacity/transform only.

### Spacing Scale

- 4px base with refined increments; paragraph rhythm 32px.

CSS tokens:
```css
:root{ --space-0:0px; --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:20px; --space-6:24px; --space-7:28px; --space-8:32px; --space-9:40px; --space-10:48px; --space-12:64px; --space-14:72px; --space-16:96px; --rhythm:var(--space-8); }
```

Usage: sections pb/pt mobile `--space-12`, desktop `--space-16`; between blocks `--space-10`; Journey cards padding desktop `--space-8` / mobile `--space-6`.

### Icon Sizes

- Tokenized sizes with responsive tweaks; fluid only in hero contexts.

CSS tokens:
```css
:root{ --icon-xs:16px; --icon-sm:20px; --icon-md:24px; --icon-lg:28px; --icon-xl:32px; --icon-2xl:40px; --icon-3xl:48px; --icon-4xl:64px; --icon-stroke-sm:1.75px; --icon-stroke-md:2px; --icon-stroke-lg:2.25px; }
```

### Contrast & Scrims

- Minimum contrast: body/small UI ≥4.5:1; large text ≥3:1; non‑text UI ≥3:1.
- Scrim system: gradient overlay via CSS variables; optional `.text-panel` for very dark images.
- Performance: `backdrop-filter` is expensive; use sparingly and provide non‑blur fallback.
- No hex in sections; always use CSS tokens from `src/styles/theme.css`.
- AppImage: provide `sizes` (or width/height if not using `fill`) to avoid CLS across over‑photo media.
 - Acceptance: text over imagery must meet ≥4.5:1 (body) and ≥3:1 (large text) using the scrim system; focus rings ≥3:1 over imagery.

## Phase 3 — Page Assembly & Routing

Goals

- Compose all MVP pages from blocks using the local adapter; wire navigation; ensure SEO and 404 behavior.

Deliverables

- Pages assembled from blocks: Home, About, Brands/Products, News (list), Contact, For‑Doctors, For‑Pharmacists, For‑Patients; optional Investors stub.
- Header/Nav and Footer as sections consuming props from route‑level data (adapter), never fetching inside the components.
- `lib/seo.ts` integrated to produce metadata per page using `PageData.seo` fallbacks.
  - Implement `generateMetadata` in `app/[...slug]/page.tsx` calling a helper from `lib/seo.ts` that reads `PageData.seo` and falls back to `DEFAULT_SEO`.
  - Add `src/config/site.ts` exporting `SITE_URL`, `SITE_NAME`, and `DEFAULT_SEO` (title, description, og image path, twitter card).
  - Set canonical via `metadata.alternates.canonical` using `SITE_URL` + slug.
  - Inject Organization/WebPage JSON-LD at layout/route level (never in sections); allow per-page extension.
  - Ensure assets exist: `public/og/default.jpg` (1200×630) and `public/brand/logo.png`.
- ISR defaults for live pages; preview bypasses cache.

Integration notes (navbar)
- Place `<Header />` in the app layout so it appears on all routes (see `docs/siteandcomponents/howtobuildnavbar.md`).
- Offset main content to avoid overlap per the guide; test over both light/dark hero backgrounds.
- Ensure the primary CTA button style matches the header and global button tokens (size, radius, colors), and uses `AppLink` with correct new‑tab/rel behavior when external.

Key Tasks

- Expand `content/pages.json` to include block arrays for each route in the MVP sitemap.
- Build `Header` (as a section) that accepts a menu prop from the route loader.
- Ensure `app/[...slug]/page.tsx` gracefully returns 404 when adapter returns null.
- Confirm brands grid cards can link externally via `AppLink` with `newTab` support when needed.

Acceptance Criteria

- All MVP routes render solely from blocks + registry via the adapter.
- SEO metadata present or defaulted; 404 behavior verified on unknown slugs.
 - Robots behavior by env: production = index/follow; preview/staging = noindex (mirrored in metadata and `robots.txt`).
 - Canonical URLs are absolute and match the final URL after redirects.

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
- Journey analytics events wired:
  - `journey_card_view` → `{ index: 1..4, id, title }`
  - `journey_card_hover` (desktop only) → `{ index, id, title, direction: 'top'|'right'|'bottom'|'left' }`
  - `journey_card_click` → `{ index, id, title, href: '/contact' }`
  - `journey_cta_click` → `{ location: 'journey_footer', label: 'Get in Touch', href: '/contact' }`
  - Data attributes for analytics hooks: root `data-block="Journey"`, `data-variant="row-4"`; per-card `data-item-index`.

Key Tasks

- Define API contract for contact submissions; add validation and safe error states.
- Extend local JSON for news categories/tags and investors docs/financials/share structure.
- Keep sections prop‑driven; all provider specifics live in adapters/API routes.

Acceptance Criteria

- Contact form submits successfully and shows success; errors handled gracefully.
- News list shows tags/categories and dates correctly; optional single post stubbed.
- Optional investors content renders from JSON when enabled.
 - Journey analytics events fire with the agreed payload; reduced-motion behavior respected in hover/focus.

---

## Phase 5 — Editor Readiness, QA & Performance

Goals

- Finalize adapter swap readiness, testing/QA, performance polish, and docs. Prepare staging → prod.

Deliverables

- Adapter stubs: commented `providers/builder.ts` and `providers/storyblok.ts` implementing `ContentSource` (commented where SDKs are referenced) and mapping rich text via `lib/rich-text.tsx`.
- Testing: snapshot test for renderer (sample page JSON); smoke tests for routes.
- Performance: explicit image sizes via `AppImage`, lazy‑load heavy blocks; aim Lighthouse ≥90 on Home + one heavy page.
  
### Motion performance

- Use `will-change` only during active animations; remove afterwards.
- Lazy-load heavy blocks; avoid blocking hydration.
- Ensure media has width/height (or intrinsic sizing) to prevent CLS competing with motion.
 - `backdrop-filter` can be expensive/not fully supported; use sparingly and provide a non-blur fallback.

### Optional tuning tips

- Snappier feel: 240ms duration, 8px distance.
- Calmer feel: 400ms duration, 24px distance.
- Lists with more presence: stagger 100–120ms.
- Docs: `EDITOR.md` (how to swap adapters), `README.md` (dev/run/deploy), complete content JSON for all pages.
- Staging on Vercel with ISR; production readiness checklist.

Key Tasks

- Validate no section imports CMS/editor SDKs; adapters only.
- Ensure project boots with Local JSON when provider env vars are missing.
- Complete Storybook coverage; run an a11y pass.
- Add sitemap/robots; ensure SEO fallbacks and OG image are present.
  - Mirror env-driven robots in `robots.txt` and ensure canonical/alternates are set in metadata.

Acceptance Criteria

- Plan/Rulebook compliance: blocks + registry only; prop‑driven sections; preview/ISR operational.
- Snapshot renderer test passes; Storybook builds.
- Lighthouse ≥90 on target pages in staging.
 - Scrim/contrast rules validated on image-over-text sections (incl. JourneyRow). Focus rings visible and ≥3:1.

---

Notes & Cadence

- Daily EOD note: shipped → next → risks.
- Follow Danger Patterns and Required Files lists from the Rulebook and workspace rules strictly.
- All links via `AppLink`; all images via `AppImage`; no data fetching or router/window access in `sections/**`.
