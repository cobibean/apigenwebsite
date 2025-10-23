## UI Layout & Spacing Guide (editor‑ready)

Purpose: one guide for container hierarchy, centering, responsive widths, motion wrappers, and spacing knobs adjustable via page JSON for future visual editors.

### Global
- Fonts/vars in `src/styles/theme.css`; globals in `src/app/globals.css`.
- Root enforces `box-sizing: border-box`, `overflow-x:hidden`, `width:100%`.

### Navbar offset utilities
- Defined in `src/styles/theme.css`.
- Layout already applies `.navbar-offset` to `<main>`, pushing page content below the floating header (76px mobile, 92px ≥md). **Do not** add `.navbar-offset` again inside pages or sections.
- Use `.navbar-flush` only when a section must align with the very top of the viewport (outside `<main>` or when replacing the header).
- `.section-spacing` restores comfortable top padding for sections that follow a flush hero.

### Hero anatomy (video/image background)
- Section: `relative w-full overflow-hidden` (no extra offset classes).
- Background: `fixed inset-0 -z-10 w-full h-full`.
- Media: `absolute inset-0 w-full h-full object-cover`.
- Content wrapper: `relative flex w-full items-center justify-center px-6 sm:px-8 lg:px-4 min-h-[calc(100vh-76px)] md:min-h-[calc(100vh-92px)] py-8 sm:py-10 md:py-12`.
- Inner cluster: `w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[1100px] text-center`.
- CTA row keeps `margin-top` controlled via the `ctaGap` prop so the top/bottom whitespace stays balanced.

### Editor‑friendly props (set in `src/content/pages.json`)
- `wordmarkMaxWidth` — max width for wordmark image (e.g., "62%", "900px").
- `contentOffsetY` — translateY nudge for entire content cluster (e.g., "12px").
- `subtitleGap` — space under subtitle (e.g., "24px").
- `ctaGap` — space above CTA row (e.g., "32px").
Defaults live in `src/sections/Hero.tsx`; JSON values override.

### Buttons (shared)
- Use `buttonClass` from `src/lib/utils.ts` (variants `olive|brown|neutral`, sizes `md|lg`).

### Standard section pattern
- Wrapper: `py-16 md:py-24 lg:py-32`
- Container: `container mx-auto px-4 sm:px-6 lg:px-8`

### Centering & width rules
- Prefer parent padding; avoid margins on flex children.
- Use `max-w-[%]` not `w-[%]` for responsiveness.
- Avoid viewport width units on children when parent uses viewport sizing.

### Motion wrappers
- `<Appear>` should receive `className="w-full flex justify-center"` to participate in flex layout; respect reduced motion.

### Common pitfalls
- White gutter from `svw` + padding → use `w-full` + percentage max‑width.
- Left drift from margins on flex child → put spacing on parent.
- Double applying navbar offset (e.g., `.navbar-offset` on both `<main>` and a hero) causes large top gaps. Rely on the layout’s offset unless working in Storybook/sandbox where the header is absent—there you can apply `.navbar-offset` once manually.

### Editor readiness
- All visual knobs are props set via page JSON; adapters (Storyblok/Builder) can map fields 1:1.
- Sections remain prop‑driven (no fetch/router/window).

### Quick checklist
- Centering intact? Responsive widths? Visible focus? Buttons ≥44px?
