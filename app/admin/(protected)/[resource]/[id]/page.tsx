"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getResource } from "@/features/admin/config";
import ResourceForm from "@/features/admin/components/ResourceForm";
import {
  AdminLoading,
  AdminError,
  AdminNotFound,
} from "@/features/admin/components/AdminStates";
import { getResourceRow, updateResource } from "@/features/admin/actions/crud";

type Row = Record<string, unknown>;

export default function EditResourcePage() {
  const params = useParams<{ resource: string; id: string }>();
  const router = useRouter();
  const resource = getResource(params.resource);

  const [record, setRecord] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resource) return;
    (async () => {
      try {
        setRecord(await getResourceRow(resource.key, params.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [resource?.key, params.id]);

  if (!resource || resource.single || resource.readonly) {
    return <AdminNotFound />;
  }

  const handleSave = async (values: Record<string, unknown>) => {
    await updateResource(resource.key, params.id, values);
    router.push(`/admin/${resource.key}`);
    router.refresh();
  };

  if (loading) return <AdminLoading />;
  if (error) return <AdminError message={error} />;
  if (!record) return <AdminError message="Record not found." />;

  return (
    <ResourceForm
      resource={resource}
      initial={record}
      submitLabel={`Update ${resource.label}`}
      onSave={handleSave}
    />
  );
}
