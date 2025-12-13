export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER',
  VICTORY = 'VICTORY'
}

export interface Question {
  id: number;
  text: string;
  options: {
    id: string; // 'a', 'b', 'c', 'd'
    text: string;
  }[];
  correctAnswerId: string;
}

export interface BalloonEntity {
  id: string;
  optionId: string; // Links to question option
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  speed: number;
  isBursting: boolean;
  isSaved: boolean;
  color: string;
}

export interface EducationalContentSection {
  title: string;
  content: string[];
}
