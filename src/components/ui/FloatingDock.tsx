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
    { id: 'dark', label: 'OLED Dark', color: 'bg-slate-900 border-slate-700' },
    { id: 'sage', label: 'Soft Sage', color: 'bg-[#f2f7f4] border-[#cbdad1]' },
    { id: 'sepia', label: 'Warm Sepia', color: 'bg-[#fbf7ee] border-[#e6dccb]' },
    { id: 'yellow', label: 'Dyslexia Yellow', color: 'bg-[#fdfae6] border-[#e4d89a]' },
    { id: 'light', label: 'Clean Light', color: 'bg-white border-slate-300' },
  ];

  const fontSizes = [
    { label: 'Norm', value: 16 },
    { label: 'Nagy', value: 18 },
    { label: 'Óriás', value: 20 },
    { label: 'Dyslex', value: 22 },
  ];

  const lineSpacings = [
    { label: '1.4', value: 1.4 },
    { label: '1.7', value: 1.7 },
    { label: '2.0', value: 2.0 },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-indigo-500/20 text-white"
      >
        {/* Bionic Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            toggleBionic();
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            settings.bionicReading
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Bionikus Olvasási Mód"
        >
          <Zap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Bionikus</span>
        </button>

        {/* Reading Ruler Toggle */}
        <button
          onClick={() => {
            sound.playPop();
            toggleRuler();
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all ${
            settings.readingRuler
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
          title="Olvasóvonalzó"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Vonalzó</span>
        </button>

        {/* Separator */}
        <div className="h-5 w-[1px] bg-white/15 mx-0.5" />

        {/* Theme Drawer Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              sound.playPop();
              setShowThemes(!showThemes);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
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
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 p-2 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-1 w-44 z-50 text-xs"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
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
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                      settings.theme === t.id
                        ? 'bg-white/15 text-white font-bold'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-full border ${t.color}`} />
                      <span>{t.label}</span>
                    </div>
                    {settings.theme === t.id && <Check className="w-3.5 h-3.5 text-indigo-400" />}
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
          className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          title="Betűtípus: Inter / Lexend / OpenDyslexic"
        >
          <Type className="w-3.5 h-3.5" />
          <span className="hidden sm:inline capitalize">{settings.fontFamily}</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-full text-xs transition-all ${
            soundEnabled
              ? 'text-indigo-400 hover:bg-white/10'
              : 'text-slate-500 hover:bg-white/10'
          }`}
          title={soundEnabled ? 'Hangeffektek bekapcsolva' : 'Hangeffektek némítva'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Expand/Collapse Full Accessibility Modal Trigger */}
        <button
          onClick={() => {
            sound.playPop();
            setIsOpen(!isOpen);
          }}
          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          title="További beállítások"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Extended Controls Modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute bottom-full mb-3 right-0 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-3 w-72 text-xs text-slate-200 z-50"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Akadálymentesítési Készlet
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">WCAG 2.2 AAA</span>
              </div>

              {/* Font Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Betűméret</span>
                  <span>{settings.fontSize}px</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {fontSizes.map((sz) => (
                    <button
                      key={sz.value}
                      onClick={() => {
                        sound.playPop();
                        updateSetting('fontSize', sz.value);
                      }}
                      className={`py-1 rounded text-center text-[10px] font-medium transition ${
                        settings.fontSize === sz.value
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Spacing */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Sorköz</span>
                  <span>{settings.lineSpacing}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {lineSpacings.map((ls) => (
                    <button
                      key={ls.value}
                      onClick={() => {
                        sound.playPop();
                        updateSetting('lineSpacing', ls.value);
                      }}
                      className={`py-1 rounded text-center text-[10px] font-medium transition ${
                        settings.lineSpacing === ls.value
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      {ls.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text to Speech Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Hangfelolvasási sebesség</span>
                  <span>{settings.speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.1"
                  value={settings.speechRate}
                  onChange={(e) => updateSetting('speechRate', parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="pt-2 text-[10px] text-slate-400 border-t border-white/10 flex justify-between items-center">
                <span>Gyorsbillentyűk: <strong>Alt+B</strong>, <strong>Alt+R</strong></span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-indigo-400 hover:underline"
                >
                  Bezárás
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
