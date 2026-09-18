import json

pidana_file = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/lib/books/pidana.json"

with open(pidana_file, 'r', encoding='utf-8') as f:
    pidana_data = json.load(f)

new_chapters = [
    {
        "title": "Bab 1: Hakikat, Sejarah, dan Teori-Teori Pemidanaan",
        "content": """# Bab 1: Hakikat, Sejarah, dan Teori Hukum Pidana

## 1. Apa Itu Hukum Pidana?
Hukum pidana adalah kumpulan aturan yang menentukan perbuatan apa yang dilarang (kejahatan) dan hukuman apa yang akan diberikan jika dilanggar. Tujuan utamanya bukan untuk balas dendam, melainkan untuk menjaga keamanan dan ketertiban masyarakat umum.

Hukum pidana terbagi dua:
- **Hukum Pidana Materiil**: Aturan tentang perbuatan yang dilarang dan ancaman hukumannya (contoh: *KUHP*).
- **Hukum Pidana Formil**: Cara negara menegakkan hukum materiil tersebut, dari menangkap sampai memenjarakan (contoh: *KUHAP*).

## 2. Sejarah Singkat
Sistem hukum pidana kita dulu memakai peninggalan Belanda, yaitu WvS (*Wetboek van Strafrecht*) yang dibawa pada zaman kolonial dan dipertahankan lewat <cite>Aturan Peralihan UUD 1945</cite>.
Kini kita sudah meresmikan KUHP buatan bangsa sendiri yaitu <cite>UU No. 1 Tahun 2023</cite>.

## 3. Teori-Teori Mengapa Orang Dihukum
Mengapa negara berhak menghukum seseorang? Para ahli membaginya dalam 3 teori:
- **Teori Absolut (Pembalasan)**: Dihukum karena dia telah berbuat jahat. Titik. Utang nyawa bayar nyawa.
- **Teori Relatif (Tujuan)**: Dihukum supaya orang itu kapok dan masyarakat lain takut berbuat hal yang sama (mencegah kejahatan).
- **Teori Gabungan**: Pemidanaan bertujuan untuk pembalasan sekaligus untuk mendidik pelaku agar kembali baik di masyarakat.
""",
        "contentEn": """# Chapter 1: Nature, History, and Theories of Punishment

## 1. What is Criminal Law?
Criminal law is a set of rules determining what acts are prohibited (crimes) and what punishments will be inflicted if broken. Its main goal is not revenge, but maintaining public safety and order.

Criminal law is divided into two:
- **Substantive Criminal Law**: Rules about prohibited acts and their penalties (e.g., the *Criminal Code/KUHP*).
- **Formal Criminal Law**: How the state enforces substantive law, from arrest to imprisonment (e.g., the *Criminal Procedure Code/KUHAP*).

## 2. Brief History
Our criminal justice system used to rely on the Dutch legacy, WvS (*Wetboek van Strafrecht*), brought during colonial times and maintained through the <cite>Transitional Provisions of the 1945 Constitution</cite>.
Now, we have inaugurated our own national Criminal Code, <cite>Law No. 1 of 2023</cite>.

## 3. Theories of Punishment
Why does the state have the right to punish someone? Scholars divide this into 3 theories:
- **Absolute Theory (Retribution)**: Punished simply because they committed a crime. An eye for an eye.
- **Relative Theory (Utilitarian)**: Punished to rehabilitate the offender and deter society from doing the same.
- **Mixed Theory**: Punishment aims both for retribution and to educate the offender to become a good citizen again.
"""
    },
    {
        "title": "Bab 2: Asas-Asas Berlakunya Hukum Pidana (Asas Legalitas dan Ruang Lingkup Waktu-Tempat)",
        "content": """# Bab 2: Asas-Asas Berlakunya Hukum Pidana

Untuk menghukum seseorang, hukum pidana dibatasi oleh aturan ruang dan waktu agar tidak sewenang-wenang.

## 1. Batas Waktu: Asas Legalitas
Seseorang tidak bisa dihukum kalau saat dia melakukan perbuatan tersebut, belum ada undang-undang yang melarangnya. Ini disebut **Asas Legalitas**, yang tercantum dalam <cite>Pasal 1 ayat (1) KUHP lama</cite>.
- Hukum tidak boleh berlaku surut ke belakang. 
- Harus tertulis secara jelas.
- Tapi di <cite>KUHP Baru (UU No. 1/2023)</cite>, diakui juga *Hukum yang Hidup di Masyarakat (Hukum Adat)* sebagai dasar memidana walau tidak tertulis, asal sesuai dengan Pancasila.

## 2. Batas Tempat: Dimana Hukum Indonesia Berlaku?
Hukum pidana Indonesia berlaku untuk siapa saja berdasarkan 4 asas:
- **Asas Teritorial**: Berlaku untuk siapa saja (WNI atau bule) yang berbuat jahat **di dalam wilayah Indonesia**.
- **Asas Nasional Aktif (Personal)**: Berlaku untuk **WNI** yang berbuat kejahatan di luar negeri. Selama dia WNI, hukum Indonesia tetap melekat padanya.
- **Asas Nasional Pasif (Perlindungan)**: Berlaku untuk siapa saja (WNI atau WNA) di luar negeri yang menyerang **kepentingan penting negara Indonesia** (misal: memalsukan uang rupiah di luar negeri).
- **Asas Universal**: Berlaku untuk siapa saja demi melindungi **kepentingan dunia**, seperti pembajakan pesawat atau terorisme internasional.
""",
        "contentEn": """# Chapter 2: Principles of Criminal Law Application

To punish someone, criminal law is limited by time and space rules to prevent arbitrary actions.

## 1. Time Limits: The Principle of Legality
A person cannot be punished if, at the time they committed the act, there was no law prohibiting it. This is the **Principle of Legality**, stated in <cite>Article 1 paragraph (1) of the old KUHP</cite>.
- Laws cannot be applied retroactively.
- They must be clearly written.
- However, in the <cite>New KUHP (Law No. 1/2023)</cite>, *Living Laws in Society (Customary Law)* are also recognized as a basis for punishment even if unwritten, provided they align with Pancasila.

## 2. Space Limits: Where Does Indonesian Law Apply?
Indonesian criminal law applies based on 4 principles:
- **Territorial Principle**: Applies to anyone (citizens or foreigners) committing crimes **within Indonesian territory**.
- **Active Nationality Principle**: Applies to **Indonesian citizens** committing crimes abroad. As long as they are citizens, Indonesian law follows them.
- **Passive Nationality Principle (Protection)**: Applies to anyone abroad attacking **crucial interests of Indonesia** (e.g., counterfeiting Rupiah abroad).
- **Universal Principle**: Applies to anyone to protect **global interests**, such as airplane hijacking or international terrorism.
"""
    },
    {
        "title": "Bab 3: Teori Tindak Pidana (Strafbaar Feit), Unsur-Unsur, dan Hubungan Kausalitas",
        "content": """# Bab 3: Tindak Pidana dan Hubungan Sebab Akibat

## 1. Apa Itu Tindak Pidana?
Dalam bahasa Belanda disebut *Strafbaar Feit*. Intinya, tindak pidana adalah **perbuatan yang dilarang oleh aturan hukum, dan diancam sanksi pidana** bagi yang melanggarnya.

Tindak pidana dibagi dua menurut tingkat keseriusannya:
- **Kejahatan**: Perbuatan yang memang pada dasarnya jahat dan merugikan (membunuh, mencuri).
- **Pelanggaran**: Perbuatan yang dilarang hanya karena aturan administratif, tidak terlalu berat (tidak pakai helm, buang sampah sembarangan).

## 2. Unsur-Unsur Tindak Pidana
Agar seseorang bisa disidang, perbuatannya harus memenuhi 2 unsur:
1. **Unsur Objektif**: Hal yang terlihat dari luar. Yaitu ada *perbuatan* (memukul) dan *akibat* (korban luka), serta melanggar hukum.
2. **Unsur Subjektif**: Hal yang ada di pikiran pelaku. Yaitu ada *Niat/Kesengajaan* atau *Kelalaian*.

## 3. Hubungan Kausalitas (Sebab-Akibat)
Sangat penting bagi Hakim untuk mencari tahu apakah perbuatan pelaku benar-benar jadi penyebab timbulnya akibat kejahatan.
> *Contoh Kasus*: A memukul B. B masuk rumah sakit. Di rumah sakit, bangunan runtuh karena gempa dan B meninggal. Apakah A dihukum karena pembunuhan?
> Tentu tidak. Kematian B *disebabkan* oleh gempa, bukan pukulan A. 

Teori yang sering dipakai hakim adalah **Teori Adekuat**: Dicari sebab yang menurut akal sehat dan kebiasaan normal memang bisa menimbulkan akibat tersebut.
""",
        "contentEn": """# Chapter 3: Theories of Criminal Acts and Causality

## 1. What is a Criminal Act?
In Dutch, it's called *Strafbaar Feit*. Essentially, it is an **act prohibited by law, carrying a criminal sanction** for violators.

Crimes are divided by severity:
- **Crimes (Kejahatan)**: Acts that are inherently evil and harmful (murder, theft).
- **Violations (Pelanggaran)**: Acts prohibited mostly by administrative rules, less severe (not wearing a helmet, littering).

## 2. Elements of a Criminal Act
For someone to face trial, their act must meet 2 elements:
1. **Objective Elements**: The external part. There must be an *act* (punching) and a *result* (victim gets hurt), violating the law.
2. **Subjective Elements**: The internal part of the perpetrator's mind. There must be *Intent* or *Negligence*.

## 3. Causality (Cause and Effect)
It is crucial for Judges to figure out if the perpetrator's act truly caused the criminal result.
> *Case Example*: A punches B. B goes to the hospital. At the hospital, an earthquake collapses the building and B dies. Is A punished for murder?
> Of course not. B's death was *caused* by the earthquake, not A's punch.

The theory most used by judges is the **Adequate Theory**: Looking for the cause that, according to common sense and normal habits, logically brings about the result.
"""
    },
    {
        "title": "Bab 4: Pertanggungjawaban Pidana, Kesalahan (Schuld), dan Alasan Penghapus Pidana",
        "content": """# Bab 4: Pertanggungjawaban dan Alasan Bebas Hukuman

## 1. Kesalahan (Schuld)
Hukum pidana tidak boleh buta. Walau seseorang melakukan perbuatan pidana, dia hanya bisa dihukum jika dia "bisa dimintai pertanggungjawaban". Asasnya: *Tiada pidana tanpa kesalahan*.

Kesalahan terdiri dari dua bentuk:
- **Kesengajaan (Dolus)**: Pelaku sadar dan memang niat melakukan itu. (Misal: Sengaja meracuni orang).
- **Kelalaian/Kealpaan (Culpa)**: Pelaku tidak niat, tapi dia ceroboh sehingga merugikan orang lain. (Misal: Ngebut di jalan lalu menabrak pejalan kaki).

## 2. Alasan Penghapus Pidana
Terkadang, walau perbuatannya salah, pelakunya tidak dipenjara karena ada alasan khusus. Ini dibagi dua:

### A. Alasan Pembenar (Perbuatannya Tidak Melanggar Hukum)
- **Undang-Undang**: Algojo menghukum mati penjahat (<cite>Pasal 50 KUHP</cite>).
- **Perintah Jabatan**: Polisi menembak mati teroris atas perintah komandan (<cite>Pasal 51 KUHP</cite>).
- **Pembelaan Darurat (*Noodweer*)**: Kamu menendang maling yang membawa parang untuk menyelamatkan nyawamu (<cite>Pasal 49 ayat 1 KUHP</cite>).

### B. Alasan Pemaaf (Orangnya Dimaafkan)
- **Tidak Mampu Bertanggung Jawab**: Pelaku mengalami gangguan jiwa/gila (<cite>Pasal 44 KUHP</cite>).
- **Daya Paksa (*Overmacht*)**: Seseorang diancam dibunuh jika tidak mau disuruh membakar rumah.
- **Pembelaan Darurat yang Melampaui Batas**: Saking paniknya dibegal, kamu memukul si begal bertubi-tubi sampai dia mati (<cite>Pasal 49 ayat 2 KUHP</cite>).
""",
        "contentEn": """# Chapter 4: Criminal Liability, Culpability, and Excuses

## 1. Culpability (Schuld)
Criminal law must not be blind. Even if someone commits a crime, they can only be punished if they "can be held responsible." The principle: *No punishment without fault*.

Culpability comes in two forms:
- **Intent (Dolus)**: The perpetrator is aware and intends to do it. (e.g., Intentionally poisoning someone).
- **Negligence (Culpa)**: The perpetrator didn't intend it, but was careless, harming others. (e.g., Speeding and hitting a pedestrian).

## 2. Defenses Eliminating Punishment
Sometimes, even if the act is wrong, the perpetrator isn't jailed due to special reasons. Divided into two:

### A. Justification (The Act is Legally Right)
- **By Law**: An executioner carrying out a death penalty (<cite>Article 50 KUHP</cite>).
- **Official Order**: A police officer shooting a terrorist under a commander's order (<cite>Article 51 KUHP</cite>).
- **Emergency Defense (*Noodweer*)**: Kicking an armed robber to save your own life (<cite>Article 49 paragraph 1 KUHP</cite>).

### B. Forgiveness (The Person is Excused)
- **Lacking Responsibility**: The perpetrator is insane/mentally disabled (<cite>Article 44 KUHP</cite>).
- **Force Majeure (*Overmacht*)**: Someone threatened with death if they don't burn a house.
- **Excessive Emergency Defense**: Panicking during a robbery, you hit the robber repeatedly until they die (<cite>Article 49 paragraph 2 KUHP</cite>).
"""
    },
    {
        "title": "Bab 5: Bentuk-Bentuk Khusus: Percobaan (Poging), Penyertaan (Deelneming), dan Perbarengan (Concursus)",
        "content": """# Bab 5: Percobaan, Komplotan, dan Perbarengan Tindak Pidana

Hukum pidana juga mengatur kondisi-kondisi rumit dalam kejahatan. Bagaimana kalau kejahatannya gagal? Bagaimana kalau dilakukan ramai-ramai?

## 1. Percobaan (*Poging*)
Percobaan kejahatan terjadi ketika seseorang sudah niat dan mulai beraksi, tapi gagal bukan karena kemauannya sendiri (misal: mau mencuri ketahuan satpam).
- Syarat dihukum (<cite>Pasal 53 KUHP</cite>): Ada niat, ada permulaan pelaksanaan, dan tidak selesainya kejahatan bukan karena keinginan sendiri.
- Hukumannya dikurangi 1/3 dari hukuman penuh. Kalau ancaman matinya seumur hidup, jadi maksimal 15 tahun.

## 2. Penyertaan (*Deelneming*)
Penyertaan adalah kejahatan komplotan. Menurut <cite>Pasal 55 dan 56 KUHP</cite>, yang dihukum bukan cuma pelaku yang mengeksekusi, tapi juga:
- **Yang menyuruh melakukan**: Bos yang menyuruh anak buahnya berbuat kejahatan.
- **Yang turut serta**: Teman yang ikut memegang korban saat korban dipukul.
- **Yang menganjurkan (Provokator)**: Membujuk dengan janji/uang.
- **Yang membantu**: Memberi kunci rumah atau senjata untuk dipakai pencuri/pembunuh.

## 3. Perbarengan Kejahatan (*Concursus / Samenloop*)
Ini adalah kondisi di mana satu orang melakukan BANYAK kejahatan sekaligus sebelum dia disidang.
- **Satu perbuatan melanggar banyak aturan**: (Misal memperkosa di jalan umum melanggar UU Kesusilaan dan KUHP). Hukuman yang diambil adalah yang paling berat.
- **Beberapa perbuatan sekaligus**: Mencuri di rumah A, besok merampok rumah B, besoknya membakar rumah C. Hukuman dihitung dengan menambahkan semuanya, tapi tidak boleh lebih dari hukuman terberat ditambah 1/3.
""",
        "contentEn": """# Chapter 5: Special Forms: Attempt, Complicity, and Concurrence

Criminal law also handles complicated crime scenarios. What if a crime fails? What if it's done by a gang?

## 1. Attempt (*Poging*)
An attempted crime occurs when someone intends and starts to act, but fails due to factors outside their control (e.g., trying to steal but caught by a guard).
- Conditions for punishment (<cite>Article 53 KUHP</cite>): Intent, commencement of execution, and failure not by voluntary withdrawal.
- The penalty is reduced by 1/3 of the maximum. If the threat is life imprisonment, it becomes max 15 years.

## 2. Complicity (*Deelneming*)
Complicity means acting as an accomplice or gang. According to <cite>Articles 55 and 56 of the KUHP</cite>, not only the executor is punished, but also:
- **The orderer**: A boss commanding a subordinate.
- **Co-perpetrators**: A friend holding the victim while they are beaten.
- **The instigator**: Persuading someone using money/promises.
- **The accessory/helper**: Providing keys or weapons to a thief/murderer.

## 3. Concurrence of Crimes (*Concursus*)
This is when one person commits MULTIPLE crimes before facing trial.
- **One act violating multiple laws**: (e.g., Public rape violates decency laws and the Criminal Code). The heaviest penalty is applied.
- **Multiple separate acts**: Stealing from house A, robbing house B the next day, burning house C. The penalty is combined, but cannot exceed the heaviest penalty plus 1/3.
"""
    },
    {
        "title": "Bab 6: Sistem Sanksi Pidana, Pembaruan KUHP Nasional (UU No. 1/2023), dan Korporasi",
        "content": """# Bab 6: Sistem Hukuman dan Pembaruan Hukum Nasional

## 1. Jenis-Jenis Hukuman (Sanksi Pidana)
Jika seseorang terbukti bersalah di pengadilan, apa yang akan terjadi padanya? KUHP membaginya jadi dua:

- **Pidana Pokok**:
  1. Hukuman Mati (paling berat)
  2. Penjara
  3. Kurungan (biasanya untuk tindak pidana pelanggaran ringan)
  4. Denda (membayar uang ke kas negara)
  5. *Tambahan baru di UU No. 1/2023*: Kerja Sosial dan Pengawasan (jadi tidak semua kejahatan kecil harus masuk penjara!).

- **Pidana Tambahan**: 
  1. Pencabutan hak tertentu (misal: pejabat korupsi dicabut haknya dipilih jadi bupati).
  2. Perampasan barang milik pelaku.
  3. Pengumuman putusan hakim ke publik.

## 2. Pembaruan: KUHP Nasional (<cite>UU No. 1 Tahun 2023</cite>)
Mulai tahun 2026, Indonesia akan sepenuhnya memakai KUHP baru buatan anak bangsa. Apa bedanya?
- **Fokus Keadilan Restoratif**: Kalau kasusnya ringan, diutamakan damai dan pemulihan, penjara adalah jalan paling terakhir (*ultimum remedium*).
- **Hukuman Mati Ada Masa Percobaan**: Terpidana mati diberi waktu 10 tahun untuk berkelakuan baik. Jika berkelakuan baik, hukumannya turun jadi seumur hidup.
- **Hukum Adat Diakui**: Hukum adat yang tidak tertulis resmi diakui dalam KUHP Nasional.

## 3. Kejahatan Perusahaan (Korporasi)
Dulu, yang bisa dipenjara cuma "manusia biasa". Tapi sekarang, kalau ada PT (Perusahaan) yang merusak hutan atau buang limbah sembarangan, **Perusahaan itu bisa dihukum**. 

Karena perusahaan tidak punya badan fisik, maka hukumannya bukan penjara, melainkan **Denda yang sangat besar**, pencabutan izin usaha, atau penyitaan seluruh aset kekayaan perusahaan.
""",
        "contentEn": """# Chapter 6: The Penal Sanction System, National Criminal Code Renewal, and Corporations

## 1. Types of Punishments (Criminal Sanctions)
If proven guilty in court, what happens to the offender? The Criminal Code divides it into two:

- **Principal Punishments**:
  1. Death Penalty (most severe)
  2. Imprisonment
  3. Confinement (usually for minor violations)
  4. Fines (paying money to the state treasury)
  5. *New additions in Law No. 1/2023*: Social Work and Supervision (so minor offenses don't require jail!).

- **Additional Punishments**:
  1. Revocation of specific rights (e.g., corrupt officials losing the right to run for office).
  2. Seizure of the perpetrator's property.
  3. Public announcement of the judge's verdict.

## 2. Renewal: The National Criminal Code (<cite>Law No. 1 of 2023</cite>)
Starting in 2026, Indonesia will fully transition to the new, domestically created KUHP. What's new?
- **Focus on Restorative Justice**: For minor cases, peace and restoration are prioritized; prison is the absolute last resort (*ultimum remedium*).
- **Death Penalty with Probation**: Death row inmates get a 10-year probation period for good behavior. If they behave well, the sentence is reduced to life imprisonment.
- **Customary Law Recognized**: Unwritten customary laws are officially recognized in the National KUHP.

## 3. Corporate Crimes
In the past, only "natural humans" could be punished. But now, if a Corporation (PT) destroys a forest or dumps toxic waste, **the Corporation can be punished**.

Since companies lack physical bodies, the punishment isn't jail, but **massive Fines**, revocation of business licenses, or confiscation of all corporate assets.
"""
    }
]

for idx, chap in enumerate(new_chapters):
    if idx < len(pidana_data.get('chapters', [])):
        pidana_data['chapters'][idx]['content'] = chap['content']
        pidana_data['chapters'][idx]['contentEn'] = chap['contentEn']

with open(pidana_file, 'w', encoding='utf-8') as f:
    json.dump(pidana_data, f, indent=2, ensure_ascii=False)

print("Pidana rewritten successfully!")
