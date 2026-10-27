import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipForward, AlertTriangle, ArrowRight, Clock, HelpCircle, Check, Sparkles } from 'lucide-react';
import { RUN_SHEET_STEPS, COMMON_MISTAKES, EXIT_TICKET_QUESTIONS } from '../data/lessonData.ts';
import { RewindSimulator } from './RewindSimulator.tsx';
import { TabType } from '../types.ts';

interface LessonPlanViewProps {
  onNavigateTab: (tab: TabType) => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({ onNavigateTab }) => {
  // Timer state for lesson facilitation
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(RUN_SHEET_STEPS[0].durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Exit ticket selections
  const [exitTicketAnswers, setExitTicketAnswers] = useState<Record<number, string>>({});
  const [showExitTicketResults, setShowExitTicketResults] = useState<boolean>(false);

  // Active step change timer reset
  useEffect(() => {
    setSecondsLeft(RUN_SHEET_STEPS[activeStepIndex].durationMinutes * 60);
    setIsTimerRunning(false);
  }, [activeStepIndex]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (secondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextPhase = () => {
    if (activeStepIndex < RUN_SHEET_STEPS.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  return (
    <div className="space-y-10">
      {/* 1. Interactive Simulation & Hook Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Interactive Exploration
          </h2>
          <span className="text-xs font-mono text-slate-500">Projector Ready</span>
        </div>
        <RewindSimulator />
      </section>

      {/* 2. Timed Lesson Run Sheet with Integrated Facilitator Timer */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              50-Minute Lesson Run Sheet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Pacing plan for classroom delivery, whiteboard collection, and peer discussion.
            </p>
          </div>

          {/* Facilitator Timer Badge */}
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1.5 font-mono text-base font-bold text-slate-900 dark:text-white px-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{formatTimer(secondsLeft)}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                title={isTimerRunning ? 'Pause timer' : 'Start phase timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setSecondsLeft(RUN_SHEET_STEPS[activeStepIndex].durationMinutes * 60)}
                className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextPhase}
                disabled={activeStepIndex >= RUN_SHEET_STEPS.length - 1}
                className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 transition-colors"
                title="Next phase"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {RUN_SHEET_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'border-indigo-500 bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {step.durationMinutes} min
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider self-start sm:self-center">
                      Active Phase
                    </span>
                  )}
                </div>

                {/* Collapsible detail when active */}
                {isActive && (
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200">
                      <strong className="block mb-0.5 text-indigo-950 dark:text-indigo-100 font-bold">
                        Suggested Teacher Script:
                      </strong>
                      "{step.teacherSay}"
                    </div>
                    {step.keyPrompt && (
                      <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200">
                        <strong className="block mb-0.5 text-amber-950 dark:text-amber-100 font-bold">
                          Key Pedagogical Check:
                        </strong>
                        {step.keyPrompt}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Key Ideas & Mathematical Laws */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Key Ideas &amp; Laws
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Four fundamental exponent laws to display and memorize.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
              a<sup className="idx text-orange-600 dark:text-orange-400">0</sup> = 1
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Zero Index</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Any non-zero base to power 0 equals 1. In our video model, Hour 0 is the starting baseline of 1,000 views. In algebra, aⁿ ÷ aⁿ = a⁰ = 1.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
              a<sup className="idx text-orange-600 dark:text-orange-400">−n</sup> = 1 ÷ a<sup className="idx text-orange-600 dark:text-orange-400">n</sup>
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Negative Index (Reciprocal)</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A negative exponent indicates a reciprocal fraction, NOT a negative number! For example: 2⁻³ = 1/2³ = 1/8.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
              a<sup className="idx text-orange-600 dark:text-orange-400">m</sup> × a<sup className="idx text-orange-600 dark:text-orange-400">n</sup> = a<sup className="idx text-orange-600 dark:text-orange-400">m+n</sup>
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Multiplication Law</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When multiplying powers with the same base, retain the base and <strong>add</strong> the exponents. Example: 3² × 3⁴ = 3²⁺⁴ = 3⁶.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mb-1">
              a<sup className="idx text-orange-600 dark:text-orange-400">m</sup> ÷ a<sup className="idx text-orange-600 dark:text-orange-400">n</sup> = a<sup className="idx text-orange-600 dark:text-orange-400">m−n</sup>
            </div>
            <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">Division Law</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When dividing powers with the same base, retain the base and <strong>subtract</strong> the exponents (top minus bottom). Example: 6⁸ ÷ 6³ = 6⁵.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Common Misconceptions & Interactive Error Analysis */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common Student Misconceptions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Frequently observed mistakes and how to address them using the table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMON_MISTAKES.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-red-600 dark:text-red-400 font-bold line-through">
                  Mistake: {item.mistake}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ {item.correction}
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {item.explanation}
              </p>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                Check: {item.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Quick Interactive Exit Ticket */}
      <section className="p-6 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              End-of-Lesson Exit Ticket
            </h3>
            <p className="text-xs text-slate-500">
              3 fast check-for-understanding questions for mini-whiteboards or quick exit check.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowExitTicketResults(!showExitTicketResults)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 self-start sm:self-auto transition-colors"
          >
            {showExitTicketResults ? 'Hide Solutions' : 'Reveal Answers'}
          </button>
        </div>

        <div className="space-y-4">
          {EXIT_TICKET_QUESTIONS.map((q, idx) => {
            const selected = exitTicketAnswers[idx];
            return (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {q.question}
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const isChosen = selected === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() =>
                          setExitTicketAnswers({
                            ...exitTicketAnswers,
                            [idx]: opt
                          })
                        }
                        className={`px-3 py-1 text-xs font-mono font-medium rounded-md border transition-all ${
                          isChosen
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showExitTicketResults && (
                  <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded border border-emerald-200 dark:border-emerald-800">
                    Correct: <strong>{q.correct}</strong> · {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Action Call to Practice Worksheets */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950 border border-indigo-100 dark:border-indigo-900 gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Ready for student independent practice?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Worksheet A offers 23 structured practice problems; Worksheet B provides 17 challenge extensions.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => onNavigateTab('practice')}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-xs whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <span>Open Worksheet A</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('challenge')}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <span>Open Worksheet B</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
