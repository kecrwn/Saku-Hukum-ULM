import re

with open('src/app/latihan/page.tsx', 'r') as f:
    content = f.read()

# Add useLanguage import
if "useLanguage" not in content:
    content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useLanguage } from '@/contexts/LanguageContext';")

# Add isIndonesian hook
if "const { isIndonesian }" not in content:
    content = content.replace("export default function LatihanPage() {", "export default function LatihanPage() {\n  const { isIndonesian } = useLanguage();")

# Replace texts
replacements = [
    ("Kembali", "{isIndonesian ? 'Kembali' : 'Back'}"),
    ("Latihan <em", "{isIndonesian ? 'Latihan ' : 'Practice '}<em"),
    ("Kasus</em>", "{isIndonesian ? 'Kasus' : 'Cases'}</em>"),
    ("Uji pemahaman Anda tentang tindak pidana dengan menganalisis studi kasus nyata. AI kami akan meninjau jawaban Anda berdasarkan KUHP Baru (UU 1/2023).", "{isIndonesian ? 'Uji pemahaman Anda tentang tindak pidana dengan menganalisis studi kasus nyata. AI kami akan meninjau jawaban Anda berdasarkan KUHP Baru (UU 1/2023).' : 'Test your understanding of criminal acts by analyzing real case studies. Our AI will review your answers based on the New KUHP (Law 1/2023).'}"),
    ("Skenario: Pencurian", "{isIndonesian ? 'Skenario: Pencurian' : 'Scenario: Theft'}"),
    ("Analisis Anda", "{isIndonesian ? 'Analisis Anda' : 'Your Analysis'}"),
    ("Identifikasi pasal yang relevan dan analisis unsur-unsurnya...", 'isIndonesian ? "Identifikasi pasal yang relevan dan analisis unsur-unsurnya..." : "Identify relevant articles and analyze their elements..."'),
    ("Anda sedang offline. Koneksi internet diperlukan untuk mendapatkan umpan balik AI.", "{isIndonesian ? 'Anda sedang offline. Koneksi internet diperlukan untuk mendapatkan umpan balik AI.' : 'You are offline. An internet connection is required to get AI feedback.'}"),
    ("'Menganalisis...'", "isIndonesian ? 'Menganalisis...' : 'Analyzing...'"),
    ("'Kirim Analisis'", "isIndonesian ? 'Kirim Analisis' : 'Submit Analysis'"),
    ("Hasil Tinjauan AI", "{isIndonesian ? 'Hasil Tinjauan AI' : 'AI Review Results'}"),
    ("Identifikasi Isu", "{isIndonesian ? 'Identifikasi Isu' : 'Issue Identification'}"),
    ("Penggunaan Pasal & Kutipan", "{isIndonesian ? 'Penggunaan Pasal & Kutipan' : 'Article Usage & Citation'}"),
    ("Penerapan Hukum", "{isIndonesian ? 'Penerapan Hukum' : 'Legal Application'}"),
    ("Elemen yang Terlewat", "{isIndonesian ? 'Elemen yang Terlewat' : 'Missed Elements'}"),
    ("Kirimkan analisis Anda untuk melihat umpan balik terstruktur mengenai isu hukum, kutipan pasal, penerapan hukum, dan elemen yang terlewat.", "{isIndonesian ? 'Kirimkan analisis Anda untuk melihat umpan balik terstruktur mengenai isu hukum, kutipan pasal, penerapan hukum, dan elemen yang terlewat.' : 'Submit your analysis to see structured feedback regarding legal issues, article citations, legal application, and missed elements.'}"),
    ("Gagal mendapatkan umpan balik. Silakan coba lagi.", "isIndonesian ? 'Gagal mendapatkan umpan balik. Silakan coba lagi.' : 'Failed to get feedback. Please try again.'")
]

for old, new in replacements:
    if "placeholder=" in content and old in content and new.startswith('isIndonesian ?'):
        content = content.replace(f'placeholder="{old}"', f'placeholder={new}')
    elif "Error('" in content and old in content:
        content = content.replace(f"Error('{old}')", f"Error({new})")
    else:
        content = content.replace(old, new)

# Handle SCENARIO constant
scenario_id = "Budi sedang berjalan di pasar dan melihat sebuah dompet tergeletak di atas meja seorang pedagang buah. Saat pedagang sedang sibuk melayani pembeli lain, Budi dengan cepat mengambil dompet tersebut dan memasukkannya ke dalam saku celananya. Budi kemudian segera meninggalkan pasar tanpa berniat mengembalikan dompet itu. Analisislah tindak pidana yang dilakukan Budi berdasarkan KUHP Baru."
scenario_en = "Budi is walking in the market and sees a wallet lying on a fruit vendor's table. While the vendor is busy serving another customer, Budi quickly grabs the wallet and puts it in his pants pocket. Budi then immediately leaves the market with no intention of returning the wallet. Analyze the criminal act committed by Budi based on the New KUHP."

content = content.replace(f'const SCENARIO = "{scenario_id}";', f'const SCENARIO_ID = "{scenario_id}";\nconst SCENARIO_EN = "{scenario_en}";')

# Replace {SCENARIO} with {isIndonesian ? SCENARIO_ID : SCENARIO_EN} inside JSX
content = content.replace('{SCENARIO}', '{isIndonesian ? SCENARIO_ID : SCENARIO_EN}')

# Fix the fetch call
content = content.replace('scenario: SCENARIO', 'scenario: isIndonesian ? SCENARIO_ID : SCENARIO_EN')


with open('src/app/latihan/page.tsx', 'w') as f:
    f.write(content)
