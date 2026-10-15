"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { ChatMessage, ChatSession } from "@/lib/chat/store";

function generateTempId(): string {
  return `temp_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
}

export function useCustomerChat() {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<{ url: string; name: string } | null>(null);

  // Dedicated container ref for internal scrolling (never scrolls the outer window)
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    if (smooth) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const isNearBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 150;
  }, []);

  // Initial load
  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
        const res = await fetch("/api/chat/session", {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) throw new Error("Failed to initialize session");
        const data = await res.json();
        if (!ignore) {
          setSession(data.session);
          setMessages(data.messages || []);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      ignore = true;
    };
  }, []);

  // Real-time polling — only when session is active and stored
  useEffect(() => {
    if (!session?.id || session.id === "pending") return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/chat/messages", {
          headers: { "Cache-Control": "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.messages)) {
            setMessages((prev) => {
              if (data.messages.length !== prev.length) {
                return data.messages;
              }
              const hasDiff = data.messages.some(
                (m: ChatMessage, idx: number) =>
                  m.id !== prev[idx]?.id || m.is_read !== prev[idx]?.is_read
              );
              if (hasDiff) {
                return data.messages;
              }
              return prev;
            });
          }
        }
      } catch {
        // Silent polling error
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [session?.id]);

  // Internal auto-scroll only if user is already near bottom, never scroll outer page
  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom(false);
    }
  }, [messages.length, scrollToBottom, isNearBottom]);

  // Upload attachment
  const handleUploadFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/chat/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload file");
      const data = await res.json();
      setAttachedFile({ url: data.url, name: data.fileName });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }, []);

  // Send message
  const handleSendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed && !attachedFile) return;
    if (sending) return;

    setSending(true);

    let messageContent = trimmed;
    if (attachedFile) {
      if (trimmed) {
        messageContent = `${trimmed}\n\n[Attachment: ${attachedFile.name}](${attachedFile.url})`;
      } else {
        messageContent = `[Attachment: ${attachedFile.name}](${attachedFile.url})`;
      }
    }

    setInputText("");
    setAttachedFile(null);

    const tempId = generateTempId();
    const optimisticMessage: ChatMessage = {
      id: tempId,
      session_id: session?.id || "",
      sender: "customer",
      sender_name: session?.customer_name || "Visitor",
      message: messageContent,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          name: session?.customer_name,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      if (data.session) {
        setSession(data.session);
      }

      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? data.message : m))
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setInputText(trimmed);
    } finally {
      setSending(false);
    }
  }, [attachedFile, inputText, scrollToBottom, sending, session]);

  const removeAttachment = useCallback(() => {
    setAttachedFile(null);
  }, []);

  return {
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
  };
}
