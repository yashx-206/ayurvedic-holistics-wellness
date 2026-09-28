import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'apothecary' | 'diagnostic' | 'dinacharya' | 'consultation' | 'lexicon' | 'feedback';
  setActiveTab: (tab: 'apothecary' | 'diagnostic' | 'dinacharya' | 'consultation' | 'lexicon' | 'feedback') => void;
  cartCount: number;
  openCart: () => void;
  openFeedback: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openFeedback,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'apothecary' | 'diagnostic' | 'dinacharya' | 'consultation' | 'lexicon' | 'feedback') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F5]/95 backdrop-blur-md border-b border-[#E2DDD4]">
      {/* Announcement Kicker */}
      <div className="bg-[#1F3D2B] text-[#F9F8F5] text-[11px] font-medium tracking-wider text-center py-1.5 px-3 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
        <span>AYUSH Certified Classical Extracts (आयुष प्रमाणित)</span>
        <span aria-hidden="true" className="text-[#5E7A68]">·</span>
        <span className="hidden sm:inline">Complimentary Handcrafted Brass Measuring Spoon with Ritual Kits</span>
        <span aria-hidden="true" className="text-[#5E7A68] hidden sm:inline">·</span>
        <span>Free Apothecary Dispatch over $75</span>
      </div>

      {/* Strict 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Zone 1: Wordmark with Devanagari touch */}
        <button
          onClick={() => handleNavClick('apothecary')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#1F3D2B] group-hover:text-[#082717] transition-colors flex items-baseline gap-1.5">
            <span>Veda &amp; Botanical</span>
            <span className="text-xs font-normal text-[#5E7A68] font-serif hidden sm:inline">वेद रसशाला</span>
          </span>
          <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#5E7A68] font-semibold -mt-0.5 sm:-mt-1">
            आयुर्वेद रसशाला · Classical Apothecary
          </span>
        </button>

        {/* Zone 2: clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <button
            onClick={() => handleNavClick('apothecary')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer ${
              activeTab === 'apothecary'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            Apothecary
          </button>
          <button
            onClick={() => handleNavClick('diagnostic')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer ${
              activeTab === 'diagnostic'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            Dosha Diagnostic
          </button>
          <button
            onClick={() => handleNavClick('dinacharya')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer ${
              activeTab === 'dinacharya'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            Daily Dinacharya
          </button>
          <button
            onClick={() => handleNavClick('lexicon')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'lexicon'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            <span className="font-serif text-xs text-[#C27D60] font-bold">संस्कृत</span>
            <span>Lexicon &amp; Shlokas</span>
          </button>
          <button
            onClick={() => handleNavClick('consultation')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer ${
              activeTab === 'consultation'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            Vaidya Consult
          </button>
          <button
            onClick={() => handleNavClick('feedback')}
            className={`text-sm tracking-wide transition-colors pb-1 relative cursor-pointer ${
              activeTab === 'feedback'
                ? 'text-[#1F3D2B] font-semibold border-b-2 border-[#1F3D2B]'
                : 'text-[#424843] hover:text-[#1F3D2B]'
            }`}
          >
            Feedback
          </button>
        </nav>

        {/* Zone 3: primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openCart}
            className="relative p-2 text-[#1F3D2B] hover:text-[#082717] hover:bg-[#EBE6DF]/50 rounded-lg transition-colors cursor-pointer"
            aria-label="View Ritual Kit and Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1F3D2B] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('diagnostic')}
            className="hidden sm:inline-flex items-center gap-2 bg-[#C27D60] hover:bg-[#b06f54] text-white text-xs font-semibold px-3.5 sm:px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Diagnostic</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1F3D2B] hover:bg-[#EBE6DF]/50 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2DDD4] bg-[#F9F8F5] px-4 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('apothecary')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg ${
              activeTab === 'apothecary' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            Apothecary & Formulas
          </button>
          <button
            onClick={() => handleNavClick('diagnostic')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg ${
              activeTab === 'diagnostic' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            Dosha Diagnostic (Prakriti Assessment)
          </button>
          <button
            onClick={() => handleNavClick('dinacharya')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg ${
              activeTab === 'dinacharya' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            Daily Dinacharya &amp; Ritucharya
          </button>
          <button
            onClick={() => handleNavClick('lexicon')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg flex items-center justify-between ${
              activeTab === 'lexicon' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            <span>Sanskrit Lexicon &amp; Shlokas</span>
            <span className="text-xs font-serif font-bold text-[#C27D60]">संस्कृत ज्ञानकोश</span>
          </button>
          <button
            onClick={() => handleNavClick('consultation')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg ${
              activeTab === 'consultation' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            Vaidya Consultation Booking
          </button>
          <button
            onClick={() => handleNavClick('feedback')}
            className={`block w-full text-left py-2.5 px-3 text-sm rounded-lg ${
              activeTab === 'feedback' ? 'bg-[#EBE6DF] text-[#1F3D2B] font-semibold' : 'text-[#424843]'
            }`}
          >
            User Feedback & Reviews
          </button>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="w-full flex items-center justify-center gap-2 bg-[#C27D60] text-white text-xs font-semibold py-3 rounded-lg cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Take Free Dosha Assessment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
