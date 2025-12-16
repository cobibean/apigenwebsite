import type { GalleryImage } from "@/data/gallery";
import { createSupabasePublicClient } from "@/lib/supabase/public";

type CarouselImage = { src: string; alt: string; priority?: boolean };

function encodeObjectPath(objectPath: string) {
  return objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildPublicUrl(supabaseUrl: string, bucket: string, path: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${encodeObjectPath(path)}`;
}

type CarouselItemJoinRow = {
  sort_order: number;
  image: { bucket: string; path: string; alt_text: string } | null;
};

export async function getCarouselImagesBySlug(slug: string): Promise<CarouselImage[] | null> {
  const supabase = createSupabasePublicClient();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabase || !supabaseUrl) return null;

  const { data: carousel, error: carouselError } = await supabase
    .from("carousels")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (carouselError || !carousel) return null;

  const { data: items, error: itemsError } = await supabase
    .from("carousel_items")
    .select(
      `
      sort_order,
      image:images (
        bucket,
        path,
        alt_text
      )
    `
    )
    .eq("carousel_id", carousel.id)
    .order("sort_order", { ascending: true });

  if (itemsError) return null;

  const mapped = ((items || []) as unknown as CarouselItemJoinRow[])
    .map((it) => {
      const img = it.image;
      if (!img?.bucket || !img?.path || !img?.alt_text) return null;
      return { src: buildPublicUrl(supabaseUrl, img.bucket, img.path), alt: img.alt_text } satisfies CarouselImage;
    })
    .filter((x): x is CarouselImage => !!x);

  return mapped;
}

export async function getCarouselImagesBySlugWithFallback(
  slug: string,
  fallback: GalleryImage[]
): Promise<GalleryImage[]> {
  const dbImages = await getCarouselImagesBySlug(slug);
  if (!dbImages || dbImages.length === 0) return fallback;
  return dbImages;
}
