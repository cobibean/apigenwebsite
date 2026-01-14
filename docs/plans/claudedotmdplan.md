# Documentation Plan for Apigen Website Project

## Overview

This plan creates a hierarchical documentation system where:
- Root Claude.md serves as an index and high-level guide
- Subdirectory Claude.md files provide deep context for specific features/systems
- Each file is designed to help AI agents quickly understand their domain before making changes

**Last Validated:** January 2026

---

## 1. /Claude.md (Root Index)

**Purpose:** Entry point for all AI agents - provides project overview and navigation to specialized documentation

### Contents:

#### Project Identity
- **What:** Cannabis brand website (Apigen) showcasing two brands (Cannada Craft & Mission)
- **Tech stack:** Next.js 15.5, React 19.1, TypeScript 5, Supabase, Tailwind v4, Framer Motion
- **Deployment:** Vercel

#### Quick Start
```bash
npm install
npm run dev
# → http://localhost:3000
```
- Required environment variables (link to ENVIRONMENT_VARIABLES.md)
- Database seeding commands

#### Architecture at a Glance
- Next.js App Router with Server/Client component split
- Hybrid CMS: Static fallbacks (src/data/) + Supabase overrides
- Admin system with Supabase Auth & RLS
- Contact form with Resend email integration

#### Navigation Map (Where to Find What)
| Scope | Claude.md Location |
|-------|-------------------|
| 🗂️ Frontend Pages | src/app/Claude.md |
| 🎨 UI Components | src/components/Claude.md |
| 📄 Page Sections | src/sections/Claude.md |
| 🗃️ Data & Content | src/data/Claude.md |
| 🔧 Utilities & APIs | src/lib/Claude.md |
| ⚙️ Config, Providers, Hooks | src/Claude.md |
| 🔒 Admin System | src/app/admin/Claude.md |
| 🌐 API Routes | src/app/api/Claude.md |
| 🛠️ Scripts & Migrations | scripts/Claude.md |
| 📚 Existing Docs | docs/Claude.md |

#### Key Concepts
- Hybrid content system (static + dynamic)
- Server-first rendering with selective client components
- Image management via Supabase Storage
- Age gate cookie verification
- HeaderContext for controlling header visibility

#### Common Tasks Quick Reference
- "Add a new page" → See src/app/Claude.md
- "Edit content" → See src/data/Claude.md or use admin UI
- "Modify admin" → See src/app/admin/Claude.md
- "Add API endpoint" → See src/app/api/Claude.md
- "Add provider/hook" → See src/Claude.md

---

## 2. /src/Claude.md (Source-Level Shared Systems)

**Purpose:** Document shared concerns at the src level: config, providers, hooks, helpers, styles, and middleware

### Contents:

#### 2.1 Configuration (config/)

**nav.config.ts**
- Navigation structure definitions
- Used by Header and Footer

**site.ts**
- Site constants: `SITE_NAME`, `SITE_URL`
- `isProductionEnv()` helper for SEO/robots decisions

#### 2.2 Providers (providers/)

**ContactModalProvider.tsx**
- Global context for opening contact modal from anywhere
- Exposes `useContactModal()` hook with `openContactModal()` method
- Wraps entire app in layout.tsx

```tsx
// Usage in any component
const { openContactModal } = useContactModal();
<button onClick={openContactModal}>Contact Us</button>
```

#### 2.3 Hooks (hooks/)

**useScrolled.ts**
- Returns boolean indicating if page has scrolled past threshold
- Used by Header for glass effect transitions

```tsx
const scrolled = useScrolled(50); // true if scrolled > 50px
```

#### 2.4 Helpers (helpers/client/)

**ScrollRestorationFix.tsx**
- Client component to fix Next.js scroll restoration behavior
- Loaded in root layout

#### 2.5 Styles (styles/)

**theme.css**
- CSS custom properties for colors, spacing, fonts
- Tailwind v4 @theme directive integration
- Variables: `--font-sans`, `--font-body`, `--font-mono`, `--font-serif`

**motion.ts & motion.css**
- Animation constants and utilities
- Shared transition durations and easings

#### 2.6 Middleware (middleware.ts)

**Auth Middleware Flow:**
1. Request matches `/admin/*` or `/api/admin/*`
2. Allow `/admin/login` without auth (avoid redirect loops)
3. Create Supabase server client with cookies
4. Check session via `getUser()`
5. Check admin role via `is_admin()` RPC
6. If no user or not admin → redirect to `/admin/login`
7. If authenticated admin → continue to route

**Configuration:**
```ts
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

**Debugging Auth Issues:**
- Check cookie settings in browser
- Verify session hasn't expired
- Check `app_users` table has correct `user_id` and `role = 'admin'`

---

## 3. /src/lib/Claude.md

**Purpose:** Document the core utilities and integrations that power the application

### Contents:

#### 3.1 Supabase Integration (supabase/)

**Client Types:**
| File | Use Case | Context |
|------|----------|---------|
| `client.ts` | Browser-side operations | "use client" components |
| `server.ts` | Server components/actions | SSR with cookies |
| `public.ts` | Anonymous/public queries | No auth needed |
| `env.ts` | Environment validation | Shared by all clients |

**When to use which:**
- **client.ts** - Form submissions, real-time subscriptions (client components)
- **server.ts** - Admin pages, protected data fetching (server components)
- **public.ts** - Content fetching, carousel images (public data)

**Environment Validation (env.ts):**
- Validates `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Returns null if missing (graceful degradation)

#### 3.2 Content Management (content.ts)

**Functions:**
| Function | Purpose |
|----------|---------|
| `getContent(slug, fallback)` | Fetch single content block |
| `getPageContent(prefix)` | Fetch all slugs for a page prefix |
| `c(map, key, fallback)` | Helper to get content with fallback |
| `getContentBatch(requests)` | Batch fetch multiple slugs |
| `getAllContentBlocks()` | Get all blocks (admin) |

**Content Slug Patterns:**
- Hierarchical structure: `page.section.field`
- Examples: `home.hero.title`, `brands.cannada-craft.heading`

#### 3.3 Carousel System (carousels.ts)

**Functions:**
| Function | Purpose |
|----------|---------|
| `getCarouselImagesBySlug(slug)` | Fetch ordered images from DB |
| `getCarouselImagesBySlugWithFallback(slug, fallback)` | With static fallback |

**Image Storage Pattern:**
- Bucket: `carousel-images`
- Path structure: `cultivars/{strain-name}/{filename}`
- Alt text stored in `images` table

#### 3.4 Other Utilities

| File | Purpose |
|------|---------|
| `seo.ts` | `buildMetadata()` for page metadata generation |
| `seoDefaults.ts` | Default SEO values |
| `validation.ts` | Form validation helpers |
| `utils.ts` | General utilities (`cn()`, `buttonClass()`) |
| `animations.ts` | Motion/animation constants |

#### 3.5 Integration Points

- Sections use `content.ts` for text + `carousels.ts` for images
- Type safety via exported interfaces
- Graceful fallback to static data when Supabase unavailable

---

## 4. /src/app/api/Claude.md

**Purpose:** Document all API routes and their integration patterns

### Contents:

#### 4.1 Contact Form API (contact/route.ts)

**Flow:**
1. POST request with JSON body
2. Validate required fields (name, company, email, country, message)
3. Save to JSON file (`/tmp` on Vercel, `data/` locally)
4. Send email via Resend API
5. Return success/error response

**Environment Variables:**
| Variable | Required | Default |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | - |
| `CONTACT_EMAIL` | No | `sunny@apigen.ca` |
| `RESEND_FROM_EMAIL` | No | `Apigen Contact Form <onboarding@resend.dev>` |

**Error Handling:**
- 400: Validation errors (missing fields)
- 502: Email send failure
- 500: General processing error

**Testing:** `tests/contactRoute.test.ts` with Vitest mocks

#### 4.2 Preview API (preview/route.ts)

**Draft Mode:**
- Enabled if `PREVIEW_SECRET` env var matches `?secret=xxx` param
- Sets draft mode cookies
- Redirects to `/`

#### 4.3 Admin Image API (admin/images/unused/delete/route.ts)

**Purpose:** Clean up orphaned images not referenced by any carousel

**Auth:** Protected by middleware (requires admin)

**Logic:**
1. Query all images from `images` table
2. Compare against `carousel_items` references
3. Delete unreferenced images from Storage + DB

#### 4.4 API Patterns

- Use `createSupabaseServerClient()` from `lib/supabase/server.ts`
- Return `NextResponse.json()` for all responses
- Include appropriate status codes

---

## 5. /src/app/admin/Claude.md

**Purpose:** Document the admin system architecture and CMS workflows

### Contents:

#### 5.1 Authentication & Authorization

**Middleware:** (src/middleware.ts)
- Guards `/admin/*` and `/api/admin/*` routes
- Redirects to `/admin/login` if not authenticated
- Checks `is_admin()` RLS function

**Login Flow:** (login/page.tsx + login/ui/AdminLoginForm.tsx)
- Email/password via Supabase Auth
- Client component for form state
- Redirect to dashboard on success

**RLS (Row-Level Security):**
- `is_admin()` function checks `app_users.role = 'admin'`
- Policies on: `content_blocks`, `carousels`, `carousel_items`, `images`

#### 5.2 Dashboard (page.tsx)

- Quick stats: carousel count, content block count
- Links to Content Editor & Carousel Manager
- Quick access list of carousels

#### 5.3 Content Editor (content/page.tsx + content/ui/ContentEditor.tsx)

**UI Pattern:**
- Groups slugs by page (Home, About, Brands, etc.)
- Textarea for each content block
- Save individual blocks or save all

**Database Operations:**
- UPSERT on `content_blocks` by slug
- Trigger auto-updates `updated_at` and `updated_by`

#### 5.4 Carousel Manager

**List View:** (carousels/page.tsx)
- All carousels with image counts
- Links to individual editors

**Editor View:** (carousels/[slug]/page.tsx + ui/CarouselEditor.tsx)
- Drag-to-reorder images (position updates)
- Upload new images to Supabase Storage
- Edit alt text per image
- Delete images with orphan cleanup

**Database Pattern:**
```
carousels (id, slug, label)
    ↓ 1:many
carousel_items (id, carousel_id, image_id, sort_order)
    ↓ many:1
images (id, bucket, path, alt_text)
```

#### 5.5 Admin Layout (layout.tsx)

- Admin navigation header
- Logout functionality
- Separate from public layout

#### 5.6 Common Admin Tasks

- **Add new content slug:** Insert into `content_blocks` via admin UI or SQL
- **Reorder carousel:** Drag images in carousel editor
- **Upload images:** Use carousel editor upload button
- **Clean unused images:** Admin dashboard or API endpoint

---

## 6. /src/sections/Claude.md

**Purpose:** Document page section components and their composition patterns

### Contents:

#### 6.1 Section Architecture

**What are Sections?**
- Full-width page building blocks in `src/sections/`
- Server components by default
- Receive content from page data via props
- Self-contained styling & layout

**Naming Convention:**
- Descriptive names: `Hero`, `AboutStory`, `BrandsUnified`
- Numbered variants: `MissionSection_1`
- CSS modules for complex animations: `*.module.css`

#### 6.2 Section Inventory (19 components)

**Homepage Sections:**
| File | Purpose |
|------|---------|
| `Hero.tsx` | Hero banner with video background, wordmark, CTA |
| `HeroWordmarkAnimated.tsx` | Animated wordmark variant (+ .module.css) |
| `MissionSection_1.tsx` | Mission statement section |
| `BrandsUnified.tsx` | Two-brand showcase (Cannada Craft + Mission) |
| `CTA.tsx` | Footer call-to-action |

**About Page:**
| File | Purpose |
|------|---------|
| `AboutStory.tsx` | Company narrative (shared with home) |
| `Team.tsx` | Team member showcase |
| `JourneyRow.tsx` | Timeline/journey display (+ .module.css) |

**Brands Page:**
| File | Purpose |
|------|---------|
| `BrandGrid.tsx` | Brand card grid |
| `BrandDetails.tsx` | Individual brand details |
| `CraftBrandSection.tsx` | Cannada Craft specific section |
| `MissionBrandSection.tsx` | Mission specific section |
| `HeroBrandCard.tsx` | Brand hero card component |
| `Brands2.tsx` | Alternate brands layout |

**Product/Cultivars:**
| File | Purpose |
|------|---------|
| `ProductShowcase.tsx` | Individual strain display |
| `GalleryCarousel.tsx` | Image gallery section |
| `LogoCloud.tsx` | Partner/brand logos |

**Shared:**
| File | Purpose |
|------|---------|
| `Footer.tsx` | Site footer with navigation |
| `Disclaimer.tsx` | Legal disclaimer section |

#### 6.3 Content Integration Pattern

```tsx
// In page.tsx
const content = await getPageContent("home");
const images = await getCarouselImagesBySlug("home-main");

// In section component
<Hero 
  content={{
    title: c(content, "hero.title", "Default Title"),
    subtitle: c(content, "hero.subtitle", "Default"),
  }}
/>
```

#### 6.4 Component Composition

Sections use components from `src/components/`:
- Motion wrappers (`Appear`, `AppearStack`)
- UI primitives (`Card`, `liquid-glass`)
- Carousels (`ProductCarousel3D`)

#### 6.5 Styling Patterns

- Tailwind utilities for layout
- CSS variables from `theme.css` (`--font-sans`, `--spacing-xl`)
- Responsive breakpoints: `md:`, `lg:`, `xl:`
- CSS modules for complex animations

#### 6.6 Adding New Sections

1. Create component in `src/sections/`
2. Define props interface with content structure
3. Import in relevant `page.tsx`
4. Add content slugs to `src/data/` or admin CMS
5. Wire up content fetching with `c()` helper

---

## 7. /src/components/Claude.md

**Purpose:** Document reusable UI components and their usage patterns

### Contents:

#### 7.1 Component Categories

**Navigation (navigation/)**
| File | Purpose |
|------|---------|
| `Header.tsx` | Main header with logo, nav links, glass effect |
| `MobileSidebar.tsx` | Slide-out mobile menu |
| `Logo.tsx` | Logo component with variants |
| `NavLink.tsx` | Individual navigation link |

**Note:** Header exports `HeaderProvider` and `useHeader()` for controlling header visibility.

**Modals (modals/)**
| File | Purpose |
|------|---------|
| `ContactModal.tsx` | Contact form (Client Component) |
| `TermsAndConditionsModal.tsx` | Terms of service |
| `PrivacyPolicyModal.tsx` | Privacy policy |
| `LegalDisclaimerModal.tsx` | Legal disclaimer |

**Motion (motion/)**
| File | Purpose |
|------|---------|
| `Appear.tsx` | Scroll-triggered fade-in wrapper |
| `AppearItem.tsx` | Individual animated item |
| `AppearStack.tsx` | Staggered animation container |
| `ScrollIndicator.tsx` | Custom scroll progress indicator |

**UI Primitives (ui/)**
| File | Purpose |
|------|---------|
| `dialog.tsx` | Radix Dialog wrapper |
| `liquid-glass.tsx` | Glassmorphism effect component |

**Feature Components (root level)**
| File | Purpose |
|------|---------|
| `ProductCarousel3D.tsx` | 3D image carousel (portrait) |
| `ProductCarousel3DLandscape.tsx` | 3D carousel (landscape) |
| `AgeGate.tsx` | Age verification modal (cookie-based) |
| `Card.tsx` | Generic card component |
| `BrandLogoCard.tsx` | Brand logo display card |
| `BrandDetailsCard.tsx` | Brand details card |
| `SeedToHarvestSuccess.tsx` | Process timeline component |
| `AppImage.tsx` | Next.js Image wrapper (use everywhere) |
| `AppLink.tsx` | Next.js Link wrapper (use everywhere) |

#### 7.2 Server vs Client Components

**Server (default):** Static rendering, no interactivity
**Client ("use client"):** Event handlers, state, browser APIs

Client components in this codebase:
- `ContactModal` (form state)
- `AgeGate` (cookie check)
- `MobileSidebar` (menu toggle)
- `Header` (scroll detection, context)
- `ProductCarousel3D` (animation state)

#### 7.3 Component Patterns

**Prop Interfaces:**
```tsx
interface HeroProps {
  content: {
    title: string;
    subtitle?: string;
  };
  images?: CarouselImage[];
}
```

**Motion Wrappers:**
```tsx
<Appear>
  <div>Content fades in on scroll</div>
</Appear>

<AppearStack stagger={0.1}>
  <AppearItem>Item 1</AppearItem>
  <AppearItem>Item 2</AppearItem>
</AppearStack>
```

**Required Wrappers:**
- Use `AppImage` instead of `next/image` directly
- Use `AppLink` instead of `next/link` directly

#### 7.4 Styling Guidelines

- Use Tailwind utilities
- CSS variables: `bg-[--bg]`, `text-[--fg]`
- Consistent spacing: `p-4`, `p-6`, `p-8`
- Responsive classes: `md:`, `lg:`, `xl:`

#### 7.5 Common Tasks

- **Create component:** Add file, define interface, export
- **Convert to client:** Add `"use client"` at top
- **Add animation:** Wrap with `Appear` or `AppearStack`
- **Form validation:** See `ContactModal` for patterns

---

## 8. /src/data/Claude.md

**Purpose:** Document static data structures and content schema

### Contents:

#### 8.1 Purpose of Static Data

- **Fallback content** when CMS is unavailable
- **Type definitions** for content structure
- **Development defaults** for rapid iteration
- **Seed data** for database initialization

#### 8.2 Data Files

| File | Contents |
|------|----------|
| `home.ts` | Hero, mission, brands, gallery, CTA, product showcases |
| `about.ts` | Company story, cards content |
| `brands.ts` | Brand definitions (Cannada Craft, Mission) |
| `cultivars.ts` | Strain definitions with terpenes, effects, flavors |
| `gallery.ts` | Fallback image collections for carousels |
| `footer.ts` | Navigation links, social links, copyright |

**Type Examples:**

```ts
// brands.ts
interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
}

// cultivars.ts
interface Strain {
  id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  thc: string;
  cbd: string;
  terpenes: string[];
  effects: string[];
  flavors: string[];
  description: string;
  images: GalleryImage[];
}
```

#### 8.3 Content Slug Patterns

Hierarchical structure: `page.section.field`

Examples:
- `home.hero.title`
- `home.hero.subtitle`
- `home.mission.lead`
- `brands.cannada-craft.heading`
- `about.cards.0.title`

#### 8.4 CMS Override Pattern

```tsx
// Static fallback
const staticData = homeContent.hero;

// CMS override
const cmsContent = await getPageContent("home");
const title = c(cmsContent, "hero.title", staticData.title);
```

#### 8.5 Seeding Database

```bash
# Seed content blocks from static data
npx tsx scripts/seed-content-supabase.ts

# Seed carousels and images
npx tsx scripts/seed-carousels-supabase.ts
```

---

## 9. /scripts/Claude.md

**Purpose:** Document build scripts, database seeding, and maintenance utilities

### Contents:

#### 9.1 Script Inventory

| Script | Purpose | Usage |
|--------|---------|-------|
| `seed-content-supabase.ts` | Populate content_blocks from static data | `npx tsx scripts/seed-content-supabase.ts` |
| `seed-carousels-supabase.ts` | Set up carousels, upload images | `npx tsx scripts/seed-carousels-supabase.ts` |
| `apply-is-admin-function.ts` | Apply is_admin() RLS function | `npx tsx scripts/apply-is-admin-function.ts` |
| `export-submissions.ts` | Export contact submissions from /tmp | `npx tsx scripts/export-submissions.ts` |
| `supabase-migrations.sql` | Database schema (run in Supabase SQL editor) | Manual |

#### 9.2 Database Schema

**Tables (run via SQL editor or migrations):**

```sql
-- content_blocks (in supabase-migrations.sql)
CREATE TABLE content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  content_type text DEFAULT 'text',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

-- carousels (create separately)
CREATE TABLE carousels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL
);

-- images (create separately)
CREATE TABLE images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  path text NOT NULL UNIQUE,
  alt_text text NOT NULL
);

-- carousel_items (junction table)
CREATE TABLE carousel_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carousel_id uuid REFERENCES carousels(id) ON DELETE CASCADE,
  image_id uuid REFERENCES images(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE(carousel_id, image_id)
);

-- app_users (admin roles)
CREATE TABLE app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE,
  role text NOT NULL DEFAULT 'user'
);
```

**Functions:**
- `is_admin()` - RLS helper checking `app_users.role = 'admin'`
- `update_updated_at()` - Trigger for auto-updating timestamps

**RLS Policies:**
- Public read for all content tables
- Admins can INSERT, UPDATE, DELETE

#### 9.3 Script Patterns

**Supabase Client in Scripts:**
```ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-only!
);
```

**TypeScript Execution:**
- Uses `tsx` (not `ts-node`)
- Run with: `npx tsx scripts/script-name.ts`

#### 9.4 When to Run Scripts

| Scenario | Script(s) |
|----------|-----------|
| Fresh Supabase setup | `supabase-migrations.sql` → `seed-content` → `seed-carousels` |
| After schema changes | Re-run migrations SQL |
| Restoring content | `seed-content-supabase.ts` |
| New carousel images | `seed-carousels-supabase.ts` |

---

## 10. /src/app/Claude.md

**Purpose:** Document Next.js App Router structure and routing patterns

### Contents:

#### 10.1 App Router Structure

- **App Router** (not Pages Router)
- File-based routing
- Nested layouts
- Server components by default

#### 10.2 Public Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Homepage with Hero, Mission, Brands, Carousel, CTA |
| `/about` | `about/page.tsx` | Company story |
| `/brands` | `brands/page.tsx` | Brand showcase |
| `/cultivars` | `cultivars/page.tsx` | Strain/product catalog |

**Homepage Pattern:**
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
      ...
    </>
  );
}
```

#### 10.3 Special Routes

| Route | Purpose |
|-------|---------|
| `/admin/*` | Admin CMS (protected) |
| `/api/*` | API endpoints |
| `not-found.tsx` | 404 page |

**Note:** The `[...slug]` catch-all directory exists but is empty (not implemented).

#### 10.4 Layout Hierarchy

**Root Layout (layout.tsx):**
- Font loading: Open Sans, Inter, IBM Plex Mono, Instrument Serif
- Providers: `HeaderProvider`, `ContactModalProvider`
- Global components: `AgeGate`, `Header`, `Footer`
- Schema.org JSON-LD

**Admin Layout (admin/layout.tsx):**
- Separate from public layout
- Admin navigation
- Logout functionality

#### 10.5 Metadata & SEO

- `src/lib/seo.ts` - `buildMetadata()` utility
- Per-page metadata exports
- Uses `src/lib/seoDefaults.ts` for fallbacks
- Robots noindex in non-production environments

#### 10.6 Common Routing Tasks

- **Add new page:** Create `route-name/page.tsx`
- **Add nested route:** Create subdirectory with `page.tsx`
- **Add dynamic route:** Use `[param]/page.tsx`
- **Protect route:** Update middleware matcher

---

## 11. /docs/Claude.md

**Purpose:** Guide to existing documentation and how to use it

### Contents:

#### 11.1 Documentation Structure

| Directory | Contents |
|-----------|----------|
| `architecture/` | System design docs (Architecture.md, Content-Architecture.md) |
| `guides/` | Setup guides, component guides, mobile status |
| `plans/` | Feature plans, sprint plans, this file |
| `style/` | Design tokens, style audit, spacing guide |

**Root Files:**
- `README.md` - Project overview
- `ENVIRONMENT_VARIABLES.md` - All env vars documented
- `Contact-Form-Setup.md` - Resend integration guide
- `Domain-Setup-Guide.md` - DNS configuration
- `EmailJS-Setup-Guide.md` - Legacy (deprecated)

#### 11.2 Key Documentation Files

| File | When to Reference |
|------|-------------------|
| `ENVIRONMENT_VARIABLES.md` | Setting up env vars |
| `architecture/Architecture.md` | Understanding system design |
| `guides/componentinventory.md` | Finding existing components |
| `style/brand-tokens.md` | Using design tokens |

#### 11.3 Maintaining Documentation

- Update when features change
- Archive outdated plans (move to `plans/archive/`)
- Add new guides for complex integrations

---

## 12. Environment Variables Reference

**Critical Addition to ENVIRONMENT_VARIABLES.md:**

| Variable | Scope | Required | Default |
|----------|-------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Both | **Yes** | - |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Both | **Yes** | - |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Yes (scripts/admin) | - |
| `RESEND_API_KEY` | Server | Yes | - |
| `RESEND_FROM_EMAIL` | Server | No | `onboarding@resend.dev` |
| `CONTACT_EMAIL` | Server | No | `sunny@apigen.ca` |
| `PREVIEW_SECRET` | Server | No | - |
| `NEXT_PUBLIC_SITE_URL` | Both | No | `http://localhost:3000` |

---

## Summary Table

| File Path | Purpose | Key Topics |
|-----------|---------|------------|
| `/Claude.md` | Root index | Overview, tech stack, navigation map, quick start |
| `/src/Claude.md` | Src-level shared | Config, providers, hooks, helpers, middleware |
| `/src/lib/Claude.md` | Utilities & integrations | Supabase clients, content system, carousels, SEO |
| `/src/app/api/Claude.md` | API routes | Contact form, preview mode, admin APIs |
| `/src/app/admin/Claude.md` | Admin system | Auth, RLS, content editor, carousel manager |
| `/src/sections/Claude.md` | Page sections | 19 sections, architecture, content patterns |
| `/src/components/Claude.md` | UI components | Component library, motion, server/client split |
| `/src/data/Claude.md` | Static data | Data structures, content schema, fallbacks |
| `/scripts/Claude.md` | Build scripts | Seeding, migrations, maintenance |
| `/src/app/Claude.md` | Routing & pages | App Router, layouts, metadata |
| `/docs/Claude.md` | Existing docs | Documentation index |

---

## File Size Estimates

Each Claude.md file should be:
- Comprehensive but not overwhelming (500-1500 lines)
- Structured with clear sections and headings
- Practical with code examples and common tasks
- Cross-referenced to related Claude.md files

---

## Next Steps (When Approved)

1. ✅ Create root `/Claude.md` as the navigation hub
2. ✅ Create `/src/Claude.md` for shared src-level concerns (NEW)
3. ✅ Create subdirectory Claude.md files in priority order:
   - `/src/lib/Claude.md` (most critical - powers everything)
   - `/src/app/admin/Claude.md` (complex system)
   - `/src/data/Claude.md` (content schema foundation)
   - `/src/components/Claude.md` & `/src/sections/Claude.md` (frontend)
   - `/scripts/Claude.md` (setup & maintenance)
   - `/src/app/api/Claude.md` (API layer)
   - `/src/app/Claude.md` (routing)
   - `/docs/Claude.md` (docs index)
4. ✅ Validate cross-references between files
5. ✅ Test with a fresh AI agent conversation

---

## Validation Notes (January 2026)

### Corrections Made:
- Fixed component names: `MobileSidebar.tsx` (not MobileNavSidebar), `NavLink.tsx` (not NavLinks), `Logo.tsx` (not HeaderLogoComplex), `CTA.tsx` (not CallToAction), `LegalDisclaimerModal.tsx` (not DisclaimerModal)
- Added missing directories: `src/config/`, `src/providers/`, `src/hooks/`, `src/helpers/`, `src/styles/`
- Added complete database schema for `carousels`, `carousel_items`, `images` tables
- Added missing environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clarified that `ProductCarousel3D` and `SeedToHarvestSuccess` are in `src/components/`, not sections
- Added motion components: `AppearItem.tsx`, `AppearStack.tsx` (previously missing)
- Corrected section count to 19 actual section components
- Added `HeaderProvider` / `useHeader()` context documentation
- Removed non-existent `LegalContent.tsx` reference
- Added `/src/Claude.md` to cover shared src-level concerns
