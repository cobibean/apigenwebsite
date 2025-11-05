"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import { appearConfig } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Additional delay on top of base delay
  duration?: number;
  y?: number;
  preview?: boolean;
};

export default function Appear({
  children,
  className,
  delay = 0, // Additional delay beyond the base config delay
  duration,
  y,
  preview,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const disabled = !!preview;

  // Use centralized config with optional overrides
  const config = {
    duration: duration ?? appearConfig.duration,
    delay: appearConfig.delay + delay, // Add base delay + additional delay
    y: y ?? appearConfig.y,
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={disabled ? false : reduced ? appearConfig.reducedMotion : { ...appearConfig.fullMotion, y: config.y }}
        whileInView={disabled ? {} : reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={appearConfig.viewport}
        transition={{ duration: config.duration, delay: config.delay, ease: appearConfig.ease }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}


