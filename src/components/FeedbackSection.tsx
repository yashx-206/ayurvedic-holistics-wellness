import React, { useState } from 'react';
import { MessageSquareQuote, Send, CheckCircle2, Heart, Star, Sparkles, X } from 'lucide-react';

interface FeedbackSectionProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  isModal = false,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Formulations & Botanical Quality');
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    category: string;
    rating: number;
    message: string;
    timestamp: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    const feedbackPayload = {
      name: name.trim(),
      email: email.trim(),
      category,
      rating,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Log to console as requested by prompt
    console.log('User Feedback Submitted:', feedbackPayload);

    setSubmittedData(feedbackPayload);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setRating(5);
    setSubmitted(false);
    setSubmittedData(null);
  };

  const content = (
    <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)] relative max-w-2xl mx-auto">
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#424843] hover:text-[#1F3D2B] hover:bg-[#EEF6ED] rounded-lg transition-colors cursor-pointer"
          aria-label="Close feedback modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#C27D60]">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Voice of the Sanctuary</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1F3D2B]">
              Share Your Thoughts &amp; Feedback
            </h2>
            <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">
              Your insights help our apothecary refine classical formulations, diagnostic accuracy, and community rituals. We review every note with reverence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label 
                htmlFor="feedback-name"
                className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]"
              >
                Your Name <span className="text-[#C27D60]">*</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aranya Sen"
                className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68] transition-all"
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="feedback-email"
                className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]"
              >
                Email Address <span className="text-[#C27D60]">*</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68] transition-all"
              />
            </div>
          </div>

          {/* Feedback Topic / Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label 
                htmlFor="feedback-category"
                className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]"
              >
                Topic Category
              </label>
              <select
                id="feedback-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68] transition-all"
              >
                <option value="Formulations & Botanical Quality">Formulations &amp; Botanical Quality</option>
                <option value="Dosha Diagnostic Accuracy">Dosha Diagnostic Accuracy</option>
                <option value="Daily Dinacharya Planner">Daily Dinacharya Planner</option>
                <option value="Vaidya Consultation Experience">Vaidya Consultation Experience</option>
                <option value="Packaging & Environmental Stewardship">Packaging &amp; Environmental Stewardship</option>
                <option value="General Suggestion or Praise">General Suggestion or Praise</option>
              </select>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                Apothecary Experience
              </label>
              <div className="flex items-center gap-1.5 h-10 px-2 bg-[#F9F8F5] border border-[#E2DDD4] rounded-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-[#C27D60] hover:scale-110 transition-transform cursor-pointer"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'fill-[#C27D60] text-[#C27D60]'
                          : 'text-[#E2DDD4]'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-[#5E7A68] ml-2 font-medium tabular-nums">
                  {rating} of 5
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Message Area */}
          <div>
            <label 
              htmlFor="feedback-message"
              className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]"
            >
              Your Feedback &amp; Reflections <span className="text-[#C27D60]">*</span>
            </label>
            <textarea
              id="feedback-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what resonated with you, any imbalances or questions about our herbs, or ways we can better serve your wellness journey..."
              className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68] transition-all resize-y"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-[#5E7A68]">
              Submitted feedback is logged to the console and received by our apothecary council.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Feedback</span>
            </button>
          </div>
        </form>
      ) : (
        /* Confirmation State */
        <div className="text-center py-8 space-y-5 animate-fadeIn">
          <div className="w-14 h-14 bg-[#EEF6ED] rounded-full mx-auto flex items-center justify-center border border-[#cbead4]">
            <CheckCircle2 className="w-8 h-8 text-[#1F3D2B]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5E7A68]">
              Feedback Received &amp; Logged
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1F3D2B]">
              Thank You, {submittedData?.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#424843] max-w-md mx-auto leading-relaxed pt-1">
              Your observations have been recorded and logged. Your perspective guides our classical apothecary and supports community wellbeing.
            </p>
          </div>

          {/* Logged summary snippet */}
          <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] text-xs text-left max-w-md mx-auto space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#5E7A68]">Category:</span>
              <span className="font-semibold text-[#1F3D2B]">{submittedData?.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5E7A68]">Rating:</span>
              <span className="font-semibold text-[#1F3D2B]">{submittedData?.rating} / 5 Stars</span>
            </div>
            <div className="pt-1.5 border-t border-[#E2DDD4] text-[#424843] italic">
              "{submittedData?.message}"
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#1F3D2B] bg-[#EBE6DF] hover:bg-[#e2ddd4] px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Submit Another Response
            </button>
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="text-xs font-semibold text-white bg-[#1F3D2B] hover:bg-[#082717] px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#242B26]/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
        onClick={onClose}
      >
        <div onClick={(e) => e.stopPropagation()} className="w-full my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      {content}
    </section>
  );
};
