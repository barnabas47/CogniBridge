import React from 'react';

interface GlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 shadow-sm cursor-pointer';

  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] border border-[var(--border-color)]';
  } else {
    variantStyles = 'backdrop-blur-md bg-white/60 dark:bg-slate-900/60 hover:bg-white/90 dark:hover:bg-slate-900/90 text-[var(--text-primary)] border border-white/20 dark:border-white/10 shadow-md';
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {/* Light Reflection Glare */}
      <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <span className="absolute -top-[100%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/20 via-transparent to-transparent rotate-45 transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      {children}
    </button>
  );
};
