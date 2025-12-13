import React from 'react';
import { ChevronLeft, ChevronRight, Home, Zap, Move, Languages } from 'lucide-react';
import { NavigationProps } from '../types';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC<NavigationProps> = ({
  currentSlideIndex,
  totalSlides,
  onNext,
  onPrev,
  onHome,
  slideTitle
}) => {
  const { language, setLanguage, t } = useLanguage();
  const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
  const xpEarned = (currentSlideIndex + 1) * 100; // 100 XP per mission

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      dragConstraints={{
        top: -window.innerHeight / 2 + 50,
        bottom: window.innerHeight / 2 - 100,
        left: -window.innerWidth / 2 + 150,
        right: window.innerWidth / 2 - 150
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[85%] max-w-2xl z-50 cursor-move"
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
    >
      <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-xl shadow-purple-900/20 p-2 flex flex-col gap-2 transition-all hover:border-purple-500/40 relative group">

        {/* Drag Handle Indicator */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-600 rounded-b text-white">
            <Move size={10} />
            <span className="text-[8px] font-bold uppercase tracking-wider">{t('nav.dragToMove')}</span>
          </div>
        </div>

        {/* Top Row: Controls & Title */}
        <div className="flex items-center justify-between gap-4">

          {/* Left Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleLanguage}
              className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all group relative"
              title={language === 'en' ? '切換至繁體中文' : 'Switch to English'}
            >
              <Languages size={16} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-cyan-400 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                {language === 'en' ? '中文' : 'EN'}
              </span>
            </button>
            <div className="w-px h-4 bg-slate-700 mx-0.5"></div>
            <button
              onClick={onHome}
              className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-slate-800 rounded-lg transition-all group"
              title="Return to Mission Map"
            >
              <Home size={16} className="group-hover:scale-110 transition-transform" />
            </button>
            <div className="w-px h-4 bg-slate-700 mx-0.5"></div>
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              title="Previous Mission (←)"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Center: Mission Info & XP */}
          <div className="flex-1 flex items-center justify-center gap-2">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[10px] font-bold font-mono text-purple-400 uppercase tracking-wide">
                  {t('nav.mission')} {currentSlideIndex + 1} / {totalSlides}
                </span>
                <span className="px-1.5 py-0.5 bg-purple-900/50 border border-purple-500/30 rounded text-[9px] font-bold text-purple-300">
                  {t('nav.level')} {currentSlideIndex + 1}
                </span>
              </div>
            </div>
          </div>

          {/* Right: XP & Next */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-lg">
              <Zap size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-bold text-yellow-400">{xpEarned}</span>
            </div>
            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all shadow-lg shadow-purple-900/30 active:scale-95 disabled:opacity-50 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed"
              title="Next Mission (→)"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Row: XP Progress Bar */}
        <div className="w-full">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
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
      <div className="text-center mt-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
         <span className="text-[9px] text-slate-500 bg-slate-950/80 border border-slate-800 px-2 py-1 rounded font-mono">
           {t('nav.arrowKeys')}
         </span>
      </div>
    </motion.div>
  );
};

export default Navigation;
