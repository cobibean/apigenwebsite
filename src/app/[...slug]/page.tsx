import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import RenderBlocks from "@/components/RenderBlocks";
import localContentSource from "@/providers/local";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60; // ISR default for live

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const slug = params.slug ?? [];
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage(slug, { preview });
  if (!page) return {};
  return buildMetadata(page);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const slug = params?.slug ?? [];
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage(slug, { preview });
  if (!page) return notFound();
  return <RenderBlocks blocks={page.blocks} preview={preview} />;
}


