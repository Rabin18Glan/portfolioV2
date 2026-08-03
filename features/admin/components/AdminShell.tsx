"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getResource } from "@/features/admin/config";
import { AdminUIProvider } from "@/context/AdminUIContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

/**
 * Root layout shell for the admin panel:
 *  - AdminSidebar (fixed, mobile responsive)
 *  - AdminHeader (dynamic title + search + create)
 *  - body (children)
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean); // ['admin', resource?, ...]
  const resourceKey = segments[1] ?? "";
  const resource = getResource(resourceKey);

  return (
    <AdminUIProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-64 flex flex-col min-h-screen">
          <AdminHeader
            resource={resource}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AdminUIProvider>
  );
}
