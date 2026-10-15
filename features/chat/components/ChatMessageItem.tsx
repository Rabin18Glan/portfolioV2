import type { ChatMessage } from "@/lib/chat/store";

interface ChatMessageItemProps {
  message: ChatMessage;
}

export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isCustomer = message.sender === "customer";
  const timeString = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Extract attachment link if present
  const attachmentMatch = message.message.match(/\[Attachment:\s*(.+?)\]\((.+?)\)/);
  const textContent = message.message.replace(/\[Attachment:\s*(.+?)\]\((.+?)\)/, "").trim();

  let containerClass = "flex flex-col items-start";
  let bubbleClass = "bg-gray-100 dark:bg-dark-card border border-gray-200/60 dark:border-dark-border text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-xs";

  if (isCustomer) {
    containerClass = "flex flex-col items-end";
    bubbleClass = "bg-primary-600 text-white rounded-2xl rounded-br-xs";
  }

  return (
    <div className={containerClass}>
      <div className={`px-4 py-3 max-w-[85%] sm:max-w-[75%] text-sm leading-relaxed ${bubbleClass}`}>
        {textContent && (
          <p className="whitespace-pre-wrap break-words">{textContent}</p>
        )}

        {attachmentMatch && (
          <div className="mt-2 pt-2 border-t border-white/20">
            <a
              href={attachmentMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline hover:opacity-80 text-xs font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              <span>{attachmentMatch[1]}</span>
            </a>
          </div>
        )}
      </div>

      <div className="mt-1 px-1">
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {timeString}
        </span>
      </div>
    </div>
  );
}
