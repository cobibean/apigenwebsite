"use client";
import React, { useEffect, useMemo, useState } from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import { buttonClass } from "@/lib/utils";
import HeroWordmarkAnimated from "./HeroWordmarkAnimated";

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
  variant?: "fullscreen" | "section";
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
  textImageUrl = "/hero/herotext/APIGEN_hero_text_COPPER.svg",
  preview,
  variant = "fullscreen",
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

  if (variant === "section") {
    return (
      <section data-block="Hero" data-variant="section" className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 sm:gap-10 lg:gap-12">
          <Appear preview={preview} className="w-full flex justify-center">
            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[1100px] text-center" style={{ transform: `translateY(${contentOffsetY})` }}>
              {subtitle && (
                <div className="mt-1 sm:mt-2" style={{ marginBottom: subtitleGap }}>
                  <span
                    className="mx-auto block max-w-[min(88%,380px)] text-center text-[clamp(1.18rem,3.2vw,1.65rem)] leading-tight tracking-[-0.05em] uppercase sm:max-w-none sm:inline-block sm:text-[clamp(1.32rem,2.8vw,1.85rem)] sm:whitespace-nowrap lg:text-[clamp(1.4rem,2.2vw,2rem)]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {subtitle}
                  </span>
                </div>
              )}
              {textImageUrl ? (
                textImageUrl.endsWith(".svg") ? (
                  <HeroWordmarkAnimated src={textImageUrl} alt="Apigen hero text" className="w-full h-auto mx-auto" style={{ maxWidth: wordmarkMaxWidth }} />
                ) : (
                  <AppImage src={textImageUrl} alt="Apigen hero text" width={1600} height={350} className="w-full h-auto mx-auto" style={{ maxWidth: wordmarkMaxWidth }} />
                )
              ) : (
                <>
                  <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
                  <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{title}</h1>
                  <p className="mt-3 max-w-2xl mx-auto text-[var(--secondary-foreground)]">{copy}</p>
                </>
              )}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5" style={{ marginTop: ctaGap }}>
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

  // Default fullscreen variant
  return (
    <section data-block="Hero" data-variant="video" className="relative w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Content overlay - uses flex centering without viewport units */}
      <div className="relative flex w-full items-center justify-center px-6 sm:px-8 lg:px-4 min-h-[calc(100vh-76px)] md:min-h-[calc(100vh-92px)] py-8 sm:py-10 md:py-12">
        <Appear preview={preview} className="w-full flex justify-center">
          <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[1100px] text-center" style={{ transform: `translateY(${contentOffsetY})` }}>
            {subtitle && (
              <div className="mt-1 sm:mt-2" style={{ marginBottom: subtitleGap }}>
                <span
                  className="mx-auto block max-w-[min(88%,380px)] text-center text-[clamp(1.18rem,3.2vw,1.65rem)] leading-tight tracking-[-0.05em] uppercase sm:max-w-none sm:inline-block sm:text-[clamp(1.32rem,2.8vw,1.85rem)] sm:whitespace-nowrap lg:text-[clamp(1.4rem,2.2vw,2rem)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {subtitle}
                </span>
              </div>
            )}
            {textImageUrl ? (
              textImageUrl.endsWith(".svg") ? (
                <HeroWordmarkAnimated src={textImageUrl} alt="Apigen hero text" className="w-full h-auto mx-auto" style={{ maxWidth: wordmarkMaxWidth }} />
              ) : (
                <AppImage src={textImageUrl} alt="Apigen hero text" width={1600} height={350} className="w-full h-auto mx-auto" style={{ maxWidth: wordmarkMaxWidth }} />
              )
            ) : (
              <>
                <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
                <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{title}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-[var(--secondary-foreground)]">{copy}</p>
              </>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5" style={{ marginTop: ctaGap }}>
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
