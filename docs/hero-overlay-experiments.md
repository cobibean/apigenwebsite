# Hero Video Overlay Experiments

## Current State (Before Changes)
- **Current overlay**: `bg-gradient-to-t from-black/40 to-transparent`
- **Effect**: Dark gradient from bottom (40% black) to transparent at top
- **Location**: `src/sections/Hero.tsx` line 130

## Experiment Options

### Option 1: Very Light White Overlay
- **Code**: `<div className="absolute inset-0 bg-white/10 pointer-events-none" />`
- **Effect**: 10% white overlay, video shows through subtly
- **Status**: NOT SATISFACTORY - Video not visible at all

### Option 2: Light Gradient Overlay ✅ CURRENT
- **Code**: `<div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />`
- **Effect**: Subtle white gradient from bottom to top
- **Status**: IMPLEMENTED

### Option 3: No Overlay (Raw Video)
- **Code**: Remove overlay div entirely
- **Effect**: Raw video background with no overlay
- **Status**: PENDING

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
