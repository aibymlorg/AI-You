
import React from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { SlideData } from '../types';

interface ImageLauncherSlideProps {
  data: SlideData;
}

const ImageLauncherSlide: React.FC<ImageLauncherSlideProps> = ({ data }) => {
  return (
    <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${data.backgroundImage})` }}
      />
      
      {/* Dark Overlay Gradient for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-10" />

      {/* Central Launch Interaction */}
      <div className="relative z-20 flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
        
        {/* Pulsing Play Button */}
        <a
          href={data.source}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-40 h-40 md:w-52 md:h-52 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:scale-110 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />
            <img src="/image/ML.jpg" alt="ML" className="w-full h-full object-cover" />
        </a>

        {/* Label */}
        <div className="flex flex-col items-center text-center max-w-lg px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight drop-shadow-xl">
            {data.title}
          </h1>
          
          <a 
            href={data.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-6 py-2 bg-slate-900/60 backdrop-blur-md border border-slate-700 rounded-full text-slate-200 hover:bg-slate-800 hover:text-white transition-all group"
          >
            <span className="text-sm font-medium">Launch Experience</span>
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default ImageLauncherSlide;
