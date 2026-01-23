import fs from "node:fs/promises";
import path from "node:path";

import { createClient } from "@supabase/supabase-js";

import { galleryImages } from "../src/data/gallery";
import { cultivars } from "../src/data/cultivars";

type SeedImage = {
  src: string; // leading slash, e.g. "/cultivars/cadillac-rainbow/1.jpeg"
  alt: string;
};

type DbCarousel = { id: string; slug: string };
type DbImageRow = { id: string; path: string; alt_text: string };
type DbCarouselItem = { id: string; image_id: string };

function stripWrappingQuotes(value: string) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

async function loadDotEnvIfPresent() {
  const envPath = path.join(process.cwd(), ".env");
  if (!(await fileExists(envPath))) return;
  const raw = await fs.readFile(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = stripWrappingQuotes(trimmed.slice(idx + 1));
    if (!process.env[key]) process.env[key] = value;
  }
}

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var ${name}`);
  }
  return value;
}

function contentTypeFromPath(p: string) {
  const ext = path.extname(p).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

function normalizeSrc(src: string) {
  if (!src.startsWith("/")) return `/${src}`;
  return src;
}

function storagePathForSrc(src: string) {
  return normalizeSrc(src).slice(1);
}

async function fileExists(p: string) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function buildSeedImages(): SeedImage[] {
  const fromGallery: SeedImage[] = galleryImages.map((g) => ({ src: g.src, alt: g.alt }));
  const fromCultivars: SeedImage[] = cultivars.flatMap((c) => c.images.map((img) => ({ src: img.src, alt: img.alt })));
  const combined = [...fromGallery, ...fromCultivars].map((x) => ({ ...x, src: normalizeSrc(x.src) }));

  const bySrc = new Map<string, SeedImage>();
  for (const img of combined) {
    const existing = bySrc.get(img.src);
    if (!existing) {
      bySrc.set(img.src, img);
      continue;
    }
    if (existing.alt !== img.alt) {
      // Keep the first alt text but surface the mismatch.
      console.warn(`Alt text mismatch for ${img.src}\n- kept: ${existing.alt}\n- seen: ${img.alt}`);
    }
  }
  return [...bySrc.values()];
}

function carouselSeedPlan(): Record<string, string[]> {
  const mainSrcs = galleryImages.map((g) => normalizeSrc(g.src));
  const plan: Record<string, string[]> = {
    "home-main": mainSrcs,
    "about-main": mainSrcs,
    "brands-main": mainSrcs,
    "cultivars-main": mainSrcs,
  };

  for (const strain of cultivars) {
    const supportingSlug = `cultivar-${strain.id}-supporting`;
    // Use images 1-3 (not 0) because images[0] is the main hero image
    plan[supportingSlug] = strain.images.slice(1, 4).map((img) => normalizeSrc(img.src));
  }

  return plan;
}

async function main() {
  await loadDotEnvIfPresent();

  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE ||
    "";

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY). This seed script needs a service role key to upload to Storage and write seed rows."
    );
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const bucket = "carousel-images";

  const seedImages = buildSeedImages();
  const seedPlan = carouselSeedPlan();

  // 1) Ensure all local files exist
  const missingFiles: string[] = [];
  for (const img of seedImages) {
    const localPath = path.join(process.cwd(), "public", storagePathForSrc(img.src));
    if (!(await fileExists(localPath))) missingFiles.push(localPath);
  }
  if (missingFiles.length) {
    throw new Error(`Missing ${missingFiles.length} local files under public/: \n${missingFiles.join("\n")}`);
  }

  // 2) Load carousels + validate slugs exist
  const desiredSlugs = Object.keys(seedPlan);
  const { data: carousels, error: carErr } = await supabase
    .from("carousels")
    .select("id,slug")
    .in("slug", desiredSlugs);
  if (carErr) throw carErr;
  const carouselBySlug = new Map<string, DbCarousel>((carousels || []).map((c: DbCarousel) => [c.slug, c]));
  const missingCarousels = desiredSlugs.filter((slug) => !carouselBySlug.has(slug));
  if (missingCarousels.length) {
    throw new Error(`Missing carousels rows for slugs:\n${missingCarousels.join("\n")}`);
  }

  // 3) Upload files to Storage (idempotent upsert)
  console.log(`Uploading ${seedImages.length} files to Storage bucket "${bucket}"…`);
  for (const img of seedImages) {
    const objectKey = storagePathForSrc(img.src);
    const localPath = path.join(process.cwd(), "public", objectKey);
    const bytes = await fs.readFile(localPath);

    const { error: upErr } = await supabase.storage.from(bucket).upload(objectKey, bytes, {
      contentType: contentTypeFromPath(objectKey),
      upsert: true,
    });
    if (upErr) throw upErr;
  }

  // 4) Upsert images table rows (insert missing only; do not override alt text if it already exists)
  const paths = seedImages.map((i) => storagePathForSrc(i.src));
  const { data: existingImages, error: imgLoadErr } = await supabase
    .from("images")
    .select("id,path,alt_text")
    .in("path", paths);
  if (imgLoadErr) throw imgLoadErr;

  const existingByPath = new Map<string, DbImageRow>((existingImages || []).map((r: DbImageRow) => [r.path, r]));
  const toInsert = seedImages
    .filter((img) => !existingByPath.has(storagePathForSrc(img.src)))
    .map((img) => ({
      bucket,
      path: storagePathForSrc(img.src),
      alt_text: img.alt,
      mime_type: contentTypeFromPath(storagePathForSrc(img.src)),
      byte_size: null as number | null,
      width: null as number | null,
      height: null as number | null,
    }));

  if (toInsert.length) {
    console.log(`Inserting ${toInsert.length} new rows into public.images…`);
    const { error: insErr } = await supabase.from("images").insert(toInsert);
    if (insErr) throw insErr;
  } else {
    console.log("No new public.images rows needed.");
  }

  // Reload images mapping now that inserts are done
  const { data: allImages, error: imgReloadErr } = await supabase
    .from("images")
    .select("id,path,alt_text")
    .in("path", paths);
  if (imgReloadErr) throw imgReloadErr;
  const imageIdByPath = new Map<string, string>((allImages || []).map((r: DbImageRow) => [r.path, r.id]));

  // 5) For each carousel: enforce exact membership + ordering
  for (const [slug, srcs] of Object.entries(seedPlan)) {
    const carousel = carouselBySlug.get(slug)!;
    const desiredPaths = srcs.map(storagePathForSrc);
    const desiredImageIds = desiredPaths.map((p) => imageIdByPath.get(p)).filter(Boolean) as string[];

    if (desiredImageIds.length !== desiredPaths.length) {
      const missing = desiredPaths.filter((p) => !imageIdByPath.get(p));
      throw new Error(`Missing images rows for carousel ${slug}:\n${missing.join("\n")}`);
    }

    // Fetch existing items for this carousel
    const { data: existingItems, error: itemsErr } = await supabase
      .from("carousel_items")
      .select("id,image_id")
      .eq("carousel_id", carousel.id);
    if (itemsErr) throw itemsErr;

    const existing = (existingItems || []) as DbCarouselItem[];
    const desiredSet = new Set(desiredImageIds);
    const toDelete = existing.filter((it) => !desiredSet.has(it.image_id)).map((it) => it.id);

    if (toDelete.length) {
      const { error: delErr } = await supabase.from("carousel_items").delete().in("id", toDelete);
      if (delErr) throw delErr;
    }

    const upserts = desiredImageIds.map((image_id, sort_order) => ({
      carousel_id: carousel.id,
      image_id,
      sort_order,
    }));

    const { error: upErr } = await supabase
      .from("carousel_items")
      .upsert(upserts, { onConflict: "carousel_id,image_id" });
    if (upErr) throw upErr;

    console.log(`Seeded ${slug}: ${desiredImageIds.length} items${toDelete.length ? ` (removed ${toDelete.length} extras)` : ""}`);
  }

  // 6) Validation: compare DB order to expected
  console.log("\nValidating ordering…");
  for (const [slug, srcs] of Object.entries(seedPlan)) {
    const carousel = carouselBySlug.get(slug)!;
    const expectedPaths = srcs.map(storagePathForSrc);

    const { data: items, error: err } = await supabase
      .from("carousel_items")
      .select("sort_order,image:images(path)")
      .eq("carousel_id", carousel.id)
      .order("sort_order", { ascending: true });
    if (err) throw err;

    type ItemRow = { image: { path: string } | null };
    const gotPaths = ((items || []) as unknown as ItemRow[])
      .map((it) => it.image?.path)
      .filter(Boolean) as string[];

    const ok = gotPaths.length === expectedPaths.length && gotPaths.every((p, i) => p === expectedPaths[i]);
    if (!ok) {
      throw new Error(
        `Carousel ${slug} mismatch:\nexpected(${expectedPaths.length}): ${expectedPaths.join(", ")}\n` +
          `got(${gotPaths.length}): ${gotPaths.join(", ")}`
      );
    }
  }

  console.log("\n✅ Seed complete. All seeded carousels match the current in-repo ordering.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
