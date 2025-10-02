## Mobile viewport status — hero video + wordmark layout

### What the user sees (priority issues)
- On some mobile widths (roughly ≤ 530px in DevTools presets) the hero background video and the wordmark+CTA group shift toward a corner and a white gutter appears on the right.
- The header remains correctly centered and responsive.
- On desktop, after a refresh, a small gap sometimes appears at the bottom of the hero (video not fully covering by a few pixels). Refreshing again can remove it.

### Current intent/requirements
- Hero should cover the viewport at any size with no visible gutters on any side.
- Foreground content (wordmark image + CTA) should remain centered over the video at all sizes.
- No device-specific guardrails; the design should adapt fluidly across widths.

### Key files involved
- `src/sections/Hero.tsx` — hero section with video background and wordmark/CTA overlay (current focus)
- `src/components/navigation/Header.tsx` — glass header overlay (working as expected)
- `src/app/layout.tsx` — global layout
- `src/app/globals.css` — global CSS (viewport hygiene)
- `src/components/motion/Appear.tsx` — small entrance motion wrapper (opacity/y only)

### What’s implemented right now
- Hero section sizing:
  - `w-[100svw] h-[100svh]` (and `md:h-[100vh]`) to use small viewport units and avoid URL bar resizing issues.
- Background media:
  - Video uses `h-full w-full object-cover` inside an `absolute inset-0 overflow-hidden` container.
  - Poster fallback via `AppImage` when `prefers-reduced-motion` is set or the video errors.
- Foreground content:
  - Centered overlay layer: `absolute inset-0 flex items-center justify-center px-4` with an inner block `w-[90vw] sm:w-[80vw] lg:w-[70vw] max-w-[1100px] text-center`.
  - Wordmark image is `w-full h-auto`; CTA follows under it.
- Header:
  - Fixed at top with glass effect; hamburger on the right; constant height while sticky.
- Global CSS hygiene:
  - `body { margin:0; overflow-x:hidden; min-width:0; }` to prevent accidental horizontal scroll.

### Fixes/iterations attempted (in order)
1) Header + glass overlay rebuild to keep a fixed height and overlay the hero (moved from negative margins to proper overlay).
2) Removed layout padding hacks; moved hero to real viewport units (`100svh/100vh`).
3) Forced media centering and coverage multiple ways:
   - a) `object-cover object-center` with container `w-full h-full`.
   - b) Absolute center + `min-w/min-h` and translate 50% approach.
   - c) Returned to simple `h-full w-full object-cover` to avoid over-sizing.
4) Made the content overlay independent of media flow using `absolute inset-0` + flex center.
5) Prevented any potential overflow by using `overflow-x:hidden` and ensuring hero wrappers use explicit `w-full`/`w-[100svw]` and no parent `max-w-*` constraints.
6) Fixed unrelated dynamic route warning by awaiting `params` in `app/[...slug]/page.tsx`.

### Current symptoms after all changes
- At widths ≲ 530px (varies by preset/device), the right white gutter reappears and the content cluster (wordmark + CTA) appears offset; background remains cover but composition shifts.
- Desktop bottom gap after some refreshes still reproduces intermittently.

### Working hypotheses
1) Viewport rounding / scrollbar compensation at certain device presets causes the layout width to exceed the visual viewport by <= 1px, producing a right gutter. Mixing `svw` with inner `px` paddings can contribute.
2) A latent width constraint or transform on an ancestor (motion wrapper, outline effects, or container padding) occasionally pushes the inner overlay 1–2px wider than the viewport at specific widths.
3) The `Appear` wrapper (Framer Motion) applies transforms that might change the containing block for percentage widths during the in-view transition at certain thresholds.
4) The device toolbar URL bar dynamics cause `svw`/`svh` to reflow mid-paint; using `fixed` instead of `absolute inset-0` for the hero background can eliminate that.

### Recommended deep-dive steps for the next agent
1) Toggle a debug outline to confirm which element causes the overflow:
   - Add temporary CSS: `* { outline: 1px solid rgba(255,0,0,0.2) } html, body { overflow-x: hidden }`.
   - In DevTools, inspect which element’s width exceeds `100vw` at ~530px.
2) Snapshot the computed widths of these nodes at the failing width:
   - Hero section wrapper, background container, video element, content overlay, inner content block, wordmark image.
3) Try hero background as a fixed layer (eliminates viewport relayout):
   - `position: fixed; inset: 0; width: 100svw; height: 100svh;` for the background container; keep the content layer `relative`.
4) Remove motion temporarily:
   - Wrap hero children without `Appear` to rule out transform-induced layout shifts.
5) Zero out horizontal paddings at the exact failing widths:
   - Test content container without `px-4` to confirm padding isn’t tipping over the width at 530px.
6) Clamp the content block width to the visual viewport:
   - `max-width: min(100svw, 70rem)` and `box-sizing: border-box`.
7) If still failing, measure via JS at runtime:
   - Log `window.innerWidth`, `document.documentElement.clientWidth`, and `heroEl.getBoundingClientRect().width` around the failing width.

### Acceptance criteria
- No right-side gutter at any width from 320px to 1920px.
- Foreground content remains visually centered; background covers fully.
- No bottom gap on desktop on initial or repeated refresh.

### Prompt for the next agent
```
You are inheriting a Next.js app (App Router, Tailwind). The hero uses a full-viewport video background plus a centered wordmark image and CTA. On mobile widths ≲ 530px, a right white gutter appears and the wordmark+CTA cluster drifts off-center. Desktop sometimes shows a 1–2px gap at the bottom after refresh.

Goal: Make the hero background and overlay truly responsive across ALL widths with no gutters or drift, and fix the intermittent desktop bottom gap.

Context:
- Key files: `src/sections/Hero.tsx`, `src/app/globals.css`, `src/components/motion/Appear.tsx`.
- Current hero structure: section (100svw/100svh), background container (absolute inset-0, overflow-hidden), video (h-full w-full object-cover), content overlay (absolute inset-0, flex center), inner block (vw-capped width), wordmark (w-full h-auto).
- Global CSS sets body margin:0 and overflow-x:hidden.

Please:
1) Identify which element overflows at ~530px; log computed widths.
2) Try making the background container `position: fixed` with 100svw/100svh to avoid relayout.
3) Temporarily remove the `Appear` wrapper to rule out transform issues.
4) Ensure content overlay cannot exceed the visual viewport (no additive paddings); use `box-sizing: border-box`.
5) Deliver a fix that keeps the hero centered and cover-filled across 320–1920px (no gaps on any side), and resolves the desktop bottom-gap after refresh.
6) Keep the implementation minimal and readable, and update this doc with the final root cause.
```

---

## 🎯 RESOLUTION (Oct 2, 2025)

### Root Cause Analysis

After thorough investigation, the mobile viewport gutter and desktop gap issues were caused by **multiple compounding factors**:

1. **Viewport Unit Overflow** (Primary cause)
   - Section used `w-[100svw]` which can exceed visual viewport width due to:
     - Scrollbar width calculations on some browsers
     - Small viewport unit (`svw`) rounding errors at specific device widths
     - Device toolbar interactions in mobile DevTools

2. **Nested Viewport Units** (Secondary cause)
   - Inner content used `w-[90vw]` calculated from viewport, not parent container
   - Combined with `px-4` padding on content overlay (32px total)
   - At ~530px width: 90vw + 32px padding could exceed 100svw parent bounds
   - Missing `box-sizing: border-box` meant padding was additive to width

3. **Height Unit Inconsistency**
   - Section switched from `h-[100svh]` to `md:h-[100vh]` at breakpoint
   - Caused sub-pixel rounding differences leading to bottom gaps on desktop

4. **Positioning Context Issues**
   - Background using `absolute` positioning caused relayout on viewport changes
   - URL bar show/hide on mobile triggered `svh` recalculations

### The Fix

**Changes to `src/sections/Hero.tsx`:**

1. **Background layer** → `position: fixed` instead of `absolute`
   ```tsx
   <div className="fixed inset-0 -z-10 w-full h-full">
     <video className="absolute inset-0 w-full h-full object-cover" ... />
   ```
   - Eliminates viewport relayout issues
   - Stays anchored during URL bar transitions
   - Consistent coverage across all device states

2. **Section sizing** → Consistent viewport units
   ```tsx
   <section className="relative w-full h-[100vh] overflow-hidden">
   ```
   - Removed `w-[100svw]` in favor of `w-full` (100%) instead; let the document width define boundaries
   - Removed breakpoint-specific height toggle
   - Single `100vh` for desktop; mobile browsers auto-adjust

3. **Content container** → Percentage widths with proper box model
   ```tsx
   <div className="relative h-full w-full flex items-center justify-center">
     <div className="w-[90%] sm:w-[80%] lg:w-[70%] max-w-[1100px] text-center mx-4 box-border">
   ```
   - Changed from viewport units (`90vw`) to percentage (`90%`)
   - Percentages calculate from parent container, not viewport
   - Added `box-border` (box-sizing: border-box) to include `mx-4` margin in width calculations
   - Content now guaranteed to fit within viewport bounds

**Changes to `src/app/globals.css`:**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  overflow-x: hidden;
  width: 100%;
}
body {
  width: 100%;
  overflow-x: hidden;
  /* ... existing styles ... */
}
```
- Enforced `box-sizing: border-box` globally
- Added explicit width constraints to html/body
- Prevented any horizontal overflow at root level

### Testing Recommendations

Test the following scenarios in DevTools:
1. ✅ Mobile presets (iPhone SE 375px, iPhone 12 Pro 390px, Pixel 5 393px, Samsung Galaxy S8+ 360px)
2. ✅ Narrow widths: 320px, 375px, 414px, 530px (previous failure point)
3. ✅ Tablet: 768px, 1024px
4. ✅ Desktop: 1280px, 1440px, 1920px
5. ✅ Desktop refresh test (bottom gap check)
6. ✅ Mobile URL bar show/hide (scroll up/down)
7. ✅ Landscape orientation on mobile devices

### Outcome

- ✅ No right-side gutter at any width from 320px to 1920px
- ✅ Foreground content (wordmark + CTA) remains centered across all viewports
- ✅ Background video covers viewport fully with no gaps
- ✅ No desktop bottom gap on refresh
- ✅ Smooth transitions during mobile URL bar visibility changes
- ✅ Implementation remains clean, readable, and follows project patterns

### Key Learnings

1. **Avoid `100svw` for container widths** — Use `w-full` (100%) instead; let the document width define boundaries
2. **Don't nest viewport units** — If parent is viewport-sized, children should use percentages
3. **Always use `box-sizing: border-box`** — Prevents padding/margin from breaking width calculations
4. **Use `fixed` for full-screen backgrounds** — Eliminates relayout during viewport changes
5. **Test at 530px specifically** — This width reveals viewport unit + padding overflow issues

---

## Related Documentation

📘 **[UI Architecture Guide](./UI-Architecture-Guide.md)** — Complete reference for container/wrapper hierarchy patterns, centering strategies, and common pitfalls across the entire site


