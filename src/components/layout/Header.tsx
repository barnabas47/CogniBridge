import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Key, Activity, ShieldCheck, Heart, Code2 } from 'lucide-react';
import { GlowingButton } from '../ui/GlowingButton';

interface HeaderProps {
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApiKeyModal,
  hasApiKey,
}) => {
  return (
    <header className="sticky top-4 z-40 w-full px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-center justify-between px-4 sm:px-6 py-3 rounded-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-indigo-500/10"
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-md shadow-indigo-500/30 text-white font-black text-lg">
            <span>CB</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-slate-300 bg-clip-text text-transparent">
                CogniBridge
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                v2.0 OS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Kognitív Akadálymentesítő & Végrehajtó Funkció Rendszer
            </p>
          </div>
        </div>

        {/* Center Live Badges */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> WCAG 2.2 AAA
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5" /> Gemini 2.5 Flash Ready
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-semibold">
            <Heart className="w-3.5 h-3.5" /> Code for Humanity
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* GitHub Repo link */}
          <a
            href="https://github.com/barnabas47/CogniBridge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition"
            title="GitHub Repository"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          {/* API Key Modal Button */}
          <GlowingButton
            variant={hasApiKey ? 'secondary' : 'primary'}
            size="sm"
            onClick={onOpenApiKeyModal}
            icon={hasApiKey ? <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> : <Key className="w-3.5 h-3.5" />}
          >
            <span className="hidden sm:inline">
              {hasApiKey ? 'Gemini Aktív' : 'API Kulcs'}
            </span>
            <span className="sm:hidden">
              {hasApiKey ? 'AI ON' : 'Kulcs'}
            </span>
          </GlowingButton>
        </div>
      </motion.div>
    </header>
  );
};
