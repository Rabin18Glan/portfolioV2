"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useScrollToContext from "@/context/useScrollToContext";

export default function NotFoundContent() {
  const router = useRouter();
  const { handleScrollTo } = useScrollToContext();

  useEffect(() => {
    document.title = "404 - Page Not Found | Rabin Glan";
  }, []);

  const quickLinks = [
    {
      title: "Home",
      description: "Return to the main overview and welcome section.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      action: () => router.push("/"),
    },
    {
      title: "Featured Projects",
      description: "Browse deployed web apps, mobile systems & open source work.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      action: (e: React.MouseEvent<HTMLButtonElement>) => handleScrollTo("projects")(e),
    },
    {
      title: "About Me",
      description: "Get to know my engineering background, skills & journey.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      action: (e: React.MouseEvent<HTMLButtonElement>) => handleScrollTo("about")(e),
    },
    {
      title: "Get in Touch",
      description: "Start a conversation, discuss a project, or hire me.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: (e: React.MouseEvent<HTMLButtonElement>) => handleScrollTo("contact")(e),
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary-50 dark:bg-primary-900/30 text-primary-600 border border-primary-200/80 dark:border-primary-800/40 shadow-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600" />
          </span>
          <span>Error 404 &bull; Page Not Found</span>
        </motion.div>

        {/* 404 Large Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
          className="flex items-center justify-center font-black select-none tracking-tight my-2"
        >
          <span className="text-primary-600 text-8xl sm:text-9xl md:text-[12rem] leading-none drop-shadow-sm">
            4
          </span>
          <span className="text-transparent [-webkit-text-stroke:2px_var(--primary-600)] sm:[-webkit-text-stroke:3px_var(--primary-600)] md:[-webkit-text-stroke:4px_var(--primary-600)] text-8xl sm:text-9xl md:text-[12rem] leading-none mx-2 drop-shadow-sm">
            0
          </span>
          <span className="text-primary-600 text-8xl sm:text-9xl md:text-[12rem] leading-none drop-shadow-sm">
            4
          </span>
        </motion.div>

        {/* Heading & Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Lost in the Digital Odyssey
          </h1>
          <p className="max-w-xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-8">
            The page you are looking for doesn&apos;t exist, has been relocated, or is temporarily unavailable in this sector of cyberspace.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 hover:-translate-y-0.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl text-sm font-semibold bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Link Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-100 dark:border-dark-border"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600 mb-6">
            Helpful Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {quickLinks.map((item) => (
              <button
                key={item.title}
                onClick={item.action}
                className="group p-5 rounded-2xl bg-gray-50/80 dark:bg-dark-card/60 hover:bg-white dark:hover:bg-dark-card border border-gray-200/60 dark:border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary-100/70 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Navigate</span>
                  <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
