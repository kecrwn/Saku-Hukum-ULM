"use client";
import { CircleHelp, HeartHandshake, LibraryBig, Scale, Users, Gavel, GraduationCap, ChevronRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceLink } from "@/components/SourceLink";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery } from "@/lib/site-data";
import { motion } from "framer-motion";

export default function StudentLife() { 
  const { isIndonesian } = useLanguage(); 
  
  const cards = isIndonesian 
    ? [
        [Scale, "Latihan Litigasi & Klinis", "Komunitas Peradilan Semu (KPS) dan Lembaga Konsultasi dan Bantuan Hukum (LKBH) sebagai wadah utama praktik penanganan perkara, simulasi sidang, dan bantuan hukum untuk masyarakat."], 
        [Users, "Organisasi & Advokasi", "Badan Eksekutif Mahasiswa (BEM FH ULM) serta Dewan Perwakilan Mahasiswa (DPM) memimpin aspirasi, advokasi, dan pergerakan mahasiswa di tingkat fakultas."], 
        [LibraryBig, "Jurnalistik & Riset", "LPM Peristiwa sebagai pers mahasiswa tertua dan wadah penulisan kritis, bersama forum kajian untuk mengasah diskursus akademik hukum."], 
        [HeartHandshake, "Jejaring Alumni", "Ikatan Keluarga Alumni (IKA FH ULM) dan Pusat Layanan Alumni mengamankan jejak karir dan relasi profesional pasca-kampus."]
      ] 
    : [
        [Scale, "Litigation & Clinical Practice", "The Moot Court Community (KPS) and Legal Aid Institute (LKBH) serve as primary platforms for case handling practice, trial simulations, and public legal aid."], 
        [Users, "Organisation & Advocacy", "The Student Executive Board (BEM) and Representative Council (DPM) lead student aspirations, advocacy, and faculty-level movements."], 
        [LibraryBig, "Journalism & Research", "LPM Peristiwa as the oldest student press and platform for critical writing, alongside study forums to sharpen academic legal discourse."], 
        [HeartHandshake, "Alumni Network", "The Alumni Association (IKA FH ULM) and Alumni Service Centre secure post-campus career trails and professional relations."]
      ]; 
      
  return (
    <div className="w-full min-h-screen bg-[var(--paper)]">
      <PageIntro 
        label={isIndonesian ? "Kemahasiswaan" : "Student Life"} 
        title={isIndonesian ? "Ruang interaksi, organisasi, dan pengembangan diri." : "Spaces for interaction, organisation, and self-development."} 
        summary={isIndonesian ? "Telusuri jejak kegiatan kemahasiswaan Fakultas Hukum ULM. Dari simulasi peradilan hingga pers mahasiswa, temukan wadah yang tepat untuk minat Anda." : "Trace the activities of FH ULM student life. From trial simulations to student press, find the right platform for your interests."} 
      />
      
      {/* Mock Court / Hero Feature - Full Bleed Design */}
      <section className="w-full py-16 md:py-24 bg-[var(--ink-deep)] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--clay)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image 
                  src={imagery.mootIllustration} 
                  alt={isIndonesian ? "Ilustrasi Peradilan Semu" : "Mock Court Illustration"} 
                  fill
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                  loading="lazy" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent opacity-80 mix-blend-multiply" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-3 text-white">
                    <Gavel size={24} className="text-[var(--clay)]" />
                    <div>
                      <p className="font-bold text-sm">Gedung Desmond J. Mahesa</p>
                      <p className="text-xs opacity-70">Fasilitas Praktik Peradilan Semu (KPS)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Side */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2 space-y-8"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--clay)]/10 text-[var(--clay)] text-xs font-bold tracking-widest uppercase mb-4">
                  {isIndonesian ? "Titik Temu Utama" : "Primary Hub"}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                  {isIndonesian ? "Peradilan Semu (Moot Court)" : "Moot Court Practice"}
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-white/70 leading-relaxed font-sans">
                  {isIndonesian 
                    ? "Peradilan semu adalah titik temu yang paling terlihat antara teori akademik dan praktik litigasi. Di fasilitas ini, mahasiswa berlatih menyusun berkas perkara, berdebat, dan mensimulasikan jalannya persidangan layaknya profesional hukum." 
                    : "Mock court is the most visible point of connection between academic theory and litigation practice. Here, students practice drafting case files, debating, and simulating trials like legal professionals."}
                </p>
                <p className="text-base text-white/50 leading-relaxed font-sans">
                  {isIndonesian
                    ? "Komunitas Peradilan Semu (KPS) secara aktif memanfaatkan Ruang Peradilan Semu dan Gedung Desmond J. Mahesa untuk kompetisi tingkat nasional maupun internal."
                    : "The Moot Court Community (KPS) actively utilizes the Mock Court Room and Desmond J. Mahesa Building for both national and internal competitions."}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <SourceLink href={externalLinks.facilities} label={isIndonesian ? "Lihat Fasilitas Kampus" : "View Campus Facilities"} />
                <SourceLink href={externalLinks.instagram} label={isIndonesian ? "Instagram KPS FH ULM" : "KPS FH ULM Instagram"} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--ink-deep)] mb-4">
            {isIndonesian ? "Pilar Kegiatan Mahasiswa" : "Pillars of Student Activity"}
          </h2>
          <p className="text-[#66736f] text-lg">
            {isIndonesian ? "Dari advokasi hingga kepenulisan, fakultas menawarkan beragam ekosistem untuk mengembangkan minat khusus Anda." : "From advocacy to writing, the faculty offers various ecosystems to develop your specific interests."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map(([Icon, title, description], idx) => { 
            const IconComponent = Icon as typeof Users; 
            return (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={title as string} 
                className="group flex flex-col p-8 md:p-10 bg-white border border-[rgba(23,62,68,.1)] rounded-3xl hover:border-[var(--clay)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(16,45,51,.08)] relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-[var(--clay)]/5 rounded-full blur-2xl group-hover:bg-[var(--clay)]/10 transition-colors duration-500" />
                
                <div className="h-16 w-16 rounded-2xl bg-[var(--paper)] border border-[rgba(23,62,68,.08)] text-[var(--clay)] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm relative z-10">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[var(--ink-deep)] mb-4 relative z-10">{title as string}</h3>
                <p className="text-[#66736f] leading-relaxed text-base md:text-lg relative z-10">{description as string}</p>
              </motion.article>
            ); 
          })}
        </div>
      </section>

      {/* Roster / Organizations List */}
      <section className="w-full bg-white border-y border-[rgba(23,62,68,.1)] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--clay)]/10 text-[var(--clay)] text-xs font-bold tracking-widest uppercase mb-2">
                {isIndonesian ? "Direktori UKM" : "UKM Directory"}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--ink-deep)] leading-tight">
                {isIndonesian ? "Wadah Berjejaring & Praktik." : "Networking & Practice Platforms."}
              </h2>
              <p className="text-lg text-[#66736f] leading-relaxed max-w-md">
                {isIndonesian ? "Organisasi kemahasiswaan intra-kampus yang aktif menjalankan program kerja, kompetisi, dan pengabdian masyarakat." : "Intra-campus student organizations actively running work programs, competitions, and community service."}
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  title: isIndonesian ? "Komunitas Peradilan Semu (KPS)" : "Moot Court Community",
                  desc: isIndonesian ? "Fokus pada keterampilan litigasi, pemberkasan hukum, dan simulasi peradilan semu tingkat nasional." : "Focuses on litigation skills, legal filing, and national-level mock trial simulations."
                },
                {
                  title: isIndonesian ? "BEM & DPM FH ULM" : "BEM & DPM FH ULM",
                  desc: isIndonesian ? "Pusat eksekutif dan legislatif mahasiswa, penggerak advokasi kebijakan kampus." : "The student executive and legislative center, driving campus policy advocacy."
                },
                {
                  title: isIndonesian ? "LPM Peristiwa" : "LPM Peristiwa",
                  desc: isIndonesian ? "Lembaga Pers Mahasiswa sejak 2011, mewadahi jurnalisme kampus dan analisis hukum independen." : "Student Press Institute since 2011, accommodating campus journalism and independent legal analysis."
                },
                {
                  title: isIndonesian ? "LKBH ULM" : "LKBH ULM",
                  desc: isIndonesian ? "Lembaga Konsultasi Bantuan Hukum tertua di Kalsel, sarana praktik pendampingan probono." : "The oldest Legal Aid Consultation Institute in South Kalimantan, a facility for probono advocacy practice."
                },
                {
                  title: isIndonesian ? "Mapala Justitia & KSI Al-Mizan" : "Mapala Justitia & KSI Al-Mizan",
                  desc: isIndonesian ? "Wadah mahasiswa pecinta alam dan kelompok studi keislaman fakultas." : "Nature enthusiast student association and faculty Islamic study group."
                }
              ].map((item, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={idx} 
                  className="flex gap-6 p-6 rounded-2xl bg-[var(--paper)] border border-[rgba(23,62,68,.05)] hover:border-[rgba(23,62,68,.15)] transition-all group cursor-default"
                >
                  <div className="h-12 w-12 shrink-0 rounded-full bg-white text-[var(--clay)] border border-[rgba(23,62,68,.05)] flex items-center justify-center shadow-sm">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[var(--ink-deep)] mb-2 group-hover:text-[var(--clay)] transition-colors">{item.title}</h4>
                    <p className="text-[#66736f] text-base leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry / Verification Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="bg-[var(--clay)] rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row gap-10 items-center justify-between">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="flex flex-col sm:flex-row gap-8 z-10 w-full lg:w-2/3">
            <div className="hidden sm:flex h-16 w-16 shrink-0 rounded-full bg-white/20 text-white items-center justify-center backdrop-blur-sm">
              <CircleHelp size={32} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                {isIndonesian ? "Konfirmasi Agenda & Rekrutmen Resmi." : "Confirm Official Agendas & Recruitment."}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {isIndonesian 
                  ? "Daftar unit kegiatan di atas dikumpulkan dari jejak publikasi resmi dan riset. Untuk mendaftar atau melihat agenda terbaru, selalu pastikan untuk mengecek kanal media sosial resmi UKM terkait atau menghubungi Bagian Kemahasiswaan Fakultas Hukum ULM." 
                  : "The list of units above is compiled from official publication trails and research. To register or view current agendas, always ensure to check the related UKM's official social media channels or contact the FH ULM Student Affairs Department."}
              </p>
            </div>
          </div>
          
          <div className="z-10 shrink-0 w-full lg:w-auto">
            <a 
              href={externalLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[var(--clay)] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
            >
              {isIndonesian ? "Cek Informasi Kampus" : "Check Campus Info"}
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  ); 
}
