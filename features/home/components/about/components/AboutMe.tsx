import { AnimationWrapper } from "@/layouts/wrappers";

interface AboutMeProps {
  body?: string;
}

const DEFAULT_PARAGRAPHS = [
  "I'm a developer studying Computer Science and IT, blending tech expertise with a musical touch for a harmonious approach to problem-solving.",
  "Join me on this epic quest through the binary jungles and digital dungeons!",
];

function AboutContent({ body }: AboutMeProps) {
  const paragraphs = body
    ? body
        .split("\n\n")
        .map((p) => p.trim())
        .filter(Boolean)
    : DEFAULT_PARAGRAPHS;

  return (
    <>
      {paragraphs.map((para, index) => {
        const isLast = index === paragraphs.length - 1 && paragraphs.length > 1;

        if (isLast) {
          return (
            <AnimationWrapper
              key={index}
              animationClass="animate-slide-in-up opacity-100"
              className="px-10"
            >
              <p className="font-bold font-cursive text-gray-900 dark:text-gray-100">
                {para}
              </p>
            </AnimationWrapper>
          );
        }

        return (
          <AnimationWrapper
            key={index}
            animationClass="ease-in-out opacity-100"
          >
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {para}
            </p>
          </AnimationWrapper>
        );
      })}
    </>
  );
}

export default AboutContent;
