"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { useChat } from "ai/react";
import { useLanguage } from "@/contexts/LanguageContext";

type Message = { id: string; role: "user" | "assistant"; content: string };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { isIndonesian } = useLanguage();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: isIndonesian
          ? "Halo! Saya Jaksa, asisten Saku Hukum ULM. Ada yang bisa saya bantu terkait kurikulum, fasilitas, atau arah karier?"
          : "Hello! I'm Jaksa, the Saku Hukum ULM assistant. How can I help you with the curriculum, facilities, or career paths?"
      }
    ]
  });

  // Keep chat scrolled to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const chips = isIndonesian
    ? ["Peminatan di FH ULM?", "Jalur menjadi jaksa?", "Berapa SKS Pidana?"]
    : ["FH ULM specializations?", "Path to become prosecutor?", "Criminal Law credits?"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", { bubbles: true, cancelable: true }) as unknown as React.FormEvent<HTMLFormElement>;
      handleSubmit(formEvent);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      <style>{`
        @keyframes chat-fab-pulse{0%,100%{box-shadow:0 8px 30px rgba(16,45,51,.3),0 0 0 0 rgba(178,77,57,.35)}70%{box-shadow:0 8px 30px rgba(16,45,51,.3),0 0 0 12px rgba(178,77,57,0)}}
        @keyframes chat-slide-up{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .chat-fab{position:fixed;bottom:28px;right:28px;z-index:50;width:56px;height:56px;border:none;border-radius:50%;background:var(--ink-deep);color:var(--paper);display:grid;place-items:center;cursor:pointer;animation:chat-fab-pulse 3s ease-in-out infinite;transition:transform 200ms cubic-bezier(.23,1,.32,1)}
        .chat-fab:hover{transform:scale(1.06) translateY(-2px)}
        .chat-fab:active{transform:scale(.94)}
        .chat-panel{position:fixed;bottom:28px;right:28px;z-index:50;width:380px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100dvh - 48px);border-radius:20px;display:flex;flex-direction:column;overflow:hidden;background:rgba(255,253,250,0.85);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(23,62,68,.12);box-shadow:0 24px 64px rgba(16,45,51,.15);animation:chat-slide-up .35s cubic-bezier(.23,1,.32,1) both}
        .chat-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid rgba(23,62,68,.08)}
        .chat-head-title{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:18px;letter-spacing:-.02em;color:var(--ink-deep)}
        .chat-head-title svg{color:var(--clay)}
        .chat-close{width:32px;height:32px;border:1px solid rgba(23,62,68,.15);background:transparent;border-radius:10px;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 200ms ease-out}
        .chat-close:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:rotate(90deg)}
        .chat-body{flex:1;overflow-y:auto;padding:20px 22px;display:flex;flex-direction:column;gap:16px}
        .chat-msg{max-width:85%;padding:12px 16px;font-size:14px;line-height:1.5;border-radius:16px}
        .chat-msg-user{align-self:flex-end;background:var(--ink-deep);color:var(--paper);border-bottom-right-radius:4px}
        .chat-msg-bot{align-self:flex-start;background:#fff;border:1px solid rgba(23,62,68,.1);color:var(--ink-deep);border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.03)}
        .chat-chips{display:flex;flex-wrap:wrap;gap:8px;padding-top:6px}
        .chat-chip{border:1px solid rgba(23,62,68,.12);background:rgba(255,255,255,.6);color:var(--ink-deep);font-size:12px;padding:6px 14px;border-radius:999px;cursor:pointer;font-family:var(--sans);font-weight:600;transition:all 200ms cubic-bezier(.23,1,.32,1)}
        .chat-chip:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:translateY(-2px)}
        .chat-typing{display:flex;gap:5px;align-self:flex-start;padding:14px 18px;background:#fff;border:1px solid rgba(23,62,68,.1);border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,.03)}
        .chat-typing span{width:7px;height:7px;border-radius:50%;background:var(--clay);animation:bounce .6s infinite alternate}
        .chat-typing span:nth-child(2){animation-delay:.15s}
        .chat-typing span:nth-child(3){animation-delay:.3s}
        @keyframes bounce{to{transform:translateY(-6px);opacity:.4}}
        .chat-input-bar{padding:16px 22px;background:rgba(255,255,255,.6);border-top:1px solid rgba(23,62,68,.08)}
        .chat-input-wrap{position:relative;display:flex;align-items:flex-end;background:#fff;border:1px solid rgba(23,62,68,.15);border-radius:24px;box-shadow:0 2px 8px rgba(0,0,0,.02);transition:border-color 200ms ease-out,box-shadow 200ms ease-out}
        .chat-input-wrap:focus-within{border-color:var(--clay);box-shadow:0 4px 16px rgba(178,77,57,.1)}
        .chat-input-wrap textarea{flex:1;border:none;background:transparent;padding:12px 16px 12px 18px;font-size:14px;font-family:var(--sans);color:var(--ink-deep);resize:none;min-height:44px;max-height:120px;outline:none}
        .chat-send{position:absolute;right:6px;bottom:6px;width:32px;height:32px;border:none;border-radius:50%;background:var(--clay);color:var(--paper);display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all 200ms cubic-bezier(.23,1,.32,1)}
        .chat-send:disabled{opacity:.4;cursor:default;background:var(--muted)}
        .chat-send:not(:disabled):hover{transform:scale(1.08);background:var(--ink-deep)}
      `}</style>

      {!isOpen && (
        <button className="chat-fab" onClick={() => setIsOpen(true)} aria-label={isIndonesian ? "Buka asisten" : "Open assistant"}>
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-head">
            <div className="chat-head-title"><Bot size={19} />{isIndonesian ? "Jaksa" : "Jaksa"}</div>
            <button className="chat-close" onClick={() => setIsOpen(false)} aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></button>
          </div>
          <div className="chat-body">
            {messages.map(m => (
              <div key={m.id} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
                {m.content}
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="chat-chips">
                {chips.map(c => <button key={c} className="chat-chip" onClick={() => append({ role: 'user', content: c })}>{c}</button>)}
              </div>
            )}
            {isLoading && <div className="chat-typing"><span /><span /><span /></div>}
            <div ref={endRef} />
          </div>
          <form className="chat-input-bar" onSubmit={handleSubmit}>
            <div className="chat-input-wrap">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={isIndonesian ? "Tulis pesan..." : "Type a message..."}
                rows={1}
                disabled={isLoading}
              />
              <button type="submit" className="chat-send" disabled={!input.trim() || isLoading}>
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} style={{ marginLeft: '-1px' }} />}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
