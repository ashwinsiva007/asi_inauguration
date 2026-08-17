import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Fingerprint } from 'lucide-react';
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
      {/* Main Announcement */}
      <h2 className="text-2xl sm:text-3xl font-black tracking-[0.3em] text-slate-100 uppercase mb-4 drop-shadow-md">
        THE MOMENT HAS ARRIVED
      </h2>

      {/* Welcome Chief Guest Card */}
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
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold-400 via-asi-red to-gold-400 opacity-80 blur-md group-hover:opacity-100 transition duration-500" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-gold-400 p-1 bg-slate-900 shadow-[0_0_30px_rgba(212,175,55,0.6)] overflow-hidden">
                <img
                  src={EVENT_CONFIG.chiefGuest.photoPath}
                  alt={EVENT_CONFIG.chiefGuest.name}
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>
            </div>
          )}

          {/* Dignitary Details */}
          <div className="space-y-4 flex-1">
            <p className="text-xs sm:text-sm font-mono tracking-[0.32em] text-[#FF5252] font-black uppercase drop-shadow-[0_0_10px_rgba(255,82,82,0.3)]">
              {EVENT_CONFIG.chiefGuest.title}
            </p>

            {/* Guest Name: 100% Solid Bright Gold & Crystal Clear Visibility */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gold-300 tracking-wide drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]">
              {EVENT_CONFIG.chiefGuest.name}
            </h1>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-2" />

            {/* Dr. Dinesh Kumar Designations Summary */}
            <div className="space-y-2 text-slate-200 tracking-wide leading-snug">
              <p className="text-[#FF5252] font-bold text-sm sm:text-base drop-shadow-[0_0_8px_rgba(255,82,82,0.25)]">
                President of Analytics Society of India
              </p>
              <p className="text-gold-300 font-bold text-sm sm:text-base pt-0.5">
                Chairperson, Data Centre and Analytics Lab (DCAL)
              </p>
              <p className="text-slate-300 font-normal text-xs sm:text-sm">
                Indian Institute of Management Bangalore
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Ceremonial Touch Button [ INAUGURATE NOW ] */}
      <div className="relative group mt-5">
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
    </motion.div>
  );
};
