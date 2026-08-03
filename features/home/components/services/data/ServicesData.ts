export interface ServiceDataProps {
  title: string;
  skills: Array<string>;
}

type RawServiceRow = {
  title: string;
  skills?: string[] | null;
};

/** Fetches services from the Supabase-backed API. */
export const fetchServices = async (): Promise<ServiceDataProps[]> => {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((s: RawServiceRow) => ({
      title: s.title,
      skills: s.skills ?? [],
    }));
  } catch (err) {
    console.warn("Failed to fetch services from API:", err);
    return [];
  }
};
