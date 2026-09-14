"use client";
import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
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
    
    const routes = copy.nav.filter(([label]) => label.toLowerCase().includes(lowerQuery));
    
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
      <button onClick={() => setOpen(true)} className="nav-link flex items-center gap-2" aria-label={isIndonesian ? "Cari" : "Search"}>
        <Search size={15} strokeWidth={1.8} />
        <span className="hidden sm:inline">{isIndonesian ? "Cari (⌘K)" : "Search (⌘K)"}</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder={isIndonesian ? "Cari halaman atau mata kuliah..." : "Search pages or courses..."} 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {debouncedQuery && searchResults.routes.length === 0 && searchResults.courses.length === 0 && (
            <CommandEmpty>{isIndonesian ? "Tidak ada hasil ditemukan." : "No results found."}</CommandEmpty>
          )}
          
          {searchResults.routes.length > 0 && (
            <CommandGroup heading={isIndonesian ? "Halaman" : "Pages"}>
              {searchResults.routes.map(([label, href]) => (
                <CommandItem key={href} value={label} onSelect={() => onSelect(href)}>
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {searchResults.courses.length > 0 && (
            <CommandGroup heading={isIndonesian ? "Mata Kuliah" : "Courses"}>
              {searchResults.courses.map((course) => (
                <CommandItem key={course.code} value={course[language]} onSelect={() => onSelect("/kurikulum")}>
                  <span className="font-medium mr-2">{course.code}</span>
                  {course[language]}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
