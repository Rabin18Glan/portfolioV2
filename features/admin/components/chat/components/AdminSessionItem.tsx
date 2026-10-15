import type { ChatSession } from "@/lib/chat/store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface AdminSessionItemProps {
  session: ChatSession;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDeleteRequest: (session: ChatSession) => void;
}

export default function AdminSessionItem({
  session,
  isSelected,
  onSelect,
  onDeleteRequest,
}: AdminSessionItemProps) {
  const customerName = session.customer_name || "Visitor";
  const avatarLetter = customerName.charAt(0).toUpperCase();
  const unread = session.unread_count || 0;
  const timeStr = new Date(session.last_message_at || session.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let itemClass = "p-3 transition-colors cursor-pointer group flex items-start gap-2.5 rounded-xl mx-2 hover:bg-gray-100";
  if (isSelected) {
    itemClass = "p-3 transition-colors cursor-pointer group flex items-start gap-2.5 rounded-xl mx-2 bg-gray-100 font-medium";
  }

  return (
    <div
      onClick={() => onSelect(session.id)}
      className={itemClass}
    >
      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-semibold flex items-center justify-center shrink-0 text-xs">
        {avatarLetter}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-xs font-semibold text-gray-900 truncate">
            {customerName}
          </span>
          <span className="text-[10px] text-gray-400 shrink-0">
            {timeStr}
          </span>
        </div>

        <p className="text-[11px] text-gray-500 truncate mt-0.5">
          {session.last_message || "No messages yet"}
        </p>
      </div>

      <div className="flex items-center gap-1 shrink-0 pt-0.5">
        {unread > 0 && (
          <span className="w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center font-bold">
            {unread}
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteRequest(session);
          }}
          className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          title="Delete"
        >
          <DeleteOutlineIcon fontSize="inherit" />
        </button>
      </div>
    </div>
  );
}
