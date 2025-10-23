interface AboutStoryCard {
  title: string;
  content: string;
}

interface AboutStoryProps {
  title: string;
  cards: AboutStoryCard[];
  transparent?: boolean;
}

export default function AboutStory({ title, cards, transparent = false }: AboutStoryProps) {
  return (
    <section className={`relative py-8 sm:py-10 md:py-12 ${transparent ? '' : 'bg-[var(--bg)]'}`}>
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
            <div
              key={index}
              className="group relative overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[0px_16px_32px_rgba(19,21,21,0.06)] transition duration-300 hover:border-[var(--accent)] hover:shadow-[0px_24px_48px_rgba(19,21,21,0.12)] sm:p-5"
            >
              <div className="absolute inset-0 bg-[linear-gradient(315deg,_rgba(174,85,33,0.12)_0%,_rgba(174,85,33,0)_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
              <div className="relative space-y-2">
                <h3 className="text-base font-semibold text-[var(--primary)] sm:text-lg" style={{ fontFamily: "var(--font-sans)" }}>
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--secondary)] sm:text-base" style={{ fontFamily: "var(--font-body)" }}>
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
