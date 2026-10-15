import { NextRequest, NextResponse } from "next/server";
import { ChatStore } from "@/lib/chat/store";

const COOKIE_NAME = "rg_chat_device_id";

export async function POST(request: NextRequest) {
  try {
    const newDeviceId = `dev_${crypto.randomUUID()}`;
    const body = await request.json().catch(() => ({}));
    const customerName = typeof body.name === "string" ? body.name.trim() : "Visitor";

    const { session } = await ChatStore.getOrCreateSession(newDeviceId, customerName);

    const response = NextResponse.json({
      session,
      messages: [],
      deviceId: newDeviceId,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: newDeviceId,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Reset chat session error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reset session" },
      { status: 500 }
    );
  }
}
