import type { Metadata } from "next";

// Force dynamic rendering to fetch fresh CMS content on each request
export const dynamic = "force-dynamic";

import CraftBrandSection from "@/sections/CraftBrandSection";
import MissionBrandSection from "@/sections/MissionBrandSection";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { brands, type Brand } from "@/data/brands";
import { galleryImages } from "@/data/gallery";
import { getCarouselImagesBySlugWithFallback } from "@/lib/carousels";
import { getPageContent, c } from "@/lib/content";

export const metadata: Metadata = {
  title: "Brands | Apigen",
  description:
    "Discover Cannada Craft and Mission, Apigen's premium dried flower brands crafted in British Columbia for global export partners and local retail markets.",
};

export default async function BrandsPage() {
  // Fetch carousel images and CMS content in parallel
  const [images, content] = await Promise.all([
    getCarouselImagesBySlugWithFallback("brands-main", galleryImages),
    getPageContent("brands"),
  ]);

  // Merge CMS content with static fallbacks for each brand
  const mergedBrands: Brand[] = brands.map((brand) => ({
    ...brand,
    name: c(content, `${brand.id}.name`, brand.name),
    heading: c(content, `${brand.id}.heading`, brand.heading),
    body: c(content, `${brand.id}.body`, brand.body.join("\n\n")).split("\n\n"),
    attributes: brand.attributes.map((attr, idx) => ({
      label: c(content, `${brand.id}.attributes.${idx}.label`, attr.label),
      value: c(content, `${brand.id}.attributes.${idx}.value`, attr.value),
    })),
    highlights: brand.highlights.map((hl, idx) => ({
      title: c(content, `${brand.id}.highlights.${idx}.title`, hl.title),
      description: c(content, `${brand.id}.highlights.${idx}.description`, hl.description),
    })),
  }));

  const [primaryBrand, ...otherBrands] = mergedBrands;

  return (
    <div className="hero-bleed relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      {/* Viewport-fixed background washes with advanced olive gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        {/* Primary olive mesh gradient - PRO LEVEL */}
        <div className="absolute left-[-30%] top-[-25%] h-[680px] w-[680px] rounded-full bg-gradient-to-br from-[var(--surface-olive)]/18 via-[var(--accent)]/12 to-[var(--btn-olive)]/15 blur-3xl" />

        {/* Secondary olive radial with copper accent - PRO LEVEL */}
        <div className="absolute left-[15%] top-[-5%] h-[520px] w-[520px] rounded-full bg-gradient-radial from-[var(--accent)]/22 via-[var(--surface-olive)]/16 to-transparent blur-2xl" />

        {/* Tertiary olive conic sweep - PRO LEVEL */}
        <div className="absolute right-[-20%] top-[10%] h-[620px] w-[620px] rounded-full bg-gradient-conic from-transparent via-[var(--btn-olive)]/18 to-[var(--accent)]/12 blur-3xl" />

        {/* Accent olive band - PRO LEVEL */}
        <div className="absolute bottom-[-15%] left-[35%] h-[480px] w-[480px] rounded-full bg-gradient-to-t from-[var(--surface-olive)]/20 to-transparent blur-2xl" />
      </div>
      {primaryBrand ? <CraftBrandSection brand={primaryBrand} /> : null}
      {otherBrands.filter(Boolean).map((brand) => (
        <MissionBrandSection key={brand!.id} brand={brand!} />
      ))}
      <div className="pt-8 pb-16 md:pt-12 md:pb-20">
        <ProductCarousel3D
          images={images}
          autoPlay
          autoPlayDelay={4000}
          dotsSpacing="bottom-6"
          buttonSpacing="pt-2"
        />
      </div>
    </div>
  );
}
