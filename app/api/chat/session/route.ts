import { NextRequest, NextResponse } from "next/server";
import { ChatStore, type ChatMessage } from "@/lib/chat/store";

const COOKIE_NAME = "rg_chat_device_id";

export async function GET(request: NextRequest) {
  try {
    let deviceId = request.cookies.get(COOKIE_NAME)?.value;
    let isNewCookie = false;

    if (!deviceId) {
      deviceId = `dev_${crypto.randomUUID()}`;
      isNewCookie = true;
    }

    // Only fetch existing session — do NOT create/insert one if the user hasn't sent a message yet
    const existing = await ChatStore.findSession(deviceId);

    let session = existing;
    let messages: ChatMessage[] = [];

    if (existing) {
      messages = await ChatStore.getMessages(existing.id);
    } else {
      // Virtual unsaved session until first message is sent
      session = {
        id: "pending",
        device_id: deviceId,
        customer_name: "Visitor",
        customer_email: null,
        created_at: new Date().toISOString(),
      };
    }

    const response = NextResponse.json({
      session,
      messages,
      deviceId,
    });

    if (isNewCookie) {
      response.cookies.set({
        name: COOKIE_NAME,
        value: deviceId,
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        httpOnly: true,
      });
    }

    return response;
  } catch (error) {
    console.error("Chat session error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load session" },
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

    const existing = await ChatStore.findSession(deviceId);
    let session = existing;
    let messages: ChatMessage[] = [];

    if (existing) {
      messages = await ChatStore.getMessages(existing.id);
    } else {
      session = {
        id: "pending",
        device_id: deviceId,
        customer_name: "Visitor",
        customer_email: null,
        created_at: new Date().toISOString(),
      };
    }

    const response = NextResponse.json({
      session,
      messages,
      deviceId,
    });

    if (isNewCookie) {
      response.cookies.set({
        name: COOKIE_NAME,
        value: deviceId,
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
        httpOnly: true,
      });
    }

    return response;
  } catch (error) {
    console.error("Chat session error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
