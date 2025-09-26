"use client";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode };

export default function GlassEffect({ className = "", children, ...rest }: Props) {
  // Lightweight glass wrapper; keep filters modest per perf guidance
  return (
    <div
      className={
        "rounded-2xl border backdrop-blur-2xl bg-white/10 dark:bg-neutral-900/40 border-white/15 dark:border-white/10 " +
        className
      }
      {...rest}
    >
      {children}
    </div>
  );
}


