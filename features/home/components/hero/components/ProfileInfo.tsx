import Title from "@/components/Title";
import Buttons from "./Buttons";

interface ProfileInfoProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function ProfileInfo({
  name = "Rabin Glan",
  title = "Full Stack Developer",
  description = `"Join me on this digital odyssey, where creativity meets functionality, and every project is a testament to my commitment to excellence. Let's build something extraordinary together!"`,
}: ProfileInfoProps) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 transition-all duration-300">
      <p className="text-xl md:text-2xl font-bold text-primary-600 mb-2 uppercase tracking-widest">
        Hello, I&apos;m
      </p>

      <h1 className="mb-4">
        <Title title={name} />
      </h1>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-1 bg-primary-600 rounded-full" />
        <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold tracking-wide">
          {title}
        </h2>
      </div>

      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mb-8 leading-relaxed font-normal">
        {description}
      </p>

      <Buttons />
    </div>
  );
}
