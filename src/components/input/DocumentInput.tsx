import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Sparkles, 
  Loader2, 
  Trash2,
  ScanLine
} from 'lucide-react';
import { SampleSelector } from './SampleSelector';
import type { SampleDocItem } from '../../samples/sampleDocuments';
import { speechService } from '../../services/speech';
import { GlowingButton } from '../ui/GlowingButton';
import { SpotlightCard } from '../ui/SpotlightCard';

interface DocumentInputProps {
  onAnalyze: (input: { text?: string; imageBase64?: string; mimeType?: string }) => void;
  onSelectSample: (sample: SampleDocItem) => void;
  isLoading: boolean;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({
  onAnalyze,
  onSelectSample,
  isLoading
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (!inputText.trim() && !selectedImage) return;

    onAnalyze({
      text: inputText.trim() || undefined,
      imageBase64: selectedImage?.base64,
      mimeType: selectedImage?.mimeType
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setSelectedImage({
          base64,
          mimeType: file.type,
          preview: base64
        });
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputText(reader.result as string);
      };
      reader.readAsText(file);
    } else {
      alert('Kérlek képet (JPG/PNG) vagy szöveges fájlt válassz!');
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      speechService.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      speechService.startListening(
        (transcript) => {
          setInputText(prev => (prev ? prev + ' ' : '') + transcript);
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setIsRecording(false);
        }
      );
    }
  };

  return (
    <div className="mb-10">
      {/* Apple-style Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-8 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold mb-4 animate-in fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodális Kognitív Támogatás</span>
        </div>
        
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 mb-3.5 leading-tight">
          Alakítsd át a bürokratikus stresszt azonnali cselekvéssé.
        </h2>
        
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Tölts fel egy fotót a hivatalos levélről, adóértesítőről vagy orvosi leletről. A CogniBridge azonnal megszünteti a szorongást és 2 perces lépésekre bontja a teendőket.
        </p>
      </div>

      {/* Main Glass Input Hub */}
      <SpotlightCard className="p-5 sm:p-7 shadow-2xl border-white/40 dark:border-white/10">
        <div className="relative rounded-2xl bg-[var(--bg-surface-elevated)]/60 border border-[var(--border-color)] p-4 transition-all focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/10">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Illeszd be ide a nehezen érthető szöveget, vagy tölts fel egy fotót a papír alapú levélről..."
            rows={5}
            className="w-full bg-transparent resize-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm sm:text-base leading-relaxed"
            disabled={isLoading}
          />

          {/* Selected Image Preview with Scanner Effect */}
          {selectedImage && (
            <div className="mt-3 relative inline-block border border-blue-500/40 rounded-2xl overflow-hidden bg-[var(--bg-surface)] shadow-lg group">
              <img 
                src={selectedImage.preview} 
                alt="Feltöltött dokumentum előnézete" 
                className="h-32 object-contain rounded-xl p-1.5"
              />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 animate-bounce" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-colors cursor-pointer"
                title="Kép törlése"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-[var(--border-color)]/70">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,.txt"
                className="hidden"
              />

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] border border-[var(--border-color)] text-xs sm:text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-xs transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-blue-500" />
                <span>Fotó / Dokumentum</span>
              </button>

              {/* Voice Input Button */}
              <button
                onClick={toggleVoiceRecording}
                type="button"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isRecording 
                    ? 'border-rose-500 bg-rose-500/15 text-rose-600 animate-pulse' 
                    : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)]'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4 text-rose-500" /> : <Mic className="w-4 h-4 text-purple-500" />}
                <span>{isRecording ? 'Felvétel állítása...' : 'Hangalapú Diktálás'}</span>
              </button>
            </div>

            {/* Submit Action */}
            <GlowingButton
              onClick={handleTextSubmit}
              disabled={isLoading || (!inputText.trim() && !selectedImage)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Kognitív Elemzés...</span>
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4" />
                  <span>Lényeg Kiszűrése & Akcióterv</span>
                </>
              )}
            </GlowingButton>
          </div>
        </div>

        {/* 1-Click Samples for Judges */}
        <SampleSelector onSelectSample={onSelectSample} isLoading={isLoading} />
      </SpotlightCard>
    </div>
  );
};
