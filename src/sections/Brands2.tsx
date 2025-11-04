"use client";
import AppImage from "@/components/AppImage";
import Card from "@/components/Card";
import AppLink from "@/components/AppLink";
import Appear from "@/components/motion/Appear";
import AppearStack from "@/components/motion/AppearStack";
import { buttonClass } from "@/lib/utils";
import type { Brand } from "@/data/brands";

/*
 * ARCHIVED: Original Canada Craft Card Implementation (Pre-Video)
 *
 * This was the original implementation before adding CCFOREST1.mp4 video.
 * Canada Craft card displayed the brand logo with drop shadow effect.
 *
 * Original code (from git commit before video implementation):
 * ```tsx
 * ) : (
 *   <AppImage
 *     src={brand.logo}
 *     alt={`${brand.name} wordmark`}
 *     width={1024}
 *     height={1024}
 *     className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_color-mix(in_oklab,var(--fg)_18%,transparent)] sm:max-w-[260px]"
 *   />
 * )}
 * ```
 *
 * To revert: Replace the video implementation with the above AppImage component.
 */

type Props = {
  brands: Brand[];
  preview?: boolean;
};

export default function Brands2({ brands, preview }: Props) {
  if (!brands || brands.length === 0) return null;
  const [primaryBrand, ...otherBrands] = brands;

  return (
    <section className="hero-bleed relative isolate overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* Advanced olive gradient background system */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* PRO LEVEL THEME COLORS GRADIENTS */}
        <div className="absolute left-[-28%] top-[-22%] h-[640px] w-[640px] rounded-full bg-gradient-conic from-[var(--surface-olive)]/15 via-[var(--accent)]/10 to-[var(--btn-olive)]/12 blur-3xl" />

        <div className="absolute left-[20%] top-[-8%] h-[580px] w-[580px] rounded-full bg-gradient-radial from-[var(--accent)]/18 via-[var(--surface-olive)]/12 to-transparent blur-2xl" />

        <div className="absolute right-[-18%] top-[15%] h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[var(--btn-olive)]/14 to-[var(--accent)]/10 blur-3xl" />

        <div className="absolute bottom-[-10%] left-[40%] h-[420px] w-[420px] rounded-full bg-gradient-to-t from-[var(--surface-olive)]/16 to-transparent blur-2xl" />
      </div>

      <BrandsHero brand={primaryBrand} preview={preview} />
      {otherBrands
        .filter(Boolean)
        .map((brand, i) => (
          <BrandDetails key={brand!.id} brand={brand!} withTopBorder={true} preview={preview} />
        ))}
    </section>
  );
}

function BrandsHero({ brand, preview }: { brand: Brand; preview?: boolean }) {
  return (
    <div className="relative">
      {/* Hero section with heading, description, and logo */}
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
          {/* PRO LEVEL THEME COLORS GLOW */}
          <div className="absolute inset-0 scale-110 rounded-[36px] bg-gradient-to-br from-[var(--surface-olive)]/12 via-[var(--accent)]/8 to-[var(--btn-olive)]/10 blur-2xl" aria-hidden="true" />
          <div className="absolute inset-0 scale-125 rounded-[40px] bg-gradient-radial from-[var(--accent)]/6 to-transparent blur-xl" aria-hidden="true" />
          <div className={`relative flex w-full max-w-[320px] aspect-square flex-col items-center justify-center rounded-[32px] border p-8 shadow-[0px_24px_52px_color-mix(in_oklab,var(--fg)_12%,transparent)] backdrop-blur-xl sm:max-w-[380px] sm:p-10 ${brand.id === 'mission' ? 'bg-[#0d0c0c] border-[#0d0c0c]' : 'border-[var(--border)] bg-[var(--card)]'}`}>
            {brand.id === 'mission' ? (
              <>
                <AppImage
                  src="/brands/mission_black_bg.jpeg"
                  alt={`${brand.name} wordmark`}
                  width={1024}
                  height={1024}
                  className="w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <AppImage
                  src="/brands/mission_no_bg.jpeg"
                  alt={`${brand.name} wordmark`}
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </>
            ) : (
              <div className="pt-8">
                <AppImage
                  src={brand.logo}
                  alt={`${brand.name} wordmark`}
                  width={1024}
                  height={1024}
                  className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_color-mix(in_oklab,var(--fg)_18%,transparent)] sm:max-w-[260px]"
                />
              </div>
            )}
            {brand.id !== 'mission' && (
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[var(--surface-olive)]/25 via-[var(--accent)]/18 via-[var(--btn-olive)]/25 to-transparent" aria-hidden="true" />
            )}
            {brand.id === 'mission' && (
              <div className="mt-8 h-px w-20 opacity-0" aria-hidden="true" />
            )}
          </div>
        </Appear>
      </div>

      {/* Details section with highlights and attributes */}
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
              gradientDirection="olive-br"
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

function BrandDetails({ brand, withTopBorder = true, preview }: { brand: Brand; withTopBorder?: boolean; preview?: boolean }) {
  return (
    <div className={`relative ${withTopBorder ? "border-t" : ""} border-[var(--muted)] bg-[var(--bg)]`}>
      {/* Hero section with heading, description, and logo */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-6 pt-14 pb-10 sm:gap-12 sm:pt-16 sm:pb-12 lg:grid lg:grid-cols-[minmax(0,_1.15fr)_minmax(0,_0.85fr)] lg:items-center lg:gap-16 lg:pt-16 lg:pb-12">
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
          {/* PRO LEVEL THEME COLORS GLOW for BrandDetails */}
          <div className="absolute inset-0 scale-110 rounded-[36px] bg-gradient-to-br from-[var(--surface-olive)]/12 via-[var(--accent)]/8 to-[var(--btn-olive)]/10 blur-2xl" aria-hidden="true" />
          <div className="absolute inset-0 scale-125 rounded-[40px] bg-gradient-radial from-[var(--accent)]/6 to-transparent blur-xl" aria-hidden="true" />
          <div className={`relative flex w-full max-w-[320px] aspect-square flex-col items-center justify-center rounded-[32px] border p-8 shadow-[0px_24px_52px_color-mix(in_oklab,var(--fg)_12%,transparent)] backdrop-blur-xl sm:max-w-[380px] sm:p-10 transition-colors duration-300 ${brand.id === 'mission' ? 'bg-[#0d0c0c] border-[#0d0c0c] hover:bg-white group' : 'border-[var(--border)] bg-[var(--card)]'}`}>
            {brand.id === 'mission' ? (
              <video
                className="w-full h-full object-cover rounded-[24px] absolute inset-0"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/hero/videos/forestloop1.mp4" type="video/mp4" />
                <AppImage
                  src="/brands/mission_black_bg.jpeg"
                  alt={`${brand.name} wordmark`}
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover rounded-[24px]"
                />
              </video>
            ) : (
              <AppImage
                src={brand.logo}
                alt={`${brand.name} wordmark`}
                width={1024}
                height={1024}
                className="w-full max-w-[200px] object-contain drop-shadow-[0_20px_45px_color-mix(in_oklab,var(--fg)_18%,transparent)] sm:max-w-[260px]"
              />
            )}
            {brand.id !== 'mission' && (
              <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[var(--surface-olive)]/25 via-[var(--accent)]/18 via-[var(--btn-olive)]/25 to-transparent" aria-hidden="true" />
            )}
            {brand.id === 'mission' && (
              <div className="mt-8 h-px w-20 opacity-0" aria-hidden="true" />
            )}
          </div>
        </Appear>
      </div>

      {/* Details section with highlights and attributes */}
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
              gradientDirection="olive-br"
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
