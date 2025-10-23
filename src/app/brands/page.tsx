import type { Metadata } from "next";
import AppImage from "@/components/AppImage";

type Brand = {
  id: string;
  name: string;
  logo: string;
  heading: string;
  body: string[];
  attributes: Array<{ label: string; value: string }>;
  highlights: Array<{ title: string; description: string }>;
};

const brands: Brand[] = [
  {
    id: "cannada-craft",
    name: "Cannada Craft",
    logo: "/brands/Cannada%20Craft%20No%20BG.png",
    heading: "Proud to be Craft. Proud to be Canadian.",
    body: [
      "Our flagship dried flower brand, Cannada Craft, represents the heart of premium Canadian cannabis.",
      "Focused exclusively on the export of dried flower, we bring the best of BC craft cultivation to the global stage.",
      "Every jar of Cannada Craft reflects our dedication to quality, consistency, and the spirit of Canadian craftsmanship.",
    ],
    attributes: [
      { label: "Category", value: "Premium dried flower" },
      { label: "Origin", value: "British Columbia, Canada" },
      { label: "Market focus", value: "Global export partners" },
    ],
    highlights: [
      {
        title: "Export-first focus",
        description: "Purpose-built for dried flower export, aligning quality with the expectations of discerning markets.",
      },
      {
        title: "BC craft heritage",
        description: "Showcases the best of British Columbia’s craft cultivation, reinforcing a meticulous, small-batch ethos.",
      },
      {
        title: "Consistency in every jar",
        description: "Each release reflects an unwavering commitment to quality, consistency, and Canadian craftsmanship.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Brands | Apigen",
  description:
    "Discover Cannada Craft, Apigen’s flagship dried flower brand crafted in British Columbia for global export partners.",
};

export default function BrandsPage() {
  const [primaryBrand, ...otherBrands] = brands;

  return (
    <div className="relative isolate overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {primaryBrand ? <BrandsHero brand={primaryBrand} /> : null}
      {[primaryBrand, ...otherBrands].filter(Boolean).map((brand) => (
        <BrandDetails key={brand!.id} brand={brand!} />
      ))}
    </div>
  );
}

function BrandsHero({ brand }: { brand: Brand }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-[-25%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.2)_0%,_rgba(250,250,250,0)_70%)] blur-3xl md:top-[-35%] md:h-[680px] md:w-[680px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute right-[-12%] top-[45%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(31,39,38,0.18)_0%,_rgba(250,250,250,0)_75%)] blur-3xl md:right-[-6%]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-6 pb-14 sm:gap-12 sm:pb-16 lg:grid lg:min-h-[calc(100vh-140px)] lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] lg:items-center lg:gap-16 lg:pb-16">
        <div className="space-y-6 sm:space-y-8">
          <span className="sr-only">{brand.name}</span>
          <h1
            className="max-w-[18ch] text-balance font-semibold tracking-tight text-[var(--primary)] text-[clamp(2.35rem,3.6vw,3.3rem)] lg:text-[clamp(2.6rem,3.3vw,3.6rem)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {brand.heading}
          </h1>
          <div
            className="max-w-[620px] space-y-3 text-[clamp(1.08rem,1.35vw,1.25rem)] leading-[1.55] text-[var(--primary)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {brand.body.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="relative mt-6 flex items-center justify-center lg:mt-0">
          <div className="absolute inset-0 scale-110 rounded-[36px] bg-[linear-gradient(160deg,_rgba(174,85,33,0.25)_0%,_rgba(174,85,33,0)_60%)] blur-2xl" aria-hidden="true" />
          <div className="relative flex w-full max-w-[320px] flex-col items-center justify-center rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0px_24px_52px_rgba(19,21,21,0.12)] backdrop-blur-xl sm:max-w-[380px] sm:p-10">
            <AppImage
              src={brand.logo}
              alt={`${brand.name} wordmark`}
              width={1024}
              height={1024}
              priority
              className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_rgba(19,21,21,0.18)] sm:max-w-[260px]"
            />
            <div className="mt-8 h-px w-20 bg-[linear-gradient(to_right,_rgba(174,85,33,0),_rgba(174,85,33,0.6),_rgba(174,85,33,0))]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandDetails({ brand }: { brand: Brand }) {
  return (
    <section className="relative border-t border-[var(--muted)] bg-[var(--bg)]">
      <div className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(174,85,33,0.25)_0%,_rgba(250,250,250,0)_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-20 sm:py-24 lg:grid lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:gap-16">
        <article className="relative overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0px_30px_60px_rgba(19,21,21,0.08)] sm:p-10">
          <div className="absolute inset-x-10 top-10 h-px bg-[linear-gradient(to_right,_rgba(174,85,33,0),_rgba(174,85,33,0.45),_rgba(174,85,33,0))]" aria-hidden="true" />
          <div className="relative space-y-6 text-lg leading-relaxed text-[var(--primary)] sm:text-xl">
            {brand.body.map((paragraph, index) => (
              <p key={index} style={{ fontFamily: "var(--font-body)" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>
        <aside className="flex flex-col gap-10">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0px_24px_48px_rgba(19,21,21,0.08)] sm:p-8">
            <h2 className="text-sm uppercase tracking-[0.35em] text-[var(--secondary-foreground)]" style={{ fontFamily: "var(--font-mono)" }}>
              Brand at a glance
            </h2>
            <dl className="mt-6 space-y-5">
              {brand.attributes.map((attribute) => (
                <div key={attribute.label} className="flex flex-col gap-1">
                  <dt className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
                    {attribute.label}
                  </dt>
                  <dd className="text-lg font-medium text-[var(--primary)]" style={{ fontFamily: "var(--font-sans)" }}>
                    {attribute.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brand.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="group relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0px_20px_40px_rgba(19,21,21,0.06)] transition duration-300 hover:border-[var(--accent)] hover:shadow-[0px_28px_56px_rgba(19,21,21,0.12)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(174,85,33,0.12)_0%,_rgba(174,85,33,0)_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                <div className="relative space-y-3">
                  <h3 className="text-base font-semibold text-[var(--primary)]" style={{ fontFamily: "var(--font-sans)" }}>
                    {highlight.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--secondary)]" style={{ fontFamily: "var(--font-body)" }}>
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
