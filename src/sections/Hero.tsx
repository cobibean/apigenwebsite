"use client";
import React, { useEffect, useMemo, useState } from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";

type Props = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoSrc?: string;
  posterSrc?: string;
  textImageUrl?: string;
  preview?: boolean;
};

export default function Hero({
  eyebrow = "Apigen",
  title = "Premium dried cannabis, exported consistently.",
  copy = "Ethical, compliant, patient-first.",
  ctaLabel = "Get in touch",
  ctaHref = "/contact",
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
          <div className="w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[1100px] text-center">
            {textImageUrl ? (
              <AppImage src={textImageUrl} alt="Apigen hero text" width={1600} height={350} className="w-full h-auto mx-auto" />
            ) : (
              <>
                <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
                <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{title}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-[var(--secondary-foreground)]">{copy}</p>
              </>
            )}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <AppLink href={ctaHref} className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]">
                {ctaLabel}
              </AppLink>
            </div>
          </div>
        </Appear>
      </div>
    </section>
  );
}


