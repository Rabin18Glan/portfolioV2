export default function ChatEmptyState() {
  return (
    <div className="py-24 text-center max-w-sm mx-auto flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-dark-card text-gray-500 dark:text-gray-400 flex items-center justify-center mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
        Say hello to start a conversation
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        Direct message with Rabin Glan
      </p>
    </div>
  );
}
