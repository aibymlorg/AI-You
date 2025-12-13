import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { INTRO_TEXT } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [lineIndex, setLineIndex] = useState(0);
  
  useEffect(() => {
    if (lineIndex < INTRO_TEXT.length) {
      const timeout = setTimeout(() => {
        setLineIndex(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(onComplete, 2000);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, onComplete]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono p-8 text-center cursor-pointer" onClick={onComplete}>
      <div className="space-y-4 max-w-2xl">
        {INTRO_TEXT.map((text, idx) => (
          idx <= lineIndex && (
            <motion.div
              key={idx}
              initial={{ opacity: 0, borderRight: "2px solid #00f5d4" }}
              animate={{ opacity: 1, borderRight: "0px solid transparent" }}
              transition={{ duration: 0.5 }}
              className={`text-lg md:text-2xl ${idx === INTRO_TEXT.length - 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}
            >
              {text}
            </motion.div>
          )
        ))}
      </div>
      
      {lineIndex === INTRO_TEXT.length && (
         <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ repeat: Infinity, duration: 1 }}
           className="mt-12 text-sm text-slate-600 animate-pulse"
         >
           CLICK TO INITIALIZE INTERFACE
         </motion.div>
      )}
    </div>
  );
};

export default Intro;