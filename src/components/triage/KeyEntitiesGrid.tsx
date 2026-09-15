import React, { useState } from 'react';
import type { KeyEntity } from '../../types';
import { DollarSign, Calendar, CreditCard, Hash, Phone, Copy, Check } from 'lucide-react';

interface KeyEntitiesGridProps {
  entities: KeyEntity[];
}

export const KeyEntitiesGrid: React.FC<KeyEntitiesGridProps> = ({ entities }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!entities || entities.length === 0) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getEntityIcon = (type: KeyEntity['type']) => {
    switch (type) {
      case 'money':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'account':
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'reference':
        return <Hash className="w-4 h-4 text-purple-500" />;
      case 'contact':
        return <Phone className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="mt-5 pt-4 border-t border-[var(--border-color)]/70">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]">
          Kiemelt Adatok (1-Kattintásos Másolás):
        </h4>
        <span className="text-[10px] text-[var(--text-muted)]">Vágólapra másolás</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entities.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
              item.isUrgent
                ? 'border-amber-400/50 bg-amber-500/10'
                : 'border-[var(--border-color)] bg-[var(--bg-surface-elevated)]/60'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shrink-0 shadow-xs">
                {getEntityIcon(item.type)}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] block text-[var(--text-muted)] font-bold truncate uppercase tracking-tight">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[var(--text-primary)] truncate block">
                  {item.value}
                </span>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(item.value, idx)}
              className="p-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all shrink-0 cursor-pointer shadow-xs"
              title="Másolás"
            >
              {copiedIndex === idx ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
