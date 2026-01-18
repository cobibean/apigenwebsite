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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Determine if inline mode based on props
  const isInline = className?.includes("inline-block") || style?.display === "inline-block";

  // Track when element enters viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.3, rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load and prepare SVG (but don't play animation yet)
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
          // Add classes but animation is paused via CSS until triggered
          shape.classList.add(styles.strokePath);
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
            // Reduced motion: show filled immediately
            shape.style.animation = "none";
            shape.style.strokeDasharray = "none";
            shape.style.strokeDashoffset = "0";
            shape.style.fillOpacity = "1";
          }
        });

        // Mark SVG as loaded (ready to animate when in view)
        setSvgLoaded(true);
      })
      .catch(() => {
        // On error, keep showing the static fallback
      });

    return () => {
      cancelled = true;
    };
  }, [src, alt, isInline]);

  // Start animation when both loaded AND in view
  useEffect(() => {
    if (!svgLoaded || !isInView) return;

    const svg = ref.current?.querySelector("svg");
    if (!svg) return;

    const shapes = svg.querySelectorAll<SVGGeometryElement>(
      "path, rect, circle, ellipse, polyline, polygon, line"
    );

    // Add the animate class to start the animation
    shapes.forEach((shape) => {
      shape.classList.add(styles.animate);
    });
  }, [svgLoaded, isInView]);

  // Shared inline styles for both static and animated versions
  const imageStyles: CSSProperties = isInline
    ? { height: "100%", width: "auto", display: "block" }
    : { width: "100%", height: "auto", display: "block" };

  // Show animated version when SVG is loaded AND animation has started (in view)
  const showAnimated = svgLoaded && isInView;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
      }}
      aria-label={alt}
      role="img"
    >
      {/* Static fallback - shown immediately, fades out when animation starts */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{
          ...imageStyles,
          opacity: showAnimated ? 0 : 1,
          transition: "opacity 0.2s ease-out",
          position: showAnimated ? "absolute" : "relative",
          inset: 0,
        }}
      />
      {/* Animated SVG container - fades in when animation starts */}
      <div
        ref={ref}
        className={`${styles.root} ${isInline ? styles.rootInline : ""}`}
        style={{
          opacity: showAnimated ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      />
    </div>
  );
}
