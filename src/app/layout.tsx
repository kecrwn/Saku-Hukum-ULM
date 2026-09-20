import type { Metadata } from "next";
import { Inter, Outfit, Caveat, Fira_Code, Manrope, DM_Serif_Display, Lora } from "next/font/google";
import "../index.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700", "800"], variable: "--font-manrope" });
const dmSerif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-dm-serif" });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-lora" });
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFrame } from "@/components/SiteFrame";
import { LanguageProvider } from "@/contexts/LanguageContext";


const inter = Inter({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Saku Hukum ULM | Panduan Studi Pribadi Fakultas Hukum ULM",
  manifest: "/manifest.json",
  description: "Buku Saku Digital Mahasiswa Fakultas Hukum Universitas Lambung Mangkurat. Informasi akademik, kurikulum, fasilitas, dan panduan studi lengkap untuk mahasiswa FH ULM.",
  keywords: ["Saku Hukum ULM", "Buku Saku Hukum ULM", "Fakultas Hukum ULM", "Universitas Lambung Mangkurat", "Mahasiswa Hukum ULM", "Panduan Studi Hukum ULM", "Kurikulum Hukum ULM"],
  authors: [{ name: "Fakultas Hukum Universitas Lambung Mangkurat" }],
  creator: "Fakultas Hukum ULM",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sakuhukum.ulm.ac.id",
    title: "Saku Hukum ULM | Panduan Studi Pribadi",
    description: "Buku Saku Digital Mahasiswa Fakultas Hukum Universitas Lambung Mangkurat. Informasi akademik, kurikulum, dan panduan studi lengkap.",
    siteName: "Saku Hukum ULM",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saku Hukum ULM | Panduan Studi Pribadi",
    description: "Buku Saku Digital Mahasiswa Fakultas Hukum Universitas Lambung Mangkurat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} ${outfit.variable} ${caveat.variable} ${firaCode.variable} ${manrope.variable} ${dmSerif.variable} ${lora.variable}`}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <SiteFrame>
              {children}
            </SiteFrame>

          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
