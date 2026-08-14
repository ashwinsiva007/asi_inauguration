import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';
import { Sparkles, Calendar, MapPin } from 'lucide-react';

export const Stage4Reveal: React.FC = () => {
  useEffect(() => {
    // Play grand ceremonial reveal sound
    audioEngine.playReveal();

    // Fire dignified gold & ASI red particle shimmer
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#E5232A', '#E2B857', '#D4AF37', '#FFFFFF'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#E5232A', '#E2B857', '#D4AF37', '#FFFFFF'],
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5.5rem)] px-6 py-4 max-w-6xl mx-auto select-none"
    >
      {/* Ceremonial Institutional Certificate Frame */}
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        className="relative w-full max-w-4xl p-8 sm:p-12 rounded-3xl bg-slate-950/90 border-2 border-gold-500/60 backdrop-blur-2xl shadow-[0_0_90px_rgba(212,175,55,0.25)] flex flex-col items-center text-center overflow-hidden"
      >
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-gold-400" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-gold-400" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-gold-400" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-gold-400" />

        {/* Official ASI Student Chapter Emblem Patch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <img
            src={EVENT_CONFIG.logos.asiStudentChapterEmblemPath || EVENT_CONFIG.logos.collegeLogoPath}
            alt="ASI Student Chapter Official Emblem"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 object-contain drop-shadow-[0_0_40px_rgba(226,184,87,0.9)] hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Organization & Chapter Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-1"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-gold-200 to-slate-100 uppercase">
            {EVENT_CONFIG.organization}
          </h2>

          <h3 className="text-sm sm:text-base font-mono tracking-[0.35em] text-asi-red uppercase font-bold drop-shadow-[0_0_8px_rgba(229,35,42,0.5)]">
            {EVENT_CONFIG.subTitle}
          </h3>
        </motion.div>

        {/* Main Official Status Stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="my-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-asi-red/20 via-gold-400/30 to-asi-red/20 border-2 border-gold-400 shadow-[0_0_35px_rgba(226,184,87,0.4)]"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.3em] text-gold-300 uppercase drop-shadow-[0_0_15px_rgba(226,184,87,0.8)]">
            OFFICIALLY INAUGURATED
          </h1>
        </motion.div>

        {/* Dignitary & Institution Details */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="space-y-2 max-w-2xl"
        >
          <p className="text-xs font-mono tracking-[0.3em] text-slate-400 uppercase">
            by
          </p>

          <h4 className="text-3xl sm:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-gold-200">
            {EVENT_CONFIG.chiefGuest.name}
          </h4>

          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-slate-200 tracking-wider pt-1">
            <MapPin className="w-4 h-4 text-asi-red" />
            <span>{EVENT_CONFIG.institution}</span>
          </div>

          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-gold-400 tracking-widest pt-1">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>{EVENT_CONFIG.eventDate}</span>
          </div>
        </motion.div>

        <div className="w-48 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-6" />

        {/* Final Motto Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex items-center space-x-3 text-asi-red text-sm sm:text-base font-mono font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_8px_rgba(229,35,42,0.6)]"
        >
          <Sparkles className="w-4 h-4 text-asi-red animate-pulse" />
          <span>THE JOURNEY BEGINS.</span>
          <Sparkles className="w-4 h-4 text-asi-red animate-pulse" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
