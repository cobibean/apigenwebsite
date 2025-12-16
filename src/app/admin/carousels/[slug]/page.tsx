import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CarouselEditor from "./ui/CarouselEditor";

export default async function AdminCarouselPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
        Missing Supabase env vars.
      </div>
    );
  }

  const { data: carousel, error } = await supabase
    .from("carousels")
    .select("id,slug,label")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
        Failed to load carousel: {error.message}
      </div>
    );
  }

  if (!carousel) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-xs text-secondary font-mono">{carousel.slug}</div>
          <h1 className="mt-1 text-2xl font-semibold text-primary font-sans">{carousel.label}</h1>
          <p className="mt-2 text-sm text-secondary font-body">
            Alt text is not visible on the page, but improves accessibility and SEO. Describe what’s in the image (strain name + what’s shown) and keep it concise.
          </p>
        </div>
        <Link href="/admin" className="text-sm text-secondary hover:text-foreground">
          ← Back
        </Link>
      </div>

      <div className="mt-8">
        <CarouselEditor carouselId={carousel.id} carouselSlug={carousel.slug} />
      </div>
    </div>
  );
}
