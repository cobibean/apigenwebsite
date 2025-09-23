import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import RenderBlocks from "@/components/RenderBlocks";
import localContentSource from "@/providers/local";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60; // ISR default for live

export async function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ?? [];
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage(slug, { preview });
  if (!page) return {};
  return buildMetadata(page);
}

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ?? [];
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage(slug, { preview });
  if (!page) return notFound();
  return <RenderBlocks blocks={page.blocks} />;
}


