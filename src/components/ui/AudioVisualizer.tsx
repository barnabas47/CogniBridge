import React from 'react';

export const AudioVisualizer: React.FC<{ isPlaying: boolean; className?: string }> = ({ 
  isPlaying, 
  className = '' 
}) => {
  const heights = [12, 24, 16, 28, 20, 14, 26, 18];

  return (
    <div className={`flex items-center gap-1 h-7 px-2.5 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-300 ${
            isPlaying ? 'animate-pulse' : 'opacity-40'
          }`}
          style={{
            height: isPlaying ? `${h}px` : '6px',
            animationDelay: `${i * 120}ms`,
            animationDuration: '600ms'
          }}
        />
      ))}
    </div>
  );
};
