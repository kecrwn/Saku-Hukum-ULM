#!/usr/bin/env python3
import json
import os
import re

BOOKS = [
    "hukum_pidana_formil.json",
    "hukum_pidana_indonesia.json",
    "ilmu_negara.json",
    "kejaksaan_ri.json"
]

BOOKS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "lib", "books")

def verify_book(filename):
    filepath = os.path.join(BOOKS_DIR, filename)
    print("=" * 60)
    print(f"VERIFYING: {filename}")
    
    with open(filepath, "r", encoding="utf-8") as f:
        try:
            data = json.load(f)
            print("✓ JSON is valid")
        except json.JSONDecodeError as e:
            print(f"✗ JSON ERROR: {e}")
            return False

    # Check root metadata
    assert "id" in data, "Missing id"
    assert "title" in data, "Missing title"
    assert "chapters" in data, "Missing chapters"
    print(f"✓ Root metadata present (id: {data['id']}, title: {data['title']}, titleEn: {data.get('titleEn', 'N/A')})")

    all_passed = True

    for i, ch in enumerate(data["chapters"]):
        title = ch.get("title", f"Chapter {i+1}")
        titleEn = ch.get("titleEn", "N/A")
        print(f"\n  [Chapter {i+1}] {title} | EN: {titleEn}")

        # Check temporary metadata
        for temp_key in ["_processed", "_processedEn", "_processedId"]:
            if temp_key in ch:
                print(f"  ✗ Found unwanted temp key: {temp_key}")
                all_passed = False

        for lang, content_key in [("ID", "content"), ("EN", "contentEn")]:
            text = ch.get(content_key, "")
            if not text:
                print(f"  ✗ Missing {content_key}")
                all_passed = False
                continue

            # Check <cite> tags
            open_cites = len(re.findall(r"<cite>", text))
            close_cites = len(re.findall(r"</cite>", text))
            if open_cites != close_cites:
                print(f"  ✗ [{lang}] Mismatched <cite> tags: {open_cites} open vs {close_cites} close")
                all_passed = False
            else:
                print(f"  ✓ [{lang}] <cite> tags balanced: {open_cites} pairs found")

            # Check for unclosed other HTML tags
            other_tags = re.findall(r"<([a-zA-Z0-9]+)[^>]*>", text)
            for t in other_tags:
                if t.lower() not in ["cite", "br", "hr", "img"]:
                    print(f"  ! [{lang}] Non-standard HTML tag: <{t}>")

            # Check bolding pairs **
            # Count double asterisks
            double_ast = text.count("**")
            if double_ast % 2 != 0:
                print(f"  ✗ [{lang}] Unbalanced bolding (**) count: {double_ast}")
                all_passed = False
            else:
                print(f"  ✓ [{lang}] Bolding (**) balanced: {double_ast // 2} pairs found")

            # Check quotes (> )
            has_quote = bool(re.search(r"^> ", text, re.MULTILINE))
            if not has_quote:
                print(f"  ! [{lang}] Warning: No blockquote (> ) found")
            else:
                print(f"  ✓ [{lang}] Blockquote (> ) found")

            # Check lists (- or 1. )
            has_list = bool(re.search(r"^(\s*[-*]|\s*\d+\.) ", text, re.MULTILINE))
            if not has_list:
                print(f"  ! [{lang}] Warning: No list items found")
            else:
                print(f"  ✓ [{lang}] List items found")

    return all_passed

if __name__ == "__main__":
    overall = True
    for b in BOOKS:
        res = verify_book(b)
        if not res:
            overall = False
    print("\n" + "=" * 60)
    if overall:
        print("🎉 ALL 4 BOOKS PASSED STRICT QA RENDERING VERIFICATION!")
    else:
        print("❌ SOME CHECKS FAILED!")
