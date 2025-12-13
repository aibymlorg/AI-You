import React from 'react';

interface BalloonProps {
  text: string;
  x: number;
  y: number;
  color: string;
  isBursting: boolean;
  isSaved: boolean;
  onClick: () => void;
}

const Balloon: React.FC<BalloonProps> = ({ text, x, y, color, isBursting, isSaved, onClick }) => {
  // Styles for the balloon shape and water effect
  const baseStyle = `absolute w-20 h-24 transform -translate-x-1/2 cursor-pointer transition-transform select-none`;
  const shapeStyle = `rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),inset_10px_10px_20px_rgba(255,255,255,0.4)]`;
  
  if (isSaved) {
     return (
        <div 
            className="absolute z-20"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%) scale(0)' }}
        >
            <div className="text-green-600 font-bold text-xl animate-bounce">Saved!</div>
        </div>
     )
  }

  if (isBursting) {
    return (
      <div 
        className="absolute z-10"
        style={{ left: `${x}%`, top: '90%' }}
      >
        {/* Splash Effect */}
        <div className={`w-24 h-8 ${color} opacity-60 rounded-[50%] animate-ping`}></div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
             <div className="w-2 h-2 bg-blue-300 rounded-full animate-[ping_0.5s_ease-out]"></div>
             <div className="w-2 h-2 bg-blue-400 rounded-full animate-[ping_0.6s_ease-out] translate-x-4"></div>
             <div className="w-2 h-2 bg-blue-200 rounded-full animate-[ping_0.4s_ease-out] -translate-x-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`${baseStyle} animate-wobble active:scale-95`}
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className={`w-full h-full ${color} opacity-90 ${shapeStyle} flex items-center justify-center relative overflow-hidden border-2 border-white/20`}>
        {/* Highlight for wet look */}
        <div className="absolute top-4 left-4 w-4 h-6 bg-white opacity-40 rounded-[50%] rotate-45 blur-[2px]"></div>
        
        <span className="text-white font-bold text-3xl drop-shadow-md z-10">{text}</span>
      </div>
      {/* String tied to bottom */}
      <div className="absolute -bottom-1 left-1/2 w-1 h-3 bg-white/50 -translate-x-1/2"></div>
    </div>
  );
};

export default Balloon;