## Header Tuning Guide (for vibe coders)

This guide shows how to adjust the navigation header without prompting me. All numbers are Tailwind utility classes or simple props.

### Where the pieces live
- `src/components/navigation/Header.tsx` — container, layout, props
- `src/components/navigation/Logo.tsx` — logo image sizing/frame
- `src/components/ui/liquid-glass.tsx` — glass wrapper (opacity + optional distortion)

### 1) Change header height and padding
- Height: in `Header.tsx` edit the nav `className`:
  - `h-16` (mobile), `md:h-20` (desktop)
- Horizontal/vertical padding: edit `px-4 md:px-5` etc.

### 2) Center the nav links vertically
- The header already uses `flex items-center` which centers links vertically. If adjusting, keep `items-center` intact.

### 3) Logo sizing via a fixed frame (no overflow)
- In `Logo.tsx` the image sits inside a frame: `span` with `h-8 md:h-10`.
- Make it smaller/taller:
  - Mobile: change `h-8`
  - Desktop: change `md:h-10`
- The image uses `object-contain` and `h-full w-auto`, so it scales to fit the frame.

### 4) Glass effect controls
- In `Header.tsx`, pass these props to `<GlassEffect />` via `<Header>` props:
  - `glassOpacity` (0..1): background strength; e.g. `0.55` (higher = more opaque)
  - `glassDistort` (boolean): enables subtle displacement (a tasteful wobble)
- Example in Storybook `Max` story enables both.

### 5) Mobile brand variant
- Mobile shows the leaf only + centered text `APIGEN` between the logo and menu button.
- Change the mobile text label inside `Header.tsx` (look for the `sm:hidden` center label).
- To change the mobile logo asset, edit the `Logo` invocation on the `sm:hidden` path.

### 6) Hamburger button
- Defined in `Header.tsx` with three bars using absolute-positioned spans.
- To tweak thickness/width: adjust `w-5` and `h-0.5` utilities.

### 7) Quick recipes
- Make header slightly more opaque:
  - `<Header glassOpacity={0.65} />`
- Add subtle distortion:
  - `<Header glassDistort />`
- Make logo smaller:
  - In `Logo.tsx`, change the frame to `h-7 md:h-9`.
- Increase nav text size:
  - Edit `NavLink.tsx` and use `text-lg md:text-xl`.

That’s it—tweak, refresh, and iterate.


