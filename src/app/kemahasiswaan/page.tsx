"use client";
import { CircleHelp, HeartHandshake, LibraryBig, Scale, Users } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceLink } from "@/components/SourceLink";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery } from "@/lib/site-data";

export default function StudentLife() { 
  const { isIndonesian } = useLanguage(); 
  
  const cards = isIndonesian 
    ? [
        [Scale, "Latihan litigasi & klinis", "Dokumen riset tambahan menempatkan Komunitas Peradilan Semu (KPS) dan Lembaga Konsultasi dan Bantuan Hukum (LKBH) sebagai jalur praktik perkara, simulasi, dan bantuan hukum. Status kanal resminya perlu dikonfirmasi langsung."], 
        [Users, "Organisasi dan advokasi", "BEM FH ULM serta LPM Peristiwa disebut dalam dokumen tambahan sebagai ruang kepemimpinan, advokasi, dan penulisan kritis. Daftar pengurus serta agenda berjalan tetap perlu diperiksa pada sumber organisasi atau fakultas."], 
        [LibraryBig, "Ekologi & etika", "Mapala Justitia dan KSI Al-Mizan disebut sebagai ruang komunitas untuk kegiatan lingkungan serta percakapan keagamaan/etika. Penyebutan ini adalah petunjuk riset, bukan pengesahan atau daftar resmi fakultas."], 
        [HeartHandshake, "Jejak alumni", "Selain Pusat Layanan Alumni FH ULM yang resmi, dokumen tambahan menyebut IKA FH ULM sebagai jejaring alumni. Detail struktur dan kontak jejaring tersebut belum muncul pada halaman alumni resmi yang ditinjau."]
      ] 
    : [
        [Scale, "Litigation and clinical practice", "The additional research report identifies the Moot Court Community (KPS) and the Legal Consultation and Aid Institute (LKBH) as possible routes to case practice, simulation, and legal aid. Confirm their official channels directly."], 
        [Users, "Organisation and advocacy", "The report names BEM FH ULM and LPM Peristiwa as spaces for leadership, advocacy, and critical writing. Officer lists and current agendas must still be checked through the organisation or faculty."], 
        [LibraryBig, "Environment and ethics", "Mapala Justitia and KSI Al-Mizan are named as community spaces for environmental activity and religious/ethical discussion. Their inclusion is a research lead, not faculty endorsement or an official roster."], 
        [HeartHandshake, "Alumni trail", "Alongside the official FH ULM Alumni Service Centre, the additional report refers to IKA FH ULM as an alumni network. Its structure and contacts were not found on the reviewed official alumni page."]
      ]; 
      
  return (
    <>
      <PageIntro 
        label={isIndonesian ? "Kemahasiswaan" : "Student Life"} 
        title={isIndonesian ? "Cari komunitas dengan jejak yang jelas." : "Find communities with a clear trail."} 
        summary={isIndonesian ? "Halaman ini membedakan fasilitas fakultas yang terverifikasi dari jalur komunitas yang didukung dokumen riset tambahan dan tetap perlu dikonfirmasi langsung." : "This page separates verified faculty facilities from community paths supported by the additional research report and still requiring direct confirmation."} 
      />
      
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 dark:bg-white/5 rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl backdrop-blur-sm transition-all duration-300">
          <div className="space-y-6">
            <p className="text-sm font-semibold tracking-wider text-[#d4b872] uppercase">
              {isIndonesian ? "Catatan verifikasi" : "Verification note"}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-dm-serif font-bold text-gray-900 dark:text-white leading-tight">
              {isIndonesian ? "Peradilan semu adalah titik temu yang paling terlihat." : "Mock court is the most visible point of connection."}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {isIndonesian ? "Ruang Peradilan Semu dan Gedung Desmond J. Mahesa muncul pada galeri fasilitas FH ULM. Dokumen riset tambahan mengaitkan fasilitas praktik itu dengan KPS dan latihan berkas perkara, tetapi hubungan organisasi, jadwal kegiatan, serta kanal resminya tidak dinyatakan sebagai informasi fakultas yang terverifikasi pada halaman ini." : "The Mock Court Room and Desmond J. Mahesa Building appear in FH ULM’s facilities gallery. The additional report connects those practical facilities with KPS and case-file exercises, but the organisational relationship, activity schedule, and official channels are not presented here as faculty-verified information."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SourceLink href={externalLinks.facilities} label={isIndonesian ? "Fasilitas FH ULM" : "FH ULM facilities"} />
              <SourceLink href={externalLinks.instagram} label={isIndonesian ? "Instagram yang ditautkan FH ULM" : "Instagram linked by FH ULM"} />
            </div>
          </div>
          
          <div className="relative group overflow-hidden rounded-2xl shadow-xl aspect-[4/3] w-full">
            <Image 
              src={imagery.mootIllustration} 
              alt={isIndonesian ? "Ilustrasi editorial ruang praktik peradilan" : "Editorial illustration of a mock-court learning space"} 
              fill
              className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <span className="absolute bottom-4 left-4 text-xs font-medium text-white/80 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
              {isIndonesian ? "Ilustrasi editorial" : "Editorial illustration"}
            </span>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map(([Icon, title, description]) => { 
            const IconComponent = Icon as typeof Users; 
            return (
              <article key={title as string} className="group flex flex-col p-8 bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-14 w-14 rounded-full bg-[#d4b872]/20 text-[#d4b872] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-dm-serif font-bold text-gray-900 dark:text-white mb-4">{title as string}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{description as string}</p>
              </article>
            ); 
          })}
        </div>
      </section>

      {/* Inquiry Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-700/50 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#d4b872]/10 rounded-full blur-3xl" />
          
          <div className="flex gap-6 lg:gap-8 z-10 w-full">
            <div className="hidden sm:flex h-16 w-16 shrink-0 rounded-full bg-[#d4b872]/20 text-[#d4b872] items-center justify-center">
              <CircleHelp size={32} />
            </div>
            <div className="space-y-4 max-w-3xl">
              <p className="text-sm font-semibold tracking-wider text-[#d4b872] uppercase">
                {isIndonesian ? "Langkah yang aman" : "A safer next step"}
              </p>
              <h2 className="text-3xl md:text-4xl font-dm-serif font-bold text-white">
                {isIndonesian ? "Konfirmasi ke sumber kampus sebelum bergabung." : "Confirm through campus sources before joining."}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {isIndonesian ? "KPS, LKBH, BEM FH ULM, Mapala Justitia, LPM Peristiwa, KSI Al-Mizan, dan IKA FH ULM kini dapat dibaca sebagai jejak riset tambahan. Untuk kontak, daftar UKM, atau agenda terbaru, tetap hubungi layanan fakultas atau cek kanal resmi organisasi sebelum mengambil keputusan." : "KPS, LKBH, BEM FH ULM, Mapala Justitia, LPM Peristiwa, KSI Al-Mizan, and IKA FH ULM can now be read as additional research leads. For contact details, official rosters, or current activities, still contact faculty services or check an organisation’s official channel before making a decision."}
              </p>
            </div>
          </div>
          
          <div className="z-10 shrink-0 w-full lg:w-auto flex justify-start lg:justify-end mt-4 lg:mt-0">
            <SourceLink href={externalLinks.alumni} label={isIndonesian ? "Pusat Layanan Alumni" : "Alumni Service Centre"} />
          </div>
        </div>
      </section>

      {/* Split Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <p className="text-sm font-semibold tracking-wider text-[#d4b872] uppercase">
              {isIndonesian ? "Organisasi Mahasiswa" : "Student Organisations"}
            </p>
            <h2 className="text-4xl md:text-5xl font-dm-serif font-bold text-gray-900 dark:text-white leading-tight">
              {isIndonesian ? "Wadah berjejaring dan praktik." : "Networking and practice platforms."}
            </h2>
            <div className="bg-gray-100 dark:bg-white/5 p-6 rounded-2xl border border-dashed border-gray-300 dark:border-white/20 mt-8">
              <p className="text-gray-500 dark:text-gray-400 text-center italic">
                {isIndonesian ? "[FOTO DIBUTUHKAN: Mohon sediakan foto kegiatan organisasi kemahasiswaan]" : "[IMAGE NEEDED: Please provide a photo of student organisation activities]"}
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-6">
            {[
              {
                title: isIndonesian ? "Komunitas Peradilan Semu (KPS)" : "Moot Court Community",
                desc: isIndonesian ? "Wadah utama untuk simulasi sidang dan keterampilan litigasi." : "Main platform for trial simulations and litigation skills."
              },
              {
                title: isIndonesian ? "BEM & DPM FH ULM" : "BEM & DPM FH ULM",
                desc: isIndonesian ? "Badan Eksekutif dan Dewan Perwakilan tingkat fakultas." : "Faculty-level Executive and Representative bodies."
              },
              {
                title: isIndonesian ? "LPM Peristiwa" : "LPM Peristiwa",
                desc: isIndonesian ? "Pers mahasiswa Fakultas Hukum ULM sejak 2011." : "FH ULM student press established in 2011."
              },
              {
                title: isIndonesian ? "LKBH ULM" : "LKBH ULM",
                desc: isIndonesian ? "Lembaga bantuan hukum tertua di Kalsel, tempat magang mahasiswa." : "The oldest legal aid clinic in South Kalimantan, a site for student practice."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-black/40 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  ); 
}
