# Content Management Standardization Plan

## Overview
Standardize content management across all pages (except home) using the brands page as a template. Implement a consistent `data file → section component → page` architecture for better maintainability and content management.

## Current State Analysis

### ✅ Data-Driven (Template: Brands Page)
- **brands page**: `src/data/brands.ts` → `CraftBrandSection.tsx` + `MissionBrandSection.tsx` → `src/app/brands/page.tsx`

### ❌ Inconsistent Patterns (Need Migration)

#### About Page
- **Current**: `AboutStory.tsx` has hardcoded `DEFAULT_TITLE` and `DEFAULT_CARDS` constants
- **Page**: `src/app/about/page.tsx` (simple wrapper around `AboutStory`)

#### Products Page
- **Current**: Uses `src/data/products.ts` and `src/data/gallery.ts` ✅, but hardcodes gallery title/subtitle
- **Page**: `src/app/products/page.tsx`

#### Other Pages
- **Footer**: Has hardcoded `defaults` array for links
- **Various sections**: Mix of prop defaults and hardcoded strings

## Target Architecture

### Pattern: `data file → section component → page`

```
src/data/[page].ts          # Content data & types
    ↓
src/sections/[Page]Section.tsx  # Pure component (no defaults)
    ↓
src/app/[page]/page.tsx         # Page composition
```

### Benefits
- **Consistent**: All pages follow same pattern
- **Maintainable**: Content changes don't require code changes
- **Type-safe**: TypeScript interfaces for all content
- **Modular**: Easy to reuse sections with different content
- **SEO-ready**: Page metadata can pull from data files

## Migration Plan

### Phase 1: About Page Migration

#### 1.1 Create Data File
**File**: `src/data/about.ts`
```typescript
export interface AboutCard {
  title: string;
  content: string;
}

export interface AboutContent {
  title: string;
  cards: AboutCard[];
}

export const aboutContent: AboutContent = {
  title: "Our Story",
  cards: [
    {
      title: "Generations of Farming Heritage",
      content: "..."
    },
    // ... rest of cards
  ]
};
```

#### 1.2 Refactor AboutStory Component
**File**: `src/sections/AboutStory.tsx`
- Remove `DEFAULT_TITLE` and `DEFAULT_CARDS` constants
- Change props to require `content: AboutContent`
- Update component to use passed content instead of defaults

#### 1.3 Update About Page
**File**: `src/app/about/page.tsx`
```typescript
import { aboutContent } from "@/data/about";
import AboutStory from "@/sections/AboutStory";

export default function AboutPage() {
  return <AboutStory content={aboutContent} />;
}
```

### Phase 2: Products Page Migration

#### 2.1 Extend Products Data File
**File**: `src/data/products.ts`
```typescript
export interface ProductsContent {
  galleryTitle: string;
  gallerySubtitle: string;
  pageTitle: string;
  pageDescription: string;
}

export const productsContent: ProductsContent = {
  galleryTitle: "Product Gallery",
  gallerySubtitle: "Explore our premium dried cannabis flowers up close",
  pageTitle: "Products | Apigen",
  pageDescription: "..."
};
```

#### 2.2 Refactor GalleryCarousel Usage
**File**: `src/app/products/page.tsx`
```typescript
import { products, productsContent } from "@/data/products";
// Remove hardcoded title/subtitle, use from data
<GalleryCarousel
  title={productsContent.galleryTitle}
  subtitle={productsContent.gallerySubtitle}
  images={galleryImages}
/>
```

### Phase 3: Footer Standardization (HIGH PRIORITY - CAUTION)

#### 3.1 Analyze Current Footer Usage
**Critical Analysis:**
- Footer is used in `src/app/layout.tsx` (global component)
- Currently receives `links` prop from `NAV_LINKS` constant in layout
- Has internal `defaults` array (different from NAV_LINKS)
- Has dynamic copyright with `getCurrentYear()` function
- Breaking changes here affect the entire site

#### 3.2 Create Comprehensive Footer Data File
**File**: `src/data/footer.ts`
```typescript
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  copyrightPrefix: string; // e.g., "© Apigen "
  disclaimer: string;
  navigationLinks: FooterLink[]; // Main navigation (from layout)
  legalLinks: FooterLink[]; // Footer-specific links (privacy, etc.)
}

export const footerContent: FooterContent = {
  copyrightPrefix: "© Apigen ",
  disclaimer: "Legal Disclaimer",
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Brands", href: "/brands" },
    { label: "Contact", href: "/contact" },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ]
};

// Utility function for dynamic copyright
export function getCopyrightText(prefix: string): string {
  return `${prefix}${new Date().getFullYear()}`;
}
```

#### 3.3 Refactor Footer Component (BREAKING CHANGE)
**File**: `src/sections/Footer.tsx`
- Remove hardcoded `defaults` array
- Remove internal `getCurrentYear()` function
- Change props to accept `content: FooterContent`
- Update to use `getCopyrightText()` from data file
- Combine navigation and legal links appropriately in layout

#### 3.4 Update Layout Usage
**File**: `src/app/layout.tsx`
```typescript
import { footerContent, getCopyrightText } from "@/data/footer";
import Footer from "@/sections/Footer";

// Remove NAV_LINKS from layout
// Footer now gets content from data file
<Footer content={footerContent} />
```

#### 3.5 Footer Migration Checklist
- [ ] **PRE-MIGRATION**: Document current footer behavior and take screenshots
- [ ] Create footer data file with comprehensive interfaces
- [ ] Temporarily support both old and new props in Footer component (backward compatibility)
- [ ] Update layout.tsx to use new data structure
- [ ] Test all pages load without console errors
- [ ] Verify navigation links work on all pages
- [ ] Verify disclaimer modal opens/closes correctly
- [ ] Test responsive layout (mobile: stacked, desktop: grid)
- [ ] Verify copyright shows current year correctly
- [ ] Check hover/focus states on all interactive elements
- [ ] **POST-MIGRATION**: Remove old prop support and defaults from Footer component
- [ ] Final comprehensive test of entire site functionality

### Phase 4: Dynamic Pages Setup (Future)

#### 4.1 Create Content Type System
For pages like `/for-doctors`, `/for-pharmacists`, etc.:
- Generic content interface for text-heavy pages
- Support for rich text, CTAs, etc.

## Implementation Order

1. **About Page** (simplest - single component, low risk)
2. **Products Page** (extend existing data file, low risk)
3. **Footer** (⚠️ HIGH PRIORITY - global component, high risk, requires careful testing)
4. **Dynamic Pages** (setup infrastructure for future pages)

## Migration Checklist

### For Each Page Migration:
- [ ] Create `src/data/[page].ts` with TypeScript interfaces
- [ ] Define content structure and populate data
- [ ] Refactor section component(s) to accept content prop
- [ ] Remove hardcoded defaults/constants from components
- [ ] Update page component to import and pass data
- [ ] Update page metadata to use data-driven titles/descriptions
- [ ] Test page functionality
- [ ] Verify TypeScript compilation
- [ ] Check responsive design/layout

## Benefits After Migration

### Developer Experience
- **Predictable**: Know exactly where to find/modify content
- **Type-safe**: Catch content structure errors at compile time
- **Intuitive**: Follow established patterns

### Content Management
- **Centralized**: All content in `/data` directory
- **Version controlled**: Content changes tracked in git
- **Collaborative**: Non-technical team members can edit content files
- **Consistent**: Same structure across all pages

### Maintainability
- **DRY**: No duplicate content or hardcoded strings
- **Modular**: Easy to reuse components with different content
- **Scalable**: Easy to add new pages following the pattern

## Risks & Considerations

### Breaking Changes ⚠️
- **Footer Migration (HIGH RISK)**: Footer is used globally in layout.tsx. Changes affect entire site. Must maintain backward compatibility during transition.
- **Component Props**: Changing component interfaces requires updating all usage sites
- **Navigation Links**: Footer currently receives NAV_LINKS from layout - must preserve this relationship

### Migration Strategy
- **Phased Approach**: Implement page-by-page to minimize disruption
- **Footer First Priority**: Test footer changes extensively before proceeding
- **Backward Compatibility**: Keep old props as fallbacks during transition
- **Comprehensive Testing**: Full site functionality testing after each migration

### Footer-Specific Risks
- **Layout Impact**: Footer changes could affect responsive layout or positioning
- **Navigation Disruption**: Breaking navigation links would affect entire user experience
- **Modal Functionality**: Legal disclaimer modal must continue working
- **Dynamic Content**: Copyright year generation must be preserved
- **Styling Dependencies**: Complex responsive layout must be maintained

### Content Structure
- **Type Safety First**: Define interfaces carefully - changing them later is expensive
- **Rich Text Support**: Consider markdown/HTML support for complex content
- **Internationalization**: Plan for i18n if expanding to multiple languages
- **Content Validation**: Add runtime validation for critical content fields

## Success Criteria

- [ ] All pages (except home) use data-driven content
- [ ] No hardcoded content strings in components
- [ ] Consistent `data file → component → page` pattern
- [ ] TypeScript interfaces for all content structures
- [ ] Content easily editable by non-technical team members
- [ ] All existing functionality preserved
- [ ] No breaking changes to user experience

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (About Page) implementation
3. Test thoroughly before proceeding to next phase
4. Document any adjustments needed to the plan during implementation
