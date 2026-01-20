# Cultivars Page Carousel Adjustment Plan

## Objective
Update the 2 carousels underneath each hero section on `/cultivars` page with client-provided exact images (3 images per carousel). Adjust carousel dimensions to accommodate taller, skinnier images (phone screen aspect ratio).

## Current State

### Page Structure
- `/cultivars` page (`src/app/cultivars/page.tsx`) renders 2 `ProductShowcase` components:
  1. **Cadillac Rainbow** (`cultivar-cadillac-rainbow-supporting`)
  2. **Dante's Inferno** (`cultivar-dantes-inferno-supporting`)

### Carousel Implementation
- Each `ProductShowcase` component (`src/sections/ProductShowcase.tsx`) renders a `ProductCarousel3DLandscape` carousel (lines 265-274)
- Carousels currently use:
  - Supabase carousel data via `getCarouselImagesBySlugWithFallback()` with slug pattern: `cultivar-${strain.id}-supporting`
  - Fallback to `strain.images.slice(0, 3)` from `src/data/cultivars.ts`
- Current carousel dimensions (from `ProductCarousel3DLandscape.tsx`):
  - Card width: `w-80 md:w-[480px]` (320px mobile, 480px desktop)
  - Card height: `h-[240px] md:h-[320px]` (240px mobile, 320px desktop)
  - Aspect ratio: ~4:3 (landscape)

## Requirements

1. **Update Image Sources**
   - Replace images in both carousels with client-provided exact 3 images
   - Images will be taller and skinnier (phone screen aspect ratio ~9:16 or similar)

2. **Adjust Carousel Dimensions**
   - Confirm exact dimensions with client before implementation
   - Update `ProductCarousel3DLandscape` component to accommodate taller, skinnier aspect ratio
   - Maintain responsive behavior (mobile + desktop)

3. **Image Management Options**
   - Option A: Update via Supabase admin portal (`/admin/carousels/cultivar-{id}-supporting`)
   - Option B: Update fallback images in `src/data/cultivars.ts` (temporary until admin portal is updated)

## Implementation Steps

### Phase 1: Confirm Dimensions
1. **Get client confirmation** on exact image dimensions/aspect ratio
2. **Calculate carousel card dimensions** based on:
   - Image aspect ratio (e.g., 9:16 for phone screen)
   - Desired display width
   - Responsive breakpoints

### Phase 2: Update Images
1. **Receive client images** (3 per cultivar = 6 total images)
2. **Upload images** to `public/cultivars/{cultivar-id}/` directory
3. **Update carousel data**:
   - **Preferred**: Update via Supabase admin portal (`/admin/carousels/cultivar-cadillac-rainbow-supporting` and `/admin/carousels/cultivar-dantes-inferno-supporting`)
   - **Fallback**: Update `src/data/cultivars.ts` `images` arrays (first 3 images per cultivar)

### Phase 3: Adjust Carousel Component
1. **Update `ProductCarousel3DLandscape.tsx`**:
   - Modify `SPACING` constants:
     - `cardWidth`: Adjust for skinnier images (e.g., `w-64 md:w-[360px]`)
     - `cardHeight`: Adjust for taller images (e.g., `h-[360px] md:h-[480px]`)
   - Update `containerMinHeight` if needed
   - Verify aspect ratio calculations in image rendering

2. **Test responsive behavior**:
   - Mobile viewport (< 768px)
   - Desktop viewport (≥ 768px)
   - Ensure images display correctly without distortion

### Phase 4: Verification
1. **Visual testing**:
   - Verify both carousels display correct images
   - Check image aspect ratios match design intent
   - Ensure no image distortion or cropping issues

2. **Functional testing**:
   - Carousel navigation (swipe, arrows, dots)
   - Auto-play functionality
   - Responsive breakpoints

## Files to Modify

1. **`src/components/ProductCarousel3DLandscape.tsx`**
   - Update `SPACING` constants for new dimensions
   - Adjust card width/height for taller, skinnier aspect ratio

2. **`src/data/cultivars.ts`** (if using fallback method)
   - Update first 3 images in each cultivar's `images` array

3. **Supabase Admin Portal** (preferred method)
   - Update carousel slugs: `cultivar-cadillac-rainbow-supporting`
   - Update carousel slug: `cultivar-dantes-inferno-supporting`

## Notes

- **Image aspect ratio**: Client will confirm exact dimensions before implementation
- **Image count**: Exactly 3 images per carousel (6 total images)
- **Image location**: Images will be uploaded to `public/cultivars/{cultivar-id}/` directory
- **Admin portal**: Preferred method for image management (allows future updates without code changes)
- **Fallback method**: Update `cultivars.ts` if admin portal not available

## Success Criteria

- [ ] Both carousels display exact 3 client-provided images
- [ ] Carousel dimensions accommodate taller, skinnier aspect ratio
- [ ] Images display without distortion or unwanted cropping
- [ ] Responsive behavior works correctly on mobile and desktop
- [ ] Carousel navigation and auto-play function correctly
