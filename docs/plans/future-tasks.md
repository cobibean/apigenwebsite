# Future Development Tasks

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

### 5. Convert Canada Craft Logo to SVG 🎯 EXTRA CREDIT / NICE TO HAVE
**Goal:** Convert the Canada Craft logo from PNG to SVG format with improved spacing and centered "Cannada" text.

**Status:** 🎯 EXTRA CREDIT / NICE TO HAVE
- Should only be completed AFTER everything else is done
- Including deploying to production and setting up domain/hosting
- Current PNG works functionally, this is polish/enhancement

**Requirements:**
- Recreate logo as scalable SVG
- Properly center the curved "Cannada" text
- Maintain red maple leaf positioning
- Keep "Craft" text straight and level
- Preserve intentional "Cannada" misspelling (cannabis play on words)

---

### 6. Wire Up Contact Modal to Email Service 🔄 MOSTLY COMPLETE
**Goal:** Connect the contact modal to a real email inbox using a simple, free service.

**Status:** 🔄 MOSTLY COMPLETE
- EmailJS integration implemented in ContactModal
- Email delivery working
- Basic validation and success feedback
- EmailJS Setup Guide created

**Remaining:** Need to retry testing with new info from Sunny

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

## Task 3: Combine Brands Section (Priority: High)

### Step-by-Step Implementation:

1. **Analyze Current Brand Sections**:
   - Examine `src/sections/Brands2.tsx` - currently used on home page
   - Review `src/sections/CraftBrandSection.tsx` and `src/sections/MissionBrandSection.tsx` from brands page
   - Check `src/data/brands.ts` for brand data structure

2. **Create New Unified Brands Section**:
   - Create `src/sections/BrandsUnified.tsx`
   - Import brand data: `import { brands } from "@/data/brands"`
   - Structure: Hero section + Brand cards grid + CTA button to `/brands`

3. **Component Architecture**:
   ```tsx
   // New BrandsUnified component structure
   export default function BrandsUnified() {
     return (
       <section className="py-16 md:py-20 bg-(--surface-olive)">
         <div className="container mx-auto px-4">
           {/* Hero content similar to Brands2 */}
           {/* Brand cards grid */}
           {/* CTA button to /brands */}
         </div>
       </section>
     );
   }
   ```

4. **Replace in Home Page**:
   - Update `src/app/page.tsx`
   - Replace `<Brands2 brands={defaultBrands} />` with `<BrandsUnified />`
   - Remove unused `Brands2` import

5. **Test & Verify**:
   - Ensure all brand data displays correctly
   - Test responsive design
   - Verify CTA button navigation

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

## Task 7: Fix Header Logo Rendering in Production (Priority: High)

### Root Cause Analysis:

1. **Path Resolution Issues**:
   - Logo uses `/hero/logo%20+%20text.png` and `/hero/transparentlogo.png`
   - Production builds may not resolve these paths correctly
   - Check if files exist in `public/hero/` directory

2. **Image Optimization**:
   - Next.js Image component may behave differently in production
   - Check build logs for image optimization errors

3. **Build Process Differences**:
   - Development vs production asset handling
   - Static file serving differences

### Implementation Steps:

1. **Verify Asset Existence**:
   - Confirm files exist: `public/hero/logo + text.png`, `public/hero/transparentlogo.png`
   - Check file permissions and encoding

2. **Update Logo Paths**:
   ```tsx
   // In Header.tsx, change:
   logoImageSrc = "/hero/logo%20+%20text.png"
   // To:
   logoImageSrc = "/hero/logo%2B%20text.png" // URL-encoded +
   // Or rename file to remove spaces/special chars
   ```

3. **Add Error Handling**:
   ```tsx
   // In Logo.tsx, add fallback
   <AppImage
     src={imageSrc}
     alt="Apigen logo"
     onError={(e) => {
       e.currentTarget.src = '/fallback-logo.png'; // Add fallback image
     }}
     // ... other props
   />
   ```

4. **Test Production Build**:
   - Run `npm run build && npm run start`
   - Check browser network tab for 404 errors
   - Test on multiple browsers

## Task 9: Wire Up Contact Modal to Email Service (Priority: High)

### Implementation Plan:

1. **Choose Email Service**: Use EmailJS (free tier, no backend required)
   - Sign up at emailjs.com
   - Create email service and template

2. **Install Dependencies**:
   ```bash
   npm install @emailjs/browser
   ```

3. **Create EmailJS Configuration**:
   ```tsx
   // In ContactModal.tsx
   import emailjs from '@emailjs/browser';

   // EmailJS configuration
   const SERVICE_ID = 'your_service_id';
   const TEMPLATE_ID = 'your_template_id';
   const PUBLIC_KEY = 'your_public_key';
   ```

4. **Update Form Submission**:
   ```tsx
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setStatus("submitting");

     try {
       await emailjs.send(
         SERVICE_ID,
         TEMPLATE_ID,
         {
           name: formData.name,
           company: formData.company,
           email: formData.email,
           country: formData.country,
           message: formData.message,
         },
         PUBLIC_KEY
       );

       setStatus("success");
       // Reset form and close modal
     } catch (error) {
       console.error('Email send failed:', error);
       setStatus("error");
     }
   };
   ```

5. **Add Error Handling**:
   - Show error message on failed submission
   - Retry mechanism for failed sends
   - Rate limiting protection

6. **Email Template Setup**:
   - Create template in EmailJS dashboard
   - Include all form fields
   - Format for professional delivery

## Task 11: Standardize Framer Motion Appear Settings (Priority: Medium)

### Analysis Phase:

1. **Audit Current Usage**:
   - Check all files using `<Appear>` component
   - Compare animation parameters across components
   - Identify inconsistencies

2. **Home Page Standard**:
   - Review how `Appear` is used in home page sections
   - Note timing, easing, and motion preferences

### Implementation Steps:

1. **Create Centralized Animation Config**:
   ```tsx
   // src/lib/animations.ts
   export const appearConfig = {
     duration: 0.6,
     ease: "easeOut",
     delay: 0.1,
     // Add other standardized settings
   };
   ```

2. **Update Appear Component**:
   - Modify `src/components/motion/Appear.tsx` to use centralized config
   - Ensure `prefers-reduced-motion` is respected everywhere

3. **Update All Components**:
   - Replace hardcoded animation values with config
   - Test each page for consistent behavior
   - Verify reduced motion preferences work

## Task 13: Audit and Clean Up Docs Folder (Priority: Low)

### Cleanup Plan:

1. **Categorize Files**:
   - **Keep**: Architecture docs, component guides, current plans
   - **Archive**: Old chat summaries, outdated client notes
   - **Delete**: Temporary files, duplicates, unused assets

2. **Files to Keep**:
   - `Architecture.md`
   - `future-tasks.md`
   - Component guides and style docs
   - Current active plans

3. **Files to Remove**:
   - `chat-summaries.md`
   - `client updates/` folder (old meeting notes)
   - `notes/` folder (temporary notes)
   - `prompts/` (empty)
   - `questions.md` (old questions)

4. **Organize Structure**:
   ```
   docs/
   ├── architecture/
   │   ├── site-architecture.md
   │   └── component-structure.md
   ├── guides/
   │   ├── buttons-guide.md
   │   └── header-tuning-guide.md
   ├── plans/
   │   └── future-tasks.md
   └── style/
       ├── ui-layout-guide.md
       └── style-audit.md
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
