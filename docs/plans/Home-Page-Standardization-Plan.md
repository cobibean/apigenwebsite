# Home Page Content Management Standardization Plan

## Overview
Standardize the home page content management using the established `data file → section component → page` pattern. The home page is complex due to multiple sections, layout variations, and mixed content sources, requiring a comprehensive approach.

## 🎨 Visual Distinction Preservation

**YES - Section styling and backgrounds are fully preserved and made data-driven!**

Each section maintains its unique visual identity through the `styling` configuration:

- **Hero**: Video background (internal component logic)
- **Mission**: Olive background (`bg-[var(--surface-olive)]`)
- **AboutStory**: Default background (no special styling needed)
- **Brands2**: Default background (component handles its own theming)
- **ProductShowcase**: Olive background + white text + copper borders
- **GalleryCarousel**: Default background
- **CTA**: Surface background (`bg-[var(--surface)]`)

**All visual distinctions become configurable through data, not hardcoded!** 🚀

## Current State Analysis

### Home Page Structure (`src/app/page.tsx`)

The home page currently has **7 distinct sections** with mixed content handling:

```typescript
// Current home page composition
<>
  <Hero {...hardcodedProps} />
  <MissionSection_1 />  // uses internal defaults
  <AboutStory content={aboutContent} />  // ✅ already standardized
  <Brands2 brands={defaultBrands} />  // ✅ already standardized

  {/* Complex cultivar mapping with hardcoded logic */}
  {cultivars.map((strain, idx) => (
    <ProductShowcase
      key={strain.id}
      strain={strain}
      layoutDirection={idx % 2 === 0 ? "left" : "right"}  // ❌ hardcoded logic
      hideSupporting={true}  // ❌ hardcoded
      sectionBgColor="olive"  // ❌ hardcoded
      contentTextColor="white"  // ❌ hardcoded
      headerBorderColor="copper"  // ❌ hardcoded
      cardBorderColor="copper"  // ❌ hardcoded
    />
  ))}

  <GalleryCarousel
    title="Our Premium Strains"  // ❌ hardcoded
    subtitle="Explore Cadillac Rainbow and Dante's Inferno up close"  // ❌ hardcoded
    images={galleryImages}  // ✅ data-driven
    size="compact"  // ❌ hardcoded
  />
  <CTA />  // uses internal defaults
</>
```

### Content Sources Analysis

#### ✅ Already Standardized
- **AboutStory**: Uses `aboutContent` from `src/data/about.ts`
- **Brands2**: Uses `brands` data from `src/data/brands.ts`
- **ProductShowcase**: Uses `cultivars` data from `src/data/cultivars.ts`
- **GalleryCarousel**: Uses `galleryImages` from `src/data/gallery.ts`

#### ❌ Needs Standardization
- **Hero**: All props hardcoded in `page.tsx`
- **MissionSection_1**: Internal default props
- **ProductShowcase Layout**: Alternating left/right logic hardcoded
- **ProductShowcase Styling**: Theme props hardcoded (olive bg, white text, copper borders)
- **GalleryCarousel**: Title, subtitle, size hardcoded
- **CTA**: Internal default props

## Home Page Specific Challenges

### 1. Complex Composition Logic
- **Multiple sections** with different data sources
- **Conditional rendering** (cultivars.map with alternating layouts)
- **Styling variations** per section
- **Section ordering** and arrangement

### 2. Layout Variations
- **Product showcases**: Alternating left/right layouts
- **Theming**: Olive background, white text, copper accents
- **Size variants**: Gallery carousel compact mode

### 3. Mixed Content Patterns
- Some sections use data files, others use hardcoded props
- Component-level defaults vs page-level composition logic
- Different styling approaches per section

## Target Architecture

### Comprehensive Home Data Structure

Create `src/data/home.ts` that defines the entire home page composition:

```typescript
export interface HeroContent {
  eyebrow: string;
  subtitle: string;
  title: string;
  copy: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MissionContent {
  eyebrow: string;
  taglinePrimary: string;
  taglineSecondary: string;
  lead: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
}

export interface GalleryContent {
  title: string;
  subtitle: string;
  size: "full" | "compact";
}

export interface CTAContent {
  title: string;
  copy: string;
  label: string;
  href: string;
  variant: "brown" | "olive" | "neutral";
}

export interface ProductShowcaseConfig {
  /** Which cultivars to showcase (by ID) */
  productIds: string[];
  /** Layout pattern for alternating sections */
  layoutPattern: ("left" | "right")[];
  /** Common styling for all showcases */
  styling: {
    hideSupporting: boolean;
    sectionBgColor: "default" | "olive";
    contentTextColor: "default" | "white";
    headerBorderColor: "none" | "copper" | "black";
    cardBorderColor: "default" | "copper" | "black";
  };
}

export interface SectionStyling {
  /** CSS class for section background */
  backgroundClass?: string;
  /** Theme variant for components within section */
  theme?: "default" | "olive" | "dark";
  /** Additional CSS classes */
  className?: string;
}

export interface HomeContent {
  hero: HeroContent & { styling?: SectionStyling };
  mission: MissionContent & { styling?: SectionStyling };
  gallery: GalleryContent & { styling?: SectionStyling };
  cta: CTAContent & { styling?: SectionStyling };
  productShowcases: ProductShowcaseConfig;
  metadata: {
    title: string;
    description: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "Apigen",
    subtitle: "PREMIUM QUALITY DRIED CANNABIS EXPORTER",
    title: "Premium dried cannabis, exported consistently.",
    copy: "Ethical, compliant, patient-first.",
    ctaLabel: "Get in touch",
    ctaHref: "/contact"
    // Hero has internal video background - no additional styling needed
  },
  mission: {
    eyebrow: "Our Mission",
    taglinePrimary: "TO SET A NEW INDUSTRY\nSTANDARD WITH",
    taglineSecondary: "PREMIUM MEDICINAL\nCANNABIS FLOWER",
    lead: "We're not just providing exceptional medication...",
    body: "Uncompromising pharmaceutical‑grade quality...",
    cta: { label: "About Apigen", href: "/about" },
    styling: {
      backgroundClass: "bg-[var(--surface-olive)]"
    }
  },
  gallery: {
    title: "Our Premium Strains",
    subtitle: "Explore Cadillac Rainbow and Dante's Inferno up close",
    size: "compact"
    // Gallery uses default background - no additional styling needed
  },
  cta: {
    title: "Ready to talk?",
    copy: "Let's discuss your needs and timelines.",
    label: "Get in touch",
    href: "/contact",
    variant: "olive",
    styling: {
      backgroundClass: "bg-[var(--surface)]"
    }
  },
  productShowcases: {
    productIds: ["cadillac-rainbow", "dantes-inferno"], // Use all cultivars or specific ones
    layoutPattern: ["left", "right"], // Pattern repeats for any number of cultivars
    styling: {
      hideSupporting: true,
      sectionBgColor: "olive", // Olive background for product sections
      contentTextColor: "white",
      headerBorderColor: "copper",
      cardBorderColor: "copper"
    }
  },
  metadata: {
    title: "Apigen | Premium dried cannabis exporter",
    description: "Premium dried cannabis, exported consistently. Ethical, compliant, patient-first."
  }
};
```

### Home Page Component Updates

#### 1. Convert Hero to Content Props
**File**: `src/sections/Hero.tsx`
- Change from individual props to single `content` prop
- Update interface to accept `HeroContent`
- Apply styling.backgroundClass if provided

#### 2. Convert MissionSection_1 to Content Props
**File**: `src/sections/MissionSection_1.tsx`
- Remove default prop values
- Change to accept `content: MissionContent` prop
- Apply styling.backgroundClass to override internal background if provided

#### 3. Convert GalleryCarousel to Content Props
**File**: `src/sections/GalleryCarousel.tsx`
- Change from individual title/subtitle/size props to `content: GalleryContent` prop
- Apply styling.backgroundClass if provided
- Keep images as separate prop since it comes from different data source

#### 4. Convert CTA to Content Props
**File**: `src/sections/CTA.tsx`
- Remove default prop values
- Change to accept `content: CTAContent` prop
- Apply styling.backgroundClass to override internal background if provided

#### 5. Simplify Home Page Composition
**File**: `src/app/page.tsx`
```typescript
import { homeContent } from "@/data/home";
import { cultivars } from "@/data/cultivars";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  // Get cultivars for showcases
  const showcaseCultivars = homeContent.productShowcases.productIds
    .map(id => cultivars.find(p => p.id === id))
    .filter(Boolean);

  return (
    <>
      <Hero content={homeContent.hero} />
      <MissionSection_1 content={homeContent.mission} />
      <AboutStory content={aboutContent} />
      <Brands2 brands={defaultBrands} />

      {/* Data-driven product showcases */}
      {showcaseProducts.map((strain, idx) => {
        const layoutDirection = homeContent.productShowcases.layoutPattern[
          idx % homeContent.productShowcases.layoutPattern.length
        ];

        return (
          <ProductShowcase
            key={strain!.id}
            strain={strain!}
            layoutDirection={layoutDirection}
            {...homeContent.productShowcases.styling}
          />
        );
      })}

      <GalleryCarousel
        content={homeContent.gallery}
        images={galleryImages}
      />
      <CTA content={homeContent.cta} />
    </>
  );
}
```

## Migration Strategy

### Phase 1: Data Structure Creation
1. Create `src/data/home.ts` with comprehensive interfaces
2. Populate with current hardcoded content
3. Test data structure validity

### Phase 2: Component Updates (Individual)
1. **Hero component**: Convert to content prop
2. **MissionSection_1 component**: Convert to content prop
3. **GalleryCarousel component**: Convert to content prop
4. **CTA component**: Convert to content prop

### Phase 3: Page Integration
1. Update `src/app/page.tsx` to use `homeContent`
2. Implement data-driven product showcase logic
3. Test entire page functionality

### Phase 4: Cleanup & Optimization
1. Remove old hardcoded imports
2. Verify all sections work correctly
3. Update documentation

## Implementation Order

1. **Create Home Data Structure** (safe, no breaking changes)
2. **Hero Component** (simple prop conversion)
3. **CTA Component** (simple prop conversion)
4. **GalleryCarousel Component** (simple prop conversion)
5. **MissionSection_1 Component** (medium complexity)
6. **Home Page Integration** (complex, requires testing all sections)
7. **Final Testing & Cleanup**

## Risk Assessment

### Low Risk
- Data structure creation
- Individual component conversions
- Documentation updates

### Medium Risk
- MissionSection_1 conversion (complex internal logic)
- Home page integration (multiple moving parts)

### High Risk
- Breaking existing functionality across multiple sections
- Complex product showcase logic changes
- Potential layout/styling regressions

## Testing Strategy

### Component-Level Testing
- Each component individually with new content prop
- Verify prop destructuring works correctly
- Check fallback behavior

### Page-Level Testing
- Complete home page renders correctly
- All sections display proper content
- Product showcase alternating layouts work
- Responsive design maintained

### Integration Testing
- Navigation between pages still works
- No console errors
- Performance impact minimal
- SEO metadata correct

## Success Criteria

- [ ] All home page sections use data-driven content
- [ ] No hardcoded content strings in `page.tsx`
- [ ] Product showcase layout logic is data-driven
- [ ] Complex composition patterns work correctly
- [ ] All existing functionality preserved
- [ ] TypeScript compilation successful
- [ ] Responsive design maintained
- [ ] Performance not degraded

## Benefits After Migration

### Content Management
- **Centralized**: All home page content in one data file
- **Editable**: Non-technical team can update content
- **Version Controlled**: Content changes tracked in git
- **Consistent**: Same pattern as other pages

### Developer Experience
- **Predictable**: Clear data flow from content to components
- **Type Safe**: Full TypeScript coverage
- **Maintainable**: Easy to modify section order or add new sections
- **Scalable**: Easy to extend with new content types

### Architecture Benefits
- **Separation of Concerns**: Content separate from presentation
- **Reusable Components**: Components work with any content
- **Testable**: Data-driven logic is easier to test
- **Flexible**: Easy to change layouts, themes, or content structure
- **🎨 Visual Consistency**: Section backgrounds and themes preserved and configurable
- **Design System Integration**: Styling configurations follow established design tokens

## Alternative Approaches Considered

### Option 1: Minimal Changes
Keep current structure but move hardcoded strings to data file. This would be simpler but wouldn't address the complex composition logic.

### Option 2: Section-Based Data Files
Create separate data files for each section (`hero.ts`, `mission.ts`, etc.) instead of one comprehensive file. This would be more modular but more complex to manage.

### Option 3: Config-Driven Composition
Use a configuration array to define which sections to show and their content. This would be most flexible but also most complex.

**Chosen Approach**: Comprehensive single data file provides the best balance of simplicity and completeness for the home page's specific needs.

## Next Steps

1. Review and approve this comprehensive plan
2. Start with Phase 1 (data structure creation)
3. Implement component conversions individually
4. Perform thorough testing at each phase
5. Update documentation upon completion
