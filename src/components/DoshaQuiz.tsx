import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, CheckCircle, Flame, Wind, Droplets, ShoppingBag } from 'lucide-react';
import { QUIZ_QUESTIONS, DOSHA_PROFILES, PRODUCTS } from '../data/ayurvedaData';
import { DoshaType, Product } from '../types/ayurveda';

interface DoshaQuizProps {
  onAddPrescribedKit: (products: Product[]) => void;
  onExploreApothecary: (dosha: DoshaType) => void;
}

export const DoshaQuiz: React.FC<DoshaQuizProps> = ({
  onAddPrescribedKit,
  onExploreApothecary,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'Vata' | 'Pitta' | 'Kapha'>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [kitAddedNotice, setKitAddedNotice] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  const handleSelectOption = (dosha: 'Vata' | 'Pitta' | 'Kapha') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: dosha,
    }));
  };

  const handleNext = () => {
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate scores
  const totalAnswers = Object.keys(answers).length;
  const vataCount = Object.values(answers).filter((d) => d === 'Vata').length;
  const pittaCount = Object.values(answers).filter((d) => d === 'Pitta').length;
  const kaphaCount = Object.values(answers).filter((d) => d === 'Kapha').length;

  const vataPercent = totalAnswers > 0 ? Math.round((vataCount / totalAnswers) * 100) : 33;
  const pittaPercent = totalAnswers > 0 ? Math.round((pittaCount / totalAnswers) * 100) : 33;
  const kaphaPercent = totalAnswers > 0 ? 100 - vataPercent - pittaPercent : 34;

  // Determine dominant dosha
  let dominantDosha: 'Vata' | 'Pitta' | 'Kapha' = 'Vata';
  if (pittaCount > vataCount && pittaCount >= kaphaCount) {
    dominantDosha = 'Pitta';
  } else if (kaphaCount > vataCount && kaphaCount > pittaCount) {
    dominantDosha = 'Kapha';
  }

  const profile = DOSHA_PROFILES[dominantDosha];

  // Tailored matching products
  const matchingProducts = PRODUCTS.filter(
    (p) => p.doshas.includes(dominantDosha) || p.doshas.includes('Tridoshic')
  ).slice(0, 3);

  const handleAddKit = () => {
    onAddPrescribedKit(matchingProducts);
    setKitAddedNotice(true);
    setTimeout(() => setKitAddedNotice(false), 2500);
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isCompleted ? (
          /* QUIZ IN PROGRESS */
          <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)]">
            {/* Header progress */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E2DDD4] mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#5E7A68] tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clinical Diagnostic · Prakriti &amp; Vikriti</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1F3D2B] mt-1">
                  Constitutional Dosha Assessment
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#5E7A68]">Question</span>
                <div className="text-sm font-semibold text-[#1F3D2B] tabular-nums">
                  {currentStep + 1} <span className="text-[#5E7A68]">/ {QUIZ_QUESTIONS.length}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#EEF6ED] h-1.5 rounded-full overflow-hidden mb-8">
              <div
                className="bg-[#1F3D2B] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Category & Title */}
            <div className="space-y-2 mb-8">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C27D60]">
                {currentQuestion.category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1F3D2B] leading-snug">
                {currentQuestion.question}
              </h3>
              <p className="text-xs text-[#5E7A68] leading-relaxed">
                {currentQuestion.subtext}
              </p>
            </div>

            {/* Options list with custom 20px concentric radio selectors */}
            <div className="space-y-3.5 mb-10">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option.dosha;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(option.dosha)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#EEF6ED] border-[#1F3D2B] shadow-xs'
                        : 'bg-[#FFFFFF] border-[#E2DDD4] hover:bg-[#F9F8F5]'
                    }`}
                  >
                    {/* Custom 20px concentric radio circle matching design specification */}
                    <div
                      className={`w-5 h-5 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-colors border ${
                        isSelected ? 'border-[#1F3D2B] bg-white' : 'border-[#E2DDD4] bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1F3D2B]" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-[#242B26] leading-relaxed font-medium">
                        {option.text}
                      </p>
                      <span className="text-[11px] text-[#5E7A68] font-normal mt-1 block">
                        Doshic affinity: {option.trait}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#E2DDD4]">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  currentStep === 0
                    ? 'opacity-40 cursor-not-allowed text-[#727972]'
                    : 'text-[#424843] hover:text-[#1F3D2B] hover:bg-[#EEF6ED]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className={`text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all cursor-pointer ${
                  answers[currentQuestion.id]
                    ? 'bg-[#1F3D2B] hover:bg-[#082717] text-white shadow-xs'
                    : 'opacity-40 cursor-not-allowed bg-[#EBE6DF] text-[#727972]'
                }`}
              >
                <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Generate Diagnostic Report' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* COMPLETED DIAGNOSTIC REPORT */
          <div className="space-y-8 animate-fadeIn">
            {/* Top result card */}
            <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2DDD4] gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C27D60] mb-1">
                    Your Constitutional Blueprint (Prakriti)
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3D2B]">
                    Primary Constitution: {profile.dominant}
                  </h2>
                </div>

                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-[#5E7A68] hover:text-[#1F3D2B] p-2 rounded-lg hover:bg-[#EEF6ED] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>

              {/* Elemental Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                {/* Vata Gauge */}
                <div className="p-4 rounded-xl border border-[#E2DDD4] bg-[#F9F8F5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1F3D2B]">
                      <Wind className="w-4 h-4 text-[#5E7A68]" />
                      <span>वात (Vāta · Air &amp; Ether)</span>
                    </span>
                    <span className="text-xs font-bold text-[#1F3D2B] tabular-nums">
                      {vataPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E2DDD4] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#5E7A68] h-full rounded-full transition-all duration-500"
                      style={{ width: `${vataPercent}%` }}
                    />
                  </div>
                </div>

                {/* Pitta Gauge */}
                <div className="p-4 rounded-xl border border-[#E2DDD4] bg-[#F9F8F5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1F3D2B]">
                      <Flame className="w-4 h-4 text-[#C27D60]" />
                      <span>पित्त (Pitta · Fire &amp; Water)</span>
                    </span>
                    <span className="text-xs font-bold text-[#1F3D2B] tabular-nums">
                      {pittaPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E2DDD4] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C27D60] h-full rounded-full transition-all duration-500"
                      style={{ width: `${pittaPercent}%` }}
                    />
                  </div>
                </div>

                {/* Kapha Gauge */}
                <div className="p-4 rounded-xl border border-[#E2DDD4] bg-[#F9F8F5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1F3D2B]">
                      <Droplets className="w-4 h-4 text-[#496453]" />
                      <span>कफ (Kapha · Earth &amp; Water)</span>
                    </span>
                    <span className="text-xs font-bold text-[#1F3D2B] tabular-nums">
                      {kaphaPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E2DDD4] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#496453] h-full rounded-full transition-all duration-500"
                      style={{ width: `${kaphaPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Elemental Profile Analysis */}
              <div className="space-y-3 text-xs sm:text-sm text-[#424843] leading-relaxed">
                <div className="bg-[#EEF6ED] p-4 rounded-xl border border-[#cbead4]">
                  <span className="font-semibold text-[#1F3D2B] block uppercase tracking-wider text-[11px] mb-1">
                    Fundamental Qualities (Gunas)
                  </span>
                  <p className="font-medium text-[#1F3D2B]">{profile.nature}</p>
                </div>
                <p>{profile.elementDescription}</p>
              </div>

              {/* Signs of Imbalance (Vikriti) */}
              <div className="mt-8 pt-6 border-t border-[#E2DDD4]">
                <h4 className="font-serif text-lg text-[#1F3D2B] mb-3">
                  Telltale Signs of {dominantDosha} Imbalance (Vikriti)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#424843]">
                  {profile.imbalanceSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-[#F9F8F5] border border-[#E2DDD4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C27D60] mt-1.5 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pathya (Favor) vs Apathya (Limit) Nutritional Matrix */}
              <div className="mt-8 pt-6 border-t border-[#E2DDD4]">
                <h4 className="font-serif text-lg text-[#1F3D2B] mb-4">
                  Dietary Pathya &amp; Apathya (Food Energetics)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nourishing to favor */}
                  <div className="p-4 rounded-xl border border-[#cbead4] bg-[#F4FBF3] space-y-2">
                    <span className="text-xs font-semibold text-[#1F3D2B] flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 text-[#496453]" />
                      Nourishing Foods to Favor
                    </span>
                    <ul className="text-xs text-[#424843] space-y-1.5 list-disc list-inside">
                      {profile.recommendedFoods.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Foods to limit */}
                  <div className="p-4 rounded-xl border border-[#ffdad6] bg-[#FFF5F3] space-y-2">
                    <span className="text-xs font-semibold text-[#93000a] flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="w-4 h-4 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center text-[10px] font-bold">✕</span>
                      Foods to Minimize or Modify
                    </span>
                    <ul className="text-xs text-[#424843] space-y-1.5 list-disc list-inside">
                      {profile.foodsToLimit.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Daily Lifestyle Wisdom */}
              <div className="mt-8 pt-6 border-t border-[#E2DDD4]">
                <h4 className="font-serif text-lg text-[#1F3D2B] mb-3">
                  Prescribed Daily Dinacharya Routine
                </h4>
                <div className="space-y-2 text-xs text-[#424843]">
                  {profile.lifestyleAdvice.map((adv, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#F9F8F5] border border-[#E2DDD4] flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#EBE6DF] text-[#1F3D2B] font-semibold flex items-center justify-center shrink-0 text-[11px] tabular-nums">
                        {idx + 1}
                      </span>
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prescribed Apothecary Ritual Kit */}
            <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2DDD4] gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68] mb-1">
                    Bespoke Formulation Protocol
                  </div>
                  <h3 className="font-serif text-2xl text-[#1F3D2B]">
                    Your Calibrated {dominantDosha}-Balancing Kit
                  </h3>
                  <p className="text-xs text-[#424843] mt-1">
                    Carefully chosen by our classical pharmacopoeia for your specific constitutional ratio.
                  </p>
                </div>

                <button
                  onClick={handleAddKit}
                  className="bg-[#C27D60] hover:bg-[#b06f54] text-white text-xs font-semibold px-5 py-3 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
                >
                  {kitAddedNotice ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-white" />
                      <span>Kit Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Entire Kit to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Kit item cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-6">
                {matchingProducts.map((product) => (
                  <div key={product.id} className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] space-y-3">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white border border-[#E2DDD4]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] italic text-[#5E7A68]">{product.botanicalName}</div>
                      <div className="font-serif font-semibold text-sm text-[#1F3D2B] mt-0.5">{product.name}</div>
                      <div className="text-xs text-[#1F3D2B] font-semibold mt-1 tabular-nums">${product.price}.00</div>
                    </div>
                    <p className="text-[11px] text-[#424843] line-clamp-2">{product.summary}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => onExploreApothecary(dominantDosha)}
                  className="text-xs font-semibold text-[#1F3D2B] hover:text-[#082717] underline underline-offset-4 cursor-pointer"
                >
                  View All {dominantDosha}-Pacifying Formulations in Apothecary &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
