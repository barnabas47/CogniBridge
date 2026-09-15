import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { JargonTerm } from '../../types';
import { Lightbulb, Info, X } from 'lucide-react';
import { sound } from '../../services/sound';

interface JargonHighlighterProps {
  terms: JargonTerm[];
  onSelectTerm?: (term: JargonTerm) => void;
}

export const JargonHighlighter: React.FC<JargonHighlighterProps> = ({ terms }) => {
  const [activeTerm, setActiveTerm] = useState<JargonTerm | null>(null);

  if (!terms || terms.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Jargon Buster • Hivatalos Kifejezések Egyszerűsítve</span>
        </h4>
        <span className="text-[11px] text-slate-400">Kattints a kifejezésre a magyarázatért</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {terms.map((item, idx) => {
          const isSelected = activeTerm?.term === item.term;

          return (
            <div key={idx} className="relative">
              <button
                type="button"
                onClick={() => {
                  sound.playPop();
                  setActiveTerm(isSelected ? null : item);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-amber-400/50 hover:bg-amber-500/10'
                }`}
              >
                <span>{item.term}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Popover Detail Modal for selected jargon */}
      <AnimatePresence>
        {activeTerm && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 text-slate-900 dark:text-amber-100 space-y-2 relative"
          >
            <button
              onClick={() => setActiveTerm(null)}
              className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>{activeTerm.term}</span>
            </div>

            <p className="text-sm leading-relaxed font-medium">
              {activeTerm.plainExplanation}
            </p>

            {activeTerm.analogy && (
              <div className="text-xs bg-white/60 dark:bg-slate-900/60 p-2.5 rounded-xl border border-amber-500/20 text-slate-700 dark:text-slate-300">
                <strong>Hétköznapi hasonlat:</strong> {activeTerm.analogy}
              </div>
            )}

            {activeTerm.doesItAffectMe && (
              <div className="text-xs bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                <strong>Hogyan érint ez téged?</strong> {activeTerm.doesItAffectMe}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
