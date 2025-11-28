# Plan – Global Header, Nav & Modals

## Context
- Source requirements: `docs/plans/final-updates.md` §1 lists the last four header/nav/modal bugs blocking launch.
- Key components in play:
  - `src/components/navigation/Header.tsx` renders the fixed header, mobile logo, hamburger trigger, and mounts `MobileSidebar`.
  - `src/components/navigation/MobileSidebar.tsx` uses a Radix Dialog and gradient background for the hamburger menu content.
  - `src/components/modals/ContactModal.tsx` + `src/components/ui/dialog.tsx` handle the Contact overlay that now misaligns on taller Android phones.
  - `src/components/navigation/Logo.tsx` swaps between an SVG logo and a PNG “fallback”, which currently causes the first-load flicker.
- Desired state: shared mobile UX (nav + modal) that looks identical on every route and a glitch-free header logo on first paint.

## Scope From Final Updates (Items 1, 3, 4, 16)
1. Mobile dropdown menu must always render with a readable olive background.
2. Contact modal must stay vertically & horizontally centered on all modern devices.
3. Mobile header should only show the logo and hamburger (no “APIGEN” wordmark).
4. Remove the conflicting PNG/SVG fallback that shows two assets during initial load.

## Implementation Strategy

### (1) Mobile dropdown menu visibility
1. **Audit current styling** – confirm `MobileSidebar.tsx` applies an inline teal gradient + translucent backdrop, causing low contrast on non-home backgrounds.
2. **Introduce theme-based background** – replace the hard-coded gradient with a solid/3-stop olive palette sourced from `src/styles/theme.css` (`var(--surface-olive)` / `var(--btn-olive)` etc.) so it matches the client request.
3. **Ensure text & control contrast** – explicitly set nav link, CTA button, close icon, and footer text colors to `var(--fg-on-olive)` or white, plus adjust border colors so they no longer inherit from page backgrounds.
4. **Keep overlay consistent** – verify the dialog overlay opacity/backdrop works across pages; tweak if necessary to avoid the panel blending into page content.
5. **Regression check** – manually test the hamburger menu on `/`, `/brands`, `/products`, `/contact`, and `/cultivars` at common breakpoints (iPhone 14, Galaxy S24 width, small tablets) to confirm identical appearance.

### (3) Contact modal centering
1. **Determine anchoring layer** – inspect `ContactModal.tsx` and `DialogContent` to see which element sets `left/top 50%` translations; the goal is to remove these per-device offsets.
2. **Create flex-centered layout** – either:
   - Update `DialogContent` globally to use `fixed inset-0 flex items-center justify-center p-4`, or
   - Wrap the contact modal in a custom container that adds that flex-centering while leaving other modals untouched.
   Choose the safer option after confirming other modals’ requirements.
3. **Normalize heights** – keep the modal responsive by enforcing `max-h: 92vh` on the inner card only (so scrolling still works) and remove redundant `translate-*` transforms that fight with flex centering.
4. **Verify keyboard + CTA states** – ensure success/error states (same file) reuse the centering styles so they also align on Galaxy S24 and smaller devices; test with Chrome mobile emulator.

### (4) Simplify mobile header
1. **Update header markup** – remove the absolutely positioned `<span>APIGEN</span>` from `Header.tsx` so mobile layout is `[logo] [spacer] [hamburger]`.
2. **Confirm grid behavior** – double-check the `grid-cols-[auto_1fr_auto]` template still spaces logo and button correctly once the center element is gone; adjust gap or template only if necessary.
3. **Regression pass** – inspect sticky header on iOS/Android widths, ensuring there’s no overlap or strange focus order (logo remains focusable, hamburger retains `aria` attributes).

### (16) Initial load glitch from fallback PNG
1. **Identify culprit logic** – `Logo.tsx` currently derives `currentImageSrc = imageError ? imageSrc : "/hero/logo-header.png"`, forcing the PNG to load first and swap on error.
2. **Simplify asset handling** – switch to loading `imageSrc` by default (the SVG) and only render a fallback (text or optional PNG) if `onError` fires. This removes the double-paint flicker.
3. **Clean up props** – ensure desktop/mobile header instances pass the intended asset (`/hero/logo%20+%20text.png` or `/hero/transparentlogo.png`) and that the fallback text path (`APIGEN`) still works if images fail entirely.
4. **Validate** – cold-load the site (disable cache) to confirm there’s no flicker, and Lighthouse/LCP remains unaffected because the header logo is still `priority`.

## Validation Plan
- Manual device emulation for iPhone 14/Pro, Pixel 7, and Galaxy S24 widths via Chrome devtools for the hamburger menu and contact modal.
- Cross-page smoke test: home, brands, products, and any dark-themed page to ensure the nav panel styling is consistent.
- Keyboard accessibility: focus trap inside the mobile menu and contact modal still works after layout changes.
- Cold reload (disable cache in devtools) to ensure the header logo no longer flashes between assets.
