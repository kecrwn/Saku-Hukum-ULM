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
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
          aria-label={isIndonesian ? "Buka Obrolan" : "Open Chat"}
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-2xl flex flex-col w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-zinc-500" />
              <h3 className="font-medium text-sm">
                {isIndonesian ? "Asisten Saku Hukum" : "Saku Hukum Assistant"}
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 p-1"
              aria-label={isIndonesian ? "Tutup" : "Close"}
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-zinc-900">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-tr-sm"
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-tl-sm border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isIndonesian ? "Tulis pesan..." : "Type a message..."}
                className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isTyping}
                className="rounded-full shrink-0"
              >
                {isTyping ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
