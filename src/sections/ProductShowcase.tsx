"use client";

import React from "react";
import type { Strain } from "@/data/cultivars";
import AppImage from "@/components/AppImage";
import ProductCarousel3DLandscape from "@/components/ProductCarousel3DLandscape";
import Appear from "@/components/motion/Appear";

interface ProductShowcaseProps {
  strain: Strain;
  /** Layout direction: "left" = image on left, "right" = image on right */
  layoutDirection?: "left" | "right";
  preview?: boolean;
  /** Hide the supporting images gallery */
  hideSupporting?: boolean;
  /** Background color for the section: "default" or "olive" */
  sectionBgColor?: "default" | "olive";
  /** Text color for content: "default" or "white" */
  contentTextColor?: "default" | "white";
  /** Header card border color: "none" or "copper" */
  headerBorderColor?: "none" | "copper" | "black";
  /** Chemistry/Terpenes card border color: "default" or "copper" or "black" */
  cardBorderColor?: "default" | "copper" | "black";
}

const SPACING = {
  // balanced rhythm: breathing room above card, matched energy below
  section: "pt-12 pb-6 md:py-16 lg:py-20",
  // space under header card before tasting notes
  headerBelow: "mb-4 md:mb-14 lg:mb-10",
  gridGap: "gap-y-6 gap-x-5 md:gap-x-10 md:gap-y-10 lg:gap-x-14 lg:gap-y-14",
  gridAlign: "items-start",
  contentVerticalOffset: "mt-0",
  // keep gap consistent on desktop
  contentGap: "gap-4 md:gap-7 lg:gap-7",
  // align image stack without extra top nudges on mobile
  imageVerticalOffset: "mt-0 md:mt-4 lg:mt-6",
  imageRadius: "rounded-2xl",
} as const;

export default function ProductShowcase({
  strain,
  layoutDirection = "left",
  preview,
  hideSupporting = false,
  sectionBgColor = "default",
  contentTextColor = "default",
  headerBorderColor = "none",
  cardBorderColor = "default",
}: ProductShowcaseProps) {
  const isImageLeft = layoutDirection === "left";

  // Determine section background
  const sectionBg = sectionBgColor === "olive" ? "bg-[#545943]" : "bg-background";
  
  // Determine text colors
  const textPrimary = contentTextColor === "white" ? "text-white" : "text-primary";
  const textSecondary = contentTextColor === "white" ? "text-white/70" : "text-secondary";
  const textBody = contentTextColor === "white" ? "text-white/80" : "text-foreground";
  
  // Determine header border (copper accent: #AE5521)
  const headerBorder = headerBorderColor === "copper" ? "border border-[#AE5521]" : headerBorderColor === "black" ? "border border-black" : "border-0";
  
  // Determine chemistry/terpenes card border
  const cardBorder = cardBorderColor === "copper" ? "border-[#AE5521]" : cardBorderColor === "black" ? "border-black" : "border-border";

  return (
    <section
      data-block="ProductShowcase"
      data-variant={layoutDirection}
      className={`relative ${sectionBg} text-foreground ${SPACING.section}`}
    >
      {/* Subtle accent blur */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,rgb(174_85_33_/_0.18),transparent)_0%,_transparent_70%)] blur-3xl md:left-[8%]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Appear preview={preview}>
          <div className="mx-auto max-w-7xl">
            {/* Main content grid - header + content on one side, image on the other */}
            <div className={`grid md:grid-cols-2 ${SPACING.gridAlign} ${SPACING.gridGap}`}>
              {/* Header - Mobile: shows first, Desktop: part of content column */}
              <div className={`order-1 ${isImageLeft ? "md:order-2" : "md:order-1"} md:hidden ${SPACING.headerBelow}`}>
                <div className={`flex flex-col gap-2 px-6 py-5 rounded-xl ${headerBorder} bg-[#545943]`}>
              {strain.eyebrow && (
                    <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/80 font-mono">
                  {strain.eyebrow}
                </p>
              )}
                  <h2 className="text-3xl font-semibold text-white text-balance font-sans">
                {strain.title}
              </h2>
              {strain.provenance && (
                    <p className="mt-1 text-sm text-white/70 font-body">
                  {strain.provenance}
                </p>
              )}
            </div>
              </div>

              {/* Content Column: Header (desktop only) + Body */}
              <div className={`order-3 ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
                {/* Header - Desktop only */}
                <div className={`hidden md:flex ${SPACING.headerBelow} flex-col gap-2 px-6 py-5 md:px-7 md:py-6 rounded-xl ${headerBorder} bg-[#545943]`}>
              {strain.eyebrow && (
                    <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/80 font-mono">
                  {strain.eyebrow}
                </p>
              )}
                  <h2 className="text-3xl md:text-4xl font-semibold text-white text-balance font-sans">
                {strain.title}
              </h2>
              {strain.provenance && (
                    <p className="mt-1 text-sm text-white/70 font-body">
                  {strain.provenance}
                </p>
              )}
            </div>

                {/* Content Body */}
                <div className={`flex flex-col ${SPACING.contentGap}`}>
                {/* Tasting Notes */}
                {strain.tasting && (
                    <div className="space-y-4 pl-4">
                      <h3 className={`text-lg font-semibold ${textPrimary} font-sans`}>
                      Tasting Notes
                    </h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="flex flex-col gap-2">
                          <dt className={`text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                          Nose
                        </dt>
                          <dd className={`text-sm leading-relaxed ${textBody} font-body whitespace-pre-line`}>
                          {strain.tasting.nose.join("\n")}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                          <dt className={`text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                          Palate
                        </dt>
                          <dd className={`text-sm leading-relaxed ${textBody} font-body whitespace-pre-line`}>
                          {strain.tasting.palate.join("\n")}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                          <dt className={`text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                          Finish
                        </dt>
                          <dd className={`text-sm leading-relaxed ${textBody} font-body whitespace-pre-line`}>
                          {strain.tasting.finish.join("\n")}
                        </dd>
                      </div>
                    </div>
                  </div>
                )}

                  {/* Chemistry & Terpenes - 2 column boxes */}
                {strain.chemistry && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Chemistry Box */}
                      <div className={`flex flex-col gap-3 p-4 rounded-lg border ${cardBorder} bg-card`}>
                        <h4 className={`text-sm font-semibold ${textPrimary} font-sans`}>
                      Chemistry
                    </h4>

                    {/* THC / CBD */}
                        <div className="flex gap-3 flex-wrap md:flex-nowrap md:gap-4">
                      {strain.chemistry.thcPctRange && (
                        <div>
                              <dt className={`mb-1 text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                            THC
                          </dt>
                              <dd className={`text-sm ${textBody} font-body`}>
                            {strain.chemistry.thcPctRange[0]}–{strain.chemistry.thcPctRange[1]}%
                          </dd>
                        </div>
                      )}

                      {strain.chemistry.cbdPct !== undefined && (
                        <div>
                              <dt className={`mb-1 text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                            CBD
                          </dt>
                              <dd className={`text-sm ${textBody} font-body`}>
                            {strain.chemistry.cbdPct < 1 ? "<1%" : `${strain.chemistry.cbdPct}%`}
                          </dd>
                        </div>
                      )}
                        </div>
                    </div>

                      {/* Terpenes Box - names only (metrics removed per task 14) */}
                    {strain.chemistry.terpenes && strain.chemistry.terpenes.length > 0 && (
                        <div className={`flex flex-col gap-3 p-4 rounded-lg border ${cardBorder} bg-card`}>
                          <dt className={`text-sm font-semibold ${textPrimary} font-mono`}>
                          Top Terpenes
                        </dt>
                          <dd className={`text-sm ${textBody} space-y-1 font-body`}>
                          {strain.chemistry.terpenes.map((terpene, idx) => (
                            <div key={idx}>
                              {terpene.name}
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                  </div>
                )}

                {/* Availability */}
                {strain.availability && (
                    <div className="text-xs text-secondary font-body">
                    {strain.availability}
                  </div>
                )}
                </div>
              </div>

              {/* Image Column */}
              <div
                className={`order-2 ${SPACING.imageVerticalOffset} ${
                  isImageLeft ? "md:order-1" : "md:order-2"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${SPACING.imageRadius} border border-border bg-card shadow-lg aspect-[5/4]`}
                >
                  {strain.images[0] && (
                    <AppImage
                      src={strain.images[0].src}
                      alt={strain.images[0].alt}
                      width={800}
                      height={640}
                      priority={strain.images[0].priority}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Product Image Carousel - limited to 3 images per strain (task 8) */}
            {!hideSupporting && strain.images.length > 0 && (
              <div className="mt-12 md:mt-16">
                <ProductCarousel3DLandscape
                  images={strain.images.slice(0, 3)}
                  autoPlay={true}
                  autoPlayDelay={5000}
                  dotsSpacing="bottom-4"
                  buttonSpacing="16px"
                />
              </div>
            )}
          </div>
        </Appear>
      </div>
    </section>
  );
}
