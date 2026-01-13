import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CarouselRow = { id: string; slug: string; label: string };

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  
  if (!supabase) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold text-primary font-sans">Admin</h1>
        <p className="mt-2 text-sm text-secondary font-body">
          Missing Supabase env vars.
        </p>
      </div>
    );
  }

  // Fetch counts for overview
  const [carouselsRes, contentRes] = await Promise.all([
    supabase.from("carousels").select("id,slug,label").order("label"),
    supabase.from("content_blocks").select("slug", { count: "exact", head: true }),
  ]);

  const carousels = (carouselsRes.data as CarouselRow[]) || [];
  const contentCount = contentRes.count ?? 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-primary font-sans">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-secondary font-body">
          Manage your site&apos;s carousels, content, and images.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-semibold text-foreground">{carousels.length}</div>
          <div className="text-xs text-secondary mt-1">Carousels</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-2xl font-semibold text-foreground">{contentCount}</div>
          <div className="text-xs text-secondary mt-1">Content Blocks</div>
        </div>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Carousels */}
        <Link
          href="/admin/carousels"
          className="group rounded-2xl border border-border bg-card p-6 hover:bg-background transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground font-sans">Carousels</h2>
              <p className="mt-1 text-sm text-secondary font-body">
                Manage images, alt text, and ordering for each carousel.
              </p>
            </div>
            <svg className="w-5 h-5 text-secondary group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="mt-4 text-xs text-secondary">
            {carousels.length} carousel{carousels.length !== 1 ? "s" : ""}
          </div>
        </Link>

        {/* Content */}
        <Link
          href="/admin/content"
          className="group rounded-2xl border border-border bg-card p-6 hover:bg-background transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground font-sans">Content</h2>
              <p className="mt-1 text-sm text-secondary font-body">
                Edit text and copy across the site.
              </p>
            </div>
            <svg className="w-5 h-5 text-secondary group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="mt-4 text-xs text-secondary">
            {contentCount} content block{contentCount !== 1 ? "s" : ""}
          </div>
        </Link>
      </div>

      {/* Quick Access: Carousel List */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-secondary mb-3">Quick Access: Carousels</h3>
        <div className="grid gap-2">
          {carousels.slice(0, 6).map((c) => (
            <Link
              key={c.id}
              href={`/admin/carousels/${encodeURIComponent(c.slug)}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 hover:bg-background text-sm"
            >
              <span className="text-foreground">{c.label || c.slug}</span>
              <span className="text-xs text-secondary font-mono">{c.slug}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
