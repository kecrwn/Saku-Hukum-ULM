import json
import os

book_path = '/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/lib/books/tatanegara.json'

with open(book_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Chapter 1
ch1_content = """# Bab 1: Pengertian, Ruang Lingkup, dan Sumber Hukum Tata Negara Indonesia

## 1. Apa Itu Hukum Tata Negara?

Hukum Tata Negara (HTN) adalah salah satu cabang hukum publik yang sangat penting. Secara sederhana, Hukum Tata Negara adalah aturan main tentang bagaimana sebuah negara disusun dan dijalankan. Kalau kita ibaratkan negara itu seperti sebuah organisasi besar, maka HTN adalah anggaran dasar yang mengatur siapa saja pengurusnya, apa tugas masing-masing, dan bagaimana hubungan antar pengurus tersebut.

Di berbagai negara, HTN punya nama yang berbeda-beda:
- **Belanda**: *Staatsrecht*
- **Prancis**: *Droit Constitutionnel*
- **Jerman**: *Verfassungsrecht*
- **Inggris**: *Constitutional Law*

## 2. Definisi Menurut Para Ahli

Supaya lebih jelas, mari kita lihat pendapat para ahli tentang HTN:

> **Christian van Vollenhoven**: "Hukum Tata Negara mengatur semua wewenang dari organ-organ (lembaga) negara."

> **Prof. Mr. J.H.A. Logemann**: Baginya, negara adalah organisasi kekuasaan yang isinya berupa jabatan-jabatan. "HTN adalah ilmu yang mempelajari jabatan apa saja yang ada dalam negara, siapa yang mengisi, apa tugasnya, dan bagaimana hubungannya."

> **Prof. Dr. Jimly Asshiddiqie, S.H.**: Beliau menyatakan bahwa HTN tidak hanya soal membagi kekuasaan, tapi juga tentang demokrasi, pembatasan kekuasaan, dan perlindungan Hak Asasi Manusia (HAM).

## 3. Bedanya HTN dengan Ilmu Lain

Kadang kita bingung membedakan HTN dengan ilmu yang mirip-mirip. Ini perbedaannya:
1. **Ilmu Negara**: Mempelajari negara secara teori dan umum (abstrak). Sedangkan HTN mempelajari negara secara nyata (konkret), seperti negara Indonesia dengan UUD 1945-nya.
2. **Hukum Administrasi Negara (HAN)**: Kata J. Oppenheim, HTN itu negara dalam keadaan "diam" (mengatur struktur lembaga), sedangkan HAN itu negara dalam keadaan "bergerak" (bagaimana lembaga itu melayani masyarakat sehari-hari).
3. **Ilmu Politik**: Kalau HTN adalah "kerangka tulangnya", maka Ilmu Politik adalah "daging dan darahnya" yang menggerakkan tulang tersebut (seperti partai politik dan manuver kekuasaan).

## 4. Sumber Hukum Tata Negara di Indonesia

Dari mana aturan HTN ini berasal? Ada dua sumber utama:

**A. Sumber Materiil** (Sumber nilai dan filosofi)
- <cite>Pancasila</cite>: Dasar filosofis dan norma tertinggi negara kita. Semua aturan tidak boleh bertentangan dengan Pancasila.

**B. Sumber Formil** (Aturan tertulis dan resmi)
Berdasarkan <cite>Pasal 7 UU No. 12 Tahun 2011</cite>, urutan aturan hukum di Indonesia adalah:
1. <cite>UUD NRI 1945</cite> (Konstitusi tertinggi)
2. <cite>Ketetapan MPR (TAP MPR)</cite>
3. <cite>Undang-Undang (UU)</cite> atau <cite>Perppu</cite>
4. <cite>Peraturan Pemerintah (PP)</cite>
5. <cite>Peraturan Presiden (Perpres)</cite>
6. <cite>Peraturan Daerah (Perda)</cite>

Selain itu, ada juga **Yurisprudensi** (putusan hakim, terutama Mahkamah Konstitusi) dan **Konvensi Ketatanegaraan** (kebiasaan bernegara yang tidak tertulis, contohnya pidato Presiden setiap tanggal 16 Agustus).

## 5. Asas-Asas Penting dalam HTN Indonesia

Sistem negara kita berdiri di atas pilar-pilar penting ini:
- **Asas Pancasila**: Nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan.
- **Asas Negara Hukum**: <cite>Pasal 1 ayat (3) UUD 1945</cite> menegaskan hukum adalah panglima tertinggi, bukan kekuasaan mutlak.
- **Asas Kedaulatan Rakyat (Demokrasi)**: Kekuasaan tertinggi ada di tangan rakyat (<cite>Pasal 1 ayat (2) UUD 1945</cite>).
- **Asas Pembagian Kekuasaan**: Lembaga-lembaga negara saling mengawasi supaya tidak ada yang sewenang-wenang (*checks and balances*).
- **Asas Negara Kesatuan**: Indonesia adalah negara kesatuan dengan pembagian daerah otonom (<cite>Pasal 1 ayat (1) UUD 1945</cite>).
"""

ch1_contentEn = """# Chapter 1: Introduction, Scope, and Sources of Constitutional Law

## 1. What is Constitutional Law?

Constitutional Law is a very important branch of public law. Simply put, Constitutional Law is the rulebook on how a country is structured and operated. If we imagine a country as a big organization, Constitutional Law is the founding document that determines who the managers are, what their jobs are, and how they interact.

In different countries, it has various names:
- **Netherlands**: *Staatsrecht*
- **France**: *Droit Constitutionnel*
- **Germany**: *Verfassungsrecht*
- **England/US**: *Constitutional Law*

## 2. Definitions by Experts

To make it clearer, let's look at what the experts say:

> **Christian van Vollenhoven**: "Constitutional Law regulates all the authorities of state organs (institutions)."

> **Prof. Mr. J.H.A. Logemann**: He views the state as an organization of power consisting of offices. "Constitutional Law studies what offices exist in a state, who fills them, their duties, and how they relate."

> **Prof. Dr. Jimly Asshiddiqie, S.H.**: He emphasizes that modern Constitutional Law is not just about distributing power, but also about democracy, limiting power, and protecting Human Rights.

## 3. Difference Between Constitutional Law and Other Sciences

1. **State Theory (Ilmu Negara)**: Studies the state abstractly and theoretically. Constitutional Law studies a specific state in reality (like Indonesia and its 1945 Constitution).
2. **Administrative Law**: Constitutional Law looks at the state at "rest" (the structure), while Administrative Law looks at the state in "motion" (how institutions serve the public daily).
3. **Political Science**: If Constitutional Law is the "skeleton," Political Science is the "flesh and blood" that moves the skeleton (like political parties and power dynamics).

## 4. Sources of Constitutional Law in Indonesia

**A. Material Sources**
- <cite>Pancasila</cite>: The philosophical foundation. No law can contradict it.

**B. Formal Sources**
Based on <cite>Article 7 of Law No. 12 of 2011</cite>, the hierarchy is:
1. <cite>The 1945 Constitution (UUD 1945)</cite>
2. <cite>MPR Decrees (TAP MPR)</cite>
3. <cite>Laws (UU)</cite> or <cite>Government Regulations in Lieu of Laws (Perppu)</cite>
4. <cite>Government Regulations (PP)</cite>
5. <cite>Presidential Regulations (Perpres)</cite>
6. <cite>Regional Regulations (Perda)</cite>

Other sources include **Jurisprudence** (court rulings, especially the Constitutional Court) and **Constitutional Conventions** (unwritten state customs).

## 5. Key Principles in Indonesian Constitutional Law

- **Pancasila Principle**: Religious, humanitarian, unity, democratic, and justice values.
- **Rule of Law**: <cite>Article 1(3) of UUD 1945</cite> states law is supreme.
- **Popular Sovereignty (Democracy)**: Power belongs to the people (<cite>Article 1(2) of UUD 1945</cite>).
- **Distribution of Power**: Institutions monitor each other (*checks and balances*).
- **Unitary State**: Indonesia is a unitary state with autonomous regions (<cite>Article 1(1) of UUD 1945</cite>).
"""

# Chapter 2
ch2_content = """# Bab 2: Konstitusi dan Sejarahnya di Indonesia

## 1. Apa Itu Konstitusi?

Kata "konstitusi" berasal dari bahasa Latin *constitutio* yang artinya membentuk atau menetapkan. Konstitusi adalah aturan dasar yang membentuk sebuah negara.

Apakah Konstitusi sama dengan Undang-Undang Dasar (UUD)?
Sebagian ahli menyamakan keduanya. Namun, ahli seperti **Herman Heller** membedakannya. Menurutnya, UUD hanyalah bagian dari konstitusi yang **tertulis**. Di luar UUD yang tertulis, masih ada aturan dasar negara yang tidak tertulis namun dipatuhi oleh masyarakat.

### Tujuan Konstitusi
Tujuan utama konstitusi adalah untuk **membatasi kekuasaan pemerintah**. Mengapa? Seperti pepatah terkenal dari Lord Acton: 
> *"Kekuasaan itu cenderung korup, dan kekuasaan mutlak pasti korup."*

Konstitusi mencegah pemimpin bertindak sewenang-wenang seperti seorang diktator dan melindungi kebebasan warga negara.

## 2. Sejarah UUD di Indonesia

Indonesia telah mengalami beberapa kali pergantian konstitusi karena dinamika politik:

### A. UUD 1945 Awal (1945 – 1949)
Disahkan sehari setelah kemerdekaan. Awalnya presiden sangat berkuasa (sistem presidensial). Namun untuk menunjukkan kepada dunia bahwa Indonesia adalah negara demokratis, dikeluarkanlah maklumat sehingga sistemnya berubah menjadi parlementer, di mana pemerintah dijalankan oleh seorang Perdana Menteri.

### B. Konstitusi RIS (1949 – 1950)
Belanda baru mau mengakui kemerdekaan Indonesia jika Indonesia berbentuk negara serikat (Republik Indonesia Serikat/RIS). Indonesia dipecah menjadi beberapa negara bagian. Sistem ini tidak bertahan lama karena rakyat Indonesia tidak mau dipecah belah.

### C. UUDS 1950 (1950 – 1959)
Indonesia kembali bersatu dan memakai UU Sementara (UUDS 1950) dengan sistem parlementer murni. Sayangnya, era ini penuh keributan politik. Kabinet (pemerintah) sering sekali jatuh dan berganti (7 kali dalam 9 tahun). Selain itu, dewan yang bertugas membuat UUD baru gagal mencapai kesepakatan.

### D. Era Dekrit Presiden & Orde Baru (1959 – 1998)
Karena negara dalam krisis, Presiden Soekarno mengeluarkan **Dekrit Presiden 5 Juli 1959** untuk kembali menggunakan UUD 1945.
Namun pada praktiknya, baik di era Soekarno (Orde Lama) maupun Soeharto (Orde Baru), UUD 1945 justru digunakan untuk memusatkan kekuasaan yang sangat besar pada sosok Presiden, mematikan demokrasi, dan menumbuhkan korupsi.

## 3. Reformasi Konstitusi (1999 – 2002)

Setelah Presiden Soeharto mundur pada tahun 1998 (Reformasi), bangsa Indonesia sadar bahwa naskah asli UUD 1945 punya banyak kelemahan, seperti aturan yang terlalu longgar dan kekuasaan presiden yang tak terbatas.

Oleh karena itu, MPR melakukan **Amandemen (Perubahan) UUD 1945** sebanyak empat kali dari tahun 1999 hingga 2002.

Beberapa kesepakatan penting sebelum mengubah UUD:
1. **Tidak akan mengubah Pembukaan UUD 1945** (karena memuat dasar negara Pancasila).
2. Tetap mempertahankan bentuk Negara Kesatuan (NKRI).
3. Memperkuat sistem presidensial.

**Hasil penting dari Amandemen:**
- Masa jabatan Presiden dibatasi maksimal 2 periode (10 tahun).
- Pembentukan lembaga baru seperti **Mahkamah Konstitusi (MK)** dan **Dewan Perwakilan Daerah (DPD)**.
- Pemilihan Presiden dilakukan secara langsung oleh rakyat.
- Jaminan Hak Asasi Manusia (HAM) dipertegas dan diperjelas.
"""

ch2_contentEn = """# Chapter 2: Constitution and Its History in Indonesia

## 1. What is a Constitution?

The word comes from Latin *constitutio*, meaning to establish or form. A constitution is the fundamental rule that forms a state.

Is it the same as the written Constitution (UUD)?
Some equate them, but experts like **Herman Heller** distinguish them. He argues that the written UUD is only a part of the overall constitution. There are also unwritten fundamental rules observed by the state.

### The Purpose of a Constitution
The main purpose is to **limit government power**. As Lord Acton famously said:
> *"Power tends to corrupt, and absolute power corrupts absolutely."*

The constitution prevents dictatorial behavior and protects citizens' freedoms.

## 2. History of Constitutions in Indonesia

Indonesia has changed its constitution several times due to political dynamics:

### A. The First UUD 1945 (1945 – 1949)
Passed a day after independence. Initially, the president had vast powers. However, to prove Indonesia was democratic, the system was practically changed to parliamentary, led by a Prime Minister.

### B. RIS Constitution (1949 – 1950)
The Dutch only recognized independence if Indonesia became a federal state (United States of Indonesia/RIS). The country was divided into states. This didn't last long because the people wanted unity.

### C. UUDS 1950 (1950 – 1959)
Indonesia reunited and used a Temporary Constitution (UUDS 1950) with a pure parliamentary system. Sadly, this era was politically chaotic with 7 different governments in 9 years. The assembly tasked to write a new constitution also failed.

### D. Presidential Decree & New Order (1959 – 1998)
Due to political crisis, President Soekarno issued a **Decree on July 5, 1959** to return to the UUD 1945.
However, during both Soekarno's and Soeharto's eras, the UUD 1945 was manipulated to centralize immense power in the President, killing democracy and fostering corruption.

## 3. Constitutional Reform (1999 – 2002)

After President Soeharto resigned in 1998, Indonesians realized the original UUD 1945 had flaws, like overly flexible rules and unlimited presidential power.

Thus, the parliament (MPR) **amended the UUD 1945** four times from 1999 to 2002.

Key agreements before amending:
1. **Never change the Preamble** (as it contains the state philosophy, Pancasila).
2. Maintain the Unitary State (NKRI).
3. Strengthen the presidential system.

**Important results of the Amendment:**
- The President's term is limited to a maximum of 2 terms.
- Creation of new institutions like the **Constitutional Court (MK)** and **Regional Representative Council (DPD)**.
- Direct presidential elections by the people.
- Stronger and clearer protections for Human Rights.
"""

# Chapter 3
ch3_content = """# Bab 3: Kelembagaan Negara dan Pembagian Kekuasaan

## 1. Konsep Trias Politica (Tiga Kekuasaan)

Agar tidak ada raja atau presiden yang bertindak seenaknya, filsuf **Montesquieu** memperkenalkan ide **Trias Politica**, yaitu membagi kekuasaan negara menjadi tiga:
1. **Legislatif**: Yang membuat undang-undang (contoh: DPR).
2. **Eksekutif**: Yang menjalankan negara dan undang-undang (contoh: Presiden).
3. **Yudikatif**: Yang mengadili pelanggar hukum (contoh: Hakim/Pengadilan).

Di zaman modern, pemisahan mutlak itu mustahil. Lembaga-lembaga ini harus saling bekerja sama namun tetap saling mengawasi. Sistem ini disebut **Checks and Balances** (Saling Mengawasi dan Mengimbangi).

## 2. Perubahan Lembaga Negara di Indonesia

Setelah UUD 1945 diamandemen (diubah), susunan lembaga negara kita berubah drastis.

**Dulu (Sebelum Reformasi):**
Ada lembaga tertinggi bernama **MPR**. Presiden tunduk kepada MPR. Akibatnya, Presiden bisa mengontrol MPR untuk melanggengkan kekuasaannya tanpa tersentuh hukum.

**Sekarang (Sesudah Reformasi):**
Tidak ada lagi "Lembaga Tertinggi". Semua lembaga negara sejajar posisinya di bawah aturan UUD 1945. Mereka saling mengontrol satu sama lain.

## 3. Lembaga-Lembaga Negara Utama Saat Ini

Berikut adalah lembaga-lembaga penting sesuai UUD 1945 yang baru:

### A. Majelis Permusyawaratan Rakyat (MPR)
Anggota MPR kini murni terdiri dari gabungan anggota DPR dan DPD. Tugas utamanya adalah:
- Mengubah dan menetapkan UUD 1945.
- Melantik Presiden dan Wakil Presiden.
- Memberhentikan Presiden di tengah masa jabatan jika terbukti melanggar hukum berat (*impeachment*).

### B. Dewan Perwakilan Rakyat (DPR)
Ini adalah lembaga yang menjadi pusat pembuatan undang-undang. Tiga fungsinya:
1. **Legislasi**: Membuat Undang-Undang bersama Presiden.
2. **Anggaran**: Menentukan anggaran negara (APBN).
3. **Pengawasan**: Mengawasi kinerja pemerintah.

### C. Dewan Perwakilan Daerah (DPD)
Lembaga baru ini anggotanya dipilih dari setiap provinsi. Tugasnya mewakili kepentingan daerah ke pusat, misalnya ikut membahas undang-undang yang berkaitan dengan daerah dan sumber daya alam.

### D. Presiden dan Wakil Presiden
Presiden memiliki dua peran utama:
- **Sebagai Kepala Negara**: Memegang kekuasaan atas militer, menyatakan perang atau damai, dan mengangkat duta besar.
- **Sebagai Kepala Pemerintahan**: Menjalankan roda pemerintahan sehari-hari, mengangkat menteri, dan melaksanakan undang-undang.

### E. Badan Pemeriksa Keuangan (BPK)
Lembaga yang sepenuhnya bebas dan mandiri untuk memeriksa uang negara. BPK memastikan uang rakyat digunakan dengan benar dan melaporkannya ke DPR/Penegak hukum jika ada korupsi.

### F. Kekuasaan Kehakiman (Pengadilan)
Ada tiga lembaga penting di sini:
1. **Mahkamah Agung (MA)**: Pengadilan tertinggi untuk perkara perdata, pidana, militer, dan agama.
2. **Mahkamah Konstitusi (MK)**: Pengadilan khusus untuk menguji Undang-Undang, memutus sengketa pemilu, dan memutus pembubaran partai politik.
3. **Komisi Yudisial (KY)**: Lembaga yang mengawasi perilaku dan etika para hakim agar tetap bersih dan jujur.
"""

ch3_contentEn = """# Chapter 3: State Institutions and Separation of Powers

## 1. The Trias Politica Concept

To prevent a king or president from acting arbitrarily, philosopher **Montesquieu** introduced the **Trias Politica**, dividing state power into three:
1. **Legislative**: Makes the laws (e.g., Parliament/DPR).
2. **Executive**: Runs the state and enforces laws (e.g., President).
3. **Judiciary**: Judges lawbreakers (e.g., Courts).

In modern times, strict separation is impossible. These institutions must cooperate but also keep an eye on each other. This is called the **Checks and Balances** system.

## 2. Changes in Indonesian State Institutions

After the UUD 1945 was amended, the structure of our state institutions changed drastically.

**Past (Before Reform):**
There was a supreme institution called **MPR**. The President answered to the MPR. As a result, the President could control the MPR to maintain untouchable power.

**Present (After Reform):**
There are no more "Supreme Institutions." All state organs are equal under the UUD 1945. They monitor and balance each other.

## 3. Main State Institutions Today

Here are the key institutions according to the new UUD 1945:

### A. People's Consultative Assembly (MPR)
Its members are now strictly composed of all DPR and DPD members. Its main duties are:
- Amending and enacting the Constitution.
- Inaugurating the President and Vice President.
- Impeaching the President during their term if proven guilty of severe crimes.

### B. House of Representatives (DPR)
This is the central law-making body. Its three functions:
1. **Legislation**: Making laws together with the President.
2. **Budgeting**: Determining the state budget (APBN).
3. **Oversight**: Supervising the government's performance.

### C. Regional Representative Council (DPD)
A new institution whose members are elected from every province. Its job is to represent regional interests, such as discussing laws related to regional autonomy and natural resources.

### D. President and Vice President
The President holds a dual role:
- **As Head of State**: Controls the military, declares war/peace, and appoints ambassadors.
- **As Head of Government**: Runs the daily administration, appoints ministers, and implements laws.

### E. Supreme Audit Agency (BPK)
A fully independent body that audits state finances. BPK ensures public money is used properly and reports corruption to the DPR or law enforcement.

### F. Judicial Power (The Courts)
There are three main bodies here:
1. **Supreme Court (MA)**: The highest court for civil, criminal, military, and religious cases.
2. **Constitutional Court (MK)**: A special court to review Laws, resolve election disputes, and dissolve political parties.
3. **Judicial Commission (KY)**: An institution that monitors the behavior and ethics of judges to keep them clean and honest.
"""

# Chapter 4
ch4_content = """# Bab 4: Sistem Pemerintahan, Pemilu, dan HAM

## 1. Sistem Presidensial di Indonesia

Indonesia menganut **Sistem Presidensial**. Artinya, rakyat memilih langsung Presiden sebagai kepala pemerintahan dan kepala negara.
Beberapa ciri sistem presidensial kita:
- Presiden tidak dipilih oleh parlemen (DPR), melainkan langsung oleh rakyat lewat Pemilu.
- Masa jabatan Presiden sudah pasti (*fixed term*), yaitu 5 tahun, dan maksimal hanya boleh menjabat 2 kali (<cite>Pasal 7 UUD 1945</cite>).
- Presiden tidak bisa membubarkan DPR, dan sebaliknya DPR tidak bisa sembarangan menjatuhkan Presiden hanya karena beda pandangan politik.

## 2. Pemilihan Umum (Pemilu)

Untuk memilih pemimpin, kita menggunakan sistem Pemilu. Berdasarkan <cite>Pasal 22E UUD 1945</cite>, Pemilu harus berasaskan **LUBER JURDIL** (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil).

Pemilu diadakan setiap 5 tahun sekali untuk memilih:
- Anggota DPR dan DPRD (melalui Partai Politik)
- Anggota DPD (calon independen dari daerah)
- Presiden dan Wakil Presiden

Pemilu diselenggarakan oleh lembaga independen bernama **Komisi Pemilihan Umum (KPU)** dan diawasi oleh **Badan Pengawas Pemilu (Bawaslu)**.

## 3. Perlindungan Hak Asasi Manusia (HAM)

Salah satu kemajuan terbesar dalam UUD 1945 setelah amandemen adalah dimasukannya bab khusus tentang Hak Asasi Manusia, yaitu pada <cite>Bab XA (Pasal 28A sampai 28J)</cite>.

Setiap warga negara dijamin hak-hak dasarnya oleh negara, antara lain:
- **Hak untuk hidup** dan mempertahankan kehidupan.
- **Hak berkeluarga** dan melanjutkan keturunan.
- **Hak atas pendidikan** dan kesejahteraan.
- **Hak kebebasan beragama** dan beribadah.
- **Hak kebebasan berpendapat** dan berkumpul.

Namun perlu diingat, HAM di Indonesia bukanlah kebebasan mutlak tanpa batas. Menurut <cite>Pasal 28J UUD 1945</cite>, dalam menjalankan haknya, setiap orang **wajib tunduk pada pembatasan hukum** untuk menghargai hak orang lain serta menjaga ketertiban, keamanan, dan nilai-nilai agama.
"""

ch4_contentEn = """# Chapter 4: Presidential System, Elections, and Human Rights

## 1. Indonesia's Presidential System

Indonesia uses a **Presidential System**. This means the people directly elect the President as both the head of government and head of state.
Key features of our system:
- The President is not chosen by the parliament (DPR), but directly by the people.
- The President serves a *fixed term* of 5 years and can only hold office for a maximum of 2 terms (<cite>Article 7 of UUD 1945</cite>).
- The President cannot dissolve the DPR, and the DPR cannot easily dismiss the President simply over political differences.

## 2. General Elections (Pemilu)

To choose our leaders, we hold elections. Based on <cite>Article 22E of UUD 1945</cite>, elections must follow the principles of **Direct, Public, Free, Secret, Honest, and Fair** (LUBER JURDIL).

Elections are held every 5 years to elect:
- Members of the DPR and local councils (through Political Parties)
- Members of the DPD (independent regional candidates)
- The President and Vice President

Elections are organized by an independent body called the **General Election Commission (KPU)** and supervised by the **Election Supervisory Body (Bawaslu)**.

## 3. Protection of Human Rights (HAM)

One of the greatest achievements of the amended UUD 1945 is the inclusion of a specific chapter on Human Rights, found in <cite>Chapter XA (Articles 28A to 28J)</cite>.

Every citizen's basic rights are guaranteed by the state, including:
- **The right to live** and defend one's life.
- **The right to have a family** and descendants.
- **The right to education** and welfare.
- **Freedom of religion** and worship.
- **Freedom of expression** and assembly.

However, Human Rights in Indonesia are not absolute or unlimited. According to <cite>Article 28J of UUD 1945</cite>, in exercising their rights, everyone **must subject themselves to legal restrictions** to respect the rights of others and maintain public order, security, and religious values.
"""

# Chapter 5
ch5_content = """# Bab 5: Pengujian Undang-Undang dan Negara Hukum

## 1. Apa Itu Pengujian Yudisial?

Pernahkah kamu berpikir, apa jadinya jika DPR dan Presiden membuat Undang-Undang (UU) yang merugikan rakyat atau melanggar hak-hak kita di UUD 1945? 
Di sinilah pentingnya **Pengujian Yudisial** (*Judicial Review*).

*Judicial Review* adalah kewenangan pengadilan untuk membatalkan suatu peraturan hukum jika peraturan tersebut bertentangan dengan hukum yang lebih tinggi. 
Dalam Hukum Tata Negara Indonesia, wewenang ini dibagi dua:
1. **Mahkamah Agung (MA)** berwenang menguji peraturan di bawah undang-undang (seperti Peraturan Pemerintah atau Perda) jika bertentangan dengan Undang-Undang.
2. **Mahkamah Konstitusi (MK)** berwenang menguji Undang-Undang (UU) jika bertentangan dengan UUD 1945.

## 2. Peran Mahkamah Konstitusi (MK)

Mahkamah Konstitusi adalah lembaga yang dijuluki sebagai **"Pengawal Konstitusi"** (*The Guardian of the Constitution*). MK lahir setelah amandemen UUD 1945 untuk memastikan tidak ada lagi aturan yang dibuat secara sewenang-wenang.

Kewenangan utama MK:
- Menguji UU terhadap UUD 1945. Jika ada pasal UU yang melanggar UUD, MK bisa menghapusnya.
- Memutus sengketa kewenangan antar lembaga negara.
- Memutuskan pembubaran partai politik yang melanggar dasar negara.
- Memutus perselisihan hasil Pemilihan Umum.

Putusan MK bersifat **Final dan Mengikat**, artinya tidak bisa lagi dibanding atau digugat ke pengadilan lain.

## 3. Negara Hukum yang Demokratis

UUD 1945 menegaskan bahwa Indonesia adalah **Negara Hukum** (<cite>Pasal 1 ayat 3</cite>) yang berlandaskan **Demokrasi** (<cite>Pasal 1 ayat 2</cite>).

Negara Hukum (Rechtsstaat) berarti segala tindakan pemerintah dan warga negara harus didasarkan pada aturan hukum yang adil, bukan berdasarkan kekuasaan atau kekuatan fisik belaka.
Namun, hukum tersebut harus dibuat secara demokratis (melalui wakil rakyat), bukan dibuat secara otoriter. 

Inilah keseimbangan sempurna dari Hukum Tata Negara: **Hukum tanpa demokrasi akan menjadi kediktatoran, sedangkan demokrasi tanpa hukum akan menjadi kekacauan massal.** Keduanya harus berjalan beriringan untuk menciptakan negara yang adil dan makmur.
"""

ch5_contentEn = """# Chapter 5: Judicial Review and the Rule of Law

## 1. What is Judicial Review?

Have you ever wondered what happens if the Parliament and the President create a Law (UU) that harms the people or violates our constitutional rights?
This is where **Judicial Review** becomes crucial.

Judicial Review is the power of the courts to cancel a legal regulation if it contradicts a higher law.
In Indonesian Constitutional Law, this power is divided into two:
1. The **Supreme Court (MA)** has the authority to review regulations below a Law (like Government Regulations or Regional Regulations) against a Law.
2. The **Constitutional Court (MK)** has the authority to review a Law (UU) against the 1945 Constitution (UUD 1945).

## 2. The Role of the Constitutional Court (MK)

The Constitutional Court is known as **"The Guardian of the Constitution"**. It was created after the UUD 1945 amendments to ensure that no arbitrary laws are enacted.

Main authorities of the MK:
- Reviewing Laws against the Constitution. If a provision violates the Constitution, the MK can strike it down.
- Resolving authority disputes between state institutions.
- Deciding on the dissolution of political parties that violate state principles.
- Resolving disputes over election results.

MK decisions are **Final and Binding**, meaning they cannot be appealed to any other court.

## 3. Democratic Rule of Law

The 1945 Constitution explicitly states that Indonesia is a **State based on the Rule of Law** (<cite>Article 1(3)</cite>) founded on **Democracy** (<cite>Article 1(2)</cite>).

The Rule of Law (*Rechtsstaat*) means that all actions by the government and citizens must be based on just laws, not sheer power or physical force.
However, these laws must be created democratically (through the people's representatives), not arbitrarily.

This is the perfect balance in Constitutional Law: **Law without democracy becomes dictatorship, while democracy without law becomes mass chaos.** Both must walk hand-in-hand to create a just and prosperous nation.
"""

if len(data.get('chapters', [])) >= 5:
    data['chapters'][0]['content'] = ch1_content
    data['chapters'][0]['contentEn'] = ch1_contentEn
    data['chapters'][1]['content'] = ch2_content
    data['chapters'][1]['contentEn'] = ch2_contentEn
    data['chapters'][2]['content'] = ch3_content
    data['chapters'][2]['contentEn'] = ch3_contentEn
    data['chapters'][3]['content'] = ch4_content
    data['chapters'][3]['contentEn'] = ch4_contentEn
    data['chapters'][4]['content'] = ch5_content
    data['chapters'][4]['contentEn'] = ch5_contentEn
else:
    # Just assign sequentially if lengths differ
    contents = [(ch1_content, ch1_contentEn), (ch2_content, ch2_contentEn), (ch3_content, ch3_contentEn), (ch4_content, ch4_contentEn), (ch5_content, ch5_contentEn)]
    for i in range(min(len(data.get('chapters', [])), 5)):
        data['chapters'][i]['content'] = contents[i][0]
        data['chapters'][i]['contentEn'] = contents[i][1]

with open(book_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("SUCCESS")
