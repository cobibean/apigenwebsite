# PRD — Apigen Marketing Site (Visual‑Editor Ready)

## 1) Summary

Build a fast, accessible, section‑based marketing site for **Apigen** in **Next.js (App Router)** with **Tailwind + shadcn/ui** and **Lucide**. Pages and features mirror the references (Avant Brands, Cultiva) while staying **Builder.io/Storyblok‑ready** via a thin, swappable content adapter and blocks/registry renderer.

**Primary goals**

* Ship a polished v1 with the full page set below.
* Keep every section **prop‑driven** (no fetch/router/window/context in sections).
* Support **Preview** mode + **ISR**.
* Swap Local JSON → Builder or Storyblok later without rewrites.

---

## 2) Scope (pages & key features)

### Core pages (public)

1. **Home** — Hero, brand/mission highlights, news teaser, primary CTA.
2. **About** — Story, operations/facilities, leadership snapshot, ethos/sustainability.
3. **Brands / Products** — Grid of brand/product cards; each card may link externally.
4. **News** — Reverse‑chron list; categories/tags label; optional single post view.
5. **Investors** *(optional if relevant)* — Overview + document downloads (Investor/Export Presentation, Fact Sheet), **Financials** by period, **Share Structure** stats.
6. **For Doctors** — Eligibility, prescribing/registration guidance, external portal CTAs.
7. **For Pharmacists** — Stock/dispensing info, registration CTA.
8. **For Patients** — Access basics, eligibility guidance, find‑pharmacy/contact CTA.
9. **Contact** — Form (name, email, phone, enquiry type, message) + success state.

### Global elements

* **Header/Nav** with the map above; optional Login/Portal link.
* **Footer** with newsletter signup (optional), privacy/terms/cookies, disclaimer.

### Out of scope (v1)

* Authenticated portals/dashboards (we **link out** only).
* Live finance feeds/tickers; e‑commerce.

---

## 3) Content Architecture (editor‑ready)

* **Blocks JSON**: `{ type: string; props?: Record<string, any>; children?: Block[] }`.
* **Registry**: central map `type → Component`; unknown types fail safe.
* **Adapter interface**: `getPage(slug)`, `getMenu()`, optional `getNews()`, `getDocs()`.
* Start with **Local JSON adapter**; later swap to **Builder**/**Storyblok** adapter.
* **Rich‑text helper**: provider‑aware function; sections never import editor SDKs.

---

## 4) Section Inventory (initial)

**Hero**, **LogoCloud**, **FeatureGrid**, **Stats/KPIs**, **BrandCard**, **Testimonial/Quote**, **Timeline**, **LeadershipGrid**, **NewsList**, **DocList** (title/url/label), **ShareStructure** (label/value), **CTA**, **ContactForm**, **Disclaimer**, **NewsletterSignup**, **Footer**.

**Section rules**

* Props only; sensible defaults.
* Links use `AppLink` (internal/external).
* Images via `AppImage` (URL, alt, width/height or Next Image props).

---

## 5) Functional Requirements

* **Routing**: `app/[...slug]/page.tsx` renders pages via adapter; 404 on null.
* **Preview**: `/api/preview` toggles draft mode; bypass cache.
* **ISR**: default revalidate for live pages.
* **News**: list (date/category/teaser); optional single post view.
* **Investors** *(if used)*: documents list, financials by period, share‑structure card.
* **Brands/Products**: card grid with optional external links per card.
* **Role pages**: Doctors/Pharmacists/Patients — content blocks + external CTAs.
* **Contact**: API route → email/webhook (e.g., Resend); visible success state.
* **Newsletter**: optional footer capture (provider or stub).

---

## 6) Visual & Brand System

* **Fonts/tokens**: CSS variables + Tailwind theme extension; light/dark ready.
* **UI**: shadcn/ui (Radix primitives); Lucide icons; minimal Framer Motion with `prefers-reduced-motion` respected.
* **Custom components**: prototype anywhere, but final sections must remain prop‑driven.

---

## 7) SEO, A11y, Performance

* **SEO**: central util reads `PageData.seo` (title/description/ogImage) with fallbacks; sitemap/robots.
* **A11y**: semantic landmarks, visible focus, ≥4.5:1 contrast, meaningful alt text.
* **Perf**: next/image with explicit sizes; lazy‑load heavy sections; Lighthouse ≥90 (Home + one heavy page).

---

## 8) Analytics & QA

* Event helper using `data-block`/`data-variant`.
* Snapshot test: JSON → `RenderBlocks`.
* Storybook stories for each section (min/typical/max props).

---

## 9) Deliverables

* Next.js app on Vercel (staging + prod) with **Local JSON adapter** default.
* Commented **Builder** and **Storyblok** adapter stubs.
* **EDITOR.md** (how to plug a visual editor), **README.md** (dev/run/deploy), full **Content JSON** for pages.

---

## 10) Acceptance Criteria

* All pages render via **blocks/registry + adapter** only.
* Sections contain **no fetch/router/window/context** usage.
* `/api/preview` works; ISR for live.
* Contact form submits and shows success.
* Optional Investors page presents documents, financials, share‑structure.
* Footer includes disclaimer/newsletter as needed.

---

## 11) Sitemap (MVP)

* `/` Home
* `/about` About
* `/brands` Brands/Products
* `/news` News (list) \[+ optional single]
* `/investors` Investors *(optional)*
* `/for-doctors` Doctors
* `/for-pharmacists` Pharmacists
* `/for-patients` Patients
* `/contact` Contact

---

## 12) Risks / Non‑Goals

* Portals/dashboards remain external.
* Complex data feeds out of scope.

---

## 13) Compliance with Apigen Rulebook (quick)

* Prop‑driven sections ✓
* Links via `AppLink` ✓
* Blocks + Registry ✓
* Swappable Adapter ✓ (Local JSON ⇒ Builder/Storyblok)
* Preview + ISR ✓
* Tailwind/shadcn, tokens, no global editor CSS ✓
* Central `AppImage` ✓, SEO util ✓, a11y ✓, perf ≥90 ✓
* Analytics via data‑attributes ✓
* Editor stubs prepared ✓

---
