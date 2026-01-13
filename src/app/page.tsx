import type { Metadata } from "next";

// Force dynamic rendering to fetch fresh CMS content on each request
export const dynamic = "force-dynamic";

import Hero from "@/sections/Hero";
import MissionSection_1 from "@/sections/MissionSection_1";
import AboutStory from "@/sections/AboutStory";
import BrandsUnified from "@/sections/BrandsUnified";
import { aboutContent } from "@/data/about";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { galleryImages } from "@/data/gallery";
import CTA from "@/sections/CTA";
import { homeContent } from "@/data/home";
import { getCarouselImagesBySlugWithFallback } from "@/lib/carousels";
import { getPageContent, c } from "@/lib/content";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default async function Home() {
  // Fetch carousel images and CMS content in parallel
  const [images, homeContentCMS, aboutContentCMS] = await Promise.all([
    getCarouselImagesBySlugWithFallback("home-main", galleryImages),
    getPageContent("home"),
    getPageContent("about"),
  ]);

  // Merge CMS content with static fallbacks
  const heroContent = {
    ...homeContent.hero,
    eyebrow: c(homeContentCMS, "hero.eyebrow", homeContent.hero.eyebrow),
    subtitle: c(homeContentCMS, "hero.subtitle", homeContent.hero.subtitle),
    title: c(homeContentCMS, "hero.title", homeContent.hero.title),
    copy: c(homeContentCMS, "hero.copy", homeContent.hero.copy),
    ctaLabel: c(homeContentCMS, "hero.ctaLabel", homeContent.hero.ctaLabel),
  };

  const missionContent = {
    ...homeContent.mission,
    eyebrow: c(homeContentCMS, "mission.eyebrow", homeContent.mission.eyebrow),
    taglinePrimary: c(homeContentCMS, "mission.taglinePrimary", homeContent.mission.taglinePrimary),
    taglineSecondary: c(homeContentCMS, "mission.taglineSecondary", homeContent.mission.taglineSecondary),
    lead: c(homeContentCMS, "mission.lead", homeContent.mission.lead),
    body: c(homeContentCMS, "mission.body", homeContent.mission.body),
    cta: {
      ...homeContent.mission.cta,
      label: c(homeContentCMS, "mission.ctaLabel", homeContent.mission.cta.label),
    },
  };

  const ctaContent = {
    ...homeContent.cta,
    title: c(homeContentCMS, "cta.title", homeContent.cta.title),
    label: c(homeContentCMS, "cta.label", homeContent.cta.label),
  };

  // Merge About content from CMS with static fallback
  const aboutContentMerged = {
    ...aboutContent,
    title: c(aboutContentCMS, "title", aboutContent.title),
    cards: aboutContent.cards.map((card, idx) => ({
      ...card,
      title: c(aboutContentCMS, `cards.${idx}.title`, card.title),
      content: c(aboutContentCMS, `cards.${idx}.content`, card.content),
    })),
  };

  return (
    <>
      <Hero
        content={heroContent}
        wordmarkMaxWidth="70%"
        mobileWordmarkMaxWidth="88%"
        mobileContentOffsetY="-3rem"
        subtitleGap="var(--spacing-xl)"
        mobileSubtitleGap="28px"
        mobileContainerPadding="16px"
        mobileContentMaxWidth="100%"
        subtitleHorizontalPadding="0px"
        subtitleMaxWidth="none"
        subtitleOffsetX="0px"
        subtitleStyle="text"
        mobileCtaGap="40px"
      />
      <MissionSection_1 content={missionContent} />
      <AboutStory content={aboutContentMerged} />
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
        images={images}
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

      <CTA content={ctaContent} />
    </>
  );
}
