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

/**
 * Scroll-linked hero animation configuration
 * Creates parallax effect as user scrolls, with different layers moving at different speeds
 */
export const heroScrollConfig = {
  // Scroll range: 0% to 30% of hero height triggers the animation
  scrollRange: [0, 0.3] as const,

  // Parallax speeds for different content layers
  // Lower = moves slower (feels further back), Higher = moves faster (feels closer)
  parallax: {
    subtitle: 0.8,
    wordmark: 1.0,
    cta: 1.1,
  },

  // Maximum upward offset in pixels at end of scroll range
  maxOffset: 80,

  // Easing curve for smooth movement (ease-out-cubic)
  ease: [0.33, 1, 0.68, 1] as const,
} as const;
