## Buttons Guide (simple + reusable)

Where things live
- Most links-as-buttons use `components/AppLink.tsx` (wraps Next Link).
- Section-specific buttons are just `AppLink` with classes.
- We don’t have a heavy button library yet; that’s intentional for swapping to 21st.dev later.

How to reuse a button style
1) Create a Tailwind class string (utility combo) you like.
2) Use it on any `AppLink` or `button` element.
3) Prefer a small helper if you plan to reuse across pages.

Example (current header CTA)
```tsx
<AppLink className="inline-flex items-center justify-center rounded-xl px-3.5 py-1.5 text-sm md:text-base font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500" ...>
  Get in touch
</AppLink>
```

### Standard brand behavior (editor‑ready)

- Resting: olive green (`--btn-olive`).
- Hover: copper (`--accent` via `--btn-olive-hover`).
- Use the `olive` variant for all CTAs (header + sections). Variants map to CSS variables in `src/styles/theme.css`, so editors can retheme without code changes.

### Import anywhere

Add to any section or component:

```tsx
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

export function Example() {
  return (
    <AppLink href="/contact" className={buttonClass({ variant: "olive", size: "lg" })}>
      Get in touch
    </AppLink>
  );
}
```

- Works on `button` elements too: `className={buttonClass({ variant: "neutral" })}`.
- Keep sections prop-driven; pass labels/hrefs via props.

Global vs individual adjustments
- Global: extract a shared style into `lib/utils.ts` or a simple `components/ui/Button.tsx` and use everywhere.
  - Example style: `const primaryBtn = "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold bg-neutral-900 text-white hover:bg-neutral-800"`.
  - Then: `<AppLink className={primaryBtn} ... />`.
- Individual: tweak classes inline at call sites (fastest for one-offs).

Swapping to a 21st.dev button later
- Drop the component into `components/ui/Button.tsx`.
- Keep the API simple: `variant`, `size`, `asChild` (optional).
- Replace header CTA by importing the new Button and wrapping it with `AppLink` or using `asChild`.

Accessibility
- Keep min tappable height ≈ 40–44px.
- Ensure visible focus states (`focus-visible:`) and color contrast ≥ 4.5:1.

The quick knobs
- Size: adjust `px-*` and `py-*`.
- Corners: `rounded-*`.
- Emphasis: `bg-*`, `text-*`, `hover:*`.
- Motion: keep subtle; respect reduced motion.

That’s it. When you bring the 21st.dev code, I’ll wire it as a drop-in.

## New helper: `buttonClass`

Usage:

```tsx
import { buttonClass } from "@/lib/utils";

<AppLink href="/contact" className={buttonClass({ variant: "olive", size: "lg" })}>
  Get in touch
</AppLink>
```

- `variant`: `"olive" | "brown" | "neutral"`
- `size`: `"md" | "lg"`
- Focus ring uses `--ring`. Colors come from `src/styles/theme.css` button tokens.

Examples for paired CTAs (Hero):

```tsx
<div className="flex gap-5">
  <AppLink className={buttonClass({ variant: "olive", size: "lg" })} href="#">FOR DOCTORS</AppLink>
  <AppLink className={buttonClass({ variant: "brown", size: "lg" })} href="#">FOR PHARMACISTS</AppLink>
  {/* Or use neutral for Login */}
  <AppLink className={buttonClass({ variant: "neutral", size: "md" })} href="#">LOGIN</AppLink>
  </div>
```


