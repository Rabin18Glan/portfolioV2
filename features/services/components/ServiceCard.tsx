import CircularLogo from "@/components/CircularLogo";
import Title from "@/components/Title";

interface ServiceCardProps {
  title: string;
  skills: string[];
}

export default function ServiceCard({ title, skills }: ServiceCardProps) {
  const parts = title.split(" ");
  const title1 = parts[0];
  const title2 = parts.slice(1).join(" ");

  return (
    <div className="group relative w-full rounded-3xl p-px bg-gradient-to-br from-primary-400/60 via-gray-200/60 to-primary-600/40 dark:from-primary-500/40 dark:via-dark-border dark:to-primary-700/30 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-white dark:bg-dark-card/90 border border-gray-100 dark:border-dark-border px-6 py-10 overflow-hidden flex flex-col justify-between">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-primary-600 dark:bg-primary-500" />

        <div className="relative flex flex-col items-center gap-6">
          <div className="flex flex-col items-center text-center">
            <Title fontSize="26px" title={title1} />
            {title2 && <Title fontSize="26px" title={title2} />}
          </div>

          <div className="w-12 h-px bg-gray-200 dark:bg-dark-border" />

          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((logo, index) => (
              <CircularLogo
                key={index}
                logo={logo}
                className="border border-primary-600/20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
