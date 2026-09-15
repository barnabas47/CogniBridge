import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, AlertCircle, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full my-10">
      {/* Eyebrow / Label */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868b]">
          <Sparkles className="w-4 h-4 text-[#2997ff]" />
          <span className="uppercase tracking-wider">Interaktív Kognitív Összehasonlítás</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-[#ff453a]">
            <span className="w-2 h-2 rounded-full bg-[#ff453a]" /> Eredeti Bürokratikus Szöveg
          </span>
          <span className="flex items-center gap-1.5 text-[#30d158]">
            <span className="w-2 h-2 rounded-full bg-[#30d158]" /> CogniBridge Kognitív HUD
          </span>
        </div>
      </div>

      {/* Apple Hardware Display Frame */}
      <div className="p-2 sm:p-3 rounded-[32px] bg-gradient-to-b from-white/[0.15] via-white/[0.05] to-transparent border border-white/[0.12] shadow-2xl">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative h-[420px] sm:h-[360px] w-full select-none overflow-hidden rounded-[24px] bg-black cursor-ew-resize"
        >
          {/* RIGHT / BASE: CogniBridge Apple HUD */}
          <div className="absolute inset-0 h-full w-full bg-[#0a0a0c] p-6 sm:p-8 flex flex-col justify-between text-[#f5f5f7]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#30d158]/15 border border-[#30d158]/30 text-[#30d158] text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#30d158]" />
                  Érzelmi Biztonság: Nyugodt lehetsz, nincs azonnali vészhelyzet
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2997ff] bg-[#2997ff]/10 px-3 py-1 rounded-full border border-[#2997ff]/20 font-medium">
                  <Zap className="w-3.5 h-3.5" /> Bionikus Fókusz Aktív
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#161617] border border-white/[0.08] shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#30d158] mb-1.5">
                  10 Szavas Lényeg
                </div>
                <p className="text-base sm:text-lg font-semibold text-[#f5f5f7] leading-snug">
                  14.500 Ft gépjárműadó elmaradásod van, amit március 31-ig kell átutalnod a megadott számlára.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#161617] border border-white/[0.08]">
                  <div className="text-[11px] text-[#86868b] font-medium">Fizetendő összeg</div>
                  <div className="text-lg font-bold text-[#ff9f0a] mt-0.5">14 500 Ft</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#161617] border border-white/[0.08]">
                  <div className="text-[11px] text-[#86868b] font-medium">Határidő</div>
                  <div className="text-lg font-bold text-[#ff453a] mt-0.5">2026. márc. 31.</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#161617] border border-white/[0.08] col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-[#86868b] font-medium">Következő 1 lépés</div>
                  <div className="text-xs font-semibold text-[#2997ff] flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#30d158] shrink-0" /> Netbank megnyitása (~2 perc)
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-[#86868b] border-t border-white/[0.08]">
              <span>Kognitív terheléscsökkenés: <strong className="text-[#30d158] font-bold">-84%</strong></span>
              <span>Megértési idő: <strong className="text-[#f5f5f7] font-bold">18 másodperc</strong></span>
            </div>
          </div>

          {/* LEFT / OVERLAY: Dense Bureaucratic Original (Rendered in Apple Titanium Dark) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden bg-[#1c1c1e] text-[#f5f5f7] border-r border-[#0071e3]/60 shadow-2xl"
            style={{ width: `${sliderPosition}%` }}
          >
            <div
              className="h-full p-6 sm:p-8 flex flex-col justify-between"
              style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
            >
              <div className="space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff453a]/15 border border-[#ff453a]/30 text-[#ff453a] text-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Pánikkeltő Hivatalos Felszólítás
                  </span>
                  <span className="text-xs text-[#86868b] font-mono">NAV/2026/98214-B/ÉP</span>
                </div>

                <div className="p-4 bg-black/60 rounded-2xl border border-white/[0.08] text-xs leading-relaxed text-[#a1a1a6]">
                  <p className="font-bold text-[#f5f5f7] mb-2 tracking-wide">
                    ÉRTESÍTÉS ÉS VÉGREHAJTÁSI FIGYELMEZTETÉS FIZETÉSI KÖTELEZETTSÉG TELJESÍTÉSÉRE
                  </p>
                  <p className="line-clamp-4 leading-relaxed">
                    A Nemzeti Adó- és Vámhivatal Észak-budapesti Adó- és Vámigazgatósága az adózás rendjéről szóló 2017. évi CL. törvény (Art.) 73. § (1) bekezdés d) pontja és a bírósági végrehajtásról szóló 1994. évi LIII. törvény (Vht.) 14. § alapján értesíti az adózót, hogy a nyilvántartott adószámláján lejárt esedékességű köztartozás mutatkozik...
                  </p>
                </div>

                <div className="text-xs text-[#ff453a] font-medium flex items-center gap-2 bg-[#ff453a]/10 p-3 rounded-2xl border border-[#ff453a]/20">
                  <span>⚠️ Erős szorongást kiváltó jogi szakszöveg, átláthatatlan határidők és bírságfenyegetés.</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-[#86868b] border-t border-white/[0.08]">
                <span>Pánik Index: <strong className="text-[#ff453a] font-bold">9.2 / 10</strong></span>
                <span>Átlagos feldolgozási idő: <strong className="text-[#f5f5f7] font-bold">4.5 perc</strong></span>
              </div>
            </div>
          </div>

          {/* SLIDER DIVIDER & HANDLE */}
          <div
            className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-[#2997ff] via-[#a259ff] to-[#ff3b30] cursor-ew-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0071e3] border-2 border-white shadow-xl flex items-center justify-center text-white cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
              <span className="text-[10px] font-bold tracking-tighter">◀ ▶</span>
            </div>
          </div>
        </div>
      </div>

      {/* Perspective Quick Switchers */}
      <div className="flex justify-center gap-2 mt-3">
        <button
          onClick={() => setSliderPosition(20)}
          className="text-xs px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#86868b] hover:text-[#f5f5f7] transition"
        >
          Eredeti Szöveg
        </button>
        <button
          onClick={() => setSliderPosition(50)}
          className="text-xs px-3.5 py-1 rounded-full bg-[#0071e3] text-white font-medium hover:bg-[#0077ed] transition"
        >
          50 / 50 Összehasonlítás
        </button>
        <button
          onClick={() => setSliderPosition(80)}
          className="text-xs px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#86868b] hover:text-[#f5f5f7] transition"
        >
          CogniBridge HUD
        </button>
      </div>
    </div>
  );
};
