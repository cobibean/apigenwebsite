"use client";

import React, { useState, useCallback, useEffect } from "react";
import { m, LazyMotion, domAnimation, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Strain } from "@/data/products";
import AppImage from "@/components/AppImage";
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
  // let desktop breathe
  section: "py-12 md:py-16 lg:py-20",
  // space under header card before tasting notes
  headerBelow: "mb-12 md:mb-14 lg:mb-10",
  gridGap: "gap-8 md:gap-10 lg:gap-14",
  gridAlign: "items-start",
  contentVerticalOffset: "mt-0",
  // keep gap consistent on desktop
  contentGap: "gap-6 md:gap-7 lg:gap-7",
  // remove image push-down on lg
  imageVerticalOffset: "mt-0",
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

  // Carousel state and logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % strain.images.length);
  }, [strain.images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + strain.images.length) % strain.images.length);
  }, [strain.images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Preload adjacent images for instant navigation
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = [];

      // Previous image
      const prevIndex = currentIndex === 0 ? strain.images.length - 1 : currentIndex - 1;
      imagesToPreload.push(strain.images[prevIndex].src);

      // Next image
      const nextIndex = (currentIndex + 1) % strain.images.length;
      imagesToPreload.push(strain.images[nextIndex].src);

      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();
  }, [currentIndex, strain.images]);

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
              {/* Content Column: Header + Body */}
              <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
                {/* Header */}
                <div className={`${SPACING.headerBelow} flex flex-col gap-2 px-6 py-5 md:px-7 md:py-6 rounded-xl ${headerBorder} bg-[#545943]`}>
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
                          <dd className={`text-sm leading-relaxed ${textBody} font-body`}>
                          {strain.tasting.nose.join(", ")}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                          <dt className={`text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                          Palate
                        </dt>
                          <dd className={`text-sm leading-relaxed ${textBody} font-body`}>
                          {strain.tasting.palate.join(", ")}
                        </dd>
                      </div>

                      <div className="flex flex-col gap-2">
                          <dt className={`text-xs uppercase tracking-[0.2em] ${textSecondary} font-mono`}>
                          Finish
                        </dt>
                          <dd className={`text-sm leading-relaxed ${textBody} font-body`}>
                          {strain.tasting.finish.join(", ")}
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

                      {/* Terpenes Box */}
                    {strain.chemistry.terpenes && strain.chemistry.terpenes.length > 0 && (
                        <div className={`flex flex-col gap-3 p-4 rounded-lg border ${cardBorder} bg-card`}>
                          <dt className={`text-sm font-semibold ${textPrimary} font-mono`}>
                          Top Terpenes
                        </dt>
                          <dd className={`text-sm ${textBody} space-y-1 font-body`}>
                          {strain.chemistry.terpenes.map((terpene, idx) => (
                            <div key={idx}>
                              {terpene.name}
                              {terpene.mgG && (
                                <>
                                  {" "}
                                    <span className={contentTextColor === "white" ? "text-white/60" : "text-secondary"}>
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
                    <div className="text-xs text-secondary font-body">
                    {strain.availability}
                  </div>
                )}
                </div>
              </div>

              {/* Image Column */}
              <div
                className={`${SPACING.imageVerticalOffset} ${
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

            {/* Product Image Carousel */}
            {!hideSupporting && strain.images.length > 0 && (
              <div className="mt-12 md:mt-16">
                <div className="relative max-w-2xl mx-auto">
                  {/* Main Carousel Display */}
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg aspect-[4/3] md:aspect-[16/10]">
                    <LazyMotion features={domAnimation} strict>
                      <AnimatePresence mode="wait">
                        <m.div
                          key={currentIndex}
                          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                          animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="w-full h-full"
                        >
                          <AppImage
                            src={strain.images[currentIndex].src}
                            alt={strain.images[currentIndex].alt}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            priority={strain.images[currentIndex].priority}
                          />
                        </m.div>
                      </AnimatePresence>
                    </LazyMotion>

                    {/* Navigation Arrows */}
                    {strain.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                          aria-label="Previous image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                          aria-label="Next image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Image Counter */}
                  <div className="text-center mt-3">
                    <span
                      className="text-sm text-secondary font-mono"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {currentIndex + 1} / {strain.images.length}
                    </span>
                  </div>

                  {/* Dot Indicators */}
                  {strain.images.length > 1 && (
                    <div className="flex justify-center mt-3 space-x-2">
                      {strain.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                            index === currentIndex
                              ? "bg-primary scale-125"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Thumbnail Strip */}
                  {strain.images.length > 1 && (
                    <div className="hidden md:block mt-6">
                      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                        {strain.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              index === currentIndex
                                ? "border-primary scale-105"
                                : "border-border hover:border-secondary"
                            }`}
                            aria-label={`View image ${index + 1}`}
                          >
                            <AppImage
                              src={image.src}
                              alt=""
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Appear>
      </div>
    </section>
  );
}
