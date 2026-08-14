import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize, Minimize, RefreshCw } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';

interface HeaderBarProps {
  onReset: () => void;
  showResetConfirm?: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ onReset }) => {
  const [time, setTime] = useState<string>('');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <header className="relative z-20 w-full h-20 px-8 flex items-center justify-between border-b border-gold-500/20 bg-slate-950/40 backdrop-blur-md">
      {/* Left Logos & Institution Label */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <img
            src={EVENT_CONFIG.logos.asiLogoPath}
            alt="ASI Emblem"
            className="w-11 h-11 object-contain drop-shadow-[0_0_8px_rgba(226,184,87,0.5)]"
          />
          <div className="h-8 w-px bg-gold-500/30" />
          <img
            src={EVENT_CONFIG.logos.collegeLogoPath}
            alt="SSIET Emblem"
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(112,161,255,0.4)]"
          />
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            {EVENT_CONFIG.institution}
          </span>
          <span className="text-[10px] tracking-widest text-gold-400 font-mono">
            INAUGURATION CEREMONY • 2026
          </span>
        </div>
      </div>

      {/* Center: Core Concept Flow Ticker */}
      <div className="hidden lg:flex items-center space-x-3 px-5 py-1.5 rounded-full bg-slate-900/60 border border-gold-500/30 text-xs font-mono tracking-widest">
        {EVENT_CONFIG.conceptFlow.map((concept, idx) => (
          <React.Fragment key={concept}>
            <span
              className={
                idx === EVENT_CONFIG.conceptFlow.length - 1
                  ? 'text-cyan-400 font-bold drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]'
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

      {/* Right Controls: Clock, Sound, Fullscreen, Hidden Organizer Reset */}
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-xs font-mono tracking-widest text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded border border-slate-800">
          {time || '10:00:00 AM'}
        </div>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors touch-target"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-gold-400" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={handleToggleFullscreen}
          title="Toggle Smart Board Fullscreen (F11)"
          className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors touch-target"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5 text-cyan-400" />}
        </button>

        {/* Discreet Organizer Reset Button */}
        <button
          onClick={onReset}
          title="Organizer Reset (Ctrl + Shift + R)"
          className="p-2 rounded-lg text-slate-600 hover:text-slate-400 hover:bg-slate-900/50 transition-colors opacity-50 hover:opacity-100"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
