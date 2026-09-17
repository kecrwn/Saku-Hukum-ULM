"use client";

import { useState, useMemo, useEffect, useRef, useDeferredValue } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { lawKnowledgeBase, availableLawTopics } from "@/lib/knowledge";
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronsUpDown,
  RotateCcw,
  Sparkles,
  Layers,
  FileText,
  X,
  Scale,
  Landmark,
  ShieldCheck,
  Briefcase,
  Globe,
  SlidersHorizontal,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// -----------------------------------------------------------------------------
// Category Definitions & Topic Taxonomy
// -----------------------------------------------------------------------------
interface CategoryMeta {
  id: string;
  labelId: string;
  labelEn: string;
  icon: React.ElementType;
}

const CATEGORY_GROUPS: CategoryMeta[] = [
  { id: "all", labelId: "Semua Topik", labelEn: "All Topics", icon: Layers },
  { id: "konstitusi", labelId: "Konstitusi & Kenegaraan", labelEn: "Constitutional & State Law", icon: Landmark },
  { id: "pidana", labelId: "Pidana & Peradilan", labelEn: "Criminal & Judiciary", icon: ShieldCheck },
  { id: "perdata", labelId: "Perdata & Bisnis", labelEn: "Civil & Commercial", icon: Scale },
  { id: "publik", labelId: "Publik & Administrasi", labelEn: "Public & Administrative", icon: FileText },
  { id: "kontemporer", labelId: "Khusus & Kontemporer", labelEn: "Specialized & Tech", icon: Globe }
];

const TOPIC_TAXONOMY: Record<string, { catId: string; labelId: string; labelEn: string }> = {
  pancasila: { catId: "konstitusi", labelId: "Falsafah & Norma Dasar", labelEn: "State Philosophy" },
  uud_1945: { catId: "konstitusi", labelId: "Hukum Konstitusi", labelEn: "Constitutional Law" },
  tata_negara: { catId: "konstitusi", labelId: "Hukum Tata Negara", labelEn: "State Structure & Governance" },
  kuhp: { catId: "pidana", labelId: "Hukum Pidana Materiil", labelEn: "Substantive Criminal Law" },
  kuhap: { catId: "pidana", labelId: "Hukum Acara Pidana", labelEn: "Criminal Procedural Law" },
  hukum_pidana_khusus: { catId: "pidana", labelId: "Hukum Pidana Khusus", labelEn: "Specialized Criminal Law" },
  sistem_peradilan: { catId: "pidana", labelId: "Sistem Peradilan & Kekuasaan Kehakiman", labelEn: "Judicial System" },
  kuhperdata: { catId: "perdata", labelId: "Hukum Perdata Umum", labelEn: "General Civil Law" },
  hukum_dagang: { catId: "perdata", labelId: "Hukum Dagang & Bisnis", labelEn: "Commercial & Business Law" },
  hukum_korporasi: { catId: "perdata", labelId: "Hukum Perusahaan & Korporasi", labelEn: "Corporate Law" },
  hukum_hki: { catId: "perdata", labelId: "Hak Kekayaan Intelektual", labelEn: "Intellectual Property" },
  hukum_administrasi: { catId: "publik", labelId: "Hukum Administrasi Negara", labelEn: "Administrative Law" },
  hukum_agraria: { catId: "publik", labelId: "Hukum Agraria & Pertanahan", labelEn: "Agrarian & Land Law" },
  hukum_pajak: { catId: "publik", labelId: "Hukum Pajak & Keuangan Negara", labelEn: "Tax & Fiscal Law" },
  hukum_internasional: { catId: "kontemporer", labelId: "Hukum Internasional Publik & Perdata", labelEn: "International Law" },
  hukum_lingkungan: { catId: "kontemporer", labelId: "Hukum Lingkungan & Sumber Daya", labelEn: "Environmental Law" },
  hukum_keluarga: { catId: "kontemporer", labelId: "Hukum Perkawinan & Keluarga", labelEn: "Family Law" },
  hukum_perburuhan: { catId: "kontemporer", labelId: "Hukum Ketenagakerjaan", labelEn: "Labor Law" },
  hukum_siber: { catId: "kontemporer", labelId: "Hukum Siber & ITE", labelEn: "Cyber & Tech Law" }
};

interface NormalizedSection {
  heading: string;
  headingEn: string;
  content: string;
  contentEn: string;
}

interface NormalizedTopic {
  id: string;
  name: string;
  catId: string;
  categoryLabelId: string;
  categoryLabelEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  sections: NormalizedSection[];
  totalSections: number;
}

type SortMode = "default" | "alphabetical" | "reverse" | "sections";

export default function PustakaPage() {
  const { isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortMode>("default");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const searchInputRef = useRef<HTMLInputElement>(null);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // ---------------------------------------------------------------------------
  // 1. Data Normalization & Null-Safety Guardrails
  // ---------------------------------------------------------------------------
  const normalizedTopics = useMemo<NormalizedTopic[]>(() => {
    return availableLawTopics.map((topic) => {
      const rawData = (lawKnowledgeBase as Record<string, any>)[topic.id] || {};
      const tax = TOPIC_TAXONOMY[topic.id] || {
        catId: "kontemporer",
        labelId: "Hukum Umum",
        labelEn: "General Law"
      };

      const title = String(rawData.titleId || rawData.title || rawData.name || topic.name);
      const titleEn = String(rawData.titleEn || rawData.title || topic.name);
      const summary = String(rawData.summaryId || rawData.description || rawData.summary || "");
      const summaryEn = String(rawData.summaryEn || rawData.descriptionEn || rawData.description || summary);

      const rawSections = Array.isArray(rawData.sections) ? rawData.sections : [];
      const sections: NormalizedSection[] = rawSections.map((sec: any, idx: number) => {
        const heading = String(sec.headingId || sec.heading || sec.topic || sec.title || `Bagian ${idx + 1}`);
        const headingEn = String(sec.headingEn || sec.heading || sec.topic || sec.titleEn || heading);
        const content = String(sec.contentId || sec.content_id || sec.content || sec.body || "");
        const contentEn = String(sec.contentEn || sec.content_en || sec.content || sec.bodyEn || content);
        return { heading, headingEn, content, contentEn };
      });

      return {
        id: topic.id,
        name: topic.name,
        catId: tax.catId,
        categoryLabelId: tax.labelId,
        categoryLabelEn: tax.labelEn,
        title,
        titleEn,
        summary,
        summaryEn,
        sections,
        totalSections: sections.length
      };
    });
  }, []);

  // ---------------------------------------------------------------------------
  // 2. Computed Category Counts
  // ---------------------------------------------------------------------------
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    counts.set("all", normalizedTopics.length);
    normalizedTopics.forEach((t) => {
      counts.set(t.catId, (counts.get(t.catId) || 0) + 1);
    });
    return counts;
  }, [normalizedTopics]);

  // Total sections across library
  const totalSectionsCount = useMemo(() => {
    return normalizedTopics.reduce((acc, t) => acc + t.totalSections, 0);
  }, [normalizedTopics]);

  // ---------------------------------------------------------------------------
  // 3. Resilient Filtering, Search & Sorting
  // ---------------------------------------------------------------------------
  const filteredAndSortedTopics = useMemo(() => {
    let result = normalizedTopics;

    // Filter by active category
    if (activeCategory !== "all") {
      result = result.filter((t) => t.catId === activeCategory);
    }

    // Filter by search query (using deferred query for zero lag)
    const q = deferredSearchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((t) => {
        const matchName = t.name.toLowerCase().includes(q);
        const matchTitle = t.title.toLowerCase().includes(q) || t.titleEn.toLowerCase().includes(q);
        const matchSummary = t.summary.toLowerCase().includes(q) || t.summaryEn.toLowerCase().includes(q);
        const matchCat =
          t.categoryLabelId.toLowerCase().includes(q) || t.categoryLabelEn.toLowerCase().includes(q);
        const matchSections = t.sections.some(
          (sec) =>
            sec.heading.toLowerCase().includes(q) ||
            sec.headingEn.toLowerCase().includes(q) ||
            sec.content.toLowerCase().includes(q) ||
            sec.contentEn.toLowerCase().includes(q)
        );

        return matchName || matchTitle || matchSummary || matchCat || matchSections;
      });
    }

    // Sort topics based on selected criteria
    if (sortBy === "alphabetical") {
      return [...result].sort((a, b) => {
        const titleA = isIndonesian ? a.title : a.titleEn;
        const titleB = isIndonesian ? b.title : b.titleEn;
        return titleA.localeCompare(titleB, isIndonesian ? "id" : "en", { sensitivity: "base" });
      });
    }

    if (sortBy === "reverse") {
      return [...result].sort((a, b) => {
        const titleA = isIndonesian ? a.title : a.titleEn;
        const titleB = isIndonesian ? b.title : b.titleEn;
        return titleB.localeCompare(titleA, isIndonesian ? "id" : "en", { sensitivity: "base" });
      });
    }

    if (sortBy === "sections") {
      return [...result].sort((a, b) => b.totalSections - a.totalSections);
    }

    return result;
  }, [normalizedTopics, activeCategory, deferredSearchQuery, sortBy, isIndonesian]);

  // ---------------------------------------------------------------------------
  // 4. Keyboard Shortcuts (/ to focus search)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const isInput =
        tag === "input" || tag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === "/" && !isInput) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      } else if (e.key === "Escape" && document.activeElement === searchInputRef.current) {
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-expand matching topics when actively searching
  useEffect(() => {
    const q = deferredSearchQuery.trim();
    if (q) {
      setExpandedIds(new Set(filteredAndSortedTopics.map((t) => t.id)));
    }
  }, [deferredSearchQuery, filteredAndSortedTopics]);

  // ---------------------------------------------------------------------------
  // 5. Accordion Expand/Collapse Controls
  // ---------------------------------------------------------------------------
  const toggleTopic = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredAndSortedTopics.map((t) => t.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const handleReset = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("default");
    setExpandedIds(new Set());
  };

  const allAreExpanded =
    filteredAndSortedTopics.length > 0 &&
    filteredAndSortedTopics.every((t) => expandedIds.has(t.id));

  return (
    <div className="w-full min-h-screen bg-[var(--paper)] py-12 md:py-20 transition-colors duration-200 font-sans text-[var(--ink)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* ----------------------------------------------------------------- */}
        {/* Header Section */}
        {/* ----------------------------------------------------------------- */}
        <header className="mb-10 md:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(178,77,57,.08)] border border-[rgba(178,77,57,.15)] text-[var(--clay)] font-bold tracking-widest uppercase text-[11px]"
            >
              <BookOpen size={14} className="shrink-0" />
              <span>{isIndonesian ? "Basis Data Pengetahuan Hukum" : "Legal Knowledge Base"}</span>
            </motion.div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 text-xs font-semibold text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 border border-[var(--line)] shadow-xs">
                <Layers size={13} className="text-[var(--clay)]" />
                <span>
                  {normalizedTopics.length} {isIndonesian ? "Bidang Hukum" : "Law Branches"}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 border border-[var(--line)] shadow-xs">
                <FileText size={13} className="text-[var(--clay)]" />
                <span>
                  {totalSectionsCount} {isIndonesian ? "Bagian Materi" : "Legal Sections"}
                </span>
              </span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.03 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--ink-deep)] leading-tight tracking-tight mb-4"
          >
            {isIndonesian ? "Pustaka Hukum Indonesia" : "Indonesian Law Library"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.05 }}
            className="text-base sm:text-lg text-[var(--muted)] max-w-3xl leading-relaxed"
          >
            {isIndonesian
              ? "Repositori komprehensif norma hukum positif Indonesia, mencakup UUD 1945, kodifikasi KUHP & KUHPerdata, hukum acara, hingga regulasi siber dan bisnis terkini Fakultas Hukum ULM."
              : "A structured repository of Indonesian positive law codifications, statutory principles, procedural codes, and contemporary sectoral jurisprudence curated for academic inquiry."}
          </motion.p>
        </header>

        {/* ----------------------------------------------------------------- */}
        {/* Controls: Search, Sort, Category Tabs & Accordion Actions */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-4 mb-8">
          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Box */}
            <div className="relative group flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted)] group-focus-within:text-[var(--clay)] transition-colors">
                <Search size={18} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-11 pr-20 py-3.5 bg-white border border-[var(--line)] rounded-xl text-[var(--ink-deep)] placeholder:text-[var(--muted)]/70 focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all shadow-xs text-sm font-sans"
                placeholder={
                  isIndonesian
                    ? "Cari topik hukum, pasal, istilah, atau penjelasan... (tekan /)"
                    : "Search topics, statutes, articles, or explanations... (press /)"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={isIndonesian ? "Pencarian pustaka hukum" : "Search law library"}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="p-1 rounded-md text-[var(--muted)] hover:text-[var(--ink-deep)] hover:bg-[rgba(23,62,68,.08)] transition-colors cursor-pointer"
                    title={isIndonesian ? "Hapus pencarian" : "Clear search"}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-[var(--muted)]/70 bg-[var(--paper)] border border-[var(--line)] rounded">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Sort Selector Dropdown */}
            <div className="relative shrink-0 sm:w-60">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortMode)}
                className="w-full appearance-none pl-9 pr-9 py-3.5 bg-white border border-[var(--line)] rounded-xl text-xs sm:text-sm font-semibold text-[var(--ink-deep)] focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all shadow-xs cursor-pointer hover:border-[rgba(23,62,68,.3)]"
                aria-label={isIndonesian ? "Urutan topik pustaka" : "Sort library topics"}
              >
                <option value="default">
                  {isIndonesian ? "Urutan: Kurikulum Standar" : "Order: Standard Curriculum"}
                </option>
                <option value="alphabetical">
                  {isIndonesian ? "Nama Topik: A - Z" : "Topic: A - Z"}
                </option>
                <option value="reverse">
                  {isIndonesian ? "Nama Topik: Z - A" : "Topic: Z - A"}
                </option>
                <option value="sections">
                  {isIndonesian ? "Materi Terbanyak" : "Most Sections"}
                </option>
              </select>
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Category Filter Pills (Responsive Horizontal Scroll without clipping corners) */}
          <div className="relative -mx-2 px-2 py-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-2 min-w-max">
              {CATEGORY_GROUPS.map((cat) => {
                const Icon = cat.icon;
                const count = categoryCounts.get(cat.id) || 0;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)]/40 focus-visible:ring-offset-1 ${
                      isSelected
                        ? "bg-[var(--clay)] text-white shadow-sm ring-1 ring-[var(--clay)] font-bold"
                        : "bg-white/90 border border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink-deep)] hover:border-[rgba(23,62,68,.3)] hover:bg-white"
                    }`}
                  >
                    <Icon size={14} className={isSelected ? "text-white" : "text-[var(--clay)]"} />
                    <span>{isIndonesian ? cat.labelId : cat.labelEn}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors ${
                        isSelected ? "bg-white/20 text-white" : "bg-[rgba(23,62,68,.08)] text-[var(--muted)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary & Master Collapse/Expand Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-[var(--line)]">
            <div className="flex flex-wrap items-center gap-2 text-[var(--muted)]">
              <span>
                {isIndonesian ? "Menampilkan" : "Showing"}{" "}
                <strong className="text-[var(--ink-deep)]">{filteredAndSortedTopics.length}</strong>{" "}
                {isIndonesian ? "topik dari" : "topics of"}{" "}
                <strong className="text-[var(--ink-deep)]">{normalizedTopics.length}</strong>
              </span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[rgba(178,77,57,.1)] text-[var(--clay)] font-semibold">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button onClick={() => setSearchQuery("")} aria-label="Clear filter" className="cursor-pointer hover:opacity-80">
                    <X size={12} />
                  </button>
                </span>
              )}

              {activeCategory !== "all" && (
                <button
                  onClick={() => setActiveCategory("all")}
                  className="text-[var(--clay)] hover:underline ml-1 font-semibold cursor-pointer"
                >
                  {isIndonesian ? "Hapus Kategori" : "Clear Category"}
                </button>
              )}

              {sortBy !== "default" && (
                <button
                  onClick={() => setSortBy("default")}
                  className="text-[var(--clay)] hover:underline ml-1 font-semibold cursor-pointer"
                >
                  {isIndonesian ? "Reset Urutan" : "Reset Sort"}
                </button>
              )}
            </div>

            {/* Master Accordion Buttons */}
            {filteredAndSortedTopics.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={allAreExpanded ? collapseAll : expandAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[var(--line)] text-[var(--ink-deep)] hover:border-[var(--clay)] hover:text-[var(--clay)] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                  title={allAreExpanded ? (isIndonesian ? "Tutup semua topik" : "Collapse all") : (isIndonesian ? "Buka semua topik" : "Expand all")}
                >
                  <ChevronsUpDown size={14} />
                  <span>
                    {allAreExpanded
                      ? isIndonesian
                        ? "Tutup Semua"
                        : "Collapse All"
                      : isIndonesian
                      ? "Buka Semua"
                      : "Expand All"}
                  </span>
                </button>

                {(searchQuery || activeCategory !== "all" || sortBy !== "default") && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[var(--clay)] hover:bg-[rgba(178,77,57,.08)] font-bold text-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{isIndonesian ? "Reset" : "Reset"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Topics Accordion Grid */}
        {/* ----------------------------------------------------------------- */}
        <div className="space-y-5 min-h-[380px]">
          {filteredAndSortedTopics.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-[var(--line)] bg-white/60 shadow-xs"
            >
              <FileText size={48} className="mb-4 text-[var(--muted)] opacity-50" strokeWidth={1.5} />
              <h3 className="text-xl font-serif font-bold text-[var(--ink-deep)] mb-2">
                {isIndonesian ? "Topik Hukum Tidak Ditemukan" : "No Law Topics Found"}
              </h3>
              <p className="text-sm text-[var(--muted)] max-w-md mb-6 leading-relaxed">
                {isIndonesian
                  ? "Tidak ada topik hukum atau pasal yang cocok dengan kueri pencarian Anda. Silakan coba kata kunci lain atau bersihkan filter aktif."
                  : "No legal topics or statutory articles matched your query. Try adjusting your search or reset all active filters."}
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--clay)] text-white rounded-xl text-xs font-bold hover:bg-[var(--ink-deep)] transition-colors shadow-sm cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>{isIndonesian ? "Reset Semua Pencarian" : "Reset All Searches"}</span>
              </button>
            </motion.div>
          ) : (
            filteredAndSortedTopics.map((topic, idx) => {
              const isExpanded = expandedIds.has(topic.id);
              const displayTitle = isIndonesian ? topic.title : topic.titleEn;
              const displaySummary = isIndonesian ? topic.summary : topic.summaryEn;
              const displayCatLabel = isIndonesian ? topic.categoryLabelId : topic.categoryLabelEn;

              return (
                <div
                  key={topic.id}
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isExpanded
                      ? "border-[var(--clay)]/60 shadow-[0_8px_24px_rgba(23,62,68,.08)] ring-1 ring-[var(--clay)]/20"
                      : "border-[var(--line)] hover:border-[rgba(23,62,68,.3)] hover:shadow-sm"
                  }`}
                >
                  {/* Topic Header & Collapse/Expand Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`topic-content-${topic.id}`}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 bg-transparent outline-none cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      {/* Eyebrow: Category Badge & Topic Counter */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[rgba(178,77,57,.08)] text-[var(--clay)]">
                          {displayCatLabel}
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--muted)] flex items-center gap-1">
                          <FileText size={12} className="text-[var(--clay)]" />
                          <span>
                            {topic.totalSections} {isIndonesian ? "Bagian" : "Sections"}
                          </span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--ink-deep)] group-hover:text-[var(--clay)] transition-colors leading-snug mb-2">
                        {displayTitle}
                      </h2>

                      {/* Summary Paragraph */}
                      {displaySummary && (
                        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {displaySummary}
                        </p>
                      )}
                    </div>

                    {/* Optimized Collapse/Expand Button */}
                    <div className="shrink-0 flex items-center gap-2 pt-1">
                      <span className="hidden md:inline-block text-[11px] font-bold text-[var(--muted)] group-hover:text-[var(--clay)] transition-colors">
                        {isExpanded
                          ? isIndonesian
                            ? "Tutup Topik"
                            : "Collapse"
                          : isIndonesian
                          ? "Buka Materi"
                          : "Expand"}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 ${
                          isExpanded
                            ? "bg-[var(--clay)] border-[var(--clay)] text-white rotate-180 shadow-xs"
                            : "bg-[var(--paper)] border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--clay)] group-hover:text-[var(--clay)]"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </button>

                  {/* Smooth Animated Content Drawer */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`topic-content-${topic.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-7 pt-3 border-t border-[var(--line)] bg-[rgba(239,229,214,.18)]">
                          {/* Full Summary Banner if long */}
                          {displaySummary && (
                            <div className="mb-6 p-4 rounded-xl bg-white border border-[var(--line)] text-xs sm:text-sm text-[var(--ink)] leading-relaxed shadow-2xs">
                              <p className="font-semibold text-[var(--clay)] mb-1 uppercase tracking-wider text-[10px]">
                                {isIndonesian ? "Ikhtisar Yuridis Komprehensif" : "Comprehensive Juridical Summary"}
                              </p>
                              <p>{displaySummary}</p>
                            </div>
                          )}

                          {/* Sections Grid */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {topic.sections.map((section, sIdx) => {
                              const secHeading = isIndonesian ? section.heading : section.headingEn;
                              const secContent = isIndonesian ? section.content : section.contentEn;

                              return (
                                <div
                                  key={`sec-${topic.id}-${sIdx}`}
                                  className="bg-white rounded-xl p-5 border border-[var(--line)] hover:border-[var(--clay)]/40 transition-all shadow-2xs flex flex-col justify-between"
                                >
                                  <div>
                                    {/* Section Number & Heading */}
                                    <div className="flex items-start gap-3 mb-3">
                                      <span className="shrink-0 px-2 py-0.5 rounded bg-[var(--paper)] border border-[var(--line)] text-[10px] font-bold font-mono text-[var(--clay)]">
                                        #{String(sIdx + 1).padStart(2, "0")}
                                      </span>
                                      <h3 className="text-sm sm:text-base font-serif font-bold text-[var(--ink-deep)] leading-snug">
                                        {secHeading}
                                      </h3>
                                    </div>

                                    {/* Section Body */}
                                    <div className="text-xs sm:text-[13px] text-[var(--ink)]/90 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                                      {secContent}
                                    </div>
                                  </div>

                                  {/* Section Bottom Accent */}
                                  <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[10px] font-semibold text-[var(--muted)]">
                                    <span>
                                      {isIndonesian ? "Materi Terverifikasi" : "Verified Academic Material"}
                                    </span>
                                    <span className="text-[var(--clay)]">
                                      Saku Hukum ULM
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

