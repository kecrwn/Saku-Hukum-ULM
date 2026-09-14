/** River Margin design system: each route starts as a labeled document page, with a clear return path and marginal source status. */
import { ChevronRight } from "lucide-react";
import Link   from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/site-data";
export function PageIntro({ label, title, summary, sourceCount }: { label: string; title: string; summary: string; sourceCount?: string }) { const { language, isIndonesian } = useLanguage(); const copy = translations[language]; return <section className="page-intro content-width"><div className="breadcrumb"><Link href="/">{isIndonesian ? "Beranda" : "Home"}</Link><ChevronRight size={14} /><span>{label}</span></div><div className="page-intro-grid"><div><p className="eyebrow">{label}</p><h1>{title}</h1><p className="intro-summary">{summary}</p></div><aside className="page-status"><span className="status-dot" /><span>{sourceCount ?? copy.updated}</span></aside></div><div className="river-rule" /></section>; }
