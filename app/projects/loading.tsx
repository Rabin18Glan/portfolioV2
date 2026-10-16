export default function ProjectsLoading() {
  const tabsPlaceholder = ["All", "Professional", "Personal"];
  const cardsPlaceholder = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex flex-col gap-10 w-full max-w-7xl mx-auto px-4">
      {/* Tabs placeholder */}
      <div className="flex justify-center px-4">
        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-gray-100 dark:bg-dark-card/90 rounded-2xl border border-gray-200/80 dark:border-dark-border animate-pulse">
          {tabsPlaceholder.map((tab) => (
            <div
              key={tab}
              className="px-5 py-2 rounded-xl text-xs font-bold text-transparent bg-gray-200 dark:bg-gray-700/50"
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {cardsPlaceholder.map((id) => (
          <div
            key={id}
            className="relative w-full rounded-3xl p-px bg-gradient-to-br from-gray-200/60 via-gray-100 to-gray-200/50 dark:from-dark-border dark:via-dark-card dark:to-dark-border shadow-md"
          >
            <div className="relative flex flex-col bg-white dark:bg-dark-card/90 rounded-[calc(1.5rem-1px)] border border-gray-100 dark:border-dark-border overflow-hidden h-full animate-pulse">
              <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700/50" />
              <div className="p-7 flex flex-col gap-3 flex-grow">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700/60 rounded-md" />
                <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700/40 rounded" />
                <div className="space-y-1.5 py-1">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-700/40 rounded" />
                  <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700/40 rounded" />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                  <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700/40 rounded" />
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700/40 rounded" />
                  <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700/40 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
