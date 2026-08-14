import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Landmark, Building2, UserCheck, Calendar } from 'lucide-react';
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
      className="relative z-10 flex flex-col justify-between items-center w-full h-[calc(100vh-5.5rem)] px-8 py-6 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Top Banner Area with Official ASI Logo & Institutional Badging */}
      <div className="flex flex-col items-center text-center space-y-3 mt-1">
        {/* Official ASI Brand Badge */}
        <div className="bg-white/95 px-6 py-2.5 rounded-2xl border-2 border-gold-500/40 shadow-[0_0_25px_rgba(229,35,42,0.15)] flex items-center justify-center">
          <img
            src={EVENT_CONFIG.logos.asiLogoPath}
            alt="Analytics Society of India Official Logo"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-mono tracking-[0.3em] text-asi-red font-bold uppercase drop-shadow-[0_0_8px_rgba(229,35,42,0.5)]">
            {EVENT_CONFIG.subTitle}
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase">
            {EVENT_CONFIG.institution}
          </p>
        </div>
      </div>

      {/* Main Central Heading & Interactive Command Orb */}
      <div className="flex flex-col items-center text-center max-w-4xl space-y-8 my-auto">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-lg">
            A NEW CHAPTER IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-asi-red to-gold-400">ANALYTICS</span> BEGINS
          </h1>
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-gold-400 uppercase">
            THE ASI STUDENT CHAPTER IS READY FOR INAUGURATION
          </p>
        </div>

        {/* Large Central CTA Button for Smart Board */}
        <div className="relative group pt-2">
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-asi-red/30 via-gold-500/30 to-asi-red/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />

          <button
            onClick={handleClick}
            onTouchStart={handleClick}
            disabled={isPressed}
            className="relative flex items-center justify-center space-x-5 px-12 py-7 sm:px-16 sm:py-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-gold-500/70 hover:border-asi-red text-white shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_55px_rgba(229,35,42,0.45)] transition-all duration-300 active:scale-95 touch-target cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-asi-red/20 border border-asi-red/50 flex items-center justify-center text-asi-red shadow-inner">
              <Play className="w-6 h-6 fill-asi-red translate-x-0.5" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-[0.25em] text-gold-300 uppercase">
              INITIATE INAUGURATION
            </span>
          </button>
        </div>

        {/* Touch instruction hint */}
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-asi-red animate-ping" />
          <span>Touch screen button to proceed</span>
        </p>
      </div>

      {/* Institutional Metadata Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mb-2">
        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <Landmark className="w-5 h-5 text-asi-red" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Parent Organization</span>
            <span className="text-xs font-bold text-slate-200">ANALYTICS SOCIETY OF INDIA</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <Building2 className="w-5 h-5 text-gold-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Host Institution</span>
            <span className="text-xs font-bold text-slate-200">SRI SHAKTHI INST. OF ENGG & TECH</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <UserCheck className="w-5 h-5 text-emerald-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Chief Guest</span>
            <span className="text-xs font-bold text-gold-300">DR. DINESH KUMAR</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">Event Date</span>
            <span className="text-xs font-bold text-slate-200">24 AUGUST 2026</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
