import React from 'react';
import type { Challenge } from '../types';

interface ChallengeCardProps {
  challenge: Challenge;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onDragStart, onDragEnd }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('challengeId', challenge.id.toString());
    onDragStart();
  };
  
  return (
    <div
      key={challenge.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className="w-full max-w-md bg-gray-800 border-2 border-dashed border-gray-500 rounded-xl p-6 text-center cursor-grab active:cursor-grabbing transform transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-glow-cyan"
    >
      <p className="text-xl font-medium text-gray-100">{challenge.text}</p>
    </div>
  );
};

export default ChallengeCard;
