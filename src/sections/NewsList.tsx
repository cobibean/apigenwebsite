"use client";
import React from "react";
import AppearStack from "@/components/motion/AppearStack";
import AppLink from "@/components/AppLink";

type Post = { title: string; date?: string; href: string };

type Props = {
  title?: string;
  items?: Post[];
  preview?: boolean;
};

const defaults: Post[] = [
  { title: "Launch update", date: "2025-09-01", href: "/news" },
  { title: "Quality milestone", date: "2025-08-15", href: "/news" },
];

export default function NewsList({ title = "News", items = defaults, preview }: Props) {
  return (
    <section data-block="NewsList" data-variant="list" className="mx-auto w-full max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-2xl font-semibold" style={{ fontFamily: "var(--font-sans)" }}>{title}</h2>
      <AppearStack preview={preview} className="space-y-4">
        {items.map((p, i) => (
          <AppLink key={i} href={p.href} className="block rounded-md border p-4 hover:bg-[color:oklch(0.97_0_0)]">
            <div className="font-medium">{p.title}</div>
            {p.date && <div className="text-sm text-[var(--secondary-foreground)]">{p.date}</div>}
          </AppLink>
        ))}
      </AppearStack>
    </section>
  );
}


