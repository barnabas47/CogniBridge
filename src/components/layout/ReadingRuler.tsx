import React, { useEffect, useRef } from 'react';

interface ReadingRulerProps {
  enabled: boolean;
}

export const ReadingRuler: React.FC<ReadingRulerProps> = ({ enabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let targetY = window.innerHeight / 2;
    let rafId: number | null = null;
    let isScheduled = false;

    const render = () => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--ruler-y', `${targetY}px`);
      }
      isScheduled = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetY = e.clientY;
      if (!isScheduled) {
        isScheduled = true;
        rafId = requestAnimationFrame(render);
      }
    };

    // Initial positioning
    render();

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        '--ruler-y': '50vh',
        '--ruler-height': '72px',
      } as React.CSSProperties}
      className="reading-ruler-overlay fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    >
      {/* Top Dimmed Mask */}
      <div 
        className="absolute top-0 left-0 right-0 bg-[var(--ruler-mask)] backdrop-blur-[0.5px]"
        style={{
          height: 'calc(var(--ruler-y) - (var(--ruler-height) / 2))',
          willChange: 'height',
        }}
      />

      {/* Focus Line Guide (Active reading corridor) */}
      <div 
        className="absolute left-0 right-0 border-y-2 border-[var(--accent-color)] bg-[var(--accent-light)] opacity-25 shadow-2xl"
        style={{
          top: 'calc(var(--ruler-y) - (var(--ruler-height) / 2))',
          height: 'var(--ruler-height)',
          willChange: 'top',
        }}
      />

      {/* Bottom Dimmed Mask */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-[var(--ruler-mask)] backdrop-blur-[0.5px]"
        style={{
          top: 'calc(var(--ruler-y) + (var(--ruler-height) / 2))',
          willChange: 'top',
        }}
      />
    </div>
  );
};
