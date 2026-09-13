import React, { ReactNode, createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Message } from '../lib/validators/message';
import { backendUrl, getSocket } from '../components/WebSocketClient.ts';

type Limits = {
  blocked: boolean; reason: string | null; retryAt: string | null; retryAfterSeconds: number;
};
type ChatState = {
  messages: Record<string, Message>; isMessageUpdating: boolean; connected: boolean; limitsReady: boolean;
  limits: Limits | null; error: string; sendMessage: (text: string) => boolean; resetMessages: () => void;
};
export const MessagesContext = createContext<ChatState>({ messages: {}, isMessageUpdating: false,
  connected: false, limitsReady: false, limits: null, error: '', sendMessage: () => false, resetMessages: () => {} });

const newId = () => window.crypto.randomUUID();
function initialMessages(): Record<string, Message> {
  try {
    const stored = JSON.parse(localStorage.getItem('portfolioChat.v1') || 'null');
    if (stored && !Array.isArray(stored) && typeof stored === 'object') {
      const valid = Object.values(stored).every((m: any) => typeof m.id === 'string' && typeof m.text === 'string' && typeof m.isUserMessage === 'boolean');
      if (valid && Object.keys(stored).length <= 100) return stored;
    }
  } catch { /* Storage can be disabled or malformed. */ }
  return { welcome: { id: 'welcome', text: 'Szia! Miben segíthetek?', isUserMessage: false, newlyAdded: false } };
}

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState(initialMessages);
  const messageRef = useRef(messages);
  const [isMessageUpdating, setUpdating] = useState(false);
  const [connected, setConnected] = useState(false);
  const [limits, setLimits] = useState<Limits | null>(null);
  const limitsRef = useRef<Limits | null>(null);
  const [limitsReady, setLimitsReady] = useState(false);
  const readyRef = useRef(false);
  const statusRevision = useRef(0);
  const [error, setError] = useState('');
  const active = useRef<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const socket = getSocket();
  const invalidateSnapshot = useCallback(() => {
    statusRevision.current++; readyRef.current = false;
  }, []);
  const invalidateLimits = useCallback(() => {
    invalidateSnapshot(); setLimitsReady(false);
  }, [invalidateSnapshot]);
  const acceptLimits = useCallback((result: Limits) => {
    if (!result || typeof result.blocked !== 'boolean') return;
    const previous = limitsRef.current;
    // Preserve a known cooldown against older/open snapshots until its retry time.
    const next = previous?.blocked && previous.retryAt && Date.parse(previous.retryAt) > Date.now() && !result.blocked ? previous : result;
    statusRevision.current++; limitsRef.current = next; setLimits(next);
    readyRef.current = true; setLimitsReady(true);
  }, []);
  const refreshLimits = useCallback(async () => {
    invalidateLimits();
    const revision = statusRevision.current;
    try {
      const response = await fetch(backendUrl + '/limits', { signal: AbortSignal.timeout(10000) });
      if (!response.ok && response.status !== 429) return;
      const result = await response.json();
      if (revision === statusRevision.current) acceptLimits(result);
    } catch { /* Polling may recover; connection and send errors remain visible. */ }
  }, [acceptLimits, invalidateLimits]);
  const finish = useCallback(() => {
    clearTimeout(timeout.current); active.current = null; setUpdating(false);
  }, []);
  useEffect(() => {
    const onConnect = () => { setConnected(true); setError(''); void refreshLimits(); };
    const onDisconnect = () => { setConnected(false); invalidateLimits(); if (active.current) setError('A kapcsolat megszakadt. A válasz nem lett újraküldve.'); finish(); };
    const onError = () => { setConnected(false); invalidateLimits(); setError('A chat jelenleg nem érhető el.'); finish(); };
    const onServiceError = () => { invalidateLimits(); setError('A chat jelenleg nem érhető el.'); finish(); };
    const onResponse = (raw: unknown) => {
      let data: any;
      try { data = typeof raw === 'string' ? JSON.parse(raw) : raw; } catch { return; }
      if (!data || data.id !== active.current) return;
      if (data.limits) acceptLimits(data.limits);
      if (typeof data.lastResp === 'string' && data.lastResp) {
        const old = messageRef.current[data.id];
        const updated = { ...messageRef.current, [data.id]: { id: data.id, text: (old?.text || '') + data.lastResp, isUserMessage: false, newlyAdded: true } };
        messageRef.current = updated; setMessages(updated);
      }
      if (data.error && !data.limits) setError(data.error.message || 'A válasz nem érkezett meg.');
      if (data.finished) { if (!data.limits) void refreshLimits(); finish(); }
    };
    socket.on('connect', onConnect); socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onError); socket.on('serviceError', onServiceError);
    socket.on('rateLimitStatus', acceptLimits); socket.on('aiResponseGetCL', onResponse);
    socket.connect();
    if (socket.connected) onConnect();
    const poll = setInterval(() => void refreshLimits(), 30000);
    return () => {
      clearInterval(poll); clearTimeout(timeout.current); active.current = null;
      invalidateSnapshot();
      socket.off('connect', onConnect); socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onError); socket.off('serviceError', onServiceError);
      socket.off('rateLimitStatus', acceptLimits); socket.off('aiResponseGetCL', onResponse);
      socket.disconnect();
    };
  }, [socket, finish, refreshLimits, acceptLimits, invalidateLimits, invalidateSnapshot]);
  useEffect(() => {
    try { localStorage.setItem('portfolioChat.v1', JSON.stringify(messages)); } catch { /* Chat works without storage. */ }
  }, [messages]);
  useEffect(() => {
    if (!limits?.blocked || !limits.retryAt) return;
    const delay = Math.max(100, Date.parse(limits.retryAt) - Date.now() + 100);
    const timer = setTimeout(() => void refreshLimits(), Math.min(delay, 2147483647));
    return () => clearTimeout(timer);
  }, [limits, refreshLimits]);
  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || active.current || !socket.connected || !readyRef.current || !limitsRef.current || limitsRef.current.blocked) return false;
    invalidateLimits();
    const user: Message = { id: newId(), text: text.trim(), isUserMessage: true, newlyAdded: true };
    const next = { ...messageRef.current, [user.id]: user };
    messageRef.current = next; setMessages(next);
    const id = newId(); active.current = id; setUpdating(true); setError('');
    // Volatile emit prevents buffering and replaying a disconnected request.
    socket.volatile.emit('aiResponse', { id, msgs: Object.values(next), currentLocation: window.location.origin + window.location.pathname });
    timeout.current = setTimeout(() => { setError('A válasz időtúllépés miatt megszakadt.'); void refreshLimits(); finish(); }, 100000);
    return true;
  }, [socket, finish, invalidateLimits, refreshLimits]);
  const resetMessages = useCallback(() => {
    if (active.current) return;
    messageRef.current = {}; setMessages({}); setError('');
  }, []);
  return <MessagesContext.Provider value={{ messages, isMessageUpdating, connected, limitsReady, limits, error, sendMessage, resetMessages }}>{children}</MessagesContext.Provider>;
}
