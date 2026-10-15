"use client";

import useScrollToContext from "@/context/useScrollToContext";
import { pageList } from "./pageList";

export default function ClientMain() {
  const { sectionsRefs } = useScrollToContext();
  const homeSections = pageList.filter((page) => !page.isRoute);

  return (
    <>
      {homeSections.map((page) => (
        <div
          key={page.id}
          ref={(el) => {
            if (sectionsRefs) sectionsRefs.current[page.page] = el;
          }}
          id={page.page}
          className="bg-white dark:bg-dark-bg transition-colors duration-500"
        >
          {page.pageSection}
        </div>
      ))}
    </>
  );
}
