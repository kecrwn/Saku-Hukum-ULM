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
}

export const pasalData: Pasal[] = [
  // 1. Pasal 338
  {
    id: "kuhp-338",
    code: "KUHP",
    articleNumber: "338",
    chapter: "Buku II Bab XIX - Kejahatan Terhadap Nyawa",
    chapterEn: "Book II Chapter XIX - Crimes Against Life",
    officialText: "Barang siapa dengan sengaja merampas nyawa orang lain, diancam karena pembunuhan dengan pidana penjara paling lama lima belas tahun.",
    officialTextEn: "Any person who deliberately takes the life of another person shall be punished for manslaughter with a maximum imprisonment of fifteen years.",
    explanation: "Pasal ini mengatur tentang tindak pidana pembunuhan biasa (tanpa rencana). Unsur utamanya adalah 'dengan sengaja' dan 'merampas nyawa orang lain'. Seseorang harus memiliki niat (dolus) untuk menghilangkan nyawa korban. Ini adalah pasal dasar dari berbagai jenis kejahatan terhadap nyawa manusia.",
    explanationEn: "This article regulates the crime of ordinary (unpremeditated) murder. The main elements are 'deliberately' and 'taking the life of another person'. A person must have the intention (dolus) to take the victim's life. This is the foundational article for various types of crimes against human life.",
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
    chapterEn: "Book II Chapter XIX - Crimes Against Life",
    officialText: "Barang siapa dengan sengaja dan dengan rencana terlebih dahulu merampas nyawa orang lain, diancam karena pembunuhan dengan rencana, dengan pidana mati atau pidana penjara seumur hidup atau selama waktu tertentu, paling lama dua puluh tahun.",
    officialTextEn: "Any person who deliberately and with prior calculation takes the life of another person shall be punished for premeditated murder, with death penalty, life imprisonment, or a maximum imprisonment of twenty years.",
    explanation: "Ini adalah pasal tentang pembunuhan berencana. Bedanya dengan Pasal 338 adalah adanya unsur 'rencana terlebih dahulu'. Artinya, pelaku memiliki waktu untuk berpikir dengan tenang sebelum bertindak atau membatalkan niatnya. Hukuman untuk kejahatan ini adalah yang paling berat, hingga pidana mati.",
    explanationEn: "This is the article on premeditated murder. The difference from Article 338 is the element of 'prior calculation'. This means the perpetrator has time to think calmly before acting or canceling their intention. The punishment for this crime is the most severe, up to the death penalty.",
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
    chapterEn: "Book II Chapter XX - Maltreatment",
    officialText: "(1) Penganiayaan diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.\n(2) Jika perbuatan mengakibatkan luka-luka berat, yang bersalah diancam dengan pidana penjara paling lama lima tahun.\n(3) Jika mengakibatkan mati, diancam dengan pidana penjara paling lama tujuh tahun.\n(4) Dengan penganiayaan disamakan sengaja merusak kesehatan.\n(5) Percobaan untuk melakukan kejahatan ini tidak dipidana.",
    officialTextEn: "(1) Maltreatment shall be punished by a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs.\\n(2) If the act results in severe injuries, the guilty person shall be punished by a maximum imprisonment of five years.\\n(3) If it results in death, the punishment shall be a maximum imprisonment of seven years.\\n(4) Intentional damage to health is equated with maltreatment.\\n(5) Attempt to commit this crime is not punishable.",
    explanation: "Pasal ini adalah pasal sapu jagat untuk penganiayaan (menyakiti tubuh orang lain secara fisik). KUHP tidak merumuskan arti 'penganiayaan', namun yurisprudensi mengartikannya sebagai perbuatan yang dengan sengaja menimbulkan rasa sakit atau luka pada tubuh orang lain. Hukuman bertambah berat sesuai dengan dampak luka korban.",
    explanationEn: "This is a catch-all article for maltreatment (inflicting physical pain on others). The Criminal Code does not define 'maltreatment', but jurisprudence interprets it as acts intentionally causing pain or injury to another person's body. The punishment increases in severity based on the impact of the victim's injuries.",
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
    chapterEn: "Book II Chapter XXII - Theft",
    officialText: "Barang siapa mengambil barang sesuatu, yang seluruhnya atau sebagian kepunyaan orang lain, dengan maksud untuk dimiliki secara melawan hukum, diancam karena pencurian, dengan pidana penjara paling lama lima tahun atau pidana denda paling banyak sembilan ratus rupiah.",
    officialTextEn: "Any person who takes any property, which belongs wholly or partly to another person, with the intention of unlawfully owning it, shall be punished for theft with a maximum imprisonment of five years or a maximum fine of nine hundred rupiahs.",
    explanation: "Ini merupakan rumusan baku dari tindak pidana pencurian. Unsur-unsur utamanya meliputi tindakan mengambil, benda berwujud maupun tidak berwujud (seperti listrik), sebagian/seluruhnya milik orang lain, serta maksud untuk memiliki benda tersebut dengan melawan hukum (tanpa hak).",
    explanationEn: "This is the standard formulation of the crime of theft. The main elements include the act of taking, tangible or intangible property (such as electricity), wholly or partly belonging to someone else, and the intention to own the property unlawfully (without right).",
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
    chapterEn: "Book II Chapter XXIV - Embezzlement",
    officialText: "Barang siapa dengan sengaja dan melawan hukum memiliki barang sesuatu yang seluruhnya atau sebagian adalah kepunyaan orang lain, tetapi yang ada dalam kekuasaannya bukan karena kejahatan diancam karena penggelapan, dengan pidana penjara paling lama empat tahun atau pidana denda paling banyak sembilan ratus rupiah.",
    officialTextEn: "Any person who deliberately and unlawfully owns any property that belongs wholly or partly to another person, but which is under his control not due to a crime, shall be punished for embezzlement with a maximum imprisonment of four years or a maximum fine of nine hundred rupiahs.",
    explanation: "Penggelapan berbeda dengan pencurian. Pada pencurian, pelaku 'mengambil' barang. Pada penggelapan, barang yang menjadi objek kejahatan sudah berada secara sah di bawah kekuasaan pelaku (misal dipinjamkan, atau disewa), lalu ia menyalahgunakan kekuasaan itu dengan mengaku atau bertindak sebagai pemiliknya secara melawan hukum.",
    explanationEn: "Embezzlement differs from theft. In theft, the perpetrator 'takes' the property. In embezzlement, the object of the crime is already legally under the perpetrator's control (e.g., loaned or rented), and they abuse that control by claiming or acting as its owner unlawfully.",
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
    chapterEn: "Book II Chapter XXV - Fraud",
    officialText: "Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, dengan memakai nama palsu atau martabat palsu, dengan tipu muslihat, ataupun rangkaian kebohongan, menggerakkan orang lain untuk menyerahkan barang sesuatu kepadanya, atau supaya memberi hutang maupun menghapuskan piutang, diancam karena penipuan dengan pidana penjara paling lama empat tahun.",
    officialTextEn: "Any person who, with the intention of unlawfully benefiting himself or another person, by assuming a false name or false capacity, by cunning deceit, or a web of lies, induces another person to hand over any property to him, or to incur a debt or to renounce a claim, shall be punished for fraud with a maximum imprisonment of four years.",
    explanation: "Ini merupakan pasal untuk tindak pidana penipuan. Inti dari pasal ini adalah tindakan seseorang yang memakai sarana (nama palsu, martabat palsu, tipu muslihat, atau rangkaian kebohongan) untuk memperdaya korban sehingga korban tersebut secara sukarela menyerahkan harta bendanya kepada pelaku.",
    explanationEn: "This is the article for the crime of fraud. The core of this article is a person's act of using means (false name, false capacity, cunning deceit, or a web of lies) to deceive a victim so that the victim voluntarily hands over their property to the perpetrator.",
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
    chapterEn: "Book II Chapter XIV - Crimes Against Decency",
    officialText: "Barang siapa dengan kekerasan atau ancaman kekerasan memaksa seorang wanita bersetubuh dengan dia di luar perkawinan, diancam karena melakukan perkosaan dengan pidana penjara paling lama dua belas tahun.",
    officialTextEn: "Any person who by force or threat of force compels a woman to have sexual intercourse with him outside marriage, shall be punished for committing rape with a maximum imprisonment of twelve years.",
    explanation: "Ini adalah delik pemerkosaan dalam KUHP (buku lama). Fokus utamanya adalah adanya unsur 'kekerasan atau ancaman kekerasan' untuk memaksa persetubuhan. Namun, di hukum modern saat ini, definisi dan ruang lingkup mengenai kejahatan seksual ini telah banyak disempurnakan (seperti yang diatur dalam UU TPKS).",
    explanationEn: "This is the offense of rape in the Criminal Code (old book). Its main focus is the element of 'force or threat of force' to compel sexual intercourse. However, in modern law today, the definition and scope regarding this sexual crime have been much refined (as regulated in the Law on Crimes of Sexual Violence).",
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
    chapterEn: "Book II Chapter XVI - Crimes Against Public Order",
    officialText: "Diancam dengan pidana penjara paling lama sepuluh tahun atau pidana denda paling banyak dua puluh lima juta rupiah, barang siapa tanpa mendapat izin: 1. dengan sengaja menawarkan atau memberikan kesempatan untuk permainan judi dan menjadikannya sebagai pencarian, atau dengan sengaja turut serta dalam suatu perusahaan untuk itu; 2. dengan sengaja menawarkan atau memberi kesempatan kepada khalayak umum untuk bermain judi atau dengan sengaja turut serta dalam perusahaan untuk itu, dengan tidak peduli apakah untuk menggunakan kesempatan adanya sesuatu syarat atau dipenuhinya sesuatu tata-cara; 3. menjadikan turut serta pada permainan judi sebagai pencarian.",
    officialTextEn: "Punished with a maximum imprisonment of ten years or a maximum fine of twenty-five million rupiahs, any person who without permission: 1. deliberately offers or provides an opportunity for gambling games and makes it a profession, or deliberately participates in an enterprise for that purpose; 2. deliberately offers or provides an opportunity to the general public to play gambling or deliberately participates in an enterprise for that purpose, regardless of whether the opportunity is subject to a condition or the fulfillment of a procedure; 3. makes participating in gambling games a profession.",
    explanation: "Pasal ini memberikan larangan bagi penyelenggara dan pihak yang menjadikan perjudian sebagai mata pencaharian. Segala bentuk permainan yang mendasarkan harapan untuk menang pada keberuntungan (untung-untungan) dan tanpa izin pemerintah secara tegas dilarang oleh hukum. Ini juga sering dikaitkan dengan pasal 303 bis.",
    explanationEn: "This article provides a prohibition for organizers and those who make gambling a livelihood. All forms of games that base the hope of winning on luck (games of chance) and without explicit government permission are prohibited by law. This is also often associated with Article 303 bis.",
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
    chapterEn: "Book II Chapter V - Crimes Against Public Order",
    officialText: "(1) Barang siapa dengan terang-terangan dan dengan tenaga bersama menggunakan kekerasan terhadap orang atau barang, diancam dengan pidana penjara paling lama lima tahun enam bulan. (2) Yang bersalah diancam: 1. dengan pidana penjara paling lama tujuh tahun, jika ia dengan sengaja menghancurkan barang atau jika kekerasan yang digunakan mengakibatkan luka-luka; 2. dengan pidana penjara paling lama sembilan tahun, jika kekerasan mengakibatkan luka berat; 3. dengan pidana penjara paling lama dua belas tahun, jika kekerasan mengakibatkan maut.",
    officialTextEn: "(1) Any person who openly and jointly uses force against persons or property, shall be punished with a maximum imprisonment of five years and six months. (2) The guilty party shall be punished: 1. with a maximum imprisonment of seven years, if they deliberately destroy property or if the force used results in injuries; 2. with a maximum imprisonment of nine years, if the force results in severe injuries; 3. with a maximum imprisonment of twelve years, if the force results in death.",
    explanation: "Pasal ini umum disebut pidana pengeroyokan. Poin kuncinya adalah 'tenaga bersama' atau kebersamaan pelaku (minimal 2 orang atau lebih), di muka umum, secara fisik melakukan kekerasan pada orang atau merusak barang. Hukumannya semakin berat sejalan dengan tingkat luka-luka atau bahkan kematian korban.",
    explanationEn: "This article is commonly referred to as the crime of mob violence (pengeroyokan). The key point is 'joint force' or the togetherness of perpetrators (minimum 2 persons or more), in public, physically committing violence against a person or destroying property. The punishment becomes more severe in line with the level of injury or even death of the victim.",
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
    chapterEn: "Book II Chapter XIV - Crimes Against Decency",
    officialText: "Barang siapa dengan kekerasan atau ancaman kekerasan memaksa seseorang untuk melakukan atau membiarkan dilakukan perbuatan cabul, diancam karena melakukan perbuatan yang menyerang kehormatan kesusilaan, dengan pidana penjara paling lama sembilan tahun.",
    officialTextEn: "Any person who by force or threat of force compels someone to commit or endure obscene acts, shall be punished for committing acts attacking moral decency, with a maximum imprisonment of nine years.",
    explanation: "Pasal ini tentang pencabulan. 'Perbuatan cabul' ditafsirkan sebagai segala perbuatan yang melanggar rasa kesusilaan (nafsu birahi), seperti meraba, mencium secara paksa, dsb. Berbeda dengan Pasal 285 yang mengisyaratkan adanya persetubuhan, Pasal 289 mencakup tindak pelecehan secara lebih luas selama ada unsur kekerasan atau ancaman kekerasan.",
    explanationEn: "This article is about molestation. 'Obscene act' is interpreted as any act that violates the sense of decency (sexual lust), such as groping, forcibly kissing, etc. Unlike Article 285 which implies intercourse, Article 289 covers harassment more broadly as long as there is an element of force or threat of force.",
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
    chapterEn: "Book II Chapter XVI - Insult",
    officialText: "(1) Barang siapa sengaja menyerang kehormatan atau nama baik seseorang dengan menuduhkan sesuatu hal, yang maksudnya terang supaya hal itu diketahui umum, diancam karena pencemaran dengan pidana penjara paling lama sembilan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah. (2) Jika hal itu dilakukan dengan tulisan atau gambaran yang disiarkan, dipertunjukkan atau ditempelkan di muka umum, maka diancam karena pencemaran tertulis dengan pidana penjara paling lama satu tahun empat bulan atau pidana denda paling banyak empat ribu lima ratus rupiah.",
    officialTextEn: "(1) Any person who deliberately attacks the honor or reputation of someone by accusing them of something, with the clear intention of making it publicly known, shall be punished for defamation with a maximum imprisonment of nine months or a maximum fine of four thousand five hundred rupiahs. (2) If this is done in writing or with pictures broadcast, shown, or posted in public, they shall be punished for written defamation with a maximum imprisonment of one year and four months or a maximum fine of four thousand five hundred rupiahs.",
    explanation: "Ini adalah dasar hukum untuk kasus penghinaan dan pencemaran nama baik. Unsur utamanya adalah menuduhkan perbuatan tertentu (fakta palsu) dengan niat untuk diketahui umum agar nama baik korban tercemar. Ayat 2 berbicara tentang versi tertulis dari fitnah ini (yang saat ini juga relevan dan terkait dengan UU ITE jika di ranah elektronik).",
    explanationEn: "This is the legal basis for cases of insult and defamation. The main element is accusing someone of a certain act (false facts) with the intent for the public to know so that the victim's reputation is defamed. Paragraph 2 speaks about the written version of this slander (which is currently also relevant and linked to the ITE Law if in the electronic realm).",
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
    chapterEn: "Book II Chapter XXVII - Destroying or Damaging Property",
    officialText: "(1) Barang siapa dengan sengaja dan melawan hukum menghancurkan, merusakkan, membikin tak dapat dipakai atau menghilangkan barang sesuatu yang seluruhnya atau sebagian milik orang lain, diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah. (2) Dijatuhkan pidana yang sama terhadap orang yang dengan sengaja dan melawan hukum membunuh, merusakkan, membikin tak dapat digunakan atau menghilangkan hewan, yang seluruhnya atau sebagian milik orang lain.",
    officialTextEn: "(1) Any person who deliberately and unlawfully destroys, damages, renders unusable or causes the loss of any property which belongs wholly or partly to another person, shall be punished with a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs. (2) The same punishment shall be imposed on anyone who deliberately and unlawfully kills, damages, renders unusable or causes the loss of an animal, which belongs wholly or partly to another person.",
    explanation: "Pasal perusakan barang. Intinya jika seseorang sengaja (ada niat) dan secara melawan hak (tidak punya otoritas atas barang tsb) membuat sebuah barang menjadi tidak berfungsi dengan baik, cacat, hancur, maupun hilang. Objeknya dapat berupa benda mati maupun hewan peliharaan (benda hidup).",
    explanationEn: "The article on property destruction. In essence, if someone intentionally (with intent) and unlawfully (has no authority over the property) causes an item to malfunction, become defective, destroyed, or lost. The object can be inanimate objects or pets (living things).",
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
    chapterEn: "Book I Chapter V - Participation in Criminal Acts",
    officialText: "(1) Dipidana sebagai pelaku tindak pidana: 1. mereka yang melakukan, yang menyuruh melakukan, dan yang turut serta melakukan perbuatan; 2. mereka yang dengan memberi atau menjanjikan sesuatu dengan menyalahgunakan kekuasaan atau martabat, dengan kekerasan, ancaman atau penyesatan, atau dengan memberi kesempatan, sarana atau keterangan, sengaja menganjurkan orang lain supaya melakukan perbuatan. (2) Terhadap penganjur, hanya perbuatan yang sengaja dianjurkan sajalah yang diperhitungkan, beserta akibat-akibatnya.",
    officialTextEn: "(1) Punished as perpetrators of a criminal act are: 1. those who commit, who order to commit, and who participate in committing the act; 2. those who by giving or promising something by abusing power or dignity, by force, threat or deception, or by providing the opportunity, means or information, deliberately urge others to commit the act. (2) In respect of the instigator, only those acts which have been deliberately instigated shall be taken into account, together with their consequences.",
    explanation: "Pasal ini mengatur asas 'Deelneming' (Penyertaan). Ketika sebuah kejahatan dilakukan oleh lebih dari satu orang, hukum menentukan peran masing-masing pelaku. Ada 'pleger' (yang melakukan langsung), 'doen pleger' (menyuruh melakukan), 'medepleger' (turut serta), dan 'uitlokker' (menganjurkan/menggerakkan). Mereka diancam pidana sebagai pelaku utama.",
    explanationEn: "This article regulates the principle of 'Deelneming' (Participation). When a crime is committed by more than one person, the law determines the role of each perpetrator. There is a 'pleger' (direct perpetrator), 'doen pleger' (who orders), 'medepleger' (co-perpetrator), and 'uitlokker' (instigator). They are threatened with punishment as primary perpetrators.",
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
    chapterEn: "Book I Chapter V - Participation in Criminal Acts",
    officialText: "Dipidana sebagai pembantu kejahatan: 1. mereka yang sengaja memberi bantuan pada waktu kejahatan dilakukan; 2. mereka yang sengaja memberi kesempatan, sarana atau keterangan untuk melakukan kejahatan.",
    officialTextEn: "Punished as accomplices to a crime: 1. those who deliberately provide assistance at the time the crime is committed; 2. those who deliberately provide the opportunity, means or information to commit the crime.",
    explanation: "Pasal ini mengenai 'Medeplichtigheid' atau perbantuan. Seseorang berstatus pembantu apabila perannya hanya menunjang perbuatan utama (pelaku). Pembantuan bisa terjadi pada saat kejahatan sedang berlangsung (seperti berjaga-jaga), atau sebelum kejahatan (seperti memberikan kunci gembok). Hukuman bagi pembantu biasanya dikurangi sepertiga dari hukuman maksimal pelaku utama (Pasal 57 KUHP).",
    explanationEn: "This article is regarding 'Medeplichtigheid' or complicity. A person is an accomplice if their role only supports the main act (perpetrator). Assistance can occur while the crime is ongoing (such as keeping watch), or before the crime (such as providing a padlock key). The punishment for an accomplice is usually reduced by a third from the maximum punishment of the main perpetrator (Article 57 of the Criminal Code).",
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
    chapterEn: "Book II Chapter XXI - Causing Death or Injury by Negligence",
    officialText: "Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain mati, diancam dengan pidana penjara paling lama lima tahun atau pidana kurungan paling lama satu tahun.",
    officialTextEn: "Any person whose fault (negligence) causes the death of another person shall be punished with a maximum imprisonment of five years or a maximum confinement of one year.",
    explanation: "Ini adalah bentuk delik kelalaian (culpa). Berbeda dengan pembunuhan sengaja, pasal ini diterapkan bila tidak ada niat membunuh, melainkan semata-mata karena kelalaian, ketidakhati-hatian, atau kecerobohan pelaku, yang malangnya berujung pada meninggalnya orang lain. Misalnya kecelakaan lalu lintas akibat ngantuk.",
    explanationEn: "This is a form of negligence offense (culpa). Unlike intentional murder, this article is applied when there is no intent to kill, but rather solely due to negligence, carelessness, or recklessness of the perpetrator, which unfortunately leads to the death of another person. For example, a traffic accident caused by drowsiness.",
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
    chapterEn: "Book II Chapter XXI - Causing Death or Injury by Negligence",
    officialText: "(1) Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain mendapat luka-luka berat, diancam dengan pidana penjara paling lama lima tahun atau pidana kurungan paling lama satu tahun. (2) Barang siapa karena kesalahannya (kealpaannya) menyebabkan orang lain luka-luka sedemikian rupa sehingga timbul penyakit atau halangan menjalankan pekerjaan jabatan atau pencarian selama waktu tertentu, diancam dengan pidana penjara paling lama sembilan bulan atau pidana kurungan paling lama enam bulan atau pidana denda paling tinggi empat ribu lima ratus rupiah.",
    officialTextEn: "(1) Any person whose fault (negligence) causes another person to suffer severe injuries shall be punished with a maximum imprisonment of five years or a maximum confinement of one year. (2) Any person whose fault (negligence) causes another person injuries such that illness arises or it hinders them from performing their official duties or profession for a certain period, shall be punished with a maximum imprisonment of nine months or a maximum confinement of six months or a maximum fine of four thousand five hundred rupiahs.",
    explanation: "Sama seperti Pasal 359 yang mengatur perihal kelalaian, tetapi akibatnya bukan pada kematian melainkan pada luka fisik berat atau sakit sementara yang menghalangi korban melakukan kegiatan sehari-harinya.",
    explanationEn: "Similar to Article 359 which regulates negligence, but the consequence is not death but rather severe physical injury or temporary illness that prevents the victim from performing their daily activities.",
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
    chapterEn: "Book II Chapter XXII - Theft",
    officialText: "(1) Diancam dengan pidana penjara paling lama sembilan tahun pencurian yang didahului, disertai atau diikuti dengan kekerasan atau ancaman kekerasan, terhadap orang dengan maksud untuk mempersiapkan atau mempermudah pencurian, atau dalam hal tertangkap tangan, untuk memungkinkan melarikan diri sendiri atau peserta lainnya, atau untuk tetap menguasai barang yang dicuri. (2) Diancam dengan pidana penjara paling lama dua belas tahun: 1. jika perbuatan dilakukan pada waktu malam dalam sebuah rumah atau pekarangan tertutup yang ada rumahnya, di jalan umum, atau dalam kereta api atau trem yang sedang berjalan; 2. jika perbuatan dilakukan oleh dua orang atau lebih dengan bersekutu; 3. jika masuk ke tempat melakukan kejahatan dengan merusak atau memanjat atau dengan memakai anak kunci palsu, perintah palsu atau pakaian jabatan palsu; 4. jika perbuatan mengakibatkan luka-luka berat. (3) Jika perbuatan mengakibatkan mati, maka diancam dengan pidana penjara paling lama lima belas tahun. (4) Diancam dengan pidana mati atau pidana penjara seumur hidup atau selama waktu tertentu paling lama dua puluh tahun, jika perbuatan mengakibatkan luka berat atau mati dan dilakukan oleh dua orang atau lebih dengan bersekutu, disertai pula oleh salah satu hal yang diterangkan dalam no. 1 dan 3.",
    officialTextEn: "(1) Theft preceded, accompanied or followed by force or threat of force, against persons with the intent to prepare or facilitate the theft, or in the case of being caught in the act, to enable oneself or other participants to escape, or to retain control of the stolen property, shall be punished with a maximum imprisonment of nine years. (2) Punished with a maximum imprisonment of twelve years: 1. if the act is committed at night in a house or closed yard where there is a house, on a public road, or in a moving train or tram; 2. if the act is committed by two or more people jointly; 3. if entering the place to commit the crime by breaking or climbing or by using false keys, false orders or false official uniforms; 4. if the act results in severe injuries. (3) If the act results in death, it shall be punished with a maximum imprisonment of fifteen years. (4) Punished with death penalty or life imprisonment or a temporary period of a maximum of twenty years, if the act results in severe injury or death and is committed by two or more people jointly, accompanied by one of the circumstances described in nos. 1 and 3.",
    explanation: "Ini merupakan pasal untuk pencurian dengan kekerasan (sering dikenal dengan istilah perampokan atau begal). Kekerasan ini bisa terjadi di awal, bersamaan, maupun di akhir perbuatan asalkan tujuannya adalah mempermulus aksi penguasaan barang tersebut. Hukuman bertingkat sesuai modus dan akibat, mencapai pidana mati pada ayat 4.",
    explanationEn: "This is the article for theft with violence (often known as robbery or mugging). This violence can occur at the beginning, simultaneously, or at the end of the act as long as the purpose is to smooth the action of taking control of the property. Punishments are tiered according to modus operandi and consequences, reaching the death penalty in paragraph 4.",
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
    chapterEn: "Book II Chapter XXIII - Extortion and Threat",
    officialText: "(1) Barang siapa dengan maksud untuk menguntungkan diri sendiri atau orang lain secara melawan hukum, memaksa seorang dengan kekerasan atau ancaman kekerasan untuk memberikan barang sesuatu, yang seluruhnya atau sebagian adalah kepunyaan orang itu atau orang lain, atau supaya membuat hutang maupun menghapuskan piutang, diancam karena pemerasan, dengan pidana penjara paling lama sembilan tahun. (2) Ketentuan Pasal 365 ayat (2), (3), dan (4) berlaku bagi kejahatan ini.",
    officialTextEn: "(1) Any person who with the intent to unlawfully benefit himself or another person, forces someone with violence or threat of violence to give up any property, which belongs wholly or partly to that person or another person, or to incur a debt or renounce a claim, shall be punished for extortion, with a maximum imprisonment of nine years. (2) The provisions of Article 365 paragraphs (2), (3), and (4) shall apply to this crime.",
    explanation: "Tindak pidana pemerasan (Afpersing). Berbeda dengan pencurian dengan kekerasan, di sini pelaku menekan atau memaksa psikologis/fisik sedemikian rupa sehingga korban akhirnya terpaksa memberikan sendiri harta atau barangnya pada pelaku akibat takut akan kekerasan tersebut (seperti aksi premanisme, pemalakan).",
    explanationEn: "The crime of extortion (Afpersing). Unlike theft with violence, here the perpetrator exerts psychological/physical pressure or force in such a way that the victim is ultimately forced to hand over their wealth or property to the perpetrator out of fear of that violence (such as thuggery, extortion).",
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
    chapterEn: "Book II Chapter XIV - Crimes Against Decency",
    officialText: "Diancam dengan pidana penjara paling lama dua tahun delapan bulan atau pidana denda paling banyak empat ribu lima ratus rupiah: 1. barang siapa dengan sengaja merusak kesusilaan di muka umum; 2. barang siapa dengan sengaja merusak kesusilaan di depan orang lain yang bertentangan dengan kehendak orang itu.",
    officialTextEn: "Punished with a maximum imprisonment of two years and eight months or a maximum fine of four thousand five hundred rupiahs: 1. any person who deliberately damages decency in public; 2. any person who deliberately damages decency in front of someone else contrary to that person's will.",
    explanation: "Pasal ini mengatur tindak pidana merusak kesusilaan atau kesopanan umum (misalnya eksibisionisme, berpelukan mesum atau mempertontonkan aurat tanpa hak di tempat yang bisa dilihat umum). Hukum tidak menetapkan secara mutlak apa 'kesusilaan' tersebut melainkan dikembalikan pada tata karma atau kepatutan sosial yang berkembang di tengah masyarakat.",
    explanationEn: "This article regulates the criminal act of damaging decency or public modesty (e.g., exhibitionism, indecent embracing or displaying private parts without right in a place visible to the public). The law does not absolutely define what 'decency' is, but refers it back to the social manners or propriety prevailing in society.",
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
    chapterEn: "Book II Chapter XVI - Insult",
    officialText: "Tiap-tiap penghinaan dengan sengaja yang tidak bersifat pencemaran atau pencemaran tertulis yang dilakukan terhadap seseorang, baik di muka umum dengan lisan atau tulisan, maupun di muka orang itu sendiri dengan lisan atau perbuatan, atau dengan surat yang dikirimkan atau diterimakan kepadanya, diancam karena penghinaan ringan dengan pidana penjara paling lama empat bulan dua minggu atau pidana denda paling banyak empat ribu lima ratus rupiah.",
    officialTextEn: "Every deliberate insult which is not of the nature of defamation or written defamation, committed against a person, whether in public verbally or in writing, or in the presence of that person verbally or by deed, or by a letter sent or delivered to him, shall be punished for minor insult with a maximum imprisonment of four months and two weeks or a maximum fine of four thousand five hundred rupiahs.",
    explanation: "Penghinaan ringan (Eenvoudige belediging). Bedanya dengan pencemaran nama baik (Pasal 310) adalah tidak adanya tuduhan tentang perbuatan tertentu yang disiarkan. Ini berupa ujaran makian bodoh, kata-kata cacian langsung, atau ludahan ke wajah seseorang di hadapannya secara langsung. Sifat deliknya adalah delik aduan absolut (harus korban yang melapor).",
    explanationEn: "Minor insult (Eenvoudige belediging). The difference from defamation (Article 310) is the absence of an accusation of a specific act being broadcast. This can take the form of foolish swearing, direct insults, or spitting in someone's face directly. The nature of the offense is an absolute complaint offense (the victim must report it).",
    keywords: ["penghinaan ringan", "makian", "caci maki", "delik aduan"],
    relatedArticles: ["310", "311"],
    imageRef: "gavel"
  }
];
