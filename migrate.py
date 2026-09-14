import os
import shutil
import re

base_dir = "/data/data/com.termux/files/home/storage/downloads/SakuHukumULM"
client_src = os.path.join(base_dir, "client/src")
next_src = os.path.join(base_dir, "src")

# Create src directory and next structure
os.makedirs(os.path.join(next_src, "app"), exist_ok=True)
os.makedirs(os.path.join(next_src, "components"), exist_ok=True)
os.makedirs(os.path.join(next_src, "lib"), exist_ok=True)
os.makedirs(os.path.join(next_src, "contexts"), exist_ok=True)

# 1. Move components, lib, contexts
for folder in ["components", "lib", "contexts"]:
    src_folder = os.path.join(client_src, folder)
    dest_folder = os.path.join(next_src, folder)
    if os.path.exists(src_folder):
        shutil.copytree(src_folder, dest_folder, dirs_exist_ok=True)

# 2. Refactor wouter -> next/link & next/navigation
def replace_in_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    
    # regex replacements for wouter
    content = re.sub(r'import\s+\{\s*Link(.*?)\}\s+from\s+["\']wouter["\'];?', r'import Link \1 from "next/link";', content)
    content = re.sub(r'import\s+Link\s+from\s+["\']wouter["\'];?', r'import Link from "next/link";', content)
    # Handle useLocation
    if 'useLocation' in content:
        content = re.sub(r'import\s+\{\s*useLocation(.*?)\}\s+from\s+["\']wouter["\'];?', r'import { usePathname } from "next/navigation";', content)
        content = re.sub(r'const\s+\[\s*location\s*\]\s*=\s*useLocation\(\);', r'const location = usePathname();', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

# Apply to all files in src
for root, _, files in os.walk(next_src):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            replace_in_file(os.path.join(root, file), [])

# 3. Create pages
pages_dir = os.path.join(client_src, "pages")
pages_map = {
    "Home.tsx": "page.tsx",
    "About.tsx": "tentang/page.tsx",
    "Curriculum.tsx": "kurikulum/page.tsx",
    "Facilities.tsx": "fasilitas/page.tsx",
    "FacultyStaff.tsx": "dosen/page.tsx",
    "StudentLife.tsx": "kemahasiswaan/page.tsx",
    "Perspectives.tsx": "perspektif/page.tsx",
    "Career.tsx": "karier/page.tsx",
    "Links.tsx": "tautan/page.tsx",
}

for src_file, dest_rel in pages_map.items():
    src_path = os.path.join(pages_dir, src_file)
    dest_path = os.path.join(next_src, "app", dest_rel)
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        replace_in_file(dest_path, [('export default function ', 'export default function ')]) # trigger wouter replace

# 4. Create Layout
layout_content = """import type { Metadata } from "next";
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
"""
with open(os.path.join(next_src, "app", "layout.tsx"), "w") as f:
    f.write(layout_content)

# Move index.css
shutil.copy(os.path.join(client_src, "index.css"), os.path.join(next_src, "index.css"))

# 5. Fix components specific issues
# SiteFrame needs to be a Client Component because it uses usePathname and useState
siteframe_path = os.path.join(next_src, "components", "SiteFrame.tsx")
if os.path.exists(siteframe_path):
    with open(siteframe_path, 'r') as f:
        content = f.read()
    if '"use client"' not in content:
        with open(siteframe_path, 'w') as f:
            f.write('"use client";\n' + content)

# Same for LanguageContext, Chatbot, SearchDialog
client_components = ["contexts/LanguageContext.tsx", "components/Chatbot.tsx", "components/SearchDialog.tsx"]
for cc in client_components:
    cc_path = os.path.join(next_src, cc)
    if os.path.exists(cc_path):
        with open(cc_path, 'r') as f:
            content = f.read()
        if '"use client"' not in content:
            with open(cc_path, 'w') as f:
                f.write('"use client";\n' + content)

print("Migration script completed.")
