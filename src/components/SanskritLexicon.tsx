import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Volume2, Bookmark, ArrowRight, Quote, Check, Leaf } from 'lucide-react';
import { SANSKRIT_TERMS, SANSKRIT_SHLOKAS, SanskritTerm, SanskritShloka } from '../data/sanskritData';

interface SanskritLexiconProps {
  onSelectHerbCategory?: (cat: string) => void;
}

export const SanskritLexicon: React.FC<SanskritLexiconProps> = ({
  onSelectHerbCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShlokaId, setSelectedShlokaId] = useState<string>(SANSKRIT_SHLOKAS[0].id);
  const [selectedTerm, setSelectedTerm] = useState<SanskritTerm | null>(SANSKRIT_TERMS[0]);
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);

  const categories = ['All', 'Tridosha', 'Dhatu', 'Rasa', 'Agni & Ama', 'Rasayana', 'Dinacharya'];

  const filteredTerms = SANSKRIT_TERMS.filter((term) => {
    const matchesCat = activeCategory === 'All' || term.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      term.devanagari.includes(searchQuery) ||
      term.iast.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.shortMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.deepDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const selectedShloka =
    SANSKRIT_SHLOKAS.find((s) => s.id === selectedShlokaId) || SANSKRIT_SHLOKAS[0];

  const handleCopyTerm = (term: SanskritTerm) => {
    navigator.clipboard.writeText(`${term.devanagari} (${term.iast}) - ${term.shortMeaning}`);
    setCopiedTerm(term.iast);
    setTimeout(() => setCopiedTerm(null), 2000);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Sanskrit Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6ED] border border-[#cbead4] text-xs font-semibold uppercase tracking-[0.2em] text-[#1F3D2B]">
            <BookOpen className="w-3.5 h-3.5 text-[#5E7A68]" />
            <span>संस्कृत ज्ञानकोश · Sanskrit Jñāna-Kośa</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F3D2B] leading-tight">
            The Classical Sanskrit Lexicon &amp; Shlokas
          </h2>

          <p className="text-sm sm:text-base text-[#424843] leading-relaxed">
            Every Ayurvedic therapeutic protocol originates from authentic Sanskrit aphorisms (Sūtras). Explore sacred root words, classical verses from the <em>Caraka</em> and <em>Suśruta Saṁhitā</em>, and phonetic pronunciations.
          </p>
        </div>

        {/* Featured Classical Shloka Sanctuary Card */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)] relative overflow-hidden">
          {/* Subtle decorative background watermarks */}
          <div className="absolute -top-10 -right-10 text-[140px] font-serif text-[#1F3D2B]/[0.03] select-none pointer-events-none leading-none font-bold">
            ॐ
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#E2DDD4] gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C27D60] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                Featured Classical Shloka
              </span>
              <h3 className="font-serif text-2xl text-[#1F3D2B]">
                {selectedShloka.title}
              </h3>
            </div>

            {/* Shloka Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EEF6ED] rounded-lg border border-[#E2DDD4] overflow-x-auto scrollbar-none">
              {SANSKRIT_SHLOKAS.map((shloka) => (
                <button
                  key={shloka.id}
                  onClick={() => setSelectedShlokaId(shloka.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedShlokaId === shloka.id
                      ? 'bg-white text-[#1F3D2B] shadow-xs'
                      : 'text-[#5E7A68] hover:text-[#1F3D2B]'
                  }`}
                >
                  {shloka.id === 'swastha-definition'
                    ? 'Swastha (Health)'
                    : shloka.id === 'ayurveda-purpose'
                    ? 'Ayurveda Purpose'
                    : shloka.id === 'tridosha-governance'
                    ? 'Tridosha Rule'
                    : 'Ojas Vitality'}
                </button>
              ))}
            </div>
          </div>

          {/* Shloka Display Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
            {/* Sanskrit Devanagari Script & IAST */}
            <div className="lg:col-span-7 bg-[#F9F8F5] border border-[#E2DDD4] rounded-xl p-6 sm:p-8 space-y-4">
              <div className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1F3D2B] leading-relaxed tracking-wide whitespace-pre-line font-medium border-l-3 border-[#C27D60] pl-4">
                {selectedShloka.devanagari}
              </div>

              <div className="text-xs sm:text-sm font-serif italic text-[#5E7A68] whitespace-pre-line leading-relaxed pl-4">
                {selectedShloka.iast}
              </div>

              <div className="pt-2 border-t border-[#E2DDD4]/60 flex items-center justify-between text-xs text-[#727972]">
                <span className="font-semibold text-[#1F3D2B]">
                  Classical Citation: {selectedShloka.source}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#5E7A68]">
                  Brihat Trayi Canon
                </span>
              </div>
            </div>

            {/* Translation & Philosophical Meaning */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1F3D2B] block">
                  English Translation &amp; Significance
                </span>
                <p className="text-xs sm:text-sm text-[#242B26] leading-relaxed font-medium">
                  "{selectedShloka.translation}"
                </p>
              </div>

              <div className="p-4 bg-[#EEF6ED] rounded-xl border border-[#cbead4] text-xs text-[#1F3D2B] space-y-1">
                <span className="font-semibold uppercase tracking-wider text-[10px] text-[#5E7A68] block">
                  Clinical Living Application
                </span>
                <p className="leading-relaxed text-[#424843]">
                  {selectedShloka.significance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Dictionary & Botanical Root Search */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68] block">
                Ayurvedic Terminology Lexicon
              </span>
              <h3 className="font-serif text-2xl text-[#1F3D2B] mt-0.5">
                Classical Vocabulary &amp; Root Words
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#727972] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Sanskrit (वात, Agni, Ojas, Dhatu)..."
                className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg pl-9.5 pr-4 py-2.5 text-xs text-[#242B26] placeholder-[#727972] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#727972] hover:text-[#1F3D2B]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1F3D2B] text-white border-[#1F3D2B]'
                    : 'bg-[#FFFFFF] text-[#424843] border-[#E2DDD4] hover:bg-[#EEF6ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Lexicon Grid: Terms on Left, Deep Dive Panel on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Terms List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {filteredTerms.map((term) => {
                const isSelected = selectedTerm?.iast === term.iast;

                return (
                  <div
                    key={term.iast}
                    onClick={() => setSelectedTerm(term)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#EEF6ED] border-[#1F3D2B] shadow-xs'
                        : 'bg-[#FFFFFF] border-[#E2DDD4] hover:bg-[#F9F8F5]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif text-xl sm:text-2xl font-bold text-[#1F3D2B]">
                          {term.devanagari}
                        </span>
                        <span className="text-sm font-semibold text-[#5E7A68]">
                          {term.iast}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E2DDD4] text-[#727972]">
                          {term.category}
                        </span>
                      </div>

                      <p className="text-xs text-[#242B26] font-medium leading-relaxed">
                        {term.shortMeaning}
                      </p>

                      <div className="text-[11px] text-[#727972] flex items-center gap-2 pt-1">
                        <span>Phonetic: <span className="font-mono text-[#1F3D2B]">{term.phonetic}</span></span>
                        <span aria-hidden="true">·</span>
                        <span>{term.sourceText}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTerm(term);
                      }}
                      className="p-1.5 text-[#727972] hover:text-[#1F3D2B] hover:bg-white rounded transition-colors cursor-pointer shrink-0"
                      title="Copy Sanskrit term and meaning"
                    >
                      {copiedTerm === term.iast ? (
                        <Check className="w-4 h-4 text-[#1F3D2B]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                );
              })}

              {filteredTerms.length === 0 && (
                <div className="p-8 text-center bg-white border border-[#E2DDD4] rounded-xl">
                  <p className="font-serif text-lg text-[#1F3D2B]">No Sanskrit terms match your inquiry</p>
                  <p className="text-xs text-[#5E7A68] mt-1">Try another keyword or select "All".</p>
                </div>
              )}
            </div>

            {/* Deep Dive Definition Panel (5 cols sticky) */}
            <div className="lg:col-span-5 sticky top-24">
              {selectedTerm ? (
                <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-8 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)] space-y-5">
                  <div className="pb-4 border-b border-[#E2DDD4]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C27D60]">
                        {selectedTerm.category} Concept Dossier
                      </span>
                      <span className="text-[11px] font-mono text-[#5E7A68]">
                        {selectedTerm.phonetic}
                      </span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-serif text-3xl font-bold text-[#1F3D2B]">
                        {selectedTerm.devanagari}
                      </span>
                      <span className="text-lg font-serif text-[#5E7A68] italic">
                        {selectedTerm.iast}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#1F3D2B] mt-2">
                      {selectedTerm.shortMeaning}
                    </p>
                  </div>

                  {/* Deep Description */}
                  <div className="space-y-2 text-xs text-[#424843] leading-relaxed">
                    <span className="font-semibold text-[#1F3D2B] uppercase tracking-wider text-[10px] block">
                      Exegesis &amp; Physiological Function
                    </span>
                    <p>{selectedTerm.deepDescription}</p>
                  </div>

                  {/* Scriptural Context */}
                  <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] text-xs space-y-1.5">
                    <span className="font-semibold text-[#1F3D2B] uppercase tracking-wider text-[10px] block">
                      Scriptural Reference: {selectedTerm.sourceText}
                    </span>
                    <p className="italic text-[#5E7A68]">
                      "{selectedTerm.scripturalContext}"
                    </p>
                  </div>

                  {/* Quick Action linking to Apothecary */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const el = document.getElementById('apothecary-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Leaf className="w-3.5 h-3.5 text-[#cbead4]" />
                      <span>View Formulations Pacifying This Principle</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-white border border-[#E2DDD4] rounded-xl text-xs text-[#727972]">
                  Select a Sanskrit term to view comprehensive textual analysis.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
