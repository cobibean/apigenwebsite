"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  preview?: boolean;
};

export default function AppearItem({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 12,
  preview,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const disabled = !!preview;
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={disabled ? false : reduced ? { opacity: 0 } : { opacity: 0, y }}
        whileInView={disabled ? {} : reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}


