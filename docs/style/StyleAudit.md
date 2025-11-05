CSS/Styling Audit — Migration-Friendly Rules Alignment

Scope: Review of CSS, Tailwind usage, and component styles to validate “ship now, keep visual‑editor compatibility” rules. Focused on tokenization, globals, CSS Modules, motion, and dark mode.

Summary
- Overall direction is good: theme tokens are centralized, sections are data‑driven and presentational, and motion/dark‑mode patterns are sensible.
- Key gaps: a) scattered hard‑coded colors/gradients, b) Tailwind config maps to many undefined CSS variables, c) a few ad‑hoc tokens with hex fallbacks, and d) some non‑brand Tailwind palette usage (neutral/emerald/white) in nav/drawer.
- Addressing these keeps a clean path back to a visual editor while avoiding refactors later.

What’s Aligned
- Centralized tokens: `src/styles/theme.css:4` defines semantic colors and `.dark` overrides at `src/styles/theme.css:110`; globals import is minimal.
- CSS Modules for complex/stated visuals only; shallow selectors and `[data-*]` states are used.
  - Journey row hover states with data flags: `src/sections/JourneyRow.module.css:22`, `src/sections/JourneyRow.module.css:27`, `src/sections/JourneyRow.module.css:33`, `src/sections/JourneyRow.module.css:47`.
- Motion respects reduced motion via media query and JS checks where needed.
  - `src/styles/motion.css:2`, `src/sections/HeroWordmarkAnimated.tsx:38`, `src/sections/JourneyRow.module.css:27`, `src/sections/Hero.tsx:55`.
- Data attributes for blocks/variants throughout sections — migration friendly.
  - e.g., `src/components/RenderBlocks.tsx:26`, `src/components/RenderBlocks.tsx:27`, `src/components/RenderBlocks.tsx:46`, `src/components/RenderBlocks.tsx:57`; sections like `src/sections/Hero.tsx:64`, `src/sections/Hero.tsx:110`.

Gaps and Risks
- Hard‑coded colors in CSS Modules/components instead of tokens
  - Copper hex in wordmark module: `src/sections/HeroWordmarkAnimated.module.css:10` (`#ae5521`).
  - Mission section uses ad‑hoc vars with hex fallbacks: `src/sections/MissionSection_1.tsx:33` and `src/sections/MissionSection_1.tsx:43` (`--fg-on-olive,#EEECE8`, `--bg-olive, #545943`). These vars are not defined in theme tokens.
  - Gradients and shadows using raw RGBA/hex in Brands page:
    - `src/app/brands/page.tsx:70`, `src/app/brands/page.tsx:73`, `src/app/brands/page.tsx:97`, `src/app/brands/page.tsx:98`, `src/app/brands/page.tsx:105`, `src/app/brands/page.tsx:107`, `src/app/brands/page.tsx:118`, `src/app/brands/page.tsx:122`, `src/app/brands/page.tsx:123`.
  - Nav and drawer use non‑brand Tailwind palette (neutrals/emerald/white):
    - `src/components/navigation/NavLink.tsx:11` (neutral/emerald + `dark:` variants);
    - `src/components/navigation/MobileDrawer.tsx:26`, `src/components/navigation/MobileDrawer.tsx:47` (`bg-white`, `dark:bg-neutral-950`, `bg-neutral-900`, `text-white`, `dark:bg-emerald-600`).
  - Global outline color uses raw OKLCH instead of a token: `src/app/globals.css:15`.
- Tailwind config maps to undefined CSS variables (potentially broken styles)
  - Font sizes/leading/tracking vars are referenced but not defined: `tailwind.config.ts:38`–`tailwind.config.ts:47`.
  - Spacing vars not defined: `tailwind.config.ts:49`–`tailwind.config.ts:59`.
  - Border radius vars missing for xl/pill: `tailwind.config.ts:61`–`tailwind.config.ts:67`; theme provides only `--radius-sm, md, lg`.
    - Notably, `rounded-xl` is used (e.g., buttons) and may compute to invalid CSS without `--radius-xl`.
  - Box shadow `--shadow-inner` missing: `tailwind.config.ts:69`–`tailwind.config.ts:74` (only `--shadow-{sm,md,lg}` exist in theme).
  - Container width vars missing: `tailwind.config.ts:75`–`tailwind.config.ts:79`.
  - Motion duration/easing/translate vars missing: `tailwind.config.ts:81`–`tailwind.config.ts:91` (theme defines `--motion-{fast,base,slow}` instead).
- Arbitrary values proliferate for typography/layout (e.g., `text-[clamp(...)]`, `rounded-[32px]`, `shadow-[...]`). These are fine for velocity, but promote to tokens if reused.
- Global base selectors are heavy for borders/outlines
  - `src/app/globals.css:15` applies a border color to `*` and an outline color site‑wide. Consider scoping or converting to debug‑only during development.

Recommended Fixes (Prioritized)
1) Tokenize obvious hex colors and remove ad‑hoc fallbacks
- Replace copper hex with token: `src/sections/HeroWordmarkAnimated.module.css:10` → `color: var(--accent);`.
- Define or remove ad‑hoc tokens in Mission section:
  - If the design requires an “olive surface”, add to theme: `--surface-olive` and `--fg-on-olive` (light/dark), then update `src/sections/MissionSection_1.tsx:33`, `src/sections/MissionSection_1.tsx:43` to use those without hex fallbacks.
  - Alternatively, restyle using existing semantic tokens (e.g., `--btn-olive` for bg; `--accent`/`--secondary-foreground` for text). Avoid introducing provider‑specific var names in components.
2) Align Tailwind config with actual tokens (or trim until ready)
- Either define the referenced variables in `src/styles/theme.css` or remove those config entries for now:
  - Add missing vars: `--radius-xl`, `--radius-pill`, `--shadow-inner`, `--container-{narrow,regular,wide,max}`, `--motion-duration-{fast,base,slow}`, `--motion-ease-{out,in-out}`, `--motion-appear-distance`, typography scale (`--font-size-*`, `--leading-*`, `--tracking-*`), spacing scale (`--space-*`).
  - Or, comment out `tailwind.config.ts:38`–`tailwind.config.ts:47`, `tailwind.config.ts:49`–`tailwind.config.ts:59`, `tailwind.config.ts:61`–`tailwind.config.ts:67` (xl/pill), `tailwind.config.ts:69`–`tailwind.config.ts:74` (inner), `tailwind.config.ts:75`–`tailwind.config.ts:79`, `tailwind.config.ts:81`–`tailwind.config.ts:91` until tokens are approved. This prevents generating classes with unresolved CSS vars.
- Quick tactical fix: stop using `rounded-xl` in components until `--radius-xl` exists, or add `--radius-xl` in theme to match the intended look.
3) Replace non‑brand Tailwind palette usage in nav/drawer with tokens
- `src/components/navigation/NavLink.tsx:11` — use `text-[var(--primary)]` / `text-[var(--secondary-foreground)]` and `hover:text-[var(--accent)]` instead of neutral/emerald palette.
- `src/components/navigation/MobileDrawer.tsx:26`, `src/components/navigation/MobileDrawer.tsx:47` — swap `bg-white`, `bg-neutral-900`, `text-white`, `dark:bg-neutral-950`, `dark:bg-emerald-600` with semantic tokens (`--card`, `--primary`, `--primary-foreground`, `--accent`).
4) Reduce raw RGBA gradients; prefer token‑based `color-mix()`
- In `src/app/brands/page.tsx`, convert `rgba(174,85,33,...)` to `color-mix(in oklab, var(--accent) <alpha>%, transparent)` and `rgba(19,21,21,...)` to `color-mix(in oklab, var(--fg) <alpha>%, transparent)` for consistency and themeability.
5) Scope or remove heavy global base styles
- Consider moving the universal border/outline in `src/app/globals.css:15` behind a dev‑only flag or scoping to debug wrappers. Keep `box-sizing` reset, background/foreground, and layout globals.

Nice‑To‑Haves (Keeps migration easy)
- Maintain the `[data-*]` pattern for all interactive states; avoid structural selectors and `:has()`.
- Keep global utilities minimal and documented; only promote repeated patterns (e.g., navbar offsets) that are clearly cross‑page.
- Prefer `currentColor` for SVGs and set color on wrappers; already used in `HeroWordmarkAnimated` module.

Quick Reference — Files Mentioned
- Tokens and globals
  - src/styles/theme.css:4, src/styles/theme.css:110
  - src/app/globals.css:15
- Tailwind config (undefined variable mappings)
  - tailwind.config.ts:38–47, 49–59, 61–67, 69–74, 75–79, 81–91
- CSS Modules
  - src/sections/HeroWordmarkAnimated.module.css:10
  - src/sections/JourneyRow.module.css:22, 27, 33, 47
- Components with hard‑coded colors / arbitrary values
  - src/sections/MissionSection_1.tsx:33, 43
  - src/components/navigation/NavLink.tsx:11
  - src/components/navigation/MobileDrawer.tsx:26, 47
  - src/app/brands/page.tsx:70, 73, 97–98, 105, 107, 118, 122–124, 133–134, 140, 143, 154

Optional Next Steps
- I can submit a minimal patch that:
  - Swaps the copper hex to `var(--accent)` in the wordmark module.
  - Replaces nav/drawer palette classes with tokens.
  - Adds placeholders for `--radius-xl` and `--radius-pill` (to fix `rounded-xl`).
  - Leaves the broader Tailwind token map as‑is but commented until brand tokens are finalized.

---------------------------------------------------------------------------------------------------------

Changes Applied (Quick Fixes)
- Added surface + on-color tokens for Mission “olive” section
  - src/styles/theme.css: Added `--surface-olive` and `--fg-on-olive` for light/dark.
  - src/sections/MissionSection_1.tsx: Switched background to `var(--surface-olive)` and text to `var(--fg-on-olive)` (removed hex fallbacks).

- Aligned Tailwind config with available tokens (minimal)
  - tailwind.config.ts: Commented out `fontSize`, `spacing`, and `maxWidth` maps until variables exist.
  - src/styles/theme.css: Added missing tokens used by config: `--radius-xl`, `--radius-pill`, `--shadow-inner`, `--motion-duration-*`, `--motion-ease-*`, `--motion-appear-distance`.

- Removed heavy global border/outline; added opt-in debug outlines
  - src/app/globals.css: Removed universal `*` border/outline rule.
  - src/styles/theme.css: Added `.debug-outlines` opt-in outline helper using `var(--ring)`.

- Tokenized hard-coded copper in wordmark
  - src/sections/HeroWordmarkAnimated.module.css: `#ae5521` → `var(--accent)`.

- Replaced non-brand palette in nav/drawer with tokens
  - src/components/navigation/NavLink.tsx: Base/hover/active styles now use `var(--primary)`, `var(--fg)`, `var(--accent)`, `var(--ring)`.
  - src/components/navigation/MobileDrawer.tsx: Drawer panel uses `var(--card)`/`var(--primary)`/`var(--fg)`; CTA uses `buttonClass({ variant: "olive" })`; close button border uses `var(--border)`.

- Converted Brands page RGBA gradients/shadows to token-based color-mix
  - src/app/brands/page.tsx: All `rgba(...)` colors replaced with `color-mix(in oklab, var(--accent|--primary|--fg) <alpha>%, transparent)` equivalents; visual output preserved (same stop positions, radii, and opacities).

Notes
- Visual parity: Gradients and shadows were mapped 1:1 to `color-mix` percentages matching prior alpha values, so appearance should be unchanged.
- Future tokens: When typography/spacing/container tokens are ready, re‑enable their Tailwind maps in `tailwind.config.ts`.
