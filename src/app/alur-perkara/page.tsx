"use client";

import React from "react";
import { 
  FileText, 
  Search, 
  ShieldAlert, 
  Scale, 
  Gavel, 
  BookOpenCheck,
  RefreshCcw,
  Lock
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AlurPerkaraPage() {
  const { isIndonesian } = useLanguage();

  const steps = [
    {
      id: "1",
      title: "Laporan / Pengaduan",
      titleEn: "Report / Complaint",
      icon: FileText,
      description: "Pintu masuk perkara pidana. Masyarakat melapor atau mengadu ke kepolisian mengenai adanya dugaan tindak pidana.",
      descriptionEn: "The entry point for criminal cases. The public reports or complains to the police regarding alleged criminal acts.",
      role: "Polisi menerima laporan dan menerbitkan Surat Tanda Terima Laporan Polisi (STTLP).",
      roleEn: "Police receive reports and issue a Police Report Receipt (STTLP).",
    },
    {
      id: "2",
      title: "Penyelidikan",
      titleEn: "Preliminary Investigation",
      icon: Search,
      description: "Serangkaian tindakan penyelidik untuk mencari dan menemukan suatu peristiwa yang diduga sebagai tindak pidana guna menentukan dapat atau tidaknya dilakukan penyidikan.",
      descriptionEn: "A series of actions by investigators to search for and find an event suspected of being a criminal offense to determine whether a full investigation can be conducted.",
      role: "Dilakukan oleh Penyelidik (Polri).",
      roleEn: "Conducted by Investigators (Police).",
    },
    {
      id: "3",
      title: "Penyidikan (Prapenuntutan)",
      titleEn: "Full Investigation (Pre-prosecution)",
      icon: ShieldAlert,
      description: "Tindakan penyidik untuk mencari serta mengumpulkan bukti yang membuat terang tentang tindak pidana dan menemukan tersangkanya.",
      descriptionEn: "Actions by investigators to find and collect evidence that clarifies the criminal offense and finds the suspect.",
      role: "Jaksa Penuntut Umum (JPU) mulai berperan menerima SPDP. Jaksa meneliti berkas (Tahap I). Jika belum lengkap, dikembalikan (P-18/P-19) dengan petunjuk. Jika lengkap, dinyatakan P-21 dilanjutkan Penyerahan Tersangka dan Bukti (Tahap II).",
      roleEn: "Public Prosecutors receive SPDP. Prosecutors examine the dossier (Phase I). If incomplete, it's returned (P-18/P-19) with instructions. If complete, it is declared P-21 followed by the Handover of Suspects and Evidence (Phase II).",
      highlight: true
    },
    {
      id: "4",
      title: "Penuntutan",
      titleEn: "Prosecution",
      icon: Scale,
      description: "Tindakan Penuntut Umum untuk melimpahkan perkara pidana ke Pengadilan Negeri yang berwenang dengan permintaan supaya diperiksa dan diputus oleh hakim di sidang pengadilan.",
      descriptionEn: "Actions by the Public Prosecutor to delegate criminal cases to the competent District Court with a request to be examined and decided by a judge.",
      role: "Jaksa menyusun Surat Dakwaan dan melimpahkan perkara ke Pengadilan Negeri.",
      roleEn: "Prosecutors prepare the Indictment and delegate the case to the District Court.",
      highlight: true
    },
    {
      id: "5",
      title: "Persidangan",
      titleEn: "Trial",
      icon: Gavel,
      description: "Proses pemeriksaan perkara di pengadilan. Meliputi: Pembacaan Dakwaan, Eksepsi, Pembuktian (Saksi, Ahli, Surat, Petunjuk, Keterangan Terdakwa), Tuntutan Pidana (Requisitoir), Pledoi, Replik, dan Duplik.",
      descriptionEn: "The process of examining a case in court. Includes: Reading of Indictment, Demurrer, Evidence Verification, Criminal Prosecution, Defense Plea, Reply, and Rejoinder.",
      role: "Jaksa (JPU) membacakan dakwaan, menghadirkan saksi/bukti, dan membacakan Tuntutan Pidana (Requisitoir).",
      roleEn: "Prosecutors read the indictment, present witnesses/evidence, and read the Criminal Prosecution demands.",
      highlight: true
    },
    {
      id: "6",
      title: "Putusan Hakim",
      titleEn: "Judge's Verdict",
      icon: BookOpenCheck,
      description: "Pernyataan hakim yang diucapkan dalam sidang terbuka untuk umum, dapat berupa pemidanaan, bebas (vrijspraak), atau lepas dari segala tuntutan hukum (onslag van alle rechtsvervolging).",
      descriptionEn: "The judge's statement pronounced in a session open to the public, which can be conviction, acquittal, or dismissal of all charges.",
      role: "Majelis Hakim membacakan putusan. Jaksa mendengar dan dapat menyatakan sikap (terima/pikir-pikir/banding).",
      roleEn: "The Panel of Judges reads the verdict. Prosecutors listen and can state their stance (accept/consider/appeal).",
    },
    {
      id: "7",
      title: "Upaya Hukum",
      titleEn: "Legal Remedies",
      icon: RefreshCcw,
      description: "Hak terdakwa atau penuntut umum untuk tidak menerima putusan pengadilan berupa perlawanan, banding, atau kasasi (Biasa) serta Peninjauan Kembali (Luar Biasa).",
      descriptionEn: "The right of the defendant or public prosecutor not to accept a court decision in the form of resistance, appeal, or cassation, as well as Judicial Review.",
      role: "Jaksa dapat mengajukan Banding atau Kasasi jika putusan tidak sesuai atau di bawah standar tuntutan (SOP).",
      roleEn: "Prosecutors may file an Appeal or Cassation if the verdict is inappropriate or below the standard prosecution demands.",
      highlight: true
    },
    {
      id: "8",
      title: "Eksekusi",
      titleEn: "Execution of Sentence",
      icon: Lock,
      description: "Pelaksanaan putusan pengadilan yang telah memperoleh kekuatan hukum tetap (inkracht van gewijsde).",
      descriptionEn: "The execution of a court decision that has obtained permanent legal force.",
      role: "Jaksa bertindak sebagai Eksekutor yang melaksanakan putusan (memasukkan terpidana ke Lapas, mengeksekusi denda/uang pengganti, memusnahkan barang bukti).",
      roleEn: "Prosecutors act as Executors carrying out the verdict (placing convicts in prison, executing fines, destroying evidence).",
      highlight: true
    }
  ];

  return (
    <div className="content-width pb-24">
      {/* Header / Intro */}
      <div className="page-intro pb-12">
        <div className="breadcrumb">
          <Link href="/">{isIndonesian ? "Beranda" : "Home"}</Link>
          <span className="opacity-50">/</span>
          <span>{isIndonesian ? "Alur Perkara" : "Case Process"}</span>
        </div>
        <div className="page-intro-grid max-w-4xl">
          <h1 className="text-[var(--ink-deep)] font-[var(--serif)] leading-tight mb-4">
            {isIndonesian ? "Alur Penanganan" : "Handling Process of"} <br />
            <em className="text-[var(--clay)] italic">{isIndonesian ? "Perkara Pidana" : "Criminal Cases"}</em>
          </h1>
          <p className="intro-summary text-[var(--muted)] text-base md:text-lg">
            {isIndonesian 
              ? "Panduan visual proses peradilan pidana di Indonesia berdasarkan Kitab Undang-Undang Hukum Acara Pidana (KUHAP), dari tahap pelaporan hingga eksekusi putusan."
              : "A visual guide to the criminal justice process in Indonesia based on the Criminal Procedure Code (KUHAP), from the reporting stage to the execution of the verdict."}
          </p>
        </div>
        <div className="river-rule"></div>
      </div>

      {/* Flowchart Container */}
      <div className="max-w-4xl mx-auto mt-12 relative">
        
        {/* Vertical Line Connector */}
        <div className="absolute left-[29px] md:left-[48px] top-6 bottom-16 w-[2px] bg-[var(--line)]"></div>

        {/* Steps */}
        <div className="flex flex-col gap-10 relative z-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id} 
                className="flex gap-4 md:gap-8 items-start relative group"
              >
                {/* Circle Number / Icon */}
                <div className={`shrink-0 w-[60px] h-[60px] md:w-[96px] md:h-[96px] rounded-full flex flex-col items-center justify-center border-[4px] border-[var(--paper)] shadow-sm transition-transform duration-300 group-hover:scale-105 z-10 ${
                  step.highlight 
                    ? 'bg-[var(--clay)] text-[var(--paper)]' 
                    : 'bg-[var(--card)] text-[var(--ink)] border-[var(--line)]'
                }`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mb-0.5 md:mb-1" strokeWidth={1.5} />
                  <span className="text-[9px] md:text-xs font-bold font-sans tracking-widest">{isIndonesian ? "TAHAP" : "STEP"} {step.id}</span>
                </div>

                {/* Card Content */}
                <div className="flex-1 paper-panel group-hover:shadow-[0_12px_32px_rgba(30,48,43,0.12)] transition-all duration-300 group-hover:-translate-y-1">
                  <h2 className="text-2xl md:text-3xl font-[var(--serif)] text-[var(--ink-deep)] mb-3 tracking-tight">
                    {isIndonesian ? step.title : step.titleEn}
                  </h2>
                  <p className="text-[#435651] text-sm md:text-[15px] leading-relaxed mb-6">
                    {isIndonesian ? step.description : step.descriptionEn}
                  </p>
                  
                  {/* Role Box */}
                  <div className="mt-4 p-4 md:p-5 rounded-xl bg-[#e7ece4] border-l-2 border-[var(--reed)] flex items-start gap-4">
                    <div className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-[var(--ink)] flex items-center justify-center text-[var(--paper)]">
                      <span className="text-[12px] font-bold">J</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-extrabold text-[var(--ink)] uppercase tracking-widest mb-1.5 opacity-80">
                        {isIndonesian ? "Peran Institusi (Fokus Jaksa)" : "Institutional Role (Prosecutor Focus)"}
                      </span>
                      <p className="text-sm md:text-[14px] text-[var(--ink-deep)] m-0 leading-snug font-medium">
                        {isIndonesian ? step.role : step.roleEn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
