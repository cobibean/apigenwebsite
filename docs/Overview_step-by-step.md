Step-by-step plan (from pick → plan → ship)

Decide stack & libs

Framework: Next.js (App Router)

UI: Tailwind + shadcn/ui (Radix under the hood) + Lucide icons

Motion: Framer Motion (light use)

Forms: React Hook Form + Zod

Analytics: Vercel Analytics (and add GA later if needed)

Create two lightweight docs

PRD.md: goals, success criteria, must-have pages/sections, brand constraints, SEO/OG, performance & a11y targets, handoff needs.

plan.md: milestones, daily update ritual, backlog, out-of-scope, risks.

Define page & section map

Pages: Home, About, Services (or Product), Blog (optional), Contact.

Sections (reusable): Nav, Hero, FeatureGrid, Testimonial, Pricing/CTA, Footer.

Lock the content architecture

Blocks JSON shape (type, props, children) + component registry.

Write a Local JSON adapter first (swappable later).

Scaffold the project

npx create-next-app → add Tailwind → shadcn init → set up base layout, theme tokens, and fonts.

Add src/sections/* with stub components (pure props, no data fetching).

Build the rendering core

RenderBlocks component + registry.ts that maps "hero" → <Hero />, etc.

Add catch-all routing

app/[...slug]/page.tsx pulls PageData via the adapter and renders blocks.

Implement preview & drafts

/api/preview that toggles draft mode; bypass cache when ?preview=1.

SEO + OG ready

Centralized SEO util; default OG image; per-page overrides via PageData.seo.

Global nav & footer

Hardcode once, then expose as blocks (nav, footer) so editors can own menus later.

Forms & CTAs

Contact form with React Hook Form+Zod → route handler → email (Resend) or webhook.

Animations & polish

Subtle enters/hover states; respect “prefers-reduced-motion”.

A11y & performance pass

Landmarks, focus rings, color contrast; image dimensions; Lighthouse target 90+.

Content & theming

Brand tokens in CSS vars; images via an asset folder or CDN (absolute URLs).

Analytics & logging

Vercel Analytics + basic event helper (e.g., data-block="cta").

Prepare “future editor” adapters (stubs)

Builder: add builderio/react and a registerComponent file (commented), plus a builderSource adapter stub.

Storyblok: add @storyblok/react and a components map stub. (Only wire when needed.)

Environments & deploy

Staging on Vercel (password or random subdomain), then production.

Set up robots.txt, sitemap.xml, and revalidate defaults.

Content load & review

Fill JSON pages, sanity-check copy/images, run full click-through.

Docs & handoff

Update README.md (run, develop, deploy, add a section, connect a CMS).

Add EDITOR.md explaining how a visual editor would plug in later.

Daily ops

Keep plan.md updated; ship small PRs daily; tag releases for client notes.