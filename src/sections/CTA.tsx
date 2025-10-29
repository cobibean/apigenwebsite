"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

type Props = {
  title?: string;
  copy?: string;
  label?: string;
  href?: string;
  variant?: "brown" | "olive" | "neutral";
  preview?: boolean;
};

export default function CTA({
  title = "Ready to talk?",
  copy = "Let’s discuss your needs and timelines.",
  label = "Get in touch",
  href = "/contact",
  variant = "olive",
  preview,
}: Props) {
  return (
    <section data-block="CTA" data-variant="default" className="bg-[var(--surface)]">
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

