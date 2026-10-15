import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/features/admin/actions/helpers";
import { ChatStore } from "@/lib/chat/store";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const messages = await ChatStore.getMessages(sessionId);
    // Automatically mark customer messages as read when admin views the conversation
    await ChatStore.markSessionAsRead(sessionId, "admin");

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Admin get chat messages error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    const text = typeof body.message === "string" ? body.message.trim() : "";

    if (!sessionId || !text) {
      return NextResponse.json({ error: "sessionId and message are required" }, { status: 400 });
    }

    const newMessage = await ChatStore.addMessage(sessionId, "admin", text, "Rabin Glan");
    return NextResponse.json({ message: newMessage });
  } catch (error) {
    console.error("Admin send chat message error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 }
    );
  }
}
