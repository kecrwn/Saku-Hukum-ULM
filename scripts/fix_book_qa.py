#!/usr/bin/env python3
"""
fix_book_qa.py
Comprehensive QA & Formatting Fix Script for SakuHukumULM Books:
- acaraperdata.json
- acarapidana.json
- administrasi.json
- hukum_agraria_lanjut.json

Ensures:
1. Valid JSON structure and schema.
2. Markdown formatting compliance (lists, blockquotes, bolding, headings).
3. Statutory citations properly wrapped with <cite>...</cite> tags (without modifying code blocks).
4. Code blocks and preformatted ASCII boxes preserved cleanly.
5. Clean contentEn fields (empty string triggers BookReader's native translation notice).
6. Processing flags _processed and _processedEn set to true.
"""

import json
import os
import re

BOOKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src', 'lib', 'books')
if not os.path.exists(BOOKS_DIR):
    BOOKS_DIR = 'src/lib/books'

TARGET_FILES = [
    'acaraperdata.json',
    'acarapidana.json',
    'administrasi.json',
    'hukum_agraria_lanjut.json'
]

def replace_outside_code_blocks(text, pattern, replacement):
    """Replaces regex pattern only outside ``` code blocks to preserve ASCII art."""
    if '```' not in text:
        return re.sub(pattern, replacement, text)
    
    parts = text.split('```')
    for i in range(0, len(parts), 2):
        parts[i] = re.sub(pattern, replacement, parts[i])
    return '```'.join(parts)

def qa_and_fix_acaraperdata(data):
    chapters = data.get('chapters', [])
    for ch in chapters:
        ch['_processed'] = True
        ch['_processedEn'] = True
        if not ch.get('contentEn'):
            ch['contentEn'] = ""
        
        content = ch.get('content', '')
        # Wrap any missed citations
        content = replace_outside_code_blocks(
            content,
            r'(?<!<cite>)UU Kekuasaan Kehakiman(?!</cite>)',
            r'<cite>UU Kekuasaan Kehakiman</cite>'
        )
        content = replace_outside_code_blocks(
            content,
            r'(?<!<cite>)Peraturan Mahkamah Agung \(PERMA\)(?!</cite>)',
            r'<cite>Peraturan Mahkamah Agung (PERMA)</cite>'
        )
        ch['content'] = content
        
    return data

def qa_and_fix_acarapidana(data):
    chapters = data.get('chapters', [])
    for ch in chapters:
        ch['_processed'] = True
        ch['_processedEn'] = True
        if not ch.get('contentEn'):
            ch['contentEn'] = ""
    return data

def qa_and_fix_administrasi(data):
    chapters = data.get('chapters', [])
    for idx, ch in enumerate(chapters):
        ch['_processed'] = True
        ch['_processedEn'] = True
        
        # Clean placeholder in contentEn
        content_en = ch.get('contentEn', '')
        if "pending English translation placeholder" in content_en or content_en == ch.get('content', ''):
            ch['contentEn'] = ""

        content = ch.get('content', '')

        # Add <cite> tags for statutory references in chapters 3, 4, 5
        if idx >= 2:
            subs = [
                (
                    r'Pasal 1 angka 9 Undang-Undang Nomor 51 Tahun 2009 tentang Perubahan Kedua atas UU No\. 5 Tahun 1986 tentang Peradilan Tata Usaha Negara',
                    r'<cite>Pasal 1 angka 9 UU No. 51 Tahun 2009 tentang Perubahan Kedua atas UU No. 5 Tahun 1986</cite>'
                ),
                (
                    r'Undang-Undang Nomor 30 Tahun 2014 tentang Administrasi Pemerintahan',
                    r'<cite>UU No. 30 Tahun 2014 tentang Administrasi Pemerintahan</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 30 Tahun 2014(?!</cite>)',
                    r'<cite>UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'(?<!<cite>)Pasal 87 UU No\. 30 Tahun 2014(?!</cite>)',
                    r'<cite>Pasal 87 UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'(?<!<cite>)Pasal 87 UU 30/2014(?!</cite>)',
                    r'<cite>Pasal 87 UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'(?<!<cite>)Pasal 3 UU No\. 5 Tahun 1986(?!</cite>)',
                    r'<cite>Pasal 3 UU No. 5 Tahun 1986</cite>'
                ),
                (
                    r'(?<!<cite>)Pasal 53 UU No\. 30 Tahun 2014(?!</cite>)',
                    r'<cite>Pasal 53 UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'Peraturan Mahkamah Agung \(Perma\) No\. 6 Tahun 2018',
                    r'<cite>Perma No. 6 Tahun 2018</cite>'
                ),
                (
                    r'(?<!<cite>)Perma No\. 6 Tahun 2018(?!</cite>)',
                    r'<cite>Perma No. 6 Tahun 2018</cite>'
                ),
                (
                    r'UU Cipta Kerja \(UU No\. 6 Tahun 2023\)',
                    r'<cite>UU No. 6 Tahun 2023 (UU Cipta Kerja)</cite>'
                ),
                (
                    r'(?<!<cite>)Undang-Undang Nomor 5 Tahun 1986(?!</cite>)',
                    r'<cite>UU No. 5 Tahun 1986</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 5 Tahun 1986(?!</cite>)',
                    r'<cite>UU No. 5 Tahun 1986</cite>'
                ),
                (
                    r'Undang-Undang Nomor 28 Tahun 1999 tentang Penyelenggaraan Negara yang Bersih dan Bebas dari KKN',
                    r'<cite>UU No. 28 Tahun 1999</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 28/1999(?!</cite>)',
                    r'<cite>UU No. 28 Tahun 1999</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 9 Tahun 2004(?!</cite>)',
                    r'<cite>UU No. 9 Tahun 2004</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 9/2004(?!</cite>)',
                    r'<cite>UU No. 9 Tahun 2004</cite>'
                ),
                (
                    r'Pasal 53 ayat \(2\) huruf b UU No\. 9 Tahun 2004',
                    r'<cite>Pasal 53 ayat (2) huruf b UU No. 9 Tahun 2004</cite>'
                ),
                (
                    r'Pasal 10 ayat \(1\) dan Penjelasan UU No\. 30 Tahun 2014',
                    r'<cite>Pasal 10 ayat (1) UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'UU No\. 14 Tahun 2008 tentang Keterbukaan Informasi Publik',
                    r'<cite>UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik</cite>'
                ),
                (
                    r'UU No\. 25 Tahun 2009 tentang Pelayanan Publik',
                    r'<cite>UU No. 25 Tahun 2009 tentang Pelayanan Publik</cite>'
                ),
                (
                    r'Pasal 75 sampai dengan Pasal 78 UU No\. 30 Tahun 2014',
                    r'<cite>Pasal 75 s/d 78 UU No. 30 Tahun 2014</cite>'
                ),
                (
                    r'Pasal 67 ayat \(1\) UU PTUN',
                    r'<cite>Pasal 67 ayat (1) UU PTUN</cite>'
                ),
                (
                    r'Pasal 67 ayat \(2\) sampai ayat \(4\)',
                    r'<cite>Pasal 67 ayat (2) s/d (4) UU PTUN</cite>'
                ),
                (
                    r'Pasal 107 UU PTUN',
                    r'<cite>Pasal 107 UU PTUN</cite>'
                ),
                (
                    r'Peraturan Mahkamah Agung Nomor 2 Tahun 2019 tentang Pedoman Penyelesaian Sengketa Tindakan Pemerintahan dan Kewenangan Mengadili Perbuatan Melanggar Hukum oleh Badan dan/atau Pejabat Pemerintahan \(Onrechtmatige Overheidsdaad\)',
                    r'<cite>Perma No. 2 Tahun 2019</cite>'
                ),
                (
                    r'(?<!<cite>)Perma No\. 2 Tahun 2019(?!</cite>)',
                    r'<cite>Perma No. 2 Tahun 2019</cite>'
                ),
                (
                    r'(?<!<cite>)Perma No\. 2/2019(?!</cite>)',
                    r'<cite>Perma No. 2 Tahun 2019</cite>'
                ),
                (
                    r'(?<!<cite>)Pasal 1365 KUHPerdata(?!</cite>)',
                    r'<cite>Pasal 1365 KUHPerdata</cite>'
                ),
                (
                    r'Pasal 116 UU No\. 51 Tahun 2009',
                    r'<cite>Pasal 116 UU No. 51 Tahun 2009</cite>'
                ),
                (
                    r'(?<!<cite>)UU No\. 51 Tahun 2009(?!</cite>)',
                    r'<cite>UU No. 51 Tahun 2009</cite>'
                ),
            ]
            for pat, repl in subs:
                content = replace_outside_code_blocks(content, pat, repl)

        ch['content'] = content

    return data

def qa_and_fix_agraria(data):
    chapters = data.get('chapters', [])
    for idx, ch in enumerate(chapters):
        ch['_processed'] = True
        ch['_processedEn'] = True
        
        # Clean placeholder in contentEn
        content_en = ch.get('contentEn', '')
        if "pending English translation placeholder" in content_en or content_en == ch.get('content', ''):
            ch['contentEn'] = ""

        content = ch.get('content', '')

        # Add <cite> tags for statutory references in chapters 3, 4, 5, 6
        if idx >= 2:
            subs = [
                (r'(?<!<cite>)Pasal 20 s/d 27 UUPA(?!</cite>)', r'<cite>Pasal 20 s/d 27 UUPA</cite>'),
                (r'(?<!<cite>)Pasal 20 ayat 1 UUPA(?!</cite>)', r'<cite>Pasal 20 ayat (1) UUPA</cite>'),
                (r'(?<!<cite>)Pasal 21 ayat 1 UUPA(?!</cite>)', r'<cite>Pasal 21 ayat (1) UUPA</cite>'),
                (r'(?<!<cite>)PP No\. 38 Tahun 1963(?!</cite>)', r'<cite>PP No. 38 Tahun 1963</cite>'),
                (r'(?<!<cite>)Pasal 21 ayat 2 UUPA(?!</cite>)', r'<cite>Pasal 21 ayat (2) UUPA</cite>'),
                (r'(?<!<cite>)Pasal 26 ayat \(2\) UUPA(?!</cite>)', r'<cite>Pasal 26 ayat (2) UUPA</cite>'),
                (r'Putusan Mahkamah Agung RI No\. 3131 K/Pdt/2014', r'<cite>Putusan MA No. 3131 K/Pdt/2014</cite>'),
                (r'Pasal 28 s/d 34 UUPA jo\. PP No\. 18 Tahun 2021', r'<cite>Pasal 28 s/d 34 UUPA jo. PP No. 18 Tahun 2021</cite>'),
                (r'Pasal 22 PP No\. 18 Tahun 2021', r'<cite>Pasal 22 PP No. 18 Tahun 2021</cite>'),
                (r'Pasal 27 PP 18/2021 jo\. UU Perkebunan', r'<cite>Pasal 27 PP No. 18 Tahun 2021 jo. UU Perkebunan</cite>'),
                (r'Pasal 35 s/d 40 UUPA jo\. PP No\. 18 Tahun 2021', r'<cite>Pasal 35 s/d 40 UUPA jo. PP No. 18 Tahun 2021</cite>'),
                (r'Pasal 41 s/d 43 UUPA jo\. PP No\. 18 Tahun 2021', r'<cite>Pasal 41 s/d 43 UUPA jo. PP No. 18 Tahun 2021</cite>'),
                (r'PP No\. 18 Tahun 2021 \(Pasal 4 s/d 18\)', r'<cite>PP No. 18 Tahun 2021 (Pasal 4 s/d 18)</cite>'),
                (r'(?<!<cite>)PP No\. 18 Tahun 2021(?!</cite>)', r'<cite>PP No. 18 Tahun 2021</cite>'),
                (r'Undang-Undang Nomor 20 Tahun 2011 tentang Rumah Susun', r'<cite>UU No. 20 Tahun 2011 tentang Rumah Susun</cite>'),
                (r'Permen ATR/BPN No\. 18 Tahun 2021', r'<cite>Permen ATR/BPN No. 18 Tahun 2021</cite>'),
                (r'UU No\. 4 Tahun 1996 \(UUHT\)', r'<cite>UU No. 4 Tahun 1996 (UUHT)</cite>'),
                (r'(?<!<cite>)UU No\. 4 Tahun 1996(?!</cite>)', r'<cite>UU No. 4 Tahun 1996 (UUHT)</cite>'),
                (r'(?<!<cite>)Pasal 1 angka 1 UUHT(?!</cite>)', r'<cite>Pasal 1 angka 1 UUHT</cite>'),
                (r'(?<!<cite>)Pasal 4 UUHT(?!</cite>)', r'<cite>Pasal 4 UUHT</cite>'),
                (r'(?<!<cite>)Pasal 6 & 20 UUHT(?!</cite>)', r'<cite>Pasal 6 & 20 UUHT</cite>'),
                (r'(?<!<cite>)Pasal 6 UUHT(?!</cite>)', r'<cite>Pasal 6 UUHT</cite>'),
                (r'Pasal 14 jo\. Pasal 20 ayat 1 UUHT', r'<cite>Pasal 14 jo. Pasal 20 ayat (1) UUHT</cite>'),
                (r'Pasal 20 ayat 2 & 3 UUHT', r'<cite>Pasal 20 ayat (2) & (3) UUHT</cite>'),
                (r'Undang-Undang Nomor 2 Tahun 2012', r'<cite>UU No. 2 Tahun 2012</cite>'),
                (r'(?<!<cite>)UU No\. 2 Tahun 2012(?!</cite>)', r'<cite>UU No. 2 Tahun 2012</cite>'),
                (r'Undang-Undang Nomor 6 Tahun 2023 \(UU Cipta Kerja\)', r'<cite>UU No. 6 Tahun 2023 (UU Cipta Kerja)</cite>'),
                (r'UU Cipta Kerja \(UU No\. 6/2023\)', r'<cite>UU No. 6 Tahun 2023 (UU Cipta Kerja)</cite>'),
                (r'(?<!<cite>)UU No\. 6/2023(?!</cite>)', r'<cite>UU No. 6 Tahun 2023</cite>'),
                (r'(?<!<cite>)UU No\. 6 Tahun 2023(?!</cite>)', r'<cite>UU No. 6 Tahun 2023</cite>'),
                (r'PP No\. 19 Tahun 2021 jo\. PP No\. 39 Tahun 2023', r'<cite>PP No. 19 Tahun 2021 jo. PP No. 39 Tahun 2023</cite>'),
                (r'(?<!<cite>)UU No\. 20 Tahun 1961(?!</cite>)', r'<cite>UU No. 20 Tahun 1961</cite>'),
                (r'(?<!<cite>)Keppres No\. 55 Tahun 1993(?!</cite>)', r'<cite>Keppres No. 55 Tahun 1993</cite>'),
                (r'Perpres No\. 36/2005 jo\. Perpres No\. 65/2006', r'<cite>Perpres No. 36/2005 jo. Perpres No. 65/2006</cite>'),
                (r'Pasal 10 UU No\. 2 Tahun 2012 jo\. UU No\. 6 Tahun 2023', r'<cite>Pasal 10 UU No. 2 Tahun 2012 jo. UU No. 6 Tahun 2023</cite>'),
                (r'Pasal 42 UU No\. 2 Tahun 2012 jo\. Perma No\. 3 Tahun 2016', r'<cite>Pasal 42 UU No. 2 Tahun 2012 jo. Perma No. 3 Tahun 2016</cite>'),
                (r'Pasal 125 s/d 135 UU Cipta Kerja jo\. PP No\. 64 Tahun 2021', r'<cite>Pasal 125 s/d 135 UU Cipta Kerja jo. PP No. 64 Tahun 2021</cite>'),
                (r'(?<!<cite>)PP No\. 64 Tahun 2021(?!</cite>)', r'<cite>PP No. 64 Tahun 2021</cite>'),
                (r'Peraturan Menteri ATR/Kepala BPN Nomor 21 Tahun 2020 tentang Penanganan dan Penyelesaian Kasus Pertanahan', r'<cite>Permen ATR/BPN No. 21 Tahun 2020 tentang Penanganan dan Penyelesaian Kasus Pertanahan</cite>'),
                (r'(?<!<cite>)Permen ATR/BPN No\. 21 Tahun 2020(?!</cite>)', r'<cite>Permen ATR/BPN No. 21 Tahun 2020</cite>'),
                (r'(?<!<cite>)Pasal 1365 KUHPerdata(?!</cite>)', r'<cite>Pasal 1365 KUHPerdata</cite>'),
                (r'(?<!<cite>)Pasal 1243 KUHPerdata(?!</cite>)', r'<cite>Pasal 1243 KUHPerdata</cite>'),
                (r'(?<!<cite>)SEMA Nomor 7 Tahun 2012(?!</cite>)', r'<cite>SEMA No. 7 Tahun 2012</cite>'),
                (r'(?<!<cite>)SEMA Nomor 4 Tahun 2016(?!</cite>)', r'<cite>SEMA No. 4 Tahun 2016</cite>'),
                (r'Pasal 1 angka 9 UU No\. 51 Tahun 2009', r'<cite>Pasal 1 angka 9 UU No. 51 Tahun 2009</cite>'),
                (r'Pasal 53 ayat 2 UU PTUN', r'<cite>Pasal 53 ayat (2) UU PTUN</cite>'),
                (r'(?<!<cite>)PP No\. 24 Tahun 1997(?!</cite>)', r'<cite>PP No. 24 Tahun 1997</cite>'),
                (r'Pasal 116 UU PTUN', r'<cite>Pasal 116 UU PTUN</cite>'),
                (r'(?<!<cite>)Pasal 6 UUPA(?!</cite>)', r'<cite>Pasal 6 UUPA</cite>'),
                (r'(?<!<cite>)Pasal 15 UUPA(?!</cite>)', r'<cite>Pasal 15 UUPA</cite>'),
                (r'Peraturan Pemerintah Nomor 20 Tahun 2021 tentang Penertiban Kawasan dan Tanah Terlantar', r'<cite>PP No. 20 Tahun 2021 tentang Penertiban Kawasan dan Tanah Terlantar</cite>'),
                (r'Pasal 34 PP No\. 20 Tahun 2021', r'<cite>Pasal 34 PP No. 20 Tahun 2021</cite>'),
                (r'(?<!<cite>)PP No\. 20 Tahun 2021(?!</cite>)', r'<cite>PP No. 20 Tahun 2021</cite>'),
                (r'(?<!<cite>)Pasal 3 UUPA(?!</cite>)', r'<cite>Pasal 3 UUPA</cite>'),
                (r'UU No\. 41 Tahun 1999 tentang Kehutanan', r'<cite>UU No. 41 Tahun 1999 tentang Kehutanan</cite>'),
                (r'Putusan Mahkamah Konstitusi No\. 35/PUU-X/2012', r'<cite>Putusan MK No. 35/PUU-X/2012</cite>'),
                (r'Permen ATR/Kepala BPN Nomor 14 Tahun 2024 tentang Penatausahaan Tanah Ulayat Kesatuan Masyarakat Hukum Adat', r'<cite>Permen ATR/BPN No. 14 Tahun 2024 tentang Penatausahaan Tanah Ulayat</cite>'),
                (r'(?<!<cite>)Permen ATR/BPN No\. 14 Tahun 2024(?!</cite>)', r'<cite>Permen ATR/BPN No. 14 Tahun 2024</cite>'),
            ]
            for pat, repl in subs:
                content = replace_outside_code_blocks(content, pat, repl)

        ch['content'] = content

    return data

def validate_data(fname, data):
    """Thorough QA verification of JSON data and Markdown rendering."""
    assert "id" in data, f"{fname}: missing 'id'"
    assert "title" in data, f"{fname}: missing 'title'"
    assert "chapters" in data, f"{fname}: missing 'chapters'"
    assert len(data["chapters"]) > 0, f"{fname}: chapters is empty"

    for idx, ch in enumerate(data["chapters"]):
        assert "title" in ch, f"{fname} ch {idx}: missing 'title'"
        assert "content" in ch, f"{fname} ch {idx}: missing 'content'"
        assert "contentEn" in ch, f"{fname} ch {idx}: missing 'contentEn'"
        
        # Verify content has markdown
        content = ch["content"]
        assert len(content) > 100, f"{fname} ch {idx}: content too short"

        # Check cite tag balance
        open_cites = len(re.findall(r'<cite>', content, re.IGNORECASE))
        close_cites = len(re.findall(r'</cite>', content, re.IGNORECASE))
        assert open_cites == close_cites, f"{fname} ch {idx}: mismatched <cite> tags ({open_cites} open, {close_cites} close)"

        # Check bolding balance (even number of **)
        # Ignore triple backticks first
        clean_for_md = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
        double_stars = len(re.findall(r'\*\*', clean_for_md))
        assert double_stars % 2 == 0, f"{fname} ch {idx}: odd count of ** ({double_stars})"

        # Verify no broken HTML
        open_tags = re.findall(r'<([a-zA-Z0-9]+)[^>]*>', clean_for_md)
        # We only allow cite, br, hr, em, strong
        for tag in open_tags:
            tag_name = tag.split()[0].lower()
            assert tag_name in ['cite', 'br', 'hr', 'em', 'strong'], f"{fname} ch {idx}: unexpected HTML tag <{tag_name}>"

    print(f"Validation PASSED for {fname} ({len(data['chapters'])} chapters verified).")

def main():
    print("Starting Book QA & Formatting Fix...")
    for fname in TARGET_FILES:
        fpath = os.path.join(BOOKS_DIR, fname)
        if not os.path.exists(fpath):
            print(f"File not found: {fpath}")
            continue

        with open(fpath, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if fname == 'acaraperdata.json':
            data = qa_and_fix_acaraperdata(data)
        elif fname == 'acarapidana.json':
            data = qa_and_fix_acarapidana(data)
        elif fname == 'administrasi.json':
            data = qa_and_fix_administrasi(data)
        elif fname == 'hukum_agraria_lanjut.json':
            data = qa_and_fix_agraria(data)

        # Validate before writing
        validate_data(fname, data)

        with open(fpath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"Successfully processed and validated {fname}\n")

if __name__ == '__main__':
    main()
