"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldConfig, ResourceConfig } from "@/features/admin/config";
import ImageUpload from "./fields/ImageUpload";
import TagInput from "./fields/TagInput";
import JsonInput from "./fields/JsonInput";
import LinksInput, { type ButtonLink } from "./fields/LinksInput";
import { uploadFile } from "@/features/admin/actions/upload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";

function defaultValue(field: FieldConfig): unknown {
  switch (field.type) {
    case "number":
      return 0;
    case "boolean":
      return false;
    case "tags":
      return [];
    case "images":
      return [];
    case "links":
      return [];
    case "json":
      return null;
    default:
      return "";
  }
}

export function buildInitialValues(
  resource: ResourceConfig,
  initial?: Record<string, unknown> | null
): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const f of resource.fields) values[f.name] = defaultValue(f);
  if (initial) {
    for (const f of resource.fields) {
      const v = initial[f.name];
      if (v !== undefined && v !== null) values[f.name] = v;
    }
  }
  return values;
}

export default function ResourceForm({
  resource,
  initial,
  submitLabel,
  onSave,
  onCancel,
}: {
  resource: ResourceConfig;
  initial?: Record<string, unknown> | null;
  submitLabel?: string;
  onSave: (values: Record<string, unknown>) => Promise<void>;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    buildInitialValues(resource, initial)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const setValue = (name: string, v: unknown) =>
    setValues((prev) => ({ ...prev, [name]: v }));

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    for (const f of resource.fields) {
      if (f.required) {
        const v = values[f.name];
        const empty =
          v === undefined ||
          v === null ||
          v === "" ||
          (Array.isArray(v) && v.length === 0);
        if (empty) errs[f.name] = `${f.label} is required`;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setFormError("");
    try {
      await onSave(values);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={handleCancel}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowBackIcon fontSize="small" />
          </button>
          <h2 className="text-xl font-bold text-gray-900 truncate">
            {submitLabel ?? `Edit ${resource.label}`}
          </h2>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 disabled:opacity-50 flex-shrink-0"
        >
          <SaveIcon fontSize="small" />
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {formError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">
          <ErrorOutlineIcon fontSize="small" />
          {formError}
        </div>
      )}

      {/* Fields — full page width, no card */}
      <div className="space-y-6">
        {resource.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(v) => setValue(field.name, v)}
            error={errors[field.name]}
          />
        ))}
      </div>
    </form>
  );
}

/* ---------------------------------------------------------------------------
 * Field renderer
 * ------------------------------------------------------------------------- */

function Field({
  field,
  value,
  onChange,
  error,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (v: unknown) => void;
  error?: string;
}) {
  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-600/30 focus:border-primary-600";

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {field.label}
        {field.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {field.type === "text" && (
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          className={inputClass}
        />
      )}

      {field.type === "number" && (
        <input
          type="number"
          value={value === undefined || value === null ? "" : String(value)}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={inputClass}
        />
      )}

      {field.type === "boolean" && (
        <label className="inline-flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded accent-primary-600"
          />
          <span className="text-sm text-gray-600">{value ? "Yes" : "No"}</span>
        </label>
      )}

      {field.type === "select" && (
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          {field.placeholder !== undefined && <option value="">{field.placeholder}</option>}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o || "(none)"}
            </option>
          ))}
        </select>
      )}

      {field.type === "image" && (
        <ImageUpload
          value={(value as string) ?? ""}
          onChange={(v) => onChange(v)}
          bucket={field.bucket}
        />
      )}

      {field.type === "images" && (
        <ImagesEditor value={(value as string[]) ?? []} onChange={(v) => onChange(v)} />
      )}

      {field.type === "tags" && (
        <TagInput value={(value as string[]) ?? []} onChange={(v) => onChange(v)} />
      )}

      {field.type === "links" && (
        <LinksInput
          value={(value as ButtonLink[]) ?? []}
          onChange={(v) => onChange(v)}
        />
      )}

      {field.type === "json" && <JsonInput value={value} onChange={(v) => onChange(v)} />}

      {field.help && <p className="mt-1 text-xs text-gray-500">{field.help}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Multiple image upload editor (projects.images)
 * ------------------------------------------------------------------------- */

function ImagesEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", "rabin");
        formData.append("folder", "projects");
        const { url } = await uploadFile(formData);
        uploaded.push(url);
      }
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt={`image ${i + 1}`}
              className="w-20 h-20 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
              aria-label={`Remove image ${i + 1}`}
            >
              <CloseIcon fontSize="inherit" />
            </button>
          </div>
        ))}
        {value.length === 0 && (
          <span className="text-xs text-gray-400 italic">No images yet</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      >
        <UploadIcon fontSize="small" />
        {uploading ? "Uploading…" : "Add images"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
