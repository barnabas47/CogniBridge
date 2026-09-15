import React, { useState, useEffect } from 'react';

interface ReadingRulerProps {
  enabled: boolean;
}

export const ReadingRuler: React.FC<ReadingRulerProps> = ({ enabled }) => {
  const [mouseY, setMouseY] = useState(250);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  const rulerHeight = 64; // Focus band height

  return (
    <div 
      className="reading-ruler-overlay fixed inset-0 pointer-events-none z-50 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Top Mask */}
      <div 
        className="absolute top-0 left-0 right-0 bg-[var(--ruler-mask)] backdrop-blur-[0.5px] transition-all duration-75"
        style={{ height: `${Math.max(0, mouseY - rulerHeight / 2)}px` }}
      />

      {/* Focus Line Guide */}
      <div 
        className="absolute left-0 right-0 border-y-2 border-[var(--accent-color)] bg-[var(--accent-light)] opacity-20 transition-all duration-75 shadow-lg"
        style={{
          top: `${Math.max(0, mouseY - rulerHeight / 2)}px`,
          height: `${rulerHeight}px`
        }}
      />

      {/* Bottom Mask */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[var(--ruler-mask)] backdrop-blur-[0.5px] transition-all duration-75"
        style={{ top: `${mouseY + rulerHeight / 2}px` }}
      />
    </div>
  );
};
