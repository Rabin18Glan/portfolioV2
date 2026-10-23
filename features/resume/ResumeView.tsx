"use client";

import { useState } from "react";
import type { ResumeData } from "@/lib/data/resume-data";
import ResumeTopBar from "./components/ResumeTopBar";
import ResumeDocument from "./components/ResumeDocument";
import { downloadResumePdf } from "./services/resumePdfService";

interface ResumeViewProps {
  resume: ResumeData;
}

export default function ResumeView({ resume }: ResumeViewProps) {
  const [downloading, setDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    try {
      setDownloading(true);
      setErrorMessage(null);
      await downloadResumePdf("resume-document", "Rabin_Glan.pdf");
    } catch (err) {
      console.error("Failed to generate resume PDF:", err);
      setErrorMessage(
        "Could not generate PDF directly in browser. Please use the Print button to Save as PDF."
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-dark-bg py-6 px-3 sm:px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Top Navigation & Action Bar */}
        <ResumeTopBar
          onDownload={handleDownloadPdf}
          downloading={downloading}
        />

        {/* Optional Error Notice */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center justify-between no-print">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-700 font-bold ml-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Paper Resume Sheet */}
        <div className="flex justify-center pb-12">
          <ResumeDocument resume={resume} />
        </div>
      </div>
    </main>
  );
}
