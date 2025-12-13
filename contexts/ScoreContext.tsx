import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ModuleScore {
  score: number;
  maxScore: number;
  completed: boolean;
  lastPlayed?: string;
  attempts?: number;
}

export interface ScoreData {
  module2: ModuleScore; // Brain Potential
  module3: ModuleScore; // AI Terminology
  module4: ModuleScore; // Future of AI
  module5: ModuleScore; // Generated AI (XP-based)
}

interface ScoreContextType {
  scores: ScoreData;
  updateModuleScore: (moduleId: keyof ScoreData, score: number, maxScore: number, completed: boolean) => void;
  resetAllScores: () => void;
  resetModuleScore: (moduleId: keyof ScoreData) => void;
  getTotalProgress: () => number;
}

const defaultScoreData: ScoreData = {
  module2: { score: 0, maxScore: 0, completed: false, attempts: 0 },
  module3: { score: 0, maxScore: 0, completed: false, attempts: 0 },
  module4: { score: 0, maxScore: 0, completed: false, attempts: 0 },
  module5: { score: 0, maxScore: 1000, completed: false, attempts: 0 }, // XP-based
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

const STORAGE_KEY = 'ai-you-module-scores';

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<ScoreData>(() => {
    // Load from localStorage on initial mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load scores from localStorage:', error);
    }
    return defaultScoreData;
  });

  // Save to localStorage whenever scores change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch (error) {
      console.error('Failed to save scores to localStorage:', error);
    }
  }, [scores]);

  const updateModuleScore = (
    moduleId: keyof ScoreData,
    score: number,
    maxScore: number,
    completed: boolean
  ) => {
    setScores((prev) => ({
      ...prev,
      [moduleId]: {
        score,
        maxScore,
        completed,
        lastPlayed: new Date().toISOString(),
        attempts: (prev[moduleId].attempts || 0) + 1,
      },
    }));
  };

  const resetModuleScore = (moduleId: keyof ScoreData) => {
    setScores((prev) => ({
      ...prev,
      [moduleId]: defaultScoreData[moduleId],
    }));
  };

  const resetAllScores = () => {
    setScores(defaultScoreData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getTotalProgress = () => {
    const completedCount = Object.values(scores).filter((s) => s.completed).length;
    return (completedCount / 4) * 100;
  };

  return (
    <ScoreContext.Provider
      value={{
        scores,
        updateModuleScore,
        resetAllScores,
        resetModuleScore,
        getTotalProgress,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
