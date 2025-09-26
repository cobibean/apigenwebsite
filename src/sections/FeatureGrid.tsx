"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";

type Feature = { title: string; body?: string };

type Props = {
  title?: string;
  features?: Feature[];
  columns?: 2 | 3;
  preview?: boolean;
};

const defaults: Feature[] = [
  { title: "Consistency", body: "Batch-to-batch quality and potency." },
  { title: "Compliance", body: "Licenses and GMP-ready processes." },
  { title: "Care", body: "Patient-first partnerships." },
];

export default function FeatureGrid({ title = "What sets us apart", features = defaults, columns = 3, preview }: Props) {
  const grid = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
  return (
    <section data-block="FeatureGrid" data-variant={`cols-${columns}`} className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
      <AppearStack preview={preview} className={`grid grid-cols-1 gap-6 ${grid}`}>
        {features.map((f, i) => (
          <div key={i} className="rounded-md border p-4 shadow-sm">
            <h3 className="text-lg font-medium">{f.title}</h3>
            {f.body && <p className="mt-1 text-[var(--secondary-foreground)]">{f.body}</p>}
          </div>
        ))}
      </AppearStack>
    </section>
  );
}


