"use client";

import React from "react";
import type { Strain } from "@/data/products";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";
import { useContactModal } from "@/providers/ContactModalProvider";
import Appear from "@/components/motion/Appear";

interface ProductShowcaseProps {
  strain: Strain;
  /** true = image left, false = image right */
  imageOnLeft?: boolean;
  preview?: boolean;
  /** Index for alternating layout */
  index?: number;
}

export default function ProductShowcase({
  strain,
  imageOnLeft,
  preview,
  index = 0,
}: ProductShowcaseProps) {
  const { openContactModal } = useContactModal();
  const alternate = imageOnLeft ?? index % 2 === 0;
  const [heroImage, ...supportImages] = strain.images;

  return (
    <section
      data-block="ProductShowcase"
      data-variant={alternate ? "image-left" : "image-right"}
      className="relative bg-background text-foreground"
    >
      {/* Subtle accent blur */}
      <div
        className="pointer-events-none absolute left-[5%] top-[10%] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,rgb(174_85_33_/_0.18),transparent)_0%,_transparent_70%)] blur-3xl md:left-[8%]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 pb-16 md:pb-24">
        <Appear preview={preview}>
          <div className="mx-auto max-w-7xl">
            {/* Header block */}
            <div className={`mb-8 md:mb-10 ${!alternate ? "text-right" : ""}`}>
              {strain.eyebrow && (
                <p
                  className="text-xs uppercase tracking-[0.3em] text-secondary mb-1"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {strain.eyebrow}
                </p>
              )}
              <h2
                className="text-3xl md:text-4xl font-semibold text-primary text-balance"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {strain.title}
              </h2>
              {strain.provenance && (
                <p
                  className="text-sm text-secondary mt-1"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {strain.provenance}
                </p>
              )}
            </div>

            {/* Main content grid */}
            <div
              className={`grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1fr_1.2fr] ${
                alternate ? "" : "md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.2fr_1fr]"
              }`}
            >
              {/* Hero Image Column */}
              <div className={alternate ? "order-1" : "order-2 md:order-2"}>
                <div className={`relative overflow-hidden rounded-[28px] border border-border bg-card shadow-lg aspect-[5/4] ${
                  alternate ? "" : "md:max-h-[500px] lg:max-h-[540px]"
                }`}>
                  {heroImage && (
                    <AppImage
                      src={heroImage.src}
                      alt={heroImage.alt}
                      width={800}
                      height={640}
                      priority={heroImage.priority}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Content Column */}
              <div className={`flex flex-col gap-6 -mt-20 md:-mt-24 ${alternate ? "order-2" : "order-1"}`}>
                {/* Tasting Notes */}
                {strain.tasting && (
                  <div className="space-y-4">
                    <h3
                      className="text-lg font-semibold text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Tasting Notes
                    </h3>
                    <div className="grid gap-3 md:grid-cols-3">
                      {/* Nose */}
                      <div className="flex flex-col gap-2">
                        <dt
                          className="text-xs uppercase tracking-[0.2em] text-secondary"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Nose
                        </dt>
                        <dd
                          className="text-sm leading-relaxed text-foreground"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {strain.tasting.nose.join(", ")}
                        </dd>
                      </div>

                      {/* Palate */}
                      <div className="flex flex-col gap-2">
                        <dt
                          className="text-xs uppercase tracking-[0.2em] text-secondary"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Palate
                        </dt>
                        <dd
                          className="text-sm leading-relaxed text-foreground"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {strain.tasting.palate.join(", ")}
                        </dd>
                      </div>

                      {/* Finish */}
                      <div className="flex flex-col gap-2">
                        <dt
                          className="text-xs uppercase tracking-[0.2em] text-secondary"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Finish
                        </dt>
                        <dd
                          className="text-sm leading-relaxed text-foreground"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {strain.tasting.finish.join(", ")}
                        </dd>
                      </div>
                    </div>
                  </div>
                )}

                {/* Grower's Note */}
                {strain.growersNote && (
                  <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card">
                    <dt
                      className="text-xs uppercase tracking-[0.2em] text-secondary"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Grower's Note
                    </dt>
                    <dd
                      className="text-sm leading-relaxed text-foreground"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {strain.growersNote}
                    </dd>
                  </div>
                )}

                {/* Chemistry */}
                {strain.chemistry && (
                  <div className="space-y-3">
                    <h4
                      className="text-sm font-semibold text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Chemistry
                    </h4>

                    {/* THC / CBD */}
                    <div className="grid gap-3 md:grid-cols-2">
                      {strain.chemistry.thcPctRange && (
                        <div>
                          <dt
                            className="text-xs uppercase tracking-[0.2em] text-secondary mb-1"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            THC
                          </dt>
                          <dd
                            className="text-sm text-foreground"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {strain.chemistry.thcPctRange[0]}–{strain.chemistry.thcPctRange[1]}%
                          </dd>
                        </div>
                      )}

                      {strain.chemistry.cbdPct !== undefined && (
                        <div>
                          <dt
                            className="text-xs uppercase tracking-[0.2em] text-secondary mb-1"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            CBD
                          </dt>
                          <dd
                            className="text-sm text-foreground"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {strain.chemistry.cbdPct < 1 ? "<1%" : `${strain.chemistry.cbdPct}%`}
                          </dd>
                        </div>
                      )}
                    </div>

                    {/* Terpenes */}
                    {strain.chemistry.terpenes && strain.chemistry.terpenes.length > 0 && (
                      <div>
                        <dt
                          className="text-xs uppercase tracking-[0.2em] text-secondary mb-2"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Top Terpenes
                        </dt>
                        <dd
                          className="text-sm text-foreground space-y-1"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {strain.chemistry.terpenes.map((terpene, idx) => (
                            <div key={idx}>
                              {terpene.name}
                              {terpene.mgG && (
                                <>
                                  {" "}
                                  <span className="text-secondary">
                                    {terpene.mgG} mg·g
                                    {terpene.sharePct && ` (${terpene.sharePct}%)`}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                  </div>
                )}


                {/* Availability */}
                {strain.availability && (
                  <div className="text-xs text-secondary" style={{ fontFamily: "var(--font-body)" }}>
                    {strain.availability}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2 flex-wrap">
                  <button
                    onClick={openContactModal}
                    className={buttonClass({ variant: "olive", size: "md" })}
                  >
                    Inquire for Wholesale
                  </button>
                  {strain.coaUrl && (
                    <AppLink href={strain.coaUrl} className={buttonClass({ variant: "neutral", size: "md" })}>
                      View COA
                    </AppLink>
                  )}
                </div>
              </div>
            </div>

            {/* Supporting Images Strip */}
            {supportImages.length > 0 && (
              <div className="mt-12 md:mt-16 grid gap-4 md:grid-cols-2">
                {supportImages.map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-[20px] border border-border">
                    <AppImage
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Appear>
      </div>
    </section>
  );
}
