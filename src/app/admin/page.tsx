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
          Missing Supabase env vars. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        </p>
      </div>
    );
  }

  const { data: carousels, error } = await supabase
    .from("carousels")
    .select("id,slug,label")
    .order("label", { ascending: true });

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary font-sans">Carousels</h1>
          <p className="mt-2 text-sm text-secondary font-body">
            Manage images, alt text, and ordering for each carousel.
          </p>
        </div>
        <Link
          href="/admin/images/unused"
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-background"
        >
          Unused images
        </Link>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Failed to load carousels: {error.message}
        </div>
      ) : null}

      <div className="mt-6 grid gap-3">
        {(carousels as CarouselRow[] | null)?.map((c) => (
          <Link
            key={c.id}
            href={`/admin/carousels/${encodeURIComponent(c.slug)}`}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 hover:bg-background"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">{c.label}</div>
              <div className="mt-1 text-xs text-secondary font-mono">{c.slug}</div>
            </div>
            <div className="text-xs text-secondary">Manage</div>
          </Link>
        ))}
        {!carousels?.length ? (
          <div className="rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
            No carousels found. Seed the `carousels` table in Supabase.
          </div>
        ) : null}
      </div>
    </div>
  );
}
