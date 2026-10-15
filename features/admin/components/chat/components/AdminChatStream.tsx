import { RefObject } from "react";
import type { ChatMessage } from "@/lib/chat/store";
import AdminChatMessage from "./AdminChatMessage";

interface AdminChatStreamProps {
  messages: ChatMessage[];
  loading: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function AdminChatStream({
  messages,
  loading,
  containerRef,
}: AdminChatStreamProps) {
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-gray-400">
        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading...</span>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-gray-400">
        <span>No messages in this conversation yet</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full overflow-y-auto overscroll-contain p-4 space-y-3">
      {messages.map((msg) => (
        <AdminChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
}
