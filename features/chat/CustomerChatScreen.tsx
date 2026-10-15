"use client";

import { useCustomerChat } from "./hooks/useCustomerChat";
import ChatTopBar from "./components/ChatTopBar";
import ChatMessagesList from "./components/ChatMessagesList";
import ChatInputBar from "./components/ChatInputBar";

export default function CustomerChatScreen() {
  const {
    messages,
    inputText,
    setInputText,
    loading,
    sending,
    uploading,
    attachedFile,
    messagesContainerRef,
    handleSendMessage,
    handleUploadFile,
    removeAttachment,
  } = useCustomerChat();

  return (
    <div className="h-screen max-w-2xl mx-auto px-4 py-3 flex flex-col justify-between">
      {/* Top Bar with Back Button */}
      <ChatTopBar />

      {/* Scrollable messages area */}
      <div className="flex-1 min-h-0 flex flex-col py-2">
        <ChatMessagesList
          messages={messages}
          loading={loading}
          containerRef={messagesContainerRef}
        />
      </div>

      {/* Floating minimal input bar */}
      <ChatInputBar
        inputText={inputText}
        onInputChange={setInputText}
        onSend={handleSendMessage}
        onUploadFile={handleUploadFile}
        attachedFile={attachedFile}
        onRemoveAttachment={removeAttachment}
        sending={sending}
        uploading={uploading}
      />
    </div>
  );
}
