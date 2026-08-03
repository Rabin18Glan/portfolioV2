"use client";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      <p className="mt-3 text-sm">Loading…</p>
    </div>
  );
}

export function AdminError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm">
      <ErrorOutlineIcon fontSize="small" />
      <span>{message}</span>
    </div>
  );
}

export function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
      <SearchOffIcon className="mb-2" />
      <p className="text-sm">Section not found.</p>
    </div>
  );
}
