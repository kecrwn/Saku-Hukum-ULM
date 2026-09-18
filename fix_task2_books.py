#!/usr/bin/env python3
"""
QA and Content Rendering Fix Script for Task 2 Books:
- hukum_internasional_publik.json
- hukum_pembuktian.json
- hukum_perdata_formil.json
- hukum_perikatan.json
"""

import json
import re
import os

BASE_DIR = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM/src/lib/books"

def wrap_citations(text: str) -> str:
    """
    Carefully wraps legal citations in <cite>...</cite> without double wrapping existing tags.
    """
    if not text:
        return text

    # Pattern for articles, laws, codes, and procedural rules
    # We protect existing <cite>...</cite> first
    cite_placeholders = []
    def save_cite(m):
        cite_placeholders.append(m.group(0))
        return f"__CITE_PH_{len(cite_placeholders)-1}__"
    
    # Save code blocks and tables to avoid touching them
    code_placeholders = []
    def save_code(m):
        code_placeholders.append(m.group(0))
        return f"__CODE_PH_{len(code_placeholders)-1}__"

    text = re.sub(r"```[\s\S]*?```", save_code, text)
    text = re.sub(r"<cite[\s\S]*?</cite>", save_cite, text)

    # 1. Pasal citations: e.g. Pasal 1320 ayat (1) KUHPerdata, Pasal 1338 KUHPerdata, Pasal 1865 hingga 1993 KUHPerdata, Pasal 163 HIR / Pasal 283 RBg / Pasal 1865 KUHPerdata
    pasal_regexes = [
        r'\b(?:Pasal|Pasal-pasal)\s+\d+(?:\s*(?:ayat\s*\(\d+\)|[a-z]\b))?(?:\s*(?:jo\.|dan|s/d|sampai|hingga|–|-)\s*(?:Pasal\s*)?\d+(?:\s*(?:ayat\s*\(\d+\)|[a-z]\b))?)*(?:\s+(?:KUHPerdata|KUHP|KUHAP|HIR|RBg|Rv|UUPA|UUPK|UU\s+MA|UU\s+ITE|BW))?\b',
        r'\b(?:UU|Undang-Undang)\s+(?:No\.|Nomor)?\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+(?:UU|Undang-Undang)\s+(?:No\.|Nomor)?\s*\d+\s+Tahun\s+\d+)*(?:\s+tentang\s+[A-Za-z\s]+)?\b',
        r'\bPERMA\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+PERMA\s+No\.\s*\d+\s+Tahun\s+\d+)?\b',
        r'\bSEMA\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+SEMA\s+No\.\s*\d+\s+Tahun\s+\d+)?\b',
        r'\bUUD\s+(?:NRI\s+)?1945\b',
    ]

    # Specific common citations to wrap cleanly
    specific_patterns = [
        (r'\b(Pasal\s+\d+(?:\s*ayat\s*\(\d+\))?(?:\s*(?:jo\.|dan|s/d|sampai|hingga|–|-)\s*(?:Pasal\s*)?\d+(?:\s*ayat\s*\(\d+\))?)*(?:\s+(?:KUHPerdata|KUHP|KUHAP|HIR|RBg|Rv|BW))?)\b', r'<cite>\1</cite>'),
        (r'\b(PERMA\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+PERMA\s+No\.\s*\d+\s+Tahun\s+\d+)?)\b', r'<cite>\1</cite>'),
        (r'\b(SEMA\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+SEMA\s+No\.\s*\d+\s+Tahun\s+\d+)?)\b', r'<cite>\1</cite>'),
        (r'\b(UU\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+UU\s+No\.\s*\d+\s+Tahun\s+\d+)*)\b', r'<cite>\1</cite>'),
        (r'\b(UU\s+ITE\s+No\.\s*\d+\s+Tahun\s+\d+(?:\s+jo\.\s+UU\s+No\.\s*\d+\s+Tahun\s+\d+)*)\b', r'<cite>\1</cite>'),
        (r'\b(UU\s+Perlindungan\s+Konsumen\s+No\.\s*\d+/\d+)\b', r'<cite>\1</cite>'),
        (r'\b(Pasal\s+24\s+UUD\s+NRI\s+1945)\b', r'<cite>\1</cite>'),
        (r'\b(UUD\s+1945)\b', r'<cite>\1</cite>'),
    ]

    for pattern, repl in specific_patterns:
        text = re.sub(pattern, repl, text)

    # Restore cite tags
    for idx, orig in enumerate(cite_placeholders):
        text = text.replace(f"__CITE_PH_{idx}__", orig)

    # Restore code blocks
    for idx, orig in enumerate(code_placeholders):
        text = text.replace(f"__CODE_PH_{idx}__", orig)

    # Clean any nested cite tags if any occurred
    text = re.sub(r'<cite>\s*<cite>', '<cite>', text)
    text = re.sub(r'</cite>\s*</cite>', '</cite>', text)

    return text

def fix_hukum_internasional_publik():
    path = os.path.join(BASE_DIR, "hukum_internasional_publik.json")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["titleEn"] = "Public International Law"

    ch_titles_en = [
        "Chapter 1: Subjects of International Law",
        "Chapter 2: Sources of International Law",
        "Chapter 3: Law of Treaties",
        "Chapter 4: Territorial Sovereignty and the Law of the Sea",
        "Chapter 5: Jurisdiction and Diplomatic Immunity",
        "Chapter 6: Dispute Settlement and Humanitarian Law"
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        if idx < len(ch_titles_en):
            ch["titleEn"] = ch_titles_en[idx]
        if "_processed" in ch:
            del ch["_processed"]
        if "_processedEn" in ch:
            del ch["_processedEn"]

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Fixed hukum_internasional_publik.json")

def fix_hukum_pembuktian():
    path = os.path.join(BASE_DIR, "hukum_pembuktian.json")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    for idx, ch in enumerate(data.get("chapters", [])):
        if "_processed" in ch:
            del ch["_processed"]
        if "_processedEn" in ch:
            del ch["_processedEn"]
        
        # In Bab 2, format the last sentence into a quote
        if idx == 1:
            content = ch.get("content", "")
            if "Hakim dilarang keras menggunakan alat bukti selain dari lima jenis di atas." in content and not "> **Prinsip Penting**:" in content:
                ch["content"] = content.replace(
                    "Hakim dilarang keras menggunakan alat bukti selain dari lima jenis di atas.",
                    "> **Prinsip Penting**: Hakim dilarang keras menggunakan alat bukti selain dari lima jenis alat bukti yang sah di atas."
                )
            content_en = ch.get("contentEn", "")
            if "Judges are strictly forbidden from using evidence other than these five types." in content_en and not "> **Important Principle**:" in content_en:
                ch["contentEn"] = content_en.replace(
                    "Judges are strictly forbidden from using evidence other than these five types.",
                    "> **Important Principle**: Judges are strictly forbidden from using evidence other than the five valid types of evidence listed above."
                )

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Fixed hukum_pembuktian.json")

def fix_hukum_perdata_formil():
    path = os.path.join(BASE_DIR, "hukum_perdata_formil.json")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["titleEn"] = "Civil Procedure Law"

    ch_titles_en = [
        "Chapter 1: Lawsuits and Petitions",
        "Chapter 2: Court Competence and Electronic Filing (e-Court)",
        "Chapter 3: Court Mediation and Trial Stages",
        "Chapter 4: Evidence System and Civil Evidence",
        "Chapter 5: Prejudgment Attachment and Revindicatory Seizure",
        "Chapter 6: Court Judgments and Civil Execution",
        "Chapter 7: Legal Remedies: Appeal, Cassation, and Judicial Review"
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        if idx < len(ch_titles_en):
            ch["titleEn"] = ch_titles_en[idx]
        if "_processed" in ch:
            del ch["_processed"]
        if "_processedEn" in ch:
            del ch["_processedEn"]

        # Wrap citations in content
        if "content" in ch:
            ch["content"] = wrap_citations(ch["content"])
        
        # Reset placeholder contentEn to "" to properly display reader translation banner
        if "contentEn" in ch and "pending English translation placeholder" in ch["contentEn"]:
            ch["contentEn"] = ""

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Fixed hukum_perdata_formil.json")

def fix_hukum_perikatan():
    path = os.path.join(BASE_DIR, "hukum_perikatan.json")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    data["titleEn"] = "Law of Obligations (Book III Civil Code)"

    ch_titles_en = [
        "Chapter 1: Freedom of Contract and the Foundations of Obligation Law",
        "Chapter 2: Requirements for Contract Validity and Defect of Will (Article 1320 Civil Code)",
        "Chapter 3: Breach of Contract, Notice, Damages, and Force Majeure",
        "Chapter 4: Obligations Arising by Law and Torts (Article 1365 Civil Code)",
        "Chapter 5: Specific Obligations and Extinction of Obligations (Article 1381 Civil Code)",
        "Chapter 6: Principal Nominate Contracts and Modern Business Dynamics"
    ]

    for idx, ch in enumerate(data.get("chapters", [])):
        if idx < len(ch_titles_en):
            ch["titleEn"] = ch_titles_en[idx]
        if "_processed" in ch:
            del ch["_processed"]
        if "_processedEn" in ch:
            del ch["_processedEn"]

        # Wrap citations in content
        if "content" in ch:
            ch["content"] = wrap_citations(ch["content"])
        
        # Reset placeholder contentEn to "" to properly display reader translation banner
        if "contentEn" in ch and "pending English translation placeholder" in ch["contentEn"]:
            ch["contentEn"] = ""

    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Fixed hukum_perikatan.json")

if __name__ == "__main__":
    fix_hukum_internasional_publik()
    fix_hukum_pembuktian()
    fix_hukum_perdata_formil()
    fix_hukum_perikatan()
    print("All 4 book JSON files QA and formatting fixes completed successfully.")
