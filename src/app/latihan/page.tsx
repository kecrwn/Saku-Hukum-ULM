"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { ArrowLeft, Send, AlertCircle, FileText, CheckCircle } from 'lucide-react';

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
          <span className="text-sm font-medium">Kembali</span>
        </Link>
      </header>

      <main className="px-6 md:px-12 pb-24 max-w-[1180px] mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)' }}>
            Latihan <em style={{ color: 'var(--clay)', fontStyle: 'italic' }}>Kasus</em>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--muted)' }}>
            Uji pemahaman Anda tentang tindak pidana dengan menganalisis studi kasus nyata. AI kami akan meninjau jawaban Anda berdasarkan KUHP Baru (UU 1/2023).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Kasus & Form */}
          <section>
            <div className="p-6 md:p-8 rounded-2xl mb-8" style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: 'var(--shadow)' }}>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={20} style={{ color: 'var(--reed)' }} />
                <h2 className="text-xl font-bold" style={{ color: 'var(--ink-deep)', fontFamily: 'DM Serif Display, serif' }}>Skenario: Pencurian</h2>
              </div>
              <p className="leading-relaxed mb-0">{isIndonesian ? SCENARIO_ID : SCENARIO_EN}</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="analysis" className="font-semibold" style={{ color: 'var(--ink-deep)' }}>Analisis Anda</label>
              <textarea
                id="analysis"
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder=isIndonesian ? "Identifikasi pasal yang relevan dan analisis unsur-unsurnya..." : "Identify relevant articles and analyze their elements..."
                className="w-full min-h-[200px] p-5 rounded-2xl outline-none transition-all resize-y"
                style={{ background: 'var(--card)', border: '1px solid var(--line)', color: 'var(--ink)' }}
                disabled={loading}
              />
              
              {offline && (
                <div className="p-4 rounded-xl flex items-start gap-3 bg-red-50 text-red-700 border border-red-100">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Anda sedang offline. Koneksi internet diperlukan untuk mendapatkan umpan balik AI.</p>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl flex items-start gap-3 bg-red-50 text-red-700 border border-red-100">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !analysis.trim()}
                className="px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ backgroundColor: 'var(--ink-deep)', color: 'var(--card)' }}
              >
                {loading ? 'Menganalisis...' : 'Kirim Analisis'}
                {!loading && <Send size={18} />}
              </button>
            </form>
          </section>

          {/* Umpan Balik */}
          <section>
            {feedback ? (
              <div className="p-6 md:p-8 rounded-2xl sticky top-8" style={{ background: 'var(--card)', border: '1px solid var(--line)', boxShadow: 'var(--shadow)' }}>
                <h2 className="text-2xl mb-6 pb-4 border-b" style={{ fontFamily: 'DM Serif Display, serif', color: 'var(--ink-deep)', borderColor: 'var(--line)' }}>Hasil Tinjauan AI</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase" style={{ color: 'var(--clay)' }}>Identifikasi Isu</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feedback.issueFeedback}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase" style={{ color: 'var(--clay)' }}>Penggunaan Pasal & Kutipan</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feedback.citationFeedback}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={18} style={{ color: 'var(--reed)' }} />
                      <h3 className="font-semibold text-sm tracking-wider uppercase" style={{ color: 'var(--clay)' }}>Penerapan Hukum</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feedback.applicationFeedback}</p>
                  </div>

                  {feedback.missedElements && (
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--paper-strong)' }}>
                      <h3 className="font-semibold text-sm tracking-wider uppercase mb-2" style={{ color: 'var(--ink-deep)' }}>Elemen yang Terlewat</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feedback.missedElements}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex items-center justify-center p-8 rounded-2xl border-2 border-dashed" style={{ borderColor: 'var(--line)' }}>
                <p className="text-center max-w-sm" style={{ color: 'var(--muted)' }}>
                  Kirimkan analisis Anda untuk melihat umpan balik terstruktur mengenai isu hukum, kutipan pasal, penerapan hukum, dan elemen yang terlewat.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
