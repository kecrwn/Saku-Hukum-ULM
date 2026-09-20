'use client';

import React, { useState, useMemo } from 'react';
import { pasalData, Pasal } from '@/lib/pasal-data';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, BookOpen } from 'lucide-react';
import { imagery } from '@/lib/site-data';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function KamusPasal() {
  const { isIndonesian } = useLanguage();
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState('ALL');
  const [viewMode, setViewMode] = useState<'SEARCH' | 'BROWSE'>('SEARCH');

  const scopes = ['ALL', ...Array.from(new Set(pasalData.map(p => p.code)))];

  const filteredData = useMemo(() => {
    let data = pasalData;
    if (scope !== 'ALL') {
      data = data.filter(p => p.code === scope);
    }
    if (query) {
      const q = query.toLowerCase();
      data = data.filter(p => 
        p.articleNumber.toLowerCase().includes(q) || 
        p.chapter.toLowerCase().includes(q) ||
        p.officialText.toLowerCase().includes(q) ||
        p.explanation.toLowerCase().includes(q) ||
        p.keywords.some(k => k.toLowerCase().includes(q)) ||
        (p.chapterEn && p.chapterEn.toLowerCase().includes(q)) ||
        (p.officialTextEn && p.officialTextEn.toLowerCase().includes(q)) ||
        (p.explanationEn && p.explanationEn.toLowerCase().includes(q))
      );
    }
    return data;
  }, [query, scope]);

  const groupedData = useMemo(() => {
    const groups: Record<string, Pasal[]> = {};
    filteredData.forEach(p => {
      const chapter = !isIndonesian && p.chapterEn ? p.chapterEn : p.chapter;
      if (!groups[chapter]) groups[chapter] = [];
      groups[chapter].push(p);
    });
    return groups;
  }, [filteredData, isIndonesian]);

  return (
    <div className="min-h-screen bg-[var(--ink-deep)] text-white font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[var(--clay)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <header className="space-y-4 text-center md:text-left">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isIndonesian ? "Kembali" : "Back"}
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            {isIndonesian ? "Kamus " : "Article "}<span className="text-[var(--clay)]">{isIndonesian ? "Pasal" : "Dictionary"}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            {isIndonesian 
              ? "Akses cepat ke repositori hukum. Cari nomor pasal, kata kunci, atau jelajahi berdasarkan bab dan kategori hukum."
              : "Quick access to legal repository. Search by article number, keywords, or browse by chapter and legal category."}
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          <div className="flex bg-black/20 rounded-2xl p-1 w-full md:w-auto">
            <button 
              onClick={() => setViewMode('SEARCH')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${viewMode === 'SEARCH' ? 'bg-[var(--clay)] text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}
            >
              {isIndonesian ? "Cari Pasal" : "Search Article"}
            </button>
            <button 
              onClick={() => setViewMode('BROWSE')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${viewMode === 'BROWSE' ? 'bg-[var(--clay)] text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}
            >
              {isIndonesian ? "Mode Jelajah" : "Browse Mode"}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <select 
              value={scope} 
              onChange={e => setScope(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--clay)] focus:ring-1 focus:ring-[var(--clay)] transition-all w-full md:w-48 appearance-none cursor-pointer"
            >
              {scopes.map(s => <option key={s} value={s} className="bg-[var(--ink-deep)]">{s === 'ALL' ? (isIndonesian ? 'Semua Kategori' : 'All Categories') : s}</option>)}
            </select>

            <div className="relative w-full md:w-80">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder={isIndonesian ? "Cari nomor atau kata kunci..." : "Search number or keyword..."}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--clay)] focus:ring-1 focus:ring-[var(--clay)] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-4">
          {viewMode === 'SEARCH' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.length > 0 ? filteredData.map(pasal => (
                <PasalCard key={pasal.id} pasal={pasal} />
              )) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                  <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-400">{isIndonesian ? "Pencarian tidak ditemukan." : "Search not found."}</p>
                  <p className="text-sm mt-1">{isIndonesian ? "Coba gunakan kata kunci atau nomor pasal lain." : "Try using other keywords or article numbers."}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedData).length > 0 ? Object.entries(groupedData).map(([chapter, pasals]) => (
                <div key={chapter} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-gradient-to-r from-[var(--clay)] to-transparent flex-1 opacity-50" />
                    <h2 className="text-2xl font-bold text-[var(--clay)] tracking-tight whitespace-normal break-words text-center max-w-[80%]">{chapter}</h2>
                    <div className="h-px bg-gradient-to-l from-[var(--clay)] to-transparent flex-1 opacity-50" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pasals.map(pasal => (
                      <PasalCard key={pasal.id} pasal={pasal} />
                    ))}
                  </div>
                </div>
              )) : (
                <div className="text-center py-20">
                  <p className="text-lg font-medium text-gray-400">{isIndonesian ? "Tidak ada data untuk kategori terpilih." : "No data for selected category."}</p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function PasalCard({ pasal }: { pasal: Pasal }) {
  const { isIndonesian } = useLanguage();
  const [showCaseLaw, setShowCaseLaw] = useState(false);
  const imageUrl = pasal.imageRef === 'courtroom' ? imagery.mootCourtRoom : pasal.imageRef === 'gavel' ? imagery.hero : pasal.imageRef === 'lawBooks' ? imagery.materials : undefined;
  
  const displayChapter = !isIndonesian && pasal.chapterEn ? pasal.chapterEn : pasal.chapter;
  const displayOfficialText = !isIndonesian && pasal.officialTextEn ? pasal.officialTextEn : pasal.officialText;
  const displayExplanation = !isIndonesian && pasal.explanationEn ? pasal.explanationEn : pasal.explanation;
  const pendingTranslation = !isIndonesian && (!pasal.chapterEn || !pasal.officialTextEn || !pasal.explanationEn);

  return (
    <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-md relative h-full">
      {pendingTranslation && (
        <div className="absolute top-0 right-0 bg-yellow-500/80 text-black text-[10px] font-bold px-3 py-1.5 rounded-bl-xl z-20 backdrop-blur-md max-w-[80%] text-right shadow-md break-words">
          {isIndonesian ? "Menunggu Terjemahan" : "Translation Pending"}
        </div>
      )}
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={displayChapter} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-deep)] via-[var(--ink-deep)]/60 to-transparent" />
        </div>
      )}
      
      <div className={`p-6 md:p-8 flex-1 flex flex-col ${imageUrl ? '-mt-20 relative z-10' : ''}`}>
        <div className="flex justify-between items-start mb-6 min-w-0">
          <div className="space-y-2 min-w-0 flex-1">
            <span className="inline-flex items-center px-3 py-1 bg-[var(--clay)]/20 text-[var(--clay)] text-xs font-bold uppercase tracking-wider rounded-full border border-[var(--clay)]/30 backdrop-blur-sm break-words whitespace-normal">
              {pasal.code}
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight break-words whitespace-normal min-w-0">
              {isIndonesian ? 'Pasal' : 'Article'} {pasal.articleNumber.replace('Pasal ', '')}
            </h3>
            <p className="text-gray-300 text-sm font-medium break-words whitespace-normal min-w-0">{displayChapter}</p>
          </div>
        </div>
        
        <div className="space-y-6 mb-8 flex-1 min-w-0">
          <div className="relative min-w-0">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--clay)] to-orange-500 rounded-full" />
            <p className="text-sm text-gray-300/90 italic leading-relaxed font-serif break-words whitespace-normal min-w-0">
              "{displayOfficialText}"
            </p>
          </div>
          
          <div className="bg-black/20 p-4 rounded-2xl border border-white/5 overflow-hidden min-w-0">
            <div className="flex items-center gap-2 mb-2 min-w-0">
              <svg className="w-4 h-4 text-[var(--clay)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate">{isIndonesian ? "Penjelasan" : "Explanation"}</h4>
            </div>
            <p className="text-sm text-white/80 leading-relaxed break-words whitespace-normal min-w-0">{displayExplanation}</p>
          </div>
        </div>

        {(pasal.relatedArticles?.length || pasal.caseLaw?.length) ? (
          <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
            
            {pasal.relatedArticles && pasal.relatedArticles.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-gray-500 mr-2">{isIndonesian ? "Terkait:" : "Related:"}</span>
                {pasal.relatedArticles.map(rel => (
                  <span key={rel} className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs rounded-xl hover:bg-[var(--clay)] hover:text-white cursor-pointer transition-all duration-300 border border-white/10 hover:border-[var(--clay)]">
                    {isIndonesian ? 'Pasal' : 'Article'} {rel.replace('Pasal ', '')}
                  </span>
                ))}
              </div>
            )}

            {pasal.caseLaw && pasal.caseLaw.length > 0 && (
              <div className={`min-w-0 ${pasal.relatedArticles && pasal.relatedArticles.length > 0 ? "pt-4 border-t border-white/5" : ""}`}>
                <button
                  onClick={() => setShowCaseLaw(!showCaseLaw)}
                  className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-gradient-to-r from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/5 transition-all duration-300 border border-white/10 hover:border-[var(--clay)]/50 group/btn shadow-sm backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[var(--clay)]/10 rounded-lg group-hover/btn:bg-[var(--clay)]/20 transition-colors">
                      <BookOpen className="w-4 h-4 text-[var(--clay)]" />
                    </div>
                    <span className="text-sm font-bold text-white/90 group-hover/btn:text-white transition-colors tracking-wide">
                      {isIndonesian ? "Yurisprudensi" : "Case Law"}
                    </span>
                    <span className="bg-[var(--clay)]/20 text-[var(--clay)] text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-1 border border-[var(--clay)]/30 shadow-inner">
                      {pasal.caseLaw.length}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 group-hover/btn:text-white transition-transform duration-300 ${showCaseLaw ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showCaseLaw && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden min-w-0"
                    >
                      <div className="pt-4 space-y-3 min-w-0">
                        {pasal.caseLaw.map((caseItem, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                            className="bg-black/40 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-inner space-y-2 min-w-0"
                          >
                            <div className="flex items-start justify-between gap-4 min-w-0">
                              <h5 className="text-sm font-bold text-[var(--clay)] break-words whitespace-normal min-w-0 flex-1 leading-snug">{caseItem.citation}</h5>
                              {caseItem.year && (
                                <span className="text-xs font-semibold px-2 py-1 bg-white/5 rounded-md text-gray-400 shrink-0 border border-white/5">{caseItem.year}</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed break-words whitespace-normal min-w-0">
                              {!isIndonesian && caseItem.summaryEn ? caseItem.summaryEn : caseItem.summary}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        ) : null}
      </div>
    </div>
  );
}
