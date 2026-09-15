import React, { useState } from 'react';
import type { KeyEntity } from '../../types';
import { 
  DollarSign, 
  Calendar, 
  User, 
  FileText, 
  HelpCircle, 
  CreditCard,
  Copy, 
  Check, 
  Clock
} from 'lucide-react';
import { sound } from '../../services/sound';

interface KeyEntitiesGridProps {
  entities: KeyEntity[];
}

export const KeyEntitiesGrid: React.FC<KeyEntitiesGridProps> = ({ entities }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!entities || entities.length === 0) return null;

  const getEntityIcon = (type: KeyEntity['type']) => {
    switch (type) {
      case 'money':
        return <DollarSign className="w-4 h-4 text-amber-500" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-rose-500" />;
      case 'contact':
        return <User className="w-4 h-4 text-blue-500" />;
      case 'reference':
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case 'account':
        return <CreditCard className="w-4 h-4 text-purple-500" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleCopy = (val: string, id: string) => {
    sound.playPop();
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>Kiemelt Kulcsadatok & Azonosítók</span>
        </h4>
        <span className="text-[11px] text-slate-400">1-kattintásos másolás a banki utaláshoz / ügyintézéshez</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entities.map((entity, idx) => {
          const isCopied = copiedId === `${entity.label}-${idx}`;

          return (
            <div
              key={idx}
              className="group relative p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                      {getEntityIcon(entity.type)}
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                      {entity.label}
                    </span>
                  </div>
                  {entity.isUrgent && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      <Clock className="w-2.5 h-2.5" /> Sürgős
                    </span>
                  )}
                </div>

                <div className="text-base font-bold text-slate-900 dark:text-white font-mono break-all my-1 select-all">
                  {entity.value}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleCopy(entity.value, `${entity.label}-${idx}`)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    isCopied
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>Másolva!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Másolás</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
