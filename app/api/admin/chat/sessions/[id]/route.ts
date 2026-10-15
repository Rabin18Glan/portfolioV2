import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/features/admin/actions/helpers";
import { ChatStore } from "@/lib/chat/store";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    await ChatStore.deleteSession(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("Admin delete chat session error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete session" },
      { status: 500 }
    );
  }
}
