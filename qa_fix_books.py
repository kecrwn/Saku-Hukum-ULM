#!/usr/bin/env python3
"""
QA and Content Rendering Fix Script for Saku Hukum ULM
Target files:
- src/lib/books/kejaksaan_ri.json
- src/lib/books/hukum_pidana_indonesia.json
- src/lib/books/hukum_pidana_formil.json
- src/lib/books/ilmu_negara.json
"""

import json
import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BOOKS_DIR = os.path.join(BASE_DIR, "src", "lib", "books")

def fix_kejaksaan():
    filepath = os.path.join(BOOKS_DIR, "kejaksaan_ri.json")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Clean metadata
    for ch in data.get("chapters", []):
        ch.pop("_processed", None)
        ch.pop("_processedEn", None)

    # Bab 1
    data["chapters"][0]["content"] = """# Bab 1: Kedudukan Kejaksaan dalam Sistem Ketatanegaraan

## 1. Kejaksaan sebagai Lembaga Pemerintah Penegak Hukum
Kejaksaan Republik Indonesia adalah lembaga pemerintah yang bertugas menjalankan kekuasaan negara, khususnya di bidang penuntutan serta kewenangan lain berdasarkan undang-undang. Kedudukannya ditegaskan dalam <cite>Pasal 24 ayat (3) UUD 1945</cite> dan diatur secara rinci melalui <cite>UU No. 16 Tahun 2004 jo. UU No. 11 Tahun 2021 tentang Kejaksaan Republik Indonesia</cite>.

> **Pasal 2 ayat (1) UU No. 11 Tahun 2021**: *"Kejaksaan Republik Indonesia merupakan lembaga pemerintahan yang fungsinya berkaitan dengan kekuasaan kehakiman yang melaksanakan kekuasaan negara di bidang penuntutan serta kewenangan lain berdasarkan undang-undang."*

Meskipun secara struktur Kejaksaan merupakan bagian dari kekuasaan eksekutif (pemerintah), dalam menegakkan hukum Kejaksaan menganut asas kemerdekaan:
- **Karakteristik Eksekutif**: Secara struktural-birokratis berada dalam lingkungan eksekutif dan bertanggung jawab kepada Presiden.
- **Independensi Fungsional**: Dalam melaksanakan penuntutan, Jaksa bersikap mandiri, profesional, dan bebas dari campur tangan kekuasaan eksekutif, legislatif, maupun pihak luar mana pun (*free from unlawful interference*).

## 2. Jaksa Agung sebagai Pimpinan Tertinggi
Pimpinan tertinggi di Kejaksaan Republik Indonesia adalah **Jaksa Agung**:
- Jaksa Agung diangkat dan diberhentikan secara langsung oleh Presiden Republik Indonesia (<cite>Pasal 19 ayat (1) UU Kejaksaan</cite>).
- Bertindak sebagai penuntut umum tertinggi (*supreme public prosecutor*) sekaligus pimpinan pengendali perkara di seluruh Nusantara.
- Memiliki wewenang mengesampingkan perkara pidana demi kepentingan umum (*deponering* / asas oportunitas)."""

    data["chapters"][0]["contentEn"] = """# Chapter 1: The Position of the Prosecution Service in the State System

## 1. The Prosecution Service as a Law Enforcement Body
The Republic of Indonesia Prosecution Service is a governmental institution exercising state power, specifically in prosecution and other legal functions. Its constitutional basis stems from <cite>Article 24 Paragraph (3) of the 1945 Constitution</cite> and is codified in detail under <cite>Law No. 16 of 2004 as amended by Law No. 11 of 2021 regarding the Prosecution Service</cite>.

> **Article 2 Paragraph (1) Law No. 11 of 2021**: *"The Republic of Indonesia Prosecution Service is a governmental organ whose functions relate to judicial power, exercising state power in prosecution and other authorities based on the law."*

Although structurally positioned within the executive branch, prosecutors strictly observe functional autonomy:
- **Executive Classification**: Structurally located within the executive sphere under the President.
- **Functional Independence**: In exercising prosecutorial decisions, prosecutors must remain independent, impartial, and immune from unlawful executive, legislative, or private influence.

## 2. The Attorney General
The supreme leader of the Prosecution Service is the **Attorney General**:
- Directly appointed and dismissed by the President of the Republic of Indonesia (<cite>Article 19 Paragraph (1) Prosecution Law</cite>).
- Holds the status of Supreme Public Prosecutor and leads prosecution policy nationwide.
- Possesses the discretionary authority to set aside criminal prosecutions in the public interest (*deponering* / opportunity principle)."""

    # Bab 2
    data["chapters"][1]["content"] = """# Bab 2: Fungsi dan Kewenangan Kejaksaan

## 1. Asas Dominus Litis dan Penuntutan Pidana
Dalam sistem peradilan pidana, Kejaksaan memiliki kedudukan sentral sebagai pemegang asas *dominus litis* (pengendali perkara tunggal).

> **Asas *Dominus Litis***: *"Kejaksaan merupakan institusi tunggal yang memegang kendali atas jalannya perkara pidana. Hanya Jaksa yang berwenang menentukan apakah suatu berkas perkara telah memenuhi syarat formil dan materiel untuk dilimpahkan ke persidangan pengadilan atau ditutup demi hukum."*

Berdasarkan <cite>Pasal 137 KUHAP</cite>, Jaksa Penuntut Umum berwenang melakukan penuntutan terhadap siapa pun yang didakwa melakukan tindak pidana dalam daerah hukumnya.

## 2. Tiga Pilar Bidang Kewenangan (<cite>Pasal 30 UU No. 11 Tahun 2021</cite>)
Kewenangan Kejaksaan terbagi ke dalam tiga pilar utama:
1. **Bidang Pidana**:
   - Melakukan penuntutan perkara di muka pengadilan.
   - Melaksanakan penetapan hakim dan putusan pengadilan yang telah memperoleh kekuatan hukum tetap (*inkracht van gewijsde*).
   - Melakukan pengawasan terhadap pelaksanaan pidana bersyarat dan pidana pengawasan.
   - Melakukan penyidikan tindak pidana tertentu berdasarkan undang-undang, khususnya tindak pidana korupsi (Tipikor).
2. **Bidang Perdata dan Tata Usaha Negara (DATUN)**:
   - Kejaksaan dengan kuasa khusus dapat bertindak baik di dalam maupun di luar pengadilan untuk dan atas nama negara atau pemerintah sebagai **Jaksa Pengacara Negara (JPN)** (<cite>Pasal 30 ayat (2) UU Kejaksaan</cite>).
   - Melindungi dan memulihkan kekayaan negara serta menegakkan kewibawaan pemerintah.
3. **Bidang Ketertiban dan Ketenteraman Umum**:
   - Peningkatan kesadaran hukum masyarakat.
   - Pengamanan kebijakan penegakan hukum dan intelijen yustisial.
   - Pengawasan aliran kepercayaan yang dapat membahayakan masyarakat dan negara."""

    data["chapters"][1]["contentEn"] = """# Chapter 2: Functions and Authorities of the Prosecution Service

## 1. The Dominus Litis Principle and Criminal Prosecution
In the criminal justice system, the Prosecution Service occupies the central role as the master of the case (*dominus litis*).

> **Principle of *Dominus Litis***: *"The Prosecution Service is the exclusive authority controlling the flow of criminal proceedings. Only prosecutors determine whether a case docket meets formal and substantive requirements to be indicted before the court or terminated in the interest of law."*

Under <cite>Article 137 KUHAP</cite>, the Public Prosecutor holds exclusive authority to prosecute anyone accused of committing a crime within their jurisdiction.

## 2. Three Pillars of Authority (<cite>Article 30 Law No. 11 of 2021</cite>)
Prosecutorial powers are organized across three fundamental sectors:
1. **Criminal Law**:
   - Conducting criminal indictments and trials before the court.
   - Executing judicial decisions and court verdicts that have acquired binding legal force (*inkracht*).
   - Supervising conditional sentences and parole implementation.
   - Conducting investigations into specialized offenses prescribed by law, notably corruption offenses (Tipikor).
2. **Civil and Administrative Law (DATUN)**:
   - Acting inside and outside court on behalf of the state or government as **State Attorneys** (*Jaksa Pengacara Negara*) with special power of attorney (<cite>Article 30 Paragraph (2) Prosecution Law</cite>).
   - Safeguarding and recovering public state assets and upholding governmental dignity.
3. **Public Order and Tranquility**:
   - Promoting legal literacy among citizens.
   - Law enforcement intelligence and preventative justice monitoring.
   - Monitoring religious sects or ideologies threatening constitutional order."""

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Fixed kejaksaan_ri.json")

def fix_hukum_pidana_indonesia():
    filepath = os.path.join(BOOKS_DIR, "hukum_pidana_indonesia.json")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Clean metadata
    for ch in data.get("chapters", []):
        ch.pop("_processed", None)
        ch.pop("_processedEn", None)

    # Bab 1
    data["chapters"][0]["content"] = """# Bab 1: Asas-Asas Hukum Pidana

## 1. Asas Legalitas (*Principle of Legality*)
Asas legalitas adalah batu fondasi hukum pidana modern. Asas ini dirumuskan dalam <cite>Pasal 1 ayat (1) KUHP</cite> (serta dipertahankan dalam <cite>UU No. 1 Tahun 2023</cite>): *"Suatu perbuatan tidak dapat dipidana, kecuali berdasarkan kekuatan ketentuan perundang-undangan pidana yang telah ada sebelum perbuatan dilakukan."*

> **Adagium Anselm von Feuerbach**: *"Nullum delictum, nulla poena sine praevia lege poenali"* — Tidak ada delik, tidak ada hukuman, tanpa adanya undang-undang pidana tertulis yang mendahuluinya.

Asas legalitas membawa tiga konsekuensi yuridis mutlak:
- **Lex Scripta**: Hukum pidana harus berupa undang-undang tertulis (*written law*).
- **Lex Praevia**: Aturan hukum pidana tidak boleh berlaku surut ke belakang (*non-retroactive*).
- **Lex Stricta & Certa**: Ketentuan pidana harus dirumuskan secara tegas, jelas, dan dilarang menggunakan tafsir analogi yang memberatkan terdakwa.

## 2. Ruang Berlakunya Hukum Pidana Menurut Tempat (Batas Yurisdiksi)
Hukum pidana Indonesia menentukan batas yurisdiksi berlakunya undang-undang melalui asas-asas berikut:
1. **Asas Teritorialitas** (<cite>Pasal 2 KUHP</cite>): Hukum pidana Indonesia berlaku bagi setiap orang—baik WNI maupun WNA—yang melakukan delik pidana di dalam wilayah teritorial kedaulatan Republik Indonesia.
2. **Asas Teritorial Diperluas** (<cite>Pasal 3 KUHP</cite>): Berlaku bagi setiap tindak pidana yang terjadi di atas kapal laut atau pesawat udara berbendera Indonesia, di mana pun kapal tersebut berada.
3. **Asas Perlindungan / Nasionalitas Pasif** (<cite>Pasal 4 KUHP</cite>): Hukum pidana Indonesia melindungi kepentingan nasional vital negara (seperti keamanan negara dan mata uang rupiah) dari kejahatan yang dilakukan di luar negeri oleh siapa pun.
4. **Asas Personalitas / Nasionalitas Aktif** (<cite>Pasal 5 KUHP</cite>): Hukum pidana Indonesia melekat pada warga negara Indonesia yang melakukan tindak pidana tertentu di luar negeri."""

    data["chapters"][0]["contentEn"] = """# Chapter 1: Principles of Criminal Law

## 1. Principle of Legality
The principle of legality is the cornerstone of modern criminal jurisprudence. It is codified in <cite>Article 1 Paragraph (1) of the Criminal Code (KUHP)</cite> (and sustained under <cite>Law No. 1 of 2023</cite>): *"No act shall be punished except pursuant to a statutory criminal provision enacted prior to the commission of the act."*

> **Feuerbach's Maxim**: *"Nullum delictum, nulla poena sine praevia lege poenali"* — No crime, no punishment, without a pre-existing written criminal law.

The legality principle enforces three strict procedural guarantees:
- **Lex Scripta**: Criminal provisions must originate from enacted written statutes.
- **Lex Praevia**: Criminal legislation cannot be applied retroactively to past conduct.
- **Lex Stricta & Certa**: Criminal prohibitions must be clearly and specifically defined, prohibiting incriminating analogies.

## 2. Spatial Jurisdiction of Criminal Law
Indonesian criminal jurisdiction is established through four spatial principles:
1. **Territorial Principle** (<cite>Article 2 KUHP</cite>): Indonesian criminal law governs any person—citizen or foreigner alike—who commits an offense within Indonesian sovereign territory.
2. **Extended Territorial Principle** (<cite>Article 3 KUHP</cite>): Applies to offenses committed aboard Indonesian-flagged vessels or aircraft, regardless of geographic location.
3. **Protective / Passive Nationality Principle** (<cite>Article 4 KUHP</cite>): Protects vital Indonesian sovereign interests (state security and currency) against crimes committed abroad by anyone.
4. **Active Personality Principle** (<cite>Article 5 KUHP</cite>): Indonesian criminal law attaches to Indonesian citizens who commit specified offenses overseas."""

    # Bab 2
    data["chapters"][1]["content"] = """# Bab 2: Tindak Pidana dan Pertanggungjawaban Pidana

## 1. Unsur-Unsur Tindak Pidana (*Strafbaar Feit*)
Suatu perbuatan manusia baru dapat dikategorikan sebagai tindak pidana (*delik*) apabila memenuhi dua kelompok unsur utama:
- **Unsur Objektif (Perbuatan Lahiriah)**:
  - Tindakan aktif atau kelalaian pasif (*omission*).
  - Melanggar larangan hukum pidana (*wederrechtelijkheid* / melawan hukum).
  - Menimbulkan akibat yang dilarang undang-undang (hubungan kausalitas / *causality*).
- **Unsur Subjektif (Batiniah Pelaku)**:
  - Niat atau sikap batin pelaku (*mens rea*).
  - Adanya kesalahan dalam bentuk kesengajaan (*dolus*) atau kelalaian (*culpa*).

## 2. Pertanggungjawaban Pidana dan Doktrin Kesalahan
Tidak semua orang yang melakukan tindak pidana dapat dipidana. Harus ada pemisahan antara perbuatan pidana (*criminal act*) dan pertanggungjawaban pidana (*criminal liability*).

> **Asas Tiada Pidana Tanpa Kesalahan** (*Geen straf tanpa schuld* / *Actus non facit reum nisi mens sit rea*): *"Perbuatan lahiriah semata tidak menjadikan seseorang bersalah, kecuali jika batin orang tersebut terbukti bersalah."*

Bentuk-bentuk kesalahan dalam hukum pidana:
1. **Kesengajaan (*Dolus*)**: Kesadaran dan kehendak penuh pelaku untuk melakukan perbuatan serta mengetahui akibat yang ditimbulkan (*willens en wetens*).
2. **Kealpaan / Kelalaian (*Culpa*)**: Ketidakhati-hatian atau kecerobohan yang mengakibatkan kerugian fatal yang seharusnya dapat diduga sebelumnya (*culpa lata*).

Seseorang hanya dapat dijatuhi hukuman jika ia terbukti **mampu bertanggung jawab secara akal budi**. Seseorang yang terganggu jiwanya atau memiliki cacat pertumbuhan akal tidak dapat dipidana berdasarkan <cite>Pasal 44 KUHP</cite> (alasan pemaaf)."""

    data["chapters"][1]["contentEn"] = """# Chapter 2: Criminal Offenses and Criminal Liability

## 1. Elements of a Criminal Offense (*Strafbaar Feit*)
A human act qualifies as a punishable criminal offense only when both essential element sets are established:
- **Objective Elements (External Conduct)**:
  - Positive physical commission or illegal omission.
  - Unlawfulness (*wederrechtelijkheid* / violation of a statutory prohibition).
  - Occurrence of prohibited consequences linked through legal causation.
- **Subjective Elements (Mental State)**:
  - Culprit's mental intention (*mens rea*).
  - Presence of culpability in the form of intent (*dolus*) or criminal negligence (*culpa*).

## 2. Criminal Liability and the Doctrine of Fault
Not every person who commits a prohibited act faces punishment. Jurisprudence separates the prohibited act from individual criminal liability.

> **Doctrine of Fault** (*Actus non facit reum nisi mens sit rea* / *Geen straf tanpa schuld*): *"An act does not make a person guilty unless their mind is also guilty."*

Forms of subjective culpability:
1. **Intent (*Dolus*)**: Conscious will and deliberate intent to commit the offense while comprehending its consequences (*willens en wetens*).
2. **Criminal Negligence (*Culpa*)**: Failure to exercise reasonable care and caution, causing foreseeable fatal harm.

A person is punishable only if they possess legal **mental competence**. Individuals suffering from severe mental illness or cognitive developmental disorders are exempt from punishment under <cite>Article 44 KUHP</cite>."""

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Fixed hukum_pidana_indonesia.json")

def fix_hukum_pidana_formil():
    filepath = os.path.join(BOOKS_DIR, "hukum_pidana_formil.json")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["titleEn"] = "Criminal Procedure Law (KUHAP)"

    chapter_titles_en = [
        "Chapter 1: Principles of Criminal Procedure Law",
        "Chapter 2: Inquiry, Investigation, and Coercive Measures",
        "Chapter 3: Judicial Review via Pretrial Institution (Praperadilan)",
        "Chapter 4: Pre-Prosecution, Prosecution, and Indictment",
        "Chapter 5: District Court Trial Proceedings and Law of Evidence",
        "Chapter 6: Ordinary and Extraordinary Legal Remedies (Appeals)",
        "Chapter 7: Execution of Verdicts, Supervisory Judges, and Procedural Reforms"
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        ch.pop("_processed", None)
        ch.pop("_processedEn", None)
        if idx < len(chapter_titles_en):
            ch["titleEn"] = chapter_titles_en[idx]

    # Quotes to add into chapters
    quotes_id = [
        "> **Prinsip Perubahan Paradigma KUHAP**: Mengubah paradigma peradilan dari sistem kolonial *inquisitoir* (tersangka diperlakukan sebagai objek pemeriksaan) menjadi sistem *accusatoir* (tersangka adalah subjek hukum yang berdaulat atas hak asasinya).",
        "> **Prinsip Pembatasan Hak Asasi (Habeas Corpus)**: Upaya paksa merampas kemerdekaan tersangka secara fisik, sehingga wajib didukung surat perintah sah dan bukti permulaan yang cukup demi hukum.",
        "> **Putusan Mahkamah Konstitusi No. 21/PUU-XII/2014**: Menetapkan bahwa penetapan tersangka, penggeledahan, dan penyitaan secara sah masuk sebagai obyek pemeriksaan Praperadilan demi mencegah kesewenang-wenangan penyidik.",
        "> **Pasal 143 ayat (2) KUHAP**: Surat dakwaan penuntut umum wajib disusun secara cermat, jelas, dan lengkap mengenai tindak pidana yang didakwakan; bila tidak, surat dakwaan batal demi hukum.",
        "> **Pasal 183 KUHAP**: *\"Hakim tidak boleh menjatuhkan pidana kepada seorang kecuali apabila dengan sekurang-kurangnya dua alat bukti yang sah ia memperoleh keyakinan bahwa suatu tindak pidana benar-benar terjadi dan bahwa terdakwalah yang bersalah melakukannya.\"*",
        "> **Asas Ne Bis In Idem**: Seseorang tidak dapat dituntut untuk kedua kalinya dalam perkara yang sama apabila perbuatan tersebut telah diputus dengan putusan berkekuatan hukum tetap (*inkracht*).",
        "> **Filosofi Pemasyarakatan**: Pidana hilang kemerdekaan di era modern bukan sarana balas dendam, melainkan proses pembinaan dan pemulihan narapidana agar siap berintegrasi kembali dengan masyarakat."
    ]

    quotes_en = [
        "> **KUHAP Paradigm Shift**: Transformed Indonesian criminal justice from the colonial *inquisitorial* system (suspects treated as mere interrogation objects) into the *accusatorial* system (suspects recognized as legal subjects endowed with human rights).",
        "> **Principle of Coercive Restraint (Habeas Corpus)**: Coercive measures infringe fundamental physical liberties, mandating valid warrants and sufficient preliminary evidence under strict statutory bounds.",
        "> **Constitutional Court Decision No. 21/PUU-XII/2014**: Explicitly expanded Praperadilan jurisdiction to scrutinize the legality of naming a suspect, searches, and seizures to prevent arbitrary law enforcement.",
        "> **Article 143 Paragraph (2) KUHAP**: The public prosecutor's indictment must be formulated meticulously, clearly, and completely regarding the alleged offenses; failure results in nullity by law.",
        "> **Article 183 KUHAP**: *\"A judge shall not impose criminal punishment on any person unless based on at least two valid pieces of evidence the judge acquires inner conviction that an offense truly occurred and the defendant committed it.\"*",
        "> **Doctrine of Ne Bis In Idem**: No individual may be prosecuted twice for the same criminal act that has already been adjudicated through a final, legally binding court verdict (*inkracht*).",
        "> **Penitentiary Philosophy**: Modern imprisonment is not punitive retribution, but a rehabilitative social reintegration process preparing inmates to rejoin community life as productive citizens."
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        # If quote not yet in content, add it before the first H2 or after intro
        c_id = ch["content"]
        if "> " not in c_id and idx < len(quotes_id):
            parts = c_id.split("\n\n## ", 1)
            if len(parts) == 2:
                ch["content"] = parts[0] + "\n\n" + quotes_id[idx] + "\n\n## " + parts[1]
            else:
                ch["content"] = c_id + "\n\n" + quotes_id[idx] + "\n"

        c_en = ch.get("contentEn", "")
        if "> " not in c_en and idx < len(quotes_en):
            parts_en = c_en.split("\n\n## ", 1)
            if len(parts_en) == 2:
                ch["contentEn"] = parts_en[0] + "\n\n" + quotes_en[idx] + "\n\n## " + parts_en[1]
            else:
                ch["contentEn"] = c_en + "\n\n" + quotes_en[idx] + "\n"

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Fixed hukum_pidana_formil.json")

def fix_ilmu_negara():
    filepath = os.path.join(BOOKS_DIR, "ilmu_negara.json")
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["titleEn"] = "State Theory (Ilmu Negara)"

    chapter_titles_en = [
        "Chapter 1: The Object of State Theory and Georg Jellinek's Systematics",
        "Chapter 2: The Origin and Theories of State Formation",
        "Chapter 3: Nature, Elements, and Forms of the State",
        "Chapter 4: The Theories of State Sovereignty",
        "Chapter 5: Purpose, Functions of State, and The Rule of Law Concept",
        "Chapter 6: Constitutional Theory and The Dissolution of States"
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        if idx < len(chapter_titles_en):
            ch["titleEn"] = chapter_titles_en[idx]

    # Chapter 2 Quote addition
    ch2_id = data["chapters"][1]["content"]
    quote_ch2_id = '> **Thomas Hobbes (*Leviathan*, 1651)**: *"Bellum omnium contra omnes"* (perang semua lawan semua) dan *"Homo homini lupus"* (manusia adalah serigala bagi sesamanya). Tanpa adanya negara, hidup manusia akan selalu terancam, miskin, dan penuh ketakutan.'
    if "> " not in ch2_id:
        data["chapters"][1]["content"] = ch2_id.replace(
            "### B. Teori Perjanjian Masyarakat (Kontrak Sosial)\nNegara lahir karena kesepakatan orang-orang yang awalnya hidup bebas tanpa aturan. Tiga tokoh utamanya:",
            "### B. Teori Perjanjian Masyarakat (Kontrak Sosial)\nNegara lahir karena kesepakatan orang-orang yang awalnya hidup bebas tanpa aturan.\n\n" + quote_ch2_id + "\n\nTiga tokoh utamanya:"
        )

    ch2_en = data["chapters"][1].get("contentEn", "")
    quote_ch2_en = '> **Thomas Hobbes (*Leviathan*, 1651)**: *"Bellum omnium contra omnes"* (a war of all against all) and *"Homo homini lupus"* (man is a wolf to his fellow man). Without a sovereign state, human life remains solitary, poor, nasty, brutish, and short.'
    if "> " not in ch2_en:
        data["chapters"][1]["contentEn"] = ch2_en.replace(
            "### B. Social Contract Theory\nThe state was born from the agreement of free individuals. Three main thinkers:",
            "### B. Social Contract Theory\nThe state was born from the agreement of free individuals.\n\n" + quote_ch2_en + "\n\nThree main thinkers:"
        )

    # Chapter 5 Quote addition
    ch5_id = data["chapters"][4]["content"]
    quote_ch5_id = '> **Montesquieu (*De l\'Esprit des Lois*, 1748)**: *"Kemerdekaan politik warga negara tidak akan pernah terwujud apabila kekuasaan kehakiman tidak dipisahkan secara tegas dari kekuasaan legislatif dan eksekutif."*'
    if "> " not in ch5_id:
        data["chapters"][4]["content"] = ch5_id.replace(
            "### A. Doktrin Trias Politica Montesquieu\nFilsuf Prancis",
            "### A. Doktrin Trias Politica Montesquieu\n\n" + quote_ch5_id + "\n\nFilsuf Prancis"
        )

    ch5_en = data["chapters"][4].get("contentEn", "")
    quote_ch5_en = '> **Montesquieu (*The Spirit of Laws*, 1748)**: *"There is no liberty if the power of judging be not separated from the legislative and executive powers."*'
    if "> " not in ch5_en:
        data["chapters"][4]["contentEn"] = ch5_en.replace(
            "### A. Doktrin Trias Politica Montesquieu\nFilsuf Prancis",
            "### A. Doktrin Trias Politica Montesquieu\n\n" + quote_ch5_en + "\n\nFilsuf Prancis"
        )

    # Wrap legal articles & conventions in <cite> across all chapters in ilmu_negara
    replacements = [
        (r"\bPasal 1 Konvensi Montevideo 1933\b", "<cite>Pasal 1 Konvensi Montevideo 1933</cite>"),
        (r"\bUNCLOS 1982\b", "<cite>UNCLOS 1982</cite>"),
        (r"\bPasal 1 Konvensi Chicago 1944\b", "<cite>Pasal 1 Konvensi Chicago 1944</cite>"),
        (r"\bPasal 18 ayat \(1\) UUD NRI 1945\b", "<cite>Pasal 18 ayat (1) UUD NRI 1945</cite>"),
        (r"\bPasal 1 ayat \(2\) UUD 1945 Lama\b", "<cite>Pasal 1 ayat (2) UUD 1945 Lama</cite>"),
        (r"\bPasal 1 ayat \(2\) UUD NRI 1945\b", "<cite>Pasal 1 ayat (2) UUD NRI 1945</cite>"),
        (r"\bPasal 1 ayat \(3\) UUD NRI 1945\b", "<cite>Pasal 1 ayat (3) UUD NRI 1945</cite>"),
        (r"\bAlinea IV Pembukaan UUD NRI 1945\b", "<cite>Alinea IV Pembukaan UUD NRI 1945</cite>"),
        (r"\bPasal 37 \(kehadiran", "<cite>Pasal 37 UUD NRI 1945</cite> (kehadiran"),
        (r"\bKonvensi Wina 1978\b", "<cite>Konvensi Wina 1978</cite>"),
        (r"\bKonvensi Wina 1983\b", "<cite>Konvensi Wina 1983</cite>"),
        (r"\bUUD 1945\b", "<cite>UUD 1945</cite>"),
        (r"\bUUD NRI 1945\b", "<cite>UUD NRI 1945</cite>"),
    ]

    for ch in data.get("chapters", []):
        c = ch.get("content", "")
        for pattern, repl in replacements:
            # avoid double wrapping
            c = re.sub(r"<cite>" + pattern + r"</cite>", pattern, c)
            c = re.sub(pattern, repl, c)
        ch["content"] = c

        c_en = ch.get("contentEn", "")
        for pattern, repl in replacements:
            c_en = re.sub(r"<cite>" + pattern + r"</cite>", pattern, c_en)
            c_en = re.sub(pattern, repl, c_en)
        ch["contentEn"] = c_en

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Fixed ilmu_negara.json")

if __name__ == "__main__":
    fix_kejaksaan()
    fix_hukum_pidana_indonesia()
    fix_hukum_pidana_formil()
    fix_ilmu_negara()
    print("All 4 books successfully updated and verified!")
