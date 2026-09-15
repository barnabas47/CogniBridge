import React, { useState, useRef, useCallback } from 'react';
import { ShieldCheck, AlertTriangle, Sparkles, Zap, Eye, CheckCircle2 } from 'lucide-react';

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
    <div className="w-full my-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Élő Kognitív Transzformáció Sandbox
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-rose-500 dark:text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Eredeti Bürokratikus Irat
          </span>
          <span className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> CogniBridge Kognitív HUD
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative h-[420px] sm:h-[360px] w-full select-none overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-900 shadow-2xl shadow-indigo-500/10 cursor-ew-resize"
      >
        {/* AFTER (CogniBridge HUD - Right / Base Layer) */}
        <div className="absolute inset-0 h-full w-full bg-slate-950/95 p-6 sm:p-8 flex flex-col justify-between text-slate-100">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Érzelmi Biztonság: Nyugodt lehetsz, nincs azonnali vészhelyzet
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                <Zap className="w-3.5 h-3.5" /> Bionikus Fókusz Aktív
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/20 shadow-inner">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                10 Szavas Lényeg
              </div>
              <p className="text-sm font-semibold text-slate-100 leading-snug">
                14.500 Ft gépjárműadó elmaradásod van, amit március 31-ig kell átutalnod a megadott számlára.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 font-medium">Fizetendő összeg</div>
                <div className="text-base font-bold text-amber-400">14 500 Ft</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5">
                <div className="text-[10px] text-slate-400 font-medium">Határidő</div>
                <div className="text-base font-bold text-rose-400">2026. márc. 31.</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-400 font-medium">Következő 1 lépés</div>
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Netbank megnyitása (~2 perc)
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
            <span>✨ Kognitív Terhelés: <strong className="text-emerald-400 font-semibold">-84%</strong></span>
            <span>⚡ Olvasási idő: <strong className="text-indigo-300 font-semibold">18 mp</strong> (korábbi 4.5 perc helyett)</span>
          </div>
        </div>

        {/* BEFORE (Dense Bureaucratic - Left / Overlay Layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-slate-100 text-slate-800 border-r border-indigo-400/50"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="h-full p-6 sm:p-8 flex flex-col justify-between"
            style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-100 border border-rose-300 text-rose-800 text-xs font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Pánikkeltő Hivatalos Felszólítás
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Iktatószám: NAV/2026/98214-B/ÉP</span>
              </div>

              <div className="p-3 bg-white rounded border border-slate-300 shadow-xs text-xs leading-relaxed text-slate-700 font-serif">
                <p className="font-bold text-slate-900 mb-1">
                  ÉRTESÍTÉS ÉS VÉGREHAJTÁSI FIGYELMEZTETÉS FIZETÉSI KÖTELEZETTSÉG TELJESÍTÉSÉRE
                </p>
                <p className="line-clamp-4">
                  A Nemzeti Adó- és Vámhivatal Észak-budapesti Adó- és Vámigazgatósága az adózás rendjéről szóló 2017. évi CL. törvény (Art.) 73. § (1) bekezdés d) pontja és a bírósági végrehajtásról szóló 1994. évi LIII. törvény (Vht.) 14. § alapján értesíti az adózót, hogy a nyilvántartott adószámláján lejárt esedékességű köztartozás mutatkozik...
                </p>
              </div>

              <div className="text-[11px] text-rose-700 font-medium flex items-center gap-1 bg-rose-50 p-2 rounded border border-rose-200">
                ⚠️ Erős szorongást kiváltó jogi zsargon, átláthatatlan határidők és büntetési fenyegetések.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200">
              <span>🚨 Kognitív Pánik Index: <strong className="text-rose-600 font-bold">Magas (9.2/10)</strong></span>
              <span>⚠️ Átlagos megértési idő: <strong className="text-slate-700 font-semibold">4.5 perc</strong></span>
            </div>
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          className="absolute inset-y-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 cursor-ew-resize shadow-lg z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <button
          onClick={() => setSliderPosition(20)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          Több Eredeti
        </button>
        <button
          onClick={() => setSliderPosition(50)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
        >
          50 / 50 Összehasonlítás
        </button>
        <button
          onClick={() => setSliderPosition(80)}
          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
        >
          Több CogniBridge HUD
        </button>
      </div>
    </div>
  );
};
