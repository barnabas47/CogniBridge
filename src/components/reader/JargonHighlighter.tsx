import React, { useState } from 'react';
import type { JargonTerm } from '../../types';
import { BookOpen, Lightbulb, UserCheck, X, Sparkles } from 'lucide-react';

interface JargonHighlighterProps {
  terms: JargonTerm[];
}

export const JargonHighlighter: React.FC<JargonHighlighterProps> = ({ terms }) => {
  const [selectedTerm, setSelectedTerm] = useState<JargonTerm | null>(null);

  if (!terms || terms.length === 0) return null;

  return (
    <div className="mt-7 border-t border-[var(--border-color)]/70 pt-5">
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-purple-500" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Jargon Buster — Hivatalos Zsargon Magyarra Fordítva:
          </h4>
        </div>
        <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
          Kattints a kifejezésre
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {terms.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTerm(item)}
            className="px-3.5 py-1.5 rounded-2xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-900 dark:text-purple-200 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer hover:scale-105"
          >
            <Sparkles className="w-3 h-3 text-purple-500" />
            <span>{item.term}</span>
          </button>
        ))}
      </div>

      {/* Interactive Explainer Drawer Card */}
      {selectedTerm && (
        <div className="mt-4 p-5 rounded-3xl border-2 border-purple-500/40 bg-purple-500/10 backdrop-blur-xl shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setSelectedTerm(null)}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-xl text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 text-purple-900 dark:text-purple-200 font-extrabold text-base mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{selectedTerm.term}</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-purple-950 dark:text-purple-100">
            <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-purple-500/20">
              <strong className="text-purple-700 dark:text-purple-300 block mb-0.5">Mit jelent egyszerűen?</strong>
              {selectedTerm.plainExplanation}
            </div>
            <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-purple-500/20">
              <strong className="text-purple-700 dark:text-purple-300 block mb-0.5">Életszerű Hasonlat:</strong>
              {selectedTerm.analogy}
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <UserCheck className="w-4 h-4" />
              <span>{selectedTerm.doesItAffectMe}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
