import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MicroAction } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  ListTree, 
  RotateCcw, 
  Play, 
  Pause,
  PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GlowingButton } from '../ui/GlowingButton';
import { sound } from '../../services/sound';

interface LaserStepWizardProps {
  microActions: MicroAction[];
}

export const LaserStepWizard: React.FC<LaserStepWizardProps> = ({ microActions }) => {
  const [steps, setSteps] = useState<MicroAction[]>(microActions);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [expandedSubsteps, setExpandedSubsteps] = useState<Record<number, boolean>>({});
  
  // Micro-focus 2-minute dopamine timer
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setSteps(microActions);
    setCurrentStepIndex(0);
  }, [microActions]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sound.playStepComplete();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const currentStep = steps[currentStepIndex];
  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = steps.length ? Math.round((completedCount / steps.length) * 100) : 0;
  const totalMinutes = steps.reduce((acc, curr) => acc + (curr.estimatedMinutes || 2), 0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
    });
  };

  const handleToggleStepComplete = (index: number) => {
    const updated = [...steps];
    const isCompleted = updated[index].isCompleted;
    updated[index].isCompleted = !isCompleted;
    setSteps(updated);

    if (!isCompleted) {
      sound.playStepComplete();
      triggerConfetti();
      // Auto advance to next incomplete step if available
      const nextIncomplete = updated.findIndex((s, i) => i > index && !s.isCompleted);
      if (nextIncomplete !== -1) {
        setTimeout(() => setCurrentStepIndex(nextIncomplete), 400);
      }
    } else {
      sound.playPop();
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Top HUD / Progress Bar */}
      <div className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Laser-Focus 1-Lépéses Végrehajtó Rendszer
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Anti-Paralysis Mód
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Egyszerre csak 1 feladatra fókuszálj. Nincs túlterhelődés, nincs lebénulás.
            </p>
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {completedCount} / {steps.length} Kész ({progressPercent}%)
            </div>
            <div className="text-[10px] text-slate-400">
              Összidő: ~{totalMinutes} perc
            </div>
          </div>

          <div className="w-28 sm:w-36 bg-slate-100 dark:bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200 dark:border-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Main Focus Card (Active Single Step) */}
      <AnimatePresence mode="wait">
        {currentStep && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          >
            <SpotlightCard className="border-2 border-indigo-500/30 p-6 sm:p-8 space-y-6 shadow-2xl shadow-indigo-500/10">
              {/* Step Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black shadow-md shadow-indigo-500/20">
                    LÉPÉS {currentStepIndex + 1} / {steps.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> ~{currentStep.estimatedMinutes} perc
                  </span>
                </div>

                {/* 2-Min Micro Focus Timer */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {formatTimer(timerSeconds)}
                  </span>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
                    title={isTimerRunning ? 'Szünet' : 'Fókusz Időzítő Indítása'}
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => {
                      sound.playPop();
                      setIsTimerRunning(false);
                      setTimerSeconds(120);
                    }}
                    className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400"
                    title="Időzítő Visszaállítása (2 perc)"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Step Title & Instruction */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleStepComplete(currentStepIndex)}
                    className="mt-1 p-1 rounded-full text-slate-400 hover:text-emerald-500 transition shrink-0"
                    title="Megjelölés készként"
                  >
                    {currentStep.isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-8 h-8 text-slate-300 dark:text-slate-600 hover:text-emerald-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <h2 className={`text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight ${
                      currentStep.isCompleted ? 'line-through opacity-60' : ''
                    }`}>
                      {currentStep.title}
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {currentStep.detailedGuide}
                    </p>
                  </div>
                </div>

                {/* Sub-steps Accordion */}
                {currentStep.substeps && currentStep.substeps.length > 0 && (
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        sound.playPop();
                        setExpandedSubsteps((prev) => ({
                          ...prev,
                          [currentStepIndex]: !prev[currentStepIndex],
                        }));
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mb-2"
                    >
                      <ListTree className="w-3.5 h-3.5" />
                      <span>
                        {expandedSubsteps[currentStepIndex] ? 'Részlépések elrejtése' : `Mikro-bontás megnyitása (${currentStep.substeps.length} részlet)`}
                      </span>
                    </button>

                    <AnimatePresence>
                      {expandedSubsteps[currentStepIndex] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 pl-4 border-l-2 border-indigo-500/30 my-2"
                        >
                          {currentStep.substeps.map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-white/5 text-xs text-slate-700 dark:text-slate-300"
                            >
                              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                              <span className="font-medium">{sub}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Step Navigation & Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  onClick={() => {
                    sound.playPop();
                    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={currentStepIndex === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Előző</span>
                </button>

                {/* Step indicators dots */}
                <div className="flex items-center gap-1.5">
                  {steps.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        sound.playPop();
                        setCurrentStepIndex(idx);
                      }}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === currentStepIndex
                          ? 'w-7 bg-indigo-600'
                          : s.isCompleted
                          ? 'w-2.5 bg-emerald-500'
                          : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                      title={`Lépés ${idx + 1}: ${s.title}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <GlowingButton
                    variant={currentStep.isCompleted ? 'secondary' : 'accent'}
                    size="md"
                    onClick={() => handleToggleStepComplete(currentStepIndex)}
                    icon={currentStep.isCompleted ? <RotateCcw className="w-4 h-4" /> : <PartyPopper className="w-4 h-4" />}
                  >
                    {currentStep.isCompleted ? 'Visszavonás' : 'Kész vagyok vele! 🎉'}
                  </GlowingButton>

                  {currentStepIndex < steps.length - 1 && (
                    <button
                      onClick={() => {
                        sound.playPop();
                        setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-sm"
                    >
                      <span>Következő</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
