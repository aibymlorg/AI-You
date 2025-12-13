import React, { useState } from 'react';
import { Difficulty, ChallengeCategory } from './brain-potential-types';
import type { FilterCategory } from './brain-potential-types';

interface WelcomeScreenProps {
  onStart: (difficulty: Difficulty, category: FilterCategory) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');

  const getCategoryButtonClass = (category: FilterCategory) => {
    const baseClass = "px-6 py-2 font-semibold text-sm rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105";
    if (selectedCategory === category) {
      return `${baseClass} bg-cyan-500 text-gray-900 focus:ring-cyan-400 shadow-lg shadow-cyan-500/30`;
    }
    return `${baseClass} bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 flex flex-col md:flex-row items-center gap-8">
      <div className="flex-grow text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-cyan-300 mb-4">
          The Ultimate Showdown
        </h1>
        <p className="text-xl text-gray-300 mb-2 font-display">Brain vs Artificial Intelligence</p>
        <p className="max-w-2xl mx-auto md:mx-0 text-gray-400 mb-4">
          Test your knowledge about the fascinating differences between human intelligence and AI.
        </p>
        <p className="max-w-2xl mx-auto md:mx-0 text-gray-400 mb-8">
          Drag cards to the correct category and see who wins this battle of minds!
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-display text-gray-200 mb-4">Choose Category</h2>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={getCategoryButtonClass('all')}
              aria-pressed={selectedCategory === 'all'}
            >
              All Questions
            </button>
            <button
              onClick={() => setSelectedCategory(ChallengeCategory.Fact)}
              className={getCategoryButtonClass(ChallengeCategory.Fact)}
              aria-pressed={selectedCategory === ChallengeCategory.Fact}
            >
              Facts
            </button>
            <button
              onClick={() => setSelectedCategory(ChallengeCategory.UseCase)}
              className={getCategoryButtonClass(ChallengeCategory.UseCase)}
              aria-pressed={selectedCategory === ChallengeCategory.UseCase}
            >
              Use Cases
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-display text-gray-200 mb-4">Choose Difficulty</h2>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => onStart(Difficulty.Easy, selectedCategory)}
              className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-full hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30"
            >
              Easy (Facts Only)
            </button>
            <button
              onClick={() => onStart(Difficulty.Medium, selectedCategory)}
              className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30"
            >
              Medium
            </button>
            <button
              onClick={() => onStart(Difficulty.Hard, selectedCategory)}
              className="px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-full hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/30"
            >
              Hard
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="flex-shrink-0 text-center">
        <p className="text-gray-400 mb-3 text-sm max-w-[180px] mx-auto">Scan QR code to play on mobile or share with friends</p>
        <div className="p-3 bg-white rounded-lg shadow-xl">
          <img
            src="/image/Brain_vs_AI-1024.jpeg"
            alt="QR Code for Brain vs AI Game"
            className="w-40 h-40 md:w-48 md:h-48"
          />
        </div>
        <p className="text-gray-500 text-xs mt-2">brain-potential.vercel.app</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
