import React from 'react';
import { TargetEntity } from '../../ai-limits-types';
import { Crosshair } from 'lucide-react';

interface TargetProps {
  data: TargetEntity;
  onClick: (id: string) => void;
}

export const GameTarget: React.FC<TargetProps> = ({ data, onClick }) => {
  return (
    <div
      onClick={() => onClick(data.id)}
      className="absolute cursor-pointer select-none transition-transform duration-100 ease-linear group"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        transform: `translate(-50%, -50%) scale(${data.scale})`,
        zIndex: 50,
      }}
    >
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full animate-[spin_4s_linear_infinite]" />
        <div className="absolute inset-2 border border-purple-500/50 rounded-full animate-[spin_3s_linear_infinite_reverse]" />

        {/* Core Shape */}
        <div className="relative z-10 bg-black/80 backdrop-blur-sm border border-cyan-400 p-4 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:bg-cyan-400/20 group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all">
          <div className="flex flex-col items-center justify-center">
             <span className="font-bold text-2xl text-cyan-400 group-hover:text-white">
               {data.optionId.toUpperCase()}
             </span>
             <Crosshair className="w-4 h-4 text-purple-500 mt-1 opacity-50 group-hover:opacity-100" />
          </div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Label (Only visible on hover) */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[150px] text-center hidden group-hover:block">
        <p className="text-xs text-cyan-400 font-bold tracking-widest bg-black/90 px-2 py-1 rounded border border-cyan-400/50">
          TARGET DETECTED
        </p>
      </div>
    </div>
  );
};
