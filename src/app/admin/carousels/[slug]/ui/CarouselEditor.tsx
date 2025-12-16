"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ImageRow = {
  id: string;
  bucket: string;
  path: string;
  alt_text: string;
  mime_type: string | null;
  byte_size: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
  previewUrl?: string;
};

type CarouselItemRow = {
  id: string;
  sort_order: number;
  image: ImageRow;
};

type CarouselItemJoinRow = {
  id: string;
  sort_order: number;
  image: ImageRow | null;
};

type PendingUpload = {
  id: string;
  file: File;
  altText: string;
  previewUrl: string;
  previewDims: { width: number; height: number } | null;
};

type PendingUploadResult = {
  pendingId: string;
  carouselItemId: string;
  imageId: string;
};

function encodeObjectPath(objectPath: string) {
  return objectPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function buildPublicUrl(supabaseUrl: string, bucket: string, path: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${encodeObjectPath(path)}`;
}

function sanitizeObjectKeyPart(input: string) {
  return input
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
}

const PENDING_PREFIX = "pending-";

function createPendingId() {
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${PENDING_PREFIX}${Date.now()}-${suffix}`;
}

function isPendingId(id: string) {
  return id.startsWith(PENDING_PREFIX);
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  if (!file.type.startsWith("image/")) return null;
  const url = URL.createObjectURL(file);
  try {
    const dims = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = url;
    });
    return dims;
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function CarouselEditor({ carouselId, carouselSlug }: { carouselId: string; carouselSlug: string }) {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const [items, setItems] = useState<CarouselItemRow[]>([]);
  const [library, setLibrary] = useState<ImageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadAlt, setUploadAlt] = useState("");
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [uploadPreviewDims, setUploadPreviewDims] = useState<{ width: number; height: number } | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  function ordersEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  async function loadAll() {
    setError(null);
    if (!supabase) {
      setError("Supabase env vars are missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error: itemsError } = await supabase
        .from("carousel_items")
        .select(
          `
          id,
          sort_order,
          image:images (
            id,bucket,path,alt_text,mime_type,byte_size,width,height,created_at
          )
        `
        )
        .eq("carousel_id", carouselId)
        .order("sort_order", { ascending: true });

      if (itemsError) throw itemsError;
      const rows = ((data || []) as unknown as CarouselItemJoinRow[]).filter(
        (row): row is CarouselItemJoinRow & { image: ImageRow } => !!row.image
      );
      const nextItems = rows.map((row) => ({ ...row, image: row.image }));
      setItems(nextItems);
      setOriginalOrder(nextItems.map((it) => it.id));
      setHasUnsavedChanges(false);

      const { data: libData, error: libError } = await supabase
        .from("images")
        .select("id,bucket,path,alt_text,mime_type,byte_size,width,height,created_at")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(200);

      if (libError) throw libError;
      setLibrary((libData as ImageRow[]) || []);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to load carousel data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselId]);

  useEffect(() => {
    if (!hasUnsavedChanges && pendingUploads.length === 0) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [hasUnsavedChanges, pendingUploads.length]);

  useEffect(() => {
    let cancelled = false;
    if (!uploadFile) {
      setUploadPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setUploadPreviewDims(null);
      return;
    }

    setUploadPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(uploadFile);
    });

    void (async () => {
      const dims = await getImageDimensions(uploadFile);
      if (!cancelled) setUploadPreviewDims(dims);
    })();

    return () => {
      cancelled = true;
    };
  }, [uploadFile]);

  useEffect(() => {
    if (!previewImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewImage]);

  useEffect(() => {
    if (!showLibrary) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowLibrary(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showLibrary]);

  async function persistOrder(nextItems: CarouselItemRow[]) {
    if (!supabase) return;
    const updates = nextItems
      .map((it, idx) => ({ id: it.id, sort_order: idx }))
      .filter(({ id }) => !isPendingId(id));
    for (const { id, sort_order } of updates) {
      const { error: updateErr } = await supabase.from("carousel_items").update({ sort_order }).eq("id", id);
      if (updateErr) throw updateErr;
    }
    setItems(nextItems.map((it, idx) => ({ ...it, sort_order: idx })));
    await loadAll();
  }

  async function uploadPendingImages(pendingList: PendingUpload[], snapshot: CarouselItemRow[]) {
    if (!supabase) return [];
    if (!pendingList.length) return [];
    const bucket = "carousel-images";
    const existingCount = snapshot.filter((item) => !isPendingId(item.id)).length;
    const result: PendingUploadResult[] = [];

    for (let idx = 0; idx < pendingList.length; idx++) {
      const pendingItem = pendingList[idx];
      const sortOrder = existingCount + idx;
      const key = `${carouselSlug}/${Date.now()}-${sanitizeObjectKeyPart(pendingItem.file.name)}`;
      const { error: uploadErr } = await supabase.storage.from(bucket).upload(key, pendingItem.file, {
        contentType: pendingItem.file.type,
        upsert: false,
      });
      if (uploadErr) throw uploadErr;

      const insertPayload = {
        bucket,
        path: key,
        alt_text: pendingItem.altText,
        mime_type: pendingItem.file.type || null,
        byte_size: pendingItem.file.size || null,
        width: pendingItem.previewDims?.width ?? null,
        height: pendingItem.previewDims?.height ?? null,
      };

      const { data: imgRow, error: imgErr } = await supabase
        .from("images")
        .insert(insertPayload)
        .select("id")
        .single();
      if (imgErr || !imgRow?.id) {
        throw imgErr || new Error("Failed to insert image record.");
      }

      const { data: itemRow, error: itemErr } = await supabase
        .from("carousel_items")
        .insert({
          carousel_id: carouselId,
          image_id: imgRow.id,
          sort_order: sortOrder,
        })
        .select("id")
        .single();
      if (itemErr) throw itemErr;

      if (!itemRow?.id) {
        throw new Error("Failed to insert carousel item row.");
      }

      result.push({
        pendingId: pendingItem.id,
        carouselItemId: itemRow.id,
        imageId: imgRow.id,
      });
    }

    return result;
  }

  async function saveChanges() {
    if (!supabase) return;
    if (!hasUnsavedChanges && pendingUploads.length === 0) return;
    const pendingSnapshot = [...pendingUploads];
    const itemSnapshot = [...items];
    setMutating(true);
    setIsSavingChanges(true);
    setError(null);
    try {
      let resolvedSnapshot = itemSnapshot;
      if (pendingSnapshot.length) {
        const uploadResults = await uploadPendingImages(pendingSnapshot, itemSnapshot);
        if (uploadResults.length) {
          const uploadMap = new Map(uploadResults.map((res) => [res.pendingId, res.carouselItemId]));
          resolvedSnapshot = itemSnapshot.map((item) => {
            if (!isPendingId(item.id)) return item;
            const resolvedId = uploadMap.get(item.id);
            if (!resolvedId) return item;
            return { ...item, id: resolvedId };
          });
        }
      }
      await persistOrder(resolvedSnapshot);
      if (pendingSnapshot.length) {
        pendingSnapshot.forEach((pending) => URL.revokeObjectURL(pending.previewUrl));
        setPendingUploads([]);
      }
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to save changes.");
    } finally {
      setMutating(false);
      setIsSavingChanges(false);
    }
  }

  function move(itemId: string, direction: -1 | 1) {
    const idx = items.findIndex((i) => i.id === itemId);
    if (idx < 0) return;
    const nextIdx = idx + direction;
    if (nextIdx < 0 || nextIdx >= items.length) return;

    const next = [...items];
    const [removed] = next.splice(idx, 1);
    next.splice(nextIdx, 0, removed);

    setItems(next);
    const nextOrder = next.map((it) => it.id);
    setHasUnsavedChanges(!ordersEqual(nextOrder, originalOrder));
  }

  async function removeFromCarousel(itemId: string) {
    if (!supabase) return;
    if (!confirm("Remove this image from this carousel? (The image stays in the library.)")) return;
    setMutating(true);
    setError(null);
    try {
      const { error: delErr } = await supabase.from("carousel_items").delete().eq("id", itemId);
      if (delErr) throw delErr;
      const next = items.filter((i) => i.id !== itemId).map((it, idx) => ({ ...it, sort_order: idx }));
      setItems(next);
      setOriginalOrder(next.map((it) => it.id));
      setHasUnsavedChanges(false);
      const updates = next.map((it, idx) => ({ id: it.id, sort_order: idx }));
      if (updates.length) {
        await supabase.from("carousel_items").upsert(updates, { onConflict: "id" });
      }
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to remove.");
    } finally {
      setMutating(false);
    }
  }

  async function updateAltText(imageId: string, altText: string) {
    if (!supabase) return;
    setMutating(true);
    setError(null);
    try {
      const trimmed = altText.trim();
      if (trimmed.length < 8) {
        setError("Alt text is required (min ~8 characters).");
        return;
      }
      const { error: upErr } = await supabase.from("images").update({ alt_text: trimmed }).eq("id", imageId);
      if (upErr) throw upErr;
      setItems((prev) =>
        prev.map((it) => (it.image.id === imageId ? { ...it, image: { ...it.image, alt_text: trimmed } } : it))
      );
      setLibrary((prev) => prev.map((img) => (img.id === imageId ? { ...img, alt_text: trimmed } : img)));
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to update alt text.");
    } finally {
      setMutating(false);
    }
  }

  async function addExisting(imageId: string) {
    if (!supabase) return;
    if (hasUnsavedChanges) {
      if (!confirm("You have unsaved order changes. Discard them and continue?")) return;
      await loadAll();
    }
    setMutating(true);
    setError(null);
    try {
      const sortOrder = items.length;
      const { error: insErr } = await supabase.from("carousel_items").insert({
        carousel_id: carouselId,
        image_id: imageId,
        sort_order: sortOrder,
      });
      if (insErr) throw insErr;
      await loadAll();
      setShowLibrary(false);
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Failed to add image to carousel.");
    } finally {
      setMutating(false);
    }
  }

  async function uploadAndAdd() {
    setUploadError(null);
    if (!uploadFile) {
      setUploadError("Choose a file to upload.");
      return;
    }
    const alt = uploadAlt.trim();
    if (alt.length < 8) {
      setUploadError("Alt text is required (min ~8 characters).");
      return;
    }

    setError(null);
    const pendingId = createPendingId();
    const dims = await getImageDimensions(uploadFile);
    const pendingPreviewUrl = URL.createObjectURL(uploadFile);

    setItems((prev) => {
      const nextRow: CarouselItemRow = {
        id: pendingId,
        sort_order: prev.length,
        image: {
          id: pendingId,
          bucket: "",
          path: "",
          alt_text: alt,
          mime_type: uploadFile.type || null,
          byte_size: uploadFile.size || null,
          width: dims?.width ?? null,
          height: dims?.height ?? null,
          created_at: new Date().toISOString(),
          previewUrl: pendingPreviewUrl,
        },
      };
      return [...prev, nextRow];
    });
    setPendingUploads((prev) => [
      ...prev,
      {
        id: pendingId,
        file: uploadFile,
        altText: alt,
        previewUrl: pendingPreviewUrl,
        previewDims: dims ?? null,
      },
    ]);
    setUploadFile(null);
    setUploadAlt("");
    setUploadPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setUploadPreviewDims(null);
    setHasUnsavedChanges(true);
  }

  if (loading) {
    return <div className="text-sm text-secondary">Loading…</div>;
  }

  if (!supabase) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-sm text-secondary">
        Missing Supabase env vars. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</div>
      ) : null}

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">Images in carousel</h2>
          <button
            type="button"
            onClick={() => setShowLibrary(true)}
            className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-card"
          >
            Add existing
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {items.map((it) => {
            const hasPublicSource = Boolean(it.image.bucket && it.image.path);
            const src = it.image.previewUrl ?? (hasPublicSource ? buildPublicUrl(supabaseUrl, it.image.bucket, it.image.path) : "");
            return (
              <motion.div
                key={it.id}
                layout
                transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.9 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={it.image.alt_text}
                      className="h-20 w-28 rounded-xl object-cover border border-border bg-card cursor-pointer"
                      loading="lazy"
                      onClick={() =>
                        setPreviewImage({
                          src,
                          alt: it.image.alt_text,
                          width: it.image.width ?? undefined,
                          height: it.image.height ?? undefined,
                        })
                      }
                    />
                    <div className="min-w-0">
                      <div className="text-xs text-secondary font-mono break-all">{it.image.path}</div>
                      <label className="mt-2 block text-xs text-secondary">
                        Alt text (SEO + accessibility)
                        <input
                          defaultValue={it.image.alt_text}
                          onBlur={(e) => void updateAltText(it.image.id, e.target.value)}
                          className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={mutating}
                        onClick={() => void move(it.id, -1)}
                        className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-foreground disabled:opacity-50"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={mutating}
                        onClick={() => void move(it.id, 1)}
                        className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-foreground disabled:opacity-50"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      type="button"
                      disabled={mutating}
                      onClick={() => void removeFromCarousel(it.id)}
                      className="rounded-lg border border-border bg-card px-3 py-1 text-xs text-secondary hover:text-foreground disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {!items.length ? (
            <div className="rounded-2xl border border-border bg-background p-6 text-sm text-secondary">
              No images yet. Upload a new one or add an existing image from the library.
            </div>
          ) : null}
        </div>
      </div>

      {(() => {
        const hasPendingChanges = hasUnsavedChanges || pendingUploads.length > 0;
        if (!hasPendingChanges) return null;
        const statusMessage = pendingUploads.length ? "New uploads staged" : "You have unsaved changes";
        return (
          <div className="fixed inset-x-0 bottom-4 z-[1000] px-4">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
              <div className="text-sm text-foreground">{statusMessage}</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={mutating}
                  onClick={() => {
                    const pendingSnapshot = [...pendingUploads];
                    if (pendingSnapshot.length) {
                      pendingSnapshot.forEach((pending) => URL.revokeObjectURL(pending.previewUrl));
                      setPendingUploads([]);
                    }
                    void loadAll();
                  }}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50"
                >
                  Discard
                </button>
                <button
                  type="button"
                  disabled={mutating}
                  onClick={() => void saveChanges()}
                  className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  {isSavingChanges ? (
                    <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.4em]">
                      <span className="inline-block h-3 w-3 animate-spin rounded-full border border-primary-foreground border-t-transparent" />
                      Updating to Database
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Upload new image</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-foreground">
            File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-secondary file:mr-4 file:rounded-xl file:border file:border-border file:bg-card file:px-4 file:py-2 file:text-sm file:text-foreground file:cursor-pointer hover:file:bg-background"
            />
            {uploadPreviewUrl ? (
              <div className="mt-3 space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadPreviewUrl}
                  alt="Selected upload preview"
                  className="h-32 w-auto rounded-xl border border-border bg-background object-contain"
                />
              {uploadPreviewDims ? (
                <div className="text-xs text-secondary font-mono">
                  {uploadPreviewDims.width}×{uploadPreviewDims.height}
                </div>
              ) : null}
            </div>
          ) : null}
        </label>
        <label className="block text-sm text-foreground">
          Alt text
          <input
            value={uploadAlt}
            onChange={(e) => setUploadAlt(e.target.value)}
            placeholder="e.g. Cadillac Rainbow premium cannabis flower close-up"
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="mt-2 text-xs text-secondary">
            Tip: write what you’d say to someone who can’t see the image. Keep it descriptive and natural.
          </div>
        </label>
      </div>
      {uploadError ? (
        <div className="mt-2 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-500">
          {uploadError}
        </div>
      ) : null}
        <button
          type="button"
          disabled={mutating || !uploadFile}
          onClick={() => void uploadAndAdd()}
          className="mt-4 rounded-xl border border-border bg-primary/90 px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none disabled:opacity-50"
        >
          Upload and add
        </button>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-card"
        >
          Add existing from library
        </button>
      </div>

      {showLibrary ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9000] flex items-center justify-center px-4 py-6"
        >
          <div
            className="absolute inset-0 bg-white/90 backdrop-blur-sm"
            onClick={(e) => {
              if (e.currentTarget === e.target) setShowLibrary(false);
            }}
          />
          <div className="relative w-full max-w-5xl space-y-4 overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">Image library</h2>
              <button
                type="button"
                onClick={() => setShowLibrary(false)}
                className="rounded-xl border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-card"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {library.map((img) => {
                  const src = buildPublicUrl(supabaseUrl, img.bucket, img.path);
                  const inCarousel = items.some((it) => it.image.id === img.id);
                  return (
                    <motion.div
                      key={img.id}
                      layout
                      transition={{ type: "spring", stiffness: 520, damping: 42, mass: 0.9 }}
                      className="rounded-2xl border border-border bg-background p-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={img.alt_text}
                        className="h-28 w-full rounded-xl object-cover border border-border bg-card cursor-pointer"
                        loading="lazy"
                        onClick={() =>
                          setPreviewImage({
                            src,
                            alt: img.alt_text,
                            width: img.width ?? undefined,
                            height: img.height ?? undefined,
                          })
                        }
                      />
                      <div className="mt-2 text-xs text-secondary line-clamp-2">{img.alt_text}</div>
                      <button
                        type="button"
                        disabled={mutating || inCarousel}
                        onClick={() => void addExisting(img.id)}
                        className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2 text-xs text-foreground disabled:opacity-50"
                      >
                        {inCarousel ? "Already in carousel" : "Add to carousel"}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {previewImage ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.currentTarget === e.target) setPreviewImage(null);
          }}
        >
          <div className="w-full max-w-[90vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className="mx-auto max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
            />
            <div className="mt-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/90">
              <div className="font-medium">{previewImage.alt}</div>
              {previewImage.width && previewImage.height ? (
                <div className="mt-1 text-xs text-white/70 font-mono">
                  {previewImage.width}×{previewImage.height}
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="mt-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/90 hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
