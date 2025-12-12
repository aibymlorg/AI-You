import React from 'react';
import { MousePointer2 } from 'lucide-react';

interface TutorialSectionProps {
  title?: string;
  subtitle?: string;
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
        {title || "A Teachable Machine is a Simple AI"}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-center text-gray-600 mb-20">
          {subtitle}
        </p>
      )}
      {!subtitle && <div className="mb-20" />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

        {/* Step 1: Gather */}
        <div className="flex flex-col gap-6">
          <div className="h-48 flex items-center justify-center relative">
            {/* Visual Replica of the 'Classes' illustration */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold text-lg">Class 1</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                       <img src={`https://picsum.photos/40/40?random=${i}`} alt="dog" className="w-10 h-10 object-cover rounded mix-blend-multiply opacity-60" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-bold text-lg">Class 2</span>
                <div className="flex gap-1">
                  {[4, 5, 6].map(i => (
                    <div key={i} className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
                      <img src={`https://picsum.photos/40/40?random=${i+10}`} alt="dog" className="w-10 h-10 object-cover rounded mix-blend-multiply opacity-60" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-gray-400 font-normal">1</span>
              <h3 className="text-2xl font-medium text-gray-900">Gather</h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-lg">
              Gather and group your examples into classes, or categories, that you want the computer to learn.
            </p>
          </div>
        </div>

        {/* Step 2: Train */}
        <div className="flex flex-col gap-6">
          <div className="h-48 flex items-center justify-center">
            {/* Visual Replica of the 'Train Button' illustration */}
            <div className="relative">
              <div className="bg-[#d2e3fc] text-[#1967d2] px-8 py-3 rounded font-bold text-lg tracking-wide shadow-sm">
                TRAIN MODEL
              </div>
              <MousePointer2 className="w-12 h-12 text-gray-800 absolute -bottom-6 right-2 fill-white stroke-2" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-gray-400 font-normal">2</span>
              <h3 className="text-2xl font-medium text-gray-900">Train</h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-lg">
              Train your model, then instantly test it out to see whether it can correctly classify new examples.
            </p>
          </div>
        </div>

        {/* Step 3: Export */}
        <div className="flex flex-col gap-6">
          <div className="h-48 flex items-center justify-center">
            {/* Visual Replica of the 'Export' illustration */}
            <div className="relative w-48 h-32 bg-[#d2e3fc] rounded-lg p-3 flex flex-col shadow-inner">
               <div className="text-[#1967d2] font-bold text-xs mb-2 text-center">MY PROJECT</div>
               <div className="flex-1 bg-white/50 rounded flex items-center justify-center">
                 <img src="https://picsum.photos/40/40?random=100" className="w-8 h-8 rounded opacity-50" alt="project" />
               </div>
               <div className="mt-2 h-1 bg-white/50 rounded w-2/3 mx-auto"></div>

               {/* Phone overlay */}
               <div className="absolute -right-4 -bottom-4 w-16 h-28 bg-[#d2e3fc] rounded-lg border-2 border-white shadow-lg flex flex-col items-center p-1">
                  <div className="text-[6px] text-[#1967d2] font-bold mt-1">MY PROJECT</div>
                  <div className="w-10 h-10 bg-white/60 mt-1 rounded flex items-center justify-center">
                     <img src="https://picsum.photos/40/40?random=100" className="w-6 h-6 rounded opacity-50" alt="project" />
                  </div>
                  <div className="mt-auto mb-1 w-8 h-1 bg-gray-400/30 rounded-full"></div>
               </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl text-gray-400 font-normal">3</span>
              <h3 className="text-2xl font-medium text-gray-900">Export</h3>
            </div>
            <p className="text-gray-800 leading-relaxed text-lg">
              Export your model for your projects: sites, apps, and more. You can download your model or host it online.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutorialSection;
