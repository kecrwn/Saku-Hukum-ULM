import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFrame } from "@/components/SiteFrame";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Chatbot } from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saku Hukum ULM",
  description: "Panduan Studi Pribadi Fakultas Hukum ULM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <SiteFrame>
              {children}
            </SiteFrame>
            <Chatbot />
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
