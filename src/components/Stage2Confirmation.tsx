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
      className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5.5rem)] px-8 py-4 max-w-5xl mx-auto text-center select-none"
    >
      {/* Formal Header Badge */}
      <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-gold-500/15 border border-gold-400/40 text-gold-300 text-xs font-mono tracking-[0.3em] uppercase mb-2 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
        <Award className="w-4 h-4 text-gold-400" />
        <span>OFFICIAL CEREMONIAL PROTOCOL</span>
      </div>

      {/* Main Announcement */}
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-[0.3em] text-slate-200 uppercase mb-3">
        THE MOMENT HAS ARRIVED
      </h2>

      {/* Welcome Chief Guest Invitation Card */}
      <div className="my-2 p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-gold-500/40 backdrop-blur-xl shadow-2xl max-w-3xl w-full relative overflow-hidden">
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-400" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          {/* Chief Guest Portrait Frame */}
          {EVENT_CONFIG.chiefGuest.photoPath && (
            <div className="relative group shrink-0">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold-400 via-asi-red to-gold-400 opacity-75 blur-md group-hover:opacity-100 transition duration-500" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-gold-400 p-1 bg-slate-900 shadow-[0_0_30px_rgba(212,175,55,0.6)] overflow-hidden">
                <img
                  src={EVENT_CONFIG.chiefGuest.photoPath}
                  alt={EVENT_CONFIG.chiefGuest.name}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
          )}

          {/* Dignitary Info */}
          <div className="space-y-2.5 flex-1">
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-asi-red font-bold uppercase">
              {EVENT_CONFIG.chiefGuest.title}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-white to-gold-400 drop-shadow-[0_0_20px_rgba(226,184,87,0.4)]">
              {EVENT_CONFIG.chiefGuest.name}
            </h1>

            <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-400">
              {EVENT_CONFIG.chiefGuest.designation}
            </p>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-2" />

            <p className="text-xs sm:text-sm font-light tracking-wide text-slate-200 leading-relaxed">
              You are invited to officially inaugurate the{' '}
              <span className="font-bold text-gold-300">
                Analytics Society of India Student Chapter
              </span>{' '}
              at Sri Shakthi Institute of Engineering and Technology.
            </p>
          </div>
        </div>
      </div>

      {/* Main Ceremonial Touch Button [ INAUGURATE NOW ] */}
      <div className="relative group mt-4">
        {/* Animated Radial Pulse Rings */}
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-gold-400 via-amber-300 to-gold-400 blur-2xl opacity-90 animate-pulse" />

        <button
          onClick={handleClick}
          onTouchStart={handleClick}
          disabled={isPressed}
          className="relative flex items-center justify-center space-x-4 px-16 py-7 sm:px-24 sm:py-8 rounded-2xl bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400 text-slate-950 font-black border-2 border-white shadow-[0_0_60px_rgba(226,184,87,0.9)] hover:shadow-[0_0_90px_rgba(255,215,0,1)] transition-all duration-300 active:scale-95 cursor-pointer touch-target"
        >
          <Fingerprint className="w-8 h-8 text-slate-950 animate-bounce" />
          <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-slate-950 uppercase">
            INAUGURATE NOW
          </span>
          <Sparkles className="w-7 h-7 text-slate-950" />
        </button>
      </div>

      <p className="text-xs font-mono tracking-[0.2em] text-gold-400 uppercase mt-4 flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
        <span>Chief Guest Touch Interaction Required</span>
      </p>
    </motion.div>
  );
};
