import { createAdminClient } from "@/utils/supabase/admin";

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: "customer" | "admin";
  sender_name: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatSession {
  id: string;
  device_id: string;
  customer_name: string;
  customer_email?: string | null;
  last_message_at?: string;
  created_at: string;
  unread_count?: number;
  last_message?: string;
}

let nativeTablesAvailable: boolean | null = null;

async function checkNativeTables(): Promise<boolean> {
  if (nativeTablesAvailable !== null) return nativeTablesAvailable;
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("chat_sessions").select("id").limit(1);
    if (!error) {
      nativeTablesAvailable = true;
      return true;
    }
    if (error.code === "PGRST205") {
      nativeTablesAvailable = false;
      return false;
    }
    nativeTablesAvailable = false;
    return false;
  } catch {
    nativeTablesAvailable = false;
    return false;
  }
}

// ---------------------------------------------------------------------------
// Native Table Implementations
// ---------------------------------------------------------------------------

async function findSessionByDeviceIdNative(deviceId: string): Promise<ChatSession | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("chat_sessions")
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data as ChatSession;
}

async function getOrCreateSessionNative(deviceId: string, customerName?: string): Promise<{ session: ChatSession; isNew: boolean }> {
  const admin = createAdminClient();
  const existing = await findSessionByDeviceIdNative(deviceId);

  if (existing) {
    return { session: existing, isNew: false };
  }

  const { data: created, error: insertError } = await admin
    .from("chat_sessions")
    .insert({
      device_id: deviceId,
      customer_name: customerName || "Visitor",
      last_message_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);
  return { session: created as ChatSession, isNew: true };
}

async function getMessagesNative(sessionId: string): Promise<ChatMessage[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("chat_messages")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as ChatMessage[];
}

async function addMessageNative(
  sessionId: string,
  sender: "customer" | "admin",
  messageText: string,
  senderName?: string
): Promise<ChatMessage> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("chat_messages")
    .insert({
      session_id: sessionId,
      sender,
      sender_name: senderName || (sender === "admin" ? "Rabin Glan" : "Visitor"),
      message: messageText.trim(),
      is_read: false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Update session last_message_at
  await admin
    .from("chat_sessions")
    .update({
      last_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", sessionId);

  return data as ChatMessage;
}

async function listAllSessionsNative(): Promise<ChatSession[]> {
  const admin = createAdminClient();
  const { data: sessions, error } = await admin
    .from("chat_sessions")
    .select("*")
    .order("last_message_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!sessions || sessions.length === 0) return [];

  // Fetch unread counts and last messages for each session
  const sessionIds = sessions.map((s) => s.id);
  const { data: messages } = await admin
    .from("chat_messages")
    .select("*")
    .in("session_id", sessionIds)
    .order("created_at", { ascending: true });

  const messagesBySession = (messages || []).reduce<Record<string, ChatMessage[]>>((acc, msg) => {
    if (!acc[msg.session_id]) acc[msg.session_id] = [];
    acc[msg.session_id].push(msg as ChatMessage);
    return acc;
  }, {});

  return sessions
    .map((s) => {
      const sMessages = messagesBySession[s.id] || [];
      const unread = sMessages.filter((m) => !m.is_read && m.sender === "customer").length;
      const lastMsg = sMessages.length > 0 ? sMessages[sMessages.length - 1].message : undefined;
      return {
        ...s,
        unread_count: unread,
        last_message: lastMsg,
      } as ChatSession;
    })
    .filter((s) => Boolean(s.last_message && s.last_message.trim().length > 0));
}

async function deleteSessionNative(sessionId: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin.from("chat_sessions").delete().eq("id", sessionId);
  if (error) throw new Error(error.message);
}

async function markSessionAsReadNative(sessionId: string, reader: "admin" | "customer"): Promise<void> {
  const admin = createAdminClient();
  const senderToMark = reader === "admin" ? "customer" : "admin";
  await admin
    .from("chat_messages")
    .update({ is_read: true })
    .eq("session_id", sessionId)
    .eq("sender", senderToMark);
}

async function updateCustomerInfoNative(sessionId: string, name: string, email?: string): Promise<void> {
  const admin = createAdminClient();
  const updateData: { customer_name: string; customer_email?: string } = { customer_name: name };
  if (email !== undefined) updateData.customer_email = email;
  await admin.from("chat_sessions").update(updateData).eq("id", sessionId);
}

// ---------------------------------------------------------------------------
// Fallback Persistence via `contents` table
// ---------------------------------------------------------------------------

interface FallbackMetadata {
  sessionId: string;
  deviceId: string;
  customerName: string;
  customerEmail?: string | null;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

async function findSessionByDeviceIdFallback(deviceId: string): Promise<ChatSession | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contents")
    .select("*")
    .eq("section", "general")
    .eq("subtitle", deviceId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data || !data.metadata) return null;
  const meta = data.metadata as unknown as FallbackMetadata;
  return {
    id: meta.sessionId,
    device_id: meta.deviceId,
    customer_name: meta.customerName || data.body || "Visitor",
    customer_email: meta.customerEmail,
    last_message_at: meta.lastMessageAt || meta.updatedAt,
    created_at: meta.createdAt || data.created_at,
  };
}

async function getOrCreateSessionFallback(deviceId: string, customerName?: string): Promise<{ session: ChatSession; isNew: boolean }> {
  const admin = createAdminClient();
  const existing = await findSessionByDeviceIdFallback(deviceId);

  if (existing) {
    return { session: existing, isNew: false };
  }

  const sessionId = crypto.randomUUID();
  const now = new Date().toISOString();
  const initialMeta: FallbackMetadata = {
    sessionId,
    deviceId,
    customerName: customerName || "Visitor",
    customerEmail: null,
    lastMessageAt: now,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };

  const { error: insertErr } = await admin.from("contents").insert({
    section: "general",
    title: `chat_session:${sessionId}`,
    subtitle: deviceId,
    body: customerName || "Visitor",
    metadata: initialMeta as unknown as Record<string, unknown>,
    is_published: true,
  });

  if (insertErr) throw new Error(insertErr.message);

  return {
    session: {
      id: sessionId,
      device_id: deviceId,
      customer_name: customerName || "Visitor",
      customer_email: null,
      last_message_at: now,
      created_at: now,
    },
    isNew: true,
  };
}

async function getMessagesFallback(sessionId: string): Promise<ChatMessage[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contents")
    .select("metadata")
    .eq("section", "general")
    .eq("title", `chat_session:${sessionId}`)
    .maybeSingle();

  if (error || !data?.metadata) return [];
  const meta = data.metadata as unknown as FallbackMetadata;
  return meta.messages || [];
}

async function addMessageFallback(
  sessionId: string,
  sender: "customer" | "admin",
  messageText: string,
  senderName?: string
): Promise<ChatMessage> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contents")
    .select("id, metadata")
    .eq("section", "general")
    .eq("title", `chat_session:${sessionId}`)
    .single();

  if (error || !data) throw new Error("Session not found in fallback store");

  const meta = (data.metadata || {}) as unknown as FallbackMetadata;
  const now = new Date().toISOString();
  const newMessage: ChatMessage = {
    id: `msg_${crypto.randomUUID()}`,
    session_id: sessionId,
    sender,
    sender_name: senderName || (sender === "admin" ? "Rabin Glan" : "Visitor"),
    message: messageText.trim(),
    is_read: false,
    created_at: now,
  };

  const updatedMessages = [...(meta.messages || []), newMessage];
  const updatedMeta: FallbackMetadata = {
    ...meta,
    lastMessageAt: now,
    updatedAt: now,
    messages: updatedMessages,
  };

  const { error: updateErr } = await admin
    .from("contents")
    .update({
      metadata: updatedMeta as unknown as Record<string, unknown>,
      updated_at: now,
    })
    .eq("id", data.id);

  if (updateErr) throw new Error(updateErr.message);
  return newMessage;
}

async function listAllSessionsFallback(): Promise<ChatSession[]> {
  const admin = createAdminClient();
  const { data: rows, error } = await admin
    .from("contents")
    .select("*")
    .eq("section", "general")
    .like("title", "chat_session:%")
    .order("updated_at", { ascending: false });

  if (error || !rows) return [];

  return rows
    .map((row) => {
      const meta = (row.metadata || {}) as unknown as FallbackMetadata;
      const msgs = meta.messages || [];
      const unread = msgs.filter((m) => !m.is_read && m.sender === "customer").length;
      const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1].message : undefined;
      return {
        id: meta.sessionId,
        device_id: meta.deviceId,
        customer_name: meta.customerName || row.body || "Visitor",
        customer_email: meta.customerEmail,
        last_message_at: meta.lastMessageAt || row.updated_at,
        created_at: meta.createdAt || row.created_at,
        unread_count: unread,
        last_message: lastMsg,
      } as ChatSession;
    })
    .filter((s) => Boolean(s.last_message && s.last_message.trim().length > 0));
}

async function deleteSessionFallback(sessionId: string): Promise<void> {
  const admin = createAdminClient();
  const { error } = await admin
    .from("contents")
    .delete()
    .eq("section", "general")
    .eq("title", `chat_session:${sessionId}`);

  if (error) throw new Error(error.message);
}

async function markSessionAsReadFallback(sessionId: string, reader: "admin" | "customer"): Promise<void> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contents")
    .select("id, metadata")
    .eq("section", "general")
    .eq("title", `chat_session:${sessionId}`)
    .maybeSingle();

  if (error || !data?.metadata) return;
  const meta = data.metadata as unknown as FallbackMetadata;
  const senderToMark = reader === "admin" ? "customer" : "admin";
  const updatedMessages = (meta.messages || []).map((m) =>
    m.sender === senderToMark ? { ...m, is_read: true } : m
  );

  await admin
    .from("contents")
    .update({
      metadata: { ...meta, messages: updatedMessages } as unknown as Record<string, unknown>,
    })
    .eq("id", data.id);
}

async function updateCustomerInfoFallback(sessionId: string, name: string, email?: string): Promise<void> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contents")
    .select("id, metadata")
    .eq("section", "general")
    .eq("title", `chat_session:${sessionId}`)
    .maybeSingle();

  if (error || !data?.metadata) return;
  const meta = data.metadata as unknown as FallbackMetadata;
  const updatedMeta: FallbackMetadata = {
    ...meta,
    customerName: name,
    customerEmail: email !== undefined ? email : meta.customerEmail,
  };

  await admin
    .from("contents")
    .update({
      body: name,
      metadata: updatedMeta as unknown as Record<string, unknown>,
    })
    .eq("id", data.id);
}

// ---------------------------------------------------------------------------
// Unified Chat Store API
// ---------------------------------------------------------------------------

export const ChatStore = {
  async findSession(deviceId: string): Promise<ChatSession | null> {
    const isNative = await checkNativeTables();
    return isNative
      ? findSessionByDeviceIdNative(deviceId)
      : findSessionByDeviceIdFallback(deviceId);
  },

  async getOrCreateSession(deviceId: string, customerName?: string): Promise<{ session: ChatSession; isNew: boolean }> {
    const isNative = await checkNativeTables();
    return isNative
      ? getOrCreateSessionNative(deviceId, customerName)
      : getOrCreateSessionFallback(deviceId, customerName);
  },

  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    const isNative = await checkNativeTables();
    return isNative
      ? getMessagesNative(sessionId)
      : getMessagesFallback(sessionId);
  },

  async addMessage(
    sessionId: string,
    sender: "customer" | "admin",
    messageText: string,
    senderName?: string
  ): Promise<ChatMessage> {
    const isNative = await checkNativeTables();
    return isNative
      ? addMessageNative(sessionId, sender, messageText, senderName)
      : addMessageFallback(sessionId, sender, messageText, senderName);
  },

  async listAllSessions(): Promise<ChatSession[]> {
    const isNative = await checkNativeTables();
    return isNative
      ? listAllSessionsNative()
      : listAllSessionsFallback();
  },

  async deleteSession(sessionId: string): Promise<void> {
    const isNative = await checkNativeTables();
    return isNative
      ? deleteSessionNative(sessionId)
      : deleteSessionFallback(sessionId);
  },

  async markSessionAsRead(sessionId: string, reader: "admin" | "customer"): Promise<void> {
    const isNative = await checkNativeTables();
    return isNative
      ? markSessionAsReadNative(sessionId, reader)
      : markSessionAsReadFallback(sessionId, reader);
  },

  async updateCustomerInfo(sessionId: string, name: string, email?: string): Promise<void> {
    const isNative = await checkNativeTables();
    return isNative
      ? updateCustomerInfoNative(sessionId, name, email)
      : updateCustomerInfoFallback(sessionId, name, email);
  },
};
