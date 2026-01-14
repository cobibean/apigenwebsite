# src/app/ - Routing & Pages

Next.js App Router structure. File-based routing with server components by default.

## Directory Structure

```
app/
├── page.tsx           # Homepage (/)
├── layout.tsx         # Root layout
├── globals.css        # Global styles
├── not-found.tsx      # 404 page
├── about/page.tsx     # /about
├── brands/page.tsx    # /brands
├── cultivars/page.tsx # /cultivars
├── admin/             # Admin CMS (see admin/Claude.md)
├── api/               # API routes (see api/Claude.md)
└── [...slug]/         # Catch-all (empty, not implemented)
```

---

## Public Pages

### Homepage (page.tsx)

```tsx
export const dynamic = "force-dynamic"; // Fresh CMS data

export default async function Home() {
  const [images, content] = await Promise.all([
    getCarouselImagesBySlugWithFallback("home-main", galleryImages),
    getPageContent("home"),
  ]);

  return (
    <>
      <Hero content={...} />
      <MissionSection_1 content={...} />
      <AboutStory content={...} />
      <BrandsUnified content={...} />
      <ProductCarousel3D images={images} />
      <CTA content={...} />
    </>
  );
}
```

### About (/about)
Company story with AboutStory section.

### Brands (/brands)
Two-brand showcase (Cannada Craft + Mission).

### Cultivars (/cultivars)
Strain/product catalog with ProductShowcase sections.

---

## Root Layout (layout.tsx)

### Structure
```tsx
<html>
  <body className={fontVariables}>
    <HeaderProvider>
      <ContactModalProvider>
        <ScrollRestorationFix />
        <AgeGate />
        <Header links={...} />
        <main>{children}</main>
        <Footer content={...} />
      </ContactModalProvider>
    </HeaderProvider>
    <script type="application/ld+json">...</script>
  </body>
</html>
```

### Fonts
- Open Sans (`--font-sans`)
- Inter (`--font-body`)
- IBM Plex Mono (`--font-mono`)
- Instrument Serif (`--font-serif`)

### Global Components
- `AgeGate` - Age verification modal
- `Header` - Main navigation
- `Footer` - Site footer

### Providers
- `HeaderProvider` - Header visibility control
- `ContactModalProvider` - Global contact modal

---

## Metadata & SEO

### Per-page metadata
```tsx
import { homeContent } from "@/data/home";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};
```

### Using buildMetadata()
```tsx
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Title",
  seo: { description: "..." }
}, { slugPath: "/about" });
```

### Schema.org JSON-LD
Added in layout.tsx for organization data.

---

## Server vs Client Components

| Type | Default | Use |
|------|---------|-----|
| Server | ✅ Yes | Data fetching, SEO, static content |
| Client | `"use client"` | Interactivity, state, browser APIs |

### Page Pattern (Server)
```tsx
// page.tsx - Server Component
export default async function Page() {
  const data = await fetchData();  // ✅ Can await
  return <Section data={data} />;
}
```

### Client in Pages
For interactive parts, import client components:
```tsx
import ClientComponent from "@/components/ClientComponent";

export default function Page() {
  return (
    <div>
      <ServerContent />
      <ClientComponent />  {/* Client component */}
    </div>
  );
}
```

---

## Dynamic Rendering

Force fresh data on each request:
```tsx
export const dynamic = "force-dynamic";
```

Used on homepage for fresh CMS content.

---

## Adding New Pages

### Static Route
```bash
# Create directory and page
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

```tsx
// src/app/new-page/page.tsx
import { getPageContent, c } from "@/lib/content";

export const metadata = { title: "New Page" };

export default async function NewPage() {
  const content = await getPageContent("new-page");
  
  return (
    <section className="py-24">
      <h1>{c(content, "title", "Default Title")}</h1>
    </section>
  );
}
```

### Dynamic Route
```tsx
// src/app/products/[id]/page.tsx
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  // Fetch product by id
}
```

### Nested Layout
```tsx
// src/app/new-page/layout.tsx
export default function NewPageLayout({ children }) {
  return (
    <div className="new-page-wrapper">
      {children}
    </div>
  );
}
```

---

## Protected Routes

Admin routes (`/admin/*`) are protected by middleware.
See `src/middleware.ts` and `src/Claude.md`.
