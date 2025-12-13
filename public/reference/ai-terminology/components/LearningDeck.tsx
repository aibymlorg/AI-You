import React, { useState } from 'react';
import { TERMS } from '../constants';
import { Brain, Database, Network, Bot, Search, Server, Sparkles, Zap, ChevronRight, ChevronLeft } from 'lucide-react';
import { TermDefinition } from '../types';

interface LearningDeckProps {
  onComplete: () => void;
}

const iconMap = {
  brain: Brain,
  database: Database,
  network: Network,
  robot: Bot,
  search: Search,
  server: Server,
  sparkles: Sparkles,
  zap: Zap
};

const LearningDeck: React.FC<LearningDeckProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    if (currentIndex < TERMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentTerm: TermDefinition = TERMS[currentIndex];
  const Icon = iconMap[currentTerm.iconType];

  const progress = ((currentIndex + 1) / TERMS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-cyan-400 text-xs font-display mb-2 uppercase tracking-widest">
          <span>Module Progress</span>
          <span>{currentIndex + 1} / {TERMS.length}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 md:p-12 min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden group transition-all duration-300 hover:border-cyan-500/50">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon size={200} className="text-cyan-400" />
        </div>

        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-950 rounded-lg border border-cyan-700 text-cyan-400">
              <Icon size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-wide">{currentTerm.title}</h2>
              <p className="text-cyan-400 font-mono text-sm mt-1 uppercase tracking-widest">{currentTerm.shortDef}</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            <p className="border-l-4 border-cyan-500 pl-4 bg-cyan-950/20 py-2 rounded-r-md">
              {currentTerm.fullDef}
            </p>
            <div className="bg-violet-950/30 border border-violet-500/30 p-4 rounded-xl">
              <h3 className="text-violet-300 font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Sparkles size={14} /> Relatable Analogy
              </h3>
              <p className="italic text-violet-100">"{currentTerm.analogy}"</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8 flex justify-between items-center">
          <button 
            onClick={prevCard} 
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-display font-semibold ${currentIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
          >
            <ChevronLeft /> Prev
          </button>
          
          <button 
            onClick={nextCard}
            className="group flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all font-display font-bold shadow-lg shadow-cyan-900/50"
          >
            {currentIndex === TERMS.length - 1 ? 'Start Mission' : 'Next Data'}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningDeck;