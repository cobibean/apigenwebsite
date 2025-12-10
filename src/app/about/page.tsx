import AboutStory from "@/sections/AboutStory";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { galleryImages } from "@/data/gallery";
import { aboutContent } from "@/data/about";

export default function AboutPage() {
  return (
    <>
      <AboutStory content={aboutContent} />
      <div className="pb-12 md:pb-16">
        <ProductCarousel3D
          images={galleryImages}
          autoPlay
          autoPlayDelay={4000}
          dotsSpacing="bottom-6"
          buttonSpacing="pt-2"
        />
      </div>
    </>
  );
}
