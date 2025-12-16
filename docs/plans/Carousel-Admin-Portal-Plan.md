# Carousel Admin Portal Plan (Next.js + Supabase)

## Goal (Phase 1)
Build a custom admin portal so a logged-in client can **upload/add**, **remove (from a carousel only)**, and **reorder** images for **every individual carousel** on the site. Each image must have **admin-managed alt text** (with UI guidance on SEO/accessibility).

## Non-Goals (Phase 1)
- Editing site copy/text (planned later).
- Multi-user roles beyond a single “admin” role.
- Rich media transformations (cropping, focal points, variants) beyond storing the original.

---

## Current Carousel Inventory (as of now)

### 3D “main” carousels (shared component: `ProductCarousel3D`)
- **Home page**: `src/app/page.tsx` uses `galleryImages` from `src/data/gallery.ts`
- **About page**: `src/app/about/page.tsx` uses `galleryImages`
- **Brands page**: `src/app/brands/page.tsx` uses `galleryImages`
- **Cultivars page**: `src/app/cultivars/page.tsx` uses `galleryImages`

### Per-cultivar supporting carousels (component: `ProductCarousel3DLandscape`)
- Rendered inside `src/sections/ProductShowcase.tsx`
- Currently uses `strain.images.slice(0, 3)` from `src/data/cultivars.ts`

### GalleryCarousel
- Defined in `src/sections/GalleryCarousel.tsx` but **not currently mounted** on any page.
- We can still include a “gallery-section” carousel slug for future use.

---

## High-Level Architecture

### Data sources
- **Supabase Postgres**: canonical source of which images belong to which carousel, in what order, and each image’s alt text.
- **Supabase Storage**: stores uploaded image files.

### Site runtime (public pages)
- Each carousel instance is identified by a stable **carousel slug**.
- Pages fetch the image list for that slug (server-side), then pass it to existing client carousel components (`ProductCarousel3D`, `ProductCarousel3DLandscape`).
- Include a safe fallback path during rollout: if DB content is missing, keep using the current static arrays temporarily.

### Admin runtime
- `/admin` routes protected by Supabase Auth session + “admin allowlist” in DB.
- Admin UI can:
  - Upload an image (to Storage), set required alt text, then add it to a carousel.
  - Add existing library images to a carousel.
  - Drag-and-drop reorder within a carousel (persist `sort_order`).
  - Remove image from a carousel (delete the join row).
  - View “Unused Images” (no carousel references) and optionally permanently delete.

---

## Carousel Identification (Slugs)
We need stable IDs so code can request “the home carousel” etc. Proposed slugs:

**Main (3D) carousels**
- `home-main`
- `about-main`
- `brands-main`
- `cultivars-main`

**Per-cultivar supporting (landscape) carousels**
- `cultivar-cadillac-rainbow-supporting`
- `cultivar-dantes-inferno-supporting`
- Pattern for future strains: `cultivar-${strainId}-supporting`

**Optional (not used yet)**
- `gallery-section`

---

## Supabase Schema (Proposed)

### `app_users` (admin allowlist)
Maps Supabase Auth users to roles.

Columns:
- `user_id uuid primary key references auth.users(id) on delete cascade`
- `role text not null check (role in ('admin'))`
- `created_at timestamptz not null default now()`

### `images`
Represents a stored image (file + metadata).

Columns:
- `id uuid primary key default gen_random_uuid()`
- `bucket text not null` (e.g. `carousel-images`)
- `path text not null unique` (object key in Storage)
- `public_url text` (optional cache; can be derived)
- `alt_text text not null`
- `width int` (optional but recommended)
- `height int` (optional but recommended)
- `mime_type text`
- `byte_size int`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `deleted_at timestamptz` (optional soft-delete; prefer hard delete once unused)

### `carousels`
One row per carousel instance in the site.

Columns:
- `id uuid primary key default gen_random_uuid()`
- `slug text not null unique`
- `label text not null` (human-friendly name for admin UI)
- `created_at timestamptz not null default now()`

### `carousel_items`
Join table linking images to carousels with ordering.

Columns:
- `id uuid primary key default gen_random_uuid()`
- `carousel_id uuid not null references carousels(id) on delete cascade`
- `image_id uuid not null references images(id) on delete restrict`
- `sort_order int not null`
- `created_at timestamptz not null default now()`

Constraints:
- `unique (carousel_id, image_id)` (prevent duplicates in same carousel)
- Indexes on `(carousel_id, sort_order)` and `(image_id)` (supports “unused images” queries efficiently)

Recommended indexes (SQL):
```sql
create index if not exists idx_carousel_items_carousel_sort
  on public.carousel_items (carousel_id, sort_order);

create index if not exists idx_carousel_items_image_id
  on public.carousel_items (image_id);
```

### “Unused images”
No separate table needed:
- “Unused” = images with **no** `carousel_items` references.
- Admin UI can query with a left join / `not exists`.

---

## RLS & Security Model

### Auth
- Use Supabase Auth (email/password) for login.
- Only users present in `app_users` with role `admin` can access admin routes and mutate data.

### Postgres RLS policies (conceptual)
Enable RLS on `app_users`, `images`, `carousels`, `carousel_items`.

Helper predicate:
- `is_admin()` = `exists(select 1 from app_users where user_id = auth.uid() and role = 'admin')`

Recommended helper function (SQL):
```sql
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1
    from public.app_users
    where user_id = auth.uid() and role = 'admin'
  );
$$;
```

Policy performance note:
- When calling helpers like `is_admin()` in RLS policies, prefer wrapping them as `using ((select is_admin()))` / `with check ((select is_admin()))` so Postgres can treat the result as statement-stable rather than re-evaluating per-row.

Example (conceptual):
```sql
create policy "admin write images"
on public.images
for all
to authenticated
using ((select is_admin()))
with check ((select is_admin()));
```

Policies:
- Public site reads:
  - Allow `select` on `carousels`, `carousel_items`, `images` for everyone (or at least anon), since this content is not sensitive.
  - Alternatively: allow `select` for everyone but only return non-deleted images.
- Admin mutations:
  - Allow `insert/update/delete` on `images`, `carousel_items`, `carousels` only when `is_admin()`.

### Storage policies
Bucket: `carousel-images`
- Allow public read (optional) OR keep private and serve via signed URLs.
  - Recommendation: **public read** for simplicity + CDN caching, but restrict writes to admin.
- Policies:
  - `insert/update/delete` objects only if `is_admin()`
  - `select` objects for everyone (if public read), or for everyone via public bucket settings

---

## Next.js Integration Plan

### Dependencies
Add:
- `@supabase/supabase-js`
- `@supabase/ssr` (recommended for cookie-based sessions in App Router)

### Environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- (Optional) `SUPABASE_SERVICE_ROLE_KEY` (avoid if possible; prefer RLS)

### Image hosting + Next/Image
Uploaded images will live on `*.supabase.co`.
- Blocking prerequisite before any cutover: update `next.config.ts` to allow `next/image` to render Supabase Storage URLs, otherwise carousels will fail at runtime.
- Current repo note: `next.config.ts` is effectively empty today, so this change is required before switching any carousel images to Supabase URLs.

Example (prefer using your project hostname once known):
```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};
```

### Data fetch helper
Create a helper like:
- `getCarouselImages(slug: string): Promise<{ src; alt; priority? }[]>`
that returns the shape expected by `ProductCarousel3D` and `ProductCarousel3DLandscape`.

### Wiring each carousel
Replace static `galleryImages` / `strain.images.slice(...)` usage with fetched lists:
- `home-main` in `src/app/page.tsx`
- `about-main` in `src/app/about/page.tsx`
- `brands-main` in `src/app/brands/page.tsx`
- `cultivars-main` in `src/app/cultivars/page.tsx`
- `cultivar-${strain.id}-supporting` in `src/sections/ProductShowcase.tsx`

### Rollout safety (recommended)
During the first cutover:
- If a carousel slug has no DB rows, fallback to existing static images so the site never renders empty carousels.

---

## Admin UI (Routes + UX)

### Routes
- `/admin/login`
- `/admin` (dashboard: list carousels)
- `/admin/carousels/[slug]` (manage one carousel)
- `/admin/images/unused` (unused images + permanent delete)

### Carousel management page features
- Carousel title + slug (read-only)
- List of items with:
  - Thumbnail
  - Alt text (editable inline, required)
  - Drag handle to reorder (persist)
  - Remove button (“Remove from carousel”)
- Add images:
  - “Upload new” (upload to Storage → require alt text → add to carousel)
  - “Choose existing” (pick from library → add to carousel)

### Alt text guidance (UI copy)
Show a short help block near the alt text field:
- “Alt text is not visible on the page, but improves accessibility and SEO.”
- “Describe what’s in the image (strain name + what’s shown), keep it concise.”
- “Avoid keyword stuffing; write like you’re describing it to someone who can’t see it.”

### Unused images page
Query images with no `carousel_items` references:
- Show thumbnails, alt text, upload date
- “Delete permanently” action:
  - Deletes from Storage
  - Deletes row from `images`
  - Guardrails: disable if referenced, confirm dialog

Deletion behavior clarification:
- The DB constraint `carousel_items.image_id ... on delete restrict` is intentional: it prevents deleting an image that is still referenced by any carousel.
- The “Delete permanently” action must validate “unused” first and show a clear error if deletion fails due to references (e.g. if another admin added it while you were viewing the page).

---

## Admin Route Protection (Important)

### Current layout consideration: AgeGate + Header/Footer
`AgeGate` is rendered globally in `src/app/layout.tsx` and will block `/admin` unless the browser has already confirmed.

Options:
1) **Route groups** (cleanest):
   - Move public site into `src/app/(site)/...` with current layout.
   - Create `src/app/(admin)/admin/...` with a separate layout (no AgeGate, no public header/footer).
2) **Conditional AgeGate rendering** (smaller diff):
   - Update `AgeGate` to skip when pathname starts with `/admin`.
   - Optionally hide `Header`/`Footer` on `/admin` too.

Phase 1 recommendation: option (2) for minimal disruption, then refactor to route groups later if desired.

---

## Data Migration / Seeding

### Why migrate existing `public/` images?
If some carousel images remain in the repo under `public/`, the “Unused images → delete permanently” feature can’t actually delete those files. For a consistent admin experience, migrate existing carousel images into Supabase Storage.

### Proposed migration approach
1) Create the `carousels` rows for each slug above.
2) One-time script:
   - Upload current images referenced by `src/data/gallery.ts` and `src/data/cultivars.ts` to Supabase Storage.
   - Create corresponding `images` rows (including required `alt_text`).
   - Populate `carousel_items` with the current ordering.
3) Cut the site over to DB-backed carousels (with fallback until verified).

Notes:
- For per-cultivar supporting carousels, decide whether to seed the first 3 (matching today) or seed all and remove the `.slice(0,3)` behavior.

---

## API / Mutations (Implementation Detail)
Even with Supabase client-side operations, it’s helpful to centralize mutations in Next.js Route Handlers for validation and auditing:

Proposed endpoints (protected):
- `POST /api/admin/images/upload` (optional; can upload directly from client to Storage instead)
- `PATCH /api/admin/images/:id` (update alt text)
- `POST /api/admin/carousels/:slug/items` (add image to carousel)
- `PATCH /api/admin/carousels/:slug/reorder` (bulk update `sort_order`)
- `DELETE /api/admin/carousels/:slug/items/:itemId` (remove from carousel)
- `DELETE /api/admin/images/:id` (permanent delete; only if unused)

Validation rules:
- `alt_text` required, min length (e.g. 8–12 chars), max length (e.g. 160–200 chars).
- Prevent deleting images that are still referenced.

---

## Implementation Steps (Suggested Order)

### Milestone A — Supabase setup
1) Create Supabase project (temporary under your account).
2) Create Storage bucket `carousel-images`.
3) Apply SQL schema + RLS policies.
4) Create the first admin user in Supabase Auth.
5) Insert that user into `app_users` with role `admin`.

### Milestone B — Admin portal skeleton
1) Add Supabase client helpers (browser + server/SSR).
2) Add `/admin/login` (email/password).
3) Add route protection for `/admin/*` and `/api/admin/*` (middleware + server checks).
4) Add `/admin` dashboard listing carousels.

### Milestone C — Carousel editor
1) Carousel detail page with list + drag-and-drop reorder.
2) Add “choose existing” library picker.
3) Add upload flow (Storage upload + alt + add to carousel).
4) Remove-from-carousel behavior (join row delete).

### Milestone D — Unused images management
1) “Unused images” query + UI.
2) Permanent delete (Storage + DB) with confirmation and guardrails.

### Milestone E — Public site cutover (safe)
1) Add `getCarouselImages(slug)` fetcher.
2) Wire each page/section to its slug.
3) Add fallback to static images while verifying.
4) Ensure `next.config.ts` `images.remotePatterns` allows Supabase Storage URLs (this is a hard blocker).

### Milestone F — Migration script + final cutover
1) Upload current images and seed carousels.
2) Verify each carousel renders identically.
3) Remove fallback once stable.

---

## Risks / Gotchas
- **AgeGate blocks admin** unless explicitly bypassed (see route protection section).
- **Next/Image remote URLs** require `remotePatterns` in `next.config.ts`.
- **RLS + Storage policies** must be correct or uploads/mutations will fail (test early).
- **Reorder strategy**: simplest is rewriting all `sort_order` values on each reorder.

---

## Future Phase (Not in scope now)
- Admin-managed copy/text (turn `src/data/*.ts` into DB-managed content).
- Per-carousel settings (autoplay delay, dots spacing, max items, etc.).
- Image variants (crop, focal point) + automatic resizing pipeline.
