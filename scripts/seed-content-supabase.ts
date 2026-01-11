import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

// Import content data
import { homeContent } from "../src/data/home";
import { aboutContent } from "../src/data/about";
import { brands } from "../src/data/brands";
import { cultivars, cultivarsContent } from "../src/data/cultivars";

type ContentSeed = {
  slug: string;
  content: string;
  content_type: "text" | "markdown";
};

async function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  const raw = await fs.readFile(envPath, "utf8");
  const vars: Record<string, string> = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    vars[key] = value;
  }
  return vars;
}

function extractHomeContent(): ContentSeed[] {
  const seeds: ContentSeed[] = [];
  const h = homeContent;

  // Hero
  seeds.push({ slug: "home.hero.eyebrow", content: h.hero.eyebrow, content_type: "text" });
  seeds.push({ slug: "home.hero.subtitle", content: h.hero.subtitle, content_type: "text" });
  seeds.push({ slug: "home.hero.title", content: h.hero.title, content_type: "text" });
  seeds.push({ slug: "home.hero.copy", content: h.hero.copy, content_type: "text" });
  seeds.push({ slug: "home.hero.ctaLabel", content: h.hero.ctaLabel, content_type: "text" });

  // Mission
  seeds.push({ slug: "home.mission.eyebrow", content: h.mission.eyebrow, content_type: "text" });
  seeds.push({ slug: "home.mission.taglinePrimary", content: h.mission.taglinePrimary, content_type: "text" });
  seeds.push({ slug: "home.mission.taglineSecondary", content: h.mission.taglineSecondary, content_type: "text" });
  seeds.push({ slug: "home.mission.lead", content: h.mission.lead, content_type: "text" });
  seeds.push({ slug: "home.mission.body", content: h.mission.body, content_type: "markdown" });
  seeds.push({ slug: "home.mission.ctaLabel", content: h.mission.cta.label, content_type: "text" });

  // Gallery
  seeds.push({ slug: "home.gallery.title", content: h.gallery.title, content_type: "text" });
  seeds.push({ slug: "home.gallery.subtitle", content: h.gallery.subtitle, content_type: "text" });

  // CTA
  seeds.push({ slug: "home.cta.title", content: h.cta.title, content_type: "text" });
  seeds.push({ slug: "home.cta.label", content: h.cta.label, content_type: "text" });

  // Metadata
  seeds.push({ slug: "home.metadata.title", content: h.metadata.title, content_type: "text" });
  seeds.push({ slug: "home.metadata.description", content: h.metadata.description, content_type: "text" });

  return seeds;
}

function extractAboutContent(): ContentSeed[] {
  const seeds: ContentSeed[] = [];
  const a = aboutContent;

  seeds.push({ slug: "about.title", content: a.title, content_type: "text" });

  // Extract card content
  a.cards.forEach((card, idx) => {
    seeds.push({ slug: `about.cards.${idx}.title`, content: card.title, content_type: "text" });
    seeds.push({ slug: `about.cards.${idx}.content`, content: card.content, content_type: "markdown" });
  });

  return seeds;
}

function extractBrandsContent(): ContentSeed[] {
  const seeds: ContentSeed[] = [];

  for (const brand of brands) {
    if (!brand) continue;
    const prefix = `brands.${brand.id}`;
    
    seeds.push({ slug: `${prefix}.name`, content: brand.name, content_type: "text" });
    seeds.push({ slug: `${prefix}.heading`, content: brand.heading, content_type: "text" });
    seeds.push({ slug: `${prefix}.body`, content: brand.body.join("\n\n"), content_type: "markdown" });

    // Attributes
    brand.attributes.forEach((attr, idx) => {
      seeds.push({ slug: `${prefix}.attributes.${idx}.label`, content: attr.label, content_type: "text" });
      seeds.push({ slug: `${prefix}.attributes.${idx}.value`, content: attr.value, content_type: "text" });
    });

    // Highlights
    brand.highlights.forEach((hl, idx) => {
      seeds.push({ slug: `${prefix}.highlights.${idx}.title`, content: hl.title, content_type: "text" });
      seeds.push({ slug: `${prefix}.highlights.${idx}.description`, content: hl.description, content_type: "text" });
    });
  }

  return seeds;
}

function extractCultivarsContent(): ContentSeed[] {
  const seeds: ContentSeed[] = [];

  // Page-level content
  seeds.push({ slug: "cultivars.galleryTitle", content: cultivarsContent.galleryTitle, content_type: "text" });
  seeds.push({ slug: "cultivars.gallerySubtitle", content: cultivarsContent.gallerySubtitle, content_type: "text" });
  seeds.push({ slug: "cultivars.pageTitle", content: cultivarsContent.pageTitle, content_type: "text" });
  seeds.push({ slug: "cultivars.pageDescription", content: cultivarsContent.pageDescription, content_type: "text" });

  // Per-strain content
  for (const strain of cultivars) {
    const prefix = `cultivars.${strain.id}`;
    
    seeds.push({ slug: `${prefix}.title`, content: strain.title, content_type: "text" });
    if (strain.eyebrow) {
      seeds.push({ slug: `${prefix}.eyebrow`, content: strain.eyebrow, content_type: "text" });
    }
    if (strain.provenance) {
      seeds.push({ slug: `${prefix}.provenance`, content: strain.provenance, content_type: "text" });
    }
    if (strain.growersNote) {
      seeds.push({ slug: `${prefix}.growersNote`, content: strain.growersNote, content_type: "markdown" });
    }
    if (strain.cure) {
      seeds.push({ slug: `${prefix}.cure`, content: strain.cure, content_type: "text" });
    }
    if (strain.trim) {
      seeds.push({ slug: `${prefix}.trim`, content: strain.trim, content_type: "text" });
    }

    // Tasting notes
    if (strain.tasting) {
      seeds.push({ slug: `${prefix}.tasting.nose`, content: strain.tasting.nose.join("\n"), content_type: "text" });
      seeds.push({ slug: `${prefix}.tasting.palate`, content: strain.tasting.palate.join("\n"), content_type: "text" });
      seeds.push({ slug: `${prefix}.tasting.finish`, content: strain.tasting.finish.join("\n"), content_type: "text" });
    }
  }

  return seeds;
}

async function main() {
  const vars = await loadEnv();
  const url = vars.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = vars.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Collect all content
  const allSeeds: ContentSeed[] = [
    ...extractHomeContent(),
    ...extractAboutContent(),
    ...extractBrandsContent(),
    ...extractCultivarsContent(),
  ];

  console.log(`Found ${allSeeds.length} content blocks to seed.\n`);

  // Check existing blocks
  const { data: existing, error: fetchError } = await supabase
    .from("content_blocks")
    .select("slug");

  if (fetchError) {
    throw new Error(`Failed to fetch existing blocks: ${fetchError.message}`);
  }

  const existingSlugs = new Set((existing || []).map((r: { slug: string }) => r.slug));
  const toInsert = allSeeds.filter((s) => !existingSlugs.has(s.slug));

  if (toInsert.length === 0) {
    console.log("All content blocks already exist. Nothing to insert.");
    return;
  }

  console.log(`Inserting ${toInsert.length} new content blocks...`);

  const { error: insertError } = await supabase.from("content_blocks").insert(toInsert);

  if (insertError) {
    throw new Error(`Failed to insert: ${insertError.message}`);
  }

  console.log(`\n✅ Seeded ${toInsert.length} content blocks successfully!`);
  
  // List what was inserted
  console.log("\nInserted slugs:");
  for (const seed of toInsert) {
    console.log(`  - ${seed.slug}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
