"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  Check,
  Copy,
  ExternalLink,
  Search,
  X,
  FileCheck2,
  Calendar,
  GraduationCap,
  Briefcase,
  Scale,
  Building2,
  Sparkles,
  Layers,
  LayoutGrid,
  List,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  HardDrive,
  FileSpreadsheet,
  FileDown,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { directDownloads } from "@/lib/site-data";
import { SourceLink } from "@/components/SourceLink";

type ViewMode = "grid" | "table";
type FormatFilter = "all" | "PDF" | "DOCX";
type SortOption = "featured" | "name" | "size";

export default function DokumenPage() {
  const { isIndonesian } = useLanguage();

  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFormat, setSelectedFormat] = useState<FormatFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Interaction feedback states
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Flattened and enriched document items
  const allDocuments = useMemo(() => {
    return directDownloads.flatMap((cat, catIdx) =>
      cat.items.map((item, itemIdx) => ({
        ...item,
        categoryId: cat.categoryId,
        categoryEn: cat.categoryEn,
        catIndex: catIdx + 1,
        itemIndex: itemIdx + 1,
        globalIndex: `${String(catIdx + 1).padStart(2, "0")}.${String(itemIdx + 1).padStart(2, "0")}`
      }))
    );
  }, []);

  // Filtered and sorted documents
  const filteredDocuments = useMemo(() => {
    let result = allDocuments.filter((doc) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (doc.categoryId !== selectedCategory && doc.categoryEn !== selectedCategory) {
          return false;
        }
      }

      // Format filter
      if (selectedFormat !== "all") {
        if (doc.type.toUpperCase() !== selectedFormat) {
          return false;
        }
      }

      // Search query
      if (deferredSearch.trim() !== "") {
        const q = deferredSearch.toLowerCase();
        const matchTitle = doc.id.toLowerCase().includes(q) || doc.en.toLowerCase().includes(q);
        const matchDesc =
          (doc.descriptionId && doc.descriptionId.toLowerCase().includes(q)) ||
          (doc.descriptionEn && doc.descriptionEn.toLowerCase().includes(q));
        const matchInst = doc.institution && doc.institution.toLowerCase().includes(q);
        const matchCat = doc.categoryId.toLowerCase().includes(q) || doc.categoryEn.toLowerCase().includes(q);
        const matchType = doc.type.toLowerCase().includes(q);

        if (!matchTitle && !matchDesc && !matchInst && !matchCat && !matchType) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === "name") {
        const nameA = isIndonesian ? a.id : a.en;
        const nameB = isIndonesian ? b.id : b.en;
        return nameA.localeCompare(nameB, "id");
      }
      if (sortBy === "size") {
        // Parse size string e.g. "2.4 MB" or "45 KB" to KB
        const toKB = (sz: string) => {
          const parts = sz.split(" ");
          const val = parseFloat(parts[0]) || 0;
          if (parts[1]?.toUpperCase() === "MB") return val * 1024;
          return val;
        };
        return toKB(b.size) - toKB(a.size);
      }
      return 0;
    });

    return result;
  }, [allDocuments, selectedCategory, selectedFormat, deferredSearch, sortBy, isIndonesian]);

  // Statistics
  const totalDocs = allDocuments.length;
  const pdfDocsCount = allDocuments.filter((d) => d.type === "PDF").length;
  const docxDocsCount = allDocuments.filter((d) => d.type === "DOCX").length;

  // Handlers
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    setDownloadingId(url);
    setTimeout(() => {
      setDownloadingId((cur) => (cur === url ? null : cur));
    }, 2200);
  };

  const handleCopyLink = async (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => {
          setCopiedUrl((cur) => (cur === url ? null : cur));
        }, 2200);
      }
    } catch (err) {
      console.error("Clipboard write failed", err);
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedFormat("all");
    setSortBy("featured");
  };

  return (
    <main className="content-width" style={{ paddingBottom: "80px" }}>
      {/* 1. Page Header & Intro following River Margin standard */}
      <section className="page-intro">
        <div className="breadcrumb">
          <Link href="/">{isIndonesian ? "Beranda" : "Home"}</Link>
          <ChevronRight size={13} style={{ color: "var(--muted)" }} />
          <span>{isIndonesian ? "Unduhan & Dokumen" : "Downloads & Docs"}</span>
        </div>

        <div className="page-intro-grid">
          <div>
            <p className="eyebrow">{isIndonesian ? "Arsip & Repositori Berkas" : "Archive & Document Repository"}</p>
            <h1>
              {isIndonesian ? (
                <>
                  Unduhan & <em>Dokumen Akademik</em>
                </>
              ) : (
                <>
                  Official Downloads & <em>Document Archive</em>
                </>
              )}
            </h1>
            <p className="intro-summary">
              {isIndonesian
                ? "Akses langsung ke salinan pedoman kurikulum, kalender akademik resmi, format baku skripsi, formulir kemahiran hukum, dan persyaratan seleksi jaksa. Seluruh berkas ditautkan langsung ke peladen institusi tanpa pengalihan."
                : "Direct access to official curriculum guidebooks, academic calendars, standardized thesis formats, moot court templates, and prosecutorial recruitment requirements. All files link directly to verified institutional servers."}
            </p>
          </div>

          <aside className="page-status" style={{ minWidth: "210px" }}>
            <span className="status-dot" />
            <span>
              {isIndonesian ? "Diverifikasi & Siap Diunduh" : "Verified & Ready to Download"}
              <br />
              <strong style={{ color: "var(--ink-deep)" }}>
                {totalDocs} {isIndonesian ? "Berkas Resmi" : "Official Files"}
              </strong>
              <br />
              <small style={{ color: "var(--clay)", fontWeight: 700 }}>
                {pdfDocsCount} PDF · {docxDocsCount} DOCX
              </small>
            </span>
          </aside>
        </div>

        <div className="river-rule" />
      </section>

      {/* 2. Dossier Quick Statistics Bar */}
      <section className="doc-stats-grid" aria-label={isIndonesian ? "Ringkasan Dokumen" : "Document Summary"}>
        <div className="doc-stat-item">
          <strong>{totalDocs}</strong>
          <span>{isIndonesian ? "Berkas Resmi Tersedia" : "Official Files Available"}</span>
        </div>
        <div className="doc-stat-item">
          <strong style={{ color: "var(--clay)" }}>100%</strong>
          <span>{isIndonesian ? "Tautan Langsung (Tanpa Iklan)" : "Direct Links (Zero Adwalls)"}</span>
        </div>
        <div className="doc-stat-item">
          <strong>{directDownloads.length}</strong>
          <span>{isIndonesian ? "Kategori Tahap Studi" : "Study Phase Categories"}</span>
        </div>
        <div className="doc-stat-item">
          <strong style={{ color: "var(--reed)" }}>2026/27</strong>
          <span>{isIndonesian ? "Sinkronisasi SK & Kurikulum" : "Decree & Curriculum Sync"}</span>
        </div>
      </section>

      {/* 3. Interactive Filter & Search Desk */}
      <section
        style={{
          marginTop: "48px",
          background: "var(--card)",
          border: "1px solid var(--line)",
          padding: "24px 28px",
          boxShadow: "0 6px 20px rgba(30,48,43,0.03)"
        }}
      >
        {/* Search Input Bar */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center", position: "relative" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--clay)",
                pointerEvents: "none"
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isIndonesian
                  ? "Cari dokumen (misal: 'Kurikulum', 'Skripsi', 'Jaksa', 'Kalender', 'SOP')..."
                  : "Search documents (e.g., 'Curriculum', 'Thesis', 'Prosecutor', 'Calendar')..."
              }
              style={{
                width: "100%",
                padding: "13px 44px 13px 46px",
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "var(--sans)",
                color: "var(--ink-deep)",
                outline: "none",
                transition: "border-color 160ms ease, box-shadow 160ms ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--clay)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(178,77,57,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--line)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--muted)",
                  padding: "4px",
                  display: "flex"
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <ArrowUpDown size={15} style={{ color: "var(--muted)" }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "12px",
                fontFamily: "var(--sans)",
                fontWeight: 700,
                color: "var(--ink-deep)",
                cursor: "pointer",
                outline: "none"
              }}
            >
              <option value="featured">{isIndonesian ? "Rekomendasi / Utama" : "Recommended"}</option>
              <option value="name">{isIndonesian ? "Nama Dokumen (A-Z)" : "Document Name (A-Z)"}</option>
              <option value="size">{isIndonesian ? "Ukuran Berkas (Terbesar)" : "File Size (Largest)"}</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: "var(--paper)",
              padding: "3px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              flexShrink: 0
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid View"
              style={{
                padding: "8px 12px",
                background: viewMode === "grid" ? "var(--card)" : "transparent",
                color: viewMode === "grid" ? "var(--clay)" : "var(--muted)",
                border: "none",
                borderRadius: "6px",
                boxShadow: viewMode === "grid" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                fontWeight: 700
              }}
            >
              <LayoutGrid size={15} />
              <span className="hidden sm:inline">{isIndonesian ? "Kartu" : "Grid"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              aria-label="Table View"
              style={{
                padding: "8px 12px",
                background: viewMode === "table" ? "var(--card)" : "transparent",
                color: viewMode === "table" ? "var(--clay)" : "var(--muted)",
                border: "none",
                borderRadius: "6px",
                boxShadow: viewMode === "table" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                fontWeight: 700
              }}
            >
              <List size={15} />
              <span className="hidden sm:inline">{isIndonesian ? "Tabel" : "Table"}</span>
            </button>
          </div>
        </div>

        {/* Filter Chips Bar (Categories & Formats) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "18px",
            alignItems: "center",
            paddingTop: "16px",
            borderTop: "1px solid var(--line)"
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--muted)", marginRight: "4px" }}>
            {isIndonesian ? "KATEGORI:" : "CATEGORY:"}
          </span>

          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            style={{
              padding: "6px 13px",
              fontSize: "11px",
              fontWeight: 800,
              borderRadius: "20px",
              cursor: "pointer",
              transition: "all 150ms ease",
              border: selectedCategory === "all" ? "1px solid var(--clay)" : "1px solid var(--line)",
              background: selectedCategory === "all" ? "var(--clay)" : "transparent",
              color: selectedCategory === "all" ? "#ffffff" : "var(--ink-deep)"
            }}
          >
            {isIndonesian ? "Semua Berkas" : "All Documents"} ({totalDocs})
          </button>

          {directDownloads.map((cat, idx) => {
            const isSelected = selectedCategory === cat.categoryId || selectedCategory === cat.categoryEn;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(cat.categoryId)}
                style={{
                  padding: "6px 13px",
                  fontSize: "11px",
                  fontWeight: 800,
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  border: isSelected ? "1px solid var(--clay)" : "1px solid var(--line)",
                  background: isSelected ? "var(--clay)" : "transparent",
                  color: isSelected ? "#ffffff" : "var(--ink-deep)"
                }}
              >
                {isIndonesian ? cat.categoryId : cat.categoryEn} ({cat.items.length})
              </button>
            );
          })}

          <div style={{ marginLeft: "auto", display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--muted)", marginRight: "4px" }}>
              {isIndonesian ? "FORMAT:" : "FORMAT:"}
            </span>
            {(["all", "PDF", "DOCX"] as const).map((fmt) => {
              const isFmtSelected = selectedFormat === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  style={{
                    padding: "4px 10px",
                    fontSize: "10px",
                    fontWeight: 800,
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: isFmtSelected ? "1px solid var(--ink-deep)" : "1px solid var(--line)",
                    background: isFmtSelected ? "var(--ink-deep)" : "transparent",
                    color: isFmtSelected ? "var(--paper)" : "var(--muted)"
                  }}
                >
                  {fmt === "all" ? (isIndonesian ? "Semua" : "All") : fmt}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Active Filter Indicator / Results Count */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "28px",
          marginBottom: "16px"
        }}
      >
        <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>
          {isIndonesian ? "Menampilkan" : "Showing"}{" "}
          <strong style={{ color: "var(--ink-deep)" }}>{filteredDocuments.length}</strong>{" "}
          {isIndonesian ? "dari" : "of"} {totalDocs} {isIndonesian ? "dokumen resmi" : "official documents"}
          {searchQuery && (
            <span>
              {" "}
              {isIndonesian ? "untuk kata kunci" : "for keyword"}{" "}
              <em style={{ color: "var(--clay)", fontStyle: "normal", fontWeight: 800 }}>"{searchQuery}"</em>
            </span>
          )}
        </p>

        {(searchQuery || selectedCategory !== "all" || selectedFormat !== "all") && (
          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--clay)",
              fontSize: "11px",
              fontWeight: 800,
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0
            }}
          >
            {isIndonesian ? "Reset Semua Filter" : "Reset All Filters"}
          </button>
        )}
      </div>

      {/* 5. Documents Display (Grid or Table View) */}
      {filteredDocuments.length === 0 ? (
        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--line)",
            padding: "54px 32px",
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          <FileText size={48} style={{ color: "var(--muted)", margin: "0 auto 16px", opacity: 0.5 }} />
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "24px", margin: "0 0 8px", color: "var(--ink-deep)" }}>
            {isIndonesian ? "Tidak Ada Dokumen yang Cocok" : "No Matching Documents Found"}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--muted)", maxWidth: "460px", margin: "0 auto 20px" }}>
            {isIndonesian
              ? "Coba ubah kata kunci pencarian Anda atau pilih kategori lain untuk menemukan berkas yang diinginkan."
              : "Try adjusting your search terms or selecting another category to locate the desired file."}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="primary-link"
            style={{ padding: "10px 20px", fontSize: "12px" }}
          >
            {isIndonesian ? "Tampilkan Semua Berkas" : "Show All Documents"}
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW: Case-file Cards */
        <div className="doc-grid" style={{ marginTop: "14px" }}>
          {filteredDocuments.map((doc, idx) => {
            const isDownloading = downloadingId === doc.url;
            const isCopied = copiedUrl === doc.url;

            return (
              <article key={idx} className="doc-card">
                {/* Header row: Index badge, Format tag, Size, and Institution */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginBottom: "14px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "var(--clay)",
                        fontFamily: "var(--sans)"
                      }}
                    >
                      {doc.globalIndex}
                    </span>

                    {doc.type === "PDF" ? (
                      <span
                        style={{
                          background: "rgba(178,77,57,0.12)",
                          color: "var(--clay)",
                          border: "1px solid rgba(178,77,57,0.3)",
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "2px 7px",
                          borderRadius: "4px",
                          letterSpacing: "0.06em"
                        }}
                      >
                        PDF
                      </span>
                    ) : (
                      <span
                        style={{
                          background: "rgba(23,62,68,0.1)",
                          color: "var(--ink-deep)",
                          border: "1px solid rgba(23,62,68,0.25)",
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "2px 7px",
                          borderRadius: "4px",
                          letterSpacing: "0.06em"
                        }}
                      >
                        DOCX
                      </span>
                    )}

                    {doc.featured && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          background: "#e8eee6",
                          color: "var(--reed)",
                          fontSize: "9.5px",
                          fontWeight: 800,
                          padding: "2px 6px",
                          borderRadius: "4px"
                        }}
                      >
                        <Sparkles size={11} />
                        {isIndonesian ? "Utama" : "Essential"}
                      </span>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <HardDrive size={12} style={{ color: "var(--reed)" }} />
                    {doc.size}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    margin: "0 0 10px",
                    color: "var(--ink-deep)",
                    letterSpacing: "-0.03em"
                  }}
                >
                  {isIndonesian ? doc.id : doc.en}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: "12.5px",
                    lineHeight: "1.58",
                    color: "#4a5d58",
                    margin: "0 0 16px",
                    flex: "1 0 auto"
                  }}
                >
                  {isIndonesian ? doc.descriptionId : doc.descriptionEn}
                </p>

                {/* Metadata Docket Strip */}
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(247,242,233,0.7)",
                    borderRadius: "6px",
                    borderLeft: "2px solid var(--clay)",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10.5px", color: "var(--muted)" }}>
                      {isIndonesian ? "Penerbit / Sumber:" : "Publisher / Source:"}
                    </span>
                    <strong style={{ fontSize: "11px", color: "var(--ink-deep)" }}>
                      {doc.institution || "Fakultas Hukum ULM"}
                    </strong>
                  </div>

                  {doc.edition && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "10.5px", color: "var(--muted)" }}>
                        {isIndonesian ? "Edisi / Dasar:" : "Edition / Basis:"}
                      </span>
                      <span style={{ fontSize: "10.5px", fontWeight: 700, color: "var(--clay)" }}>
                        {doc.edition}
                      </span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10.5px", color: "var(--muted)" }}>
                      {isIndonesian ? "Status:" : "Status:"}
                    </span>
                    <span
                      style={{
                        fontSize: "10.5px",
                        fontWeight: 700,
                        color: "var(--reed)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <CheckCircle2 size={12} />
                      {isIndonesian ? "Tautan Langsung Resmi" : "Official Direct Link"}
                    </span>
                  </div>
                </div>

                {/* ACTION ROW: Full, uncropped download button + copy + source preview */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--line)"
                  }}
                >
                  {/* Primary Direct Download Button - Guaranteed NEVER Cropped */}
                  <a
                    href={doc.url}
                    download={isIndonesian ? doc.id : doc.en}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-download-btn"
                    onClick={(e) => handleDownload(e, doc.url)}
                    title={
                      isIndonesian
                        ? `Unduh langsung berkas resmi ${doc.id}`
                        : `Direct download official file ${doc.en}`
                    }
                  >
                    {isDownloading ? (
                      <>
                        <Check size={16} strokeWidth={2.4} style={{ color: "#86efac" }} />
                        <span>{isIndonesian ? "Membuka Berkas..." : "Opening File..."}</span>
                      </>
                    ) : (
                      <>
                        <Download size={15} strokeWidth={2.2} />
                        <span>{isIndonesian ? "Unduh Berkas" : "Download File"}</span>
                        <span style={{ opacity: 0.75, fontSize: "11px", fontWeight: 600 }}>({doc.size})</span>
                      </>
                    )}
                  </a>

                  {/* Secondary Actions: Copy Link & Open in Tab */}
                  <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <button
                      type="button"
                      className="doc-secondary-btn"
                      onClick={(e) => handleCopyLink(e, doc.url)}
                      title={isIndonesian ? "Salin tautan unduhan langsung" : "Copy direct download link"}
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} style={{ color: "var(--reed)" }} />
                          <span style={{ color: "var(--reed)" }}>{isIndonesian ? "Tersalin!" : "Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span className="hidden sm:inline">{isIndonesian ? "Salin" : "Copy"}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="doc-secondary-btn"
                      title={isIndonesian ? "Buka pada tab baru" : "Open in new tab"}
                      style={{ padding: "10px 12px" }}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* TABLE / LEDGER VIEW: Clean Editorial Archive Table */
        <div className="doc-table-wrap" style={{ marginTop: "14px" }}>
          <table className="doc-table">
            <thead>
              <tr>
                <th style={{ width: "90px" }}>{isIndonesian ? "Kode & Tipe" : "Code & Type"}</th>
                <th>{isIndonesian ? "Nama Dokumen & Keterangan" : "Document Name & Details"}</th>
                <th style={{ width: "200px" }}>{isIndonesian ? "Kategori & Lembaga" : "Category & Source"}</th>
                <th style={{ width: "100px" }}>{isIndonesian ? "Ukuran" : "Size"}</th>
                <th style={{ width: "220px", textAlign: "right" }}>{isIndonesian ? "Aksi Unduh" : "Actions"}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc, idx) => {
                const isDownloading = downloadingId === doc.url;
                const isCopied = copiedUrl === doc.url;

                return (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--clay)" }}>
                          {doc.globalIndex}
                        </span>
                        {doc.type === "PDF" ? (
                          <span
                            style={{
                              background: "rgba(178,77,57,0.1)",
                              color: "var(--clay)",
                              border: "1px solid rgba(178,77,57,0.25)",
                              fontSize: "10px",
                              fontWeight: 800,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              width: "fit-content"
                            }}
                          >
                            PDF
                          </span>
                        ) : (
                          <span
                            style={{
                              background: "rgba(23,62,68,0.1)",
                              color: "var(--ink-deep)",
                              border: "1px solid rgba(23,62,68,0.2)",
                              fontSize: "10px",
                              fontWeight: 800,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              width: "fit-content"
                            }}
                          >
                            DOCX
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div>
                        <strong
                          style={{
                            fontFamily: "var(--serif)",
                            fontSize: "16px",
                            color: "var(--ink-deep)",
                            display: "block",
                            marginBottom: "3px"
                          }}
                        >
                          {isIndonesian ? doc.id : doc.en}
                        </strong>
                        <p style={{ margin: 0, fontSize: "11.5px", color: "var(--muted)", lineHeight: 1.45 }}>
                          {isIndonesian ? doc.descriptionId : doc.descriptionEn}
                        </p>
                        {doc.edition && (
                          <span style={{ fontSize: "10px", color: "var(--clay)", fontWeight: 700, display: "block", marginTop: "2px" }}>
                            {doc.edition}
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <div>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-deep)", display: "block" }}>
                          {isIndonesian ? doc.categoryId : doc.categoryEn}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--muted)" }}>
                          {doc.institution || "Fakultas Hukum ULM"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--ink-deep)" }}>
                        {doc.size}
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px", alignItems: "center", justifyContent: "flex-end" }}>
                        <a
                          href={doc.url}
                          download={isIndonesian ? doc.id : doc.en}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="doc-download-btn"
                          onClick={(e) => handleDownload(e, doc.url)}
                          style={{ padding: "8px 14px", fontSize: "11px" }}
                          title={isIndonesian ? "Unduh langsung" : "Direct download"}
                        >
                          {isDownloading ? (
                            <>
                              <Check size={14} style={{ color: "#86efac" }} />
                              <span>{isIndonesian ? "Membuka..." : "Opening..."}</span>
                            </>
                          ) : (
                            <>
                              <Download size={14} />
                              <span>{isIndonesian ? "Unduh" : "Download"}</span>
                            </>
                          )}
                        </a>

                        <button
                          type="button"
                          className="doc-secondary-btn"
                          onClick={(e) => handleCopyLink(e, doc.url)}
                          style={{ padding: "8px 10px" }}
                          title={isIndonesian ? "Salin tautan" : "Copy link"}
                        >
                          {isCopied ? <Check size={13} style={{ color: "var(--reed)" }} /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Document Submission & Integrity Boundary Note */}
      <section className="source-boundary" style={{ marginTop: "64px" }}>
        <ShieldCheck size={52} strokeWidth={1.2} style={{ color: "#f3ceac" }} />
        <div>
          <p className="eyebrow">{isIndonesian ? "Catatan Integritas Berkas" : "Document Integrity Note"}</p>
          <h2>
            {isIndonesian
              ? "Arsip primer resmi, ditautkan langsung untuk efisiensi studi."
              : "Official primary archive, directly linked for study efficiency."}
          </h2>
          <p>
            {isIndonesian
              ? "Semua tautan berkas di atas mengarah langsung ke server resmi Universitas Lambung Mangkurat (fh.ulm.ac.id, akademik.ulm.ac.id), Kejaksaan RI (kejaksaan.go.id), atau Mahkamah Agung RI. Saku Hukum ULM mengorganisir indeks ini agar mahasiswa tidak perlu menghabiskan waktu menembus birokrasi halaman berulang."
              : "All document links above point directly to official servers of Universitas Lambung Mangkurat (fh.ulm.ac.id, akademik.ulm.ac.id), Kejaksaan RI (kejaksaan.go.id), or Mahkamah Agung RI. Saku Hukum ULM curates this index so students bypass repetitive website navigations."}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "24px",
              alignItems: "center"
            }}
          >
            <SourceLink href="https://fh.ulm.ac.id" label={isIndonesian ? "Portal Utama FH ULM" : "Main FH ULM Website"} />
            <SourceLink
              href="https://akademik.ulm.ac.id"
              label={isIndonesian ? "Portal Akademik ULM" : "ULM Academic Portal"}
            />
            <SourceLink
              href="https://rekrutmen.kejaksaan.go.id"
              label={isIndonesian ? "Kanal Seleksi Kejaksaan RI" : "Kejaksaan RI Recruitment"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
