export interface LatihanScenario {
  id: string;
  title: string;
  titleEn: string;
  scenario: string;
  scenarioEn: string;
  targetArticle: string;
}

export const latihanScenarios: LatihanScenario[] = [
  {
    id: "SCN-01",
    title: "Pencurian Barang Berharga",
    titleEn: "Theft of Valuables",
    scenario: "Budi mengambil sebuah laptop yang tergeletak di atas meja kafe ketika pemiliknya sedang pergi ke toilet, dengan maksud untuk memilikinya secara melawan hukum dan menjualnya di kemudian hari.",
    scenarioEn: "Budi takes a laptop left unattended on a cafe table while its owner is away in the restroom, intending to unlawfully keep it and sell it later.",
    targetArticle: "Pasal 476 UU 1/2023 (Pasal 362 KUHP)"
  },
  {
    id: "SCN-02",
    title: "Penggelapan Dana Perusahaan",
    titleEn: "Embezzlement of Company Funds",
    scenario: "Siti, seorang kasir perusahaan, menerima uang pembayaran dari klien secara tunai. Namun, uang tersebut tidak disetorkan ke kas perusahaan, melainkan digunakan untuk melunasi utang pribadinya.",
    scenarioEn: "Siti, a company cashier, receives cash payments from clients. However, instead of depositing the money into the company treasury, she uses it to pay off her personal debts.",
    targetArticle: "Pasal 486 UU 1/2023 (Pasal 372 KUHP)"
  },
  {
    id: "SCN-03",
    title: "Penipuan Berkedok Investasi",
    titleEn: "Fraudulent Investment Scheme",
    scenario: "Agus meyakinkan puluhan korban untuk menyerahkan dana mereka dengan janji keuntungan pasti 50% setiap bulan melalui bisnis fiktif yang tidak pernah ada, lalu membawa kabur seluruh dana tersebut.",
    scenarioEn: "Agus convinces dozens of victims to hand over their funds by promising a guaranteed 50% monthly profit through a fictitious business that does not exist, and subsequently absconds with the money.",
    targetArticle: "Pasal 492 UU 1/2023 (Pasal 378 KUHP)"
  },
  {
    id: "SCN-04",
    title: "Pembunuhan Biasa (Tanpa Rencana)",
    titleEn: "Intentional Homicide",
    scenario: "Dalam sebuah pertengkaran sengit yang terjadi secara spontan, Joko mengambil pisau dapur dan menusuk dada temannya dengan sengaja hingga korban meninggal dunia di tempat kejadian.",
    scenarioEn: "During a spontaneous and heated argument, Joko grabs a kitchen knife and intentionally stabs his friend in the chest, causing the victim to die at the scene.",
    targetArticle: "Pasal 458 UU 1/2023 (Pasal 338 KUHP)"
  },
  {
    id: "SCN-05",
    title: "Pembunuhan Berencana",
    titleEn: "Premeditated Murder",
    scenario: "Karena dendam lama, Rini menyusun rencana matang selama sepekan untuk mencampurkan racun mematikan ke dalam kopi milik atasannya saat jam makan siang, yang berakibat pada kematian sang atasan.",
    scenarioEn: "Driven by a long-held grudge, Rini meticulously plans for a week to slip a lethal poison into her employer's coffee during lunch hour, resulting in the employer's death.",
    targetArticle: "Pasal 459 UU 1/2023 (Pasal 340 KUHP)"
  },
  {
    id: "SCN-06",
    title: "Penganiayaan Biasa",
    titleEn: "Maltreatment (Assault)",
    scenario: "Tersinggung oleh perkataan orang lain di pinggir jalan, Dodi memukul wajah korban dengan tangan kosong hingga mengakibatkan pelipis korban robek dan mata mengalami luka memar.",
    scenarioEn: "Angered by a bystander's remarks on the street, Dodi strikes the victim's face with his bare fist, causing a lacerated brow and severe bruising around the victim's eye.",
    targetArticle: "Pasal 466 UU 1/2023 (Pasal 351 KUHP)"
  },
  {
    id: "SCN-07",
    title: "Pemerasan dengan Ancaman",
    titleEn: "Extortion with Threat of Violence",
    scenario: "Seorang preman mendatangi pemilik toko kelontong dan memaksanya menyerahkan uang sebesar satu juta rupiah setiap bulan. Pelaku mengancam akan membakar toko tersebut apabila uang keamanan tidak diberikan.",
    scenarioEn: "A local hoodlum confronts a grocery shopkeeper and coerces him into handing over one million rupiah each month, threatening to burn down the store if the protection money is refused.",
    targetArticle: "Pasal 482 UU 1/2023 (Pasal 368 KUHP)"
  },
  {
    id: "SCN-08",
    title: "Pencemaran Nama Baik Tertulis",
    titleEn: "Written Defamation (Libel)",
    scenario: "Melalui selebaran yang ditempelkan di papan pengumuman balai desa, Herman secara terbuka menuduh Kepala Desa menyalahgunakan dana bantuan sosial tanpa bukti yang sah, dengan maksud agar tuduhan tersebut diketahui umum.",
    scenarioEn: "Through flyers posted on the village hall announcement board, Herman publicly accuses the Village Chief of embezzling social assistance funds without verifiable proof, clearly intending for the allegation to become widely known.",
    targetArticle: "Pasal 433 UU 1/2023 (Pasal 310 KUHP)"
  },
  {
    id: "SCN-09",
    title: "Perusakan Barang",
    titleEn: "Destruction of Property",
    scenario: "Dalam kondisi mabuk setelah berselisih paham, Anto dengan sengaja melempari kaca jendela mobil tetangganya menggunakan batu bata hingga pecah berantakan dan mobil tidak dapat digunakan.",
    scenarioEn: "In an intoxicated state following a dispute, Anto deliberately hurls bricks at his neighbor's car windshield, smashing it to pieces and rendering the vehicle unusable.",
    targetArticle: "Pasal 521 UU 1/2023 (Pasal 406 KUHP)"
  },
  {
    id: "SCN-10",
    title: "Tindak Pidana Perkosaan",
    titleEn: "Crime of Rape",
    scenario: "Seorang pria menyeret seorang wanita ke dalam sebuah gudang kosong yang sepi, lalu dengan ancaman senjata tajam dan kekerasan fisik memaksa korban untuk bersetubuh dengannya.",
    scenarioEn: "A man drags a woman into an isolated abandoned warehouse and, using physical violence and the threat of a weapon, forces the victim to have sexual intercourse with him.",
    targetArticle: "Pasal 414 UU 1/2023 (Pasal 285 KUHP)"
  },
  {
    id: "SCN-11",
    title: "Pencabulan dengan Kekerasan",
    titleEn: "Molestation (Violent Obscene Act)",
    scenario: "Seorang pria di dalam lift gedung perkantoran memojokkan rekan kerjanya dan secara paksa meraba area sensitif tubuh korban sambil memegangi kedua tangannya sehingga korban tidak berdaya untuk melawan.",
    scenarioEn: "A man inside an office building elevator corners his female colleague and forcibly fondles her sensitive body parts while pinning her hands, rendering her helpless to resist.",
    targetArticle: "Pasal 415 UU 1/2023 (Pasal 289 KUHP)"
  },
  {
    id: "SCN-12",
    title: "Pengeroyokan di Muka Umum",
    titleEn: "Mob Violence (Joint Assault in Public)",
    scenario: "Sekelompok pemuda beranggotakan lima orang secara bersama-sama di muka umum memukuli dan menendang seorang pengendara motor di tengah jalan raya hingga korban tersungkur berlumuran darah.",
    scenarioEn: "A group of five young men openly and jointly beat and kick a motorcyclist in the middle of a public street until the victim collapses, covered in blood.",
    targetArticle: "Pasal 262 UU 1/2023 (Pasal 170 KUHP)"
  },
  {
    id: "SCN-13",
    title: "Penyertaan Tindak Pidana",
    titleEn: "Participation (Complicity in Crime)",
    scenario: "Dua orang pria, Doni dan Eko, bekerja sama membobol toko elektronik pada malam hari. Doni bertugas merusak gembok dan mengangkut barang, sedangkan Eko mengawasi situasi di depan toko dan mengendarai sepeda motor untuk melarikan diri bersama.",
    scenarioEn: "Two men, Doni and Eko, collaborate to burglarize an electronics store at night. Doni breaks the padlock and carries out the merchandise, while Eko keeps watch outside and operates the getaway motorcycle.",
    targetArticle: "Pasal 20 UU 1/2023 (Pasal 55 KUHP)"
  },
  {
    id: "SCN-14",
    title: "Penyelenggaraan Perjudian",
    titleEn: "Unlicensed Gambling Operation",
    scenario: "Pak Hendra mengelola sebuah ruang tersembunyi di belakang warung kopinya untuk menyelenggarakan perjudian kartu remi dengan uang taruhan tunai, di mana ia mengambil komisi sepuluh persen dari setiap putaran sebagai mata pencariannya.",
    scenarioEn: "Mr. Hendra operates a hidden backroom behind his coffee shop to run a card gambling venue with cash wagers, taking a ten percent commission from every round as his primary livelihood.",
    targetArticle: "Pasal 426 UU 1/2023 (Pasal 303 KUHP)"
  },
  {
    id: "SCN-15",
    title: "Pembantuan Tindak Pidana",
    titleEn: "Aiding and Abetting (Accessory)",
    scenario: "Fajar mengetahui temannya hendak mencuri sepeda motor di tempat parkir kampus. Fajar dengan sengaja meminjamkan kunci letter T miliknya kepada temannya tersebut untuk memperlancar aksi pencurian yang direncanakan.",
    scenarioEn: "Fajar knows that his friend intends to steal a motorcycle from the campus parking lot. He intentionally lends his T-shaped lockpick tool to his friend to facilitate the planned theft.",
    targetArticle: "Pasal 21 UU 1/2023 (Pasal 56 KUHP)"
  },
  {
    id: "SCN-16",
    title: "Kealpaan Mengakibatkan Kematian",
    titleEn: "Negligence Causing Death",
    scenario: "Seorang mandor bangunan tidak memasang jaring pengaman dan mengabaikan prosedur keselamatan kerja pada proyek renovasi lantai tiga. Sebuah balok kayu terjatuh dan menimpa pejalan kaki di bawahnya hingga tewas di tempat.",
    scenarioEn: "A construction foreman fails to install safety netting and neglects basic safety protocols during a third-floor renovation project. A heavy wooden beam falls and strikes a pedestrian below, killing him instantly.",
    targetArticle: "Pasal 474 UU 1/2023 (Pasal 359 KUHP)"
  },
  {
    id: "SCN-17",
    title: "Kealpaan Mengakibatkan Luka Berat",
    titleEn: "Negligence Causing Severe Injury",
    scenario: "Seorang pengelola wahana rekreasi lalai memeriksa kabel penopang ayunan putar secara berkala meskipun sudah tampak aus. Saat dinaiki pengunjung, tali tersebut putus sehingga seorang anak terjatuh dan mengalami gegar otak serta patah tulang belakang permanen.",
    scenarioEn: "An amusement park operator fails to inspect the support cables of a carousel swing despite visible signs of wear. While riders are aboard, a cable snaps, causing a child to fall and suffer a severe brain concussion and permanent spinal fractures.",
    targetArticle: "Pasal 475 UU 1/2023 (Pasal 360 KUHP)"
  },
  {
    id: "SCN-18",
    title: "Pencurian dengan Kekerasan (Begal)",
    titleEn: "Theft with Violence (Armed Robbery)",
    scenario: "Dua pelaku begal memepet seorang pengendara sepeda motor di jalan raya yang gelap dan sepi, menodongkan sebilah celurit ke leher korban, lalu menendang korban hingga tersungkur sebelum membawa kabur sepeda motor tersebut.",
    scenarioEn: "Two robbers intercept a lone motorcyclist on a dark and deserted road, hold a sickle against the victim's neck, and kick him to the ground before speeding away with his motorcycle.",
    targetArticle: "Pasal 479 UU 1/2023 (Pasal 365 KUHP)"
  },
  {
    id: "SCN-19",
    title: "Pelanggaran Kesusilaan di Muka Umum",
    titleEn: "Public Indecency (Violation of Decency)",
    scenario: "Di tengah keramaian pengunjung alun-alun kota pada sore hari, seorang pria sengaja menanggalkan seluruh pakaiannya dan mempertontonkan alat kelaminnya kepada orang-orang yang sedang melintas di sekitarnya.",
    scenarioEn: "Amidst a crowded city square in the afternoon, a man deliberately strips off all his clothes and exposes his genitals to unsuspecting passersby against their will.",
    targetArticle: "Pasal 406 UU 1/2023 (Pasal 281 KUHP)"
  },
  {
    id: "SCN-20",
    title: "Penghinaan Ringan",
    titleEn: "Minor Insult (Direct Verbal Abuse)",
    scenario: "Saat antre di loket pelayanan publik, seorang pria melontarkan makian kasar, umpatan hewan, dan kata-kata kotor secara langsung ke wajah petugas loket di depan banyak orang karena kesal proses administrasi memakan waktu lama.",
    scenarioEn: "While waiting in line at a public service counter, an impatient man verbally abuses a counter clerk directly, shouting crude insults, animal slurs, and obscenities in front of the surrounding public.",
    targetArticle: "Pasal 436 UU 1/2023 (Pasal 315 KUHP)"
  }
];
