export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswerId: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface TargetEntity {
  id: string;
  optionId: string;
  text: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  vx: number; // velocity x
  vy: number; // velocity y
  scale: number;
  isHit: boolean;
}

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  FEEDBACK = 'FEEDBACK', // Paused to show result of shot
  GAME_OVER = 'GAME_OVER'
}

export interface GameStats {
  score: number;
  streak: number;
  lives: number;
  currentLevel: number; // Corresponds to Question Index
}
