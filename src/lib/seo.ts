import type { Metadata } from "next";
import { DEFAULTS } from "@/lib/seoDefaults";
import { SITE_URL, isProductionEnv } from "@/config/site";

type SeoPageInput = {
  title?: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
};

export function buildMetadata(page: SeoPageInput, opts?: { slugPath?: string; preview?: boolean }): Metadata {
  const title = page.seo?.title || page.title || DEFAULTS.title;
  const description = page.seo?.description || DEFAULTS.description;
  const template = DEFAULTS.titleTemplate?.replace("%s", title) || title;
  const ogImage = page.seo?.ogImage || DEFAULTS.ogImage;
  const slugPath = normalizePath(opts?.slugPath || "/");
  const canonical = toAbsoluteUrl(slugPath);
  const isPreview = Boolean(opts?.preview);
  const robots = buildRobots({ preview: isPreview });

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
    alternates: {
      canonical,
    },
    robots,
  };
}

function toAbsoluteUrl(pathname: string) {
  return `${SITE_URL}${pathname === "/" ? "" : pathname}`;
}

function normalizePath(input: string) {
  if (!input) return "/";
  let s = input.trim();
  if (!s.startsWith("/")) s = "/" + s;
  // Collapse duplicate slashes and strip trailing except root
  s = s.replace(/\/+/, "/");
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}

function buildRobots({ preview }: { preview: boolean }) {
  // Preview mode or non-production env => noindex,nofollow
  if (preview || !isProductionEnv()) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    } as const;
  }
  return {
    index: true,
    follow: true,
  } as const;
}

