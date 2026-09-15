import React from 'react';
import type { CognitiveAnalysis } from '../../types';
import { ShieldCheck, AlertCircle, AlertTriangle, Sparkles, Volume2 } from 'lucide-react';
import { KeyEntitiesGrid } from './KeyEntitiesGrid';
import { speechService } from '../../services/speech';
import { SpotlightCard } from '../ui/SpotlightCard';

interface PanicRadarProps {
  analysis: CognitiveAnalysis;
}

export const PanicRadar: React.FC<PanicRadarProps> = ({ analysis }) => {
  const getUrgencyConfig = () => {
    switch (analysis.urgency) {
      case 'calm':
        return {
          icon: <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />,
          title: 'Megnyugodhatsz: Nincs veszély vagy azonnali kötelezettség',
          badgeText: 'NYUGODT • TÁJÉKOZTATÓ',
          borderClass: 'border-emerald-500/40',
          bgClass: 'bg-emerald-500/10',
          textColor: 'text-emerald-900 dark:text-emerald-200',
          badgeBg: 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
        };
      case 'moderate':
        return {
          icon: <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />,
          title: 'Figyelmet igényel, de van időd intézkedni',
          badgeText: 'MÉRSÉKELT • FIGYELEM',
          borderClass: 'border-amber-500/40',
          bgClass: 'bg-amber-500/10',
          textColor: 'text-amber-900 dark:text-amber-200',
          badgeBg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
        };
      case 'urgent':
        return {
          icon: <AlertTriangle className="w-8 h-8 text-rose-500 shrink-0" />,
          title: 'Határidős kötelezettség: Lépések szükségesek!',
          badgeText: 'SÜRGŐS • HATÁRIDŐ',
          borderClass: 'border-rose-500/40',
          bgClass: 'bg-rose-500/10',
          textColor: 'text-rose-900 dark:text-rose-200',
          badgeBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
        };
    }
  };

  const config = getUrgencyConfig();

  const handleSpeakSummary = () => {
    const textToSpeak = `${config.title}. A lényeg: ${analysis.tenWordSummary}. ${analysis.urgencyReason}`;
    speechService.speak(textToSpeak);
  };

  return (
    <SpotlightCard className={`p-6 sm:p-7 mb-6 border-2 shadow-2xl ${config.borderClass} ${config.bgClass}`}>
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-md">
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider border ${config.badgeBg}`}>
                {config.badgeText}
              </span>
              <span className="text-[11px] text-[var(--text-muted)] font-medium">Érzelmi & Kognitív Triage</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${config.textColor}`}>
              {config.title}
            </h3>
          </div>
        </div>

        {/* Read Out Aloud Button */}
        <button
          onClick={handleSpeakSummary}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold shadow-xs transition-all cursor-pointer"
          title="Összefoglaló felolvasása"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-500" />
          <span>Felolvasás</span>
        </button>
      </div>

      {/* 10-Word Bottom Line Bento Card */}
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-5 my-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>10 Szavas Lényeg (Anti-Overwhelm Summary):</span>
        </div>
        <p className="text-base sm:text-xl font-black text-[var(--text-primary)] leading-snug">
          "{analysis.tenWordSummary}"
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
          {analysis.urgencyReason}
        </p>
      </div>

      {/* Key Entities */}
      <KeyEntitiesGrid entities={analysis.keyEntities} />
    </SpotlightCard>
  );
};
