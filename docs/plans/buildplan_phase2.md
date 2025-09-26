# buildplan_phase2.md — Phase 2: Section System v1

Goal: implement first-wave sections with strict prop APIs and defaults. Include Storybook coverage and a11y. Journey is the finalized `JourneyRow` (row of 4 link cards), not an accordion/timeline.

---

## Sections to Implement

- `Hero`
- `LogoCloud`
- `FeatureGrid`
- `Stats` / `KPIs`
- `BrandCard` and/or `BrandGrid`
- `CTA`
- `NewsList` (list only)
- `DocList`
- `Disclaimer`
- `Footer`
- `JourneyRow` (final decision from Q2)

All sections:
- Pure, prop-driven; no fetch/router/window/context.
- Links via `components/AppLink.tsx` and images via `components/AppImage.tsx` only.
- Root nodes include `data-block` and `data-variant` attributes for analytics.
- Provide sensible defaults so each renders with minimal props.

---

## JourneyRow — Detailed Spec

Purpose: depict the 4-step B2B path with all steps visible, premium perception, and clear path to Contact.

Structure:
- Desktop: four equal-width photo cards in a single row (aspect 3:2).
- Mobile: stacked vertical cards (aspect 16:9).
- Click behavior: each card links to `/contact`. Footer CTA below the row also links to `/contact`.

Visuals & behavior:
- Card content: step number (optional), title always visible; sentence reveals on hover/focus (desktop) and is always visible on mobile.
- Direction-aware hover on desktop; reduced-motion fallback to opacity-only.
- Images via `AppImage` with `fill` + object-cover and proper `sizes` to avoid CLS; if missing image, render gradient fallback using brand tokens primary → accent.
- Contrast: enforce ≥4.5:1 for body text over imagery using scrim system from Q3.

Accessibility:
- Each card is a single `<a>` with a descriptive `aria-label` like “Value Alignment — Get in Touch”.
- Keyboard focus applies the same reveal; Enter/Space activates.
- Visible focus ring; 44×44px tap target via padding.

Analytics:
- Root sets `data-block="Journey"` and `data-variant="row-4"`.
- Cards include `data-item-index`.
- Events: `journey_card_view`, `journey_card_hover` (desktop only), `journey_card_click`, `journey_cta_click`.

Props (editor-ready):
- `layout: 'row-4'` (default)
- `aspectRatioDesktop: '3:2'` (default), `aspectRatioMobile: '16:9'` (default)
- `hoverEffect: 'direction-aware' | 'fade'` (auto-downgrades to `fade` under reduced motion)
- `clickHref: '/contact'` (default)
- `showStepNumber: boolean` (default true)
- `fallbackGradient: { from: string; to: string }`
- `steps: Array<{ id: string; number: number; title: string; body: string; image?: { url: string; alt: string }; href?: string }>`
- `footerCta?: { label: string; href: string }`

Motion:
- Use `AppearStack` at the section root for entrance; each card wrapped in `AppearItem` for stagger.
- Header/footer/legal blocks are never motion-wrapped.

---

## Motion wrappers (usage across sections)

- Wrap typical sections in `Appear` with `viewport={{ once: true, amount: 0.2 }}`.
- For dense lists/grids, use `AppearStack` on parent and `AppearItem` on items.
- Respect `prefers-reduced-motion` (opacity-only) and preview kill-switch.

---

## Storybook & Testing

- Storybook stories for each section (min/typical/max props). Include reduced-motion snapshot.
- One renderer snapshot test using a sample page JSON that includes `JourneyRow` with 4 steps and missing-image fallback.

---

## Acceptance Criteria

- All listed sections render with minimal props and pass basic a11y checks.
- `JourneyRow` meets behavior: desktop row of 4, mobile stack, direction-aware hover (desktop), opacity-only under reduced motion.
- Analytics data attributes present; events are wired (placeholders in dev acceptable).
- No Danger Patterns present in any `sections/**` file.


