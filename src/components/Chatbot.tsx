"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, Maximize } from "lucide-react";
import { useChat } from "ai/react";
import { useLanguage } from "@/contexts/LanguageContext";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import Link from "next/link";

function ExpandableMessage({ content, isIndonesian }: { content: string, isIndonesian: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > 350;
  
  const displayContent = isLong && !expanded ? content.slice(0, 350) + "..." : content;

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{displayContent}</ReactMarkdown>
      {isLong && (
        <button type="button" onClick={() => setExpanded(!expanded)} className="read-more-btn">
          {expanded ? (isIndonesian ? "Tutup" : "Show less") : (isIndonesian ? "Baca selengkapnya" : "Read more")}
        </button>
      )}
    </div>
  );
}

export function Chatbot({ fullScreen }: { fullScreen?: boolean }) {
  const [isOpen, setIsOpen] = useState(fullScreen ? true : false);
  const { isIndonesian } = useLanguage();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
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

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("shulm-chat-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error("Failed to parse chat history");
      }
    }
  }, [setMessages]);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("shulm-chat-history", JSON.stringify(messages));
    }
  }, [messages]);

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
        @keyframes chat-fab-pulse{0%,100%{box-shadow:0 8px 30px rgba(16,45,51,.2),0 0 0 0 rgba(178,77,57,.25)}70%{box-shadow:0 8px 30px rgba(16,45,51,.2),0 0 0 14px rgba(178,77,57,0)}}
        @keyframes chat-slide-up{from{opacity:0;transform:translateY(16px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .chat-fab{position:fixed;bottom:32px;right:32px;z-index:50;width:60px;height:60px;border:1px solid rgba(255,255,255,0.15);border-radius:50%;background:rgba(16,45,51,0.85);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);color:#f1cba5;display:grid;place-items:center;cursor:pointer;animation:chat-fab-pulse 3.5s ease-in-out infinite;transition:transform 250ms cubic-bezier(.23,1,.32,1),background 250ms ease-out,box-shadow 250ms ease-out;box-shadow:0 12px 32px rgba(16,45,51,0.25)}
        .chat-fab:hover{transform:scale(1.05) translateY(-2px);background:rgba(16,45,51,0.95);color:var(--paper);box-shadow:0 16px 40px rgba(16,45,51,0.35)}
        .chat-fab:active{transform:scale(.94)}
        .chat-panel{position:fixed;bottom:32px;right:32px;z-index:50;width:385px;max-width:calc(100% - 64px);height:580px;max-height:calc(100dvh - 64px);border-radius:24px;display:flex;flex-direction:column;overflow:hidden;background:rgba(247,242,233,0.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(23,62,68,.12);box-shadow:0 24px 64px rgba(16,45,51,.22);animation:chat-slide-up .4s cubic-bezier(.23,1,.32,1) both}
        .chat-panel-fullscreen{position:fixed;inset:0;z-index:100;width:100vw;height:100dvh;display:flex;flex-direction:column;overflow:hidden;background:var(--paper);animation:chat-slide-up .3s ease-out}
        .chat-head{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid rgba(23,62,68,.1)}
        .chat-head-title{display:flex;align-items:center;gap:12px;font-family:var(--serif);font-size:22px;line-height:1;letter-spacing:-.03em;color:var(--ink-deep)}
        .chat-head-title svg{color:var(--clay)}
        .chat-close{width:36px;height:36px;border:1px solid rgba(23,62,68,.15);background:transparent;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 200ms ease-out}
        .chat-close:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:rotate(90deg)}
        .chat-body{flex:1;overflow-y:auto;padding:22px 26px;display:flex;flex-direction:column;gap:18px}
        .chat-msg{max-width:85%;padding:14px 18px;font-size:14px;line-height:1.55;border-radius:18px;box-shadow:0 4px 16px rgba(16,45,51,.03)}
        .chat-msg-user{align-self:flex-end;background:var(--ink-deep);color:var(--paper);border-bottom-right-radius:4px}
        .chat-msg-bot{align-self:flex-start;background:rgba(255,253,250,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(23,62,68,.08);color:var(--ink-deep);border-bottom-left-radius:4px}
        .chat-chips{display:flex;flex-wrap:wrap;gap:10px;padding-top:8px}
        .chat-chip{border:1px solid rgba(23,62,68,.15);background:rgba(255,255,255,.7);color:var(--ink-deep);font-size:12px;padding:8px 16px;border-radius:999px;cursor:pointer;font-family:var(--sans);font-weight:700;transition:all 200ms cubic-bezier(.23,1,.32,1)}
        .chat-chip:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:translateY(-2px)}
        .chat-typing{display:flex;gap:6px;align-self:flex-start;padding:16px 20px;background:rgba(255,253,250,0.85);backdrop-filter:blur(8px);border:1px solid rgba(23,62,68,.08);border-radius:18px;border-bottom-left-radius:4px;box-shadow:0 4px 16px rgba(16,45,51,.03)}
        .chat-typing span{width:8px;height:8px;border-radius:50%;background:var(--clay);animation:bounce .6s infinite alternate}
        .chat-typing span:nth-child(2){animation-delay:.15s}
        .chat-typing span:nth-child(3){animation-delay:.3s}
        @keyframes bounce{to{transform:translateY(-6px);opacity:.3}}
        .chat-input-bar{padding:18px 26px;background:rgba(247,242,233,.8);border-top:1px solid rgba(23,62,68,.1)}
        .chat-input-wrap{position:relative;display:flex;align-items:flex-end;background:var(--card);border:1px solid rgba(23,62,68,.18);border-radius:26px;box-shadow:0 4px 16px rgba(0,0,0,.03);transition:border-color 200ms ease-out,box-shadow 200ms ease-out}
        .chat-input-wrap:focus-within{border-color:var(--clay);box-shadow:0 6px 20px rgba(178,77,57,.12)}
        .chat-input-wrap textarea{flex:1;border:none;background:transparent;padding:14px 16px 14px 20px;font-size:14px;font-family:var(--sans);color:var(--ink-deep);resize:none;min-height:50px;max-height:120px;outline:none}
        .chat-send{position:absolute;right:8px;bottom:8px;width:34px;height:34px;border:none;border-radius:50%;background:var(--clay);color:var(--paper);display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all 200ms cubic-bezier(.23,1,.32,1)}
        .chat-send:disabled{opacity:.4;cursor:default;background:var(--muted)}
        .chat-send:not(:disabled):hover{transform:scale(1.08);background:var(--ink-deep)}
        .markdown-body { display: flex; flex-direction: column; gap: 8px; }
        .markdown-body p { margin: 0; }
        .markdown-body strong { font-weight: 800; color: inherit; }
        .markdown-body em { font-style: italic; }
        .markdown-body ul, .markdown-body ol { margin: 4px 0; padding-left: 20px; }
        .markdown-body li { margin-bottom: 4px; }
        .markdown-body a { text-decoration: underline; text-underline-offset: 2px; }
        .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 { margin: 12px 0 6px; font-family: var(--serif); line-height: 1.2; }
        .chat-msg-bot .markdown-body strong { color: var(--clay); }
        .read-more-btn { align-self: flex-start; margin-top: 6px; font-size: 11px; font-weight: 800; color: var(--clay); background: transparent; border: none; cursor: pointer; padding: 0; text-transform: uppercase; letter-spacing: 0.05em; transition: opacity 150ms ease-out; }
        .read-more-btn:hover { opacity: 0.7; }
        .chat-msg-user .read-more-btn { color: var(--paper); opacity: 0.8; }
      `}</style>

      {!isOpen && !fullScreen && (
        <button type="button" className="chat-fab" onClick={() => setIsOpen(true)} aria-label={isIndonesian ? "Buka asisten" : "Open assistant"}>
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <div className={fullScreen ? "chat-panel-fullscreen" : "chat-panel"}>
          <div className="chat-head">
            <div className="chat-head-title"><Bot size={19} />{isIndonesian ? "Jaksa" : "Jaksa"}</div>
            <div className="flex gap-2 items-center">
              {!fullScreen && <Link href="/chat" className="chat-close flex items-center justify-center" aria-label={isIndonesian ? "Layar Penuh" : "Fullscreen"}><Maximize size={15} /></Link>}
              {!fullScreen && <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></button>}
              {fullScreen && <Link href="/" className="chat-close flex items-center justify-center" aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></Link>}
            </div>
          </div>
          <div className="chat-body">
            {messages.map(m => (
              <div key={m.id} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
                <ExpandableMessage content={m.content} isIndonesian={isIndonesian} />
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="chat-chips">
                {chips.map(c => <button type="button" key={c} className="chat-chip" onClick={() => append({ role: 'user', content: c })}>{c}</button>)}
              </div>
            )}
            {isLoading && (() => {
              const latestMessage = messages[messages.length - 1];
              const activeTool = latestMessage?.toolInvocations?.[0];
              let thinkingText = isIndonesian ? "Berpikir..." : "Thinking...";
              if (activeTool) {
                if (activeTool.toolName === "web_search") thinkingText = isIndonesian ? "Mencari di internet..." : "Searching the web...";
                else if (activeTool.toolName === "readSiteContent") thinkingText = isIndonesian ? "Membaca panduan situs..." : "Reading site content...";
              }
              const isAssistantStream = latestMessage?.role === 'assistant';
              if (isAssistantStream && latestMessage.content.length > 0 && !activeTool) return null;
              
              return (
                <div className="chat-typing" style={{ alignItems: 'center' }}>
                  <div className="flex gap-[4px] items-center" style={{marginTop: '0px'}}>
                    <span /><span /><span />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: '10px', fontWeight: 700, letterSpacing: '0.02em', marginTop: '-2px' }}>{thinkingText}</span>
                </div>
              );
            })()}
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
