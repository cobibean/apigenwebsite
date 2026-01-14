# src/lib/ - Utilities & Integrations

Core utilities powering the application: Supabase clients, content system, carousels, SEO.

## Directory Structure

```
lib/
├── supabase/
│   ├── client.ts    # Browser client
│   ├── server.ts    # Server component client
│   ├── public.ts    # Anonymous queries
│   └── env.ts       # Environment validation
├── content.ts       # CMS content fetching
├── carousels.ts     # Carousel image fetching
├── seo.ts           # Metadata generation
├── seoDefaults.ts   # Default SEO values
├── validation.ts    # Form validation
├── utils.ts         # General utilities (cn, buttonClass)
└── animations.ts    # Motion constants
```

---

## Supabase Clients (supabase/)

### Which client to use?

| File | Context | Use Case |
|------|---------|----------|
| `client.ts` | `"use client"` components | Form submissions, real-time |
| `server.ts` | Server components, API routes | Admin pages, protected data |
| `public.ts` | Either | Public content, carousels |

### client.ts
```ts
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
const supabase = createSupabaseBrowserClient();
// Returns null if env vars missing
```

### server.ts
```ts
import { createSupabaseServerClient } from "@/lib/supabase/server";
const supabase = await createSupabaseServerClient();
// Uses cookies for SSR auth
```

### public.ts
```ts
import { createSupabasePublicClient } from "@/lib/supabase/public";
const supabase = createSupabasePublicClient();
// No auth, read-only public data
```

### env.ts
Validates `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Returns null if missing (graceful degradation).

---

## Content System (content.ts)

### Functions

| Function | Purpose |
|----------|---------|
| `getContent(slug, fallback)` | Fetch single content block |
| `getPageContent(prefix)` | Fetch all slugs for a page |
| `c(map, key, fallback)` | Get content with fallback |
| `getContentBatch(requests)` | Batch fetch multiple slugs |
| `getAllContentBlocks()` | Get all blocks (admin) |

### Content Slug Pattern
Hierarchical: `page.section.field`
- `home.hero.title`
- `home.mission.lead`
- `brands.cannada-craft.heading`

### Usage Pattern
```tsx
// In page.tsx
const content = await getPageContent("home");

// In component
const title = c(content, "hero.title", "Default Title");
const subtitle = c(content, "hero.subtitle", "Default Subtitle");
```

### Type
```ts
type ContentBlock = {
  id: string;
  slug: string;
  content: string;
  content_type: "text" | "markdown" | "rich";
  updated_at: string;
};
```

---

## Carousel System (carousels.ts)

### Functions

| Function | Purpose |
|----------|---------|
| `getCarouselImagesBySlug(slug)` | Fetch ordered images, returns null if not found |
| `getCarouselImagesBySlugWithFallback(slug, fallback)` | With static fallback |

### Usage
```tsx
import { galleryImages } from "@/data/gallery";
const images = await getCarouselImagesBySlugWithFallback("home-main", galleryImages);
```

### Return Type
```ts
type CarouselImage = { src: string; alt: string; priority?: boolean };
```

### Database Structure
```
carousels (slug, label)
    ↓ 1:many
carousel_items (carousel_id, image_id, sort_order)
    ↓ many:1
images (bucket, path, alt_text)
```

Storage bucket: `carousel-images`

---

## SEO (seo.ts)

### buildMetadata()
```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Title",
  seo: {
    description: "Page description",
    ogImage: "/og-image.png",
  }
}, { slugPath: "/about" });
```

Uses defaults from `seoDefaults.ts`. Respects `isProductionEnv()` for robots.

---

## Other Utilities

### utils.ts
```ts
import { cn, buttonClass } from "@/lib/utils";

// Merge class names (clsx + tailwind-merge)
className={cn("base-class", conditional && "conditional-class")}

// Get button styling
className={buttonClass("primary")} // or "secondary", "ghost"
```

### validation.ts
Form validation helpers for contact form.

### animations.ts
Motion/animation constants for Framer Motion.

---

## Integration Pattern

Sections typically combine content + carousels:

```tsx
// page.tsx
export default async function Page() {
  const [images, content] = await Promise.all([
    getCarouselImagesBySlugWithFallback("page-carousel", fallbackImages),
    getPageContent("page"),
  ]);

  return <Section content={content} images={images} />;
}

// Section.tsx
function Section({ content, images }) {
  return (
    <div>
      <h1>{c(content, "title", "Default")}</h1>
      <Carousel images={images} />
    </div>
  );
}
```
