"use client";

import { useState } from "react";

/**
 * jsonb editor. Holds a pretty-printed JSON string and only emits parsed
 * values to the form once the text is valid (on blur / submit click).
 */
export default function JsonInput({
  value,
  onChange,
  placeholder,
}: {
  value: unknown;
  onChange: (value: unknown) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState<string>(
    value === undefined || value === null ? "" : JSON.stringify(value, null, 2)
  );
  const [error, setError] = useState("");

  const handleBlur = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("");
      onChange(null);
      return;
    }
    try {
      onChange(JSON.parse(trimmed));
      setError("");
    } catch {
      setError("Invalid JSON");
    }
  };

  return (
    <div className="space-y-1">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        rows={6}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded-lg border font-mono text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
