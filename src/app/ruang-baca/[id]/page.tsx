import fs from "fs";
import path from "path";
import { bookKnowledgeBase } from "@/lib/books";
import BookReader from "@/components/BookReader";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const ALIASES: Record<string, string> = {
  "pengantar-ilmu-hukum": "pih",
  "pengantar_ilmu_hukum": "pih",
  "pengantar-hukum-indonesia": "phi",
  "pengantar_hukum_indonesia": "phi",
  "hukum-agraria-lanjut": "agraria_lanjut",
  "hukum_agraria_lanjut": "agraria_lanjut",
  "agraria-lanjut": "agraria_lanjut",
  "hukum-internasional-publik": "internasional_publik",
  "hukum_internasional_publik": "internasional_publik",
  "internasional-publik": "internasional_publik",
  "hukum-perikatan": "perikatan",
  "hukum_perikatan": "perikatan",
  "hukum-pidana-formil": "pidana_formil",
  "hukum_pidana_formil": "pidana_formil",
  "pidana-formil": "pidana_formil",
  "hukum-perdata-formil": "perdata_formil",
  "hukum_perdata_formil": "perdata_formil",
  "perdata-formil": "perdata_formil",
  "hukum-pembuktian": "hukum_pembuktian",
  "hukum-pidana-indonesia": "hukum_pidana_indonesia",
  "kejaksaan-ri": "kejaksaan_ri",
  "ilmu-negara": "ilmu_negara",
  "tata-negara": "tatanegara",
  "tata_negara": "tatanegara",
  "hukum-tata-negara": "tatanegara",
  "hukum_tata_negara": "tatanegara",
  "hukum-administrasi": "administrasi",
  "hukum_administrasi": "administrasi",
  "hukum-administrasi-negara": "administrasi",
  "acara-perdata": "acaraperdata",
  "hukum-acara-perdata": "acaraperdata",
  "hukum_acara_perdata": "acaraperdata",
  "acara-pidana": "acarapidana",
  "hukum-acara-pidana": "acarapidana",
  "hukum_acara_pidana": "acarapidana",
  "sistem-peradilan": "sistemperadilan",
  "sistem_peradilan": "sistemperadilan",
  "dasar-hukum-pidana": "pidana",
  "dasar_hukum_pidana": "pidana",
};

function findBook(rawId: string) {
  if (!rawId) return null;
  const decoded = decodeURIComponent(rawId).trim().toLowerCase();

  // 1. Direct match in static registry
  if (bookKnowledgeBase[rawId]) return { ...bookKnowledgeBase[rawId], id: rawId };
  if (bookKnowledgeBase[decoded]) return { ...bookKnowledgeBase[decoded], id: decoded };

  // 2. Alias match
  const mappedKey = ALIASES[decoded] || ALIASES[rawId];
  if (mappedKey && bookKnowledgeBase[mappedKey]) {
    return { ...bookKnowledgeBase[mappedKey], id: mappedKey };
  }

  // 3. Normalize hyphens and underscores
  const underKey = decoded.replace(/-/g, "_");
  if (bookKnowledgeBase[underKey]) return { ...bookKnowledgeBase[underKey], id: underKey };
  if (ALIASES[underKey] && bookKnowledgeBase[ALIASES[underKey]]) {
    const k = ALIASES[underKey];
    return { ...bookKnowledgeBase[k], id: k };
  }

  // 4. Handle stripped index suffix (e.g., 'pih-15' -> 'pih')
  const stripped = decoded.replace(/-\d+$/, "");
  if (stripped !== decoded) {
    if (bookKnowledgeBase[stripped]) return { ...bookKnowledgeBase[stripped], id: stripped };
    if (ALIASES[stripped] && bookKnowledgeBase[ALIASES[stripped]]) {
      const k = ALIASES[stripped];
      return { ...bookKnowledgeBase[k], id: k };
    }
  }

  // 5. Case-insensitive search through bookKnowledgeBase keys and internal ids
  for (const [key, book] of Object.entries(bookKnowledgeBase)) {
    if (key.toLowerCase() === decoded || (book?.id && String(book.id).toLowerCase() === decoded)) {
      return { ...book, id: key };
    }
  }

  // 6. Dynamic filesystem fallback for books and knowledge modules
  try {
    const candidates = [
      path.join(process.cwd(), "src/lib/books", `${decoded}.json`),
      path.join(process.cwd(), "src/lib/books", `${underKey}.json`),
      path.join(process.cwd(), "src/lib/knowledge", `${decoded}.json`),
      path.join(process.cwd(), "src/lib/knowledge", `${underKey}.json`)
    ];

    for (const p of candidates) {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, "utf8");
        const data = JSON.parse(raw);
        if (data.chapters && data.chapters.length > 0) {
          return { ...data, id: data.id || decoded };
        }
        if (data.sections && data.sections.length > 0) {
          const chapters = data.sections.map((s: any) => ({
            title: s.headingId || s.headingEn || "Bab",
            titleEn: s.headingEn || s.headingId,
            content: s.contentId || s.contentEn || "",
            contentEn: s.contentEn || s.contentId || ""
          }));
          return {
            ...data,
            id: data.id || decoded,
            title: data.titleId || data.title || data.titleEn || "Buku Hukum",
            titleEn: data.titleEn || data.titleId || data.title,
            chapters
          };
        }
      }
    }
  } catch (e) {
    console.error("Failed to read book fallback:", e);
  }

  return null;
}

export function generateStaticParams() {
  const ids = new Set<string>(Object.keys(bookKnowledgeBase));
  Object.keys(ALIASES).forEach((alias) => ids.add(alias));
  return Array.from(ids).map((id) => ({
    id: id,
  }));
}

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const book = findBook(resolvedParams?.id || "");
  if (!book) return { title: "Buku Tidak Ditemukan | Ruang Baca Saku Hukum ULM" };
  
  return {
    title: `${book.title} | Ruang Baca Saku Hukum ULM`,
    description: book.description || `Membaca ${book.title} karya ${book.author || "Fakultas Hukum ULM"}`
  };
}

export default async function BookPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const book = findBook(resolvedParams?.id || "");
  
  if (!book) {
    notFound();
  }

  // Ensure mandatory reader attributes are populated
  const bookWithId = {
    ...book,
    id: book.id || resolvedParams.id,
    coverColor: book.coverColor || "#1b4d3e",
    author: book.author || "Tim Redaksi Saku Hukum ULM",
    title: book.title || book.titleId || "Buku Hukum",
    chapters: book.chapters || []
  };

  return <BookReader book={bookWithId} />;
}
