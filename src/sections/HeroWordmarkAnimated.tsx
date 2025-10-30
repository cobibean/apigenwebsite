"use client";
import React, { CSSProperties, useEffect, useRef } from "react";
import styles from "./HeroWordmarkAnimated.module.css";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export default function HeroWordmarkAnimated({ src, alt = "Apigen hero text", className, style }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  
  // Determine if inline mode based on props
  const isInline = className?.includes("inline-block") || style?.display === "inline-block";

  useEffect(() => {
    let cancelled = false;
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    // Fetch the SVG markup and inline it for stroke animation control
    fetch(src)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled || !ref.current) return;
        ref.current.innerHTML = svgText;
        const svg = ref.current.querySelector("svg");
        if (!svg) return;
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", alt);
        svg.classList.add(styles.svgRoot);
        // Apply inline styles if in inline mode
        if (isInline) {
          svg.classList.add(styles.svgRootInline);
          // Ensure SVG respects parent height constraint but allows overflow
          svg.style.height = "100%";
          svg.style.width = "auto";
          svg.style.overflow = "visible";
          // Ensure parent container allows overflow
          if (ref.current) {
            ref.current.style.overflow = "visible";
          }
        }

        const shapes = svg.querySelectorAll<SVGGeometryElement>(
          "path, rect, circle, ellipse, polyline, polygon, line"
        );

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const reduce = mq.matches;

        const baseDrawDur = 1.0; // seconds
        const perItemDelay = 0.03; // seconds per path
        const fillLag = 0.85; // fill starts after most of the stroke draws

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
            // Reduced motion: snap to final state
            shape.style.animation = "none";
            shape.style.strokeDasharray = "none";
            shape.style.strokeDashoffset = "0";
            shape.style.fillOpacity = "1";
          }
        });
      })
      .catch(() => {
        if (cancelled || !ref.current) return;
        // Fallback to plain image
        ref.current.innerHTML = `<img src="${src}" alt="${alt ?? ""}" style="display:block;width:100%;height:auto;" />`;
      });

    return () => {
      cancelled = true;
    };
  }, [src, alt, isInline]);
  
  return (
    <div className={className} style={style} aria-label={alt} role="img">
      <div ref={ref} className={`${styles.root} ${isInline ? styles.rootInline : ""}`} />
    </div>
  );
}

