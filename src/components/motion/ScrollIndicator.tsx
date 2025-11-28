"use client";

import React from "react";
import { m, MotionValue, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  scrollProgress: MotionValue<number>;
  className?: string;
};

/**
 * Animated scroll indicator (chevron) that appears at bottom of hero
 * Fades out as user begins scrolling
 */
export default function ScrollIndicator({ scrollProgress, className }: Props) {
  const prefersReducedMotion = useReducedMotion();

  // Fade out as user scrolls (0 scroll = full opacity, fades over first 50% of range)
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <m.div
      className={`absolute bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 ${className ?? ""}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Subtle bounce animation on the chevron */}
      <m.div
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white/60"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </m.div>
    </m.div>
  );
}

