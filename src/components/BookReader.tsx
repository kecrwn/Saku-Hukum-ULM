"use client";
import React, { useState, useEffect } from "react";
import { X, Moon, Sun, Type, Coffee, List, ChevronRight, ChevronLeft, Minus, Plus, ArrowUp, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

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
}

export default function BookReader({ book }: BookReaderProps) {
  const { isIndonesian } = useLanguage();
  const [theme, setTheme] = useState<Theme>("sepia");
  const fontSizes = ["x-small", "small", "medium", "large", "x-large", "2x-large"] as const;
  type FontSize = typeof fontSizes[number];
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [isMounted, setIsMounted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 10);
    document.body.style.overflow = "hidden";
    
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        if (window.innerWidth < 1024) setSidebarOpen(false);
        else setSidebarOpen(true);
      }
    };
    if (window.innerWidth < 1024) setSidebarOpen(false);
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

  const decreaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx > 0) setFontSize(fontSizes[idx - 1]);
  };

  const increaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx < fontSizes.length - 1) setFontSize(fontSizes[idx + 1]);
  };

  useEffect(() => {
    document.getElementById('reader-scroll-area')?.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeChapter]);

  const displayTitle = (!isIndonesian && book.titleEn) ? book.titleEn : book.title;

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={`relative flex flex-col font-dm-serif theme-${theme} min-h-[calc(100vh-74px)]`}
      style={{
        backgroundColor: theme === 'light' ? '#fcfcfc' : theme === 'sepia' ? '#fdf6e3' : '#121212',
        color: 'var(--text-primary)',
        transition: 'background-color 0.25s ease, color 0.25s ease'
      }}
    >
      <style>{`
        .theme-light { --border-color: rgba(0,0,0,0.1); --hover-bg: rgba(0,0,0,0.05); --text-primary: #1a1a1a; --text-heading: #102d33; }
        .theme-sepia { --border-color: rgba(92,75,55,0.15); --hover-bg: rgba(92,75,55,0.08); --text-primary: #4a3c2c; --text-heading: #3a2a18; }
        .theme-night { --border-color: rgba(255,255,255,0.1); --hover-bg: rgba(255,255,255,0.05); --text-primary: #e0e0e0; --text-heading: #ffffff; }

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
          width: 100%;
          margin: 0 auto;
          padding-bottom: 100px;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }
        .markdown-reader h1, .markdown-reader h2, .markdown-reader h3, .markdown-reader h4 {
          font-family: var(--font-dm-serif), serif;
          color: var(--text-heading, inherit);
        }
        .markdown-reader h1 { font-size: 2.5em; margin-bottom: 1em; line-height: 1.2; }
        .markdown-reader h2 { font-size: 1.8em; margin-top: 1.8em; margin-bottom: 0.8em; }
        .markdown-reader h3 { font-size: 1.4em; margin-top: 1.5em; margin-bottom: 0.6em; font-family: var(--font-manrope), sans-serif; font-weight: 700; }
        .markdown-reader p { margin-bottom: 1.4em; text-align: left; }
        .markdown-reader ul, .markdown-reader ol { margin-bottom: 1.4em; padding-left: 2em; }
        .markdown-reader li { margin-bottom: 0.6em; padding-left: 0.2em; }
        .markdown-reader li::marker { color: var(--clay, currentColor); font-weight: 700; }
        .markdown-reader blockquote {
          border-left: 4px solid var(--clay, currentColor);
          background: var(--hover-bg);
          padding: 1.2em 1.5em;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          margin: 1.8em 0;
          color: inherit;
          opacity: 0.9;
        }
        .markdown-reader cite {
          background: var(--hover-bg);
          border: 1px solid var(--border-color);
          padding: 0.1em 0.3em;
          border-radius: 4px;
          font-family: var(--font-manrope), sans-serif;
          font-weight: 700;
          font-style: normal;
          font-size: 0.9em;
          color: var(--clay, currentColor);
          white-space: nowrap;
        }
        .markdown-reader strong { font-weight: 700; }
        .markdown-reader em { font-style: italic; }
        .markdown-reader table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          display: block;
          overflow-x: auto;
          white-space: nowrap;
        }
        .markdown-reader th, .markdown-reader td {
          border: 1px solid var(--border-color);
          padding: 12px 16px;
          text-align: left;
        }
        .markdown-reader th {
          background: var(--hover-bg);
          font-family: var(--font-manrope), sans-serif;
          font-weight: 700;
        }
        .markdown-reader pre {
          background: var(--hover-bg);
          border: 1px solid var(--border-color);
          padding: 1.2em;
          border-radius: 8px;
          overflow-x: auto;
          max-width: 100%;
          margin: 1.8em 0;
          font-family: monospace;
          font-size: 0.85em;
          line-height: 1.5;
        }
        .markdown-reader code {
          font-family: monospace;
          font-size: 0.9em;
        }
        
        .font-x-small .markdown-reader { font-size: 14px; }
        .font-small .markdown-reader { font-size: 16px; }
        .font-medium .markdown-reader { font-size: 19px; }
        .font-large .markdown-reader { font-size: 24px; }
        .font-x-large .markdown-reader { font-size: 28px; }
        .font-2x-large .markdown-reader { font-size: 34px; }
        
        @media (max-width: 768px) {
          .markdown-reader { max-width: 100%; padding-bottom: 60px; }
          .markdown-reader table { white-space: normal; }
          .markdown-reader p { text-align: left; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.5); }
      `}</style>

      {/* Top Navbar */}
      <div className="reader-controls flex justify-between items-center px-4 md:px-8 py-4 shrink-0 relative z-20">
        <div className="flex items-center gap-4">
          <Link href="/ruang-baca" className="control-btn" aria-label={isIndonesian ? "Kembali ke Pustaka" : "Back to Library"}>
            <ChevronLeft size={18} strokeWidth={2.5} /> <span className="hidden sm:inline">{isIndonesian ? "Pustaka" : "Library"}</span>
          </Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="control-btn" aria-label={isIndonesian ? "Daftar Isi" : "Contents"}>
            <List size={18} /> <span className="hidden sm:inline">{isIndonesian ? "Daftar Isi" : "Contents"}</span>
          </button>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 max-w-[30%] hidden md:block">
          <h2 className="text-sm font-manrope font-bold truncate opacity-60 text-center tracking-widest uppercase">
            {displayTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center bg-[var(--hover-bg)] rounded-full border border-[var(--border-color)] overflow-hidden h-[38px] shrink-0">
            <button onClick={decreaseFontSize} disabled={fontSize === "x-small"} className="px-3 h-full flex items-center justify-center hover:bg-[var(--border-color)] disabled:opacity-30 transition-colors" title={isIndonesian ? "Perkecil Font" : "Decrease Font"}>
              <Minus size={16} />
            </button>
            <div className="w-px h-5 bg-[var(--border-color)]"></div>
            <div className="px-2 sm:px-3 h-full flex items-center justify-center pointer-events-none text-[12px] sm:text-sm font-manrope font-semibold min-w-[50px] sm:min-w-[60px]">
              <Type size={14} className="mr-1 sm:mr-2 opacity-50" />
              {fontSize === "x-small" ? "XS" : fontSize === "small" ? "SM" : fontSize === "medium" ? "MD" : fontSize === "large" ? "LG" : fontSize === "x-large" ? "XL" : "2XL"}
            </div>
            <div className="w-px h-5 bg-[var(--border-color)]"></div>
            <button onClick={increaseFontSize} disabled={fontSize === "2x-large"} className="px-3 h-full flex items-center justify-center hover:bg-[var(--border-color)] disabled:opacity-30 transition-colors" title={isIndonesian ? "Perbesar Font" : "Increase Font"}>
              <Plus size={16} />
            </button>
          </div>
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
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full md:w-[300px] lg:w-[350px] shrink-0 h-full overflow-y-auto border-r border-[var(--border-color)] absolute md:relative z-10"
              style={{ 
                backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.85)' : theme === 'sepia' ? 'rgba(253, 246, 227, 0.85)' : 'rgba(18, 18, 18, 0.85)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            >
              <div className="p-6">
                <div className="mb-8">
                  <div className="w-16 h-24 mb-4 rounded-sm shadow-md" style={{ backgroundColor: book.coverColor }} />
                  <h1 className="text-2xl font-bold leading-tight mb-2">{displayTitle}</h1>
                  <p className="font-manrope text-sm opacity-60 uppercase tracking-wider">
                    {!isIndonesian && book.author === "Tim Redaksi Saku Hukum ULM" ? "Saku Hukum ULM Editorial Team" : book.author}
                  </p>
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
          <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-8 md:py-20 w-full">
            
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
              transition={{ duration: 0.2 }}
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
                  onClick={() => setActiveChapter(activeChapter - 1)}
                  className="control-btn"
                >
                  <ChevronLeft size={16} /> {isIndonesian ? "Bab Sebelumnya" : "Previous Chapter"}
                </button>
              ) : <div/>}
              
              {activeChapter < book.chapters.length - 1 && (
                <button 
                  onClick={() => setActiveChapter(activeChapter + 1)}
                  className="control-btn"
                >
                  {isIndonesian ? "Bab Selanjutnya" : "Next Chapter"} <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
        
      </div>

      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col gap-2 z-40">
        <button 
          onClick={() => document.getElementById('reader-scroll-area')?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-3 bg-[var(--hover-bg)] backdrop-blur-md border border-[var(--border-color)] rounded-full shadow-lg hover:bg-[var(--border-color)] transition-colors text-[inherit]"
          title={isIndonesian ? "Gulir ke Atas" : "Scroll to Top"}
        >
          <ArrowUp size={20} />
        </button>
        <button 
          onClick={() => {
            const area = document.getElementById('reader-scroll-area');
            area?.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
          }}
          className="p-3 bg-[var(--hover-bg)] backdrop-blur-md border border-[var(--border-color)] rounded-full shadow-lg hover:bg-[var(--border-color)] transition-colors text-[inherit]"
          title={isIndonesian ? "Gulir ke Bawah" : "Scroll to Bottom"}
        >
          <ArrowDown size={20} />
        </button>
      </div>
    </motion.div>
  );
}
