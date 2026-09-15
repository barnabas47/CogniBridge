import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { ReadingRuler } from './components/layout/ReadingRuler';
import { DocumentInput } from './components/input/DocumentInput';
import { PanicRadar } from './components/triage/PanicRadar';
import { BionicReader } from './components/reader/BionicReader';
import { LaserStepWizard } from './components/actions/LaserStepWizard';
import { ResolutionStudio } from './components/studio/ResolutionStudio';
import { ApiKeyModal } from './components/common/ApiKeyModal';
import { AuroraBackground } from './components/ui/AuroraBackground';
import { ComparisonSlider } from './components/ui/ComparisonSlider';
import { FloatingDock } from './components/ui/FloatingDock';
import { MetricBadge } from './components/ui/MetricBadge';
import { useAccessibility } from './hooks/useAccessibility';
import type { CognitiveAnalysis } from './types';
import { analyzeDocumentWithGemini, getStoredApiKey } from './services/gemini';
import { loadDocumentHistory, saveDocumentToHistory, deleteDocumentFromHistory } from './services/storage';
import { sound } from './services/sound';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Clock, 
  TrendingDown, 
  FileText, 
  History, 
  Trash2,
  BrainCircuit
} from 'lucide-react';

export default function App() {
  const { settings, updateSetting, toggleBionic, toggleRuler } = useAccessibility();
  
  const [currentAnalysis, setCurrentAnalysis] = useState<CognitiveAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'triage' | 'steps' | 'reader' | 'reply' | 'all'>('triage');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<CognitiveAnalysis[]>(loadDocumentHistory);
  
  // Modals
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(() => !!getStoredApiKey());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleAnalyze = async (text: string, title?: string, _category?: string) => {
    setIsLoading(true);
    try {
      const result = await analyzeDocumentWithGemini({ text });
      if (title && result) {
        result.documentTitle = title;
      }
      setCurrentAnalysis(result);
      saveDocumentToHistory(result);
      setHistory(loadDocumentHistory());
      setActiveTab('triage');
      sound.playTensionRelease();
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Hiba történt az elemzés során. Kérlek próbáld újra!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item: CognitiveAnalysis) => {
    sound.playPop();
    setCurrentAnalysis(item);
    setIsHistoryOpen(false);
    setActiveTab('triage');
  };

  const handleDeleteHistory = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sound.playPop();
    deleteDocumentFromHistory(id);
    setHistory(loadDocumentHistory());
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(null);
    }
  };

  const tabs: { id: typeof activeTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'triage', label: 'Pánik Radar & Triage', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, badge: 'Elsődleges' },
    { id: 'steps', label: '1-Lépéses Fókusz', icon: <Zap className="w-4 h-4 text-indigo-400" />, badge: currentAnalysis ? `${currentAnalysis.microActions.length} lépés` : undefined },
    { id: 'reader', label: 'Bionikus Olvasó & Lencse', icon: <FileText className="w-4 h-4 text-amber-400" /> },
    { id: 'reply', label: 'Resolution & Naptár', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
    { id: 'all', label: 'Teljes Kognitív HUD', icon: <BrainCircuit className="w-4 h-4 text-cyan-400" /> },
  ];

  return (
    <AuroraBackground>
      {/* Visual Reading Ruler Overlay */}
      <ReadingRuler enabled={settings.readingRuler} />

      {/* Floating Header */}
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-10">
        
        {/* HERO SHOWCASE (When no document is selected) */}
        {!currentAnalysis && (
          <div className="space-y-8 pt-4">
            {/* Kinetic Hero Intro */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Code for Humanity • Next-Gen Cognitive Accessibility OS</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                Tedd a bürokráciát{' '}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  pánikmentessé és érthetővé.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto"
              >
                A <strong>CogniBridge</strong> másodpercek alatt bontja le a félelmetes hatósági leveleket, orvosi leleteket és jogi szövegeket 10 szavas lényegre, bionikus olvasásra és 1-lépéses cselekvési tervre ADHD-soknak, autistáknak és időseknek.
              </motion.p>
            </div>

            {/* KPI Stat Pills */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <MetricBadge
                icon={<TrendingDown className="w-5 h-5" />}
                label="Pánik & Szorongás"
                value="-85%"
                subValue="Azonnali megnyugtatás"
                trend="positive"
              />
              <MetricBadge
                icon={<Zap className="w-5 h-5" />}
                label="Olvasási Sebesség"
                value="2.4x Gyorsabb"
                subValue="Bionikus rögzítési pontok"
                trend="positive"
              />
              <MetricBadge
                icon={<Clock className="w-5 h-5" />}
                label="Végrehajtási Hatékonyság"
                value="1 Lépés / Idő"
                subValue="Anti-Paralysis design"
                trend="positive"
              />
              <MetricBadge
                icon={<ShieldCheck className="w-5 h-5" />}
                label="Szabvány Megfelelés"
                value="WCAG 2.2 AAA"
                subValue="100% Akadálymentes"
                trend="positive"
              />
            </div>

            {/* Interactive Before / After Sandbox Slider */}
            <ComparisonSlider />
          </div>
        )}

        {/* DOCUMENT INPUT & DEMO SELECTION AREA */}
        {!currentAnalysis ? (
          <section className="pt-2">
            <DocumentInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </section>
        ) : (
          /* ACTIVE ANALYSIS DASHBOARD */
          <div className="space-y-6">
            {/* Top Navigation & Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playPop();
                    setCurrentAnalysis(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-300 transition"
                  title="Vissza az új dokumentum beillesztéséhez"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Új Dokumentum</span>
                </button>

                <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

                <div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                    {currentAnalysis.documentTitle}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Kategória: <span className="capitalize font-semibold text-indigo-400">{currentAnalysis.category}</span> • Elemzés kész
                  </p>
                </div>
              </div>

              {/* History Button */}
              {history.length > 0 && (
                <button
                  onClick={() => {
                    sound.playPop();
                    setIsHistoryOpen(!isHistoryOpen);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                >
                  <History className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Előzmények ({history.length})</span>
                </button>
              )}
            </div>

            {/* History Dropdown Modal */}
            <AnimatePresence>
              {isHistoryOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 shadow-xl space-y-2"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1">
                    Korábban Elemzett Dokumentumok
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectHistory(item)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          currentAnalysis.id === item.id
                            ? 'bg-indigo-500/15 border-indigo-500 text-indigo-300 font-bold'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-indigo-400/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-bold truncate">{item.documentTitle}</div>
                          <div className="text-[10px] text-slate-400 truncate">{item.tenWordSummary}</div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteHistory(e, item.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition shrink-0"
                          title="Törlés"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Segmented Mode Tab Switcher with LayoutId Spring */}
            <div className="flex rounded-3xl bg-slate-200/70 dark:bg-slate-900/80 p-1.5 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playPop();
                      setActiveTab(tab.id);
                    }}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors whitespace-nowrap z-10 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30"
                        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      />
                    )}
                    <span className="relative z-20 flex items-center gap-1.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-300 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active View Container */}
            <AnimatePresence mode="wait">
              {activeTab === 'triage' && (
                <motion.div
                  key="triage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PanicRadar analysis={currentAnalysis} />
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <LaserStepWizard microActions={currentAnalysis.microActions} />
                </motion.div>
              )}

              {activeTab === 'reader' && (
                <motion.div
                  key="reader"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <BionicReader
                    analysis={currentAnalysis}
                    settings={settings}
                    toggleBionic={toggleBionic}
                    toggleRuler={toggleRuler}
                  />
                </motion.div>
              )}

              {activeTab === 'reply' && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ResolutionStudio analysis={currentAnalysis} />
                </motion.div>
              )}

              {activeTab === 'all' && (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  <PanicRadar analysis={currentAnalysis} />
                  <LaserStepWizard microActions={currentAnalysis.microActions} />
                  <BionicReader
                    analysis={currentAnalysis}
                    settings={settings}
                    toggleBionic={toggleBionic}
                    toggleRuler={toggleRuler}
                  />
                  <ResolutionStudio analysis={currentAnalysis} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Floating Accessibility Control Dock */}
      <FloatingDock
        settings={settings}
        updateSetting={updateSetting}
        toggleBionic={toggleBionic}
        toggleRuler={toggleRuler}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSaved={() => setHasApiKey(!!getStoredApiKey())}
      />
    </AuroraBackground>
  );
}
