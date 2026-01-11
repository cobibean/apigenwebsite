"use client";

import { useState, useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ContentBlock = {
  id: string;
  slug: string;
  content: string;
  content_type: string;
  updated_at: string;
};

export default function ContentEditor({ block }: { block: ContentBlock }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [content, setContent] = useState(block.content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const hasChanges = content !== block.content;
  const isMultiline = content.includes("\n") || content.length > 100;

  async function handleSave() {
    if (!supabase || !hasChanges) return;
    
    setError(null);
    setSaving(true);
    setSaved(false);

    try {
      const { error: updateError } = await supabase
        .from("content_blocks")
        .update({ content })
        .eq("id", block.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSaved(true);
        block.content = content; // Update local reference
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setContent(block.content);
    setError(null);
  }

  // Parse slug for display
  const slugParts = block.slug.split(".");
  const label = slugParts.slice(1).join(" → ") || block.slug;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header - always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-background/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">
            {label}
          </div>
          <div className="text-xs text-secondary font-mono truncate mt-0.5">
            {block.slug}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          {hasChanges && (
            <span className="text-xs text-amber-400">unsaved</span>
          )}
          {saved && (
            <span className="text-xs text-green-400">saved!</span>
          )}
          <svg
            className={`w-4 h-4 text-secondary transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded editor */}
      {expanded && (
        <div className="border-t border-border px-4 py-3 space-y-3">
          {error && (
            <div className="text-xs text-red-400 bg-red-500/10 rounded px-2 py-1">
              {error}
            </div>
          )}

          {isMultiline ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={Math.min(10, content.split("\n").length + 2)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-body resize-y outline-none focus:ring-2 focus:ring-primary/40"
            />
          ) : (
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground font-body outline-none focus:ring-2 focus:ring-primary/40"
            />
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary">
              Type: {block.content_type}
            </span>
            <div className="flex gap-2">
              {hasChanges && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-xs text-secondary hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
