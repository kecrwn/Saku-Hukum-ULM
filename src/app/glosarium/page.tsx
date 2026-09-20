'use client';

import React, { useState, useMemo } from 'react';
import { glossaryTerms } from '@/lib/glossary-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, BookA } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlosariumPage() {
  const { language, isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGlossary = useMemo(() => {
    return glossaryTerms
      .filter((item) => {
        const term = language === "en" ? item.termEn : item.term;
        const definition = language === "en" ? item.definitionEn : item.definition;
        return (
          term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          definition.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, language]);

  return (
    <main className="min-h-screen bg-[var(--ink-deep)] text-white selection:bg-[var(--clay)] selection:text-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--clay)]/20 flex items-center justify-center">
              <Book className="w-5 h-5 text-[var(--clay)]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight">
              {isIndonesian ? "Glosarium Hukum" : "Legal Glossary"}
            </h1>
          </motion.div>
          
          <p className="text-gray-400 text-lg md:text-xl font-manrope max-w-2xl leading-relaxed">
            {isIndonesian 
              ? "Kamus istilah hukum pidana Indonesia beserta definisinya." 
              : "Dictionary of Indonesian criminal law terms and their definitions."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder={isIndonesian ? "Cari istilah (contoh: dolus, praperadilan)..." : "Search term (e.g., dolus, pretrial)..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--clay)] focus:border-transparent transition-all"
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTerms.map((term, i) => (
              <motion.div
                key={term.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all p-6 rounded-3xl flex flex-col gap-3 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-bold text-[var(--clay)] font-serif group-hover:text-orange-400 transition-colors break-words whitespace-normal">
                    {isIndonesian ? term.term : term.termEn}
                  </h2>
                </div>
                <div className="w-8 h-1 bg-[var(--clay)]/50 rounded-full group-hover:w-12 transition-all" />
                <p className="text-gray-300 font-manrope text-sm leading-relaxed mt-2 break-words whitespace-normal">
                  {isIndonesian ? term.definition : term.definitionEn}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTerms.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 font-manrope">
              {isIndonesian ? "Tidak ada istilah yang cocok dengan pencarian Anda." : "No terms matched your search."}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
