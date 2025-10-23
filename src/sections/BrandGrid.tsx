"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";
import AppImage from "@/components/AppImage";
import AppLink from "@/components/AppLink";

type Brand = { name: string; logo: string; href?: string };

type Props = {
  title?: string;
  brands?: Brand[];
  preview?: boolean;
};

const defaults: Brand[] = [
  { name: "Brand A", logo: "/vercel.svg" },
  { name: "Brand B", logo: "/next.svg" },
  { name: "Brand C", logo: "/window.svg" },
];

export default function BrandGrid({ title = "Our brands", brands = defaults, preview }: Props) {
  return (
    <section data-block="BrandGrid" data-variant="cards" className="mx-auto w-full max-w-6xl px-4 py-12 bg-transparent">
      <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
      <AppearStack preview={preview} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {brands.map((b, i) => (
          <AppLink key={i} href={b.href || "/contact"} className="flex items-center gap-4 rounded-md border p-4 shadow-sm">
            <AppImage src={b.logo} alt={b.name} width={80} height={24} />
            <div className="font-medium">{b.name}</div>
          </AppLink>
        ))}
      </AppearStack>
    </section>
  );
}


