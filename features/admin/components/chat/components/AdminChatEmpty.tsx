export default function AdminChatEmpty() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center text-gray-400">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 text-gray-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p className="font-semibold text-gray-700 text-sm">
        Select a conversation
      </p>
      <p className="text-xs text-gray-400 mt-0.5">
        Choose a customer from the left to start messaging
      </p>
    </div>
  );
}
