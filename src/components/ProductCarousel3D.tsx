"use client";

import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrolled";
import { useHeader } from "@/components/navigation/Header";

export interface CarouselImage {
  src: string;
  alt: string;
  category?: string;
  priority?: boolean;
}

interface ProductCarousel3DProps {
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
  // Container dimensions
  containerMinHeight: "min-h-[500px] md:min-h-[600px]",
  containerMaxWidth: "max-w-6xl",

  // Card dimensions and positioning
  // Increased width: w-60 (240px) mobile, w-72 (288px) desktop for better visibility
  cardWidth: "w-60 md:w-72",
  cardHeight: "h-[20px] md:h-[480px]",
  cardBorderRadius: "rounded-[24px]",
} as const;

/**
 * ProductCarousel3D - 3D carousel component with optional CTA button
 * 
 * Visual Editor Pattern:
 * - Visual editors (Builder.io, etc.) should pass all props explicitly
 * - Component defaults are for standalone/Storybook use only
 * - Props are designed to be easily mapped from visual editor UI controls
 * 
 * @example
 * // Visual editor usage - always pass props explicitly
 * <ProductCarousel3D
 *   images={images}
 *   autoPlay={true}
 *   dotsSpacing="bottom-6"
 *   buttonSpacing="48px"
 *   ctaButton={{ label: "See Products", href: "/products", variant: "olive" }}
 * />
 */
export default function ProductCarousel3D({
  images,
  autoPlay = true,
  autoPlayDelay = 4000,
  className = "",
  ctaButton,
  dotsSpacing = "bottom-6", // Default for standalone use only
  buttonSpacing = "48px", // Default for standalone use only
}: ProductCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isInView, setIsInView] = useState(false);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const reduced = !!prefersReducedMotion;
  const scrollDirection = useScrollDirection();
  const headerContext = useHeader();
  const { setHidden } = headerContext;
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number>(0);
  const touchEndRef = useRef<number>(0);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Intersection observer for carousel visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of carousel is visible
        rootMargin: "0px 0px -10% 0px" // Trigger slightly before fully in view
      }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  // Header visibility control based on scroll direction and carousel visibility
  useEffect(() => {
    if (isInView && scrollDirection) {
      if (scrollDirection === "down") {
        setHidden(true); // Hide header when scrolling down into carousel
      } else if (scrollDirection === "up") {
        setHidden(false); // Show header when scrolling up
      }
    } else if (!isInView) {
      setHidden(false); // Show header when carousel is not in view
    }
  }, [isInView, scrollDirection, setHidden]);

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

  // Click handler to navigate to products page
  const handleCardClick = useCallback(() => {
    router.push("/products");
  }, [router]);

  // Get card styling based on position - 5 card layout (2 left, center, 2 right)
  const getCardStyle = useCallback((index: number) => {
    const position = (index - currentIndex + images.length) % images.length;

    if (position === 0) {
      // Center card - full size, no blur, highest z-index
      return {
        scale: 1,
        opacity: 1,
        blur: 0,
        zIndex: 30,
        x: 0,
        pointerEvents: "auto" as const,
      };
    } else if (position === 1) {
      // First card to the right - smaller, slightly blurred
      return {
        scale: 0.85,
        opacity: 0.7,
        blur: 3,
        zIndex: 20,
        x: 140,
        pointerEvents: "none" as const,
      };
    } else if (position === images.length - 1) {
      // First card to the left - smaller, slightly blurred
      return {
        scale: 0.85,
        opacity: 0.7,
        blur: 3,
        zIndex: 20,
        x: -140,
        pointerEvents: "none" as const,
      };
    } else if (position === 2) {
      // Second card to the right - much smaller, very blurred
      return {
        scale: 0.7,
        opacity: 0.4,
        blur: 8,
        zIndex: 10,
        x: 240,
        pointerEvents: "none" as const,
      };
    } else if (position === images.length - 2) {
      // Second card to the left - much smaller, very blurred
      return {
        scale: 0.7,
        opacity: 0.4,
        blur: 8,
        zIndex: 10,
        x: -240,
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
        pointerEvents: "none" as const,
      };
    }
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

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
      aria-label="Product carousel"
    >
      <div className={`relative flex items-center justify-center ${SPACING.containerMinHeight} pb-12`}>
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
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onClick={isCenter ? handleCardClick : undefined}
                  role="button"
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={isCenter ? `View ${image.alt}. Click to explore our products.` : image.alt}
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
                      width={288}
                      height={480}
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
          <div className={`absolute ${dotsSpacing} left-1/2 -translate-x-1/2 flex space-x-2 z-30`}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
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
