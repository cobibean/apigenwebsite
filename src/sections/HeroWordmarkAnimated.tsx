"use client";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./HeroWordmarkAnimated.module.css";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  fallbackSrc?: string;
};

export default function HeroWordmarkAnimated({
  src,
  alt = "Apigen hero text",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  // Determine if inline mode based on props
  const isInline = className?.includes("inline-block") || style?.display === "inline-block";

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;

    // Fetch the SVG markup and inline it for stroke animation control
    fetch(src)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled || !ref.current) return;
        
        // Add inline constraints to prevent flash at native SVG size
        const constrainedSvg = svgText.replace(
          '<svg ',
          '<svg style="width:100%;height:auto;max-width:inherit;display:block;" '
        );
        ref.current.innerHTML = constrainedSvg;
        const svg = ref.current.querySelector("svg");
        if (!svg) return;
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", alt);
        svg.classList.add(styles.svgRoot);
        
        // Apply inline styles if in inline mode
        if (isInline) {
          svg.classList.add(styles.svgRootInline);
          svg.style.height = "100%";
          svg.style.width = "auto";
          svg.style.overflow = "visible";
          if (ref.current) {
            ref.current.style.overflow = "visible";
          }
        }

        // Align SVG with any provided inline offset
        const computedStyle = window.getComputedStyle(el);
        const offset = computedStyle.getPropertyValue("--wordmark-inline-offset")?.trim();
        if (offset) {
          svg.style.transform = `translateY(${offset})`;
          svg.style.verticalAlign = "baseline";
        }

        const shapes = svg.querySelectorAll<SVGGeometryElement>(
          "path, rect, circle, ellipse, polyline, polygon, line"
        );

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const reduce = mq.matches;

        const baseDrawDur = 1.0;
        const perItemDelay = 0.03;
        const fillLag = 0.85;

        shapes.forEach((shape, i) => {
          shape.classList.add(styles.strokePath, styles.animate);
          let len = 0;
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            len = (shape as any).getTotalLength?.() ?? 0;
          } catch {
            len = 0;
          }

          if (len > 0) {
            shape.style.strokeDasharray = String(len);
            shape.style.strokeDashoffset = String(len);
          }

          if (!reduce) {
            const drawDelay = i * perItemDelay;
            const fillDelay = drawDelay + baseDrawDur * fillLag;
            shape.style.setProperty("--draw-dur", `${baseDrawDur}s`);
            shape.style.setProperty("--fill-dur", `0.6s`);
            shape.style.setProperty("--draw-delay", `${drawDelay}s`);
            shape.style.setProperty("--fill-delay", `${fillDelay}s`);
          } else {
            shape.style.animation = "none";
            shape.style.strokeDasharray = "none";
            shape.style.strokeDashoffset = "0";
            shape.style.fillOpacity = "1";
          }
        });

        // Mark as ready - this reveals the component
        setIsReady(true);
      })
      .catch(() => {
        if (cancelled || !ref.current) return;
        // Fallback to plain image if SVG fails to load
        ref.current.innerHTML = `<img src="${src}" alt="${alt ?? ""}" style="display:block;width:100%;height:auto;" />`;
        setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src, alt, isInline]);
  
  return (
    <div 
      className={className} 
      style={{ 
        ...style, 
        // Hide until SVG is loaded and ready - prevents flash
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.15s ease-out',
      }} 
      aria-label={alt} 
      role="img"
    >
      <div ref={ref} className={`${styles.root} ${isInline ? styles.rootInline : ""}`} />
    </div>
  );
}
