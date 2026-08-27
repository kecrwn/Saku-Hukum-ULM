/** River Margin design system: the not-found view remains a quiet notebook detour with a direct route back to shULM. */
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
export default function NotFound() { const { isIndonesian } = useLanguage(); return <section className="not-found content-width"><p className="eyebrow">404</p><h1>{isIndonesian ? "Halaman ini belum ada di catatan." : "This page is not in the notes yet."}</h1><p>{isIndonesian ? "Kembali ke beranda untuk menemukan jalur studi yang tersedia." : "Return home to find the available study paths."}</p><Link href="/" className="primary-link">{isIndonesian ? "Kembali ke beranda" : "Back to home"}</Link></section>; }
