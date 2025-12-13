
import React from 'react';

interface FeedbackModalProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isCorrect, explanation, onNext }) => {
  const statusConfig = {
    title: isCorrect ? "答對了！" : "不太對喔！",
    bgColor: isCorrect ? "bg-green-500" : "bg-red-500",
    shadow: isCorrect ? "shadow-glow-green" : "shadow-glow-red",
    borderColor: isCorrect ? "border-green-400/50" : "border-red-400/50",
    textColor: isCorrect ? "text-green-300" : "text-red-300",
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-lg bg-gray-800 rounded-2xl border ${statusConfig.borderColor} ${statusConfig.shadow} p-8 text-center`}>
        <h2 className={`text-4xl font-display font-bold mb-4 ${statusConfig.textColor}`}>
          {statusConfig.title}
        </h2>
        <p className="text-gray-300 mb-6 text-lg">{explanation}</p>
        <button
          onClick={onNext}
          className={`w-full px-6 py-3 ${statusConfig.bgColor} text-white font-bold text-lg rounded-full hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300`}
        >
          下一題
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
