import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import SummaryScreen from './components/SummaryScreen';
import FeedbackModal from './components/FeedbackModal';
import { CHALLENGES, DIFFICULTY_LEVELS } from './constants';
import type { Challenge, FilterCategory } from './types';
import { GameState, Target, Difficulty, ChallengeCategory } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.Welcome);
  const [score, setScore] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; explanation: string } | null>(null);
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(false);

  const startGame = useCallback((difficulty: Difficulty, category: FilterCategory) => {
    const numChallenges = DIFFICULTY_LEVELS[difficulty];
    
    let challengesToSampleFrom: Challenge[];

    if (difficulty === Difficulty.Easy) {
      // Easy mode exclusively uses "Fact" challenges, overriding any category filter.
      challengesToSampleFrom = CHALLENGES.filter(c => c.category === ChallengeCategory.Fact);
    } else {
      // Medium and Hard respect the category filter
      if (category === 'all') {
        challengesToSampleFrom = [...CHALLENGES];
      } else {
        challengesToSampleFrom = CHALLENGES.filter(c => c.category === category);
      }
    }
    
    const availableChallengesCount = challengesToSampleFrom.length;

    const gameChallenges = challengesToSampleFrom
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(numChallenges, availableChallengesCount));
    
    setShuffledChallenges(gameChallenges);
    setScore(0);
    setCurrentChallengeIndex(0);
    setGameState(GameState.Playing);
    setHintUsed(false);
    setIsHintVisible(false);
  }, []);

  const handleReturnToHome = useCallback(() => {
    setGameState(GameState.Welcome);
  }, []);

  const handleAnswer = useCallback((challengeId: number, droppedOn: Target) => {
    const challenge = shuffledChallenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const isCorrect = challenge.target === droppedOn;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setFeedback({
      show: true,
      correct: isCorrect,
      explanation: challenge.explanation
    });
  }, [shuffledChallenges]);

  const handleNext = useCallback(() => {
    setFeedback(null);
    setIsHintVisible(false);
    if (currentChallengeIndex < shuffledChallenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      setGameState(GameState.Summary);
    }
  }, [currentChallengeIndex, shuffledChallenges.length]);

  const handleUseHint = useCallback(() => {
    if (!hintUsed) {
      setHintUsed(true);
      setIsHintVisible(true);
    }
  }, [hintUsed]);

  const renderGameState = () => {
    switch (gameState) {
      case GameState.Playing:
        if (shuffledChallenges.length === 0) {
            // If no challenges match the filter, go directly to summary
            setGameState(GameState.Summary);
            return null;
        }
        return (
          <GameScreen
            challenge={shuffledChallenges[currentChallengeIndex]}
            onAnswer={handleAnswer}
            progress={{ current: currentChallengeIndex + 1, total: shuffledChallenges.length }}
            hintUsed={hintUsed}
            isHintVisible={isHintVisible}
            onUseHint={handleUseHint}
          />
        );
      case GameState.Summary:
        return (
          <SummaryScreen
            score={score}
            total={shuffledChallenges.length}
            onPlayAgain={handleReturnToHome}
          />
        );
      case GameState.Welcome:
      default:
        return <WelcomeScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col items-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <main className="w-full max-w-4xl flex-grow flex flex-col justify-center">
            <div className="z-10 w-full">
                {renderGameState()}
            </div>
        </main>

        {feedback?.show && (
            <FeedbackModal
                isCorrect={feedback.correct}
                explanation={feedback.explanation}
                onNext={handleNext}
            />
        )}
        
        <footer className="w-full max-w-4xl z-10 text-xs text-gray-500 flex justify-between items-center py-2 shrink-0">
            <span>@copyright aibyml.com</span>
            <span className="font-display tracking-wider">POWERED BY GEMINI</span>
        </footer>
    </div>
  );
}

export default App;
