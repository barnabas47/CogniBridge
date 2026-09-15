import React, { useState } from 'react';
import type { MicroAction } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Layers, 
  PartyPopper,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speechService } from '../../services/speech';
import { SpotlightCard } from '../ui/SpotlightCard';

interface LaserStepWizardProps {
  microActions: MicroAction[];
  onUpdateActions: (actions: MicroAction[]) => void;
  singleStepFocus: boolean;
}

export const LaserStepWizard: React.FC<LaserStepWizardProps> = ({
  microActions,
  onUpdateActions,
  singleStepFocus
}) => {
  const [expandedSubsteps, setExpandedSubsteps] = useState<Record<string, boolean>>({});
  const [activeSingleIndex, setActiveSingleIndex] = useState(0);

  const completedCount = microActions.filter(a => a.isCompleted).length;
  const totalCount = microActions.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleComplete = (actionId: string, index: number) => {
    const updated = microActions.map(action => {
      if (action.id === actionId) {
        const nextState = !action.isCompleted;
        if (nextState) {
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.8 },
              colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
            });
          } catch (e) {}

          if (singleStepFocus && index < microActions.length - 1) {
            setTimeout(() => setActiveSingleIndex(index + 1), 400);
          }
        }
        return { ...action, isCompleted: nextState };
      }
      return action;
    });

    onUpdateActions(updated);
  };

  const toggleSubsteps = (id: string) => {
    setExpandedSubsteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeakStep = (action: MicroAction) => {
    const text = `Lépés: ${action.title}. ${action.detailedGuide}. Becsült idő: ${action.estimatedMinutes} perc.`;
    speechService.speak(text);
  };

  return (
    <SpotlightCard className="p-6 sm:p-8 mb-6 shadow-xl border-white/40 dark:border-white/10">
      {/* Header & Progress Bar */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-black text-[var(--text-primary)] tracking-tight">
              Laser Focus Cselekvési Terv (Anti-Paralysis)
            </h3>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            {completedCount} / {totalCount} Kész ({progressPercent}%)
          </span>
        </div>

        {/* Apple Style Progress Bar */}
        <div className="w-full h-3 bg-[var(--bg-surface-elevated)] rounded-full overflow-hidden border border-[var(--border-color)]">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 transition-all duration-500 rounded-full shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Completion Banner */}
      {completedCount === totalCount && totalCount > 0 && (
        <div className="p-5 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/40 text-center mb-6 animate-in fade-in">
          <PartyPopper className="w-9 h-9 text-emerald-500 mx-auto mb-1.5" />
          <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-base">
            Minden lépést sikeresen elvégeztél!
          </h4>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
            Kiváló munka! Megszüntetted a bizonytalanságot és kézben tartod az ügyet.
          </p>
        </div>
      )}

      {/* Action Steps List / Single Step View */}
      <div className="space-y-3.5">
        {microActions.map((action, idx) => {
          if (singleStepFocus && idx !== activeSingleIndex) {
            return null;
          }

          const hasSubsteps = action.substeps && action.substeps.length > 0;
          const isExpanded = !!expandedSubsteps[action.id];

          return (
            <div
              key={action.id}
              className={`p-5 rounded-3xl border-2 transition-all duration-300 ${
                action.isCompleted
                  ? 'border-emerald-500/40 bg-emerald-500/5 opacity-80'
                  : 'border-blue-500/60 bg-[var(--bg-surface)] shadow-lg ring-4 ring-blue-500/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3.5">
                <div className="flex items-start gap-3.5 flex-1">
                  <button
                    onClick={() => handleToggleComplete(action.id, idx)}
                    className="mt-0.5 text-blue-600 hover:scale-110 transition-transform shrink-0 cursor-pointer"
                    title={action.isCompleted ? 'Megjelölés nem készként' : 'Kész! Pipálás és jutalom'}
                  >
                    {action.isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-6 h-6 text-[var(--text-muted)] hover:text-emerald-500" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-color)]">
                        {idx + 1}. Lépés
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] font-bold">
                        <Clock className="w-3 h-3" />
                        ~{action.estimatedMinutes} perc
                      </span>
                    </div>

                    <h4 className={`text-base sm:text-lg font-bold ${
                      action.isCompleted ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                    }`}>
                      {action.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                      {action.detailedGuide}
                    </p>
                  </div>
                </div>

                {/* Speak Step button */}
                <button
                  onClick={() => handleSpeakStep(action)}
                  className="p-2 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:bg-[var(--accent-light)] text-[var(--text-muted)] shrink-0 cursor-pointer"
                  title="Lépés felolvasása"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Substeps Breakdown (Decomposer) */}
              {hasSubsteps && (
                <div className="mt-4 pt-3.5 border-t border-[var(--border-color)]">
                  <button
                    onClick={() => toggleSubsteps(action.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isExpanded ? 'Al-lépések elrejtése' : `${action.substeps!.length} Kisebb Al-lépésre Bontva`}</span>
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <ul className="mt-3 space-y-2 pl-4 text-xs text-[var(--text-secondary)] list-disc">
                      {action.substeps!.map((sub, sIdx) => (
                        <li key={sIdx} className="leading-relaxed font-medium">{sub}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Single Step Navigation */}
      {singleStepFocus && totalCount > 1 && (
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-color)]">
          <button
            onClick={() => setActiveSingleIndex(Math.max(0, activeSingleIndex - 1))}
            disabled={activeSingleIndex === 0}
            className="px-4 py-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-bold disabled:opacity-30 cursor-pointer"
          >
            ← Előző lépés
          </button>
          <span className="text-xs font-black text-[var(--text-muted)]">
            {activeSingleIndex + 1} / {totalCount}
          </span>
          <button
            onClick={() => setActiveSingleIndex(Math.min(totalCount - 1, activeSingleIndex + 1))}
            disabled={activeSingleIndex === totalCount - 1}
            className="px-4 py-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-xs font-bold disabled:opacity-30 cursor-pointer"
          >
            Következő lépés →
          </button>
        </div>
      )}
    </SpotlightCard>
  );
};
