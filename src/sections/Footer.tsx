"use client";
import React, { useState } from "react";
import AppLink from "@/components/AppLink";
import LegalDisclaimerModal from "@/components/modals/LegalDisclaimerModal";

type Link = { label: string; href: string };

type Props = {
  copyright?: string;
  links?: Link[];
  disclaimer?: string;
};

const defaults: Link[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer({ 
  copyright = "© Apigen", 
  links = defaults,
  disclaimer = "Legal Disclaimer"
}: Props) {
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer data-block="Footer" data-variant="default" className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center">
        <div className="text-sm text-[var(--secondary-foreground)] md:flex-1 md:text-left text-center">
          {copyright}
        </div>
        {disclaimer && (
          <div className="flex justify-center md:flex-1 order-last md:order-none">
            <div className="relative group">
              <button
                type="button"
                onClick={() => setDisclaimerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-transparent px-4 py-1.5 text-xs uppercase tracking-wide text-[var(--muted-foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:border-[var(--accent)] focus-visible:text-[var(--accent)] focus:outline-none"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label="Open legal disclaimer"
              >
                <span className="font-semibold italic">{disclaimer}</span>
              </button>
              <span
                className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-64 -translate-x-1/2 -translate-y-1 rounded-md bg-[var(--popover)] px-3 py-2 text-[11px] font-medium italic leading-snug text-[var(--secondary-foreground)] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Click or tap to read the full legal disclaimer.
              </span>
            </div>
          </div>
        )}
        <nav className="flex gap-4 md:flex-1 md:justify-end justify-center">
          {links.map((l, i) => (
            <AppLink key={i} href={l.href} className="text-sm hover:underline">
              {l.label}
            </AppLink>
          ))}
        </nav>
      </div>
      {disclaimer && <LegalDisclaimerModal open={isDisclaimerOpen} onOpenChange={setDisclaimerOpen} />}
    </footer>
  );
}
