import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { AccessibilityToolbar } from './components/layout/AccessibilityToolbar';
import { ReadingRuler } from './components/layout/ReadingRuler';
import { DocumentInput } from './components/input/DocumentInput';
import { PanicRadar } from './components/triage/PanicRadar';
import { BionicReader } from './components/reader/BionicReader';
import { LaserStepWizard } from './components/actions/LaserStepWizard';
import { ResolutionStudio } from './components/studio/ResolutionStudio';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { useAccessibility } from './hooks/useAccessibility';
import type { CognitiveAnalysis } from './types';
import type { SampleDocItem } from './samples/sampleDocuments';
import { analyzeDocumentWithGemini, getStoredApiKey } from './services/gemini';
import { loadDocumentHistory, saveDocumentToHistory, deleteDocumentFromHistory } from './services/storage';
import { 
  ArrowLeft, 
  Sparkles, 
  Trash2
} from 'lucide-react';

export default function App() {
  const { settings, updateSetting, toggleBionic, toggleRuler } = useAccessibility();
  
  const [currentAnalysis, setCurrentAnalysis] = useState<CognitiveAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'steps' | 'reader' | 'reply'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<CognitiveAnalysis[]>(loadDocumentHistory);
  
  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const [hasApiKey, setHasApiKey] = useState(!!getStoredApiKey());

  const handleAnalyze = async (input: { text?: string; imageBase64?: string; mimeType?: string }) => {
    setIsLoading(true);
    try {
      const result = await analyzeDocumentWithGemini(input);
      setCurrentAnalysis(result);
      saveDocumentToHistory(result);
      setHistory(loadDocumentHistory());
    } catch (e) {
      console.error('Analysis failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: SampleDocItem) => {
    setCurrentAnalysis(sample.analysis);
    saveDocumentToHistory(sample.analysis);
    setHistory(loadDocumentHistory());
  };

  const handleSelectHistoryItem = (item: CognitiveAnalysis) => {
    setCurrentAnalysis(item);
    setIsHistoryModalOpen(false);
  };

  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteDocumentFromHistory(id);
    setHistory(updated);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(null);
    }
  };

  return (
    <AuroraBackground>
      {/* Interactive Reading Ruler Guide */}
      <ReadingRuler enabled={settings.readingRuler} />

      {/* Floating Glass Header */}
      <Header
        onOpenApiKey={() => setIsApiKeyModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        hasApiKey={hasApiKey}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Floating Accessibility Control HUD */}
        <AccessibilityToolbar
          settings={settings}
          updateSetting={updateSetting}
          toggleBionic={toggleBionic}
          toggleRuler={toggleRuler}
        />

        {/* Dynamic View: Input vs Analysis */}
        {!currentAnalysis ? (
          <DocumentInput
            onAnalyze={handleAnalyze}
            onSelectSample={handleSelectSample}
            isLoading={isLoading}
          />
        ) : (
          <div className="animate-in fade-in duration-300">
            {/* Top Bar Navigation & Tab Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setCurrentAnalysis(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-xs sm:text-sm font-bold text-[var(--text-secondary)] transition-all shadow-sm cursor-pointer hover:scale-105"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Új Dokumentum</span>
              </button>

              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 p-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl shadow-sm text-xs font-bold">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Minden Nézet
                </button>
                <button
                  onClick={() => setActiveTab('steps')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'steps' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  ⚡ Cselekvési Terv
                </button>
                <button
                  onClick={() => setActiveTab('reader')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'reader' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  📖 Bionic Olvasó
                </button>
                <button
                  onClick={() => setActiveTab('reply')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'reply' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  ✉️ Válasz Studio
                </button>
              </div>
            </div>

            {/* Always show Panic Radar Triage */}
            <PanicRadar analysis={currentAnalysis} />

            {/* Modular Views based on Tab */}
            {(activeTab === 'all' || activeTab === 'steps') && (
              <LaserStepWizard
                microActions={currentAnalysis.microActions}
                onUpdateActions={(updated) => {
                  setCurrentAnalysis(prev => prev ? { ...prev, microActions: updated } : null);
                }}
                singleStepFocus={settings.singleStepFocus}
              />
            )}

            {(activeTab === 'all' || activeTab === 'reader') && (
              <BionicReader
                analysis={currentAnalysis}
                settings={settings}
              />
            )}

            {(activeTab === 'all' || activeTab === 'reply') && (
              <ResolutionStudio analysis={currentAnalysis} />
            )}
          </div>
        )}
      </main>

      {/* Modern Frosted Footer */}
      <footer className="border-t border-[var(--border-color)]/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md py-6 mt-16 text-center text-xs text-[var(--text-muted)]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Built with ❤️ for</span>
            <strong className="text-[var(--text-primary)]">Code for Humanity</strong>
            <span>Global Hackathon</span>
          </div>
          <div className="flex items-center gap-3">
            <span>WCAG 2.2 AAA</span>
            <span>•</span>
            <span>Bionic Fixation</span>
            <span>•</span>
            <span>100% Free & Open Tech</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={() => setHasApiKey(!!getStoredApiKey())}
      />

      {/* History Drawer Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--bg-surface)] border border-white/20 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-black text-[var(--text-primary)] mb-3">
              Korábbi Dokumentumok (Privát Vault)
            </h3>

            {history.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-8 text-center">
                Még nincsenek mentett dokumentumok a privát böngésző tárhelyeden.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {history.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleSelectHistoryItem(doc)}
                    className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] hover:border-blue-500 cursor-pointer flex items-center justify-between gap-3 transition-all"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-1">
                        {doc.documentTitle}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                        {doc.tenWordSummary}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistoryItem(doc.id, e)}
                      className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 cursor-pointer transition-colors"
                      title="Törlés"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 pt-3.5 border-t border-[var(--border-color)] flex justify-end">
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Bezárás
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {isAboutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--bg-surface)] border border-white/20 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative text-left animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-black text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              CogniBridge — Code for Humanity
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-5 leading-relaxed">
              A CogniBridge célja a kognitív túlterheltség (cognitive overload) és a végrehajtó funkciók bénulásának (executive dysfunction) megszüntetése neurodivergens (ADHD, autizmus, diszlexia), idős és alacsony digitális írástudású személyek számára.
            </p>

            <div className="space-y-2.5 text-xs text-[var(--text-secondary)] mb-6 bg-[var(--bg-surface-elevated)] p-4 rounded-2xl border border-[var(--border-color)]">
              <div>🎯 <strong>Kognitív Triage:</strong> Érzelmi szorongásmentesítés & 10 szavas lényeg.</div>
              <div>📖 <strong>Bionic Reading & OpenDyslexic:</strong> Szókezdő fixáció és fókuszvonalzó.</div>
              <div>⚡ <strong>Laser Focus Wizard:</strong> Egyszerre CSAK EGY mikrolépés dopamin jutalmakkal.</div>
              <div>💡 <strong>Jargon Buster:</strong> Életszerű analógiák jogi/orvosi kifejezésekre.</div>
              <div>✉️ <strong>Resolution Studio:</strong> Egykattintásos hivatalos válaszlevél & naptár (.ics).</div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsAboutModalOpen(false)}
                className="px-5 py-2 rounded-2xl bg-blue-600 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Értem, köszönöm!
              </button>
            </div>
          </div>
        </div>
      )}
    </AuroraBackground>
  );
}
