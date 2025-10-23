# Video Background Implementation Guide

## Overview
This document tracks the implementation of video backgrounds across all pages and provides instructions for adding/removing video backgrounds.

## Current Implementation Status

### Pages WITH Video Backgrounds ✅
- **`/` (Home)**: Uses full Hero component with video background + content
- **`/about`**: Uses `background-only` Hero + transparent AboutStory
- **`/brands`**: Uses `background-only` Hero + BrandGrid (already transparent)
- **`/for-doctors`**: Uses full Hero component with video background + content
- **`/for-pharmacists`**: Uses full Hero component with video background + content  
- **`/for-patients`**: Uses full Hero component with video background + content
- **`/contact`**: Uses full Hero component with video background + content

### Pages WITHOUT Video Backgrounds ❌
- **`/news`**: No Hero component (starts with NewsList)

## Implementation Methods

### Method 1: Full Hero Component (with content)
```json
{
  "type": "Hero",
  "props": {
    "eyebrow": "Page Title",
    "title": "Main headline",
    "copy": "Description text",
    "videoSrc": "/hero/herovid1.mp4",
    "posterSrc": "/hero/APIGEN hero text.png"
  }
}
```
**Used on**: `/`, `/for-doctors`, `/for-pharmacists`, `/for-patients`, `/contact`

### Method 2: Background-Only Hero (no content)
```json
{
  "type": "Hero", 
  "props": {
    "variant": "background-only",
    "videoSrc": "/hero/herovid1.mp4",
    "posterSrc": "/hero/APIGEN hero text.png"
  }
}
```
**Used on**: `/about`, `/brands`

## Component Transparency Requirements

### Components That Need Transparency Props
When using `background-only` Hero, these components need transparency props to avoid covering the video:

#### AboutStory Component
- **Problem**: Has `bg-[var(--bg)]` background
- **Solution**: Add `transparent: true` prop
- **Usage**: 
```json
{
  "type": "AboutStory",
  "props": {
    "title": "Our Story",
    "transparent": true,
    "cards": [...]
  }
}
```

#### BrandGrid Component
- **Status**: ✅ Already transparent (no background)
- **No changes needed**

#### CTA Component  
- **Status**: ✅ Already transparent (no background)
- **No changes needed**

#### NewsList Component
- **Status**: ✅ Already transparent (no background)
- **No changes needed**

## How to Add Video Background to Any Page

### Step 1: Add Background-Only Hero
Add this block as the FIRST block in the page:
```json
{
  "type": "Hero",
  "props": {
    "variant": "background-only", 
    "videoSrc": "/hero/herovid1.mp4",
    "posterSrc": "/hero/APIGEN hero text.png"
  }
}
```

### Step 2: Make Components Transparent
For any components that have `bg-[var(--bg)]` or similar backgrounds, add transparency props:

#### If using AboutStory:
```json
{
  "type": "AboutStory",
  "props": {
    "transparent": true,
    // ... other props
  }
}
```

#### If using other components:
Check if they have explicit backgrounds and add transparency props as needed.

## How to Remove Video Background from Any Page

### Step 1: Remove Hero Block
Remove the Hero block from the page's blocks array.

### Step 2: Restore Component Backgrounds
If you added `transparent: true` to any components, remove that prop to restore their backgrounds.

## Technical Details

### Video Background Implementation
- **Video source**: `/hero/herovid1.mp4`
- **Poster image**: `/hero/APIGEN hero text.png`
- **Z-index**: `-z-10` (behind all content)
- **Positioning**: `fixed inset-0` (covers full viewport)
- **Overlay**: Currently disabled (commented out)

### Hero Component Variants
- **`fullscreen`** (default): Video background + Hero content (eyebrow, title, CTA)
- **`section`**: No video, just Hero content in a section
- **`background-only`**: Video background only, no Hero content

## Files Modified
- `src/sections/Hero.tsx` - Added `background-only` variant
- `src/sections/AboutStory.tsx` - Added `transparent` prop
- `src/content/pages.json` - Updated page configurations
- `docs/hero-overlay-experiments.md` - Tracks overlay experiments

## Testing Checklist
- [ ] Video plays behind header/navbar
- [ ] Video extends into main content area (not just header)
- [ ] No white background showing through
- [ ] Content is readable over video background
- [ ] Page loads without errors
- [ ] Video respects `prefers-reduced-motion`

## Rollback Instructions
To remove video backgrounds from all pages:
1. Remove Hero blocks from `/about` and `/brands` in `pages.json`
2. Remove `transparent: true` from AboutStory components
3. Video backgrounds will remain on other pages (Home, Contact, For-Doctors, etc.)
