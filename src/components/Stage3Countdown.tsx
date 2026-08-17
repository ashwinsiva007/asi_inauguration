import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onComplete: () => void;
}

const STEP_THEME = {
  3: {
    color: '#E5232A',
    colorRgb: '229,35,42',
    label: 'PREPARING',
    gradient: 'from-red-200 via-red-400 to-[#E5232A]',
  },
  2: {
    color: '#E2B857',
    colorRgb: '226,184,87',
    label: 'ALIGNING',
    gradient: 'from-yellow-100 via-amber-300 to-[#E2B857]',
  },
  1: {
    color: '#10B981',
    colorRgb: '16,185,129',
    label: 'LAUNCHING',
    gradient: 'from-emerald-100 via-emerald-300 to-emerald-500',
  },
} as const;

export const Stage3Countdown: React.FC<Props> = ({ onComplete }) => {
  const [count, setCount] = useState<3 | 2 | 1>(3);

  useEffect(() => {
    audioEngine.playCountdownTick(3);

    const timer2 = setTimeout(() => {
      setCount(2);
      audioEngine.playCountdownTick(2);
    }, 1600);

    const timer1 = setTimeout(() => {
      setCount(1);
      audioEngine.playCountdownTick(1);
    }, 3200);

    const timerFinish = setTimeout(() => {
      onComplete();
    }, 4600);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer1);
      clearTimeout(timerFinish);
    };
  }, [onComplete]);

  const theme = STEP_THEME[count];

  return (
    <div className="relative z-10 flex flex-col justify-center items-center w-full h-[calc(100vh-5.5rem)] px-8 select-none overflow-hidden">

      {/* Slow ambient ring 1 */}
      <motion.div
        key={`ambient-${count}`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.25, scale: 1.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute w-[480px] h-[480px] rounded-full border pointer-events-none"
        style={{ borderColor: theme.color }}
      />
      {/* Slow ambient ring 2 */}
      <motion.div
        key={`ambient2-${count}`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.15, scale: 1.05 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        className="absolute w-[340px] h-[340px] rounded-full border-2 pointer-events-none"
        style={{ borderColor: theme.color }}
      />

      {/* Single shockwave ring per count change */}
      <AnimatePresence>
        <motion.div
          key={`shock-${count}`}
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="absolute w-40 h-40 rounded-full border-2 pointer-events-none"
          style={{ borderColor: theme.color }}
        />
      </AnimatePresence>

      {/* Radial glow — simple, no blur */}
      <motion.div
        key={`glow-${count}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 45% 45% at 50% 50%, rgba(${theme.colorRgb},0.18) 0%, transparent 70%)`,
        }}
      />

      {/* Step label */}
      <motion.p
        key={`label-${count}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="font-mono text-xs sm:text-sm tracking-[0.5em] uppercase mb-10"
        style={{ color: theme.color }}
      >
        {theme.label}
      </motion.p>

      {/* Number */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.6, y: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center justify-center"
          >
            <span
              className={`text-[9rem] sm:text-[12rem] md:text-[15rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b ${theme.gradient} font-sans`}
              style={{
                WebkitTextStroke: `1px rgba(${theme.colorRgb}, 0.3)`,
              }}
            >
              {count}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        {/* Dot track */}
        <div className="flex items-center gap-3">
          {([3, 2, 1] as const).map((n, i) => (
            <React.Fragment key={n}>
              <motion.div
                animate={
                  count === n
                    ? { scale: 1.4, opacity: 1 }
                    : count < n
                    ? { scale: 0.8, opacity: 0.2 }
                    : { scale: 1, opacity: 0.6 }
                }
                transition={{ duration: 0.35 }}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: STEP_THEME[n].color,
                  boxShadow: count === n ? `0 0 12px 3px ${STEP_THEME[n].color}` : 'none',
                }}
              />
              {/* Connector line between dots */}
              {i < 2 && (
                <motion.div
                  animate={{ opacity: count < n ? 0.15 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="w-8 h-px bg-slate-500"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-[11px] font-mono tracking-[0.35em] text-slate-500 uppercase">
          SYNCHRONIZING INAUGURAL CEREMONY
        </p>
      </motion.div>
    </div>
  );
};
