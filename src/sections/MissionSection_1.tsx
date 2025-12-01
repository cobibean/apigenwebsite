"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import { buttonClass } from "@/lib/utils";
import type { MissionContent, SectionStyling } from "@/data/home";

export type MissionSectionProps = {
  content: MissionContent & { styling?: SectionStyling };
  /** passed by renderer; disables motion in preview */
  preview?: boolean;
};

export default function MissionSection_1({
  content,
  preview,
}: MissionSectionProps) {
  const { eyebrow, taglinePrimary, taglineSecondary, lead, body, cta, styling } = content;
  // Force light-on-dark text to match reference regardless of global theme
  const textClass = "[color:var(--fg-on-olive)]";
  const subTextClass = "[color:color-mix(in_oklab,white_78%,transparent)]";
  const mutedHeadlineClass = "[color:var(--accent)]";

  return (
    <section
      data-block="Mission"
      data-variant="1"
      // Solid olive background; keep simple to sit above the hero video layer
      className={`w-full ${styling?.backgroundClass || ""}`}
      style={styling?.backgroundClass ? undefined : { background: "var(--surface-olive)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT: Eyebrow + Tagline */}
          <Appear preview={preview}>
            <div>
              <div className={`text-sm ${subTextClass}`} style={{ fontFamily: "var(--font-mono)" }}>
                {eyebrow}
              </div>
              <h2
                className={`mt-5 uppercase whitespace-normal md:whitespace-pre-line ${textClass}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 0.86,
                  fontSize: "clamp(26px, 4.8vw, 60px)",
                }}
              >
                {taglinePrimary}
              </h2>
              <div
                className={`uppercase mt-3 whitespace-normal md:whitespace-pre-line ${mutedHeadlineClass}`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  lineHeight: 0.86,
                  fontSize: "clamp(26px, 4.8vw, 60px)",
                }}
              >
                {taglineSecondary}
              </div>
            </div>
          </Appear>

          {/* RIGHT: Lead + Body + CTA */}
          <Appear preview={preview}>
            <div className="h-full flex flex-col md:mt-6">
              <AppearStack preview={preview} className="space-y-4">
                <p className={`text-base md:text-lg font-semibold ${textClass}`}>{lead}</p>
                <p className={`text-base md:text-lg leading-relaxed ${subTextClass}`}>{body}</p>
                <div className="pt-2 mt-auto">
                  <AppLink href={cta?.href || "/about"} className={buttonClass({ variant: "olive", size: "lg" })}>
                    {cta?.label || "About Apigen"}
                  </AppLink>
                </div>
              </AppearStack>
            </div>
          </Appear>
        </div>
      </div>
    </section>
  );
}
