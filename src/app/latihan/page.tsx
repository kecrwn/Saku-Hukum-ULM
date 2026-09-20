"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, Send, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SCENARIO_ID = "Budi sedang berjalan di pasar dan melihat sebuah dompet tergeletak di atas meja seorang pedagang buah. Saat pedagang sedang sibuk melayani pembeli lain, Budi dengan cepat mengambil dompet tersebut dan memasukkannya ke dalam saku celananya. Budi kemudian segera meninggalkan pasar tanpa berniat mengembalikan dompet itu. Analisislah tindak pidana yang dilakukan Budi berdasarkan KUHP Baru.";
const SCENARIO_EN = "Budi is walking in the market and sees a wallet lying on a fruit vendor's table. While the vendor is busy serving another customer, Budi quickly grabs the wallet and puts it in his pants pocket. Budi then immediately leaves the market with no intention of returning the wallet. Analyze the criminal act committed by Budi based on the New KUHP.";

export default function LatihanPage() {
  const { isIndonesian } = useLanguage();
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [error, setError] = useState('');
  const [offline, setOffline] = useState(false);

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
        body: JSON.stringify({ analysis, scenario: isIndonesian ? SCENARIO_ID : SCENARIO_EN })
      });
      
      if (!res.ok) throw new Error('Gagal mendapatkan umpan balik. Silakan coba lagi.');
      const data = await res.json();
      setFeedback(data);
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

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Kasus & Form */}
          <section className="w-full overflow-hidden">
            <div className="p-6 md:p-8 rounded-2xl mb-8 break-words whitespace-normal" style={{ background: 'rgba(255, 253, 250, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} style={{ color: 'var(--reed)' }} />
                <h2 className="text-xl font-bold break-words whitespace-normal" style={{ color: 'var(--ink-deep)', fontFamily: 'DM Serif Display, serif' }}>{isIndonesian ? "Skenario: Pencurian" : "Scenario: Theft"}</h2>
              </div>
              <p className="leading-relaxed mb-0 break-words whitespace-normal">{isIndonesian ? SCENARIO_ID : SCENARIO_EN}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                className="px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 break-words whitespace-normal"
                style={{ backgroundColor: 'var(--ink-deep)', color: 'var(--card)' }}
              >
                {loading ? (isIndonesian ? 'Menganalisis...' : 'Analyzing...') : (isIndonesian ? 'Kirim Analisis' : 'Submit Analysis')}
                {!loading && <Send size={18} />}
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
                    <p className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>{feedback.issueFeedback}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase break-words whitespace-normal" style={{ color: 'var(--clay)' }}>
                        {isIndonesian ? "Penggunaan Pasal & Kutipan" : "Article Usage & Citations"}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>{feedback.citationFeedback}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase break-words whitespace-normal" style={{ color: 'var(--clay)' }}>
                        {isIndonesian ? "Penerapan Hukum" : "Legal Application"}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>{feedback.applicationFeedback}</p>
                  </div>

                  {feedback.missedElements && (
                    <div className="p-4 rounded-xl break-words whitespace-normal" style={{ backgroundColor: 'var(--paper-strong)' }}>
                      <h3 className="font-semibold text-sm tracking-wider uppercase mb-2 break-words whitespace-normal" style={{ color: 'var(--ink-deep)' }}>
                        {isIndonesian ? "Elemen yang Terlewat" : "Missed Elements"}
                      </h3>
                      <p className="text-sm leading-relaxed break-words whitespace-normal" style={{ color: 'var(--muted)' }}>{feedback.missedElements}</p>
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
