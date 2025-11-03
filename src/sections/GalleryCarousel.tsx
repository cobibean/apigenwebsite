"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { m, LazyMotion, domAnimation, useReducedMotion, AnimatePresence } from "framer-motion";
import AppImage from "@/components/AppImage";
import Appear from "@/components/motion/Appear";
import { GalleryImage } from "@/data/gallery";

type Props = {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  preview?: boolean;
  className?: string;
  size?: "full" | "compact"; // Add size variant
};

const defaultImages: GalleryImage[] = [];

export default function GalleryCarousel({
  title = "Product Gallery",
  subtitle = "Explore our premium dried cannabis flowers",
  images = defaultImages,
  preview,
  className,
  size = "full",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const router = useRouter();

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleImageClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  if (images.length === 0) {
    return null;
  }

  // Size variants
  const isCompact = size === "compact";
  const containerPadding = isCompact ? "py-6 md:py-8" : "py-16 md:py-24";
  const headerMargin = isCompact ? "mb-3 md:mb-4" : "mb-12 md:mb-16";
  const titleSize = isCompact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl";
  const subtitleSize = isCompact ? "text-sm" : "text-lg";
  const aspectRatio = isCompact ? "aspect-[2/1]" : "aspect-[4/3] md:aspect-[16/10]";

  return (
    <section
      data-block="GalleryCarousel"
      data-variant={size}
      className={`relative bg-background text-foreground ${className || ""}`}
    >
      {/* Subtle accent blur */}
      <div
        className="pointer-events-none absolute left-[10%] top-[15%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,rgb(174_85_33_/_0.15),transparent)_0%,_transparent_60%)] blur-2xl"
        aria-hidden="true"
      />

      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${containerPadding}`}>
        <Appear preview={preview}>
          {/* Header */}
          <div className={`${headerMargin} text-center`}>
            <h2
              className={`${titleSize} font-semibold text-primary mb-4`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`${subtitleSize} text-secondary max-w-2xl mx-auto`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-3xl mx-auto">
            {/* Main Image Display */}
            <div 
              onClick={handleImageClick}
              className={`relative overflow-hidden rounded-[32px] border border-border bg-card shadow-xl ${aspectRatio} cursor-pointer hover:shadow-2xl transition-shadow`}
            >
              <LazyMotion features={domAnimation} strict>
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentIndex}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <AppImage
                      src={images[currentIndex].src}
                      alt={images[currentIndex].alt}
                      width={1200}
                      height={800}
                      className="w-full h-full object-cover"
                      priority={images[currentIndex].priority}
                    />
                  </m.div>
                </AnimatePresence>
              </LazyMotion>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className={isCompact ? "text-center mt-2" : "text-center mt-4"}>
              <span
                className="text-sm text-secondary"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Dot Indicators */}
            {images.length > 1 && (
              <div className={isCompact ? "flex justify-center mt-2 space-x-2" : "flex justify-center mt-6 space-x-2"}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-primary scale-125"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnail Strip (Optional - shows on larger screens) */}
            {images.length > 1 && !isCompact && (
              <div className="hidden md:block mt-8">
                <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => { e.stopPropagation(); goToImage(index); }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? "border-primary scale-105"
                          : "border-border hover:border-secondary"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <AppImage
                        src={image.src}
                        alt=""
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Appear>
      </div>
    </section>
  );
}
