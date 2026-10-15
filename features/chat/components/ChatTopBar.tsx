"use client";

import Link from "next/link";
import ChangeModeButton from "@/components/Button/ChangeModeButton";

export default function ChatTopBar() {
  return (
    <div className="flex items-center justify-between py-3 mb-2">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/80 dark:bg-dark-card/80 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors cursor-pointer"
        aria-label="Back to home"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back</span>
      </Link>

      {/* Theme mode toggle */}
      <ChangeModeButton />
    </div>
  );
}
