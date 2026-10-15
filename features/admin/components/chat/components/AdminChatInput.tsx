import { useRef, KeyboardEvent } from "react";
import SendIcon from "@mui/icons-material/Send";

const CANNED_REPLIES = [
  "Hello! How can I help you today?",
  "Yes, I'm currently open for freelance projects.",
  "Could you share your project requirements and timeline?",
  "I'd be happy to schedule a quick call to discuss.",
];

interface AdminChatInputProps {
  replyText: string;
  onReplyTextChange: (text: string) => void;
  onSend: (text?: string) => void;
  sending: boolean;
  customerName?: string | null;
}

export default function AdminChatInput({
  replyText,
  onReplyTextChange,
  onSend,
  sending,
  customerName,
}: AdminChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const displayName = customerName || "customer";

  let sendButtonContent = (
    <>
      <span className="text-xs font-semibold">Send</span>
      <SendIcon fontSize="inherit" />
    </>
  );

  if (sending) {
    sendButtonContent = (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  }

  return (
    <div className="border-t border-gray-100 bg-white p-3 space-y-2">
      {/* Quick suggestions */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {CANNED_REPLIES.map((reply, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSend(reply)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors shrink-0 cursor-pointer"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2">
        <textarea
          ref={textareaRef}
          value={replyText}
          onChange={(e) => onReplyTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Reply to ${displayName}... (Press Enter)`}
          rows={1}
          className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 resize-none"
        />

        <button
          type="button"
          onClick={() => onSend()}
          disabled={!replyText.trim() || sending}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 h-[38px]"
        >
          {sendButtonContent}
        </button>
      </div>
    </div>
  );
}
