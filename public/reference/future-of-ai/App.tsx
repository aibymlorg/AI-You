import React, { useState } from 'react';
import { AppState } from './types';
import { NavBar } from './components/NavBar';
import { ReportView } from './components/ReportView';
import { QuizGame } from './components/QuizGame';

export default function App() {
    const [appState, setAppState] = useState<AppState>(AppState.HOME);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-brand-bg to-secondary-dark text-primary-light font-inter antialiased selection:bg-primary-dark selection:text-white">
            
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-primary-dark/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="fixed bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-background/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <main className="relative z-10 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto min-h-screen flex flex-col">
                
                {/* Header Section - Always visible but smaller on sub-pages */}
                <header className={`text-center transition-all duration-500 ${appState === AppState.HOME ? 'py-20 md:py-32' : 'py-8'}`}>
                    <h1 
                        className={`font-outfit font-bold tracking-tight transition-all duration-500 cursor-pointer ${
                            appState === AppState.HOME ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-2xl md:text-3xl'
                        }`}
                        onClick={() => setAppState(AppState.HOME)}
                    >
                        The <span className="text-background">Future of AI</span>
                    </h1>
                    
                    {appState === AppState.HOME && (
                        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-primary-light/80 leading-relaxed">
                                Explore the paradigm shift towards Foundation Models and Generative AI. 
                                Understand the "Secret Sauce" of Self-Supervised Learning.
                            </p>
                            
                            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                                <button 
                                    onClick={() => setAppState(AppState.LEARN)}
                                    className="px-8 py-3 bg-neutral-dark/40 border border-primary-light/20 hover:bg-neutral-dark/60 rounded-xl font-semibold backdrop-blur-sm transition-all"
                                >
                                    Read Briefing
                                </button>
                                <button 
                                    onClick={() => setAppState(AppState.QUIZ)}
                                    className="px-8 py-3 bg-primary-dark hover:bg-red-900 text-primary-light font-semibold rounded-xl shadow-lg shadow-red-900/20 transition-all transform hover:scale-105"
                                >
                                    Start Simulation
                                </button>
                            </div>

                            <div className="mt-12 text-sm text-primary-light/40">
                                <a 
                                    href="https://youtu.be/y1fGlAECNFM?si=YLLgR0AMO1hz-tIA" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-primary-light underline decoration-primary-dark underline-offset-4 transition-colors"
                                >
                                    Watch Full Lecture Source
                                </a>
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content Area */}
                {appState !== AppState.HOME && (
                    <>
                        <NavBar currentState={appState} onStateChange={setAppState} />
                        
                        <div className="flex-grow pb-12">
                            {appState === AppState.LEARN && <ReportView />}
                            {appState === AppState.QUIZ && <QuizGame />}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}