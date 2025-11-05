import AppImage from "@/components/AppImage";
import type { Brand } from "@/data/brands";
import { cn } from "@/lib/utils";

type Props = {
  brand: Brand;
  preview?: boolean;
};

// Spacing constants for logo card dimensions - editorial feature grid
const SPACING = {
  cardWidth: "w-full",
  cardHeight: "aspect-[4/3]", // 4:3 aspect ratio as requested
  borderRadius: "rounded-[16px]", // Consistent 16px radius
  padding: "p-0", // No padding for clean image fit
  border: "border-0", // Borderless as requested
};

export default function BrandLogoCard({ brand, preview }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-center",
        SPACING.cardWidth,
        SPACING.cardHeight,
        SPACING.borderRadius,
        SPACING.border,
        SPACING.padding,
        "transition-transform duration-300 hover:scale-[1.02] group",
        brand.id === "mission"
          ? "bg-black/30"
          : "bg-white shadow-[0_22px_48px_rgba(24,32,20,0.16)] border border-(--border)/40"
      )}
    >
      {/* Subtle keyline border for definition */}
      <div
        className={cn(
          "absolute inset-0 rounded-[16px]",
          brand.id === "mission" ? "border border-black/5" : "border border-white/70"
        )}
        aria-hidden="true"
      />

      {brand.id === 'mission' ? (
        <video
          className="w-full h-full object-cover absolute inset-0 rounded-[16px]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero/videos/forestloop1.mp4" type="video/mp4" />
          <AppImage
            src="/brands/mission_black_bg.jpeg"
            alt={`${brand.name} wordmark`}
            width={1024}
            height={1024}
            className="w-full h-full object-cover rounded-[16px]"
          />
        </video>
      ) : (
        <div className="relative z-10 flex h-full w-full items-center justify-center p-8 md:p-10">
          <AppImage
            src={brand.logo}
            alt={`${brand.name} wordmark`}
            width={1024}
            height={1024}
            className="h-full w-full max-w-[200px] object-contain drop-shadow-[0_20px_35px_rgba(18,30,22,0.18)] sm:max-w-[240px] md:max-w-[280px]"
          />
        </div>
      )}
    </div>
  );
}
