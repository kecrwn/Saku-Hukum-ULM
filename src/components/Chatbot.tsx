"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = { id: string; role: "user" | "assistant"; content: string };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isIndonesian } = useLanguage();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const chips = isIndonesian
    ? ["Peminatan di FH ULM?", "Jalur menjadi jaksa?", "Berapa SKS Pidana?"]
    : ["FH ULM specializations?", "Path to become prosecutor?", "Criminal Law credits?"];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        role: "assistant",
        content: isIndonesian
          ? "Halo! Saya asisten Saku Hukum ULM. Tanyakan tentang kurikulum, peminatan, fasilitas, atau jalur karier jaksa."
          : "Hello! I'm the Saku Hukum ULM assistant. Ask about the curriculum, specializations, facilities, or the prosecutor career path."
      }]);
    }
  }, [isIndonesian, messages.length]);

  const send = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: msg }]);
    if (!text) setInput("");
    setIsTyping(true);
    if (inputRef.current) inputRef.current.style.height = "auto";
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isIndonesian
          ? "Fitur ini masih dalam tahap pengembangan."
          : "This feature is still in development."
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      <style>{`
        @keyframes chat-fab-pulse{0%,100%{box-shadow:0 4px 20px rgba(16,45,51,.25),0 0 0 0 rgba(178,77,57,.35)}70%{box-shadow:0 4px 20px rgba(16,45,51,.25),0 0 0 10px rgba(178,77,57,0)}}
        @keyframes chat-slide-up{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        .chat-fab{position:fixed;bottom:24px;right:24px;z-index:50;width:52px;height:52px;border:none;border-radius:50%;background:var(--ink-deep);color:var(--paper);display:grid;place-items:center;cursor:pointer;animation:chat-fab-pulse 2.5s ease-in-out infinite;transition:transform 160ms ease-out}
        .chat-fab:hover{transform:scale(1.08)}
        .chat-fab:active{transform:scale(.95)}
        .chat-panel{position:fixed;bottom:24px;right:24px;z-index:50;width:370px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100dvh - 48px);border-radius:16px;display:flex;flex-direction:column;overflow:hidden;background:var(--paper);border:1px solid var(--line);box-shadow:0 16px 48px rgba(16,45,51,.18);animation:chat-slide-up .25s cubic-bezier(.23,1,.32,1) both}
        .chat-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid var(--line);background:var(--paper)}
        .chat-head-title{display:flex;align-items:center;gap:8px;font-family:var(--serif);font-size:17px;letter-spacing:-.02em;color:var(--ink-deep)}
        .chat-head-title svg{color:var(--clay)}
        .chat-close{width:30px;height:30px;border:1px solid var(--line);background:transparent;border-radius:6px;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 140ms ease-out}
        .chat-close:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep)}
        .chat-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
        .chat-msg{max-width:82%;padding:10px 14px;font-size:13px;line-height:1.55;border-radius:14px}
        .chat-msg-user{align-self:flex-end;background:var(--ink-deep);color:var(--paper);border-bottom-right-radius:4px}
        .chat-msg-bot{align-self:flex-start;background:var(--card);border:1px solid var(--line);color:var(--ink-deep);border-bottom-left-radius:4px}
        .chat-chips{display:flex;flex-wrap:wrap;gap:6px;padding-top:4px}
        .chat-chip{border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:11px;padding:5px 11px;border-radius:999px;cursor:pointer;font-family:var(--sans);transition:all 140ms ease-out}
        .chat-chip:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep)}
        .chat-typing{display:flex;gap:4px;align-self:flex-start;padding:10px 14px;background:var(--card);border:1px solid var(--line);border-radius:14px;border-bottom-left-radius:4px}
        .chat-typing span{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:bounce .6s infinite alternate}
        .chat-typing span:nth-child(2){animation-delay:.15s}
        .chat-typing span:nth-child(3){animation-delay:.3s}
        @keyframes bounce{to{transform:translateY(-5px);opacity:.4}}
        .chat-input-bar{display:flex;align-items:flex-end;gap:8px;padding:12px 14px;border-top:1px solid var(--line);background:var(--paper)}
        .chat-input-bar textarea{flex:1;border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:13px;font-family:var(--sans);color:var(--ink-deep);background:var(--card);resize:none;min-height:38px;max-height:100px;outline:none;transition:border-color 140ms ease-out}
        .chat-input-bar textarea:focus{border-color:var(--clay)}
        .chat-send{width:36px;height:36px;border:none;border-radius:50%;background:var(--clay);color:var(--paper);display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:opacity 140ms ease-out}
        .chat-send:disabled{opacity:.4;cursor:default}
        .chat-send:not(:disabled):hover{opacity:.85}
      `}</style>

      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)} aria-label={isIndonesian ? "Buka asisten" : "Open assistant"}>
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-head">
            <div className="chat-head-title"><MessageCircle size={18} />{isIndonesian ? "Asisten Hukum" : "Law Assistant"}</div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></button>
          </div>
          <div className="chat-body">
            {messages.map(m => (
              <div key={m.id} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>{m.content}</div>
            ))}
            {messages.length <= 1 && (
              <div className="chat-chips">
                {chips.map(c => <button key={c} className="chat-chip" onClick={() => send(c)}>{c}</button>)}
              </div>
            )}
            {isTyping && <div className="chat-typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          <div className="chat-input-bar">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={isIndonesian ? "Tulis pesan..." : "Type a message..."}
              rows={1}
              disabled={isTyping}
            />
            <button className="chat-send" disabled={!input.trim() || isTyping} onClick={() => send()}>
              {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
