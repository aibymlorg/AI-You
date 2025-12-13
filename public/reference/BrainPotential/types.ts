export enum GameState {
  Welcome = 'welcome',
  Playing = 'playing',
  Summary = 'summary',
}

export enum Target {
  Brain = 'brain',
  LLM = 'llm',
}

export enum ChallengeCategory {
  Fact = 'fact',
  UseCase = 'use_case',
}

export type FilterCategory = ChallengeCategory | 'all';

export interface Challenge {
  id: number;
  text: string;
  target: Target;
  explanation: string;
  category: ChallengeCategory;
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}