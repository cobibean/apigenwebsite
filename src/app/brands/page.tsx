import type { Metadata } from "next";
import CraftBrandSection from "@/sections/CraftBrandSection";
import MissionBrandSection from "@/sections/MissionBrandSection";
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
    </div>
  );
}
