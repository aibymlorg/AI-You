import { Question } from './ai-limits-types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "How have past predictions about what AI 'can never do' turned out?",
    correctAnswerId: 'c',
    options: [
      { id: 'a', text: "They were usually right." },
      { id: 'b', text: "AI stopped improving years ago." },
      { id: 'c', text: "Most 'impossible' things are now possible." },
      { id: 'd', text: "AI is developing slower than expected." }
    ]
  },
  {
    id: 2,
    text: "In the DIKW pyramid (Data -> Info -> Knowledge -> Wisdom), where is AI strongest right now?",
    correctAnswerId: 'b',
    options: [
      { id: 'a', text: "Wisdom (Judgment)" },
      { id: 'b', text: "Information & Knowledge" },
      { id: 'c', text: "It has mastered all levels." },
      { id: 'd', text: "It only handles raw Data." }
    ]
  },
  {
    id: 3,
    text: "Which of these skills has AI actually mastered, beating top humans?",
    correctAnswerId: 'b',
    options: [
      { id: 'a', text: "Having real feelings." },
      { id: 'b', text: "Complex Games (Chess) & Language." },
      { id: 'c', text: "Setting its own life goals." },
      { id: 'd', text: "Super-Human Intelligence in everything." }
    ]
  },
  {
    id: 4,
    text: "What is an AI 'hallucination'?",
    correctAnswerId: 'b',
    options: [
      { id: 'a', text: "When it generates ghost images." },
      { id: 'b', text: "Confidently stating false facts." },
      { id: 'c', text: "When the AI gets angry." },
      { id: 'd', text: "A bug in the camera sensor." }
    ]
  },
  {
    id: 5,
    text: "What is a major environmental problem with powerful AI today?",
    correctAnswerId: 'b',
    options: [
      { id: 'a', text: "It creates too much plastic waste." },
      { id: 'b', text: "It uses huge amounts of electricity." },
      { id: 'c', text: "It requires too many human workers." },
      { id: 'd', text: "It breaks old computers." }
    ]
  },
  {
    id: 6,
    text: "What do we call an AI that is as smart as a human at EVERYTHING?",
    correctAnswerId: 'c',
    options: [
      { id: 'a', text: "ASI (Super Intelligence)" },
      { id: 'b', text: "Chatbot" },
      { id: 'c', text: "AGI (General Intelligence)" },
      { id: 'd', text: "Siri" }
    ]
  },
  {
    id: 7,
    text: "What is the best way for Humans and AI to work together?",
    correctAnswerId: 'b',
    options: [
      { id: 'a', text: "Humans do the work; AI watches." },
      { id: 'b', text: "Humans: The 'Why' (Goals) | AI: The 'How' (Tasks)" },
      { id: 'c', text: "We should do the exact same jobs." },
      { id: 'd', text: "AI should decide our goals for us." }
    ]
  }
];

export const MAX_LIVES = 3;
export const POINTS_PER_HIT = 1000;
