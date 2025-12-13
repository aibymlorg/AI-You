import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onGetStarted: () => void;
  isStarted: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted, isStarted }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
           <span className="text-[#1a73e8] text-xl font-bold tracking-tight">Teachable Machine</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[#1a73e8]">About</a>
          <a href="#" className="hover:text-[#1a73e8]">FAQ</a>
        </nav>
        {!isStarted && (
          <button 
            onClick={onGetStarted}
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors shadow-sm"
          >
            Get Started
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
