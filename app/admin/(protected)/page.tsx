"use client";

import Link from "next/link";
import { RESOURCES } from "@/features/admin/config";
import { RESOURCE_ICONS } from "@/features/admin/icons";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center">
          <SettingsIcon />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">
            Manage your portfolio content from one place.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCES.map((r) => {
          const Icon = RESOURCE_ICONS[r.icon] ?? SettingsIcon;
          return (
            <Link
              key={r.key}
              href={`/admin/${r.key}`}
              className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:border-primary-600/40 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Icon />
                </div>
                <ArrowForwardIcon
                  fontSize="small"
                  className="text-gray-300 group-hover:text-primary-600 transition-colors"
                />
              </div>
              <h3 className="mt-4 font-bold text-gray-900">{r.label}</h3>
              <p className="mt-0.5 text-xs text-gray-400">
                {r.single
                  ? "Single record"
                  : r.readonly
                    ? "Read only"
                    : "Manage records"}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
