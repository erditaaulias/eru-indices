/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeaderHero } from './components/HeaderHero.tsx';
import { LessonPlanView } from './components/LessonPlanView.tsx';
import { RewindSimulator } from './components/RewindSimulator.tsx';
import { WorksheetView } from './components/WorksheetView.tsx';
import { LawsGuideView } from './components/LawsGuideView.tsx';
import { PresentationModal } from './components/PresentationModal.tsx';
import { WORKSHEET_A, WORKSHEET_B } from './data/lessonData.ts';

export default function App() {
  // Hash routing
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['lesson', 'simulator', 'practice', 'challenge', 'guide'].includes(hash)) {
      return hash as TabType;
    }
    return 'lesson';
  });

  // Dark mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('indices_theme') === 'dark';
  });

  // Presentation modal
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('indices_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('indices_theme', 'light');
    }
  }, [isDark]);

  // Sync hash on tab change and popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['lesson', 'simulator', 'practice', 'challenge', 'guide'].includes(hash)) {
        setActiveTab(hash as TabType);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 pb-16">
        {/* Header Hero (learning objectives & topic kicker) */}
        <div className="no-print">
          <HeaderHero onJumpToTab={handleTabChange} />
        </div>

        {/* Tab-driven Content Views */}
        <div>
          {activeTab === 'lesson' && (
            <LessonPlanView onNavigateTab={handleTabChange} />
          )}

          {activeTab === 'simulator' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Interactive Exploration: Rewind the Views
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Adjust the growth factor base and drag the hour slider backward and forward to observe reciprocal fractions and exponential growth.
                </p>
              </div>
              <RewindSimulator />
            </div>
          )}

          {activeTab === 'practice' && (
            <WorksheetView data={WORKSHEET_A} onPrint={handlePrint} />
          )}

          {activeTab === 'challenge' && (
            <WorksheetView data={WORKSHEET_B} onPrint={handlePrint} />
          )}

          {activeTab === 'guide' && (
            <LawsGuideView />
          )}
        </div>
      </main>

      {/* Presentation Mode Fullscreen Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      {/* Clean quiet footer */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Indices 1.3 Lesson Pack</span>
            <span>·</span>
            <span>Secondary Mathematics Curriculum</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleTabChange('lesson')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Lesson Plan
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('practice')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Worksheet A
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('challenge')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Worksheet B
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Print
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
