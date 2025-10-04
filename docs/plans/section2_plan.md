# MissionSection_1 — Build Plan (Section 2 on Home)

This plan implements the first section below the fold on the Home page. It follows our adapter/registry architecture and section rules.

## Summary
- Two-column layout (headline/paragraph/CTA + image) that stacks on mobile.
- Solid dark olive background with light foreground text for contrast, similar to the reference image. Section overlays the hero video background so the video remains visible before/after as you scroll.
- Purely prop-driven. Motion via `Appear`/`AppearStack`, disabled in preview and respecting reduced motion.
- CTA uses our `buttonClass` helper (`variant: "olive"`) and `AppLink`.

## Component
- File: `src/sections/MissionSection_1.tsx`
- Props:
  - `title?: string`
  - `body?: string`
  - `cta?: { label: string; href: string }`
  - `image?: { url: string; alt?: string }`
  - `flip?: boolean` to optionally swap columns at `md:` (default false)
  - `preview?: boolean`
- Behavior:
  - Renders a semantic `<section>` with `data-block="Mission" data-variant="1"`.
  - Uses a solid background: `style={{ background: "var(--bg-olive, #545943)" }}` with text using light tokens: `text-[var(--foreground)]` and secondary as `text-[var(--secondary-foreground)]` to ensure contrast on dark bg. The theme already provides light-on-dark tokens; we’ll force foreground colors where needed.
  - Grid: `grid-cols-1 md:grid-cols-2`, generous `py`, balanced `gap`.
  - CTA: `className={buttonClass({ variant: "olive", size: "lg" })}`.

## Registration
- File: `src/lib/registry.tsx`
- Add: `registerBlock("MissionSection_1", (props) => <MissionSection_1 {...(props as any)} />);`

## Homepage insertion
- File: `src/content/pages.json`
- Insert block right after `Hero` and before `LogoCloud`.
- Example props:
```jsonc
{ "type": "MissionSection_1", "props": {
  "title": "Our Mission",
  "body": "We set a new industry standard with premium, patient‑centric medicinal cannabis. Our commitment to quality and transparency goes beyond profits — it’s about doing what’s right for the plant, our patients, and the planet.",
  "cta": { "label": "About Apigen", "href": "/about" },
  "image": { "url": "https://images.unsplash.com/photo-1556909212-d5d88e9218df?w=1600", "alt": "Cultivation team and facility" }
} }
```

## Storybook
- File: `src/sections/MissionSection_1.stories.tsx`
- Stories: `Minimal`, `Typical`.

## Accessibility & QA
- h2 present; image has `alt`; visible Focus ring on CTA; no horizontal scroll at mobile.
- Contrast on dark olive background ≥4.5:1 using existing light foreground tokens.
- Motion disabled in preview and honors reduced motion.

## Tasks
1. Implement the section component (with background + light text, prop-driven, motion, CTA via `buttonClass`).
2. Register block in `registry.tsx`.
3. Insert into Home blocks right after `Hero`.
4. Add Storybook stories.
5. Verify locally on `localhost:3000` (desktop/mobile) and fix any issues.


