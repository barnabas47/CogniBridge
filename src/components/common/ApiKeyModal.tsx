import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../../services/gemini';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredApiKey(apiKey);
    setSavedSuccess(true);
    onSaved();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-xl text-[var(--text-muted)] hover:bg-[var(--accent-light)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Google Gemini API Kulcs</h3>
            <span className="text-xs text-[var(--text-muted)]">Opcionális saját API kulcs</span>
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
          A CogniBridge beépített intelligens mintamotorral rendelkezik. Ha saját élő dokumentumokat szeretnél elemezni a legújabb <strong>Gemini 2.5 Flash</strong> modellel, add meg az ingyenes Google AI Studio API kulcsodat:
        </p>

        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="AIzaSy..."
          className="w-full p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--ring-color)] mb-3"
        />

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 mb-5">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>A kulcs kizárólag a te böngésződben (LocalStorage) tárolódik privát módon.</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[var(--accent-color)] hover:underline flex items-center gap-1"
          >
            <span>Ingyenes kulcs igénylése</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-color)] text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Mentve!</span>
              </>
            ) : (
              <span>Mentés</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
