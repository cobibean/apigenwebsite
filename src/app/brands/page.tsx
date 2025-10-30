import type { Metadata } from "next";
import AppImage from "@/components/AppImage";
import Card from "@/components/Card";
import AppLink from "@/components/AppLink";
import { buttonClass } from "@/lib/utils";

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
    <div className="hero-bleed relative isolate min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* Viewport-fixed background washes to bleed under header and across sections */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-25%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--primary)_22%,transparent)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--accent)_18%,transparent)_0%,_transparent_75%)] blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-12%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--primary)_16%,transparent)_0%,_transparent_80%)] blur-3xl" />
      </div>
      {primaryBrand ? <BrandsHero brand={primaryBrand} /> : null}
      {[primaryBrand, ...otherBrands].filter(Boolean).map((brand) => (
        <BrandDetails key={brand!.id} brand={brand!} />
      ))}
    </div>
  );
}

function BrandsHero({ brand }: { brand: Brand }) {
  return (
    <section className="hero-bleed relative isolate overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-6 pb-10 sm:gap-12 sm:pb-12 lg:grid lg:min-h-[calc(100vh-140px)] lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] lg:items-center lg:gap-16 lg:pb-12">
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
          <div className="absolute inset-0 scale-110 rounded-[36px] bg-[linear-gradient(160deg,_color-mix(in_oklab,var(--accent)_25%,transparent)_0%,_transparent_60%)] blur-2xl" aria-hidden="true" />
          <div className="relative flex w-full max-w-[320px] flex-col items-center justify-center rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0px_24px_52px_color-mix(in_oklab,var(--fg)_12%,transparent)] backdrop-blur-xl sm:max-w-[380px] sm:p-10">
            <AppImage
              src={brand.logo}
              alt={`${brand.name} wordmark`}
              width={1024}
              height={1024}
              priority
              className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_color-mix(in_oklab,var(--fg)_18%,transparent)] sm:max-w-[260px]"
            />
            <div className="mt-8 h-px w-20 bg-[linear-gradient(to_right,_transparent,_color-mix(in_oklab,var(--accent)_60%,transparent),_transparent)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandDetails({ brand }: { brand: Brand }) {
  return (
    <section className="relative border-t border-[var(--muted)] bg-[var(--bg)]">
      <div className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--accent)_25%,transparent)_0%,_transparent_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:py-16 lg:grid lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:gap-12">
        {/* Three highlight cards on the left */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {brand.highlights.map((highlight) => (
            <Card
              key={highlight.title}
              title={highlight.title}
              description={highlight.description}
              radius="md"
              padding="md"
              gradientDirection="br"
            />
          ))}
        </div>

        {/* Data card on the right */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] px-7 pt-7 pb-6 shadow-[0px_24px_48px_color-mix(in_oklab,var(--fg)_8%,transparent)] sm:px-8 sm:pt-8 sm:pb-7">
            <h2 className="text-center text-sm uppercase tracking-[0.35em] text-[var(--secondary-foreground)]" style={{ fontFamily: "var(--font-mono)" }}>
              Brand at a glance
            </h2>
            <dl className="mt-6 space-y-5">
              {brand.attributes.map((attribute) => (
                <div key={attribute.label} className="flex flex-col gap-1 text-center">
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
          
          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <AppLink href="/contact" className={buttonClass({ variant: "olive", size: "lg" })}>
              Get in Touch
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
