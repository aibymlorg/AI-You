
import React, { useState } from 'react';
import { Target } from '../types';
import { BrainIcon, LlmIcon } from './Icons';

interface DropZoneProps {
  target: Target;
  onDrop: (challengeId: number, droppedOn: Target) => void;
  isDragging: boolean;
}

const DropZone: React.FC<DropZoneProps> = ({ target, onDrop, isDragging }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const challengeId = parseInt(e.dataTransfer.getData('challengeId'), 10);
    if (!isNaN(challengeId)) {
      onDrop(challengeId, target);
    }
    setIsOver(false);
  };
  
  const isBrain = target === Target.Brain;
  const config = {
    title: isBrain ? '人腦' : 'AI - 大型語言模型',
    icon: isBrain ? <BrainIcon className="w-16 h-16 mb-4 text-fuchsia-400" /> : <LlmIcon className="w-16 h-16 mb-4 text-cyan-400" />,
    borderColor: isBrain ? 'border-fuchsia-500' : 'border-cyan-500',
    hoverColor: isBrain ? 'border-fuchsia-300 bg-fuchsia-500/10 shadow-glow-fuchsia' : 'border-cyan-300 bg-cyan-500/10 shadow-glow-cyan',
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={() => setIsOver(true)}
      onDragLeave={() => setIsOver(false)}
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all duration-300
        ${config.borderColor}
        ${isOver ? config.hoverColor : 'bg-gray-900/50'}
        ${isDragging ? 'opacity-100' : 'opacity-70'}
      `}
      style={{ minHeight: '200px' }}
    >
      {config.icon}
      <h3 className="text-2xl font-display font-bold text-gray-200">{config.title}</h3>
    </div>
  );
};

export default DropZone;
