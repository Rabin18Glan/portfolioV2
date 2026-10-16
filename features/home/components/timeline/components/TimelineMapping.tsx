import Icon from "@/components/Icon";

export interface TimelineItemData {
  id?: number;
  date: string;
  title: string;
  taskDone: string;
  iconName?: string | null;
  iconClass?: string | null;
}

interface TimelineMappingProps {
  timelineItems: TimelineItemData[];
}

export default function TimelineMapping({ timelineItems }: TimelineMappingProps) {
  return (
    <div className="relative flex flex-col gap-12 py-10 w-full max-w-7xl mx-auto px-4">
      {/* Vertical Line - Gold Gradient */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-300 via-primary-500 to-primary-800 dark:from-primary-500/60 dark:via-primary-600/60 dark:to-primary-900 transform md:-translate-x-1/2 rounded-full opacity-70"></div>

      <div className="text-center mb-8 relative z-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/15 text-primary-700 dark:text-primary-300 border border-primary-300/60 dark:border-primary-500/30 text-sm font-bold uppercase tracking-widest shadow-sm">
          My Journey
        </span>
      </div>

      {timelineItems.map((data, index) => {
        const isLeft = index % 2 === 0;
        let alignmentClass = "md:text-left md:pl-8";
        let directionClass = "md:flex-row-reverse";

        if (isLeft) {
          alignmentClass = "md:text-right md:pr-8";
          directionClass = "md:flex-row";
        }

        return (
          <div
            key={data.id ?? index}
            className={`relative flex md:items-center ${directionClass}`}
          >
            {/* Content Card Side */}
            <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${alignmentClass}`}>
              <div className="group relative rounded-2xl p-px bg-gradient-to-br from-primary-400/60 via-gray-200/60 to-primary-600/40 dark:from-primary-500/40 dark:via-dark-border dark:to-primary-700/30 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative p-6 bg-white dark:bg-dark-card/90 rounded-[calc(1rem-1px)] border border-gray-100 dark:border-dark-border overflow-hidden">
                  <span className="relative inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-primary-700 dark:text-primary-300 uppercase bg-primary-100 dark:bg-primary-500/15 border border-primary-300/60 dark:border-primary-500/30 rounded-full">
                    {data.date}
                  </span>
                  <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {data.title}
                  </h3>
                  <p className="relative text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {data.taskDone}
                  </p>
                </div>
              </div>
            </div>

            {/* Central Node Badge with Icon */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg border-2 border-white dark:border-dark-bg z-20 text-white text-base">
                <Icon
                  name={data.iconName ?? "devicon-nextjs-plain"}
                  className={data.iconClass ?? "text-white"}
                />
              </div>
            </div>

            {/* Empty space on opposite side for desktop layout */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </div>
        );
      })}
    </div>
  );
}
