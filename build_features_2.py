import os
import re

# 1. Update pasal/page.tsx
with open('src/app/pasal/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add imports
content = content.replace(
    "import { pasalData, Pasal } from '@/lib/pasal-data';",
    "import { pasalData, Pasal } from '@/lib/pasal-data';\nimport { AnimatePresence, motion } from 'framer-motion';\nimport { ChevronDown, BookOpen } from 'lucide-react';"
)

# Add showCaseLaw state
content = content.replace(
    "const { isIndonesian } = useLanguage();\n  const imageUrl",
    "const { isIndonesian } = useLanguage();\n  const [showCaseLaw, setShowCaseLaw] = useState(false);\n  const imageUrl"
)

# Replace relatedArticles block
old_block = """        {pasal.relatedArticles && pasal.relatedArticles.length > 0 && (
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium text-gray-500 mr-2">{isIndonesian ? "Terkait:" : "Related:"}</span>
              {pasal.relatedArticles.map(rel => (
                <span key={rel} className="px-3 py-1.5 bg-white/5 text-gray-300 text-xs rounded-xl hover:bg-[var(--clay)] hover:text-white cursor-pointer transition-all duration-300 border border-white/10 hover:border-[var(--clay)]">
                  {isIndonesian ? 'Pasal' : 'Article'} {rel.replace('Pasal ', '')}
                </span>
              ))}
            </div>
          </div>
        )}"""

new_block = """        {(pasal.relatedArticles?.length || pasal.caseLaw?.length) ? (
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
              <div className={pasal.relatedArticles && pasal.relatedArticles.length > 0 ? "pt-4 border-t border-white/5" : ""}>
                <button
                  onClick={() => setShowCaseLaw(!showCaseLaw)}
                  className="flex items-center justify-between w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-[var(--clay)]/50 group/btn"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--clay)] group-hover/btn:text-orange-400 transition-colors" />
                    <span className="text-sm font-semibold text-white/90 group-hover/btn:text-white transition-colors">
                      {isIndonesian ? "Yurisprudensi" : "Case Law"}
                    </span>
                    <span className="bg-[var(--clay)]/20 text-[var(--clay)] text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                      {pasal.caseLaw.length}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showCaseLaw ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showCaseLaw && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3">
                        {pasal.caseLaw.map((caseItem, idx) => (
                          <div key={idx} className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <h5 className="text-sm font-bold text-[var(--clay)] break-words whitespace-normal">{caseItem.citation}</h5>
                              {caseItem.year && (
                                <span className="text-xs font-medium text-gray-400 shrink-0">{caseItem.year}</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-300 leading-relaxed break-words whitespace-normal">
                              {!isIndonesian && caseItem.summaryEn ? caseItem.summaryEn : caseItem.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        ) : null}"""

content = content.replace(old_block, new_block)

with open('src/app/pasal/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)


# 2. Write src/components/GlossaryTooltip.tsx
glossary_tooltip_tsx = """'use client';

import React from 'react';
import { glossaryTerms } from '@/lib/glossary-data';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface GlossaryTooltipProps {
  termId: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ termId, children }: GlossaryTooltipProps) {
  const { isIndonesian } = useLanguage();
  const termData = glossaryTerms.find(t => t.id === termId);

  if (!termData) {
    return <>{children}</>;
  }

  const termDisplay = isIndonesian ? termData.term : termData.termEn;
  const defDisplay = isIndonesian ? termData.definition : termData.definitionEn;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="cursor-help underline decoration-[var(--clay)] decoration-wavy underline-offset-4 decoration-1 hover:text-[var(--clay)] transition-colors inline-flex items-baseline gap-1">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          sideOffset={8}
          className="max-w-xs bg-[var(--ink-deep)] border border-white/10 p-3 rounded-xl shadow-2xl z-50 text-white"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5">
              <Info className="w-3.5 h-3.5 text-[var(--clay)]" />
              <p className="text-sm font-bold text-[var(--clay)]">{termDisplay}</p>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-manrope">
              {defDisplay}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
"""
with open('src/components/GlossaryTooltip.tsx', 'w', encoding='utf-8') as f:
    f.write(glossary_tooltip_tsx)


# 3. Write src/app/glosarium/page.tsx
glosarium_page_tsx = """'use client';

import React, { useState, useMemo } from 'react';
import { glossaryTerms } from '@/lib/glossary-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Glosarium() {
  const { isIndonesian } = useLanguage();
  const [query, setQuery] = useState('');

  const filteredTerms = useMemo(() => {
    if (!query) return glossaryTerms;
    const lowerQuery = query.toLowerCase();
    return glossaryTerms.filter(t => 
      t.term.toLowerCase().includes(lowerQuery) || 
      t.termEn.toLowerCase().includes(lowerQuery) ||
      t.definition.toLowerCase().includes(lowerQuery) ||
      t.definitionEn.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

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
"""
os.makedirs('src/app/glosarium', exist_ok=True)
with open('src/app/glosarium/page.tsx', 'w', encoding='utf-8') as f:
    f.write(glosarium_page_tsx)


# 4. Write src/app/alur-perkara/page.tsx
alur_md_path = '/data/data/com.termux/files/home/.gemini/antigravity-cli/brain/f5af207d-aa5c-4b53-bcb5-becf8195d557/alur_perkara_page.md'
if os.path.exists(alur_md_path):
    with open(alur_md_path, 'r', encoding='utf-8') as f:
        artifact_content = f.read()
    
    # Extract the code block from the markdown
    import re
    code_match = re.search(r'```(?:tsx|typescript|javascript)\n([\s\S]*?)\n```', artifact_content)
    if code_match:
        alur_code = code_match.group(1)
        os.makedirs('src/app/alur-perkara', exist_ok=True)
        with open('src/app/alur-perkara/page.tsx', 'w', encoding='utf-8') as fw:
            fw.write(alur_code)
