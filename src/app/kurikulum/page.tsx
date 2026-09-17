"use client";
/** River Margin / shULM: curriculum content prioritises the official 2020 PDF, with research context clearly separated from formal course rules. */
import {
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceLink } from "@/components/SourceLink";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  criminalElectiveCourses,
  criminalRequiredCourses,
  externalLinks,
  semesterFocus,
  specializationPolicy,
} from "@/lib/site-data";

export default function Curriculum() {
  const { isIndonesian } = useLanguage();

  return (
    <>
      <PageIntro
        label={isIndonesian ? "Kurikulum" : "Curriculum"}
        title={isIndonesian ? "Kajian Hukum Pidana di ULM." : "Criminal Law Studies at ULM."}
        summary={
          isIndonesian
            ? "Peminatan Hukum Pidana adalah jalur belajar paling relevan bagi calon jaksa. Ini adalah fokus akademik, bukan jaminan penerimaan kerja otomatis."
            : "The Criminal Law specialization is the most relevant academic track for aspiring prosecutors. It is a study path, not an automatic hiring guarantee."
        }
        sourceCount={isIndonesian ? "Kurikulum 2020 • Dokumen Resmi" : "Curriculum 2020 • Official Document"}
      />

      <section className="content-width track-callout">
        <div className="track-icon">
          <Scale size={26} />
        </div>
        <div>
          <p className="eyebrow">{isIndonesian ? "Peminatan" : "Specialization"}</p>
          <h2>{isIndonesian ? "Program Kekhususan Hukum Pidana" : "Criminal Law Specialization Track"}</h2>
          <p>
            {isIndonesian
              ? "Kajian Hukum Pidana FH ULM mencakup hukum pidana materiil, hukum acara, hukum lingkungan dan sumber daya alam, kejahatan ekonomi, siber, hingga perbandingan hukum."
              : "Criminal Law at FH ULM covers substantive law, criminal procedure, environmental and resource crimes, economic crimes, cybercrime, and comparative law."}
          </p>
        </div>
        <SourceLink href={externalLinks.pidana} label={isIndonesian ? "Bagian Hukum Pidana" : "Criminal Law Section"} />
      </section>

      <section className="content-width split-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Fokus Kajian" : "Study Focus"}</p>
          <h2>{isIndonesian ? "Mata kuliah hukum yang berakar di Kalimantan." : "Law courses rooted in the Kalimantan context."}</h2>
          <p>
            {isIndonesian
              ? "Kajian pidana di FH ULM terhubung erat dengan kondisi bentang alam lahan basah, industri sumber daya alam, dan pembaruan hukum pidana nasional."
              : "Criminal law at FH ULM connects closely with wetland environments, resource industries, and national legal reforms."}
          </p>
        </div>
        <div className="fact-list">
          <div>
            <Scale size={19} />
            <span>
              <strong>{isIndonesian ? "Lingkungan & sumber daya alam" : "Environment & natural resources"}</strong>
              <small>
                {isIndonesian
                  ? "Kajian pidana FH ULM memberi perhatian khusus pada isu lingkungan hidup dan kehutanan, termasuk lewat mata kuliah resmi Tindak Pidana di Bidang Sumber Daya Alam."
                  : "FH ULM emphasizes environmental and forestry law, including the official course Crimes in the Natural Resources Sector."}
              </small>
            </span>
          </div>
          <div>
            <BookOpenCheck size={19} />
            <span>
              <strong>{isIndonesian ? "Praktik persidangan & pembaruan hukum" : "Court practice & legal updates"}</strong>
              <small>
                {isIndonesian
                  ? "Mata kuliah Hukum Acara Pidana, Praktik Peradilan Pidana, dan Tindak Pidana Telematika melatih keahlian litigasi mahasiswa. Jadwal kelas mengikuti penawaran semester aktif di fakultas."
                  : "Courses like Criminal Procedure, Moot Court Practice, and Telematics Crime train students in practical courtroom skills. Class schedules follow current semester offerings."}
              </small>
            </span>
          </div>
        </div>
        <div className="source-row">
          <SourceLink href={externalLinks.pidana} label={isIndonesian ? "Fokus Bagian Pidana" : "Criminal Law Section focus"} />
          <SourceLink href={externalLinks.curriculumPdf} label={isIndonesian ? "PDF Kurikulum 2020" : "Curriculum 2020 PDF"} />
          <SourceLink href={externalLinks.curriculum} label={isIndonesian ? "Portal Kurikulum FH ULM" : "FH ULM Curriculum Portal"} />
        </div>
      </section>

      <section className="content-width curriculum-layout">
        <div>
          <div className="section-heading compact">
            <p className="eyebrow">{isIndonesian ? "Sebaran Semester" : "Semester Breakdown"}</p>
            <h2>{isIndonesian ? "Alur perkuliahan S1." : "Undergraduate study path."}</h2>
            <p>
              {isIndonesian
                ? "Sebaran beban studi tiap semester berdasarkan dokumen Kurikulum 2020 S1 Ilmu Hukum."
                : "Course credit distribution per semester based on the official 2020 Undergraduate Law Curriculum."}
            </p>
          </div>
          <div className="semester-rail">
            {semesterFocus.map((item) => (
              <article className="semester-card" key={item.semester}>
                <span className="semester-number">{item.semester}</span>
                <div>
                  <strong>{isIndonesian ? item.credits : (item.creditsEn || item.credits)}</strong>
                  <p>{isIndonesian ? item.id : item.en}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="notice-box">
            <BookOpenCheck size={19} />
            <p>
              {isIndonesian
                ? "Tabel ini merangkum fokus utama tiap semester. Buka PDF resmi untuk melihat daftar mata kuliah lengkap, syarat prasyarat, dan penawaran kelas semester ini."
                : "This table summarizes each semester's main focus. Download the official PDF for the full course list, prerequisites, and active schedules."}
            </p>
            <a href={externalLinks.curriculumPdf} target="_blank" rel="noreferrer">
              <Download size={16} className="text-inherit" />
              {isIndonesian ? "Unduh PDF resmi" : "Download official PDF"}
            </a>
          </div>
        </div>
        <aside className="curriculum-side-note">
          <ShieldCheck size={21} className="mb-3 block" />
          <p className="eyebrow">{isIndonesian ? "Batas data" : "Data boundary"}</p>
          <h3>{isIndonesian ? "Dokumen resmi tetap menjadi rujukan utama." : "The official document remains the main reference."}</h3>
          <p>
            {isIndonesian
              ? "Untuk jumlah SKS pasti, daftar mata kuliah pilihan bebas, jadwal kuliah, dan dosen pengampu, selalu rujuk dokumen resmi Kurikulum 2020 dan portal SIMARI ULM."
              : "For exact credits, elective options, class schedules, and instructors, always refer to the official Curriculum 2020 document and the SIMARI portal."}
          </p>
        </aside>
      </section>

      <section className="content-width split-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Mekanisme Peminatan" : "Specialization Policy"}</p>
          <h2>{isIndonesian ? "Syarat memilih PK Hukum Pidana." : "Requirements for Criminal Law."}</h2>
          <p>
            {isIndonesian
              ? "Tahapan pemilihan peminatan program kekhususan dan administrasi berkas di FH ULM."
              : "Steps for selecting a specialization track and handling coursework paperwork at FH ULM."}
          </p>
        </div>
        <div className="fact-list">
          <div>
            <GraduationCap size={19} />
            <span>
              <strong>{isIndonesian ? "Waktu Pemilihan Program Kekhususan" : "Specialization Selection Window"}</strong>
              <small>
                {isIndonesian
                  ? `Pengajuan peminatan dibuka pada ${specializationPolicy.selectionSemester}, setelah mahasiswa menuntaskan mata kuliah dasar hukum.`
                  : `Students select their specialization in ${specializationPolicy.selectionSemester}, after completing core law courses.`}
              </small>
            </span>
          </div>
          <div>
            <ShieldCheck size={19} />
            <span>
              <strong>{isIndonesian ? "Penilai & Kriteria Seleksi" : "Reviewer & Selection Criteria"}</strong>
              <small>
                {isIndonesian
                  ? `Diseleksi oleh ${specializationPolicy.evaluator} berdasarkan: ${specializationPolicy.criteriaId}`
                  : `Reviewed by ${specializationPolicy.evaluator} based on: ${specializationPolicy.criteriaEn}`}
              </small>
            </span>
          </div>
          <div>
            <FileText size={19} />
            <span>
              <strong>{isIndonesian ? "Warna Map Berkas & Skripsi" : "Folder Color & Thesis Submission"}</strong>
              <small>
                {isIndonesian
                  ? `${specializationPolicy.folderColor} Digunakan untuk pengajuan judul, seminar proposal, hingga pendaftaran sidang skripsi.`
                  : `${specializationPolicy.folderColor} Used for thesis topic proposals, proposal defense, and final exam registration.`}
              </small>
            </span>
          </div>
        </div>
        <div className="source-row">
          <SourceLink href={externalLinks.pidana} label={isIndonesian ? "Bagian Hukum Pidana" : "Criminal Law Section"} />
          <SourceLink href={externalLinks.curriculum} label={isIndonesian ? "Formasi Kurikulum FH ULM" : "FH ULM Curriculum Formation"} />
        </div>
      </section>

      <section className="content-width course-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Mata kuliah wajib" : "Required courses"}</p>
          <h2>{isIndonesian ? "Enam mata kuliah PK Hukum Pidana." : "Six Criminal Law specialization courses."}</h2>
          <p>{isIndonesian ? "Masing-masing tercantum sebagai 2 SKS dalam dokumen Kurikulum 2020." : "Each is listed as 2 credits in the Curriculum 2020 document."}</p>
        </div>
        <div className="course-list">
          {criminalRequiredCourses.map((course) => (
            <div className="course-row" key={course.code}>
              <code>{course.code}</code>
              <span>{isIndonesian ? course.id : course.en}</span>
              <strong className="whitespace-nowrap">{isIndonesian ? "2 SKS" : "2 Credits"}</strong>
            </div>
          ))}
        </div>
        <SourceLink href={externalLinks.pidana} label={isIndonesian ? "Daftar wajib Bagian Pidana" : "Criminal Law required list"} />
      </section>

      <section className="content-width elective-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Pilihan Bebas" : "Free Electives"}</p>
          <h2>{isIndonesian ? "Pilihan mata kuliah tambahan." : "Additional elective courses."}</h2>
          <p>
            {isIndonesian
              ? "Mata kuliah pilihan di bawah bernilai 2 SKS per mata kuliah sesuai dokumen resmi Kurikulum 2020."
              : "Elective courses below are worth 2 credits each in the official Curriculum 2020 document."}
          </p>
        </div>
        <div className="elective-grid">
          {criminalElectiveCourses.map((course, index) => (
            <div className="elective-item" key={course.code}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <code>{course.code}</code>
                <p>{isIndonesian ? course.id : course.en}</p>
              </div>
              <small className="whitespace-nowrap">{isIndonesian ? "2 SKS" : "2 Credits"}</small>
            </div>
          ))}
        </div>
        <SourceLink href={externalLinks.curriculumPdf} label={isIndonesian ? "PDF Kurikulum 2020, hlm. 3–4" : "Curriculum 2020 PDF, pp. 3–4"} />
      </section>

      <section className="content-width split-section">
        <div className="section-heading">
          <p className="eyebrow">{isIndonesian ? "Kalender Akademik" : "Academic Calendar"}</p>
          <h2>{isIndonesian ? "Jadwal Semester Ganjil 2026/2027" : "Odd Semester 2026/2027 Schedule"}</h2>
          <p>
            {isIndonesian
              ? "Jadwal penting perkuliahan, registrasi KRS, dan evaluasi semester ganjil tahun akademik 2026/2027."
              : "Key dates for classes, KRS course registration, and exams for the 2026/2027 odd semester."}
          </p>
        </div>
        <div className="fact-list">
          <div>
            <CalendarDays size={19} />
            <span>
              <strong>{isIndonesian ? "KRS & Registrasi Akademik" : "KRS & Academic Registration"}</strong>
              <small>{isIndonesian ? "10 – 21 Agustus 2026 (Pengisian Kartu Rencana Studi via SIMARI)" : "10 – 21 August 2026 (Course plan registration via SIMARI)"}</small>
            </span>
          </div>
          <div>
            <BookOpen size={19} />
            <span>
              <strong>{isIndonesian ? "UTS (Ujian Tengah Semester)" : "Midterms (UTS)"}</strong>
              <small>{isIndonesian ? "12 – 16 Oktober 2026" : "12 – 16 October 2026"}</small>
            </span>
          </div>
          <div>
            <GraduationCap size={19} />
            <span>
              <strong>{isIndonesian ? "UAS (Ujian Akhir Semester)" : "Finals (UAS)"}</strong>
              <small>{isIndonesian ? "14 – 23 Desember 2026" : "14 – 23 December 2026"}</small>
            </span>
          </div>
          <div>
            <CheckCircle2 size={19} />
            <span>
              <strong>{isIndonesian ? "Input Nilai & Evaluasi Semester" : "Grade Entry & Semester Review"}</strong>
              <small>{isIndonesian ? "21 Desember 2026 – 8 Januari 2027" : "21 December 2026 – 8 January 2027"}</small>
            </span>
          </div>
        </div>
        <div className="source-row">
          <SourceLink href="https://ulm.ac.id/id/wp-content/uploads/Kalender-Akademik.pdf" label={isIndonesian ? "PDF Kalender Akademik ULM" : "ULM Academic Calendar PDF"} />
          <SourceLink href={externalLinks.ulm} label={isIndonesian ? "Portal Akademik ULM" : "ULM Academic Portal"} />
        </div>
      </section>
    </>
  );
}
