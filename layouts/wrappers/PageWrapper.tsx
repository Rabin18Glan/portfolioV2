import { ReactNode } from "react";
import TitleUnderLined from "@/components/TitleUnderLined";
import AnimationWrapper from "./AnimationWrapper";
import Section from "./Section";

interface PageWrapperProps {
  children?: ReactNode;
  id: string;
  title: string;
  className?: string;
  contentWidth?: "constrained" | "full";
}

function PageWrapper({
  children,
  id,
  title,
  className = "",
  contentWidth = "constrained",
}: PageWrapperProps) {
  let headingLevel: "h1" | "h2" = "h2";
  if (id === "contact") {
    headingLevel = "h1";
  }

  return (
    <Section
      id={id}
      className={className}
      contentWidth={contentWidth}
      containerClassName="flex flex-col items-center gap-16"
    >
      <AnimationWrapper animationClass="animate-slide-in-down opacity-100">
        <TitleUnderLined title={title} as={headingLevel} />
      </AnimationWrapper>
      {children}
    </Section>
  );
}

export default PageWrapper;
