/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { DoshaQuiz } from './components/DoshaQuiz';
import { DinacharyaTracker } from './components/DinacharyaTracker';
import { ConsultationSection } from './components/ConsultationSection';
import { FeedbackSection } from './components/FeedbackSection';
import { SanskritLexicon } from './components/SanskritLexicon';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Product, CartItem, DoshaType } from './types/ayurveda';
import { PRODUCTS } from './data/ayurvedaData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'apothecary' | 'diagnostic' | 'dinacharya' | 'consultation' | 'lexicon' | 'feedback'>('apothecary');
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // Seed with Ashwagandha for immediate gratification
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [selectedDoshaFilter, setSelectedDoshaFilter] = useState<DoshaType | 'All'>('All');

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddPrescribedKit = (products: Product[]) => {
    setCart((prev) => {
      let updated = [...prev];
      for (const prod of products) {
        const existing = updated.find((i) => i.product.id === prod.id);
        if (existing) {
          updated = updated.map((i) =>
            i.product.id === prod.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleExploreDoshaFromQuiz = (dosha: DoshaType) => {
    setSelectedDoshaFilter(dosha);
    setActiveTab('apothecary');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F5] text-[#242B26]">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openFeedback={() => setIsFeedbackModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'apothecary' && (
          <>
            <HeroSection
              onStartDiagnostic={() => {
                setActiveTab('diagnostic');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreProducts={() => {
                const el = document.getElementById('apothecary-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSanskritLexicon={() => {
                setActiveTab('lexicon');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <ProductCatalog
              onAddToCart={handleAddToCart}
              selectedDoshaFilter={selectedDoshaFilter}
            />
          </>
        )}

        {activeTab === 'diagnostic' && (
          <DoshaQuiz
            onAddPrescribedKit={handleAddPrescribedKit}
            onExploreApothecary={handleExploreDoshaFromQuiz}
          />
        )}

        {activeTab === 'dinacharya' && <DinacharyaTracker />}

        {activeTab === 'lexicon' && <SanskritLexicon />}

        {activeTab === 'consultation' && <ConsultationSection />}

        {activeTab === 'feedback' && (
          <div className="py-6 sm:py-12">
            <FeedbackSection />
          </div>
        )}
      </main>

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Feedback Modal (Accessible globally) */}
      {isFeedbackModalOpen && (
        <FeedbackSection
          isModal
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      )}

      {/* Discreet floating feedback affordance */}
      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-5 right-5 z-30 bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold px-3.5 py-2.5 rounded-full shadow-[0px_8px_24px_-4px_rgba(31,61,43,0.3)] flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        aria-label="Give feedback"
      >
        <MessageSquarePlus className="w-4 h-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>

      {/* Apothecary Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
}

