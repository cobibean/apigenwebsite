# Copy/Text CMS Plan

## Goal
Enable admin editing of all site copy/text through Supabase, using the same pattern as the carousel admin portal.

---

## Architecture

### Data Model

```sql
CREATE TABLE content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,        -- "home.hero.title", "about.mission.body"
  content text NOT NULL,             -- the actual text
  content_type text DEFAULT 'text',  -- 'text', 'markdown', 'rich'
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);
```

### Slug Convention
Hierarchical dot notation matching the data file structure:
- `home.hero.title`
- `home.hero.subtitle`
- `home.mission.eyebrow`
- `home.mission.body`
- `about.story.title`
- `brands.craft.tagline`
- `cultivars.cadillac-rainbow.growersNote`

### Runtime Pattern

```ts
// src/lib/content.ts
export async function getContent(slug: string, fallback: string): Promise<string> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallback;

  const { data } = await supabase
    .from("content_blocks")
    .select("content")
    .eq("slug", slug)
    .maybeSingle();

  return data?.content ?? fallback;
}
```

### Usage in Pages

```tsx
// Before (static):
<h1>{homeContent.hero.title}</h1>

// After (DB with fallback):
<h1>{await getContent("home.hero.title", homeContent.hero.title)}</h1>
```

---

## Milestones

### A — Database Schema
- [ ] Create `content_blocks` table
- [ ] Enable RLS (public read, admin write)
- [ ] Add admin user to `app_users` if not exists

### B — Content Library
- [ ] Create `src/lib/content.ts` with `getContent()` and `getContentBatch()`
- [ ] Add caching layer (optional, for perf)

### C — Admin UI
- [ ] Add `/admin/content` page
- [ ] List all content blocks grouped by page/section
- [ ] Inline edit with save button
- [ ] Optional: rich text editor for markdown content

### D — Page Integration
- [ ] Update Home page to use `getContent()`
- [ ] Update About page
- [ ] Update Brands page
- [ ] Update Cultivars page
- [ ] Keep static `src/data/*.ts` as fallbacks

### E — Seed Script
- [ ] Create `scripts/seed-content-supabase.ts`
- [ ] Extract all strings from `src/data/*.ts`
- [ ] Populate `content_blocks` table

---

## Content Inventory

### Home Page (`src/data/home.ts`)
| Slug | Current Value |
|------|---------------|
| `home.hero.eyebrow` | "Apigen" |
| `home.hero.subtitle` | "PREMIUM QUALITY DRIED CANNABIS EXPORTER" |
| `home.hero.title` | "Premium dried cannabis, exported consistently." |
| `home.hero.copy` | "Ethical, compliant, patient-first." |
| `home.hero.ctaLabel` | "Get in touch" |
| `home.mission.eyebrow` | "Our Mission" |
| `home.mission.taglinePrimary` | "TO SET A NEW INDUSTRY..." |
| `home.mission.taglineSecondary` | "PREMIUM MEDICINAL..." |
| `home.mission.lead` | "We're not just providing..." |
| `home.mission.body` | "Uncompromising pharmaceutical-grade..." |
| `home.gallery.title` | "Our Premium Strains" |
| `home.gallery.subtitle` | "Explore Cadillac Rainbow..." |
| `home.cta.title` | "Ready to talk?" |

### About Page (`src/data/about.ts`)
- `about.story.*` fields

### Brands Page (`src/data/brands.ts`)
- Per-brand: `brands.{id}.tagline`, `brands.{id}.description`, etc.

### Cultivars Page (`src/data/cultivars.ts`)
- Per-strain: `cultivars.{id}.growersNote`, `cultivars.{id}.tasting.*`, etc.

---

## Admin UI Design

### Content List View
```
/admin/content

┌─────────────────────────────────────────────────┐
│ Content Management                              │
├─────────────────────────────────────────────────┤
│ 📄 Home Page                                    │
│   ├─ hero.title: "Premium dried cannabis..."   │
│   ├─ hero.subtitle: "PREMIUM QUALITY..."       │
│   └─ mission.body: "Uncompromising..."         │
│                                                 │
│ 📄 About Page                                   │
│   └─ story.title: "Our Story"                  │
│                                                 │
│ 📄 Brands                                       │
│   ├─ craft.tagline: "..."                      │
│   └─ mission.tagline: "..."                    │
└─────────────────────────────────────────────────┘
```

### Edit Mode
Click any row → inline textarea expands → Save/Cancel buttons

---

## Open Questions

1. **Rich text?** Some fields (like `mission.body`) might benefit from markdown or basic formatting. Use a lightweight editor like TipTap?

2. **Versioning?** Should we track history of changes? Could add a `content_history` table.

3. **Preview?** Similar to carousel preview — show changes before publishing?

4. **Batch updates?** Allow editing multiple fields at once, single save?

---

## Future Extensions

- **Localization**: Add `locale` column for multi-language support
- **Scheduled publishing**: Add `published_at` and `expires_at` columns
- **A/B testing**: Multiple content variants per slug
