import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Activity, Cpu, ShieldCheck, Database, Layers } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onInitiate: (e: React.MouseEvent | React.TouchEvent) => void;
}

export const Stage1Dashboard: React.FC<Props> = ({ onInitiate }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPressed) return;
    setIsPressed(true);
    audioEngine.playTouch();
    onInitiate(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-10 flex flex-col justify-between items-center w-full h-[calc(100vh-5rem)] px-8 py-6 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Top Banner Area */}
      <div className="flex flex-col items-center text-center space-y-2 mt-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5 animate-pulse text-gold-400" />
          <span>Official Inauguration Portal</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-gold-200 to-slate-100 uppercase">
          {EVENT_CONFIG.organization}
        </h2>

        <h3 className="text-base sm:text-lg font-bold tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">
          {EVENT_CONFIG.subTitle}
        </h3>

        <p className="text-xs sm:text-sm font-medium tracking-widest text-slate-400 uppercase pt-1">
          {EVENT_CONFIG.institution}
        </p>
      </div>

      {/* Main Central Heading & Interactive Command Orb */}
      <div className="flex flex-col items-center text-center max-w-4xl space-y-8 my-auto">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            A NEW CHAPTER IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400">ANALYTICS</span> BEGINS
          </h1>
          <p className="text-sm sm:text-base font-mono tracking-[0.2em] text-gold-400/90 uppercase">
            THE ASI STUDENT CHAPTER IS READY FOR INAUGURATION
          </p>
        </div>

        {/* Large Central CTA Button for Smart Board */}
        <div className="relative group pt-4">
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gold-500/20 via-cyan-500/20 to-gold-500/20 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse" />

          <button
            onClick={handleClick}
            onTouchStart={handleClick}
            disabled={isPressed}
            className="relative flex items-center justify-center space-x-4 px-12 py-7 sm:px-16 sm:py-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-gold-500/60 hover:border-gold-400 text-white shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_55px_rgba(212,175,55,0.45)] transition-all duration-300 active:scale-95 touch-target cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shadow-inner">
              <Play className="w-5 h-5 fill-gold-400 translate-x-0.5" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-gold-300 uppercase">
              INITIATE INAUGURATION
            </span>
          </button>
        </div>

        {/* Touch instruction hint */}
        <p className="text-xs font-mono tracking-widest text-slate-500 uppercase flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Touch screen button to proceed</span>
        </p>
      </div>

      {/* Analytics Telemetry Bar (Bottom Dashboard Elements) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-2">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">System Telemetry</span>
            <span className="text-xs font-bold text-slate-200">ANALYTICS ENGINE ONLINE</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <Database className="w-5 h-5 text-gold-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Institutional Nodes</span>
            <span className="text-xs font-bold text-slate-200">2,026 ACTIVE NODES</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <Layers className="w-5 h-5 text-indigo-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Chapter Status</span>
            <span className="text-xs font-bold text-gold-400">STANDBY FOR INAUGURATION</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Security Access</span>
            <span className="text-xs font-bold text-slate-200">CHIEF GUEST AUTHORIZED</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
