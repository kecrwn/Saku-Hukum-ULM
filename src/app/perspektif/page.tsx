"use client";
/** River Margin design system: public perspectives appear as source-marked reading cards—paraphrased, scoped, and never treated as a ratings feed. */
import { ArrowUpRight, Eye, FileText, MessageCircleMore, ShieldCheck, Newspaper, BookOpen, Share2 } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { useLanguage } from "@/contexts/LanguageContext";

type Perspective = { id: string; platform: "IDN Times" | "Jejakrekam" | "Blogspot" | "LinkedIn"; scopeId: string; scopeEn: string; relationshipId: string; relationshipEn: string; dateId: string; dateEn: string; titleId: string; titleEn: string; bodyId: string; bodyEn: string; href: string };

const perspectives: Perspective[] = [
  { id: "IDN-01", platform: "IDN Times", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Mahasiswa Semester Akhir", relationshipEn: "Final Semester Student", dateId: "September 2024", dateEn: "September 2024", titleId: "Krisis Akreditasi", titleEn: "Accreditation Crisis", bodyId: "Seorang aktivis mahasiswa menyoroti dinamika akreditasi institusi sebagai momen penting refleksi sivitas akademika. Ia menekankan perlunya pembenahan tata kelola berkelanjutan dan pemulihan standar mutu akademik secara konsisten.", bodyEn: "A student activist highlights institutional accreditation dynamics as an important moment of reflection for the academic community, emphasizing continuous governance improvement and quality restoration.", href: "https://kaltim.idntimes.com/news/kalimantan-selatan/akreditasi-fh-universitas-lambung-mangkurat-terjun-bebas-00-ffyyv-g1swtm" },
  { id: "JR-01", platform: "Jejakrekam", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Ketua IKA FH ULM", relationshipEn: "Alumni Association Chair", dateId: "September 2024", dateEn: "September 2024", titleId: "Tuntutan Keterbukaan", titleEn: "Demand for Transparency", bodyId: "Ketua IKA FH ULM menegaskan komitmen alumni untuk mengawal integritas almamater, mendorong transparansi informasi publik, serta mendukung pembenahan sistemik demi menjaga marwah Fakultas Hukum ULM.", bodyEn: "The Chair of FH ULM Alumni Association affirms alumni commitment to safeguard institutional integrity, encourage transparency, and support systemic reform.", href: "https://jejakrekam.com/ikatan-keluarga-alumni-fakultas-hukum-ulm-dikukuhkan-fauzan-ramon-jadi-ketua/" },
  { id: "BLG-01", platform: "Blogspot", scopeId: "ULM secara umum", scopeEn: "ULM generally", relationshipId: "Mahasiswa Angkatan 2016", relationshipEn: "2016 Student", dateId: "Oktober 2019", dateEn: "October 2019", titleId: "Dinamika Kampus Lokal", titleEn: "Local Campus Dynamics", bodyId: "Seorang mahasiswa mengenang awal mula perkuliahan dan mengakui bahwa ULM adalah salah satu kampus terkemuka di Kalimantan dengan tradisi keilmuan kuat dan lingkungan belajar yang kompetitif.", bodyEn: "A student reflects on their study journey, recognizing ULM as one of the leading universities in Kalimantan with robust academic traditions and a competitive learning environment.", href: "https://fartwens.blogspot.com/2019/10/ulm-kawah-candradimuka-pribadi.html" },
  { id: "LNK-01", platform: "LinkedIn", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Fresh Graduate S1", relationshipEn: "S1 Fresh Graduate", dateId: "Terbaru", dateEn: "Recent", titleId: "Aktif dan Tepat Waktu", titleEn: "Active and On-Time", bodyId: "Seorang lulusan membagikan pengalaman di Divisi Mootcourt (Komunitas Peradilan Semu), membuktikan mahasiswa dapat aktif berorganisasi sekaligus lulus tepat waktu dengan capaian akademik memuaskan.", bodyEn: "A graduate shares experience in the Moot Court Division, showing that students can engage deeply in campus activities while graduating on schedule with strong academic results.", href: "https://www.linkedin.com/in/hikmah-ramadhan-1841b0216" }
];

const platformInfo: Record<string, { icon: typeof Newspaper; color: string; actionId: string; actionEn: string }> = {
  "IDN Times": { icon: Newspaper, color: "#b24d39", actionId: "Baca di IDN Times", actionEn: "Read on IDN Times" },
  "Jejakrekam": { icon: FileText, color: "#173e44", actionId: "Baca di Jejakrekam", actionEn: "Read on Jejakrekam" },
  "Blogspot": { icon: BookOpen, color: "#71826e", actionId: "Baca di Blog", actionEn: "Read Blog" },
  "LinkedIn": { icon: Share2, color: "#102d33", actionId: "Lihat di LinkedIn", actionEn: "View on LinkedIn" }
};

function RiverThread({ label }: { label: string }) {
  return (
    <div className="perspective-river-thread" aria-hidden="true">
      <svg viewBox="0 0 500 25" preserveAspectRatio="none">
        <path d="M1 14 C52 2, 96 24, 150 13 S252 2, 307 14 S405 24, 499 8" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

export default function Perspectives() {
  const { isIndonesian } = useLanguage();
  return (
    <>
      <PageIntro
        label={isIndonesian ? "Apa Kata Mereka" : "What They’re Saying"}
        title={isIndonesian ? "Perspektif publik, dibaca dengan konteks." : "Public perspectives, read in context."}
        summary={
          isIndonesian
            ? "Empat catatan publik ini dipilih karena memiliki sumber asli yang jelas dan dapat ditelusuri. Seluruhnya diparafrasekan secara objektif untuk menjaga integritas sumber."
            : "These four public notes were selected for clear, traceable primary sources. All are objectively paraphrased to preserve source integrity."
        }
        sourceCount={isIndonesian ? "4 perspektif • 4 platform publik" : "4 perspectives • 4 public platforms"}
      />
      
      <section className="content-width perspective-method">
        <div className="method-heading">
          <p className="eyebrow">{isIndonesian ? "Cara membaca" : "How to read this"}</p>
          <h2>{isIndonesian ? "Bukan peringkat. Bukan kesimpulan umum." : "Not a rating. Not a general conclusion."}</h2>
        </div>
        <div className="method-points">
          <div>
            <Eye size={18} />
            <p>{isIndonesian ? "Setiap kartu menjelaskan apakah ia berbicara tentang FH ULM atau ULM secara umum." : "Every card states whether it concerns FH ULM or ULM generally."}</p>
          </div>
          <div>
            <FileText size={18} />
            <p>{isIndonesian ? "Ringkasan ditulis ulang secara ringkas dan setia pada inti sumber, bukan disalin." : "Summaries are written afresh, briefly and faithfully, rather than copied."}</p>
          </div>
          <div>
            <ShieldCheck size={18} />
            <p>{isIndonesian ? "Tautan keluar selalu tersedia agar pembaca dapat memeriksa konteks lengkapnya." : "An outbound link is always available so readers can check the full context."}</p>
          </div>
        </div>
      </section>

      <section className="content-width perspectives-layout" aria-label={isIndonesian ? "Daftar perspektif publik" : "Public perspectives list"}>
        <aside className="perspectives-rail">
          <div className="rail-stamp">
            <span>{isIndonesian ? "BERKAS BACA" : "READING FILE"}</span>
            <strong>04</strong>
            <small>{isIndonesian ? "catatan publik" : "public notes"}</small>
          </div>
          <RiverThread label={isIndonesian ? "aliran sumber" : "source current"} />
          <div className="rail-count">
            <strong>01</strong>
            <span>{isIndonesian ? "ULM secara umum" : "ULM generally"}</span>
          </div>
          <div className="rail-count">
            <strong>03</strong>
            <span>{isIndonesian ? "Fakultas Hukum" : "Faculty of Law"}</span>
          </div>
          <p className="rail-footnote">
            {isIndonesian ? "Dipilih untuk keterbacaan sumber, bukan popularitas." : "Selected for source readability, not popularity."}
          </p>
        </aside>

        <div>
          <RiverThread label={isIndonesian ? "catatan terpilih" : "selected notes"} />
          <div className="perspectives-list">
            {perspectives.map((item) => {
              const platform = platformInfo[item.platform];
              const IconComp = platform.icon;
              return (
                <article className="perspective-card" key={item.id} style={{ "--platform": platform.color } as React.CSSProperties}>
                  <div className="perspective-card-top case-file-tab">
                    <div className="platform-badge">
                      <span className="platform-mark">
                        <IconComp size={15} style={{ color: platform.color }} />
                      </span>
                      <span>{item.platform}</span>
                    </div>
                    <span className="entry-id">{item.id}</span>
                  </div>
                  <div className="perspective-tags">
                    <span>{isIndonesian ? item.scopeId : item.scopeEn}</span>
                    <span>{isIndonesian ? item.relationshipId : item.relationshipEn}</span>
                  </div>
                  <h2>{isIndonesian ? item.titleId : item.titleEn}</h2>
                  <p className="perspective-body">{isIndonesian ? item.bodyId : item.bodyEn}</p>
                  <div className="perspective-card-bottom">
                    <span>{isIndonesian ? item.dateId : item.dateEn}</span>
                    <a href={item.href} target="_blank" rel="noreferrer" className="platform-link">
                      {isIndonesian ? platform.actionId : platform.actionEn}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="source-boundary" className="content-width source-boundary">
        <MessageCircleMore size={23} />
        <div>
          <p className="eyebrow">{isIndonesian ? "Batas editorial" : "Editorial boundary"}</p>
          <h2>{isIndonesian ? "Yang tidak masuk juga penting." : "What is not included matters too."}</h2>
          <p>
            {isIndonesian
              ? "Penelusuran ini hanya memasukkan ulasan dan catatan yang memiliki atribusi serta tautan rujukan yang dapat diakses publik. Alih-alih menampilkan klaim tanpa dasar, halaman ini berpegang pada standar keterverifikasian sumber."
              : "This review only includes perspectives with identifiable attribution and verifiable public reference links. Rather than presenting unverified claims, this page adheres strictly to source verifiability standards."}
          </p>
        </div>
      </section>
    </>
  );
}
