import React, { useState } from 'react';
import { AppView } from './types';
import LearningDeck from './components/LearningDeck';
import QuizChallenge from './components/QuizChallenge';
import AITutor from './components/AITutor';
import { TERMS } from './constants';
import { BrainCircuit, Play, BookOpen, RotateCcw, Award, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [score, setScore] = useState(0);
  const [isTutorOpen, setIsTutorOpen] = useState(false);

  // The quiz calculates score based on matching all pairs (term + definition)
  const maxScore = TERMS.length * 2;

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setView('victory');
  };

  const resetGame = () => {
    setScore(0);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative overflow-hidden text-slate-200 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-950/20 via-transparent to-cyan-950/20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3" onClick={() => setView('home')}>
          <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30">
            <BrainCircuit className="text-cyan-400 w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-wider text-white">NEURO<span className="text-cyan-400">CORE</span></span>
        </div>
        <button 
          onClick={() => setIsTutorOpen(!isTutorOpen)}
          className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 px-4 py-2 rounded-lg hover:bg-cyan-950/30 transition-all flex items-center gap-2"
        >
          <Shield size={16} />
          {isTutorOpen ? 'Hide Tutor' : 'Ask AI Tutor'}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        
        {view === 'home' && (
          <div className="text-center max-w-2xl animate-in zoom-in duration-500">
            <div className="inline-block px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-mono mb-6">
              SYSTEM STATUS: CRITICAL UPDATES REQUIRED
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
              Master the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">Future of AI</span>
            </h1>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Welcome, Cadet. The AI landscape is shifting rapidly. Your mission is to update the NeuroCore database with the latest protocols: Agentic AI, RAG, and more.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => setView('learn')}
                className="group relative px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold font-display transition-all border border-slate-600 hover:border-cyan-500 flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2"><BookOpen size={20}/> Initialize Learning</span>
              </button>
              <button 
                onClick={() => setView('quiz')}
                className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold font-display transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] flex items-center justify-center gap-3"
              >
               <Play size={20} fill="currentColor" /> Start Simulation
              </button>
            </div>
          </div>
        )}

        {view === 'learn' && (
          <LearningDeck onComplete={() => setView('quiz')} />
        )}

        {view === 'quiz' && (
          <QuizChallenge onComplete={handleQuizComplete} />
        )}

        {view === 'victory' && (
          <div className="text-center bg-slate-800/80 backdrop-blur-md p-10 rounded-3xl border border-cyan-500/30 shadow-2xl animate-in zoom-in duration-500 max-w-lg w-full">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award className="text-white w-12 h-12" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-2">Mission Complete</h2>
            <p className="text-slate-400 mb-6">Database synchronization finished.</p>
            
            <div className="bg-slate-900 rounded-xl p-6 mb-8 border border-slate-700">
              <div className="text-sm text-slate-500 uppercase font-bold tracking-widest mb-1">Final Score</div>
              <div className="text-5xl font-mono font-bold text-cyan-400">{score} / {maxScore}</div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={resetGame}
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold font-display transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Reboot System
              </button>
              {score < maxScore && (
                <button 
                  onClick={() => setView('learn')}
                  className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-all"
                >
                  Review Data Cards
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* AI Tutor Overlay */}
      <AITutor isOpen={isTutorOpen} onClose={() => setIsTutorOpen(false)} />
      
      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-2 text-center text-slate-600 text-[10px] pointer-events-none">
        NEUROCORE v1.0.0 // EDUCATIONAL USE ONLY
      </footer>
    </div>
  );
};

export default App;