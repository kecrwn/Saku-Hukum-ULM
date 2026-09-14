import os
import re

base_dir = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM"

# 1. Update site-data.ts
site_data_path = os.path.join(base_dir, "src/lib/site-data.ts")
with open(site_data_path, "r") as f:
    site_data = f.read()

# Add images
if 'adhyaksaChamber: "https://' not in site_data:
    site_data = site_data.replace('ulmEmblem:', 'adhyaksaChamber: "https://files.manuscdn.com/placeholder-adhyaksa.jpg",\n  studentOrgImage: "https://files.manuscdn.com/placeholder-org.jpg",\n  mootCourtRoom: "https://files.manuscdn.com/placeholder-moot.jpg",\n  ulmEmblem:')

# Update Admission Pathways
site_data = site_data.replace(
    'descId: "Jalur prestasi akademik rapor dan portofolio bagi siswa SMA/SMK/MA berprestasi via snpmb.id.",',
    'descId: "Jalur prestasi akademik rapor dan portofolio bagi siswa SMA/SMK/MA berprestasi via snpmb.id.",\n    stats: "2026 SNBT: 192 kursi terisi 100%. UKT S1 Hukum berkisar Rp500.000 - Rp3.405.000.",'
).replace(
    'descEn: "Merit-based academic report and portfolio pathway for high school graduates via snpmb.id.",',
    'descEn: "Merit-based academic report and portfolio pathway for high school graduates via snpmb.id.",\n    stats: "2026 SNBT: 192 seats filled 100%. Law tuition ranges from Rp500,000 to Rp3,405,000 per semester.",'
)

with open(site_data_path, "w") as f:
    f.write(site_data)

# 2. Update tentang/page.tsx
tentang_path = os.path.join(base_dir, "src/app/tentang/page.tsx")
with open(tentang_path, "r") as f:
    tentang = f.read()

# Add stats display to admission pathways
tentang = tentang.replace(
    '<span><strong>{isIndonesian ? path.id : path.en}</strong><small>{isIndonesian ? path.descId : path.descEn}</small></span>',
    '<span><strong>{isIndonesian ? path.id : path.en}</strong><small>{isIndonesian ? path.descId : path.descEn}</small>{(path as any).stats && <small className="mt-1 block text-zinc-500">{(path as any).stats}</small>}</span>'
)
# Update University Leadership
tentang = tentang.replace(
    'Prof. Dr. Ahmad, S.E., M.Si.',
    'Prof. Dr. Ahmad Alim Bachri'
)
with open(tentang_path, "w") as f:
    f.write(tentang)

# 3. Update kurikulum/page.tsx - add calendar
kurikulum_path = os.path.join(base_dir, "src/app/kurikulum/page.tsx")
with open(kurikulum_path, "r") as f:
    kurikulum = f.read()

calendar_section = """
    <section className="content-width split-section">
      <div className="section-heading">
        <p className="eyebrow">{isIndonesian ? "Kalender Akademik" : "Academic Calendar"}</p>
        <h2>{isIndonesian ? "Jadwal Ganjil 2026/2027" : "Odd Semester 2026/2027"}</h2>
      </div>
      <div className="fact-list">
        <div><BookOpen size={19} /><span><strong>{isIndonesian ? "UTS (Ujian Tengah Semester)" : "Midterms (UTS)"}</strong><small>12 – 16 October 2026</small></span></div>
        <div><BookOpen size={19} /><span><strong>{isIndonesian ? "UAS (Ujian Akhir Semester)" : "Finals (UAS)"}</strong><small>14 – 23 December 2026</small></span></div>
        <div><BookOpen size={19} /><span><strong>{isIndonesian ? "Input Nilai" : "Grade Entry"}</strong><small>21 Dec 2026 – 8 Jan 2027</small></span></div>
      </div>
    </section>
"""
if "Kalender Akademik" not in kurikulum:
    kurikulum = kurikulum.replace('</>', calendar_section + '\n  </>')
with open(kurikulum_path, "w") as f:
    f.write(kurikulum)

# 4. Update kemahasiswaan/page.tsx
kemaha_path = os.path.join(base_dir, "src/app/kemahasiswaan/page.tsx")
with open(kemaha_path, "r") as f:
    kemaha = f.read()

orgs_section = """
    <section className="content-width split-section">
      <div className="section-heading">
        <p className="eyebrow">{isIndonesian ? "Organisasi Mahasiswa" : "Student Organisations"}</p>
        <h2>{isIndonesian ? "Wadah berjejaring dan praktik." : "Networking and practice platforms."}</h2>
        <p>{isIndonesian ? "[FOTO DIBUTUHKAN: Mohon sediakan foto kegiatan organisasi kemahasiswaan]" : "[IMAGE NEEDED: Please provide a photo of student organisation activities]"}</p>
      </div>
      <div className="fact-list">
        <div><Users size={19} /><span><strong>{isIndonesian ? "Komunitas Peradilan Semu (KPS)" : "Moot Court Community"}</strong><small>{isIndonesian ? "Wadah utama untuk simulasi sidang dan keterampilan litigasi." : "Main platform for trial simulations and litigation skills."}</small></span></div>
        <div><Users size={19} /><span><strong>{isIndonesian ? "BEM & DPM FH ULM" : "BEM & DPM FH ULM"}</strong><small>{isIndonesian ? "Badan Eksekutif dan Dewan Perwakilan tingkat fakultas." : "Faculty-level Executive and Representative bodies."}</small></span></div>
        <div><Users size={19} /><span><strong>{isIndonesian ? "LPM Peristiwa" : "LPM Peristiwa"}</strong><small>{isIndonesian ? "Pers mahasiswa Fakultas Hukum ULM sejak 2011." : "FH ULM student press established in 2011."}</small></span></div>
        <div><Users size={19} /><span><strong>{isIndonesian ? "LKBH ULM" : "LKBH ULM"}</strong><small>{isIndonesian ? "Lembaga bantuan hukum tertua di Kalsel, tempat magang mahasiswa." : "The oldest legal aid clinic in South Kalimantan, a site for student practice."}</small></span></div>
      </div>
    </section>
"""
if "Organisasi Mahasiswa" not in kemaha:
    kemaha = kemaha.replace('import { Users', 'import { Users') # dummy
    kemaha = kemaha.replace('</>', orgs_section + '\n  </>')
with open(kemaha_path, "w") as f:
    f.write(kemaha)

# 5. Update perspektif/page.tsx
perspektif_path = os.path.join(base_dir, "src/app/perspektif/page.tsx")
with open(perspektif_path, "r") as f:
    persp = f.read()

new_perspectives = """
const perspectives: Perspective[] = [
  { id: "IDN-01", platform: "IDN Times", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Mahasiswa Semester Akhir", relationshipEn: "Final Semester Student", dateId: "September 2024", dateEn: "September 2024", titleId: "Krisis Akreditasi", titleEn: "Accreditation Crisis", bodyId: "Seorang aktivis mahasiswa menyoroti turunnya akreditasi institusi sebagai krisis yang mengecewakan mahasiswa. Ia menekankan bahwa ini adalah masalah sistemik, dan berharap pihak kampus bertanggung jawab serta memulihkan standar.", bodyEn: "A student activist highlights the institutional accreditation downgrade as a crisis that disappoints students. He emphasizes that it reflects a systemic issue, hoping the university takes responsibility and restores standards.", href: "https://kaltim.idntimes.com/news/kalimantan-selatan/akreditasi-fh-universitas-lambung-mangkurat-terjun-bebas-00-ffyyv-g1swtm" },
  { id: "JR-01", platform: "Jejakrekam", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Ketua IKA FH ULM", relationshipEn: "Alumni Association Chair", dateId: "September 2024", dateEn: "September 2024", titleId: "Tuntutan Keterbukaan", titleEn: "Demand for Transparency", bodyId: "Ketua IKA FH ULM meminta pihak rektorat untuk secara terbuka memberikan informasi kepada publik mengenai kasus guru besar. Ia menegaskan perlunya pembenahan sistem dari Kementerian.", bodyEn: "The Chair of FH ULM Alumni Association asks the rectorate to transparently provide information to the public regarding the professor case. He emphasizes the need for systemic reform from the Ministry.", href: "https://jejakrekam.com/ikatan-keluarga-alumni-fakultas-hukum-ulm-dikukuhkan-fauzan-ramon-jadi-ketua/" },
  { id: "BLG-01", platform: "Blogspot", scopeId: "ULM secara umum", scopeEn: "ULM generally", relationshipId: "Mahasiswa Angkatan 2016", relationshipEn: "2016 Student", dateId: "Oktober 2019", dateEn: "October 2019", titleId: "Dinamika Kampus Lokal", titleEn: "Local Campus Dynamics", bodyId: "Seorang mahasiswa mengenang awal mula kuliah yang penuh keraguan terhadap standar ULM dibandingkan kampus Jawa, namun mengakui bahwa ULM adalah salah satu kampus terkemuka dan bersaing di tingkat Kalimantan.", bodyEn: "A student recalls initial doubts about ULM's standards compared to Javanese universities, but acknowledges that ULM stands as one of the leading and competitive campuses across Kalimantan.", href: "https://fartwens.blogspot.com/2019/10/ulm-kawah-candradimuka-pribadi.html" },
  { id: "LNK-01", platform: "LinkedIn", scopeId: "Fakultas Hukum", scopeEn: "Faculty of Law", relationshipId: "Fresh Graduate S1", relationshipEn: "S1 Fresh Graduate", dateId: "Terbaru", dateEn: "Recent", titleId: "Aktif dan Tepat Waktu", titleEn: "Active and On-Time", bodyId: "Seorang lulusan baru membagikan pengalamannya aktif di Divisi Mootcourt (Komunitas Peradilan Semu). Ia membuktikan bahwa mahasiswa dapat berorganisasi secara intens sekaligus lulus tepat waktu dengan IPK 3,56.", bodyEn: "A fresh graduate shares his experience being active in the Moot Court Division. He proves that students can intensely participate in organizations while graduating on time with a 3.56 GPA.", href: "https://www.linkedin.com/in/hikmah-ramadhan-1841b0216" }
];

const platformInfo: any = {
  "IDN Times": { logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032028539/aXRCPoXJFLPJoLmA.png", color: "#e3000f", actionId: "Baca di IDN Times", actionEn: "Read on IDN Times" },
  "Jejakrekam": { logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032028539/aXRCPoXJFLPJoLmA.png", color: "#1a1a1a", actionId: "Baca di Jejakrekam", actionEn: "Read on Jejakrekam" },
  "Blogspot": { logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032028539/aXRCPoXJFLPJoLmA.png", color: "#f57c00", actionId: "Baca di Blog", actionEn: "Read Blog" },
  "LinkedIn": { logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663032028539/aXRCPoXJFLPJoLmA.png", color: "#0a66c2", actionId: "Lihat di LinkedIn", actionEn: "View on LinkedIn" }
};
"""

persp = re.sub(r'const perspectives: Perspective\[\] = \[.*?\];', new_perspectives.split('const platformInfo')[0], persp, flags=re.DOTALL)
persp = re.sub(r'const platformInfo = \{.*?\};', new_perspectives.split('];\n\n')[1], persp, flags=re.DOTALL)
# Update type to include the new platforms
persp = persp.replace('platform: "Quora" | "Hukumonline";', 'platform: "IDN Times" | "Jejakrekam" | "Blogspot" | "LinkedIn";')

with open(perspektif_path, "w") as f:
    f.write(persp)

# 6. Update karier/page.tsx
karier_path = os.path.join(base_dir, "src/app/karier/page.tsx")
with open(karier_path, "r") as f:
    karier = f.read()

adhyaksa_section = """
    <section className="content-width split-section mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-12">
      <div className="section-heading">
        <p className="eyebrow">{isIndonesian ? "Kemitraan Strategis" : "Strategic Partnership"}</p>
        <h2>{isIndonesian ? "Kerja Sama Adhyaksa Chamber" : "Adhyaksa Chamber Collaboration"}</h2>
      </div>
      <div className="fact-list">
        <div><Briefcase size={19} /><span><strong>{isIndonesian ? "Pusat Mediasi Sektor Publik" : "Public Sector Mediation Center"}</strong><small>{isIndonesian ? "Kejaksaan Agung RI memilih FH ULM sebagai kampus pertama dan satu-satunya di Indonesia untuk uji sahih Adhyaksa Chamber (Pusat mediasi sengketa perdata & TUN)." : "Kejaksaan Agung RI selected FH ULM as the first and only campus in Indonesia for the Adhyaksa Chamber blueprint (Civil & Administrative dispute mediation)."}</small></span></div>
        <div><Briefcase size={19} /><span><strong>{isIndonesian ? "Keterkaitan Karir" : "Career Relevance"}</strong><small>{isIndonesian ? "Ini memperkuat posisi ULM dalam relasi Datun (Perdata & Tata Usaha Negara) Kejaksaan." : "This strengthens ULM's position in the Kejaksaan's civil and administrative sectors."}</small></span></div>
      </div>
    </section>
"""
if "Adhyaksa Chamber" not in karier:
    karier = karier.replace('</>', adhyaksa_section + '\n  </>')
with open(karier_path, "w") as f:
    f.write(karier)

# 7. Update README.md with sources
readme_path = os.path.join(base_dir, "README.md")
with open(readme_path, "a") as f:
    f.write("\n\n## Data Sources (Updated 14 Sep 2026)\n- IDN Times Kaltim (Accreditation news)\n- Jejakrekam.com (Alumni response)\n- Blogspot (Student review 2019)\n- LinkedIn (Fresh graduate testimonial)\n- ULM Official SK Rektor No. 274/UN8/HK.06/2026 (Academic Calendar)\n- Kejaksaan RI & FH ULM News (Adhyaksa Chamber)")

print("Updates applied.")
