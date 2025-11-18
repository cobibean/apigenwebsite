# Content Architecture

## Overview

This document outlines the standardized content management architecture implemented across the Apigen website. All pages (except the home page) now follow a consistent `data file → section component → page` pattern for better maintainability, type safety, and content management.

## Architecture Pattern

```
Data File → Section Component → Page Component
```

### Benefits
- **Centralized Content**: All content lives in `/src/data` files
- **Type Safe**: TypeScript interfaces ensure content structure consistency
- **Maintainable**: Content changes require only data file edits
- **Reusable**: Components accept content props, enabling reuse
- **SEO Ready**: Page metadata pulls from data files
- **Developer Friendly**: Clear, predictable patterns across all pages

## Directory Structure

### Data Layer (`src/data/`)

```
src/data/
├── brands.ts          # Brand content (existing)
├── cultivars.ts       # Cultivar + page content
├── about.ts           # About page content
└── footer.ts          # Footer content
```

### Component Layer (`src/sections/`)

```
src/sections/
├── CraftBrandSection.tsx      # Handles Cannada Craft brand
├── MissionBrandSection.tsx    # Handles Mission brand
├── AboutStory.tsx             # About page content (reusable)
├── Footer.tsx                 # Footer (data-driven)
├── Hero.tsx                   # Home page hero (not standardized)
├── MissionSection_1.tsx       # Home page section (not standardized)
├── ProductShowcase.tsx        # Cultivar showcase components
├── GalleryCarousel.tsx        # Image gallery component
└── [other components...]
```

### Page Layer (`src/app/`)

```
src/app/
├── layout.tsx         # Root layout (uses footer data)
├── page.tsx           # Home page (not standardized)
├── brands/
│   └── page.tsx       # Uses brand data
├── cultivars/
│   └── page.tsx       # Uses cultivars data
├── about/
│   └── page.tsx       # Uses about data
└── [...slug]/
    └── page.tsx       # Dynamic pages (future)
```

## Data File Specifications

### brands.ts
```typescript
export interface Brand {
  id: string;
  name: string;
  logo: string;
  heading: string;
  body: string[];
  attributes: Array<{ label: string; value: string }>;
  highlights: Array<{ title: string; description: string }>;
}

export const brands: Brand[] = [/* brand data */];
```

### cultivars.ts
```typescript
export interface Strain {
  id: string;
  title: string;
  eyebrow?: string;
  provenance?: string;
  tasting: {
    nose: string[];
    palate: string[];
    finish: string[];
  };
  growersNote?: string;
  chemistry?: {/* chemistry data */};
  cure?: string;
  trim?: string;
  images: { src: string; alt: string; priority?: boolean }[];
  availability?: string;
  coaUrl?: string;
}

export interface CultivarsContent {
  galleryTitle: string;
  gallerySubtitle: string;
  pageTitle: string;
  pageDescription: string;
}

export const cultivars: Strain[] = [/* cultivar data */];
export const cultivarsContent: CultivarsContent = {/* page content */};
```

### about.ts
```typescript
export interface AboutCard {
  title: string;
  content: string;
}

export interface AboutContent {
  title: string;
  cards: AboutCard[];
}

export const aboutContent: AboutContent = {/* about content */};
```

### footer.ts
```typescript
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  copyrightPrefix: string;
  disclaimer: string;
  navigationLinks: FooterLink[];
}

export const footerContent: FooterContent = {/* footer content */};
export function getCopyrightText(prefix: string): string {/* utility */};
```

## Component Interface Patterns

### Content-Prop Pattern
```typescript
interface ComponentProps {
  content: ContentType;
  preview?: boolean;
}

export default function ComponentName({ content, preview }: ComponentProps) {
  const { /* destructure content */ } = content;
  // Component logic
}
```

### Usage Pattern
```typescript
// In page components
import { contentData } from "@/data/contentFile";
import ComponentName from "@/sections/ComponentName";

export default function PageName() {
  return <ComponentName content={contentData} />;
}
```

## Implementation Status

- ✅ **Brands Page**: Fully standardized (existing)
- ✅ **Cultivars Page**: Fully standardized
- ✅ **About Page**: Fully standardized
- ✅ **Footer**: Fully standardized
- ❌ **Home Page**: Not standardized (uses mixed content approach)
- ❌ **Dynamic Pages**: Not yet implemented (infrastructure ready)

## Content Management Workflow

### For Content Editors
1. Edit content in `/src/data/[page].ts` files
2. Content changes are automatically reflected on pages
3. TypeScript ensures content structure validity
4. No code changes required for content updates

### For Developers
1. Create new data file in `/src/data/` with TypeScript interfaces
2. Create/update section component to accept content prop
3. Update page component to import and pass data
4. All content changes are type-safe and validated at compile time

## Future Extensions

### Dynamic Pages
The architecture supports easy addition of dynamic pages like:
- `/for-doctors`
- `/for-pharmacists`
- `/for-patients`

Simply create new data files and follow the established pattern.

### Rich Text Support
Components can be extended to support rich text content (markdown, HTML) by updating interfaces and adding parsing logic.

### Internationalization
The data-driven approach makes i18n straightforward by creating language-specific data files.

## Maintenance Guidelines

### Data File Rules
- Always include TypeScript interfaces for all content structures
- Use descriptive property names
- Include comments for complex data structures
- Validate content structure changes don't break existing usage

### Component Rules
- Always accept content via props, never hardcode defaults
- Destructure content at the top of components
- Use TypeScript interfaces for all props
- Keep components focused on presentation logic only

### Page Rules
- Import content from data files
- Pass content as props to components
- Include page metadata from data files when possible
- Keep page components thin and focused on composition

## Migration History

This architecture was implemented in phases:

1. **Phase 1**: About page standardization
2. **Phase 2**: Cultivars page standardization
3. **Phase 3**: Footer standardization (high priority)
4. **Phase 4**: Dynamic pages infrastructure (future)

See `/docs/plans/Content-Management-Standardization-Plan.md` for detailed migration planning and implementation notes.
