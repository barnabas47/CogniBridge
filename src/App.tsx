import React, { useState, useRef } from 'react';
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
import { GlowingButton } from './components/ui/GlowingButton';
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
  BrainCircuit,
  ArrowDown
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

  const inputSectionRef = useRef<HTMLDivElement>(null);

  const scrollToInput = () => {
    sound.playPop();
    inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    { id: 'triage', label: 'Pánik Radar & Triage', icon: <ShieldCheck className="w-4 h-4 text-[#30d158]" />, badge: 'Elsődleges' },
    { id: 'steps', label: '1-Lépéses Fókusz', icon: <Zap className="w-4 h-4 text-[#2997ff]" />, badge: currentAnalysis ? `${currentAnalysis.microActions.length} lépés` : undefined },
    { id: 'reader', label: 'Bionikus Olvasó & Lencse', icon: <FileText className="w-4 h-4 text-[#ff9f0a]" /> },
    { id: 'reply', label: 'Resolution Studio', icon: <Sparkles className="w-4 h-4 text-[#a259ff]" /> },
    { id: 'all', label: 'Teljes Kognitív HUD', icon: <BrainCircuit className="w-4 h-4 text-[#2997ff]" /> },
  ];

  return (
    <AuroraBackground>
      {/* Visual Reading Ruler Overlay */}
      <ReadingRuler enabled={settings.readingRuler} />

      {/* Apple Frosted Glass Header */}
      <Header
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-32 space-y-12">
        
        {/* CINEMATIC APPLE KEYNOTE HERO (When no document is active) */}
        {!currentAnalysis && (
          <div className="space-y-12 pt-4">
            {/* Giant Apple Typography */}
            <div className="text-center space-y-5 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[#86868b] text-xs font-normal shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-pulse" />
                <span>Code for Humanity • Kognitív Akadálymentesítő OS</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-7xl font-bold tracking-tight text-[#f5f5f7] leading-[1.08]"
              >
                Bürokrácia.{' '}
                <span className="apple-intelligence-text">
                  Pánik nélkül.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-[#86868b] font-normal leading-relaxed max-w-2xl mx-auto"
              >
                A világ első kognitív operációs rendszere ADHD-sok, autisták és idősek számára. Másodpercek alatt változtatja a bürokratikus káoszt 10 szavas lényeggé és 1-lépéses cselekvéssé.
              </motion.p>

              {/* Apple Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-3 pt-2"
              >
                <GlowingButton
                  variant="primary"
                  size="lg"
                  onClick={scrollToInput}
                  icon={<ArrowDown className="w-4 h-4" />}
                >
                  Dokumentum Beillesztése
                </GlowingButton>
                
                <GlowingButton
                  variant="secondary"
                  size="lg"
                  onClick={scrollToInput}
                >
                  Minták Kipróbálása
                </GlowingButton>
              </motion.div>
            </div>

            {/* Apple Pro Titanium Metric Cards */}
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
                label="Végrehajtás"
                value="1 Lépés / Idő"
                subValue="Anti-Paralysis design"
                trend="positive"
              />
              <MetricBadge
                icon={<ShieldCheck className="w-5 h-5" />}
                label="Akadálymentes"
                value="WCAG 2.2 AAA"
                subValue="100% szabványos"
                trend="positive"
              />
            </div>

            {/* Apple Hardware Studio Frame: Comparison Sandbox */}
            <ComparisonSlider />
          </div>
        )}

        {/* DOCUMENT INPUT & DEMO SELECTION AREA */}
        {!currentAnalysis ? (
          <section ref={inputSectionRef} className="pt-4">
            <DocumentInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </section>
        ) : (
          /* ACTIVE ANALYSIS DASHBOARD */
          <div className="space-y-6">
            {/* Top Navigation & Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-[#161617]/85 backdrop-blur-2xl border border-white/[0.08] shadow-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playPop();
                    setCurrentAnalysis(null);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-[#f5f5f7] transition"
                  title="Vissza a főoldalra"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Új Dokumentum</span>
                </button>

                <div className="h-4 w-[1px] bg-white/[0.1]" />

                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#f5f5f7] truncate max-w-[200px] sm:max-w-md">
                    {currentAnalysis.documentTitle}
                  </h2>
                  <p className="text-[11px] text-[#86868b]">
                    Kategória: <span className="capitalize text-[#2997ff]">{currentAnalysis.category}</span> • Elemzés kész
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
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.08] text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.14] transition"
                >
                  <History className="w-3.5 h-3.5 text-[#2997ff]" />
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
                  className="p-4 rounded-3xl bg-[#1c1c1e]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl space-y-2"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] pb-1 px-1">
                    Korábban Elemzett Dokumentumok
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectHistory(item)}
                        className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                          currentAnalysis.id === item.id
                            ? 'bg-[#0071e3]/20 border-[#0071e3] text-[#2997ff] font-semibold'
                            : 'bg-black/40 border-white/[0.08] hover:border-white/[0.2] text-[#86868b] hover:text-[#f5f5f7]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-medium truncate text-[#f5f5f7]">{item.documentTitle}</div>
                          <div className="text-[10px] text-[#86868b] truncate">{item.tenWordSummary}</div>
                        </div>
                        <button
                          onClick={(e) => handleDeleteHistory(e, item.id)}
                          className="p-1 rounded-lg text-[#6e6e73] hover:text-[#ff453a] transition shrink-0"
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

            {/* Apple Segmented Mode Tab Switcher with LayoutId Spring */}
            <div className="flex rounded-full bg-[#161617]/90 p-1 backdrop-blur-2xl border border-white/[0.08] shadow-xl overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      sound.playPop();
                      setActiveTab(tab.id);
                    }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap z-10 ${
                      isActive
                        ? 'text-[#f5f5f7]'
                        : 'text-[#86868b] hover:text-[#f5f5f7]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-[#2c2c2e] rounded-full border border-white/[0.12] shadow-sm"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-20 flex items-center gap-1.5">
                      {tab.icon}
                      <span>{tab.label}</span>
                      {tab.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                          isActive ? 'bg-white/[0.15] text-white' : 'bg-white/[0.06] text-[#86868b]'
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <PanicRadar analysis={currentAnalysis} />
                </motion.div>
              )}

              {activeTab === 'steps' && (
                <motion.div
                  key="steps"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <LaserStepWizard microActions={currentAnalysis.microActions} />
                </motion.div>
              )}

              {activeTab === 'reader' && (
                <motion.div
                  key="reader"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <ResolutionStudio analysis={currentAnalysis} />
                </motion.div>
              )}

              {activeTab === 'all' && (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
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

      {/* Floating Accessibility Island */}
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
