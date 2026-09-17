"use client";
/** River Margin / shULM: source-aware institutional context is shown as a short legal-notebook record, not as an official profile. */
import { 
  BadgeCheck, 
  Landmark, 
  MapPin, 
  Milestone, 
  ExternalLink, 
  Award,
  ScrollText,
  Users,
  Flame
} from "lucide-react";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { SourceLink } from "@/components/SourceLink";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, admissionPathways, imagery } from "@/lib/site-data";

export default function About() {
  const { isIndonesian } = useLanguage();

  const milestones = isIndonesian
    ? [
        ["21 Sep 1958", "Yayasan Perguruan Tinggi Lambung Mangkurat didirikan; Letkol H. Hasan Basry ditunjuk sebagai Presiden/Rektor pertama, dan Fakultas Hukum menjadi salah satu dari empat fakultas pendiri."],
        ["1 Nov 1960", "ULM resmi dinegerikan menjadi Perguruan Tinggi Negeri (PTN) melalui Peraturan Pemerintah No. 41 Tahun 1960 (ditetapkan 29 Oktober 1960)."],
        ["1971", "Fakultas Hukum mulai menyelenggarakan bagian Hukum Tata Negara, Hukum Pidana, dan Hukum Perdata sebagai fokus keilmuan."],
        ["Era 2020–Kini", "Kurikulum 2020 memantapkan 4 Bagian Hukum dan 5 Program Kekhususan (PK), terakreditasi 'Baik Sekali' BAN-PT hingga Juni 2031."]
      ]
    : [
        ["21 Sep 1958", "Yayasan Perguruan Tinggi Lambung Mangkurat founded; Lt. Col. H. Hasan Basry appointed first President/Rector, Law among the four founding faculties."],
        ["1 Nov 1960", "ULM officially established as a State Public University (PTN) under Government Regulation No. 41 of 1960."],
        ["1971", "The Faculty of Law began running Constitutional, Criminal, and Civil Law study sections."],
        ["2020–Present", "Curriculum 2020 established 4 Legal Departments and 5 Specialization Tracks, accredited 'Baik Sekali' by BAN-PT through June 2031."]
      ];

  const missionPoints = isIndonesian
    ? [
        {
          title: "Pendidikan Bermutu & Kontekstual Lahan Basah",
          desc: "Menyelenggarakan pendidikan hukum yang bermutu, relevan, dan kontekstual terhadap dinamika hukum nasional dan lokal berbasis nilai kearifan lokal Kalimantan dan keberlanjutan lahan basah."
        },
        {
          title: "Riset Hukum Lingkungan & Adat Tropis",
          desc: "Mengembangkan riset hukum inovatif dan aplikatif dalam bidang hukum lingkungan, hukum adat, dan hukum agraria khas wilayah tropis."
        },
        {
          title: "Pengabdian Literasi & Akses Keadilan",
          desc: "Melaksanakan pengabdian kepada masyarakat secara berkelanjutan untuk meningkatkan literasi hukum dan memperkuat akses keadilan masyarakat lokal."
        },
        {
          title: "Tata Kelola Transparan (Zona Integritas)",
          desc: "Meningkatkan kualitas tata kelola program studi secara transparan dan akuntabel menuju predikat Wilayah Bebas dari Korupsi (WBK)."
        },
        {
          title: "Kemitraan Strategis Nasional & Global",
          desc: "Memperkuat kemitraan akademik dan institusi penegak hukum (Kejaksaan RI, Mahkamah Konstitusi, pengadilan) demi daya saing profesi lulusan."
        }
      ]
    : [
        {
          title: "Quality Education in Wetland Context",
          desc: "Deliver quality, relevant, and contextual legal education responding to national and local dynamics based on Kalimantan local wisdom and wetland sustainability."
        },
        {
          title: "Environmental & Tropical Adat Research",
          desc: "Develop innovative, applicable legal research in environmental law, customary law, and agrarian law specific to tropical regions."
        },
        {
          title: "Literacy Outreach & Access to Justice",
          desc: "Conduct sustainable community service to elevate legal literacy and strengthen legal access for local communities."
        },
        {
          title: "Transparent Governance (Integrity Zone)",
          desc: "Enhance study program governance transparency and accountability toward Corruption-Free Zone (WBK) status."
        },
        {
          title: "National & Global Strategic Partnerships",
          desc: "Strengthen academic and law enforcement partnerships (Kejaksaan RI, Constitutional Court, courts) for graduate career competitiveness."
        }
      ];

  return (
    <>
      <PageIntro
        label={isIndonesian ? "Tentang ULM & FH" : "About ULM & FH"}
        title={isIndonesian ? "Konteks kampus, dibaca dari sumber primer." : "Campus context, read from primary sources."}
        summary={isIndonesian ? "Ringkasan institusional ini memisahkan catatan sejarah 1958, profil S1 Ilmu Hukum, visi misi fakultas, pimpinan aktif, dan jalur masuk resmi." : "This institutional overview separates 1958 historical records, S1 Law profile, faculty vision & mission, active leadership, and official admission routes."}
        sourceCount={isIndonesian ? "PP No. 41/1960 • SK BAN-PT 2026" : "Gov Reg No. 41/1960 • BAN-PT 2026"}
      />

      {/* Sejarah & Marginalia Stack */}
      <section className="content-width dossier-grid">
        <article className="paper-panel long-form">
          <p className="eyebrow">{isIndonesian ? "Jejak Sejarah" : "Historical Record"}</p>
          <h2>{isIndonesian ? "Fakultas Hukum tumbuh bersama ULM sejak 1958." : "The Faculty of Law grew alongside ULM since 1958."}</h2>
          <p>
            {isIndonesian
              ? "Sejarah resmi Universitas Lambung Mangkurat mencatat universitas ini didirikan pada 21 September 1958 atas inisiatif Dewan Lambung Mangkurat (wadah pejuang kemerdekaan Kalimantan Selatan) dengan Letkol H. Hasan Basry sebagai Presiden/Rektor pertama. Fakultas Hukum berdiri sejak hari pertama sebagai salah satu dari empat fakultas pendiri universitas."
              : "Official ULM history records that the university was founded on 21 September 1958 on the initiative of the Lambung Mangkurat Council (South Kalimantan independence fighters) with Lt. Col. H. Hasan Basry as first President/Rector. The Faculty of Law was present from day one as one of the four founding faculties."}
          </p>
          <p>
            {isIndonesian
              ? "Ketika ULM dialihkan statusnya menjadi Perguruan Tinggi Negeri (PTN) melalui Peraturan Pemerintah No. 41 Tahun 1960 pada 1 November 1960, Fakultas Hukum tetap menjadi pilar utama pendidikan tinggi hukum di Pulau Kalimantan. Nama universitas mengabadikan Lambung Mangkurat, figur historis Kerajaan Negaradipa pembawa tatanan hukum dan keteraturan di Tanah Banjar."
              : "When ULM was established as a public state university (PTN) under Government Regulation No. 41 of 1960 on 1 November 1960, the Faculty of Law remained a primary pillar of higher legal education in Kalimantan. The university honors Lambung Mangkurat, a historical figure of the Negaradipa Kingdom associated with legal order in Banjar lands."}
          </p>

          <div className="timeline">
            {milestones.map(([date, text]) => (
              <div className="timeline-item" key={date}>
                <span style={{ whiteSpace: "nowrap" }}>{date}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="source-row" style={{ marginTop: "24px" }}>
            <SourceLink href={externalLinks.ulmHistory} label={isIndonesian ? "Sejarah Resmi ULM" : "ULM Official History"} />
            <SourceLink href={externalLinks.facultyHistory} label={isIndonesian ? "Sejarah Fakultas Hukum" : "Faculty of Law History"} />
          </div>
        </article>

        <aside className="marginalia-stack">
          <div className="marginalia-card">
            <Landmark size={20} />
            <p className="eyebrow">{isIndonesian ? "Program Studi" : "Study Programme"}</p>
            <strong>{isIndonesian ? "S1 Ilmu Hukum (Prodi 74201)" : "Undergraduate Law (Prodi 74201)"}</strong>
            <p>{isIndonesian ? "Pendidikan sarjana hukum dengan 4 Bagian dan 5 Program Kekhususan (PK), terakreditasi 'Baik Sekali' BAN-PT." : "Undergraduate law degree featuring 4 Departments and 5 Specialization Tracks, accredited 'Baik Sekali' by BAN-PT."}</p>
            <div style={{ marginTop: "14px" }}>
              <SourceLink href={externalLinks.curriculum} label={isIndonesian ? "Kurikulum 2020" : "Curriculum 2020"} />
            </div>
          </div>

          <div className="marginalia-card">
            <MapPin size={20} />
            <p className="eyebrow">{isIndonesian ? "Lokasi Kampus" : "Campus Location"}</p>
            <strong>{isIndonesian ? "Kampus I Banjarmasin & Kampus II Banjarbaru" : "Campus I Banjarmasin & Campus II Banjarbaru"}</strong>
            <p>{isIndonesian ? "Kampus utama FH ULM berlokasi di Jl. Brigjend H. Hasan Basri, Kayu Tangi, Banjarmasin Utara 70124." : "Main FH ULM campus located at Jl. Brigjend H. Hasan Basri, Kayu Tangi, North Banjarmasin 70124."}</p>
            <div style={{ marginTop: "14px" }}>
              <SourceLink href={externalLinks.faculty} label={isIndonesian ? "Portal Fakultas" : "Faculty Portal"} />
            </div>
          </div>

          <div className="marginalia-card">
            <Flame size={20} />
            <p className="eyebrow">{isIndonesian ? "Semboyan & Nilai" : "Motto & Ethos"}</p>
            <strong>WASAKA</strong>
            <p>{isIndonesian ? "“Waja Sampai Kaputing” (Baja hingga ke ujung) — melambangkan tekad baja, pantang menyerah, dan integritas moral sivitas akademika." : "“Waja Sampai Kaputing” (Steel to the very end) — embodying resolute grit, perseverance, and ethical integrity."}</p>
          </div>
        </aside>
      </section>

      {/* Feature Photo Grid: Campus Heritage & Identity */}
      <section className="content-width feature-photo-grid" style={{ marginTop: "64px" }}>
        <figure className="official-photo">
          <Image
            src={imagery.rektorat}
            alt={isIndonesian ? "Gedung Rektorat dan Kampus Universitas Lambung Mangkurat" : "Universitas Lambung Mangkurat Campus"}
            width={1000}
            height={600}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <figcaption>
            <span>{isIndonesian ? "Kampus Utama ULM" : "ULM Main Campus"}</span>
            <a href={externalLinks.ulm} target="_blank" rel="noreferrer">
              {isIndonesian ? "Banjarmasin, Kalimantan Selatan" : "Banjarmasin, South Kalimantan"} <ExternalLink size={13} />
            </a>
          </figcaption>
        </figure>
        <div className="feature-photo-copy">
          <p className="eyebrow">{isIndonesian ? "Identitas & Warisan" : "Identity & Heritage"}</p>
          <h2>{isIndonesian ? "Kampus tertua di Kalimantan Selatan." : "Oldest public university in South Kalimantan."}</h2>
          <p>
            {isIndonesian
              ? "Universitas Lambung Mangkurat (ULM) adalah perguruan tinggi negeri pertama dan terbesar di Kalimantan Selatan. Berdiri sejak 1958, universitas ini memadukan tradisi keilmuan yang kokoh dengan orientasi lingkungan lahan basah tropis."
              : "Universitas Lambung Mangkurat (ULM) is the first and largest public university in South Kalimantan. Founded in 1958, it pairs a steadfast scholarly tradition with a unique orientation toward tropical wetlands."}
          </p>
          <p>
            {isIndonesian
              ? "Fakultas Hukum ULM menaungi 4 Bagian (Hukum Pidana, Perdata, Tata Negara, dan Acara) serta melahirkan ribuan praktisi hukum yang berkiprah di Mahkamah Agung, Kejaksaan RI, kementerian, advokatur, dan akademisi."
              : "FH ULM encompasses 4 Departments (Criminal, Civil, Constitutional, and Procedural Law) and has graduated thousands of legal practitioners serving in the Supreme Court, Kejaksaan RI, ministries, advocacy, and academia."}
          </p>
          <div style={{ marginTop: "16px" }}>
            <SourceLink href={externalLinks.ulm} label={isIndonesian ? "Situs Resmi ULM" : "Official ULM Site"} />
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="content-width split-section" style={{ marginTop: "88px" }}>
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Visi & Misi S1 Hukum" : "S1 Law Vision & Mission"}</p>
          <h2>{isIndonesian ? "Fondasi akademik dan keadilan ekologis." : "Academic foundation and ecological justice."}</h2>
          <p>
            {isIndonesian
              ? "Berdasarkan dokumen resmi Program Studi Sarjana (S1) FH ULM, fokus pendidikan mengintegrasikan kearifan lokal lahan basah tropis Kalimantan dengan daya saing global."
              : "Based on official FH ULM Undergraduate (S1) documents, the academic focus integrates tropical wetland local wisdom with global competitiveness."}
          </p>
          <div style={{ marginTop: "24px" }}>
            <SourceLink href={externalLinks.faculty} label={isIndonesian ? "Profil S1 FH ULM" : "FH ULM S1 Profile"} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="paper-panel" style={{ padding: "28px 32px" }}>
            <p className="eyebrow" style={{ color: "var(--clay)", fontWeight: 800, fontSize: "10px", letterSpacing: "0.12em" }}>
              {isIndonesian ? "VISI RESMI PROGRAM STUDI S1 HUKUM" : "OFFICIAL S1 LAW PROGRAMME VISION"}
            </p>
            <blockquote style={{ margin: "14px 0 0", fontStyle: "italic", fontFamily: "var(--serif)", fontSize: "18px", lineHeight: 1.5, color: "var(--ink-deep)" }}>
              {isIndonesian
                ? "“Menjadi pusat pengembangan ilmu hukum yang unggul dalam bidang hukum lingkungan dan hukum adat wilayah tropis lahan basah, berbasis pada nilai-nilai kearifan lokal Kalimantan dan berorientasi pada keadilan ekologis serta daya saing global.”"
                : "“To become a center for legal science development excelling in environmental law and customary law of tropical wetlands, based on Kalimantan local wisdom and oriented toward ecological justice and global competitiveness.”"}
            </blockquote>
          </div>

          <div className="fact-list">
            {missionPoints.map((m, idx) => (
              <div key={idx}>
                <ScrollText size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
                <span>
                  <strong>{m.title}</strong>
                  <small>{m.desc}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jalur Penerimaan (Admission Pathways) */}
      <section className="content-width split-section" style={{ marginTop: "88px" }}>
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Jalur Penerimaan" : "Admission Pathways"}</p>
          <h2>{isIndonesian ? "Cara masuk FH ULM." : "How to enter FH ULM."}</h2>
          <p>
            {isIndonesian
              ? "Penerimaan mahasiswa baru Program Sarjana S1 Hukum diselenggarakan melalui dua jalur seleksi nasional (SNPMB) dan satu jalur mandiri berbasis komputer yang dikelola ULM."
              : "Undergraduate law admission is held through two national selection pathways (SNPMB) and one computer-based independent selection managed by ULM."}
          </p>
          <div style={{ marginTop: "24px" }}>
            <SourceLink href="https://snpmb.id/" label={isIndonesian ? "Portal SNPMB" : "SNPMB Portal"} />
          </div>
        </div>

        <div>
          <div className="fact-list">
            {admissionPathways.map((path) => {
              const targetUrl = path.url || (path.type === "national" ? "https://snpmb.id/" : "https://admisi.ulm.ac.id/");
              const domainLabel = path.type === "national" ? "snpmb.id" : "admisi.ulm.ac.id";
              return (
                <div key={path.id}>
                  <BadgeCheck size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ display: "grid", gap: "4px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                      <strong>{isIndonesian ? path.id : path.en}</strong>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "var(--clay)",
                          borderBottom: "1px solid rgba(178,77,57,0.35)"
                        }}
                      >
                        {domainLabel} <ExternalLink size={12} />
                      </a>
                    </div>
                    <small>{isIndonesian ? path.descId : path.descEn}</small>
                    {(path as any).statsId && (
                      <small style={{ color: "var(--ink)", fontSize: "11px", fontWeight: 600, opacity: 0.85, marginTop: "2px" }}>
                        ℹ️ {isIndonesian ? (path as any).statsId : (path as any).statsEn}
                      </small>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="source-row" style={{ marginTop: "20px" }}>
            <SourceLink href="https://snpmb.id/" label={isIndonesian ? "Portal Resmi SNPMB" : "Official SNPMB Portal"} />
            <SourceLink href="https://admisi.ulm.ac.id/" label={isIndonesian ? "Admisi Mandiri ULM (UTMBK)" : "ULM Independent Admission (UTMBK)"} />
          </div>
        </div>
      </section>

      {/* Status Saat Ini & Kepemimpinan */}
      <section className="content-width split-section" style={{ marginTop: "88px" }}>
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Status & Kepemimpinan" : "Status & Leadership"}</p>
          <h2>{isIndonesian ? "Status institusi yang perlu dicatat." : "Institutional status worth recording."}</h2>
          <p>
            {isIndonesian
              ? "Seluruh data akreditasi dan susunan pimpinan di bawah disarikan langsung dari ketetapan resmi BAN-PT dan laman publik FH ULM."
              : "All accreditation records and leadership roles below are directly drawn from official BAN-PT determinations and public FH ULM pages."}
          </p>
        </div>

        <div>
          <div className="fact-list">
            <div>
              <BadgeCheck size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Akreditasi S1 Hukum: Baik Sekali" : "Undergraduate Law Accreditation: Baik Sekali"}</strong>
                <small>
                  {isIndonesian
                    ? "BAN-PT peringkat “Baik Sekali”; SK No. 6691/SK/BAN-PT/Ak/S/VI/2026; berlaku efektif 2 Juni 2026 hingga 2 Juni 2031."
                    : "BAN-PT “Baik Sekali”; Decree No. 6691/SK/BAN-PT/Ak/S/VI/2026; valid from 2 June 2026 to 2 June 2031."}
                </small>
              </span>
            </div>

            <div>
              <Award size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Akreditasi Institusi Universitas: Unggul" : "University Institutional Accreditation: Unggul"}</strong>
                <small>
                  {isIndonesian
                    ? "Universitas Lambung Mangkurat menyandang predikat akreditasi perguruan tinggi 'Unggul' dari BAN-PT di Kalimantan Selatan."
                    : "Universitas Lambung Mangkurat holds the highest 'Unggul' institutional university accreditation from BAN-PT in South Kalimantan."}
                </small>
              </span>
            </div>

            <div>
              <Milestone size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Pimpinan Universitas (Rektor ULM)" : "University Leadership (ULM Rector)"}</strong>
                <small>
                  {isIndonesian
                    ? "Prof. Dr. Ahmad Alim Bachri tercantum sebagai Rektor pada halaman pimpinan resmi Universitas Lambung Mangkurat."
                    : "Prof. Dr. Ahmad Alim Bachri is listed as Rector on the official Universitas Lambung Mangkurat leadership page."}
                </small>
              </span>
            </div>

            <div>
              <Users size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Pimpinan Fakultas (Dekan FH ULM)" : "Faculty Leadership (Dean of FH ULM)"}</strong>
                <small>
                  {isIndonesian
                    ? "Dr. Hj. Erlina, S.H., M.H. menjabat sebagai Dekan Fakultas Hukum ULM (resmi dilantik Juli 2026), didukung jajaran Wakil Dekan bidang akademik, umum, dan kemahasiswaan."
                    : "Dr. Hj. Erlina, S.H., M.H. serves as Dean of the Faculty of Law (inaugurated July 2026), supported by Vice Deans for academic, general, and student affairs."}
                </small>
              </span>
            </div>
          </div>

          <div className="source-row" style={{ marginTop: "20px" }}>
            <SourceLink href={externalLinks.accreditation} label={isIndonesian ? "Akreditasi FH ULM" : "FH ULM Accreditation"} />
            <SourceLink href={externalLinks.facultyLeadership} label={isIndonesian ? "Pimpinan FH ULM" : "FH ULM Leadership"} />
            <SourceLink href={externalLinks.ulmLeadership} label={isIndonesian ? "Pimpinan ULM" : "ULM Leadership"} />
          </div>
        </div>
      </section>
    </>
  );
}
