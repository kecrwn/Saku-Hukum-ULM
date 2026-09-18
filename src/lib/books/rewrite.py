import json
import os

books_dir = '/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/lib/books/'

def rewrite_administrasi():
    with open(os.path.join(books_dir, 'administrasi.json'), 'r') as f:
        data = json.load(f)
    
    # Chapter 1
    data['chapters'][0]['content'] = """# Bab 1: Mengenal Hukum Administrasi Negara

## 1. Apa Itu Hukum Administrasi Negara?

Hukum Administrasi Negara (HAN) adalah aturan main bagi pemerintah. Bayangkan negara sebagai sebuah perusahaan besar. Jika Hukum Tata Negara (HTN) adalah anggaran dasar yang membentuk posisi direktur dan manajer, maka Hukum Administrasi Negara adalah SOP (Standar Operasional Prosedur) yang mengatur bagaimana para direktur dan manajer itu bekerja sehari-hari agar tidak merugikan karyawan atau pelanggan. 

HAN bertujuan agar pejabat negara tidak bertindak semena-mena. Istilah ini dikenal dengan sebutan berbeda di berbagai negara, misalnya *Administratief Recht* di Belanda atau *Administrative Law* di negara-negara Anglo-Amerika.

### Perkembangan Istilah di Indonesia
Di Indonesia, kita dulu menggunakan istilah Hukum Tata Usaha Negara (HTUN). Namun, agar tidak disalahpahami hanya sebatas urusan surat-menyurat di kantor, para ahli hukum sepakat menggunakan nama **Hukum Administrasi Negara**. Saat ini, kita membedakan keduanya: HAN adalah teori luasnya, sedangkan HTUN lebih ke arah praktik peradilannya (seperti di Peradilan Tata Usaha Negara atau PTUN).

---

## 2. Definisi Menurut Para Ahli

Agar lebih jelas, mari kita lihat pendapat beberapa tokoh hukum:

* **Van Vollenhoven**: HAN adalah aturan yang mengikat pemerintah saat mereka sedang bekerja menjalankan tugasnya.
* **Logemann**: HAN adalah aturan khusus yang menentukan cara pejabat negara menjalankan kewenangan yang sudah diberikan oleh Hukum Tata Negara.
* **Prajudi Atmosudirdjo**: Beliau membagi HAN menjadi tiga bagian: hukum tentang struktur birokrasi, hukum yang dibuat oleh birokrasi (seperti izin), dan hukum untuk mengawasi birokrasi.

---

## 3. Hubungannya dengan Hukum Tata Negara (HTN)

Hubungan HAN dan HTN sangat erat, ibarat dua sisi keping koin. 

> *Hukum Tata Negara mempelajari negara dalam keadaan diam (struktur, lembaga, fungsi), sedangkan Hukum Administrasi Negara mempelajari negara dalam keadaan bergerak (praktik pelayanan publik).*

Menurut teori residu dari Van Vollenhoven, HAN adalah semua sisa urusan negara yang bukan termasuk Hukum Tata Negara, Hukum Perdata, atau Hukum Pidana.

---

## 4. Hubungan HAN dengan Hukum Perdata dan Pidana

* **Dengan Hukum Perdata**: Negara itu punya "dua wajah". Saat membuat keputusan (seperti mencabut izin), negara bertindak sebagai penguasa yang tunduk pada HAN. Tapi, saat negara menyewa gedung atau membeli barang, negara bertindak setara dengan warga biasa dan tunduk pada hukum perdata (misalnya <cite>Pasal 1365 KUHPerdata</cite> tentang perbuatan melawan hukum).
* **Dengan Hukum Pidana**: Hukum pidana berfungsi sebagai "senjata pamungkas" atau *ultimum remedium*. Jika teguran atau denda administratif tidak mempan, barulah sanksi pidana dijatuhkan kepada pelanggar aturan pemerintah.

---

## 5. Sumber-Sumber Hukum Administrasi Negara

Dari mana aturan HAN berasal?
* **Sumber Materiil**: Berasal dari nilai-nilai masyarakat, Pancasila, dan kebutuhan pelayanan publik yang baik.
* **Sumber Formil**: Ini adalah bentuk resmi aturannya, seperti <cite>UUD 1945</cite>, <cite>UU No. 30 Tahun 2014</cite> tentang Administrasi Pemerintahan, Peraturan Pemerintah, Peraturan Daerah, hingga kebiasaan administrasi (konvensi).

---

## 6. Asas Legalitas: Aturan Main Utama

Dalam HAN, ada satu aturan emas yang disebut **Asas Legalitas**:
> *Tiada kewenangan tanpa undang-undang.*

Artinya, setiap tindakan pejabat negara yang mengikat masyarakat harus memiliki dasar hukum yang jelas. Pejabat tidak boleh bertindak hanya berdasarkan keinginan pribadi. 

Seiring berkembangnya zaman menjadi Negara Kesejahteraan (*Welfare State*), asas ini berubah sedikit. Pemerintah kini dituntut lebih aktif mengurus rakyat, sehingga mereka diberi ruang untuk mengambil keputusan sendiri (diskresi) selama tidak melanggar keadilan dan Asas-Asas Umum Pemerintahan yang Baik (AUPB).
"""
    data['chapters'][0]['contentEn'] = data['chapters'][0]['content']

    # Chapter 2
    data['chapters'][1]['content'] = """# Bab 2: Wewenang dan Kebijakan Pemerintah (Diskresi)

## 1. Apa Itu Wewenang?

Dalam hukum, **wewenang** berbeda dengan kekuasaan. Kekuasaan adalah kemampuan memaksa orang lain, sedangkan wewenang adalah kekuasaan yang *sah* secara hukum.

Setiap wewenang pejabat pemerintah selalu dibatasi oleh tiga hal:
1. **Wilayah**: Walikota hanya berwenang di kotanya.
2. **Materi**: Menteri Kesehatan hanya mengurus kesehatan, bukan urusan pajak.
3. **Waktu**: Wewenang hanya berlaku selama pejabat tersebut menjabat.

---

## 2. Tiga Cara Pejabat Mendapatkan Wewenang

Menurut <cite>UU No. 30 Tahun 2014</cite>, ada tiga cara pejabat mendapatkan wewenangnya:

* **Atribusi**: Wewenang asli yang langsung diberikan oleh Undang-Undang. Contoh: UUD 1945 memberikan wewenang kepada Presiden. Tanggung jawab penuh ada pada pejabat tersebut.
* **Delegasi**: Pelimpahan wewenang dari satu pejabat ke pejabat lain. Di sini, tanggung jawab juga ikut berpindah sepenuhnya kepada penerima wewenang.
* **Mandat**: Pejabat atasan menyuruh bawahan untuk melaksanakan tugas atas nama atasan tersebut. Dalam mandat, tanggung jawab tetap berada di tangan atasan.

---

## 3. Tindakan Administrasi Negara

Tindakan pemerintah (*bestuurshandeling*) dibagi dua:
1. **Tindakan Nyata (Faktual)**: Tindakan fisik yang tidak langsung menimbulkan akibat hukum, seperti membangun jalan atau mengaspal jembatan.
2. **Tindakan Hukum**: Tindakan yang sengaja dilakukan untuk menciptakan akibat hukum, seperti menerbitkan SK atau memberikan IMB.

Tindakan hukum ini biasanya berbentuk **Keputusan Tata Usaha Negara (KTUN)**. Syarat sah KTUN meliputi: dibuat oleh pejabat berwenang, tidak ada cacat hukum (seperti penipuan), dan prosedurnya benar.

---

## 4. Diskresi (Freies Ermessen)

Terkadang, undang-undang tidak mengatur suatu masalah secara rinci, atau aturannya belum ada. Di sinilah **Diskresi** berperan. 

> *Diskresi adalah kebebasan pejabat pemerintah untuk mengambil keputusan sendiri dalam situasi tertentu demi kepentingan umum.*

Namun, diskresi bukan berarti bertindak semaunya. Diskresi hanya boleh digunakan jika:
* Sesuai dengan tujuan undang-undang.
* Tidak melanggar asas kepatutan.
* Berdasarkan Asas-Asas Umum Pemerintahan yang Baik (AUPB).

Jika diskresi merugikan masyarakat, warga bisa menggugatnya ke Pengadilan Tata Usaha Negara (PTUN).
"""
    data['chapters'][1]['contentEn'] = data['chapters'][1]['content']

    # If there are more chapters in administrasi, we can clear or update them, but usually it's just 2 or 3.
    # Let's handle the rest by keeping them simple or ignoring if they don't exist.
    
    with open(os.path.join(books_dir, 'administrasi.json'), 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def rewrite_agraria():
    with open(os.path.join(books_dir, 'hukum_agraria_lanjut.json'), 'r') as f:
        data = json.load(f)

    # Chapter 1
    data['chapters'][0]['content'] = """# Bab 1: Pendaftaran Tanah dan Sertifikat Tanah

### Kenapa Tanah Perlu Didaftarkan?
Bayangkan kamu punya barang berharga tapi tidak ada bukti kepemilikannya. Pasti rentan diambil orang, kan? Sama halnya dengan tanah. <cite>Pasal 19 Undang-Undang Pokok Agraria (UUPA)</cite> mewajibkan pemerintah mendaftarkan tanah di seluruh Indonesia agar ada **kepastian hukum**. 

Pendaftaran ini diatur lebih lanjut, yang terbaru melalui Peraturan Pemerintah <cite>PP No. 18 Tahun 2021</cite>. Tujuannya agar kita tahu persis:
1. Tanah itu di mana dan seberapa luas (Kepastian Objek).
2. Siapa pemilik sahnya (Kepastian Subjek).
3. Status hukumnya apa, misalnya Hak Milik atau Hak Guna Bangunan (Kepastian Hukum).

---

## 1. Asas-Asas Pendaftaran Tanah

Proses mendaftarkan tanah harus berpegang pada lima asas utama:
* **Sederhana**: Prosesnya mudah dimengerti dan tidak berbelit-belit.
* **Aman**: Hasilnya akurat dan melindungi pemilik yang jujur.
* **Terjangkau**: Biayanya tidak memberatkan masyarakat (bahkan ada program gratis dari pemerintah).
* **Mutakhir**: Datanya selalu di-update jika ada perubahan (misal tanah dijual atau diwariskan).
* **Terbuka**: Info tentang status tanah bisa diakses oleh pihak yang berkepentingan.

Ada juga asas **Kontradiktur Delimitasi**, yaitu batas tanah baru bisa diukur kalau tetangga sebelah-menyebelah sudah setuju. Biar tidak ada ribut-ribut soal batas pagar nanti!

---

## 2. Sistem Publikasi: Negatif Bertendensi Positif

Di dunia, ada dua sistem pendaftaran tanah utama:
* **Sistem Positif**: Sertifikat adalah bukti mutlak. Kalau ada kesalahan dari negara, pemilik asli tidak bisa minta tanahnya balik, cuma dapat uang ganti rugi.
* **Sistem Negatif**: Sertifikat cuma bukti awal. Kalau ada yang bisa membuktikan bahwa dia pemilik aslinya, sertifikat bisa dibatalkan kapan saja.

**Bagaimana dengan Indonesia?**
Indonesia memakai sistem **Negatif Bertendensi Positif**. Artinya, sertifikat adalah bukti yang sangat kuat, *tapi bukan mutlak*. Kalau ternyata sertifikat itu terbit karena penipuan, masih bisa digugat ke pengadilan. Namun, untuk menjaga kestabilan, ada yang namanya aturan kedaluwarsa.

---

## 3. Aturan Kedaluwarsa Gugatan (Rechtsverwerking)

Berdasarkan <cite>PP No. 24 Tahun 1997</cite>, jika seseorang sudah memegang sertifikat secara sah, dengan itikad baik (tidak nipu), dan menguasai tanah itu secara nyata selama **5 tahun**, maka orang lain tidak bisa lagi menggugat tanah tersebut. 

Ini dibuat supaya pemilik sertifikat bisa hidup tenang tanpa takut tiba-tiba ada yang menggugat tanahnya sepuluh tahun kemudian.

---

## 4. Bagaimana Cara Mendaftar Tanah?

Ada dua cara mendaftarkan tanah yang belum bersertifikat:
1. **Sistematik (PTSL)**: Ini program massal dari pemerintah yang gratis/murah. Petugas datang ke desa-desa untuk mendaftarkan semua tanah di situ serentak.
2. **Sporadik**: Ini inisiatif kita sendiri. Kita datang ke kantor Badan Pertanahan Nasional (BPN) untuk mendaftarkan tanah kita secara mandiri.

Setelah tanah punya sertifikat, datanya harus terus **dipelihara**. Kalau tanah dijual, harus ada Akta Jual Beli (AJB) dari PPAT. Kalau pemiliknya meninggal, harus ada Surat Waris.

---

## 5. Era Baru: Sertifikat Elektronik

Kini, sertifikat tanah tidak lagi berupa buku hijau tebal, melainkan **Sertifikat Elektronik (Sertipikat-el)**.
* Dokumen aslinya tersimpan aman di server BPN.
* Pemilik hanya diberi satu lembar kertas khusus yang berisi *QR Code*.
* *QR Code* ini bisa di-scan kapan saja untuk melihat status asli tanah secara *real-time*.
* Ditandatangani secara digital, sehingga sangat sulit dipalsukan oleh mafia tanah.
"""
    data['chapters'][0]['contentEn'] = data['chapters'][0]['content']

    # Chapter 2
    data['chapters'][1]['content'] = """# Bab 2: Hak Menguasai Negara dan Aturan Dasar Agraria

### Memahami Perubahan Sejarah
Dulu, di zaman penjajahan Belanda, ada aturan bernama *Domeinverklaring*. Inti aturan ini sangat kejam: "Semua tanah yang tidak bisa dibuktikan kepemilikannya oleh rakyat, otomatis menjadi milik mutlak (domein) Pemerintah Belanda." Akibatnya, tanah adat rakyat banyak dirampas untuk dijadikan perkebunan.

Setelah merdeka, Indonesia menghapus aturan itu. Sebagai gantinya, <cite>Pasal 33 ayat (3) UUD 1945</cite> menyatakan bahwa bumi dan air **dikuasai oleh negara** untuk kemakmuran rakyat. 

---

## 1. Makna "Hak Menguasai dari Negara"

Perhatikan kata "dikuasai", bukan "dimiliki". Negara bukanlah tuan tanah raksasa yang bebas menjual tanah sesukanya. Berdasarkan <cite>Pasal 2 UUPA</cite>, wewenang negara hanyalah:
* Mengatur peruntukan dan penggunaan tanah (misalnya, mana daerah resapan air, mana perumahan).
* Menentukan hubungan hukum antara orang dan tanah.
* Mengatur perbuatan hukum terkait tanah (jual beli, sewa, dsb).

Jadi, tugas negara adalah sebagai **pengatur dan pengurus** demi kepentingan publik, bukan sebagai pemilik pribadi.

---

## 2. Susunan Tingkatan Hak Atas Tanah

Hukum tanah kita mengenal tingkatan hak sebagai berikut:
1. **Hak Bangsa Indonesia**: Ini adalah hak tertinggi. Semua tanah di Indonesia pada hakikatnya adalah milik seluruh rakyat Indonesia bersama-sama.
2. **Hak Menguasai dari Negara**: Negara diberi mandat oleh rakyat untuk mengatur tanah tersebut.
3. **Hak Ulayat Masyarakat Adat**: Hak yang dimiliki oleh komunitas adat (seperti suku-suku) atas wilayah adat mereka.
4. **Hak Perseorangan/Pribadi**: Ini adalah hak yang bisa dimiliki oleh individu atau perusahaan, seperti Hak Milik, Hak Guna Usaha (HGU), dan Hak Guna Bangunan (HGB).

---

## 3. Asas-Asas Utama Hukum Agraria Nasional

Hukum agraria kita berpegang pada aturan-aturan dasar ini:

* **Asas Unifikasi Hukum**: Dulu ada hukum tanah adat dan hukum tanah Barat. Sekarang, disatukan menjadi satu Hukum Agraria Nasional yang berdasarkan pada Hukum Adat yang sudah disesuaikan dengan nilai-nilai modern.
* **Fungsi Sosial Tanah (<cite>Pasal 6 UUPA</cite>)**: Semua tanah punya fungsi sosial. Artinya, kamu tidak boleh menggunakan tanahmu sebebas-bebasnya kalau itu merugikan orang lain (misal, bikin pabrik beracun di tengah permukiman). Kalau negara butuh tanahmu untuk bangun jalan tol (kepentingan umum), kamu harus rela melepasnya dengan ganti rugi yang adil.
* **Larangan Tanah Absentee/Guntai**: Aturan ini melarang seseorang memiliki tanah pertanian jika ia tidak tinggal di kecamatan tempat tanah itu berada. Tujuannya agar tanah benar-benar digarap oleh petani lokal, bukan dijadikan ajang investasi spekulasi oleh orang kota.
* **Reforma Agraria**: Ini adalah program pemerintah untuk membagikan tanah kepada rakyat kecil yang tidak punya tanah (redistribusi aset), sekaligus memberikan bantuan modal dan penyuluhan agar mereka bisa mandiri (redistribusi akses).
"""
    data['chapters'][1]['contentEn'] = data['chapters'][1]['content']

    # For safety, ensure we only overwrite known chapters or truncate if needed, 
    # but based on the length, they usually just have these 2 chapters in these sample files.
    with open(os.path.join(books_dir, 'hukum_agraria_lanjut.json'), 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    rewrite_administrasi()
    rewrite_agraria()
    print("Rewriting completed successfully.")
