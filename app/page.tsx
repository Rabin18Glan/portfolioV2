import { getCachedHomeData } from "@/lib/data";
import { MainPage } from "@/features/home/components";

export const revalidate = 3600;

export default async function Page() {
  const { heroData, timelineItems } = await getCachedHomeData();

  return (
    <main className="flex-grow">
      <div id="home" className="bg-white dark:bg-dark-bg transition-colors duration-500">
        <MainPage heroData={heroData} timelineItems={timelineItems} />
      </div>
    </main>
  );
}
