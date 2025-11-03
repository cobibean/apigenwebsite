import type { Metadata } from "next";
import ProductShowcase from "@/sections/ProductShowcase";
import GalleryCarousel from "@/sections/GalleryCarousel";
import { products } from "@/data/products";
import { galleryImages } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Products | Apigen",
  description:
    "Discover Apigen's reserve dried cannabis strains: Cadillac Rainbow and Dantes Inferno. Premium cultivars crafted in British Columbia for discerning wholesale partners.",
};

export default function ProductsPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      {/* Viewport-fixed background washes */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-25%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_rgb(31_39_38_/_0.22)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgb(174_85_33_/_0.18)_0%,_transparent_75%)] blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-12%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,_rgb(31_39_38_/_0.16)_0%,_transparent_80%)] blur-3xl" />
      </div>

      {/* Product showcase sections */}
      {products.map((strain, idx) => (
        <ProductShowcase 
          key={strain.id} 
          strain={strain} 
          layoutDirection={idx % 2 === 0 ? "left" : "right"}
        />
      ))}

      {/* Gallery Carousel */}
      <GalleryCarousel
        title="Product Gallery"
        subtitle="Explore our premium dried cannabis flowers up close"
        images={galleryImages}
      />
    </div>
  );
}
