import React, { useState, useEffect } from 'react';
import { TERMS } from '../constants';
import { CardItem } from '../types';
import { ShieldCheck, BrainCircuit, Activity, Zap } from 'lucide-react';

interface QuizChallengeProps {
  onComplete: (score: number) => void;
}

const MemoryMatrix: React.FC<QuizChallengeProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Initialize Game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs
    const deck: CardItem[] = [];
    TERMS.forEach((term, index) => {
      // Card 1: The Term
      deck.push({
        id: index * 2,
        termId: term.id,
        content: term.cardTerm,
        type: 'term',
        status: 'hidden'
      });
      // Card 2: The Definition
      deck.push({
        id: index * 2 + 1,
        termId: term.id,
        content: term.cardDefinition,
        type: 'def',
        status: 'hidden'
      });
    });

    // Shuffle Fisher-Yates
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setMatchedCount(0);
    setMoves(0);
    setFlippedCards([]);
    setIsLocked(false);
  };

  const handleCardClick = (clickedCard: CardItem) => {
    // Ignore if board is locked, card is already flipped/matched, or clicking same card
    if (
      isLocked || 
      clickedCard.status !== 'hidden' || 
      flippedCards.some(c => c.id === clickedCard.id)
    ) return;

    // Flip the card
    const newCards = cards.map(c => 
      c.id === clickedCard.id ? { ...c, status: 'flipped' as const } : c
    );
    setCards(newCards);
    
    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    // Check for match if 2 cards flipped
    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsLocked(true);
      checkForMatch(newFlipped[0], newFlipped[1]);
    }
  };

  const checkForMatch = (card1: CardItem, card2: CardItem) => {
    if (card1.termId === card2.termId) {
      // Match found
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          (c.id === card1.id || c.id === card2.id) 
            ? { ...c, status: 'matched' as const } 
            : c
        ));
        setFlippedCards([]);
        setIsLocked(false);
        setMatchedCount(prev => {
          const newCount = prev + 1;
          if (newCount === TERMS.length) {
            setTimeout(() => onComplete(TERMS.length * 2), 1000); // Pass a score (max possible)
          }
          return newCount;
        });
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          (c.id === card1.id || c.id === card2.id) 
            ? { ...c, status: 'hidden' as const } 
            : c
        ));
        setFlippedCards([]);
        setIsLocked(false);
      }, 1500);
    }
  };

  const progress = (matchedCount / TERMS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      {/* HUD */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className="text-slate-400 text-sm font-display uppercase hidden md:block">Neural Sync</div>
          <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-green-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="font-mono text-cyan-400 font-bold">{Math.round(progress)}%</div>
        </div>
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex items-center justify-between">
            <span className="text-slate-400 text-sm font-display uppercase">Moves</span>
            <span className="font-mono text-violet-400 font-bold text-xl">{moves}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3 md:gap-4 aspect-square md:aspect-auto">
        {cards.map((card) => {
          const isHidden = card.status === 'hidden';
          const isMatched = card.status === 'matched';
          const isFlipped = card.status === 'flipped';

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={!isHidden}
              className={`
                relative w-full h-24 md:h-32 rounded-xl border-2 transition-all duration-500 perspective-1000 group
                ${isHidden 
                  ? 'bg-slate-800 border-slate-700 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                  : isMatched 
                    ? 'bg-green-900/20 border-green-500/50 opacity-50 cursor-default' 
                    : 'bg-slate-800 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                }
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center p-2">
                {isHidden ? (
                  <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                    <BrainCircuit size={24} className="text-cyan-400" />
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  </div>
                ) : (
                  <div className={`text-center animate-in fade-in zoom-in duration-300 ${isMatched ? 'text-green-300' : 'text-white'}`}>
                    {card.type === 'term' ? (
                       <span className="font-display font-bold text-lg md:text-2xl text-cyan-300 leading-tight block tracking-wider">{card.content}</span>
                    ) : (
                       <span className="font-sans text-[10px] md:text-xs text-slate-200 leading-tight block">{card.content}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Status Indicator */}
              {isMatched && (
                <div className="absolute top-1 right-1 text-green-500 animate-in zoom-in">
                  <ShieldCheck size={14} />
                </div>
              )}
              {isFlipped && !isMatched && (
                 <div className="absolute top-1 right-1 text-cyan-500 animate-pulse">
                   <Activity size={14} />
                 </div>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Footer Info */}
      <div className="text-center mt-8 text-slate-500 text-xs uppercase tracking-widest font-display">
        System Logic: Match Term to Definition
      </div>
    </div>
  );
};

export default MemoryMatrix;