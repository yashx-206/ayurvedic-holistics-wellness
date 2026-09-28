import React, { useState } from 'react';
import { X, Check, ShieldCheck, FileText, Sparkles, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product } from '../types/ayurveda';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'coa' | 'ritual'>('overview');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242B26]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl shadow-[0px_20px_40px_-8px_rgba(31,61,43,0.16)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD4] bg-[#F9F8F5]">
          <div className="flex items-center gap-2 text-xs text-[#5E7A68]">
            <span className="font-semibold text-[#1F3D2B]">Classical Formula Dossier</span>
            <span aria-hidden="true">·</span>
            <span>Batch {product.coa.batchNumber}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#424843] hover:text-[#1F3D2B] hover:bg-[#EBE6DF] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Image Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E2DDD4] bg-[#F9F8F5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Sanskrit and Classical Reference */}
              <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] text-xs space-y-2">
                <div className="font-serif text-[#1F3D2B] font-semibold text-sm">
                  {product.sanskritName}
                </div>
                <div className="italic text-[#5E7A68]">
                  {product.botanicalName}
                </div>
                <div className="text-[11px] text-[#424843] pt-2 border-t border-[#E2DDD4]/80">
                  {product.classicalTextReference}
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#5E7A68] mb-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.extractionRatio}</span>
                </div>
                <h2 className="font-serif text-2xl text-[#1F3D2B] leading-tight">
                  {product.name}
                </h2>
                <div className="text-xl font-semibold text-[#1F3D2B] mt-2 tabular-nums">
                  ${product.price}.00{' '}
                  <span className="text-xs text-[#5E7A68] font-normal">/ {product.size}</span>
                </div>
              </div>

              {/* Segmented detail tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#EEF6ED] rounded-lg border border-[#E2DDD4]">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'bg-white text-[#1F3D2B] shadow-xs'
                      : 'text-[#5E7A68] hover:text-[#1F3D2B]'
                  }`}
                >
                  Overview & Rasa
                </button>
                <button
                  onClick={() => setActiveTab('coa')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'coa'
                      ? 'bg-white text-[#1F3D2B] shadow-xs'
                      : 'text-[#5E7A68] hover:text-[#1F3D2B]'
                  }`}
                >
                  Certificate of Analysis
                </button>
                <button
                  onClick={() => setActiveTab('ritual')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'ritual'
                      ? 'bg-white text-[#1F3D2B] shadow-xs'
                      : 'text-[#5E7A68] hover:text-[#1F3D2B]'
                  }`}
                >
                  Ritual & Anupana
                </button>
              </div>

              {/* Tab Content 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4 text-xs text-[#424843] leading-relaxed">
                  <p>{product.description}</p>
                  
                  <div className="bg-[#F9F8F5] p-3.5 rounded-lg border border-[#E2DDD4] space-y-1.5">
                    <span className="font-semibold text-[#1F3D2B] block uppercase tracking-wider text-[10px]">
                      Energetic Profile (Dravya Guna)
                    </span>
                    <p className="font-medium text-[#1F3D2B]">{product.tasteProfile}</p>
                  </div>

                  <div>
                    <span className="font-semibold text-[#1F3D2B] block mb-2 uppercase tracking-wider text-[10px]">
                      Standardized Active Compounds
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {product.keyActives.map((active, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-[#F9F8F5] rounded border border-[#E2DDD4]">
                          <Check className="w-3.5 h-3.5 text-[#5E7A68] shrink-0" />
                          <span className="text-[11px] font-medium text-[#1F3D2B]">{active}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: COA */}
              {activeTab === 'coa' && (
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-[#EEF6ED] rounded-lg border border-[#cbead4] flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#1F3D2B] shrink-0" />
                    <div>
                      <div className="font-semibold text-[#1F3D2B]">Independently Laboratory Verified</div>
                      <div className="text-[11px] text-[#5E7A68]">Meets rigorous USP and AYUSH purity standards</div>
                    </div>
                  </div>

                  <div className="space-y-2 border border-[#E2DDD4] rounded-lg p-3.5 bg-[#FFFFFF]">
                    <div className="flex justify-between py-1 border-b border-[#E2DDD4]/60">
                      <span className="text-[#5E7A68]">Batch Lot Number:</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{product.coa.batchNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DDD4]/60">
                      <span className="text-[#5E7A68]">Heavy Metals (Lead):</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{product.coa.leadContent}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DDD4]/60">
                      <span className="text-[#5E7A68]">Heavy Metals (Mercury):</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{product.coa.mercuryContent}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DDD4]/60">
                      <span className="text-[#5E7A68]">Microbial Pathogens:</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{product.coa.microbialStatus}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#E2DDD4]/60">
                      <span className="text-[#5E7A68]">Active Marker Assay:</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{product.coa.activeMarkerAssay}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#5E7A68]">Harvest Origin:</span>
                      <span className="font-medium text-[#1F3D2B] text-right">{product.coa.harvestOrigin}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Ritual & Anupana */}
              {activeTab === 'ritual' && (
                <div className="space-y-4 text-xs text-[#424843] leading-relaxed">
                  <div className="bg-[#F9F8F5] p-3.5 rounded-lg border border-[#E2DDD4]">
                    <span className="font-semibold text-[#1F3D2B] block uppercase tracking-wider text-[10px] mb-1">
                      Classical Anupana (Carrier Vehicle)
                    </span>
                    <p className="text-[#1F3D2B] font-medium">{product.anupana}</p>
                    <p className="text-[11px] text-[#5E7A68] mt-2">
                      In Ayurveda, the carrier (Anupana) directs the medicinal herb to its targeted tissue layer (Dhatu) and enhances cellular absorption.
                    </p>
                  </div>

                  <div className="bg-[#F9F8F5] p-3.5 rounded-lg border border-[#E2DDD4]">
                    <span className="font-semibold text-[#1F3D2B] block uppercase tracking-wider text-[10px] mb-1">
                      Calibrated Daily Dosage
                    </span>
                    <p className="text-[#1F3D2B]">{product.dosage}</p>
                  </div>
                </div>
              )}

              {/* Purchase bar */}
              <div className="pt-4 border-t border-[#E2DDD4] flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#E2DDD4] rounded-lg bg-[#F9F8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#424843] hover:text-[#1F3D2B] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#1F3D2B] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#424843] hover:text-[#1F3D2B] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-[#cbead4]" />
                      <span>Added to Ritual Kit</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Ritual Kit</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">${product.price * quantity}.00</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
