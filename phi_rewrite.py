import json
import os

phi_file = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/lib/books/pengantar_hukum_indonesia.json"

with open(phi_file, 'r', encoding='utf-8') as f:
    phi_data = json.load(f)

new_chapters = [
    {
        "title": "Bab 1: Sejarah dan Konsep Dasar Tata Hukum Indonesia",
        "content": """# Bab 1: Sejarah dan Konsep Dasar Tata Hukum Indonesia

## 1. Apa Itu Pengantar Hukum Indonesia (PHI)?
Mata kuliah **Pengantar Hukum Indonesia (PHI)** adalah dasar yang wajib dipelajari mahasiswa Fakultas Hukum. PHI mempelajari tata hukum positif (hukum yang saat ini berlaku) di Indonesia, yang sering disebut *ius constitutum*.

Istilah "tata hukum" berasal dari bahasa Belanda *rechtorde*, artinya susunan hukum yang saling terkait untuk menjaga ketertiban, keadilan, dan kepastian dalam masyarakat.

### Bedanya PIH dan PHI
Sering kali mahasiswa bingung antara **Pengantar Ilmu Hukum (PIH)** dan **Pengantar Hukum Indonesia (PHI)**. 

- **PIH** bersifat universal dan teoritis. Membahas teori hukum secara umum di seluruh dunia.
- **PHI** bersifat khusus dan nyata. Fokus pada hukum yang saat ini sedang berlaku di batas wilayah Indonesia.

> **Tujuan Belajar PHI:**
> Membantu calon sarjana hukum memahami sejarah, sumber hukum formal, serta hubungan antara hukum perdata, pidana, tata negara, adat, dan Islam di Indonesia.

---

## 2. Sejarah Hukum Indonesia
Hukum Indonesia tidak muncul tiba-tiba. Hukum kita adalah hasil dari panjangnya sejarah dan percampuran budaya.

### A. Masa Pra-Kolonial
Sebelum bangsa Eropa datang, kita sudah punya:
- **Hukum Adat**: Aturan tidak tertulis dari masyarakat yang menjaga keseimbangan alam dan kelompok.
- **Hukum Islam**: Sejak abad 13, kerajaan-kerajaan mulai memakai syariat Islam.

### B. Masa Kolonial Belanda
Belanda membawa hukum Barat (Eropa Kontinental/Civil Law).
Belanda membuat aturan pemisahan penduduk dalam <cite>Pasal 163 IS</cite> menjadi: 
1. Golongan Eropa
2. Golongan Timur Asing (Tionghoa, Arab, dll.)
3. Golongan Bumi Putera (Penduduk Asli)

Lalu, dalam <cite>Pasal 131 IS</cite>, setiap golongan menggunakan hukum yang berbeda (Hukum Belanda untuk Eropa, Hukum Adat untuk Bumi Putera). 
Banyak hukum kolonial yang masih kita pakai, seperti *KUHP*, *KUHPerdata*, dan *KUHD*.

### C. Masa Pendudukan Jepang
Jepang menyatukan pengadilan menjadi satu (tidak dipisah berdasarkan ras lagi) dan menjadikan Bahasa Indonesia sebagai bahasa resmi hukum.

### D. Masa Kemerdekaan
Setelah merdeka, Indonesia tidak bisa langsung membuat hukum baru dalam semalam. Maka, berlakulah aturan transisi dalam <cite>Pasal II Aturan Peralihan UUD 1945</cite>, di mana hukum peninggalan Belanda tetap dipakai selama tidak bertentangan dengan kemerdekaan RI.

---

## 3. Ciri Khas Tata Hukum Nasional
- **Civil Law System dan Pluralisme**: Kita memakai sistem tertulis seperti Eropa, tapi tetap mengakui hukum adat dan agama.
- **Berdasarkan Pancasila**: Semua hukum harus mencerminkan nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan sosial.
- **Menuju Hukum Nasional**: Kita terus membuat hukum asli buatan Indonesia, contohnya <cite>UU No. 1 Tahun 2023 tentang KUHP Baru</cite>.
""",
        "contentEn": """# Chapter 1: History and Basic Concepts of the Indonesian Legal System

## 1. What is Introduction to Indonesian Law (PHI)?
The course **Introduction to Indonesian Law (PHI)** is a foundational subject for all law students. It focuses on positive law (the law currently in force) in Indonesia, also known as *ius constitutum*.

The term "legal system" comes from the Dutch word *rechtorde*, meaning an organized structure of laws designed to maintain order, justice, and certainty in society.

### The Difference between PIH and PHI
Students often confuse **Introduction to Jurisprudence (PIH)** with **Introduction to Indonesian Law (PHI)**.

- **PIH** is universal and theoretical. It covers general legal theories worldwide.
- **PHI** is specific and practical. It focuses entirely on the laws currently operating within the territory of Indonesia.

> **Goals of Studying PHI:**
> To help future legal professionals understand the history, formal legal sources, and connections among civil, criminal, constitutional, customary, and Islamic laws in Indonesia.

---

## 2. The History of Indonesian Law
Indonesian law didn't appear overnight. It is the product of long history and cultural blending.

### A. Pre-Colonial Era
Before Europeans arrived, we already had:
- **Customary Law (Hukum Adat)**: Unwritten rules of communities to maintain natural and social balance.
- **Islamic Law**: Since the 13th century, kingdoms adopted Islamic Sharia law.

### B. Dutch Colonial Era
The Dutch brought Western law (Civil Law system). They divided the population under <cite>Article 163 IS</cite> into:
1. Europeans
2. Foreign Orientals
3. Natives (Bumi Putera)

Under <cite>Article 131 IS</cite>, different groups were subjected to different laws. Many colonial laws like the Criminal Code and Civil Code are still used today.

### C. Japanese Occupation Era
The Japanese unified the courts (ending racial segregation) and made Indonesian the official language of law.

### D. Independence Era
After independence, Indonesia couldn't create all new laws overnight. Thus, transitional rules applied under <cite>Article II Transitional Provisions of the 1945 Constitution</cite>, stating that existing colonial laws remain valid as long as they don't contradict independence.

---

## 3. Characteristics of the National Legal System
- **Civil Law System with Pluralism**: We use written laws like Europe, but acknowledge customary and religious laws.
- **Pancasila-based**: All laws must reflect divine values, humanity, unity, democracy, and social justice.
- **Towards National Law**: We continuously create authentic Indonesian laws, for example, <cite>Law No. 1 of 2023 on the New Criminal Code</cite>.
"""
    },
    {
        "title": "Bab 2: Sumber-Sumber Hukum dan Hierarki Peraturan Perundang-undangan",
        "content": """# Bab 2: Sumber-Sumber Hukum dan Hierarki Perundang-undangan

## 1. Apa Itu Sumber Hukum?
Sumber hukum adalah segala hal yang menciptakan aturan yang mengikat dan memaksa. Jika dilanggar, akan ada sanksinya. 

Sumber hukum dibagi menjadi dua:
- **Sumber Hukum Materiil**: Asal usul isi hukum itu dibuat (faktor sosial, ekonomi, budaya). Di Indonesia, sumber tertingginya adalah **Pancasila**.
- **Sumber Hukum Formil**: Bentuk nyata di mana hukum tersebut ditulis agar bisa dibaca, ditaati, dan ditegakkan.

---

## 2. Lima Sumber Hukum Formil di Indonesia
Indonesia memakai sistem hukum tertulis (*Civil Law*), sehingga ada 5 sumber hukum utamanya:

1. **Peraturan Perundang-undangan**: Aturan tertulis resmi yang dibuat negara (undang-undang). Ini adalah sumber paling utama.
2. **Hukum Kebiasaan (Adat)**: Tindakan masyarakat yang diulang-ulang sehingga diyakini sebagai sebuah aturan yang wajib ditaati.
3. **Yurisprudensi**: Putusan hakim di masa lalu yang sudah pasti (berkekuatan hukum tetap) yang dipakai oleh hakim sekarang untuk kasus yang mirip.
4. **Traktat (Perjanjian Internasional)**: Perjanjian antar negara yang setelah disahkan (diratifikasi), akan mengikat di dalam negeri, diatur dalam <cite>Pasal 11 UUD 1945</cite>.
5. **Doktrin**: Pendapat para ahli hukum terkenal yang sangat dipercaya. Biasanya dipakai hakim untuk membantu menafsirkan pasal.

---

## 3. Urutan Kekuatan Hukum (Hierarki)
Hukum di Indonesia diurutkan dari yang tertinggi hingga terendah. Aturan yang posisinya di bawah tidak boleh melanggar aturan yang di atasnya. 

Berdasarkan <cite>UU No. 12 Tahun 2011</cite> yang diubah dengan <cite>UU No. 13 Tahun 2022</cite>, urutannya adalah:
1. UUD 1945 (Tertinggi)
2. Ketetapan MPR (Tap MPR)
3. Undang-Undang (UU) / Perpu
4. Peraturan Pemerintah (PP)
5. Peraturan Presiden (Perpres)
6. Peraturan Daerah (Perda) Provinsi
7. Peraturan Daerah (Perda) Kabupaten/Kota

---

## 4. Tiga Asas Penting dalam Hukum (Adagium)
Dalam membaca aturan hukum, mahasiswa wajib paham 3 rumus asas ini:

- **Lex Superior Derogat Legi Inferiori**: Hukum yang lebih tinggi mengalahkan hukum yang lebih rendah. (Contoh: UU mengalahkan PP).
- **Lex Specialis Derogat Legi Generali**: Hukum yang khusus mengalahkan hukum yang umum.
- **Lex Posterior Derogat Legi Priori**: Hukum yang baru mengalahkan hukum yang lama.
""",
        "contentEn": """# Chapter 2: Sources of Law and the Hierarchy of Regulations

## 1. What is a Source of Law?
A source of law is anything that creates binding and enforceable rules. If violated, there are sanctions.

Sources of law are divided into two:
- **Material Sources**: The origin of the law's content (social, economic, cultural factors). In Indonesia, the highest material source is **Pancasila**.
- **Formal Sources**: The tangible form in which the law is written so it can be read, obeyed, and enforced.

---

## 2. Five Formal Sources of Law in Indonesia
Indonesia follows a written law system (Civil Law), so there are 5 main sources:

1. **Statutory Regulations (Statutes)**: Official written rules created by the state. This is the primary source.
2. **Customary Law**: Actions repeatedly performed by society until they are believed to be binding rules.
3. **Jurisprudence (Case Law)**: Past judges' decisions with final legal force, used by current judges for similar cases.
4. **Treaties (International Agreements)**: Agreements between countries that, once ratified, are binding domestically, as per <cite>Article 11 of the 1945 Constitution</cite>.
5. **Doctrine**: Opinions of prominent legal scholars. Often used by judges to interpret laws.

---

## 3. The Hierarchy of Laws
Laws in Indonesia are ranked from highest to lowest. A lower rule cannot violate a higher rule.

Based on <cite>Law No. 12 of 2011</cite> as amended by <cite>Law No. 13 of 2022</cite>, the hierarchy is:
1. The 1945 Constitution (Highest)
2. MPR Decrees
3. Laws (UU) / Government Regulations in Lieu of Law (Perpu)
4. Government Regulations (PP)
5. Presidential Regulations (Perpres)
6. Provincial Regional Regulations (Perda)
7. Regency/City Regional Regulations (Perda)

---

## 4. Three Essential Legal Principles
When interpreting laws, students must understand these 3 principles:

- **Lex Superior Derogat Legi Inferiori**: Higher laws override lower laws (e.g., a Law overrides a Government Regulation).
- **Lex Specialis Derogat Legi Generali**: Specific laws override general laws.
- **Lex Posterior Derogat Legi Priori**: New laws override old laws.
"""
    },
    {
        "title": "Bab 3: Sistem Hukum Perdata di Indonesia",
        "content": """# Bab 3: Sistem Hukum Perdata di Indonesia

## 1. Apa Itu Hukum Perdata?
**Hukum Perdata** (hukum privat) adalah hukum yang mengatur hubungan antara satu orang dengan orang/pihak lain, yang fokus pada kepentingan pribadi.

Berbeda dengan Hukum Pidana (negara yang turun tangan menghukum), dalam Hukum Perdata yang mengambil inisiatif adalah orang yang merasa dirugikan. Dia harus menggugat sendiri ke pengadilan.

---

## 2. Isi Kitab Undang-Undang Hukum Perdata (KUHPerdata/BW)
Hukum perdata tertulis kita masih banyak merujuk pada peninggalan Belanda, yaitu *Burgerlijk Wetboek (BW)*. Isinya dibagi jadi 4 Buku:

### Buku I: Tentang Orang (Van Personen)
Membahas tentang manusia dan badan hukum, serta hukum keluarga. 
- **Subjek hukum**: Siapa yang bisa menuntut hak dan punya kewajiban (mulai dari dalam kandungan hingga meninggal).
- **Kecakapan hukum**: Orang dianggap cakap membuat janji hukum jika sudah dewasa dan tidak gila. Aturan perkawinan juga ada di sini, tapi sekarang sudah diatur khusus di <cite>UU No. 1 Tahun 1974 tentang Perkawinan</cite>.

### Buku II: Tentang Benda (Van Zaken)
Membahas segala hal tentang barang bergerak dan tidak bergerak, serta hak miliknya. 
- Di sini juga dibahas tentang Jaminan (Gadai, Hipotik). 
> **Penting**: Banyak aturan tentang tanah/air di Buku II yang **sudah dihapus** dan diganti oleh <cite>UU No. 5 Tahun 1960 tentang Pokok Agraria (UUPA)</cite>.

### Buku III: Tentang Perikatan (Van Verbintenissen)
Membahas hubungan hutang-piutang atau kontrak perjanjian antar dua belah pihak.
- **Syarat Sah Perjanjian (<cite>Pasal 1320 KUHPerdata</cite>)**:
  1. Sepakat
  2. Cakap hukum
  3. Objeknya jelas
  4. Sebab yang halal (tidak melanggar UU/kesusilaan)
- **Wanprestasi**: Kondisi ketika seseorang ingkar janji (tidak membayar utang, terlambat, dsb.). Pihak yang dirugikan bisa menuntut ganti rugi.

### Buku IV: Tentang Pembuktian dan Kedaluwarsa (Van Bewijs en Verjaring)
Membahas alat bukti di sidang perdata dan batas waktu menuntut hak.
Alat bukti perdata meliputi: Surat, Saksi, Persangkaan, Pengakuan, dan Sumpah. Hak menuntut utang umumnya akan hangus dalam waktu 30 tahun.

---

## 3. Proses Sidang Perdata Singkat
Bagaimana cara menuntut hak di Pengadilan Negeri?
- **Mediasi Wajib**: Sebelum disidang, hakim wajib menyuruh kedua pihak untuk berdamai lewat mediasi berdasarkan aturan <cite>PERMA No. 1 Tahun 2016</cite>.
- Kalau tidak damai, sidang lanjut:
  1. Penggugat membacakan gugatan.
  2. Tergugat menjawab (membantah).
  3. Pembuktian dokumen & saksi.
  4. Putusan hakim.
""",
        "contentEn": """# Chapter 3: The Civil Law System in Indonesia

## 1. What is Civil Law?
**Civil Law** (private law) governs the relationships between individuals or entities, focusing on private interests.

Unlike Criminal Law (where the state steps in to punish), in Civil Law, the initiative lies with the aggrieved party. They must file a lawsuit themselves in court.

---

## 2. Contents of the Civil Code (KUHPerdata/BW)
Much of our written civil law still refers to the Dutch heritage, the *Burgerlijk Wetboek (BW)*. It consists of 4 Books:

### Book I: On Persons (Van Personen)
Discusses individuals, legal entities, and family law.
- **Legal Subjects**: Who can hold rights and obligations (from the womb until death).
- **Legal Capacity**: People are deemed capable of making legal promises if they are adults and of sound mind. Marriage rules were here, but are now regulated by <cite>Law No. 1 of 1974 on Marriage</cite>.

### Book II: On Things (Van Zaken)
Discusses everything about movable and immovable property, and ownership rights.
- It also covers Guarantees (Pledges, Mortgages).
> **Important**: Many rules about land/water in Book II have been **revoked** and replaced by <cite>Law No. 5 of 1960 on Basic Agrarian Principles (UUPA)</cite>.

### Book III: On Obligations (Van Verbintenissen)
Discusses debt relationships or contractual agreements between two parties.
- **Valid Contract Requirements (<cite>Article 1320 Civil Code</cite>)**:
  1. Mutual consent
  2. Legal capacity
  3. A definite subject matter
  4. A lawful purpose (not violating laws/morals)
- **Breach of Contract (Wanprestasi)**: When someone breaks a promise (not paying debt, paying late, etc.). The injured party can sue for damages.

### Book IV: On Evidence and Prescription (Van Bewijs en Verjaring)
Discusses evidence in civil trials and time limits for legal claims.
Civil evidence includes: Documents, Witnesses, Presumptions, Confessions, and Oaths. The right to claim debt generally expires in 30 years.

---

## 3. Brief Civil Trial Process
How to claim your rights in a District Court?
- **Mandatory Mediation**: Before trial, judges must order both parties to attempt a peaceful settlement through mediation based on <cite>PERMA No. 1 of 2016</cite>.
- If mediation fails, the trial proceeds:
  1. Plaintiff reads the lawsuit.
  2. Defendant responds.
  3. Document & witness evidence.
  4. Judge's verdict.
"""
    },
    {
        "title": "Bab 4: Sistem Hukum Pidana di Indonesia",
        "content": """# Bab 4: Sistem Hukum Pidana di Indonesia

## 1. Apa Itu Hukum Pidana?
**Hukum Pidana** adalah hukum yang melindungi ketertiban umum masyarakat dari kejahatan. Kalau hukum perdata menjaga urusan pribadi, hukum pidana menjaga keamanan negara dan masyarakat luas.

Orang yang melakukan tindak pidana dapat dijatuhi hukuman berupa penderitaan (seperti penjara) oleh negara.

---

## 2. Asas Penting dalam Hukum Pidana
Mahasiswa tingkat pertama wajib paham dua asas utama ini:

- **Asas Legalitas (<cite>Pasal 1 KUHP</cite>)**: Tidak ada perbuatan yang bisa dihukum kalau belum ada aturan undang-undangnya terlebih dahulu. Artinya, hukum tidak boleh berlaku surut ke belakang. 
- **Asas Kesalahan / *Geen straf zonder schuld***: Seseorang tidak boleh dihukum kalau ia tidak punya niat jahat atau tidak lalai. Harus terbukti dia "bersalah".

---

## 3. Struktur Kitab Undang-Undang Hukum Pidana (KUHP)
Saat ini kita memiliki *KUHP Baru* (produk nasional) yaitu <cite>UU No. 1 Tahun 2023</cite>, yang menggantikan peninggalan Belanda (WvS).

Secara umum, KUHP dibagi menjadi dua bagian besar materi:
1. **Aturan Umum (Buku I)**: Membahas batasan berlakunya hukum, alasan pemaaf/pembenar, percobaan kejahatan, dan jenis-jenis hukuman (seperti penjara, denda, dan kerja sosial).
2. **Tindak Pidana (Buku II)**: Membahas jenis-jenis kejahatannya secara rinci, seperti pembunuhan, pencurian, penipuan, makar, korupsi, dll.

---

## 4. Alasan Penghapus Pidana
Tidak semua orang yang membunuh atau memukul pasti dipenjara. Ada yang namanya **Alasan Penghapus Pidana**. Ini terbagi dua:

- **Alasan Pembenar**: Perbuatannya benar secara hukum.
  *Contoh*: Polisi menembak penjahat karena perintah jabatan yang sah.
- **Alasan Pemaaf**: Perbuatannya salah, tapi orangnya dimaafkan. 
  *Contoh*: Orang gila mencuri barang, dia tidak bisa dipidana karena akalnya tidak sehat (tidak mampu bertanggung jawab). Atau orang membela diri karena ditodong pisau (pembelaan darurat).

---

## 5. Proses Hukum Pidana (Hukum Acara)
Bagaimana menangkap penjahat sampai dipenjara? Aturannya ada di **KUHAP** (<cite>UU No. 8 Tahun 1981</cite>). Urutannya:
1. **Penyelidikan & Penyidikan (oleh Polisi)**: Mencari bukti dan menangkap tersangka.
2. **Penuntutan (oleh Jaksa)**: Jaksa membawa berkas ke pengadilan dan menuntut hukuman untuk terdakwa.
3. **Pemeriksaan Sidang (oleh Hakim)**: Hakim memeriksa saksi dan bukti untuk memutuskan apakah terdakwa bersalah atau bebas.
4. **Eksekusi (oleh Jaksa dan Lapas)**: Memasukkan terpidana ke penjara untuk dibina.
""",
        "contentEn": """# Chapter 4: The Criminal Law System in Indonesia

## 1. What is Criminal Law?
**Criminal Law** protects public order from crimes. While civil law handles private matters, criminal law guards the safety of the state and the general public.

Those who commit crimes can be subjected to punishment (like imprisonment) by the state.

---

## 2. Crucial Principles in Criminal Law
First-year students must grasp these two main principles:

- **Principle of Legality (<cite>Article 1 Criminal Code</cite>)**: No act can be punished unless there is a pre-existing law prohibiting it. Meaning, laws cannot be applied retroactively.
- **Principle of Culpability / *Geen straf zonder schuld***: No one can be punished without criminal intent or negligence. They must be proven "guilty."

---

## 3. Structure of the Criminal Code (KUHP)
We now have a *New KUHP* (national product), namely <cite>Law No. 1 of 2023</cite>, replacing the Dutch legacy.

Generally, the Criminal Code is divided into two main parts:
1. **General Rules (Book I)**: Covers jurisdiction, justifications/excuses, attempted crimes, and types of punishments (like prison, fines, social work).
2. **Criminal Offenses (Book II)**: Details specific crimes, such as murder, theft, fraud, treason, corruption, etc.

---

## 4. Defenses against Criminal Liability
Not everyone who kills or hits goes to jail. There are **Reasons to Eliminate Punishment**, divided into two:

- **Justification Excuses**: The act is legally right.
  *Example*: A police officer shooting a criminal under a valid official order.
- **Forgiveness Excuses**: The act is wrong, but the person is forgiven.
  *Example*: An insane person stealing goods cannot be punished because they are mentally incapable. Or a person defending themselves at knifepoint (emergency defense).

---

## 5. Criminal Trial Process
How does a criminal get arrested and jailed? The rules are in the **Criminal Procedure Code (KUHAP)** (<cite>Law No. 8 of 1981</cite>). The sequence is:
1. **Investigation (by Police)**: Gathering evidence and arresting suspects.
2. **Prosecution (by Prosecutors)**: Bringing files to court and demanding sentences for defendants.
3. **Court Hearing (by Judges)**: Examining witnesses and evidence to decide if the defendant is guilty or free.
4. **Execution (by Prosecutors and Prisons)**: Imprisoning convicts for rehabilitation.
"""
    },
    {
        "title": "Bab 5: Sistem Hukum Tata Negara dan Administrasi Negara",
        "content": """# Bab 5: Sistem Hukum Tata Negara dan Administrasi Negara

## 1. Bedanya Hukum Tata Negara (HTN) dan Administrasi Negara (HAN)
Keduanya sama-sama mengatur negara, tapi dari sudut pandang yang berbeda:
- **Hukum Tata Negara (HTN)** ibarat melihat **"negara dalam keadaan diam"**. HTN mengatur kerangka dasar negara, seperti apa bentuk negaranya, siapa presidennya, dan apa tugas DPR.
- **Hukum Administrasi Negara (HAN)** ibarat melihat **"negara dalam keadaan bergerak"**. HAN mengatur bagaimana para pejabat (Pemerintah/Birokrasi) menjalankan tugas sehari-hari untuk melayani publik, seperti urusan pembuatan KTP, sertifikat tanah, atau izin bangunan.

---

## 2. Pokok Hukum Tata Negara Indonesia
Berdasarkan **UUD 1945**, Indonesia adalah negara hukum yang menganut pembagian kekuasaan (Trias Politica ala Indonesia):

1. **Kekuasaan Eksekutif (Pelaksana UU)**: Dipegang oleh Presiden, Wakil Presiden, dan Menteri-Menteri.
2. **Kekuasaan Legislatif (Pembuat UU)**: Dipegang oleh DPR (Dewan Perwakilan Rakyat) bersama DPD (Dewan Perwakilan Daerah).
3. **Kekuasaan Yudikatif (Pengawas dan Pengadil)**: Dipegang oleh Mahkamah Agung (MA) untuk urusan pidana/perdata, dan Mahkamah Konstitusi (MK) untuk urusan menguji UU terhadap UUD. Ada juga Komisi Yudisial (KY) yang menjaga kehormatan hakim.

> **Tahukah kamu?** 
> Hak Asasi Manusia (HAM) juga sangat dijamin dalam HTN Indonesia, secara rinci ditulis dalam <cite>Pasal 28A sampai 28J UUD 1945</cite>.

---

## 3. Pokok Hukum Administrasi Negara (HAN)
Agar pejabat pemerintah tidak bertindak sewenang-wenang kepada rakyat, mereka diikat oleh HAN. 

- **Asas Legalitas**: Pemerintah hanya boleh bertindak kalau ada dasar hukumnya. 
- **AAUPB (Asas-Asas Umum Pemerintahan yang Baik)**: Pejabat harus bertindak jujur, tidak memihak, cermat, dan adil. Diatur dalam <cite>UU No. 30 Tahun 2014 tentang Administrasi Pemerintahan</cite>.

### Bagaimana kalau rakyat dirugikan oleh Pejabat?
Jika ada warga yang merasa keputusannya dicurangi pemerintah (misalnya pemecatan PNS sepihak, Izin Usaha dicabut tanpa alasan), warga tersebut bisa menggugat ke **Pengadilan Tata Usaha Negara (PTUN)**.
""",
        "contentEn": """# Chapter 5: Constitutional Law and State Administration Law

## 1. The Difference between Constitutional Law (HTN) and Administrative Law (HAN)
Both govern the state, but from different perspectives:
- **Constitutional Law (HTN)** is like looking at **"the state at rest"**. It regulates the state's basic framework, its form of government, the president's role, and parliament's duties.
- **State Administrative Law (HAN)** is like looking at **"the state in motion"**. It regulates how officials (Government/Bureaucracy) perform their daily duties to serve the public, such as issuing ID cards, land certificates, or building permits.

---

## 2. Core of Indonesian Constitutional Law
Based on the **1945 Constitution**, Indonesia is a rule-of-law state embracing the separation of powers:

1. **Executive Power (Enforcing Laws)**: Held by the President, Vice President, and Ministers.
2. **Legislative Power (Making Laws)**: Held by the House of Representatives (DPR) and Regional Representative Council (DPD).
3. **Judicial Power (Judging and Reviewing)**: Held by the Supreme Court (MA) for criminal/civil matters, and the Constitutional Court (MK) for reviewing laws against the Constitution. There is also the Judicial Commission (KY) ensuring judges' integrity.

> **Did you know?**
> Human Rights are heavily guaranteed in Indonesian HTN, detailed in <cite>Articles 28A to 28J of the 1945 Constitution</cite>.

---

## 3. Core of State Administrative Law (HAN)
To prevent government officials from acting arbitrarily towards citizens, they are bound by HAN.

- **Legality Principle**: The government can only act if there is a legal basis for it.
- **Good Governance Principles (AAUPB)**: Officials must act honestly, impartially, carefully, and fairly. Regulated in <cite>Law No. 30 of 2014 on Government Administration</cite>.

### What if citizens are harmed by Officials?
If a citizen feels cheated by a government decision (e.g., unfair civil servant dismissal, sudden revocation of business license), they can sue in the **State Administrative Court (PTUN)**.
"""
    },
    {
        "title": "Bab 6: Pluralisme Hukum: Kedudukan Hukum Adat dan Hukum Islam",
        "content": """# Bab 6: Pluralisme Hukum: Hukum Adat dan Hukum Islam

## 1. Wajah Hukum Indonesia yang Beragam (Pluralisme)
Indonesia punya lebih dari satu sistem hukum yang hidup bersama-sama. Tiga pilar hukum utama kita adalah: Hukum Barat (Modern), Hukum Adat, dan Hukum Islam. Ketiganya saling memengaruhi membentuk hukum nasional Pancasila.

---

## 2. Hukum Adat di Indonesia
**Hukum Adat** adalah aturan hidup asli Nusantara yang tidak tertulis namun sangat dipatuhi masyarakat, punya sanksi jika dilanggar, dan dipercaya punya nilai magis. 

**Ciri-ciri Hukum Adat:**
- **Kekeluargaan (Komunal)**: Kepentingan orang banyak lebih utama dari individu.
- **Kontan**: Serah terima barang/uang terjadi saat itu juga (tunai) di depan kepala adat.
- **Religio-Magis**: Hukum terkait erat dengan kepercayaan kepada alam semesta dan roh leluhur.

Keberadaan masyarakat dan hukum adat sangat dilindungi negara, ditulis dalam <cite>Pasal 18B ayat (2) UUD 1945</cite>.

---

## 3. Hukum Islam dan Sejarah Berlakunya
Bagaimana Hukum Islam berlaku di Indonesia? Ada banyak teori dari sejarah kolonial hingga kini:

1. **Teori *Receptio in Complexu***: Dulu Belanda sempat bilang, orang Islam otomatis tunduk pada hukum Islam secara utuh.
2. **Teori *Receptie***: Snouck Hurgronje (tokoh Belanda) mengubah aturan di atas dan berkata: Hukum Islam baru berlaku JIKA sudah disetujui oleh Hukum Adat. (Ini siasat Belanda memecah belah bangsa).
3. **Teori *Receptie Exit***: Prof. Hazairin melawan teori Belanda. Beliau bilang, setelah merdeka, teori memecah belah itu harus "keluar" (exit). Hukum Islam berlaku langsung untuk umat Islam di Indonesia.

---

## 4. Hukum Islam Modern Saat Ini
Sekarang, Hukum Islam sudah diserap secara resmi menjadi hukum tertulis buatan negara kita, contohnya:
- **Pengadilan Agama**: Khusus menangani cerai, warisan, hibah, zakat, dan ekonomi syariah bagi umat muslim (<cite>UU No. 7 Tahun 1989</cite>).
- **Kompilasi Hukum Islam (KHI)**: Buku panduan hakim agama yang merangkum aturan perkawinan dan waris.
- **Ekonomi Syariah**: Aturan perbankan syariah, wakaf, dan surat berharga (Sukuk) yang semuanya sudah berwujud Undang-Undang resmi Republik Indonesia.
""",
        "contentEn": """# Chapter 6: Legal Pluralism: Customary Law and Islamic Law

## 1. The Diverse Face of Indonesian Law (Pluralism)
Indonesia has more than one legal system coexisting together. Our three main legal pillars are: Western (Modern) Law, Customary Law, and Islamic Law. All three influence each other to form Pancasila-based national law.

---

## 2. Customary Law in Indonesia
**Customary Law (Hukum Adat)** consists of the indigenous unwritten rules of the archipelago, strictly obeyed by communities, possessing sanctions if broken, and believed to hold magical values.

**Characteristics of Customary Law:**
- **Communal**: The community's interest outweighs individual interests.
- **Direct Delivery (Cash)**: Handover of goods/money happens instantly in front of the tribal chief.
- **Religio-Magical**: Law is closely tied to the belief in the cosmos and ancestral spirits.

The existence of customary communities and laws is highly protected by the state, explicitly written in <cite>Article 18B paragraph (2) of the 1945 Constitution</cite>.

---

## 3. Islamic Law and its Historical Application
How does Islamic Law apply in Indonesia? There are several theories from the colonial era to today:

1. **Receptio in Complexu Theory**: The Dutch once claimed that Muslims are automatically subject to Islamic law in its entirety.
2. **Receptie Theory**: Snouck Hurgronje (a Dutch scholar) changed the rule, stating: Islamic law only applies IF it is accepted by Customary Law. (This was a Dutch divide-and-conquer strategy).
3. **Receptie Exit Theory**: Prof. Hazairin fought the Dutch theory. He stated that after independence, that divisive theory must "exit." Islamic law applies directly to Muslims in Indonesia.

---

## 4. Modern Islamic Law Today
Nowadays, Islamic Law has been officially absorbed into written state laws, for example:
- **Religious Courts**: Specifically handles divorce, inheritance, grants, zakat, and sharia economy for Muslims (<cite>Law No. 7 of 1989</cite>).
- **Compilation of Islamic Law (KHI)**: A guidebook for religious judges summarizing marriage and inheritance rules.
- **Sharia Economy**: Regulations on sharia banking, waqf, and state securities (Sukuk), all of which are now official Laws of the Republic of Indonesia.
"""
    }
]

for idx, chap in enumerate(new_chapters):
    if idx < len(phi_data.get('chapters', [])):
        phi_data['chapters'][idx]['content'] = chap['content']
        phi_data['chapters'][idx]['contentEn'] = chap['contentEn']

with open(phi_file, 'w', encoding='utf-8') as f:
    json.dump(phi_data, f, indent=2, ensure_ascii=False)

print("PHI rewritten successfully!")
