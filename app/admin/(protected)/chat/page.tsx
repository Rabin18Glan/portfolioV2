import AdminChatScreen from "@/features/admin/components/chat/AdminChatScreen";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Chat Sessions | Admin Dashboard",
  description: "One-to-one real-time conversation management with customers and visitors.",
};

export default function AdminChatPage() {
  return <AdminChatScreen />;
}
