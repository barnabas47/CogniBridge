import { useState, useEffect } from 'react';
import type { AccessibilitySettings } from '../types';
import { loadAccessibilitySettings, saveAccessibilitySettings, applyThemeToDom } from '../services/storage';

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadAccessibilitySettings);

  useEffect(() => {
    applyThemeToDom(settings.theme);
  }, [settings.theme]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K, 
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      saveAccessibilitySettings(next);
      return next;
    });
  };

  const toggleBionic = () => updateSetting('bionicReading', !settings.bionicReading);
  const toggleRuler = () => updateSetting('readingRuler', !settings.readingRuler);
  const toggleSingleStep = () => updateSetting('singleStepFocus', !settings.singleStepFocus);

  return {
    settings,
    updateSetting,
    toggleBionic,
    toggleRuler,
    toggleSingleStep
  };
}
