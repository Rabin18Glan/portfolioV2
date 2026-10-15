import type { ChatSession } from "@/lib/chat/store";
import SearchIcon from "@mui/icons-material/Search";
import AdminSessionItem from "./AdminSessionItem";

interface AdminSessionListProps {
  sessions: ChatSession[];
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteRequest: (session: ChatSession) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  loading: boolean;
}

export default function AdminSessionList({
  sessions,
  selectedSessionId,
  onSelectSession,
  onDeleteRequest,
  searchQuery,
  onSearchChange,
  loading,
}: AdminSessionListProps) {
  let listContent = (
    <div className="py-2 space-y-1">
      {sessions.map((s) => (
        <AdminSessionItem
          key={s.id}
          session={s}
          isSelected={s.id === selectedSessionId}
          onSelect={onSelectSession}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );

  if (loading) {
    listContent = (
      <div className="py-12 text-center text-xs text-gray-400">
        <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <span>Loading...</span>
      </div>
    );
  } else if (sessions.length === 0) {
    listContent = (
      <div className="py-12 text-center text-xs text-gray-400 px-4">
        <span>No customer conversations found</span>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-72 xl:w-80 border-r border-gray-200 flex flex-col bg-gray-50/40 shrink-0">
      {/* Search Header */}
      <div className="p-3 border-b border-gray-100 bg-white">
        <div className="relative">
          <SearchIcon
            fontSize="small"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Session list items */}
      <div className="flex-1 overflow-y-auto">
        {listContent}
      </div>
    </div>
  );
}
