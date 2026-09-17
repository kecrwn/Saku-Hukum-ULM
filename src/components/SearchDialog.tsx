"use client";
import { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  Home, 
  Building2, 
  GraduationCap, 
  Compass, 
  Users, 
  Sparkles, 
  MessageSquareQuote, 
  Library, 
  BookOpen, 
  Briefcase, 
  ExternalLink,
  ArrowRight,
  type LucideIcon
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, criminalRequiredCourses, criminalElectiveCourses } from "@/lib/site-data";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

interface PageMeta {
  index: string;
  icon: LucideIcon;
  tag: { id: string; en: string };
  desc: { id: string; en: string };
}

const pageMetadata: Record<string, PageMeta> = {
  "/": {
    index: "01",
    icon: Home,
    tag: { id: "Beranda", en: "Home" },
    desc: {
      id: "Panduan studi, ilustrasi editorial & ringkasan pokok",
      en: "Study guide, editorial illustrations & core summary"
    }
  },
  "/tentang": {
    index: "02",
    icon: Building2,
    tag: { id: "Fakultas", en: "Faculty" },
    desc: {
      id: "Profil kampus, akreditasi Unggul & sejarah FH ULM",
      en: "Campus profile, Unggul accreditation & faculty history"
    }
  },
  "/kurikulum": {
    index: "03",
    icon: GraduationCap,
    tag: { id: "Akademik", en: "Curriculum" },
    desc: {
      id: "Distribusi 144 SKS, mata kuliah wajib & peminatan",
      en: "144 credits distribution, core & elective courses"
    }
  },
  "/fasilitas": {
    index: "04",
    icon: Compass,
    tag: { id: "Fasilitas", en: "Facilities" },
    desc: {
      id: "Ruang peradilan semu, laboratorium hukum & sarana",
      en: "Moot court hall, legal lab & campus facilities"
    }
  },
  "/dosen": {
    index: "05",
    icon: Users,
    tag: { id: "Pendidik", en: "Staff" },
    desc: {
      id: "Pimpinan fakultas & profil riset bagian hukum pidana",
      en: "Faculty leadership & criminal law research focus"
    }
  },
  "/kemahasiswaan": {
    index: "06",
    icon: Sparkles,
    tag: { id: "Aktivitas", en: "Students" },
    desc: {
      id: "BEM, DPM, peradilan semu & Unit Kegiatan Mahasiswa",
      en: "Student council, DPM & student activity units"
    }
  },
  "/perspektif": {
    index: "07",
    icon: MessageSquareQuote,
    tag: { id: "Ulasan", en: "Reviews" },
    desc: {
      id: "Catatan kritis, suara mahasiswa & ulasan terverifikasi",
      en: "Critical notes, student voice & verified reviews"
    }
  },
  "/pustaka": {
    index: "08",
    icon: Library,
    tag: { id: "Pustaka", en: "Library" },
    desc: {
      id: "Basis data istilah hukum, asas & undang-undang",
      en: "Legal terms, legal maxims & statutory database"
    }
  },
  "/ruang-baca": {
    index: "09",
    icon: BookOpen,
    tag: { id: "Materi", en: "Reading" },
    desc: {
      id: "Buku teks digital, modul ajar & referensi pidana",
      en: "Digital textbooks, course modules & materials"
    }
  },
  "/karier": {
    index: "10",
    icon: Briefcase,
    tag: { id: "Karier", en: "Career" },
    desc: {
      id: "Peta jalan profesi hakim, jaksa, advokat & notaris",
      en: "Career roadmap for judges, prosecutors, advocates"
    }
  },
  "/tautan": {
    index: "11",
    icon: ExternalLink,
    tag: { id: "Direktori", en: "Links" },
    desc: {
      id: "Direktori portal SIMARI, jurnal & tautan resmi ULM",
      en: "SIMARI portals, journals & official link directory"
    }
  }
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { language, isIndonesian } = useLanguage();
  const router = useRouter();
  const copy = translations[language];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Build searchable index based on active language
  const searchResults = useMemo(() => {
    if (!debouncedQuery) return { routes: copy.nav, courses: [] }; // Show all routes by default if empty
    
    const lowerQuery = debouncedQuery.toLowerCase();
    
    const routes = copy.nav.filter(([label, href]) => {
      const meta = pageMetadata[href];
      const descMatch = meta && (meta.desc.id.toLowerCase().includes(lowerQuery) || meta.desc.en.toLowerCase().includes(lowerQuery));
      const tagMatch = meta && (meta.tag.id.toLowerCase().includes(lowerQuery) || meta.tag.en.toLowerCase().includes(lowerQuery));
      return label.toLowerCase().includes(lowerQuery) || descMatch || tagMatch;
    });
    
    const courses = [...criminalRequiredCourses, ...criminalElectiveCourses].filter(
      course => course[language].toLowerCase().includes(lowerQuery) || course.code.toLowerCase().includes(lowerQuery)
    );

    return { routes, courses };
  }, [debouncedQuery, language, copy.nav]);

  const onSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="nav-link flex items-center gap-2 cursor-pointer" 
        aria-label={isIndonesian ? "Cari" : "Search"}
      >
        <Search size={15} strokeWidth={1.8} />
        <span className="hidden md:inline">{isIndonesian ? "Cari..." : "Search..."}</span>
        <kbd className="hidden lg:inline-flex items-center text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[rgba(23,62,68,0.06)] text-[var(--muted)] border border-[var(--line)] ml-0.5">
          ⌘K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder={isIndonesian ? "Cari halaman, topik, atau mata kuliah..." : "Search pages, topics, or courses..."} 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {debouncedQuery && searchResults.routes.length === 0 && searchResults.courses.length === 0 && (
            <CommandEmpty>
              <div className="py-8 text-center flex flex-col items-center justify-center gap-2.5">
                <div className="size-12 rounded-2xl bg-[rgba(23,62,68,0.05)] flex items-center justify-center text-[var(--muted)]">
                  <Search size={22} className="opacity-60" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[var(--ink-deep)]">
                    {isIndonesian ? "Tidak ada hasil ditemukan" : "No results found"}
                  </p>
                  <p className="text-xs text-[var(--muted)] max-w-[280px] mt-1">
                    {isIndonesian 
                      ? `Tidak ada halaman atau mata kuliah yang cocok dengan "${debouncedQuery}".` 
                      : `No pages or courses matched "${debouncedQuery}".`}
                  </p>
                </div>
              </div>
            </CommandEmpty>
          )}
          
          {searchResults.routes.length > 0 && (
            <CommandGroup heading={isIndonesian ? "Halaman Panduan" : "Guide Pages"}>
              {searchResults.routes.map(([label, href]) => {
                const meta = pageMetadata[href] || {
                  index: "•",
                  icon: Compass,
                  tag: { id: "Halaman", en: "Page" },
                  desc: { id: "Navigasi halaman", en: "Page navigation" }
                };
                const IconComponent = meta.icon;
                const tagText = isIndonesian ? meta.tag.id : meta.tag.en;
                const descText = isIndonesian ? meta.desc.id : meta.desc.en;

                return (
                  <CommandItem 
                    key={href} 
                    value={`${label} ${descText} ${tagText} ${meta.index}`} 
                    onSelect={() => onSelect(href)}
                    className="group relative flex items-center justify-between gap-3 p-2.5 sm:p-3 my-1 rounded-xl transition-all cursor-pointer hover:bg-[rgba(23,62,68,0.06)] data-[selected=true]:bg-[rgba(178,77,57,0.08)] border border-transparent hover:border-[rgba(23,62,68,0.08)] data-[selected=true]:border-[rgba(178,77,57,0.22)]"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="size-9 sm:size-10 rounded-xl bg-[rgba(23,62,68,0.06)] text-[var(--ink-deep)] group-hover:bg-[var(--clay)] group-hover:text-white group-data-[selected=true]:bg-[var(--clay)] group-data-[selected=true]:text-white flex items-center justify-center shrink-0 transition-all duration-200 shadow-2xs">
                        <IconComponent size={18} strokeWidth={2} />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-[var(--ink-deep)] group-hover:text-[var(--clay)] group-data-[selected=true]:text-[var(--clay)] transition-colors">
                            {label}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[rgba(23,62,68,0.06)] text-[var(--muted)] group-hover:bg-[rgba(178,77,57,0.12)] group-hover:text-[var(--clay)] group-data-[selected=true]:bg-[rgba(178,77,57,0.12)] group-data-[selected=true]:text-[var(--clay)] transition-colors">
                            {tagText}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--muted)] truncate mt-0.5 leading-normal">
                          {descText}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono font-bold text-[var(--clay)] opacity-60 group-hover:opacity-100 group-data-[selected=true]:opacity-100 transition-opacity">
                        {meta.index}
                      </span>
                      <ArrowRight size={14} className="text-[var(--muted)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--clay)] group-hover:translate-x-0.5 group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-[var(--clay)] group-data-[selected=true]:translate-x-0.5 transition-all" />
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {searchResults.courses.length > 0 && (
            <CommandGroup heading={isIndonesian ? "Mata Kuliah Kurikulum" : "Curriculum Courses"}>
              {searchResults.courses.map((course) => (
                <CommandItem 
                  key={course.code} 
                  value={`${course.code} ${course[language]}`} 
                  onSelect={() => onSelect("/kurikulum")}
                  className="group relative flex items-center justify-between gap-3 p-2.5 sm:p-3 my-1 rounded-xl transition-all cursor-pointer hover:bg-[rgba(23,62,68,0.06)] data-[selected=true]:bg-[rgba(178,77,57,0.08)] border border-transparent hover:border-[rgba(23,62,68,0.08)] data-[selected=true]:border-[rgba(178,77,57,0.22)]"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="size-9 rounded-xl bg-[rgba(178,77,57,0.08)] text-[var(--clay)] group-hover:bg-[var(--clay)] group-hover:text-white group-data-[selected=true]:bg-[var(--clay)] group-data-[selected=true]:text-white flex items-center justify-center shrink-0 transition-all duration-200">
                      <GraduationCap size={18} strokeWidth={2} />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-[rgba(178,77,57,0.12)] text-[var(--clay)]">
                          {course.code}
                        </span>
                        <span className="font-semibold text-sm text-[var(--ink-deep)] group-hover:text-[var(--clay)] group-data-[selected=true]:text-[var(--clay)] truncate transition-colors">
                          {course[language]}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--muted)] mt-0.5">
                        {course.sks} SKS · {isIndonesian ? "Kurikulum 2020 FH ULM" : "FH ULM Curriculum 2020"}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[var(--muted)] opacity-30 group-hover:opacity-100 group-hover:text-[var(--clay)] group-hover:translate-x-0.5 group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-[var(--clay)] transition-all shrink-0" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>

        <div className="flex items-center justify-between border-t border-[var(--line)] px-4 py-2.5 text-[11px] text-[var(--muted)] bg-[rgba(247,242,233,0.92)] select-none shrink-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--line)] bg-white/70 px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">↑↓</kbd>
              <span>{isIndonesian ? "Navigasi" : "Navigate"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-[var(--line)] bg-white/70 px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">↵</kbd>
              <span>{isIndonesian ? "Buka" : "Open"}</span>
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-[var(--line)] bg-white/70 px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">Esc</kbd>
            <span>{isIndonesian ? "Tutup" : "Close"}</span>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
