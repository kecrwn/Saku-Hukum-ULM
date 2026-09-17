"use client";
/** River Margin design system: the home page introduces Saku Hukum ULM as an asymmetrical, tactile study notebook rather than an official portal. */
import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Compass,
  GraduationCap,
  Landmark,
  Scale,
  Users,
  UserPlus,
  MessageSquare,
  Link as LinkIcon,
  Home as HomeIcon,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SourceLink } from "@/components/SourceLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery, carouselImages } from "@/lib/site-data";

type RouteCard = {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export default function Home() {
  const { isIndonesian } = useLanguage();
  const routes: RouteCard[] = isIndonesian
    ? [
        { number: "01", title: "Beranda", description: "Panduan studi, ilustrasi editorial, dan informasi dasar.", href: "/", icon: HomeIcon },
        { number: "02", title: "Tentang ULM", description: "Sejarah, status S1 Hukum, dan konteks fakultas.", href: "/tentang", icon: Compass },
        { number: "03", title: "Kurikulum Pidana", description: "Mata kuliah, kode, SKS, dan dokumen Kurikulum 2020.", href: "/kurikulum", icon: BookOpen },
        { number: "04", title: "Ruang Praktik", description: "Peradilan semu, perpustakaan, dan fasilitas belajar.", href: "/fasilitas", icon: Scale },
        { number: "05", title: "Arah Karier", description: "Jalur belajar dan kanal CASN Kejaksaan RI.", href: "/karier", icon: GraduationCap },
        { number: "06", title: "Dosen & Staf", description: "Profil pengajar dan struktur pimpinan.", href: "/dosen", icon: Users },
        { number: "07", title: "Kemahasiswaan", description: "Organisasi kampus, KPS, dan aktivitas.", href: "/kemahasiswaan", icon: UserPlus },
        { number: "08", title: "Apa Kata Mereka", description: "Perspektif dan ulasan pengalaman akademik.", href: "/perspektif", icon: MessageSquare },
        { number: "09", title: "Tautan", description: "Direktori lengkap referensi resmi eksternal.", href: "/tautan", icon: LinkIcon },
        { number: "10", title: "Unduhan & Dokumen", description: "Arsip berkas akademik dan administrasi.", href: "/dokumen", icon: FileText },
      ]
    : [
        { number: "01", title: "Home", description: "Study guide, editorial illustrations, and basic info.", href: "/", icon: HomeIcon },
        { number: "02", title: "About ULM", description: "History, Undergraduate Law status, and faculty context.", href: "/tentang", icon: Compass },
        { number: "03", title: "Criminal Law Curriculum", description: "Courses, codes, credits, and the Curriculum 2020 document.", href: "/kurikulum", icon: BookOpen },
        { number: "04", title: "Practice Spaces", description: "Mock court, library, and learning facilities.", href: "/fasilitas", icon: Scale },
        { number: "05", title: "Career Direction", description: "A study path and the Kejaksaan RI CASN channel.", href: "/karier", icon: GraduationCap },
        { number: "06", title: "Faculty & Staff", description: "Lecturer profiles and leadership structure.", href: "/dosen", icon: Users },
        { number: "07", title: "Student Life", description: "Campus organizations, KPS, and activities.", href: "/kemahasiswaan", icon: UserPlus },
        { number: "08", title: "What They’re Saying", description: "Perspectives and reviews of academic experience.", href: "/perspektif", icon: MessageSquare },
        { number: "09", title: "Links", description: "Complete directory of official external references.", href: "/tautan", icon: LinkIcon },
        { number: "10", title: "Downloads & Docs", description: "Archive of academic and administrative files.", href: "/dokumen", icon: FileText },
      ];

  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setHeroIdx((prev) => (prev + 1) % carouselImages.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="hero content-width">
        <div className="hero-copy">
          <p className="eyebrow">{isIndonesian ? "PANDUAN STUDI PRIBADI • ULM" : "PERSONAL STUDY GUIDE • ULM"}</p>
          <h1>
            {isIndonesian ? (
              <>
                Baca jalurmu.
                <br />
                <em>Susun</em> catatanmu.
              </>
            ) : (
              <>
                Read your path.
                <br />
                <em>Build</em> your notes.
              </>
            )}
          </h1>
          <p className="hero-summary">
            {isIndonesian
              ? "Panduan belajar praktis untuk mengenal Fakultas Hukum ULM, peminatan Hukum Pidana, dan jalur karier kejaksaan—semua berdasar data resmi."
              : "A practical study guide to FH ULM, Criminal Law studies, and prosecutor career paths—all grounded in official public data."}
          </p>
          <div className="hero-actions">
            <Link
              className="primary-link inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--ink-deep)] text-[var(--paper)] font-bold text-xs tracking-wide hover:bg-[var(--clay)] hover:text-white transition-all duration-200 shadow-sm active:scale-[0.98]"
              href="/kurikulum"
            >
              {isIndonesian ? "Jelajahi Kurikulum" : "Explore Curriculum"}
              <ArrowDownRight size={18} />
            </Link>
            <Link
              className="secondary-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/80 border border-[rgba(23,62,68,.18)] text-[var(--ink-deep)] font-bold text-xs tracking-wide hover:bg-white hover:border-[var(--clay)] hover:text-[var(--clay)] hover:shadow-xs transition-all duration-200 active:scale-[0.98]"
              href="/tentang"
            >
              {isIndonesian ? "Mulai dari Konteks" : "Start with Context"}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="hero-disclaimer">
            {isIndonesian
              ? "Bukan situs resmi ULM. Informasi yang belum dibuka ke publik ditandai secara jelas."
              : "Not an official ULM website. Information not publicly available is clearly marked."}
          </p>
        </div>
        <div className="hero-image-wrap">
          <Image
            src={carouselImages[heroIdx]}
            alt={isIndonesian ? "Ilustrasi editorial buku dan catatan studi hukum" : "Editorial illustration of law books and study notes"}
            width={1200}
            height={800}
            className="object-cover w-full h-full transition-opacity duration-300"
            priority
            decoding="async"
          />
          <div
            className="hero-image-caption"
            style={{
              left: 0,
              right: 0,
              bottom: 0,
              padding: "28px 24px 14px",
              background: "linear-gradient(transparent, rgba(16, 45, 51, 0.78))",
            }}
          >
            <span>{isIndonesian ? "Saku Hukum" : "Law Pocket"}</span>
            <span>
              {String(heroIdx + 1).padStart(2, "0")} / {String(carouselImages.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      <section className="content-width home-facts">
        <div>
          <strong>1958</strong>
          <span>{isIndonesian ? "Tahun ULM berdiri; FH adalah salah satu fakultas pertama" : "ULM was founded; Law was among the first faculties"}</span>
          <SourceLink href={externalLinks.ulmHistory} label={isIndonesian ? "Sejarah ULM" : "ULM History"} />
        </div>
        <div>
          <strong>4</strong>
          <span>{isIndonesian ? "peminatan studi pada Kurikulum 2020" : "specializations in the 2020 curriculum"}</span>
        </div>
        <div>
          <strong>6</strong>
          <span>{isIndonesian ? "mata kuliah wajib peminatan Hukum Pidana" : "required courses for Criminal Law specialization"}</span>
        </div>
        <div>
          <strong>{isIndonesian ? 'Baik Sekali' : 'Baik Sekali'}</strong>
          <span>{isIndonesian ? 'Akreditasi BAN-PT berlaku hingga 2031' : 'BAN-PT accreditation valid until 2031'}</span>
          <SourceLink href={externalLinks.accreditationNews} label={isIndonesian ? "Berita akreditasi" : "Accreditation news"} />
        </div>
      </section>

      <section className="content-width quick-facts">
        <div>
          <BadgeCheck size={20} />
          <h3>{isIndonesian ? "Akreditasi BAN-PT" : "BAN-PT Accreditation"}</h3>
          <p>{isIndonesian ? "Terakreditasi 'Baik Sekali' dari BAN-PT, berlaku hingga 2031" : "Accredited 'Baik Sekali' by BAN-PT, valid until 2031"}</p>
          <SourceLink href={externalLinks.accreditation} label={isIndonesian ? "Akreditasi FH ULM" : "FH ULM Accreditation"} />
        </div>
        <div>
          <BookOpen size={20} />
          <h3>{isIndonesian ? "Empat Peminatan" : "Four Specializations"}</h3>
          <p>{isIndonesian ? "Pilihan fokus: Pidana, Perdata, Tata Negara, dan Internasional" : "Focus tracks: Criminal, Civil, Constitutional, International Law"}</p>
          <SourceLink href={externalLinks.curriculum} label={isIndonesian ? "Formasi Kurikulum" : "Curriculum Formation"} />
        </div>
        <div>
          <Landmark size={20} />
          <h3>{isIndonesian ? "Hukumonline Corner" : "Hukumonline Corner"}</h3>
          <p>{isIndonesian ? "Pojok literasi hukum digital pertama di kampus Kalimantan" : "First digital legal database corner on a Kalimantan campus"}</p>
          <SourceLink href={externalLinks.hukumonlineCorner} label={isIndonesian ? "Berita ULM" : "ULM News"} />
        </div>
      </section>

      <section className="content-width route-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Peta saku" : "Pocket map"}</p>
          <h2>{isIndonesian ? "Sepuluh halaman, satu jejak belajar." : "Ten pages, one study trail."}</h2>
          <p>{isIndonesian ? "Pilih halaman yang sesuai dengan pertanyaanmu hari ini." : "Choose the page that matches today’s question."}</p>
        </div>
        <div className="route-grid">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link href={route.href} className="route-card" key={route.href}>
                <span>{route.number}</span>
                <Icon size={21} />
                <h3>{route.title}</h3>
                <p>{route.description}</p>
                <ArrowUpRight size={17} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="content-width home-image-band">
        <div className="band-visual" style={{ minHeight: "360px", padding: 0 }}>
          <Image
            src={imagery.riverCampus}
            alt={isIndonesian ? "Ilustrasi editorial lingkungan kampus tepi sungai di Banjarmasin" : "Editorial illustration of a riverside campus environment in Banjarmasin"}
            fill
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="image-note z-10">{isIndonesian ? "Ilustrasi editorial" : "Editorial illustration"}</span>
        </div>
        <div>
          <p className="eyebrow">{isIndonesian ? "Cara Memakai Panduan" : "How to Use This Guide"}</p>
          <h2>{isIndonesian ? "Selalu cek rujukan sebelum mengambil keputusan." : "Always check official sources before deciding."}</h2>
          <p>
            {isIndonesian
              ? "Setiap halaman dilengkapi tautan ke sumber resmi kampus. Gunakan Saku Hukum ULM sebagai rangkuman awal, lalu periksa berkas aslinya untuk aturan, tanggal, dan pengumuman terbaru."
              : "Every page links directly to official campus sources. Use Saku Hukum ULM as a quick starting summary, then check the original documents for rules, dates, and announcements."}
          </p>
          <p>
            {isIndonesian
              ? "Semua data ditautkan langsung ke sumber terpercaya—tanpa klaim tanpa bukti."
              : "All information links directly to verified sources—no unsupported claims."}
          </p>
          <SourceLink href={externalLinks.faculty} label={isIndonesian ? "Situs Resmi FH ULM" : "Official FH ULM Website"} />
        </div>
      </section>
    </>
  );
}
