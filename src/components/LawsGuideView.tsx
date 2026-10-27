import React, { useState } from 'react';
import { COMMON_MISTAKES } from '../data/lessonData.ts';
import { Calculator, AlertTriangle, BookCheck, ArrowRight, Check } from 'lucide-react';
import { formatExponentDisplay } from '../utils/mathValidator.ts';

export const LawsGuideView: React.FC = () => {
  // Interactive Power Calculator tool
  const [calcBase, setCalcBase] = useState<number>(2);
  const [calcExp, setCalcExp] = useState<number>(-3);

  const calculateResult = () => {
    if (calcBase === 0 && calcExp <= 0) {
      return { val: 'Undefined', steps: '0 to a non-positive power is undefined.' };
    }
    const val = Math.pow(calcBase, calcExp);
    let steps = '';
    if (calcExp === 0) {
      steps = `${calcBase}⁰ = 1 (any non-zero base to the 0th power equals 1)`;
    } else if (calcExp < 0) {
      const positiveExp = Math.abs(calcExp);
      const denom = Math.pow(calcBase, positiveExp);
      steps = `${calcBase}${calcExp} = 1 ÷ ${calcBase}³ = 1 / ${denom} ≈ ${val.toFixed(6).replace(/\.?0+$/, '')}`;
    } else {
      const factors = Array(calcExp).fill(calcBase).join(' × ');
      steps = `${calcBase}^${calcExp} = ${factors} = ${val.toLocaleString()}`;
    }
    return { val, steps };
  };

  const { steps } = calculateResult();

  return (
    <div className="space-y-10">
      {/* Intro */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Index Laws &amp; Conceptual Foundation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete mathematical reference with proofs, step-by-step derivations, and common misconception diagnostics.
        </p>
      </div>

      {/* 4 Core Laws with Proofs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Law 1 · Zero Index
            </span>
            <span className="text-xs font-mono text-slate-400">a ≠ 0</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            a<sup className="idx text-orange-600 dark:text-orange-400">0</sup> = 1
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Any non-zero number raised to the zero power is exactly 1.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <strong>Algebraic Derivation:</strong>
            <p>aⁿ ÷ aⁿ = 1 (any number divided by itself is 1)</p>
            <p>By division law: aⁿ ÷ aⁿ = aⁿ⁻ⁿ = a⁰</p>
            <p>Therefore: a⁰ = 1.</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Law 2 · Negative Index (Reciprocal)
            </span>
            <span className="text-xs font-mono text-slate-400">a ≠ 0</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            a<sup className="idx text-orange-600 dark:text-orange-400">−n</sup> = 1 / a<sup className="idx text-orange-600 dark:text-orange-400">n</sup>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            A negative exponent produces the reciprocal of the positive power.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <strong>Algebraic Derivation:</strong>
            <p>Consider a⁰ ÷ aⁿ = 1 ÷ aⁿ = 1 / aⁿ</p>
            <p>By division law: a⁰ ÷ aⁿ = a⁰⁻ⁿ = a⁻ⁿ</p>
            <p>Therefore: a⁻ⁿ = 1 / aⁿ.</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Law 3 · Multiplication of Powers
            </span>
            <span className="text-xs font-mono text-slate-400">Same Base</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            a<sup className="idx text-orange-600 dark:text-orange-400">m</sup> × a<sup className="idx text-orange-600 dark:text-orange-400">n</sup> = a<sup className="idx text-orange-600 dark:text-orange-400">m+n</sup>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            When multiplying expressions with identical bases, preserve the base and sum the indices.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <strong>Expanded Example:</strong>
            <p>2³ × 2² = (2 × 2 × 2) × (2 × 2)</p>
            <p>= 2 × 2 × 2 × 2 × 2 = 2⁵</p>
            <p>Indices: 3 + 2 = 5.</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Law 4 · Division of Powers
            </span>
            <span className="text-xs font-mono text-slate-400">Same Base</span>
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
            a<sup className="idx text-orange-600 dark:text-orange-400">m</sup> ÷ a<sup className="idx text-orange-600 dark:text-orange-400">n</sup> = a<sup className="idx text-orange-600 dark:text-orange-400">m−n</sup>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            When dividing expressions with identical bases, preserve the base and subtract the divisor's index from the dividend's index.
          </p>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
            <strong>Fraction Cancellation:</strong>
            <p>5⁴ ÷ 5² = (5 × 5 × 5 × 5) / (5 × 5)</p>
            <p>Cancel two 5s in numerator &amp; denominator: = 5²</p>
            <p>Indices: 4 − 2 = 2.</p>
          </div>
        </div>
      </div>

      {/* Interactive Quick Exponent Calculator & Verifier */}
      <div className="p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Interactive Exponent Explorer &amp; Verifier
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Test any base and integer exponent to see the expanded evaluation and fraction representation.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
              Base (a):
            </label>
            <input
              type="number"
              value={calcBase}
              onChange={(e) => setCalcBase(parseInt(e.target.value, 10) || 1)}
              className="w-20 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
              Exponent (n):
            </label>
            <input
              type="number"
              value={calcExp}
              onChange={(e) => setCalcExp(parseInt(e.target.value, 10) || 0)}
              className="w-20 px-3 py-1.5 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 font-mono text-sm space-y-1">
          <div className="text-slate-500 text-xs">Step-by-step Evaluation:</div>
          <div className="text-indigo-700 dark:text-indigo-300 font-bold">{steps}</div>
        </div>
      </div>

      {/* Misconceptions Deep Dive */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Detailed Diagnostic of Common Mistakes
          </h3>
        </div>

        <div className="space-y-3">
          {COMMON_MISTAKES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-sm font-bold text-red-600 dark:text-red-400 line-through">
                  Mistake: {item.mistake}
                </span>
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Correct Rule: {item.correction}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {item.explanation}
              </p>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
                {item.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
