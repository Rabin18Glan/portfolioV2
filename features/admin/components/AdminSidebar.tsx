"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { RESOURCES } from "@/features/admin/config";
import { createClient } from "@/utils/supabase/client";
import { RESOURCE_ICONS } from "@/features/admin/icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ForumIcon from "@mui/icons-material/Forum";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarLinkProps {
  href: string;
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

function SidebarLink({ href, active, icon, label, onClick }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-gray-300 flex flex-col transform transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-800">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-sm">
              RG
            </span>
            <span className="text-white font-bold text-lg">Admin</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <SidebarLink
            href="/admin"
            active={pathname === "/admin"}
            icon={<DashboardIcon fontSize="small" />}
            label="Dashboard"
            onClick={onClose}
          />
          <SidebarLink
            href="/admin/chat"
            active={pathname.startsWith("/admin/chat")}
            icon={<ForumIcon fontSize="small" />}
            label="Live Chat"
            onClick={onClose}
          />
          {RESOURCES.map((r) => {
            const Icon = RESOURCE_ICONS[r.icon] ?? DashboardIcon;
            const active = pathname.startsWith(`/admin/${r.key}`);
            return (
              <SidebarLink
                key={r.key}
                href={`/admin/${r.key}`}
                active={active}
                icon={<Icon fontSize="small" />}
                label={r.label}
                onClick={onClose}
              />
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogoutIcon fontSize="small" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
