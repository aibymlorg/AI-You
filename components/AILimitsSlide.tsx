import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Trophy, Target as TargetIcon, BrainCircuit, Heart, ArrowRight } from 'lucide-react';
import { GameTarget } from './ai-limits/Target';
import { Button } from './ai-limits/Button';
import { QUESTIONS, MAX_LIVES, POINTS_PER_HIT } from '../ai-limits-constants';
import { GameState, GameStats, TargetEntity, Question } from '../ai-limits-types';
import { explainAILimitsConcept } from '../services/gemini';
import { SlideData } from '../types';

interface AILimitsSlideProps {
  data: SlideData;
}

const AILimitsSlide: React.FC<AILimitsSlideProps> = ({ data }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    streak: 0,
    lives: MAX_LIVES,
    currentLevel: 0
  });
  const [targets, setTargets] = useState<TargetEntity[]>([]);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string, explanation: string }>({ type: 'success', message: '', explanation: '' });
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  // Game Loop Refs
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const currentQuestion = QUESTIONS[stats.currentLevel];

  // Initialize targets for a level
  const spawnTargets = (question: Question) => {
    const newTargets: TargetEntity[] = question.options.map((opt, index) => ({
      id: opt.id,
      optionId: opt.id,
      text: opt.text,
      x: 20 + Math.random() * 60, // Keep within central 60% initially
      y: 20 + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.4 * (1 + stats.currentLevel * 0.1), // Speed increases with level
      vy: (Math.random() - 0.5) * 0.4 * (1 + stats.currentLevel * 0.1),
      scale: 1,
      isHit: false
    }));
    setTargets(newTargets);
  };

  const startGame = () => {
    setStats({ score: 0, streak: 0, lives: MAX_LIVES, currentLevel: 0 });
    setGameState(GameState.PLAYING);
    spawnTargets(QUESTIONS[0]);
  };

  const nextLevel = () => {
    if (stats.currentLevel + 1 < QUESTIONS.length) {
      setStats(prev => ({ ...prev, currentLevel: prev.currentLevel + 1 }));
      setGameState(GameState.PLAYING);
      spawnTargets(QUESTIONS[stats.currentLevel + 1]);
    } else {
      setGameState(GameState.GAME_OVER);
    }
  };

  const handleHit = async (targetId: string) => {
    if (gameState !== GameState.PLAYING) return;

    // Pause game loop
    setGameState(GameState.FEEDBACK);
    setLoadingExplanation(true);

    const isCorrect = targetId === currentQuestion.correctAnswerId;
    const hitTarget = targets.find(t => t.id === targetId);

    // Update Stats
    if (isCorrect) {
      setStats(prev => ({
        ...prev,
        score: prev.score + POINTS_PER_HIT + (prev.streak * 100),
        streak: prev.streak + 1
      }));
    } else {
      setStats(prev => ({
        ...prev,
        streak: 0,
        lives: prev.lives - 1
      }));
    }

    // Get Explanation from Gemini
    const explanation = await explainAILimitsConcept(
      currentQuestion.text,
      currentQuestion.options.find(o => o.id === currentQuestion.correctAnswerId)?.text || '',
      isCorrect ? undefined : hitTarget?.text
    );

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect ? 'TARGET ELIMINATED - CORRECT' : 'TARGET MISMATCH - INCORRECT',
      explanation
    });
    setLoadingExplanation(false);
  };

  // Game Loop
  const updateGame = (time: number) => {
    if (gameState !== GameState.PLAYING) return;

    if (lastTimeRef.current !== undefined) {
      // Update physics
      setTargets(prevTargets => prevTargets.map(t => {
        let newX = t.x + t.vx;
        let newY = t.y + t.vy;

        // Bounce logic
        if (newX <= 5 || newX >= 95) t.vx *= -1;
        if (newY <= 15 || newY >= 90) t.vy *= -1;

        // Keep within bounds
        newX = Math.max(5, Math.min(95, newX));
        newY = Math.max(15, Math.min(90, newY));

        return { ...t, x: newX, y: newY };
      }));
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);


  // Renders
  if (gameState === GameState.MENU) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-2xl w-full bg-slate-900/90 backdrop-blur-md p-10 border border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.2)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <div className="mb-8">
            <TargetIcon className="w-20 h-20 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
              TARGET PROTOCOL
            </h1>
            <p className="text-xl text-gray-300 tracking-widest uppercase">
              The Limits of AI // Training Module
            </p>
          </div>

          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            Test your knowledge of Artificial Intelligence capabilities. Identify the correct data packets (answers) and eliminate them before time runs out.
          </p>

          <div className="flex flex-col gap-4 items-center">
            <Button onClick={startGame} className="text-xl w-full max-w-xs mx-auto">
              Initialize Sequence
            </Button>

            <button
              onClick={() => window.open('https://youtu.be/rBlCOLfMYfw?si=e7WERa3DJjf2IhU-', '_blank')}
              className="group flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
              Learn the Detail
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === GameState.GAME_OVER) {
    const isWin = stats.lives > 0;
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full bg-slate-900/90 p-8 border border-purple-500 shadow-[0_0_30px_rgba(112,0,255,0.3)] text-center">
          {isWin ? (
            <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
          ) : (
            <ShieldAlert className="w-24 h-24 text-red-500 mx-auto mb-6" />
          )}

          <h2 className="text-4xl font-bold mb-2">
            {isWin ? 'MISSION ACCOMPLISHED' : 'SYSTEM FAILURE'}
          </h2>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-black/40 p-4 border-l-2 border-cyan-400">
              <p className="text-cyan-400 text-sm uppercase">Final Score</p>
              <p className="text-3xl font-mono">{stats.score}</p>
            </div>
            <div className="bg-black/40 p-4 border-l-2 border-cyan-400">
              <p className="text-cyan-400 text-sm uppercase">Accuracy</p>
              <p className="text-3xl font-mono">
                {Math.round(((stats.currentLevel + (isWin?1:0)) / QUESTIONS.length) * 100)}%
              </p>
            </div>
          </div>

          <Button onClick={() => setGameState(GameState.MENU)} variant="secondary">
            Return to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative bg-black overflow-hidden text-white bg-[radial-gradient(circle_at_center,_#13131f_0%,_#0a0a0f_100%)]">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* HUD Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-40 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur border border-cyan-400/30 p-4 rounded-br-2xl min-w-[300px]">
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit className="text-cyan-400 w-5 h-5" />
            <span className="text-cyan-400 font-bold tracking-wider text-sm">QUERY STREAM {stats.currentLevel + 1}/{QUESTIONS.length}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold leading-tight shadow-black drop-shadow-md">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="bg-slate-900/80 backdrop-blur border-l-4 border-yellow-400 px-6 py-2">
            <span className="text-xs text-yellow-400 uppercase tracking-widest block">Score</span>
            <span className="text-3xl font-mono font-bold">{stats.score.toLocaleString()}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(MAX_LIVES)].map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${i < stats.lives ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Options Panel (Static Intel) */}
      <div className="absolute bottom-8 left-8 z-30 pointer-events-none hidden md:block">
        <div className="bg-slate-900/90 border border-purple-500/50 p-6 rounded-tr-3xl max-w-md backdrop-blur-sm">
          <h3 className="text-purple-400 font-bold uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Available Targets</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => (
              <div key={opt.id} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-500/20 text-cyan-400 font-bold rounded text-sm">
                  {opt.id.toUpperCase()}
                </span>
                <span className="text-sm text-gray-300 leading-snug">{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Options Tip */}
      <div className="absolute bottom-4 left-4 right-4 z-30 md:hidden pointer-events-none">
         <div className="bg-slate-900/90 border border-purple-500/50 p-4 rounded text-xs text-center text-gray-400">
           Shoot the target matching the correct answer.
           <div className="mt-2 grid grid-cols-2 gap-2 text-left">
              {currentQuestion.options.map((opt) => (
                <div key={opt.id} className="truncate">
                  <span className="text-cyan-400 font-bold mr-1">{opt.id.toUpperCase()}:</span>
                  {opt.text}
                </div>
              ))}
           </div>
         </div>
      </div>

      {/* Game Area */}
      <div className="absolute inset-0 z-10">
        {targets.map(target => (
          <GameTarget
            key={target.id}
            data={target}
            onClick={handleHit}
          />
        ))}
      </div>

      {/* Feedback Overlay */}
      {gameState === GameState.FEEDBACK && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border-2 border-cyan-400 relative p-1 overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />

            <div className="p-8">
              <h2 className={`text-3xl font-bold mb-6 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback.message}
              </h2>

              {loadingExplanation ? (
                <div className="flex flex-col items-center py-12">
                  <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-cyan-400 animate-pulse">ANALYZING EDUCATIONAL DATABASE...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-black/40 p-6 border-l-2 border-purple-500">
                    <h4 className="text-purple-400 font-bold uppercase text-sm mb-2">AI Analysis</h4>
                    <p className="text-lg leading-relaxed text-gray-200">
                      {feedback.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                     {stats.lives <= 0 ? (
                       <Button onClick={() => setGameState(GameState.GAME_OVER)} variant="danger">
                         VIEW REPORT
                       </Button>
                     ) : (
                       <Button onClick={nextLevel} className="flex items-center gap-2">
                         NEXT SEQUENCE <ArrowRight className="w-4 h-4" />
                       </Button>
                     )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILimitsSlide;
