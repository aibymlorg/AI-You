import { Question } from '../ai-balloon-types';
import { Target, ChallengeCategory } from '../brain-potential-constants';

// Helper function to get translated AI Balloon questions
export const getAIBalloonQuestions = (t: (key: string) => any): Question[] => {
  const questions = t('aiBalloon.questions');

  if (!Array.isArray(questions)) {
    // Fallback to English if translation not available
    return [];
  }

  return questions.map((q: any, index: number) => ({
    id: index + 1,
    text: q.text,
    options: [
      { id: 'a', text: q.options[0] },
      { id: 'b', text: q.options[1] },
      { id: 'c', text: q.options[2] },
      { id: 'd', text: q.options[3] }
    ],
    correctAnswerId: ['c', 'c', 'c', 'c', 'c', 'c', 'b', 'c', 'c', 'c'][index] // Correct answer mappings
  }));
};

// Helper function to get translated Brain Potential challenges
export interface Challenge {
  id: number;
  text: string;
  target: Target;
  explanation: string;
  category: ChallengeCategory;
}

export const getBrainPotentialChallenges = (t: (key: string) => any): Challenge[] => {
  const challenges = t('brainPotential.challenges');

  if (!Array.isArray(challenges)) {
    // Fallback to empty if translation not available
    return [];
  }

  return challenges.map((c: any, index: number) => ({
    id: index + 1,
    text: c.text,
    target: c.target as Target,
    explanation: c.explanation,
    category: c.category as ChallengeCategory
  }));
};
