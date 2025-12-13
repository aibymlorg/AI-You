import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { t, language } = useLanguage();

  // Get educational content from translations based on language
  const getEducationalContent = () => {
    if (language === 'zh') {
      return [
        {
          title: '簡介',
          points: [
            'AI是旨在模擬人類智能的總體領域。',
            '關鍵概念：AI > 機器學習（ML）> 深度學習（DL）> 生成式AI（GenAI）。'
          ]
        },
        {
          title: '人工智慧（AI）',
          points: [
            '最廣泛的術語：模擬人類智能（學習、推理、判斷）。',
            '歷史：幾十年前從「專家系統」（編程規則）開始。'
          ]
        },
        {
          title: '機器學習（ML）',
          points: [
            'AI的子集：機器從數據中學習，無需明確編程。',
            '機制：分析訓練數據以找到模式。',
            '關鍵用途：預測、異常檢測（網路安全）。'
          ]
        },
        {
          title: '深度學習（DL）',
          points: [
            'ML的子集：使用模仿大腦的多層神經網絡。',
            '「深度」指的是多個處理層。',
            '功能強大，但通常是「黑盒子」（難以解釋推理）。'
          ]
        },
        {
          title: '生成式AI（GenAI）',
          points: [
            '現代AI子集：專注於創造新內容（文本、圖像、音頻）。',
            '建立在基礎模型上（如大型語言模型LLMs）。',
            '類比：像作曲新歌，而不只是分析音符。',
            '影響：大幅加速AI的採用。'
          ]
        }
      ];
    } else {
      return [
        {
          title: 'Introduction',
          points: [
            'AI is the overarching field aiming to simulate human intelligence.',
            'Key concepts: AI > Machine Learning (ML) > Deep Learning (DL) > Generative AI (GenAI).'
          ]
        },
        {
          title: 'Artificial Intelligence (AI)',
          points: [
            'Broadest term: Simulating human intelligence (learning, inference, reasoning).',
            "History: Started decades ago with 'Expert Systems' (programmed rules)."
          ]
        },
        {
          title: 'Machine Learning (ML)',
          points: [
            'Subset of AI: Machines learn from data without explicit programming.',
            'Mechanism: Analyzes training data to find patterns.',
            'Key Use: Prediction, outlier detection (cybersecurity).'
          ]
        },
        {
          title: 'Deep Learning (DL)',
          points: [
            'Subset of ML: Uses multi-layered neural networks mimicking the brain.',
            "The 'Deep' refers to the multiple processing layers.",
            "Powerful but often a 'black box' (hard to explain reasoning)."
          ]
        },
        {
          title: 'Generative AI (GenAI)',
          points: [
            'Modern Subset of AI: Focuses on CREATING NEW content (text, images, audio).',
            'Built on Foundation Models (like Large Language Models - LLMs).',
            'Analogy: Like composing a new song rather than just analyzing notes.',
            'Impact: Massive acceleration in AI adoption.'
          ]
        }
      ];
    }
  };

  const educationalContent = getEducationalContent();

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
          {educationalContent.map((section, idx) => (
            <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{section.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {section.points.map((point, pIdx) => (
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
