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
    <section data-block="CTA" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-16">
      <Appear preview={preview}>
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
        <p className="mt-2 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
        <div className="mt-6">
          <AppLink href={href} className={buttonClass({ variant, size: "lg" })}>
            {label}
          </AppLink>
        </div>
      </Appear>
    </section>
  );
}


