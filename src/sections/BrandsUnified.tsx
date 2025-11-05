"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import { buttonClass } from "@/lib/utils";
import BrandLogoCard from "@/components/BrandLogoCard";
import type { Brand } from "@/data/brands";

type Props = {
  preview?: boolean;
};

export default function BrandsUnified({ preview }: Props) {
  return (
    <section className="py-12 md:py-16 bg-(--surface-olive)">
      <div className="container mx-auto px-4">
        {/* Hero Section - Premium Typography */}
        <div className="text-center mb-8 md:mb-10">
          <Appear preview={preview}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-(--primary) mb-4 leading-tight">
              Premium Brands
            </h1>
          </Appear>
          <Appear preview={preview} delay={0.1}>
            <p className="text-base md:text-lg text-(--primary)/80 max-w-2xl mx-auto leading-relaxed font-light">
              Canadian craftsmanship meets premium quality
            </p>
          </Appear>
        </div>

        {/* Premium Editorial Feature Pairs */}
        <div className="space-y-14 md:space-y-16">

          {/* Pair 1: Mission - Premium Feature Layout */}
          <Appear
            preview={preview}
            className="group relative hover:translate-y-[-3px] transition-all duration-300 ease-out"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-y-0 md:gap-x-6 items-start relative md:pr-4 lg:pr-6">
              {/* Dominant Image - Full Height */}
              <div className="md:col-span-7 relative z-10">
                <BrandLogoCard brand={brands.find(b => b.id === 'mission')!} preview={preview} />
              </div>
              {/* Secondary Content - Offset and Layered */}
              <div className="md:col-span-5 md:col-start-8 relative z-20 md:mt-5 lg:mt-6 md:justify-self-start">
                <BrandCard brand={brands.find(b => b.id === 'mission')!} preview={preview} />
              </div>
            </div>
          </Appear>

          {/* Pair 2: Cannada Craft - Premium Feature Layout */}
          <Appear
            preview={preview}
            delay={0.2}
            className="group relative hover:translate-y-[-3px] transition-all duration-300 ease-out"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-y-0 md:gap-x-6 items-start relative md:pl-4 lg:pl-6">
              {/* Secondary Content - Offset and Layered */}
              <div className="md:col-span-5 relative z-20 md:mb-5 lg:mb-6 md:justify-self-end">
                <BrandCard brand={brands.find(b => b.id === 'cannada-craft')!} preview={preview} />
              </div>
              {/* Dominant Image - Full Height */}
              <div className="md:col-span-7 md:col-start-6 relative z-10">
                <BrandLogoCard brand={brands.find(b => b.id === 'cannada-craft')!} preview={preview} />
              </div>
            </div>
          </Appear>

        </div>

        {/* CTA Button */}
        <div className="text-center">
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

function BrandCard({ brand, preview }: { brand: Brand; preview?: boolean }) {
  return (
    <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-[16px] border border-(--border)/70 bg-(--card)/95 p-5 shadow-[0_22px_40px_rgba(24,32,20,0.12)] transition-all duration-300 md:max-w-[380px] md:p-6 lg:p-6">
      {/* Headline keeps hierarchy clear without excess space */}
      <h1
        className="text-2xl md:text-3xl font-bold tracking-tight text-(--primary) mb-3 leading-tight"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {brand.id === 'mission' ? "From Mission to Your Hands" : brand.heading}
      </h1>

      <p
        className="text-sm md:text-base leading-relaxed text-(--primary)/70"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {brand.id === 'mission'
          ? "MISSION reflects our commitment to cultivating premium, small-batch cannabis that honours our community's history while shaping the future of the industry."
          : brand.body[0]}
      </p>

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-2">
          {brand.highlights.slice(0, 3).map((highlight, index) => {
            let displayTitle = highlight.title;

            if (brand.id === 'mission') {
              if (index === 1) displayTitle = "Premium small-batch";
              else if (index === 2) displayTitle = "Trustworthy retail";
            } else if (brand.id === 'cannada-craft') {
              if (index === 2) displayTitle = "Batch consistency";
            }

            return (
              <span
                key={highlight.title}
                className="inline-flex items-center rounded-[10px] border border-(--border)/70 bg-transparent px-3 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-(--primary)/70 leading-none"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {displayTitle}
              </span>
            );
          })}
        </div>

        <div
          className="flex flex-col gap-3 border-t border-(--border)/70 pt-4 text-[10px] font-medium uppercase tracking-[0.08em] text-(--primary)/55"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {brand.attributes.map(attribute => {
            const resolvedValue =
              attribute.label === "Origin"
                ? brand.id === "mission"
                  ? "Mission, BC"
                  : "BC, Canada"
                : attribute.value;

            return (
              <div key={attribute.label} className="flex flex-col gap-1 leading-tight">
                <span>{attribute.label}:</span>
                <span className="text-xs font-normal normal-case tracking-normal text-(--primary)/70 md:text-sm">
                  {resolvedValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Import brands data
import { brands } from "@/data/brands";
