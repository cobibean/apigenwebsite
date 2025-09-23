import type { Metadata } from "next";
import type { PageData } from "@/lib/content-source";
import { DEFAULTS } from "@/lib/seoDefaults";

export function buildMetadata(page: PageData): Metadata {
  const title = page.seo?.title || page.title || DEFAULTS.title;
  const description = page.seo?.description || DEFAULTS.description;
  const template = DEFAULTS.titleTemplate?.replace("%s", title) || title;
  const ogImage = page.seo?.ogImage || DEFAULTS.ogImage;

  return {
    title: template,
    description,
    openGraph: {
      title: template,
      description,
      images: ogImage ? [ogImage] : undefined,
      siteName: DEFAULTS.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: template,
      description,
      images: ogImage ? [ogImage] : undefined,
      site: DEFAULTS.twitter || undefined,
    },
  };
}


