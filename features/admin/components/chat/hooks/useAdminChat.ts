"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import type { ChatMessage, ChatSession } from "@/lib/chat/store";

function generateAdminTempId(): string {
  return `temp_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;
}

export function useAdminChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [sessionToDelete, setSessionToDelete] = useState<ChatSession | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const selectedSession = useMemo(
    () => sessions.find((s) => s.id === selectedSessionId) ?? null,
    [sessions, selectedSessionId]
  );

  const scrollToBottom = useCallback((smooth = true) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    if (smooth) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  const loadSessions = useCallback(async (silent = false) => {
    if (!silent) setLoadingSessions(true);
    try {
      const res = await fetch("/api/admin/chat/sessions", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error("Failed to load sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (err) {
      console.error(err);
    } finally {
      if (!silent) setLoadingSessions(false);
    }
  }, []);

  const loadMessages = useCallback(async (sessionId: string, silent = false) => {
    if (!silent) setLoadingMessages(true);
    try {
      const res = await fetch(`/api/admin/chat/messages?sessionId=${encodeURIComponent(sessionId)}`, {
        headers: { "Cache-Control": "no-cache" },
      });
      if (!res.ok) throw new Error("Failed to load messages");
      const data = await res.json();
      setMessages(data.messages || []);
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, unread_count: 0 } : s))
      );
    } catch (err) {
      console.error(err);
    } finally {
      if (!silent) setLoadingMessages(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        const res = await fetch("/api/admin/chat/sessions", {
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) throw new Error("Failed to load sessions");
        const data = await res.json();
        if (!ignore) {
          setSessions(data.sessions || []);
          setLoadingSessions(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setLoadingSessions(false);
        }
      }
    }

    initialFetch();

    return () => {
      ignore = true;
    };
  }, []);

  // When active session changes, load messages
  useEffect(() => {
    let ignore = false;

    if (!selectedSessionId) {
      return;
    }

    async function fetchSessionMessages(id: string) {
      try {
        const res = await fetch(`/api/admin/chat/messages?sessionId=${encodeURIComponent(id)}`, {
          headers: { "Cache-Control": "no-cache" },
        });
        if (!res.ok) throw new Error("Failed to load messages");
        const data = await res.json();
        if (!ignore) {
          setMessages(data.messages || []);
          setLoadingMessages(false);
          setSessions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, unread_count: 0 } : s))
          );
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setLoadingMessages(false);
        }
      }
    }

    fetchSessionMessages(selectedSessionId);

    return () => {
      ignore = true;
    };
  }, [selectedSessionId]);

  // Periodic polling every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      loadSessions(true);
      if (selectedSessionId) {
        loadMessages(selectedSessionId, true);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [loadSessions, loadMessages, selectedSessionId]);

  useEffect(() => {
    scrollToBottom(false);
  }, [messages.length, scrollToBottom]);

  const handleSelectSession = useCallback((sessionId: string) => {
    setSelectedSessionId(sessionId);
    setLoadingMessages(true);
  }, []);

  const handleSendReply = useCallback(async (textToSend?: string) => {
    const text = (textToSend ?? replyText).trim();
    if (!text || !selectedSessionId || sendingReply) return;

    setSendingReply(true);
    setReplyText("");

    const tempId = generateAdminTempId();
    const optimistic: ChatMessage = {
      id: tempId,
      session_id: selectedSessionId,
      sender: "admin",
      sender_name: "Rabin Glan",
      message: text,
      is_read: false,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setTimeout(() => scrollToBottom(true), 50);

    try {
      const res = await fetch("/api/admin/chat/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          message: text,
        }),
      });

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? data.message : m))
      );
      loadSessions(true);
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setReplyText(text);
    } finally {
      setSendingReply(false);
    }
  }, [loadSessions, replyText, scrollToBottom, selectedSessionId, sendingReply]);

  const confirmDeleteSession = useCallback(async () => {
    if (!sessionToDelete) return;
    setIsDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`/api/admin/chat/sessions/${encodeURIComponent(sessionToDelete.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete session");

      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete.id));
      if (selectedSessionId === sessionToDelete.id) {
        setSelectedSessionId(null);
        setMessages([]);
      }
      setSessionToDelete(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Deletion failed");
    } finally {
      setIsDeleting(false);
    }
  }, [selectedSessionId, sessionToDelete]);

  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) {
      return sessions;
    }
    const q = searchQuery.toLowerCase();
    return sessions.filter((s) => {
      const matchName = s.customer_name?.toLowerCase().includes(q);
      const matchDevice = s.device_id?.toLowerCase().includes(q);
      const matchMsg = s.last_message?.toLowerCase().includes(q);
      return matchName || matchDevice || matchMsg;
    });
  }, [sessions, searchQuery]);

  return {
    sessions,
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
  };
}
