import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  spanCol?: string; // e.g., 'md:col-span-2'
  spanRow?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  spanCol = 'col-span-1',
  spanRow = 'row-span-1',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-indigo-500/5 transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/30 ${spanCol} ${spanRow} ${className}`}
    >
      {children}
    </motion.div>
  );
};
