import React, { useState } from 'react';
import type { CognitiveAnalysis, ReplyTemplate } from '../../types';
import { Mail, Calendar, Copy, Check, Printer } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GlowingButton } from '../ui/GlowingButton';

interface ResolutionStudioProps {
  analysis: CognitiveAnalysis;
}

export const ResolutionStudio: React.FC<ResolutionStudioProps> = ({ analysis }) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customizedBody, setCustomizedBody] = useState('');
  const [copied, setCopied] = useState(false);

  const templates = analysis.replyTemplates || [];
  const currentTemplate: ReplyTemplate | undefined = templates[selectedTemplateIndex];

  React.useEffect(() => {
    if (currentTemplate) {
      setCustomizedBody(currentTemplate.body);
    }
  }, [selectedTemplateIndex, currentTemplate]);

  const handleCopy = () => {
    if (!currentTemplate) return;
    const fullText = `Tárgy: ${currentTemplate.subject}\n\n${customizedBody}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadIcs = () => {
    const now = new Date();
    const eventDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const dateStr = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CogniBridge//Executive Function Calendar//HU',
      'BEGIN:VEVENT',
      `SUMMARY:CogniBridge Határidő: ${analysis.documentTitle}`,
      `DESCRIPTION:${analysis.tenWordSummary}\n\nTeendők száma: ${analysis.microActions.length}`,
      `DTSTART:${dateStr}`,
      `DTEND:${dateStr}`,
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'ACTION:DISPLAY',
      'DESCRIPTION:CogniBridge 3 napos figyelmeztetés',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:CogniBridge 1 napos sürgős figyelmeztetés',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `cognibridge-hatarido-${Date.now()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <SpotlightCard className="p-6 sm:p-8 mb-6 shadow-xl border-white/40 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border-color)]">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500" />
            Resolution Studio — Hivatalos Válasz & Naptár Export
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Egy kattintással szerkeszthető hivatalos válaszlevél és letölthető határidő figyelmeztetés (.ics).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadIcs}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-bold shadow-xs transition-all cursor-pointer"
            title="Naptáresemény mentése 3 napos és 1 napos riasztással"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Naptár Export (.ics)</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--accent-light)] text-[var(--text-muted)] cursor-pointer"
            title="Nyomtatás"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {templates.length > 0 && currentTemplate ? (
        <div>
          {/* Tone Selector Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {templates.map((tpl, index) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplateIndex(index)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTemplateIndex === index
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-light)] text-[var(--text-secondary)] border border-[var(--border-color)]'
                }`}
              >
                {tpl.label} ({tpl.tone})
              </button>
            ))}
          </div>

          {/* Email Subject */}
          <div className="mb-3.5">
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 uppercase tracking-tight">
              Levél Tárgya:
            </label>
            <div className="p-3 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs sm:text-sm font-bold text-[var(--text-primary)]">
              {currentTemplate.subject}
            </div>
          </div>

          {/* Editable Body */}
          <div className="mb-4">
            <label className="text-xs font-bold text-[var(--text-muted)] block mb-1 uppercase tracking-tight">
              Levél Szövege (Szerkeszthető és küldésre kész):
            </label>
            <textarea
              value={customizedBody}
              onChange={(e) => setCustomizedBody(e.target.value)}
              rows={7}
              className="w-full p-4 rounded-3xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/60 resize-none leading-relaxed"
            />
          </div>

          {/* Copy Button */}
          <div className="flex items-center justify-end">
            <GlowingButton onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Kimásolva a Vágólapra!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Válaszlevél Másolása</span>
                </>
              )}
            </GlowingButton>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 text-xs text-[var(--text-muted)]">
          Nincs elérhető sablon ehhez a dokumentumhoz.
        </div>
      )}
    </SpotlightCard>
  );
};
