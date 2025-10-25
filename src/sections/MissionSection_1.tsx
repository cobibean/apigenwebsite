"use client";
import React from "react";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import { buttonClass } from "@/lib/utils";

export type MissionSectionProps = {
  eyebrow?: string;
  /** Left-side tagline top block (light color). Use \n to create line breaks. */
  taglinePrimary?: string;
  /** Left-side tagline bottom block (muted second color). Use \n to create line breaks. */
  taglineSecondary?: string;
  /** Right-side bold lead copy (1–2 sentences). */
  lead?: string;
  /** Right-side supporting paragraph. */
  body?: string;
  cta?: { label: string; href: string };
  /** passed by renderer; disables motion in preview */
  preview?: boolean;
};

export default function MissionSection_1({
  eyebrow = "Our Mission",
  taglinePrimary = "TO SET A NEW INDUSTRY\nSTANDARD WITH",
  taglineSecondary = "PREMIUM MEDICINAL\nCANNABIS FLOWER",
  lead = "We're not just providing exceptional medication. We're pioneers of quality, transparency, and patient‑centric treatments.",
  body = "Uncompromising pharmaceutical‑grade quality is not just a goal for us — it's embedded in our DNA and the standards we set for ourselves and for the industry. Our commitment goes beyond profits — we’re for doing what’s right by the plant, our patients, and the planet.",
  cta = { label: "About Apigen", href: "/about" },
  preview,
}: MissionSectionProps) {
  // Force light-on-dark text to match reference regardless of global theme
  const textClass = "[color:var(--fg-on-olive)]";
  const subTextClass = "[color:color-mix(in_oklab,white_78%,transparent)]";
  const mutedHeadlineClass = "[color:var(--accent)]";

  return (
    <section
      data-block="Mission"
      data-variant="1"
      // Solid olive background; keep simple to sit above the hero video layer
      className="w-full"
      style={{ background: "var(--surface-olive)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
        {/* LEFT: Eyebrow + Tagline */}
        <Appear preview={preview}>
          <div>
            <div className={`text-sm ${subTextClass}`} style={{ fontFamily: "var(--font-mono)" }}>
              {eyebrow}
            </div>
            <h2
              className={`mt-5 uppercase ${textClass}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                lineHeight: 0.86,
                fontSize: "clamp(26px, 4.8vw, 60px)",
                whiteSpace: "pre-line",
              }}
            >
              {taglinePrimary}
            </h2>
            <div
              className={`uppercase mt-3 ${mutedHeadlineClass}`}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                lineHeight: 0.86,
                fontSize: "clamp(26px, 4.8vw, 60px)",
                whiteSpace: "pre-line",
              }}
            >
              {taglineSecondary}
            </div>
          </div>
        </Appear>

        {/* RIGHT: Lead + Body + CTA */}
        <Appear preview={preview}>
          <div className="h-full flex flex-col md:mt-14">
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
    </section>
  );
}

