import type { AccessibilitySettings, CognitiveAnalysis } from '../types';

const STORAGE_SETTINGS_KEY = 'cognibridge_accessibility_settings';
const STORAGE_HISTORY_KEY = 'cognibridge_document_history';

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontFamily: 'lexend',
  fontSize: 18,
  lineSpacing: 1.7,
  letterSpacing: 0.3,
  theme: 'light',
  bionicReading: false,
  readingRuler: false,
  singleStepFocus: true,
  speechRate: 1.0
};

export function loadAccessibilitySettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(STORAGE_SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  try {
    localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settings));
    applyThemeToDom(settings.theme);
  } catch (e) {}
}

export function applyThemeToDom(theme: string): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'light') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', theme);
  }
}

export function loadDocumentHistory(): CognitiveAnalysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}
  return [];
}

export function saveDocumentToHistory(analysis: CognitiveAnalysis): void {
  try {
    const history = loadDocumentHistory();
    const updated = [analysis, ...history.filter(h => h.id !== analysis.id)].slice(0, 15);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {}
}

export function deleteDocumentFromHistory(id: string): CognitiveAnalysis[] {
  try {
    const history = loadDocumentHistory().filter(h => h.id !== id);
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
    return history;
  } catch (e) {}
  return [];
}
