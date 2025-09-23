# docs/build-navbar.md
> **Purpose:** When it’s time to build the sticky “liquid glass” nav bar, follow this file exactly.  
> **Style:** Cultiva-leaning (dark, cinematic), large sticky header that shrinks on scroll.  
> **Constraint:** Don’t paste third-party code; **compose** our own `Header.Glass` using the existing `GlassEffect` wrapper from `components/ui/liquid-glass.tsx`.

---

## 0) Prereqs (must be true before you start)
- Project uses **Next.js (App Router)**, **TypeScript**, **Tailwind**, and **shadcn/ui**.
- Components live under **`/components`**, with primitives under **`/components/ui`**.
- The 21st.dev demo wrapper already exists at **`components/ui/liquid-glass.tsx`** (sanitized per our protocol).
- Create/update **`config/nav.config.ts`**:
  - `NAV_LINKS`: `Home, About, Brands, For Doctors, For Pharmacists, For Patients, News, Contact`
  - `PRIMARY_CTA`: `{ label: "Get in touch", href: "/contact" }`

> If the project’s components are not under `/components/ui`, **create that folder** anyway. It mirrors shadcn conventions, keeps primitives/design-system code isolated, and shortens imports.

---

## 1) Files to create (no external code copy)
Create these files with empty exports first; fill them in Step 2.

components/navigation/Header.tsx # main sticky header (desktop + mobile)
components/navigation/MobileDrawer.tsx # mobile nav panel (uses shadcn Sheet or Dialog)
components/navigation/NavLink.tsx # single link with active styles & a11y
components/navigation/Logo.tsx # wordmark or <Image> wrapper


Optional helpers:

hooks/useScrolled.ts # tiny hook to detect scroll > threshold
hooks/useLockBody.ts # lock body scroll when drawer open (if not using Dialog)


---

## 2) Build order + requirements

### A) `Header.tsx` (the sticky glass shell)
- **Composition:** Render a `<header>` that uses our **`GlassEffect`** as the outer shell.
- **Positioning:** `fixed top-3 inset-x-0 z-50`. Content container `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`.
- **Layout:** `<nav class="flex h-16 md:h-20 items-center justify-between gap-4">`
  - **Left:** `<Logo />`
  - **Center (md+):** map `NAV_LINKS` to `<NavLink />`
  - **Right:** primary CTA button (“Get in touch”) + **mobile toggle** (hamburger) visible on `<md`.
- **Scroll shrink:** on scrollY > 8 add a “scrolled” state/class to reduce vertical padding (e.g., `py-4 → py-2`) and add subtle shadow/ring.
- **The “glass” look:** let `GlassEffect` provide the layered translucency; do **not** add heavy filters here (keep the SVG turbulence; no extra blurs).
- **Dark mode:** header must look good over both light hero and dark pages (test contrast AA).

**Props (keep simple):**
```ts
type HeaderProps = {
  links?: { label: string; href: string }[];         // default to NAV_LINKS
  cta?: { label: string; href: string };             // default to PRIMARY_CTA
  logoText?: string;                                 // default "APIGEN" (swap to Image later)
  transparentUntilScroll?: boolean;                  // optional variant
};


Behavior:

Active link: use usePathname() to style the current route (underline or color).

Mobile toggle: opens MobileDrawer (below). Toggle has proper aria-controls, aria-expanded.

B) MobileDrawer.tsx (the small-screen menu)

Use shadcn/ui Sheet or Dialog (preferred for a11y).

List the same links vertically (large tap targets).

Include the primary CTA at the bottom.

When open: focus-trap, ESC to close, close on link click, body scroll locked.

C) NavLink.tsx

Renders Next/Link with focus ring, hover styles, and an “active” variant when pathname === href.

Ensure 44px min tap size on mobile.

D) Logo.tsx

For now render text “APIGEN” with strong tracking; later swap to <Image src="/logo.svg" .../>.

3) Styling rules (tokens & classes)

Base header padding: py-4 (desktop h-20). When scrolled: py-2.

Glass shell classes (applied on the GlassEffect wrapper via className):

rounded-2xl border backdrop-blur-2xl bg-white/10 dark:bg-neutral-900/40 border-white/15 dark:border-white/10

Shadow/ring when scrolled: shadow-lg ring-1 ring-black/5

Links (desktop): text-sm font-medium text-neutral-900/90 dark:text-neutral-100/90 hover:text-emerald-700 dark:hover:text-emerald-300

CTA button:

Light: bg-neutral-900 text-white hover:bg-neutral-800

Dark: dark:bg-emerald-600 dark:hover:bg-emerald-500

rounded-xl px-4 py-2 text-sm font-semibold

Sanitize classes from 21st.dev:

Replace rounded-inherit → rounded-[inherit] or remove; keep rounded-2xl.

Replace rounded-4xl → rounded-[2rem] or rounded-3xl.

4) Accessibility requirements (blocker if missing)

Semantic structure: <header role="banner"> → <nav aria-label="Primary">.

Mobile toggle is a <button> with aria-expanded and aria-controls.

Drawer uses Dialog/Sheet (focus trap, ESC close, screen reader labels).

Keyboard navigation: all links reachable; visible focus outlines.

Contrast: nav text & CTA must pass WCAG AA against glass background.

5) Performance & safety notes

SVG filter in GlassEffect is GPU-intensive; do not increase blur/scale.

Add @media (prefers-reduced-motion: reduce) to disable nonessential transitions if needed.

Keep header paint area small (rounded container + max-w-7xl), not full-bleed.

6) Integration into pages

Add <Header /> to app/(site)/layout.tsx (or app/layout.tsx) so it appears on all routes.

Offset page content to avoid overlap:

Wrap main with pt-28 md:pt-32 (matches header height + top gap).

Home hero: ensure legibility with a soft top gradient overlay behind header on scroll.

7) Config & single source of truth

Read links/CTA from config/nav.config.ts.

If a route needs custom links (rare), Header accepts links prop but default to config.

8) Done-done checklist (acceptance criteria)

 Sticky glass header renders on every route

 Shrinks on scroll (smooth, no layout shift)

 Desktop nav shows links center; CTA right

 Mobile shows hamburger → drawer with links + CTA

 Active link styled correctly via usePathname

 A11y: focus trap, ESC close, ARIA labels, keyboard-friendly

 Contrast AA on light/dark backgrounds

 No console errors; no CLS on first scroll

 Header compiles with strict TypeScript, no any

9) Future enhancements (non-blocking)

Variant prop: transparentUntilScroll (0% bg until scrolled)

Auto-hide on scroll down / reveal on scroll up

Per-page secondary CTA injection (e.g., “Register” on Doctors/Pharmacists)

Analytics: nav link click events


// components/navigation/Header.tsx
export function Header(props?: HeaderProps): JSX.Element

// components/navigation/MobileDrawer.tsx
export function MobileDrawer({
  open, onOpenChange, links, cta,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  links: {label: string; href: string}[];
  cta: {label: string; href: string};
}): JSX.Element

// components/navigation/NavLink.tsx
export function NavLink({ href, label }: { href: string; label: string }): JSX.Element

// components/navigation/Logo.tsx
export function Logo({ text = "APIGEN" }: { text?: string }): JSX.Element

11) What NOT to do

Do not paste 21st.dev header code verbatim.

Do not add new dependencies for the header (keep it TS + Tailwind + shadcn).

Do not disable focus rings or rely on click-only interactions.

Do not use full-bleed glass across the entire viewport; keep it in a rounded container.
