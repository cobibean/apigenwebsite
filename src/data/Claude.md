# src/data/ - Static Data

Static content and type definitions. Serves as fallback when CMS unavailable and seed data for database.

## Files

| File | Purpose |
|------|---------|
| `home.ts` | Homepage content (hero, mission, CTA, product showcases) |
| `about.ts` | About page content (story, cards) |
| `brands.ts` | Brand definitions (Cannada Craft, Mission) |
| `cultivars.ts` | Strain definitions (terpenes, effects, flavors) |
| `gallery.ts` | Fallback images for carousels |
| `footer.ts` | Navigation links, social links |

---

## home.ts

### Structure
```ts
export interface HomeContent {
  hero: HeroContent;
  mission: MissionContent;
  gallery: GalleryContent;
  cta: CTAContent;
  productShowcases: ProductShowcaseConfig;
  metadata: { title: string; description: string };
}

export const homeContent: HomeContent = { ... };
```

### Content Blocks
- `hero`: eyebrow, subtitle, title, copy, ctaLabel, ctaHref
- `mission`: eyebrow, taglines, lead, body, cta
- `cta`: title, copy, label, href, variant

---

## about.ts

```ts
export interface AboutContent {
  title: string;
  cards: { title: string; content: string }[];
}

export const aboutContent: AboutContent = { ... };
```

---

## brands.ts

```ts
export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
}

export const brands: Brand[] = [
  { id: "cannada-craft", name: "Cannada Craft", ... },
  { id: "mission", name: "Mission", ... },
];
```

---

## cultivars.ts

```ts
export interface Strain {
  id: string;
  name: string;
  type: "indica" | "sativa" | "hybrid";
  thc: string;
  cbd: string;
  terpenes: string[];
  effects: string[];
  flavors: string[];
  description: string;
  images: GalleryImage[];
}

export const cultivars: Strain[] = [ ... ];
```

---

## gallery.ts

Fallback images when Supabase carousels unavailable.

```ts
export interface GalleryImage {
  src: string;
  alt: string;
}

export const galleryImages: GalleryImage[] = [
  { src: "/cultivars/cadillac-rainbow/1.jpeg", alt: "..." },
  ...
];
```

---

## footer.ts

```ts
export interface FooterContent {
  navigationLinks: { label: string; href: string }[];
  socialLinks: { platform: string; url: string; icon: string }[];
  copyright: string;
}

export const footerContent: FooterContent = { ... };
```

---

## Content Slug Pattern

Static data maps to CMS slugs:

| Static Path | CMS Slug |
|-------------|----------|
| `homeContent.hero.title` | `home.hero.title` |
| `homeContent.mission.lead` | `home.mission.lead` |
| `aboutContent.cards[0].title` | `about.cards.0.title` |

---

## CMS Override Pattern

```tsx
// 1. Import static data
import { homeContent } from "@/data/home";

// 2. Fetch CMS overrides
const cmsContent = await getPageContent("home");

// 3. Merge with fallback
const title = c(cmsContent, "hero.title", homeContent.hero.title);
```

If CMS has value → use CMS.  
If CMS empty/error → use static fallback.

---

## Seeding Database

Scripts in `/scripts/` read from these files:

```bash
# Seed content_blocks from static data
npx tsx scripts/seed-content-supabase.ts

# Seed carousels from gallery + cultivar images
npx tsx scripts/seed-carousels-supabase.ts
```

---

## Adding New Static Content

1. Add/modify data in appropriate file
2. Export TypeScript types for type safety
3. Update seeding script if needed
4. Content becomes fallback if not in CMS
