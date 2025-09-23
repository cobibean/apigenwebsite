# Visual-Editor Compatibility Rulebook

Purpose: keep this codebase plug-and-play for a future visual editor (Builder.io, Storyblok, Plasmic) without rewrites.

## Golden Rules
1) **Prop-driven sections only**  
   - No data fetching, router/window access, or global context inside section components.  
   - Inputs are primitives/enums/arrays (e.g., `title`, `items`, `variant`, `theme`, image URLs).  
   - Provide sensible defaults so components render with minimal props.

2) **Blocks + Registry**  
   - Every section is a “block”: `{ type: string, props?: Record<string, any>, children?: Block[] }`.  
   - Maintain a central **registry** mapping `type → Component`.  
   - Components that accept nested content must render `children` via the renderer.

3) **Swappable Content Adapter**  
   - Define a tiny interface (`getPage(slug)`, `getMenu()`, optional `getPosts()`).
   - Start with Local JSON; later swap in Builder/Storyblok/Plasmic adapters.  
   - Keep rich-text rendering behind a helper (`renderRichText(provider, data)`).

4) **Routing & Preview**  
   - Catch-all route `app/[...slug]/page.tsx` renders by slug from the adapter.  
   - Preview mode via `/api/preview` (drafts, no cache).  
   - Return 404 when `getPage` is null; safe fallback for unknown blocks.

5) **Styling & Theming**  
   - Tailwind/CSS Modules; avoid reliance on global cascade from editors.  
   - Theme via CSS variables or a `theme` prop; keep spacing/typography tokens stable.

6) **Media & Assets**  
   - Absolute URLs (CDN-ready), include `alt`, explicit width/height.  
   - Central image component wrapper (URL, alt, sizes, priority).

7) **SEO & Meta**  
   - Central SEO util reads `title`, `description`, `ogImage` from `PageData` with sane defaults.

8) **Accessibility**  
   - Semantic landmarks (`header`, `nav[aria-label]`, `main`, `footer`).  
   - Visible focus states; 4.5:1+ contrast; ARIA only when needed.

9) **State & Interactivity**  
   - UI state stays local; cross-section state lifts up and passes via props.

10) **Third-Party Libraries**  
   - Prefer unstyled/headless primitives (Radix via shadcn/ui OK).  
   - No CMS/editor SDKs inside sections—only in adapters.
   - Use a single link wrapper (components/AppLink.tsx) for all links. Sections must use AppLink (never import vendor/CMS link components).

11) **Performance**  
   - ISR by default; preview bypasses cache.  
   - Lazy-load heavy blocks; no blocking fetches in render.

12) **Analytics**  
   - Use `data-block`/`data-variant` attributes; one tiny event helper.

13) **Testing & Storybook**  
   - Storybook for each section (min/typical/max props).  
   - Snapshot/renderer test for `RenderBlocks` with sample page JSON.

14) **Build & Envs**  
   - Vercel staging + prod.  
   - App must boot with Local JSON when adapter env vars are missing.

15) **Editor Stubs Ready**  
   - Prepare but comment out:  
     - Builder: `registerComponent` file with prop schemas.  
     - Storyblok: `components` map.  
     - Plasmic: loader/init.

---

## Definition of Done (DoD)

**Component DoD**  
- Renders in Storybook with mock props (no fetch/router/window).  
- a11y check passes; has defaults; image props include alt & dimensions.
- Links use AppLink and accept href as a prop (no router access inside sections).

**Blocks/Registry DoD**  
- Block JSON round-trips via Local JSON adapter and renders through `RenderBlocks`.  
- Unknown block types fail safely (skip/log).

**Adapter DoD**  
- `getPage()`, `getMenu()` implemented; easy swap Local ↔ future provider.  
- Rich-text handled by provider-aware helper.

**Preview DoD**  
- `?preview=1` shows drafts; ISR otherwise.

**SEO DoD**  
- Page meta sourced from content layer; OG image present with fallback.

**Performance DoD**  
- Lighthouse 90+ on Home and a heavy page in staging.

**Testing DoD**  
- Storybook builds; renderer test passes.

**Env DoD**  
- Project runs with only Local JSON (no provider keys).

**Editor Stubs DoD**  
- Uncomment + install provider SDK → same JSON renders via that provider.

---

## Phase Checklists

**Plan / PRD**  
- [ ] Pages + Sections listed  
- [ ] Non-goals, a11y, SEO, perf targets set  
- [ ] Handoff expectations noted

**Scaffold**  
- [ ] Tailwind/shadcn set  
- [ ] `RenderBlocks`, `registry.ts`, `content-source.ts` added  
- [ ] Local JSON adapter wired

**First Page**  
- [ ] `app/[...slug]/page.tsx` renders Home from JSON  
- [ ] 404/fallback behavior verified

**Preview & SEO**  
- [ ] `/api/preview` works; ISR enabled  
- [ ] SEO util reads from `PageData`

**Polish**  
- [ ] a11y pass (focus, contrast, landmarks)  
- [ ] Images sized, alt present  
- [ ] Animations respect `prefers-reduced-motion`

**Pre-Ship**  
- [ ] Storybook stories for all sections  
- [ ] Renderer test green  
- [ ] Staging Lighthouse 90+  
- [ ] Editor stubs present (commented)

---

## Per-Page QA (quick)
- [ ] Renders from blocks/registry only  
- [ ] No section fetches data or uses router/window  
- [ ] SEO fields present or defaulted  
- [ ] a11y OK; images sized & described  
- [ ] Works in preview + ISR
