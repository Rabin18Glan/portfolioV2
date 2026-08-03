import PrivacyPolicy from "@/features/privacy/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Rabin Glan",
  description: "Privacy Policy for Rabin Glan's portfolio site. Learn about how personal information is collected, used, and secured.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
