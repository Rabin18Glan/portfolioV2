export default function HomeLoading() {
  return (
    <div className="bg-white dark:bg-dark-bg min-h-screen py-24 md:py-32 transition-colors duration-500 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Hero image placeholder */}
        <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gray-200 dark:bg-gray-700/50" />

        {/* Hero info placeholder */}
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700/60 rounded" />
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700/60 rounded-xl" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700/40 rounded" />
          <div className="space-y-2 w-full max-w-lg pt-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700/40 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700/40 rounded" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700/60 rounded-2xl" />
            <div className="h-12 w-36 bg-gray-200 dark:bg-gray-700/40 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
