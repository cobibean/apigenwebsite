// Force dynamic rendering to fetch fresh CMS content on each request
export const dynamic = "force-dynamic";

import AboutStory from "@/sections/AboutStory";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { galleryImages } from "@/data/gallery";
import { aboutContent } from "@/data/about";
import { getCarouselImagesBySlugWithFallback } from "@/lib/carousels";
import { getPageContent, c } from "@/lib/content";

export default async function AboutPage() {
  // Fetch carousel images and CMS content in parallel
  const [images, content] = await Promise.all([
    getCarouselImagesBySlugWithFallback("about-main", galleryImages),
    getPageContent("about"),
  ]);

  // Merge CMS content with static fallbacks
  const mergedAboutContent = {
    ...aboutContent,
    title: c(content, "title", aboutContent.title),
    cards: aboutContent.cards.map((card, idx) => ({
      ...card,
      title: c(content, `cards.${idx}.title`, card.title),
      content: c(content, `cards.${idx}.content`, card.content),
    })),
  };

  return (
    <>
      <AboutStory content={mergedAboutContent} />
      <div className="pb-12 md:pb-16">
        <ProductCarousel3D
          images={images}
          autoPlay
          autoPlayDelay={4000}
          dotsSpacing="bottom-6"
          buttonSpacing="pt-2"
        />
      </div>
    </>
  );
}
