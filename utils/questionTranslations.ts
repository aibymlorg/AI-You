import { Question } from '../ai-balloon-types';

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
