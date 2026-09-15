import React from 'react';
import { motion } from 'framer-motion';

interface MetricBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  trend?: 'positive' | 'neutral' | 'urgent';
  className?: string;
}

export const MetricBadge: React.FC<MetricBadgeProps> = ({
  icon,
  label,
  value,
  subValue,
  trend = 'neutral',
  className = '',
}) => {
  const trendColors = {
    positive: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    neutral: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    urgent: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`flex items-center gap-3 p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm ${className}`}
    >
      <div className={`p-2.5 rounded-xl border ${trendColors[trend]} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
          {label}
        </div>
        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
          {value}
        </div>
        {subValue && (
          <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
};
