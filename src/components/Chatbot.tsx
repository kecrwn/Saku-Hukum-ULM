"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { isIndonesian } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Set initial welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: isIndonesian 
            ? "Halo! Saya asisten virtual Saku Hukum ULM. Ada yang bisa saya bantu terkait jalur Jaksa atau kurikulum hukum?"
            : "Hello! I'm the Saku Hukum ULM virtual assistant. How can I help you with the Prosecutor track or law curriculum today?"
        }
      ]);
    }
  }, [isIndonesian, messages.length]);

  // Isolated send message handler - ready for API integration later
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    // Reset textarea height
    const textarea = document.getElementById('chat-input') as HTMLTextAreaElement;
    if (textarea) textarea.style.height = 'auto';

    // TODO: Wire up Nemotron API here later.
    // For now, simulate network delay and respond with a placeholder.
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isIndonesian
          ? "Fitur ini masih dalam tahap pengembangan. (Placeholder backend AI)"
          : "This feature is still in development. (AI backend placeholder)"
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ fontFamily: "var(--sans)" }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full shadow-lg hover:-translate-y-1 transition-transform flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-md"
          style={{ 
            backgroundColor: "color-mix(in srgb, var(--ink) 90%, transparent)", 
            color: "var(--paper)", 
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)" 
          }}
          aria-label={isIndonesian ? "Buka Obrolan" : "Open Chat"}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div 
          className="rounded-2xl flex flex-col w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] overflow-hidden animate-in zoom-in-95 origin-bottom-right"
          style={{ 
            backgroundColor: "rgba(247, 242, 233, 0.8)", // glassmorphic paper background
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.3)", 
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.2)" 
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 border-b"
            style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.4)", 
              borderColor: "rgba(0, 0, 0, 0.05)", 
              color: "var(--ink-deep)" 
            }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} style={{ color: "var(--reed)" }} />
              <h3 className="font-medium text-sm" style={{ fontFamily: "var(--serif)", fontSize: "18px", letterSpacing: "-0.02em" }}>
                {isIndonesian ? "Asisten Saku Hukum" : "Saku Hukum Assistant"}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 transition-opacity"
              aria-label={isIndonesian ? "Tutup" : "Close"}
              style={{ color: "var(--ink)" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "rounded-br-sm"
                      : "rounded-bl-sm border"
                  }`}
                  style={msg.role === "user" 
                    ? { backgroundColor: "color-mix(in srgb, var(--ink) 95%, transparent)", color: "var(--paper)" } 
                    : { 
                        backgroundColor: "rgba(255, 255, 255, 0.7)", 
                        color: "var(--ink)", 
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)"
                      }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div 
                  className="border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1 shadow-sm"
                  style={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.7)", 
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)"
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--muted)" }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: "var(--muted)" }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: "var(--muted)" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", borderColor: "rgba(0, 0, 0, 0.05)" }}>
            <form
              onSubmit={handleSendMessage}
              className="flex items-end gap-2"
            >
              <textarea
                id="chat-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isIndonesian ? "Tulis pesan..." : "Type a message..."}
                rows={1}
                className="flex-1 border rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 resize-none bg-transparent"
                style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.8)", 
                  color: "var(--ink)",
                  outlineColor: "var(--clay)",
                  minHeight: "40px",
                  maxHeight: "120px"
                }}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="rounded-full shrink-0 flex items-center justify-center h-10 w-10 disabled:opacity-50 transition-colors shadow-sm mb-0.5"
                style={{ backgroundColor: "var(--clay)", color: "var(--paper)" }}
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
