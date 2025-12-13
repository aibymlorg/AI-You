import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { BalloonEntity, Question } from '../../ai-balloon-types';
import { BALLOON_COLORS } from '../../ai-balloon-constants';
import Balloon from './Balloon';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAIBalloonQuestions } from '../../utils/questionTranslations';

interface GameEngineProps {
  onGameOver: (score: number, total: number) => void;
  onVictory: (score: number) => void;
}

const SPAWN_INTERVAL = 3000;
const MAX_MISSES = 5;
const MAX_MISTAKES = 3;

const GameEngine: React.FC<GameEngineProps> = ({ onGameOver, onVictory }) => {
  const { t } = useLanguage();
  const QUIZ_DATA = useMemo(() => getAIBalloonQuestions(t), [t]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [balloons, setBalloons] = useState<BalloonEntity[]>([]);
  const [score, setScore] = useState(0);

  const [misses, setMisses] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const [isSpawning, setIsSpawning] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const gameLoopRef = useRef<(time: number) => void>();

  const currentQuestion: Question = QUIZ_DATA[currentQuestionIndex];
  const isGameOver = misses >= MAX_MISSES || mistakes >= MAX_MISTAKES;

  const spawnBalloons = useCallback(() => {
    if (!currentQuestion) return;

    const newBalloons: BalloonEntity[] = currentQuestion.options.map((option, index) => {
      const randomX = 10 + Math.random() * 80;
      const randomY = -10 - (Math.random() * 20);

      return {
        id: `${currentQuestion.id}-${option.id}-${Math.random()}`,
        optionId: option.id,
        x: randomX,
        y: randomY,
        speed: 0.15 + (currentQuestionIndex * 0.02) + (Math.random() * 0.1),
        isBursting: false,
        isSaved: false,
        color: BALLOON_COLORS[index % BALLOON_COLORS.length]
      };
    });

    const segmentSize = 100 / newBalloons.length;
    newBalloons.forEach((b, i) => {
      b.x = (segmentSize * i) + (segmentSize / 2);
      b.x += (Math.random() * 10 - 5);
    });

    setBalloons(newBalloons);
    setIsSpawning(false);
  }, [currentQuestion, currentQuestionIndex]);


  const handleBalloonClick = (balloonId: string, optionId: string) => {
    if (!currentQuestion || isGameOver) return;

    const balloon = balloons.find(b => b.id === balloonId);
    if (!balloon || balloon.isBursting || balloon.isSaved) return;

    if (optionId === currentQuestion.correctAnswerId) {
      setScore(prev => prev + 10);
      setBalloons(prev => prev.map(b => b.id === balloonId ? { ...b, isSaved: true } : b));
      setMessage("Correct! +10");

      setTimeout(() => {
        setMessage(null);
        if (currentQuestionIndex + 1 < QUIZ_DATA.length) {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsSpawning(true);
        } else {
          onVictory(score + 10);
        }
      }, 1000);
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);

      setBalloons(prev => prev.map(b => b.id === balloonId ? { ...b, isBursting: true } : b));
      setMessage(`Wrong Choice! Error ${newMistakes}/${MAX_MISTAKES}`);

      setTimeout(() => {
          setMessage(null);
      }, 1000);
    }
  };

  const gameLoop = useCallback((time: number) => {
    if (isGameOver) return;

    if (isSpawning) {
      spawnBalloons();
      requestRef.current = requestAnimationFrame(t => gameLoopRef.current?.(t));
      return;
    }

    let missedInFrame = false;

    const nextBalloons = balloons.map(b => {
      if (b.isBursting || b.isSaved) return b;

      const newY = b.y + b.speed;

      if (newY >= 90) {
        if (b.optionId === currentQuestion.correctAnswerId) {
            missedInFrame = true;
        }
        return { ...b, isBursting: true, y: 90 };
      }

      return { ...b, y: newY };
    });

    setBalloons(nextBalloons);

    if (missedInFrame) {
         const newMisses = misses + 1;
         setMisses(newMisses);

         if (newMisses < MAX_MISSES) {
             setMessage(`Dropped It! Miss ${newMisses}/${MAX_MISSES}`);
             setTimeout(() => {
                 setMessage(null);
                 setIsSpawning(true);
             }, 1500);
         }
    }

    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(t => gameLoopRef.current?.(t));
  }, [isGameOver, isSpawning, balloons, currentQuestion, spawnBalloons, misses, mistakes]);

  useEffect(() => {
    gameLoopRef.current = gameLoop;
  }, [gameLoop]);

  useEffect(() => {
    setIsSpawning(true);
    requestRef.current = requestAnimationFrame(t => gameLoopRef.current?.(t));
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  useEffect(() => {
    if (isGameOver) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        onGameOver(score, QUIZ_DATA.length * 10);
    }
  }, [isGameOver, onGameOver, score]);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full p-4 z-30 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-center gap-2">

        <div className="flex gap-4">
            <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-lg flex flex-col">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Score</span>
                <span className="font-bold text-2xl text-blue-600">{score}</span>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-lg flex flex-col">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Mistakes</span>
                <div className="flex items-center gap-1">
                    <span className="text-xl">❌</span>
                    <span className={`font-bold text-xl ${mistakes >= MAX_MISTAKES - 1 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
                        {mistakes}/{MAX_MISTAKES}
                    </span>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-lg flex flex-col">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dropped</span>
                <div className="flex items-center gap-1">
                    <span className="text-xl">📉</span>
                    <span className={`font-bold text-xl ${misses >= MAX_MISSES - 1 ? 'text-orange-600 animate-pulse' : 'text-gray-700'}`}>
                        {misses}/{MAX_MISSES}
                    </span>
                </div>
            </div>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-lg p-3 shadow-lg text-right self-end md:self-auto">
             <p className="text-sm font-semibold text-gray-500">Level {currentQuestionIndex + 1}/{QUIZ_DATA.length}</p>
        </div>
      </div>

      <div className="mt-28 md:mt-24 mx-4 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border-b-4 border-blue-200 text-center max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{currentQuestion.text}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            {currentQuestion.options.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-2 text-sm md:text-base text-gray-700 bg-blue-50/50 p-2 rounded">
                 <span className="font-bold text-blue-600 bg-white px-2 py-1 rounded-full shadow-sm">{opt.id.toUpperCase()}</span>
                 <span>{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {message && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce pointer-events-none w-full text-center">
          <div className="inline-block bg-yellow-400 text-white font-black text-2xl md:text-3xl px-6 py-3 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] border-4 border-white mx-4">
            {message}
          </div>
        </div>
      )}

      <div ref={containerRef} className="flex-1 relative w-full">
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            text={balloon.optionId.toUpperCase()}
            x={balloon.x}
            y={balloon.y}
            color={balloon.color}
            isBursting={balloon.isBursting}
            isSaved={balloon.isSaved}
            onClick={() => handleBalloonClick(balloon.id, balloon.optionId)}
          />
        ))}

        <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-green-600 to-green-400 border-t-8 border-green-700/30"></div>
      </div>
    </div>
  );
};

export default GameEngine;
