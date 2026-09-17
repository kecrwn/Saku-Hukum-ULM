"use client";
/** River Margin / shULM: facilities are described from named sources, keeping official photography separate from editorial illustration. */
import {
  BadgeCheck,
  BookMarked,
  Building2,
  ExternalLink,
  GraduationCap,
  HandHeart,
  Presentation,
  Scale,
  ShieldCheck,
  Users
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceLink } from "@/components/SourceLink";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery } from "@/lib/site-data";

export default function Facilities() {
  const { isIndonesian } = useLanguage();

  const facilityItems = isIndonesian
    ? [
        [
          Building2,
          "Bangunan Baru & Gedung Lama Fakultas Hukum",
          "Bangunan utama untuk layanan administrasi fakultas, ruang perkuliahan reguler, serta Program Magister Hukum (S2)."
        ],
        [
          Scale,
          "Gedung Peradilan Semu Desmond J. Mahesa",
          "Riset tambahan dan berita resmi ULM mencatat peresmian gedung ini pada Juli 2024 sebagai ruang peradilan semu. Jam serta ketentuan penggunaan tidak dipublikasikan."
        ],
        [
          Presentation,
          "Auditorium Prof. Idham Zarkasi, S.H.",
          "Auditorium utama dengan lobi tersendiri, digunakan untuk acara besar universitas seperti kuliah umum dan seminar Adhyaksa Chamber."
        ],
        [
          BookMarked,
          "Hukumonline Corner",
          "Berita resmi ULM menyebutnya sebagai Hukumonline Corner pertama di Kalimantan, hasil kerja sama strategis FH ULM dan Hukumonline."
        ],
        [
          GraduationCap,
          "Ruang dan Layanan Akademik",
          "Galeri mencantumkan ruang ujian mandiri, pelayanan akademik dan kemahasiswaan (PTSP), serta gazebo pelayanan mahasiswa."
        ],
        [
          HandHeart,
          "Ruang Mahasiswa & Fasilitas Disabilitas",
          "Galeri fasilitas mencantumkan taman belajar asri, sekretariat UKM hukum, lahan parkir terpadu, serta sarana prasarana ramah disabilitas."
        ]
      ]
    : [
        [
          Building2,
          "New & Old Faculty of Law Buildings",
          "The main buildings for faculty administrative services, undergraduate lecture halls, and the Master of Laws (S2) Program."
        ],
        [
          Scale,
          "Desmond J. Mahesa Mock Court Building",
          "Additional research and official ULM news record this building’s July 2024 inauguration as a mock-court venue. Operating hours and usage rules are not published."
        ],
        [
          Presentation,
          "Prof. Idham Zarkasi Auditorium",
          "The main faculty auditorium with its own dedicated lobby, hosting major academic conventions and Adhyaksa Chamber seminars."
        ],
        [
          BookMarked,
          "Hukumonline Corner",
          "Official ULM news identifies it as the first Hukumonline Corner in Kalimantan, created through an FH ULM–Hukumonline strategic collaboration."
        ],
        [
          GraduationCap,
          "Academic Spaces and Services",
          "The gallery lists examination rooms, academic/student service centers (PTSP), and outdoor student service gazebos."
        ],
        [
          HandHeart,
          "Student Spaces & Disability Facilities",
          "The facilities gallery lists open study gardens, student-activity secretariats, parking areas, and barrier-free disability infrastructure."
        ]
      ];

  return (
    <>
      <PageIntro
        label={isIndonesian ? "Fasilitas" : "Facilities"}
        title={
          isIndonesian
            ? "Ruang belajar, ruang praktik, dan ruang jeda."
            : "Spaces to study, practise, and pause."
        }
        summary={
          isIndonesian
            ? "Catatan fasilitas ini mengikuti nama ruang yang dipublikasikan FH ULM dan membedakan foto referensi resmi dari ilustrasi editorial situs."
            : "These facility notes follow the spaces published by FH ULM and distinguish official reference photography from this site’s editorial illustrations."
        }
        sourceCount={isIndonesian ? "Galeri Resmi FH ULM & Berita ULM" : "Official FH ULM Gallery & ULM News"}
      />

      {/* Feature Section: Mock Court */}
      <section className="content-width feature-photo-grid">
        <figure className="official-photo">
          <Image
            src={imagery.officialMoot}
            alt={
              isIndonesian
                ? "Foto resmi Ruang Peradilan Semu Fakultas Hukum ULM"
                : "Official photo of the FH ULM Mock Court Room"
            }
            width={1000}
            height={600}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <figcaption>
            <span>{isIndonesian ? "Foto referensi resmi" : "Official reference photo"}</span>
            <a href={externalLinks.mootCourtPhoto} target="_blank" rel="noopener noreferrer">
              {isIndonesian ? "Ruang Peradilan Semu FH ULM" : "FH ULM Mock Court Room"} <ExternalLink size={13} />
            </a>
          </figcaption>
        </figure>
        <div className="feature-photo-copy">
          <p className="eyebrow">{isIndonesian ? "Praktik peradilan" : "Court practice"}</p>
          <h2>{isIndonesian ? "Dari ruang simulasi ke pembelajaran praktik." : "From simulation room to practical learning."}</h2>
          <p>
            {isIndonesian
              ? "Foto yang dipublikasikan FH ULM memperlihatkan kursi merah berderet dengan meja tulis, pencahayaan plafon, tirai netral, dan area depan berornamen ruang sidang. Berita resmi ULM pada 2024 juga menjelaskan Gedung Peradilan Semu Desmond J. Mahesa sebagai ruang peradilan semu; ketersediaan dan mekanisme penggunaan perlu dikonfirmasi langsung."
              : "The FH ULM photo shows rows of red chairs with writing desks, ceiling lighting, neutral curtains, and a courtroom-style front area. Official ULM news from 2024 also identifies the Desmond J. Mahesa Mock Court Building as a mock-court venue; availability and usage arrangements must be confirmed directly."}
          </p>
          <SourceLink href={externalLinks.facilities} label={isIndonesian ? "Galeri Sarana & Prasarana" : "Facilities gallery"} />
        </div>
      </section>

      {/* Grid of Main Facilities */}
      <section className="content-width facility-cards">
        {facilityItems.map(([Icon, title, description]) => {
          const IconComponent = Icon as typeof Building2;
          return (
            <article className="facility-card" key={title as string}>
              <div className="icon-disc">
                <IconComponent size={20} />
              </div>
              <h3>{title as string}</h3>
              <p>{description as string}</p>
            </article>
          );
        })}
      </section>

      {/* Library Banner */}
      <section className="content-width library-banner">
        <div>
          <p className="eyebrow">{isIndonesian ? "Jejak belajar" : "Study trace"}</p>
          <h2>{isIndonesian ? "Dua jalur untuk mencari rujukan hukum." : "Two routes to find legal references."}</h2>
          <p>
            {isIndonesian
              ? "Portal Perpustakaan ULM menyediakan pintu masuk Layanan, Koleksi, Panduan, Repository, dan E-Resources. Sementara itu, berita resmi ULM mencatat Hukumonline Corner di FH ULM sebagai rujukan tambahan untuk database hukum. Persyaratan akses tiap layanan perlu diperiksa langsung pada kanalnya."
              : "The ULM Library portal provides entry points to Services, Collections, Guides, Repository, and E-Resources. Separately, official ULM news records the Hukumonline Corner at FH ULM as an additional route to a legal database. Check each service’s current access conditions directly."}
          </p>
          <div className="source-row" style={{ marginTop: "18px" }}>
            <SourceLink href={externalLinks.library} label={isIndonesian ? "UPA Perpustakaan ULM" : "ULM Library"} />
            <SourceLink href={externalLinks.hukumonlineCorner} label={isIndonesian ? "Berita Hukumonline Corner" : "Hukumonline Corner news"} />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <Image
            src={imagery.materials}
            alt={
              isIndonesian
                ? "Ilustrasi editorial bahan studi hukum"
                : "Editorial illustration of law study materials"
            }
            width={1200}
            height={400}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <span className="image-note">{isIndonesian ? "Ilustrasi editorial" : "Editorial illustration"}</span>
        </div>
      </section>

      {/* Supporting & Clinical Infrastructure */}
      <section className="content-width split-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Sarana Pendukung & Klinis" : "Clinical & Support Facilities"}</p>
          <h2>{isIndonesian ? "Infrastruktur penunjang kompetensi hukum." : "Infrastructure supporting legal competence."}</h2>
          <p>
            {isIndonesian
              ? "Fasilitas klinis dan layanan terpadu yang memadukan teori akademik dengan advokasi serta pelayanan publik nyata di lingkungan FH ULM."
              : "Clinical facilities and integrated services bridging academic theory with advocacy and real public services at FH ULM."}
          </p>
        </div>
        <div className="fact-list">
          <div>
            <ShieldCheck size={19} />
            <span>
              <strong>{isIndonesian ? "LKBH ULM (Klinik Bantuan Hukum)" : "LKBH ULM (Legal Aid Clinic)"}</strong>
              <small>
                {isIndonesian
                  ? "Lembaga Konsultasi & Bantuan Hukum tertua di Kalsel, sarana praktik advokasi litigasi/non-litigasi cuma-cuma (pro bono) bagi masyarakat sekaligus laboratorium kemahiran hukum mahasiswa."
                  : "The oldest Legal Consultation & Aid Institute in South Kalimantan, providing pro bono litigation/non-litigation advocacy practice for the public and a clinical laboratory for students."}
              </small>
            </span>
          </div>
          <div>
            <Users size={19} />
            <span>
              <strong>{isIndonesian ? "Ruang Rapat & Seminar Soejono" : "Soejono Meeting & Seminar Room"}</strong>
              <small>
                {isIndonesian
                  ? "Ruang representatif untuk seminar akademik, diseminasi riset dosen dan mahasiswa, rapat senat/bagian keilmuan, serta pengujian naskah akademik hukum."
                  : "A representative hall for academic seminars, lecturer and student research dissemination, departmental meetings, and thesis defenses."}
              </small>
            </span>
          </div>
          <div>
            <BadgeCheck size={19} />
            <span>
              <strong>{isIndonesian ? "Pelayanan Terpadu Satu Pintu (PTSP)" : "Integrated One-Stop Service (PTSP)"}</strong>
              <small>
                {isIndonesian
                  ? "Layanan terpusat administrasi perkuliahan, legalisir ijazah, surat izin riset skripsi, serta informasi akademik mahasiswa yang terintegrasi di gedung utama."
                  : "Centralized hub for course administration, degree legalization, research permits, and integrated student academic information in the main building."}
              </small>
            </span>
          </div>
        </div>
        <div className="source-row">
          <SourceLink href={externalLinks.facilities} label={isIndonesian ? "Galeri Sarana & Prasarana" : "Facilities gallery"} />
          <SourceLink href={externalLinks.faculty} label={isIndonesian ? "Portal Utama FH ULM" : "FH ULM Main Portal"} />
        </div>
      </section>
    </>
  );
}
