import type { Metadata } from "next";
import { getCachedResume } from "@/lib/data/cached-queries";
import ResumeView from "@/features/resume/ResumeView";

export const metadata: Metadata = {
  title: "Resume | Rabin Glan",
  description:
    "ATS-optimized professional resume of Rabin Glan, Full Stack Developer and Backend Engineer.",
};

export default async function ResumePage() {
  const resume = await getCachedResume();

  return <ResumeView resume={resume} />;
}
