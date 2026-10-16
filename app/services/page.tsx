import { Services } from "@/features/services";
import { getCachedServices } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Rabin Glan",
  description: "Explore the development, architectural, and engineering services offered by Rabin Glan.",
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await getCachedServices();
  return <Services services={services} />;
}
