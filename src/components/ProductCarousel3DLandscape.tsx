"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

export interface CarouselImage {
  src: string;
  alt: string;
  category?: string;
  priority?: boolean;
}

interface ProductCarousel3DLandscapeProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
  className?: string;
  // Optional CTA button below carousel
  ctaButton?: {
    label: string;
    href: string;
    variant?: "brown" | "olive" | "neutral";
  };
  // Spacing controls
  // Note: Visual editors (Builder.io, etc.) should pass these props explicitly.
  // Component defaults are for standalone/Storybook use only.
  dotsSpacing?: string; // Distance from carousel bottom to dots (e.g., "bottom-6", "bottom-8")
  buttonSpacing?: string; // Distance from carousel to button (e.g., "pt-8", "pt-12", "48px", "var(--spacing-xl)")
}

// Spacing constants for easy adjustment
// To adjust carousel positioning:
// - containerMinHeight: Controls overall carousel height
// - cardWidth/cardHeight: Controls individual card dimensions
//
// Note: Dots and button spacing are now controlled via props (dotsSpacing, buttonSpacing)
const SPACING = {
  // Container dimensions - shorter for landscape
  containerMinHeight: "min-h-[300px] md:min-h-[400px]",
  containerMaxWidth: "max-w-7xl",

  // Card dimensions and positioning - landscape orientation
  // Wider cards: w-80 (320px) mobile, w-[480px] (480px) desktop for landscape feel
  cardWidth: "w-80 md:w-[480px]",
  cardHeight: "h-[240px] md:h-[320px]",
  cardBorderRadius: "rounded-[20px]",
} as const;

/**
 * ProductCarousel3DLandscape - Landscape 3D carousel component with optional CTA button
 *
 * Visual Editor Pattern:
 * - Visual editors (Builder.io, etc.) should pass all props explicitly
 * - Component defaults are for standalone/Storybook use only
 * - Props are designed to be easily mapped from visual editor UI controls
 *
 * @example
 * // Visual editor usage - always pass props explicitly
 * <ProductCarousel3DLandscape
 *   images={images}
 *   autoPlay={true}
 *   dotsSpacing="bottom-6"
 *   buttonSpacing="48px"
 *   ctaButton={{ label: "See Cultivars", href: "/cultivars", variant: "olive" }}
 * />
 */
export default function ProductCarousel3DLandscape({
  images,
  autoPlay = true,
  autoPlayDelay = 4000,
  className = "",
  ctaButton,
  dotsSpacing = "bottom-4", // Closer spacing for landscape
  buttonSpacing = "32px", // Closer spacing for landscape
}: ProductCarousel3DLandscapeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Dynamically detect mobile vs desktop
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && images.length > 1 && !reduced) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, autoPlayDelay);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, images.length, autoPlayDelay, reduced]);

  // Pause auto-play on hover/touch
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (autoPlay) {
      setIsAutoPlaying(true);
    }
  }, [autoPlay]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers for swipe gestures
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    setIsAutoPlaying(false); // Pause on touch
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }

    // Resume auto-play after a delay
    setTimeout(() => {
      if (autoPlay) {
        setIsAutoPlaying(true);
      }
    }, 1000);
  }, [goToNext, goToPrev, autoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrev();
        setIsAutoPlaying(false);
      } else if (e.key === "ArrowRight") {
        goToNext();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Click handler to navigate to cultivars page
  const handleCardClick = useCallback(() => {
    router.push("/cultivars");
  }, [router]);

  // Get card styling based on position - horizontal layout for landscape
  const getCardStyle = useCallback((index: number) => {
    const position = (index - currentIndex + images.length) % images.length;

    // Horizontal offsets: cards spread out horizontally
    const firstOffset = isMobile ? 120 : 180;
    const secondOffset = isMobile ? 200 : 280;

    if (position === 0) {
      // Center card - full size, no blur, highest z-index
      return {
        scale: 1,
        opacity: 1,
        blur: 0,
        zIndex: 30,
        x: 0,
        y: 0, // Keep centered vertically
        pointerEvents: "auto" as const,
      };
    } else if (position === 1) {
      // Card to the right - smaller, slightly blurred
      return {
        scale: 0.85,
        opacity: 0.7,
        blur: 3,
        zIndex: 20,
        x: firstOffset,
        y: 0,
        pointerEvents: "none" as const,
      };
    } else if (position === images.length - 1) {
      // Card to the left - smaller, slightly blurred
      return {
        scale: 0.85,
        opacity: 0.7,
        blur: 3,
        zIndex: 20,
        x: -firstOffset,
        y: 0,
        pointerEvents: "none" as const,
      };
    } else if (position === 2) {
      // Second card to the right - much smaller, very blurred
      return {
        scale: 0.7,
        opacity: 0.4,
        blur: 8,
        zIndex: 10,
        x: secondOffset,
        y: 0,
        pointerEvents: "none" as const,
      };
    } else if (position === images.length - 2) {
      // Second card to the left - much smaller, very blurred
      return {
        scale: 0.7,
        opacity: 0.4,
        blur: 8,
        zIndex: 10,
        x: -secondOffset,
        y: 0,
        pointerEvents: "none" as const,
      };
    } else {
      // Hidden cards - completely transparent
      return {
        scale: 0.5,
        opacity: 0,
        blur: 12,
        zIndex: 0,
        x: 0,
        y: 0,
        pointerEvents: "none" as const,
      };
    }
  }, [currentIndex, images.length, isMobile]);

  // Get visible dots for mobile (show fewer dots)
  const getVisibleDots = useCallback(() => {
    if (!isMobile || images.length <= 7) {
      // Show all dots on desktop or if there are 7 or fewer
      return images.map((_, index) => index);
    }

    // On mobile with many dots, show only dots around current index
    const maxVisible = 7; // Show max 7 dots on mobile
    const halfVisible = Math.floor(maxVisible / 2);

    const dots: number[] = [];

    // Always show first dot
    dots.push(0);

    // Show dots around current index
    const start = Math.max(1, currentIndex - halfVisible);
    const end = Math.min(images.length - 2, currentIndex + halfVisible);

    for (let i = start; i <= end; i++) {
      if (!dots.includes(i)) {
        dots.push(i);
      }
    }

    // Always show last dot
    if (!dots.includes(images.length - 1)) {
      dots.push(images.length - 1);
    }

    return dots.sort((a, b) => a - b);
  }, [images.length, currentIndex, isMobile]);

  if (images.length === 0) {
    return null;
  }

  const visibleDots = getVisibleDots();

  return (
    <section
      ref={carouselRef}
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Cultivar carousel"
    >
      <div className={`relative flex items-center justify-center ${SPACING.containerMinHeight} pb-8`}>
        <LazyMotion features={domAnimation} strict>
          <div className={`relative flex items-center justify-center w-full ${SPACING.containerMaxWidth} mx-auto`}>
            {images.map((image, index) => {
              const style = getCardStyle(index);
              const isCenter = (index - currentIndex + images.length) % images.length === 0;

              return (
                <m.div
                  key={`${image.src}-${index}`}
                  className="absolute cursor-pointer"
                  style={{
                    zIndex: style.zIndex,
                  }}
                  animate={{
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: `blur(${style.blur}px)`,
                    x: style.x,
                    y: style.y,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onClick={isCenter ? handleCardClick : undefined}
                  role="button"
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={isCenter ? `View ${image.alt}. Click to explore our cultivars.` : image.alt}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isCenter) {
                      handleCardClick();
                    }
                  }}
                >
                  <div className={`relative ${SPACING.cardWidth} ${SPACING.cardHeight} ${SPACING.cardBorderRadius} overflow-hidden shadow-2xl`}>
                    <AppImage
                      src={image.src}
                      alt={image.alt}
                      width={480}
                      height={320}
                      className="w-full h-full object-cover"
                      priority={image.priority || index === 0}
                    />

                    {/* Overlay for non-center cards */}
                    {!isCenter && (
                      <div className="absolute inset-0 bg-black/30" />
                    )}
                  </div>
                </m.div>
              );
            })}
          </div>
        </LazyMotion>

        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className={`absolute ${dotsSpacing} left-0 right-0 flex justify-center z-30 px-8 sm:px-12 md:px-16`}>
            <div className="flex space-x-2">
              {visibleDots.map((dotIndex, idx) => {
                const isActive = dotIndex === currentIndex;
                const showEllipsis = idx > 0 && dotIndex - visibleDots[idx - 1] > 1;

                return (
                  <React.Fragment key={dotIndex}>
                    {showEllipsis && (
                      <span className="text-white/50 text-xs px-1">...</span>
                    )}
                    <button
                      onClick={() => goToImage(dotIndex)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                        isActive
                          ? "bg-[#545943] scale-125"
                          : "bg-[#545943]/50 hover:bg-[#545943]/75"
                      }`}
                      aria-label={`Go to image ${dotIndex + 1}`}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Arrows (Desktop) */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm z-30"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm z-30"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Optional CTA Button */}
      {ctaButton && (() => {
        // Convert Tailwind classes to rem values, or use direct CSS values
        let paddingTopValue: string | undefined;
        if (buttonSpacing.includes('px') || buttonSpacing.includes('rem') || buttonSpacing.includes('em') || buttonSpacing.includes('%') || buttonSpacing.includes('var(')) {
          paddingTopValue = buttonSpacing;
        } else if (buttonSpacing.startsWith('pt-') || buttonSpacing.startsWith('mt-')) {
          const num = parseInt(buttonSpacing.replace(/^(pt|mt)-/, ''));
          if (!isNaN(num)) {
            paddingTopValue = `${num * 0.25}rem`; // Tailwind spacing: 1 = 0.25rem = 4px
          }
        } else {
          paddingTopValue = buttonSpacing; // Fallback - try as-is
        }

        return (
          <div
            className="container mx-auto px-4 sm:px-6 lg:px-8"
            style={{ paddingTop: paddingTopValue }}
          >
            <div className="flex justify-center py-3">
              <AppLink
                href={ctaButton.href}
                className={buttonClass({ variant: ctaButton.variant || "olive", size: "lg" })}
              >
                {ctaButton.label}
              </AppLink>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
