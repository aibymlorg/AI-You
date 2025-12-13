import React from 'react';
import { FutureAIAppState } from '../../future-of-ai-types';

interface NavBarProps {
    currentState: FutureAIAppState;
    onStateChange: (state: FutureAIAppState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentState, onStateChange }) => {
    return (
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex space-x-2 p-1.5 bg-neutral-dark/50 rounded-xl border border-primary-light/10 backdrop-blur-sm">
                <button
                    onClick={() => onStateChange(FutureAIAppState.HOME)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === FutureAIAppState.HOME
                        ? 'bg-primary-dark text-primary-light shadow-lg'
                        : 'text-primary-light/70 hover:text-primary-light hover:bg-white/5'
                    }`}
                >
                    Home
                </button>
                <button
                    onClick={() => onStateChange(FutureAIAppState.LEARN)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === FutureAIAppState.LEARN
                        ? 'bg-primary-dark text-primary-light shadow-lg'
                        : 'text-primary-light/70 hover:text-primary-light hover:bg-white/5'
                    }`}
                >
                    Analysis Report
                </button>
                <button
                    onClick={() => onStateChange(FutureAIAppState.QUIZ)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === FutureAIAppState.QUIZ
                        ? 'bg-primary-dark text-primary-light shadow-lg'
                        : 'text-primary-light/70 hover:text-primary-light hover:bg-white/5'
                    }`}
                >
                    Simulation Game
                </button>
            </div>
        </div>
    );
};
