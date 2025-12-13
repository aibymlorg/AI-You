import React, { useState } from 'react';
import TMHeader from './teachable-machine/TMHeader';
import TutorialSection from './teachable-machine/TutorialSection';
import MachineWorkbench from './teachable-machine/MachineWorkbench';
import { AppState } from '../teachable-machine-types';
import { SlideData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface TeachableMachineSlideProps {
  data: SlideData;
}

const TeachableMachineSlide: React.FC<TeachableMachineSlideProps> = ({ data }) => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const { t } = useLanguage();

  return (
    <div className="w-full h-full bg-white flex flex-col font-sans text-gray-900 overflow-auto">
      <TMHeader
        onGetStarted={() => setAppState(AppState.WORKBENCH)}
        isStarted={appState === AppState.WORKBENCH}
      />

      <main className="flex-1 flex flex-col">
        {appState === AppState.LANDING ? (
          <div className="animate-in fade-in duration-500">
            <TutorialSection title={data.title} subtitle={data.subtitle} />
            <div className="flex justify-center pb-20">
               <button
                  onClick={() => setAppState(AppState.WORKBENCH)}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  {t('teachableMachine.getStarted')}
               </button>
            </div>
          </div>
        ) : (
          <MachineWorkbench />
        )}
      </main>
    </div>
  );
};

export default TeachableMachineSlide;
