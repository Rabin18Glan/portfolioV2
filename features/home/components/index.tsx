import { About } from "./about";
import { Hero } from "./hero";
import { MyTimeline } from "./timeline";
import type { TimelineItemData } from "./timeline/components/TimelineMapping";

interface MainPageProps {
  heroData?: {
    name?: string;
    title?: string;
    description?: string;
    profile_image?: string;
  } | null;
  timelineItems?: TimelineItemData[];
}

export function MainPage({ heroData, timelineItems = [] }: MainPageProps) {
  return (
    <>
      <Hero heroData={heroData} />
      <About />
      <MyTimeline timelineItems={timelineItems} />
    </>
  );
}
