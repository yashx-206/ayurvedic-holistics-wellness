import React, { useState } from 'react';
import { Leaf, ShieldCheck, Mail, Check } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'apothecary' | 'diagnostic' | 'dinacharya' | 'consultation' | 'lexicon' | 'feedback') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-[#E2DDD4] bg-[#FFFFFF] text-[#424843]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Lineage */}
          <div className="md:col-span-4 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl text-[#1F3D2B] tracking-tight block">
                Veda &amp; Botanical
              </span>
              <span className="text-xs font-serif text-[#C27D60] font-semibold">
                आयुर्वेद रसशाला · वैदिक परम्परा
              </span>
            </div>
            <p className="text-xs text-[#424843] leading-relaxed max-w-sm">
              Artisanal Ayurvedic dispensary dedicated to classical botanical integrity, lunar harvesting rhythms, and modern clinical spectroscopy. Formulated in direct accordance with the Brihat Trayi (बृहत्त्रयी) treatises.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#5E7A68]">
              <ShieldCheck className="w-4 h-4 text-[#1F3D2B]" />
              <span>AYUSH GMP Certified Facility No. 448/AYU</span>
            </div>
            <div className="pt-2 text-xs font-serif text-[#1F3D2B] italic">
              "ॐ असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय॥"
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F3D2B] block">
              Pillars
            </span>
            <ul className="text-xs space-y-2.5">
              <li>
                <button
                  onClick={() => onNavClick('apothecary')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer"
                >
                  Pure Pharmacopoeia (रसशाला)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('diagnostic')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer"
                >
                  Prakriti Diagnostic (प्रकृति)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('dinacharya')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer"
                >
                  Dinacharya Wheel (दिनचर्या)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('lexicon')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer font-medium text-[#1F3D2B]"
                >
                  Sanskrit Lexicon (ज्ञानकोश)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('consultation')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer"
                >
                  Vaidya Sanctuary (वैद्य)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('feedback')}
                  className="hover:text-[#1F3D2B] transition-colors cursor-pointer font-medium text-[#C27D60]"
                >
                  Share Your Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Classical References */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F3D2B] block">
              Classical Treatises
            </span>
            <ul className="text-xs space-y-2 text-[#5E7A68]">
              <li>Charaka Samhita · Chikitsa Sthana</li>
              <li>Sushruta Samhita · Sutrasthana</li>
              <li>Ashtanga Hridaya · Sharira Sthana</li>
              <li>Bhavaprakasha Nighantu</li>
              <li>Sahasrayogam Taila Prakarana</li>
            </ul>
          </div>

          {/* Lunar Almanac & Dispatch Subscription */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1F3D2B] block">
              Lunar Ritucharya Almanac
            </span>
            <p className="text-xs text-[#424843] leading-relaxed">
              Receive seasonal doshic transition guides, solstice harvest alerts, and classical Sanskrit formulas.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-[#F9F8F5] border border-[#E2DDD4] rounded-lg px-3 py-2 text-xs text-[#242B26] focus:ring-1.5 focus:ring-[#5E7A68] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-[#1F3D2B] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#5E7A68]" />
                  <span>Blessings! You have joined the lunar almanac.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#E2DDD4] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#727972] gap-4">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Veda &amp; Botanical Pharmacopoeia Ltd.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Ayurvedic Traditional Medicine Standard</span>
            <span aria-hidden="true">·</span>
            <span>Heavy Metal Free Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
