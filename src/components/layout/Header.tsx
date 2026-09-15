import React from 'react';
import { Brain, Key, History, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenApiKey: () => void;
  onOpenHistory: () => void;
  onOpenAbout: () => void;
  hasApiKey: boolean;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKey,
  onOpenHistory,
  onOpenAbout,
  hasApiKey,
  historyCount
}) => {
  return (
    <header className="sticky top-0 z-40 px-4 py-3 backdrop-blur-2xl bg-white/75 dark:bg-slate-950/75 border-b border-[var(--border-color)]/60 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Apple-style Logo and Brand */}
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-60 blur-xs group-hover:opacity-100 transition duration-300" />
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-900 border border-white/20 flex items-center justify-center text-white shadow-md">
              <Brain className="w-5 h-5 text-blue-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-blue-700 dark:from-white dark:via-slate-100 dark:to-blue-400">
                CogniBridge
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                Code for Humanity
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] tracking-tight hidden md:block">
              Cognitive Accessibility & Executive Function Operating System
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* History Button with Badge */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] shadow-xs transition-all cursor-pointer"
            title="Előzmények megnyitása"
          >
            <History className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="hidden sm:inline">Előzmények</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-black bg-blue-600 text-white rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          {/* Gemini API Pill */}
          <button
            onClick={onOpenApiKey}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
              hasApiKey
                ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-primary)]'
            }`}
            title="Google Gemini AI Kulcs beállítása"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{hasApiKey ? 'Gemini 2.5 Aktív' : 'AI Motor'}</span>
            {hasApiKey && <ShieldCheck className="w-3 h-3 text-emerald-500 ml-0.5" />}
          </button>

          {/* About / Help */}
          <button
            onClick={onOpenAbout}
            className="p-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            title="A projektről"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
