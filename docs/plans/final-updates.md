# Apigen Website – Mobile & UI Fixes

## 1. Global Header, Nav & Modals

**Context:** Mobile header, hamburger menu, contact modal, initial load.

- [ ] **(1) Mobile dropdown menu visibility**
  - Problem: Dropdown menu (hamburger) is hard to see on all pages except home AFTER clicking the hamburger and the modal pops up. The header and button are fine as is. It's just the visibility of the menu after it opens. 
  - Change: Set a consistent **olive green** (from theme file) background on the mobile nav panel and ensure text/icons have proper contrast.
  - Goal: Mobile drop down modal looks the same and is readable across all pages.

- [ ] **(3) Contact modal not centered on some mobiles (e.g. Galaxy S24)**
  - Problem: Contact modal appears off-center on certain devices.
  - Change: Use a fixed, flex-centered layout (e.g. `position: fixed; inset: 0; display: flex; align-items: center; justify-content: center;`) and remove any hard-coded `top` offsets that break on different heights.
  - Goal: Modal is centered vertically + horizontally on modern devices, no clipping.

- [ ] **(4) Simplify mobile header**
  - Problem: “APIGEN” wordmark in header on mobile is unnecessary.
  - Change: On mobile breakpoint, header layout should be:  
    `[logo]   [empty space]   [hamburger]`  
    Remove the “APIGEN” text.
  - Goal: Cleaner mobile header with logo + hamburger only.

- [ ] **(16) Initial load glitch from fallback PNG**
  - Problem: On initial load, there’s a visual glitch likely from a PNG fallback for an SVG.
  - Change: Find the component using an SVG with PNG fallback, remove the fallback (or fix the logic so only one asset renders cleanly).
  - Goal: No image/logo flicker on first page load.

---

## 2. Home Hero & Top-of-Page Layout

**Context:** Homepage hero section (eyebrow, heading, CTA spacing).

- [ ] **(2) Adjust hero spacing on mobile**
  - Problem: Too much empty space below CTA in the home hero on mobile.
  - Change: Reduce bottom padding in the hero and tighten margin below the CTA; ensure eyebrow → heading → body → CTA stack feels compact but not cramped.
  - Goal: Hero feels balanced and intentional on mobile with minimal dead space below the button.

---

## 3. Homepage Brand Cards & Text Sections

**Context:** Home “brand cards,” Premium Brands, Our Mission, Cannada Craft card, Terpenes.

- [ ] **(5A) Brand cards don’t flip consistently**
  - Problem: Brand cards don’t flip on some phones but do on others.
  - Change: Ensure flip behavior is triggered by tap/click (not just hover). Confirm it works across common mobile browsers.
  - Goal: Brand cards flip reliably on tap on mobile.

- [ ] **(5B) Brand card content overflowing**
  - Problem: On some devices, content (Market Focus, Category) spills off the bottom of the card.
  - Change: Adjust card min-height and/or inner layout so text wraps but does not overflow; ensure no text is clipped.
  - Goal: All card content stays inside the card on mobile.

- [ ] **(6) Premium Brands typography**
  - Problem: Premium Brands section uses Roboto and feels disconnected from “Our Mission.”
  - Change: Remove Roboto; match font family + sizing to “Our Mission” section (same type system), and scale slightly smaller so it “feels” like Our Mission.
  - Goal: Premium Brands visually matches Our Mission in type style and proportion.

- [ ] **(14) Top Terpenes – remove metrics**
  - Problem: Terpene numbers change per batch; metrics shouldn’t be hard-coded.
  - Change: Remove numeric values (percentages, etc.) from “Top Terpenes”; display **names only**.
  - Goal: Only terpene names are shown, no batch-specific numbers.

- [ ] **(15) Update Cannada Craft copy**
  - Change the copy to exactly:

    Cannada Craft – From Craft to Clinic.  
    Apigen’s flagship international brand delivers premium Canadian craft cannabis from British Columbia, cultivated to medical-grade standards and perfected for patients around the world. Embodying the journey from craft to clinic, Cannada Craft’s precision-grown, indoor small-batch process produces consistent, terpene-rich flower cultivated under rigorous standards, ensuring clean, compliant, and high-quality cannabis for the global market.

  - Goal: New copy renders cleanly on mobile (split into reasonable paragraphs if needed).

- [ ] **(17) Cannada Craft card gradient (+ optional animation)**
  - Problem: Current 2-color gradient should be updated.
  - Change: Update background to a **3-stop gradient** (dark → light → dark). If time allows, experiment with a subtle animated gradient similar to the MISSION card.
  - Goal: Card uses a 3-color gradient that stays on-brand; if animated, the motion is smooth and not distracting.

---

## 4. Carousels & Imagery

**Context:** Main homepage carousel, cultivars carousels, Cadillac carousel, Dante hero.

- [ ] **(7) White background image scoping**
  - Problem: White background image from the main carousel appears in multiple places.
  - Change: That white background image should **only** appear in the **Cultivars (Dante’s) carousel**. Remove it from the main carousel and any other locations.
  - Goal: White BG image is scoped to Dante’s cultivars carousel only.

- [ ] **(8) Cultivars carousels – image counts**
  - Spec: For each strain carousel, show **only 3 images** per strain. The bottom carousel shows all images.
  - Change: Enforce max 3 slides per strain carousel; keep the “All” carousel as the consolidated view.
  - Goal: Per-strain carousels = 3 images each; bottom carousel = full set.

- [ ] **(9) Remove specific images from carousels (requires list)**
  - Problem: Some images across carousels need to be removed (Sunny will screenshot).
  - Change: Once the list is provided, remove those images from the relevant carousel configs and/or asset folder if unused elsewhere.
  - Goal: All flagged images are removed from all carousels.

- [ ] **(10) Add 2 new Cadillac images**
  - Change: Add 2 new Cadillac images to the assets and include them in the Cadillac carousel in a logical order (avoid stacking all similar shots together).
  - Goal: Cadillac carousel includes the two new images and still feels balanced.

- [ ] **(11) Reduce redundancy in Cadillac carousel**
  - Problem: Too many similar/duplicate-feeling images.
  - Change: Audit Cadillac carousel and remove near-duplicate angles so there’s more variety (macro, full nug, packaging, environment, etc.).
  - Goal: Cadillac carousel feels curated, not repetitive.

- [ ] **(12) Dante’s hero image fit (requires Sunny’s chosen image)**
  - Problem: Dante’s hero image doesn’t fit frame well on mobile.
  - Change (after Sunny selects the image):
    - Use a consistent aspect ratio for the hero (e.g. 16:9) with `object-fit: cover` and good focal point.
  - Goal: Dante’s hero image looks clean and properly framed across mobile devices.

- [ ] **(13) Main carousel image framing**
  - Problem: ~90% of main carousel images don’t fit nicely (weird crops, inconsistent framing).
  - Change: Either:
    - Adjust the carousel frame/aspect ratio to better match the images, **or**
    - Keep the frame but standardize image behavior via `object-fit` and maybe pre-crop key assets.
  - Goal: Main carousel images look consistent and well-framed, especially on mobile (no critical content cut off).

---

## 5. Tasks Blocked on External Input

These are partially defined and require Sunny’s input before the agent can fully complete them:

- **(9)** Remove specific images from carousels → needs Sunny’s screenshots/list.
- **(10)** Add 2 new Cadillac images → needs the new images provided/available in assets.
- **(12)** Dante’s hero image → needs Sunny’s final image choice (see WhatsApp reference).

You can still scaffold the code to make these easy to swap (e.g. centralizing image arrays), but final changes depend on assets/decisions.

