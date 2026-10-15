import CustomerChatScreen from "@/features/chat/CustomerChatScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "1-on-1 Conversation | Rabin Glan",
  description: "Start a real-time, one-to-one direct conversation with Rabin Glan.",
};

export default function ChatPage() {
  return <CustomerChatScreen />;
}
