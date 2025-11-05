"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { appearStackConfig } from "@/lib/animations";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  delay?: number; // Additional delay on top of base delay
  duration?: number;
  gap?: number;
  y?: number;
  preview?: boolean;
};

export default function AppearStack({
  children,
  className,
  delay = 0, // Additional delay beyond the base config delay
  duration,
  gap,
  y,
  preview,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const disabled = !!preview;
  const items = React.Children.toArray(children);

  // Use centralized config with optional overrides
  const config = {
    duration: duration ?? appearStackConfig.duration,
    delay: appearStackConfig.delay + delay, // Add base delay + additional delay
    gap: gap ?? appearStackConfig.gap,
    y: y ?? appearStackConfig.y,
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={className}>
        {items.map((child, idx) => (
          <m.div
            key={idx}
            initial={disabled ? false : reduced ? appearStackConfig.reducedMotion : { ...appearStackConfig.fullMotion, y: config.y }}
            whileInView={disabled ? {} : reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={appearStackConfig.viewport}
            transition={{
              duration: config.duration,
              delay: config.delay + idx * config.gap,
              ease: appearStackConfig.ease
            }}
          >
            {child}
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}


