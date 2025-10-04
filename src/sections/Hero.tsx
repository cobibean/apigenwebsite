"use client";
import React, { useEffect, useMemo, useState } from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import { buttonClass } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  subtitle?: string;
  title?: string;
  copy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtas?: Array<{ label: string; href: string; variant?: "brown" | "olive" | "neutral" }>; 
  wordmarkMaxWidth?: string; // e.g., "900px" or "65%"; controls textImage scaling
  contentOffsetY?: string; // e.g., "12px" or "1rem"; positive moves cluster down
  subtitleGap?: string; // bottom margin under subtitle
  ctaGap?: string; // top margin above CTA row
  imageUrl?: string;
  imageAlt?: string;
  videoSrc?: string;
  posterSrc?: string;
  textImageUrl?: string;
  preview?: boolean;
};

export default function Hero({
  eyebrow = "Apigen",
  subtitle,
  title = "Premium dried cannabis, exported consistently.",
  copy = "Ethical, compliant, patient-first.",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
  secondaryCtas,
  wordmarkMaxWidth = "70%",
  contentOffsetY = "0px",
  subtitleGap = "1.5rem", // 24px default
  ctaGap = "2rem", // 32px default (matches mt-8 approx)
  imageUrl,
  imageAlt = "",
  videoSrc = "/hero/herovid1.mp4",
  posterSrc,
  textImageUrl = "/hero/APIGEN hero text.png",
  preview,
}: Props) {
  const [useVideo, setUseVideo] = useState(true);
  const poster = useMemo(() => posterSrc || imageUrl || "/hero/APIGEN hero text.png", [posterSrc, imageUrl]);

  // Respect reduced motion and allow graceful fallback
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setUseVideo(false);
    const onChange = () => setUseVideo(!mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <section data-block="Hero" data-variant="video" className="relative w-full h-[100vh] overflow-hidden">
      {/* Fixed background layer - prevents viewport relayout issues */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        {useVideo ? (
          <video
            key={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            onError={() => setUseVideo(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <AppImage src={poster} alt={imageAlt || ""} fill sizes="100vw" className="object-cover object-center" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content overlay - uses flex centering without viewport units */}
      <div className="relative h-full w-full flex items-center justify-center px-4">
        <Appear preview={preview} className="w-full flex justify-center">
          <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px] text-center" style={{ transform: `translateY(${contentOffsetY})` }}>
            {subtitle && (
              <div className="mt-2 text-center text-[28px] leading-none tracking-[-0.05em] uppercase" style={{ fontFamily: "var(--font-mono)", marginBottom: subtitleGap }}>
                {subtitle}
              </div>
            )}
            {textImageUrl ? (
              <AppImage src={textImageUrl} alt="Apigen hero text" width={1600} height={350} className="w-full h-auto mx-auto" style={{ maxWidth: wordmarkMaxWidth }} />
            ) : (
              <>
                <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
                <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{title}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-[var(--secondary-foreground)]">{copy}</p>
              </>
            )}
            <div className="flex justify-center gap-5" style={{ marginTop: ctaGap }}>
              <AppLink href={ctaHref} className={buttonClass({ variant: "olive", size: "lg" })}>
                {ctaLabel}
              </AppLink>
              {secondaryCtas?.map((b) => (
                <AppLink key={b.href + b.label} href={b.href} className={buttonClass({ variant: b.variant || "brown", size: "lg" })}>
                  {b.label}
                </AppLink>
              ))}
            </div>
          </div>
        </Appear>
      </div>
    </section>
  );
}


