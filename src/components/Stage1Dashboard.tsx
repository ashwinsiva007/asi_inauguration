import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, Music, Volume2 } from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';

interface Props {
  onInitiate: (e: React.MouseEvent | React.TouchEvent) => void;
  onExplore: () => void;
  onAudio: () => void;
}

const TICKER_ITEMS = [
  '⚡ ASI Student Chapter Inauguration · 24th Aug 2026',
  '📊 Data · Analytics · Insight · Impact',
  '🎓 Sri Shakthi Institute of Engineering and Technology',
  '🌟 Chief Guest: Dr. Dinesh Kumar · IIM Bangalore',
  '🏆 Analytics Society of India · Official Inauguration',
  '🔬 Empowering the Next Generation of Data Scientists',
];

export const Stage1Dashboard: React.FC<Props> = ({ onInitiate, onExplore, onAudio }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPressed) return;
    setIsPressed(true);
    audioEngine.playTouch();
    onInitiate(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full h-[calc(100vh-5.5rem)] overflow-hidden select-none"
    >
      {/* Ambient glow blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.36, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,35,42,0.18) 0%, rgba(212,175,55,0.10) 50%, transparent 80%)' }}
      />
      <div className="absolute top-10 left-20 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)', filter: 'blur(32px)' }} />
      <div className="absolute bottom-20 right-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,35,42,0.12) 0%, transparent 70%)', filter: 'blur(42px)' }} />

      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[580px] h-[580px] rounded-full"
          style={{ border: '1px dashed rgba(212,175,55,0.12)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{ border: '1px dashed rgba(229,35,42,0.10)' }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[270px] h-[270px] rounded-full"
          style={{ border: '1px solid rgba(212,175,55,0.14)' }} />
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <motion.div key={i} animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[420px] h-[420px] flex items-start justify-center">
            <motion.div
              style={{
                transform: `rotate(${deg}deg) translateY(-210px) rotate(-${deg}deg)`,
                backgroundColor: i % 2 === 0 ? '#E2B857' : '#E5232A'
              }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              className="w-2 h-2 rounded-full"
            />
          </motion.div>
        ))}
      </div>



      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pb-9 text-center">

        {/* Institution label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-4 flex flex-col items-center space-y-1.5"
        >
          <span className="text-xs sm:text-sm font-mono tracking-[0.3em] text-slate-200 font-bold uppercase">
            {EVENT_CONFIG.institution}
          </span>
          <div className="flex items-center space-x-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold-500/40 to-gold-500/60" />
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.24em] text-[#FF4D4D] uppercase drop-shadow-[0_0_8px_rgba(255,77,77,0.3)]">
              {EVENT_CONFIG.organization} · {EVENT_CONFIG.subTitle}
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-gold-500/40 to-gold-500/60" />
          </div>
        </motion.div>

        {/* Elegant static heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest leading-tight text-white drop-shadow-xl uppercase">
            A NEW CHAPTER BEGINS
          </h1>
        </motion.div>

        {/* Subtitle */}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
          className="relative group"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-2xl pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(229,35,42,0.3), rgba(212,175,55,0.3), rgba(229,35,42,0.3))', filter: 'blur(18px)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.16, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -inset-8 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(229,35,42,0.15), transparent 70%)', filter: 'blur(24px)' }}
          />
          <button
            id="initiate-inauguration-btn"
            onClick={handleClick}
            onTouchStart={handleClick}
            disabled={isPressed}
            className="relative flex items-center justify-center space-x-5 px-14 py-7 sm:px-20 sm:py-8 rounded-2xl text-white transition-all duration-300 active:scale-95 touch-target cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0D1117 0%, #111827 50%, #0D1117 100%)',
              border: '2px solid #E2B857',
              boxShadow: '0 0 40px rgba(212,175,55,0.25), inset 0 1px 0 rgba(226,184,87,0.10)',
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(229,35,42,0.15)', border: '1px solid rgba(229,35,42,0.50)' }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <Play className="w-6 h-6 fill-asi-red text-asi-red translate-x-0.5" />
              </motion.div>
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-gold-300 uppercase">
              {isPressed ? 'INITIATING...' : 'INITIATE INAUGURATION'}
            </span>
          </button>
        </motion.div>

        {/* Secondary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-6 z-30 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            id="explore-asi-btn"
            onClick={onExplore}
            onTouchStart={onExplore}
            className="px-7 py-3 rounded-xl border border-slate-800/80 bg-slate-950/70 hover:bg-slate-900/90 hover:border-gold-500/40 text-slate-300 hover:text-gold-300 transition-all duration-300 font-mono text-xs tracking-[0.2em] uppercase cursor-pointer shadow-lg active:scale-95"
          >
            [ EXPLORE ASI ]
          </button>

          <button
            id="audio-center-btn"
            onClick={() => {
              audioEngine.playTouch();
              onAudio();
            }}
            onTouchStart={() => {
              audioEngine.playTouch();
              onAudio();
            }}
            className="px-7 py-3 rounded-xl border border-gold-500/40 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 transition-all duration-300 font-mono text-xs font-bold tracking-[0.2em] uppercase cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center space-x-2 active:scale-95"
          >
            <Music className="w-4 h-4 text-gold-400 animate-bounce" />
            <span>[ AUDIO SUITE ]</span>
          </button>
        </motion.div>
      </div>

      {/* Floating AUDIO Button on Left Corner */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="absolute bottom-14 left-6 sm:left-8 z-30"
      >
        <button
          id="audio-corner-btn"
          onClick={() => {
            audioEngine.playTouch();
            onAudio();
          }}
          onTouchStart={() => {
            audioEngine.playTouch();
            onAudio();
          }}
          title="Ceremonial Audio: Tamil Thai Vazhthu & National Anthem"
          className="group relative flex items-center space-x-3.5 px-5 py-3.5 rounded-2xl border border-gold-500/50 bg-slate-950/85 hover:bg-slate-900 text-gold-300 hover:text-gold-100 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] cursor-pointer backdrop-blur-xl active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Volume2 className="w-5 h-5 text-gold-400 group-hover:animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-black font-mono tracking-[0.2em] uppercase text-gold-300 group-hover:text-gold-200">
                AUDIO
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[11px] text-slate-300 font-sans tracking-wide">
              Tamil Thai Vazhthu &amp; Anthem
            </span>
          </div>
        </button>
      </motion.div>

      {/* Live ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-9 flex items-center overflow-hidden pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(229,35,42,0.07) 0%, rgba(212,175,55,0.05) 50%, rgba(229,35,42,0.07) 100%)',
          borderTop: '1px solid rgba(226,184,87,0.14)',
        }}
      >
        <div className="flex items-center px-3 mr-3 h-full shrink-0"
          style={{ background: 'rgba(229,35,42,0.18)', borderRight: '1px solid rgba(229,35,42,0.28)' }}>
          <span className="text-[10px] font-black tracking-widest text-asi-red uppercase flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>LIVE</span>
          </span>
        </div>
        <div className="overflow-hidden flex-1 relative">
          <motion.div
            animate={{ x: [0, -1400] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap text-[11px] font-mono tracking-widest text-gold-400/75"
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].join('    ·    ')}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
