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
        ["21 Sep 1958", "Yayasan Perguruan Tinggi Lambung Mangkurat berdiri dipimpin Letkol H. Hasan Basry; Fakultas Hukum menjadi satu dari empat fakultas pendiri."],
        ["1 Nov 1960", "ULM resmi menjadi PTN lewat Peraturan Pemerintah No. 41 Tahun 1960."],
        ["1971", "Fakultas Hukum membuka bagian Tata Negara, Pidana, dan Perdata sebagai fokus keilmuan."],
        ["2020–Sekarang", "Kurikulum 2020 menetapkan 4 Bagian dan 5 Program Kekhususan (PK), terakreditasi 'Baik Sekali' BAN-PT hingga Juni 2031."]
      ]
    : [
        ["21 Sep 1958", "Yayasan Perguruan Tinggi Lambung Mangkurat founded under Lt. Col. H. Hasan Basry; Law was one of four founding faculties."],
        ["1 Nov 1960", "ULM officially became a state university (PTN) under Government Regulation No. 41 of 1960."],
        ["1971", "Faculty of Law opened Constitutional, Criminal, and Civil Law study sections."],
        ["2020–Present", "Curriculum 2020 set 4 departments and 5 specializations; accredited 'Baik Sekali' by BAN-PT through June 2031."]
      ];

  const missionPoints = isIndonesian
    ? [
        {
          title: "Pendidikan Bermutu Khas Lahan Basah",
          desc: "Menyelenggarakan pendidikan hukum yang relevan dengan kebutuhan nasional dan daerah, berakar pada kearifan lokal Kalimantan dan lingkungan lahan basah."
        },
        {
          title: "Riset Lingkungan & Hukum Adat Tropis",
          desc: "Mengembangkan riset hukum terapan di bidang lingkungan hidup, hukum adat, dan agraria wilayah tropis."
        },
        {
          title: "Pengabdian & Literasi Hukum Warga",
          desc: "Memberikan pengabdian masyarakat secara berkelanjutan untuk meningkatkan kesadaran hukum dan membuka akses keadilan."
        },
        {
          title: "Tata Kelola Bersih & Transparan",
          desc: "Menjalankan tata kelola program studi yang terbuka dan akuntabel menuju Zona Integritas (WBK)."
        },
        {
          title: "Kemitraan Lembaga Penegak Hukum",
          desc: "Memperkuat kerja sama dengan Kejaksaan, Mahkamah Konstitusi, dan pengadilan untuk menyiapkan masa depan lulusan."
        }
      ]
    : [
        {
          title: "Quality Legal Education in Wetland Context",
          desc: "Provide high-quality legal education responsive to national and regional needs, rooted in Kalimantan wisdom and wetland ecology."
        },
        {
          title: "Environmental & Tropical Customary Law Research",
          desc: "Conduct applied legal research in environmental protection, customary (adat) law, and tropical land law."
        },
        {
          title: "Legal Literacy & Access to Justice",
          desc: "Deliver ongoing community service to expand legal awareness and strengthen access to justice for local communities."
        },
        {
          title: "Clean & Transparent Governance",
          desc: "Promote transparent and accountable study program management toward Corruption-Free Zone (WBK) status."
        },
        {
          title: "Strategic Partnerships with Legal Institutions",
          desc: "Partner with law enforcement bodies (Prosecution Service, Constitutional Court, judiciary) to prepare graduates for careers."
        }
      ];

  return (
    <>
      <PageIntro
        label={isIndonesian ? "Tentang ULM & FH" : "About ULM & FH"}
        title={isIndonesian ? "Profil dan sejarah kampus berdasar data resmi." : "Campus history and profile based on official records."}
        summary={isIndonesian ? "Halaman ini merangkum sejarah sejak 1958, profil S1 Ilmu Hukum, visi misi, pimpinan kampus, dan jalur masuk resmi." : "An overview of ULM's history since 1958, S1 Law profile, vision and mission, leadership, and official admission routes."}
        sourceCount={isIndonesian ? "PP No. 41/1960 • SK BAN-PT 2026" : "Gov Reg No. 41/1960 • BAN-PT 2026"}
      />

      {/* Sejarah & Marginalia Stack */}
      <section className="content-width dossier-grid">
        <article className="paper-panel long-form">
          <p className="eyebrow">{isIndonesian ? "Jejak Sejarah" : "Historical Record"}</p>
          <h2>{isIndonesian ? "Fakultas Hukum tumbuh bersama ULM sejak 1958." : "The Faculty of Law grew alongside ULM since 1958."}</h2>
          <p>
            {isIndonesian
              ? "Universitas Lambung Mangkurat didirikan pada 21 September 1958 oleh pejuang kemerdekaan Kalimantan Selatan (Dewan Lambung Mangkurat), dipimpin Letkol H. Hasan Basry sebagai rektor pertama. Fakultas Hukum langsung menjadi satu dari empat fakultas pendiri universitas."
              : "ULM was founded on 21 September 1958 by South Kalimantan independence veterans (the Lambung Mangkurat Council), with Lt. Col. H. Hasan Basry as its first rector. The Faculty of Law was one of the university's four founding faculties from day one."}
          </p>
          <p>
            {isIndonesian
              ? "Pada 1 November 1960, ULM resmi menjadi Perguruan Tinggi Negeri (PTN) lewat Peraturan Pemerintah No. 41 Tahun 1960. Sejak saat itu, Fakultas Hukum terus menjadi pusat pendidikan hukum utama di Kalimantan. Nama ULM diambil dari Lambung Mangkurat, figur Kerajaan Negara Dipa yang dikenal membawa ketertiban hukum di Tanah Banjar."
              : "On 1 November 1960, ULM officially became a state university under Government Regulation No. 41 of 1960. Since then, the Faculty of Law has remained a primary center for legal education in Kalimantan. The university is named after Lambung Mangkurat, a historical Negaradipa figure who brought legal order to Banjar lands."}
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
            <p>{isIndonesian ? "“Waja Sampai Kaputing” (Baja hingga akhir) — melambangkan tekad kuat, pantang menyerah, dan integritas moral." : "“Waja Sampai Kaputing” (Steel to the very end) — steadfast grit, perseverance, and high moral integrity."}</p>
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
              ? "Universitas Lambung Mangkurat (ULM) adalah perguruan tinggi negeri pertama dan terbesar di Kalimantan Selatan. Berdiri sejak 1958, kampus ini memadukan tradisi akademik yang kokoh dengan fokus kajian lingkungan lahan basah tropis."
              : "Universitas Lambung Mangkurat (ULM) is the oldest and largest public university in South Kalimantan. Founded in 1958, it blends strong academic tradition with a focus on tropical wetland environments."}
          </p>
          <p>
            {isIndonesian
              ? "Fakultas Hukum ULM menaungi 4 Bagian (Pidana, Perdata, Tata Negara, dan Acara) serta meluluskan ribuan praktisi hukum yang berkiprah di Mahkamah Agung, Kejaksaan RI, kementerian, advokat, dan akademisi."
              : "FH ULM encompasses 4 Departments (Criminal, Civil, Constitutional, and Procedural Law) and has graduated thousands of legal professionals serving in the Supreme Court, Prosecution Service, ministries, law firms, and academia."}
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
              ? "Program Studi S1 Ilmu Hukum FH ULM memadukan kearifan lokal lahan basah Kalimantan dengan keahlian hukum yang berdaya saing global."
              : "FH ULM's Undergraduate Law program integrates Kalimantan wetland wisdom with globally competitive legal skills."}
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
              ? "Penerimaan mahasiswa baru S1 Hukum dibuka melalui dua seleksi nasional (SNBP dan SNBT) serta satu seleksi mandiri berbasis komputer (UTMBK) yang dikelola ULM."
              : "Admission to the S1 Law program is available through two national pathways (SNBP and SNBT) and one university-run computer test (UTMBK)."}
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
          <h2>{isIndonesian ? "Status institusi dan pimpinan aktif." : "Institutional status and leadership."}</h2>
          <p>
            {isIndonesian
              ? "Data akreditasi dan susunan pimpinan di bawah bersumber langsung dari ketetapan resmi BAN-PT dan situs publik FH ULM."
              : "Accreditation records and leadership roles below come directly from official BAN-PT determinations and the FH ULM website."}
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
                    ? "Peringkat “Baik Sekali” dari BAN-PT (SK No. 6691/SK/BAN-PT/Ak/S/VI/2026), berlaku 2 Juni 2026 sampai 2 Juni 2031."
                    : "Ranked “Baik Sekali” by BAN-PT (Decree No. 6691/SK/BAN-PT/Ak/S/VI/2026), valid from 2 June 2026 to 2 June 2031."}
                </small>
              </span>
            </div>

            <div>
              <Award size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Akreditasi Institusi Universitas: Unggul" : "University Institutional Accreditation: Unggul"}</strong>
                <small>
                  {isIndonesian
                    ? "Universitas Lambung Mangkurat menyandang akreditasi institusi 'Unggul' dari BAN-PT."
                    : "Universitas Lambung Mangkurat holds 'Unggul' institutional university accreditation from BAN-PT."}
                </small>
              </span>
            </div>

            <div>
              <Milestone size={19} style={{ color: "var(--clay)", flexShrink: 0, marginTop: "2px" }} />
              <span>
                <strong>{isIndonesian ? "Pimpinan Universitas (Rektor ULM)" : "University Leadership (ULM Rector)"}</strong>
                <small>
                  {isIndonesian
                    ? "Prof. Dr. Ahmad Alim Bachri tercantum sebagai Rektor pada laman resmi Universitas Lambung Mangkurat."
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
                    ? "Dr. Hj. Erlina, S.H., M.H. menjabat sebagai Dekan Fakultas Hukum ULM (dilantik Juli 2026), didukung jajaran Wakil Dekan."
                    : "Dr. Hj. Erlina, S.H., M.H. serves as Dean of the Faculty of Law (inaugurated July 2026), supported by Vice Deans."}
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
