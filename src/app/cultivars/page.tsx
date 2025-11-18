import type { Metadata } from "next";
import ProductShowcase from "@/sections/ProductShowcase";
import ProductCarousel3D from "@/components/ProductCarousel3D";
import { cultivars, cultivarsContent } from "@/data/cultivars";
import { galleryImages } from "@/data/gallery";
import GlassEffect from "@/components/ui/liquid-glass";

export const metadata: Metadata = {
  title: cultivarsContent.pageTitle,
  description: cultivarsContent.pageDescription,
};

export default function CultivarsPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background text-foreground">
      {/* Viewport-fixed background washes */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-25%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_rgb(31_39_38_/_0.22)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgb(174_85_33_/_0.18)_0%,_transparent_75%)] blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-12%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,_rgb(31_39_38_/_0.16)_0%,_transparent_80%)] blur-3xl" />
      </div>

      {/* Cultivar showcase sections */}
      {cultivars.map((strain, idx) => (
        <ProductShowcase 
          key={strain.id} 
          strain={strain} 
          layoutDirection={idx % 2 === 0 ? "left" : "right"}
        />
      ))}

      <section className="py-10 md:py-12">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="relative h-24 sm:h-28 w-full overflow-hidden">
            <div className="absolute inset-0 bg-[#5E624C]/18" />
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#5E624C]/28 via-[#5E624C]/18 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#5E624C]/24 via-[#5E624C]/12 to-transparent" />
            <div className="absolute left-0 top-0 h-full w-[35%] bg-gradient-to-r from-[#373a2c]/35 via-transparent to-transparent" />
            <div className="absolute right-0 top-0 h-full w-[35%] bg-gradient-to-l from-[#373a2c]/35 via-transparent to-transparent" />
            <div className="absolute inset-x-[15%] top-1/2 h-16 -translate-y-1/2 rounded-full bg-[#5E624C]/24 blur-3xl" />
            <div className="absolute inset-x-[10%] top-1/2 h-20 -translate-y-1/2 rounded-full bg-[#5E624C]/12 blur-2xl" />
          </div>
        </div>
      </section>

      {/* Cultivar Carousel */}
      <div className="pt-4 pb-16 md:pt-16">
        <ProductCarousel3D
          images={galleryImages}
          autoPlay={true}
          autoPlayDelay={4000}
        />
      </div>
    </div>
  );
}
