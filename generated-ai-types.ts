export type ViewState = 'intro' | 'dashboard' | 'module' | 'quiz' | 'victory';

export interface ModuleData {
  id: string;
  title: string;
  shortDesc: string;
  content: {
    heading: string;
    body: string;
    keyPoints?: string[];
  }[];
  xpReward: number;
  icon: 'brain' | 'database' | 'globe' | 'shield' | 'eye';
  requiresInteraction?: boolean; // For the accordion section
  interactionData?: { title: string; content: string }[];
}

export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswerIndex: number; // 0-3 corresponding to A-D
}

export interface UserState {
  xp: number;
  level: number;
  unlockedModules: string[];
  completedModules: string[];
  quizScore: number;
}
