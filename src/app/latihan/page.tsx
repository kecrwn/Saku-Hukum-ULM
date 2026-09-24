"use client";

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, Send, AlertCircle, FileText, CheckCircle, Loader2, ChevronDown, BookOpen, Scale, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { latihanScenarios } from '@/lib/latihan-data';
import ReactMarkdown from 'react-markdown';

const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-2" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-bold" style={{ color: 'var(--ink-deep)' }} {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
  li: ({node, ...props}: any) => <li className="" {...props} />
};

const loadingMessagesId = ["Menganalisis fakta...", "Mencari referensi KUHP...", "Menyusun umpan balik...", "Memeriksa elemen hukum..."];
const loadingMessagesEn = ["Analyzing facts...", "Searching KUHP references...", "Drafting feedback...", "Checking legal elements..."];

const CHAR_LIMIT = 3000;

/* Feedback category color accents */
const categoryAccents = {
  issue:       { color: '#4ade80', label: 'green' },
  citation:    { color: '#60a5fa', label: 'blue' },
  application: { color: '#a78bfa', label: 'purple' },
  missed:      { color: '#fb923c', label: 'orange' },
};

/* Grid card stagger animation variants */
const gridContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
};

export default function LatihanPage() {
  const { isIndonesian } = useLanguage();
  const [selectedScenario, setSelectedScenario] = useState(latihanScenarios[0]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [feedback, setFeedback] = useState<any>(null);
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(false);
  
  const [provider, setProvider] = useState('Nemotron 30B');
  const providers = ['DeepSeek Flash', 'Llama 3.1 8B', 'Nemotron 30B'];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('completed_cases');
    if (stored) {
      try { setCompleted(JSON.parse(stored)); } catch(e) {}
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % 4);
      }, 2000);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    
    setOffline(!navigator.onLine);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!analysis.trim()) return;

    if (offline || !navigator.onLine) {
      setOffline(true);
      return;
    }
    setOffline(false);
    setLoading(true);
    setError('');
    setFeedback(null);

    try {
      const res = await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          analysis, 
          scenario: isIndonesian ? selectedScenario.scenario : selectedScenario.scenarioEn,
          provider 
        })
      });
      
      if (!res.ok) throw new Error('Gagal mendapatkan umpan balik. Silakan coba lagi.');
      const data = await res.json();
      setFeedback(data);
      
      if (!completed.includes(selectedScenario.id)) {
        const newCompleted = [...completed, selectedScenario.id];
        setCompleted(newCompleted);
        localStorage.setItem('completed_cases', JSON.stringify(newCompleted));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const completedCount = completed.length;
  const totalCases = latihanScenarios.length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', fontFamily: 'Manrope, sans-serif' }}>
      {/* ── Header ── */}
      <header className="px-6 py-8 md:px-12 md:py-12 max-w-[1180px] mx-auto flex items-center gap-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:bg-white/50" style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">{isIndonesian ? 'Kembali' : 'Back'}</span>
        </Link>
      </header>

      <main className="px-6 md:px-12 pb-24 max-w-[1180px] mx-auto w-full overflow-hidden">
        {/* ── Page Title ── */}
        <div className="mb-12 break-words whitespace-normal">
          <h1 className="text-4xl md:text-5xl mb-4 break-words whitespace-normal" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)' }}>
            {isIndonesian ? 'Latihan ' : 'Practice '}<em style={{ color: 'var(--clay)', fontStyle: 'italic' }}>{isIndonesian ? 'Kasus' : 'Case'}</em>
          </h1>
          <p className="text-lg max-w-2xl break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
            {isIndonesian 
              ? "Uji pemahaman Anda tentang tindak pidana dengan menganalisis studi kasus nyata. AI kami akan meninjau jawaban Anda berdasarkan KUHP Baru (UU 1/2023)." 
              : "Test your understanding of criminal acts by analyzing real case studies. Our AI will review your answers based on the New KUHP (Law 1/2023)."}
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            1. CASE SELECTION GRID
        ═══════════════════════════════════════════ */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-2xl font-serif break-words whitespace-normal" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)' }}>
              {isIndonesian ? "Pilih Skenario Kasus" : "Select Case Scenario"}
            </h2>
            {/* Progress counter */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(113,130,110,0.12), rgba(178,77,57,0.08))',
                border: '1px solid var(--line)',
              }}
            >
              <div className="relative flex items-center justify-center" style={{ width: 22, height: 22 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="11" cy="11" r="9" fill="none" stroke="var(--line)" strokeWidth="2.5" />
                  <circle
                    cx="11" cy="11" r="9" fill="none"
                    stroke="var(--reed)" strokeWidth="2.5"
                    strokeDasharray={`${(completedCount / totalCases) * 56.55} 56.55`}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                </svg>
              </div>
              <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--ink-deep)' }}>
                {completedCount}/{totalCases} {isIndonesian ? 'selesai' : 'completed'}
              </span>
            </div>
          </div>

          {/* Staggered grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            variants={gridContainer}
            initial="hidden"
            animate="show"
          >
            {latihanScenarios.map((scenario, index) => {
              const isCompleted = completed.includes(scenario.id);
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <motion.div key={scenario.id} variants={gridItem}>
                  <button
                    onClick={() => { setSelectedScenario(scenario); setAnalysis(''); setFeedback(null); }}
                    className="w-full p-4 rounded-2xl text-left relative flex flex-col gap-2"
                    style={{
                      background: isSelected ? 'var(--ink-deep)' : 'var(--card)',
                      border: `1px solid ${isSelected ? 'var(--ink-deep)' : 'var(--line)'}`,
                      color: isSelected ? 'var(--card)' : 'var(--ink)',
                      boxShadow: isSelected ? 'var(--shadow)' : '0 2px 8px rgba(30,48,43,0.03)',
                      transition: 'transform 220ms cubic-bezier(.23,1,.32,1), box-shadow 220ms ease, border-color 220ms ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.02)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(30,48,43,0.10)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,62,68,0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(30,48,43,0.03)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                      }
                    }}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-xs font-bold tracking-wider" style={{ color: isSelected ? 'rgba(255,253,250,0.6)' : 'var(--clay)' }}>
                        {isIndonesian ? "KASUS" : "CASE"} {index + 1}
                      </span>
                      {isCompleted && (
                        <CheckCircle size={16} style={{ color: isSelected ? 'rgba(255,253,250,0.8)' : 'var(--reed)' }} />
                      )}
                    </div>
                    <span className="text-sm font-medium leading-snug line-clamp-2">
                      {isIndonesian ? scenario.title : scenario.titleEn}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            MAIN TWO-COLUMN LAYOUT
        ═══════════════════════════════════════════ */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">

          {/* ── LEFT COLUMN: Scenario + Form ── */}
          <section className="w-full overflow-hidden">

            {/* ═══════════════════════════════════════
                2. SCENARIO CARD — Premium with gradient + accent bar
            ═══════════════════════════════════════ */}
            <motion.div
              key={selectedScenario.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-2xl mb-8 break-words whitespace-normal overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,253,250,0.9) 0%, rgba(239,229,214,0.5) 100%)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: 'var(--shadow)',
              }}
            >
              {/* Accent bar on the left */}
              <div className="flex">
                <div
                  className="shrink-0"
                  style={{
                    width: 5,
                    background: 'linear-gradient(180deg, var(--clay) 0%, var(--reed) 100%)',
                    borderRadius: '4px 0 0 4px',
                  }}
                />
                <div className="p-6 md:p-8 flex-1 min-w-0">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-extrabold tracking-[0.14em] uppercase"
                      style={{ color: 'var(--clay)' }}
                    >
                      {isIndonesian ? 'SKENARIO AKTIF' : 'ACTIVE SCENARIO'}
                    </span>
                  </div>
                  {/* Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="shrink-0 mt-1 flex items-center justify-center rounded-lg"
                      style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, rgba(178,77,57,0.1), rgba(113,130,110,0.1))',
                        border: '1px solid var(--line)',
                      }}
                    >
                      <FileText size={18} style={{ color: 'var(--reed)' }} />
                    </div>
                    <h2 className="text-xl font-bold break-words whitespace-normal leading-tight" style={{ color: 'var(--ink-deep)', fontFamily: 'DM Serif Display, serif' }}>
                      {isIndonesian ? selectedScenario.title : selectedScenario.titleEn}
                    </h2>
                  </div>
                  {/* Scenario body */}
                  <p className="leading-relaxed mb-0 break-words whitespace-normal text-[14.5px]" style={{ color: 'var(--muted)' }}>
                    {isIndonesian ? selectedScenario.scenario : selectedScenario.scenarioEn}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════
                3. FORM SECTION — Premium dropdown + char counter
            ═══════════════════════════════════════ */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

              {/* AI Model Selector — Custom premium dropdown */}
              <div className="flex flex-col gap-2">
                <label className="font-extrabold break-words whitespace-normal text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--clay)' }}>
                  {isIndonesian ? "Pilih AI Model" : "Select AI Model"}
                </label>
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => !loading && setDropdownOpen(o => !o)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl outline-none text-left"
                    style={{
                      background: 'var(--card)',
                      border: `1px solid ${dropdownOpen ? 'var(--clay)' : 'var(--line)'}`,
                      color: 'var(--ink)',
                      boxShadow: dropdownOpen ? '0 0 0 3px rgba(178,77,57,0.08)' : 'none',
                      transition: 'border-color 180ms ease, box-shadow 180ms ease',
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                    disabled={loading}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Sparkles size={15} style={{ color: 'var(--reed)', flexShrink: 0 }} />
                      <span className="text-sm font-semibold truncate">{provider}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      style={{
                        color: 'var(--muted)',
                        flexShrink: 0,
                        transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 200ms ease',
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute z-30 left-0 right-0 mt-2 rounded-xl overflow-hidden"
                        style={{
                          background: 'var(--card)',
                          border: '1px solid var(--line)',
                          boxShadow: '0 16px 40px rgba(30,48,43,0.13)',
                          transformOrigin: 'top',
                        }}
                      >
                        {providers.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => { setProvider(p); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-left"
                            style={{
                              color: p === provider ? 'var(--clay)' : 'var(--ink)',
                              fontWeight: p === provider ? 700 : 500,
                              background: p === provider ? 'rgba(178,77,57,0.05)' : 'transparent',
                              transition: 'background 120ms ease',
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--line)',
                            }}
                            onMouseEnter={(e) => {
                              if (p !== provider) (e.currentTarget as HTMLElement).style.background = 'rgba(23,62,68,0.04)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.background = p === provider ? 'rgba(178,77,57,0.05)' : 'transparent';
                            }}
                          >
                            <Sparkles size={13} style={{ color: p === provider ? 'var(--clay)' : 'var(--muted)', flexShrink: 0 }} />
                            {p}
                            {p === provider && <CheckCircle size={14} className="ml-auto" style={{ color: 'var(--clay)' }} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Textarea + char counter */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="analysis" className="font-semibold break-words whitespace-normal text-sm" style={{ color: 'var(--ink-deep)' }}>
                  {isIndonesian ? "Analisis Anda" : "Your Analysis"}
                </label>
                <textarea
                  id="analysis"
                  value={analysis}
                  onChange={(e) => setAnalysis(e.target.value.slice(0, CHAR_LIMIT))}
                  placeholder={isIndonesian ? "Identifikasi pasal yang relevan dan analisis unsur-unsurnya..." : "Identify relevant articles and analyze their elements..."}
                  className="w-full min-h-[200px] p-5 rounded-2xl outline-none resize-y"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    color: 'var(--ink)',
                    transition: 'border-color 180ms ease, box-shadow 180ms ease',
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--clay)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px rgba(178,77,57,0.08)';
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                  disabled={loading}
                />
                <div className="flex justify-end px-1">
                  <span
                    className="text-[11px] font-medium tabular-nums"
                    style={{ color: analysis.length > CHAR_LIMIT * 0.9 ? 'var(--clay)' : 'var(--muted)' }}
                  >
                    {analysis.length.toLocaleString()}/{CHAR_LIMIT.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Offline / Error alerts */}
              {offline && (
                <div
                  className="p-4 rounded-xl flex items-start gap-3 break-words whitespace-normal"
                  style={{
                    background: 'rgba(178,77,57,0.06)',
                    border: '1px solid rgba(178,77,57,0.15)',
                    color: 'var(--clay)',
                  }}
                >
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm break-words whitespace-normal">{isIndonesian ? "Anda sedang offline. Koneksi internet diperlukan untuk mendapatkan umpan balik AI." : "You are offline. An internet connection is required to get AI feedback."}</p>
                </div>
              )}

              {error && (
                <div
                  className="p-4 rounded-xl flex items-start gap-3 break-words whitespace-normal"
                  style={{
                    background: 'rgba(178,77,57,0.06)',
                    border: '1px solid rgba(178,77,57,0.15)',
                    color: 'var(--clay)',
                  }}
                >
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm break-words whitespace-normal">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading || !analysis.trim()}
                className="px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2.5 break-words whitespace-normal"
                style={{
                  background: loading || !analysis.trim()
                    ? 'var(--muted)'
                    : 'linear-gradient(135deg, var(--ink-deep) 0%, #1a4a52 100%)',
                  color: 'var(--card)',
                  boxShadow: loading || !analysis.trim() ? 'none' : '0 8px 24px rgba(16,45,51,0.18)',
                  transition: 'transform 180ms cubic-bezier(.23,1,.32,1), box-shadow 180ms ease, opacity 180ms ease',
                  opacity: loading || !analysis.trim() ? 0.6 : 1,
                  cursor: loading || !analysis.trim() ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (!loading && analysis.trim()) {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(16,45,51,0.24)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = loading || !analysis.trim() ? 'none' : '0 8px 24px rgba(16,45,51,0.18)';
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" style={{ color: 'var(--clay)' }} />
                    <span>{isIndonesian ? loadingMessagesId[loadingMessageIndex] : loadingMessagesEn[loadingMessageIndex]}</span>
                  </>
                ) : (
                  <>
                    <span>{isIndonesian ? 'Kirim Analisis' : 'Submit Analysis'}</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </section>

          {/* ── RIGHT COLUMN: Feedback ── */}
          <section className="w-full overflow-hidden">

            {/* ═══════════════════════════════════════
                4. FEEDBACK SECTION
            ═══════════════════════════════════════ */}
            {feedback ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-6 md:p-8 rounded-2xl sticky top-8 break-words whitespace-normal" 
                style={{
                  background: 'linear-gradient(160deg, rgba(255,253,250,0.9) 0%, rgba(239,229,214,0.4) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <h2 className="text-2xl mb-6 pb-4 break-words whitespace-normal" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)', borderBottom: '1px solid var(--line)' }}>
                  {isIndonesian ? "Hasil Tinjauan AI" : "AI Review Results"}
                </h2>
                
                <div className="flex flex-col">

                  {/* Issue Identification — green */}
                  <div className="py-5" style={{ borderBottom: '1px solid var(--line)' }}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="shrink-0 rounded-full" style={{ width: 8, height: 8, background: categoryAccents.issue.color, boxShadow: `0 0 8px ${categoryAccents.issue.color}40` }} />
                      <h3 className="font-extrabold text-[10px] tracking-[0.14em] uppercase break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                        {isIndonesian ? "Identifikasi Isu" : "Issue Identification"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal pl-5" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.issueFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Citations — blue */}
                  <div className="py-5" style={{ borderBottom: '1px solid var(--line)' }}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="shrink-0 rounded-full" style={{ width: 8, height: 8, background: categoryAccents.citation.color, boxShadow: `0 0 8px ${categoryAccents.citation.color}40` }} />
                      <h3 className="font-extrabold text-[10px] tracking-[0.14em] uppercase break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                        {isIndonesian ? "Penggunaan Pasal & Kutipan" : "Article Usage & Citations"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal pl-5" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.citationFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Application — purple */}
                  <div className="py-5" style={{ borderBottom: feedback.missedElements ? '1px solid var(--line)' : 'none' }}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="shrink-0 rounded-full" style={{ width: 8, height: 8, background: categoryAccents.application.color, boxShadow: `0 0 8px ${categoryAccents.application.color}40` }} />
                      <h3 className="font-extrabold text-[10px] tracking-[0.14em] uppercase break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                        {isIndonesian ? "Penerapan Hukum" : "Legal Application"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal pl-5" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.applicationFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  {/* Missed Elements — orange */}
                  {feedback.missedElements && (
                    <div className="py-5">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="shrink-0 rounded-full" style={{ width: 8, height: 8, background: categoryAccents.missed.color, boxShadow: `0 0 8px ${categoryAccents.missed.color}40` }} />
                        <h3 className="font-extrabold text-[10px] tracking-[0.14em] uppercase break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                          {isIndonesian ? "Elemen yang Terlewat" : "Missed Elements"}
                        </h3>
                      </div>
                      <div
                        className="text-sm leading-relaxed break-words whitespace-normal p-4 rounded-xl ml-5"
                        style={{
                          color: 'var(--muted)',
                          background: 'rgba(251,146,60,0.05)',
                          border: '1px solid rgba(251,146,60,0.12)',
                        }}
                      >
                        <ReactMarkdown components={markdownComponents}>{feedback.missedElements}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* ═══════════════════════════════════════
                  EMPTY STATE — engaging with icon
              ═══════════════════════════════════════ */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl break-words whitespace-normal" 
                style={{
                  border: '2px dashed var(--line)',
                  background: 'linear-gradient(180deg, rgba(255,253,250,0.5) 0%, rgba(239,229,214,0.2) 100%)',
                }}
              >
                {/* Decorative icon cluster */}
                <div
                  className="flex items-center justify-center mb-6 rounded-2xl"
                  style={{
                    width: 72, height: 72,
                    background: 'linear-gradient(135deg, rgba(178,77,57,0.08), rgba(113,130,110,0.08))',
                    border: '1px solid var(--line)',
                  }}
                >
                  <div className="relative">
                    <Scale size={28} style={{ color: 'var(--reed)' }} />
                    <BookOpen
                      size={14}
                      className="absolute -bottom-1 -right-2"
                      style={{ color: 'var(--clay)' }}
                    />
                  </div>
                </div>
                <p className="text-center font-semibold text-sm mb-2" style={{ color: 'var(--ink-deep)' }}>
                  {isIndonesian ? 'Belum ada umpan balik' : 'No feedback yet'}
                </p>
                <p className="text-center max-w-xs text-[13px] leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
                  {isIndonesian 
                    ? "Kirimkan analisis Anda untuk melihat umpan balik terstruktur mengenai isu hukum, kutipan pasal, penerapan hukum, dan elemen yang terlewat." 
                    : "Submit your analysis to see structured feedback regarding legal issues, article citations, legal application, and missed elements."}
                </p>
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
