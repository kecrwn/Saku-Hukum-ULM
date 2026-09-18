import json

# ==========================================
# 1. KEJAKSAAN RI
# ==========================================
with open("src/lib/books/kejaksaan_ri.json", "r") as f:
    kejaksaan_data = json.load(f)

# Bab 1
kejaksaan_data["chapters"][0]["content"] = """# Bab 1: Kedudukan Kejaksaan dalam Sistem Ketatanegaraan

## Kejaksaan sebagai Alat Negara
Kejaksaan Republik Indonesia adalah lembaga pemerintah yang bertugas menjalankan kekuasaan negara, khususnya di bidang penuntutan. Meskipun secara struktur Kejaksaan adalah bagian dari kekuasaan eksekutif (pemerintah), dalam menegakkan hukum, Kejaksaan harus bersikap mandiri dan bebas dari campur tangan pihak mana pun.

## Jaksa Agung
Pimpinan tertinggi di Kejaksaan adalah **Jaksa Agung**. Jaksa Agung dipilih, diangkat, dan diberhentikan secara langsung oleh Presiden."""

kejaksaan_data["chapters"][0]["contentEn"] = """# Chapter 1: The Position of the Prosecution Service in the State System

## The Prosecution Service as a State Apparatus
The Republic of Indonesia Prosecution Service is a government institution responsible for exercising state power, specifically in prosecution. Although structurally part of the executive branch, it must remain independent and free from interference when enforcing the law.

## The Attorney General
The highest leader of the Prosecution Service is the **Attorney General**. The Attorney General is directly appointed and dismissed by the President."""

# Bab 2
kejaksaan_data["chapters"][1]["content"] = """# Bab 2: Fungsi dan Kewenangan Kejaksaan

## Penuntutan Pidana
Dalam sistem peradilan pidana, Kejaksaan memiliki wewenang penuh dan mutlak (*dominus litis*). Artinya, hanya Kejaksaan yang bisa menentukan apakah suatu kasus pidana sudah cukup bukti untuk dibawa ke pengadilan atau tidak.

## Jaksa Pengacara Negara (JPN)
Di bidang perdata dan tata usaha negara, Jaksa juga bisa bertindak sebagai **Jaksa Pengacara Negara (JPN)**. Jaksa dapat mewakili dan membela kepentingan pemerintah atau lembaga negara di dalam maupun di luar pengadilan."""

kejaksaan_data["chapters"][1]["contentEn"] = """# Chapter 2: Functions and Authorities of the Prosecution Service

## Criminal Prosecution
In the criminal justice system, the Prosecution Service holds absolute authority (*dominus litis*). They control the case and decide whether a criminal case has enough evidence to be brought to court.

## State Attorney
In civil and administrative law, prosecutors can also act as **State Attorneys**. In this role, they represent and defend the interests of the government or state institutions both inside and outside of court."""

with open("src/lib/books/kejaksaan_ri.json", "w") as f:
    json.dump(kejaksaan_data, f, indent=2, ensure_ascii=False)

# ==========================================
# 2. ILMU NEGARA (Sample Chapters 1 & 2)
# ==========================================
with open("src/lib/books/ilmu_negara.json", "r") as f:
    ilmu_negara_data = json.load(f)

if len(ilmu_negara_data.get("chapters", [])) > 0:
    ilmu_negara_data["chapters"][0]["content"] = """# Bab 1: Obyek Ilmu Negara dan Sistematika Georg Jellinek

## 1. Pengantar Dasar
**Ilmu Negara** adalah mata kuliah wajib bagi mahasiswa hukum. Mata kuliah ini memberikan dasar teori untuk memahami Hukum Tata Negara (HTN) dan Hukum Administrasi Negara (HAN). 

> **Prof. Mr. Kranenburg** menyatakan: *"Ilmu Negara adalah ilmu yang menyelidiki struktur, bentuk, sifat dasar, dan asas-asas pokok dari negara secara umum."*

Intinya, Ilmu Negara tidak mempelajari negara tertentu (seperti Indonesia), tetapi mempelajari konsep **negara secara umum dan abstrak**.

## 2. Tokoh Penting: Georg Jellinek
**Georg Jellinek** sering disebut sebagai Bapak Ilmu Negara Modern. Ia membagi ilmu kenegaraan menjadi:
- **Ilmu Negara Umum (*Allgemeine Staatslehre*)**: Mempelajari negara secara universal.
- **Ilmu Negara Khusus (*Besondere Staatslehre*)**: Mempelajari asas umum pada konteks yang lebih spesifik.

## 3. Obyek Ilmu Negara
- **Obyek Materiil (Apa yang diteliti)**: Negara sebagai organisasi manusia.
- **Obyek Formil (Cara melihatnya)**: Asas-asas pokok tentang asal-usul, bentuk, dan tujuan negara secara umum.

**Bedanya dengan Hukum Tata Negara (HTN)?**
Ilmu Negara itu bersifat teoretis dan tidak terikat ruang/waktu. Sedangkan HTN sangat terikat pada tempat dan waktu tertentu (misalnya, HTN Indonesia tahun 1945)."""

    ilmu_negara_data["chapters"][0]["contentEn"] = """# Chapter 1: The Object of State Theory and Georg Jellinek's Systematics

## 1. Basic Introduction
**State Theory (Ilmu Negara)** is a mandatory course for law students. It provides the theoretical foundation to understand Constitutional Law and Administrative Law.

> **Prof. Mr. Kranenburg** stated: *"State Theory is the science that investigates the structures, forms, essential characteristics, and fundamental principles of the state in general."*

In short, State Theory does not study a specific state (like Indonesia) but studies the **concept of the state abstractly and universally**.

## 2. Key Figure: Georg Jellinek
**Georg Jellinek** is known as the Father of Modern State Theory. He structured state sciences into:
- **General State Theory (*Allgemeine Staatslehre*)**: Studies the state universally.
- **Special State Theory (*Besondere Staatslehre*)**: Applies general principles to specific contexts.

## 3. The Object of Study
- **Material Object (What is studied)**: The State as a human organization.
- **Formal Object (How it is viewed)**: Fundamental principles about the origin, form, and purpose of the state in general."""

if len(ilmu_negara_data.get("chapters", [])) > 1:
    ilmu_negara_data["chapters"][1]["content"] = """# Bab 2: Asal Mula dan Teori Terjadinya Negara

## 1. Pendahuluan
Dari mana asalnya sebuah negara? Mengapa manusia mau tunduk pada aturan bersama? Pertanyaan ini dijawab lewat dua cara: **teori (pemikiran filsafat)** dan **sejarah nyata**.

## 2. Teori-Teori Terjadinya Negara

### A. Teori Ketuhanan
Negara diciptakan oleh Tuhan, dan kekuasaan pemimpin negara berasal dari kehendak Tuhan. Contoh: Firaun di Mesir Kuno.

### B. Teori Perjanjian Masyarakat (Kontrak Sosial)
Negara lahir karena kesepakatan orang-orang yang awalnya hidup bebas tanpa aturan. Tiga tokoh utamanya:
- **Thomas Hobbes**: Manusia itu seperti serigala bagi manusia lain (*homo homini lupus*). Agar tidak saling membunuh, mereka menyerahkan semua haknya kepada penguasa mutlak (Raja).
- **John Locke**: Manusia sejak lahir punya hak asasi (hidup, kebebasan, harta). Mereka membuat perjanjian untuk membuat negara yang tugasnya *melindungi hak asasi* tersebut.
- **Jean-Jacques Rousseau**: Negara harus dipimpin oleh kehendak bersama (kedaulatan rakyat).

### C. Teori Kekuasaan
Negara terbentuk karena kelompok yang kuat menaklukkan kelompok yang lemah. Si pemenang lalu mendirikan negara untuk mempertahankan kekuasaannya.

## 3. Proses Terjadinya Negara di Dunia Nyata
Secara sejarah, negara bisa lahir melalui beberapa cara:
- **Proklamasi Kemerdekaan**: Wilayah jajahan menyatakan kemerdekaannya. (Contoh: Indonesia merdeka pada 17 Agustus 1945).
- **Pemisahan Diri (*Secession*)**: Suatu wilayah memisahkan diri dari negara induknya. (Contoh: Timor Leste dari Indonesia).
- **Peleburan (*Fusi*)**: Beberapa negara bergabung menjadi satu negara baru. (Contoh: Jerman Barat dan Jerman Timur)."""

    ilmu_negara_data["chapters"][1]["contentEn"] = """# Chapter 2: The Origin and Theories of State Formation

## 1. Introduction
Where does a state come from? Why do people submit to common rules? This is answered through **philosophical theories** and **actual history**.

## 2. Theories of State Formation

### A. Divine Right Theory
The state was created by God, and a ruler's power comes from divine will. Example: Pharaohs in Ancient Egypt.

### B. Social Contract Theory
The state was born from the agreement of free individuals. Three main thinkers:
- **Thomas Hobbes**: Humans are like wolves to others. To avoid chaos, they surrender all rights to an absolute ruler.
- **John Locke**: Humans have natural rights (life, liberty, property). They create a state to *protect* these rights.
- **Jean-Jacques Rousseau**: The state must be guided by the general will (popular sovereignty).

### C. Power / Force Theory
The state was formed when a strong group conquered a weaker group. The victors established the state to maintain control.

## 3. Real Historical State Formation
Historically, states are formed through various events:
- **Proclamation of Independence**: A colonized territory declares its freedom. (Example: Indonesia on August 17, 1945).
- **Secession**: A region separates from its parent state. (Example: Timor Leste from Indonesia).
- **Fusion**: Multiple states merge into a new single state. (Example: West and East Germany)."""

with open("src/lib/books/ilmu_negara.json", "w") as f:
    json.dump(ilmu_negara_data, f, indent=2, ensure_ascii=False)
