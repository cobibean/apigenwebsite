"use client";
import React from "react";
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
  preview,
}: Props) {
  return (
    <section data-block="Hero" data-variant="default" className="relative isolate overflow-hidden">
      {imageUrl && (
        <div className="absolute inset-0 -z-10">
          <AppImage src={imageUrl} alt={imageAlt || ""} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, color-mix(in oklab, black 50%, transparent), transparent)"
          }} />
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-24">
        <Appear preview={preview}>
          <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>{title}</h1>
          <p className="mt-3 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
          <div className="mt-6">
            <AppLink href={ctaHref} className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]">
              {ctaLabel}
            </AppLink>
          </div>
        </Appear>
      </div>
    </section>
  );
}


