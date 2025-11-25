import React from 'react';
import { Theme } from '../types';
import { Monitor, Terminal, Zap } from 'lucide-react';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-md p-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-xl">
      <button
        onClick={() => setTheme('minimal')}
        className={`p-2 rounded-full transition-all ${currentTheme === 'minimal' ? 'bg-gray-200 text-black' : 'text-gray-500 hover:text-black'}`}
        title="Minimal Mode"
      >
        <Monitor size={18} />
      </button>
      <button
        onClick={() => setTheme('accent')}
        className={`p-2 rounded-full transition-all ${currentTheme === 'accent' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-600'}`}
        title="Accent Mode"
      >
        <Zap size={18} />
      </button>
      <button
        onClick={() => setTheme('terminal')}
        className={`p-2 rounded-full transition-all ${currentTheme === 'terminal' ? 'bg-green-500 text-black' : 'text-gray-500 hover:text-green-500'}`}
        title="Terminal Mode"
      >
        <Terminal size={18} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
