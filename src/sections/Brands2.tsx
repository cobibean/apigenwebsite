"use client";
import AppImage from "@/components/AppImage";
import Card from "@/components/Card";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import { buttonClass } from "@/lib/utils";
import type { Brand } from "@/data/brands";

type Props = {
  brands: Brand[];
  preview?: boolean;
};

export default function Brands2({ brands, preview }: Props) {
  if (!brands || brands.length === 0) return null;
  const [primaryBrand, ...otherBrands] = brands;

  return (
    <section className="hero-bleed relative isolate overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* Background washes to mirror /brands styling */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-[-25%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--primary)_22%,transparent)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--accent)_18%,transparent)_0%,_transparent_75%)] blur-3xl" />
        <div className="absolute right-[-15%] bottom-[-12%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--primary)_16%,transparent)_0%,_transparent_80%)] blur-3xl" />
      </div>

      <BrandsHero brand={primaryBrand} preview={preview} />
      {[primaryBrand, ...otherBrands]
        .filter(Boolean)
        .map((brand, i) => (
          <BrandDetails key={brand!.id} brand={brand!} withTopBorder={i > 0} preview={preview} />
        ))}
    </section>
  );
}

function BrandsHero({ brand, preview }: { brand: Brand; preview?: boolean }) {
  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-6 pt-8 pb-10 sm:gap-12 sm:pt-10 sm:pb-12 lg:grid lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] lg:items-center lg:gap-16 lg:pt-12 lg:pb-12">
      <div className="space-y-6 sm:space-y-8">
        <span className="sr-only">{brand.name}</span>
        <Appear preview={preview}>
          <h2
            className="max-w-[18ch] text-balance font-semibold tracking-tight text-[var(--primary)] text-[clamp(2.0rem,3.2vw,3.0rem)] lg:text-[clamp(2.2rem,3.0vw,3.2rem)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {brand.heading}
          </h2>
        </Appear>
        <Appear preview={preview} delay={0.1}>
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
        </Appear>
      </div>
      <Appear preview={preview} delay={0.15} className="relative mt-6 flex items-center justify-center lg:mt-0">
        <div className="absolute inset-0 scale-110 rounded-[36px] bg-[linear-gradient(160deg,_color-mix(in_oklab,var(--accent)_25%,transparent)_0%,_transparent_60%)] blur-2xl" aria-hidden="true" />
        <div className="relative flex w-full max-w-[320px] flex-col items-center justify-center rounded-[32px] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0px_24px_52px_color-mix(in_oklab,var(--fg)_12%,transparent)] backdrop-blur-xl sm:max-w-[380px] sm:p-10">
          <AppImage
            src={brand.logo}
            alt={`${brand.name} wordmark`}
            width={1024}
            height={1024}
            className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_color-mix(in_oklab,var(--fg)_18%,transparent)] sm:max-w-[260px]"
          />
          <div className="mt-8 h-px w-20 bg-[linear-gradient(to_right,_transparent,_color-mix(in_oklab,var(--accent)_60%,transparent),_transparent)]" aria-hidden="true" />
        </div>
      </Appear>
    </div>
  );
}

function BrandDetails({ brand, withTopBorder = true, preview }: { brand: Brand; withTopBorder?: boolean; preview?: boolean }) {
  return (
    <div className={`relative ${withTopBorder ? "border-t" : ""} border-[var(--muted)] bg-[var(--bg)]`}>
      <div
        className="pointer-events-none absolute left-[5%] top-[12%] h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_color-mix(in_oklab,var(--accent)_25%,transparent)_0%,_transparent_70%)] blur-2xl md:left-[8%]"
        aria-hidden="true"
      />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 sm:py-16 lg:grid lg:grid-cols-[minmax(0,_1.2fr)_minmax(0,_1fr)] lg:gap-12">
        <AppearStack preview={preview} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
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
        </AppearStack>

        <div className="flex flex-col gap-6">
          <Appear preview={preview}>
            <div className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] px-7 pt-7 pb-6 shadow-[0px_24px_48px_color-mix(in_oklab,var(--fg)_8%,transparent)] sm:px-8 sm:pt-8 sm:pb-7">
              <h3
                className="text-center text-sm uppercase tracking-[0.35em] text-[var(--secondary-foreground)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Brand at a glance
              </h3>
              <dl className="mt-6 space-y-5">
                {brand.attributes.map((attribute) => (
                  <div key={attribute.label} className="flex flex-col gap-1 text-center">
                    <dt
                      className="text-xs uppercase tracking-[0.3em] text-[var(--secondary)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {attribute.label}
                    </dt>
                    <dd className="text-lg font-medium text-[var(--primary)]" style={{ fontFamily: "var(--font-sans)" }}>
                      {attribute.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Appear>

          <Appear preview={preview} delay={0.1}>
            <div className="flex justify-center mt-12">
              <AppLink href="/contact" className={buttonClass({ variant: "olive", size: "lg" })}>
                Get in Touch
              </AppLink>
            </div>
          </Appear>
        </div>
      </div>
    </div>
  );
}
