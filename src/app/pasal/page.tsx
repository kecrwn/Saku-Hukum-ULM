'use client';

import React, { useState, useMemo } from 'react';
import { pasalData, Pasal } from '@/lib/pasal-data';
import { imagery } from '@/lib/site-data';
import Link from 'next/link';

export default function KamusPasal() {
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
        p.keywords.some(k => k.toLowerCase().includes(q))
      );
    }
    return data;
  }, [query, scope]);

  const groupedData = useMemo(() => {
    const groups: Record<string, Pasal[]> = {};
    filteredData.forEach(p => {
      if (!groups[p.chapter]) groups[p.chapter] = [];
      groups[p.chapter].push(p);
    });
    return groups;
  }, [filteredData]);

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
            Kembali
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
            Kamus <span className="text-[var(--clay)]">Pasal</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Akses cepat ke repositori hukum. Cari nomor pasal, kata kunci, atau jelajahi berdasarkan bab dan kategori hukum.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
          <div className="flex bg-black/20 rounded-2xl p-1 w-full md:w-auto">
            <button 
              onClick={() => setViewMode('SEARCH')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${viewMode === 'SEARCH' ? 'bg-[var(--clay)] text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}
            >
              Cari Pasal
            </button>
            <button 
              onClick={() => setViewMode('BROWSE')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${viewMode === 'BROWSE' ? 'bg-[var(--clay)] text-white shadow-lg' : 'bg-transparent text-gray-400 hover:text-white'}`}
            >
              Mode Jelajah
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <select 
              value={scope} 
              onChange={e => setScope(e.target.value)}
              className="bg-black/20 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--clay)] focus:ring-1 focus:ring-[var(--clay)] transition-all w-full md:w-48 appearance-none cursor-pointer"
            >
              {scopes.map(s => <option key={s} value={s} className="bg-[var(--ink-deep)]">{s === 'ALL' ? 'Semua Kategori' : s}</option>)}
            </select>

            <div className="relative w-full md:w-80">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Cari nomor atau kata kunci..."
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
                  <p className="text-lg font-medium text-gray-400">Pencarian tidak ditemukan.</p>
                  <p className="text-sm mt-1">Coba gunakan kata kunci atau nomor pasal lain.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedData).length > 0 ? Object.entries(groupedData).map(([chapter, pasals]) => (
                <div key={chapter} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-px bg-gradient-to-r from-[var(--clay)] to-transparent flex-1 opacity-50" />
                    <h2 className="text-2xl font-bold text-[var(--clay)] tracking-tight whitespace-nowrap">{chapter}</h2>
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
                  <p className="text-lg font-medium text-gray-400">Tidak ada data untuk kategori terpilih.</p>
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
  const imageUrl = pasal.imageRef === 'courtroom' ? imagery.mootCourtRoom : pasal.imageRef === 'gavel' ? imagery.hero : pasal.imageRef === 'lawBooks' ? imagery.materials : undefined;
  
  return (
    <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 transition-all duration-500 rounded-3xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-md relative h-full">
      {imageUrl && (
        <div className="h-48 w-full overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={pasal.chapter} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-deep)] via-[var(--ink-deep)]/60 to-transparent" />
        </div>
      )}
      
      <div className={`p-6 md:p-8 flex-1 flex flex-col ${imageUrl ? '-mt-20 relative z-10' : ''}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-2">
            <span className="inline-flex items-center px-3 py-1 bg-[var(--clay)]/20 text-[var(--clay)] text-xs font-bold uppercase tracking-wider rounded-full border border-[var(--clay)]/30 backdrop-blur-sm">
              {pasal.code}
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight">
              Pasal {pasal.articleNumber.replace('Pasal ', '')}
            </h3>
            <p className="text-gray-300 text-sm font-medium">{pasal.chapter}</p>
          </div>
        </div>
        
        <div className="space-y-6 mb-8 flex-1">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--clay)] to-orange-500 rounded-full" />
            <p className="text-sm text-gray-300/90 italic leading-relaxed font-serif">
              "{pasal.officialText}"
            </p>
          </div>
          
          <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-[var(--clay)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Penjelasan</h4>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">{pasal.explanation}</p>
          </div>
        </div>

        {pasal.relatedArticles && pasal.relatedArticles.length > 0 && (
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium text-gray-500 mr-2">Terkait:</span>
              {pasal.relatedArticles.map(rel => (
                <span key={rel} className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs rounded-xl hover:bg-[var(--clay)] hover:text-white cursor-pointer transition-all duration-300 border border-white/10 hover:border-[var(--clay)]">
                  Pasal {rel.replace('Pasal ', '')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
