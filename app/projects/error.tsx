"use client";

import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Projects page error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Unable to load projects
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-md">
        An error occurred while loading projects. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors shadow-sm cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
