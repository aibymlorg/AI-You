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
  const baseStyles = "relative px-8 py-3 font-bold uppercase tracking-wider transition-all duration-200";

  const variants = {
    primary: "bg-cyan-400 text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]",
    secondary: "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10",
    danger: "bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(255,0,60,0.6)]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? 'PROCESSING...' : children}
    </button>
  );
};
