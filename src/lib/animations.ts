/**
 * Centralized animation configuration for consistent motion design
 * Used by Appear and AppearStack components across the site
 */

export const appearConfig = {
  // Base animation timing
  duration: 0.6,
  ease: "easeOut",

  // Base delay before animation starts
  delay: 0.1,

  // Motion properties
  y: 16, // Vertical offset for slide-up effect

  // Reduced motion settings (opacity only, no transforms)
  reducedMotion: {
    opacity: 0,
  },

  // Full motion settings (opacity + transform)
  fullMotion: {
    opacity: 0,
    y: 16,
  },

  // Viewport settings for triggering animations
  viewport: {
    once: true,
    margin: "-10% 0px -10% 0px",
  },
} as const;

export const appearStackConfig = {
  // Inherit base config
  ...appearConfig,

  // Stagger timing between items
  gap: 0.08, // Time between each item's animation start

  // Slightly smaller vertical offset for stacks
  y: 12,
} as const;
