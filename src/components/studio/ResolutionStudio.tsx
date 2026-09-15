import React, { useState } from 'react';
import type { CognitiveAnalysis, ReplyTemplate } from '../../types';
import { Mail, Calendar, Copy, Check, Printer, Sparkles } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GlowingButton } from '../ui/GlowingButton';
import { sound } from '../../services/sound';

interface ResolutionStudioProps {
  analysis: CognitiveAnalysis;
}

export const ResolutionStudio: React.FC<ResolutionStudioProps> = ({ analysis }) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customizedBody, setCustomizedBody] = useState('');
  const [copied, setCopied] = useState(false);

  const templates: ReplyTemplate[] = analysis.replyTemplates?.length
    ? analysis.replyTemplates
    : [
        {
          id: 'delay_request',
          label: 'Fizetési halasztási kérelem',
          tone: 'formal',
          subject: `Fizetési halasztási kérelem - ${analysis.documentTitle}`,
          body: `Tisztelt Hatóság / Illetékes Osztály!\n\nHivatkozva a(z) ${analysis.documentTitle} tárgyú értesítésükre, tisztelettel kérem a határidő 30 nappal történő meghosszabbítását vagy részletfizetés engedélyezését váratlan kiadásaim miatt.\n\nKöszönettel,\n[Az Ön Neve]\n[Elérhetőség]`,
        },
        {
          id: 'confirmation',
          label: 'Teljesítés és igazolás megküldése',
          tone: 'polite',
          subject: `Befizetés / Teendő igazolása - ${analysis.documentTitle}`,
          body: `Tisztelt Ügyintéző!\n\nTájékoztatom Önöket, hogy a(z) ${analysis.documentTitle} dokumentumban foglalt kötelezettségemnek eleget tettem. Csatoltan megküldöm az átutalási bizonylatot.\n\nKérem szíves visszaigazolásukat.\n\nÜdvözlettel,\n[Az Ön Neve]`,
        },
      ];

  const currentTemplate = templates[selectedTemplateIndex] || templates[0];
  const activeBody = customizedBody || currentTemplate?.body || '';

  const deadlineEntity = analysis.keyEntities?.find((e) => e.type === 'deadline');

  const handleCopyText = () => {
    sound.playPop();
    navigator.clipboard.writeText(`Tárgy: ${currentTemplate?.subject}\n\n${activeBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadIcs = () => {
    sound.playPop();
    const deadlineStr = deadlineEntity?.value || 'Közelgő határidő';
    const summary = `CogniBridge Határidő: ${analysis.documentTitle}`;
    const description = `Teendő: ${analysis.tenWordSummary}\\n\\nHivatalos határidő: ${deadlineStr}`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CogniBridge//Cognitive OS v2.0//HU',
      'BEGIN:VEVENT',
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'DESCRIPTION:CogniBridge Emlékeztető: 3 nap a határidőig!',
      'ACTION:DISPLAY',
      'END:VALARM',
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'DESCRIPTION:CogniBridge Sürgős Riasztás: 1 nap maradt!',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `hatarido-${analysis.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Card */}
      <div className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Resolution Studio • 1-Kattintásos Hivatalos Válasz & Naptár
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Válaszlevél-sablonok előre megfogalmazva + Intelligens naptári riasztások (.ics)
            </p>
          </div>
        </div>

        {/* Smart Calendar Sync Button */}
        {deadlineEntity && (
          <GlowingButton
            variant="accent"
            size="sm"
            onClick={handleDownloadIcs}
            icon={<Calendar className="w-4 h-4" />}
          >
            Naptárba Mentés (.ICS)
          </GlowingButton>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selector List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Válasz Sablonok
          </div>

          <div className="space-y-2">
            {templates.map((tpl, idx) => {
              const isSelected = selectedTemplateIndex === idx;

              return (
                <button
                  key={tpl.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedTemplateIndex(idx);
                    setCustomizedBody(tpl.body);
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all border flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20 font-bold'
                      : 'bg-white/70 dark:bg-slate-900/70 border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold truncate">{tpl.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                    }`}>
                      {tpl.tone}
                    </span>
                  </div>
                  <p className={`text-[11px] truncate font-normal ${
                    isSelected ? 'text-indigo-100' : 'text-slate-400'
                  }`}>
                    {tpl.subject}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor & Preview Area */}
        <SpotlightCard className="lg:col-span-2 space-y-4">
          <div className="space-y-2 border-b border-slate-100 dark:border-white/10 pb-3">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Levél Tárgya:
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200 dark:border-white/10">
              {currentTemplate?.subject}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Szerkeszthető Levél Szöveg:
              </span>
              <span className="text-[10px] text-slate-400">
                Egyszerűen egészítsd ki a saját adataiddal
              </span>
            </div>

            <textarea
              value={activeBody}
              onChange={(e) => setCustomizedBody(e.target.value)}
              rows={9}
              className="w-full rounded-2xl p-4 text-xs sm:text-sm font-sans bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100 resize-y focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Készen áll a kiküldésre</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition"
                title="Nyomtatás"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Nyomtatás</span>
              </button>

              <GlowingButton
                variant={copied ? 'accent' : 'primary'}
                size="md"
                onClick={handleCopyText}
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              >
                {copied ? 'Levél Másolva a Vágólapra!' : 'Teljes Levél Másolása'}
              </GlowingButton>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};
