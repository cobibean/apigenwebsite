# buildplan_phase3.md — Phase 3: Page Assembly & Routing

Goal: assemble MVP pages from blocks via the Local adapter; wire navigation; ensure SEO metadata with fallbacks and proper canonical/robots behavior.

---

## Deliverables

- Pages composed from blocks: Home, About, Brands/Products, News (list), Contact, For‑Doctors, For‑Pharmacists, For‑Patients (optional Investors stub).
- Header/Nav and Footer implemented as sections consuming props from route-level data (adapter), never fetching inside sections.
- SEO wiring:
  - `src/lib/seo.ts` produces metadata from `PageData.seo` with fallbacks to `DEFAULT_SEO`.
  - `src/config/site.ts` exports `SITE_URL`, `SITE_NAME`, `DEFAULT_SEO` (title, description, og, twitter card) for central control.
  - `app/[...slug]/page.tsx` implements `generateMetadata` calling the SEO helper.
  - Canonical via `metadata.alternates.canonical` using `SITE_URL` + normalized slug.
  - JSON-LD Organization (and optional WebPage) injected in layout/route only, never in sections.
  - Assets exist: `public/og/default.jpg` (1200×630) and `public/brand/logo.png`.
- ISR defaults for live pages; preview bypasses caching.

---

## Tasks

1) Expand `src/content/pages.json` to include block arrays for each MVP route.
2) Implement `Header` section (see navbar guide) and ensure it accepts a `links` prop from adapter data.
3) Ensure 404 behavior when adapter returns null.
4) Add `src/config/site.ts` with `SITE_URL`, `SITE_NAME`, `DEFAULT_SEO` and update layout metadata.
5) Implement `generateMetadata` in `app/[...slug]/page.tsx` with canonical and robots based on env.
6) Verify `AppImage` across sections includes `alt` and `sizes` to prevent CLS.

---

## Acceptance Criteria

- All MVP routes render from blocks + registry via the adapter; 404 on unknown slugs.
- SEO metadata present or defaulted; canonical is absolute and matches final URL after redirects.
- Robots by env: production = index/follow; preview/staging = noindex (also mirrored in `robots.txt`).
- Header/Footer appear on all routes; no section performs data fetching.


