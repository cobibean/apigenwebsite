import AboutStory from "@/sections/AboutStory";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { galleryImages } from "@/data/gallery";
import { aboutContent } from "@/data/about";
import { getCarouselImagesBySlugWithFallback } from "@/lib/carousels";

export default async function AboutPage() {
  const images = await getCarouselImagesBySlugWithFallback("about-main", galleryImages);
  return (
    <>
      <AboutStory content={aboutContent} />
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
