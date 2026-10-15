"use client";

import { useAdminChat } from "./hooks/useAdminChat";
import AdminSessionList from "./components/AdminSessionList";
import AdminChatStream from "./components/AdminChatStream";
import AdminChatInput from "./components/AdminChatInput";
import AdminChatEmpty from "./components/AdminChatEmpty";
import ConfirmDialog from "@/features/admin/components/ConfirmDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function AdminChatScreen() {
  const {
    filteredSessions,
    selectedSessionId,
    selectedSession,
    messages,
    replyText,
    setReplyText,
    loadingSessions,
    loadingMessages,
    sendingReply,
    searchQuery,
    setSearchQuery,
    sessionToDelete,
    setSessionToDelete,
    isDeleting,
    deleteError,
    setDeleteError,
    messagesContainerRef,
    handleSelectSession,
    handleSendReply,
    confirmDeleteSession,
  } = useAdminChat();

  let conversationPane = <AdminChatEmpty />;

  if (selectedSession) {
    conversationPane = (
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Sleek chat header */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 font-bold flex items-center justify-center text-xs">
              {(selectedSession.customer_name || "V").charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900">
                {selectedSession.customer_name || "Visitor"}
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                {selectedSession.device_id.replace("dev_", "ID: ")}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSessionToDelete(selectedSession)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Delete conversation"
          >
            <DeleteOutlineIcon fontSize="small" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-hidden">
          <AdminChatStream
            messages={messages}
            loading={loadingMessages}
            containerRef={messagesContainerRef}
          />
        </div>

        {/* Input Bar */}
        <AdminChatInput
          replyText={replyText}
          onReplyTextChange={setReplyText}
          onSend={handleSendReply}
          sending={sendingReply}
          customerName={selectedSession.customer_name}
        />
      </div>
    );
  }

  const deleteDialogMessage = `Are you sure you want to delete the chat session for "${
    sessionToDelete?.customer_name || "Visitor"
  }"? All messages will be permanently removed.`;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex-1 bg-white border border-gray-200/80 rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-xs">
        {/* Left: Session List */}
        <AdminSessionList
          sessions={filteredSessions}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
          onDeleteRequest={setSessionToDelete}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          loading={loadingSessions}
        />

        {/* Right: Active Conversation */}
        <div className="flex-1 flex flex-col bg-white">
          {conversationPane}
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        open={Boolean(sessionToDelete)}
        title="Delete Chat Session"
        message={deleteDialogMessage}
        confirmLabel="Delete"
        busy={isDeleting}
        error={deleteError}
        onConfirm={confirmDeleteSession}
        onCancel={() => {
          if (!isDeleting) {
            setSessionToDelete(null);
            setDeleteError("");
          }
        }}
      />
    </div>
  );
}
