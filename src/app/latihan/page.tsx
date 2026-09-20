"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, Send, AlertCircle, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--paper)', color: 'var(--ink)', fontFamily: 'Manrope, sans-serif' }}>
      <header className="px-6 py-8 md:px-12 md:py-12 max-w-[1180px] mx-auto flex items-center gap-4">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/50" style={{ color: 'var(--muted)' }}>
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">{isIndonesian ? 'Kembali' : 'Back'}</span>
        </Link>
      </header>

      <main className="px-6 md:px-12 pb-24 max-w-[1180px] mx-auto w-full overflow-hidden">
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

        {/* Selection Menu Grid */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 font-serif break-words whitespace-normal" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)' }}>
            {isIndonesian ? "Pilih Skenario Kasus" : "Select Case Scenario"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {latihanScenarios.map((scenario, index) => {
              const isCompleted = completed.includes(scenario.id);
              const isSelected = selectedScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  onClick={() => { setSelectedScenario(scenario); setAnalysis(''); setFeedback(null); }}
                  className="p-4 rounded-2xl text-left transition-all relative flex flex-col gap-2"
                  style={{
                    background: isSelected ? 'var(--ink-deep)' : 'var(--card)',
                    border: `1px solid ${isSelected ? 'var(--ink-deep)' : 'var(--line)'}`,
                    color: isSelected ? 'var(--card)' : 'var(--ink)',
                    boxShadow: isSelected ? 'var(--shadow)' : 'none'
                  }}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs font-bold tracking-wider" style={{ color: isSelected ? 'var(--card)' : 'var(--clay)' }}>
                      {isIndonesian ? "KASUS" : "CASE"} {index + 1}
                    </span>
                    {isCompleted && (
                      <CheckCircle size={16} style={{ color: isSelected ? 'var(--card)' : 'var(--reed)' }} />
                    )}
                  </div>
                  <span className="text-sm font-medium leading-snug line-clamp-2">
                    {isIndonesian ? scenario.title : scenario.titleEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Kasus & Form */}
          <section className="w-full overflow-hidden">
            <div className="p-6 md:p-8 rounded-2xl mb-8 break-words whitespace-normal" style={{ background: 'rgba(255, 253, 250, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} style={{ color: 'var(--reed)' }} />
                <h2 className="text-xl font-bold break-words whitespace-normal" style={{ color: 'var(--ink-deep)', fontFamily: 'DM Serif Display, serif' }}>
                  {isIndonesian ? selectedScenario.title : selectedScenario.titleEn}
                </h2>
              </div>
              <p className="leading-relaxed mb-0 break-words whitespace-normal">{isIndonesian ? selectedScenario.scenario : selectedScenario.scenarioEn}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label className="font-semibold break-words whitespace-normal text-sm uppercase tracking-wider" style={{ color: 'var(--ink-deep)' }}>
                  {isIndonesian ? "Pilih AI Model" : "Select AI Model"}
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="p-3 rounded-xl outline-none"
                  style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                  disabled={loading}
                >
                  {providers.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <label htmlFor="analysis" className="font-semibold break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>{isIndonesian ? "Analisis Anda" : "Your Analysis"}</label>
              <textarea
                id="analysis"
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder={isIndonesian ? "Identifikasi pasal yang relevan dan analisis unsur-unsurnya..." : "Identify relevant articles and analyze their elements..."}
                className="w-full min-h-[200px] p-5 rounded-2xl outline-none transition-all resize-y"
                style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                disabled={loading}
              />
              
              {offline && (
                <div className="p-4 rounded-xl flex items-start gap-3 bg-red-50 text-red-700 border border-red-100 break-words whitespace-normal">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm break-words whitespace-normal">{isIndonesian ? "Anda sedang offline. Koneksi internet diperlukan untuk mendapatkan umpan balik AI." : "You are offline. An internet connection is required to get AI feedback."}</p>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl flex items-start gap-3 bg-red-50 text-red-700 border border-red-100 break-words whitespace-normal">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm break-words whitespace-normal">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !analysis.trim()}
                className="px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-70 break-words whitespace-normal"
                style={{ backgroundColor: 'var(--ink-deep)', color: 'var(--card)' }}
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

          {/* Umpan Balik */}
          <section className="w-full overflow-hidden">
            {feedback ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="p-6 md:p-8 rounded-2xl sticky top-8 break-words whitespace-normal" 
                style={{ background: 'rgba(255, 253, 250, 0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: 'var(--shadow)' }}
              >
                <h2 className="text-2xl mb-6 pb-4 border-b break-words whitespace-normal" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)', borderColor: 'var(--line)' }}>
                  {isIndonesian ? "Hasil Tinjauan AI" : "AI Review Results"}
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase break-words whitespace-normal" style={{ color: 'var(--clay)' }}>
                        {isIndonesian ? "Identifikasi Isu" : "Issue Identification"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.issueFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase break-words whitespace-normal" style={{ color: 'var(--clay)' }}>
                        {isIndonesian ? "Penggunaan Pasal & Kutipan" : "Article Usage & Citations"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.citationFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase break-words whitespace-normal" style={{ color: 'var(--clay)' }}>
                        {isIndonesian ? "Penerapan Hukum" : "Legal Application"}
                      </h3>
                    </div>
                    <div className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
                      <ReactMarkdown components={markdownComponents}>{feedback.applicationFeedback}</ReactMarkdown>
                    </div>
                  </div>

                  {feedback.missedElements && (
                    <div className="p-4 rounded-xl break-words whitespace-normal" style={{ backgroundColor: 'var(--paper-strong)' }}>
                      <h3 className="font-semibold text-sm tracking-wider uppercase mb-2 break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                        {isIndonesian ? "Elemen yang Terlewat" : "Missed Elements"}
                      </h3>
                      <div className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
                        <ReactMarkdown components={markdownComponents}>{feedback.missedElements}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[300px] flex items-center justify-center p-8 rounded-2xl border-2 border-dashed break-words whitespace-normal" 
                style={{ borderColor: 'var(--line)' }}
              >
                <p className="text-center max-w-sm break-words whitespace-normal" style={{ color: 'var(--muted)' }}>
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
