import Title from "./Title";

interface TitleUnderLinedProps {
  title: string;
  as?: "h1" | "h2" | "h3" | "h4" | "div";
}

function TitleUnderLined({ title, as = "h2" }: TitleUnderLinedProps) {
  const HeadingTag = as;

  return (
    <HeadingTag className="flex flex-col items-center">
      <Title title={title} />
      <span className="flex mt-2" aria-hidden="true">
        <span className="w-8 h-2 bg-primary-600" />
        <span className="w-8 h-2 border border-primary-600 bg-transparent" />
      </span>
    </HeadingTag>
  );
}

export default TitleUnderLined;
