"use client";
/** River Margin design system: citations are compact marginalia links that make the underlying source explicit. */
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/site-data";
export function SourceLink({ href, label, className = "" }: { href: string; label: string; className?: string }) { const { language } = useLanguage(); return <a className={`source-link ${className}`} href={href} target="_blank" rel="noreferrer"><span>{translations[language].source}: {label}</span><ArrowUpRight size={14} /></a>; }
