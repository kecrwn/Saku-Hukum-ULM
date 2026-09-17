"use client";

import React, {
  useState,
  useMemo,
  useEffect,
  useDeferredValue,
  useRef,
  useCallback
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Search,
  Library,
  FileText,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  BookOpen,
  X,
  Bookmark,
  Clock,
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  RotateCcw,
  Sparkles,
  BookMarked,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Check,
  Filter
} from "lucide-react";
import BookReader from "@/components/BookReader";
import { motion, AnimatePresence } from "framer-motion";

export interface ChapterItem {
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
}

const translateCategory = (cat: string, isIndo: boolean) => {
  if (isIndo) return cat;
  const map: Record<string, string> = {
    "Hukum Umum": "General Law",
    "Hukum Pidana": "Criminal Law",
    "Hukum Perdata": "Civil Law",
    "Hukum Tata Negara": "Constitutional Law",
    "Hukum Administrasi Negara": "Administrative Law",
    "Hukum Internasional": "International Law",
    "Hukum Acara Pidana": "Criminal Procedural Law",
    "Hukum Acara Perdata": "Civil Procedural Law",
    "Hukum Acara": "Procedural Law",
    "Hukum Agraria": "Agrarian Law",
    "Pengantar Ilmu Hukum": "Introduction to Law",
    "Ilmu Negara": "State Theory",
    "Sistem Peradilan": "Judicial System",
    "Hukum Perikatan": "Contract Law",
    "Hukum Perdata Formil": "Formal Civil Law",
    "Hukum Pidana Formil": "Formal Criminal Law",
    "Hukum Internasional Publik": "Public International Law",
    "Hukum Agraria Lanjut": "Advanced Agrarian Law"
  };
  return map[cat] || cat;
};

export interface DocumentItem {
  id: string;
  title: string;
  titleEn: string;
  author: string;
  category: string;
  source: string;
  coverColor: string;
  description: string;
  descriptionEn: string;
  chapters: ChapterItem[];
  chapterCount: number;
  estReadingTimeMinutes: number;
}

interface LibraryClientProps {
  initialDocuments: any[];
}

export default function LibraryClient({ initialDocuments }: LibraryClientProps) {
  const { isIndonesian } = useLanguage();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const isSearchPending = searchQuery !== deferredSearchQuery;

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"alphabetical" | "reverse" | "chapters" | "author">("alphabetical");
  const [activeTab, setActiveTab] = useState<"all" | "bookmarks">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Bookmarks & Recently read (persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [lastReadId, setLastReadId] = useState<string | null>(null);

  // Modal active document
  const [activeDocument, setActiveDocument] = useState<DocumentItem | null>(null);
  const lastOpenedDocIdRef = useRef<string | null>(null);

  // Search input ref for keyboard shortcut focus
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ---------------------------------------------------------------------------
  // 1. Data Normalization & Null-Safety Guardrails
  // ---------------------------------------------------------------------------
  const documents: DocumentItem[] = useMemo(() => {
    if (!Array.isArray(initialDocuments)) return [];

    const seenIds = new Set<string>();

    return initialDocuments.map((b: any, index: number) => {
      // Safe unique ID generation preventing React key collisions
      const rawId = String(b.id || b.slug || `doc-${index}`);
      let id = rawId;
      if (seenIds.has(id)) {
        id = `${rawId}-${index}`;
      }
      seenIds.add(id);

      const title = String(b.title || b.titleId || b.titleEn || "Dokumen Pustaka");
      const titleEn = String(b.titleEn || b.title || title);
      const author = String(b.author || "Tim Redaksi Saku Hukum ULM");
      const category = String(b.category || "Hukum Umum");
      const source = String(b.source || "Saku Hukum ULM Archive");
      const coverColor = String(b.coverColor || "var(--clay)");
      const description = String(b.description || b.summary || b.summaryId || "");
      const descriptionEn = String(b.descriptionEn || b.summaryEn || description);

      // Support chapters array or convert sections if knowledge base schema
      let rawChapters: any[] = [];
      if (Array.isArray(b.chapters) && b.chapters.length > 0) {
        rawChapters = b.chapters;
      } else if (Array.isArray(b.sections) && b.sections.length > 0) {
        rawChapters = b.sections.map((s: any, sIdx: number) => ({
          title: s.headingId || s.heading || s.title || `Bagian ${sIdx + 1}`,
          titleEn: s.headingEn || s.titleEn,
          content: s.contentId || s.content || s.body || "",
          contentEn: s.contentEn || s.bodyEn
        }));
      }

      let chapters: ChapterItem[] = rawChapters.map((ch: any, chIdx: number) => ({
        title: String(ch.title || ch.heading || `Bab ${chIdx + 1}`),
        titleEn: ch.titleEn || ch.headingEn ? String(ch.titleEn || ch.headingEn) : `Chapter ${chIdx + 1}`,
        content: String(ch.content || ch.body || ""),
        contentEn: ch.contentEn || ch.bodyEn ? String(ch.contentEn || ch.bodyEn) : undefined
      }));

      if (chapters.length === 0) {
        chapters = [
          {
            title: title,
            titleEn: titleEn,
            content: description || "Materi naskah lengkap sedang dalam proses digitalisasi dan penyelarasan arsip fakultas.",
            contentEn: descriptionEn || "Full text is currently being digitized and aligned with faculty archives."
          }
        ];
      }

      const estReadingTimeMinutes = Math.max(3, chapters.length * 3);

      return {
        id,
        title,
        titleEn,
        author,
        category,
        source,
        coverColor,
        description,
        descriptionEn,
        chapters,
        chapterCount: chapters.length,
        estReadingTimeMinutes
      };
    });
  }, [initialDocuments]);

  // Hydrate bookmarks & last read safely from localStorage (client-side only)
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("shulm_library_bookmarks");
      if (savedBookmarks) {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      }
      const savedLastRead = localStorage.getItem("shulm_library_last_read");
      if (savedLastRead) {
        setLastReadId(savedLastRead);
      }
    } catch {
      // Ignore if localStorage is restricted/disabled
    }
  }, []);

  // Quick keyboard shortcuts (/ or Ctrl+K to search, Esc to blur)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      const isInput = tag === "input" || tag === "textarea" || (document.activeElement as HTMLElement)?.isContentEditable;

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

  // Restore focus after BookReader closes
  useEffect(() => {
    if (!activeDocument && lastOpenedDocIdRef.current) {
      const targetId = `doc-card-${lastOpenedDocIdRef.current}`;
      const el = document.getElementById(targetId);
      if (el) {
        el.focus();
      }
      lastOpenedDocIdRef.current = null;
    }
  }, [activeDocument]);

  // ---------------------------------------------------------------------------
  // 2. Computed Categories & Counts
  // ---------------------------------------------------------------------------
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    documents.forEach((d) => {
      counts.set(d.category, (counts.get(d.category) || 0) + 1);
    });
    return counts;
  }, [documents]);

  const categories = useMemo(() => {
    const sorted = Array.from(categoryCounts.keys()).sort((a, b) => a.localeCompare(b));
    return ["All", ...sorted];
  }, [categoryCounts]);

  const bookmarkedCount = useMemo(() => {
    return documents.filter((d) => bookmarkedIds.includes(d.id)).length;
  }, [documents, bookmarkedIds]);

  // ---------------------------------------------------------------------------
  // 3. Deferred Filtering & Sorting (120fps typing, zero keystroke lag)
  // ---------------------------------------------------------------------------
  const filteredAndSortedDocs = useMemo(() => {
    let result = documents;

    // Filter by bookmarks tab if active
    if (activeTab === "bookmarks") {
      result = result.filter((d) => bookmarkedIds.includes(d.id));
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((d) => d.category === activeCategory);
    }

    const q = deferredSearchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((d) => {
        const catTranslated = translateCategory(d.category, isIndonesian);
        return (
          d.title.toLowerCase().includes(q) ||
          d.titleEn.toLowerCase().includes(q) ||
          d.author.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          catTranslated.toLowerCase().includes(q) ||
          d.source.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.descriptionEn.toLowerCase().includes(q)
        );
      });
    }

    // Sorting logic
    return [...result].sort((a, b) => {
      const titleA = !isIndonesian && a.titleEn ? a.titleEn : a.title;
      const titleB = !isIndonesian && b.titleEn ? b.titleEn : b.title;
      if (sortOrder === "alphabetical") {
        return titleA.localeCompare(titleB, undefined, { sensitivity: "base" });
      }
      if (sortOrder === "reverse") {
        return titleB.localeCompare(titleA, undefined, { sensitivity: "base" });
      }
      if (sortOrder === "chapters") {
        return b.chapterCount - a.chapterCount;
      }
      if (sortOrder === "author") {
        return a.author.localeCompare(b.author, undefined, { sensitivity: "base" });
      }
      return 0;
    });
  }, [documents, activeTab, bookmarkedIds, activeCategory, deferredSearchQuery, sortOrder]);

  // ---------------------------------------------------------------------------
  // 4. Safe Pagination (Prevents Cascading Re-render and Blank Flashes)
  // ---------------------------------------------------------------------------
  const effectiveItemsPerPage = itemsPerPage === 0 ? Math.max(1, filteredAndSortedDocs.length) : itemsPerPage;
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedDocs.length / effectiveItemsPerPage));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedDocs = useMemo(() => {
    if (itemsPerPage === 0) return filteredAndSortedDocs;
    const start = (safePage - 1) * itemsPerPage;
    return filteredAndSortedDocs.slice(start, start + itemsPerPage);
  }, [filteredAndSortedDocs, safePage, itemsPerPage]);

  const startIndex = filteredAndSortedDocs.length === 0 ? 0 : (safePage - 1) * effectiveItemsPerPage + 1;
  const endIndex = Math.min(safePage * effectiveItemsPerPage, filteredAndSortedDocs.length);

  // Smooth scroll to catalog anchor when paginating
  const scrollToCatalog = useCallback(() => {
    const anchor = document.getElementById("library-catalog-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToCatalog();
  };

  // Synchronous filter changes to prevent redundant render cascades
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (order: "alphabetical" | "reverse" | "chapters" | "author") => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: "all" | "bookmarks") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSortOrder("alphabetical");
    setActiveTab("all");
    setCurrentPage(1);
  };

  // Toggle bookmark with localStorage sync
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setBookmarkedIds((prev) => {
      const isAlready = prev.includes(id);
      const next = isAlready ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("shulm_library_bookmarks", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Open book in reader modal
  const handleOpenDocument = (doc: DocumentItem) => {
    lastOpenedDocIdRef.current = doc.id;
    setLastReadId(doc.id);
    try {
      localStorage.setItem("shulm_library_last_read", doc.id);
    } catch {}
    setActiveDocument(doc);
  };

  // Helper for pagination numbers
  const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, "...", total];
    }
    if (current >= total - 3) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  return (
    <div className="w-full min-h-screen bg-[var(--paper)] py-12 md:py-20 transition-colors duration-500 font-sans text-[var(--ink-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* ------------------------------------------------------------------- */}
        {/* Header Section */}
        {/* ------------------------------------------------------------------- */}
        <header className="mb-10 md:mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(178,77,57,.08)] border border-[rgba(178,77,57,.15)] text-[var(--clay)] font-bold tracking-widest uppercase text-[11px]"
            >
              <Library size={14} className="shrink-0" />
              <span>{isIndonesian ? "Pusat Arsip Digital" : "Digital Archive Center"}</span>
            </motion.div>

            {/* Quick Repository Metrics Bar */}
            <div className="flex items-center gap-3 text-xs font-semibold text-[#66736f]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 border border-[rgba(23,62,68,.08)] shadow-xs">
                <BookOpen size={13} className="text-[var(--clay)]" />
                <span>{documents.length} {isIndonesian ? "Koleksi" : "Documents"}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/70 border border-[rgba(23,62,68,.08)] shadow-xs">
                <FileText size={13} className="text-[var(--clay)]" />
                <span>{documents.reduce((acc, d) => acc + d.chapterCount, 0)} {isIndonesian ? "Bab" : "Chapters"}</span>
              </span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--ink-deep)] leading-tight tracking-tight mb-4"
          >
            {isIndonesian ? "Pustaka & Ruang Baca Hukum" : "Legal Library & Reading Room"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-base sm:text-lg text-[#66736f] max-w-3xl leading-relaxed"
          >
            {isIndonesian
              ? "Koleksi komprehensif literatur hukum, undang-undang, modul akademik, dan anotasi yuridis Fakultas Hukum ULM. Dirancang untuk telaah mendalam dengan navigasi terstruktur dan pencarian responsif."
              : "A comprehensive repository of legal literature, statutory codes, academic modules, and jurisprudence from ULM Faculty of Law. Engineered for deep research with structured reading and responsive navigation."}
          </motion.p>
        </header>

        {/* ------------------------------------------------------------------- */}
        {/* Navigation Tabs (Semua Koleksi vs Tersimpan) */}
        {/* ------------------------------------------------------------------- */}
        <div className="flex items-center gap-2 mb-6 border-b border-[rgba(23,62,68,.1)] pb-2 overflow-x-auto">
          <button
            onClick={() => handleTabChange("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-[var(--ink-deep)] text-[var(--paper)] shadow-sm"
                : "text-[#66736f] hover:text-[var(--ink-deep)] hover:bg-white/60"
            }`}
          >
            <BookOpen size={16} />
            <span>{isIndonesian ? "Semua Koleksi" : "All Documents"}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "all" ? "bg-white/20 text-white" : "bg-[rgba(23,62,68,.08)] text-[#66736f]"}`}>
              {documents.length}
            </span>
          </button>

          <button
            onClick={() => handleTabChange("bookmarks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === "bookmarks"
                ? "bg-[var(--ink-deep)] text-[var(--paper)] shadow-sm"
                : "text-[#66736f] hover:text-[var(--ink-deep)] hover:bg-white/60"
            }`}
          >
            <Bookmark size={16} className={bookmarkedCount > 0 ? "fill-current" : ""} />
            <span>{isIndonesian ? "Tersimpan" : "Bookmarks"}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "bookmarks" ? "bg-white/20 text-white" : "bg-[rgba(23,62,68,.08)] text-[#66736f]"}`}>
              {bookmarkedCount}
            </span>
          </button>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* Controls Row: Search, Category Pills & Quick Dropdowns */}
        {/* ------------------------------------------------------------------- */}
        <div className="space-y-4 mb-8">
          
          {/* Search Bar & View Mode / Density Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#66736f] group-focus-within:text-[var(--clay)] transition-colors">
                <Search size={18} />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                className="w-full pl-11 pr-20 py-3 bg-white border border-[rgba(23,62,68,.14)] rounded-xl text-[var(--ink-deep)] placeholder:text-[#66736f]/70 focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all shadow-xs text-sm"
                placeholder={isIndonesian ? "Cari judul, penulis, bab, atau materi... (tekan /)" : "Search title, author, chapter, or keyword... (press /)"}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label={isIndonesian ? "Pencarian Pustaka" : "Search Library"}
              />
              
              {/* Right tools inside search input (Clear button + Pending indicator + Shortcut badge) */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                {isSearchPending && (
                  <span className="w-2 h-2 rounded-full bg-[var(--clay)] animate-ping mr-1" title="Searching..." />
                )}
                {searchQuery ? (
                  <button
                    onClick={() => handleSearchChange("")}
                    className="p-1 rounded-md text-[#66736f] hover:text-[var(--ink-deep)] hover:bg-[rgba(23,62,68,.08)] transition-colors"
                    title={isIndonesian ? "Hapus pencarian" : "Clear search"}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold text-[#66736f]/70 bg-[var(--paper)] border border-[rgba(23,62,68,.12)] rounded">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Sort & View Mode Controls */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Sort Order Dropdown */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortOrder}
                  onChange={(e) => handleSortChange(e.target.value as any)}
                  className="w-full appearance-none pl-9 pr-8 py-3 bg-white border border-[rgba(23,62,68,.14)] rounded-xl text-xs sm:text-sm font-semibold text-[var(--ink-deep)] focus:outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all shadow-xs cursor-pointer"
                  aria-label={isIndonesian ? "Urutan dokumen" : "Sort documents"}
                >
                  <option value="alphabetical">{isIndonesian ? "Judul: A - Z" : "Title: A - Z"}</option>
                  <option value="reverse">{isIndonesian ? "Judul: Z - A" : "Title: Z - A"}</option>
                  <option value="chapters">{isIndonesian ? "Bab Terbanyak" : "Most Chapters"}</option>
                  <option value="author">{isIndonesian ? "Penulis: A - Z" : "Author: A - Z"}</option>
                </select>
                <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#66736f] pointer-events-none" />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#66736f]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              {/* Items per Page Dropdown */}
              <div className="relative hidden md:block">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="appearance-none pl-3 pr-7 py-3 bg-white border border-[rgba(23,62,68,.14)] rounded-xl text-xs font-semibold text-[var(--ink-deep)] focus:outline-none focus:border-[var(--clay)] transition-all shadow-xs cursor-pointer"
                  aria-label={isIndonesian ? "Jumlah per halaman" : "Items per page"}
                >
                  <option value={9}>9 {isIndonesian ? "item" : "items"}</option>
                  <option value={18}>18 {isIndonesian ? "item" : "items"}</option>
                  <option value={36}>36 {isIndonesian ? "item" : "items"}</option>
                  <option value={0}>{isIndonesian ? "Semua" : "All"}</option>
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#66736f]">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center p-1 bg-white border border-[rgba(23,62,68,.14)] rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-[var(--ink-deep)] text-white shadow-xs"
                      : "text-[#66736f] hover:text-[var(--ink-deep)] hover:bg-[rgba(23,62,68,.05)]"
                  }`}
                  title={isIndonesian ? "Tampilan Grid" : "Grid View"}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-[var(--ink-deep)] text-white shadow-xs"
                      : "text-[#66736f] hover:text-[var(--ink-deep)] hover:bg-[rgba(23,62,68,.05)]"
                  }`}
                  title={isIndonesian ? "Tampilan Daftar" : "List View"}
                  aria-label="List view"
                >
                  <ListIcon size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Category Filter Pills (Responsive, Smooth Horizontal Scroll) */}
          <div className="relative py-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => {
                const count = c === "All" ? documents.length : categoryCounts.get(c) || 0;
                const isSelected = activeCategory === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCategoryChange(c)}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? "bg-[var(--clay)] text-white shadow-xs scale-102"
                        : "bg-white/80 border border-[rgba(23,62,68,.12)] text-[#66736f] hover:text-[var(--ink-deep)] hover:border-[rgba(23,62,68,.25)] hover:bg-white"
                    }`}
                  >
                    <span>{c === "All" ? (isIndonesian ? "Semua Kategori" : "All Categories") : translateCategory(c, isIndonesian)}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-white/20 text-white" : "bg-[rgba(23,62,68,.08)] text-[#66736f]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Chips & Clear Action */}
          {(searchQuery || activeCategory !== "All" || activeTab === "bookmarks") && (
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="text-[#66736f] font-medium flex items-center gap-1 mr-1">
                <Filter size={12} />
                {isIndonesian ? "Filter aktif:" : "Active filters:"}
              </span>

              {activeTab === "bookmarks" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(178,77,57,.1)] text-[var(--clay)] font-bold">
                  <span>{isIndonesian ? "Koleksi Tersimpan" : "Bookmarks"}</span>
                  <button
                    onClick={() => handleTabChange("all")}
                    className="hover:opacity-75"
                    aria-label="Remove filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(23,62,68,.08)] text-[var(--ink-deep)] font-semibold">
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => handleSearchChange("")}
                    className="hover:opacity-75"
                    aria-label="Remove search filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {activeCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[rgba(23,62,68,.08)] text-[var(--ink-deep)] font-semibold">
                  <span>{translateCategory(activeCategory, isIndonesian)}</span>
                  <button
                    onClick={() => handleCategoryChange("All")}
                    className="hover:opacity-75"
                    aria-label="Remove category filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-[var(--clay)] font-bold hover:underline ml-2"
              >
                <RotateCcw size={12} />
                <span>{isIndonesian ? "Reset Semua" : "Reset All"}</span>
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* Catalog Section Anchor (for smooth pagination scrolling) */}
        {/* ------------------------------------------------------------------- */}
        <div id="library-catalog-anchor" className="scroll-mt-6" />

        {/* Result summary counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-[#66736f]">
          <p>
            {filteredAndSortedDocs.length > 0 ? (
              <>
                {isIndonesian ? "Menampilkan" : "Showing"}{" "}
                <span className="font-bold text-[var(--ink-deep)]">{startIndex}–{endIndex}</span>{" "}
                {isIndonesian ? "dari" : "of"}{" "}
                <span className="font-bold text-[var(--ink-deep)]">{filteredAndSortedDocs.length}</span>{" "}
                {isIndonesian ? "dokumen" : "documents"}
              </>
            ) : (
              <span>{isIndonesian ? "0 dokumen ditemukan" : "0 documents found"}</span>
            )}
          </p>

          {lastReadId && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[#66736f]">
              <Clock size={12} className="text-[var(--clay)]" />
              <span>
                {isIndonesian ? "Terakhir dibaca tersimpan otomatis" : "Last read saved automatically"}
              </span>
            </span>
          )}
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* Documents Grid / List Display */}
        {/* ------------------------------------------------------------------- */}
        <div className="min-h-[420px]">
          {filteredAndSortedDocs.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-[rgba(23,62,68,.1)] bg-white/50"
            >
              {activeTab === "bookmarks" ? (
                <>
                  <BookMarked size={48} className="mb-4 text-[var(--clay)] opacity-60" strokeWidth={1.5} />
                  <h3 className="text-xl font-serif font-bold text-[var(--ink-deep)] mb-2">
                    {isIndonesian ? "Belum Ada Dokumen Tersimpan" : "No Bookmarked Documents"}
                  </h3>
                  <p className="text-sm text-[#66736f] max-w-md mb-6 leading-relaxed">
                    {isIndonesian
                      ? "Tandai dokumen dengan ikon bookmark pada kartu untuk menyimpannya ke daftar bacaan pribadi Anda."
                      : "Bookmark documents using the bookmark icon on each card to build your personal reading list."}
                  </p>
                  <button
                    onClick={() => handleTabChange("all")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ink-deep)] text-white rounded-xl text-xs font-bold hover:bg-[var(--clay)] transition-colors shadow-sm"
                  >
                    <BookOpen size={14} />
                    <span>{isIndonesian ? "Jelajahi Pustaka" : "Browse Library"}</span>
                  </button>
                </>
              ) : (
                <>
                  <FileText size={48} className="mb-4 text-[#66736f] opacity-50" strokeWidth={1.5} />
                  <h3 className="text-xl font-serif font-bold text-[var(--ink-deep)] mb-2">
                    {isIndonesian ? "Dokumen Tidak Ditemukan" : "No Documents Found"}
                  </h3>
                  <p className="text-sm text-[#66736f] max-w-md mb-6 leading-relaxed">
                    {isIndonesian
                      ? "Tidak ada dokumen yang cocok dengan kata kunci atau filter aktif. Coba ubah kata kunci atau bersihkan filter pencarian Anda."
                      : "No documents matched your active search query or filters. Try adjusting your search term or reset all filters."}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--clay)] text-white rounded-xl text-xs font-bold hover:bg-[var(--ink-deep)] transition-colors shadow-sm"
                  >
                    <RotateCcw size={14} />
                    <span>{isIndonesian ? "Reset Semua Filter" : "Reset All Filters"}</span>
                  </button>
                </>
              )}
            </motion.div>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [content-visibility:auto]">
              {paginatedDocs.map((doc, idx) => {
                const isBookmarked = bookmarkedIds.includes(doc.id);
                const isLastRead = doc.id === lastReadId;
                const displayTitle = !isIndonesian && doc.titleEn ? doc.titleEn : doc.title;

                return (
                  <motion.div
                    key={doc.id}
                    id={`doc-card-${doc.id}`}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(idx * 0.02, 0.08)
                    }}
                    onClick={() => handleOpenDocument(doc)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenDocument(doc);
                      }
                    }}
                    aria-label={`Buka dokumen ${displayTitle}`}
                    className="group bg-white border border-[rgba(23,62,68,.12)] rounded-2xl p-6 flex flex-col justify-between cursor-pointer hover:border-[var(--clay)] hover:shadow-[0_12px_36px_rgba(16,45,51,.09)] transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--clay)]/40 transform-gpu will-change-transform"
                  >
                    {/* Top Spine Accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
                      style={{ backgroundColor: doc.coverColor || "var(--clay)" }}
                    />

                    {/* Top Row: Category & Badges & Bookmark */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--clay)] bg-[rgba(178,77,57,.08)] rounded-md">
                            {translateCategory(doc.category, isIndonesian)}
                          </span>
                          {isLastRead && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--ink)] bg-[rgba(23,62,68,.08)] rounded-md">
                              <Clock size={10} />
                              <span>{isIndonesian ? "Terakhir Dibaca" : "Recent"}</span>
                            </span>
                          )}
                        </div>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(doc.id, e)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isBookmarked
                              ? "text-[var(--clay)] bg-[rgba(178,77,57,.1)]"
                              : "text-[#66736f]/60 hover:text-[var(--clay)] hover:bg-[rgba(178,77,57,.08)]"
                          }`}
                          title={isBookmarked ? (isIndonesian ? "Hapus dari tersimpan" : "Remove bookmark") : (isIndonesian ? "Simpan dokumen" : "Bookmark document")}
                          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark document"}
                        >
                          <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--ink-deep)] leading-snug mb-2 group-hover:text-[var(--clay)] transition-colors line-clamp-2 min-h-[3.2rem]">
                        {displayTitle}
                      </h3>

                      {/* Author */}
                      <p className="text-xs font-semibold text-[#66736f] mb-4 flex items-center gap-1.5">
                        <span className="truncate">{!isIndonesian && doc.author === "Tim Redaksi Saku Hukum ULM" ? "Saku Hukum ULM Editorial Team" : doc.author}</span>
                      </p>

                      {/* Snippet / Description (if available) */}
                      {doc.description && (
                        <p className="text-xs text-[#66736f]/85 line-clamp-2 mb-6 leading-relaxed">
                          {!isIndonesian && doc.descriptionEn ? doc.descriptionEn : doc.description}
                        </p>
                      )}
                    </div>

                    {/* Card Bottom: Metadata & CTA */}
                    <div className="pt-4 border-t border-[rgba(23,62,68,.08)] flex items-center justify-between gap-2 mt-auto">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Chapters Count */}
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#66736f]">
                          <FileText size={12} className="text-[var(--clay)]" />
                          <span>{doc.chapterCount} {isIndonesian ? "Bab" : "Ch."}</span>
                        </span>

                        {/* Source badge */}
                        <div className="inline-flex items-center max-w-[140px] px-2.5 py-1 bg-[var(--paper)] border border-[rgba(23,62,68,.1)] text-[var(--ink-deep)] rounded-md text-[10px] font-bold">
                          <span className="truncate opacity-80">{doc.source}</span>
                        </div>
                      </div>

                      {/* Read CTA */}
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--clay)] group-hover:translate-x-0.5 transition-transform shrink-0">
                        <span>{isIndonesian ? "Baca" : "Read"}</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3 [content-visibility:auto]">
              {paginatedDocs.map((doc, idx) => {
                const isBookmarked = bookmarkedIds.includes(doc.id);
                const isLastRead = doc.id === lastReadId;
                const displayTitle = !isIndonesian && doc.titleEn ? doc.titleEn : doc.title;

                return (
                  <motion.div
                    key={doc.id}
                    id={`doc-card-${doc.id}`}
                    role="button"
                    tabIndex={0}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(idx * 0.02, 0.06)
                    }}
                    onClick={() => handleOpenDocument(doc)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOpenDocument(doc);
                      }
                    }}
                    aria-label={`Buka dokumen ${displayTitle}`}
                    className="group bg-white border border-[rgba(23,62,68,.12)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-[var(--clay)] hover:shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--clay)]/40 relative overflow-hidden"
                  >
                    {/* Left vertical spine */}
                    <div
                      className="absolute top-0 bottom-0 left-0 w-1.5"
                      style={{ backgroundColor: doc.coverColor || "var(--clay)" }}
                    />

                    {/* Main content */}
                    <div className="pl-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--clay)] bg-[rgba(178,77,57,.08)] rounded">
                          {translateCategory(doc.category, isIndonesian)}
                        </span>
                        {isLastRead && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold text-[var(--ink)] bg-[rgba(23,62,68,.08)] rounded">
                            <Clock size={10} />
                            <span>{isIndonesian ? "Terakhir Dibaca" : "Recent"}</span>
                          </span>
                        )}
                        <span className="text-[11px] text-[#66736f] truncate max-w-[200px]">
                          {doc.source}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg font-bold text-[var(--ink-deep)] leading-tight group-hover:text-[var(--clay)] transition-colors truncate">
                        {displayTitle}
                      </h3>
                      <p className="text-xs font-semibold text-[#66736f] truncate mt-0.5">
                        {!isIndonesian && doc.author === "Tim Redaksi Saku Hukum ULM" ? "Saku Hukum ULM Editorial Team" : doc.author}
                      </p>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="pl-2 sm:pl-0 flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[rgba(23,62,68,.08)]">
                      <div className="flex items-center gap-3 text-xs text-[#66736f]">
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <FileText size={13} className="text-[var(--clay)]" />
                          <span>{doc.chapterCount} {isIndonesian ? "Bab" : "Ch."}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold">
                          <Clock size={13} className="text-[#66736f]" />
                          <span>~{doc.estReadingTimeMinutes} {isIndonesian ? "mnt" : "min"}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(doc.id, e)}
                          className={`p-2 rounded-lg transition-colors ${
                            isBookmarked
                              ? "text-[var(--clay)] bg-[rgba(178,77,57,.1)]"
                              : "text-[#66736f]/60 hover:text-[var(--clay)] hover:bg-[rgba(178,77,57,.08)]"
                          }`}
                          title={isBookmarked ? "Hapus tersimpan" : "Simpan dokumen"}
                          aria-label="Bookmark"
                        >
                          <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                        </button>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--ink-deep)] text-white rounded-lg text-xs font-bold group-hover:bg-[var(--clay)] transition-colors shadow-xs">
                          <span>{isIndonesian ? "Baca" : "Read"}</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* Smart Pagination Controls */}
        {/* ------------------------------------------------------------------- */}
        {totalPages > 1 && (
          <div className="mt-14 pt-6 border-t border-[rgba(23,62,68,.1)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-semibold text-[#66736f]">
              {isIndonesian ? "Halaman" : "Page"}{" "}
              <span className="text-[var(--ink-deep)] font-bold">{safePage}</span>{" "}
              {isIndonesian ? "dari" : "of"}{" "}
              <span className="text-[var(--ink-deep)] font-bold">{totalPages}</span>
            </div>

            <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Pagination">
              {/* First Page */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={safePage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(23,62,68,.14)] bg-white text-[var(--ink-deep)] hover:bg-[var(--ink-deep)] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title={isIndonesian ? "Halaman Pertama" : "First Page"}
                aria-label="First page"
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Prev Page */}
              <button
                type="button"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(23,62,68,.14)] bg-white text-[var(--ink-deep)] hover:bg-[var(--ink-deep)] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title={isIndonesian ? "Halaman Sebelumnya" : "Previous Page"}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1 mx-1">
                {getPageNumbers(safePage, totalPages).map((p, pIdx) => {
                  if (typeof p === "string") {
                    return (
                      <span key={`ellipsis-${pIdx}`} className="px-2 text-xs text-[#66736f] select-none">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = p === safePage;
                  return (
                    <button
                      key={`page-${p}`}
                      type="button"
                      onClick={() => handlePageChange(p)}
                      aria-current={isCurrent ? "page" : undefined}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[var(--ink-deep)] text-white shadow-xs"
                          : "bg-white border border-[rgba(23,62,68,.14)] text-[var(--ink-deep)] hover:border-[var(--clay)] hover:text-[var(--clay)]"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                type="button"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(23,62,68,.14)] bg-white text-[var(--ink-deep)] hover:bg-[var(--ink-deep)] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title={isIndonesian ? "Halaman Berikutnya" : "Next Page"}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>

              {/* Last Page */}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={safePage === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-[rgba(23,62,68,.14)] bg-white text-[var(--ink-deep)] hover:bg-[var(--ink-deep)] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                title={isIndonesian ? "Halaman Terakhir" : "Last Page"}
                aria-label="Last page"
              >
                <ChevronsRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* BookReader Modal */}
      {/* ------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeDocument && (
          <BookReader
            book={activeDocument}
            onClose={() => setActiveDocument(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
