import Card from "@/components/Card";

type AboutStoryCard = {
  title: string;
  content: string;
};

type AboutStoryProps = {
  title?: string;
  cards?: AboutStoryCard[];
};

const DEFAULT_TITLE = "Our Story";
const DEFAULT_CARDS: AboutStoryCard[] = [
  {
    title: "Generations of Farming Heritage",
    content:
      "Our story begins generations ago, in the lush farmlands of India, where our families cultivated the land with dedication, resilience, and an unwavering commitment to quality. For over a century, we've carried forward this deep-rooted agricultural heritage.",
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
      "With a team of industry veterans, we blend corporate precision with a deep passion for the plant, pushing the boundaries of quality, innovation, and sustainability. From legacy growers to modern pioneers, we are here to set new standards in cannabis, always staying true to our roots while shaping the future.",
  },
];

export default function AboutStory({ title = DEFAULT_TITLE, cards = DEFAULT_CARDS }: AboutStoryProps) {
  return (
    <section className="relative bg-[var(--bg)]">
      <div
        className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.25)_0%,_rgba(250,250,250,0)_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="text-balance font-semibold tracking-tight text-[var(--primary)] text-[clamp(1.75rem,2.8vw,2.4rem)] lg:text-[clamp(2rem,2.4vw,2.6rem)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:gap-12 md:grid-cols-2">
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
        </div>
      </div>
    </section>
  );
}
