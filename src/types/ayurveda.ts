export type DoshaType = 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';

export type ProductBenefitCategory = 
  | 'All' 
  | 'Nervine & Sleep' 
  | 'Digestion & Agni' 
  | 'Vitality & Ojas' 
  | 'Radiance & Skin' 
  | 'Cognitive Clarity';

export interface CertificateOfAnalysis {
  batchNumber: string;
  leadContent: string; // e.g. "< 0.01 ppm (Limit: 10.0 ppm)"
  mercuryContent: string; // e.g. "Undetectable (< 0.001 ppm)"
  microbialStatus: string; // e.g. "Negative / 0 CFU"
  activeMarkerAssay: string; // e.g. "Withanolides 5.2% HPLC"
  harvestOrigin: string; // e.g. "Madhya Pradesh, Wild Harvested"
}

export interface Product {
  id: string;
  name: string;
  sanskritName: string;
  botanicalName: string;
  doshas: DoshaType[];
  category: ProductBenefitCategory;
  price: number;
  rating: number;
  reviewCount: number;
  size: string;
  extractionRatio: string;
  tasteProfile: string; // Rasa, Virya, Vipaka
  summary: string;
  description: string;
  classicalTextReference: string;
  keyActives: string[];
  anupana: string; // Recommended carrier (e.g. warm milk, ghee, warm water)
  dosage: string;
  image: string;
  inStock: boolean;
  coa: CertificateOfAnalysis;
}

export interface QuizOption {
  text: string;
  dosha: 'Vata' | 'Pitta' | 'Kapha';
  trait: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  subtext: string;
  options: QuizOption[];
}

export interface DoshaScore {
  vata: number;
  pitta: number;
  kapha: number;
}

export interface DoshaProfile {
  dominant: string;
  primaryRatio: number;
  secondaryRatio: number;
  tertiaryRatio: number;
  nature: string;
  elementDescription: string;
  imbalanceSigns: string[];
  recommendedFoods: string[];
  foodsToLimit: string[];
  herbalRecommendations: string[];
  lifestyleAdvice: string[];
}

export interface DinacharyaItem {
  id: string;
  time: string;
  sanskritName: string;
  englishTitle: string;
  category: 'Morning' | 'Midday' | 'Evening' | 'Night';
  description: string;
  benefit: string;
  recommendedHerbs: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
