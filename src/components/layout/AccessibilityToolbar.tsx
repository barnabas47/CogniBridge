import React from 'react';
import { 
  Sparkles, 
  Eye, 
  Type, 
  SunMedium, 
  Check,
  Zap
} from 'lucide-react';
import type { AccessibilitySettings } from '../../types';

interface ToolbarProps {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  toggleBionic: () => void;
  toggleRuler: () => void;
}

export const AccessibilityToolbar: React.FC<ToolbarProps> = ({
  settings,
  updateSetting,
  toggleBionic,
  toggleRuler
}) => {
  return (
    <div className="relative mb-6 rounded-3xl p-2.5 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/40 dark:border-white/10 shadow-lg shadow-black/5 flex flex-wrap items-center justify-between gap-3 text-xs transition-all">
      {/* Title / Badge */}
      <div className="flex items-center gap-2 pl-2 text-[var(--text-secondary)] font-bold">
        <Zap className="w-4 h-4 text-blue-500" />
        <span className="hidden sm:inline">Kognitív Fókuszvezérlő:</span>
      </div>

      {/* Action Toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Bionic Reading Toggle */}
        <button
          onClick={toggleBionic}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl font-bold transition-all duration-200 cursor-pointer ${
            settings.bionicReading 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
              : 'bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] border border-[var(--border-color)]'
          }`}
          title="Szókezdő fixáció kiemelése (ADHD & Diszlexia támogatás)"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bionic Olvasás</span>
          {settings.bionicReading && <Check className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Reading Ruler Toggle */}
        <button
          onClick={toggleRuler}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl font-bold transition-all duration-200 cursor-pointer ${
            settings.readingRuler 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
              : 'bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] border border-[var(--border-color)]'
          }`}
          title="Egérkövető fókuszsáv a környező sorok tompításával"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Olvasó Vonalzó</span>
          {settings.readingRuler && <Check className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        {/* Font Switcher */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-1 shadow-xs">
          {(['lexend', 'dyslexic', 'inter'] as const).map((font) => (
            <button
              key={font}
              onClick={() => updateSetting('fontFamily', font)}
              className={`px-2.5 py-1 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                settings.fontFamily === font 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {font === 'dyslexic' ? 'Dyslexia' : font}
            </button>
          ))}
        </div>

        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1.5 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl px-2.5 py-1">
          <Type className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          <button
            onClick={() => updateSetting('fontSize', Math.max(14, settings.fontSize - 2))}
            className="w-5 h-5 flex items-center justify-center font-black rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-primary)] cursor-pointer"
            title="Kisebb méret"
          >
            -
          </button>
          <span className="font-extrabold text-[var(--text-primary)] px-1">{settings.fontSize}px</span>
          <button
            onClick={() => updateSetting('fontSize', Math.min(26, settings.fontSize + 2))}
            className="w-5 h-5 flex items-center justify-center font-black rounded-lg hover:bg-[var(--accent-light)] text-[var(--text-primary)] cursor-pointer"
            title="Nagyobb méret"
          >
            +
          </button>
        </div>

        {/* Theme Picker Bubbles */}
        <div className="flex items-center gap-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-1">
          <button
            onClick={() => updateSetting('theme', 'light')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              settings.theme === 'light' ? 'bg-blue-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--accent-light)]'
            }`}
            title="Világos Téma"
          >
            <SunMedium className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => updateSetting('theme', 'sage')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              settings.theme === 'sage' ? 'ring-2 ring-emerald-500' : ''
            }`}
            title="Soft Sage (Szenzoros Megnyugtató Zöld Téma)"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#3b7a57]" />
          </button>
          <button
            onClick={() => updateSetting('theme', 'sepia')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              settings.theme === 'sepia' ? 'ring-2 ring-amber-500' : ''
            }`}
            title="Warm Sepia (Szemkímélő Meleg Téma)"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#b46b1a]" />
          </button>
          <button
            onClick={() => updateSetting('theme', 'yellow')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              settings.theme === 'yellow' ? 'ring-2 ring-yellow-500' : ''
            }`}
            title="Dyslexia Yellow (Kiemelt Olvashatóságú Sárga Tint)"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-[#fde047] border border-amber-400" />
          </button>
          <button
            onClick={() => updateSetting('theme', 'dark')}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              settings.theme === 'dark' ? 'ring-2 ring-blue-400' : ''
            }`}
            title="OLED Kontrasztos Sötét Mód"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
