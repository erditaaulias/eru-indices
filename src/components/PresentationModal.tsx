import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { RUN_SHEET_STEPS } from '../data/lessonData.ts';
import { RewindSimulator } from './RewindSimulator.tsx';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ isOpen, onClose }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(RUN_SHEET_STEPS[0].durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setSeconds(RUN_SHEET_STEPS[currentStepIdx].durationMinutes * 60);
    setIsRunning(false);
  }, [currentStepIdx]);

  useEffect(() => {
    let t: NodeJS.Timeout | null = null;
    if (isRunning && seconds > 0) {
      t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    } else if (seconds === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [isRunning, seconds]);

  if (!isOpen) return null;

  const currentStep = RUN_SHEET_STEPS[currentStepIdx];
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto">
      {/* Presentation Top bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-white shrink-0">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-indigo-600 text-white font-mono text-xs font-bold uppercase">
            Projector View
          </span>
          <span className="text-slate-400 text-sm hidden sm:inline">
            Phase {currentStepIdx + 1} of {RUN_SHEET_STEPS.length}
          </span>
        </div>

        {/* Phase Timer */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-2xl font-bold tracking-wider text-indigo-400">
            {timeFormatted}
          </div>
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setSeconds(currentStep.durationMinutes * 60)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main presentation content */}
      <div className="flex-1 my-4 space-y-6 max-w-5xl mx-auto w-full">
        {/* Phase Title Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
              {currentStep.durationMinutes} Minutes Allotted
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentStepIdx((i) => Math.max(0, i - 1))}
                disabled={currentStepIdx === 0}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentStepIdx((i) => Math.min(RUN_SHEET_STEPS.length - 1, i + 1))}
                disabled={currentStepIdx === RUN_SHEET_STEPS.length - 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {currentStep.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {currentStep.summary}
          </p>

          <div className="pt-2 text-sm text-indigo-300 font-mono">
            Prompt: "{currentStep.teacherSay}"
          </div>
        </div>

        {/* Live Simulator embedded for projector */}
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <RewindSimulator />
        </div>
      </div>
    </div>
  );
};
