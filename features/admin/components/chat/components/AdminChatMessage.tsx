import type { ChatMessage } from "@/lib/chat/store";

interface AdminChatMessageProps {
  message: ChatMessage;
}

export default function AdminChatMessage({ message }: AdminChatMessageProps) {
  const isAdmin = message.sender === "admin";
  const timeStr = new Date(message.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const attachmentMatch = message.message.match(/\[Attachment:\s*(.+?)\]\((.+?)\)/);
  const textContent = message.message.replace(/\[Attachment:\s*(.+?)\]\((.+?)\)/, "").trim();

  let containerClass = "flex flex-col items-start";
  let bubbleClass = "bg-gray-100 text-gray-900 rounded-2xl rounded-bl-xs";

  if (isAdmin) {
    containerClass = "flex flex-col items-end";
    bubbleClass = "bg-gray-900 text-white rounded-2xl rounded-br-xs";
  }

  return (
    <div className={containerClass}>
      <div className={`max-w-[75%] px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${bubbleClass}`}>
        {textContent && (
          <p className="whitespace-pre-wrap break-words">{textContent}</p>
        )}

        {attachmentMatch && (
          <div className="mt-2 pt-1.5 border-t border-white/20">
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
        <span className="text-[10px] text-gray-400">
          {timeStr}
        </span>
      </div>
    </div>
  );
}
