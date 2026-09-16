"use client";
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Library, Search } from "lucide-react";
import BookReader from "@/components/BookReader";

// This will be dynamically populated or imported once subagents finish.
import { bookKnowledgeBase } from "@/lib/books";

export default function BookshelfPage() {
  const { isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBook, setActiveBook] = useState<any | null>(null);
  
  // Convert object to array
  const books = useMemo(() => {
    return Object.values(bookKnowledgeBase);
  }, []);

  const filteredBooks = useMemo(() => {
    if (!searchQuery) return books;
    const lowerQ = searchQuery.toLowerCase();
    return books.filter((b: any) => 
      b.title.toLowerCase().includes(lowerQ) || 
      b.author.toLowerCase().includes(lowerQ)
    );
  }, [searchQuery, books]);

  return (
    <div className="content-width py-16 min-h-screen">
      <header className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--ink-deep)] tracking-tight mb-4 flex items-center justify-center gap-3">
          <Library className="text-[var(--clay)]" size={36} />
          {isIndonesian ? "Rak Buku Digital" : "Digital Bookshelf"}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
          {isIndonesian 
            ? "Koleksi buku hukum esensial Universitas Lambung Mangkurat. Klik buku untuk membaca dalam mode imersif."
            : "Essential legal book collection of Universitas Lambung Mangkurat. Click a book to read in immersive mode."}
        </p>
      </header>

      {/* Search Bar */}
      <div className="relative mb-16 max-w-xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted)] group-focus-within:text-[var(--clay)] transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="w-full pl-11 pr-4 py-4 bg-white/60 border border-[rgba(23,62,68,0.15)] rounded-2xl text-[var(--ink-deep)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--clay)] focus:border-transparent transition-all shadow-[0_4px_16px_rgba(16,45,51,0.03)] backdrop-blur-md"
          placeholder={isIndonesian ? "Cari judul buku atau penulis..." : "Search book title or author..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Bookshelf Display */}
      <div className="bookshelf-container">
        <style>{`
          .bookshelf-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 40px 30px;
            padding: 20px;
            align-items: end;
          }
          .book-spine {
            width: 100%;
            aspect-ratio: 2 / 3;
            border-radius: 4px 12px 12px 4px;
            box-shadow: inset 4px 0 10px rgba(0,0,0,0.2), inset -1px 0 2px rgba(255,255,255,0.3), 5px 5px 15px rgba(0,0,0,0.15);
            cursor: pointer;
            position: relative;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform-origin: left center;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 16px;
            text-align: center;
            color: white;
            border-left: 3px solid rgba(255,255,255,0.2);
          }
          .book-spine:hover {
            transform: translateX(10px) rotateY(-15deg) scale(1.05);
            box-shadow: inset 4px 0 10px rgba(0,0,0,0.2), inset -1px 0 2px rgba(255,255,255,0.3), 15px 15px 25px rgba(0,0,0,0.2);
            z-index: 10;
          }
          .book-title {
            font-family: var(--font-dm-serif), serif;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 12px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
          }
          .book-author {
            font-family: var(--font-manrope), sans-serif;
            font-size: 12px;
            opacity: 0.8;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .shelf-wood {
            grid-column: 1 / -1;
            height: 20px;
            background: linear-gradient(to bottom, #8b5a2b, #5c3a21);
            border-radius: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3), inset 0 2px 2px rgba(255,255,255,0.2);
            margin-top: -10px;
            position: relative;
            z-index: 1;
          }
        `}</style>
        
        {filteredBooks.length === 0 ? (
          <div className="col-span-full text-center py-12 text-[var(--muted)]">
            {isIndonesian ? "Belum ada buku atau pencarian tidak ditemukan." : "No books available or search not found."}
          </div>
        ) : (
          filteredBooks.map((book: any, idx) => (
            <div key={book.id || idx} className="relative z-10 flex flex-col items-center">
              <div 
                className="book-spine" 
                style={{ backgroundColor: book.coverColor || '#2c3e50' }}
                onClick={() => setActiveBook(book)}
              >
                <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/20"></div>
                <div className="absolute top-0 bottom-0 right-4 w-[1px] bg-black/10"></div>
                
                <h3 className="book-title">{book.title}</h3>
                <span className="book-author">{book.author}</span>
                
                <div className="absolute bottom-4 w-8 h-1 bg-white/30 rounded-full"></div>
              </div>
            </div>
          ))
        )}
        
        {/* Render a literal shelf under the books */}
        {filteredBooks.length > 0 && <div className="shelf-wood"></div>}
        
      </div>

      {activeBook && (
        <BookReader book={activeBook} onClose={() => setActiveBook(null)} />
      )}
    </div>
  );
}
