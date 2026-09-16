"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, Maximize, Copy, Check, Trash2, Square, Clock, Share2, RefreshCcw, CheckCheck, Expand } from "lucide-react";
import { useChat } from "ai/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import Link from "next/link";

const CodeBlock = ({ inline, className, children, ...props }: any) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : '';
  const content = String(children).replace(/\n$/, '');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="code-block-wrapper relative group my-4 rounded-lg overflow-hidden border border-[rgba(23,62,68,.15)] shadow-sm max-w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-[#102d33] border-b border-[rgba(247,242,233,.1)]">
          <span className="text-xs font-mono text-[#f1cba5]">{lang}</span>
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-[rgba(247,242,233,.6)] hover:text-white transition-colors flex items-center justify-center w-6 h-6"
            title="Copy code"
            aria-label="Copy code to clipboard"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus as any}
          language={lang}
          PreTag="div"
          className="!m-0 !bg-[#0b1e22] !p-4 !overflow-x-auto text-sm"
          {...props}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    );
  }
  return (
    <code className={`${className} bg-[rgba(23,62,68,.06)] text-[var(--ink-deep)] rounded px-1.5 py-0.5 text-[0.9em] font-mono whitespace-pre-wrap break-words`} {...props}>
      {children}
    </code>
  );
};

const CustomLink = ({ href, children, ...props }: any) => {
  const isUrl = href && (href.startsWith('http') || href.startsWith('/'));
  
  if (isUrl) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        className="citation-chip inline-flex items-center gap-1.5 px-3 py-1.5 mt-1.5 mb-1.5 bg-white border border-[rgba(23,62,68,.15)] hover:border-[var(--clay)] text-[var(--ink-deep)] hover:text-[var(--clay)] rounded-full text-xs font-bold transition-all shadow-sm max-w-full no-underline"
        {...props}
      >
        <span className="truncate max-w-[220px]">{children}</span>
        {href.startsWith('http') && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        )}
      </a>
    );
  }
  return <a href={href} className="text-[var(--clay)] hover:underline break-all" {...props}>{children}</a>;
};

function ExpandableMessage({ content, isIndonesian }: { content: string, isIndonesian: boolean }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
        components={{
          code: CodeBlock,
          a: CustomLink,
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 w-full border border-[var(--line)] rounded-lg">
              <table className="w-full text-sm text-left border-collapse min-w-[400px]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => <th className="px-4 py-2 bg-[var(--paper-strong)] border-b border-[var(--line)] font-bold text-[var(--ink-deep)]">{children}</th>,
          td: ({ children }) => <td className="px-4 py-2 border-b border-[var(--line)] last:border-0">{children}</td>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-[var(--clay)] pl-4 italic my-2 text-[#66736f] bg-[rgba(247,242,233,.5)] py-1">{children}</blockquote>,
          hr: () => <hr className="my-4 border-t border-[var(--line)]" />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function Chatbot({ fullScreen }: { fullScreen?: boolean }) {
  const [isOpen, setIsOpen] = useState(fullScreen ? true : false);
  const { isIndonesian } = useLanguage();
  const router = useRouter();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const initialWelcome = [
    {
      id: "welcome",
      role: "assistant",
      content: isIndonesian
        ? "Halo! Saya Jaksa, asisten Saku Hukum ULM. Ada yang bisa saya bantu terkait kurikulum, fasilitas, atau arah karier?"
        : "Hello! I'm Jaksa, the Saku Hukum ULM assistant. How can I help you with the curriculum, facilities, or career paths?"
    }
  ];

  const [selectedModel, setSelectedModel] = useState("nvidia/nemotron-3-ultra-550b-a55b");
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [processingTime, setProcessingTime] = useState(0);
  const [generationTimes, setGenerationTimes] = useState<Record<string, number>>({});
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleShareMessage = (text: string) => {
    if (navigator.share) {
      navigator.share({ title: 'Saku Hukum ULM', text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert(isIndonesian ? "Teks disalin ke papan klip!" : "Text copied to clipboard!");
    }
  };

  const models = [
    { id: "fast-tier", name: "Fast Tier (Lightning/Groq)", short: "Fast Tier" },
    { id: "nvidia/nemotron-3-super-120b-a12b", name: "Super 120B", short: "Super 120B" },
    { id: "moonshotai/kimi-k3", name: "Kimi K3 (Deep)", short: "Kimi K3" },
    { id: "deepseek-ai/deepseek-v4-flash-0731", name: "DeepSeek V4", short: "DeepSeek" }
  ];

  const currentModel = models.find(m => m.id === selectedModel) || models[0];
  const currentModelName = fullScreen ? currentModel.name : currentModel.short;

  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, append, stop, reload } = useChat({
    api: "/api/chat",
    body: { model: selectedModel },
    initialMessages: initialWelcome as any,
    onFinish: (msg, options: any) => {
      if (startTimeRef.current > 0) {
        const totalTime = Date.now() - startTimeRef.current;
        setGenerationTimes(prev => ({ ...prev, [msg.id]: totalTime }));
        startTimeRef.current = 0;
      }
      if (options?.usage?.totalTokens) {
        setTotalTokensUsed(prev => prev + options.usage.totalTokens);
      }
    },
    onError: (error) => {
      let errorText = isIndonesian 
        ? "Mohon maaf, sistem sedang sangat sibuk. Silakan coba beberapa saat lagi."
        : "Sorry, the system is quite busy right now. Please try again in a moment.";
      const errMsg = (error?.message || '').toLowerCase();
      
      if (errMsg.includes('all models failed')) {
        errorText = isIndonesian
          ? "Maaf ya, sepertinya semua jalur AI kami sedang penuh saat ini. Tunggu sebentar dan coba lagi ya."
          : "I'm sorry, it looks like all our AI tiers are currently busy. Please wait a moment and try again.";
      } else if (errMsg.includes('quota') || errMsg.includes('429') || errMsg.includes('402') || errMsg.includes('exhausted')) {
        errorText = isIndonesian
          ? "Sepertinya kuota model AI ini sedang habis. Kamu bisa pilih model lain dari menu di atas ya!"
          : "It seems this AI model's quota is exhausted. You can pick a different model from the menu above!";
      } else if (errMsg) {
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.error) errorText = parsed.error;
        } catch(e) {
          errorText = error.message;
        }
      }

      setMessages(prev => {
        const msgs = [...prev];
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && lastMsg.role === 'assistant' && (!lastMsg.content || lastMsg.content.includes('<think>'))) {
          msgs[msgs.length - 1] = { ...lastMsg, content: errorText, id: lastMsg.id || Date.now().toString() };
          return msgs;
        }
        return [...msgs, { id: Date.now().toString(), role: "assistant", content: errorText }];
      });
      setProcessingTime(0);
    }
  });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const lowerInput = input.trim().toLowerCase();
    const isGreeting = ['hi', 'hello', 'halo', 'hey', 'hai', 'pagi', 'siang', 'sore', 'malam'].includes(lowerInput);
    const isWhoAreYou = lowerInput.includes('who are you') || lowerInput.includes('siapa kamu') || lowerInput.includes('apa itu jaksa') || lowerInput.includes('what are you') || lowerInput.includes('what can you do');
    
    if (isGreeting || isWhoAreYou) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: input.trim() }]);
      handleInputChange({ target: { value: '' } } as any);
      
      const reply = isWhoAreYou 
        ? (isIndonesian ? "Saya Jaksa, asisten virtual Anda untuk Saku Hukum ULM! Saya bisa membantu menjawab pertanyaan seputar kurikulum, jadwal, atau informasi fakultas." : "I am Jaksa, your virtual assistant for Saku Hukum ULM! I can help you with questions about the curriculum, schedules, or faculty information.")
        : (isIndonesian ? "Halo! Ada yang bisa saya bantu hari ini?" : "Hello! How can I help you today?");
        
      setTimeout(() => {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply }]);
      }, 300);
      return;
    }
    
    handleSubmit(e);
  };

  const handleClearChat = () => {
    localStorage.removeItem("shulm-chat-history");
    setMessages(initialWelcome as any);
  };

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

  useEffect(() => {
    if (isLoading) {
      if (startTimeRef.current === 0) startTimeRef.current = Date.now();
      setProcessingTime(0);
      timerRef.current = setInterval(() => {
        setProcessingTime(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isLoading]);

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
        .chat-panel{position:fixed;bottom:32px;right:32px;z-index:50;width:385px;max-width:calc(100vw - 64px);height:580px;max-height:calc(100dvh - 64px);border-radius:24px;display:flex;flex-direction:column;overflow:hidden;background:rgba(247,242,233,0.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(23,62,68,.12);box-shadow:0 24px 64px rgba(16,45,51,.22);animation:chat-slide-up .4s cubic-bezier(.23,1,.32,1) both}
        @media (max-width: 640px) {
          .chat-fab{bottom:20px;right:20px;width:56px;height:56px}
          .chat-panel{bottom:20px;right:20px;width:calc(100vw - 40px);max-width:calc(100vw - 40px);height:calc(100dvh - 100px);max-height:calc(100dvh - 100px);border-radius:20px}
        }
        .chat-panel-fullscreen{position:fixed;inset:0;z-index:100;width:100vw;height:100dvh;display:flex;flex-direction:column;overflow:hidden;background:var(--paper);animation:chat-slide-up .3s ease-out}
        .chat-panel.is-expanding { transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) !important; width: 100vw !important; height: 100dvh !important; max-width: 100vw !important; max-height: 100dvh !important; bottom: 0 !important; right: 0 !important; border-radius: 0 !important; }
        .chat-head{display:flex;align-items:center;justify-content:space-between;padding:22px 26px;border-bottom:1px solid rgba(23,62,68,.1)}
        .chat-head-title{display:flex;align-items:center;gap:12px;font-family:var(--serif);font-size:22px;line-height:1;letter-spacing:-.03em;color:var(--ink-deep)}
        .chat-head-title svg{color:var(--clay)}
        .chat-close{width:36px;height:36px;border:1px solid rgba(23,62,68,.15);background:transparent;border-radius:50%;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)}
        .chat-close:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:rotate(90deg) scale(1.1);box-shadow:0 6px 16px rgba(16,45,51,0.15)}
        .chat-close:active{transform:rotate(90deg) scale(0.95)}
        
        .chat-action-btn{width:36px;height:36px;border:1px solid rgba(23,62,68,.12);background:rgba(255, 255, 255, 0.4);border-radius:12px;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 250ms cubic-bezier(0.23, 1, 0.32, 1);backdrop-filter:blur(4px)}
        .chat-action-btn:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:translateY(-2px);box-shadow:0 6px 16px rgba(16,45,51,0.15)}
        .chat-action-btn:active{transform:translateY(0) scale(0.96)}
        
        .chat-delete-btn{width:36px;height:36px;border:1px solid rgba(23,62,68,.12);background:rgba(255, 255, 255, 0.4);border-radius:12px;display:grid;place-items:center;cursor:pointer;color:var(--muted);transition:all 250ms cubic-bezier(0.23, 1, 0.32, 1);backdrop-filter:blur(4px)}
        .chat-delete-btn:hover{background:#d93838;color:white;border-color:#d93838;transform:translateY(-2px);box-shadow:0 6px 16px rgba(217,56,56,0.25)}
        .chat-delete-btn:active{transform:translateY(0) scale(0.96)}
        
        .chat-body{flex:1;overflow-y:auto;padding:22px 26px;display:flex;flex-direction:column;gap:18px}
        .chat-msg{max-width:85%;padding:14px 18px;font-size:14px;line-height:1.55;border-radius:18px;box-shadow:0 4px 16px rgba(16,45,51,.03)}
        .chat-msg-user{align-self:flex-end;background:var(--ink-deep);color:var(--paper);border-bottom-right-radius:4px}
        .chat-msg-bot{align-self:flex-start;background:rgba(255,253,250,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(23,62,68,.08);color:var(--ink-deep);border-bottom-left-radius:4px}
        .chat-chips{display:flex;flex-wrap:wrap;gap:10px;padding-top:8px}
        .chat-chip{border:1px solid rgba(23,62,68,.15);background:rgba(255,255,255,.7);color:var(--ink-deep);font-size:12px;padding:8px 16px;border-radius:999px;cursor:pointer;font-family:var(--sans);font-weight:700;transition:all 200ms cubic-bezier(.23,1,.32,1)}
        .chat-chip:hover{background:var(--ink-deep);color:var(--paper);border-color:var(--ink-deep);transform:translateY(-2px)}
        .chat-input-bar{padding:18px 26px;background:rgba(247,242,233,.8);border-top:1px solid rgba(23,62,68,.1)}
        .chat-input-wrap{position:relative;display:flex;align-items:flex-end;background:var(--card);border:1px solid rgba(23,62,68,.18);border-radius:26px;box-shadow:0 4px 16px rgba(0,0,0,.03);transition:border-color 200ms ease-out,box-shadow 200ms ease-out}
        .chat-input-wrap:focus-within{border-color:var(--clay);box-shadow:0 6px 20px rgba(178,77,57,.12)}
        .chat-input-wrap textarea{flex:1;border:none;background:transparent;padding:14px 16px 14px 20px;font-size:14px;font-family:var(--sans);color:var(--ink-deep);resize:none;min-height:50px;max-height:120px;outline:none}
        .chat-send{position:absolute;right:8px;bottom:8px;width:34px;height:34px;border:none;border-radius:50%;background:var(--clay);color:var(--paper);display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)}
        .chat-send:disabled{opacity:.4;cursor:default;background:var(--muted);transform:scale(0.95)}
        .chat-send:not(:disabled):hover{transform:scale(1.12) translateY(-2px);background:var(--ink-deep);box-shadow:0 6px 16px rgba(16,45,51,0.2)}
        .chat-send:not(:disabled):active{transform:scale(0.9)}
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
        .glass-model-menu { position: absolute; bottom: calc(100% + 8px); left: 0; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(23, 62, 68, 0.1); border-radius: 12px; padding: 6px; box-shadow: 0 16px 40px rgba(16, 45, 51, 0.15); display: flex; flex-direction: column; min-width: 160px; max-width: 220px; max-height: 250px; overflow-y: auto; z-index: 100; animation: chat-slide-up 0.25s cubic-bezier(0.23, 1, 0.32, 1); transform-origin: bottom left; }
        .glass-model-btn { display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%; padding: 10px 12px; text-align: left; font-size: 11px; font-weight: 700; color: #43534e; border-radius: 8px; transition: all 150ms ease; border: none; background: transparent; cursor: pointer; line-height: 1.3; }
        .glass-model-btn:hover { background: rgba(23, 62, 68, 0.05); }
        .glass-model-btn.active { background: rgba(23, 62, 68, 0.08); color: var(--clay); }
        .glass-dropdown-toggle { background: rgba(23, 62, 68, 0.04); border: 1px solid rgba(23, 62, 68, 0.08); color: var(--ink-deep); font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 200ms ease; margin-top: 4px; }
        .glass-dropdown-toggle:hover { background: rgba(23, 62, 68, 0.08); }
        .chat-msg-time { font-size: 10px; opacity: 0.5; margin-top: 6px; text-align: right; display: flex; justify-content: flex-end; align-items: center; gap: 4px; }
        .chat-stop-active { background: var(--ink-deep) !important; opacity: 1 !important; cursor: pointer !important; }
        .chat-stop-spinner { position: absolute; inset: 2px; border: 2px solid rgba(255,255,255,0.15); border-top-color: rgba(255,255,255,0.9); border-radius: 50%; animation: chat-spin 1s linear infinite; pointer-events: none; }
        @keyframes chat-spin { to { transform: rotate(360deg); } }
      `}</style>

      {!isOpen && !fullScreen && (
        <button type="button" className="chat-fab" onClick={() => setIsOpen(true)} aria-label={isIndonesian ? "Buka asisten" : "Open assistant"}>
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <div className={fullScreen ? "chat-panel-fullscreen" : "chat-panel"}>
          <div className="chat-head items-start">
            <div className="flex flex-col">
              <div className="chat-head-title">
                <Bot size={19} />
                {isIndonesian ? "Jaksa" : "Jaksa"}
              </div>
              <div className="relative">
                <button 
                  type="button" 
                  onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                  className="glass-dropdown-toggle"
                >
                  <span className="opacity-70">AI:</span> {currentModelName}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isModelMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', marginLeft: '2px', opacity: 0.6 }}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {totalTokensUsed > 0 && (
                  <div style={{ fontSize: '9px', color: 'var(--clay)', fontWeight: 800, opacity: 0.8, marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {totalTokensUsed.toLocaleString()} Tokens Used
                  </div>
                )}
                {isModelMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsModelMenuOpen(false)}></div>
                    <div className="glass-model-menu z-50">
                      {models.map(m => (
                        <button
                          key={m.id}
                          type="button"
                          className={`glass-model-btn ${selectedModel === m.id ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedModel(m.id);
                            setIsModelMenuOpen(false);
                          }}
                        >
                          {fullScreen ? m.name : m.short}
                          {selectedModel === m.id && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 items-center mt-1">
              <button
                type="button"
                onClick={handleClearChat}
                className="chat-delete-btn mr-1"
                aria-label={isIndonesian ? "Hapus percakapan" : "Clear chat"}
                title="Clear Chat"
              >
                <Trash2 size={15} />
              </button>
              {!fullScreen && (
                <button
                  type="button"
                  onClick={() => router.push("/chat")}
                  className="chat-action-btn"
                  aria-label={isIndonesian ? "Layar Penuh" : "Fullscreen"}
                  title="Expand to Fullscreen"
                >
                  <Maximize size={15} />
                </button>
              )}
              {!fullScreen && <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></button>}
              {fullScreen && <Link href="/" className="chat-close flex items-center justify-center" aria-label={isIndonesian ? "Tutup" : "Close"}><X size={16} /></Link>}
            </div>
          </div>
          <div className="chat-body">
            {messages.map(m => {
              if (m.role === 'assistant' && !m.content && (!m.toolInvocations || m.toolInvocations.length === 0)) {
                return null;
              }
              const cleanContent = m.content.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim();
              if (m.role === 'assistant' && !cleanContent && m.content.includes('<think>') && !m.content.includes('</think>')) {
                return null; // Hide the bubble entirely if it's currently only streaming a think block
              }
              
              return (
                <div key={m.id} className={`chat-msg ${m.role === "user" ? "chat-msg-user" : "chat-msg-bot"}`}>
                  <ExpandableMessage content={m.role === 'assistant' ? cleanContent : m.content} isIndonesian={isIndonesian} />
                  
                  {m.role === "assistant" && (
                    <div className="chat-msg-actions">
                      <button onClick={() => handleCopyMessage(m.id, cleanContent)} className="chat-msg-action-btn" title="Copy" aria-label="Copy message">
                        {copiedMessageId === m.id ? <CheckCheck size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                      <button onClick={() => handleShareMessage(cleanContent)} className="chat-msg-action-btn" title="Share" aria-label="Share message">
                        <Share2 size={14} />
                      </button>
                      <button onClick={() => setExpandedMessage(cleanContent)} className="chat-msg-action-btn" title="Expand" aria-label="Expand message">
                        <Expand size={14} />
                      </button>
                      {messages[messages.length - 1]?.id === m.id && (
                        <button onClick={() => reload()} className="chat-msg-action-btn" title="Retry" aria-label="Retry message">
                          <RefreshCcw size={14} />
                        </button>
                      )}
                    </div>
                  )}

                  {m.role === "assistant" && generationTimes[m.id] && (
                    <div className="chat-msg-time">
                      <Clock size={10} /> {(generationTimes[m.id] / 1000).toFixed(1)}s
                    </div>
                  )}
                </div>
              );
            })}
            {messages.length <= 1 && (
              <div className="chat-chips">
                {chips.map(c => <button type="button" key={c} className="chat-chip" onClick={() => append({ role: 'user', content: c })}>{c}</button>)}
              </div>
            )}
            {isLoading && (() => {
              const latestMessage = messages[messages.length - 1];
              let thinkingText = isIndonesian ? "Sedang memproses..." : "Working on it...";
              if (selectedModel === 'moonshotai/kimi-k3' || selectedModel === 'deepseek-ai/deepseek-v4-flash-0731') {
                thinkingText = isIndonesian ? "Berpikir mendalam (ini mungkin butuh waktu)..." : "Thinking deeply, this may take a bit longer...";
              }
              const activeTool = latestMessage?.toolInvocations?.[0];
              if (activeTool && activeTool.state !== 'result') {
                if (activeTool.toolName === "web_search") thinkingText = isIndonesian ? "Mencari di internet..." : "Searching the web...";
                else if (activeTool.toolName === "readSiteContent") thinkingText = isIndonesian ? "Mengecek halaman kurikulum..." : "Checking the curriculum page...";
                else thinkingText = isIndonesian ? "Melakukan kroscek sumber..." : "Cross-checking sources...";
              }
              const isAssistantStream = latestMessage?.role === 'assistant';
              const latestCleanContent = latestMessage?.content?.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim() || '';
              if (isAssistantStream && latestCleanContent.length > 0 && !activeTool) return null;
              
              return (
                <div className="flex items-center gap-2 mt-2 mb-2">
                  <div className="chat-typing">
                    <div className="chat-typing-dots">
                      <span /><span /><span />
                    </div>
                    <span className="chat-typing-text">
                      {thinkingText} <span className="opacity-60 ml-1">{(processingTime / 1000).toFixed(1)}s</span>
                    </span>
                  </div>
                </div>
              );
            })()}
            <div ref={endRef} />
          </div>
          <form className="chat-input-bar" onSubmit={onFormSubmit}>
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
              {isLoading ? (
                <button 
                  type="button" 
                  onClick={() => stop()} 
                  className="chat-send chat-stop-active" 
                  title="Stop generating"
                >
                  <Square size={10} fill="currentColor" className="relative z-10" />
                  <div className="chat-stop-spinner"></div>
                </button>
              ) : (
                <button type="submit" className="chat-send" disabled={!input.trim()}>
                  <Send size={14} style={{ marginLeft: '-1px' }} />
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {expandedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm" onClick={() => setExpandedMessage(null)}>
          <div 
            className="w-full max-w-3xl max-h-[90dvh] bg-[var(--paper)] rounded-2xl shadow-2xl overflow-hidden border border-[rgba(23,62,68,0.1)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(23,62,68,0.08)] bg-[rgba(255,255,255,0.4)]">
              <div className="flex items-center gap-2">
                <div className="chat-bot-avatar" style={{width:24,height:24}}><Bot size={14} /></div>
                <h3 className="font-serif text-lg m-0 leading-none">Jaksa</h3>
              </div>
              <button onClick={() => setExpandedMessage(null)} className="chat-action-btn w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--ink-deep)] hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-8 text-[15px] leading-relaxed">
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code: CodeBlock as any,
                  }}
                >
                  {expandedMessage}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
