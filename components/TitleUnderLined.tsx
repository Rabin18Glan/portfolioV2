import Title from "./Title";

interface TitleUnderLinedProps {
  title: string;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
}

function TitleUnderLined({ title, as = "h2" }: TitleUnderLinedProps) {
  const HeadingTag = as;

  return (
    <HeadingTag className="inline-flex flex-col items-start group/title select-none">
      <Title title={title} />
      <span className="flex items-center gap-1 mt-2" aria-hidden="true">
        {/* Solid rounded pill with subtle glow and hover stretch */}
        <span className="w-9 h-2 rounded-full bg-primary-600 shadow-[0_0_10px_rgba(27,41,58,0.25)] dark:shadow-[0_0_12px_rgba(200,162,75,0.35)] transition-all duration-300 " />
        {/* Outlined pill with rounded edges and expand-on-hover */}
        <span className="w-7 h-2 rounded-full border-2 border-primary-600 bg-transparent transition-all duration-300" />
      </span>
    </HeadingTag>
  );
}

export default TitleUnderLined;
