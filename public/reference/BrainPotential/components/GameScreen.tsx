import React, { useState } from 'react';
import type { Challenge } from '../types';
import { Target, ChallengeCategory } from '../types';
import DropZone from './DropZone';
import ChallengeCard from './ChallengeCard';
import { HintIcon } from './Icons';

interface GameScreenProps {
  challenge: Challenge;
  onAnswer: (challengeId: number, droppedOn: Target) => void;
  progress: { current: number; total: number };
  hintUsed: boolean;
  isHintVisible: boolean;
  onUseHint: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ challenge, onAnswer, progress, hintUsed, isHintVisible, onUseHint }) => {
  const [isDragging, setIsDragging] = useState(false);

  const getCategoryText = (category: ChallengeCategory) => {
    switch(category) {
      case ChallengeCategory.Fact: return '事實';
      case ChallengeCategory.UseCase: return '應用場景';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-2xl mb-2">
        <div className="flex justify-between items-center mb-2">
            <h2 className="font-display text-cyan-400">問題 {progress.current} / {progress.total}</h2>
            <div className="w-1/2 h-2 bg-gray-700 rounded-full">
                <div 
                    className="h-2 bg-cyan-400 rounded-full transition-all duration-500" 
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}>
                </div>
            </div>
        </div>
         <div className="flex justify-end mt-2">
            <button
                onClick={onUseHint}
                disabled={hintUsed}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-yellow-300 bg-yellow-900/50 border border-yellow-500/50 rounded-full transition-all duration-300 hover:bg-yellow-800/70 hover:text-yellow-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-yellow-900/50"
                aria-label="Get a hint (once per game)"
            >
                <HintIcon className="w-5 h-5" />
                <span>提示 (每局一次)</span>
            </button>
        </div>
      </div>
      
      <div className="h-8 mb-2 flex items-center justify-center">
        {isHintVisible && (
          <div className="bg-gray-700/50 text-yellow-300 px-4 py-1 rounded-full text-sm font-medium">
            提示：類別是 “{getCategoryText(challenge.category)}”
          </div>
        )}
      </div>

      <div className="mb-10 w-full flex justify-center">
        <ChallengeCard
          challenge={challenge}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <DropZone
          target={Target.Brain}
          onDrop={onAnswer}
          isDragging={isDragging}
        />
        <DropZone
          target={Target.LLM}
          onDrop={onAnswer}
          isDragging={isDragging}
        />
      </div>
    </div>
  );
};

export default GameScreen;