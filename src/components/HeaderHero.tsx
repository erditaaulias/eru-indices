import React from 'react';
import { Target, Sparkles, BookOpen } from 'lucide-react';

interface HeaderHeroProps {
  onJumpToTab?: (tab: 'lesson' | 'simulator' | 'practice' | 'challenge') => void;
}

export const HeaderHero: React.FC<HeaderHeroProps> = () => {
  return (
    <div className="pt-6 pb-4 border-b border-slate-200 dark:border-slate-800 mb-8">
      {/* Category / Discipline kicker with unboxed text */}
      <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2">
        <span>Mathematics</span>
        <span aria-hidden="true">·</span>
        <span>Number &amp; Algebra</span>
        <span aria-hidden="true">·</span>
        <span>Exponent Laws</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Indices<sup className="idx text-orange-600 dark:text-orange-400 text-xl font-mono ml-1">1.3</sup>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Discover the logic of zero and negative powers through viral video growth, then master multiplication and division laws.
          </p>
        </div>
      </div>

      {/* Learning Objectives - Clean structured boxes */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 shrink-0 mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
              Learning Objective 1
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Evaluate and use positive, negative, and zero indices, writing negative powers as fractions.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs flex items-start gap-3">
          <div className="p-1.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
              Learning Objective 2
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              Apply index laws to simplify products (aᵐ × aⁿ = aᵐ⁺ⁿ) and quotients (aᵐ ÷ aⁿ = aᵐ⁻ⁿ).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
