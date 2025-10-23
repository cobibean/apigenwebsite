# Hero Video Overlay Experiments

## Current State (Before Changes)
- **Current overlay**: `bg-gradient-to-t from-black/40 to-transparent`
- **Effect**: Dark gradient from bottom (40% black) to transparent at top
- **Location**: `src/sections/Hero.tsx` line 130

## New Background-Only Variant ✅ IMPLEMENTED
- **Purpose**: Provide video background without Hero content (eyebrow, title, CTA)
- **Usage**: `/about` and `/brands` pages now use `variant: "background-only"`
- **Effect**: Clean video background that doesn't interfere with existing page content
- **Status**: IMPLEMENTED - Pages now have video background without content overlay

## Background Coverage Fix ✅ IMPLEMENTED
- **Problem**: AboutStory component had `bg-[var(--bg)]` that was covering video background
- **Solution**: Added `transparent` prop to AboutStory component
- **Usage**: `/about` page now uses `transparent: true` for AboutStory
- **Effect**: Video background now extends through entire page content area
- **Status**: IMPLEMENTED - Video background covers full viewport on /about page

## Comprehensive Documentation
- **Full implementation guide**: See `docs/video-background-implementation.md`
- **Covers**: All pages, component transparency requirements, rollback instructions

## Experiment Options

### Option 1: Very Light White Overlay
- **Code**: `<div className="absolute inset-0 bg-white/10 pointer-events-none" />`
- **Effect**: 10% white overlay, video shows through subtly
- **Status**: NOT SATISFACTORY - Video not visible at all

### Option 2: Light Gradient Overlay
- **Code**: `<div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />`
- **Effect**: Subtle white gradient from bottom to top
- **Status**: TESTED - Video still not visible enough

### Option 3: No Overlay (Raw Video) ✅ CURRENT
- **Code**: Remove overlay div entirely (commented out)
- **Effect**: Raw video background with no overlay
- **Status**: IMPLEMENTED - Testing visibility without any overlay

### Option 4: Animated Fade-Out Overlay
- **Code**: `<div className="absolute inset-0 bg-white/20 animate-fade-out pointer-events-none" />`
- **CSS**: 
  ```css
  @keyframes fadeOutOverlay {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  .animate-fade-out {
    animation: fadeOutOverlay 3s ease-in-out forwards;
  }
  ```
- **Effect**: Starts with 20% white overlay, fades to transparent over 3 seconds
- **Status**: PENDING

## Rollback Instructions
To return to original state:
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
```
