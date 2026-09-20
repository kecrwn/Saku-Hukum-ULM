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
    scenario: "Budi mengambil sebuah laptop yang tergeletak di atas meja kafe ketika pemiliknya sedang pergi ke toilet, dengan niat untuk memilikinya dan menjualnya di kemudian hari.",
    scenarioEn: "Budi takes a laptop left on a cafe table while its owner is away at the restroom, with the intention of keeping it and selling it later.",
    targetArticle: "Pasal 362 KUHP"
  },
  {
    id: "SCN-02",
    title: "Penggelapan Dana Perusahaan",
    titleEn: "Embezzlement of Company Funds",
    scenario: "Siti, seorang kasir perusahaan, menerima uang pembayaran dari klien secara tunai namun uang tersebut tidak disetorkan ke kas perusahaan melainkan digunakan untuk membayar hutang pribadinya.",
    scenarioEn: "Siti, a company cashier, receives cash payments from clients but does not deposit the money into the company's treasury, instead using it to pay off her personal debts.",
    targetArticle: "Pasal 372 KUHP"
  },
  {
    id: "SCN-03",
    title: "Penipuan Investasi Bodong",
    titleEn: "Fraudulent Investment Scheme",
    scenario: "Agus meyakinkan puluhan orang untuk menyerahkan uang mereka dengan janji keuntungan 50% setiap bulan melalui bisnis fiktif yang tidak pernah ada, lalu membawa kabur uang tersebut.",
    scenarioEn: "Agus convinces dozens of people to hand over their money by promising a 50% monthly profit through a fictitious business that does not exist, and then runs away with the money.",
    targetArticle: "Pasal 378 KUHP"
  },
  {
    id: "SCN-04",
    title: "Pembunuhan Sengaja",
    titleEn: "Intentional Murder",
    scenario: "Dalam sebuah pertengkaran hebat yang spontan, Joko mengambil pisau dapur dan menusuk dada temannya hingga korban meninggal dunia di tempat kejadian.",
    scenarioEn: "During a spontaneous and heated argument, Joko grabs a kitchen knife and stabs his friend in the chest, causing the victim to die at the scene.",
    targetArticle: "Pasal 338 KUHP"
  },
  {
    id: "SCN-05",
    title: "Pembunuhan Berencana",
    titleEn: "Premeditated Murder",
    scenario: "Karena dendam lama, Rini secara diam-diam mencampurkan racun mematikan ke dalam minuman kopi milik atasannya. Ia telah merencanakan hal ini selama seminggu terakhir.",
    scenarioEn: "Due to a long-standing grudge, Rini secretly mixes a deadly poison into her boss's coffee. She had been planning this for the past week.",
    targetArticle: "Pasal 340 KUHP"
  },
  {
    id: "SCN-06",
    title: "Penganiayaan Biasa",
    titleEn: "Ordinary Maltreatment",
    scenario: "Karena tersinggung dengan ucapan seseorang di jalan, Dodi memukul wajah orang tersebut dengan tangan kosong yang mengakibatkan luka memar di bagian mata korban.",
    scenarioEn: "Offended by someone's words on the street, Dodi punches the person in the face with his bare hands, resulting in bruising around the victim's eye.",
    targetArticle: "Pasal 351 KUHP"
  },
  {
    id: "SCN-07",
    title: "Pemerasan",
    titleEn: "Extortion",
    scenario: "Preman setempat mendatangi sebuah toko kelontong dan memaksa pemilik toko memberikan sejumlah uang keamanan. Jika tidak diberikan, mereka mengancam akan menghancurkan toko tersebut.",
    scenarioEn: "Local thugs approach a grocery store and force the owner to pay protection money. If not provided, they threaten to destroy the store.",
    targetArticle: "Pasal 368 KUHP"
  },
  {
    id: "SCN-08",
    title: "Pencemaran Nama Baik",
    titleEn: "Defamation",
    scenario: "Melalui sebuah tulisan yang disebarkan di papan pengumuman desa, Herman menuduh Kepala Desa melakukan korupsi tanpa adanya bukti, yang merusak reputasi Kepala Desa tersebut.",
    scenarioEn: "Through a writing posted on the village announcement board, Herman accuses the Village Head of corruption without any evidence, damaging the Village Head's reputation.",
    targetArticle: "Pasal 310 KUHP"
  },
  {
    id: "SCN-09",
    title: "Perusakan Barang Mengerikan",
    titleEn: "Destruction of Property",
    scenario: "Dalam kondisi mabuk, Anto dengan sengaja memecahkan kaca jendela mobil tetangganya menggunakan batu hingga hancur berantakan tanpa alasan yang jelas.",
    scenarioEn: "While intoxicated, Anto intentionally breaks his neighbor's car window using a rock until it shatters to pieces without any clear reason.",
    targetArticle: "Pasal 406 KUHP"
  },
  {
    id: "SCN-10",
    title: "Penadahan Barang Curian",
    titleEn: "Receiving Stolen Goods",
    scenario: "Rudi membeli sebuah sepeda motor dari seseorang yang tidak dikenalnya dengan harga sangat murah, tanpa dilengkapi surat-surat resmi (BPKB dan STNK), padahal ia patut menduga motor tersebut hasil curian.",
    scenarioEn: "Rudi buys a motorcycle from a stranger at a very low price, without any official documents (BPKB and STNK), even though he should reasonably suspect that the motorcycle is stolen.",
    targetArticle: "Pasal 480 KUHP"
  },
  {
    id: "SCN-11",
    title: "Pemalsuan Surat",
    titleEn: "Forgery of Documents",
    scenario: "Untuk melamar pekerjaan, Nina membuat ijazah sarjana palsu yang seolah-olah diterbitkan oleh universitas terkemuka, padahal ia hanya lulusan sekolah menengah atas.",
    scenarioEn: "To apply for a job, Nina creates a fake bachelor's degree diploma appearing as if it was issued by a prominent university, even though she is only a high school graduate.",
    targetArticle: "Pasal 263 KUHP"
  },
  {
    id: "SCN-12",
    title: "Pembakaran Disengaja",
    titleEn: "Arson",
    scenario: "Karena merasa tidak puas dengan keputusan musyawarah desa, Tono menyiramkan bensin dan membakar balai desa pada tengah malam sehingga bangunan tersebut hangus terbakar.",
    scenarioEn: "Dissatisfied with the village deliberation decision, Tono pours gasoline and sets the village hall on fire at midnight, burning the building to the ground.",
    targetArticle: "Pasal 187 KUHP"
  },
  {
    id: "SCN-13",
    title: "Memasuki Pekarangan Tanpa Izin",
    titleEn: "Trespassing",
    scenario: "Sekelompok remaja dengan sengaja memanjat pagar dan masuk ke pekarangan rumah orang lain yang sedang kosong untuk bermain-main, meskipun terdapat larangan tertulis di depan pagar.",
    scenarioEn: "A group of teenagers deliberately climbs a fence and enters the yard of an empty house to play around, despite a written prohibition on the fence.",
    targetArticle: "Pasal 167 KUHP"
  },
  {
    id: "SCN-14",
    title: "Perjudian Terang-terangan",
    titleEn: "Public Gambling",
    scenario: "Beberapa orang berkumpul di warung kopi pada siang hari dan menggelar permainan judi kartu dengan menggunakan uang taruhan, tanpa mempedulikan orang-orang di sekitarnya.",
    scenarioEn: "Several people gather at a coffee shop during the day and play a card gambling game using money for betting, without caring about the people around them.",
    targetArticle: "Pasal 303 KUHP"
  },
  {
    id: "SCN-15",
    title: "Penculikan Anak",
    titleEn: "Kidnapping",
    scenario: "Dengan tipu muslihat, seorang pria membawa pergi seorang anak kecil dari taman bermain tanpa sepengetahuan orang tuanya dan menempatkan anak tersebut di lokasi tersembunyi.",
    scenarioEn: "Using deceit, a man takes a young child away from a playground without the parents' knowledge and places the child in a hidden location.",
    targetArticle: "Pasal 328 KUHP"
  },
  {
    id: "SCN-16",
    title: "Pengancaman",
    titleEn: "Threatening",
    scenario: "Yanto mendatangi rumah tetangganya sambil membawa celurit dan mengancam akan membacok tetangganya tersebut karena masalah sengketa batas tanah.",
    scenarioEn: "Yanto approaches his neighbor's house carrying a sickle and threatens to slash the neighbor over a land boundary dispute.",
    targetArticle: "Pasal 335 KUHP"
  },
  {
    id: "SCN-17",
    title: "Perzinaan",
    titleEn: "Adultery",
    scenario: "Seorang pria yang telah terikat perkawinan yang sah melakukan hubungan layaknya suami istri dengan seorang wanita yang bukan istrinya, yang kemudian dilaporkan oleh istri sah pria tersebut.",
    scenarioEn: "A man who is legally married engages in sexual relations with a woman who is not his wife, and is subsequently reported by the man's legal wife.",
    targetArticle: "Pasal 284 KUHP"
  },
  {
    id: "SCN-18",
    title: "Penganiayaan Ringan",
    titleEn: "Light Maltreatment",
    scenario: "Dalam sebuah cekcok mulut, Dina mendorong temannya hingga terjatuh. Temannya tidak mengalami luka serius, tidak berdarah, dan masih bisa melakukan aktivitasnya seperti biasa.",
    scenarioEn: "During a verbal argument, Dina pushes her friend until she falls. Her friend suffers no serious injuries, is not bleeding, and can still perform her usual activities.",
    targetArticle: "Pasal 352 KUHP"
  },
  {
    id: "SCN-19",
    title: "Penganiayaan Berat",
    titleEn: "Severe Maltreatment",
    scenario: "Dengan niat untuk melukai secara serius, Bayu menyiramkan air keras ke wajah seseorang yang mengakibatkan luka bakar parah dan kebutaan permanen pada korban.",
    scenarioEn: "With the intent to cause serious injury, Bayu throws acid on a person's face, resulting in severe burns and permanent blindness in the victim.",
    targetArticle: "Pasal 354 KUHP"
  },
  {
    id: "SCN-20",
    title: "Pencurian dengan Pemberatan",
    titleEn: "Theft with Aggravating Circumstances",
    scenario: "Dua orang pelaku merusak kunci gembok pagar dan mencongkel pintu depan rumah warga pada waktu malam hari, lalu membawa kabur televisi dan perhiasan dari dalam rumah.",
    scenarioEn: "Two perpetrators break the padlock of a fence and pry open the front door of a resident's house at night, then run away with a television and jewelry from inside the house.",
    targetArticle: "Pasal 363 KUHP"
  }
];
