"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";
import AppLink from "@/components/AppLink";

type Doc = { label: string; href: string };

type Props = {
  title?: string;
  items?: Doc[];
  preview?: boolean;
};

const defaults: Doc[] = [
  { label: "COA template (PDF)", href: "/docs/coa.pdf" },
  { label: "Quality policy (PDF)", href: "/docs/quality.pdf" },
];

export default function DocList({ title = "Documents", items = defaults, preview }: Props) {
  return (
    <section data-block="DocList" data-variant="list" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
      <AppearStack preview={preview} className="space-y-4">
        {items.map((d, i) => (
          <AppLink key={i} href={d.href} className="block rounded-md border p-4 hover:bg-[color:oklch(0.97_0_0)]" newTab>
            {d.label}
          </AppLink>
        ))}
      </AppearStack>
    </section>
  );
}


