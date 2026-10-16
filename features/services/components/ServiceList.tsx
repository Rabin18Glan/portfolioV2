import ServiceCard from "./ServiceCard";
import type { ServiceDataProps } from "../data/ServicesData";

interface ServiceListProps {
  services: ServiceDataProps[];
}

export default function ServiceList({ services }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500 dark:text-gray-400">
        No services available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full">
      {services.map((service) => (
        <div key={service.title} className="w-full flex justify-center">
          <ServiceCard title={service.title} skills={service.skills} />
        </div>
      ))}
    </div>
  );
}
