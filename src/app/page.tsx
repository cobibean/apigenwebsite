import { draftMode } from "next/headers";
import localContentSource from "@/providers/local";
import RenderBlocks from "@/components/RenderBlocks";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export default async function Home() {
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage([], { preview });
  return <RenderBlocks blocks={page?.blocks || []} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage([], { preview });
  if (!page) return {};
  return buildMetadata(page, { slugPath: "/", preview });
}
