# MissionSection_1 — Implementation Plan

This plan instructs the Cursor agent to add a new **homepage section** (the 2nd section below the Hero) named **`MissionSection_1`**, matching the provided reference layout. It uses our Tailwind setup, theme tokens, motion wrappers, and primitives.

---

## Goals & Requirements

* **Structure**: Two-column section (text + CTA on one side, image on the other). **Stacks on mobile**.
* **Placement**: Insert **immediately after the Hero** in the Home page blocks array (`pages.json`).
* **CTA**: Button links to **`/about`**.
* **Theme**: Use semantic tokens and Tailwind utilities (no hard-coded colors). Respect light/dark.
* **Motion**: Use the existing `<Appear>` (and optional `<AppearStack>/<AppearItem>` for stagger). Disable in preview and honor reduced-motion.
* **A11y**: Semantic `<section>` with an `<h2>`; alt text for image; visible focus ring on CTA.
* **Editor-ready**: Purely prop-driven; no data fetching or router logic inside the section.

---

## 1) Create the Section Component

**File**: `src/sections/MissionSection_1.tsx`

```tsx
"use client";
import React from "react";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";

export type MissionSectionProps = {
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
  image?: { url: string; alt?: string };
  /** passed by renderer; disables motion in preview */
  preview?: boolean;
};

export default function MissionSection_1({
  title = "Our Mission",
  body = "Insert mission statement here.",
  cta = { label: "Learn More", href: "/about" },
  image = { url: "", alt: "" },
  preview,
}: MissionSectionProps) {
  return (
    <Appear preview={preview}>
      <section
        data-block="Mission"
        data-variant="1"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      >
        {/* TEXT COLUMN */}
        <div>
          <AppearStack preview={preview} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              {body}
            </p>
            <div>
              <AppLink
                href={cta?.href || "/about"}
                className="btn btn-olive btn-lg"
              >
                {cta?.label || "Learn More"}
              </AppLink>
            </div>
          </AppearStack>
        </div>

        {/* IMAGE COLUMN */}
        <div className="relative">
          {image?.url ? (
            <AppImage
              src={image.url}
              alt={image.alt || ""}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto object-cover rounded-md"
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-full aspect-[3/2] rounded-md bg-[var(--muted)]"
            />
          )}
        </div>
      </section>
    </Appear>
  );
}
```

**Notes**

* **Layout**: Grid switches from `1` to `2` columns at `md:`; `gap-12` on desktop; generous `py` spacing.
* **Typography**: Uses Tailwind text sizes; will inherit our tokenized fonts via global CSS.
* **CTA Styles**: Uses our button utility classes (e.g., `btn btn-olive btn-lg`). If you use `buttonClass` helper instead, replace the `className` with `buttonClass({ variant: "olive", size: "lg" })`.
* **Image**: Width/height + `sizes` prevents CLS; rounded corners use tokenized radius via Tailwind.

---

## 2) Register the Block

**File**: `src/lib/registry.ts` (or the central block registry file)

```ts
import MissionSection_1 from "@/sections/MissionSection_1";

export const registry = {
  // ...existing entries
  MissionSection_1,
};
```

Ensure the export matches how other blocks are registered (default/ named). The key **must** be `"MissionSection_1"` (exact string the renderer will look up).

---

## 3) Add to Homepage (`pages.json`)

Insert **immediately after the Hero** in the Home page blocks array.

```jsonc
{
  "type": "MissionSection_1",
  "props": {
    "title": "Our Mission",
    "body": "We set a new industry standard with premium, patient‑centric medicinal cannabis. Our commitment to quality and transparency goes beyond profits — it’s about doing what’s right for the plant, our patients, and the planet.",
    "cta": { "label": "About Apigen", "href": "/about" },
    "image": {
      "url": "https://cdn.example.com/site/mission.jpg",
      "alt": "Cultivation team and facility"
    }
  }
}
```

> Use your actual asset URL (prefer hosted/CDN). Keep meaningful `alt` text.

---

## 4) Storybook (recommended)

**File**: `src/sections/__stories__/MissionSection_1.stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import MissionSection_1 from "@/sections/MissionSection_1";

const meta: Meta<typeof MissionSection_1> = {
  title: "Sections/MissionSection_1",
  component: MissionSection_1,
};
export default meta;

type Story = StoryObj<typeof MissionSection_1>;

export const Minimal: Story = { args: {} };

export const Typical: Story = {
  args: {
    title: "Our Mission",
    body:
      "We set a new industry standard with premium, patient‑centric medicinal cannabis.",
    cta: { label: "About Apigen", href: "/about" },
    image: {
      url: "https://images.unsplash.com/photo-1556909212-d5d88e9218df?w=1600",
      alt: "Facility"
    },
  },
};
```

Run Storybook and verify light/dark, responsiveness, focus ring on CTA, and reduced‑motion behavior.

---

## 5) QA Checklist

* [ ] Section appears **directly below Hero** on Home.
* [ ] **Mobile**: stacks vertically; spacing looks balanced; no horizontal scroll.
* [ ] **Desktop**: clean two-column layout; image contained; corners rounded.
* [ ] **CTA** routes to **`/about`**; focus ring visible; keyboard accessible.
* [ ] **A11y**: `<h2>` present; image has useful `alt`; contrast meets guidelines.
* [ ] **Motion**: fade/slide-in on scroll; disabled in preview; respects `prefers-reduced-motion`.
* [ ] **No hard-coded colors/fonts**; all styling via Tailwind + tokens.
* [ ] **Pages build** and any renderer tests still pass.

---

## 6) Notes / Conventions

* Keep the component **prop-driven** only (no `fetch`, no `window`, no router logic).
* Prefer **absolute** image URLs for CDN friendliness.
* If future designs need the image/text sides swapped, add a boolean prop like `flip?: boolean` and use `md:order-*` utilities.
* If you prefer to **stagger** heading → paragraph → button, keep the `AppearStack` wrapper as shown; otherwise, you can remove it and rely on the outer `<Appear>` only.

---

### Done = Ready to Merge

Once the above is implemented and the checklist passes, open a PR titled:

> feat(home): add MissionSection_1 as second section (post-Hero)

Include screenshots for desktop & mobile and note accessibility/motion checks.
