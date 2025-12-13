
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
    summaryText = "太棒了！您對 AI 與人類智能之間的細微差別有著深刻的理解。";
  } else if (percentage >= 50) {
    summaryText = "做得好！您正在成為神經網絡專家的路上。";
  } else {
    summaryText = "一個很好的開始！人工智慧和神經科學的世界非常複雜。再玩一次以了解更多！";
  }

  return (
    <div className="text-center bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
      <h2 className="text-4xl font-display font-bold text-cyan-300 mb-4">遊戲結束！</h2>
      <p className="text-xl text-gray-300 mb-2">您的最終得分</p>
      <p className="text-7xl font-display font-bold text-white my-4">{score} / {total}</p>
      <p className="max-w-xl mx-auto text-gray-400 mb-8">{summaryText}</p>
      <button
        onClick={onPlayAgain}
        className="px-8 py-3 bg-cyan-500 text-gray-900 font-bold text-lg rounded-full hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30"
      >
        再玩一次
      </button>
    </div>
  );
};

export default SummaryScreen;
