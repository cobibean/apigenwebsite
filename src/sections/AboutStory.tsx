import Card from "@/components/Card";

interface AboutStoryCard {
  title: string;
  content: string;
}

interface AboutStoryProps {
  title: string;
  cards: AboutStoryCard[];
}

export default function AboutStory({ title, cards }: AboutStoryProps) {
  return (
    <section className="relative bg-[var(--bg)] py-8 sm:py-10 md:py-12">
      <div className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.25)_0%,_rgba(250,250,250,0)_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 lg:gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-semibold tracking-tight text-[var(--primary)] text-[clamp(1.75rem,2.8vw,2.4rem)] lg:text-[clamp(2rem,2.4vw,2.6rem)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {title}
          </h2>
        </div>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
          {cards.map((card, index) => (
            <Card
              key={index}
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
