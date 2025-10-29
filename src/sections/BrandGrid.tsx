"use client";
import React from "react";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";

type Brand = { name: string; logo: string; href?: string };

type Props = {
  title?: string;
  brands?: Brand[];
};

const defaults: Brand[] = [
  { name: "Cannada Craft", logo: "/brands/Cannada%20Craft%20No%20BG.png", href: "/brands#cannada-craft" },
  { name: "Apigen Labs", logo: "/hero/logo%20+%20text.png", href: "/contact" },
  { name: "White Label Partners", logo: "/hero/transparentlogo.png", href: "/contact" },
  { name: "Medical Export", logo: "/vercel.svg", href: "/contact" },
];

export default function BrandGrid({ title = "Our brands", brands = defaults }: Props) {
  return (
    <section data-block="BrandGrid" data-variant="grid" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="space-y-6 md:space-y-8">
          <h2 className="text-2xl font-semibold text-[var(--primary)] md:text-3xl" style={{ fontFamily: "var(--font-sans)" }}>
            {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {brands.map((brand) => (
              <AppLink
                key={brand.name}
                href={brand.href || "/contact"}
                className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-[color-mix(in_oklab,var(--border)_70%,transparent)] bg-[var(--card)] p-6 text-center transition hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg"
              >
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={240}
                  height={120}
                  className="max-w-full h-auto object-contain"
                />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--secondary-foreground)]" style={{ fontFamily: "var(--font-mono)" }}>
                  {brand.name}
                </span>
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
