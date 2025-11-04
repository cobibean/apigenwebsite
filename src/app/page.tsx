import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import MissionSection_1 from "@/sections/MissionSection_1";
import AboutStory from "@/sections/AboutStory";
import Brands2 from "@/sections/Brands2";
import { brands as defaultBrands } from "@/data/brands";
import { aboutContent } from "@/data/about";
import ProductShowcase from "@/sections/ProductShowcase";
import { products } from "@/data/products";
import GalleryCarousel from "@/sections/GalleryCarousel";
import { galleryImages } from "@/data/gallery";
import CTA from "@/sections/CTA";
import { homeContent } from "@/data/home";

export const metadata: Metadata = {
  title: homeContent.metadata.title,
  description: homeContent.metadata.description,
};

export default function Home() {
  // Get products for showcases based on configured IDs
  const showcaseProducts = homeContent.productShowcases.productIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <>
      <Hero content={homeContent.hero} />
      <MissionSection_1 content={homeContent.mission} />
      <AboutStory content={aboutContent} />
      <Brands2 brands={defaultBrands} />

      {/* Data-driven Product Showcase Cards */}
      {showcaseProducts.map((strain, idx) => {
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
      })}

      <GalleryCarousel
        content={homeContent.gallery}
        images={galleryImages}
      />
      <CTA content={homeContent.cta} />
    </>
  );
}
