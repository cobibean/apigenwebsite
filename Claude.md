# Apigen Website

Cannabis brand website showcasing Cannada Craft & Mission brands.

## Tech Stack
Next.js 15 (App Router) • React 19 • TypeScript • Supabase • Tailwind v4 • Framer Motion • Vercel

## Quick Start
```bash
npm install && npm run dev  # → http://localhost:3000
```

## Required Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL      # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Supabase anon key
RESEND_API_KEY                # For contact form
```
See `ENVIRONMENT_VARIABLES.md` for full list.

## Architecture
- **Hybrid CMS**: Static fallbacks (`src/data/`) + Supabase overrides
- **Server-first**: Server components default, `"use client"` for interactivity
- **Admin**: Protected by middleware + RLS (`/admin/*`)

## Navigation Map

| What | Claude.md |
|------|-----------|
| Config, Providers, Hooks, Middleware | `src/Claude.md` |
| Supabase, Content, Carousels, SEO | `src/lib/Claude.md` |
| Admin CMS System | `src/app/admin/Claude.md` |
| API Routes | `src/app/api/Claude.md` |
| Page Routing | `src/app/Claude.md` |
| UI Components | `src/components/Claude.md` |
| Page Sections | `src/sections/Claude.md` |
| Static Data | `src/data/Claude.md` |
| Build Scripts | `scripts/Claude.md` |
| Existing Docs | `docs/Claude.md` |

## Key Patterns

**Content fetching:**
```tsx
const content = await getPageContent("home");
const title = c(content, "hero.title", "Fallback");
```

**Carousel images:**
```tsx
const images = await getCarouselImagesBySlugWithFallback("home-main", fallbackImages);
```

**Required wrappers:** Use `AppLink` and `AppImage` instead of Next.js primitives.

## Common Tasks
- **Add page**: Create `src/app/route-name/page.tsx`
- **Edit content**: Admin UI at `/admin/content` or edit `src/data/*.ts`
- **Add component**: See `src/components/Claude.md`
- **Database setup**: Run `scripts/supabase-migrations.sql`, then seed scripts
