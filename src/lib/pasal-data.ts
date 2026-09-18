export interface Pasal {
  id: string;
  code: string; // e.g. "KUHP"
  articleNumber: string; // e.g. "338"
  chapter: string; // e.g. "Buku Kedua - Kejahatan"
  officialText: string;
  explanation: string;
  keywords: string[];
  relatedArticles: string[];
  imageRef?: string;
}

export const pasalData: Pasal[] = [
  // 1. Pasal 338
  {
    id: "kuhp-338",
    code: "KUHP",
    articleNumber: "338",
    chapter: "Buku II Bab XIX - Kejahatan Terhadap Nyawa",
    officialText: "Barang siapa dengan sengaja merampas nyawa orang lain, diancam karena pembunuhan dengan pidana penjara paling lama lima belas tahun.",
    explanation: "Pasal ini mengatur tentang tindak pidana pembunuhan biasa (tanpa rencana). Unsur utamanya adalah 'dengan sengaja' dan 'merampas nyawa orang lain'. Seseorang harus memiliki niat (dolus) untuk menghilangkan nyawa korban. Ini adalah pasal dasar dari berbagai jenis kejahatan terhadap nyawa manusia.",
    keywords: ["pembunuhan", "nyawa", "sengaja", "pidana mati"],
    relatedArticles: ["340", "351", "339"],
    imageRef: "courtroom"
  },
  // 2. Pasal 340
  {
    id: "kuhp-340",
    code: "KUHP",
    articleNumber: "340",
    chapter: "Buku II Bab XIX - Kejahatan Terhadap Nyawa",
    officialText: "Barang siapa dengan sengaja dan dengan rencana terlebih dahulu merampas nyawa orang lain, diancam karena pembunuhan dengan rencana, dengan pidana mati atau pidana penjara seumur hidup atau selama waktu tertentu, paling lama dua puluh tahun.",
    explanation: "Ini adalah pasal tentang pembunuhan berencana. Bedanya dengan Pasal 338 adalah adanya unsur 'rencana terlebih dahulu'. Artinya, pelaku memiliki waktu untuk berpikir dengan tenang sebelum bertindak atau membatalkan niatnya. Hukuman untuk kejahatan ini adalah yang paling berat, hingga pidana mati.",
    keywords: ["pembunuhan berencana", "nyawa", "pidana mati", "sengaja", "rencana"],
    relatedArticles: ["338", "339"],
    imageRef: "gavel"
  },
  // 3. Pasal 351
  {
    id: "kuhp-351",
    code: "KUHP",
    articleNumber: "351",
    chapter: "Buku II Bab XX - Penganiayaan",
    officialText: "(1) Penganiayaan diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.\n(2) Jika perbuatan mengakibatkan luka-luka berat, yang bersalah diancam dengan pidana penjara paling lama lima tahun.\n(3) Jika mengakibatkan mati, diancam dengan pidana penjara paling lama tujuh tahun.\n(4) Dengan penganiayaan disamakan sengaja merusak kesehatan.\n(5) Percobaan untuk melakukan kejahatan ini tidak dipidana.",
    explanation: "Pasal ini adalah pasal sapu jagat untuk penganiayaan (menyakiti tubuh orang lain secara fisik). KUHP tidak merumuskan arti 'penganiayaan', namun yurisprudensi mengartikannya sebagai perbuatan yang dengan sengaja menimbulkan rasa sakit atau luka pada tubuh orang lain. Hukuman bertambah berat sesuai dengan dampak luka korban.",
    keywords: ["penganiayaan", "luka", "kekerasan fisik", "kesehatan"],
    relatedArticles: ["353", "354", "355"],
    imageRef: "lawBooks"
  },
  // 4. Pasal 362
  {
    id: "kuhp-362",
    code: "KUHP",
    articleNumber: "362",
    chapter: "Buku II Bab XXII - Pencurian",
    officialText: "Barang siapa mengambil barang sesuatu, yang seluruhnya atau sebagian kepunyaan orang lain, dengan maksud untuk dimiliki secara melawan hukum, diancam karena pencurian, dengan pidana penjara paling lama lima tahun atau pidana denda paling banyak sembilan ratus rupiah.",
    explanation: "Ini merupakan rumusan baku dari tindak pidana pencurian. Unsur-unsur utamanya meliputi tindakan mengambil, benda berwujud maupun tidak berwujud (seperti listrik), sebagian/seluruhnya milik orang lain, serta maksud untuk memiliki benda tersebut dengan melawan hukum (tanpa hak).",
    keywords: ["pencurian", "mengambil barang", "melawan hukum", "hak milik"],
    relatedArticles: ["363", "365"],
    imageRef: "gavel"
  },
  // 5. Pasal 372
  {
    id: "kuhp-372",
    code: "KUHP",
    articleNumber: "372",
    chapter: "Buku II Bab XXIV - Penggelapan",
    officialText: "Barang siapa dengan sengaja dan melawan hukum memiliki barang sesuatu yang seluruhnya atau sebagian adalah kepunyaan orang lain, tetapi yang ada dalam kekuasaannya bukan karena kejahatan diancam karena penggelapan, dengan pidana penjara paling lama empat tahun atau pidana denda paling banyak sembilan ratus rupiah.",
    explanation: "Penggelapan berbeda dengan pencurian. Pada pencurian, pelaku 'mengambil' barang. Pada penggelapan, barang yang menjadi objek kejahatan sudah berada secara sah di bawah kekuasaan pelaku (misal dipinjamkan, atau disewa), lalu ia menyalahgunakan kekuasaan itu dengan mengaku atau bertindak sebagai pemiliknya secara melawan hukum.",
    keywords: ["penggelapan", "barang titipan", "melawan hukum", "hak milik"],
    relatedArticles: ["362", "374", "378"],
    imageRef: "lawBooks"
  },
  // 6. Pasal 378
  {
    id: "kuhp-378",
    code: "KUHP",
    articleNumber: "378",
    chapter: "Buku II Bab XXV - Perbuatan Curang",
    officialText: "Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan memakai nama palsu atau martabat palsu, dengan tipu muslihat, ataupun rangkaian kebohongan, menggerakkan orang lain untuk menyerahkan barang sesuatu kepadanya, atau supaya memberi hutang maupun menghapuskan piutang, diancam karena penipuan dengan pidana penjara paling lama empat tahun.",
    explanation: "Ini merupakan pasal untuk tindak pidana penipuan. Inti dari pasal ini adalah tindakan seseorang yang memakai sarana (nama palsu, martabat palsu, tipu muslihat, atau rangkaian kebohongan) untuk memperdaya korban sehingga korban tersebut secara sukarela menyerahkan harta bendanya kepada pelaku.",
    keywords: ["penipuan", "tipu muslihat", "kebohongan", "barang"],
    relatedArticles: ["372"],
    imageRef: "courtroom"
  },
  // 7. Pasal 285
  {
    id: "kuhp-285",
    code: "KUHP",
    articleNumber: "285",
    chapter: "Buku II Bab XIV - Kejahatan Terhadap Kesusilaan",
    officialText: "Barang siapa dengan kekerasan atau ancaman kekerasan memaksa seorang wanita bersetubuh dengan dia di luar perkawinan, diancam karena melakukan perkosaan dengan pidana penjara paling lama dua belas tahun.",
    explanation: "Ini adalah delik pemerkosaan dalam KUHP (buku lama). Fokus utamanya adalah adanya unsur 'kekerasan atau ancaman kekerasan' untuk memaksa persetubuhan. Namun, di hukum modern saat ini, definisi dan ruang lingkup mengenai kejahatan seksual ini telah banyak disempurnakan (seperti yang diatur dalam UU TPKS).",
    keywords: ["pemerkosaan", "kekerasan", "kesusilaan", "persetubuhan"],
    relatedArticles: ["289", "293"],
    imageRef: "gavel"
  },
  // 8. Pasal 303
  {
    id: "kuhp-303",
    code: "KUHP",
    articleNumber: "303",
    chapter: "Buku II Bab XVI - Kejahatan Terhadap Ketertiban Umum",
    officialText: "Diancam dengan pidana penjara paling lama sepuluh tahun atau pidana denda paling banyak dua puluh lima juta rupiah, barang siapa tanpa mendapat izin: 1. dengan sengaja menawarkan atau memberikan kesempatan untuk permainan judi dan menjadikannya sebagai pencarian, atau dengan sengaja turut serta dalam suatu perusahaan untuk itu; 2. dengan sengaja menawarkan atau memberi kesempatan kepada khalayak umum untuk bermain judi atau dengan sengaja turut serta dalam perusahaan untuk itu, dengan tidak peduli apakah untuk menggunakan kesempatan adanya sesuatu syarat atau dipenuhinya sesuatu tata-cara; 3. menjadikan turut serta pada permainan judi sebagai pencarian.",
    explanation: "Pasal ini memberikan larangan bagi penyelenggara dan pihak yang menjadikan perjudian sebagai mata pencaharian. Segala bentuk permainan yang mendasarkan harapan untuk menang pada keberuntungan (untung-untungan) dan tanpa izin pemerintah secara tegas dilarang oleh hukum. Ini juga sering dikaitkan dengan pasal 303 bis.",
    keywords: ["perjudian", "judi", "ketertiban umum", "untung-untungan"],
    relatedArticles: ["303 bis"],
    imageRef: "lawBooks"
  },
  // 9. Pasal 170
  {
    id: "kuhp-170",
    code: "KUHP",
    articleNumber: "170",
    chapter: "Buku II Bab V - Kejahatan Terhadap Ketertiban Umum",
    officialText: "(1) Barang siapa dengan terang-terangan dan dengan tenaga bersama menggunakan kekerasan terhadap orang atau barang, diancam dengan pidana penjara paling lama lima tahun enam bulan. (2) Yang bersalah diancam: 1. dengan pidana penjara paling lama tujuh tahun, jika ia dengan sengaja menghancurkan barang atau jika kekerasan yang digunakan mengakibatkan luka-luka; 2. dengan pidana penjara paling lama sembilan tahun, jika kekerasan mengakibatkan luka berat; 3. dengan pidana penjara paling lama dua belas tahun, jika kekerasan mengakibatkan maut.",
    explanation: "Pasal ini umum disebut pidana pengeroyokan. Poin kuncinya adalah 'tenaga bersama' atau kebersamaan pelaku (minimal 2 orang atau lebih), di muka umum, secara fisik melakukan kekerasan pada orang atau merusak barang. Hukumannya semakin berat sejalan dengan tingkat luka-luka atau bahkan kematian korban.",
    keywords: ["pengeroyokan", "kekerasan bersama", "ketertiban umum", "luka", "maut"],
    relatedArticles: ["351", "338", "406"],
    imageRef: "courtroom"
  },
  // 10. Pasal 289
  {
    id: "kuhp-289",
    code: "KUHP",
    articleNumber: "289",
    chapter: "Buku II Bab XIV - Kejahatan Terhadap Kesusilaan",
    officialText: "Barang siapa dengan kekerasan atau ancaman kekerasan memaksa seseorang untuk melakukan atau membiarkan dilakukan perbuatan cabul, diancam karena melakukan perbuatan yang menyerang kehormatan kesusilaan, dengan pidana penjara paling lama sembilan tahun.",
    explanation: "Pasal ini tentang pencabulan. 'Perbuatan cabul' ditafsirkan sebagai segala perbuatan yang melanggar rasa kesusilaan (nafsu birahi), seperti meraba, mencium secara paksa, dsb. Berbeda dengan Pasal 285 yang mengisyaratkan adanya persetubuhan, Pasal 289 mencakup tindak pelecehan secara lebih luas selama ada unsur kekerasan atau ancaman kekerasan.",
    keywords: ["pencabulan", "kekerasan", "ancaman", "kesusilaan"],
    relatedArticles: ["285", "290", "294"],
    imageRef: "lawBooks"
  },
  // 11. Pasal 310
  {
    id: "kuhp-310",
    code: "KUHP",
    articleNumber: "310",
    chapter: "Buku II Bab XVI - Penghinaan",
    officialText: "(1) Barang siapa sengaja menyerang kehormatan atau nama baik seseorang dengan menuduhkan sesuatu hal, yang maksudnya terang supaya hal itu diketahui umum, diancam karena pencemaran dengan pidana penjara paling lama sembilan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah. (2) Jika hal itu dilakukan dengan tulisan atau gambaran yang disiarkan, dipertunjukkan atau ditempelkan di muka umum, maka diancam karena pencemaran tertulis dengan pidana penjara paling lama satu tahun empat bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.",
    explanation: "Ini adalah dasar hukum untuk kasus penghinaan dan pencemaran nama baik. Unsur utamanya adalah menuduhkan perbuatan tertentu (fakta palsu) dengan niat untuk diketahui umum agar nama baik korban tercemar. Ayat 2 berbicara tentang versi tertulis dari fitnah ini (yang saat ini juga relevan dan terkait dengan UU ITE jika di ranah elektronik).",
    keywords: ["pencemaran nama baik", "penghinaan", "fitnah", "kehormatan"],
    relatedArticles: ["311", "315", "UU ITE 27"],
    imageRef: "gavel"
  },
  // 12. Pasal 406
  {
    id: "kuhp-406",
    code: "KUHP",
    articleNumber: "406",
    chapter: "Buku II Bab XXVII - Menghancurkan atau Merusakkan Barang",
    officialText: "(1) Barang siapa dengan sengaja dan melawan hukum menghancurkan, merusakkan, membikin tak dapat dipakai atau menghilangkan barang sesuatu yang seluruhnya atau sebagian milik orang lain, diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah. (2) Dijatuhkan pidana yang sama terhadap orang yang dengan sengaja dan melawan hukum membunuh, merusakkan, membikin tak dapat digunakan atau menghilangkan hewan, yang seluruhnya atau sebagian milik orang lain.",
    explanation: "Pasal perusakan barang. Intinya jika seseorang sengaja (ada niat) dan secara melawan hak (tidak punya otoritas atas barang tsb) membuat sebuah barang menjadi tidak berfungsi dengan baik, cacat, hancur, maupun hilang. Objeknya dapat berupa benda mati maupun hewan peliharaan (benda hidup).",
    keywords: ["perusakan", "barang", "menghancurkan", "hewan"],
    relatedArticles: ["170", "410"],
    imageRef: "courtroom"
  },
  // 13. Pasal 55
  {
    id: "kuhp-55",
    code: "KUHP",
    articleNumber: "55",
    chapter: "Buku I Bab V - Penyertaan Dalam Tindak Pidana",
    officialText: "(1) Dipidana sebagai pelaku tindak pidana: 1. mereka yang melakukan, yang menyuruh melakukan, dan yang turut serta melakukan perbuatan; 2. mereka yang dengan memberi atau menjanjikan sesuatu dengan menyalahgunakan kekuasaan atau martabat, dengan kekerasan, ancaman atau penyesatan, atau dengan memberi kesempatan, sarana atau keterangan, sengaja menganjurkan orang lain supaya melakukan perbuatan. (2) Terhadap penganjur, hanya perbuatan yang sengaja dianjurkan sajalah yang diperhitungkan, beserta akibat-akibatnya.",
    explanation: "Pasal ini mengatur asas 'Deelneming' (Penyertaan). Ketika sebuah kejahatan dilakukan oleh lebih dari satu orang, hukum menentukan peran masing-masing pelaku. Ada 'pleger' (yang melakukan langsung), 'doen pleger' (menyuruh melakukan), 'medepleger' (turut serta), dan 'uitlokker' (menganjurkan/menggerakkan). Mereka diancam pidana sebagai pelaku utama.",
    keywords: ["penyertaan", "pelaku", "menyuruh", "turut serta", "menganjurkan"],
    relatedArticles: ["56"],
    imageRef: "lawBooks"
  },
  // 14. Pasal 56
  {
    id: "kuhp-56",
    code: "KUHP",
    articleNumber: "56",
    chapter: "Buku I Bab V - Penyertaan Dalam Tindak Pidana",
    officialText: "Dipidana sebagai pembantu kejahatan: 1. mereka yang sengaja memberi bantuan pada waktu kejahatan dilakukan; 2. mereka yang sengaja memberi kesempatan, sarana atau keterangan untuk melakukan kejahatan.",
    explanation: "Pasal ini mengenai 'Medeplichtigheid' atau perbantuan. Seseorang berstatus pembantu apabila perannya hanya menunjang perbuatan utama (pelaku). Pembantuan bisa terjadi pada saat kejahatan sedang berlangsung (seperti berjaga-jaga), atau sebelum kejahatan (seperti memberikan kunci gembok). Hukuman bagi pembantu biasanya dikurangi sepertiga dari hukuman maksimal pelaku utama (Pasal 57 KUHP).",
    keywords: ["pembantuan", "bantuan", "sarana", "kesempatan"],
    relatedArticles: ["55", "57"],
    imageRef: "gavel"
  },
  // 15. Pasal 359
  {
    id: "kuhp-359",
    code: "KUHP",
    articleNumber: "359",
    chapter: "Buku II Bab XXI - Menyebabkan Mati atau Luka-Luka Karena Kealpaan",
    officialText: "Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain mati, diancam dengan pidana penjara paling lama lima tahun atau pidana kurungan paling lama satu tahun.",
    explanation: "Ini adalah bentuk delik kelalaian (culpa). Berbeda dengan pembunuhan sengaja, pasal ini diterapkan bila tidak ada niat membunuh, melainkan semata-mata karena kelalaian, ketidakhati-hatian, atau kecerobohan pelaku, yang malangnya berujung pada meninggalnya orang lain. Misalnya kecelakaan lalu lintas akibat ngantuk.",
    keywords: ["kelalaian", "kealpaan", "mati", "culpa"],
    relatedArticles: ["360", "338"],
    imageRef: "courtroom"
  },
  // 16. Pasal 360
  {
    id: "kuhp-360",
    code: "KUHP",
    articleNumber: "360",
    chapter: "Buku II Bab XXI - Menyebabkan Mati atau Luka-Luka Karena Kealpaan",
    officialText: "(1) Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain mendapat luka-luka berat, diancam dengan pidana penjara paling lama lima tahun atau pidana kurungan paling lama satu tahun. (2) Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain luka-luka sedemikian rupa sehingga timbul penyakit atau halangan menjalankan pekerjaan jabatan atau pencarian selama waktu tertentu, diancam dengan pidana penjara paling lama sembilan bulan atau pidana kurungan paling lama enam bulan atau pidana denda paling tinggi empat ribu lima ratus rupiah.",
    explanation: "Sama seperti Pasal 359 yang mengatur perihal kelalaian, tetapi akibatnya bukan pada kematian melainkan pada luka fisik berat atau sakit sementara yang menghalangi korban melakukan kegiatan sehari-harinya.",
    keywords: ["kelalaian", "kealpaan", "luka berat", "luka", "culpa"],
    relatedArticles: ["359", "351"],
    imageRef: "lawBooks"
  },
  // 17. Pasal 365
  {
    id: "kuhp-365",
    code: "KUHP",
    articleNumber: "365",
    chapter: "Buku II Bab XXII - Pencurian",
    officialText: "(1) Diancam dengan pidana penjara paling lama sembilan tahun pencurian yang didahului, disertai atau diikuti dengan kekerasan atau ancaman kekerasan, terhadap orang dengan maksud untuk mempersiapkan atau mempermudah pencurian, atau dalam hal tertangkap tangan, untuk memungkinkan melarikan diri sendiri atau peserta lainnya, atau untuk tetap menguasai barang yang dicuri. (2) Diancam dengan pidana penjara paling lama dua belas tahun: 1. jika perbuatan dilakukan pada waktu malam dalam sebuah rumah atau pekarangan tertutup yang ada rumahnya, di jalan umum, atau dalam kereta api atau trem yang sedang berjalan; 2. jika perbuatan dilakukan oleh dua orang atau lebih dengan bersekutu; 3. jika masuk ke tempat melakukan kejahatan dengan merusak atau memanjat atau dengan memakai anak kunci palsu, perintah palsu atau pakaian jabatan palsu; 4. jika perbuatan mengakibatkan luka-luka berat. (3) Jika perbuatan mengakibatkan mati, maka diancam dengan pidana penjara paling lama lima belas tahun. (4) Diancam dengan pidana mati atau pidana penjara seumur hidup atau selama waktu tertentu paling lama dua puluh tahun, jika perbuatan mengakibatkan luka berat atau mati dan dilakukan oleh dua orang atau lebih dengan bersekutu, disertai pula oleh salah satu hal yang diterangkan dalam no. 1 dan 3.",
    explanation: "Ini merupakan pasal untuk pencurian dengan kekerasan (sering dikenal dengan istilah perampokan atau begal). Kekerasan ini bisa terjadi di awal, bersamaan, maupun di akhir perbuatan asalkan tujuannya adalah mempermulus aksi penguasaan barang tersebut. Hukuman bertingkat sesuai modus dan akibat, mencapai pidana mati pada ayat 4.",
    keywords: ["pencurian dengan kekerasan", "perampokan", "begal", "kekerasan"],
    relatedArticles: ["362", "338"],
    imageRef: "gavel"
  },
  // 18. Pasal 368
  {
    id: "kuhp-368",
    code: "KUHP",
    articleNumber: "368",
    chapter: "Buku II Bab XXIII - Pemerasan dan Pengancaman",
    officialText: "(1) Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, memaksa seorang dengan kekerasan atau ancaman kekerasan untuk memberikan barang sesuatu, yang seluruhnya atau sebagian adalah kepunyaan orang itu atau orang lain, atau supaya membuat hutang maupun menghapuskan piutang, diancam karena pemerasan, dengan pidana penjara paling lama sembilan tahun. (2) Ketentuan Pasal 365 ayat (2), (3), dan (4) berlaku bagi kejahatan ini.",
    explanation: "Tindak pidana pemerasan (Afpersing). Berbeda dengan pencurian dengan kekerasan, di sini pelaku menekan atau memaksa psikologis/fisik sedemikian rupa sehingga korban akhirnya terpaksa memberikan sendiri harta atau barangnya pada pelaku akibat takut akan kekerasan tersebut (seperti aksi premanisme, pemalakan).",
    keywords: ["pemerasan", "ancaman kekerasan", "pemalakan", "memaksa"],
    relatedArticles: ["365", "369"],
    imageRef: "courtroom"
  },
  // 19. Pasal 281
  {
    id: "kuhp-281",
    code: "KUHP",
    articleNumber: "281",
    chapter: "Buku II Bab XIV - Kejahatan Terhadap Kesusilaan",
    officialText: "Diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah: 1. barang siapa dengan sengaja merusak kesusilaan di muka umum; 2. barang siapa dengan sengaja merusak kesusilaan di depan orang lain yang bertentangan dengan kehendak orang itu.",
    explanation: "Pasal ini mengatur tindak pidana merusak kesusilaan atau kesopanan umum (misalnya eksibisionisme, berpelukan mesum atau mempertontonkan aurat tanpa hak di tempat yang bisa dilihat umum). Hukum tidak menetapkan secara mutlak apa 'kesusilaan' tersebut melainkan dikembalikan pada tata karma atau kepatutan sosial yang berkembang di tengah masyarakat.",
    keywords: ["kesusilaan", "di muka umum", "melanggar kesopanan"],
    relatedArticles: ["282"],
    imageRef: "lawBooks"
  },
  // 20. Pasal 315
  {
    id: "kuhp-315",
    code: "KUHP",
    articleNumber: "315",
    chapter: "Buku II Bab XVI - Penghinaan",
    officialText: "Tiap-tiap penghinaan dengan sengaja yang tidak bersifat pencemaran atau pencemaran tertulis yang dilakukan terhadap seseorang, baik di muka umum dengan lisan atau tulisan, maupun di muka orang itu sendiri dengan lisan atau perbuatan, atau dengan surat yang dikirimkan atau diterimakan kepadanya, diancam karena penghinaan ringan dengan pidana penjara paling lama empat bulan dua minggu atau pidana denda paling banyak empat ribu lima ratus rupiah.",
    explanation: "Penghinaan ringan (Eenvoudige belediging). Bedanya dengan pencemaran nama baik (Pasal 310) adalah tidak adanya tuduhan tentang perbuatan tertentu yang disiarkan. Ini berupa ujaran makian bodoh, kata-kata cacian langsung, atau ludahan ke wajah seseorang di hadapannya secara langsung. Sifat deliknya adalah delik aduan absolut (harus korban yang melapor).",
    keywords: ["penghinaan ringan", "makian", "caci maki", "delik aduan"],
    relatedArticles: ["310", "311"],
    imageRef: "gavel"
  }
];
