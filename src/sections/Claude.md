# src/sections/ - Page Sections

Full-width page building blocks. Server components by default.

## What are Sections?

- **Full-width** page blocks (vs. reusable components in `src/components/`)
- **Server components** by default (receive data via props)
- **Self-contained** styling and layout
- Compose together in `page.tsx` files

---

## Section Inventory

### Homepage
| File | Purpose |
|------|---------|
| `Hero.tsx` | Hero with video background, wordmark, CTA |
| `HeroWordmarkAnimated.tsx` | Animated wordmark variant |
| `MissionSection_1.tsx` | Mission statement section |
| `BrandsUnified.tsx` | Two-brand showcase |
| `CTA.tsx` | Footer call-to-action |

### About
| File | Purpose |
|------|---------|
| `AboutStory.tsx` | Company narrative (shared with home) |
| `Team.tsx` | Team member showcase |
| `JourneyRow.tsx` | Timeline/journey display |

### Brands
| File | Purpose |
|------|---------|
| `BrandGrid.tsx` | Brand card grid |
| `BrandDetails.tsx` | Individual brand details |
| `CraftBrandSection.tsx` | Cannada Craft section |
| `MissionBrandSection.tsx` | Mission section |
| `HeroBrandCard.tsx` | Brand hero card |
| `Brands2.tsx` | Alternate brands layout |

### Products/Cultivars
| File | Purpose |
|------|---------|
| `ProductShowcase.tsx` | Individual strain display |
| `GalleryCarousel.tsx` | Image gallery section |
| `LogoCloud.tsx` | Partner/brand logos |

### Shared
| File | Purpose |
|------|---------|
| `Footer.tsx` | Site footer |
| `Disclaimer.tsx` | Legal disclaimer |

### CSS Modules
- `HeroWordmarkAnimated.module.css`
- `JourneyRow.module.css`

---

## Content Integration Pattern

```tsx
// page.tsx
import { getPageContent, c } from "@/lib/content";
import { getCarouselImagesBySlugWithFallback } from "@/lib/carousels";
import Hero from "@/sections/Hero";

export default async function Page() {
  const content = await getPageContent("home");
  
  return (
    <Hero
      content={{
        title: c(content, "hero.title", "Default Title"),
        subtitle: c(content, "hero.subtitle", "Default"),
        ctaLabel: c(content, "hero.ctaLabel", "Contact"),
      }}
    />
  );
}
```

---

## Section Props Pattern

```tsx
interface HeroProps {
  content: {
    title: string;
    subtitle?: string;
    ctaLabel: string;
    ctaHref?: string;
  };
  // Visual customization
  wordmarkMaxWidth?: string;
  subtitleStyle?: "text" | "badge";
}

export default function Hero({ content, wordmarkMaxWidth = "70%" }: HeroProps) {
  return (
    <section className="relative min-h-screen">
      <h1>{content.title}</h1>
      {/* ... */}
    </section>
  );
}
```

---

## Styling Patterns

### Tailwind Utilities
```tsx
<section className="py-16 md:py-24 lg:py-32 bg-[--background]">
```

### CSS Variables (from theme.css)
- `--font-sans`, `--font-body`, `--font-serif`
- `--spacing-xl`, `--spacing-2xl`
- Color tokens

### Responsive Breakpoints
- `md:` (768px) - Tablet
- `lg:` (1024px) - Desktop
- `xl:` (1280px) - Large desktop

### CSS Modules (for complex animations)
```tsx
import styles from "./HeroWordmarkAnimated.module.css";
<div className={styles.wordmark}>...</div>
```

---

## Using Components in Sections

Sections compose components from `src/components/`:

```tsx
import { Appear } from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";

export default function AboutStory({ content }) {
  return (
    <section>
      <Appear>
        <h2>{content.title}</h2>
      </Appear>
      <AppLink href="/about">Learn more</AppLink>
    </section>
  );
}
```

---

## Adding New Sections

1. Create file in `src/sections/`
2. Define props interface with content structure
3. Keep as server component (no `"use client"`) unless needs interactivity
4. Import in relevant `page.tsx`
5. Add content slugs to `src/data/` or admin CMS
6. Wire up with `c()` helper

```tsx
// NewSection.tsx
interface NewSectionProps {
  content: {
    title: string;
    body: string;
  };
}

export default function NewSection({ content }: NewSectionProps) {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2>{content.title}</h2>
        <p>{content.body}</p>
      </div>
    </section>
  );
}

// In page.tsx
const content = await getPageContent("page");
<NewSection content={{
  title: c(content, "section.title", "Default"),
  body: c(content, "section.body", "Default body"),
}} />
```
