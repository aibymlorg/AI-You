import React, { useState, useEffect } from 'react';
import { ViewState, UserState } from './types';
import { MODULES } from './constants';
import Intro from './components/Intro';
import Dashboard from './components/Dashboard';
import ModuleViewer from './components/ModuleViewer';
import QuizView from './components/QuizView';

// Background particle effect
const BackgroundParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black" />
    <div className="absolute inset-0 opacity-20" style={{ 
      backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}></div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('intro');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  const [userState, setUserState] = useState<UserState>({
    xp: 0,
    level: 1,
    unlockedModules: ['origin'], // First module unlocked
    completedModules: [],
    quizScore: 0,
  });

  // Level up logic
  useEffect(() => {
    const newLevel = Math.floor(userState.xp / 400) + 1;
    if (newLevel > userState.level) {
      setUserState(prev => ({ ...prev, level: newLevel }));
    }
  }, [userState.xp, userState.level]);

  const handleModuleComplete = () => {
    if (!activeModuleId) return;

    const module = MODULES.find(m => m.id === activeModuleId);
    if (!module) return;

    // Award XP only if first time completion
    if (!userState.completedModules.includes(activeModuleId)) {
        setUserState(prev => {
            // Logic to unlock next module
            const currentIndex = MODULES.findIndex(m => m.id === activeModuleId);
            const nextModule = MODULES[currentIndex + 1];
            const newUnlocked = [...prev.unlockedModules];
            if (nextModule && !newUnlocked.includes(nextModule.id)) {
                newUnlocked.push(nextModule.id);
            }

            return {
                ...prev,
                xp: prev.xp + module.xpReward,
                completedModules: [...prev.completedModules, activeModuleId],
                unlockedModules: newUnlocked
            };
        });
    }

    setView('dashboard');
    setActiveModuleId(null);
  };

  const handleQuizComplete = (score: number) => {
    setUserState(prev => ({
        ...prev,
        quizScore: score,
        xp: prev.xp + (score * 50) // Bonus XP for quiz
    }));
    setView('dashboard');
  };

  return (
    <div className="min-h-screen text-slate-200 overflow-hidden relative selection:bg-cyan-500/30">
      <BackgroundParticles />

      {view === 'intro' && (
        <Intro onComplete={() => setView('dashboard')} />
      )}

      {view === 'dashboard' && (
        <Dashboard 
          userState={userState}
          onSelectModule={(id) => {
            setActiveModuleId(id);
            setView('module');
          }}
          onStartQuiz={() => setView('quiz')}
        />
      )}

      {view === 'module' && activeModuleId && (
        <ModuleViewer 
          module={MODULES.find(m => m.id === activeModuleId)!}
          onComplete={handleModuleComplete}
          onClose={() => setView('dashboard')}
        />
      )}

      {view === 'quiz' && (
        <QuizView onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default App;