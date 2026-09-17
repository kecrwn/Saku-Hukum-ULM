import fs from 'fs';
import path from 'path';
import LibraryClient from './LibraryClient';

export default async function RuangBacaPage() {
  // Dynamically read all JSON files to ensure we have the live database
  const dirs = [
    path.join(process.cwd(), 'src/lib/books'),
    path.join(process.cwd(), 'src/lib/knowledge')
  ];
  
  const documents: any[] = [];
  
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        try {
          const filePath = path.join(dir, file);
          const rawData = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(rawData);
          // Only add valid document structures
          if (data && (data.title || data.titleId) && data.chapters) {
            documents.push({
              ...data,
              category: data.category || (dir.includes('knowledge') ? 'Law Database' : 'General'),
              source: dir.includes('knowledge') ? 'Live Knowledge Base' : 'Saku Hukum ULM Archive'
            });
          }
        } catch (e) {
          console.error(\`Failed to parse \${file}\`, e);
        }
      }
    }
  }

  return <LibraryClient initialDocuments={documents} />;
}
