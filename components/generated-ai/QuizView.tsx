import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Cpu } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../generated-ai-constants';

interface QuizViewProps {
  onComplete: (score: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQIndex];

  const handleAnswer = (index: number) => {
    if (showFeedback) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentQ.correctAnswerIndex;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  if (isFinished) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800/90 border-2 border-cyan-500 rounded-3xl p-12 text-center max-w-2xl backdrop-blur-xl shadow-2xl shadow-cyan-500/20"
        >
          <Cpu className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-white mb-2">SIMULATION COMPLETE</h2>
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
            {percentage}%
          </div>
          <p className="text-slate-300 text-lg mb-8">
            {percentage >= 80
              ? "EXCELLENT WORK, AGENT. DR. LI'S VISION IS SECURE."
              : "ANALYSIS INCOMPLETE. REVIEW DATA FRAGMENTS."}
          </p>
          <button
            onClick={() => onComplete(score)}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transition-transform hover:scale-105"
          >
            RETURN TO BASE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className="mb-8">
          <div className="flex justify-between text-cyan-400 font-mono mb-2">
            <span>VERIFICATION PROTOCOL</span>
            <span>{currentQIndex + 1}/{QUIZ_QUESTIONS.length}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentQ.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-slate-900/80 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-md"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {currentQ.question}
          </h2>

          <div className="grid gap-4">
            {currentQ.answers.map((answer, idx) => {
              let btnClass = "bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300";

              if (showFeedback) {
                if (idx === currentQ.correctAnswerIndex) {
                  btnClass = "bg-green-900/50 border-green-500 text-green-100";
                } else if (selectedAnswer === idx) {
                  btnClass = "bg-red-900/50 border-red-500 text-red-100";
                } else {
                  btnClass = "opacity-50 grayscale";
                }
              } else if (selectedAnswer === idx) {
                btnClass = "bg-cyan-900/50 border-cyan-500 text-cyan-100";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showFeedback}
                  className={`
                    w-full text-left p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between
                    ${btnClass}
                  `}
                >
                  <span className="text-lg font-medium">{answer}</span>
                  {showFeedback && idx === currentQ.correctAnswerIndex && <Check className="text-green-400" />}
                  {showFeedback && idx === selectedAnswer && idx !== currentQ.correctAnswerIndex && <X className="text-red-400" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizView;
