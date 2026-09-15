import React from 'react';

export const AuroraBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 ${className}`}>
      {/* Background Animated Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-[25%] -left-[10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-br from-indigo-600/25 via-purple-600/20 to-transparent blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-[30%] -right-[15%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-gradient-to-bl from-cyan-600/20 via-blue-600/15 to-transparent blur-[130px] animate-pulse duration-[10000ms]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-gradient-to-tr from-emerald-600/15 via-indigo-600/20 to-transparent blur-[140px] animate-pulse duration-[12000ms]" />
        
        {/* Subtle Cyber Dot Matrix Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
};
