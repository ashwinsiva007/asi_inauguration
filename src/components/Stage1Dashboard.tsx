import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
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
      className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5.5rem)] px-8 py-6 max-w-6xl mx-auto text-center select-none"
    >
      {/* Top Formal Institutional Titles */}
      <div className="flex flex-col items-center text-center space-y-2 mb-8">
        <h3 className="text-xs sm:text-sm font-semibold tracking-[0.3em] text-slate-300 uppercase">
          {EVENT_CONFIG.institution}
        </h3>

        <h2 className="text-lg sm:text-xl font-bold tracking-[0.3em] text-asi-red uppercase drop-shadow-[0_0_10px_rgba(229,35,42,0.5)]">
          {EVENT_CONFIG.organization} • {EVENT_CONFIG.subTitle}
        </h2>
      </div>

      {/* Main Central Heading & Interactive Command Orb */}
      <div className="flex flex-col items-center text-center max-w-4xl space-y-10 my-auto">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight drop-shadow-2xl">
            A NEW CHAPTER IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-asi-red to-gold-400">ANALYTICS</span> BEGINS
          </h1>
          <p className="text-sm sm:text-base font-mono tracking-[0.25em] text-gold-400 uppercase">
            THE ASI STUDENT CHAPTER IS READY FOR INAUGURATION
          </p>
        </div>

        {/* Large Central CTA Button for Smart Board */}
        <div className="relative group pt-4">
          {/* Glowing Aura Rings */}
          <div className="absolute -inset-5 rounded-3xl bg-gradient-to-r from-asi-red/40 via-gold-500/40 to-asi-red/40 blur-2xl opacity-80 group-hover:opacity-100 transition duration-1000 animate-pulse" />

          <button
            onClick={handleClick}
            onTouchStart={handleClick}
            disabled={isPressed}
            className="relative flex items-center justify-center space-x-5 px-14 py-8 sm:px-20 sm:py-9 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-gold-400 text-white shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_65px_rgba(229,35,42,0.6)] transition-all duration-300 active:scale-95 touch-target cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-asi-red/20 border border-asi-red/60 flex items-center justify-center text-asi-red shadow-inner">
              <Play className="w-6 h-6 fill-asi-red translate-x-0.5" />
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-gold-300 uppercase">
              INITIATE INAUGURATION
            </span>
          </button>
        </div>

        {/* Touch instruction hint */}
        <p className="text-xs font-mono tracking-widest text-slate-400 uppercase flex items-center space-x-2 pt-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-asi-red animate-ping" />
          <span>Touch screen button to proceed</span>
        </p>
      </div>
    </motion.div>
  );
};
