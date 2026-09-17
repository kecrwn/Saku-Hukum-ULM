"use client";
import React, { useState, useEffect } from "react";
import { X, Moon, Sun, Type, Coffee, List, ChevronRight, ChevronLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Theme = "light" | "sepia" | "night";

interface BookReaderProps {
  book: {
    id: string;
    title: string;
    titleEn?: string;
    author: string;
    coverColor: string;
    chapters: { title: string; content: string; titleEn?: string; contentEn?: string }[];
  };
  onClose: () => void;
}

export default function BookReader({ book, onClose }: BookReaderProps) {
  const { isIndonesian } = useLanguage();
  const [theme, setTheme] = useState<Theme>("sepia");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [isMounted, setIsMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cycleTheme = () => {
    if (theme === "light") setTheme("sepia");
    else if (theme === "sepia") setTheme("night");
    else setTheme("light");
  };

  const cycleFontSize = () => {
    if (fontSize === "small") setFontSize("medium");
    else if (fontSize === "medium") setFontSize("large");
    else setFontSize("small");
  };

  const displayTitle = (!isIndonesian && book.titleEn) ? book.titleEn : book.title;

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className={`fixed inset-0 z-[9999] flex flex-col font-dm-serif theme-${theme}`}
      style={{
        backgroundColor: theme === 'light' ? '#fcfcfc' : theme === 'sepia' ? '#fdf6e3' : '#121212',
        color: theme === 'light' ? '#1a1a1a' : theme === 'sepia' ? '#4a3c2c' : '#e0e0e0',
        transition: 'background-color 0.5s ease, color 0.5s ease'
      }}
    >
      <style>{`
        .theme-light { --border-color: rgba(0,0,0,0.1); --hover-bg: rgba(0,0,0,0.05); }
        .theme-sepia { --border-color: rgba(92,75,55,0.15); --hover-bg: rgba(92,75,55,0.08); }
        .theme-night { --border-color: rgba(255,255,255,0.1); --hover-bg: rgba(255,255,255,0.05); }

        .reader-controls {
          border-bottom: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
        }
        
        .control-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 99px;
          border: 1px solid var(--border-color);
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .control-btn:hover {
          background: var(--hover-bg);
          transform: translateY(-1px);
        }

        .chapter-btn {
          width: 100%;
          text-align: left;
          padding: 12px 16px;
          border-radius: 8px;
          font-family: var(--font-manrope), sans-serif;
          font-size: 15px;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .chapter-btn:hover { background: var(--hover-bg); }
        .chapter-btn.active {
          background: var(--hover-bg);
          border-color: var(--border-color);
          font-weight: 700;
        }

        .markdown-reader {
          font-family: var(--font-lora), serif;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto;
          padding-bottom: 100px;
        }
        .markdown-reader h1 { font-size: 2.5em; margin-bottom: 1em; font-family: var(--font-dm-serif), serif; line-height: 1.2; }
        .markdown-reader h2 { font-size: 1.8em; margin-top: 1.5em; margin-bottom: 0.8em; font-family: var(--font-dm-serif), serif; }
        .markdown-reader h3 { font-size: 1.4em; margin-top: 1.2em; margin-bottom: 0.6em; }
        .markdown-reader p { margin-bottom: 1.2em; text-align: justify; }
        .markdown-reader ul, .markdown-reader ol { margin-bottom: 1.2em; padding-left: 2em; }
        .markdown-reader li { margin-bottom: 0.5em; }
        .markdown-reader blockquote {
          border-left: 4px solid currentColor;
          padding-left: 1em;
          opacity: 0.8;
          font-style: italic;
          margin: 1.5em 0;
        }

        .font-small .markdown-reader { font-size: 16px; }
        .font-medium .markdown-reader { font-size: 19px; }
        .font-large .markdown-reader { font-size: 24px; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.5); }
      `}</style>

      {/* Top Navbar */}
      <div className="reader-controls flex justify-between items-center px-4 md:px-8 py-4 shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="control-btn" aria-label={isIndonesian ? "Tutup" : "Close"}>
            <X size={18} strokeWidth={2.5} /> <span className="hidden sm:inline">{isIndonesian ? "Tutup" : "Close"}</span>
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="control-btn" aria-label="Daftar Isi">
            <List size={18} /> <span className="hidden sm:inline">{isIndonesian ? "Daftar Isi" : "Contents"}</span>
          </button>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 max-w-[30%] hidden md:block">
          <h2 className="text-sm font-manrope font-bold truncate opacity-60 text-center tracking-widest uppercase">
            {displayTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={cycleFontSize} className="control-btn" title={isIndonesian ? "Ukuran Font" : "Font Size"}>
            <Type size={18} /> <span className="hidden sm:inline">{fontSize === "small" ? (isIndonesian ? "Kecil" : "Small") : fontSize === "medium" ? (isIndonesian ? "Sedang" : "Medium") : (isIndonesian ? "Besar" : "Large")}</span>
          </button>
          <button onClick={cycleTheme} className="control-btn" title={isIndonesian ? "Tema Membaca" : "Reading Theme"}>
            {theme === "light" && <Sun size={18} />}
            {theme === "sepia" && <Coffee size={18} />}
            {theme === "night" && <Moon size={18} />}
            <span className="hidden sm:inline">{theme === "light" ? (isIndonesian ? "Terang" : "Light") : theme === "sepia" ? "Sepia" : (isIndonesian ? "Malam" : "Night")}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar (TOC) */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full md:w-[300px] lg:w-[350px] shrink-0 h-full overflow-y-auto border-r border-[var(--border-color)] absolute md:relative z-10"
              style={{ backgroundColor: 'inherit' }}
            >
              <div className="p-6">
                <div className="mb-8">
                  <div className="w-16 h-24 mb-4 rounded-sm shadow-md" style={{ backgroundColor: book.coverColor }} />
                  <h1 className="text-2xl font-bold leading-tight mb-2">{displayTitle}</h1>
                  <p className="font-manrope text-sm opacity-60 uppercase tracking-wider">{book.author}</p>
                </div>
                
                <nav className="space-y-2">
                  {book.chapters.map((ch, idx) => {
                    const chTitle = (!isIndonesian && ch.titleEn) ? ch.titleEn : ch.title;
                    return (
                      <button 
                        key={idx}
                        onClick={() => {
                          setActiveChapter(idx);
                          if (window.innerWidth < 768) setSidebarOpen(false);
                          document.getElementById('reader-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`chapter-btn flex items-center justify-between group ${activeChapter === idx ? 'active' : ''}`}
                      >
                        <span className="line-clamp-2 pr-4">{chTitle}</span>
                        {activeChapter === idx && <ChevronRight size={16} className="shrink-0 opacity-50" />}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Article Reader Pane */}
        <div id="reader-scroll-area" className={`flex-1 h-full overflow-y-auto font-${fontSize} scroll-smooth`}>
          <div className="px-6 md:px-12 lg:px-24 py-12 md:py-20">
            
            {!isIndonesian && !book.chapters[activeChapter].contentEn && (
              <div className="mb-12 p-6 border border-[#d4b872]/30 bg-[#d4b872]/10 rounded-xl text-center">
                <p className="font-manrope text-sm opacity-80">
                  An English translation for this book is currently being generated by our AI agents. Showing original text.
                </p>
              </div>
            )}

            <motion.div 
              key={activeChapter + (isIndonesian ? 'id' : 'en')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="markdown-reader"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {(!isIndonesian && book.chapters[activeChapter].contentEn) 
                  ? book.chapters[activeChapter].contentEn 
                  : book.chapters[activeChapter].content}
              </ReactMarkdown>
            </motion.div>
            
            {/* Chapter Navigation Footer */}
            <div className="mt-20 pt-8 border-t border-[var(--border-color)] flex justify-between font-manrope">
              {activeChapter > 0 ? (
                <button 
                  onClick={() => {
                    setActiveChapter(activeChapter - 1);
                    document.getElementById('reader-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="control-btn"
                >
                  <ChevronLeft size={16} /> {isIndonesian ? "Bab Sebelumnya" : "Previous Chapter"}
                </button>
              ) : <div/>}
              
              {activeChapter < book.chapters.length - 1 && (
                <button 
                  onClick={() => {
                    setActiveChapter(activeChapter + 1);
                    document.getElementById('reader-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="control-btn"
                >
                  {isIndonesian ? "Bab Selanjutnya" : "Next Chapter"} <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
