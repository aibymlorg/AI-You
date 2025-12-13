import React, { useState } from 'react';
import Header from './components/Header';
import TutorialSection from './components/TutorialSection';
import MachineWorkbench from './components/MachineWorkbench';
import { AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Header 
        onGetStarted={() => setAppState(AppState.WORKBENCH)} 
        isStarted={appState === AppState.WORKBENCH}
      />
      
      <main className="flex-1 flex flex-col">
        {appState === AppState.LANDING ? (
          <div className="animate-in fade-in duration-500">
            <TutorialSection />
            <div className="flex justify-center pb-20">
               <button 
                  onClick={() => setAppState(AppState.WORKBENCH)}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  Get Started
               </button>
            </div>
          </div>
        ) : (
          <MachineWorkbench />
        )}
      </main>
    </div>
  );
}

export default App;
