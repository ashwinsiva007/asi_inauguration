import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onComplete: () => void;
}

export const Stage3Countdown: React.FC<Props> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    // Play sound for initial 3
    audioEngine.playCountdownTick(3);

    const timer2 = setTimeout(() => {
      setCount(2);
      audioEngine.playCountdownTick(2);
    }, 850);

    const timer1 = setTimeout(() => {
      setCount(1);
      audioEngine.playCountdownTick(1);
    }, 1700);

    const timerFinish = setTimeout(() => {
      onComplete();
    }, 2550);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer1);
      clearTimeout(timerFinish);
    };
  }, [onComplete]);

  return (
    <div className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5rem)] px-8 select-none overflow-hidden">
      {/* Expanding Golden Ceremonial Ring */}
      <div className="absolute w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full border border-gold-500/30 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-cyan-400/40 animate-pulse pointer-events-none" />

      {/* Stage Title */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs sm:text-sm font-mono tracking-[0.4em] text-gold-400 uppercase mb-8"
      >
        INITIATING OFFICIAL CHAPTER LAUNCH
      </motion.p>

      {/* Animated 3 - 2 - 1 Digit Display */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={{ scale: 2.2, opacity: 0, filter: 'blur(15px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <span className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-200 to-gold-500 drop-shadow-[0_0_60px_rgba(226,184,87,0.8)] font-sans">
              {count}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Data Stream Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 flex flex-col items-center space-y-2"
      >
        <div className="flex space-x-2">
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${count <= 3 ? 'bg-gold-400 shadow-[0_0_10px_#E2B857]' : 'bg-slate-800'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${count <= 2 ? 'bg-gold-400 shadow-[0_0_10px_#E2B857]' : 'bg-slate-800'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${count <= 1 ? 'bg-cyan-400 shadow-[0_0_10px_#00F0FF]' : 'bg-slate-800'}`} />
        </div>
        <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          SYNCHRONIZING ANALYTICS NODES...
        </p>
      </motion.div>
    </div>
  );
};
