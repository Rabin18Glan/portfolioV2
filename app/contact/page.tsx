import { Contact } from "@/features/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Rabin Glan",
  description: "Get in touch with Rabin Glan for consulting, projects, or full-time opportunities.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-500">
      <Contact />
    </div>
  );
}
