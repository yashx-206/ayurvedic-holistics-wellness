import React, { useState, useEffect } from 'react';
import { Sun, Moon, Clock, Sparkles, Droplets, Flame, Wind } from 'lucide-react';

interface ClockSegment {
  id: string;
  timeRange: string;
  startHour: number;
  endHour: number;
  dosha: 'Kapha' | 'Pitta' | 'Vata';
  subtext: string;
  quality: string;
  dominantElements: string;
  optimalPractice: string;
  herbalAffinity: string;
}

const SEGMENTS: ClockSegment[] = [
  {
    id: 'kapha-morning',
    timeRange: '06:00 – 10:00',
    startHour: 6,
    endHour: 10,
    dosha: 'Kapha',
    subtext: 'Morning Earth Awakening',
    quality: 'Heavy, Stable, Cool, Dense',
    dominantElements: 'Earth (Prithvi) & Water (Jala)',
    optimalPractice: 'Awaken before 6 AM, scrap the tongue, warm oil pulling, vigorous sun salutations to counteract morning heaviness.',
    herbalAffinity: 'Warm ginger-lemon decoction or Tulsi Holy Basil with black pepper.',
  },
  {
    id: 'pitta-midday',
    timeRange: '10:00 – 14:00',
    startHour: 10,
    endHour: 14,
    dosha: 'Pitta',
    subtext: 'Solar Fire & Peak Agni',
    quality: 'Hot, Sharp, Penetrating, Transformative',
    dominantElements: 'Fire (Tejas) & Water (Jala)',
    optimalPractice: 'Partake in your largest meal of the day; execute high-focus analytical work; avoid intense sun exposure.',
    herbalAffinity: 'Cumin-Coriander-Fennel (CCF) tisane or Amalaki juice before food.',
  },
  {
    id: 'vata-afternoon',
    timeRange: '14:00 – 18:00',
    startHour: 14,
    endHour: 18,
    dosha: 'Vata',
    subtext: 'Creative Wind & Mental Agility',
    quality: 'Light, Mobile, Dry, Expansive',
    dominantElements: 'Air (Vayu) & Ether (Akasha)',
    optimalPractice: 'Ideation, writing, creative synthesis; sip warm water to prevent nervous depletion; avoid cold dry snacks.',
    herbalAffinity: 'Warm licorice or Brahmi Shankhpushpi drops for sustained mental poise.',
  },
  {
    id: 'kapha-evening',
    timeRange: '18:00 – 22:00',
    startHour: 18,
    endHour: 22,
    dosha: 'Kapha',
    subtext: 'Grounding Dusk & Serene Sanctuary',
    quality: 'Slow, Heavy, Unctuous, Cohesive',
    dominantElements: 'Water (Jala) & Earth (Prithvi)',
    optimalPractice: 'Early light supper by 7 PM; dim ambient lighting; warm foot oil massage (Padabhyanga); prepare for deep rest.',
    herbalAffinity: 'Triphala Churna steeped in warm water followed by Golden Turmeric Milk.',
  },
  {
    id: 'pitta-night',
    timeRange: '22:00 – 02:00',
    startHour: 22,
    endHour: 2, // wraps around
    dosha: 'Pitta',
    subtext: 'Nocturnal Cellular Purification',
    quality: 'Internal Heat, Metabolic Cleansing',
    dominantElements: 'Internal Fire (Bhuta Agni)',
    optimalPractice: 'Deep slumber is essential; the liver filters toxins and reconstructs tissue layers; avoid late-night screens and meals.',
    herbalAffinity: 'Ashwagandha KSM-66 taken 45 minutes before sleep with a pinch of nutmeg.',
  },
  {
    id: 'vata-dawn',
    timeRange: '02:00 – 06:00',
    startHour: 2,
    endHour: 6,
    dosha: 'Vata',
    subtext: 'Brahma Muhurta & Cosmic Prana',
    quality: 'Subtle, Clear, Pure (Sattvic)',
    dominantElements: 'Pure Ether (Akasha) & Prana',
    optimalPractice: 'Lucid awareness, deep spiritual contemplation, meditation, rising in reverence before the solar disc appears.',
    herbalAffinity: 'Pure overnight copper-steeped water (Ushapan) sipped at room temperature.',
  },
];

export const DoshaClock: React.FC = () => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>('kapha-morning');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Determine current active segment
  useEffect(() => {
    const hour = currentHour;
    let activeId = 'kapha-morning';
    if (hour >= 6 && hour < 10) activeId = 'kapha-morning';
    else if (hour >= 10 && hour < 14) activeId = 'pitta-midday';
    else if (hour >= 14 && hour < 18) activeId = 'vata-afternoon';
    else if (hour >= 18 && hour < 22) activeId = 'kapha-evening';
    else if (hour >= 22 || hour < 2) activeId = 'pitta-night';
    else if (hour >= 2 && hour < 6) activeId = 'vata-dawn';

    setSelectedSegmentId(activeId);
  }, [currentHour]);

  const selectedSegment =
    SEGMENTS.find((s) => s.id === selectedSegmentId) || SEGMENTS[0];

  const getDoshaIcon = (dosha: 'Kapha' | 'Pitta' | 'Vata') => {
    switch (dosha) {
      case 'Kapha':
        return <Droplets className="w-4 h-4 text-[#496453]" />;
      case 'Pitta':
        return <Flame className="w-4 h-4 text-[#C27D60]" />;
      case 'Vata':
        return <Wind className="w-4 h-4 text-[#5E7A68]" />;
    }
  };

  const getDoshaBg = (dosha: 'Kapha' | 'Pitta' | 'Vata', isSelected: boolean) => {
    if (isSelected) {
      if (dosha === 'Kapha') return 'bg-[#cbead4] text-[#052013] border-[#496453]';
      if (dosha === 'Pitta') return 'bg-[#ffdbcd] text-[#360f00] border-[#C27D60]';
      return 'bg-[#e3eae2] text-[#1F3D2B] border-[#1F3D2B]';
    }
    return 'bg-[#FFFFFF] text-[#424843] border-[#E2DDD4] hover:bg-[#EEF6ED]';
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-xl p-6 sm:p-8 shadow-[0px_2px_8px_-2px_rgba(36,43,38,0.04)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E2DDD4] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5E7A68] tracking-widest uppercase mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Circadian Dinacharya Wheel</span>
          </div>
          <h3 className="font-serif text-2xl text-[#1F3D2B]">
            Ayurvedic Solar Rhythm Clock
          </h3>
        </div>

        {/* Current Time Callout */}
        <div className="flex items-center gap-3 bg-[#F9F8F5] border border-[#E2DDD4] rounded-lg px-4 py-2 self-start md:self-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1F3D2B] animate-pulse" />
          <div className="text-xs text-[#424843]">
            <span>Current Solar Time: </span>
            <span className="font-semibold text-[#1F3D2B] tabular-nums">
              {currentTimeStr || '10:45 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* Cycle Segment Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-6">
        {SEGMENTS.map((seg) => {
          const isSelected = seg.id === selectedSegmentId;
          return (
            <button
              key={seg.id}
              onClick={() => setSelectedSegmentId(seg.id)}
              className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${getDoshaBg(
                seg.dosha,
                isSelected
              )}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold tracking-wider tabular-nums">
                  {seg.timeRange}
                </span>
                {getDoshaIcon(seg.dosha)}
              </div>
              <div className="text-xs font-bold">{seg.dosha} Phase</div>
              <div className="text-[11px] opacity-80 truncate">{seg.subtext}</div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-[#F9F8F5] rounded-lg p-5 sm:p-6 border border-[#E2DDD4] transition-all">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[#E2DDD4]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-[#1F3D2B]">
              {selectedSegment.dosha} Cycle: {selectedSegment.subtext}
            </span>
            <span className="text-xs text-[#5E7A68] tabular-nums">
              ({selectedSegment.timeRange})
            </span>
          </div>
          <div className="text-xs text-[#424843]">
            <span className="font-semibold">Elements: </span>
            <span>{selectedSegment.dominantElements}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs text-[#424843] leading-relaxed">
          <div>
            <span className="block font-semibold text-[#1F3D2B] mb-1 uppercase tracking-wider text-[10px]">
              Optimal Dinacharya Action
            </span>
            <p>{selectedSegment.optimalPractice}</p>
          </div>
          <div>
            <span className="block font-semibold text-[#1F3D2B] mb-1 uppercase tracking-wider text-[10px]">
              Herbal Infusion & Carrier Affinity
            </span>
            <p className="text-[#1F3D2B] font-medium">{selectedSegment.herbalAffinity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
