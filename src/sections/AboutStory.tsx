"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import AppearStack from "@/components/motion/AppearStack";
import HeroWordmarkAnimated from "@/sections/HeroWordmarkAnimated";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useInView } from "framer-motion";

type AboutStoryCard = {
  title: string;
  content: string;
};

type AboutStoryProps = {
  title?: string;
  cards?: AboutStoryCard[];
  preview?: boolean;
};

const DEFAULT_TITLE = "Our Story";
const DEFAULT_CARDS: AboutStoryCard[] = [
  {
    title: "Generations of Farming Heritage",
    content:
      "Our story begins generations ago, where our families cultivated their land with dedication, resilience, and an unwavering commitment to quality. For over a century, we've carried forward this deep-rooted agricultural heritage.",
  },
  {
    title: "Pioneering Cannabis Cultivation",
    content:
      "As the world of cannabis evolved, so did we. In the early '90s, long before legalization, our master grower refined the craft of cannabis cultivation in the grey market, honing techniques that would later define the premium cannabis industry.",
  },
  {
    title: "Decades of Experience & Innovation",
    content:
      "Decades of hands-on experience, trial, and innovation have given us an unmatched understanding of the plant—from legacy to legal. Today, we bring together the best of both worlds: the wisdom of traditional farming and the expertise of cannabis cultivation at the highest level.",
  },
  {
    title: "Setting New Standards",
    content:
      "With a team of industry veterans, we blend corporate precision with a deep passion for the plant, pushing the boundaries of quality and sustainability. From legacy growers to modern pioneers. Always staying true to our roots while shaping the future.",
  },
];

export default function AboutStory({ title = DEFAULT_TITLE, cards = DEFAULT_CARDS, preview }: AboutStoryProps) {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-10% 0px -10% 0px" });
  const [shouldAnimateWordmark, setShouldAnimateWordmark] = useState(false);

  useEffect(() => {
    if (cardsInView) {
      setShouldAnimateWordmark(true);
    }
  }, [cardsInView]);
  return (
    <section className="relative bg-[var(--bg)]">
      <div
        className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.25)_0%,_rgba(250,250,250,0)_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12 md:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            className="text-balance font-semibold tracking-tight text-[var(--fg,#131515)] text-[clamp(1.75rem,2.8vw,2.4rem)] lg:text-[clamp(2rem,2.4vw,2.6rem)] scroll-mt-[calc(76px+16px)] md:scroll-mt-[calc(92px+16px)] leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
            aria-label={title === DEFAULT_TITLE ? "The Apigen Story" : title}
          >
            {title === DEFAULT_TITLE ? (
              <>
                {"The "}
                <span className="inline-flex h-[1.04em] items-end leading-none align-baseline px-[0.18em] sm:px-[0.24em]">
                  {shouldAnimateWordmark ? (
                    <HeroWordmarkAnimated
                      key="animated"
                      src="/hero/herotext/APIGEN_hero_text_COPPER.svg"
                      alt="Apigen"
                      className="inline-block align-baseline h-full w-auto"
                      style={{
                        display: "inline-block",
                        verticalAlign: "baseline",
                        transform: "translateY(var(--wordmark-inline-offset))",
                        ["--wordmark-inline-offset" as const]: "clamp(-0.08em, -0.07em + 0.008vw, -0.04em)",
                      }}
                    />
                  ) : (
                    <img
                      src="/hero/herotext/APIGEN_hero_text_COPPER.svg"
                      alt=""
                      aria-hidden="true"
                      className="inline-block align-baseline h-full w-auto"
                      style={{
                        display: "inline-block",
                        verticalAlign: "baseline",
                        transform: "translateY(var(--wordmark-inline-offset))",
                        ["--wordmark-inline-offset" as const]: "clamp(-0.08em, -0.07em + 0.008vw, -0.04em)",
                      }}
                    />
                  )}
                  <VisuallyHidden>Apigen</VisuallyHidden>
                </span>
                {" Story"}
              </>
            ) : (
              title
            )}
          </h1>
        </div>
        <div ref={cardsRef}>
          <AppearStack
            preview={preview}
            className="mt-10 grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-2"
            gap={0.12}
          >
            {cards.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                description={card.content}
                radius="sm"
                padding="sm"
                gradientDirection="tl"
              />
            ))}
          </AppearStack>
        </div>
      </div>
    </section>
  );
}
