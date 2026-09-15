import React, { useState, useMemo } from 'react';
import type { CognitiveAnalysis, AccessibilitySettings } from '../../types';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Ruler, 
  Type, 
  Sparkles, 
  BookOpen 
} from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { AudioVisualizer } from '../ui/AudioVisualizer';
import { JargonHighlighter } from './JargonHighlighter';
import { formatBionicReading } from '../../services/bionic';
import { speechService } from '../../services/speech';
import { sound } from '../../services/sound';

interface BionicReaderProps {
  analysis: CognitiveAnalysis;
  settings: AccessibilitySettings;
  toggleBionic: () => void;
  toggleRuler: () => void;
}

export const BionicReader: React.FC<BionicReaderProps> = ({
  analysis,
  settings,
  toggleBionic,
  toggleRuler,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<'simplified' | 'original'>('simplified');

  const textToDisplay = viewMode === 'simplified' 
    ? analysis.easyToReadText 
    : (analysis.rawInputText || analysis.easyToReadText);

  // Process text into Bionic HTML if bionic reading is enabled
  const processedHtml = useMemo(() => {
    if (settings.bionicReading) {
      return formatBionicReading(textToDisplay);
    }
    return textToDisplay.replace(/\n/g, '<br />');
  }, [textToDisplay, settings.bionicReading]);

  // Audio Speech Controls
  const handlePlayAudio = () => {
    sound.playPop();
    if (isPlaying) {
      speechService.pause();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechService.speak(textToDisplay, {
        rate: settings.speechRate,
        onEnd: () => {
          setIsPlaying(false);
        },
      });
    }
  };

  const handleStopAudio = () => {
    sound.playPop();
    speechService.stop();
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      {/* Reader Control Bar */}
      <div className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Left: View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl bg-slate-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('simplified');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'simplified'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Kognitívan Egyszerűsített
            </button>
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('original');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'original'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Eredeti Szöveg
            </button>
          </div>
        </div>

        {/* Center: Audio Visualizer & Player */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAudio}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition ${
              isPlaying
                ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                : 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Megállítás' : 'Felolvasás'}</span>
          </button>

          {isPlaying && (
            <button
              onClick={handleStopAudio}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-rose-500 transition"
              title="Leállítás"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <AudioVisualizer isPlaying={isPlaying} />
        </div>

        {/* Right: Quick Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              toggleBionic();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              settings.bionicReading
                ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-transparent'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Bionikus Fókusz</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              toggleRuler();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              settings.readingRuler
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-transparent'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Vonalzó</span>
          </button>
        </div>
      </div>

      {/* Jargon Highlighter Bar */}
      {analysis.jargonDictionary && analysis.jargonDictionary.length > 0 && (
        <JargonHighlighter terms={analysis.jargonDictionary} />
      )}

      {/* Main Reading Surface */}
      <SpotlightCard className="p-6 sm:p-10 relative">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {viewMode === 'simplified' ? 'Tisztított Kognitív Szöveg' : 'Eredeti Bemenet'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Type className="w-3.5 h-3.5" />
            <span className="capitalize">{settings.fontFamily} ({settings.fontSize}px)</span>
          </div>
        </div>

        {/* Text Body */}
        <div
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineSpacing,
          }}
          className="font-sans text-slate-800 dark:text-slate-100 transition-all duration-200"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />

        {settings.bionicReading && (
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" /> A szavak első 40-50%-ának kiemelése segíti a szem gyorsabb rögzítését.
            </span>
            <span>Tudományosan igazolt kognitív gyorsolvasás</span>
          </div>
        )}
      </SpotlightCard>
    </div>
  );
};
