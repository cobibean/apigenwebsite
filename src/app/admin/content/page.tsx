import { createSupabaseServerClient } from "@/lib/supabase/server";
import ContentEditor from "./ui/ContentEditor";

type ContentBlockRow = {
  id: string;
  slug: string;
  content: string;
  content_type: string;
  updated_at: string;
};

// Group slugs by page/section for organization
function groupByPage(blocks: ContentBlockRow[]) {
  const groups: Record<string, ContentBlockRow[]> = {};
  
  for (const block of blocks) {
    const page = block.slug.split(".")[0] || "other";
    if (!groups[page]) groups[page] = [];
    groups[page].push(block);
  }
  
  return groups;
}

export default async function AdminContentPage() {
  const supabase = await createSupabaseServerClient();
  
  if (!supabase) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold text-primary font-sans">Content</h1>
        <p className="mt-2 text-sm text-secondary font-body">
          Missing Supabase env vars.
        </p>
      </div>
    );
  }

  const { data: blocks, error } = await supabase
    .from("content_blocks")
    .select("*")
    .order("slug");

  const grouped = groupByPage((blocks as ContentBlockRow[]) || []);
  const pageNames = Object.keys(grouped).sort();

  return (
    <div>
      {/* Header with back link */}
      <div className="flex items-center gap-4 mb-6">
        <a
          href="/admin"
          className="text-secondary hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
        <div>
          <h1 className="text-2xl font-semibold text-primary font-sans">Content</h1>
          <p className="mt-1 text-sm text-secondary font-body">
            Edit text and copy across the site.
          </p>
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          Failed to load content: {error.message}
        </div>
      ) : null}

      {pageNames.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
          No content blocks found. Run the seed script to populate initial content.
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {pageNames.map((page) => (
            <div key={page}>
              <h2 className="text-lg font-semibold text-primary font-sans capitalize mb-3">
                {page} Page
              </h2>
              <div className="space-y-2">
                {grouped[page].map((block) => (
                  <ContentEditor key={block.id} block={block} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
