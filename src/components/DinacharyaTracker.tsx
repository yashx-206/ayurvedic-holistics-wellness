import React, { useState } from 'react';
import { Check, Clock, Sparkles, Sun, Moon, Calendar, Flame, Droplets, Wind, RotateCcw } from 'lucide-react';
import { DINACHARYA_SCHEDULE } from '../data/ayurvedaData';

export const DinacharyaTracker: React.FC = () => {
  const [completedRituals, setCompletedRituals] = useState<Record<string, boolean>>({
    'brahma-muhurta': true,
    'jihwa-gandusha': true,
  });

  const toggleRitual = (id: string) => {
    setCompletedRituals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleResetDay = () => {
    setCompletedRituals({});
  };

  const completedCount = Object.values(completedRituals).filter(Boolean).length;
  const totalCount = DINACHARYA_SCHEDULE.length;
  const percentCompleted = Math.round((completedCount / totalCount) * 100);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5E7A68] mb-2">
            Circadian Alignment &amp; Living Wisdom
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F3D2B]">
            Dinacharya Daily Ritual Tracker
          </h2>
          <p className="text-sm text-[#424843] mt-2 leading-relaxed">
            In Ayurvedic medicine, health is not an accident—it is the direct consequence of rhythm. Sync your biological clock with nature’s doshic shifts.
          </p>
        </div>

        {/* Daily Completion Meter Card */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-8 shadow-[0px_2px_8px_-2px_rgba(36,43,38,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E2DDD4] gap-4">
            <div>
              <div className="text-xs text-[#5E7A68] font-semibold uppercase tracking-wider">
                Today's Sacred Routine Progress
              </div>
              <div className="font-serif text-2xl text-[#1F3D2B] mt-0.5">
                {completedCount} of {totalCount} Rituals Honored
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif font-bold text-[#1F3D2B] tabular-nums">
                {percentCompleted}%
              </span>
              <button
                onClick={handleResetDay}
                className="text-xs text-[#5E7A68] hover:text-[#1F3D2B] p-2 hover:bg-[#EEF6ED] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset checkmarks"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="w-full bg-[#EEF6ED] h-2 rounded-full overflow-hidden mt-6">
            <div
              className="bg-[#1F3D2B] h-full rounded-full transition-all duration-500"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>

          {/* Interactive Checklist */}
          <div className="space-y-4 mt-8">
            {DINACHARYA_SCHEDULE.map((ritual) => {
              const isDone = !!completedRituals[ritual.id];

              return (
                <div
                  key={ritual.id}
                  onClick={() => toggleRitual(ritual.id)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-[#EEF6ED]/70 border-[#cbead4]'
                      : 'bg-[#FFFFFF] border-[#E2DDD4] hover:bg-[#F9F8F5]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Custom 22px checkbox */}
                    <div
                      className={`w-5.5 h-5.5 rounded-md mt-0.5 shrink-0 flex items-center justify-center transition-colors border ${
                        isDone
                          ? 'bg-[#1F3D2B] border-[#1F3D2B] text-white'
                          : 'border-[#E2DDD4] bg-white'
                      }`}
                    >
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-[#5E7A68] uppercase tracking-wider tabular-nums">
                          {ritual.time}
                        </span>
                        <span aria-hidden="true" className="text-[#E2DDD4]">·</span>
                        <span className="text-xs italic text-[#5E7A68]">
                          {ritual.sanskritName}
                        </span>
                      </div>
                      <h4 className={`font-serif text-base font-semibold ${
                        isDone ? 'text-[#1F3D2B] line-through opacity-80' : 'text-[#1F3D2B]'
                      }`}>
                        {ritual.englishTitle}
                      </h4>
                      <p className="text-xs text-[#424843] max-w-xl leading-relaxed">
                        {ritual.description}
                      </p>
                    </div>
                  </div>

                  {/* Botanical affinity tag */}
                  <div className="sm:text-right shrink-0 pl-9 sm:pl-0">
                    <span className="text-[10px] font-semibold text-[#5E7A68] uppercase tracking-wider block">
                      Recommended Herb
                    </span>
                    <span className="text-xs font-medium text-[#1F3D2B]">
                      {ritual.recommendedHerbs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ritucharya (Seasonal Wisdom) Module */}
        <div className="bg-[#FFFFFF] border border-[#E2DDD4] rounded-2xl p-6 sm:p-8 shadow-[0px_2px_8px_-2px_rgba(36,43,38,0.04)]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#C27D60] tracking-widest uppercase mb-1">
            <Calendar className="w-4 h-4" />
            <span>Ritucharya · Seasonal Almanac</span>
          </div>
          <h3 className="font-serif text-2xl text-[#1F3D2B] mb-2">
            Sharad Ritu: The Autumnal Pacification Period
          </h3>
          <p className="text-xs sm:text-sm text-[#424843] leading-relaxed max-w-3xl mb-6">
            As the monsoons recede and the sharp autumn sun blazes upon wet soils, accumulated Pitta fire naturally surges to the surface. It is the classical season for Virechana (cleansing) and bitter, cooling herbs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#E2DDD4] text-xs">
            <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] space-y-2">
              <span className="font-semibold text-[#1F3D2B] uppercase tracking-wider text-[11px] block">
                Primary Doshic Tendency
              </span>
              <p className="text-[#424843]">
                Pitta aggravation (internal burning, irritability, skin eruptions, and acidity).
              </p>
            </div>

            <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] space-y-2">
              <span className="font-semibold text-[#1F3D2B] uppercase tracking-wider text-[11px] block">
                Seasonal Pathya (Diet)
              </span>
              <p className="text-[#424843]">
                Madhura (Sweet), Tikta (Bitter), and Kashaya (Astringent). Pure Desi cow ghee, basmati rice, moonlit water (Hamsodaka), and ripe pomegranate.
              </p>
            </div>

            <div className="p-4 bg-[#F9F8F5] rounded-xl border border-[#E2DDD4] space-y-2">
              <span className="font-semibold text-[#1F3D2B] uppercase tracking-wider text-[11px] block">
                Herbal Protocol
              </span>
              <p className="text-[#424843]">
                Triphala churna at dusk, Brahmi before sleep, and sandalwood paste applied to forehead and pulse points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
