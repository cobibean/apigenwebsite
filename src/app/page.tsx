import { draftMode } from "next/headers";
import localContentSource from "@/providers/local";
import RenderBlocks from "@/components/RenderBlocks";

export default async function Home() {
  const preview = (await draftMode()).isEnabled;
  const page = await localContentSource.getPage([], { preview });
  return <RenderBlocks blocks={page?.blocks || []} />;
}
