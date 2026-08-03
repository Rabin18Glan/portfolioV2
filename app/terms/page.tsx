import TermsOfUse from "@/features/terms/TermsOfUse";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Rabin Glan",
  description: "Terms of Use for Rabin Glan's portfolio site. Read the guidelines and rules governing the use of this website.",
};

export default function TermsPage() {
  return <TermsOfUse />;
}
