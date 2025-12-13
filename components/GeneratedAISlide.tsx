import React, { useState, useEffect } from 'react';
import { SlideData } from '../types';
import { ViewState, UserState } from '../generated-ai-types';
import { MODULES, TOTAL_XP_TO_WIN } from '../generated-ai-constants';
import Intro from './generated-ai/Intro';
import Dashboard from './generated-ai/Dashboard';
import ModuleViewer from './generated-ai/ModuleViewer';
import QuizView from './generated-ai/QuizView';
import { useScore } from '../contexts/ScoreContext';

interface GeneratedAISlideProps {
  data: SlideData;
}

const BackgroundParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-[-1]">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black" />
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}></div>
  </div>
);

const GeneratedAISlide: React.FC<GeneratedAISlideProps> = ({ data }) => {
  const { updateModuleScore } = useScore();
  const [view, setView] = useState<ViewState>('intro');
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  const [userState, setUserState] = useState<UserState>({
    xp: 0,
    level: 1,
    unlockedModules: ['origin'],
    completedModules: [],
    quizScore: 0,
  });

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

    if (!userState.completedModules.includes(activeModuleId)) {
        setUserState(prev => {
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
        xp: prev.xp + (score * 50)
    }));
    setView('dashboard');
  };

  // Save XP score to unified context whenever userState changes
  useEffect(() => {
    if (userState.xp > 0) {
      const allModulesCompleted = MODULES.every(m => userState.completedModules.includes(m.id));
      const maxXp = TOTAL_XP_TO_WIN + (5 * 50); // Base XP + max quiz bonus
      updateModuleScore('module5', userState.xp, maxXp, allModulesCompleted);
    }
  }, [userState.xp, userState.completedModules, updateModuleScore]);

  return (
    <div className="w-full h-full min-h-screen text-slate-200 overflow-hidden relative selection:bg-cyan-500/30 bg-black">
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

export default GeneratedAISlide;
