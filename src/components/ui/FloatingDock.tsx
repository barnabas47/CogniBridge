import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Ruler, 
  Palette, 
  Volume2, 
  VolumeX, 
  Type, 
  Sparkles,
  Sliders,
  Check
} from 'lucide-react';
import { sound } from '../../services/sound';
import type { AccessibilitySettings } from '../../types';

interface FloatingDockProps {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  toggleBionic: () => void;
  toggleRuler: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  settings,
  updateSetting,
  toggleBionic,
  toggleRuler,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playPop();
  };

  const themes: { id: AccessibilitySettings['theme']; label: string; color: string }[] = [
    { id: 'dark', label: 'Dark Space', color: 'bg-black border-white/20' },
    { id: 'sage', label: 'Soft Sage', color: 'bg-[#0a110e] border-[#30d158]/30' },
    { id: 'sepia', label: 'Warm Sepia', color: 'bg-[#120e0a] border-[#ff9f0a]/30' },
    { id: 'yellow', label: 'Dyslexia Yellow', color: 'bg-[#0f1008] border-[#ffd60a]/30' },
    { id: 'light', label: 'Clean Light', color: 'bg-[#f5f5f7] border-black/20' },
  ];

  const fontSizes = [
    { label: 'Normál', value: 16 },
    { label: 'Nagy', value: 18 },
    { label: 'Óriás', value: 20 },
    { label: 'Dyslexia', value: 22 },
  ];

  const lineSpacings = [
    { label: '1.4x', value: 1.4 },
    { label: '1.7x', value: 1.7 },
    { label: '2.0x', value: 2.0 },
  ];

  return (
    <div className="fixed bottom-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#1c1c1e]/85 backdrop-blur-2xl border border-white/[0.12] shadow-2xl text-[#f5f5f7]"
      >
        {/* Bionic Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            toggleBionic();
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            settings.bionicReading
              ? 'bg-[#0071e3] text-white shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08]'
          }`}
          title="Bionikus Olvasási Mód"
        >
          <Zap className="w-3.5 h-3.5 text-[#2997ff]" />
          <span className="hidden sm:inline">Bionikus</span>
        </button>

        {/* Reading Ruler Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            toggleRuler();
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            settings.readingRuler
              ? 'bg-[#30d158] text-black font-semibold shadow-sm'
              : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08]'
          }`}
          title="Olvasóvonalzó"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Vonalzó</span>
        </button>

        {/* Divider */}
        <div className="h-4 w-[1px] bg-white/[0.12] mx-0.5" />

        {/* Theme Selector */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playPop();
              setShowThemes(!showThemes);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] transition"
            title="Szenzoros Témák"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Téma</span>
          </button>

          {/* Theme Popover */}
          <AnimatePresence>
            {showThemes && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-2 rounded-2xl bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl flex flex-col gap-1 w-44 z-50 text-xs text-[#f5f5f7]"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] px-2 py-1">
                  Szenzoros Témák
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playPop();
                      updateSetting('theme', t.id);
                      setShowThemes(false);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl transition ${
                      settings.theme === t.id
                        ? 'bg-white/[0.12] text-white font-bold'
                        : 'text-[#86868b] hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-full border ${t.color}`} />
                      <span>{t.label}</span>
                    </div>
                    {settings.theme === t.id && <Check className="w-3.5 h-3.5 text-[#2997ff]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Font Switcher */}
        <button
          onClick={() => {
            sound.playPop();
            const nextFont = settings.fontFamily === 'inter' ? 'lexend' : settings.fontFamily === 'lexend' ? 'dyslexic' : 'inter';
            updateSetting('fontFamily', nextFont);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] transition"
          title="Betűtípus váltás"
        >
          <Type className="w-3.5 h-3.5" />
          <span className="hidden sm:inline capitalize">{settings.fontFamily}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`p-1.5 rounded-full text-xs transition ${
            soundEnabled
              ? 'text-[#2997ff] hover:bg-white/[0.08]'
              : 'text-[#6e6e73] hover:bg-white/[0.08]'
          }`}
          title={soundEnabled ? 'Hanghatások aktívak' : 'Hanghatások némítva'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Extended Drawer */}
        <button
          onClick={() => {
            sound.playPop();
            setIsOpen(!isOpen);
          }}
          className="p-1.5 rounded-full text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.08] transition"
          title="További beállítások"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Extended Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute bottom-full mb-3 right-0 p-5 rounded-3xl bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl flex flex-col gap-4 w-76 text-xs text-[#f5f5f7] z-50"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2997ff]" /> Akadálymentesítés
                </span>
                <span className="text-[10px] text-[#30d158] font-semibold">WCAG 2.2 AAA</span>
              </div>

              {/* Font Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#86868b] text-[11px]">
                  <span>Betűméret</span>
                  <span className="text-[#f5f5f7] font-medium">{settings.fontSize}px</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {fontSizes.map((sz) => (
                    <button
                      key={sz.value}
                      onClick={() => {
                        sound.playPop();
                        updateSetting('fontSize', sz.value);
                      }}
                      className={`py-1.5 rounded-xl text-center text-[11px] transition ${
                        settings.fontSize === sz.value
                          ? 'bg-[#0071e3] text-white font-semibold'
                          : 'bg-white/[0.06] hover:bg-white/[0.1] text-[#86868b]'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Spacing */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#86868b] text-[11px]">
                  <span>Sorköz</span>
                  <span className="text-[#f5f5f7] font-medium">{settings.lineSpacing}x</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {lineSpacings.map((ls) => (
                    <button
                      key={ls.value}
                      onClick={() => {
                        sound.playPop();
                        updateSetting('lineSpacing', ls.value);
                      }}
                      className={`py-1.5 rounded-xl text-center text-[11px] transition ${
                        settings.lineSpacing === ls.value
                          ? 'bg-[#0071e3] text-white font-semibold'
                          : 'bg-white/[0.06] hover:bg-white/[0.1] text-[#86868b]'
                      }`}
                    >
                      {ls.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech Rate */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[#86868b] text-[11px]">
                  <span>Felolvasási sebesség</span>
                  <span className="text-[#f5f5f7] font-medium">{settings.speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => updateSetting('speechRate', parseFloat(e.target.value))}
                  className="w-full accent-[#0071e3] cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[11px] text-[#86868b] border-t border-white/[0.08] flex justify-between items-center">
                <span>Alt+B: Bionikus • Alt+R: Vonalzó</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#2997ff] hover:underline"
                >
                  Kész
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
