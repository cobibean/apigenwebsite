"use client";
import React from "react";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  gap?: number;
  y?: number;
  preview?: boolean;
};

export default function AppearStack({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.5,
  gap = 0.06,
  y = 12,
  preview,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  const disable = preview || prefersReducedMotion;
  const items = React.Children.toArray(children);
  const Tag: any = m[as as any] ?? m.div;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={className}>
        {items.map((child, idx) => (
          <Tag
            key={idx}
            initial={disable ? false : { opacity: 0, y }}
            whileInView={disable ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration, delay: delay + idx * gap, ease: "easeOut" }}
          >
            {child}
          </Tag>
        ))}
      </div>
    </LazyMotion>
  );
}


