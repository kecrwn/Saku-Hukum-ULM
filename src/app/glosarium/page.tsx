"use client";

import React, { useState, useMemo } from "react";
import { glossaryTerms } from "@/lib/glossary-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function GlosariumPage() {
  const { language, isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[var(--paper)] pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[var(--card)] shadow-[0_18px_44px_rgba(30,48,43,.09)] flex items-center justify-center text-[var(--clay)] border border-[var(--line)]">
              <BookOpen className="w-8 h-8" />
            </div>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[var(--ink-deep)] font-bold">
            {isIndonesian ? "Glosarium " : "Glossary "}
            <span className="italic text-[var(--clay)]">{isIndonesian ? "Hukum" : "Law"}</span>
          </h1>
          <p className="text-[var(--muted)] text-lg max-w-xl mx-auto">
            {isIndonesian
              ? "Kumpulan istilah-istilah hukum beserta definisinya untuk membantu Anda memahami literatur."
              : "A collection of legal terms and their definitions to help you understand the literature."}
          </p>
        </header>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
          <input
            type="text"
            placeholder={isIndonesian ? "Cari istilah atau definisi..." : "Search terms or definitions..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--card)] border border-[var(--line)] rounded-xl py-4 pl-12 pr-4 text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--clay)] focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {filteredGlossary.length > 0 ? (
            filteredGlossary.map((item) => {
              const term = language === "en" ? item.termEn : item.term;
              const definition = language === "en" ? item.definitionEn : item.definition;

              return (
                <motion.div
                  variants={itemVariants}
                  key={item.id}
                  className="bg-[var(--card)] border border-[var(--line)] p-6 rounded-xl shadow-[0_4px_12px_rgba(30,48,43,.03)] hover:shadow-[0_18px_44px_rgba(30,48,43,.15)] transition-all duration-300 flex flex-col gap-2 group relative overflow-hidden hover:-translate-y-1 hover:ring-2 hover:ring-[var(--clay)]/30 min-w-0"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--clay)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="font-serif text-2xl text-[var(--ink-deep)] break-words">
                    {term}
                  </h3>
                  <div className="h-px w-12 bg-[var(--line)] my-1 shrink-0" />
                  <p className="text-[var(--ink)] leading-relaxed text-sm md:text-base break-words">
                    {definition}
                  </p>
                </motion.div>
              );
            })
          ) : (
            <div className="md:col-span-2 text-center py-16 text-[var(--muted)] bg-[var(--card)] border border-[var(--line)] rounded-xl border-dashed">
              <p className="text-lg">
                {isIndonesian ? "Istilah tidak ditemukan." : "Term not found."}
              </p>
              <p className="text-sm mt-2 opacity-75">
                {isIndonesian ? "Coba kata kunci lain." : "Try another keyword."}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
