# scripts/ - Build & Maintenance

Database seeding, migrations, and maintenance utilities.

## Script Inventory

| Script | Purpose | Usage |
|--------|---------|-------|
| `supabase-migrations.sql` | Database schema | Run in Supabase SQL Editor |
| `seed-content-supabase.ts` | Seed content_blocks | `npx tsx scripts/seed-content-supabase.ts` |
| `seed-carousels-supabase.ts` | Seed carousels + images | `npx tsx scripts/seed-carousels-supabase.ts` |
| `apply-is-admin-function.ts` | Apply is_admin() RLS function | `npx tsx scripts/apply-is-admin-function.ts` |
| `export-submissions.ts` | Export contact form data | `npx tsx scripts/export-submissions.ts` |

---

## Fresh Database Setup

Run in this order:

```bash
# 1. Run migrations in Supabase SQL Editor
#    Copy/paste supabase-migrations.sql

# 2. Create additional tables (if not in migrations)
#    See "Complete Schema" section below

# 3. Create admin user in Supabase Auth Dashboard
#    Copy UUID, then run:
#    INSERT INTO app_users (user_id, role) VALUES ('uuid', 'admin');

# 4. Seed content
npx tsx scripts/seed-content-supabase.ts

# 5. Seed carousels (requires images in public/)
npx tsx scripts/seed-carousels-supabase.ts
```

---

## Complete Database Schema

### In supabase-migrations.sql:
- `content_blocks` table
- `is_admin()` function
- `update_updated_at()` trigger

### Create separately:

```sql
-- Carousels
CREATE TABLE carousels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL
);
ALTER TABLE carousels ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read carousels" ON carousels FOR SELECT USING (true);
CREATE POLICY "Admins manage carousels" ON carousels FOR ALL USING (is_admin());

-- Images
CREATE TABLE images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  path text NOT NULL UNIQUE,
  alt_text text NOT NULL
);
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read images" ON images FOR SELECT USING (true);
CREATE POLICY "Admins manage images" ON images FOR ALL USING (is_admin());

-- Carousel Items (junction table)
CREATE TABLE carousel_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carousel_id uuid REFERENCES carousels(id) ON DELETE CASCADE,
  image_id uuid REFERENCES images(id) ON DELETE CASCADE,
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE(carousel_id, image_id)
);
ALTER TABLE carousel_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read carousel_items" ON carousel_items FOR SELECT USING (true);
CREATE POLICY "Admins manage carousel_items" ON carousel_items FOR ALL USING (is_admin());

-- App Users (admin roles)
CREATE TABLE app_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE,
  role text NOT NULL DEFAULT 'user'
);
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own" ON app_users FOR SELECT USING (auth.uid() = user_id);
```

---

## seed-content-supabase.ts

Populates `content_blocks` from static data in `src/data/`.

### What it does:
1. Reads from `src/data/*.ts` files
2. Flattens to slug → content map
3. UPSERTs into `content_blocks`

### Safe to re-run:
Uses UPSERT, won't duplicate entries.

---

## seed-carousels-supabase.ts

Sets up carousels with images from `public/` directory.

### What it does:
1. Validates local image files exist
2. Loads carousel definitions
3. Uploads images to `carousel-images` bucket
4. Creates `images` table entries
5. Links via `carousel_items` with sort order

### Prerequisites:
- Carousel rows must exist in `carousels` table
- Images must exist in `public/cultivars/` or `public/hero/`

---

## Script Patterns

### Supabase Client Usage
```ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-only!
);
```

### TypeScript Execution
Uses `tsx` (not `ts-node`):
```bash
npx tsx scripts/script-name.ts
```

### Error Handling
- Check `error` from Supabase responses
- Log successes and failures
- Exit with appropriate code

---

## When to Run Scripts

| Scenario | Scripts |
|----------|---------|
| Fresh Supabase project | migrations → seed-content → seed-carousels |
| Schema changes | Re-run relevant migrations |
| Restore content | seed-content-supabase.ts |
| New carousel images | seed-carousels-supabase.ts |
| Export contacts | export-submissions.ts |

---

## Maintenance

### Image Cleanup
Orphaned images (not in any carousel):
- **Admin UI**: Individual carousel editors
- **API**: `DELETE /api/admin/images/unused/delete`
- **Manual**: Supabase Dashboard → Storage → `carousel-images`

### Contact Submissions
Stored in `/tmp` on Vercel (ephemeral). Export regularly:
```bash
npx tsx scripts/export-submissions.ts
```
