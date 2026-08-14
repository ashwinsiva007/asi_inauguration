import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Fingerprint } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onConfirm: (e: React.MouseEvent | React.TouchEvent) => void;
}

export const Stage2Confirmation: React.FC<Props> = ({ onConfirm }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPressed) return;
    setIsPressed(true);
    audioEngine.playConfirmation();
    onConfirm(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5rem)] px-8 py-6 max-w-5xl mx-auto text-center select-none"
    >
      {/* Formal Header Badge */}
      <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-mono tracking-[0.3em] uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <Award className="w-4 h-4 text-gold-400" />
        <span>CEREMONIAL PROTOCOL READY</span>
      </div>

      {/* Main Moment Announcement */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[0.3em] text-slate-300 uppercase mb-2">
        THE MOMENT HAS ARRIVED
      </h2>

      {/* Welcome Chief Guest Block */}
      <div className="my-6 p-8 rounded-3xl bg-slate-900/70 border border-gold-500/30 backdrop-blur-xl shadow-2xl max-w-3xl w-full relative overflow-hidden">
        {/* Subtle decorative golden corner lines */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-400" />

        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-cyan-400 uppercase font-semibold">
            {EVENT_CONFIG.chiefGuest.title}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-amber-100 to-gold-400 drop-shadow-[0_0_20px_rgba(226,184,87,0.4)]">
            {EVENT_CONFIG.chiefGuest.name}
          </h1>

          <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400">
            {EVENT_CONFIG.chiefGuest.designation}
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent mx-auto my-4" />

          <p className="text-sm sm:text-base font-light tracking-wide text-slate-200 leading-relaxed max-w-xl mx-auto">
            You are invited to officially inaugurate the{' '}
            <span className="font-semibold text-gold-300">
              Analytics Society of India Student Chapter
            </span>{' '}
            at Sri Shakthi Institute of Engineering and Technology.
          </p>
        </div>
      </div>

      {/* Main Ceremonial Touch Button [ INAUGURATE NOW ] */}
      <div className="relative group mt-4">
        {/* Animated Radial Pulse Rings */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-amber-500/30 via-gold-400/40 to-amber-500/30 blur-2xl opacity-80 animate-pulse" />

        <button
          onClick={handleClick}
          onTouchStart={handleClick}
          disabled={isPressed}
          className="relative flex items-center justify-center space-x-4 px-14 py-8 sm:px-20 sm:py-9 rounded-2xl bg-gradient-to-r from-amber-600 via-gold-500 to-amber-600 text-slate-950 font-black border-2 border-gold-200 shadow-[0_0_50px_rgba(226,184,87,0.6)] hover:shadow-[0_0_80px_rgba(226,184,87,0.9)] transition-all duration-300 active:scale-95 cursor-pointer touch-target"
        >
          <Fingerprint className="w-8 h-8 text-slate-950 animate-bounce" />
          <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] uppercase">
            INAUGURATE NOW
          </span>
          <Sparkles className="w-7 h-7 text-slate-950" />
        </button>
      </div>

      <p className="text-xs font-mono tracking-[0.2em] text-gold-400/80 uppercase mt-6 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
        <span>Chief Guest Touch Interaction Required</span>
      </p>
    </motion.div>
  );
};
