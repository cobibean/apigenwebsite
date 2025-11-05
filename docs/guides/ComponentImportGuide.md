# Component Import Guide (Third‑Party/Vendor → Apigen)

Purpose: Fast, safe integration of third‑party components (e.g., 21st.dev) while complying with our PRD/Rulebook and adapter/blocks architecture. Optimized for the assistant to follow as a checklist.

## 0) Golden Rules (must pass)
- Sections are prop‑driven only (no fetch/router/window/context) in `sections/**`.
- Links use `components/AppLink.tsx`; images use `components/AppImage.tsx`.
- Use semantic tokens from `src/styles/theme.css` (no hardcoded hex in sections).
- Blocks render via registry: add to `lib/registry.ts` and use `components/RenderBlocks.tsx`.
- No CMS/editor SDKs in sections; provider code lives in `providers/*`.

## 1) Directory Conventions
- `components/vendor/<source>/*` — raw, pasted vendor code (minimal edits; keep upstream license headers).
- `components/ui/*` — re‑themed primitives derived from vendor code, tokenized (no brand hex).
- `sections/*` — final prop‑driven sections that wrap primitives and are referenced by the registry.

## 2) Import Workflow (step‑by‑step)
1. Paste vendor component(s) into `components/vendor/<source>/`.
2. Create a tokenized primitive in `components/ui/`:
   - Replace colors/spacings with CSS vars (e.g., `var(--fg)`, `var(--primary)`).
   - Remove/abstract router/window usage, side effects, and data fetching.
   - Replace links/images with `AppLink`/`AppImage`.
3. Wrap as a section in `sections/YourBlock.tsx` with a clean `Props` API:
   - Only props allowed; provide sensible defaults; add `data-block` and `data-variant`.
4. Register the section in `lib/registry.ts` (map `type → Component`).
5. Add Storybook stories (min/typical/max) and verify a11y.
6. If the block nests content, render `children` via `RenderBlocks`.

## 3) Sanitization Rules (what to remove/replace)
- Remove: `fetch(`, `axios(`, `useSWR(`, `useRouter(`, `useSearchParams(`, `window.`, `document.`, global context.
- Replace: all `<a>` with `AppLink`; all `<img>`/`next/image` with `AppImage` in sections.
- Theming: map any color/spacing/shadow to CSS vars from `styles/theme.css`.
- State: only local UI state; cross‑block data must come from route/adapter via props.

## 4) Theming & Tokens (reference)
- Source of truth: `docs/brand/brand-tokens.md`.
- CSS vars defined in: `src/styles/theme.css` (light/dark) — colors, fonts, radii, etc.
- Fonts loaded in: `src/app/layout.tsx` (Open Sans, Inter, IBM Plex Mono, Instrument Serif) → exposed as CSS vars.
- Use tokens like `var(--bg)`, `var(--fg)`, `var(--primary)`, `var(--muted)`, never hex.

## 5) Section API Guidelines
- Props only; include `variant`, `theme`, `align` enums as needed.
- Provide defaults so the section renders with minimal props.
- Accessibility: semantic landmarks, alt text with dimensions, visible focus states.
- Analytics: add `data-block="YourBlock"` and `data-variant` to the root element.

## 6) Registration & Rendering
- Add to `lib/registry.ts`: `"your-block-type" → YourBlock`.
- Renderer: `components/RenderBlocks.tsx` iterates blocks and renders via the registry; unknown types must fail safely.

## 7) Storybook & Tests
- Add stories under `stories/` or co‑located: min/typical/max props.
- Snapshot test for `RenderBlocks` with sample JSON includes your new block.

## 8) License & Risk Checks
- Verify license (MIT/BSD/Apache preferred). Preserve attribution if required.
- Remove any global CSS side effects or isolate via CSS Modules.
- Ensure no large, unused dependencies are pulled in; consider tree‑shaking.

## 9) Quick Commit Checklist
- [ ] Vendor code under `components/vendor/<source>/`
- [ ] Tokenized primitive under `components/ui/`
- [ ] Section wrapper under `sections/` (props‑only, defaults set)
- [ ] `AppLink`/`AppImage` used exclusively in sections
- [ ] No forbidden APIs in `sections/**`
- [ ] Tokens only (no hex) in sections; a11y checks pass
- [ ] Registered in `lib/registry.ts`
- [ ] Storybook stories added; renders with defaults

## 10) Common Fix Patterns (fast replacements)
- Colors → CSS vars: replace hardcoded hex with `var(--token)`.
- External links: add `newTab` prop and `rel="noopener noreferrer"` via `AppLink`.
- Iconography: prefer Lucide; set sizes (16/20/24/32) and stroke width via props.
- Motion: keep subtle; respect `prefers-reduced-motion`.

## 11) Out‑of‑Scope for Sections
- CMS/editor SDK imports (Builder/Storyblok/Plasmic).
- Data fetching or cache logic (belongs in adapters/routes).
- Global app state management.

Use this guide when pasting any third‑party component. If unsure, ask to “cross‑check against ComponentImportGuide + Rulebook” and I’ll run this checklist.
