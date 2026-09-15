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
  const trendAccent = {
    positive: 'text-[#30d158] bg-[#30d158]/10 border-[#30d158]/20',
    neutral: 'text-[#2997ff] bg-[#2997ff]/10 border-[#2997ff]/20',
    urgent: 'text-[#ff453a] bg-[#ff453a]/10 border-[#ff453a]/20',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`flex items-center gap-3.5 p-4 rounded-3xl bg-[#161617]/85 backdrop-blur-2xl border border-white/[0.08] shadow-xl ${className}`}
    >
      <div className={`p-2.5 rounded-2xl border ${trendAccent[trend]} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-[#86868b] tracking-wide uppercase truncate">
          {label}
        </div>
        <div className="text-lg sm:text-xl font-bold tracking-tight text-[#f5f5f7] truncate">
          {value}
        </div>
        {subValue && (
          <div className="text-[11px] text-[#86868b] truncate">
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
};
