export interface TermDefinition {
  id: string;
  title: string;
  shortDef: string;
  fullDef: string;
  analogy: string;
  iconType: 'brain' | 'database' | 'network' | 'robot' | 'search' | 'server' | 'sparkles' | 'zap';
  cardTerm: string; // The text on the "Question" card
  cardDefinition: string; // The text on the "Answer" card
}

export type AITermAppView = 'home' | 'learn' | 'quiz' | 'victory';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface CardItem {
  id: number;
  termId: string;
  content: string;
  type: 'term' | 'def';
  status: 'hidden' | 'flipped' | 'matched';
}
