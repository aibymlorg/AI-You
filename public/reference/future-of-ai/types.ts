export interface QuizOption {
    text: string;
    isCorrect: boolean;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: QuizOption[];
    explanation?: string; // Optional context for why it's right/wrong
}

export interface ReportSection {
    id: string;
    title: string;
    content: string;
    colSpan?: number; // 1, 2, or 3 for grid layout
    isList?: boolean; // If true, render content as list items
}

export enum AppState {
    HOME = 'HOME',
    LEARN = 'LEARN',
    QUIZ = 'QUIZ'
}