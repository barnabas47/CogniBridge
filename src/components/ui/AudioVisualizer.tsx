import React from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
  className?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  barCount = 14,
  className = '',
}) => {
  return (
    <div className={`flex items-end gap-[3px] h-6 px-2 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
          animate={
            isPlaying
              ? {
                  height: ['20%', `${Math.floor(Math.sin(i * 0.8 + 1) * 45 + 50)}%`, '20%'],
                }
              : { height: '20%' }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.5 + (i % 5) * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.04,
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
};
