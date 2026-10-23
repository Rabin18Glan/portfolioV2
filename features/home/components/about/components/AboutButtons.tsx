"use client";

import { useRouter } from "next/navigation";
import FilledButton from "@/components/Button/FilledButton";
import StrokedButton from "@/components/Button/StrokedButton";
import useScrollToContext from "@/context/useScrollToContext";
import { AnimationWrapper } from "@/layouts/wrappers";

function AboutButtons() {
  const router = useRouter();
  const { handleScrollTo } = useScrollToContext();

  return (
    <AnimationWrapper animationClass="animate-slide-in-up opacity-100">
      <div className="flex gap-5 font-semibold">
        <FilledButton onClick={handleScrollTo("projects")} title="See Projects" />
        <StrokedButton onClick={() => router.push("/resume")} title="See Resume" />
      </div>
    </AnimationWrapper>
  );
}

export default AboutButtons;
