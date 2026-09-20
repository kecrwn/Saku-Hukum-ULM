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
import { motion } from "framer-motion";

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
      <div className="max-w-4xl mx-auto mt-16 relative">
        
        {/* Vertical Line Connector */}
        <div className="absolute left-[29px] md:left-[48px] top-6 bottom-16 w-[2px] md:w-[3px] bg-gradient-to-b from-[var(--clay)] via-[var(--ink)] to-transparent opacity-20 md:opacity-30 rounded-full"></div>

        {/* Steps */}
        <div className="flex flex-col gap-12 md:gap-16 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.id} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex gap-5 md:gap-10 items-start relative group"
              >
                {/* Circle Number / Icon */}
                <div className={`shrink-0 w-[60px] h-[60px] md:w-[96px] md:h-[96px] rounded-full flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] z-10 ${
                  step.highlight 
                    ? 'bg-gradient-to-br from-[var(--clay)] to-[#9e3a22] text-white border-[3px] md:border-[4px] border-white/90' 
                    : 'bg-white text-[var(--ink-deep)] border-[3px] md:border-[4px] border-[var(--sand)]'
                }`}>
                  <Icon className="w-6 h-6 md:w-8 md:h-8 mb-0.5 md:mb-1" strokeWidth={step.highlight ? 2 : 1.5} />
                  <span className="text-[9px] md:text-xs font-bold font-sans tracking-widest opacity-90">{isIndonesian ? "TAHAP" : "STEP"} {step.id}</span>
                </div>

                {/* Card Content */}
                <div className="flex-1 min-w-0 bg-white rounded-3xl p-6 md:p-8 border border-[var(--line)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_16px_40px_rgba(30,48,43,0.08)] group-hover:border-[var(--sand)] transition-all duration-500 group-hover:-translate-y-1">
                  <h2 className="text-2xl md:text-3xl font-[var(--serif)] text-[var(--ink-deep)] mb-3 tracking-tight break-words">
                    {isIndonesian ? step.title : step.titleEn}
                  </h2>
                  <p className="text-[var(--muted)] text-[15px] md:text-[16px] leading-relaxed mb-6 break-words whitespace-normal">
                    {isIndonesian ? step.description : step.descriptionEn}
                  </p>
                  
                  {/* Role Box */}
                  <div className="mt-2 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#f9faf8] to-[#f0f3ee] border border-[#e2e8df] flex items-start gap-4 md:gap-5 shadow-inner">
                    <div className="mt-0.5 shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-[var(--ink)] to-[#1a2723] shadow-md flex items-center justify-center text-white">
                      <span className="text-[12px] md:text-[14px] font-bold font-[var(--serif)]">J</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] md:text-[11px] font-bold text-[var(--ink)] uppercase tracking-[0.2em] mb-2 opacity-70 break-words">
                        {isIndonesian ? "Peran Institusi (Fokus Jaksa)" : "Institutional Role (Prosecutor Focus)"}
                      </span>
                      <p className="text-[14px] md:text-[15px] text-[var(--ink-deep)] m-0 leading-relaxed font-medium break-words whitespace-normal">
                        {isIndonesian ? step.role : step.roleEn}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
