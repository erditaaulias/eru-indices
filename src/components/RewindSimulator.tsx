import React, { useState } from 'react';
import { Play, RotateCcw, ChevronLeft, ChevronRight, HelpCircle, ArrowRight, Eye, Clock } from 'lucide-react';
import { formatExponentDisplay } from '../utils/mathValidator.ts';

interface RewindSimulatorProps {
  compact?: boolean;
}

export const RewindSimulator: React.FC<RewindSimulatorProps> = ({ compact = false }) => {
  const [base, setBase] = useState<number>(2);
  const [customBaseInput, setCustomBaseInput] = useState<string>('4');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [hour, setHour] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const activeBase = isCustom ? Math.max(2, Math.min(20, parseInt(customBaseInput, 10) || 2)) : base;

  // Calculate views and fractions
  const rawViews = 1000 * Math.pow(activeBase, hour);
  const isFractional = hour < 0;
  const denominator = Math.pow(activeBase, Math.abs(hour));
  const fractionStr = isFractional ? `1/${denominator}` : `${Math.pow(activeBase, hour)}`;

  // 24-hr clock time representation: hour 0 is 12:00 (noon)
  const calculateClockTime = (h: number): string => {
    const rawHours = ((12 + h) % 24 + 24) % 24;
    const padded = rawHours < 10 ? `0${rawHours}:00` : `${rawHours}:00`;
    const label = h === 0 ? 'Noon' : h > 0 ? `${h}h after noon` : `${Math.abs(h)}h before noon`;
    return `${padded} (${label})`;
  };

  const cellHours = [-3, -2, -1, 0, 1, 2, 3, 4, 5];

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-xs overflow-hidden">
      {/* Header section */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-950/40">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400">
                <Eye className="w-4 h-4" />
              </span>
              Scenario: Rewind the Views
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            A viral video has exactly <strong className="text-slate-800 dark:text-slate-200">1,000 views at noon (Hour 0)</strong> and multiplies each hour.
          </p>
        </div>

        {/* Base selector segmented buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-500 uppercase">Growth factor:</span>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800">
            {[2, 3, 10].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setBase(b);
                  setIsCustom(false);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  !isCustom && base === b
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ×{b}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsCustom(true)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                isCustom
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Custom
            </button>
          </div>
          {isCustom && (
            <input
              type="number"
              min={2}
              max={20}
              value={customBaseInput}
              onChange={(e) => setCustomBaseInput(e.target.value)}
              className="w-14 px-2 py-1 text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              title="Enter custom base integer (2-20)"
            />
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Main interactive stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left readout: Formula and evaluation */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/60 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                Time: {calculateClockTime(hour)}
              </span>
              <span>Hour Index n = {hour}</span>
            </div>

            {/* Prominent Expression Display */}
            <div className="my-2 flex flex-wrap items-baseline gap-3">
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                {activeBase}
                <sup className="idx text-orange-600 dark:text-orange-400 text-2xl font-bold ml-1">
                  {formatExponentDisplay(hour)}
                </sup>
              </div>

              <div className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="text-slate-400">=</span>
                {hour < 0 ? (
                  <span className="inline-flex items-center gap-2 font-mono">
                    <span className="text-slate-500">1 ÷ {activeBase}<sup>{Math.abs(hour)}</sup></span>
                    <span className="text-slate-400">=</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                      1 / {denominator}
                    </span>
                  </span>
                ) : hour === 0 ? (
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    1
                  </span>
                ) : (
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {Math.pow(activeBase, hour).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Real World Impact */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-sm">
              <div className="text-slate-600 dark:text-slate-300">
                Total Views: <strong className="text-slate-900 dark:text-white font-mono text-base">{rawViews >= 1 ? Math.round(rawViews).toLocaleString() : rawViews.toFixed(3)}</strong>
                <span className="text-xs text-slate-500 ml-1.5">({fractionStr} thousand views)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showExplanation ? 'Hide why' : 'Why does this work?'}
              </button>
            </div>
          </div>

          {/* Right: Slider & Step controls */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                <span>−3 (3 hrs ago)</span>
                <span className="text-slate-900 dark:text-slate-100 font-bold">Hour: {formatExponentDisplay(hour)}</span>
                <span>+5 (5 hrs ahead)</span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min={-3}
                max={5}
                step={1}
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Stepper buttons */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setHour((h) => Math.max(-3, h - 1))}
                disabled={hour <= -3}
                className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>−1 hr (÷{activeBase})</span>
              </button>

              <button
                type="button"
                onClick={() => setHour(0)}
                className="py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1"
                title="Reset to Hour 0 (Noon)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Noon</span>
              </button>

              <button
                type="button"
                onClick={() => setHour((h) => Math.min(5, h + 1))}
                disabled={hour >= 5}
                className="flex-1 py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center justify-center gap-1"
              >
                <span>+1 hr (×{activeBase})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Explanation expandable card */}
        {showExplanation && (
          <div className="p-4 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <h4 className="font-bold text-sm mb-1 text-amber-950 dark:text-amber-100">
              The Pattern of Halving &amp; Doubling:
            </h4>
            <p className="mb-2">
              Every step to the <strong>right</strong> multiplies by {activeBase}: {activeBase}¹ = {activeBase}, {activeBase}² = {activeBase * activeBase}, {activeBase}³ = {activeBase * activeBase * activeBase}.
            </p>
            <p className="mb-2">
              Therefore, every step to the <strong>left</strong> MUST do the inverse operation: <strong>divide by {activeBase}</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
              <li>From hour 1 ({activeBase}) to hour 0: divide by {activeBase} → {activeBase} ÷ {activeBase} = <strong>1</strong>. Hence {activeBase}⁰ = 1.</li>
              <li>From hour 0 (1) to hour −1: divide by {activeBase} → 1 ÷ {activeBase} = <strong>1/{activeBase}</strong>. Hence {activeBase}⁻¹ = 1/{activeBase}.</li>
              <li>From hour −1 to hour −2: divide by {activeBase} again → (1/{activeBase}) ÷ {activeBase} = <strong>1/{activeBase * activeBase}</strong> = <strong>1/{activeBase}²</strong>.</li>
            </ul>
          </div>
        )}

        {/* Interactive Ribbon of Hours from -3 to 5 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Tap any cell to jump to that hour:</span>
            <span>Step left: ÷{activeBase} · Step right: ×{activeBase}</span>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="grid grid-cols-9 gap-1.5 min-w-[540px]">
              {cellHours.map((h) => {
                const isSelected = hour === h;
                const cellFrac = h < 0 ? `1/${Math.pow(activeBase, -h)}` : `${Math.pow(activeBase, h)}`;
                return (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHour(h)}
                    className={`py-2 px-1.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-900'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold leading-none mb-1">
                      {activeBase}
                      <sup className={isSelected ? 'text-white' : 'idx text-orange-600 dark:text-orange-400'}>
                        {formatExponentDisplay(h)}
                      </sup>
                    </div>
                    <div className={`text-[11px] font-mono leading-none truncate ${isSelected ? 'text-indigo-100 font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                      {cellFrac}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual Growth scale indicator */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between mb-2">
            <span>Scale of Views relative to Noon (1,000 views = 1.0×)</span>
            <span className="font-mono text-slate-900 dark:text-slate-100 font-bold">
              {rawViews >= 1000 ? `${(rawViews / 1000).toLocaleString()}×` : `${fractionStr}×`}
            </span>
          </div>
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
            {/* Logarithmic / visual representation */}
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(100, Math.max(3, ((hour + 3) / 8) * 100))}%`
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>125 views (1/8)</span>
            <span>250 views (1/4)</span>
            <span>500 views (1/2)</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">1,000 views (Noon)</span>
            <span>2,000 views</span>
            <span>4,000 views</span>
            <span>8,000 views</span>
            <span>16,000 views</span>
            <span>32,000 views</span>
          </div>
        </div>
      </div>
    </div>
  );
};
