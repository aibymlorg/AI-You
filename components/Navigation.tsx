import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
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

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-50">
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 transition-all hover:bg-slate-900/95">
        
        {/* Top Row: Controls & Title */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={onHome}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Return to Start"
            >
              <Home size={20} />
            </button>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          {/* Center Title */}
          <div className="flex-1 text-center truncate">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Module {currentSlideIndex + 1}
            </span>
            <span className="text-xs font-semibold text-white truncate">
              {slideTitle}
            </span>
          </div>

          {/* Right Controls */}
          <div>
            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 bg-blue-600 text-white hover:bg-blue-500 rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-50 disabled:bg-slate-700 disabled:cursor-not-allowed"
              title="Next Slide (Right Arrow)"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Bottom Row: Progress Bar */}
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

      </div>
      
      {/* Keyboard Hint */}
      <div className="text-center mt-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
         <span className="text-[10px] text-slate-500 bg-black/50 px-2 py-1 rounded">
           Use Keyboard Arrows to Navigate
         </span>
      </div>
    </div>
  );
};

export default Navigation;
