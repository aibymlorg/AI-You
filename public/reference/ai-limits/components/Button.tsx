import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-3 font-orbitron font-bold uppercase tracking-wider transition-all duration-200 clip-path-polygon";
  
  const variants = {
    primary: "bg-cyber-primary text-cyber-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    secondary: "border border-cyber-primary text-cyber-primary hover:bg-cyber-primary/10",
    danger: "bg-cyber-accent text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
      {...props}
    >
      {isLoading ? 'PROCESSING...' : children}
    </button>
  );
};
