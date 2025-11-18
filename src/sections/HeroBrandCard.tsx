"use client";

import React from "react";
import type { Strain } from "@/data/cultivars";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";
import Appear from "@/components/motion/Appear";

interface HeroBrandCardProps {
  strain: Strain;
  /** true = image left, false = image right */
  imageOnLeft?: boolean;
  preview?: boolean;
}

export default function HeroBrandCard({
  strain,
  imageOnLeft = true,
  preview,
}: HeroBrandCardProps) {
  // Force light-on-dark text to match the olive background
  const textClass = "[color:var(--fg-on-olive)]";
  const subTextClass = "[color:color-mix(in_oklab,white_78%,transparent)]";

  // Get key highlights for the card
  const thcRange = strain.chemistry?.thcPctRange;
  const keyNotes = strain.tasting?.nose.slice(0, 2); // Just first 2 nose notes
  const keyPalate = strain.tasting?.palate.slice(0, 1); // Just first palate note

  return (
    <section
      data-block="HeroBrandCard"
      data-variant={imageOnLeft ? "image-left" : "image-right"}
      className="relative w-full text-foreground"
      style={{ background: "var(--surface-olive)" }}
    >
      {/* Subtle accent blur */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,rgb(174_85_33_/_0.12),transparent)_0%,_transparent_60%)] blur-2xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Appear preview={preview}>
          <div className="mx-auto max-w-6xl">
            <div
              className={`grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.2fr] items-stretch ${
                imageOnLeft ? "" : "md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.2fr_1fr]"
              }`}
            >
              {/* Hero Image Column */}
              <div className={imageOnLeft ? "order-1" : "order-2 md:order-2"}>
                <div className="relative overflow-hidden rounded-[24px] border border-border bg-card shadow-lg">
                  {strain.images[0] && (
                    <AppImage
                      src={strain.images[0].src}
                      alt={strain.images[0].alt}
                      width={600}
                      height={600}
                      priority={strain.images[0].priority}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className={`flex flex-col gap-6 justify-start ${imageOnLeft ? "order-2" : "order-1"}`}>
                {/* Header */}
                <div className="space-y-2">
                  {strain.eyebrow && (
                    <p
                      className={`text-sm uppercase tracking-[0.3em] ${subTextClass}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {strain.eyebrow}
                    </p>
                  )}
                  <h3
                    className={`text-2xl md:text-3xl font-semibold ${textClass}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {strain.title}
                  </h3>
                  {strain.provenance && (
                    <p
                      className={`text-base ${subTextClass}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {strain.provenance}
                    </p>
                  )}
                </div>

                {/* Key Highlights */}
                <div className="space-y-4">
                  {/* THC Range */}
                  {thcRange && (
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-medium ${textClass}`}>THC</div>
                      <div
                        className={`text-lg font-semibold ${textClass}`}
                        style={{ fontFamily: "var(--font-mono)" }}
                      >
                        {thcRange[0]}–{thcRange[1]}%
                      </div>
                    </div>
                  )}

                  {/* Key Tasting Notes */}
                  {(keyNotes || keyPalate) && (
                    <div className="space-y-2">
                      <div className={`text-sm font-medium ${textClass}`}>Tasting Notes</div>
                      <div className={`text-sm ${subTextClass} space-y-1`}>
                        {keyNotes && (
                          <div>
                            <span className={`text-xs uppercase tracking-[0.2em] ${subTextClass}`}>Nose: </span>
                            {keyNotes.join(", ")}
                          </div>
                        )}
                        {keyPalate && (
                          <div>
                            <span className={`text-xs uppercase tracking-[0.2em] ${subTextClass}`}>Palate: </span>
                            {keyPalate.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <AppLink
                    href={`/cultivars#${strain.id}`}
                    className={buttonClass({ variant: "olive", size: "md" })}
                  >
                    View Details
                  </AppLink>
                </div>
              </div>
            </div>
          </div>
        </Appear>
      </div>
    </section>
  );
}
