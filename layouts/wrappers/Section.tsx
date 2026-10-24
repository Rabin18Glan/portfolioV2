import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  showGlow?: boolean;
  fullHeight?: boolean;
  contentWidth?: "constrained" | "full";
}

export default function Section({
  children,
  id,
  className = "",
  containerClassName = "",
  showGlow = false,
  fullHeight = false,
  contentWidth = "constrained",
}: SectionProps) {
  let heightClass = "py-24 md:py-32";
  if (fullHeight) {
    heightClass = "min-h-screen flex items-center";
  }

  let widthClass = "px-0";
  if (contentWidth === "constrained") {
    widthClass = "max-w-7xl mx-auto px-6 md:px-12 lg:px-16";
  }

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg ${heightClass} ${className}`}
    >
      

      <div className={`w-full transition-all duration-300 ${widthClass} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
