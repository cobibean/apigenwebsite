# Home Page Architecture

## Overview

This document details the home page's data-driven architecture, which enables complex page composition through structured content management. The home page serves as the most sophisticated example of the `data file → section component → page` pattern, handling multiple sections with varying layouts, themes, and content sources.

## Architecture Pattern

The home page architecture extends the standard content management pattern with advanced composition features:

```
Data Definition → Page Logic → Component Rendering
```

### Key Features
- **Complex Composition**: Multiple sections with different data sources
- **Layout Variations**: Configurable alternating layouts (left/right patterns)
- **Theme Overrides**: Section-specific styling while preserving defaults
- **Content Aggregation**: Combines data from multiple sources (brands, cultivars, gallery, home-specific content)
- **Dynamic Rendering**: Logic-based component selection and configuration

## Data Structure

### Core Data File: `src/data/home.ts`

```typescript
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
    productIds: ["cadillac-rainbow", "dantes-inferno"],
    layoutPattern: ["left", "right"],
    styling: {
      hideSupporting: true,
      sectionBgColor: "olive",
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

### Supporting Interfaces

```typescript
export interface SectionStyling {
  backgroundClass?: string;
  theme?: "default" | "olive" | "dark";
  className?: string;
}

export interface ProductShowcaseConfig {
  productIds: string[];
  layoutPattern: ("left" | "right")[];
  styling: {
    hideSupporting: boolean;
    sectionBgColor: "default" | "olive";
    contentTextColor: "default" | "white";
    headerBorderColor: "none" | "copper" | "black";
    cardBorderColor: "default" | "copper" | "black";
  };
}
```

## Page Composition Logic

### File: `src/app/page.tsx`

The home page implements sophisticated composition logic that transforms structured data into rendered components:

```typescript
export default function Home() {
  // Step 1: Aggregate cultivar data based on configuration
  const showcaseCultivars = homeContent.productShowcases.productIds
    .map(id => cultivars.find(p => p.id === id))
    .filter(Boolean);

  return (
    <>
      {/* Step 2: Render sections with data-driven content */}
      <Hero content={homeContent.hero} />
      <MissionSection_1 content={homeContent.mission} />
      <AboutStory content={aboutContent} />
      <Brands2 brands={defaultBrands} />

      {/* Step 3: Complex cultivar showcase rendering */}
      {showcaseCultivars.map((strain, idx) => {
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

      {/* Step 4: Gallery with combined data sources */}
      <GalleryCarousel
        content={homeContent.gallery}
        images={galleryImages}
      />

      {/* Step 5: CTA with data-driven styling */}
      <CTA content={homeContent.cta} />
    </>
  );
}
```

## Component Integration

### Data Flow Pattern

Each section component receives structured content and handles its own rendering logic:

```
HomeContent.hero → Hero(content) → Renders hero section
HomeContent.mission → MissionSection_1(content) → Renders mission section
HomeContent.gallery + galleryImages → GalleryCarousel(content, images) → Renders gallery
HomeContent.cta → CTA(content) → Renders call-to-action
```

### Styling Integration

Components use the `styling` property to override defaults:

```typescript
// MissionSection_1 applies olive background override
<section className={`w-full ${styling?.backgroundClass || ""}`}
        style={styling?.backgroundClass ? undefined : { background: "var(--surface-olive)" }}>

// CTA applies surface background override
<section className={styling?.backgroundClass || "bg-[var(--surface)]"}>
```

## Layout Pattern System

### Product Showcase Alternation

The home page implements a sophisticated layout pattern system:

```typescript
// Configuration defines the pattern
layoutPattern: ["left", "right"] // Alternates between layouts

// Logic applies pattern cyclically
const layoutDirection = homeContent.productShowcases.layoutPattern[
  idx % homeContent.productShowcases.layoutPattern.length
];

// Result: Cultivar 0 = left, Cultivar 1 = right, Cultivar 2 = left, etc.
```

### Benefits
- **Predictable Layouts**: Consistent alternation patterns
- **Configurable**: Easy to change patterns (e.g., `["left", "left", "right"]`)
- **Scalable**: Works with any number of cultivars
- **Maintainable**: Layout logic centralized in data

## Data Aggregation Strategy

### Multi-Source Content

The home page aggregates content from multiple data sources:

```typescript
// Home-specific content
import { homeContent } from "@/data/home";

// Shared content sources
import { aboutContent } from "@/data/about";
import { defaultBrands } from "@/data/brands";
import { cultivars } from "@/data/cultivars";
import { galleryImages } from "@/data/gallery";
```

### Content Selection Logic

```typescript
// Selective cultivar inclusion
const showcaseCultivars = homeContent.productShowcases.productIds
  .map(id => cultivars.find(p => p.id === id))
  .filter(Boolean);

// Result: Only specified cultivars appear on home page
```

## Component Architecture

### Content-First Components

All home page components follow the content-first pattern:

```typescript
interface ComponentProps {
  content: ContentType & { styling?: SectionStyling };
  // Other props as needed
}

// Component receives structured content
export default function Component({ content, ...otherProps }: ComponentProps) {
  const { title, copy, styling } = content;

  return (
    <section className={styling?.backgroundClass || "default-class"}>
      {/* Component-specific rendering logic */}
    </section>
  );
}
```

## Styling Strategy

### Theme Preservation

The architecture preserves visual distinctions while enabling data-driven control:

- **Hero**: Internal video background (component-specific)
- **Mission**: Olive background override
- **AboutStory**: Default background (inherited)
- **Brands2**: Default background (component logic)
- **ProductShowcase**: Olive theme + white text + copper accents
- **GalleryCarousel**: Default background
- **CTA**: Surface background override

### Responsive Design

All styling configurations maintain responsive behavior through CSS classes and component logic.

## Content Management Workflow

### For Content Editors

1. **Update Content**: Edit values in `src/data/home.ts`
2. **Modify Layouts**: Change `layoutPattern` for different arrangements
3. **Adjust Styling**: Update `styling` properties for visual changes
4. **Reorder Sections**: Change component order in `page.tsx` return statement

### For Developers

1. **Add Sections**: Create new content interfaces and update `HomeContent`
2. **Modify Layouts**: Extend `layoutPattern` logic for new arrangements
3. **Create Components**: Follow content-first pattern for new sections
4. **Update Styling**: Add new `theme` variants or `backgroundClass` options

## Performance Considerations

### Bundle Optimization
- Data files are statically analyzable by Next.js
- Components can be code-split if needed
- Images are optimized through Next.js Image component

### Runtime Performance
- Data transformation happens at build time
- Component rendering is optimized through React
- No runtime data fetching required

## Future Extensibility

### Dynamic Sections
The architecture supports adding conditional sections:

```typescript
{homeContent.featuredNews && (
  <NewsSection content={homeContent.featuredNews} />
)}
```

### Advanced Layouts
Complex layout patterns can be implemented:

```typescript
layoutPattern: ["left", "right", "center", "left"] // 4-product cycle
```

### Theme Variants
Additional theme systems can be added:

```typescript
styling: {
  theme: "premium", // Could trigger special styling variants
  backgroundClass: "bg-gradient-to-br from-gold to-copper"
}
```

## Migration History

This architecture evolved through systematic standardization:

1. **Initial**: Hardcoded props and complex logic in `page.tsx`
2. **Phase 1**: Content extraction to data structures
3. **Phase 2-5**: Component conversions to content props
4. **Phase 6**: Data-driven composition logic implementation
5. **Phase 7**: Testing and documentation

## Success Metrics

- ✅ **Type Safety**: Full TypeScript coverage for all content
- ✅ **Maintainability**: Content changes require only data edits
- ✅ **Flexibility**: Layout patterns and themes are configurable
- ✅ **Performance**: No runtime overhead, build-time optimization
- ✅ **Scalability**: Easy to add new sections and modify layouts
- ✅ **Visual Consistency**: Section distinctions preserved and controllable
