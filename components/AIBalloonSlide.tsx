import React, { useState } from 'react';
import { SlideData } from '../types';
import StartScreen from './ai-balloon/StartScreen';
import GameEngine from './ai-balloon/GameEngine';
import { GameState } from '../ai-balloon-types';

interface AIBalloonSlideProps {
  data: SlideData;
}

const AIBalloonSlide: React.FC<AIBalloonSlideProps> = ({ data }) => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [finalScore, setFinalScore] = useState(0);

  const startGame = () => {
    setGameState(GameState.PLAYING);
  };

  const handleGameOver = (score: number, total: number) => {
    setFinalScore(score);
    setGameState(GameState.GAME_OVER);
  };

  const handleVictory = (score: number) => {
    setFinalScore(score);
    setGameState(GameState.VICTORY);
  };

  const restartGame = () => {
    setFinalScore(0);
    setGameState(GameState.START);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 flex items-center justify-center font-sans">

      {gameState === GameState.START && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === GameState.PLAYING && (
        <GameEngine
          onGameOver={handleGameOver}
          onVictory={handleVictory}
        />
      )}

      {(gameState === GameState.GAME_OVER || gameState === GameState.VICTORY) && (
        <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4 animate-fade-in">
          <h2 className={`text-4xl font-bold mb-4 ${gameState === GameState.VICTORY ? 'text-green-600' : 'text-red-600'}`}>
            {gameState === GameState.VICTORY ? 'Mission Accomplished!' : 'Game Over'}
          </h2>
          <p className="text-gray-700 text-xl mb-6">
            Final Score: <span className="font-bold text-blue-600">{finalScore}</span>
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              {gameState === GameState.VICTORY
                ? "You have mastered the concepts of AI!"
                : "Review the concepts and try again to master AI."}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={restartGame}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors w-full"
              >
                Play Again
              </button>

              <button
                onClick={() => window.open('https://youtu.be/qYNweeDHiyU?si=4llHOggTmvxA5Y6A', '_blank')}
                className="px-8 py-3 bg-red-50 text-red-600 border border-red-200 rounded-full font-bold shadow hover:bg-red-100 transition-colors w-full flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                Learn the Detail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBalloonSlide;
