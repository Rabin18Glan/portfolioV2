export default function ServicesLoading() {
  const placeholders = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full">
      {placeholders.map((id) => (
        <div
          key={id}
          className="relative w-full rounded-3xl p-px bg-gradient-to-br from-gray-200/60 via-gray-100 to-gray-200/50 dark:from-dark-border dark:via-dark-card dark:to-dark-border shadow-md"
        >
          <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-white dark:bg-dark-card/80 border border-gray-100 dark:border-dark-border px-6 py-10 overflow-hidden animate-pulse">
            <div className="mx-auto w-16 h-1 rounded-b-full bg-gray-200 dark:bg-gray-700/60 mb-8" />
            <div className="flex flex-col items-center gap-6">
              <div className="h-7 w-36 bg-gray-200 dark:bg-gray-700/60 rounded-lg" />
              <div className="w-12 h-px bg-gray-200 dark:bg-gray-700/60" />
              <div className="flex flex-wrap gap-3 justify-center py-2">
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50" />
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50" />
                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700/50" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
