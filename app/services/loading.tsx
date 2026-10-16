export default function ServicesLoading() {
  const placeholders = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full">
      {placeholders.map((id) => (
        <div key={id} className="w-full flex justify-center">
          <div className="relative w-full rounded-3xl p-px bg-gradient-to-br from-primary-400/40 via-gray-200/50 to-primary-600/30 dark:from-primary-500/30 dark:via-dark-border dark:to-primary-700/20 shadow-md">
            <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-white dark:bg-dark-card/90 border border-gray-100 dark:border-dark-border px-6 py-10 overflow-hidden flex flex-col justify-between animate-pulse">
              {/* Subtle top accent matching ServiceCard */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-primary-600/50 dark:bg-primary-500/50" />

              <div className="relative flex flex-col items-center gap-6">
                {/* 2-line title matching Title components */}
                <div className="flex flex-col items-center gap-2">
                  <div className="h-7 w-32 bg-gray-200 dark:bg-gray-700/60 rounded-md" />
                  <div className="h-7 w-44 bg-gray-200 dark:bg-gray-700/60 rounded-md" />
                </div>

                {/* Divider matching ServiceCard */}
                <div className="w-12 h-px bg-gray-200 dark:bg-dark-border" />

                {/* Wrapped skill circles matching CircularLogo */}
                <div className="flex flex-wrap gap-3 justify-center max-w-[240px]">
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                  <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50 shadow-sm border border-primary-600/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
