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


