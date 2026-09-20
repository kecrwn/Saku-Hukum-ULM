export interface GlossaryTerm {
  id: string;
  term: string;
  termEn: string;
  definition: string;
  definitionEn: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "delik-aduan",
    term: "Delik Aduan",
    termEn: "Complaint Offense",
    definition: "Tindak pidana yang hanya dapat dituntut apabila ada pengaduan dari pihak yang dirugikan.",
    definitionEn: "A criminal offense that can only be prosecuted upon a complaint from the aggrieved party."
  },
  {
    id: "dolus",
    term: "Dolus",
    termEn: "Intent / Malice Aforethought",
    definition: "Kesengajaan atau niat buruk untuk melakukan suatu perbuatan tindak pidana.",
    definitionEn: "Intent or malicious design to commit a criminal act."
  },
  {
    id: "culpa",
    term: "Culpa",
    termEn: "Negligence",
    definition: "Kealpaan, kelalaian, atau kurang hati-hati yang mengakibatkan terjadinya suatu tindak pidana.",
    definitionEn: "Negligence, carelessness, or lack of caution resulting in a criminal offense."
  },
  {
    id: "ne-bis-in-idem",
    term: "Ne Bis In Idem",
    termEn: "Double Jeopardy",
    definition: "Asas hukum yang melarang seseorang diadili lebih dari satu kali atas perbuatan yang sama dan telah ada putusan pengadilan yang berkekuatan hukum tetap.",
    definitionEn: "A legal principle prohibiting a person from being tried more than once for the same offense after a final binding court decision."
  },
  {
    id: "praperadilan",
    term: "Praperadilan",
    termEn: "Pre-trial Hearing",
    definition: "Wewenang pengadilan negeri untuk memeriksa dan memutus sah atau tidaknya penangkapan, penahanan, penghentian penyidikan, atau penghentian penuntutan.",
    definitionEn: "The authority of the district court to examine and decide on the legality of an arrest, detention, termination of investigation, or termination of prosecution."
  },
  {
    id: "p-21",
    term: "P-21",
    termEn: "Complete Investigation Dossier",
    definition: "Pemberitahuan bahwa hasil penyidikan sudah lengkap oleh penuntut umum kepada penyidik kepolisian.",
    definitionEn: "Notification by the public prosecutor to the police investigators that the investigation dossier is complete."
  },
  {
    id: "kasasi",
    term: "Kasasi",
    termEn: "Cassation Appeal",
    definition: "Upaya hukum kepada Mahkamah Agung untuk membatalkan putusan pengadilan tingkat banding karena adanya kesalahan penerapan hukum.",
    definitionEn: "A legal remedy to the Supreme Court seeking the annulment of an appellate court's decision due to misapplication of the law."
  },
  {
    id: "banding",
    term: "Banding",
    termEn: "Appeal",
    definition: "Upaya hukum yang dilakukan oleh pihak yang tidak puas terhadap putusan pengadilan tingkat pertama untuk diperiksa ulang di pengadilan tinggi.",
    definitionEn: "A legal remedy taken by a party dissatisfied with a first-level court decision, seeking a re-examination at the high court."
  },
  {
    id: "tersangka",
    term: "Tersangka",
    termEn: "Suspect",
    definition: "Seseorang yang karena perbuatannya atau keadaannya, berdasarkan bukti permulaan patut diduga sebagai pelaku tindak pidana.",
    definitionEn: "A person who, due to their actions or circumstances and based on preliminary evidence, is reasonably suspected of committing a criminal offense."
  },
  {
    id: "terdakwa",
    term: "Terdakwa",
    termEn: "Defendant",
    definition: "Seorang tersangka yang dituntut, diperiksa dan diadili di sidang pengadilan.",
    definitionEn: "A suspect who is prosecuted, examined, and tried in a court hearing."
  },
  {
    id: "terpidana",
    term: "Terpidana",
    termEn: "Convict",
    definition: "Seseorang yang dipidana berdasarkan putusan pengadilan yang telah memperoleh kekuatan hukum tetap.",
    definitionEn: "A person convicted based on a court decision that has obtained permanent legal force."
  },
  {
    id: "wanprestasi",
    term: "Wanprestasi",
    termEn: "Breach of Contract",
    definition: "Keadaan di mana salah satu pihak tidak memenuhi kewajiban atau janji yang telah disepakati dalam perjanjian.",
    definitionEn: "A situation where one party fails to fulfill the obligations or promises agreed upon in a contract."
  },
  {
    id: "perbuatan-melawan-hukum",
    term: "Perbuatan Melawan Hukum (PMH)",
    termEn: "Unlawful Act / Tort",
    definition: "Tiap perbuatan yang melanggar hukum dan membawa kerugian kepada orang lain, mewajibkan orang yang menimbulkan kerugian itu untuk menggantinya.",
    definitionEn: "Any unlawful act that causes harm to another person, obliging the person causing the harm to compensate for it."
  },
  {
    id: "peninjauan-kembali",
    term: "Peninjauan Kembali (PK)",
    termEn: "Judicial Review",
    definition: "Upaya hukum luar biasa terhadap putusan pengadilan yang telah berkekuatan hukum tetap, biasanya karena ditemukan bukti baru (novum).",
    definitionEn: "An extraordinary legal remedy against a court decision with permanent legal force, usually due to the discovery of new evidence (novum)."
  },
  {
    id: "somasi",
    term: "Somasi",
    termEn: "Legal Notice / Subpoena",
    definition: "Teguran atau peringatan dari pihak kreditor (atau kuasa hukumnya) kepada debitor agar dapat memenuhi kewajibannya.",
    definitionEn: "A warning or notice from a creditor (or their legal counsel) to a debtor to fulfill their obligations."
  },
  {
    id: "delik-biasa",
    term: "Delik Biasa",
    termEn: "Ordinary Offense",
    definition: "Tindak pidana yang dapat dituntut tanpa perlu adanya pengaduan dari pihak yang dirugikan atau korban.",
    definitionEn: "A criminal offense that can be prosecuted without the need for a complaint from the aggrieved party or victim."
  },
  {
    id: "eksekusi",
    term: "Eksekusi",
    termEn: "Execution / Enforcement",
    definition: "Pelaksanaan putusan pengadilan yang telah mempunyai kekuatan hukum tetap.",
    definitionEn: "The enforcement or carrying out of a court decision that has acquired permanent legal force."
  },
  {
    id: "barang-bukti",
    term: "Barang Bukti",
    termEn: "Material Evidence",
    definition: "Benda-benda yang digunakan untuk melakukan atau yang merupakan hasil dari tindak pidana, yang disita oleh penyidik untuk kepentingan pembuktian.",
    definitionEn: "Items used to commit or resulting from a criminal offense, confiscated by investigators for evidentiary purposes."
  },
  {
    id: "saksi",
    term: "Saksi",
    termEn: "Witness",
    definition: "Orang yang dapat memberikan keterangan guna kepentingan penyidikan, penuntutan dan peradilan tentang suatu perkara pidana yang ia dengar, lihat, atau alami sendiri.",
    definitionEn: "A person who can provide information for the purpose of investigation, prosecution, and trial regarding a criminal case they heard, saw, or experienced themselves."
  },
  {
    id: "penyidikan",
    term: "Penyidikan",
    termEn: "Criminal Investigation",
    definition: "Serangkaian tindakan penyidik untuk mencari serta mengumpulkan bukti yang dengan bukti itu membuat terang tentang tindak pidana yang terjadi dan guna menemukan tersangkanya.",
    definitionEn: "A series of actions by an investigator to search for and gather evidence to clarify the criminal offense that occurred and to identify the suspect."
  }
];
