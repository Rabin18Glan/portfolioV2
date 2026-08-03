"use client";

import Link from "next/link";
import { useState } from "react";
import type { ColumnConfig, ResourceConfig } from "@/features/admin/config";
import ConfirmDialog from "./ConfirmDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import InboxIcon from "@mui/icons-material/Inbox";

type Row = Record<string, unknown>;

function resolveUrl(value: string): string {
  if (/^https?:\/\//.test(value) || value.startsWith("/")) return value;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/rabin/${value}`;
}

function Cell({ column, value }: { column: ColumnConfig; value: unknown }) {
  switch (column.type) {
    case "image": {
      const first = Array.isArray(value) ? value[0] : value;
      if (!first) {
        return (
          <span className="text-gray-300">
            <ImageIcon fontSize="small" />
          </span>
        );
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolveUrl(String(first))}
          alt=""
          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
        />
      );
    }
    case "tags":
      return (
        <span className="text-xs text-gray-600">
          {(value as string[])?.slice(0, 3).join(", ") ?? "—"}
        </span>
      );
    case "boolean":
      return value ? (
        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          Yes
        </span>
      ) : (
        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold">
          No
        </span>
      );
    case "number":
      return <span className="text-sm text-gray-700">{String(value ?? "—")}</span>;
    case "datetime":
      return (
        <span className="text-xs text-gray-500">
          {value ? new Date(String(value)).toLocaleString() : "—"}
        </span>
      );
    default:
      return (
        <span className="text-sm text-gray-700 block truncate max-w-[220px]">
          {String(value ?? "—")}
        </span>
      );
  }
}

export default function DataTable({
  resource,
  rows,
  onDelete,
}: {
  resource: ResourceConfig;
  rows: Row[];
  onDelete: (row: Row) => Promise<void>;
}) {
  const [pending, setPending] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const handleConfirm = async () => {
    if (!pending) return;
    setDeleting(true);
    setDeleteError("");
    try {
      await onDelete(pending);
      setPending(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const displayName = (row: Row) =>
    String(
      row.name ??
        row.label ??
        row.title ??
        row.client_name ??
        (row.id !== undefined ? `#${row.id}` : "this item")
    );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {resource.columns.map((c) => (
                  <th
                    key={c.key}
                    className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-500"
                  >
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={resource.columns.length + 1}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    <InboxIcon className="mb-2" />
                    <p className="text-sm">No records found</p>
                  </td>
                </tr>
              )}
              {rows.map((row) => (
                <tr key={String(row.id)} className="border-b border-gray-100 hover:bg-gray-50">
                  {resource.columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      <Cell column={c} value={row[c.key]} />
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      {!resource.single && !resource.readonly && (
                        <Link
                          href={`/admin/${resource.key}/${row.id}`}
                          className="p-2 rounded-lg text-gray-500 hover:bg-primary-100 hover:text-primary-700"
                          aria-label="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </Link>
                      )}
                      {!resource.single && (
                        <button
                          onClick={() => {
                            setDeleteError("");
                            setPending(row);
                          }}
                          className="p-2 rounded-lg text-gray-500 hover:bg-red-100 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={!!pending}
        title={`Delete ${resource.label.toLowerCase()}?`}
        message={`This will permanently delete "${displayName(pending ?? {})}". This action cannot be undone.`}
        onCancel={() => setPending(null)}
        onConfirm={handleConfirm}
        busy={deleting}
        error={deleteError}
      />
    </>
  );
}
