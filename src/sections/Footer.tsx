"use client";
import React, { useState } from "react";
import AppLink from "@/components/AppLink";
import LegalDisclaimerModal from "@/components/modals/LegalDisclaimerModal";
import type { FooterContent } from "@/data/footer";

type Props = {
  content: FooterContent;
};

import { getCopyrightText } from "@/data/footer";

const SPACING = {
  section: "py-6",
  container: "px-4 sm:px-6 lg:px-8", // Horizontal edge padding
  maxWidth: "max-w-7xl", // Increased from 6xl (1152px) to 7xl (1280px) for more width
  mobileGap: "gap-6",
  mobileNavGap: "gap-4", // More breathing room on mobile
  desktopNavGap: "gap-0", // Tighter on desktop - relies on link padding
  linkPadding: "px-1.5 py-1", // Keeps links tappable/clickable
} as const;

export default function Footer({ content }: Props) {
  const { copyrightPrefix, disclaimer, navigationLinks } = content;
  const copyright = getCopyrightText(copyrightPrefix);
  const [isDisclaimerOpen, setDisclaimerOpen] = useState(false);

  return (
    <footer data-block="Footer" className="w-full bg-[#545943]">
      <div className={`mx-auto w-full ${SPACING.maxWidth} ${SPACING.container} ${SPACING.section}`}>
        {/* Mobile: Stacked layout */}
        <div className={`flex flex-col ${SPACING.mobileGap} md:hidden`}>
          <div className="text-sm text-white/80 text-center">
            {copyright}
          </div>
          {disclaimer && (
            <div className="flex justify-center">
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
          <nav className={`flex flex-wrap ${SPACING.mobileNavGap} justify-center`}>
            {navigationLinks.map((l, i) => (
              <AppLink 
                key={i} 
                href={l.href} 
                className={`text-white/80 text-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#545943] rounded ${SPACING.linkPadding}`}
              >
                {l.label}
              </AppLink>
            ))}
          </nav>
        </div>

        {/* Desktop: Grid layout with absolute-positioned center */}
        <div className="hidden md:block relative">
          <div className="flex items-center justify-between">
            {/* Left: Copyright */}
            <div className="text-sm text-white/80">
              {copyright}
            </div>

            {/* Right: Navigation Links - tighter spacing */}
            <nav className={`flex ${SPACING.desktopNavGap}`}>
              {navigationLinks.map((l, i) => (
                <AppLink 
                  key={i} 
                  href={l.href} 
                  className={`text-white/80 text-center transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#545943] rounded ${SPACING.linkPadding} text-sm`}
                >
                  {l.label}
                </AppLink>
              ))}
            </nav>
          </div>

          {/* Center: Legal Disclaimer - absolutely positioned for perfect centering */}
          {disclaimer && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
        </div>
      </div>
      {disclaimer && <LegalDisclaimerModal open={isDisclaimerOpen} onOpenChange={setDisclaimerOpen} />}
    </footer>
  );
}
