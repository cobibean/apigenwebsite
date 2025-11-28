# Apigen Website – Mobile & UI Fixes

---

## 🔴 USER TO DO (Come Back Later)

- [ ] **(17) Cannada Craft card gradient (+ optional animation)**
  - Update background to a **3-stop gradient** (dark → light → dark)
  - Optional: experiment with subtle animated gradient similar to MISSION card
  - Location: `src/sections/BrandsUnified.tsx` → `BrandFlipCard` component (line ~124, the `brand.id !== "mission"` branch)

- [ ] **(11) Review Cadillac carousel for redundancy**
  - **Audit complete** — 9 images total, several appear similar based on descriptions
  - **Suggested removals** (pick ~4 to remove for better variety):
    - `5.jpeg` — redundant close-up (similar to #2, #6)
    - `6.jpeg` OR `2.jpeg` — redundant macro shot
    - `7.jpeg` — similar to #1 (structure/color)
    - `9.jpeg` OR `8.jpeg` — redundant "presentation" shot
  - **Action:** Review actual images and decide which to keep/remove
  - Location: `src/data/gallery.ts` + `public/cultivars/cadillac-rainbow/`

---

## 1. Global Header, Nav & Modals

**Context:** Mobile header, hamburger menu, contact modal, initial load.

- [X] **(1) Mobile dropdown menu visibility** ✅ RE-DONE + SPACING FIX
  - Problem: Dropdown menu (hamburger) is hard to see on all pages except home AFTER clicking the hamburger and the modal pops up. The header and button are fine as is. It's just the visibility of the menu after it opens. 
  - ~~Change: Set a consistent **olive green** (from theme file) background on the mobile nav panel and ensure text/icons have proper contrast.~~
  - **New Change:** Restyled MobileSidebar to match ContactModal vibe — now uses `--card` background, standard `--fg` text colors, cleaner borders/shadows. Same centered modal layout.
  - **Spacing Fix:** 
    1. Added `px-3` to header row so APIGEN wordmark aligns with nav links below
    2. Improved CTA button section: `mt-auto pt-4` for proper breathing room, `py-3` for better button touch target
    3. Centered footer text
    4. Tightened nav link gap from `gap-2` to `gap-1` for better visual rhythm
  - Goal: Mobile drop down modal looks the same and is readable across all pages, matching contact modal aesthetic with proper alignment.

- [X] **(3) Contact modal not centered on some mobiles (e.g. Galaxy S24)**
  - Problem: Contact modal appears off-center on certain devices.
  - Change: Use a fixed, flex-centered layout (e.g. `position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;`) and remove any hard-coded `top` offsets that break on different heights.
  - Goal: Modal is centered vertically + horizontally on modern devices, no clipping.

- [X] **(4) Simplify mobile header** ✅ RE-DONE (Logo Fix)
  - Problem: "APIGEN" wordmark in header on mobile is unnecessary.
  - Change: On mobile breakpoint, header layout should be:  
    `[logo]   [empty space]   [hamburger]`  
    Remove the "APIGEN" text.
  - **Additional Fix:** Logo.tsx fallback logic fixed — now always shows "APIGEN" text if image fails. Also renamed `logo + text.png` → `logo-text.png` (avoids URL encoding issues). Header defaults to `logoText="APIGEN"` as fallback.
  - Goal: Cleaner mobile header with logo + hamburger only. Desktop logo always visible (image or text fallback).

- [X] **(16) Initial load glitch from fallback PNG** ✅ ROOT CAUSE FOUND & FIXED
  - Problem: On initial load, there's a visual glitch — huge "APIGEN" text on white background flashes.
  - **Root Cause:** The video `poster` prop in `Hero.tsx` defaulted to `/hero/APIGEN hero text.png` — this PNG was shown while the video loaded, causing the flash. NOT the HeroWordmarkAnimated component.
  - **Final Fix:** In `Hero.tsx`:
    1. Removed the problematic default poster (`/hero/APIGEN hero text.png`)
    2. Poster is now only used if explicitly provided via props
    3. Added dark background color (`#0a1612`) to video container so it's dark while loading instead of white
    4. Changed `preload="metadata"` to `preload="auto"` for faster video load
    5. HeroWordmarkAnimated also has opacity:0 until ready (belt and suspenders)
  - Goal: No image/logo flicker on first page load.

---

## 2. Home Hero & Top-of-Page Layout

**Context:** Homepage hero section (eyebrow, heading, CTA spacing).

- [X] **(2) Adjust hero spacing on mobile** ✅ SCROLL-LINKED ANIMATION
  - Problem: Too much empty space below CTA in the home hero on mobile.
  - ~~Change: Reduce bottom padding in the hero and tighten margin below the CTA.~~
  - **Premium Solution:** Implemented Cultiva-style scroll-linked parallax animation:
    1. Added `heroScrollConfig` to `src/lib/animations.ts` with parallax speeds
    2. Created `ScrollIndicator` component with bounce animation that fades on scroll
    3. Refactored `Hero.tsx` with Framer Motion scroll tracking:
       - Subtitle moves at 0.8x speed (feels further back)
       - Wordmark moves at 1.0x speed (base)
       - CTA moves at 1.1x speed (feels closer)
    4. Content smoothly slides upward as user scrolls (max 80px offset)
    5. Removed static `mobileContentOffsetY="-100px"` — scroll handles positioning
    6. Full `prefers-reduced-motion` support
  - Goal: Premium interactive hero where content responds to scroll, reducing dead space feel.

---

## 3. Homepage Brand Cards & Text Sections

**Context:** Home "brand cards," Premium Brands, Our Mission, Cannada Craft card, Terpenes.

- [X] **(5A) Brand cards don't flip consistently** ✅
  - Problem: Brand cards don't flip on some phones but do on others.
  - **Fix:** Added `onClick` handler with `useState` toggle for mobile tap. Desktop hover still works via CSS.
  - Also added `cursor-pointer` and keyboard support (`Enter`/`Space`).
  - Location: `src/sections/BrandsUnified.tsx`

- [X] **(5B) Brand card content overflowing** ✅
  - Problem: On some devices, content spills off the bottom of the card.
  - **Fix:** Increased mobile `min-h-[360px]` to `min-h-[400px]`.
  - Location: `src/sections/BrandsUnified.tsx`

- [X] **(6) Premium Brands typography** ✅
  - Problem: Felt disconnected from "Our Mission" section.
  - **Fix:** Matched typography to MissionSection_1:
    - Added eyebrow "APIGEN BRANDS"
    - Main heading + accent subheading with same font settings
    - `fontSize: clamp(26px, 4.8vw, 56px)`, `lineHeight: 0.86`, `fontWeight: 800`
  - Location: `src/sections/BrandsUnified.tsx`

- [X] **(14) Top Terpenes – remove metrics** ✅
  - Problem: Terpene numbers change per batch; metrics shouldn't be hard-coded.
  - **Fix:** Removed `mgG` and `sharePct` display — now shows terpene names only.
  - Location: `src/sections/ProductShowcase.tsx` (used on Cultivars page)

- [X] **(15) Update Cannada Craft copy** ✅
  - **Fix:** Updated `brands.ts` with new copy:
    - Heading: "From Craft to Clinic."
    - Body: Two paragraphs about flagship international brand, medical-grade standards, etc.
  - Also updated `BrandsUnified.tsx` display heading to "Cannada Craft – From Craft to Clinic."

- [ ] **(17) Cannada Craft card gradient (+ optional animation)** — ⏸️ SKIPPED (see User To Do at top)

---

## 4. Carousels & Imagery

**Context:** Main homepage carousel, cultivars carousels, Cadillac carousel, Dante hero.

- [X] **(7) White background image scoping** ✅
  - Problem: White background image from the main carousel appears in multiple places.
  - **Fix:** Removed `dantewhiteplain.jpeg` from `gallery.ts` (main carousel). It remains in `cultivars.ts` for Dante's specific carousel only.
  - Goal: White BG image is scoped to Dante's cultivars carousel only.

- [X] **(8) Cultivars carousels – image counts** ✅
  - Spec: For each strain carousel, show **only 3 images** per strain.
  - **Fix:** Added `.slice(0, 3)` to strain images in `ProductShowcase.tsx`.
  - Goal: Per-strain carousels = 3 images each; bottom carousel = full set.

- [ ] **(9) Remove specific images from carousels** — ⏸️ BLOCKED
  - Waiting on: Sunny's screenshot/list of images to remove

- [ ] **(10) Add 2 new Cadillac images** — ⏸️ BLOCKED
  - Waiting on: New images to be provided

- [ ] **(11) Reduce redundancy in Cadillac carousel** — ⏸️ AUDIT COMPLETE (see User To Do)
  - **Audit done:** Identified ~4 potentially redundant images
  - Waiting on: User review of actual images before removal

- [ ] **(12) Dante's hero image fit** — ⏸️ BLOCKED
  - Waiting on: Sunny's final image choice

- [X] **(13) Main carousel image framing** ✅ DYNAMIC ASPECT RATIO
  - Problem: ~90% of main carousel images don't fit nicely (weird crops).
  - **Fix:** Implemented Apple-style dynamic aspect ratio carousel:
    - Card height smoothly animates to match each image's natural aspect ratio
    - No cropping — every image shown in full
    - Min/max height constraints prevent extreme sizes
    - Smooth 500ms transition between images
  - Location: `src/components/ProductCarousel3D.tsx`

---

## 5. Tasks Blocked on External Input

These are partially defined and require Sunny’s input before the agent can fully complete them:

- **(9)** Remove specific images from carousels → needs Sunny’s screenshots/list.
- **(10)** Add 2 new Cadillac images → needs the new images provided/available in assets.
- **(12)** Dante’s hero image → needs Sunny’s final image choice (see WhatsApp reference).

You can still scaffold the code to make these easy to swap (e.g. centralizing image arrays), but final changes depend on assets/decisions.

