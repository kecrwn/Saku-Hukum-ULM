"use client";
import React, { useState, useRef, useEffect, forwardRef } from "react";
// @ts-ignore
import HTMLFlipBook from "react-pageflip";
import { X, Moon, Sun, Type, ChevronLeft, ChevronRight, Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type Theme = "light" | "sepia" | "night";

interface BookReaderProps {
  book: {
    title: string;
    author: string;
    coverColor: string;
    chapters: { title: string; content: string }[];
  };
  onClose: () => void;
}

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number: number; total: number; isCover?: boolean; coverColor?: string }>(
  ({ children, number, total, isCover, coverColor }, ref) => {
    return (
      <div className="page" ref={ref} data-density={isCover ? "hard" : "soft"}>
        <div className={`page-content ${isCover ? 'cover-page' : ''}`} style={isCover && coverColor ? { backgroundColor: coverColor } : {}}>
          {children}
          {!isCover && (
            <div className="page-footer">
              {number}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Page.displayName = "Page";

export default function BookReader({ book, onClose }: BookReaderProps) {
  const { isIndonesian } = useLanguage();
  const [theme, setTheme] = useState<Theme>("sepia");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [isMounted, setIsMounted] = useState(false);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
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

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    // Rough pagination logic: 1500 characters per page.
    const allPages: string[] = [];
    
    // Add translation notice page if English
    if (!isIndonesian) {
      allPages.push(`
<div style="text-align:center; padding: 20px; opacity: 0.8; margin-top: 20%;">
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 16px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  <h2>Translation Notice</h2>
  <p style="font-family: var(--font-manrope); font-size: 14px;">This textbook is an original Indonesian legal publication. An automated English translation layer is currently being processed. You may read the original text or check back later for the fully translated edition.</p>
</div>
      `);
    }

    book.chapters.forEach(ch => {
      // Add chapter title page
      allPages.push(`## ${ch.title}`);
      
      const words = ch.content.split(' ');
      let currentPage = "";
      let charCount = 0;
      const MAX_CHARS_PER_PAGE = fontSize === "large" ? 800 : (fontSize === "medium" ? 1200 : 1600);

      words.forEach(word => {
        if (charCount + word.length > MAX_CHARS_PER_PAGE) {
          allPages.push(currentPage);
          currentPage = word + " ";
          charCount = word.length + 1;
        } else {
          currentPage += word + " ";
          charCount += word.length + 1;
        }
      });
      if (currentPage.trim().length > 0) {
        allPages.push(currentPage);
      }
    });

    if (allPages.length % 2 !== 0) {
      allPages.push("");
    }
    
    setPages(allPages);
  }, [book, fontSize, isIndonesian]);

  if (!isMounted) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`book-reader-overlay ${theme}`} 
      onClick={onClose}
    >
      <style>{`
        .book-reader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          transition: background-color 0.5s ease, color 0.5s ease;
          font-family: var(--font-dm-serif), serif;
          backdrop-filter: blur(8px);
        }
        .book-reader-overlay.light { background: rgba(245,245,245,0.95); color: #222; }
        .book-reader-overlay.sepia { background: rgba(244,236,216,0.95); color: #433422; }
        .book-reader-overlay.night { background: rgba(20,20,20,0.95); color: #d4b872; }
        
        .book-controls {
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: inherit;
          z-index: 10;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .night .book-controls { border-bottom: 1px solid rgba(255,255,255,0.05); }
        
        .book-controls button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1.5px solid currentColor;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          opacity: 0.7;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .book-controls button:hover { 
          opacity: 1; 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .night .book-controls button:hover {
          box-shadow: 0 4px 12px rgba(212,184,114,0.15);
        }

        .book-stage {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
          overflow: hidden;
          perspective: 2000px;
        }

        .page {
          background-color: var(--page-bg);
          color: var(--page-text);
          box-shadow: inset 0 0 20px rgba(0,0,0,0.03);
          overflow: hidden;
          border-left: 1px solid rgba(0,0,0,0.05);
          border-right: 1px solid rgba(0,0,0,0.05);
        }
        .light { --page-bg: #fff; --page-text: #222; }
        .sepia { --page-bg: #fdf6e3; --page-text: #4a3c2c; }
        .night { --page-bg: #2a2a2a; --page-text: #e8dcc2; }

        .page-content {
          padding: 50px 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .cover-page {
          justify-content: center;
          align-items: center;
          color: white;
          text-align: center;
          box-shadow: inset -10px 0 30px rgba(0,0,0,0.3);
          border: none;
        }
        .cover-title {
          font-size: 36px;
          font-weight: bold;
          margin-bottom: 24px;
          font-family: var(--font-dm-serif), serif;
          line-height: 1.2;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .cover-author {
          font-size: 16px;
          opacity: 0.9;
          font-family: var(--font-manrope), sans-serif;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .page-footer {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 12px;
          font-family: var(--font-manrope), sans-serif;
          opacity: 0.4;
        }

        .markdown-book {
          line-height: 1.8;
          font-family: var(--font-lora), serif;
          height: 100%;
        }
        .markdown-book h2 { font-size: 26px; margin-bottom: 24px; color: currentColor; font-family: var(--font-dm-serif), serif; }
        .markdown-book h3 { font-size: 20px; margin-top: 16px; margin-bottom: 12px; }
        .markdown-book p { margin-bottom: 18px; text-align: justify; hyphens: auto; }

        .font-small .markdown-book { font-size: 14px; }
        .font-medium .markdown-book { font-size: 17px; }
        .font-large .markdown-book { font-size: 21px; }
        
        .book-flip {
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .night .book-flip {
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
      `}</style>

      <div className="book-controls" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label={isIndonesian ? "Tutup Buku" : "Close Book"}>
          <X size={18} strokeWidth={2.5} /> {isIndonesian ? "Tutup" : "Close"}
        </button>
        
        <div className="flex gap-4">
          <button onClick={cycleFontSize} title={isIndonesian ? "Ukuran Font" : "Font Size"}>
            <Type size={18} /> {fontSize === "small" ? (isIndonesian ? "Kecil" : "Small") : fontSize === "medium" ? (isIndonesian ? "Sedang" : "Medium") : (isIndonesian ? "Besar" : "Large")}
          </button>
          <button onClick={cycleTheme} title={isIndonesian ? "Tema Membaca" : "Reading Theme"}>
            {theme === "light" && <Sun size={18} />}
            {theme === "sepia" && <Coffee size={18} />}
            {theme === "night" && <Moon size={18} />}
            {theme === "light" ? (isIndonesian ? "Terang" : "Light") : theme === "sepia" ? "Sepia" : (isIndonesian ? "Malam" : "Night")}
          </button>
        </div>
      </div>

      <div className={`book-stage font-${fontSize}`} onClick={e => e.stopPropagation()}>
        {pages.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0, rotateX: 10 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <HTMLFlipBook
              width={450}
              height={650}
              size="stretch"
              minWidth={315}
              maxWidth={600}
              minHeight={400}
              maxHeight={800}
              maxShadowOpacity={0.6}
              showCover={true}
              mobileScrollSupport={true}
              className="book-flip"
              ref={bookRef}
              flippingTime={1200}
              usePortrait={true}
              startPage={0}
              drawShadow={true}
              autoSize={true}
              swipeDistance={30}
              clickEventForward={true}
              useMouseEvents={true}
              style={{ margin: "0 auto" }}
            >
              {/* Front Cover */}
              <Page number={0} total={pages.length + 2} isCover={true} coverColor={book.coverColor}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/20 pointer-events-none" />
                <div className="relative z-10">
                  <div className="cover-title">{!isIndonesian && book.titleEn ? book.titleEn : book.title}</div>
                  <div className="w-12 h-[2px] bg-white/50 mx-auto mb-6" />
                  <div className="cover-author">{book.author}</div>
                </div>
              </Page>

              {/* Inner Pages */}
              {pages.map((content, idx) => (
                <Page key={idx} number={idx + 1} total={pages.length + 2}>
                  <div className="markdown-book">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {content}
                    </ReactMarkdown>
                  </div>
                </Page>
              ))}

              {/* Back Cover */}
              <Page number={pages.length + 1} total={pages.length + 2} isCover={true} coverColor={book.coverColor}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/20 pointer-events-none" />
                <div className="relative z-10 opacity-60 font-manrope text-sm tracking-widest mt-[50%]">
                  ~ Saku Hukum ULM ~
                </div>
              </Page>
            </HTMLFlipBook>
          </motion.div>
        )}
      </div>
      
      {/* Navigation hints */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-16 text-xs md:text-sm font-manrope tracking-widest pointer-events-none"
      >
        <span className="flex items-center gap-2"><ChevronLeft size={16}/> {isIndonesian ? "Geser/Klik Kiri" : "Swipe/Click Left"}</span>
        <span className="flex items-center gap-2">{isIndonesian ? "Geser/Klik Kanan" : "Swipe/Click Right"} <ChevronRight size={16}/></span>
      </motion.div>
    </motion.div>
  );
}
