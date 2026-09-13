import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessagesContext } from '../context/messages.tsx';

export default function ChatPanel() {
  const { messages, isMessageUpdating, connected, limitsReady, limits, error, sendMessage, resetMessages } = useContext(MessagesContext);
  const [input, setInput] = useState('');
  const [now, setNow] = useState(Date.now());
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView?.({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    if (!limits?.blocked) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [limits]);
  const blocked = !connected || !limitsReady || isMessageUpdating || !!limits?.blocked;
  const seconds = limits?.retryAt ? Math.max(0, Math.ceil((Date.parse(limits.retryAt) - now) / 1000)) : 0;
  const send = () => { if (sendMessage(input)) setInput(''); };
  return (
    <section aria-label="AI Chat" style={{ maxHeight: 'calc(100dvh - 6rem)' }} className="absolute bottom-16 right-0 flex flex-col overflow-hidden bg-white text-gray-900 rounded-lg shadow-lg w-80 md:w-[40rem] max-w-[calc(100vw-2rem)]">
      <h2 className="shrink-0 p-2 rounded-t-lg bg-gradient-to-r from-aiMsg1 to-aiMsg2 text-center text-white font-bold">AI Chat</h2>
      <div className="flex flex-col space-y-2 overflow-y-auto min-h-0 h-60 md:h-[32rem] p-2" aria-live="polite">
        {Object.values(messages).map(message => (
          <div key={message.id} className={'p-2 rounded-md text-white break-words ' + (message.isUserMessage ? 'self-end bg-gradient-to-r from-red-400 to-red-500' : 'self-start bg-gradient-to-r from-aiMsg1 to-aiMsg2')}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
        ))}
        {isMessageUpdating && <p role="status">Válasz készül…</p>}
        <div ref={end} />
      </div>
      <div className="shrink-0 px-3 text-xs text-gray-700">
        {connected && !limitsReady && !isMessageUpdating && <p role="status">Elérhetőség ellenőrzése…</p>}
        {!connected && <p role="status">Kapcsolódás a chathez…</p>}
        {limits?.blocked && <p role="alert" className="py-2 text-amber-800">
          {limits.reason === 'monthly_budget' ? 'A havi AI-keret elfogyott, vagy nem elegendő ehhez a kéréshez.' : limits.reason === 'provider_rate_limit' ? 'Az AI szolgáltató átmenetileg korlátozza a kéréseket.' : 'Elérted a kérések korlátját.'}
          {' '}Újra elérhető: {limits.retryAt && new Date(limits.retryAt).toLocaleString()}.
          {limits.reason !== 'monthly_budget' && (' Várakozás: ' + seconds + ' mp.')}
        </p>}
        {error && <p role="alert" className="py-2 text-red-700">{error}</p>}
      </div>
      <div className="shrink-0 flex flex-wrap gap-2 p-2">
        <textarea aria-label="Üzenet" className="w-full border rounded p-2 resize-none" rows="2" maxLength={65536}
          value={input} onChange={e => setInput(e.target.value)} placeholder="Írj, s légy türelmes…"
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); if (!blocked) send(); } }} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={send} disabled={blocked || !input.trim()}>Küldés</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={resetMessages} disabled={isMessageUpdating}>Új chat</button>
      </div>
    </section>
  );
}
