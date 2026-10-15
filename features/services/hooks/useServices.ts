"use client";

import { useState, useEffect } from "react";
import { fetchServices, type ServiceDataProps } from "../data/ServicesData";

export function useServices() {
  const [services, setServices] = useState<ServiceDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchServices();
        if (!ignore) {
          setServices(data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load services:", err);
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  return { services, loading };
}
