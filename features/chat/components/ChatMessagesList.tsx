import { RefObject } from "react";
import type { ChatMessage } from "@/lib/chat/store";
import ChatMessageItem from "./ChatMessageItem";
import ChatEmptyState from "./ChatEmptyState";

interface ChatMessagesListProps {
  messages: ChatMessage[];
  loading: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessagesList({
  messages,
  loading,
  containerRef,
}: ChatMessagesListProps) {
  if (loading) {
    return (
      <div className="h-full py-24 flex items-center justify-center text-gray-400">
        <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div ref={containerRef} className="h-full overflow-y-auto overscroll-contain">
        <ChatEmptyState />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overscroll-contain space-y-4 pr-1 scroll-smooth"
    >
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
