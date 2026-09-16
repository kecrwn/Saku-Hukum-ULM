"use client";
import React, { useState, useRef, useEffect, forwardRef } from "react";
// @ts-ignore
import HTMLFlipBook from "react-pageflip";
import { X, Moon, Sun, Type, ChevronLeft, ChevronRight, Coffee } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
  const [theme, setTheme] = useState<Theme>("sepia");
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [isMounted, setIsMounted] = useState(false);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Lock body scroll
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

  // Convert chapters to pages (chunking content conceptually, though for react-pageflip we might need to pre-chunk HTML, which is hard.
  // Actually, standard HTML doesn't paginate automatically in page-flip unless we chunk it.
  // A simpler approach for the text is to just split by paragraphs or headings, or render the entire content in a standard scroll view with a "Book Layout" if chunking is too complex.
  // BUT the user specifically asked for: "when click the books open and turns pages realistically in animations and workimg properly".
  // react-pageflip requires exact pages. We'll use CSS multi-column layout or just split the content roughly by word count to create pages.
  // Let's create a rough pagination engine for markdown!

  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    // Rough pagination logic: 1500 characters per page.
    const allPages: string[] = [];
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

    // Make sure we have an even number of pages for the book format
    if (allPages.length % 2 !== 0) {
      allPages.push("");
    }
    
    setPages(allPages);
  }, [book, fontSize]);

  if (!isMounted) return null;

  return (
    <div className={`book-reader-overlay ${theme}`} onClick={onClose}>
      <style>{`
        .book-reader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          transition: background-color 0.4s ease, color 0.4s ease;
          font-family: var(--font-dm-serif), serif;
        }
        .book-reader-overlay.light { background: #f5f5f5; color: #333; }
        .book-reader-overlay.sepia { background: #f4ecd8; color: #433422; }
        .book-reader-overlay.night { background: #1a1a1a; color: #d4b872; }
        
        .book-controls {
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: inherit;
          z-index: 10;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .night .book-controls { box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
        
        .book-controls button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 99px;
          border: 1px solid currentColor;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font-family: var(--font-manrope), sans-serif;
          font-size: 14px;
          font-weight: 600;
          opacity: 0.8;
          transition: all 0.2s ease;
        }
        .book-controls button:hover { opacity: 1; transform: scale(1.05); }

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
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .light { --page-bg: #fff; --page-text: #333; }
        .sepia { --page-bg: #fdf6e3; --page-text: #5c4b37; }
        .night { --page-bg: #2d2d2d; --page-text: #e8dcc2; }

        .page-content {
          padding: 40px 50px;
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
          box-shadow: inset -5px 0 20px rgba(0,0,0,0.2);
        }
        .cover-title {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 20px;
          font-family: var(--font-dm-serif), serif;
        }
        .cover-author {
          font-size: 18px;
          opacity: 0.9;
          font-family: var(--font-manrope), sans-serif;
        }

        .page-footer {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 12px;
          font-family: var(--font-manrope), sans-serif;
          opacity: 0.6;
        }

        .markdown-book {
          line-height: 1.8;
          font-family: var(--font-lora), serif;
        }
        .markdown-book h2 { font-size: 24px; margin-bottom: 20px; color: currentColor; font-family: var(--font-dm-serif), serif; }
        .markdown-book p { margin-bottom: 16px; text-align: justify; }

        .font-small .markdown-book { font-size: 15px; }
        .font-medium .markdown-book { font-size: 18px; }
        .font-large .markdown-book { font-size: 22px; }
      `}</style>

      <div className="book-controls" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>
          <X size={18} /> Tutup Buku
        </button>
        
        <div className="flex gap-4">
          <button onClick={cycleFontSize} title="Ukuran Font">
            <Type size={18} /> {fontSize === "small" ? "Kecil" : fontSize === "medium" ? "Sedang" : "Besar"}
          </button>
          <button onClick={cycleTheme} title="Tema Membaca">
            {theme === "light" && <Sun size={18} />}
            {theme === "sepia" && <Coffee size={18} />}
            {theme === "night" && <Moon size={18} />}
            {theme === "light" ? "Terang" : theme === "sepia" ? "Sepia" : "Malam"}
          </button>
        </div>
      </div>

      <div className={`book-stage font-${fontSize}`} onClick={e => e.stopPropagation()}>
        {pages.length > 0 && (
          <HTMLFlipBook
            width={450}
            height={650}
            size="stretch"
            minWidth={315}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="book-flip"
            ref={bookRef}
            flippingTime={1000}
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
              <div className="cover-title">{book.title}</div>
              <div className="cover-author">{book.author}</div>
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
              <div style={{ opacity: 0.5, marginTop: '50%' }}>~ Saku Hukum ULM ~</div>
            </Page>
          </HTMLFlipBook>
        )}
      </div>
      
      {/* Navigation hints */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-12 text-sm opacity-50 font-sans tracking-widest pointer-events-none">
        <span className="flex items-center gap-1"><ChevronLeft size={16}/> Geser / Klik</span>
        <span className="flex items-center gap-1">Geser / Klik <ChevronRight size={16}/></span>
      </div>
    </div>
  );
}
