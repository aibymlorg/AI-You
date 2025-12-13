import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldAlert, Trophy, Target as TargetIcon, BrainCircuit, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import { GameTarget } from './components/Target';
import { Button } from './components/Button';
import { QUESTIONS, MAX_LIVES, POINTS_PER_HIT } from './constants';
import { GameState, GameStats, TargetEntity, Question } from './types';
import { explainConcept } from './services/geminiService';

const App = () => {
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
    const explanation = await explainConcept(
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

    if (!isCorrect && stats.lives - 1 <= 0) {
      // Delay transition to Game Over slightly so they see the feedback first? 
      // Actually let's show feedback then game over button
    }
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
      <div className="min-h-screen bg-cyber-black text-white flex flex-col items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1535868463750-c78d9543614f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay bg-black/70">
        <div className="max-w-2xl w-full bg-cyber-dark/90 backdrop-blur-md p-10 border border-cyber-primary shadow-[0_0_50px_rgba(0,240,255,0.2)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent"></div>
          
          <div className="mb-8">
            <TargetIcon className="w-20 h-20 text-cyber-primary mx-auto mb-4 animate-pulse-fast" />
            <h1 className="text-5xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary mb-2">
              TARGET PROTOCOL
            </h1>
            <p className="text-xl font-rajdhani text-gray-300 tracking-widest uppercase">
              The Limits of AI // Training Module
            </p>
          </div>

          <p className="text-gray-400 font-rajdhani text-lg mb-8 max-w-lg mx-auto">
            Test your knowledge of Artificial Intelligence capabilities. Identify the correct data packets (answers) and eliminate them before time runs out.
          </p>

          <Button onClick={startGame} className="text-xl w-full max-w-xs mx-auto">
            Initialize Sequence
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === GameState.GAME_OVER) {
    const isWin = stats.lives > 0;
    return (
      <div className="min-h-screen bg-cyber-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full bg-cyber-dark/90 p-8 border border-cyber-secondary shadow-[0_0_30px_rgba(112,0,255,0.3)] text-center">
          {isWin ? (
            <Trophy className="w-24 h-24 text-cyber-warning mx-auto mb-6" />
          ) : (
            <ShieldAlert className="w-24 h-24 text-cyber-accent mx-auto mb-6" />
          )}
          
          <h2 className="text-4xl font-orbitron font-bold mb-2">
            {isWin ? 'MISSION ACCOMPLISHED' : 'SYSTEM FAILURE'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-black/40 p-4 border-l-2 border-cyber-primary">
              <p className="text-cyber-primary text-sm uppercase">Final Score</p>
              <p className="text-3xl font-mono">{stats.score}</p>
            </div>
            <div className="bg-black/40 p-4 border-l-2 border-cyber-primary">
              <p className="text-cyber-primary text-sm uppercase">Accuracy</p>
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
    <div className="h-screen w-screen relative bg-cyber-black overflow-hidden font-rajdhani text-white bg-[radial-gradient(circle_at_center,_#13131f_0%,_#0a0a0f_100%)]">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* HUD Header */}
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-40 pointer-events-none">
        <div className="bg-cyber-dark/80 backdrop-blur border border-cyber-primary/30 p-4 rounded-br-2xl clip-path-polygon min-w-[300px]">
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit className="text-cyber-primary w-5 h-5" />
            <span className="text-cyber-primary font-bold tracking-wider text-sm">QUERY STREAM {stats.currentLevel + 1}/{QUESTIONS.length}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-orbitron font-bold leading-tight shadow-black drop-shadow-md">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="bg-cyber-dark/80 backdrop-blur border-l-4 border-cyber-warning px-6 py-2">
            <span className="text-xs text-cyber-warning uppercase tracking-widest block">Score</span>
            <span className="text-3xl font-mono font-bold">{stats.score.toLocaleString()}</span>
          </div>
          <div className="flex gap-1">
            {[...Array(MAX_LIVES)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-6 h-6 ${i < stats.lives ? 'text-cyber-accent fill-cyber-accent' : 'text-gray-700'}`} 
              />
            ))}
          </div>
        </div>
      </header>

      {/* Options Panel (Static Intel) */}
      <div className="absolute bottom-8 left-8 z-30 pointer-events-none hidden md:block">
        <div className="bg-cyber-dark/90 border border-cyber-secondary/50 p-6 rounded-tr-3xl max-w-md backdrop-blur-sm">
          <h3 className="text-cyber-secondary font-bold uppercase tracking-widest mb-4 border-b border-gray-700 pb-2">Available Targets</h3>
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => (
              <div key={opt.id} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-cyber-secondary/20 text-cyber-primary font-bold rounded text-sm">
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
         <div className="bg-cyber-dark/90 border border-cyber-secondary/50 p-4 rounded text-xs text-center text-gray-400">
           Shoot the target matching the correct answer.
           <div className="mt-2 grid grid-cols-2 gap-2 text-left">
              {currentQuestion.options.map((opt) => (
                <div key={opt.id} className="truncate">
                  <span className="text-cyber-primary font-bold mr-1">{opt.id.toUpperCase()}:</span>
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
          <div className="max-w-2xl w-full bg-cyber-dark border-2 border-cyber-primary relative p-1 overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-2 ${feedback.type === 'success' ? 'bg-cyber-success' : 'bg-cyber-accent'}`} />
            
            <div className="p-8">
              <h2 className={`text-3xl font-orbitron font-black mb-6 ${feedback.type === 'success' ? 'text-cyber-success' : 'text-cyber-accent'}`}>
                {feedback.message}
              </h2>

              {loadingExplanation ? (
                <div className="flex flex-col items-center py-12">
                  <div className="w-16 h-16 border-4 border-cyber-primary border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-cyber-primary animate-pulse">ANALYZING EDUCATIONAL DATABASE...</p>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-black/40 p-6 border-l-2 border-cyber-secondary">
                    <h4 className="text-cyber-secondary font-bold uppercase text-sm mb-2">AI Analysis</h4>
                    <p className="text-lg leading-relaxed text-gray-200">
                      {feedback.explanation}
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                     {/* If dead, show restart options or results, else next level */}
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

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
