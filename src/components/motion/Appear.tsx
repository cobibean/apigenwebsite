"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  preview?: boolean;
};

export default function Appear({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 16,
  preview,
}: Props) {
  const Tag: any = m[as as any] ?? m.div;
  const prefersReducedMotion = useReducedMotion();
  const disable = preview || prefersReducedMotion;
  return (
    <LazyMotion features={domAnimation} strict>
      <Tag
        className={className}
        initial={disable ? false : { opacity: 0, y }}
        whileInView={disable ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
}


