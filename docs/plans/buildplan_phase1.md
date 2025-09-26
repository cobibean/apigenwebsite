# buildplan_phase1.md — Phase 1: Scaffold & Foundations

Goal: stand up the architecture (blocks + registry + adapter), motion tokens/wrappers scaffolding, preview/ISR, SEO utility wiring, and shared primitives. Comply with Rulebook (prop‑driven sections only; no fetch/router/window in `sections/**`).

---

## Deliverables (files and behaviors)

- Types/interfaces: `Block`, `PageData`, `ContentSource` with `getPage(slug, { preview? })`, `getMenu()` — file: `src/lib/content-source.ts`.
- Local JSON adapter (default) — file: `src/providers/local.ts` reading from `src/content/*.json` and implementing `ContentSource`.
- Renderer: `src/components/RenderBlocks.tsx` that iterates `Block[]`, renders via registry, handles unknown blocks safely, and passes `data-block`/`data-variant` attributes.
- Registry: `src/lib/registry.ts` (or `.tsx`) mapping `type → Component`. Components that accept nested content must render `children` via the renderer.
- Rich text helper: `src/lib/rich-text.tsx` provider-aware stub (no editor SDK imports in sections).
- Shared primitives: `src/components/AppLink.tsx`, `src/components/AppImage.tsx` (absolute URLs, `alt`, and either width/height or Next/Image props with `sizes`).
- Routing: `src/app/[...slug]/page.tsx` resolves pages via the current adapter; 404 when null.
- Preview: `src/app/api/preview/route.ts` toggles draft mode; preview bypasses cache.
- SEO utility: `src/lib/seo.ts` that consumes `PageData.seo` with fallbacks; integrates with App Router metadata.
- Content seeds: `src/content/pages.json`, `src/content/menu.json` with Home/About/Brands/News/Contact.

---

## Motion (baseline scaffolding)

- Add appear-on-scroll wrappers at renderer level using Motion’s modern API.
- Defaults (locked from Q1): fade-in + 16px rise; 320ms; `cubic-bezier(0.2, 0, 0, 1)`; trigger once; viewport amount = 0.2; stagger = 80ms; reduced-motion = opacity-only.
- Files:
  - `src/components/motion/Appear.tsx` — single element entrance.
  - `src/components/motion/AppearStack.tsx` — list/grid with stagger using `delayChildren: stagger(..)`.
  - `src/styles/motion.css` — CSS tokens for duration/ease/distance/stagger/appearOnce/reduced mode.
  - `src/styles/motion.ts` — TS mirror tokens for type-safe consumer code.
- Policy compliance: `Header`, `Footer`, and Legal/Compliance are never wrapped; preview mode disables motion via a flag from the route.

---

## Styling & Tokens

- `src/styles/theme.css` — define semantic tokens for colors, spacing, radii, shadows, typography (no raw hex in sections).
- `src/app/layout.tsx` — load fonts via Next and expose CSS variables on `<body>`.
- `src/app/globals.css` — import `theme.css` (and `motion.css`). Ensure Tailwind layers included. Use CSS variables only.

---

## Step-by-step tasks

1) Add/confirm interfaces and types in `src/lib/content-source.ts` with `ContentSource` and `PageData`.
2) Implement `src/providers/local.ts` to read JSON from `src/content/` and map into `PageData`.
3) Create `src/lib/registry.tsx` and a simple `register` pattern; export a single registry map.
4) Implement `src/components/RenderBlocks.tsx` with:
   - unknown-block guard (skip + dev warn),
   - `data-block` and `data-variant` on root wrappers,
   - recursive child block rendering when `children` present.
5) Add `src/components/AppLink.tsx` and `src/components/AppImage.tsx`; forbid direct `next/link`/`next/image` in sections.
6) Add catch-all route `src/app/[...slug]/page.tsx` to resolve a slug array through adapter and render blocks. Return 404 on null.
7) Add preview route `src/app/api/preview/route.ts` to enable draft mode; ensure adapter honors `preview`.
8) Wire `src/lib/seo.ts` and call from `generateMetadata` in `[...slug]/page.tsx`.
9) Seed `src/content/pages.json` and `src/content/menu.json` minimally so Home renders.
10) Add motion files (`Appear`, `AppearStack`, tokens) and wire wrappers in the renderer for non-exempt blocks.

---

## Acceptance Criteria

- App boots with Local JSON and renders Home via `[...slug]` using blocks + registry.
- Preview works; ISR default for non-preview.
- No section imports CMS/editor SDKs; no `fetch`/router/window/context in `sections/**`.
- Motion: appear wrappers exist; preview disables; reduced-motion is opacity-only; no motion on header/footer/legal.
- Images use `AppImage` with `alt` and `sizes`/dimensions to avoid CLS.
- SEO util is callable from route and falls back correctly when `PageData.seo` is missing.

---

## QA Checklist

- Unknown block type does not crash renderer; warning logged in dev.
- Home resolves from `src/content/pages.json`; 404 on unknown slug.
- Motion wrappers render and respect `prefers-reduced-motion`; no layout-affecting animations.
- Focus outlines visible; landmarks semantic; contrast pairs from tokens ok.


