import React from 'react';
import { EDUCATIONAL_CONTENT } from '../../ai-balloon-constants';
import { useLanguage } from '../../contexts/LanguageContext';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden relative">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">
          {t('aiBalloon.title')}
        </h1>
        <p className="text-gray-600 text-lg">
          {t('aiBalloon.subtitle')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 mb-6 border-y border-gray-200 py-4 custom-scrollbar">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sticky top-0 bg-white/95 py-2">
          {t('aiBalloon.missionBriefing')}
        </h2>
        <div className="space-y-6">
          {EDUCATIONAL_CONTENT.map((section, idx) => (
            <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{section.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {section.content.map((point, pIdx) => (
                  <li key={pIdx} className="leading-relaxed">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <button
          onClick={onStart}
          className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all transform active:scale-95"
        >
          {t('aiBalloon.startGame')}
        </button>

        <button
          onClick={() => window.open('https://youtu.be/qYNweeDHiyU?si=4llHOggTmvxA5Y6A', '_blank')}
          className="group flex items-center gap-2 px-6 py-2 bg-white border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-50 transition-colors"
        >
          <svg className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
          </svg>
          {t('aiBalloon.learnDetail')}
        </button>

        <p className="text-sm text-gray-500 mt-2">
          {t('aiBalloon.readConcepts')}
        </p>
      </div>
    </div>
  );
};

export default StartScreen;
