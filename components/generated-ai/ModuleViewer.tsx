import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, Terminal, X } from 'lucide-react';
import { ModuleData } from '../../generated-ai-types';

interface ModuleViewerProps {
  module: ModuleData;
  onComplete: () => void;
  onClose: () => void;
}

const ModuleViewer: React.FC<ModuleViewerProps> = ({ module, onComplete, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [completedInteractions, setCompletedInteractions] = useState<number[]>([]);
  const [expandedInteractions, setExpandedInteractions] = useState<number[]>([]);

  const isLastSlide = slideIndex === module.content.length - 1;
  const isInteractionModule = module.requiresInteraction && module.interactionData;

  const canComplete = !isInteractionModule || (isInteractionModule && completedInteractions.length === module.interactionData!.length);

  const handleNext = () => {
    if (isLastSlide) {
      if (canComplete) onComplete();
    } else {
      setSlideIndex(prev => prev + 1);
    }
  };

  const handleInteractionClick = (index: number) => {
    if (!completedInteractions.includes(index)) {
      setCompletedInteractions([...completedInteractions, index]);
    }

    if (expandedInteractions.includes(index)) {
      setExpandedInteractions(expandedInteractions.filter(i => i !== index));
    } else {
      setExpandedInteractions([...expandedInteractions, index]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-cyan-900/50 flex justify-between items-center bg-slate-900/50">
           <div className="flex items-center space-x-3">
             <Terminal className="text-cyan-400 w-5 h-5" />
             <h2 className="text-xl font-display font-bold tracking-wider text-cyan-100 uppercase">
               Decrypting: {module.title}
             </h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-full text-slate-400 hover:text-red-400 transition-colors">
             <X className="w-6 h-6" />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <AnimatePresence mode="wait">
             {!isInteractionModule ? (
               <motion.div
                 key={`slide-${slideIndex}`}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="text-cyan-500 text-sm font-mono mb-2">FRAGMENT {slideIndex + 1} / {module.content.length}</div>
                 <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                   {module.content[slideIndex].heading}
                 </h3>
                 <p className="text-lg md:text-xl text-slate-300 leading-relaxed border-l-4 border-cyan-500 pl-6">
                   {module.content[slideIndex].body}
                 </p>
               </motion.div>
             ) : (
               <motion.div
                 key="interaction"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="space-y-4"
               >
                 <h3 className="text-2xl font-bold text-white mb-4">{module.content[0].heading}</h3>
                 <p className="text-slate-300 mb-6">{module.content[0].body}</p>

                 <div className="grid gap-3">
                   {module.interactionData?.map((item, idx) => {
                     const isExpanded = expandedInteractions.includes(idx);
                     const isCompleted = completedInteractions.includes(idx);

                     return (
                       <div key={idx} className="border border-slate-700 rounded-lg overflow-hidden bg-slate-800/50">
                         <button
                           onClick={() => handleInteractionClick(idx)}
                           className={`w-full p-4 flex justify-between items-center transition-colors ${isCompleted ? 'bg-cyan-900/20' : 'hover:bg-slate-700'}`}
                         >
                           <div className="flex items-center gap-3">
                              {isCompleted && <CheckCircle className="w-4 h-4 text-cyan-500" />}
                              <span className={`font-bold ${isCompleted ? 'text-cyan-100' : 'text-slate-200'}`}>{item.title}</span>
                           </div>
                           <motion.div
                             animate={{ rotate: isExpanded ? 180 : 0 }}
                             transition={{ duration: 0.3 }}
                           >
                              <ChevronDown className="w-5 h-5 text-slate-400" />
                           </motion.div>
                         </button>
                         <AnimatePresence initial={false}>
                           {isExpanded && (
                             <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              style={{ overflow: "hidden" }}
                              className="bg-slate-900/50 border-t border-slate-700/50"
                             >
                               <div className="p-4 text-slate-300">
                                 {item.content}
                               </div>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                     );
                   })}
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-cyan-900/50 bg-slate-900 flex justify-between items-center">
           <div className="flex gap-1">
             {!isInteractionModule && module.content.map((_, i) => (
               <div key={i} className={`h-1.5 w-8 rounded-full ${i <= slideIndex ? 'bg-cyan-400' : 'bg-slate-700'}`} />
             ))}
             {isInteractionModule && (
                <div className="text-sm text-slate-400 font-mono">
                  PROTOCOLS SECURED: {completedInteractions.length} / {module.interactionData?.length}
                </div>
             )}
           </div>

           <button
             onClick={handleNext}
             disabled={!canComplete && isLastSlide}
             className={`
               flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all
               ${(!canComplete && isLastSlide)
                 ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                 : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'}
             `}
           >
             <span>{isLastSlide ? 'COMPLETE DOWNLOAD' : 'NEXT FRAGMENT'}</span>
             {isLastSlide ? <CheckCircle className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModuleViewer;
