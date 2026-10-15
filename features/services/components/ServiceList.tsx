"use client";

import { useServices } from "../hooks/useServices";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

export default function ServiceList() {
  const { services, loading } = useServices();

  if (loading) {
    return (
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500 dark:text-gray-400">
        No services available.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full"
    >
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-full flex justify-center"
        >
          <ServiceCard title={service.title} skills={service.skills} />
        </motion.div>
      ))}
    </motion.div>
  );
}
