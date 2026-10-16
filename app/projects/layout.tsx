import { ReactNode } from "react";
import TitleUnderLined from "@/components/TitleUnderLined";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-dark-bg min-h-screen py-24 md:py-32 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-16">
        <TitleUnderLined title="Projects" />
        {children}
      </div>
    </div>
  );
}
