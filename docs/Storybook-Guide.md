# Storybook Guide

This guide explains what Storybook is and how we’ll use it on the Apigen website. It’s written for non‑developers too.

## What is Storybook?
Storybook is like a “showroom” for the pieces of a website. Each piece (a “component” or a full “section” like the Hero or Logo grid) can be opened by itself so we can see how it looks and behaves—without clicking around the whole site.

Think: a tray of Lego blocks you can pick up and preview one by one.

## Why are we using it?
- Consistency: Every section follows the same design tokens and props.
- Speed: Designers and PMs can review a component without navigating the live site.
- Safety: We test visuals and accessibility in isolation before shipping.
- Documentation: Each component has examples (stories) showing “minimal”, “typical”, and “maxed” props.

## What is it for (in this project)?
- Previewing the core sections (Hero, LogoCloud, FeatureGrid, Stats, BrandGrid, CTA, NewsList, DocList, Disclaimer, Footer, JourneyRow).
- Checking accessibility basics (contrast, focus, reduced‑motion) with the a11y addon.
- Validating that links use `AppLink` and images use `AppImage` with required alt/sizes.
- Seeing how components respond to different prop values—no data fetching involved.

## How we’ll use it (our workflow)
1) Build a section to be “prop‑driven” (no data fetching inside).
2) Add three stories:
   - Minimal: the least props needed.
   - Typical: what we expect most pages to use.
   - Max: shows all features/variants.
3) Open Storybook to review visuals, copy, and behavior (including reduced‑motion).
4) Make tweaks until it feels right—then plug the section into a real page.

## How to run it (local machine)
- Start Storybook (development):
```bash
npm run storybook
```
  - Opens at http://localhost:6006

- Build static Storybook (for sharing/CI):
```bash
npm run storybook:build
```
  - Outputs to the `storybook-static/` folder.

## How to use it (in the UI)
- Left panel: list of sections. Click a name (for example “Sections/Hero”).
- Center: the preview of that section.
- Right panel: “Controls” to change props live (title text, logo list, etc.).
- A11y tab: runs quick accessibility checks (contrast/focus basics).

## What’s a “story”?
A story = a saved example of a component/section with a specific set of props.
We include three common stories for each section: `Minimal`, `Typical`, and `Max`.

Example (simple outline, not code you need to remember):
```ts
// src/sections/Hero.stories.tsx
export const Minimal = { args: {} };
export const Typical = { args: { title: "Premium quality" } };
export const Max = { args: { imageUrl: "/vercel.svg", imageAlt: "" } };
```

## Good to know
- Reduced‑motion: Our components respect the OS “reduce motion” setting. Storybook lets us visually confirm that animations fall back to fade‑only.
- Tokens: Colors/spacing/typography come from our theme variables, so components look consistent.
- No real data: Stories pass in props. That’s on purpose—so sections stay editor‑ready.

## Troubleshooting
- Storybook doesn’t start or shows a blank screen:
  - Try stopping it and running again: `Ctrl+C`, then `npm run storybook`.
  - Clear SB cache: stop SB, then `rm -rf node_modules/.cache/storybook`, start again.
- “React is not defined” or similar:
  - We’ve configured Storybook’s builder to use the correct JSX runtime. A restart usually resolves this.
- Styles look “off”:
  - Our global tokens are imported in `.storybook/preview.ts` via the app’s `globals.css`. A restart or hard refresh usually helps.

## Recap
- Storybook = our visual lab for sections.
- Use it to preview, tweak props, and check a11y before pages.
- Start with `npm run storybook`; browse the sections; use Controls to try different props.

If you want a walkthrough in a call, we can open Storybook, pick a section, and tune props together in minutes.
