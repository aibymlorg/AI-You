import React from 'react';
import { Menu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
  onGetStarted: () => void;
  isStarted: boolean;
}

const TMHeader: React.FC<HeaderProps> = ({ onGetStarted, isStarted }) => {
  const { t } = useLanguage();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
           <span className="text-[#1a73e8] text-xl font-bold tracking-tight">{t('teachableMachine.title')}</span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/reference/teachable_machine_about.html" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a73e8]">{t('teachableMachine.about')}</a>
          <a href="https://teachablemachine.withgoogle.com/faq" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a73e8]">{t('teachableMachine.faq')}</a>
        </nav>
        {!isStarted && (
          <button
            onClick={onGetStarted}
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors shadow-sm"
          >
            {t('teachableMachine.getStarted')}
          </button>
        )}
      </div>
    </header>
  );
};

export default TMHeader;
