import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed right-6 top-24 md:right-10 md:top-28 z-50 p-2.5 rounded-full transition-all duration-500 hover:scale-110 ${
        isDarkMode 
          ? 'bg-space-dark/80 hover:bg-space-light/80 shadow-[0_0_20px_rgba(155,135,245,0.6)]' 
          : 'bg-white shadow-lg hover:bg-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <div className={`absolute transition-all duration-700 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
          <Moon className="h-6 w-6 text-space-accent" />
        </div>
        <div className={`absolute transition-all duration-700 ${!isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
          <Sun className="h-6 w-6 text-[#F97316]" />
        </div>
        <span className="sr-only">Toggle theme</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
