export interface Pasal {
  id: string;
  code: string; // e.g. "KUHP"
  articleNumber: string; // e.g. "338"
  chapter: string; // e.g. "Buku Kedua - Kejahatan"
  chapterEn?: string;
  officialText: string;
  officialTextEn?: string;
  explanation: string;
  explanationEn?: string;
  keywords: string[];
  relatedArticles: string[];
  imageRef?: string;
  caseLaw?: { citation: string; summary: string; summaryEn?: string }[];
}

export const pasalData: Pasal[] = [
  {
    "id": "uu1-2023-458",
    "code": "UU 1/2023",
    "articleNumber": "458",
    "chapter": "Buku II Bab XX - Tindak Pidana Terhadap Nyawa dan Janin",
    "chapterEn": "Book II Chapter XX - Crimes Against Life and Fetus",
    "officialText": "Setiap Orang yang dengan sengaja merampas nyawa orang lain, dipidana karena pembunuhan, dengan pidana penjara paling lama 15 (lima belas) tahun.",
    "officialTextEn": "Any person who deliberately takes the life of another person shall be punished for murder with a maximum imprisonment of fifteen years.",
    "explanation": "Pasal ini mengatur tindak pidana pembunuhan biasa berdasarkan UU No 1 Tahun 2023. Unsur utamanya tetap 'dengan sengaja' dan 'merampas nyawa orang lain'. Seseorang harus memiliki niat (dolus) untuk menghilangkan nyawa korban.",
    "explanationEn": "This article regulates the crime of ordinary murder based on Law No 1 of 2023. The main elements remain 'deliberately' and 'taking the life of another person'. A person must have the intention (dolus) to take the victim's life.",
    "keywords": [
      "pembunuhan",
      "nyawa",
      "sengaja",
      "penjara"
    ],
    "relatedArticles": [
      "459",
      "466"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-459",
    "code": "UU 1/2023",
    "articleNumber": "459",
    "chapter": "Buku II Bab XX - Tindak Pidana Terhadap Nyawa dan Janin",
    "chapterEn": "Book II Chapter XX - Crimes Against Life and Fetus",
    "officialText": "Setiap Orang yang dengan rencana terlebih dahulu merampas nyawa orang lain, dipidana karena pembunuhan berencana, dengan pidana mati, pidana penjara seumur hidup, atau pidana penjara paling lama 20 (dua puluh) tahun.",
    "officialTextEn": "Any person who with prior calculation takes the life of another person shall be punished for premeditated murder, with death penalty, life imprisonment, or a maximum imprisonment of twenty years.",
    "explanation": "Ini adalah pasal pembunuhan berencana di UU 1/2023 (dahulu Pasal 340 KUHP). Adanya unsur 'rencana terlebih dahulu' membedakannya dari pembunuhan biasa, dengan sanksi terberat mencapai pidana mati.",
    "explanationEn": "This is the premeditated murder article in Law 1/2023 (formerly Article 340 of the Criminal Code). The element of 'prior calculation' distinguishes it from ordinary murder, with the heaviest sanction reaching the death penalty.",
    "keywords": [
      "pembunuhan berencana",
      "nyawa",
      "pidana mati",
      "rencana"
    ],
    "relatedArticles": [
      "458"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-466",
    "code": "UU 1/2023",
    "articleNumber": "466",
    "chapter": "Buku II Bab XXI - Tindak Pidana Penganiayaan",
    "chapterEn": "Book II Chapter XXI - Crimes of Maltreatment",
    "officialText": "(1) Setiap Orang yang melakukan penganiayaan, dipidana dengan pidana penjara paling lama 2 (dua) tahun 6 (enam) bulan atau pidana denda paling banyak kategori IV. (2) Jika perbuatan sebagaimana dimaksud pada ayat (1) mengakibatkan Luka Berat, dipidana dengan pidana penjara paling lama 5 (lima) tahun. (3) Jika perbuatan sebagaimana dimaksud pada ayat (1) mengakibatkan matinya orang, dipidana dengan pidana penjara paling lama 7 (tujuh) tahun.",
    "officialTextEn": "(1) Any person who commits maltreatment shall be punished with a maximum imprisonment of two years and six months or a maximum category IV fine. (2) If it results in Severe Injury, they shall be punished with a maximum imprisonment of five years. (3) If it results in death, they shall be punished with a maximum imprisonment of seven years.",
    "explanation": "Ini adalah pasal utama untuk penganiayaan menurut KUHP Baru (dahulu 351). Hukuman penjara maksimal untuk penganiayaan biasa dikurangi menjadi 2,5 tahun (dari sebelumnya 2 tahun 8 bulan), tetapi denda disesuaikan dengan sistem kategori.",
    "explanationEn": "This is the main article for maltreatment under the New Criminal Code (formerly 351). The maximum imprisonment for ordinary maltreatment is reduced to 2.5 years (from 2 years 8 months), but the fine is adjusted to the category system.",
    "keywords": [
      "penganiayaan",
      "luka",
      "kekerasan fisik"
    ],
    "relatedArticles": [
      "467"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-476",
    "code": "UU 1/2023",
    "articleNumber": "476",
    "chapter": "Buku II Bab XXII - Tindak Pidana Pencurian",
    "chapterEn": "Book II Chapter XXII - Crimes of Theft",
    "officialText": "Setiap Orang yang mengambil suatu Barang yang sebagian atau seluruhnya milik orang lain, dengan maksud untuk dimiliki secara melawan hukum, dipidana karena pencurian, dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak kategori V.",
    "officialTextEn": "Any person who takes any property, which belongs wholly or partly to another person, with the intent to own it unlawfully, shall be punished for theft with a maximum imprisonment of five years or a maximum category V fine.",
    "explanation": "Pasal pokok tindak pidana pencurian dalam KUHP Baru (dahulu 362). Esensinya tetap sama: mengambil barang orang lain dengan maksud memilikinya secara melawan hukum.",
    "explanationEn": "The primary article for theft in the New Criminal Code (formerly 362). The essence remains the same: taking someone else's property with the intent to own it unlawfully.",
    "keywords": [
      "pencurian",
      "mengambil barang",
      "melawan hukum"
    ],
    "relatedArticles": [
      "477",
      "479"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-486",
    "code": "UU 1/2023",
    "articleNumber": "486",
    "chapter": "Buku II Bab XXIV - Tindak Pidana Penggelapan",
    "chapterEn": "Book II Chapter XXIV - Crimes of Embezzlement",
    "officialText": "Setiap Orang yang secara melawan hukum memiliki suatu Barang yang sebagian atau seluruhnya milik orang lain, yang ada dalam kekuasaannya bukan karena Tindak Pidana, dipidana karena penggelapan, dengan pidana penjara paling lama 4 (empat) tahun atau pidana denda paling banyak kategori IV.",
    "officialTextEn": "Any person who unlawfully owns any property that belongs wholly or partly to another person, which is in his possession not due to a Crime, shall be punished for embezzlement with a maximum imprisonment of four years or a maximum category IV fine.",
    "explanation": "Pasal tentang penggelapan di KUHP Baru (dahulu 372). Menghukum penguasaan melawan hukum atas barang yang sudah berada di tangan pelaku secara sah (misal barang titipan atau sewaan).",
    "explanationEn": "The article on embezzlement in the New Criminal Code (formerly 372). Punishes the unlawful possession of property that is already legally in the hands of the perpetrator (e.g., entrusted or rented goods).",
    "keywords": [
      "penggelapan",
      "barang titipan",
      "melawan hukum"
    ],
    "relatedArticles": [
      "476",
      "492"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-492",
    "code": "UU 1/2023",
    "articleNumber": "492",
    "chapter": "Buku II Bab XXV - Tindak Pidana Perbuatan Curang",
    "chapterEn": "Book II Chapter XXV - Crimes of Fraud",
    "officialText": "Setiap Orang yang dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan memakai nama palsu atau kedudukan palsu, menggunakan tipu muslihat atau rangkaian kebohongan, menggerakkan orang supaya menyerahkan suatu Barang, memberi utang, membuat pengakuan utang, atau menghapus piutang, dipidana karena penipuan, dengan pidana penjara paling lama 4 (empat) tahun atau pidana denda paling banyak kategori V.",
    "officialTextEn": "Any person who with the intent to unlawfully benefit himself or another person, by using a false name or false position, using trickery or a web of lies, moves a person to hand over a Property, give a debt, make a debt acknowledgment, or erase a receivable, shall be punished for fraud with a maximum imprisonment of four years or a maximum category V fine.",
    "explanation": "Ini adalah delik pokok penipuan di UU 1/2023 (dahulu 378). Mengatur tindak pidana memperdaya orang dengan kebohongan atau kedudukan palsu agar orang tersebut menyerahkan hartanya.",
    "explanationEn": "This is the primary fraud offense in Law 1/2023 (formerly 378). It regulates the crime of deceiving people with lies or false positions so that the person hands over their property.",
    "keywords": [
      "penipuan",
      "tipu muslihat",
      "kebohongan"
    ],
    "relatedArticles": [
      "486"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-414",
    "code": "UU 1/2023",
    "articleNumber": "414",
    "chapter": "Buku II Bab XV - Tindak Pidana Kesusilaan",
    "chapterEn": "Book II Chapter XV - Crimes Against Decency",
    "officialText": "Setiap Orang yang dengan Kekerasan atau Ancaman Kekerasan memaksa seseorang bersetubuh dengannya, dipidana karena melakukan perkosaan, dengan pidana penjara paling lama 12 (dua belas) tahun.",
    "officialTextEn": "Any person who by Violence or Threat of Violence forces someone to have sexual intercourse with them, shall be punished for committing rape with a maximum imprisonment of twelve years.",
    "explanation": "Pasal Perkosaan menurut KUHP Baru (dahulu 285). Kini menggunakan terminologi netral gender ('seseorang' bersetubuh 'dengannya'), memperluas cakupan dari KUHP lama yang hanya membatasi pelaku laki-laki terhadap korban perempuan.",
    "explanationEn": "The Rape Article under the New Criminal Code (formerly 285). It now uses gender-neutral terminology ('someone' having sexual intercourse 'with them'), expanding the scope from the old Criminal Code which only limited male perpetrators against female victims.",
    "keywords": [
      "pemerkosaan",
      "kekerasan",
      "kesusilaan",
      "persetubuhan"
    ],
    "relatedArticles": [
      "415"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-426",
    "code": "UU 1/2023",
    "articleNumber": "426",
    "chapter": "Buku II Bab XVI - Tindak Pidana Kesusilaan dan Perjudian",
    "chapterEn": "Book II Chapter XVI - Crimes Against Decency and Gambling",
    "officialText": "Setiap Orang yang tanpa izin menawarkan atau memberikan kesempatan untuk main judi dan menjadikannya sebagai pencarian, dipidana dengan pidana penjara paling lama 9 (sembilan) tahun atau pidana denda paling banyak kategori VI.",
    "officialTextEn": "Any person who without permission offers or provides an opportunity for gambling and makes it a profession, shall be punished with a maximum imprisonment of nine years or a maximum category VI fine.",
    "explanation": "Larangan perjudian dalam KUHP Baru (dahulu 303). Terdapat penyesuaian ancaman hukuman penjara menjadi maksimal 9 tahun dengan sistem denda kategori VI.",
    "explanationEn": "The prohibition of gambling in the New Criminal Code (formerly 303). There is an adjustment of the maximum imprisonment threat to 9 years with a category VI fine system.",
    "keywords": [
      "perjudian",
      "judi",
      "untung-untungan"
    ],
    "relatedArticles": [],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-262",
    "code": "UU 1/2023",
    "articleNumber": "262",
    "chapter": "Buku II Bab V - Tindak Pidana Terhadap Ketertiban Umum",
    "chapterEn": "Book II Chapter V - Crimes Against Public Order",
    "officialText": "(1) Setiap Orang yang dengan terang-terangan atau di muka umum dan dengan tenaga bersama melakukan kekerasan terhadap orang atau Barang, dipidana dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak kategori V.",
    "officialTextEn": "(1) Any person who openly or in public and jointly commits violence against a person or Property, shall be punished with a maximum imprisonment of five years or a maximum category V fine.",
    "explanation": "Tindak pidana pengeroyokan di KUHP Baru (dahulu 170). Ancaman pidana untuk bentuk standarnya disesuaikan menjadi 5 tahun, dari sebelumnya 5 tahun 6 bulan.",
    "explanationEn": "The crime of mob violence in the New Criminal Code (formerly 170). The criminal threat for the standard form is adjusted to 5 years, from previously 5 years 6 months.",
    "keywords": [
      "pengeroyokan",
      "kekerasan bersama",
      "ketertiban umum"
    ],
    "relatedArticles": [
      "466",
      "458",
      "521"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-415",
    "code": "UU 1/2023",
    "articleNumber": "415",
    "chapter": "Buku II Bab XV - Tindak Pidana Kesusilaan",
    "chapterEn": "Book II Chapter XV - Crimes Against Decency",
    "officialText": "Setiap Orang yang dengan Kekerasan atau Ancaman Kekerasan memaksa orang lain untuk melakukan atau membiarkan dilakukan Perbuatan Cabul, dipidana karena melakukan pencabulan, dengan pidana penjara paling lama 9 (sembilan) tahun.",
    "officialTextEn": "Any person who by Violence or Threat of Violence forces another person to commit or endure an Obscene Act, shall be punished for committing molestation, with a maximum imprisonment of nine years.",
    "explanation": "Pasal pencabulan dengan kekerasan menurut KUHP Baru (dahulu 289). Ancaman hukumannya tetap maksimal 9 tahun penjara.",
    "explanationEn": "The article on violent molestation under the New Criminal Code (formerly 289). The maximum penalty remains 9 years in prison.",
    "keywords": [
      "pencabulan",
      "kekerasan",
      "ancaman",
      "cabul"
    ],
    "relatedArticles": [
      "414"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-433",
    "code": "UU 1/2023",
    "articleNumber": "433",
    "chapter": "Buku II Bab XVII - Tindak Pidana Pencemaran",
    "chapterEn": "Book II Chapter XVII - Crimes of Defamation",
    "officialText": "(1) Setiap Orang yang dengan lisan menyerang kehormatan atau nama baik seseorang dengan menuduhkan suatu hal, yang maksudnya terang supaya hal itu diketahui umum, dipidana karena pencemaran, dengan pidana penjara paling lama 9 (sembilan) bulan atau pidana denda paling banyak kategori II. (2) Jika perbuatan sebagaimana dimaksud pada ayat (1) dilakukan dengan tulisan atau gambar yang disiarkan, dipertunjukkan, atau ditempelkan di tempat umum, dipidana karena pencemaran tertulis, dengan pidana penjara paling lama 1 (satu) tahun 6 (enam) bulan atau pidana denda paling banyak kategori III.",
    "officialTextEn": "(1) Any person who verbally attacks the honor or reputation of someone by accusing them of a matter, with the clear intention that it be known to the public, shall be punished for defamation with a maximum imprisonment of nine months or a maximum category II fine. (2) If it is done in writing or drawing... punished for written defamation with a maximum imprisonment of one year and six months or a maximum category III fine.",
    "explanation": "Pencemaran nama baik di UU 1/2023 (dahulu 310). Delik ini tetap delik aduan absolut (hanya bisa diproses jika diadukan oleh korban).",
    "explanationEn": "Defamation in Law 1/2023 (formerly 310). This offense remains an absolute complaint offense (can only be processed if complained by the victim).",
    "keywords": [
      "pencemaran nama baik",
      "penghinaan",
      "fitnah"
    ],
    "relatedArticles": [
      "436"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-521",
    "code": "UU 1/2023",
    "articleNumber": "521",
    "chapter": "Buku II Bab XXVIII - Tindak Pidana Penghancuran atau Perusakan Barang",
    "chapterEn": "Book II Chapter XXVIII - Crimes of Destroying or Damaging Property",
    "officialText": "Setiap Orang yang secara melawan hukum menghancurkan, merusak, membikin tak dapat dipakai, atau menghilangkan Barang yang sebagian atau seluruhnya milik orang lain, dipidana dengan pidana penjara paling lama 2 (dua) tahun 6 (enam) bulan atau pidana denda paling banyak kategori IV.",
    "officialTextEn": "Any person who unlawfully destroys, damages, renders unusable, or causes the loss of Property that belongs wholly or partly to another person, shall be punished with a maximum imprisonment of two years and six months or a maximum category IV fine.",
    "explanation": "Ini merupakan tindak pidana perusakan barang di KUHP Baru (dahulu 406). Ancaman kurungan maksimal menjadi 2 tahun 6 bulan (dari sebelumnya 2 tahun 8 bulan).",
    "explanationEn": "This is the crime of property destruction in the New Criminal Code (formerly 406). The maximum confinement threat is 2 years and 6 months (from previously 2 years and 8 months).",
    "keywords": [
      "perusakan",
      "barang",
      "menghancurkan"
    ],
    "relatedArticles": [
      "262"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-20",
    "code": "UU 1/2023",
    "articleNumber": "20",
    "chapter": "Buku I Bab II - Penyertaan",
    "chapterEn": "Book I Chapter II - Participation",
    "officialText": "Dipidana sebagai pembuat Tindak Pidana, Setiap Orang yang: a. melakukan sendiri Tindak Pidana; b. melakukan Tindak Pidana dengan perantaraan alat atau menyuruh orang lain yang tidak dapat dipertanggungjawabkan; c. turut serta melakukan Tindak Pidana; atau d. menggerakkan orang lain supaya melakukan Tindak Pidana.",
    "officialTextEn": "Punished as a perpetrator of a Crime, Any Person who: a. commits the Crime themselves; b. commits the Crime through an instrument or ordering another person who cannot be held accountable; c. participates in committing the Crime; or d. incites another person to commit the Crime.",
    "explanation": "Pasal Deelneming (Penyertaan) pada KUHP Baru kini diatur dalam Pasal 20 Buku I (dahulu 55). Rumusannya diperjelas untuk membedakan orang yang melakukan (pleger), yang menyuruh (doenpleger), turut serta (medepleger), dan yang menggerakkan (uitlokker).",
    "explanationEn": "The Deelneming (Participation) article in the New Criminal Code is now regulated in Article 20 of Book I (formerly 55). The formulation is clarified to distinguish the person who commits (pleger), orders (doenpleger), participates (medepleger), and incites (uitlokker).",
    "keywords": [
      "penyertaan",
      "pelaku",
      "turut serta"
    ],
    "relatedArticles": [
      "21"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-21",
    "code": "UU 1/2023",
    "articleNumber": "21",
    "chapter": "Buku I Bab II - Pembantuan",
    "chapterEn": "Book I Chapter II - Complicity",
    "officialText": "Dipidana sebagai pembantu Tindak Pidana, Setiap Orang yang: a. memberi kesempatan, sarana, atau keterangan untuk melakukan Tindak Pidana; atau b. memberi bantuan pada waktu Tindak Pidana dilakukan.",
    "officialTextEn": "Punished as an accomplice to a Crime, Any Person who: a. provides the opportunity, means, or information to commit the Crime; or b. provides assistance at the time the Crime is committed.",
    "explanation": "Ini adalah pengaturan 'Medeplichtigheid' atau perbantuan dalam KUHP Baru (dahulu 56). Ancaman pidana bagi pembantu maksimalnya adalah dua pertiga dari ancaman pidana maksimal bagi pelaku utama (Pasal 22).",
    "explanationEn": "This is the regulation of 'Medeplichtigheid' or complicity in the New Criminal Code (formerly 56). The maximum criminal threat for an accomplice is two-thirds of the maximum criminal threat for the main perpetrator (Article 22).",
    "keywords": [
      "pembantuan",
      "bantuan",
      "sarana"
    ],
    "relatedArticles": [
      "20"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-474",
    "code": "UU 1/2023",
    "articleNumber": "474",
    "chapter": "Buku II Bab XXI - Tindak Pidana yang Mengakibatkan Mati atau Luka karena Kealpaan",
    "chapterEn": "Book II Chapter XXI - Crimes Causing Death or Injury by Negligence",
    "officialText": "Setiap Orang yang karena kealpaannya mengakibatkan matinya orang, dipidana dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak kategori V.",
    "officialTextEn": "Any person who due to their negligence causes the death of a person, shall be punished with a maximum imprisonment of five years or a maximum category V fine.",
    "explanation": "Ini adalah delik kealpaan (culpa) yang mengakibatkan matinya orang, disesuaikan dari Pasal 359 KUHP lama ke Pasal 474 KUHP Baru. Tidak ada niat membunuh, melainkan murni ketidakhati-hatian.",
    "explanationEn": "This is the offense of negligence (culpa) resulting in the death of a person, adjusted from Article 359 of the old Criminal Code to Article 474 of the New Criminal Code. There is no intent to kill, rather purely carelessness.",
    "keywords": [
      "kelalaian",
      "kealpaan",
      "mati",
      "culpa"
    ],
    "relatedArticles": [
      "475",
      "458"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-475",
    "code": "UU 1/2023",
    "articleNumber": "475",
    "chapter": "Buku II Bab XXI - Tindak Pidana yang Mengakibatkan Mati atau Luka karena Kealpaan",
    "chapterEn": "Book II Chapter XXI - Crimes Causing Death or Injury by Negligence",
    "officialText": "(1) Setiap Orang yang karena kealpaannya mengakibatkan orang lain menderita Luka Berat, dipidana dengan pidana penjara paling lama 5 (lima) tahun atau pidana denda paling banyak kategori V. (2) Setiap Orang yang karena kealpaannya mengakibatkan orang lain menderita luka yang menimbulkan penyakit atau halangan menjalankan pekerjaan jabatan atau pencarian selama waktu tertentu, dipidana dengan pidana penjara paling lama 1 (satu) tahun atau pidana denda paling banyak kategori II.",
    "officialTextEn": "(1) Any person who due to their negligence causes another person to suffer Severe Injury, shall be punished with a maximum imprisonment of five years or a maximum category V fine. (2) Any person who due to their negligence causes another person injuries such that illness arises or it hinders them from performing their official duties or profession for a certain period, shall be punished with a maximum imprisonment of one year or a maximum category II fine.",
    "explanation": "Pasal kelalaian yang menyebabkan orang lain luka di UU 1/2023 (dahulu 360). Menggantikan pasal 360 KUHP lama, dengan menyesuaikan sistem denda menggunakan format kategori.",
    "explanationEn": "The negligence article that causes another person injury in Law 1/2023 (formerly 360). Replacing article 360 of the old Criminal Code, adjusting the fine system using a category format.",
    "keywords": [
      "kelalaian",
      "kealpaan",
      "luka berat"
    ],
    "relatedArticles": [
      "474"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-479",
    "code": "UU 1/2023",
    "articleNumber": "479",
    "chapter": "Buku II Bab XXII - Tindak Pidana Pencurian",
    "chapterEn": "Book II Chapter XXII - Crimes of Theft",
    "officialText": "Dipidana dengan pidana penjara paling lama 9 (sembilan) tahun, Setiap Orang yang melakukan pencurian yang didahului, disertai, atau diikuti dengan Kekerasan atau Ancaman Kekerasan terhadap orang, dengan maksud untuk mempersiapkan atau mempermudah pencurian, atau dalam hal tertangkap tangan, untuk memungkinkan melarikan diri sendiri atau peserta lainnya, atau untuk tetap menguasai Barang yang dicurinya.",
    "officialTextEn": "Punished with a maximum imprisonment of nine years, Any Person who commits theft preceded, accompanied, or followed by Violence or Threat of Violence against a person, with the intent to prepare or facilitate the theft, or in the case of being caught in the act, to enable oneself or other participants to escape, or to retain control of the stolen property.",
    "explanation": "Tindak pidana pencurian dengan kekerasan (begal/perampokan) menurut KUHP Baru (dahulu 365). Hukuman dan unsur deliknya sejalan dengan KUHP lama.",
    "explanationEn": "The crime of theft with violence (mugging/robbery) according to the New Criminal Code (formerly 365). The punishment and elements of the offense are in line with the old Criminal Code.",
    "keywords": [
      "pencurian dengan kekerasan",
      "perampokan",
      "begal"
    ],
    "relatedArticles": [
      "476",
      "458"
    ],
    "imageRef": "gavel"
  },
  {
    "id": "uu1-2023-482",
    "code": "UU 1/2023",
    "articleNumber": "482",
    "chapter": "Buku II Bab XXIII - Tindak Pidana Pemerasan dan Pengancaman",
    "chapterEn": "Book II Chapter XXIII - Crimes of Extortion and Threat",
    "officialText": "Setiap Orang yang dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, memaksa orang dengan Kekerasan atau Ancaman Kekerasan untuk memberikan suatu Barang, yang sebagian atau seluruhnya milik orang tersebut atau milik orang lain, atau untuk memberi utang, membuat pengakuan utang, atau menghapus piutang, dipidana karena pemerasan, dengan pidana penjara paling lama 9 (sembilan) tahun.",
    "officialTextEn": "Any person who with the intent to unlawfully benefit himself or another person, forces someone with Violence or Threat of Violence to give a Property... shall be punished for extortion, with a maximum imprisonment of nine years.",
    "explanation": "Pemerasan menurut KUHP Baru (dahulu 368). Mirip pencurian dengan kekerasan, namun bedanya korban sendiri yang terpaksa menyerahkan hartanya karena berada di bawah tekanan psikologis/fisik dari pelaku.",
    "explanationEn": "Extortion according to the New Criminal Code (formerly 368). Similar to theft with violence, but the difference is the victim themselves is forced to hand over their property because they are under psychological/physical pressure from the perpetrator.",
    "keywords": [
      "pemerasan",
      "ancaman kekerasan",
      "pemalakan"
    ],
    "relatedArticles": [
      "479"
    ],
    "imageRef": "courtroom"
  },
  {
    "id": "uu1-2023-406",
    "code": "UU 1/2023",
    "articleNumber": "406",
    "chapter": "Buku II Bab XV - Tindak Pidana Kesusilaan",
    "chapterEn": "Book II Chapter XV - Crimes Against Decency",
    "officialText": "Dipidana dengan pidana penjara paling lama 1 (satu) tahun atau pidana denda paling banyak kategori III, Setiap Orang yang: a. melanggar kesusilaan di muka umum; atau b. melanggar kesusilaan di muka orang lain yang ada di situ di luar kemauannya.",
    "officialTextEn": "Punished with a maximum imprisonment of one year or a maximum category III fine, Any Person who: a. violates decency in public; or b. violates decency in front of another person present there against their will.",
    "explanation": "Pasal ini mengatur tindak pidana melanggar kesusilaan atau kesopanan umum di KUHP Baru (dahulu 281). Hukuman penjara maksimal lebih singkat dibanding KUHP lama (menjadi 1 tahun, sebelumnya 2 tahun 8 bulan), namun denda disesuaikan.",
    "explanationEn": "This article regulates the crime of violating decency or public modesty in the New Criminal Code (formerly 281). The maximum imprisonment is shorter compared to the old Criminal Code (becomes 1 year, previously 2 years 8 months), but the fine is adjusted.",
    "keywords": [
      "kesusilaan",
      "di muka umum",
      "melanggar kesopanan"
    ],
    "relatedArticles": [
      "407"
    ],
    "imageRef": "lawBooks"
  },
  {
    "id": "uu1-2023-436",
    "code": "UU 1/2023",
    "articleNumber": "436",
    "chapter": "Buku II Bab XVII - Tindak Pidana Pencemaran",
    "chapterEn": "Book II Chapter XVII - Crimes of Defamation",
    "officialText": "Penghinaan yang tidak bersifat pencemaran atau pencemaran tertulis yang dilakukan terhadap orang lain baik di muka umum dengan lisan atau tulisan, maupun di muka orang itu sendiri dengan lisan atau perbuatan, atau dengan tulisan yang dikirimkan atau diterimakan kepadanya, dipidana karena penghinaan ringan dengan pidana penjara paling lama 6 (enam) bulan atau pidana denda paling banyak kategori II.",
    "officialTextEn": "Insult that is not of the nature of defamation or written defamation committed against another person... punished for minor insult with a maximum imprisonment of six months or a maximum category II fine.",
    "explanation": "Penghinaan ringan menurut KUHP Baru (dahulu 315). Tetap menjadi delik aduan absolut, menghukum ujaran caci maki kasar langsung tanpa menuduhkan perbuatan spesifik (berbeda dari pencemaran/defamasi).",
    "explanationEn": "Minor insult under the New Criminal Code (formerly 315). Remains an absolute complaint offense, punishing direct abusive slurs without accusing a specific act (different from defamation).",
    "keywords": [
      "penghinaan ringan",
      "makian",
      "caci maki"
    ],
    "relatedArticles": [
      "433"
    ],
    "imageRef": "gavel"
  }
];
