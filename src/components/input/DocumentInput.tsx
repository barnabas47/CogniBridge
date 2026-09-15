import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Mic, 
  MicOff, 
  UploadCloud, 
  Sparkles, 
  X, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
  GraduationCap
} from 'lucide-react';
import { GlowingButton } from '../ui/GlowingButton';
import { SpotlightCard } from '../ui/SpotlightCard';
import { speechService } from '../../services/speech';
import { SAMPLE_DOCUMENTS, type SampleDocItem } from '../../samples/sampleDocuments';
import { sound } from '../../services/sound';

interface DocumentInputProps {
  onAnalyze: (text: string, title?: string, category?: string) => void;
  isLoading: boolean;
}

export const DocumentInput: React.FC<DocumentInputProps> = ({
  onAnalyze,
  isLoading,
}) => {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('general');
  const [isRecording, setIsRecording] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Speech Dictation
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      setIsRecording(false);
      sound.playPop();
    } else {
      sound.playPop();
      setIsRecording(true);
      speechService.startListening(
        (transcript) => {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        (error) => {
          console.error('Speech error:', error);
          setIsRecording(false);
        }
      );
    }
  };

  // Handle File Upload / Drop
  const handleFile = (file: File) => {
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
        sound.playPop();
      };
      reader.readAsText(file);
    } else {
      setTitle(file.name);
      setInputText(
        `Feltöltött fájl: ${file.name} (${Math.round(file.size / 1024)} KB)\n\n[Dokumentum tartalma beolvasva elemzésre...]`
      );
      sound.playPop();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleDocItem) => {
    sound.playPop();
    setTitle(sample.title);
    setInputText(sample.sampleInput);
    setCategory(sample.analysis.category);
  };

  const handleAnalyzeClick = () => {
    if (!inputText.trim() || isLoading) return;
    sound.playPop();
    onAnalyze(inputText, title || 'Névtelen Dokumentum', category);
  };

  return (
    <div className="w-full space-y-6">
      {/* Interactive Apple Preset Sandbox Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2997ff]" />
            Azonnal Tesztelhető Esettanulmányok
          </span>
          <span className="text-[11px] text-[#6e6e73]">1-kattintásos betöltés</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_DOCUMENTS.map((sample) => {
            const icons = {
              tax_legal: <Building2 className="w-4 h-4 text-[#ff453a]" />,
              medical: <Stethoscope className="w-4 h-4 text-[#30d158]" />,
              education: <GraduationCap className="w-4 h-4 text-[#2997ff]" />,
              utility_bill: <Building2 className="w-4 h-4 text-[#ff9f0a]" />,
              general: <FileText className="w-4 h-4 text-[#86868b]" />,
            };

            const isSelected = inputText === sample.sampleInput;
            const categoryKey = sample.analysis.category as keyof typeof icons;

            return (
              <motion.button
                key={sample.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectSample(sample)}
                className={`p-5 rounded-3xl text-left transition-all border relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#1c1c1e] border-[#0071e3] shadow-lg text-[#f5f5f7]'
                    : 'bg-[#161617]/85 border-white/[0.08] hover:border-white/[0.2] text-[#86868b]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-2xl bg-white/[0.06]">
                      {icons[categoryKey] || <FileText className="w-4 h-4 text-[#86868b]" />}
                    </div>
                    <span className="text-xs font-semibold text-[#f5f5f7] truncate max-w-[140px]">
                      {sample.title}
                    </span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                    sample.analysis.urgency === 'urgent'
                      ? 'bg-[#ff453a]/15 text-[#ff453a] border border-[#ff453a]/30'
                      : sample.analysis.urgency === 'moderate'
                      ? 'bg-[#ff9f0a]/15 text-[#ff9f0a] border border-[#ff9f0a]/30'
                      : 'bg-[#30d158]/15 text-[#30d158] border border-[#30d158]/30'
                  }`}>
                    {sample.analysis.urgency === 'urgent' ? 'Pánikhelyzet' : sample.analysis.urgency === 'moderate' ? 'Határidős' : 'Információ'}
                  </span>
                </div>
                <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-medium text-[#2997ff]">
                  <span>Tesztelés betöltése</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Apple Studio Input & Dropzone Card */}
      <SpotlightCard
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`transition-all duration-300 ${
          isDragOver ? 'border-[#0071e3] ring-2 ring-[#0071e3]/40' : ''
        }`}
      >
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#0071e3]/15 text-[#2997ff]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[#f5f5f7]">
                  Bármilyen Hivatalos vagy Orvosi Szöveg Beillesztése
                </h3>
                <p className="text-xs text-[#86868b]">
                  Másold be a hivatalos felszólítást, e-mailt vagy diktáld le mikrofonnal
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  isRecording
                    ? 'bg-[#ff453a] text-white animate-pulse shadow-md shadow-[#ff453a]/30'
                    : 'bg-white/[0.08] hover:bg-white/[0.14] text-[#f5f5f7]'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Felvétel...' : 'Diktálás'}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.08] hover:bg-white/[0.14] text-[#f5f5f7] transition"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fájl feltöltése</span>
              </button>

              {inputText && (
                <button
                  type="button"
                  onClick={() => {
                    setInputText('');
                    setTitle('');
                    sound.playPop();
                  }}
                  className="p-1.5 rounded-full text-[#86868b] hover:text-[#ff453a] hover:bg-[#ff453a]/10 transition"
                  title="Törlés"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Pure Dark Glass Textarea */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Illeszd be ide a nehezen érthető hivatalos levelet, orvosi leletet, NAV felszólítást, szerződést vagy szabályzatot..."
              rows={6}
              className="w-full rounded-2xl p-4 text-xs sm:text-sm bg-black/60 border border-white/[0.08] focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] text-[#f5f5f7] placeholder-[#6e6e73] resize-y transition focus:outline-none leading-relaxed font-sans"
            />
            {inputText && (
              <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#86868b] bg-[#161617]/90 px-2.5 py-0.5 rounded-full border border-white/[0.08]">
                {inputText.length} karakter
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#86868b]">
              <ShieldCheck className="w-4 h-4 text-[#30d158]" />
              <span>100% Kliensoldali & Biztonságos Kognitív Elemzés</span>
            </div>

            <GlowingButton
              variant="primary"
              size="lg"
              onClick={handleAnalyzeClick}
              disabled={!inputText.trim() || isLoading}
              icon={<Sparkles className="w-4 h-4" />}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Kognitív Dekódolás...
                </span>
              ) : (
                'Kognitív Transzformáció'
              )}
            </GlowingButton>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
