"use client";
import React from "react";

type Props = {
  text?: string;
};

export default function Disclaimer({ text = "For medical professionals and licensed partners. Not intended for the public." }: Props) {
  return (
    <section data-block="Disclaimer" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-8">
      <p className="text-sm text-[var(--secondary-foreground)]">{text}</p>
    </section>
  );
}


