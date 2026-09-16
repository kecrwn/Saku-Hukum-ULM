"use client";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { lawKnowledgeBase, availableLawTopics } from "@/lib/knowledge";
import { Search, BookOpen, ChevronDown, ChevronUp } from "lucide-react";

export default function PustakaPage() {
  const { language, isIndonesian } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  // Combine available topics with actual content
  const topicsData = useMemo(() => {
    return availableLawTopics.map(topic => ({
      id: topic.id,
      name: topic.name,
      data: lawKnowledgeBase[topic.id]
    })).filter(t => t.data); // only those with valid data
  }, []);

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return topicsData;
    const lowerQ = searchQuery.toLowerCase();
    return topicsData.filter(t => 
      t.name.toLowerCase().includes(lowerQ) || 
      t.data.title.toLowerCase().includes(lowerQ) ||
      t.data.description.toLowerCase().includes(lowerQ) ||
      t.data.sections.some((sec: any) => 
        sec.topic.toLowerCase().includes(lowerQ) ||
        (sec.content_id && sec.content_id.toLowerCase().includes(lowerQ)) ||
        (sec.content_en && sec.content_en.toLowerCase().includes(lowerQ))
      )
    );
  }, [searchQuery, topicsData]);

  const toggleTopic = (id: string) => {
    setExpandedTopic(prev => prev === id ? null : id);
  };

  return (
    <div className="content-width py-16 min-h-screen">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--ink-deep)] tracking-tight mb-4 flex items-center gap-3">
          <BookOpen className="text-[var(--clay)]" size={36} />
          {isIndonesian ? "Pustaka Hukum" : "Law Library"}
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl leading-relaxed">
          {isIndonesian 
            ? "Jelajahi basis pengetahuan hukum Indonesia yang komprehensif. Koleksi ini dirancang untuk memudahkan pemahaman berbagai cabang hukum dengan cepat dan akurat."
            : "Explore a comprehensive Indonesian law knowledge base. This collection is designed to facilitate quick and accurate understanding of various branches of law."}
        </p>
      </header>

      {/* Database Search Bar */}
      <div className="relative mb-12 max-w-xl group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--muted)] group-focus-within:text-[var(--clay)] transition-colors">
          <Search size={18} />
        </div>
        <input
          type="text"
          className="w-full pl-11 pr-4 py-4 bg-white/60 border border-[rgba(23,62,68,0.15)] rounded-2xl text-[var(--ink-deep)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--clay)] focus:border-transparent transition-all shadow-[0_4px_16px_rgba(16,45,51,0.03)] backdrop-blur-md"
          placeholder={isIndonesian ? "Cari topik, undang-undang, atau penjelasan..." : "Search topics, laws, or explanations..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 bg-white/40 rounded-3xl border border-[rgba(23,62,68,0.1)]">
            <p className="text-[var(--muted)] text-lg">
              {isIndonesian ? "Tidak ada hasil ditemukan untuk" : "No results found for"} <span className="font-bold text-[var(--ink-deep)]">"{searchQuery}"</span>.
            </p>
          </div>
        ) : (
          filteredTopics.map((topic) => (
            <div 
              key={topic.id} 
              className={`bg-white/80 backdrop-blur-md border border-[rgba(23,62,68,0.1)] rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(16,45,51,0.03)] transition-all duration-500 ${expandedTopic === topic.id ? 'ring-1 ring-[var(--clay)]/20' : 'hover:shadow-[0_12px_48px_rgba(16,45,51,0.08)]'}`}
            >
              <button 
                onClick={() => toggleTopic(topic.id)}
                className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4 bg-transparent outline-none cursor-pointer"
              >
                <div>
                  <h2 className="text-2xl font-serif text-[var(--ink-deep)] mb-2">{topic.data.title || topic.name}</h2>
                  <p className="text-[var(--muted)] text-[15px] max-w-3xl leading-relaxed">{topic.data.description}</p>
                </div>
                <div className={`p-2 rounded-full bg-[var(--paper)] text-[var(--clay)] transition-transform duration-300 ${expandedTopic === topic.id ? 'rotate-180 bg-[var(--clay)] text-white' : ''}`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden`}
                style={{ 
                  maxHeight: expandedTopic === topic.id ? '2000px' : '0',
                  opacity: expandedTopic === topic.id ? 1 : 0
                }}
              >
                <div className="p-6 md:p-8 pt-0 border-t border-[rgba(23,62,68,0.06)] bg-[rgba(255,255,255,0.4)]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {topic.data.sections.map((section: any, idx: number) => (
                      <div key={idx} className="bg-white/60 p-5 rounded-2xl border border-[rgba(23,62,68,0.05)] hover:border-[var(--clay)]/20 transition-colors">
                        <h4 className="font-bold text-[var(--ink-deep)] mb-3 text-[16px]">{section.topic || (language === 'id' ? section.headingId : section.headingEn)}</h4>
                        <p className="text-[14.5px] leading-relaxed text-[#43534e]">
                          {language === 'id' 
                            ? (section.content_id || section.contentId) 
                            : (section.content_en || section.contentEn)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
