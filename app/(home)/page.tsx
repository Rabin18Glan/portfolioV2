import { getCachedHomeData } from "@/lib/data";
import { MainPage } from "@/features/home/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rabin Glan | Full Stack Developer & Software Engineer",
  description:
    "Official portfolio of Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter, and Node.js. Discover my background, career timeline, and skills.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rabin Glan | Full Stack Developer & Software Engineer",
    description:
      "Official portfolio of Rabin Glan - Full Stack Developer specializing in React, Next.js, Django, Flutter, and Node.js.",
    url: "/",
    type: "website",
  },
};

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
