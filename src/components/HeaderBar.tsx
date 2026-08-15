import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, RefreshCw } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';

interface HeaderBarProps {
  onReset: () => void;
  showResetConfirm?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onReset }) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="relative z-20 w-full h-22 px-8 flex items-center justify-between border-b border-gold-500/20 bg-slate-950/80 backdrop-blur-xl shadow-lg">
      {/* Left side: Crystal Clear Official ASI Logo & Real Official SIET College Emblem */}
      <div className="flex items-center space-x-5">
        {/* ASI Official Logo Badge - High Contrast & 100% Visible */}
        <div className="bg-white/95 px-4 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center justify-center">
          <img
            src={EVENT_CONFIG.logos.asiLogoPath}
            alt="Analytics Society of India Official Logo"
            className="h-9 sm:h-10 w-auto object-contain"
          />
        </div>

        <div className="h-9 w-px bg-gold-500/30" />

        {/* Real Official SIET College Emblem */}
        <div className="flex items-center space-x-3">
          <img
            src={EVENT_CONFIG.logos.collegeLogoPath}
            alt="Sri Shakthi Institute of Engineering and Technology Emblem"
            className="h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(226,184,87,0.5)]"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
              {EVENT_CONFIG.institution}
            </span>
            <span className="text-[10px] tracking-widest text-gold-400 font-mono">
              ASI STUDENT CHAPTER CEREMONY
            </span>
          </div>
        </div>
      </div>

      {/* Center: Core Concept Flow Ticker */}
      <div className="hidden lg:flex items-center space-x-3 px-5 py-2 rounded-full bg-slate-900/90 border border-gold-500/30 text-xs font-mono tracking-widest shadow-inner">
        {EVENT_CONFIG.conceptFlow.map((concept, idx) => (
          <React.Fragment key={concept}>
            <span
              className={
                idx === EVENT_CONFIG.conceptFlow.length - 1
                  ? 'text-asi-red font-bold drop-shadow-[0_0_8px_rgba(229,35,42,0.8)]'
                  : 'text-slate-300'
              }
            >
              {concept}
            </span>
            {idx < EVENT_CONFIG.conceptFlow.length - 1 && (
              <span className="text-gold-500/60">→</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right Controls: Sound, Fullscreen, Hidden Reset */}
      <div className="flex items-center space-x-4">

        {/* Audio Toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors touch-target cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-gold-400" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          title="Toggle Smart Board Fullscreen (F11)"
          className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors touch-target cursor-pointer"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5 text-gold-400" />}
        </button>

        {/* Discreet Organizer Reset Button */}
        <button
          onClick={onReset}
          title="Organizer Reset (Ctrl + Shift + R)"
          className="p-2 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-slate-900/50 transition-colors opacity-50 hover:opacity-100 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
