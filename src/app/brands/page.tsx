import type { Metadata } from "next";
import BrandsHero from "@/sections/BrandsHero";
import BrandDetails from "@/sections/BrandDetails";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Brands | Apigen",
  description:
    "Discover Cannada Craft and Mission, Apigen's premium dried flower brands crafted in British Columbia for global export partners and local retail markets.",
};

export default function BrandsPage() {
  const [primaryBrand, ...otherBrands] = brands;

  return (
    <div className="hero-bleed relative isolate min-h-screen overflow-hidden bg-background text-foreground">
      {/* Viewport-fixed background washes to bleed under header and across sections */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-25%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,rgb(31_39_38/0.22),transparent)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,rgb(174_85_33/0.18),transparent)_0%,transparent_75%)] blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-12%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,rgb(31_39_38/0.16),transparent)_0%,transparent_80%)] blur-3xl" />
      </div>
      {primaryBrand ? <BrandsHero brand={primaryBrand} /> : null}
      {otherBrands.filter(Boolean).map((brand) => (
        <BrandDetails key={brand!.id} brand={brand!} />
      ))}
    </div>
  );
}
