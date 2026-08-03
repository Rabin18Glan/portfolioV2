import Icon from "@/components/Icon"
import { JSX } from "react";

export interface TimelineItemData {
  date: string;
  title: string;
  taskDone: string;
  icon: JSX.Element;
}

type RawTimelineRow = {
  date: string;
  title: string;
  task_done?: string | null;
  icon_name?: string | null;
  icon_class?: string | null;
};

/** Fetches timeline items from the Supabase-backed API. */
export const fetchTimeline = async (): Promise<TimelineItemData[]> => {
  try {
    const res = await fetch("/api/timeline");
    if (!res.ok) throw new Error(`Failed to fetch timeline (${res.status})`);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map((item: RawTimelineRow): TimelineItemData => ({
      date: item.date,
      title: item.title,
      taskDone: item.task_done ?? "",
      icon: (
        <Icon
          name={item.icon_name ?? "devicon-nextjs-plain"}
          className={item.icon_class ?? ""}
        />
      ),
    }));
  } catch (err) {
    console.warn("Failed to fetch timeline from API:", err);
    return [];
  }
};
