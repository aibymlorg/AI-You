import React, { useState, useEffect } from 'react';
import { QUIZ_DATA } from '../data';
import { GlassCard } from './GlassCard';

export const QuizGame: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = QUIZ_DATA[currentIndex];
    const progress = ((currentIndex) / QUIZ_DATA.length) * 100;

    const handleOptionClick = (index: number) => {
        if (selectedOptionIndex !== null) return; // Prevent changing answer
        
        setSelectedOptionIndex(index);
        
        if (currentQuestion.options[index].isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < QUIZ_DATA.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedOptionIndex(null);
        } else {
            setIsFinished(true);
        }
    };

    const getRank = () => {
        const percentage = (score / QUIZ_DATA.length) * 100;
        if (percentage === 100) return { title: "AGI Architect", color: "text-emerald-400", msg: "Perfect! You understand the future." };
        if (percentage >= 80) return { title: "Prompt Engineer", color: "text-blue-400", msg: "Great job! You're ready for the new paradigm." };
        if (percentage >= 60) return { title: "Model Trainer", color: "text-yellow-400", msg: "Good effort. Review the report to level up." };
        return { title: "Data Labeler", color: "text-red-400", msg: "Keep learning! The future awaits." };
    };

    const resetGame = () => {
        setStarted(false);
        setCurrentIndex(0);
        setScore(0);
        setSelectedOptionIndex(null);
        setIsFinished(false);
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-fade-in text-center p-8">
                <div className="w-24 h-24 bg-primary-dark rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(125,1,0,0.4)] animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="font-outfit text-4xl font-bold text-primary-light mb-4">Simulation Ready</h2>
                <p className="text-primary-light/70 max-w-md mb-8">Test your understanding of the Future of AI. 5 questions. Real-time feedback. Can you achieve the rank of AGI Architect?</p>
                <button 
                    onClick={() => setStarted(true)}
                    className="px-8 py-4 bg-primary-dark hover:bg-red-800 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <span>Start Simulation</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        );
    }

    if (isFinished) {
        const rank = getRank();
        return (
            <div className="flex flex-col items-center justify-center animate-slide-up text-center p-8">
                <GlassCard className="p-10 max-w-lg w-full flex flex-col items-center border-t-4 border-t-primary-dark">
                    <h2 className="font-outfit text-2xl font-bold text-primary-light/60 mb-2">Simulation Complete</h2>
                    <div className="text-6xl font-bold text-primary-light mb-2">{Math.round((score/QUIZ_DATA.length)*100)}%</div>
                    <div className={`text-2xl font-bold ${rank.color} mb-6 font-outfit uppercase tracking-wider`}>{rank.title}</div>
                    
                    <p className="text-primary-light/80 mb-8">{rank.msg}</p>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={resetGame}
                            className="px-6 py-3 bg-neutral-dark/50 hover:bg-neutral-dark text-primary-light rounded-lg transition-colors border border-white/10"
                        >
                            Retry
                        </button>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6 text-primary-light/60 text-sm font-outfit">
                <span>Question {currentIndex + 1} of {QUIZ_DATA.length}</span>
                <span>Score: {score}</span>
            </div>
            <div className="w-full h-1 bg-neutral-dark/50 rounded-full mb-8 overflow-hidden">
                <div 
                    className="h-full bg-primary-dark transition-all duration-500 ease-out" 
                    style={{ width: `${progress}%` }} 
                />
            </div>

            <GlassCard className="p-6 md:p-10 min-h-[400px] flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-outfit font-semibold text-primary-light mb-8 leading-relaxed">
                        {currentQuestion.question}
                    </h3>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option, idx) => {
                            let optionClass = "border-primary-light/10 hover:bg-primary-light/5 text-primary-light/80";
                            let icon = null;

                            if (selectedOptionIndex !== null) {
                                if (idx === selectedOptionIndex) {
                                    // User picked this
                                    if (option.isCorrect) {
                                        optionClass = "bg-[#10B981] border-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
                                        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
                                    } else {
                                        optionClass = "bg-[#de3730] border-[#de3730] text-white";
                                        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
                                    }
                                } else if (option.isCorrect) {
                                    // Show correct answer if user picked wrong
                                    optionClass = "border-[#10B981] text-[#10B981] bg-[#10B981]/10";
                                } else {
                                    optionClass = "opacity-50 border-transparent";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(idx)}
                                    disabled={selectedOptionIndex !== null}
                                    className={`
                                        w-full text-left p-4 rounded-xl border-2 transition-all duration-200 
                                        font-inter text-lg flex items-center justify-between
                                        ${optionClass}
                                    `}
                                >
                                    <span>{option.text}</span>
                                    {icon}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {selectedOptionIndex !== null && (
                    <div className="mt-8 flex justify-end animate-fade-in">
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-primary-light text-primary-dark font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                        >
                            {currentIndex < QUIZ_DATA.length - 1 ? 'Next Question' : 'Finish Simulation'}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};