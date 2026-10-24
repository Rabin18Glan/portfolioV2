"use client";

import { Brightness2Outlined, Brightness7Rounded } from "@mui/icons-material";
import { useColorMode } from "@/context/colorModeContext";

interface ChangeModeButtonProps {
  className?: string;
}

export default function ChangeModeButton({ className = "" }: ChangeModeButtonProps) {
  const { isDark, toggleColorMode } = useColorMode();

  const handleMode = () => {
    document.documentElement.classList.toggle("dark");
    toggleColorMode();
  };

  return (
    <button
      onClick={handleMode}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center p-1 md:p-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none ${className}`}
    >
      {isDark ? (
        <Brightness7Rounded sx={{ fontSize: { xs: "18px", md: "24px" }, color: "inherit" }} />
      ) : (
        <Brightness2Outlined sx={{ fontSize: { xs: "18px", md: "24px" }, color: "inherit" }} />
      )}
    </button>
  );
}
