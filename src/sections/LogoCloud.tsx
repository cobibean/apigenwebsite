"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";
import AppImage from "@/components/AppImage";

type Logo = { src: string; alt: string; width?: number; height?: number };

type Props = {
  title?: string;
  logos?: Logo[];
  preview?: boolean;
};

const defaults: Logo[] = [
  { src: "/vercel.svg", alt: "Vercel", width: 100, height: 24 },
  { src: "/next.svg", alt: "Next.js", width: 80, height: 24 },
  { src: "/window.svg", alt: "Window", width: 80, height: 24 },
];

export default function LogoCloud({ title = "Trusted by", logos = defaults, preview }: Props) {
  return (
    <section data-block="LogoCloud" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h3 className="mb-6 text-sm text-[var(--secondary-foreground)]">{title}</h3>
      <AppearStack preview={preview} className="grid grid-cols-2 gap-6 md:grid-cols-6">
        {logos.map((logo, i) => (
          <div key={i} className="flex items-center justify-center opacity-80">
            <AppImage src={logo.src} alt={logo.alt} width={logo.width || 100} height={logo.height || 24} />
          </div>
        ))}
      </AppearStack>
    </section>
  );
}


