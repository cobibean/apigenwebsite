"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import styles from "./JourneyRow.module.css";

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
      <Appear preview={preview} className="mb-8">
        <div className="text-sm text-[var(--secondary-foreground)]">{eyebrow}</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
      </Appear>

      <AppearStack preview={preview} className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {items.slice(0, 4).map((item, index) => (
          <AppLink
            key={index}
            href={item.href || "/contact"}
            className={`group relative block border ${styles.card}`}
            data-item-index={index + 1}
            aria-label={`${item.title} — Get in Touch`}
            onPointerEnter={(e) => {
              const target = e.currentTarget as HTMLElement;
              const rect = target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const fromLeft = x < rect.width - x && x < y && x < rect.height - y;
              const fromRight = rect.width - x < x && rect.width - x < y && rect.width - x < rect.height - y;
              const fromTop = y < x && y < rect.width - x && y < rect.height - y;
              const dir = fromLeft ? "left" : fromRight ? "right" : fromTop ? "top" : "bottom";
              target.setAttribute("data-dir", dir);
              target.setAttribute("data-hovered", "true");
            }}
            onPointerLeave={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.setAttribute("data-hovered", "false");
            }}
            onFocus={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.setAttribute("data-dir", "bottom");
              target.setAttribute("data-hovered", "true");
            }}
            onBlur={(e) => {
              const target = e.currentTarget as HTMLElement;
              target.setAttribute("data-hovered", "false");
            }}
          >
            <div className={styles.media}>
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
              <div className={`${styles.overlay} fromBottom`} />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.description && (
                  <p className={`mt-1 text-sm opacity-90 ${styles.desc}`}>{item.description}</p>
                )}
              </div>
            </div>
          </AppLink>
        ))}
      </AppearStack>

      <Appear preview={preview} className="mt-8">
        <AppLink
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        >
          {ctaLabel}
        </AppLink>
      </Appear>
    </section>
  );
}


