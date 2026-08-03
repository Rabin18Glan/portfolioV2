
"use client";

import React, { createContext, MouseEventHandler, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { pageList } from "@/app/pageList";

interface ScrollToContextType {
  sectionsRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }> | null;
  handleScrollTo: (page: string) => MouseEventHandler<HTMLAnchorElement|HTMLButtonElement>;
}

const ScrollToContext = createContext<ScrollToContextType>({
  sectionsRefs: null,
  handleScrollTo: () => () => {},
});

const ScrollToProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sectionsRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && pathname === '/') {
          const section = sectionsRefs.current[hash];
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      window.addEventListener('hashchange', handleHashChange);
      handleHashChange();
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [pathname]);

  const handleScrollTo = (page: string): MouseEventHandler<HTMLAnchorElement|HTMLButtonElement> => {
    return (event) => {
      event.preventDefault(); 
      
      const pageInfo = pageList.find(p => p.page === page);
      
      if (pageInfo?.isRoute) {
        router.push(`/${page}`);
        return;
      }

      if (pathname !== '/') {
        router.push(`/#${page}`);
      } else {
        const section = sectionsRefs.current[page];
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `#${page}`);
        }
      }
    };
  };

  return (
    <ScrollToContext.Provider value={{ sectionsRefs, handleScrollTo }}>
      {children}
    </ScrollToContext.Provider>
  );
};

export default ScrollToProvider;
export { ScrollToContext };
