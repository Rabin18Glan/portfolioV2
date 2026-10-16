import Title from "./Title";

function TitleUnderLined({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center">
      <Title title={title} />
      <div className="flex mt-2">
        <div className="w-8 h-2 bg-primary-600" />
        <div className="w-8 h-2 border border-primary-600 bg-transparent" />
      </div>
    </div>
  );
}

export default TitleUnderLined;
