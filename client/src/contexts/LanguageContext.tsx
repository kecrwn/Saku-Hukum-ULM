/** River Margin design system: the study guide defaults to Bahasa Indonesia and persists a deliberate bilingual reading mode. */
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type Language = "id" | "en";
type LanguageContextValue = { language: Language; toggleLanguage: () => void; isIndonesian: boolean };
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(() => window.localStorage.getItem("shulm-language") === "en" ? "en" : "id");
  useEffect(() => { window.localStorage.setItem("shulm-language", language); document.documentElement.lang = language === "id" ? "id" : "en"; }, [language]);
  const value = useMemo(() => ({ language, isIndonesian: language === "id", toggleLanguage: () => setLanguage((current) => current === "id" ? "en" : "id") }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error("useLanguage must be used within LanguageProvider"); return context; }
