import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { SlideData } from '../types';

interface FallbackSlideProps {
  data: SlideData;
}

const FallbackSlide: React.FC<FallbackSlideProps> = ({ data }) => {
  const { fallbackContent } = data;

  if (!fallbackContent) return null;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative group">
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700"></div>

        {/* Content Side */}
        <div className="flex-1 p-10 flex flex-col justify-center relative z-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Restricted Embed</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{data.title}</h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {fallbackContent.description}
          </p>
          
          <a 
            href={fallbackContent.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-transform active:scale-95 w-fit group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {fallbackContent.buttonText}
            <ExternalLink className="w-5 h-5" />
          </a>
          
          <p className="mt-6 text-base text-slate-300 font-medium">
            Please note that you can prompt to change the app in building-block as you wish
          </p>
        </div>

        {/* Image Side */}
        <div className="flex-1 relative h-64 md:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-900/80 to-transparent z-10" />
          <img 
            src={fallbackContent.image} 
            alt={data.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default FallbackSlide;
