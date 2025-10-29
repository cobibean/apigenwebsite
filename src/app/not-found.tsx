import AppLink from "@/components/AppLink";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] bg-[var(--bg)] text-[var(--fg)]">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--secondary-foreground)]" style={{ fontFamily: "var(--font-mono)" }}>
            404
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl" style={{ fontFamily: "var(--font-sans)" }}>
            We couldn’t find that page.
          </h1>
          <p className="text-base md:text-lg text-[var(--secondary-foreground)]">
            The link may be outdated or the page moved. Explore our work or head back home.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <AppLink href="/" className="inline-flex items-center justify-center rounded-full border border-[var(--accent)] px-6 py-3 font-medium transition hover:bg-[var(--accent)] hover:text-[var(--fg-on-olive)]">
              Return Home
            </AppLink>
            <AppLink href="/brands" className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 font-medium transition hover:-translate-y-0.5">
              View Brands
            </AppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
