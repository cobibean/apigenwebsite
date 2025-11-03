import React from "react";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";
import Card from "@/components/Card";
import { buttonClass } from "@/lib/utils";
import type { Brand } from "@/data/brands";

interface BrandsHeroProps {
  brand: Brand;
  preview?: boolean;
}

const SPACING = {
  section: "py-12 md:py-16 lg:py-20",
  headerBelow: "mb-10 md:mb-12 lg:mb-16",
  gridGap: "gap-10 md:gap-12 lg:gap-16",
  cardGrid: "gap-5 md:grid-cols-2 lg:grid-cols-1",
} as const;

export default function BrandsHero({ brand, preview }: BrandsHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Hero section with heading, description, and logo */}
      <div className={`relative mx-auto flex w-full max-w-6xl flex-col justify-center px-6 ${SPACING.section} lg:grid lg:min-h-[calc(100vh-140px)] lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] lg:items-center lg:gap-16`}>
        <div className="space-y-6 md:space-y-8">
          <span className="sr-only">{brand.name}</span>
          <h1 className="max-w-[18ch] text-balance font-semibold tracking-tight text-primary text-[clamp(2.35rem,3.6vw,3.3rem)] lg:text-[clamp(2.6rem,3.3vw,3.6rem)] font-sans">
            {brand.heading}
          </h1>
          <div className="max-w-[620px] space-y-3 text-[clamp(1.08rem,1.35vw,1.25rem)] leading-[1.55] text-primary font-body">
            {brand.body.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="relative mt-6 flex items-center justify-center lg:mt-0">
          <div className="absolute inset-0 scale-110 rounded-[36px] bg-[linear-gradient(160deg,_color-mix(in_oklab,rgb(174_85_33_/_0.25),transparent)_0%,_transparent_60%)] blur-2xl" aria-hidden="true" />
          <div className={`relative flex w-full max-w-[320px] aspect-square flex-col items-center justify-center rounded-[32px] border p-8 shadow-xl backdrop-blur-xl md:max-w-[380px] md:p-10 transition-colors duration-300 ${
            brand.id === 'mission' 
              ? 'bg-[#0d0c0c] border-[#0d0c0c] hover:bg-white group' 
              : 'border-border bg-card'
          }`}>
            <div className="relative w-full max-w-[200px] md:max-w-[260px]">
              {brand.id === 'mission' ? (
                <>
                  <AppImage
                    src="/brands/mission_black_bg.jpeg"
                    alt={`${brand.name} wordmark`}
                    width={1024}
                    height={1024}
                    priority
                    className="w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <AppImage
                    src="/brands/mission_no_bg.jpeg"
                    alt={`${brand.name} wordmark`}
                    width={1024}
                    height={1024}
                    priority
                    className="absolute inset-0 w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </>
              ) : (
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} wordmark`}
                  width={1024}
                  height={1024}
                  priority
                  className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_rgba(0_0_0_/_0.18)] md:max-w-[260px]"
                />
              )}
            </div>
            {brand.id !== 'mission' && (
              <div className="mt-8 h-px w-20 bg-[linear-gradient(to_right,_transparent,_color-mix(in_oklab,rgb(174_85_33_/_0.6),transparent),_transparent)]" aria-hidden="true" />
            )}
            {brand.id === 'mission' && (
              <div className="mt-8 h-px w-20 opacity-0" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>

      {/* Details section with highlights and attributes */}
      <div
        className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,rgb(174_85_33_/_0.25),transparent)_0%,_transparent_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 md:py-16 lg:grid lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:gap-12">
        <div className={`grid ${SPACING.cardGrid}`}>
          {brand.highlights.map((highlight) => (
            <Card
              key={highlight.title}
              title={highlight.title}
              description={highlight.description}
              radius="md"
              padding="md"
              gradientDirection="br"
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-[28px] border border-border bg-card px-7 pt-7 pb-6 shadow-xl md:px-8 md:pt-8 md:pb-7">
            <h2 className="text-center text-sm uppercase tracking-[0.35em] text-secondary font-mono">
              Brand at a glance
            </h2>
            <dl className="mt-6 space-y-5">
              {brand.attributes.map((attribute) => (
                <div key={attribute.label} className="flex flex-col gap-1 text-center">
                  <dt className="text-xs uppercase tracking-[0.3em] text-secondary font-mono">
                    {attribute.label}
                  </dt>
                  <dd className="text-lg font-medium text-primary font-sans">
                    {attribute.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          
          <div className="flex justify-center mt-12">
            <AppLink href="/contact" className={buttonClass({ variant: "olive", size: "lg" })}>
              Get in Touch
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
