import { NextRequest, NextResponse } from "next/server";
import { ChatStore } from "@/lib/chat/store";

const COOKIE_NAME = "rg_chat_device_id";

export async function POST(request: NextRequest) {
  try {
    const deviceId = request.cookies.get(COOKIE_NAME)?.value;
    if (!deviceId) {
      return NextResponse.json({ error: "No active session found" }, { status: 400 });
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : undefined;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { session } = await ChatStore.getOrCreateSession(deviceId);
    await ChatStore.updateCustomerInfo(session.id, name, email);

    return NextResponse.json({ success: true, name, email });
  } catch (error) {
    console.error("Update customer info error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update info" },
      { status: 500 }
    );
  }
}
