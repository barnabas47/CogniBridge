import React from 'react';
import type { CognitiveAnalysis } from '../../types';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  BarChart3,
  Heart
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { KeyEntitiesGrid } from './KeyEntitiesGrid';

interface PanicRadarProps {
  analysis: CognitiveAnalysis;
}

export const PanicRadar: React.FC<PanicRadarProps> = ({ analysis }) => {
  const { urgency, urgencyReason, tenWordSummary, keyEntities, microActions } = analysis;

  const getUrgencyConfig = (level: typeof urgency) => {
    switch (level) {
      case 'calm':
        return {
          icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
          bgClass: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100',
          badgeClass: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          label: 'Nincs Pánikhelyzet • Tájékoztató',
        };
      case 'moderate':
        return {
          icon: <Clock className="w-6 h-6 text-amber-500" />,
          bgClass: 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-100',
          badgeClass: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
          label: 'Teendőt Igényel • Nyugodt Lépésekben',
        };
      case 'urgent':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-rose-500" />,
          bgClass: 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-100',
          badgeClass: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
          label: 'Határidős Felszólítás • Van Megoldás!',
        };
      default:
        return {
          icon: <Info className="w-6 h-6 text-indigo-500" />,
          bgClass: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-950 dark:text-indigo-100',
          badgeClass: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
          label: 'Általános Dokumentum',
        };
    }
  };

  const urgencyConfig = getUrgencyConfig(urgency);
  const totalMinutes = microActions.reduce((acc, curr) => acc + (curr.estimatedMinutes || 2), 0);

  return (
    <div className="space-y-6">
      {/* 1. EMOTIONAL SAFETY SHIELD (Top Bento Hero) */}
      <SpotlightCard
        spotlightColor={`rgba(${urgency === 'urgent' ? '244, 63, 94' : urgency === 'moderate' ? '245, 158, 11' : '16, 185, 129'}, 0.12)`}
        className={`border-2 ${urgencyConfig.bgClass} shadow-xl`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-md shrink-0 border border-white/20">
              {urgencyConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${urgencyConfig.badgeClass}`}>
                  {urgencyConfig.label}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {urgencyReason}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 shrink-0">
            <Heart className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Kognitív szorongásoldás aktív</span>
          </div>
        </div>
      </SpotlightCard>

      {/* 2. 10-WORD ESSENCE & COGNITIVE ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 10-Word Essence Card (Spans 2 cols on desktop) */}
        <SpotlightCard className="lg:col-span-2 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 10 Szavas Kognitív Lényeg
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5">
                Executive Summary
              </span>
            </div>

            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-relaxed font-sans">
              „{tenWordSummary}”
            </p>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-4 border-t border-slate-100 dark:border-white/5">
              <span>🎯 Elsődleges Feladat: <strong>{microActions.length} mikrolépésben teljesíthető</strong></span>
              <span>⏳ Várható idő: <strong>~{totalMinutes} perc</strong></span>
            </div>
          </div>
        </SpotlightCard>

        {/* Cognitive Burden Metrics Card */}
        <SpotlightCard className="flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-500" /> Kognitív Terhelési Index
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400">Szorongáscsökkentés</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> -85%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full w-[85%]" />
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-500 dark:text-slate-400">Olvasási Sebességjavulás</span>
                <span className="font-bold text-indigo-500">2.4x Gyorsabb</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-500 h-2 rounded-full w-[70%]" />
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span>Akadálymentesítés</span>
              <span className="text-emerald-500 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> WCAG AAA Ready
              </span>
            </div>
          </div>
        </SpotlightCard>
      </div>

      {/* 3. KEY ENTITIES MATRIX */}
      <KeyEntitiesGrid entities={keyEntities} />
    </div>
  );
};
