import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const enable = searchParams.get("enable");
  const redirect = searchParams.get("redirect") || "/";

  // TODO: move secret to env when available
  if (secret && secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse("Invalid preview token", { status: 401 });
  }

  if (enable === "false") {
    (await draftMode()).disable();
  } else {
    (await draftMode()).enable();
  }

  return NextResponse.redirect(new URL(redirect, req.url));
}

