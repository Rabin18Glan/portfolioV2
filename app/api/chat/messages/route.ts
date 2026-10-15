import { NextRequest, NextResponse } from "next/server";
import { ChatStore } from "@/lib/chat/store";

const COOKIE_NAME = "rg_chat_device_id";

export async function GET(request: NextRequest) {
  try {
    const deviceId = request.cookies.get(COOKIE_NAME)?.value;
    if (!deviceId) {
      return NextResponse.json({ messages: [] });
    }

    // Do NOT create empty session on GET
    const existing = await ChatStore.findSession(deviceId);
    if (!existing) {
      return NextResponse.json({ messages: [] });
    }

    const messages = await ChatStore.getMessages(existing.id);
    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Fetch chat messages error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let deviceId = request.cookies.get(COOKIE_NAME)?.value;
    let isNewCookie = false;

    if (!deviceId) {
      deviceId = `dev_${crypto.randomUUID()}`;
      isNewCookie = true;
    }

    const body = await request.json();
    const text = typeof body.message === "string" ? body.message.trim() : "";
    const customerName = typeof body.name === "string" ? body.name.trim() : undefined;

    if (!text) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    // Create or retrieve session ONLY when a live message is actually sent!
    const { session } = await ChatStore.getOrCreateSession(deviceId, customerName);
    const newMessage = await ChatStore.addMessage(session.id, "customer", text, customerName || session.customer_name);

    const response = NextResponse.json({
      message: newMessage,
      session,
    });

    if (isNewCookie) {
      response.cookies.set({
        name: COOKIE_NAME,
        value: deviceId,
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        httpOnly: true,
      });
    }

    return response;
  } catch (error) {
    console.error("Send chat message error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 }
    );
  }
}
