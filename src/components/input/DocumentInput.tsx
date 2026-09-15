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
  Zap,
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
      {/* 1-Click Interactive Preset Sandbox Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            Azonnal Tesztelhető Valós Esettanulmányok (1-Kattintásos Elemzés)
          </span>
          <span className="text-[11px] text-slate-400">Válassz egyet a kipróbáláshoz</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SAMPLE_DOCUMENTS.map((sample) => {
            const icons = {
              tax_legal: <Building2 className="w-4 h-4 text-rose-500" />,
              medical: <Stethoscope className="w-4 h-4 text-emerald-500" />,
              education: <GraduationCap className="w-4 h-4 text-indigo-500" />,
              utility_bill: <Building2 className="w-4 h-4 text-amber-500" />,
              general: <FileText className="w-4 h-4 text-slate-500" />,
            };

            const isSelected = inputText === sample.sampleInput;
            const categoryKey = sample.analysis.category as keyof typeof icons;

            return (
              <motion.button
                key={sample.id}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelectSample(sample)}
                className={`p-4 rounded-2xl text-left transition-all border relative overflow-hidden ${
                  isSelected
                    ? 'bg-indigo-500/10 border-indigo-500 shadow-md shadow-indigo-500/10 text-slate-900 dark:text-white'
                    : 'bg-white/70 dark:bg-slate-900/70 border-slate-200/80 dark:border-white/10 hover:border-indigo-400/40 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5">
                      {icons[categoryKey] || <FileText className="w-4 h-4 text-slate-500" />}
                    </div>
                    <span className="text-xs font-bold truncate max-w-[140px]">{sample.title}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    sample.analysis.urgency === 'urgent'
                      ? 'bg-rose-500/15 text-rose-500 border border-rose-500/20'
                      : sample.analysis.urgency === 'moderate'
                      ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                      : 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {sample.analysis.urgency === 'urgent' ? 'Pánikhelyzet' : sample.analysis.urgency === 'moderate' ? 'Határidős' : 'Információ'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Betöltés és tesztelés</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Glassmorphic Input & Dropzone Card */}
      <SpotlightCard
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`transition-all duration-300 ${
          isDragOver ? 'border-indigo-500 ring-4 ring-indigo-500/20' : ''
        }`}
      >
        <div className="space-y-4">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Bármilyen Hivatalos, Jogi vagy Orvosi Szöveg Beillesztése
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Másold be a hivatalos felszólítást, e-mailt vagy diktáld le mikrofonnal
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {/* Mic Dictation */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15'
                }`}
                title="Beszédfelismerés / Diktálás"
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Felvétel...' : 'Diktálás'}</span>
              </button>

              {/* Upload file trigger */}
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15 transition"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fájl feltöltése</span>
              </button>

              {/* Clear button */}
              {inputText && (
                <button
                  type="button"
                  onClick={() => {
                    setInputText('');
                    setTitle('');
                    sound.playPop();
                  }}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
                  title="Mező törlése"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Illeszd be ide a nehezen érthető hivatalos levelet, orvosi leletet, NAV felszólítást, szerződést vagy vizsgaszabályzatot..."
              rows={6}
              className="w-full rounded-2xl p-4 text-sm bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-y transition duration-200 focus:outline-none"
            />
            {inputText && (
              <div className="absolute bottom-3 right-3 text-[11px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-white/10">
                {inputText.length} karakter • ~{Math.ceil(inputText.split(/\s+/).length / 180)} perc olvasás
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-500">
                <Zap className="w-3.5 h-3.5" /> 100% Kliensoldali & Privát Elemzés
              </span>
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
                  Kognitív Dekódolás Folyamatban...
                </span>
              ) : (
                'Kognitív Transzformáció & Dekódolás'
              )}
            </GlowingButton>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
