import React, { useState } from 'react';
import type { CognitiveAnalysis, AccessibilitySettings } from '../../types';
import { formatBionicReading } from '../../services/bionic';
import { JargonHighlighter } from './JargonHighlighter';
import { Play, Pause } from 'lucide-react';
import { speechService } from '../../services/speech';
import { SpotlightCard } from '../ui/SpotlightCard';
import { AudioVisualizer } from '../ui/AudioVisualizer';

interface BionicReaderProps {
  analysis: CognitiveAnalysis;
  settings: AccessibilitySettings;
}

export const BionicReader: React.FC<BionicReaderProps> = ({ analysis, settings }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentSpokenWord, setCurrentSpokenWord] = useState<string>('');

  const handleTogglePlay = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      setCurrentSpokenWord('');
    } else {
      setIsPlayingAudio(true);
      speechService.speak(analysis.easyToReadText, {
        rate: settings.speechRate,
        onBoundary: (_charIndex, word) => {
          setCurrentSpokenWord(word);
        },
        onEnd: () => {
          setIsPlayingAudio(false);
          setCurrentSpokenWord('');
        }
      });
    }
  };

  const formattedContent = settings.bionicReading
    ? formatBionicReading(analysis.easyToReadText)
    : analysis.easyToReadText;

  const fontClass = 
    settings.fontFamily === 'dyslexic' 
      ? 'font-dyslexic' 
      : settings.fontFamily === 'lexend' 
        ? 'font-lexend' 
        : 'font-sans';

  return (
    <SpotlightCard className="p-6 sm:p-8 mb-6 shadow-xl border-white/40 dark:border-white/10">
      {/* Reader Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
            {analysis.documentTitle}
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            Könnyen Érthető Nyelvezet (Easy-to-Read Standard)
          </span>
        </div>

        {/* Audio Player */}
        <div className="flex items-center gap-2">
          {isPlayingAudio && <AudioVisualizer isPlaying={isPlayingAudio} />}

          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                : 'bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-light)] text-[var(--text-primary)] border border-[var(--border-color)]'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Megállítás ({currentSpokenWord || 'Olvasás...'})</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-blue-500" />
                <span>Hangos Felolvasás</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Reader Body with Font, Size & Line Spacing */}
      <div 
        className={`prose max-w-none text-[var(--text-primary)] transition-all ${fontClass}`}
        style={{
          fontSize: `${settings.fontSize}px`,
          lineHeight: settings.lineSpacing,
          letterSpacing: `${settings.letterSpacing}px`
        }}
      >
        {settings.bionicReading ? (
          <div 
            dangerouslySetInnerHTML={{ __html: formattedContent.replace(/\n/g, '<br/>') }}
            className="space-y-3.5 whitespace-pre-line leading-relaxed"
          />
        ) : (
          <div className="space-y-3.5 whitespace-pre-line leading-relaxed">
            {analysis.easyToReadText}
          </div>
        )}
      </div>

      {/* Jargon Buster */}
      <JargonHighlighter terms={analysis.jargonDictionary} />
    </SpotlightCard>
  );
};
