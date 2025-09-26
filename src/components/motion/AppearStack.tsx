"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  gap?: number;
  y?: number;
  preview?: boolean;
};

export default function AppearStack({
  children,
  className,
  delay = 0,
  duration = 0.5,
  gap = 0.06,
  y = 12,
  preview,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const disabled = !!preview;
  const items = React.Children.toArray(children);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={className}>
        {items.map((child, idx) => (
          <m.div
            key={idx}
            initial={disabled ? false : reduced ? { opacity: 0 } : { opacity: 0, y }}
            whileInView={disabled ? {} : reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration, delay: delay + idx * gap, ease: "easeOut" }}
          >
            {child}
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}


