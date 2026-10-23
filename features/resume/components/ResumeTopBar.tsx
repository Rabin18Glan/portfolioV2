"use client";

import Link from "next/link";
import ChangeModeButton from "@/components/Button/ChangeModeButton";

interface ResumeTopBarProps {
  onDownload: () => Promise<void>;
  downloading: boolean;
}

export default function ResumeTopBar({
  onDownload,
  downloading,
}: ResumeTopBarProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center justify-between py-3 mb-6 no-print">
      {/* Back button on top left, exactly matching chat screen */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/80 dark:bg-dark-card/80 hover:bg-gray-200 dark:hover:bg-dark-card transition-colors cursor-pointer shadow-sm"
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

      {/* Action buttons on top right */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer border border-gray-200 dark:border-gray-700"
          title="Print or Save via Browser"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <span className="hidden sm:inline">Print</span>
        </button>

        <button
          onClick={onDownload}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          title="Download ATS PDF (Rabin_Glan.pdf)"
        >
          {downloading ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Theme toggle */}
        <ChangeModeButton />
      </div>
    </div>
  );
}
