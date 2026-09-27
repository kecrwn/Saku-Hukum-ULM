<div align="center">

# ⚖️ Saku Hukum ULM 🎓✨

### *Level-up Literasi Hukum Kamu! • Level-up Your Legal Literacy!*

[![Version](https://img.shields.io/badge/Version-3.0.0-FF6B6B?style=flat&logo=rocket&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-4ECDC4?style=flat)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18%2B-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Next_PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vercel AI SDK](https://img.shields.io/badge/AI_SDK-OpenAI_Provider-000000?style=flat&logo=openai&logoColor=white)](https://sdk.vercel.ai/)

*Belajar hukum gak pernah seasik ini! 🚀 • Studying law has never been this accessible!*

[Tentang / About](#-tentang--about) • [Fitur / Features](#-fitur-utama--key-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Struktur Proyek](#-struktur-proyek--structure) • [Lisensi](#-lisensi--license)

---

</div>

## 📖 Tentang / About

**Saku Hukum ULM** adalah platform interaktif dan asisten hukum cerdas yang dirancang untuk membantu mahasiswa Fakultas Hukum Universitas Lambung Mangkurat (ULM), akademisi, praktisi, dan masyarakat luas memahami seluk-beluk hukum Indonesia secara mudah, cepat, dan menyenangkan.

*Saku Hukum ULM is an interactive legal intelligence platform designed for students at the Faculty of Law, Lambung Mangkurat University (ULM), legal scholars, practitioners, and citizens to explore and master Indonesian law easily and intuitively.*

Dilengkapi dengan agen AI spesialis kejaksaan (*Jaksa AI*), kamus pasal KUHP/KUHAP/UU terstruktur, alur perkara interaktif, serta simulator studi kasus, Saku Hukum ULM menghadirkan sarana belajar hukum modern dalam format Progressive Web App (PWA) yang dapat diakses dari perangkat apa saja.

---

## 🔥 Fitur Utama / Key Features

### 🤖 Chatbot Jaksa (*AI Legal Assistant*)
> **Konsultasi hukum pintar 24/7:** Didukung Vercel AI SDK dan integrasi web scraping hukum real-time. Ajukan pertanyaan seputar pasal, tindak pidana, hukum perdata, maupun tata negara, dan dapatkan jawaban berbasis dasar hukum yang valid.

### 📖 Kamus Pasal (*Article Reference*)
> **Navigasi regulasi instan:** Database pasal-pasal hukum Indonesia (KUHP, KUHAP, UU ITE, Tipikor, dll.) dengan pencarian kilat, interpretasi hukum praktis, dan referensi doktrin.

### 🎯 Pusat Latihan (*Case Study Simulation*)
> **Simulasi analisis kasus nyata:** Uji ketajaman analisis hukum melalui studi kasus mulai dari tindak pidana korupsi hingga kejahatan siber. AI memberikan evaluasi penalaran dan skor secara real-time.

### 🔀 Alur Perkara (*Interactive Visual Flowcharts*)
> **Visualisasi tahapan peradilan:** Pahami alur hukum acara pidana dan perdata—mulai dari penyelidikan, penyidikan, penuntutan di kejaksaan, persidangan di pengadilan, hingga eksekusi putusan.

### 📚 Glosarium Istilah Hukum (*Legal Glossary*)
> **Terjemahan bahasa hukum ke bahasa awam:** Kamus istilah latin dan terminologi hukum teknis dengan penjelasan sederhana yang mudah dipahami semua orang.

### 📱 Progressive Web App (PWA)
> **Akses offline & installable:** Pasang aplikasi langsung ke layar utama ponsel Android/iOS untuk pengalaman belajar tanpa hambatan.

---

## 🛠 Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | Next.js (App Router, Server Actions) |
| **UI Library** | React, Radix UI Primitives, Lucide Icons |
| **Styling** | Tailwind CSS, PostCSS |
| **Artificial Intelligence** | Vercel AI SDK (`ai`), `@ai-sdk/openai` |
| **Offline & PWA** | `@ducanh2912/next-pwa` |
| **Research & Scraping** | `duck-duck-scrape` |

---

## 🚀 Quick Start

### Persyaratan / Prerequisites

- Node.js (v18.17 atau lebih baru)
- npm, pnpm, atau yarn

### Langkah Instalasi / Installation Steps

1. **Clone repositori:**
   ```bash
   git clone https://github.com/kecrwn/Saku-Hukum-ULM.git
   cd Saku-Hukum-ULM
   ```

2. **Pasang dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable:**
   Buat file `.env.local` pada direktori utama:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Build Produksi:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Struktur Proyek / Structure

```
Saku-Hukum-ULM/
├── public/              # Aset statis, ikon PWA & manifest
├── src/
│   ├── app/             # Next.js App Router (Rute halaman & API)
│   │   ├── api/chat/    # Rute AI Streaming Chatbot Jaksa
│   │   ├── kamus/       # Modul pencarian pasal & KUHP
│   │   ├── simulasi/    # Pusat latihan & studi kasus
│   │   └── alur/        # Visualisasi alur perkara
│   ├── components/      # Komponen UI (Radix UI & custom widgets)
│   ├── lib/             # Helper fungsi, konfigurasi AI & DB
│   └── shared/          # Schema tipe data TypeScript bersama
├── scripts/             # Skrip pemutakhiran data hukum
├── verify.sh            # Skrip validasi integritas data
└── package.json         # Konfigurasi dependensi proyek
```

---

## 📜 Lisensi / License

Saku Hukum ULM dirilis sebagai perangkat lunak sumber terbuka di bawah lisensi [MIT License](LICENSE).  
Bebas dipakai, dikembangkan, dan disebarluaskan untuk kemajuan literasi hukum di Indonesia.

---

<div align="center">

> *"Fiat Justitia Ruat Caelum — Hendaklah keadilan ditegakkan, walaupun langit akan runtuh."*

<sub>Dikembangkan dengan penuh dedikasi oleh <a href="https://github.com/kecrwn">Kecrwn</a> bersama Komunitas Fakultas Hukum ULM</sub>
</div>
