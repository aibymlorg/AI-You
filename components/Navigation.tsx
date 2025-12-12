import React from 'react';
import { ChevronLeft, ChevronRight, Home, Zap } from 'lucide-react';
import { NavigationProps } from '../types';

const Navigation: React.FC<NavigationProps> = ({
  currentSlideIndex,
  totalSlides,
  onNext,
  onPrev,
  onHome,
  slideTitle
}) => {
  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
  const xpEarned = (currentSlideIndex + 1) * 100; // 100 XP per mission

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-50">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-900/20 p-4 flex flex-col gap-3 transition-all hover:border-purple-500/40">

        {/* Top Row: Controls & Title */}
        <div className="flex items-center justify-between gap-4">

          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onHome}
              className="p-2 text-slate-400 hover:text-purple-400 hover:bg-slate-800 rounded-lg transition-all group"
              title="Return to Mission Map"
            >
              <Home size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Mission (←)"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Center: Mission Info & XP */}
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-bold font-mono text-purple-400 uppercase tracking-wider">
                  MISSION {currentSlideIndex + 1} / {totalSlides}
                </span>
                <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-500/30 rounded text-[10px] font-bold text-purple-300">
                  LEVEL {currentSlideIndex + 1}
                </span>
              </div>
              <span className="text-xs font-semibold text-white truncate block max-w-md">
                {slideTitle}
              </span>
            </div>
          </div>

          {/* Right: XP & Next */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">{xpEarned} XP</span>
            </div>
            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all shadow-lg shadow-purple-900/30 active:scale-95 disabled:opacity-50 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed"
              title="Next Mission (→)"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Row: XP Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mission Progress</span>
            <span className="text-[10px] font-mono text-purple-400">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Keyboard Hint */}
      <div className="text-center mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
         <span className="text-[10px] text-slate-500 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg font-mono">
           ← → Arrow Keys to Navigate
         </span>
      </div>
    </div>
  );
};

export default Navigation;
