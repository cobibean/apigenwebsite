import { promises as fs } from "fs";
import path from "path";
import type { ContentSource, PageData } from "@/lib/content-source";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

async function readJSON<T>(file: string): Promise<T> {
  const full = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(full, "utf8");
  return JSON.parse(raw) as T;
}

type PagesJSON = Array<{
  slug: string; // e.g., "/", "/about", "/news/[slug]" not used in phase 1
  title: string;
  seo?: PageData["seo"];
  blocks: PageData["blocks"];
}>;

type MenuJSON = Array<{ label: string; href: string }>;

export const localContentSource: ContentSource = {
  async getPage(slugSegments, opts) {
    const slugPath = "/" + slugSegments.join("/");
    const pages = await readJSON<PagesJSON>("pages.json");
    const page = pages.find((p) => p.slug === slugPath);
    if (!page) return null;
    // Preview flag is available via opts?.preview for future conditional content
    return {
      title: page.title,
      seo: page.seo,
      blocks: page.blocks,
    } satisfies PageData;
  },

  async getMenu() {
    const menu = await readJSON<MenuJSON>("menu.json");
    return menu;
  },
};

export default localContentSource;


