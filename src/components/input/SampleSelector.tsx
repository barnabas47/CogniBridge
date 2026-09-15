import React from 'react';
import { SAMPLE_DOCUMENTS } from '../../samples/sampleDocuments';
import type { SampleDocItem } from '../../samples/sampleDocuments';
import { FileWarning, Activity, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';

interface SampleSelectorProps {
  onSelectSample: (sample: SampleDocItem) => void;
  isLoading: boolean;
}

export const SampleSelector: React.FC<SampleSelectorProps> = ({ onSelectSample, isLoading }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileWarning':
        return <FileWarning className="w-5 h-5 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="mt-8 border-t border-[var(--border-color)]/70 pt-6">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Azonnali Minták (Zsűri & Gyors Demó):
          </h3>
        </div>
        <span className="text-[11px] text-[var(--text-muted)]">
          1-Kattintásos Elemzés
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {SAMPLE_DOCUMENTS.map((doc) => (
          <SpotlightCard
            key={doc.id}
            onClick={() => !isLoading && onSelectSample(doc)}
            className="p-4 cursor-pointer hover:border-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] group-hover:scale-110 transition-transform">
                  {getIcon(doc.icon)}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {doc.categoryName}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 line-clamp-1">
                {doc.title}
              </h4>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {doc.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)]/50 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Betöltés & Elemzés</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
