"use client";
import React from "react";
import AppLink from "@/components/AppLink";

type Link = { label: string; href: string };

type Props = {
  copyright?: string;
  links?: Link[];
};

const defaults: Link[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ copyright = "© Apigen", links = defaults }: Props) {
  return (
    <footer data-block="Footer" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-[var(--secondary-foreground)]">{copyright}</div>
        <nav className="flex gap-4">
          {links.map((l, i) => (
            <AppLink key={i} href={l.href} className="text-sm hover:underline">
              {l.label}
            </AppLink>
          ))}
        </nav>
      </div>
    </footer>
  );
}


