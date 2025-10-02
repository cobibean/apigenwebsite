"use client";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  backgroundOpacity?: number; // 0..1 opacity for white overlay
  distort?: boolean; // enable subtle SVG displacement
};

export default function GlassEffect({ className = "", children, backgroundOpacity = 0.4, distort = false, ...rest }: Props) {
  // Layered glass wrapper inspired by the reference, tuned for perf
  const overlayOpacity = Math.max(0, Math.min(1, backgroundOpacity));
  return (
    <div className={"relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/10 " + className} {...rest}>
      {distort ? (
        <svg aria-hidden className="absolute pointer-events-none" width="0" height="0" style={{ position: "absolute" }}>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="softMap" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      ) : null}
      <div className={"absolute inset-0 z-0 isolate backdrop-blur-xl " + (distort ? "[filter:url(#glass-distortion)]" : "")} />
      <div className="absolute inset-0 z-10" style={{ background: `rgba(255,255,255, ${overlayOpacity})` }} />
      <div
        className="absolute inset-0 z-20 rounded-3xl"
        style={{
          boxShadow: "inset 2px 2px 1px rgba(255,255,255,0.45), inset -1px -1px 1px rgba(0,0,0,0.15)",
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );
}


