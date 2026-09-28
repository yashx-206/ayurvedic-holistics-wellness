import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, ShieldCheck, Video, PhoneCall, Sparkles } from 'lucide-react';

export const ConsultationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [healthFocus, setHealthFocus] = useState('Digestive Fire & Agni Rehabilitation');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Ananya Sharma, BAMS, MD (Ayu)');
  const [preferredDate, setPreferredDate] = useState('2026-10-05');
  const [preferredTime, setPreferredTime] = useState('10:00 AM (Pitta-Agni Window)');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const ref = `VAIDYA-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Vaidya Editorial & Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD4] bg-white p-3 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)]">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/src/assets/images/ayurveda_consultation_vaidya_1790526516918.jpg"
                  alt="Ayurvedic consultation sanctuary with brass singing bowl and herbal tisane"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#5E7A68]">
                  <Video className="w-3.5 h-3.5 text-[#1F3D2B]" />
                  <span>Private Tele-Vaidya Sanctuary · 45 Minutes</span>
                </div>
                <h3 className="font-serif text-lg text-[#1F3D2B]">
                  Classical Pulse (Nadi) &amp; Tongue (Jihwa) Diagnostic
                </h3>
                <p className="text-xs text-[#424843] leading-relaxed">
                  Conducted by seasoned BAMS Ayurvedic physicians with lineages preserving Charaka and Vagbhata classical clinical therapeutics.
                </p>
              </div>
            </div>

            {/* Doctor Card */}
            <div className="p-5 bg-white rounded-xl border border-[#E2DDD4] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-serif font-semibold text-sm text-[#1F3D2B]">Dr. Ananya Sharma</div>
                  <div className="text-[11px] text-[#5E7A68]">BAMS, MD (Ayurveda) · 16 Years Lineage</div>
                </div>
                <div className="text-[11px] bg-[#EEF6ED] text-[#1F3D2B] font-semibold px-2.5 py-1 rounded-full border border-[#cbead4]">
                  Senior Vaidya
                </div>
              </div>
              <p className="text-xs text-[#424843] leading-relaxed">
                Specialized in chronic digestive disorders, autoimmune metabolic ama, and post-viral Vata rejuvenation protocols.
              </p>
              <div className="pt-2 border-t border-[#E2DDD4] flex items-center gap-4 text-[11px] text-[#5E7A68]">
                <span>Certified Central Council of Indian Medicine</span>
                <span aria-hidden="true">·</span>
                <span>English &amp; Hindi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-10 shadow-[0px_8px_24px_-4px_rgba(36,43,38,0.06)]">
              {!isBooked ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C27D60] mb-1">
                      1-on-1 Clinical Guidance
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1F3D2B]">
                      Reserve an Ayurvedic Physician Consultation
                    </h2>
                    <p className="text-xs text-[#424843] mt-1 leading-relaxed">
                      Comprehensive constitutional assessment, personalized dietary pathya, and customized single-batch herbal compounding.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maya Devi"
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@sanctuary.com"
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      />
                    </div>

                    {/* Physician */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Select Physician
                      </label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      >
                        <option value="Dr. Ananya Sharma, BAMS, MD (Ayu)">Dr. Ananya Sharma, BAMS, MD (Ayu)</option>
                        <option value="Dr. Rajeshwar Bhatt, BAMS (Nadi Specialist)">Dr. Rajeshwar Bhatt, BAMS (Nadi Specialist)</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Health Focus */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                      Primary Constitutional Focus
                    </label>
                    <select
                      value={healthFocus}
                      onChange={(e) => setHealthFocus(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                    >
                      <option value="Digestive Fire & Agni Rehabilitation">Digestive Fire &amp; Agni Rehabilitation (Bloating, IBS, Sluggishness)</option>
                      <option value="Sleep Architecture & Adrenal Fatigue">Sleep Architecture &amp; Adrenal Fatigue (Insomnia, Vata Racing)</option>
                      <option value="Skin Cleansing & Pitta Pacification">Skin Cleansing &amp; Pitta Pacification (Acne, Eczema, Redness)</option>
                      <option value="Vital Reserve & Ojas Rejuvenation">Vital Reserve &amp; Ojas Rejuvenation (Immunity &amp; Chronic Stamina)</option>
                      <option value="Hormonal Equilibrium & Reproductive Tone">Hormonal Equilibrium &amp; Reproductive Tone (Shatavari / Rasayana)</option>
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Preferred Consultation Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                        Solar Time Window
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                      >
                        <option value="09:00 AM (Kapha Clarity)">09:00 AM (Kapha-Vata Transition)</option>
                        <option value="11:30 AM (Peak Solar Agni)">11:30 AM (Peak Solar Agni)</option>
                        <option value="03:30 PM (Vata Movement)">03:30 PM (Vata Afternoon Window)</option>
                        <option value="06:00 PM (Twilight Sandhya)">06:00 PM (Twilight Sandhya)</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1F3D2B] mb-1.5 uppercase tracking-wider text-[11px]">
                      Current Herbal Regimen or Specific Symptoms (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mention any existing remedies, medications, or specific dosha sensitivities..."
                      className="w-full bg-[#FFFFFF] border border-[#E2DDD4] rounded-lg px-3.5 py-2.5 text-xs text-[#242B26] focus:outline-none focus:ring-1.5 focus:ring-[#5E7A68]"
                    />
                  </div>

                  {/* Submission Row */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1F3D2B] hover:bg-[#082717] text-white text-xs font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Confirm 45-Minute Consultation Reservation</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">$120.00</span>
                    </button>
                    <p className="text-[11px] text-[#5E7A68] text-center mt-2.5">
                      Fee includes 45-minute live consultation plus 1 custom formulated herbal rasayana shipped to your door.
                    </p>
                  </div>
                </form>
              ) : (
                /* CONFIRMATION PASS */
                <div className="space-y-6 text-center animate-fadeIn">
                  <div className="w-14 h-14 bg-[#EEF6ED] rounded-full mx-auto flex items-center justify-center border border-[#cbead4]">
                    <CheckCircle2 className="w-8 h-8 text-[#1F3D2B]" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68]">
                      Consultation Confirmed
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1F3D2B] mt-1">
                      Your Vaidya Sanctuary Appointment is Secured
                    </h3>
                  </div>

                  {/* Pass Ticket Box */}
                  <div className="bg-[#F9F8F5] border border-[#E2DDD4] rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
                    <div className="flex justify-between pb-2 border-b border-[#E2DDD4]">
                      <span className="text-[#5E7A68]">Booking Reference:</span>
                      <span className="font-semibold text-[#1F3D2B] font-mono">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E2DDD4]">
                      <span className="text-[#5E7A68]">Client:</span>
                      <span className="font-semibold text-[#1F3D2B]">{name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E2DDD4]">
                      <span className="text-[#5E7A68]">Ayurvedic Physician:</span>
                      <span className="font-semibold text-[#1F3D2B]">{selectedDoctor}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E2DDD4]">
                      <span className="text-[#5E7A68]">Scheduled Time:</span>
                      <span className="font-semibold text-[#1F3D2B]">{preferredDate} at {preferredTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5E7A68]">Focus Area:</span>
                      <span className="font-medium text-[#1F3D2B] text-right">{healthFocus}</span>
                    </div>
                  </div>

                  {/* Pre-Consultation Instructions */}
                  <div className="p-4 bg-[#EEF6ED] rounded-xl border border-[#cbead4] text-left text-xs text-[#1F3D2B] space-y-2">
                    <span className="font-semibold uppercase tracking-wider text-[11px] block">
                      Pre-Consultation Preparation Guidelines:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-[#424843] list-disc list-inside">
                      <li>Fast for at least 90 minutes prior to appointment for optimal tongue and energetic assessment.</li>
                      <li>Avoid drinking hot coffee or staining beverages (tea/wine) on the morning of your reading.</li>
                      <li>Ensure your device is in a quiet space with natural indirect daylight illuminating your face.</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setIsBooked(false)}
                    className="text-xs font-semibold text-[#5E7A68] hover:text-[#1F3D2B] underline underline-offset-4 cursor-pointer"
                  >
                    Schedule Another Session or Modify Reservation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
