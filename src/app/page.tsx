import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import MissionSection_1 from "@/sections/MissionSection_1";
import AboutStory from "@/sections/AboutStory";
import BrandsUnified from "@/sections/BrandsUnified";
import { aboutContent } from "@/data/about";
import ProductShowcase from "@/sections/ProductShowcase";
import { cultivars } from "@/data/cultivars";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { galleryImages } from "@/data/gallery";
import CTA from "@/sections/CTA";
import { homeContent } from "@/data/home";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  // Get cultivars for showcases based on configured IDs
  const showcaseCultivars = homeContent.productShowcases.productIds
    .map(id => cultivars.find(p => p.id === id))
    .filter(Boolean);

  return (
    <>
      <Hero
        content={homeContent.hero}
        subtitleGap="var(--spacing-xl)"
        mobileSubtitleGap="20px"
        mobileContainerPadding="16px"
        mobileContentMaxWidth="98%"
        subtitleHorizontalPadding="0px"
        subtitleMaxWidth="none"
        subtitleOffsetX="0px"
        subtitleStyle="text"
        mobileContentOffsetY="-100px"
        mobileCtaGap="24px"
      />
      <MissionSection_1 content={homeContent.mission} />
      <AboutStory content={aboutContent} />
      <BrandsUnified />

      {/* Data-driven Product Showcase Cards - TEMPORARILY COMMENTED OUT */}
      {/* {showcaseCultivars.map((strain, idx) => {
        const layoutDirection = homeContent.productShowcases.layoutPattern[
          idx % homeContent.productShowcases.layoutPattern.length
        ];

        return (
          <ProductShowcase
            key={strain!.id}
            strain={strain!}
            layoutDirection={layoutDirection}
            {...homeContent.productShowcases.styling}
          />
        );
      })} */}

      {/* ProductCarousel3D - Props passed explicitly (visual editor pattern) */}
      <ProductCarousel3D
        images={galleryImages}
        autoPlay={true}
        autoPlayDelay={4000}
        dotsSpacing="bottom-6"
        ctaButton={{
          label: "See Our Cultivars",
          href: "/cultivars",
          variant: "olive",
        }}
        buttonSpacing="pt-2"
      />

      <CTA content={homeContent.cta} />
    </>
  );
}
