"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChangeModeButton from "@/components/Button/ChangeModeButton";
import { pageList } from "@/app/pageList";
import useScrollToContext from "@/context/useScrollToContext";
import Title from "@/components/Title";
import { Chat } from "@mui/icons-material";

export default function Header() {
  const pathname = usePathname();
  const { handleScrollTo } = useScrollToContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/chat") {
    return null;
  }

  const checkIsActive = (page: (typeof pageList)[0]) => {
    if (page.isRoute) {
      return pathname.startsWith(`/${page.page}`);
    }
    return pathname === "/";
  };

  let headerBgClass = "bg-transparent py-4";
  if (isScrolled) {
    headerBgClass = "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-lg py-2";
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer" onClick={handleScrollTo("home")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/RG.png"
            alt="Rabin Glan - Full Stack Developer Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {pageList
            .filter((p) => p.showInHeader)
            .map((page) => {
              const isActive = checkIsActive(page);

              let underlineClass = "scale-x-0 group-hover:scale-x-100 opacity-60";
              if (isActive) {
                underlineClass = "scale-x-100 opacity-100";
              }

              return (
                <button
                  key={page.id}
                  onClick={handleScrollTo(page.page)}
                  className="hover:scale-110 transition-transform relative group px-2 py-1 cursor-pointer"
                >
                  <Title title={page.title} fontSize="1.5rem" />
                  <span
                    className={`absolute bottom-0 left-2 right-2 h-0.5 bg-primary-600 rounded-full transition-all duration-300 ${underlineClass}`}
                  />
                </button>
              );
            })}

          {/* Start Conversation CTA Button */}
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-sm transition-all cursor-pointer"
          >
            <Chat />
            <span>Start Conversation</span>
          </Link>

          <div className="pl-4">
            <ChangeModeButton />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <ChangeModeButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              )}
              {!mobileMenuOpen && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border animate-slide-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {pageList
              .filter((p) => p.showInHeader)
              .map((page) => {
                const isActive = checkIsActive(page);

                let mobileActiveClass = "hover:bg-gray-50 dark:hover:bg-dark-card/50";
                if (isActive) {
                  mobileActiveClass = "bg-primary-50 dark:bg-primary-950/40 border-l-4 border-primary-600 font-bold";
                }

                return (
                  <button
                    key={page.id}
                    onClick={(e) => {
                      handleScrollTo(page.page)(e);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-3 rounded-xl transition-all cursor-pointer ${mobileActiveClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <Title title={page.title} fontSize="1.5rem" />
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary-600 mr-2" />
                      )}
                    </div>
                  </button>
                );
              })}

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-xs transition-colors cursor-pointer"
            >
              <Chat />
              <span>Start Conversation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
