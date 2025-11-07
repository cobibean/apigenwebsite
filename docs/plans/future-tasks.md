# Future Development Tasks

## 📋 Current Status Summary

**Recently Completed:**
- ✅ **Task 6:** Contact form with Resend email service + JSON storage + CSV export
- ✅ **Task 15:** Premium success animation (SeedToHarvestSuccess) with three-step micro-animation
- ✅ **Task 14:** Brand section header color (copper) + carousel width adjustments

**Next Recommended Tasks:**
1. **Task 2:** Clean Up Mission Brand Section Spacing (already in progress)
2. **Task 4:** Finalize 3-Column Carousel content (needs client approval on card text)
3. **Tasks 9-11:** Deployment setup (Vercel, domain, repository privacy)

---

## High Priority

### 1. Combine Brands Section ✅ COMPLETE
**Goal:** Merge the brands section into a single uniform section with both brand cards and a CTA to view the brands page.

**Status:** ✅ COMPLETED
- BrandsUnified component created and integrated
- Single cohesive brands section on home page
- Brand showcase cards with CTA to `/brands` page

---

### 2. Clean Up Mission Brand Section Spacing 🔄 IN PROGRESS
**Goal:** Improve the spacing and layout of copy in the MISSION brand section on the brands page.

**Status:** 🔄 IN PROGRESS
- Need to look at details of spacing and potentially adjust
- Emphasis on how the copy (text) sits in the section
- Look for ways to use line breaks to tighten this up
- May need to remove some text to make it shorter to match Cannada Craft section vibe

**Current Issues:**
- Copy spacing needs refinement
- Text layout may need better hierarchy
- Need to tighten up text flow and spacing

---

### 3. Fix Header Logo Rendering in Production ✅ COMPLETE
**Goal:** Diagnose and fix why the logo doesn't render properly in production environment.

**Status:** ✅ COMPLETED
- Logo component simplified to use single reliable PNG source
- Added priority prop for LCP optimization
- Proper error handling with text fallback
- Renders consistently across development and production

---

### 4. Build New 3-Column Carousel Component 🔄 MOSTLY COMPLETE
**Goal:** Create a new carousel component with 3 visible cards (1 in focus, 2 behind with blur) optimized for portrait images.

**Status:** 🔄 MOSTLY COMPLETE
- ProductCarousel3D component built and integrated
- 3-column layout with center focus and blurred side cards
- Auto-play, touch/swipe, keyboard navigation implemented
- Cards link to `/brands` page
- Header slide-up animation when scrolling into carousel

**Remaining:** Need to audit card content text and get Sunny's approval on what displays on the "backside" of cards

---

### 5. Convert Canada Craft Logo to SVG & Create Animated Card 🎯 EXTRA CREDIT / NICE TO HAVE
**Goal:** Convert the Canada Craft logo from PNG to SVG format with improved spacing and centered "Cannada" text, PLUS create an animated card that matches the Mission card's vibe.

**Status:** 🎯 EXTRA CREDIT / NICE TO HAVE
- Should only be completed AFTER everything else is done
- Including deploying to production and setting up domain/hosting
- Current PNG works functionally, this is premium polish/enhancement

**SVG Requirements:**
- Recreate logo as scalable SVG
- Properly center the curved "Cannada" text
- Maintain red maple leaf positioning
- Keep "Craft" text straight and level
- Preserve intentional "Cannada" misspelling (cannabis play on words)

**Animated Card Requirements:**
- Take the no-background PNG version
- Turn it into an SVG to center the word "Cannada"
- Place that SVG on some type of shape (maybe a solid color maple leaf)
- Create a background for the card that the maple leaf shape + logo sit on
- Background should have green/foresty vibe to blend with the olive background
- Match the premium Mission card treatment and animation vibe

---

### 6. Wire Up Contact Modal to Email Service ✅ COMPLETE
**Goal:** Connect the contact modal to a real email inbox using a simple, free service.

**Status:** ✅ COMPLETED
- Migrated from EmailJS to Resend API (free tier: 3,000 emails/month)
- Next.js API route created (`/api/contact`) that handles email + data storage
- All submissions saved to `data/submissions.json` (JSON format)
- CSV export script created (`scripts/export-submissions.ts`)
- Premium success animation integrated (SeedToHarvestSuccess component)
- Contact form fully functional with proper error handling
- Setup guide created (`docs/Contact-Form-Setup.md`)

**Implementation Details:**
- Uses Resend test domain (`onboarding@resend.dev`) for now (no DNS verification needed)
- Can verify domain later to use `noreply@apigen.ca`
- All form fields including country are captured and sent
- Submissions stored locally in JSON, can export to CSV anytime

---

### 7. Standardize Framer Motion Appear Settings ✅ COMPLETE
**Goal:** Match the Framer Motion appear settings/parameters across all pages to match the home page implementation.

**Status:** ✅ COMPLETED
- Centralized animation configuration in `src/lib/animations.ts`
- `appearConfig` and `appearStackConfig` created
- All Appear components updated to use centralized settings
- Consistent animation behavior across all pages
- Respects `prefers-reduced-motion` universally

---

### 8. Audit and Clean Up Docs Folder ✅ COMPLETE
**Goal:** Review and remove unnecessary files from the /docs folder to streamline documentation.

**Status:** ✅ COMPLETED
- Documentation reorganized into structured folders
- Outdated files removed (client updates, notes, prompts, questions.md)
- Created organized structure: architecture/, guides/, plans/, style/
- Only relevant, current documentation retained

---

### 9. Make GitHub Repository Private ❌ NOT STARTED
**Goal:** Convert the repository to private and add Sunny as collaborator/owner.

**Status:** ❌ NOT STARTED
- Need to make Sunny a co-owner of the repo first
- Requires getting site pushed to proper production environment first
- Will convert to private and add Sunny as collaborator/owner

**Requirements:**
- Change repository visibility to private
- Add Sunny as collaborator or transfer ownership
- Ensure he has full access for future maintenance

---

### 10. Add Site to Sunny's Vercel Account ❌ NOT STARTED
**Goal:** Transfer or set up the site deployment on Sunny's personal Vercel account.

**Status:** ❌ NOT STARTED
- Just got login info for this from Sunny
- Need to set up site deployment on Sunny's Vercel account
- Ensure all environment variables and settings are preserved

**Requirements:**
- Move deployment from current account to Sunny's Vercel
- Ensure all environment variables and settings are preserved
- Test deployment functionality

---

### 11. Point Domain to Vercel Hosting ❌ NOT STARTED
**Goal:** Configure domain settings to point from GoDaddy to Vercel hosting.

**Status:** ❌ NOT STARTED
- Just got login info for this from Sunny
- Need to configure domain settings to point from GoDaddy to Vercel
- Requires Vercel Pro plan for custom domain support

**Requirements:**
- Update DNS settings in GoDaddy
- Configure custom domain in Vercel
- Set up SSL certificate

---

### 12. Update Brands Section Background 🎯 EXTRA CREDIT / NICE TO HAVE
**Goal:** Apply olive-green background to the newly created condensed/minimal brands section on home page.

**Status:** 🎯 EXTRA CREDIT / NICE TO HAVE
- Should only be completed AFTER everything else is done
- Including deploying to production and setting up domain/hosting
- Brands section already has olive background implemented

**Background Flow Target:**
- Hero: video/none background
- Mission: green background
- About: white background
- Brands: green background ✅ (already implemented)
- Gallery: video/none background
- CTA: green background (already implemented)
- Footer: green background (already implemented)

---

### 13. Create Site Architecture Flowchart 🎯 EXTRA CREDIT / NICE TO HAVE
**Goal:** Document the complete site architecture with a visual flowchart after all tasks are complete.

**Status:** 🎯 EXTRA CREDIT / NICE TO HAVE
- Should only be completed AFTER everything else is done
- Including deploying to production and setting up domain/hosting
- Useful for future developers and maintenance

**Requirements:**
- Map out component relationships
- Show data flow between sections
- Document routing structure
- Include key utilities and helpers
- Show integration points (modals, forms, etc.)

---

### 14. Update Brand Section Header Color & Adjust Carousel Width ✅ COMPLETE
**Goal:** Change the brand section header on homepage to copper color (from brand theme file) and make carousel images slightly wider with adjustable spacing.

**Status:** ✅ COMPLETED
- Brand section header updated to use copper color (`var(--accent)`) instead of `var(--primary)`
- Carousel card width increased from `w-56 md:w-64` to `w-60 md:w-72` (240px mobile, 288px desktop)
- Image dimensions updated to match new card width (288px width)
- Spacing constants already in place for easy future adjustments

**Changes Made:**
- `src/sections/BrandsUnified.tsx`: Changed header color from `var(--primary)` to `var(--accent)` (copper #AE5521)
- `src/components/ProductCarousel3D.tsx`: Updated `cardWidth` constant and image width prop

---

### 15. Create Immersive Contact Form Success Animation ✅ COMPLETE
**Goal:** Create a premium, brand-aligned success animation that plays after contact form submission with three-step text-led micro-animation.

**Status:** ✅ COMPLETED
- SeedToHarvestSuccess component created and integrated
- Three-step animation working: "Planting the Seed" → "Cultivating the Connection" → "Harvesting the Response"
- Inline SVG + Framer Motion implementation
- Respects prefers-reduced-motion with instant final state
- Triggers only on successful POST completion
- Uses existing brand tokens (copper accent, card background, foreground text)
- 320×80 SVG with baseline line, 3 nodes, shimmer sweep
- Final confirmation message: "Thank you for reaching out. We've received your message and will get back to you within 1–2 business days."
- CTAs appear after animation completes ("Back to site" and "Explore products")
- Unit tests created and passing
- Fully accessible with `role="status"` and `aria-live="polite"`

**Note:** Checkmark removed per client feedback - cleaner, more minimal design

**Saved Agent Prompt:**

---

## ▶️ Cursor Agent Prompt (paste everything below)

**Role / Objective**

You are implementing a premium, brand-aligned **success animation** that plays **after the contact form successfully submits**. It is a **three-step, text-led micro-animation** (≤4s total), abstract (not cartoony), and must align with our existing design system and brand tokens.

**Narrative copy (exact):**

1. **Planting the Seed.** Message received.

2. **Cultivating the Connection.** We're reviewing.

3. **Harvesting the Response.** We'll reach out shortly.

**Implementation approach (selected):**

* **Inline SVG + Framer Motion** (no raster assets).

* One 320×80 SVG: baseline line + 3 nodes + hidden checkmark path.

* Animate with stroke dash, node scale/opacity, and a copper shimmer sweep.

* Respect `prefers-reduced-motion` with an instant final state.

* Trigger only on **successful POST** completion (not on validation errors).

* Keep it tasteful, minimal, and **brand true**.

---

### Do not infer — go look these up first

1. **Brand tokens & theme:**

   * Locate our **global theme file(s)** and **CSS variables** (e.g., `:root` tokens).

   * Identify the tokens for: **background**, **text**, **primary copper/accent**, and any **stroke/halo** color used on brand accents.

   * Use **existing tokens** (CSS variables or theme tokens) rather than hard-coded hex values.

   * If tokens exist under different names (e.g., `--color-primary-500`), **map them** to local CSS variables in the component wrapper (don't rename global tokens).

2. **Design system & components:**

   * Confirm our **modal** / **toast** / **success UI** pattern where this should live (component names, paths).

   * Determine whether success states live in a **form wrapper** (e.g., `ContactForm.tsx`) or a dedicated **SuccessModal**. Integrate accordingly.

3. **File structure & conventions:**

   * Verify the correct **components directory** and naming convention (e.g., `src/components/ui/` vs `components/common/`).

   * Verify whether we use `*.tsx` and strict TypeScript.

   * Confirm **linting rules** (ESLint/Prettier) and adjust code style to match.

4. **Framer Motion dependency:**

   * If not already installed, add it per our package manager (pnpm/npm/yarn).

   * Check version compatibility with our React version.

---

### Acceptance criteria

* Animation renders inside our success UI with **no layout shift**.

* Uses **existing brand tokens** (no guessed hex values).

* **Three distinct phases** with visible label changes exactly as scripted.

* **Reduced motion** shows final state instantly with accessible text.

* Keyboard/screen reader friendly: container `role="status"` and `aria-live="polite"`.

* Unit/integration test coverage for final state and basic accessibility attributes.

* Code passes local linting and type checks.

---

### Deliverables

1. A new component (place per repo conventions):

   `SeedToHarvestSuccess.tsx` (name can be adjusted to match project style)

2. Integration into the **contact form success flow** (render on success, then show CTAs).

3. Minimal tests (e.g., React Testing Library) to assert:

   * `strokeDashoffset` ends at 0, nodes visible, checkmark drawn (or final state when reduced motion).

   * `role="status"` and `aria-live="polite"` present.

4. Short README note (in the component file header or separate md) explaining usage and tokens.

---

### Implementation guardrails

* **Premium feel**: abstract geometry, subtle easing (`[0.22, 1, 0.36, 1]`), no cartoon icons.

* **Performance**: inline SVG only; do not import large images; animation ≤4s.

* **Theming**: read tokens from theme; do not hard-code colors or fonts.

* **Accessibility**: support `prefers-reduced-motion`; provide clear, concise copy.

* **Code style**: match repo naming, exports (default vs named), and import order.

---

### Code scaffold (starting point; adapt to our tokens/components)

> NOTE TO AGENT: **Replace** the `var(--placeholder-*)` CSS variables below with mapped variables from our existing theme. Do **not** change our global token names; instead, set the wrapper `style` to map global tokens into these locals if needed. Keep geometry (320×80, line from x=40→280 at y=40) unless our design grid dictates otherwise.

```tsx

// SeedToHarvestSuccess.tsx

import React from "react";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

type Props = {

  className?: string;

  /** Called when the timeline finishes (e.g., reveal CTAs) */

  onDone?: () => void;

  /** Optional: override timings in ms */

  durations?: {

    toSecond?: number; // line fill to node 2

    toThird?: number;  // line fill to node 3

    shimmer?: number;  // shimmer sweep

    check?: number;    // checkmark draw

  };

};

const LINE_LENGTH = 240;        // path length from x=40 to x=280 at y=40

const STEP = LINE_LENGTH / 2;   // fill to second node

export default function SeedToHarvestSuccess({

  className,

  onDone,

  durations,

}: Props) {

  const reduce = useReducedMotion();

  const lineCtl = useAnimationControls();

  const shimmerCtl = useAnimationControls();

  const node1Ctl = useAnimationControls();

  const node2Ctl = useAnimationControls();

  const node3Ctl = useAnimationControls();

  const checkCtl = useAnimationControls();

  const labelCtl = useAnimationControls();

  const [phase, setPhase] = React.useState<0 | 1 | 2 | 3>(0);

  // Map timings (tweakable; keep total under ~4000ms)

  const d = {

    toSecond: durations?.toSecond ?? 900,

    toThird: durations?.toThird ?? 1000,

    shimmer: durations?.shimmer ?? 600,

    check: durations?.check ?? 450,

  };

  React.useEffect(() => {

    let cancelled = false;

    const run = async () => {

      if (reduce) {

        // Instant final state for reduced motion

        lineCtl.set({ strokeDashoffset: 0 });

        node1Ctl.set({ scale: 1, opacity: 1 });

        node2Ctl.set({ scale: 1, opacity: 1 });

        node3Ctl.set({ scale: 1, opacity: 1 });

        checkCtl.set({ pathLength: 1, opacity: 1 });

        setPhase(3);

        onDone?.();

        return;

      }

      // Reset

      lineCtl.set({ strokeDashoffset: LINE_LENGTH });

      shimmerCtl.set({ x: -260, opacity: 0 });

      node1Ctl.set({ scale: 0.6, opacity: 0 });

      node2Ctl.set({ scale: 0.6, opacity: 0 });

      node3Ctl.set({ scale: 0.6, opacity: 0 });

      checkCtl.set({ pathLength: 0, opacity: 0 });

      labelCtl.set({ opacity: 0, y: 6 });

      setPhase(0);

      // Phase 1 — Planting the Seed

      setPhase(1);

      await Promise.all([

        node1Ctl.start({ scale: 1, opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }),

        lineCtl.start({ strokeDashoffset: LINE_LENGTH - STEP, transition: { duration: d.toSecond, ease: "easeInOut" } }),

        labelCtl.start({ opacity: 1, y: 0, transition: { duration: 0.25 } }),

      ]);

      await labelCtl.start({ opacity: 0, y: -6, transition: { delay: 0.35, duration: 0.25 } });

      if (cancelled) return;

      // Phase 2 — Cultivating the Connection

      setPhase(2);

      await Promise.all([

        node2Ctl.start({ scale: 1, opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }),

        lineCtl.start({ strokeDashoffset: 0, transition: { duration: d.toThird, ease: "easeInOut" } }),

        labelCtl.start({ opacity: 1, y: 0, transition: { duration: 0.25 } }),

      ]);

      await labelCtl.start({ opacity: 0, y: -6, transition: { delay: 0.35, duration: 0.25 } });

      if (cancelled) return;

      // Phase 3 — Harvesting the Response

      setPhase(3);

      await node3Ctl.start({ scale: 1, opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } });

      // Shimmer sweep

      shimmerCtl.set({ x: -260, opacity: 0.0 });

      shimmerCtl.start({

        x: 260,

        opacity: [0, 1, 0],

        transition: { duration: d.shimmer, times: [0, 0.2, 1], ease: "easeOut" },

      });

      // Checkmark draw

      await checkCtl.start({

        opacity: 1,

        pathLength: 1,

        transition: { duration: d.check, ease: "easeOut" },

      });

      onDone?.();

    };

    run();

    return () => {

      cancelled = true;

    };

  }, [reduce, lineCtl, shimmerCtl, node1Ctl, node2Ctl, node3Ctl, checkCtl, labelCtl, onDone, d.toSecond, d.toThird, d.shimmer, d.check]);

  return (

    <div

      className={className}

      role="status"

      aria-live="polite"

      style={{

        /* NOTE: Replace these local fallbacks by mapping to our existing theme tokens.

           Example: background: 'var(--apigen-surface-900)' etc. */

        background: "var(--placeholder-bg, #111315)",

        color: "var(--placeholder-text, #ffffff)",

        // Optional: softly rounded card feel

        borderRadius: 12,

        padding: 16,

      }}

    >

      <div style={{ width: 320, height: 80 }}>

        <svg viewBox="0 0 320 80" width="320" height="80" aria-hidden="true">

          <defs>

            <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="0%">

              <stop offset="0%" stopColor="var(--placeholder-copper, #AE5521)" stopOpacity="0" />

              <stop offset="50%" stopColor="var(--placeholder-copper, #AE5521)" stopOpacity="0.9" />

              <stop offset="100%" stopColor="var(--placeholder-copper, #AE5521)" stopOpacity="0" />

            </linearGradient>

            <clipPath id="lineClip">

              <path d="M40 40 L280 40" stroke="white" strokeWidth="4" strokeLinecap="round" />

            </clipPath>

          </defs>

          {/* Track */}

          <path

            d="M40 40 L280 40"

            stroke="rgba(255,255,255,0.12)"

            strokeWidth="4"

            strokeLinecap="round"

            fill="none"

          />

          {/* Animated line */}

          <motion.path

            d="M40 40 L280 40"

            stroke="var(--placeholder-stroke, rgba(174,85,33,0.7))"

            strokeWidth="4"

            strokeLinecap="round"

            fill="none"

            style={{ strokeDasharray: LINE_LENGTH } as React.CSSProperties}

            animate={lineCtl}

          />

          {/* Shimmer sweep clipped to the line */}

          <motion.rect

            x="-260"

            y="34"

            width="260"

            height="12"

            fill="url(#copperGrad)"

            clipPath="url(#lineClip)"

            animate={shimmerCtl}

          />

          {/* Nodes */}

          <motion.circle

            cx="40" cy="40" r="7"

            fill="var(--placeholder-bg, #111315)"

            stroke="var(--placeholder-copper, #AE5521)"

            strokeWidth="2.5"

            animate={node1Ctl}

          />

          <motion.circle

            cx="160" cy="40" r="7"

            fill="var(--placeholder-bg, #111315)"

            stroke="var(--placeholder-copper, #AE5521)"

            strokeWidth="2.5"

            animate={node2Ctl}

          />

          <motion.circle

            cx="280" cy="40" r="7"

            fill="var(--placeholder-bg, #111315)"

            stroke="var(--placeholder-copper, #AE5521)"

            strokeWidth="2.5"

            animate={node3Ctl}

          />

          {/* Checkmark near node 3 */}

          <motion.path

            d="M270 38 L278 46 L292 30"

            fill="none"

            stroke="var(--placeholder-copper, #AE5521)"

            strokeWidth="3"

            strokeLinecap="round"

            strokeLinejoin="round"

            initial={{ pathLength: 0, opacity: 0 }}

            animate={checkCtl}

          />

        </svg>

      </div>

      {/* Phase labels (visible text) */}

      {!useReducedMotion() && (

        <motion.div animate={labelCtl} style={{ fontSize: 14, marginTop: 8, letterSpacing: 0.2 }}>

          {phase === 1 && (<><strong>Planting the Seed.</strong> Message received.</>)}

          {phase === 2 && (<><strong>Cultivating the Connection.</strong> We're reviewing.</>)}

          {phase === 3 && (<><strong>Harvesting the Response.</strong> We'll reach out shortly.</>)}

        </motion.div>

      )}

      {/* Reduced motion: show final text instantly */}

      {useReducedMotion() && (

        <div style={{ fontSize: 14, marginTop: 8 }}>

          <strong>Harvesting the Response.</strong> We'll reach out shortly.

        </div>

      )}

    </div>

  );

}

```

**Integration example (starting point):**

> NOTE TO AGENT: Insert this where the contact form currently shows a plain success message. Respect the project's modal/toast conventions. If there's already a `SuccessModal`, put the component inside it and reveal CTAs on `onDone`.

```tsx

// In ContactForm.tsx (or equivalent)

const [submitState, setSubmitState] = useState<"idle"|"submitting"|"success"|"error">("idle");

const [showCtas, setShowCtas] = useState(false);

// ... after successful POST:

setSubmitState("success");

// ... in JSX:

{submitState === "success" && (

  <div className="success-wrap">

    <SeedToHarvestSuccess onDone={() => setShowCtas(true)} />

    {showCtas && (

      <div className="mt-4 flex gap-2">

        {/* Replace with design system buttons */}

        <a className="btn-ghost" href="/">Back to site</a>

        <a className="btn-primary" href="/products">Explore products</a>

      </div>

    )}

  </div>

)}

```

---

### Tasks for you (Agent)

1. **Token mapping:**

   * Find our **brand tokens** (in theme files and/or global CSS).

   * Replace `--placeholder-*` references in the component wrapper with **mapped references** to our existing tokens (background, text, copper/accent, stroke).

   * Do **not** rename or duplicate global tokens. If needed, set the component wrapper style to `background: var(--our-surface-token)`, etc.

2. **Framer Motion check:**

   * Verify Framer Motion is installed for our package manager.

   * Verify React version compatibility.

   * Add minimal unit tests (RTL) asserting final attributes and a11y roles.

3. **Form integration:**

   * Hook the component into the **actual success path** only.

   * Ensure validation errors do **not** trigger the animation.

   * Keep total timeline under ~4s (use default durations unless design requests otherwise).

4. **Premium quality checks:**

   * Subtle easing, no bounce/cartoon effects.

   * Confirm contrast meets our accessibility standards on the actual background token.

   * Ensure component scales gracefully if the container width is responsive (don't stretch SVG out of aspect; keep the 320×80 intrinsic size inside a centered wrapper).

5. **Docs:**

   * Add a short comment block at the top of the component explaining tokens, timings, and how to override durations via props.

   * Note the analytics hook location if our project tracks success interactions (e.g., fire `contact_submit_success_animated` when `onDone` runs).

**Deliver this as a PR** with the component, integration, tests, and any token mappings applied. Treat the code above as a **starting point**, not hard rules—adjust to fit our codebase patterns and theme system.

---

# 📋 DETAILED EXECUTION PLAN

## Prerequisites & Setup
- **Environment**: Node.js, npm/yarn, Next.js development server
- **Testing**: Local development at `http://localhost:3000`
- **Version Control**: Git for tracking changes
- **Browser**: Chrome/Edge for testing production builds
- **Tools**: VS Code, terminal, Vercel CLI (for deployment testing)

## Task 1: Build New 3-Column Carousel Component (Priority: High)

### Technical Requirements:
1. **Layout Structure**:
   - 3-card layout with center focus
   - Left/right cards: 80% opacity, 95% scale, 2px blur
   - Center card: 100% opacity, 100% scale, no blur

2. **Image Optimization**:
   - Portrait aspect ratio (3:4 or 9:16)
   - Center crop for consistent display
   - Lazy loading for performance

3. **Navigation Features**:
   - Auto-play (3-5 second intervals)
   - Pause on hover/touch
   - Touch/swipe gestures for mobile
   - Keyboard navigation (arrow keys)
   - Click navigation dots

### Implementation Steps:

1. **Create Component Structure**:
   ```tsx
   // src/components/ProductCarousel3D.tsx
   interface ProductCarousel3DProps {
     images: Array<{ src: string; alt: string; link: string }>;
     autoPlay?: boolean;
     autoPlayDelay?: number;
   }

   export default function ProductCarousel3D({ images, autoPlay = true, autoPlayDelay = 4000 }: ProductCarousel3DProps) {
     // Implementation with useState for current index
     // useEffect for auto-play
     // Touch/swipe handlers
   }
   ```

2. **Implement 3D Card Layout**:
   ```tsx
   // Card positioning logic
   const getCardStyle = (index: number, currentIndex: number) => {
     const position = (index - currentIndex + images.length) % images.length;
     if (position === 0) {
       // Center card - full size, no blur
       return "scale-100 opacity-100 z-20";
     } else if (position === 1 || position === images.length - 1) {
       // Adjacent cards - smaller, blurred
       return "scale-95 opacity-80 blur-sm z-10";
     } else {
       // Hidden cards
       return "scale-90 opacity-0 z-0";
     }
   };
   ```

3. **Add Click Handlers**:
   ```tsx
   const handleCardClick = (image: ImageData) => {
     router.push('/brands'); // Link all cards to brands page
   };
   ```

4. **Replace Existing Carousels**:
   - Update `src/app/page.tsx` - replace `GalleryCarousel` with `ProductCarousel3D`
   - Update `src/app/brands/page.tsx` - replace any existing carousel
   - Pass product images from `src/data/products.ts`

5. **Test & Optimize**:
   - Test touch gestures on mobile devices
   - Verify keyboard accessibility
   - Performance test with large image sets
   - Cross-browser compatibility

## Task 2: Convert Canada Craft Logo to SVG (Priority: High)

### Design Requirements:
1. **Analyze Current PNG**: `public/brands/Cannada%20Craft%20No%20BG.png`
2. **Logo Structure**:
   - "Cannada" (curved text, intentionally misspelled)
   - Red maple leaf (centered)
   - "Craft" (straight/level text)
3. **Issues to Fix**:
   - Center the curved "Cannada" text properly
   - Adjust spacing between elements
   - Maintain visual hierarchy

### Implementation Steps:
1. **Create SVG Version**:
   - Use design software (Figma, Illustrator, Inkscape) to recreate logo
   - Convert curved text to proper SVG paths
   - Ensure maple leaf is properly positioned
   - Keep "Craft" text straight and level

2. **Optimize SVG**:
   - Clean up unnecessary code
   - Ensure scalable at all sizes
   - Test rendering across different browsers

3. **Replace in Code**:
   - Update `src/data/brands.ts`: Change logo path to `.svg`
   - Move PNG to archive folder (don't delete)
   - Test display in components

## Task 5: Clean Up Mission Brand Section Spacing (Priority: Medium)

### Current Issues Analysis:
- Review `src/sections/MissionBrandSection.tsx` spacing constants
- Check text layout in `space-y-3` and `leading-[1.55]`
- Examine grid layout and responsive spacing

### Implementation Steps:

1. **Analyze Current Spacing**:
   ```tsx
   // Current spacing in MissionBrandSection
   const SPACING = {
     section: "py-14 md:py-16 lg:py-20",
     gridGap: "gap-10 md:gap-12 lg:gap-12",
     cardGrid: "gap-5 md:grid-cols-2 lg:grid-cols-1",
   };
   ```

2. **Optimize Text Spacing**:
   - Adjust `space-y-3` to `space-y-4` for better readability
   - Fine-tune `leading-[1.55]` to `leading-[1.6]` for improved line height
   - Add consistent paragraph margins

3. **Improve Grid Layout**:
   - Standardize gap values across breakpoints
   - Ensure proper content alignment
   - Test on various screen sizes

4. **Update Spacing Constants**:
   ```tsx
   const SPACING = {
     section: "py-16 md:py-20 lg:py-24", // Increased vertical padding
     gridGap: "gap-12 md:gap-16 lg:gap-20", // More consistent gaps
     cardGrid: "gap-6 md:grid-cols-2 lg:grid-cols-1", // Better card spacing
   };
   ```

## Task 14: Update Brands Section Background (Priority: Medium)

### Implementation Steps:

1. **Locate Current Brands Section**:
   - Find the new unified brands section created in Task 3
   - Verify it uses `BrandsUnified` component

2. **Apply Background Styling**:
   ```tsx
   // In BrandsUnified.tsx
   <section className="py-16 md:py-20 bg-(--surface-olive)">
   ```

3. **Verify Background Flow**:
   - Hero: video/none ✓
   - Mission: green ✓ (already implemented)
   - About: white ✓
   - Brands: green ← (to be implemented)
   - Gallery: video/none ✓
   - CTA: green ✓ (already implemented)
   - Footer: green ✓ (already implemented)

4. **Test Visual Consistency**:
   - Ensure text contrast is appropriate on green background
   - Test with existing brand data
   - Verify responsive design

## Task 15: Create Site Architecture Flowchart (Priority: Low)

### Documentation Structure:

1. **Component Hierarchy**:
   - Map all page components and their sections
   - Document component relationships
   - Show data flow between components

2. **Data Flow Diagram**:
   - How data moves from `/data/` files to components
   - API routes and external integrations
   - State management flow

3. **Routing Structure**:
   - Next.js app router structure
   - Dynamic routes and layouts
   - Navigation flow

4. **Create Visual Diagram**:
   ```
   📁 app/
   ├── 📄 layout.tsx (global)
   ├── 📄 page.tsx (home)
   │   ├── 🧩 Hero
   │   ├── 🧩 MissionSection_1
   │   ├── 🧩 AboutStory
   │   ├── 🧩 BrandsUnified ← (new)
   │   ├── 🧩 GalleryCarousel
   │   ├── 🧩 CTA
   │   └── 📄 See Products Button
   ├── 📁 about/
   ├── 📁 brands/
   └── 📁 products/
   ```

5. **Include in Documentation**:
   - Save as `docs/architecture/site-architecture-flowchart.md`
   - Include both text and ASCII diagram formats
   - Add explanatory notes for complex relationships

---

## Testing & Quality Assurance

### For Each Task:
- **Visual Testing**: Check responsive design across breakpoints
- **Functional Testing**: Verify all interactions work correctly
- **Performance Testing**: Monitor Lighthouse scores
- **Cross-browser Testing**: Test on Chrome, Firefox, Safari
- **Accessibility Testing**: Verify WCAG compliance

### Production Readiness Checklist:
- [ ] 3-column carousel component built and integrated
- [ ] Canada Craft logo converted to SVG with proper spacing
- [ ] Brands sections combined into unified component
- [ ] Mission brand section spacing improved
- [ ] Logo renders in production builds
- [ ] Contact form functional with email delivery
- [ ] All animations consistent across pages
- [ ] Documentation updated and cleaned
- [ ] Site architecture documented
- [ ] Background color flow implemented
- [ ] Responsive design verified
- [ ] Performance metrics maintained

---

## Deployment & Monitoring

### Pre-deployment:
- Run full test suite
- Check build completes without errors
- Verify all assets load correctly
- Test contact form functionality

### Post-deployment:
- Monitor error logs
- Check email delivery
- Verify logo rendering
- Test on production domain

---

*This plan provides step-by-step instructions for completing all remaining development tasks. Each task includes specific file paths, code examples, and testing procedures to ensure successful implementation.*
