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
  glow = false,
  playAudio = true,
  className = '',
  onClick,
  disabled,
  type = 'button',
  title,
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1 text-xs gap-1.5 rounded-full',
    md: 'px-5 py-2 text-xs sm:text-sm gap-2 rounded-full font-medium',
    lg: 'px-7 py-3 text-sm sm:text-base gap-2.5 rounded-full font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-sm transition-colors border border-transparent',
    secondary:
      'bg-[#1d1d1f] hover:bg-[#2c2c2e] text-[#f5f5f7] border border-[#424245] transition-colors',
    accent:
      'bg-[#30d158] hover:bg-[#34c759] text-black font-semibold shadow-sm transition-colors border border-transparent',
    danger:
      'bg-[#ff453a] hover:bg-[#ff3b30] text-white shadow-sm transition-colors border border-transparent',
    ghost:
      'bg-transparent hover:bg-white/[0.08] text-[#f5f5f7] border-none',
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
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      onClick={handleClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center tracking-tight transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {/* Subtle shine on hover for primary buttons */}
      {glow && !disabled && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -inset-[100%] top-0 block w-[200%] animate-[shine_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/15 to-transparent [transform:skewX(-20deg)]" />
        </span>
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
