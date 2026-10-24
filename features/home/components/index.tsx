import { About } from "./about";
import { Hero } from "./hero";
import { MyTimeline } from "./timeline";
import type { TimelineItemData } from "./timeline/components/TimelineMapping";
import type { AboutData, HeroData } from "@/lib/data/cached-queries";

interface MainPageProps {
  heroData?: HeroData | null;
  aboutData?: AboutData | null;
  timelineItems?: TimelineItemData[];
}

export function MainPage({
  heroData,
  aboutData,
  timelineItems = [],
}: MainPageProps) {
  return (
    <>
      <Hero heroData={heroData} />
      <About aboutData={aboutData} />
      <MyTimeline timelineItems={timelineItems} />
    </>
  );
}
