"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResource, type ResourceConfig } from "@/features/admin/config";
import { useAdminUI } from "@/context/AdminUIContext";
import DataTable from "@/features/admin/components/DataTable";
import ResourceForm from "@/features/admin/components/ResourceForm";
import { AdminLoading, AdminError, AdminNotFound } from "@/features/admin/components/AdminStates";
import {
  listResource,
  createResource,
  updateResource,
  deleteResource,
} from "@/features/admin/actions/crud";

type Row = Record<string, unknown>;

export default function ResourceListPage() {
  const params = useParams<{ resource: string }>();
  const router = useRouter();
  const { search } = useAdminUI();
  const resource = getResource(params.resource);

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!resource) return;
    setLoading(true);
    setError("");
    try {
      setRows(await listResource(resource.key));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [resource?.key]);

  useEffect(() => {
    void load();
  }, [load]);

  // Header search filters the list over the configured search keys.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    const keys = resource?.searchKeys ?? [];
    return rows.filter((row) =>
      keys.some((k) => String(row[k] ?? "").toLowerCase().includes(q))
    );
  }, [rows, search, resource]);

  if (!resource) return <AdminNotFound />;

  // Single-record resources (hero) render the form directly.
  if (resource.single) {
    return (
      <SingleResourceEditor
        resource={resource}
        row={rows[0]}
        loading={loading}
        error={error}
        onSaved={load}
      />
    );
  }

  const handleDelete = async (row: Row) => {
    await deleteResource(resource.key, String(row.id));
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{resource.label}</h2>
          <p className="text-sm text-gray-500">
            {filtered.length} of {rows.length} records
          </p>
        </div>
      </div>

      {error && <AdminError message={error} />}
      {loading ? (
        <AdminLoading />
      ) : (
        <DataTable resource={resource} rows={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}

function SingleResourceEditor({
  resource,
  row,
  loading,
  error,
  onSaved,
}: {
  resource: ResourceConfig;
  row?: Row;
  loading: boolean;
  error: string;
  onSaved: () => Promise<void>;
}) {
  const router = useRouter();

  const handleSave = async (values: Record<string, unknown>) => {
    if (row) {
      await updateResource(resource.key, String(row.id), values);
    } else {
      await createResource(resource.key, values);
    }
    await onSaved();
    router.refresh();
  };

  if (loading) return <AdminLoading />;
  if (error) return <AdminError message={error} />;

  return (
    <ResourceForm
      resource={resource}
      initial={row}
      submitLabel={row ? `Update ${resource.label}` : `Create ${resource.label}`}
      onSave={handleSave}
    />
  );
}
