"use client";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

/** Chips editor for string[] fields (skills, technologies, task lists...). */
export default function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const tag = draft.trim();
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="hover:text-primary-900"
              aria-label={`Remove ${tag}`}
            >
              <CloseIcon fontSize="inherit" />
            </button>
          </span>
        ))}
        {value.length === 0 && (
          <span className="text-xs text-gray-400 italic">None added yet</span>
        )}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={placeholder || "Type and press Enter to add"}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600"
      />
    </div>
  );
}
