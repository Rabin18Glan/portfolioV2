import { ReactNode } from "react";

interface AnimationWrapperProps {
  children?: ReactNode;
  className?: string;
  animationClass?: string;
  duration?: string;
  threshold?: number;
}

export default function AnimationWrapper({
  children,
  className = "",
}: AnimationWrapperProps) {
  return (
    <div className={`transition-all duration-300 ease-out ${className}`}>
      {children}
    </div>
  );
}
