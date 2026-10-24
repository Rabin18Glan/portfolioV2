function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row-reverse justify-center items-center gap-12">
        {/* Profile Image with decorative concentric rings */}
        <div className="relative z-20 flex-shrink-0 animate-pulse">
          <div className="relative p-3 rounded-full border border-primary-500/10 dark:border-primary-500/5">
            <div className="relative p-3 rounded-full border border-primary-500/20 dark:border-primary-500/10">
              <div className="relative p-2 rounded-full border-4 border-primary-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full bg-gray-200 dark:bg-gray-700/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info matching ProfileInfo layout */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-auto animate-pulse">
          <div className="h-6 w-36 bg-primary-200/60 dark:bg-primary-900/40 rounded-full mb-3" />
          <div className="h-12 md:h-14 w-64 md:w-80 bg-gray-200 dark:bg-gray-700/60 rounded-xl mb-4" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-1 bg-primary-600 rounded-full" />
            <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700/60 rounded-lg" />
          </div>
          <div className="space-y-2.5 max-w-xl mb-8 w-full">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700/40 rounded" />
            <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-700/40 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700/40 rounded" />
          </div>
          <div className="flex gap-5 justify-center md:justify-start">
            <div className="h-12 w-32 bg-primary-600/30 rounded-full" />
            <div className="h-12 w-32 border-2 border-primary-600/30 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSkeleton() {
  return (
    <section className="relative w-full overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg py-24 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-16 animate-pulse">
        {/* Title matching TitleUnderLined */}
        <div className="inline-flex flex-col items-start gap-2">
          <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700/60 rounded-xl" />
          <div className="flex items-center gap-1.5">
            <div className="w-9 h-2 rounded-full bg-primary-600/50" />
            <div className="w-7 h-2 rounded-full border-2 border-primary-600/50 bg-transparent" />
          </div>
        </div>

        {/* Content paragraphs */}
        <div className="space-y-4 max-w-2xl text-center w-full">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700/40 rounded" />
          <div className="h-4 w-5/6 mx-auto bg-gray-200 dark:bg-gray-700/40 rounded" />
          <div className="h-4 w-4/6 mx-auto bg-gray-200 dark:bg-gray-700/40 rounded pt-2" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-5 font-semibold">
          <div className="h-12 w-36 bg-primary-600/30 rounded-full" />
          <div className="h-12 w-36 border-2 border-primary-600/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function TimelineSkeleton() {
  const items = [1, 2, 3];

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-500 bg-white dark:bg-dark-bg py-24 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-16 animate-pulse">
        {/* Title matching TitleUnderLined */}
        <div className="inline-flex flex-col items-start gap-2">
          <div className="h-12 w-44 bg-gray-200 dark:bg-gray-700/60 rounded-xl" />
          <div className="flex items-center gap-1.5">
            <div className="w-9 h-2 rounded-full bg-primary-600/50" />
            <div className="w-7 h-2 rounded-full border-2 border-primary-600/50 bg-transparent" />
          </div>
        </div>

        {/* Timeline body matching TimelineMapping */}
        <div className="relative flex flex-col gap-12 py-10 w-full max-w-7xl mx-auto px-4">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-gray-700/50 transform md:-translate-x-1/2 rounded-full" />

          <div className="text-center mb-8 relative z-20">
            <div className="inline-block h-4 w-28 bg-primary-600/30 rounded" />
          </div>

          {items.map((id, index) => {
            const isLeft = index % 2 === 0;
            let alignmentClass = "md:text-left md:pl-8";
            let directionClass = "md:flex-row-reverse";

            if (isLeft) {
              alignmentClass = "md:text-right md:pr-8";
              directionClass = "md:flex-row";
            }

            return (
              <div key={id} className={`relative flex md:items-center ${directionClass}`}>
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${alignmentClass}`}>
                  <div className="p-6 bg-white dark:bg-dark-card/90 rounded-2xl border border-gray-100 dark:border-dark-border shadow-md space-y-3">
                    <div className="h-4 w-20 bg-primary-600/30 rounded" />
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700/60 rounded" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700/40 rounded" />
                  </div>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md border-2 border-white dark:border-dark-bg z-20" />
                </div>

                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomeLoading() {
  return (
    <main className="flex-grow">
      <HeroSkeleton />
      <AboutSkeleton />
      <TimelineSkeleton />
    </main>
  );
}
