import { PageWrapper } from "@/layouts";
import TimelineMapping from "./TimelineMapping";
import type { TimelineItemData } from "./TimelineMapping";

interface MyTimelineProps {
  timelineItems?: TimelineItemData[];
}

export default function MyTimeline({ timelineItems = [] }: MyTimelineProps) {
  return (
    <PageWrapper id="timeline" title="Timeline" className="px-0">
      <TimelineMapping timelineItems={timelineItems} />
    </PageWrapper>
  );
}
