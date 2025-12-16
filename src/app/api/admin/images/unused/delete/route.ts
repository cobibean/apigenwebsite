import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE;

function missingEnvResponse() {
  return NextResponse.json(
    { error: "Missing Supabase service role credentials for unused image deletion." },
    { status: 500 }
  );
}

async function getSupabaseClient() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(request: Request) {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    return missingEnvResponse();
  }

  let payload: { imageId?: string };
  try {
    payload = (await request.json()) as { imageId?: string };
  } catch {
    payload = {};
  }

  const imageId = payload?.imageId?.trim();
  if (!imageId) {
    return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
  }

  const { data: image, error: imageErr } = await supabase
    .from("images")
    .select("id,bucket,path")
    .eq("id", imageId)
    .maybeSingle();
  if (imageErr) {
    return NextResponse.json({ error: imageErr.message }, { status: 500 });
  }
  if (!image) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const { data: refs, error: refErr } = await supabase
    .from("carousel_items")
    .select("id")
    .eq("image_id", imageId)
    .limit(1);
  if (refErr) {
    return NextResponse.json({ error: refErr.message }, { status: 500 });
  }
  if (refs && refs.length > 0) {
    return NextResponse.json({ error: "Cannot delete image because it is still referenced by a carousel." }, { status: 409 });
  }

  if (image.bucket && image.path) {
    const { error: storageErr } = await supabase.storage.from(image.bucket).remove([image.path]);
    if (storageErr) {
      return NextResponse.json({ error: storageErr.message }, { status: 500 });
    }
  }

  const { error: dbErr } = await supabase.from("images").delete().eq("id", imageId);
  if (dbErr) {
    return NextResponse.json({ error: dbErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
