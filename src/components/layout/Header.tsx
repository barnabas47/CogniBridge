import React from 'react';
import { Sparkles, Key, Code2, ShieldCheck, Heart } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* Brand Logo & Name (Apple SF Pro Style) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0071e3] via-[#a259ff] to-[#ff3b30] flex items-center justify-center p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#2997ff] to-[#a259ff] animate-pulse" />
              </div>
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#f5f5f7]">
              CogniBridge
            </span>
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white/[0.08] text-[#86868b] border border-white/[0.06]">
              v1.2.1
            </span>
          </div>
        </div>

        {/* Center Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-normal text-[#86868b]">
          <span className="flex items-center gap-1 text-[#30d158]">
            <ShieldCheck className="w-3.5 h-3.5" /> WCAG 2.2 AAA
          </span>
          <span className="flex items-center gap-1 text-[#f5f5f7]">
            <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" /> Gemini 2.5 Flash
          </span>
          <span className="flex items-center gap-1 text-[#ff453a]">
            <Heart className="w-3.5 h-3.5" /> Code for Humanity
          </span>
        </nav>

        {/* Right Actions (Apple Pill Buttons) */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/barnabas47/CogniBridge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal text-[#86868b] hover:text-[#f5f5f7] bg-white/[0.06] hover:bg-white/[0.12] transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <GlowingButton
            variant={hasApiKey ? 'secondary' : 'primary'}
            size="sm"
            onClick={onOpenApiKeyModal}
            icon={hasApiKey ? <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" /> : <Key className="w-3.5 h-3.5" />}
          >
            <span>{hasApiKey ? 'Gemini AI Aktív' : 'API Kulcs'}</span>
          </GlowingButton>
        </div>
      </div>
    </header>
  );
};
