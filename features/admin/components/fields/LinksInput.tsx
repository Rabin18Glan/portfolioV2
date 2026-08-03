"use client";

import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export interface ButtonLink {
  name: string;
  link: string;
}

/**
 * Repeatable name + URL editor for the project "Button Links" field.
 * Stores [{ name, link }] — the same shape the project cards render.
 */
export default function LinksInput({
  value,
  onChange,
  placeholder = "https://…",
}: {
  value: ButtonLink[];
  onChange: (value: ButtonLink[]) => void;
  placeholder?: string;
}) {
  const update = (index: number, patch: Partial<ButtonLink>) => {
    onChange(value.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {value.length === 0 && (
        <p className="text-xs text-gray-400 italic">No buttons yet</p>
      )}
      {value.map((row, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white"
        >
          <input
            value={row.name}
            onChange={(e) => update(i, { name: e.target.value })}
            placeholder="Button name"
            className="w-full sm:w-48 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600"
          />
          <input
            value={row.link}
            onChange={(e) => update(i, { link: e.target.value })}
            placeholder={placeholder}
            type="url"
            className="w-full flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600"
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="p-2 rounded-lg text-gray-400 hover:bg-red-100 hover:text-red-600 flex-shrink-0 self-end sm:self-auto"
            aria-label={`Remove button ${i + 1}`}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, { name: "", link: "" }])}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-dashed border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-100"
      >
        <AddIcon fontSize="small" />
        Add button
      </button>
    </div>
  );
}
