"use client";
/** River Margin design system: persistent shULM navigation behaves like a marked legal notebook, with a source-aware footer. */
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { type PropsWithChildren, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { externalLinks, imagery, translations } from "@/lib/site-data";
import { SearchDialog } from "./SearchDialog";
import { Chatbot } from "./Chatbot";

function Wordmark() { return <Link href="/" className="wordmark" aria-label="Saku Hukum ULM — kembali ke beranda"><span>sh</span><strong>ULM</strong></Link>; }

export function SiteFrame({ children }: PropsWithChildren) {
  const location = usePathname(); 
  const { language, toggleLanguage, isIndonesian } = useLanguage(); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const copy = translations[language]; 
  const navItems = copy.nav as readonly (readonly [string, string])[];
  return <div className="site-frame"><header className={`site-header ${headerVisible ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 ease-in-out`}><div className="header-inner"><Wordmark /><nav className="desktop-nav" aria-label={isIndonesian ? "Navigasi utama" : "Main navigation"}>{navItems.map(([label, href]) => <Link key={href} href={href} className={location === href ? "nav-link is-active" : "nav-link"}>{label}</Link>)}</nav><div className="header-actions"><SearchDialog /><button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={copy.switchLanguage}><Languages size={15} strokeWidth={1.8} /><span>{language === "id" ? "EN" : "ID"}</span></button><button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? copy.closeMenu : copy.openMenu} aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={22} />}</button></div></div>{menuOpen && <div className="mobile-nav-wrap"><nav className="mobile-nav" aria-label={isIndonesian ? "Navigasi utama" : "Main navigation"}>{navItems.map(([label, href], index) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={location === href ? "mobile-nav-link is-active" : "mobile-nav-link"}><span className="nav-index">0{index + 1}</span>{label}</Link>)}        </nav>
      </div>
    )}
  </header>
  <main>{children}</main>
  <footer className="site-footer">
    <div className="footer-grid">
      <div className="footer-brand-col">
        <Link href="/" className="footer-wordmark"><span>Saku</span> <strong>Hukum</strong> <span className="wordmark-ulm">ULM</span></Link>
        <p>{copy.footerNote}</p>
        <p className="footer-disclaimer">{copy.personalNotice}</p>
      </div>
      <div className="footer-nav-col">
        <p className="footer-heading">{isIndonesian ? "Navigasi" : "Navigation"}</p>
        {navItems.slice(0, 5).map(([label, href]) => <Link key={href} href={href} className="footer-nav-link">{label}</Link>)}
      </div>
      <div className="footer-nav-col">
        <p className="footer-heading">{isIndonesian ? "Lainnya" : "More"}</p>
        {navItems.slice(5).map(([label, href]) => <Link key={href} href={href} className="footer-nav-link">{label}</Link>)}
      </div>
      <div className="footer-nav-col">
        <p className="footer-heading">{isIndonesian ? "Tautan Resmi" : "Official Links"}</p>
        <a href={externalLinks.faculty} target="_blank" rel="noopener noreferrer" className="footer-nav-link">FH ULM <ArrowUpRight size={12} /></a>
        <a href={externalLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-nav-link">Instagram <ArrowUpRight size={12} /></a>
        <a href={externalLinks.repository} target="_blank" rel="noopener noreferrer" className="footer-nav-link">GitHub <ArrowUpRight size={12} /></a>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Saku Hukum ULM · v2.0</p>
      <button type="button" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label={isIndonesian ? 'Kembali ke atas' : 'Back to top'}>
        <ArrowUpRight size={12} />{isIndonesian ? 'Ke atas' : 'Top'}
      </button>
    </div>
  </footer>
  <Chatbot />
</div>;
}
