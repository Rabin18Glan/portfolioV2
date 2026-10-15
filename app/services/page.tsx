import { Services } from "@/features/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Rabin Glan",
  description: "Explore the development, architectural, and engineering services offered by Rabin Glan.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-500">
      <Services />
    </div>
  );
}
