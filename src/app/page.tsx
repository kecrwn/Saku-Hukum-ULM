"use client";
/** River Margin design system: the home page introduces Saku Hukum ULM as an asymmetrical, tactile study notebook rather than an official portal. */
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight, BookOpen, Compass, GraduationCap, Scale } from "lucide-react";
import Link   from "next/link";
import { SourceLink } from "@/components/SourceLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery } from "@/lib/site-data";

type RouteCard = { number: string; title: string; description: string; href: string; icon: LucideIcon };

export default function Home() {
  const { isIndonesian } = useLanguage();
  const routes: RouteCard[] = isIndonesian
    ? [
        { number: "01", title: "Tentang ULM", description: "Sejarah, status S1 Hukum, dan konteks fakultas.", href: "/tentang", icon: Compass },
        { number: "02", title: "Kurikulum Pidana", description: "Mata kuliah, kode, SKS, dan dokumen Kurikulum 2020.", href: "/kurikulum", icon: BookOpen },
        { number: "03", title: "Ruang Praktik", description: "Peradilan semu, perpustakaan, dan fasilitas belajar.", href: "/fasilitas", icon: Scale },
        { number: "04", title: "Arah Karier", description: "Jalur belajar dan kanal CASN Kejaksaan RI.", href: "/karier", icon: GraduationCap },
      ]
    : [
        { number: "01", title: "About ULM", description: "History, Undergraduate Law status, and faculty context.", href: "/tentang", icon: Compass },
        { number: "02", title: "Criminal Law Curriculum", description: "Courses, codes, credits, and the Curriculum 2020 document.", href: "/kurikulum", icon: BookOpen },
        { number: "03", title: "Practice Spaces", description: "Mock court, library, and learning facilities.", href: "/fasilitas", icon: Scale },
        { number: "04", title: "Career Direction", description: "A study path and the Kejaksaan RI CASN channel.", href: "/karier", icon: GraduationCap },
      ];
  return <>
    <section className="hero content-width"><div className="hero-copy"><p className="eyebrow">{isIndonesian ? "PANDUAN STUDI PRIBADI • ULM" : "PERSONAL STUDY GUIDE • ULM"}</p><h1>{isIndonesian ? <>Baca jalurmu.<br /><em>Susun</em> catatanmu.</> : <>Read your path.<br /><em>Build</em> your notes.</>}</h1><p className="hero-summary">{isIndonesian ? "Teman belajar bilingual untuk menelusuri Fakultas Hukum ULM, peminatan Hukum Pidana, dan arah menuju profesi jaksa—dengan sumber terbuka sebagai pijakan." : "A bilingual study companion for tracing FH ULM, Criminal Law specialization, and a direction toward prosecution—with public sources as its foundation."}</p><div className="hero-actions"><Link className="primary-link" href="/kurikulum">{isIndonesian ? "Telusuri kurikulum" : "Explore curriculum"}<ArrowDownRight size={18} /></Link><Link className="text-link" href="/tentang">{isIndonesian ? "Mulai dari konteks" : "Start with context"}<ArrowUpRight size={16} /></Link></div><p className="hero-disclaimer">{isIndonesian ? "Bukan situs resmi ULM. Detail yang belum tersedia secara publik ditandai apa adanya." : "Not an official ULM website. Details unavailable publicly are marked as such."}</p></div><div className="hero-image-wrap"><img src={imagery.hero} alt={isIndonesian ? "Ilustrasi editorial buku dan catatan studi hukum" : "Editorial illustration of law books and study notes"} loading="lazy" decoding="async" /><div className="hero-image-caption"><span>{isIndonesian ? "Saku Hukum" : "Law Pocket"}</span><span>01 / 09</span></div></div></section>
    <section className="content-width home-facts"><div><strong>1958</strong><span>{isIndonesian ? "ULM berdiri; FH termasuk fakultas awal" : "ULM founded; Law among initial faculties"}</span></div><div><strong>4</strong><span>{isIndonesian ? "peminatan pada formasi Kurikulum 2020" : "specializations in Curriculum 2020 formation"}</span></div><div><strong>6</strong><span>{isIndonesian ? "mata kuliah wajib PK Hukum Pidana" : "required Criminal Law specialization courses"}</span></div><SourceLink href={externalLinks.ulmHistory} label={isIndonesian ? "Sejarah ULM" : "ULM History"} /></section>
    <section className="content-width route-section"><div className="section-heading"><p className="eyebrow">{isIndonesian ? "Peta saku" : "Pocket map"}</p><h2>{isIndonesian ? "Sembilan halaman, satu jejak belajar." : "Nine pages, one study trail."}</h2><p>{isIndonesian ? "Pilih halaman yang sesuai dengan pertanyaanmu hari ini." : "Choose the page that matches today’s question."}</p></div><div className="route-grid">{routes.map((route) => { const Icon = route.icon; return <Link href={route.href} className="route-card" key={route.href}><span>{route.number}</span><Icon size={21} /><h3>{route.title}</h3><p>{route.description}</p><ArrowUpRight size={17} /></Link>; })}</div></section>
    <section className="content-width home-image-band"><img src={imagery.riverCampus} alt={isIndonesian ? "Ilustrasi editorial lingkungan kampus tepi sungai di Banjarmasin" : "Editorial illustration of a riverside campus environment in Banjarmasin"} loading="lazy" decoding="async" /><div><p className="eyebrow">{isIndonesian ? "Cara memakai panduan" : "How to use the guide"}</p><h2>{isIndonesian ? "Kumpulkan rujukan sebelum membuat keputusan." : "Collect references before making decisions."}</h2><p>{isIndonesian ? "Setiap halaman menyimpan tautan menuju sumber institusi. Gunakan Saku Hukum ULM sebagai meja orientasi, lalu baca dokumen asli untuk aturan, jadwal, ketentuan, dan pembaruan." : "Each page keeps a link to an institutional source. Use Saku Hukum ULM as an orientation desk, then read the original document for rules, schedules, terms, and updates."}</p><SourceLink href={externalLinks.faculty} label={isIndonesian ? "Situs FH ULM" : "FH ULM website"} /></div><span className="image-note">{isIndonesian ? "Ilustrasi editorial" : "Editorial illustration"}</span></section>
  </>;
}
