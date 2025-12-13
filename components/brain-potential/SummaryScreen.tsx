import React from 'react';

interface SummaryScreenProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ score, total, onPlayAgain }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  let summaryText = "";
  if (percentage >= 80) {
    summaryText = "Awesome! You really understand the differences between AI and human intelligence!";
  } else if (percentage >= 50) {
    summaryText = "Good job! You're on your way to becoming an AI expert!";
  } else {
    summaryText = "Great start! The world of AI and neuroscience is complex. Play again to learn more!";
  }

  return (
    <div className="text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
      <h2 className="text-4xl font-display font-bold text-cyan-300 mb-4">Game Over!</h2>
      <p className="text-xl text-gray-300 mb-2">Your Final Score</p>
      <p className="text-7xl font-display font-bold text-white my-4">{score} / {total}</p>
      <p className="max-w-xl mx-auto text-gray-400 mb-8">{summaryText}</p>
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-cyan-500 text-gray-900 font-bold text-lg rounded-full hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
      >
        Play Again
      </button>
    </div>
  );
};

export default SummaryScreen;
