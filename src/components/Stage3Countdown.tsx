import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onComplete: () => void;
}

export const Stage3Countdown: React.FC<Props> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
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
    <div className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5.5rem)] px-8 select-none overflow-hidden">
      {/* Expanding Ceremonial Gold & Crimson Aura Rings */}
      <div className="absolute w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] rounded-full border border-asi-red/40 animate-ping opacity-30 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] sm:w-[390px] sm:h-[390px] rounded-full border-2 border-cyan-400/50 animate-pulse pointer-events-none" />

      {/* Stage Title */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs sm:text-sm font-mono tracking-[0.4em] text-cyan-400 uppercase mb-8"
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
            <span className="text-8xl sm:text-9xl md:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-200 to-asi-red drop-shadow-[0_0_60px_rgba(6,182,212,0.85)] font-sans">
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
        <div className="flex space-x-2.5">
          <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${count <= 3 ? 'bg-[#E5232A] shadow-[0_0_10px_#E5232A]' : 'bg-slate-800'}`} />
          <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${count <= 2 ? 'bg-[#E2B857] shadow-[0_0_10px_#E2B857]' : 'bg-slate-800'}`} />
          <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${count <= 1 ? 'bg-[#10B981] shadow-[0_0_10px_#10B981]' : 'bg-slate-800'}`} />
        </div>
        <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          SYNCHRONIZING INAUGURAL CEREMONY...
        </p>
      </motion.div>
    </div>
  );
};
