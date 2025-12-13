import React from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Eye, Shield, Lock, PlayCircle, Trophy } from 'lucide-react';
import { MODULES, TOTAL_XP_TO_WIN } from '../constants';
import { UserState, ModuleData } from '../types';

interface DashboardProps {
  userState: UserState;
  onSelectModule: (moduleId: string) => void;
  onStartQuiz: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userState, onSelectModule, onStartQuiz }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database': return <Database className="w-8 h-8" />;
      case 'brain': return <Brain className="w-8 h-8" />;
      case 'eye': return <Eye className="w-8 h-8" />;
      case 'shield': return <Shield className="w-8 h-8" />;
      default: return <Database className="w-8 h-8" />;
    }
  };

  const allModulesCompleted = MODULES.every(m => userState.completedModules.includes(m.id));

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <header className="mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm tracking-widest mb-4"
        >
          OPERATIVE: GRADE 10
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
          AI: DECODED
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          Access the archives. Decrypt the vision. Shape the future.
        </p>
      </header>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-slate-400 text-xs uppercase tracking-wider">Experience</div>
          <div className="text-2xl font-bold text-cyan-400">{userState.xp} <span className="text-sm text-slate-500">XP</span></div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm">
          <div className="text-slate-400 text-xs uppercase tracking-wider">Clearance Level</div>
          <div className="text-2xl font-bold text-purple-400">{userState.level}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl backdrop-blur-sm col-span-2">
           <div className="flex justify-between items-center mb-2">
             <div className="text-slate-400 text-xs uppercase tracking-wider">System Synchronization</div>
             <div className="text-cyan-400 text-xs">{Math.round((userState.completedModules.length / MODULES.length) * 100)}%</div>
           </div>
           <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-1000"
               style={{ width: `${(userState.completedModules.length / MODULES.length) * 100}%` }}
             />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map((module, index) => {
          const isUnlocked = userState.unlockedModules.includes(module.id);
          const isCompleted = userState.completedModules.includes(module.id);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.03, boxShadow: "0 0 20px rgba(6,182,212,0.2)" } : {}}
              onClick={() => isUnlocked && onSelectModule(module.id)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all cursor-pointer h-64 flex flex-col justify-between overflow-hidden group
                ${isUnlocked 
                  ? 'bg-slate-800/40 border-cyan-500/30 hover:border-cyan-400 hover:bg-slate-800/60' 
                  : 'bg-slate-900/80 border-slate-800 opacity-75 cursor-not-allowed grayscale'}
              `}
            >
              {/* Background Tech Decoration */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${isUnlocked ? 'bg-cyan-900/30 text-cyan-400' : 'bg-slate-800 text-slate-600'}`}>
                    {getIcon(module.icon)}
                  </div>
                  {isCompleted && <div className="text-green-400 font-bold text-xs bg-green-900/30 px-2 py-1 rounded border border-green-500/30">DECRYPTED</div>}
                  {!isUnlocked && <Lock className="text-slate-600 w-5 h-5" />}
                </div>
                
                <h3 className={`text-2xl font-display font-bold mb-2 ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                  {module.title}
                </h3>
                <p className={`text-sm ${isUnlocked ? 'text-slate-400' : 'text-slate-700'}`}>
                  {module.shortDesc}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className={`text-xs font-mono ${isUnlocked ? 'text-cyan-500' : 'text-slate-800'}`}>
                  REWARD: {module.xpReward} XP
                </span>
                {isUnlocked && <PlayCircle className="w-6 h-6 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0" />}
              </div>
            </motion.div>
          );
        })}

        {/* Final Challenge Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className={`
            relative p-6 rounded-2xl border-2 h-64 flex flex-col justify-center items-center text-center transition-all
            ${allModulesCompleted 
              ? 'bg-gradient-to-br from-purple-900/40 to-slate-900 border-purple-500 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-purple-500/20' 
              : 'bg-slate-900 border-slate-800 border-dashed opacity-50 cursor-not-allowed'}
           `}
           onClick={() => allModulesCompleted && onStartQuiz()}
        >
            <div className={`mb-4 p-4 rounded-full ${allModulesCompleted ? 'bg-purple-500/20 text-purple-400 animate-pulse' : 'bg-slate-800 text-slate-700'}`}>
              <Trophy className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-2">Final Verification</h3>
            <p className="text-sm text-slate-400">
              {allModulesCompleted ? "Protocols Active. Initiate Final Exam." : "Decrypt all fragments to unlock."}
            </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;