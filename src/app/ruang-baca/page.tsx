"use client";
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Library, Search, BookMarked } from "lucide-react";
import BookReader from "@/components/BookReader";
import { motion, AnimatePresence } from "framer-motion";

// This will be dynamically populated or imported once subagents finish.
import { bookKnowledgeBase } from "@/lib/books";

export default function BookshelfPage() {
  const { isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeBook, setActiveBook] = useState<any | null>(null);
  const [booksPerRow, setBooksPerRow] = useState(5);

  // Responsive books per row
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setBooksPerRow(2);
      else if (window.innerWidth < 1024) setBooksPerRow(3);
      else setBooksPerRow(5);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
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

  // Chunk books into shelves
  const shelves = useMemo(() => {
    const chunked = [];
    for (let i = 0; i < filteredBooks.length; i += booksPerRow) {
      chunked.push(filteredBooks.slice(i, i + booksPerRow));
    }
    // ensure at least one empty shelf if no books
    if (chunked.length === 0) chunked.push([]);
    return chunked;
  }, [filteredBooks, booksPerRow]);

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#121212] py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center gap-3 bg-[#d4b872]/10 px-6 py-2 rounded-full mb-6"
          >
            <BookMarked className="text-[#d4b872]" size={20} />
            <span className="text-sm font-semibold tracking-wider text-[#d4b872] uppercase">
              {isIndonesian ? "Koleksi Terverifikasi" : "Verified Collection"}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-dm-serif font-bold text-gray-900 dark:text-white tracking-tight mb-6"
          >
            {isIndonesian ? "Ruang Baca" : "Reading Room"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-manrope"
          >
            {isIndonesian 
              ? "Telusuri literatur hukum komprehensif. Koleksi ini disusun secara khusus untuk mahasiswa Fakultas Hukum Universitas Lambung Mangkurat."
              : "Browse comprehensive legal literature. This collection is specially curated for law students of Universitas Lambung Mangkurat."}
          </motion.p>
        </header>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mb-20 max-w-2xl mx-auto group z-20"
        >
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#d4b872] transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            className="w-full pl-14 pr-6 py-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d4b872] focus:border-transparent transition-all shadow-lg backdrop-blur-md text-lg font-manrope"
            placeholder={isIndonesian ? "Cari judul buku atau penulis..." : "Search book title or author..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>

        {/* Bookshelf Display */}
        <div className="flex flex-col items-center gap-y-12 pb-32">
          {shelves.map((shelfBooks, shelfIdx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: shelfIdx * 0.1 }}
              key={`shelf-${shelfIdx}`} 
              className="w-full max-w-5xl relative flex flex-col items-center"
            >
              {/* Books Row */}
              <div className="flex flex-row justify-center items-end gap-4 md:gap-8 lg:gap-12 w-full px-8 md:px-16 z-10 min-h-[220px]">
                {shelfBooks.length === 0 && shelfIdx === 0 ? (
                  <div className="text-center py-12 text-gray-400 dark:text-gray-500 font-manrope italic w-full">
                    {isIndonesian ? "Belum ada buku atau pencarian tidak ditemukan." : "No books available or search not found."}
                  </div>
                ) : (
                  shelfBooks.map((book: any, idx: number) => (
                    <motion.div
                      whileHover={{ y: -15, scale: 1.05, rotateY: -10 }}
                      whileTap={{ scale: 0.95 }}
                      key={book.id || idx}
                      onClick={() => setActiveBook(book)}
                      className="group cursor-pointer relative perspective-[1000px]"
                      style={{ flexShrink: 0 }}
                    >
                      {/* Book Spine */}
                      <div 
                        className="w-[110px] md:w-[130px] lg:w-[150px] aspect-[2/3.2] rounded-r-xl rounded-l-sm shadow-[inset_4px_0_10px_rgba(0,0,0,0.1),_5px_5px_15px_rgba(0,0,0,0.3)] dark:shadow-[inset_4px_0_10px_rgba(0,0,0,0.3),_5px_5px_20px_rgba(0,0,0,0.5)] transition-all duration-300 relative flex flex-col justify-between p-4 md:p-5 border-l-[3px] border-white/20 overflow-hidden"
                        style={{ backgroundColor: book.coverColor || '#2c3e50' }}
                      >
                        {/* Book Texture / Details */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/20 pointer-events-none" />
                        
                        <div className="relative z-10 flex-1 flex flex-col items-center text-center pt-2">
                          <h3 className="font-dm-serif text-white font-bold text-sm md:text-base leading-tight drop-shadow-md">
                            {book.title}
                          </h3>
                        </div>
                        
                        <div className="relative z-10 w-full flex flex-col items-center pb-2">
                          <div className="w-8 h-[2px] bg-white/40 mb-3" />
                          <span className="font-manrope text-[10px] md:text-xs text-white/80 uppercase tracking-widest text-center">
                            {book.author.split(' ')[0]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* The Wooden Shelf */}
              <div className="w-full relative mt-[-10px] z-0">
                {/* Top surface */}
                <div className="w-full h-4 md:h-5 bg-gradient-to-b from-[#b8865c] to-[#a06d44] dark:from-[#5c4033] dark:to-[#4a3228] rounded-t-sm shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]" />
                {/* Front edge */}
                <div className="w-full h-6 md:h-8 bg-gradient-to-b from-[#8b5a2b] to-[#5c3a21] dark:from-[#3a2818] dark:to-[#24170d] rounded-b-md shadow-[0_10px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-t border-black/20 flex justify-between px-8">
                  {/* Wood grain detailing (CSS gradients) */}
                  <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)' }} />
                </div>
                {/* Shelf Brackets */}
                <div className="absolute top-full left-[10%] w-3 h-12 bg-gradient-to-b from-[#5c3a21] to-[#3a2211] dark:from-[#24170d] dark:to-[#110a05] rounded-b-full shadow-lg" />
                <div className="absolute top-full right-[10%] w-3 h-12 bg-gradient-to-b from-[#5c3a21] to-[#3a2211] dark:from-[#24170d] dark:to-[#110a05] rounded-b-full shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeBook && (
          <BookReader book={activeBook} onClose={() => setActiveBook(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
