"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ResourceConfig } from "@/features/admin/config";
import { useAdminUI } from "@/context/AdminUIContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function AdminHeader({
  resource,
  onMenuClick,
}: {
  resource?: ResourceConfig;
  onMenuClick: () => void;
}) {
  const pathname = usePathname();
  const { search, setSearch } = useAdminUI();

  const segments = pathname.split("/").filter(Boolean); // ['admin', resource?, ...]
  const isListPage = segments.length === 2 && !!resource; // /admin/[resource]
  const isDashboard = segments.length === 1;
  const title = isDashboard ? "Dashboard" : resource?.label ?? "Admin";

  const canCreate = !!resource && !resource.single && !resource.readonly && isListPage;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-16 flex items-center gap-3 px-4 md:px-8">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      {/* Dynamic title (follows the selected nav item) */}
      <h1 className="text-lg md:text-xl font-bold text-gray-900 flex-1 truncate">
        {title}
      </h1>

      {/* Search — filters the list page */}
      {isListPage && (
        <div className="relative hidden sm:block">
          <SearchIcon
            fontSize="small"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${resource!.label.toLowerCase()}…`}
            className="w-56 md:w-72 pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600"
          />
        </div>
      )}

      {/* Create button */}
      {canCreate && (
        <Link
          href={`/admin/${resource!.key}/new`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 shadow-md shadow-primary-600/30 transition-colors"
        >
          <AddIcon fontSize="small" />
          <span className="hidden sm:inline">Create</span>
        </Link>
      )}
    </header>
  );
}
