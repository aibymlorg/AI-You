import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    active?: boolean; // For hover effects or selected state
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', active = false }) => {
    return (
        <div className={`
            bg-primary-light/5 
            backdrop-blur-md 
            border 
            border-primary-light/10 
            rounded-2xl 
            transition-all 
            duration-300
            ${active ? 'border-primary-dark shadow-[0_0_20px_rgba(125,1,0,0.3)] bg-primary-light/10' : 'hover:bg-primary-light/10'}
            ${className}
        `}>
            {children}
        </div>
    );
};