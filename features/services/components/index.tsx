import ServiceList from "./ServiceList";
import type { ServiceDataProps } from "../data/ServicesData";

interface ServicesProps {
  services?: ServiceDataProps[];
}

function Services({ services = [] }: ServicesProps) {
  return <ServiceList services={services} />;
}

export default Services;
