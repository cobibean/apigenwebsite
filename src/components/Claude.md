# src/components/ - UI Components

Reusable UI components. Sections (full-width page blocks) are in `src/sections/`.

## Directory Structure

```
components/
├── navigation/
│   ├── Header.tsx        # Main header (exports HeaderProvider)
│   ├── MobileSidebar.tsx  # Mobile slide-out menu
│   ├── Logo.tsx          # Logo component
│   └── NavLink.tsx       # Navigation link
├── modals/
│   ├── ContactModal.tsx
│   ├── TermsAndConditionsModal.tsx
│   ├── PrivacyPolicyModal.tsx
│   └── LegalDisclaimerModal.tsx
├── motion/
│   ├── Appear.tsx        # Scroll-triggered fade-in
│   ├── AppearItem.tsx    # Individual animated item
│   ├── AppearStack.tsx   # Staggered animation container
│   └── ScrollIndicator.tsx
├── ui/
│   ├── dialog.tsx        # Radix Dialog wrapper
│   └── liquid-glass.tsx  # Glassmorphism effect
├── ProductCarousel3D.tsx
├── ProductCarousel3DLandscape.tsx
├── AgeGate.tsx
├── Card.tsx
├── BrandLogoCard.tsx
├── BrandDetailsCard.tsx
├── SeedToHarvestSuccess.tsx
├── AppImage.tsx          # ⚠️ USE THIS instead of next/image
└── AppLink.tsx           # ⚠️ USE THIS instead of next/link
```

---

## Required Wrappers

**Always use these instead of Next.js primitives:**

```tsx
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";

<AppLink href="/about">About</AppLink>
<AppImage src="/image.jpg" alt="Description" width={400} height={300} />
```

---

## Navigation Components

### Header.tsx
Main header with logo, nav links, glass effect on scroll.

**Exports:**
- `Header` - The component
- `HeaderProvider` - Context provider (in layout.tsx)
- `useHeader()` - Hook to control visibility

```tsx
// Hide header (e.g., during modal)
const { setHidden } = useHeader();
setHidden(true);
```

### MobileSidebar.tsx
Slide-out mobile menu. Client component.

### Logo.tsx
Logo with variants for header/footer.

### NavLink.tsx
Navigation link with active state styling.

---

## Modal Components

All modals use Radix Dialog via `ui/dialog.tsx`.

### ContactModal.tsx
Contact form with:
- Form validation
- Country selector (world-countries)
- Submits to `/api/contact`

```tsx
import { useContactModal } from "@/providers/ContactModalProvider";
const { openContactModal } = useContactModal();
```

### Legal Modals
- `TermsAndConditionsModal.tsx`
- `PrivacyPolicyModal.tsx`
- `LegalDisclaimerModal.tsx`

---

## Motion Components

### Appear.tsx
Scroll-triggered fade-in wrapper.

```tsx
<Appear>
  <div>Fades in when scrolled into view</div>
</Appear>
```

### AppearStack.tsx + AppearItem.tsx
Staggered animations for lists.

```tsx
<AppearStack stagger={0.1}>
  <AppearItem>Item 1</AppearItem>
  <AppearItem>Item 2</AppearItem>
  <AppearItem>Item 3</AppearItem>
</AppearStack>
```

### ScrollIndicator.tsx
Custom scroll progress indicator.

---

## UI Primitives

### dialog.tsx
Radix Dialog wrapper with consistent styling.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### liquid-glass.tsx
Glassmorphism effect component used by Header.

---

## Feature Components

### ProductCarousel3D.tsx
3D image carousel (portrait orientation). Client component.

```tsx
<ProductCarousel3D
  images={images}
  autoPlay={true}
  autoPlayDelay={4000}
  ctaButton={{ label: "View All", href: "/cultivars", variant: "olive" }}
/>
```

### AgeGate.tsx
Age verification modal. Checks/sets cookie. Client component.

### Card.tsx
Generic card with consistent styling.

### SeedToHarvestSuccess.tsx
Process timeline component showing seed-to-harvest journey.

---

## Server vs Client Components

| Type | Marker | Use Case |
|------|--------|----------|
| Server | (default) | Static content, no interactivity |
| Client | `"use client"` | Event handlers, state, browser APIs |

**Client components in this codebase:**
- `Header` (scroll detection, context)
- `MobileSidebar` (menu toggle)
- `ContactModal` (form state)
- `AgeGate` (cookie check)
- `ProductCarousel3D` (animation state)
- All motion components

---

## Styling Patterns

```tsx
import { cn } from "@/lib/utils";

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "primary-variant"
)} />

// CSS variables
<div className="bg-[--background] text-[--foreground]" />

// Responsive
<div className="p-4 md:p-6 lg:p-8" />
```

---

## Creating New Components

1. Create file in appropriate subdirectory
2. Define TypeScript interface for props
3. Add `"use client"` if needs interactivity
4. Use `cn()` for conditional classes
5. Import via `@/components/...`

```tsx
interface MyComponentProps {
  title: string;
  variant?: "default" | "alt";
}

export function MyComponent({ title, variant = "default" }: MyComponentProps) {
  return (
    <div className={cn("base", variant === "alt" && "alt-styles")}>
      {title}
    </div>
  );
}
```
