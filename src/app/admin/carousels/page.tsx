import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CarouselRow = { id: string; slug: string; label: string };

export default async function AdminCarouselsPage() {
  const supabase = await createSupabaseServerClient();
  
  if (!supabase) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold text-primary font-sans">Carousels</h1>
        <p className="mt-2 text-sm text-secondary font-body">
          Missing Supabase env vars.
        </p>
      </div>
    );
  }

  const { data: carousels, error } = await supabase
    .from("carousels")
    .select("id,slug,label")
    .order("label", { ascending: true });

  // Get item counts for each carousel
  const carouselIds = (carousels || []).map((c: CarouselRow) => c.id);
  const { data: itemCounts } = await supabase
    .from("carousel_items")
    .select("carousel_id")
    .in("carousel_id", carouselIds);

  const countByCarousel: Record<string, number> = {};
  for (const item of itemCounts || []) {
    countByCarousel[item.carousel_id] = (countByCarousel[item.carousel_id] || 0) + 1;
  }

  return (
    <div>
      {/* Header with back link */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin"
          className="text-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-primary font-sans">Carousels</h1>
          <p className="mt-1 text-sm text-secondary font-body">
            Manage images, alt text, and ordering for each carousel.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Failed to load carousels: {error.message}
        </div>
      ) : null}

      <div className="grid gap-3">
        {(carousels as CarouselRow[] | null)?.map((c) => (
          <Link
            key={c.id}
            href={`/admin/carousels/${encodeURIComponent(c.slug)}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 hover:bg-background transition-colors"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">{c.label || c.slug}</div>
              <div className="mt-1 text-xs text-secondary font-mono">{c.slug}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-secondary">
                {countByCarousel[c.id] || 0} image{(countByCarousel[c.id] || 0) !== 1 ? "s" : ""}
              </span>
              <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
        {!carousels?.length ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
            No carousels found. Run the seed script to populate carousels.
          </div>
        ) : null}
      </div>
    </div>
  );
}
