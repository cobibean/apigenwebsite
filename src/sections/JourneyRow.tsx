"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import { trackEvent } from "@/lib/utils";

export type JourneyItem = {
  title: string;
  description?: string;
  href?: string;
  imageUrl?: string;
  imageAlt?: string;
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
  { title: "Cultivation", href: "/contact" },
  { title: "Processing", href: "/contact" },
  { title: "Quality", href: "/contact" },
  { title: "Export", href: "/contact" },
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
      <Appear as="div" preview={preview} className="mb-8">
        <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
      </Appear>

      <AppearStack as="div" preview={preview} className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {items.slice(0, 4).map((item, index) => (
          <AppLink
            key={index}
            href={item.href || "/contact"}
            className="group relative block overflow-hidden rounded-md border"
            data-item-index={index}
            aria-label={`${item.title} — Get in Touch`}
            onMouseEnter={() => trackEvent({ name: "journey_card_hover", payload: { index, title: item.title } })}
            onFocus={() => trackEvent({ name: "journey_card_hover", payload: { index, title: item.title } })}
            onClick={() => trackEvent({ name: "journey_card_click", payload: { index, title: item.title, href: item.href || "/contact" } })}
          >
            <div
              className="relative w-full"
              style={{ aspectRatio: "3 / 2" }}
            >
              {item.imageUrl ? (
                <AppImage
                  src={item.imageUrl}
                  alt={item.imageAlt || item.title}
                  sizes="(min-width: 768px) 25vw, 100vw"
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="h-full w-full"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, color-mix(in oklab, var(--accent) 40%, transparent), color-mix(in oklab, var(--primary) 70%, transparent))",
                  }}
                />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, black 60%, transparent) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm opacity-90">{item.description}</p>
                )}
              </div>
            </div>
          </AppLink>
        ))}
      </AppearStack>

      <Appear as="div" preview={preview} className="mt-8">
        <AppLink
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          onClick={() => trackEvent({ name: "journey_cta_click", payload: { location: "journey_footer", label: ctaLabel, href: ctaHref } })}
        >
          {ctaLabel}
        </AppLink>
      </Appear>
    </section>
  );
}


