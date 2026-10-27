import React from 'react';
import { TabType } from '../types.ts';
import { Sun, Moon, Printer, Presentation, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPresentation: () => void;
  onPrint: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  onOpenPresentation,
  onPrint
}) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#lesson"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('lesson');
          }}
          className="flex items-baseline gap-1.5 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          <span className="font-extrabold text-indigo-700 dark:text-indigo-400">Indices</span>
          <span className="text-slate-700 dark:text-slate-300">Studio</span>
          <sup className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400 ml-0.5">1.3</sup>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onTabChange('lesson')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'lesson'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Lesson Plan
          </button>
          <button
            type="button"
            onClick={() => onTabChange('simulator')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'simulator'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Rewind Simulator
          </button>
          <button
            type="button"
            onClick={() => onTabChange('practice')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'practice'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Worksheet A (Practice)
          </button>
          <button
            type="button"
            onClick={() => onTabChange('challenge')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'challenge'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Worksheet B (Challenge)
          </button>
          <button
            type="button"
            onClick={() => onTabChange('guide')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'guide'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Laws &amp; Errors
          </button>
        </nav>

        {/* Zone 3: Primary Action & Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onPrint}
            title="Print or export current view as clean PDF/paper"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>

          <button
            type="button"
            onClick={onOpenPresentation}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-sm whitespace-nowrap"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Projector View</span>
            <span className="sm:hidden">Present</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle color theme"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sub-bar navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 bg-slate-50 dark:bg-slate-900 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => onTabChange('lesson')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'lesson' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Lesson
        </button>
        <button
          type="button"
          onClick={() => onTabChange('simulator')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'simulator' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Simulator
        </button>
        <button
          type="button"
          onClick={() => onTabChange('practice')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'practice' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Sheet A
        </button>
        <button
          type="button"
          onClick={() => onTabChange('challenge')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'challenge' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Sheet B
        </button>
        <button
          type="button"
          onClick={() => onTabChange('guide')}
          className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'guide' ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Laws
        </button>
      </div>
    </header>
  );
};
