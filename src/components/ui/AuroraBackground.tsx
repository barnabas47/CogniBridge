import React from 'react';

export const AuroraBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 ${className}`}>
      {/* Apple Intelligence Siri Fluid Ambient Aura */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-80 dark:opacity-100">
        {/* Deep Violet Glow */}
        <div 
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-b from-[#2997ff]/20 via-[#a259ff]/15 to-transparent blur-[140px]"
          style={{ animation: 'apple-glow 14s ease-in-out infinite alternate' }}
        />
        {/* Soft Amber / Coral Accent */}
        <div 
          className="absolute top-[35%] -left-[15%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-tr from-[#ff3b30]/10 via-[#ff9500]/10 to-transparent blur-[160px]"
          style={{ animation: 'apple-glow 18s ease-in-out infinite alternate-reverse' }}
        />
        {/* Emerald Calming Glow */}
        <div 
          className="absolute bottom-[10%] -right-[15%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full bg-gradient-to-bl from-[#30d158]/10 via-[#2997ff]/10 to-transparent blur-[160px]"
          style={{ animation: 'apple-glow 16s ease-in-out infinite alternate' }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
