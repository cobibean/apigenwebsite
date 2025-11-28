"use client";
import React from "react";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import { buttonClass, cn } from "@/lib/utils";
import type { Brand } from "@/data/brands";

type Props = {
  preview?: boolean;
};

export default function BrandsUnified({ preview }: Props) {
  const featuredBrands = [
    { id: "mission" as const, delay: 0 },
    { id: "cannada-craft" as const, delay: 0.05 },
  ];

  return (
    <section className="py-10 md:py-14 bg-(--surface-olive)">
      <div className="container mx-auto px-4">
        {/* Hero Section - Typography matched to MissionSection_1 */}
        <div className="text-center mb-8 md:mb-10">
          <Appear preview={preview}>
            <p
              className="text-sm mb-4 [color:color-mix(in_oklab,white_78%,transparent)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              APIGEN BRANDS
            </p>
          </Appear>
          <Appear preview={preview}>
            <h2
              className="uppercase [color:var(--fg-on-olive)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                lineHeight: 0.86,
                fontSize: "clamp(26px, 4.8vw, 56px)",
              }}
            >
              Premium Brands
            </h2>
          </Appear>
          <Appear preview={preview}>
            <p
              className="mt-3 uppercase [color:var(--accent)]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                lineHeight: 0.86,
                fontSize: "clamp(26px, 4.8vw, 56px)",
              }}
            >
              Crafted in Canada
            </p>
          </Appear>
        </div>

        {/* Premium Editorial Feature Pairs */}
        <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-10">
          {featuredBrands.map(({ id, delay }) => {
            const brand = brands.find((entry) => entry.id === id);
            if (!brand) return null;

            return (
              <Appear key={id} preview={preview} delay={delay} className="w-full">
                <BrandFlipCard brand={brand} />
              </Appear>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center pt-10 md:pt-12">
          <Appear preview={preview}>
            <AppLink href="/brands" className={buttonClass({ variant: "olive", size: "lg" })}>
              Explore All Brands
            </AppLink>
          </Appear>
        </div>
      </div>
    </section>
  );
}

function BrandFlipCard({ brand }: { brand: Brand }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const keyAttributes = brand.attributes.filter(
    (attribute) => attribute.label === "Category" || attribute.label === "Market focus"
  );

  const displayHeading =
    brand.id === "mission"
      ? "From Mission to Your Hands"
      : "Cannada Craft – From Craft to Clinic.";

  const displayBody =
    brand.id === "mission"
      ? "MISSION grows small-batch flower rooted in Mission, BC—heritage craftsmanship for today's discerning retailers."
      : brand.body[0];

  // Mobile: click toggles; Desktop: hover controls
  const handleClick = () => {
    if (isMobile) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsFlipped(false);
  };

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[520px] cursor-pointer focus:outline-none focus-visible:[box-shadow:0_0_0_3px_rgba(255,255,255,0.35)]"
      )}
      style={{ perspective: "1600px" }}
      tabIndex={0}
      role="button"
      aria-label={`Flip card to view details for ${brand.name}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsFlipped(!isFlipped); } }}
    >
      <div
        className="relative w-full min-h-[400px] rounded-[24px] shadow-[0_28px_64px_rgba(24,32,20,0.18)] md:min-h-[420px]"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[24px] border border-(--border)/35 bg-black/5"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {brand.id === "mission" ? (
            <video
              className="absolute inset-0 h-full w-full rounded-[24px] object-cover"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src="/hero/videos/forestloop1.mp4" type="video/mp4" />
              <AppImage
                src="/brands/mission_black_bg.jpeg"
                alt={`${brand.name} wordmark`}
                width={1024}
                height={1024}
                className="h-full w-full rounded-[24px] object-cover"
              />
            </video>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white">
              <AppImage
                src={brand.logo}
                alt={`${brand.name} wordmark`}
                width={1024}
                height={1024}
                className="h-full w-full max-w-[320px] object-contain drop-shadow-[0_24px_52px_rgba(18,30,22,0.18)]"
              />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-black/10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 via-black/15 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-6 left-6 text-xs font-medium uppercase tracking-[0.28em] text-white/80">
            {brand.name}
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 flex h-full flex-col rounded-[24px] border border-(--border)/60 bg-(--card) px-7 py-7 text-left md:px-8 md:py-8"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col gap-4">
            <h3
              className="text-xl font-semibold leading-snug text-(--primary) md:text-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {displayHeading}
            </h3>
            <p
              className="text-base leading-[1.6] text-(--primary)/75"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {displayBody}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {brand.highlights.slice(0, 3).map((highlight, index) => {
              let displayTitle = highlight.title;

              if (brand.id === "mission") {
                if (index === 1) displayTitle = "Premium small-batch";
                else if (index === 2) displayTitle = "Trustworthy retail";
              } else if (brand.id === "cannada-craft") {
                if (index === 2) displayTitle = "Batch consistency";
              }

              return (
                <span
                  key={highlight.title}
                  className="inline-flex items-center rounded-[12px] border border-(--border)/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-(--primary)/70"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {displayTitle}
                </span>
              );
            })}
          </div>

          <div
            className="mt-auto grid grid-cols-1 gap-x-6 gap-y-3 border-t border-(--border)/60 pt-5 text-[10px] font-medium uppercase tracking-[0.08em] text-(--primary)/55 sm:grid-cols-2"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {keyAttributes.map((attribute) => (
              <div key={attribute.label} className="flex flex-col gap-1 leading-tight">
                <span>{attribute.label}:</span>
                <span className="text-sm font-normal normal-case tracking-normal text-(--primary)/70">
                  {attribute.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Import brands data
import { brands } from "@/data/brands";
