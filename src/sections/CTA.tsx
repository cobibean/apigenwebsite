"use client";
import React from "react";
import Appear from "@/components/motion/Appear";
import AppLink from "@/components/AppLink";

type Props = {
  title?: string;
  copy?: string;
  label?: string;
  href?: string;
  preview?: boolean;
};

export default function CTA({
  title = "Ready to talk?",
  copy = "Let’s discuss your needs and timelines.",
  label = "Get in touch",
  href = "/contact",
  preview,
}: Props) {
  return (
    <section data-block="CTA" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-16">
      <Appear preview={preview}>
        <h2 className="text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
        <p className="mt-2 max-w-2xl text-[var(--secondary-foreground)]">{copy}</p>
        <div className="mt-6">
          <AppLink href={href} className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-[var(--accent-foreground)] shadow-sm transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]">
            {label}
          </AppLink>
        </div>
      </Appear>
    </section>
  );
}


