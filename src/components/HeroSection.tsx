import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Leaf, FlaskConical, Award } from 'lucide-react';
import { DoshaClock } from './DoshaClock';

interface HeroSectionProps {
  onStartDiagnostic: () => void;
  onExploreProducts: () => void;
  onOpenSanskritLexicon?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiagnostic,
  onExploreProducts,
  onOpenSanskritLexicon,
}) => {
  return (
    <section className="relative pt-4 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Sacred Sanskrit Invocation Shloka Banner */}
        <div className="bg-[#EEF6ED] border border-[#cbead4] rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="font-serif font-bold text-[#1F3D2B] tracking-wider text-sm sm:text-base">
              ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः॥
            </span>
            <span className="hidden md:inline text-[#5E7A68]">
              (May all beings reside in happiness, may all beings be free from illness)
            </span>
          </div>
          {onOpenSanskritLexicon && (
            <button
              onClick={onOpenSanskritLexicon}
              className="text-[#1F3D2B] hover:text-[#082717] font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer shrink-0 text-[11px]"
            >
              <span>संस्कृत ज्ञानकोश (Explore Sanskrit Lexicon &amp; Shlokas)</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>

        {/* Main Split Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68]">
              <Leaf className="w-3.5 h-3.5 text-[#1F3D2B]" />
              <span>आयुर्वेद रसशाला · Classical Ayurvedic Pharmacopoeia</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F3D2B] leading-[1.12] tracking-tight">
              Ancient Botanical Efficacy, Mindfully Calibrated.
            </h1>

            <p className="text-base sm:text-lg text-[#424843] leading-relaxed max-w-2xl">
              Rooted in the timeless canon of the <em>Charaka Samhita</em> (चरक संहिता) and <em>Sushruta Samhita</em> (सुश्रुत संहिता). Single-origin, wildcrafted herbs harvested in alignment with lunar cycles and calibrated through modern third-party spectrophotometry.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartDiagnostic}
                className="bg-[#C27D60] hover:bg-[#b06f54] text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-all shadow-[0px_8px_24px_-4px_rgba(194,125,96,0.25)] flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin Prakriti Diagnostic (प्रकृति)</span>
              </button>

              <button
                onClick={onExploreProducts}
                className="bg-[#EBE6DF] hover:bg-[#e2ddd4] text-[#1F3D2B] border border-[#E2DDD4] text-sm font-semibold px-6 py-3.5 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Apothecary Extracts (रसशाला)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Certifications Banner */}
            <div className="pt-6 border-t border-[#E2DDD4] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#424843]">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#1F3D2B] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1F3D2B]">AYUSH Certified</div>
                  <div className="text-[11px] text-[#5E7A68]">Classical GMP standard</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-4 h-4 text-[#1F3D2B] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1F3D2B]">Heavy Metal Tested</div>
                  <div className="text-[11px] text-[#5E7A68]">Lead &lt;0.01 ppm limit</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Leaf className="w-4 h-4 text-[#1F3D2B] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1F3D2B]">100% Wildcrafted</div>
                  <div className="text-[11px] text-[#5E7A68]">Zero binders or talc</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#1F3D2B] shrink-0" />
                <div>
                  <div className="font-semibold text-[#1F3D2B]">Batch Verified COA</div>
                  <div className="text-[11px] text-[#5E7A68]">Full transparency assay</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image with apothecary card frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD4] shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)] bg-[#FFFFFF] p-2.5">
              <div className="aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden relative">
                <img
                  src="/src/assets/images/ayurveda_hero_apothecary_1790526470141.jpg"
                  alt="Ayurvedic mortar and pestle with amber glass herbal tinctures"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/70 via-[#1F3D2B]/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] uppercase tracking-widest text-[#EBE6DF] font-semibold mb-1">
                    Authentic Rasayana Lineage
                  </div>
                  <div className="font-serif text-lg text-white">
                    Pancha Mahabhuta Harmony in Every Jar
                  </div>
                </div>
              </div>

              {/* Sub-card snippet */}
              <div className="p-4 bg-[#F9F8F5] rounded-lg mt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#1F3D2B] block">Current Season: Sharad Ritu (Autumn)</span>
                  <span className="text-[11px] text-[#5E7A68]">Recommended: Pitta Pacifying Ghee &amp; Triphala</span>
                </div>
                <button
                  onClick={onStartDiagnostic}
                  className="text-xs font-semibold text-[#C27D60] hover:text-[#b06f54] underline underline-offset-2 cursor-pointer"
                >
                  Discover Your Dosha &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Circadian Dosha Clock Section */}
        <DoshaClock />
      </div>
    </section>
  );
};
