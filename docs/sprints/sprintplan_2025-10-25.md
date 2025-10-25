## **Sprint Plan: 2025-10-25 Evening (5-hour focus)**

Based on the codebase review and your client notes, here's the tactical execution plan:

---

### **🎯 Phase 1: Quick Wins (90 min)**

#### **1. Navbar Logo Sizing (15 min)**
- **Files**: `src/components/navigation/Logo.tsx`, `src/components/navigation/Header.tsx`
- **Current state**: Logo is `h-8 md:h-10` (32px mobile, 40px desktop)
- **Action**: Bump to `h-9 md:h-11` or `h-10 md:h-12` (40-48px range)
- **Test**: Verify no layout shift on scroll, check glass effect alignment

#### **2. Footer Disclaimer Slot (20 min)**
- **Files**: `src/sections/Footer.tsx`
- **Current state**: Basic footer with copyright + links
- **Action**: 
  - Add optional `disclaimer?: string` prop
  - Render below links with semantic `<p>` tag
  - Style: smaller text, muted color, max-width constraint
  - Default: `"Legal disclaimer text pending from client."`

#### **3. Brands Page Spacing Adjustments (35 min)**
- **Files**: `src/app/brands/page.tsx`
- **Current issues**: 
  - Hero `pb-14 sm:pb-16 lg:pb-16` feels loose
  - BrandDetails `py-20 sm:py-24` is excessive
  - Card grid gaps inconsistent
- **Actions**:
  - Tighten hero bottom padding: `pb-10 sm:pb-12 lg:pb-12`
  - Reduce BrandDetails: `py-14 sm:py-16`
  - Standardize card spacing: highlight cards gap from `gap-6` → `gap-5`
  - Test on mobile + desktop, ensure navbar offset utilities apply

#### **4. Update Our Mission Section with Official Copy (20 min)**
- **Files**: `src/content/pages.json` (or wherever home page content lives)
- **Current state**: Placeholder or old copy in "Our Mission" section below fold
- **Action**:
  - Update with client-approved final copy:
    - Title: "Our Mission"
    - Headline: "TO GROW CANNABIS WITH PURPOSE — CRAFTED FOR PATIENTS, CELEBRATED BY CONSUMERS."
    - Body paragraphs (3 total)
    - Closing: "Apigen stands for quality, transparency, and integrity."
  - Verify section renders correctly on home page
  - Check typography, spacing, and alignment match design system

---

### **🎨 Phase 2: Polish (90 min)**

#### **5. Card Hover 3D-lite Effect (90 min)**
- **Files to update**:
  - `src/sections/AboutStory.tsx` (2-col grid cards)
  - `src/app/brands/page.tsx` → `BrandDetails` highlights (3-col grid)
  - Possibly `src/sections/BrandGrid.tsx` if used elsewhere
  
- **Implementation**:
  ```css
  /* Add to hover state with reduced-motion guard */
  @media (prefers-reduced-motion: no-preference) {
    .card-3d:hover {
      transform: perspective(1000px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  }
  ```
  
- **Approach**:
  - Add utility class or inline Tailwind: `hover:translate-y-[-4px]` + custom perspective via style prop
  - Respect existing reduced-motion guards
  - Enhance shadow on hover (already partly there, boost slightly)
  - Test all 3 breakpoints (mobile, tablet, desktop)

---

### **⚡ Phase 3: Medium Task (If Time — 120 min)**

#### **6. Contact Modal UI Scaffold (120 min)**
- **New files**:
  - `src/components/modals/ContactModal.tsx`
  - `src/lib/validation.ts` (client-side form validation)

- **Functionality**:
  - Modal triggered from CTA buttons (header, hero, footer)
  - Fields: Name (text), Company (text), Email (email), Country (select/text), Message (textarea) — **all required**
  - Client-side validation: email format, required fields
  - Success state: "Thank you! We'll be in touch soon."
  - Error state: field-level errors
  - No backend integration yet (placeholder `console.log` on submit)

- **UI Design**:
  - Use shadcn/ui Dialog primitive
  - Glass effect background blur
  - Form inputs match site theme tokens
  - Mobile-first, full-screen overlay on small screens
  - Respect reduced-motion for modal entrance

- **Integration points**:
  - Update header CTA to trigger modal
  - Update hero CTAs
  - Wire up state management (local useState, no context needed)

---

### **✅ Acceptance Criteria & Testing Checklist**

Before calling it done tonight:

- [ ] Logo feels larger but doesn't shift layout on scroll
- [ ] Footer disclaimer renders correctly with placeholder text
- [ ] `/brands` spacing feels tighter, hero aligns with navbar offset
- [ ] Our Mission section displays official client copy correctly
- [ ] Card hover effect:
  - Visible 3D-lite lift on hover (desktop)
  - No effect with reduced-motion enabled
  - Shadow/border enhancements apply
- [ ] (Stretch) Contact modal:
  - Opens/closes smoothly
  - All fields validate
  - Success state shows after submit
  - Mobile viewport tested

---

### **🚫 Out of Scope (Defer)**

- Form backend (Google Sheets API integration)
- New SVG logo production (needs design iteration)
- Age-gate modal
- Visual editor adapter refactor
- Customer journey section

---

### **📦 Deliverables**

At EOD, you'll have:
1. Logo sizing, footer disclaimer, brands spacing, and Our Mission copy updates (Phase 1 complete)
2. Card hover polish across About/Brands (Phase 2 complete)
3. (Stretch) Contact modal UI ready for backend hookup (Phase 3)

---

## **✅ SPRINT COMPLETED - 2025-10-25**

### **All Planned Tasks Completed**

#### **Phase 1: Quick Wins** ✅
1. ✅ **Navbar Logo Sizing** - Logo increased from 32/40px to 40/48px (mobile/desktop)
2. ✅ **Footer Disclaimer Slot** - Added optional disclaimer prop with placeholder text
3. ✅ **Brands Page Spacing** - Tightened padding throughout (pb-14/16→pb-10/12, py-20/24→py-14/16)
4. ✅ **Our Mission Section** - Updated with official client-approved copy

#### **Phase 2: Polish** ✅
5. ✅ **Card Hover 3D Effect** - Added subtle lift animation to AboutStory and Brands cards with `motion-safe:` prefix

#### **Phase 3: Stretch Goal** ✅
6. ✅ **Contact Modal** - Fully functional modal with validation, success state, and integration

---

### **Bonus Work Completed** 🎉

Beyond the original plan, we also:

1. **Reusable Card Component** - Created `src/components/Card.tsx` with flexible props (radius, padding, gradient direction)
2. **Journey Section Refactor** - Replaced custom cards with reusable Card component + added descriptions to all 4 journey items
3. **Global ContactModal Integration** - Wired modal site-wide via Context Provider:
   - Any link to `/contact` automatically opens modal
   - Works across all pages (Header, Hero, Journey, Brands, Footer, CTA sections)
   - Single instance, no code duplication
4. **Brands Page Layout Redesign** - Removed article card, repositioned 3 highlight cards + data card, added CTA button
5. **Country Dropdown** - Integrated `world-countries` package with Canada/US/UK at top, alphabetical list below
6. **Modal Spacing Fix** - Eliminated scroll on desktop with tightened spacing throughout

---

### **Files Modified/Created (13 total)**

**Modified (9 files):**
- `src/components/navigation/Logo.tsx`
- `src/sections/Footer.tsx`
- `src/app/brands/page.tsx`
- `src/content/pages.json`
- `src/sections/AboutStory.tsx`
- `src/sections/JourneyRow.tsx`
- `src/app/layout.tsx`
- `src/components/AppLink.tsx`
- `src/components/modals/ContactModal.tsx`

**Created (4 files):**
- `src/components/Card.tsx`
- `src/components/ui/dialog.tsx`
- `src/lib/validation.ts`
- `src/providers/ContactModalProvider.tsx`

---

### **Dependencies Added**
- `@radix-ui/react-dialog` - Accessible modal/dialog primitives
- `world-countries` - Comprehensive country data (250+ countries)

---

## **📧 Client Update**

Hey Sunny! 👋

Great news — we knocked out everything on tonight's list and then some!

**What's New:**

**Visual Polish:**
- Logo is bigger and more prominent in the header
- Brands page feels tighter with better spacing
- Your official "Our Mission" copy is now live on the home page
- All cards across the site now have that nice subtle lift effect when you hover (respects accessibility settings too)

**Contact Form:**
- Built a full contact modal that pops up when anyone clicks "Get in Touch" anywhere on the site
- Includes all the fields you wanted: Name, Company, Email, Country (with a dropdown!), and Message
- Country dropdown has Canada at the top, then US and UK, with all other countries alphabetically below
- Form validates everything before submission and shows a nice success message
- Works perfectly on mobile and desktop
- **Note:** We'll research spam prevention methods and implement those in the next phase

**Under the Hood:**
- Created reusable card components so we're not repeating code everywhere
- Updated the Journey section to use these new cards
- The contact modal is wired up globally — any "contact" or "get in touch" button opens it automatically
- Everything is ready for backend integration when you're ready to connect to Google Sheets or your preferred system

**Next Up:**
- Hook up the contact form to actually send you the submissions (Google Sheets, email, or database)
- Add spam protection
- Any other polish or content updates you need

The site is looking sharp! Let me know if you want to jump on a call to walk through it.

— Cobi