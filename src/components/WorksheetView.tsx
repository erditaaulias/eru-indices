import React, { useState, useEffect } from 'react';
import { WorksheetData, QuestionData } from '../types.ts';
import { Check, X, HelpCircle, CheckCircle, RotateCcw, Eye, Printer, Award, Sparkles } from 'lucide-react';
import { isAnswerCorrect, formatExponentDisplay, normalizeAnswer } from '../utils/mathValidator.ts';

interface WorksheetViewProps {
  data: WorksheetData;
  onPrint: () => void;
}

export const WorksheetView: React.FC<WorksheetViewProps> = ({ data, onPrint }) => {
  // Student metadata (persisted in localStorage)
  const [studentName, setStudentName] = useState<string>(() => localStorage.getItem(`ws_${data.id}_name`) || '');
  const [studentClass, setStudentClass] = useState<string>(() => localStorage.getItem(`ws_${data.id}_class`) || '');
  const [studentDate, setStudentDate] = useState<string>(() => localStorage.getItem(`ws_${data.id}_date`) || new Date().toISOString().slice(0, 10));

  // Answers state
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(`ws_${data.id}_answers`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Hints expanded state
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  // Answer Key toggle
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);

  // Checked state: has the user clicked "Check my answers"?
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  // Extension custom calculation for Worksheet B
  const [extensionInput, setExtensionInput] = useState<string>(() => localStorage.getItem(`ws_${data.id}_ext`) || '');

  // Save student metadata
  useEffect(() => {
    localStorage.setItem(`ws_${data.id}_name`, studentName);
    localStorage.setItem(`ws_${data.id}_class`, studentClass);
    localStorage.setItem(`ws_${data.id}_date`, studentDate);
  }, [data.id, studentName, studentClass, studentDate]);

  // Save answers
  useEffect(() => {
    localStorage.setItem(`ws_${data.id}_answers`, JSON.stringify(answers));
  }, [data.id, answers]);

  // Save extension input
  useEffect(() => {
    localStorage.setItem(`ws_${data.id}_ext`, extensionInput);
  }, [data.id, extensionInput]);

  // Flatten questions to calculate score
  const allQuestions: QuestionData[] = data.parts.flatMap((p) => p.questions);
  const scorableQuestions = allQuestions.filter((q) => q.type !== 'open_text');

  let correctCount = 0;
  let answeredCount = 0;

  scorableQuestions.forEach((q) => {
    const val = answers[q.id];
    if (val && val.trim().length > 0) {
      answeredCount++;
      if (isAnswerCorrect(val, q.expectedAnswer)) {
        correctCount++;
      }
    }
  });

  const totalQuestions = scorableQuestions.length;
  const isAllCorrect = hasChecked && correctCount === totalQuestions;

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all your answers for this worksheet?')) {
      setAnswers({});
      setHasChecked(false);
      setExpandedHints({});
      setExtensionInput('');
    }
  };

  const toggleHint = (questionId: string) => {
    setExpandedHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="space-y-8 worksheet-container">
      {/* Worksheet Header Card */}
      <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4 worksheet-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 uppercase tracking-wider">
              <span>{data.code}</span>
              <span aria-hidden="true">·</span>
              <span>{data.subtitle}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {data.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {data.description}
            </p>
          </div>

          {/* Teacher Answer Key indicator */}
          {showAnswerKey && (
            <div className="px-3 py-1 rounded bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-mono font-bold self-start">
              ANSWER KEY VISIBLE
            </div>
          )}
        </div>

        {/* Student identification fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Student Name
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Alex Chen"
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Class / Section
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="e.g. Year 9 / Period 3"
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-1">
              Date
            </label>
            <input
              type="date"
              value={studentDate}
              onChange={(e) => setStudentDate(e.target.value)}
              className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Toolbar & Status Bar */}
        <div className="no-print pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setHasChecked(true)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Check My Answers</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              aria-pressed={showAnswerKey}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
                showAnswerKey
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                  : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}</span>
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>

            <button
              type="button"
              onClick={onPrint}
              className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>

          {/* Feedback Status */}
          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2">
            {hasChecked ? (
              <span className="flex items-center gap-1 font-mono">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {correctCount} / {totalQuestions}
                </span>{' '}
                correct
                {answeredCount < totalQuestions && (
                  <span className="text-amber-600 dark:text-amber-400 ml-1">
                    ({totalQuestions - answeredCount} unanswered)
                  </span>
                )}
              </span>
            ) : (
              <span className="text-slate-500">
                {answeredCount} of {totalQuestions} answered
              </span>
            )}
          </div>
        </div>

        {/* 100% Celebration Banner */}
        {isAllCorrect && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Fantastic work!</span> You answered every single question correctly on this worksheet!
          </div>
        )}
      </div>

      {/* Parts & Questions Rendering */}
      <div className="space-y-10">
        {data.parts.map((part) => (
          <section key={part.id} className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {part.partNumber}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {part.title}
                </h3>
              </div>
              {part.subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {part.subtitle}
                </p>
              )}
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {part.questions.map((q) => {
                const userVal = answers[q.id] || '';
                const isAnswered = userVal.trim().length > 0;
                const isCorrect = isAnswered && isAnswerCorrect(userVal, q.expectedAnswer);
                const isIncorrect = hasChecked && isAnswered && !isCorrect;
                const isMissing = hasChecked && !isAnswered;
                const isHintOpen = expandedHints[q.id];

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all worksheet-card flex flex-col justify-between ${
                      isCorrect && hasChecked
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : isIncorrect
                        ? 'border-red-300 dark:border-red-800 bg-red-50/40 dark:bg-red-950/20'
                        : isMissing
                        ? 'border-amber-300 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      {/* Question Number & Math prompt */}
                      <div className="flex items-baseline justify-between text-xs text-slate-400 font-mono mb-2">
                        <span>Question {q.questionNumber}</span>
                        {q.hint && (
                          <button
                            type="button"
                            onClick={() => toggleHint(q.id)}
                            className="no-print text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            <HelpCircle className="w-3 h-3" />
                            <span>Hint</span>
                          </button>
                        )}
                      </div>

                      {/* Prompt and Interactive Input */}
                      <div className="my-2">
                        {q.type === 'power_exponent' ? (
                          // Base with exponent input
                          <div className="flex items-baseline gap-2 text-lg font-mono font-semibold text-slate-800 dark:text-slate-200">
                            <span>{q.promptPrefix}</span>
                            <div className="relative inline-flex items-center">
                              <input
                                type="text"
                                value={userVal}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                placeholder="?"
                                className={`w-14 px-2 py-0.5 text-center text-sm font-bold font-mono rounded border transition-colors ${
                                  hasChecked && isCorrect
                                    ? 'border-emerald-500 bg-emerald-100/70 text-emerald-950 dark:text-emerald-100'
                                    : hasChecked && isIncorrect
                                    ? 'border-red-500 bg-red-100/70 text-red-950 dark:text-red-100'
                                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                }`}
                              />
                            </div>
                            {q.promptSuffix && <span className="text-xs text-slate-500 font-normal">{q.promptSuffix}</span>}
                          </div>
                        ) : q.type === 'true_false' ? (
                          // True / False Toggle buttons
                          <div className="space-y-2">
                            <div className="text-base font-mono font-semibold text-slate-800 dark:text-slate-200">
                              {q.promptPrefix}
                            </div>
                            <div className="flex items-center gap-2 pt-1">
                              {['true', 'false'].map((choice) => {
                                const isSelected = userVal.toLowerCase() === choice;
                                return (
                                  <button
                                    key={choice}
                                    type="button"
                                    onClick={() => handleInputChange(q.id, choice)}
                                    className={`px-3 py-1 text-xs font-bold rounded-lg border uppercase tracking-wider transition-all ${
                                      isSelected
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                        : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                                    }`}
                                  >
                                    {choice}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : q.type === 'open_text' ? (
                          // Written reasoning question
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
                              {q.promptPrefix}
                            </div>
                            <textarea
                              rows={3}
                              value={userVal}
                              onChange={(e) => handleInputChange(q.id, e.target.value)}
                              placeholder="Explain the mathematical reasoning here..."
                              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        ) : (
                          // Standard Numeric or Expression input
                          <div className="space-y-1.5">
                            <div className="text-base font-mono font-medium text-slate-800 dark:text-slate-200">
                              {q.promptPrefix}
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={userVal}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                placeholder="Answer..."
                                className={`flex-1 px-3 py-1.5 text-sm font-mono font-medium rounded-lg border transition-colors ${
                                  hasChecked && isCorrect
                                    ? 'border-emerald-500 bg-emerald-100/70 text-emerald-950 dark:text-emerald-100'
                                    : hasChecked && isIncorrect
                                    ? 'border-red-500 bg-red-100/70 text-red-950 dark:text-red-100'
                                    : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Hint container */}
                      {isHintOpen && q.hint && (
                        <div className="mt-2 p-2 rounded bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-mono">
                          Hint: {q.hint}
                        </div>
                      )}
                    </div>

                    {/* Feedback tag & Answer Key readout */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs font-mono">
                      {hasChecked && q.type !== 'open_text' && (
                        <div>
                          {isCorrect ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Correct
                            </span>
                          ) : isIncorrect ? (
                            <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1">
                              <X className="w-3.5 h-3.5" /> Check power/fraction
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                              Unanswered
                            </span>
                          )}
                        </div>
                      )}

                      {/* Teacher model answer reveal */}
                      {showAnswerKey && (
                        <div className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-bold ml-auto">
                          Key: {q.expectedAnswer.split('|')[0]}
                        </div>
                      )}
                    </div>

                    {/* Model text answer for open questions */}
                    {showAnswerKey && q.modelAnswer && (
                      <div className="mt-2 p-2 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                        <strong>Model Answer:</strong> {q.modelAnswer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Extension Question for Worksheet B */}
        {data.id === 'challenge' && (
          <section className="p-5 sm:p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-4 worksheet-card">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Extension Task
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                Design Your Own Index Calculations
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Write three distinct calculations combining multiplication, division, and negative powers that all simplify to <strong>2⁻²</strong> (which equals <strong>1/4</strong>).
              </p>
            </div>

            <textarea
              rows={3}
              value={extensionInput}
              onChange={(e) => setExtensionInput(e.target.value)}
              placeholder="e.g.: 1) 2³ ÷ 2⁵ = 2³⁻⁵ = 2⁻²&#10;2) 2⁻⁵ × 2³ = 2⁻⁵⁺³ = 2⁻²&#10;3) 2⁰ ÷ 2² = 2⁰⁻² = 2⁻²"
              className="w-full p-3 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {showAnswerKey && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <strong>Model Examples:</strong>
                <p>• 2³ ÷ 2⁵ = 2³⁻⁵ = 2⁻² = 1/4</p>
                <p>• 2⁻⁵ × 2³ = 2⁻⁵⁺³ = 2⁻² = 1/4</p>
                <p>• 2⁰ ÷ 2² = 2⁰⁻² = 2⁻² = 1/4</p>
                <p>• (2⁴ × 2⁻¹) ÷ 2⁵ = 2³ ÷ 2⁵ = 2⁻²</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Bottom Submit / Check Button */}
      <div className="no-print pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            setHasChecked(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Check My Answers</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>Print Clean Worksheet</span>
        </button>
      </div>
    </div>
  );
};
