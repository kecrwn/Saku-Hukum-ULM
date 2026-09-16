"use client";
import { FileText, Download, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { directDownloads } from "@/lib/site-data";
import { SourceLink } from "@/components/SourceLink";

export default function DokumenPage() {
  const { isIndonesian } = useLanguage();

  return (
    <main className="content-width">
      <div className="page-intro">
        <div className="breadcrumb">
          <a href="/">{isIndonesian ? "Beranda" : "Home"}</a>
          <span>/</span>
          <span>{isIndonesian ? "Unduhan & Dokumen" : "Downloads & Docs"}</span>
        </div>
        
        <div className="page-intro-grid">
          <div>
            <h1>{isIndonesian ? "Unduhan & Dokumen" : "Downloads & Docs"}</h1>
            <p className="intro-summary">
              {isIndonesian 
                ? "Akses langsung ke salinan pedoman, kalender, dan formulir. Tidak perlu melewati halaman pengantar—berkas PDF atau DOCX akan langsung diunduh." 
                : "Direct access to guidebooks, calendars, and forms. No intermediary pages—PDF or DOCX files download immediately."}
            </p>
          </div>
          <div className="page-status">
            <div className="status-dot" />
            <span>
              {isIndonesian ? "Dikelompokkan berdasarkan tahap studi." : "Categorized by study phase."}
              <br />
              <strong>{directDownloads.length} {isIndonesian ? "Kategori" : "Categories"}</strong>
            </span>
          </div>
        </div>
      </div>
      
      <div className="river-rule" />
      
      <div className="course-section" style={{ marginTop: '50px' }}>
        {directDownloads.map((category, idx) => (
          <div key={idx} style={{ marginBottom: '60px' }}>
            <div className="section-heading compact" style={{ marginBottom: '20px' }}>
              <p className="eyebrow">{isIndonesian ? "Kategori" : "Category"} 0{idx + 1}</p>
              <h2 style={{ fontSize: '32px' }}>{isIndonesian ? category.categoryId : category.categoryEn}</h2>
            </div>
            
            <div className="course-list">
              {category.items.map((item, itemIdx) => (
                <div className="course-row" key={itemIdx} style={{ gridTemplateColumns: '80px 1fr auto' }}>
                  <code>{item.type}</code>
                  <span>
                    <strong>{isIndonesian ? item.id : item.en}</strong>
                    <br />
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{item.size}</span>
                  </span>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="primary-link" 
                    style={{ fontSize: '11px', padding: '6px 12px' }}
                  >
                    <Download size={14} style={{ marginRight: '6px' }} />
                    {isIndonesian ? "Unduh" : "Download"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <section className="source-boundary" style={{ marginTop: '30px' }}>
        <FileText size={48} strokeWidth={1} />
        <div>
          <p className="eyebrow">{isIndonesian ? "Catatan Arsip" : "Archive Note"}</p>
          <h2>{isIndonesian ? "Berkas resmi, diarsipkan untuk efisiensi." : "Official files, archived for efficiency."}</h2>
          <p>
            {isIndonesian 
              ? "Semua tautan di atas adalah tautan langsung (direct link) ke dokumen yang dihosting oleh Universitas Lambung Mangkurat atau instansi terkait. Kami menyusun ulang indeksnya di sini untuk memangkas waktu pencarian mahasiswa." 
              : "All links above are direct links to documents hosted by Universitas Lambung Mangkurat or related institutions. We re-indexed them here to cut down search time for students."}
          </p>
          <div style={{ marginTop: '22px' }}>
            <SourceLink href="https://fh.ulm.ac.id" label={isIndonesian ? "Situs Utama FH ULM" : "Main FH ULM Website"} />
          </div>
        </div>
      </section>
    </main>
  );
}
