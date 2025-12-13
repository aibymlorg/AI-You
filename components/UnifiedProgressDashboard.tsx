import React from 'react';
import { useScore } from '../contexts/ScoreContext';
import { Brain, BookOpen, Rocket, Sparkles, Trophy, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnifiedProgressDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnifiedProgressDashboard: React.FC<UnifiedProgressDashboardProps> = ({ isOpen, onClose }) => {
  const { scores, resetAllScores, getTotalProgress } = useScore();

  const modules = [
    {
      id: 'module5',
      name: 'Generated AI',
      icon: Sparkles,
      color: 'from-cyan-500 to-purple-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      id: 'module2',
      name: 'Brain Potential',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'module3',
      name: 'AI Terminology',
      icon: BookOpen,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30',
    },
    {
      id: 'module4',
      name: 'Future of AI',
      icon: Rocket,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
    },
  ];

  const getPercentage = (moduleId: string) => {
    const moduleScore = scores[moduleId as keyof typeof scores];
    if (moduleScore.maxScore === 0) return 0;
    return Math.round((moduleScore.score / moduleScore.maxScore) * 100);
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { letter: 'A+', color: 'text-green-400' };
    if (percentage >= 80) return { letter: 'A', color: 'text-green-400' };
    if (percentage >= 70) return { letter: 'B', color: 'text-blue-400' };
    if (percentage >= 60) return { letter: 'C', color: 'text-yellow-400' };
    if (percentage > 0) return { letter: 'D', color: 'text-orange-400' };
    return { letter: '-', color: 'text-slate-500' };
  };

  const totalProgress = getTotalProgress();
  const completedModules = Object.values(scores).filter((s) => s.completed).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Dashboard Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/40 to-slate-900 p-6 border-b border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Trophy className="text-yellow-400" size={32} />
                  Your Progress Dashboard
                </h2>
                <p className="text-slate-400 mt-1">Track your journey through AI modules</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Overall Progress */}
            <div className="p-6 bg-slate-800/50 border-b border-slate-700">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-slate-200">Overall Progress</span>
                <span className="text-2xl font-bold text-purple-400">{completedModules}/4 Modules</span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${totalProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                />
              </div>
              <p className="text-sm text-slate-400 mt-2">{Math.round(totalProgress)}% Complete</p>
            </div>

            {/* Module Scores */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((module, index) => {
                  const moduleScore = scores[module.id as keyof typeof scores];
                  const percentage = getPercentage(module.id);
                  const grade = getGrade(percentage);
                  const Icon = module.icon;

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-5 rounded-xl border ${module.borderColor} ${module.bgColor} backdrop-blur-sm`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color}`}>
                            <Icon className="text-white" size={20} />
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{module.name}</h3>
                            {moduleScore.completed && (
                              <span className="text-xs text-green-400 flex items-center gap-1">
                                <Trophy size={12} /> Completed
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${grade.color}`}>{grade.letter}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">
                            {module.id === 'module5' ? 'XP Earned' : 'Score'}
                          </span>
                          <span className="text-slate-200 font-mono">
                            {moduleScore.score} / {moduleScore.maxScore}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`h-full bg-gradient-to-r ${module.color}`}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>{percentage}%</span>
                          {moduleScore.attempts ? (
                            <span>{moduleScore.attempts} attempt{moduleScore.attempts > 1 ? 's' : ''}</span>
                          ) : (
                            <span>Not attempted</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-800/50 border-t border-slate-700 flex justify-between items-center">
              <div className="text-sm text-slate-400">
                {completedModules === 4 ? (
                  <span className="text-green-400 font-semibold flex items-center gap-2">
                    <Trophy size={16} /> All modules completed! Great work!
                  </span>
                ) : (
                  <span>Keep going! {4 - completedModules} module{4 - completedModules > 1 ? 's' : ''} remaining</span>
                )}
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                    resetAllScores();
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors text-sm font-semibold"
              >
                <RotateCcw size={16} />
                Reset All Progress
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UnifiedProgressDashboard;
