# UI Architecture Guide
**Apigen Marketing Site — Container, Wrapper & Hierarchy Patterns**

---

## Table of Contents
1. [Global Layout Structure](#global-layout-structure)
2. [Hero Section Anatomy](#hero-section-anatomy)
3. [Standard Section Patterns](#standard-section-patterns)
4. [Motion Wrapper Patterns](#motion-wrapper-patterns)
5. [Centering Strategies](#centering-strategies)
6. [Responsive Width Patterns](#responsive-width-patterns)
7. [Common Pitfalls & Solutions](#common-pitfalls--solutions)

---

## Global Layout Structure

### Root Layout Hierarchy
```
<html>
  └─ <body>                              [Global styles, fonts]
       ├─ <Header />                     [Fixed/sticky nav overlay]
       ├─ <main className="pt-0">        [No top padding - Hero covers from top]
       │    └─ {children}                [Page content via [...slug]/page.tsx]
       └─ <Footer />
```

**Key Points:**
- `<body>` has `overflow-x: hidden` and `width: 100%` to prevent horizontal scroll
- `<main>` uses `pt-0` because Hero is full-viewport and Header overlays it
- Header is positioned to overlay content (not push it down)

**File:** `src/app/layout.tsx`

---

## Hero Section Anatomy

The Hero is a **full-viewport video background with centered overlay content**. It's the most complex layout pattern in the site.

### Complete Hierarchy
```
<section>                                     [Viewport container]
  └─ className="relative w-full h-[100vh] overflow-hidden"
  
  ├─ <div>                                    [Background layer - FIXED]
  │    └─ className="fixed inset-0 -z-10 w-full h-full"
  │         ├─ <video> or <AppImage>          [Full-screen media]
  │         │    └─ className="absolute inset-0 w-full h-full object-cover"
  │         └─ <div>                          [Gradient overlay]
  │              └─ className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"
  │
  └─ <div>                                    [Content container - RELATIVE]
       └─ className="relative h-full w-full flex items-center justify-center px-4"
            └─ <Appear>                       [Motion wrapper]
                 └─ className="w-full flex justify-center"
                      └─ <div>                [Inner content block]
                           └─ className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px] text-center"
                                ├─ <AppImage>           [Wordmark image]
                                └─ <div>                [CTA container]
                                     └─ className="flex justify-center"
                                          └─ <AppLink>  [CTA button]
```

### Layer-by-Layer Breakdown

#### 1. **Section Container** (Viewport Bounds)
```tsx
<section className="relative w-full h-[100vh] overflow-hidden">
```
- **`relative`** — Creates positioning context for both fixed background and absolute content
- **`w-full`** — 100% of parent (body width), NOT viewport units (avoids overflow issues)
- **`h-[100vh]`** — Full viewport height; mobile browsers auto-adjust for URL bars
- **`overflow-hidden`** — Prevents any accidental scroll or overflow

#### 2. **Background Layer** (Fixed Positioning)
```tsx
<div className="fixed inset-0 -z-10 w-full h-full">
```
- **`fixed`** — Stays anchored to viewport; immune to scrolling and URL bar changes
- **`inset-0`** — Shorthand for `top-0 right-0 bottom-0 left-0`
- **`-z-10`** — Behind all content
- **`w-full h-full`** — Explicit sizing to fill fixed positioning context

**Why fixed, not absolute?**
- Absolute positioning can cause relayout when viewport changes (mobile URL bar)
- Fixed positioning is anchored to the window, providing stable background coverage

**Video/Image Inside:**
```tsx
<video className="absolute inset-0 w-full h-full object-cover">
```
- **`absolute inset-0`** — Fills the parent `fixed` container
- **`object-cover`** — Scales to cover entire container while maintaining aspect ratio
- **`w-full h-full`** — Explicit sizing for consistent rendering

#### 3. **Content Overlay** (Flex Centering Container)
```tsx
<div className="relative h-full w-full flex items-center justify-center px-4">
```
- **`relative`** — Creates normal document flow (not fixed like background)
- **`h-full w-full`** — Matches section dimensions
- **`flex items-center justify-center`** — Perfect vertical & horizontal centering
- **`px-4`** — Horizontal padding (16px each side) for mobile edge spacing

**Why padding here, not on inner content?**
- Padding on flex container doesn't interfere with `justify-center` alignment
- Padding on flex children creates asymmetric centering (content shifts left)

#### 4. **Motion Wrapper** (`<Appear>`)
```tsx
<Appear preview={preview} className="w-full flex justify-center">
```
- **`w-full`** — Takes full width of parent flex container
- **`flex justify-center`** — Itself becomes a flex container to center its child
- **Motion behavior:** Fades in with subtle upward motion (opacity 0→1, y: 16→0)

**Critical Pattern:**
- Framer Motion's `m.div` wrapper must participate in the flex layout
- Without `w-full flex justify-center`, the wrapper creates a block context that breaks centering
- This creates a **double-layer centering** strategy (parent + wrapper both use flex)

#### 5. **Inner Content Block** (Responsive Width Control)
```tsx
<div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px] text-center">
```
- **`w-full`** — Takes available width
- **`max-w-[X%]`** — Responsive max-width (NOT fixed width `w-[X%]`)
  - Mobile: 90% of viewport
  - Small: 80%
  - Large: 70%
  - XL: Hard cap at 1100px
- **`text-center`** — Centers inline/inline-block content

**Why max-width instead of width?**
- `w-[90%]` sets a fixed 90% width, which with flex centering can create asymmetry
- `max-w-[90%]` allows the content to be smaller if needed, staying truly centered

#### 6. **CTA Button Container**
```tsx
<div className="mt-6 sm:mt-8 flex justify-center">
  <AppLink className="inline-flex ...">Get in touch</AppLink>
</div>
```
- **`flex justify-center`** — Explicit centering for the button
- Button itself uses `inline-flex` for internal icon/text layout

**File:** `src/sections/Hero.tsx`

---

## Standard Section Patterns

Most content sections follow this pattern:

```tsx
<section className="py-16 md:py-24 lg:py-32">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

### Container Pattern Breakdown

#### 1. **Section Wrapper**
```tsx
<section className="py-16 md:py-24 lg:py-32">
```
- Vertical padding scales with viewport (more space on larger screens)
- Full width by default (no horizontal padding here)

#### 2. **Container** (Content Width Control)
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```
- **`container`** — Tailwind's responsive max-width utility
  - Matches breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **`mx-auto`** — Centers the container horizontally
- **`px-4/6/8`** — Responsive horizontal padding for edge spacing

### Section Variants

#### With Appear Motion
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <Appear>
      <h2>Section Title</h2>
      <p>Content...</p>
    </Appear>
  </div>
</section>
```

#### With Multiple Appear Blocks
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <Appear>
      <h2>Title</h2>
    </Appear>
    
    <AppearStack className="mt-12 grid gap-8 md:grid-cols-3">
      {items.map((item, i) => (
        <AppearItem key={i} index={i}>
          <Card {...item} />
        </AppearItem>
      ))}
    </AppearStack>
  </div>
</section>
```

**Files:** See `src/sections/*.tsx` for examples

---

## Motion Wrapper Patterns

We use three motion components from `src/components/motion/`:

### 1. `<Appear>` — Single Element Entrance
```tsx
<Appear delay={0} duration={0.5} y={16} preview={false}>
  <div>Content fades in from below</div>
</Appear>
```

**Behavior:**
- Opacity: 0 → 1
- Y position: 16px → 0 (subtle upward motion)
- Triggers when element is 10% into viewport
- Animates once (`viewport: { once: true }`)
- Respects `prefers-reduced-motion` (opacity-only fade)

**Implementation Detail:**
```tsx
<m.div
  className={className}  // Pass className to the motion div!
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  // ...
>
  {children}
</m.div>
```

### 2. `<AppearStack>` — Container for Sequential Items
```tsx
<AppearStack className="grid gap-6 md:grid-cols-3">
  {/* Children with AppearItem */}
</AppearStack>
```
- Use as the parent container
- Apply your layout classes (grid, flex, etc.)

### 3. `<AppearItem>` — Individual Items with Stagger
```tsx
{items.map((item, i) => (
  <AppearItem key={i} index={i}>
    <Card {...item} />
  </AppearItem>
))}
```
- Each item animates sequentially
- `index` prop creates stagger delay (index × 0.1s)

**Files:** `src/components/motion/`

---

## Centering Strategies

### Flexbox Centering (Preferred)
```tsx
// Both axes
<div className="flex items-center justify-center">
  <div>Centered content</div>
</div>

// Horizontal only
<div className="flex justify-center">
  <div>Centered horizontally</div>
</div>
```

### Auto Margins
```tsx
// Block element
<div className="mx-auto max-w-2xl">
  Centered with max-width
</div>

// Image or media
<AppImage className="mx-auto" />
```

### Text Centering
```tsx
<div className="text-center">
  <h2>Centered text</h2>
  <p>Also centered</p>
</div>
```

### **ANTI-PATTERN: Don't Do This**
```tsx
// ❌ Mixing percentage width with margin on flex child
<div className="flex justify-center">
  <div className="w-[90%] mx-4">  {/* Creates asymmetry! */}
    Content
  </div>
</div>

// ✅ Instead, do this
<div className="flex justify-center px-4">
  <div className="w-full max-w-[90%]">
    Content
  </div>
</div>
```

**Why?** 
- Flex's `justify-center` calculates center based on child's total width
- Adding margin to the child shifts the visual center
- Add padding to the parent instead

---

## Responsive Width Patterns

### Pattern 1: Percentage-Based with Max Cap
```tsx
<div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px]">
```
- Fluid up to breakpoint thresholds
- Hard cap at 1100px for very large screens
- Use `max-w` not `w` for flexibility

### Pattern 2: Container + Padding
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
```
- Tailwind's container utility
- Auto-centers with `mx-auto`
- Responsive padding for edge spacing

### Pattern 3: Fixed Max-Width with Auto Margins
```tsx
<div className="mx-auto max-w-4xl px-4">
```
- Simple, centered content block
- Works well for text-heavy sections
- Max-width options: `max-w-sm/md/lg/xl/2xl/4xl/6xl/7xl`

### **ANTI-PATTERN: Viewport Units for Width**
```tsx
// ❌ Don't use viewport units for container widths
<div className="w-[90vw]">...</div>

// ✅ Use percentage or container pattern instead
<div className="w-full max-w-[90%]">...</div>
```

**Why?**
- Viewport units (`vw`/`svw`) can exceed document width due to scrollbars
- Nesting viewport units creates overflow issues
- Percentages calculate from parent, which is safer

---

## Common Pitfalls & Solutions

### Issue 1: Content Not Centered (Slightly Left)
**Symptoms:** Content appears ~1-2% left of center

**Cause:** Margin or padding on flex child interferes with `justify-center`

**Solution:**
```tsx
// ❌ Before
<div className="flex justify-center">
  <div className="w-[90%] mx-4">Content</div>
</div>

// ✅ After
<div className="flex justify-center px-4">
  <div className="w-full max-w-[90%]">Content</div>
</div>
```

### Issue 2: Horizontal Scroll / White Gutter on Mobile
**Symptoms:** Right-side white gap appears at ~530px width

**Cause:** 
- Using `w-[100svw]` for container widths
- Nested viewport units (e.g., `w-[90vw]` inside `w-[100vw]`)
- Missing `box-sizing: border-box` with padding

**Solution:**
```tsx
// ❌ Before
<section className="w-[100svw]">
  <div className="w-[90vw] px-4">Content</div>
</section>

// ✅ After
<section className="w-full">
  <div className="w-full max-w-[90%]">Content</div>
</section>
```

**Global Fix:** Always enforce in `globals.css`:
```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
html, body {
  overflow-x: hidden;
  width: 100%;
}
```

### Issue 3: Motion Wrapper Breaking Layout
**Symptoms:** Content not centering when wrapped in `<Appear>`

**Cause:** Framer Motion's `m.div` creates a block context that doesn't participate in parent's flex layout

**Solution:**
```tsx
// ❌ Before
<div className="flex justify-center">
  <Appear>
    <div>Content</div>
  </Appear>
</div>

// ✅ After
<div className="flex justify-center">
  <Appear className="w-full flex justify-center">
    <div>Content</div>
  </Appear>
</div>
```

**Key:** Pass `className` to `<Appear>` so the `m.div` becomes a flex container too

### Issue 4: Desktop Bottom Gap After Refresh
**Symptoms:** 1-2px gap at bottom of Hero on some refreshes

**Cause:** 
- Switching between viewport units (`100svh` vs `100vh`) at breakpoints
- Absolute positioned background causing relayout

**Solution:**
```tsx
// ❌ Before
<section className="h-[100svh] md:h-[100vh]">
  <div className="absolute inset-0">Background</div>
</section>

// ✅ After
<section className="h-[100vh]">
  <div className="fixed inset-0">Background</div>
</section>
```

**Key:** Use `fixed` positioning for full-screen backgrounds to eliminate relayout

### Issue 5: Content Width Doesn't Respond to Breakpoints
**Symptoms:** Width stays the same across mobile and desktop

**Cause:** Using fixed width instead of responsive utilities

**Solution:**
```tsx
// ❌ Before
<div className="w-[80%]">Content</div>

// ✅ After
<div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px]">
  Content
</div>
```

---

## Quick Reference: Layer Hierarchy

### Hero (Full-Screen Video Background)
```
Section (relative, 100vh)
├─ Background (fixed, -z-10)
│   └─ Video/Image (absolute, object-cover)
└─ Content (relative, flex center, px-4)
    └─ Appear (w-full, flex center)
        └─ Inner Block (w-full, max-w-[%])
            └─ Actual Content
```

### Standard Section
```
Section (py-16)
└─ Container (container, mx-auto, px-4)
    └─ Appear
        └─ Content
```

### Section with Grid
```
Section (py-16)
└─ Container (container, mx-auto, px-4)
    ├─ Appear
    │   └─ Heading
    └─ AppearStack (grid, gap-6)
        └─ AppearItem × N
            └─ Card/Component
```

### Header (Overlay)
```
<body>
├─ Header (fixed, top-0, z-50, backdrop-blur)
├─ Main (pt-0)
│   └─ Hero starts at top
└─ Footer
```

---

## Best Practices Summary

1. ✅ **Use `w-full` for container widths**, not viewport units (`vw`/`svw`)
2. ✅ **Use percentages relative to parent**, not viewport
3. ✅ **Add padding to flex parent**, not flex child (for centering)
4. ✅ **Use `max-w-[%]` not `w-[%]`** for responsive width control
5. ✅ **Use `fixed` for full-screen backgrounds**, not `absolute`
6. ✅ **Pass `className` to motion wrappers** when they need layout participation
7. ✅ **Enforce `box-sizing: border-box`** globally
8. ✅ **Use consistent viewport units** (`100vh`), don't mix `svh`/`vh` at breakpoints
9. ✅ **Test at 530px width** — reveals most viewport/padding issues
10. ✅ **Prefer Tailwind utilities** over custom CSS for consistency

---

## Additional Resources

- **Component Examples:** `src/sections/*.tsx`
- **Motion Components:** `src/components/motion/`
- **Global Styles:** `src/app/globals.css`
- **Layout:** `src/app/layout.tsx`
- **Viewport Issue Deep-Dive:** `docs/Mobile-Viewport-Status.md`

---

**Last Updated:** October 2, 2025  
**Maintained by:** Development Team
