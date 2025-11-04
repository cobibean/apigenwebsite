"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";
import type { CTAContent, SectionStyling } from "@/data/home";

type Props = {
  content: CTAContent & { styling?: SectionStyling };
  preview?: boolean;
};

export default function CTA({ content, preview }: Props) {
  const { title, copy, label, href, variant, styling } = content;
  return (
    <section data-block="CTA" data-variant="default" className={styling?.backgroundClass || "bg-[var(--surface)]"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <Appear preview={preview}>
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--primary)] md:text-3xl" style={{ fontFamily: "var(--font-sans)" }}>
              {title}
            </h2>
            <p className="text-base md:text-lg text-[var(--secondary-foreground)]">{copy}</p>
            <div className="pt-2">
              <AppLink href={href} className={buttonClass({ variant, size: "lg" })}>
                {label}
              </AppLink>
            </div>
          </div>
        </Appear>
      </div>
    </section>
  );
}

