import { NextRequest, NextResponse } from "next/server";
import { revalidateCustom } from "@/lib/data/revalidate";

export async function GET(req: NextRequest) {
  return handleRevalidate(req);
}

export async function POST(req: NextRequest) {
  return handleRevalidate(req);
}

async function handleRevalidate(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const path = searchParams.get("path");
  const secret = searchParams.get("secret");

  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
  }

  if (!tag && !path) {
    return NextResponse.json(
      { message: "Missing required query parameter: tag or path" },
      { status: 400 }
    );
  }

  revalidateCustom({
    tag: tag ?? undefined,
    path: path ?? undefined,
  });

  return NextResponse.json({
    revalidated: true,
    tag: tag ?? null,
    path: path ?? null,
    now: Date.now(),
  });
}
