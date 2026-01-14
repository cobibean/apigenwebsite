# Admin System

CMS for managing content blocks and carousel images. Protected by middleware + RLS.

## Structure

```
admin/
├── page.tsx              # Dashboard
├── layout.tsx            # Admin layout with nav
├── login/
│   ├── page.tsx          # Login page
│   └── ui/AdminLoginForm.tsx
├── content/
│   ├── page.tsx          # Content editor
│   └── ui/ContentEditor.tsx
└── carousels/
    ├── page.tsx          # Carousel list
    └── [slug]/
        ├── page.tsx      # Individual carousel
        └── ui/CarouselEditor.tsx
```

---

## Authentication

### Middleware Protection
All `/admin/*` routes (except `/admin/login`) require:
1. Valid Supabase session
2. User has `role = 'admin'` in `app_users` table

See `src/middleware.ts` and `src/Claude.md`.

### Login Flow
1. User enters email/password
2. `AdminLoginForm` calls Supabase Auth
3. On success, redirect to `/admin`
4. Session stored in cookies

### Setting Up Admin User
```sql
-- 1. Create user in Supabase Auth (Dashboard → Authentication → Users)
-- 2. Copy the user's UUID
-- 3. Run:
INSERT INTO app_users (user_id, role) VALUES ('user-uuid-here', 'admin');
```

---

## Dashboard (page.tsx)

Displays:
- Quick stats (carousel count, content block count)
- Links to Content Editor and Carousel Manager
- Quick access list of carousels

---

## Content Editor

### UI Pattern
- Groups content blocks by page prefix (home, about, brands, etc.)
- Textarea for each block
- Save individual or save all

### Database Operations
```ts
// UPSERT by slug
await supabase.from("content_blocks").upsert({
  slug: "home.hero.title",
  content: "New Title",
  content_type: "text",
});
```

Trigger auto-updates `updated_at` and `updated_by`.

### Adding New Content Slugs
1. Insert via admin UI or directly in Supabase
2. Use hierarchical slug: `page.section.field`
3. Reference in code: `c(content, "section.field", "fallback")`

---

## Carousel Manager

### List View (carousels/page.tsx)
- Shows all carousels with image counts
- Links to individual editors

### Editor View ([slug]/page.tsx)
- Drag-to-reorder images (updates `sort_order`)
- Upload new images to Supabase Storage
- Edit alt text per image
- Delete images (with orphan cleanup)

### Database Schema
```sql
carousels (id, slug, label)
    ↓ 1:many
carousel_items (id, carousel_id, image_id, sort_order)
    ↓ many:1
images (id, bucket, path, alt_text)
```

### Creating New Carousel
```sql
INSERT INTO carousels (slug, label) VALUES ('new-carousel', 'New Carousel');
```
Then add images via the admin UI.

---

## Admin Layout (layout.tsx)

- Navigation header with links
- Logout button (clears session)
- Separate from public layout

---

## RLS Policies

All CMS tables have Row-Level Security:

```sql
-- Public can read
CREATE POLICY "Public read" ON table_name FOR SELECT USING (true);

-- Only admins can modify
CREATE POLICY "Admins manage" ON table_name FOR ALL USING (
  EXISTS (SELECT 1 FROM app_users WHERE user_id = auth.uid() AND role = 'admin')
);
```

### is_admin() Function
```sql
CREATE FUNCTION is_admin() RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM app_users 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;
```

---

## Common Tasks

### Add content slug
1. Go to `/admin/content`
2. Add new textarea in `ContentEditor.tsx` with slug
3. Or insert directly: `INSERT INTO content_blocks (slug, content) VALUES (...)`

### Reorder carousel images
1. Go to `/admin/carousels/{slug}`
2. Drag images to new positions
3. Changes save automatically

### Upload images
1. Go to carousel editor
2. Click upload button
3. Select images (uploaded to `carousel-images` bucket)

### Clean unused images
- API endpoint: `DELETE /api/admin/images/unused/delete`
- Removes images not referenced by any carousel
