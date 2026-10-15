import { useRef, ChangeEvent, KeyboardEvent } from "react";

interface ChatInputBarProps {
  inputText: string;
  onInputChange: (val: string) => void;
  onSend: () => void;
  onUploadFile: (file: File) => void;
  attachedFile: { url: string; name: string } | null;
  onRemoveAttachment: () => void;
  sending: boolean;
  uploading: boolean;
}

export default function ChatInputBar({
  inputText,
  onInputChange,
  onSend,
  onUploadFile,
  attachedFile,
  onRemoveAttachment,
  sending,
  uploading,
}: ChatInputBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const canSend = (Boolean(inputText.trim()) || Boolean(attachedFile)) && !sending && !uploading;

  let sendButtonContent = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
    </svg>
  );

  if (sending) {
    sendButtonContent = (
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    );
  }

  return (
    <div className="sticky bottom-6 z-20 w-full">
      {/* Attached file preview chip */}
      {attachedFile && (
        <div className="mb-2 flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl text-xs text-gray-700 dark:text-gray-300 w-fit">
          <svg className="w-3.5 h-3.5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span className="truncate max-w-[200px]">{attachedFile.name}</span>
          <button
            type="button"
            onClick={onRemoveAttachment}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer ml-1"
          >
            &times;
          </button>
        </div>
      )}

      {/* Uploading indicator */}
      {uploading && (
        <div className="mb-2 flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-dark-card rounded-xl text-xs text-gray-500 w-fit">
          <div className="w-3 h-3 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <span>Uploading file...</span>
        </div>
      )}

      {/* Main floating input pill */}
      <div className="flex items-center gap-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border border-gray-200/80 dark:border-dark-border rounded-full p-2 shadow-xl shadow-black/5">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Attach file button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="p-2.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-bg/60 transition-colors cursor-pointer shrink-0"
          title="Attach file"
          aria-label="Attach file"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Input field */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message..."
          className="flex-1 bg-transparent px-2 py-1 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
        />

        {/* Send button */}
        <button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          className="w-10 h-10 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md shadow-primary-600/20"
          aria-label="Send message"
        >
          {sendButtonContent}
        </button>
      </div>
    </div>
  );
}
