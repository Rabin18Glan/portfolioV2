"use client";

import { useParams, useRouter } from "next/navigation";
import { getResource } from "@/features/admin/config";
import ResourceForm from "@/features/admin/components/ResourceForm";
import { AdminNotFound } from "@/features/admin/components/AdminStates";
import { createResource } from "@/features/admin/actions/crud";

export default function NewResourcePage() {
  const params = useParams<{ resource: string }>();
  const router = useRouter();
  const resource = getResource(params.resource);

  if (!resource || resource.single || resource.readonly) {
    return <AdminNotFound />;
  }

  const handleSave = async (values: Record<string, unknown>) => {
    await createResource(resource.key, values);
    router.push(`/admin/${resource.key}`);
    router.refresh();
  };

  return (
    <ResourceForm
      resource={resource}
      submitLabel={`Create ${resource.label}`}
      onSave={handleSave}
    />
  );
}
