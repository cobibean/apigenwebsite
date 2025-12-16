"use client";

import { useEffect, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ImageRow = {
  id: string;
  bucket: string;
  path: string;
  alt_text: string;
  created_at: string;
};

type CarouselItemRefRow = { image_id: string };

function encodeObjectPath(objectPath: string) {
  return objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildPublicUrl(supabaseUrl: string, bucket: string, path: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${encodeObjectPath(path)}`;
}

export default function UnusedImagesClient() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const [unused, setUnused] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadUnused() {
    setError(null);
    if (!supabase) {
      setError("Missing Supabase env vars.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data: images, error: imgErr } = await supabase
        .from("images")
        .select("id,bucket,path,alt_text,created_at,deleted_at")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(500);
      if (imgErr) throw imgErr;

      const { data: refs, error: refErr } = await supabase
        .from("carousel_items")
        .select("image_id")
        .limit(2000);
      if (refErr) throw refErr;

      const used = new Set<string>(((refs || []) as CarouselItemRefRow[]).map((r) => r.image_id));
      setUnused(((images || []) as ImageRow[]).filter((img) => !used.has(img.id)));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load unused images.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUnused();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deletePermanently(img: ImageRow) {
    if (!confirm("Permanently delete this image file and record? This cannot be undone.")) return;
    setMutating(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/images/unused/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageId: img.id }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = payload?.error || response.statusText || "Failed to delete.";
        throw new Error(message);
      }
      setUnused((prev) => prev.filter((x) => x.id !== img.id));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to delete.");
    } finally {
      setMutating(false);
    }
  }

  if (loading) return <div className="text-sm text-secondary">Loading…</div>;
  if (!supabase) return <div className="text-sm text-secondary">Missing Supabase env vars.</div>;

  return (
    <div>
      {error ? (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {unused.map((img) => {
          const src = buildPublicUrl(supabaseUrl, img.bucket, img.path);
          return (
            <div key={img.id} className="rounded-2xl border border-border bg-card p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={img.alt_text}
                className="h-32 w-full rounded-xl object-cover border border-border bg-background"
                loading="lazy"
              />
              <div className="mt-3 text-xs text-secondary line-clamp-2">{img.alt_text}</div>
              <div className="mt-2 text-[0.7rem] text-secondary/80 font-mono break-all">{img.path}</div>
              <button
                type="button"
                disabled={mutating}
                onClick={() => void deletePermanently(img)}
                className="mt-3 w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-secondary hover:text-foreground disabled:opacity-50"
              >
                Delete permanently
              </button>
            </div>
          );
        })}
      </div>

      {!unused.length ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
          No unused images.
        </div>
      ) : null}
    </div>
  );
}
