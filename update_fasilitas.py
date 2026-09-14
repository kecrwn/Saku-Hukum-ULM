import os

file_path = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/app/fasilitas/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

indonesian_items = """[[Building2, "Bangunan Baru & Gedung Lama Fakultas Hukum", "Bangunan utama untuk layanan administrasi, perkuliahan, dan Program Magister (S2)."], [Building2, "Gedung Peradilan Semu Desmond J. Mahesa", "Riset tambahan dan berita resmi ULM mencatat peresmian gedung ini pada Juli 2024 sebagai ruang peradilan semu. Jam serta ketentuan penggunaan tidak dipublikasikan."], [Presentation, "Auditorium Prof. Idham Zarkasi, S.H.", "Auditorium utama dengan lobi tersendiri, digunakan untuk acara besar seperti seminar Adhyaksa Chamber."], [BookMarked, "Hukumonline Corner", "Berita resmi ULM menyebutnya sebagai Hukumonline Corner pertama di Kalimantan, hasil kerja sama FH ULM dan Hukumonline."], [Presentation, "Ruang dan layanan akademik", "Galeri mencantumkan ruang ujian, pelayanan akademik/kemahasiswaan (PTSP), dan gazebo pelayanan."], [HandHeart, "Ruang mahasiswa & Disabilitas", "Galeri fasilitas mencantumkan taman belajar, sekretariat UKM, lahan parkir luas, serta sarana prasarana disabilitas."]]"""

english_items = """[[Building2, "New & Old Faculty of Law Buildings", "The main buildings for administrative services, lectures, and the Master's Program (S2)."], [Building2, "Desmond J. Mahesa Mock Court Building", "Additional research and official ULM news record this building’s July 2024 inauguration as a mock-court venue. Operating hours and usage rules are not published."], [Presentation, "Prof. Idham Zarkasi Auditorium", "The main auditorium with its own lobby, used for major events such as the Adhyaksa Chamber seminar."], [BookMarked, "Hukumonline Corner", "Official ULM news identifies it as the first Hukumonline Corner in Kalimantan, created through an FH ULM–Hukumonline collaboration."], [Presentation, "Academic spaces and services", "The gallery lists examination rooms, academic/student service areas (PTSP), and service gazebos."], [HandHeart, "Student & Disability spaces", "The facilities gallery lists study gardens, student-activity secretariats, ample parking, and disability facilities."]]"""

import re
# Replace the whole array declaration
content = re.sub(
    r'const facilityItems = isIndonesian \? \[.*?\] : \[.*?\];',
    f'const facilityItems = isIndonesian ? {indonesian_items} : {english_items};',
    content,
    flags=re.DOTALL
)

with open(file_path, "w") as f:
    f.write(content)
print("Fasilitas updated")
