"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import AppLink from "@/components/AppLink";
import Card from "@/components/Card";
import { buttonClass } from "@/lib/utils";

export type JourneyItem = {
  title: string;
  description?: string;
  href?: string;
};

type Props = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  items?: JourneyItem[];
  ctaLabel?: string;
  ctaHref?: string;
  preview?: boolean;
};

const defaultItems: JourneyItem[] = [
  { title: "Cultivation", description: "Premium genetics and expert growing practices from seed to harvest.", href: "/contact" },
  { title: "Processing", description: "State-of-the-art post-harvest processing and quality control.", href: "/contact" },
  { title: "Quality", description: "Rigorous testing and pharmaceutical-grade standards throughout.", href: "/contact" },
  { title: "Export", description: "Compliant global logistics and reliable delivery to partners worldwide.", href: "/contact" },
];

export default function JourneyRow({
  eyebrow = "Our Journey",
  title = "From seed to shipment",
  copy = "A consistent, compliant path to premium product.",
  items = defaultItems,
  ctaLabel = "Talk to sales",
  ctaHref = "/contact",
  preview,
}: Props) {
  return (
    <section data-block="Journey" data-variant="row-4" className="mx-auto w-full max-w-6xl px-4 py-16">
      <Appear preview={preview} className="mb-8">
        <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
      </Appear>

      <AppearStack preview={preview} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.slice(0, 4).map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description || ""}
            radius="md"
            padding="sm"
            gradientDirection="br"
          />
        ))}
      </AppearStack>

      <Appear preview={preview} className="mt-8">
        <AppLink href={ctaHref} className={buttonClass({ variant: "olive", size: "lg" })}>
          {ctaLabel}
        </AppLink>
      </Appear>
    </section>
  );
}


