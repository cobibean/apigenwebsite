import { createSupabasePublicClient } from "@/lib/supabase/public";

export type ContentBlock = {
  id: string;
  slug: string;
  content: string;
  content_type: "text" | "markdown" | "rich";
  updated_at: string;
};

/**
 * Fetch a single content block by slug with fallback
 */
export async function getContent(slug: string, fallback: string): Promise<string> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("content_blocks")
    .select("content")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data?.content) return fallback;
  return data.content;
}

/**
 * Fetch multiple content blocks by slugs with fallbacks
 * More efficient than multiple getContent calls
 */
export async function getContentBatch(
  requests: { slug: string; fallback: string }[]
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  
  // Initialize with fallbacks
  for (const { slug, fallback } of requests) {
    result[slug] = fallback;
  }

  const supabase = createSupabasePublicClient();
  if (!supabase) return result;

  const slugs = requests.map((r) => r.slug);
  const { data, error } = await supabase
    .from("content_blocks")
    .select("slug, content")
    .in("slug", slugs);

  if (error || !data) return result;

  // Override with DB values
  for (const row of data) {
    if (row.content) {
      result[row.slug] = row.content;
    }
  }

  return result;
}

/**
 * Get all content blocks (for admin)
 */
export async function getAllContentBlocks(): Promise<ContentBlock[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("content_blocks")
    .select("*")
    .order("slug");

  if (error || !data) return [];
  return data as ContentBlock[];
}
