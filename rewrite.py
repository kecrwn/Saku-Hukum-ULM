import json

def rewrite_pih():
    with open('src/lib/books/pih.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    chapters = data.get('chapters', [])
    
    # Bab 1
    chapters[0]['content'] = """# Bab 1: Manusia dan Masyarakat\n\nSebagai makhluk hidup, kita tidak bisa hidup sendirian. Aristoteles menyebut kita sebagai **Zoon Politikon** (makhluk sosial). \n\n> "Ubi societas, ibi ius" - Di mana ada masyarakat, di situ ada hukum.\n\nKarena kita terus berinteraksi, pasti ada gesekan. Itulah sebabnya kita butuh **hukum** untuk menjaga ketertiban. Ada 4 kaidah sosial:\n- **Agama**: Dari Tuhan (Sanksi: Dosa).\n- **Kesusilaan**: Dari hati nurani (Sanksi: Penyesalan).\n- **Kesopanan**: Dari kebiasaan masyarakat (Sanksi: Dikucilkan).\n- **Hukum**: Dari negara, bersifat memaksa (Sanksi: Penjara/Denda, seperti <cite>Pasal 338 KUHP</cite>)."""
    
    chapters[0]['contentEn'] = """# Chapter 1: Humans and Society\n\nAs human beings, we cannot live alone. Aristotle called us **Zoon Politikon** (social creatures).\n\n> "Ubi societas, ibi ius" - Where there is society, there is law.\n\nBecause we interact constantly, conflicts are inevitable. That's why we need **law** to maintain order. There are 4 social norms:\n- **Religion**: From God.\n- **Morality**: From conscience.\n- **Politeness**: From society.\n- **Law**: From the state, with strict sanctions like <cite>Article 338 of the Criminal Code</cite>."""

    # Bab 2
    chapters[1]['content'] = """# Bab 2: Pengertian dan Ruang Lingkup Ilmu Hukum\n\n**Pengantar Ilmu Hukum (PIH)** adalah tiket masuk kamu ke dunia hukum. \n\nBanyak ahli berdebat tentang definisi hukum. Namun, intinya:\n> Hukum adalah aturan yang mengatur tingkah laku, dibuat oleh negara, dan bersifat memaksa.\n\nIlmu hukum itu unik (*sui generis*). Dia bukan sekadar ilmu sosial biasa, melainkan ilmu yang menentukan apa yang **seharusnya** dilakukan. Berbeda dengan **PHI** (Pengantar Hukum Indonesia) yang fokus pada hukum positif yang sedang berlaku di Indonesia saat ini, **PIH** belajar teori hukum secara universal!"""
    
    chapters[1]['contentEn'] = """# Chapter 2: Introduction to Jurisprudence\n\n**Introduction to Legal Science (PIH)** is your entry ticket to the legal world.\n\nMany experts debate the definition of law, but simply put:\n> Law is a set of rules governing behavior, created by the state, and is enforceable.\n\nLegal science is unique (*sui generis*). It focuses on what **should** be done. Unlike **PHI** (Introduction to Indonesian Law) which focuses on currently applied laws in Indonesia, **PIH** studies universal legal theories!"""

    # Bab 3
    chapters[2]['content'] = """# Bab 3: Tujuan, Fungsi, dan Asas Hukum\n\nUntuk apa hukum itu ada? Gustav Radbruch merumuskan 3 tujuan utama hukum:\n1. **Keadilan** (Etis)\n2. **Kemanfaatan** (Sosiologis)\n3. **Kepastian** (Yuridis formal)\n\nHukum punya banyak asas penting yang jadi fondasinya. Misalnya:\n- *Lex Superior Derogat Legi Inferiori* (Aturan yang lebih tinggi mengalahkan yang rendah).\n- *Asas Legalitas* (Tidak ada pidana tanpa aturan sebelumnya, sesuai <cite>Pasal 1 ayat 1 KUHP</cite>).\n- *Pacta Sunt Servanda* (Perjanjian mengikat seperti undang-undang bagi pembuatnya, <cite>Pasal 1338 KUHPerdata</cite>)."""
    
    chapters[2]['contentEn'] = """# Chapter 3: Purpose, Function, and Legal Principles\n\nWhat is the purpose of law? Gustav Radbruch formulated 3 main goals:\n1. **Justice** (Ethical)\n2. **Utility** (Sociological)\n3. **Certainty** (Juridical)\n\nLaw also has fundamental principles, such as:\n- *Lex Superior Derogat Legi Inferiori* (Higher law overrides lower law).\n- *Principle of Legality* (No punishment without prior law, as per <cite>Article 1 Paragraph 1 of the Criminal Code</cite>).\n- *Pacta Sunt Servanda* (Agreements are legally binding, <cite>Article 1338 of the Civil Code</cite>)."""

    # Bab 4
    chapters[3]['content'] = """# Bab 4: Sumber-Sumber Hukum Formil dan Materiil\n\nSumber hukum adalah tempat di mana kita bisa menemukan aturan hukum.\n\n**Sumber Hukum Materiil**:\nFaktor yang menentukan *isi* hukum, seperti nilai agama, sosial, dan ekonomi di masyarakat.\n\n**Sumber Hukum Formil**:\nBentuk nyata dari hukum yang diakui. Ada 5 yang utama:\n1. **Undang-Undang** (Aturan tertulis).\n2. **Kebiasaan** (Aturan tidak tertulis yang diikuti terus-menerus).\n3. **Yurisprudensi** (Putusan hakim terdahulu).\n4. **Traktat** (Perjanjian antar negara).\n5. **Doktrin** (Pendapat para ahli hukum terkemuka)."""
    
    chapters[3]['contentEn'] = """# Chapter 4: Formal and Material Sources of Law\n\nSources of law are where we can find legal rules.\n\n**Material Sources**:\nFactors determining the *content* of law, such as religious, social, and economic values.\n\n**Formal Sources**:\nThe recognized tangible forms of law. There are 5 main types:\n1. **Statutes** (Written laws).\n2. **Custom** (Unwritten laws followed consistently).\n3. **Jurisprudence** (Previous court decisions).\n4. **Treaties** (International agreements).\n5. **Doctrine** (Opinions of prominent legal scholars)."""

    # Bab 5
    chapters[4]['content'] = """# Bab 5: Konsep Dasar Ilmu Hukum\n\nMari kita kenalan dengan tokoh-tokoh utama di panggung hukum:\n- **Subjek Hukum**: Pembawa hak dan kewajiban. Bisa berupa manusia (*natuurlijke persoon*) sejak ia lahir hingga meninggal, atau badan hukum (*rechtspersoon*) seperti PT dan Yayasan.\n- **Objek Hukum**: Segala sesuatu yang berguna bagi subjek hukum dan dapat dikuasai (biasanya berupa benda/hak milik).\n\n> Hukum mengatur hubungan antara **Subjek Hukum** yang satu dengan lainnya terkait dengan **Objek Hukum**.\n\nHubungan ini diikat oleh **Hak** (wewenang) dan **Kewajiban** (beban)."""

    chapters[4]['contentEn'] = """# Chapter 5: Basic Concepts of Law\n\nLet's meet the main actors on the legal stage:\n- **Legal Subjects**: Bearers of rights and duties. Can be natural persons (*natuurlijke persoon*) from birth to death, or legal entities (*rechtspersoon*) like corporations.\n- **Legal Objects**: Anything useful to legal subjects that can be controlled (usually property/rights).\n\n> Law regulates the relationship between **Legal Subjects** regarding **Legal Objects**.\n\nThis relationship is bound by **Rights** (authority) and **Duties** (obligations)."""

    # Bab 6
    chapters[5]['content'] = """# Bab 6: Sistem Hukum Dunia dan Penemuan Hukum\n\nDi dunia ini, ada dua sistem hukum besar yang paling berpengaruh:\n1. **Civil Law (Eropa Kontinental)**: Dipakai di Indonesia! Fokus pada undang-undang tertulis sebagai sumber utama.\n2. **Common Law (Anglo-Saxon)**: Dipakai di AS dan Inggris. Fokus pada putusan hakim (*yurisprudensi*) sebagai sumber utama.\n\nBagaimana kalau hukumnya belum ada atau kurang jelas? \nHakim wajib melakukan **Penemuan Hukum** (*Rechtsvinding*). Hakim tidak boleh menolak perkara dengan alasan hukumnya tidak ada (<cite>Pasal 10 ayat 1 UU Kekuasaan Kehakiman</cite>). Mereka harus menafsirkan aturan atau menggali nilai di masyarakat!"""

    chapters[5]['contentEn'] = """# Chapter 6: World Legal Systems and Legal Discovery\n\nThere are two major legal systems in the world:\n1. **Civil Law**: Used in Indonesia! Focuses on written statutes as the main source.\n2. **Common Law**: Used in the US and UK. Focuses on judge's decisions (*jurisprudence*).\n\nWhat if the law is unclear or doesn't exist? \nJudges must perform **Legal Discovery** (*Rechtsvinding*). Judges cannot refuse a case citing lack of law (<cite>Article 10 Paragraph 1 of the Judicial Power Law</cite>). They must interpret rules or explore societal values!"""

    # Bab 7
    chapters[6]['content'] = """# Bab 7: Mazhab dan Aliran Teori Hukum\n\nHukum juga punya aliran pemikirannya sendiri lho!\n\n- **Hukum Alam**: Hukum itu universal dan abadi, berasal dari Tuhan atau rasio manusia.\n- **Positivisme Hukum**: Hukum adalah perintah penguasa yang tertulis. Kalau nggak tertulis, ya bukan hukum!\n- **Mazhab Sejarah**: Hukum tidak dibuat, melainkan tumbuh bersama masyarakat (*Volksgeist*).\n- **Sociological Jurisprudence**: Hukum yang baik harus sesuai dengan hukum yang hidup di masyarakat (*Living Law*).\n\nSetiap aliran memberikan warna tersendiri dalam bagaimana kita memandang keadilan saat ini."""

    chapters[6]['contentEn'] = """# Chapter 7: Schools of Legal Theory\n\nLaw has its own schools of thought!\n\n- **Natural Law**: Law is universal and eternal, stemming from God or human reason.\n- **Legal Positivism**: Law is the written command of the sovereign. If it's not written, it's not law!\n- **Historical School**: Law is not made, it grows with society (*Volksgeist*).\n- **Sociological Jurisprudence**: Good law must align with the living law in society.\n\nEach school adds its own flavor to how we perceive justice today."""

    with open('src/lib/books/pih.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def rewrite_sp():
    with open('src/lib/books/sistemperadilan.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # SP has either chapters or sections
    chapters = data.get('chapters', data.get('sections', []))
    
    # Bab 1
    chapters[0]['content'] = """# Bab 1: Landasan Konstitusional dan Asas Peradilan\n\nSistem peradilan kita bersandar pada fondasi kuat konstitusi. Menurut <cite>Pasal 24 UUD 1945</cite>, kekuasaan kehakiman itu merdeka, bebas dari campur tangan pihak manapun.\n\nBeberapa asas penting di pengadilan:\n- **Peradilan Cepat, Sederhana, dan Biaya Ringan**: Agar masyarakat tidak kehabisan waktu dan uang.\n- **Sidang Terbuka Untuk Umum**: Transparan, siapa saja boleh menonton (kecuali kasus tertentu seperti anak/asusila).\n- **Praduga Tak Bersalah**: Setiap orang dianggap tidak bersalah sampai ada putusan hakim."""
    
    chapters[0]['contentEn'] = """# Chapter 1: Constitutional Foundation and Judicial Principles\n\nOur judicial system rests on a strong constitutional foundation. According to <cite>Article 24 of the 1945 Constitution</cite>, judicial power is independent.\n\nImportant court principles:\n- **Fast, Simple, and Low-Cost Trial**: To save people time and money.\n- **Open to Public**: Transparent, anyone can watch (except specific cases like minors).\n- **Presumption of Innocence**: Everyone is innocent until proven guilty by a judge."""

    # Bab 2
    chapters[1]['content'] = """# Bab 2: Struktur MA dan 4 Lingkungan Peradilan\n\nDi puncak sistem peradilan Indonesia berdiri **Mahkamah Agung (MA)**. Di bawah MA, ada 4 "kamar" pengadilan untuk kasus yang berbeda-beda:\n\n1. **Peradilan Umum** (Pengadilan Negeri & Tinggi): Mengadili perkara pidana dan perdata umum.\n2. **Peradilan Agama**: Khusus untuk umat Islam, seperti perceraian dan waris.\n3. **Peradilan Militer**: Mengadili tentara yang melakukan kejahatan.\n4. **Peradilan Tata Usaha Negara (PTUN)**: Mengadili pejabat negara yang mengeluarkan SK yang merugikan rakyat.\n\n> MA adalah benteng terakhir pencari keadilan melalui jalur *Kasasi*."""

    chapters[1]['contentEn'] = """# Chapter 2: Supreme Court and the 4 Judicial Environments\n\nAt the top of Indonesia's judicial system stands the **Supreme Court (MA)**. Below it, there are 4 types of courts:\n\n1. **General Courts**: Handles common criminal and civil cases.\n2. **Religious Courts**: Specifically for Muslims, such as divorce and inheritance.\n3. **Military Courts**: Tries soldiers who commit crimes.\n4. **Administrative Courts**: Handles disputes between citizens and state officials.\n\n> MA is the final fortress for justice seekers through *Cassation*."""

    # Bab 3
    chapters[2]['content'] = """# Bab 3: Mahkamah Konstitusi dan Komisi Yudisial\n\nSelain MA, kita punya dua lembaga penting lainnya sejak era reformasi:\n\n- **Mahkamah Konstitusi (MK)**: Sang "Pengawal Konstitusi". MK bertugas menguji undang-undang agar tidak melanggar UUD 1945 (<cite>Pasal 24C UUD 1945</cite>), membubarkan partai politik, dan memutus sengketa pemilu.\n- **Komisi Yudisial (KY)**: Sang "Pengawas Hakim". KY memastikan para hakim tetap berintegritas, tidak menerima suap, dan menjaga kehormatan profesi hukum (<cite>Pasal 24B UUD 1945</cite>)."""
    
    chapters[2]['contentEn'] = """# Chapter 3: Constitutional Court and Judicial Commission\n\nBesides the Supreme Court, we have two other important institutions:\n\n- **Constitutional Court (MK)**: The "Guardian of the Constitution". It reviews laws to ensure they don't violate the Constitution (<cite>Article 24C of the 1945 Constitution</cite>).\n- **Judicial Commission (KY)**: The "Judge Watchdog". It ensures judges maintain integrity and do not accept bribes (<cite>Article 24B of the 1945 Constitution</cite>)."""

    # Bab 4
    chapters[3]['content'] = """# Bab 4: Aktor Penegak Hukum (Catur Wangsa)\n\nDalam proses peradilan, ada 4 aktor utama yang saling bekerja sama, yang sering disebut **Catur Wangsa**:\n\n1. **Polisi**: Bertugas menyelidiki dan menyidik, mencari bukti dan tersangka.\n2. **Jaksa**: Berperan sebagai Penuntut Umum yang membawa kasus ke pengadilan (<cite>UU No. 11 Tahun 2021</cite>).\n3. **Hakim**: Sang pemutus perkara yang harus adil dan bijaksana.\n4. **Advokat / Pengacara**: Pembela hak-hak tersangka/terdakwa agar mendapat peradilan yang fair.\n\n> Keadilan tidak bisa tegak jika keempat pilar ini tidak berdiri kokoh bersama."""
    
    chapters[3]['contentEn'] = """# Chapter 4: Law Enforcement Actors\n\nIn the judicial process, there are 4 main actors (Catur Wangsa):\n\n1. **Police**: Investigates and finds evidence/suspects.\n2. **Prosecutors**: Brings cases to court on behalf of the state (<cite>Law No. 11 of 2021</cite>).\n3. **Judges**: The impartial decision-makers.\n4. **Advocates / Lawyers**: Defends the rights of suspects/defendants for a fair trial.\n\n> Justice cannot stand tall if these four pillars do not stand strong together."""

    # Bab 5
    chapters[4]['content'] = """# Bab 5: Modernisasi dan Keadilan Restoratif\n\nSistem peradilan kita tidak kuno! Sekarang kita masuk ke era digital dengan adanya **E-Court** dan **E-Litigation**, di mana daftar dan sidang bisa dilakukan secara *online*.\n\nSelain itu, ada tren baru yaitu **Restorative Justice (Keadilan Restoratif)**.\n> Bukannya berfokus pada penghukuman pelaku, hukum kini mulai berfokus pada *pemulihan korban* dan mediasi.\n\nKalau kerugian kecil dan kedua belah pihak sudah berdamai, kasus tidak perlu sampai ke pengadilan. Ini solusi cerdas untuk mengatasi penjara yang terlalu penuh (*overcrowding*)!"""

    chapters[4]['contentEn'] = """# Chapter 5: Modernization and Restorative Justice\n\nOur justice system is evolving! We now have **E-Court** and **E-Litigation**, allowing online registrations and hearings.\n\nMoreover, there is a new trend called **Restorative Justice**.\n> Instead of focusing on punishing the offender, the law now emphasizes *restoring the victim* and mediation.\n\nIf the loss is minor and both parties reconcile, the case doesn't need to go to trial. This is a smart solution to solve prison overcrowding!"""

    if 'chapters' in data:
        data['chapters'] = chapters
    else:
        data['sections'] = chapters

    with open('src/lib/books/sistemperadilan.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    rewrite_pih()
    rewrite_sp()
    print("Done writing to JSON files.")
