import { NextResponse } from "next/server";
import { requireAdmin } from "@/features/admin/actions/helpers";
import { ChatStore } from "@/lib/chat/store";

export async function GET() {
  try {
    await requireAdmin();
    const sessions = await ChatStore.listAllSessions();
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Admin list chat sessions error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unauthorized" },
      { status: 401 }
    );
  }
}
