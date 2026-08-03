"use client";

import { useRef, useState } from "react";
import { uploadFile } from "@/features/admin/actions/upload";
import ImageIcon from "@mui/icons-material/Image";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function resolveAssetUrl(value: string): string | null {
  if (!value) return null;
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url ? `${url}/storage/v1/object/public/rabin/${value}` : value;
}

/**
 * Single file upload. Uploads to the Supabase 'rabin' bucket via the admin
 * upload API and stores the returned public URL as the field value.
 */
export default function ImageUpload({
  value,
  onChange,
  bucket = "rabin",
  folder = "uploads",
}: {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);
      formData.append("folder", folder);
      const { url } = await uploadFile(formData);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const url = resolveAssetUrl(value);
  const isPdf = value.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-2">
      {url ? (
        <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-gray-50">
          {isPdf ? (
            <div className="w-14 h-14 rounded-md bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <PictureAsPdfIcon />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="preview"
              className="w-14 h-14 object-cover rounded-md border border-gray-200"
            />
          )}
          <span className="flex-1 text-xs text-gray-600 truncate">{value}</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1.5 rounded-md text-gray-500 hover:bg-red-100 hover:text-red-600"
            aria-label="Remove file"
          >
            <DeleteIcon fontSize="small" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-500 text-sm">
          <ImageIcon fontSize="small" />
          <span>No file uploaded</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
      >
        <UploadIcon fontSize="small" />
        {uploading ? "Uploading…" : "Upload file"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFile}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
