import React from 'react';
import { motion } from 'framer-motion';
import { sound } from '../../services/sound';

interface GlowingButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  glow?: boolean;
  playAudio?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  glow = true,
  playAudio = true,
  className = '',
  onClick,
  disabled,
  type = 'button',
  title,
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 rounded-xl',
    md: 'px-5 py-2.5 text-sm gap-2 rounded-2xl',
    lg: 'px-7 py-3.5 text-base gap-2.5 rounded-2xl font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30',
    secondary:
      'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-white/10 shadow-sm',
    accent:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 border border-emerald-400/30',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/25 border border-rose-400/30',
    ghost:
      'bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border-none',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playAudio && !disabled) {
      sound.playPop();
    }
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      type={type}
      title={title}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={handleClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {/* Dynamic light shine passing through */}
      {glow && !disabled && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -inset-[100%] top-0 block w-[200%] animate-[shine_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent [transform:skewX(-20deg)]" />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
