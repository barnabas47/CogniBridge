import React from 'react';

export const AuroraBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children,
  className = ''
}) => {
  return (
    <div className={`relative overflow-hidden min-h-screen bg-[var(--bg-primary)] ${className}`}>
      {/* Dynamic Aurora Ambient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-[130px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 dark:bg-emerald-600/10 blur-[110px] pointer-events-none" />

      {/* Subtle Dot Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
