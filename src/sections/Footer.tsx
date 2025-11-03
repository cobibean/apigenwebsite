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

const getCurrentYear = () => new Date().getFullYear();

export default function Footer({ 
  copyright = `© Apigen ${getCurrentYear()}`, 
  links = defaults,
  disclaimer = "Legal Disclaimer",
}: Props) {
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer data-block="Footer" className="w-full bg-[#545943]">
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:items-center md:justify-between">
        {/* Left Column: Copyright */}
        <div className="text-sm text-white/80 text-center md:text-left flex-1">
          {copyright}
        </div>

        {/* Center Column: Legal Disclaimer */}
        {disclaimer && (
          <div className="flex justify-center flex-1">
            <div className="relative group">
              <button
                type="button"
                onClick={() => setDisclaimerOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1.5 text-xs uppercase tracking-wide transition-colors focus:outline-none text-white/70 hover:border-white hover:text-white focus-visible:border-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#545943]"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label="Open legal disclaimer"
              >
                <span className="font-semibold italic">{disclaimer}</span>
              </button>
              <span
                className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-64 -translate-x-1/2 -translate-y-1 rounded-md px-3 py-2 text-[11px] font-medium italic leading-snug opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 text-white/90 bg-[#1a1a1a]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Click or tap to read the full legal disclaimer.
              </span>
            </div>
          </div>
        )}

        {/* Right Column: Navigation Links */}
        <nav className="flex gap-4 md:flex-1 md:justify-end justify-center">
          {links.map((l, i) => (
            <AppLink 
              key={i} 
              href={l.href} 
              className="text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#545943] rounded px-2 py-1"
            >
              {l.label}
            </AppLink>
          ))}
        </nav>
      </div>
      </div>
      {disclaimer && <LegalDisclaimerModal open={isDisclaimerOpen} onOpenChange={setDisclaimerOpen} />}
    </footer>
  );
}
