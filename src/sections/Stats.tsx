"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";

type Stat = { label: string; value: string };

type Props = {
  title?: string;
  items?: Stat[];
  preview?: boolean;
};

const defaults: Stat[] = [
  { label: "SKUs", value: "24" },
  { label: "Markets", value: "6" },
  { label: "COAs", value: "100%" },
];

export default function Stats({ title = "By the numbers", items = defaults, preview }: Props) {
  return (
    <section data-block="Stats" data-variant="kpis" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
      <AppearStack preview={preview} className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((s, i) => (
          <div key={i} className="rounded-md border p-6 text-center">
            <div className="text-3xl font-semibold">{s.value}</div>
            <div className="mt-1 text-[var(--secondary-foreground)]">{s.label}</div>
          </div>
        ))}
      </AppearStack>
    </section>
  );
}


