import React, { useState } from 'react';
import { Search, Plus, Check, ShieldCheck, Sparkles, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { Product, DoshaType, ProductBenefitCategory } from '../types/ayurveda';
import { PRODUCTS } from '../data/ayurvedaData';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  onAddToCart: (product: Product, quantity: number) => void;
  selectedDoshaFilter?: DoshaType | 'All';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  selectedDoshaFilter = 'All',
}) => {
  const [activeDosha, setActiveDosha] = useState<DoshaType | 'All'>(selectedDoshaFilter);
  const [activeCategory, setActiveCategory] = useState<ProductBenefitCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const categories: ProductBenefitCategory[] = [
    'All',
    'Nervine & Sleep',
    'Digestion & Agni',
    'Vitality & Ojas',
    'Radiance & Skin',
    'Cognitive Clarity',
  ];

  const doshas: Array<DoshaType | 'All'> = [
    'All',
    'Vata',
    'Pitta',
    'Kapha',
    'Tridoshic',
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    // Dosha filter
    const matchesDosha =
      activeDosha === 'All' ||
      product.doshas.includes(activeDosha as DoshaType) ||
      product.doshas.includes('Tridoshic');

    // Category filter
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;

    // Search query
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sanskritName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDosha && matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setQuickAddedId(product.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1500);
  };

  return (
    <section id="apothecary-section" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68] mb-2">
            Clinical Botanical Formulations
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3D2B]">
            Classical Pharmacopoeia & Single Extracts
          </h2>
          <p className="text-sm text-[#424843] mt-2 leading-relaxed">
            Formulated in strict adherence to ancient Ashtanga Hridaya and Charaka Samhita standards. Certified heavy metal tested, non-GMO, and sustainably wildcrafted.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="space-y-4 mb-8">
          {/* Top row: Search & Dosha Segmented Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-[#727972] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herb, botanical name, or action..."
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

            {/* Dosha Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#EEF6ED] rounded-lg border border-[#E2DDD4] overflow-x-auto scrollbar-none">
              {doshas.map((dosha) => (
                <button
                  key={dosha}
                  onClick={() => setActiveDosha(dosha)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    activeDosha === dosha
                      ? 'bg-white text-[#1F3D2B] shadow-xs'
                      : 'text-[#5E7A68] hover:text-[#1F3D2B]'
                  }`}
                >
                  {dosha === 'All' ? 'All Doshas' : `${dosha} Pacifying`}
                </button>
              ))}
            </div>
          </div>

          {/* Intention / Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-[11px] font-semibold text-[#5E7A68] uppercase tracking-wider shrink-0 mr-1">
              Focus:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1F3D2B] text-white border-[#1F3D2B]'
                    : 'bg-[#FFFFFF] text-[#424843] border-[#E2DDD4] hover:bg-[#EEF6ED]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: 3-column desktop */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-xl p-12 text-center max-w-lg mx-auto">
            <p className="font-serif text-lg text-[#1F3D2B]">No botanical formulations match your query</p>
            <p className="text-xs text-[#5E7A68] mt-1">Try resetting your search query or selecting "All Doshas".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveDosha('All');
                setActiveCategory('All');
              }}
              className="mt-4 bg-[#EBE6DF] text-[#1F3D2B] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#e2ddd4]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = quickAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForModal(product)}
                  className="group bg-[#FFFFFF] border border-[#E2DDD4] rounded-xl overflow-hidden hover:shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col cursor-pointer"
                >
                  {/* Image container: 4:3 aspect ratio */}
                  <div className="aspect-[4/3] w-full bg-[#F9F8F5] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Top unboxed subtle text tag */}
                    <div className="absolute top-3 left-3 bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-[#1F3D2B] border border-[#E2DDD4]/80">
                      Batch {product.coa.batchNumber}
                    </div>

                    <div className="absolute top-3 right-3 bg-[#FFFFFF]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-medium text-[#5E7A68] border border-[#E2DDD4]/80">
                      {product.doshas.join(' · ')}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {/* Sanskrit Classical Name in Devanagari */}
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-[#1F3D2B] tracking-wide">
                          {product.sanskritName}
                        </span>
                        <span className="text-[11px] italic text-[#5E7A68]">
                          {product.botanicalName}
                        </span>
                      </div>

                      {/* Product English Name */}
                      <h3 className="font-serif text-lg font-semibold text-[#1F3D2B] leading-snug group-hover:text-[#082717] transition-colors">
                        {product.name}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-[#424843] line-clamp-2 leading-relaxed">
                        {product.summary}
                      </p>

                      {/* Sanskrit Energetics (Dravya Guna) Tag */}
                      <div className="p-2 bg-[#F9F8F5] rounded border border-[#E2DDD4] text-[11px] text-[#424843] space-y-0.5">
                        <span className="font-semibold text-[#1F3D2B] text-[10px] uppercase tracking-wider block">
                          द्रव्यगुण (Dravya Guna Energetics):
                        </span>
                        <div className="truncate text-[#5E7A68] font-medium">
                          {product.tasteProfile}
                        </div>
                      </div>

                      {/* Unboxed Metadata with · separator */}
                      <div className="flex items-center gap-2 text-[11px] text-[#5E7A68] pt-1">
                        <span>{product.extractionRatio}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.size}</span>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-3 border-t border-[#E2DDD4] flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-base text-[#1F3D2B] tabular-nums">
                          ${product.price}.00
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductForModal(product);
                          }}
                          className="text-[11px] font-semibold text-[#5E7A68] hover:text-[#1F3D2B] px-2.5 py-1.5 rounded hover:bg-[#EEF6ED] transition-colors"
                        >
                          Specs &amp; COA
                        </button>

                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                            isAdded
                              ? 'bg-[#1F3D2B] text-white'
                              : 'bg-[#EBE6DF] hover:bg-[#1F3D2B] text-[#1F3D2B] hover:text-white border border-[#E2DDD4]'
                          }`}
                          aria-label={`Add ${product.name} to kit`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
