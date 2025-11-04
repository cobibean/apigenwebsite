"use client";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import AppearStack from "@/components/motion/AppearStack";
import HeroWordmarkAnimated from "@/sections/HeroWordmarkAnimated";
import { Root as VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useInView } from "framer-motion";

import type { AboutContent } from "@/data/about";

type AboutStoryProps = {
  content: AboutContent;
  preview?: boolean;
};

export default function AboutStory({ content, preview }: AboutStoryProps) {
  const { title, cards } = content;
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
            aria-label={title === "Our Story" ? "The Apigen Story" : title}
          >
            {title === "Our Story" ? (
              <>
                {"The "}
                <span className="inline-flex h-[1.02em] items-end leading-none align-baseline px-[0.18em] sm:px-[0.24em]">
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
                        "--wordmark-inline-offset": "clamp(-0.06em, -0.055em + 0.006vw, -0.03em)",
                      } as React.CSSProperties}
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
                        "--wordmark-inline-offset": "clamp(-0.06em, -0.055em + 0.006vw, -0.03em)",
                      } as React.CSSProperties}
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
