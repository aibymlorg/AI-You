import React from 'react';
import { AppState } from '../types';

interface NavBarProps {
    currentState: AppState;
    onStateChange: (state: AppState) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentState, onStateChange }) => {
    return (
        <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex space-x-2 p-1.5 bg-neutral-dark/50 rounded-xl border border-primary-light/10 backdrop-blur-sm">
                <button
                    onClick={() => onStateChange(AppState.HOME)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === AppState.HOME 
                        ? 'bg-primary-dark text-primary-light shadow-lg' 
                        : 'text-primary-light/70 hover:text-primary-light hover:bg-white/5'
                    }`}
                >
                    Home
                </button>
                <button
                    onClick={() => onStateChange(AppState.LEARN)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === AppState.LEARN 
                        ? 'bg-primary-dark text-primary-light shadow-lg' 
                        : 'text-primary-light/70 hover:text-primary-light hover:bg-white/5'
                    }`}
                >
                    Analysis Report
                </button>
                <button
                    onClick={() => onStateChange(AppState.QUIZ)}
                    className={`px-6 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
                        currentState === AppState.QUIZ 
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