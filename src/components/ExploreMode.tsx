import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, X, Cpu, Award, BookOpen, Users, Compass, GraduationCap, Activity, Database, Layers } from 'lucide-react';
import { EXPLORE_CONFIG } from '../config/exploreConfig';
import { audioEngine } from '../utils/audioEngine';
import { EVENT_CONFIG } from '../config/eventConfig';
interface ExploreModeProps {
  onExit: () => void;
}

export const ExploreMode: React.FC<ExploreModeProps> = ({ onExit }) => {
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Keyboard shortcut listener (ESC or Ctrl + Shift + E to exit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Fallback Slideshow scene interval: switch scenes every 8 seconds
  useEffect(() => {
    if (videoError || !isVideoLoaded) {
      const interval = setInterval(() => {
        setCurrentScene((prev) => (prev + 1) % 9);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [videoError, isVideoLoaded]);

  // Sync mute state with audio element or video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    audioEngine.playTouch();
  };

  // RenderingFallback presentation scenes with premium animated visuals
  const renderFallbackScene = () => {
    const { scenes } = EXPLORE_CONFIG;

    switch (currentScene) {
      case 0: // Opening
        return (
          <motion.div
            key="scene-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl"
          >
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* Outer spinning rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-gold-500/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2.5 rounded-full border border-dotted border-asi-red/40"
              />
              {/* Core glowing badge */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 20px rgba(212,175,55,0.15)', '0 0 45px rgba(212,175,55,0.4)', '0 0 20px rgba(212,175,55,0.15)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-full bg-slate-900 border-2 border-gold-400 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.25)]"
              >
                <Award className="w-12 h-12 text-gold-400" />
              </motion.div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-white leading-tight drop-shadow-lg uppercase">
              {scenes.scene1Opening.title}
            </h1>
            <p className="text-sm sm:text-lg font-mono tracking-[0.3em] text-[#FF3B30] font-bold">
              {scenes.scene1Opening.subtitle}
            </p>
          </motion.div>
        );

      case 1: // What is ASI?
        return (
          <motion.div
            key="scene-1"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center space-y-6"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">INTRODUCTION</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              {scenes.scene2WhatIsASI.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-asi-red" />
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans px-4">
              {scenes.scene2WhatIsASI.description}
            </p>
          </motion.div>
        );

      case 2: // Vision (Connective stepper halo flow)
        return (
          <motion.div
            key="scene-2"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-4xl text-center space-y-8"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">MISSION & STRATEGY</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              {scenes.scene3Vision.title}
            </h2>
            
            {/* Flow Steps animation */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 py-6 w-full relative">
              {scenes.scene3Vision.steps.map((step, idx) => (
                <div key={step} className="flex items-center z-10">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                    transition={{ 
                      scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 },
                      opacity: { delay: idx * 0.2, duration: 0.5 }
                    }}
                    className="px-8 py-4 rounded-xl border text-sm font-mono font-bold tracking-widest bg-slate-950/90 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex flex-col items-center space-y-1.5"
                    style={{
                      borderColor: idx === scenes.scene3Vision.steps.length - 1 ? '#E5232A' : 'rgba(226,184,87,0.3)',
                      color: idx === scenes.scene3Vision.steps.length - 1 ? '#E5232A' : '#E2B857',
                      boxShadow: idx === scenes.scene3Vision.steps.length - 1 ? '0 0 20px rgba(229,35,42,0.25)' : 'none',
                    }}
                  >
                    <span className="text-[10px] text-slate-500 font-normal">STEP 0{idx + 1}</span>
                    <span>{step}</span>
                  </motion.div>
                  {idx < scenes.scene3Vision.steps.length - 1 && (
                    <span className="hidden md:inline-block mx-4 text-gold-500/40 font-bold text-lg animate-pulse">➔</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-mono tracking-wider max-w-2xl px-4">
              {scenes.scene3Vision.description}
            </p>
          </motion.div>
        );

      case 3: // IIM Bangalore Affiliation
        return (
          <motion.div
            key="scene-3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center space-y-6"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">ACADEMIC FOUNDATION</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase leading-tight">
              {scenes.scene4IIMB.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-asi-red" />
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans px-4">
              {scenes.scene4IIMB.description}
            </p>
          </motion.div>
        );

      case 4: // DCALL Lab
        return (
          <motion.div
            key="scene-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl text-center space-y-6"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">MENTORING LAB</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              {scenes.scene5DCALL.title}
            </h2>
            <p className="text-sm font-mono text-asi-red tracking-[0.25em] font-semibold uppercase">
              {scenes.scene5DCALL.subtitle}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-asi-red" />
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-sans px-4">
              {scenes.scene5DCALL.description}
            </p>
          </motion.div>
        );

      case 5: // ASI Student Chapter (Four pillars with interactive cards & custom icons)
        return (
          <motion.div
            key="scene-5"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -35 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-4xl text-center space-y-6 w-full"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">LOCAL INITIATIVE</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {scenes.scene6StudentChapter.title}
            </h2>
            <p className="text-sm sm:text-base font-mono tracking-[0.2em] text-[#FF3B30] font-semibold uppercase">
              {scenes.scene6StudentChapter.institution}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl pt-6">
              {scenes.scene6StudentChapter.pillars.map((pillar, idx) => {
                const icons = [BookOpen, Users, Compass, Cpu];
                const IconComponent = icons[idx] || Cpu;
                return (
                  <motion.div
                    key={pillar}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15, duration: 0.4 }}
                    className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur flex flex-col items-center space-y-3 shadow-lg hover:border-gold-500/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="text-center">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">PILLAR 0{idx + 1}</span>
                      <span className="block text-xs font-black text-white tracking-wider uppercase">{pillar}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      case 6: // What Students Can Expect (Grid cards with custom expectation icons)
        return (
          <motion.div
            key="scene-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-5xl text-center space-y-6 w-full"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">BENEFITS & EVENTS</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase mb-2">
              {scenes.scene7Expectations.title}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full pt-4">
              {scenes.scene7Expectations.activities.map((activity, idx) => {
                const icons = [GraduationCap, Cpu, Users, Layers, Database];
                const IconComponent = icons[idx] || Database;
                return (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12, duration: 0.5 }}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-gold-500/30 transition-colors duration-300 flex flex-col items-start text-left space-y-3"
                  >
                    <div className="w-8 h-8 rounded bg-slate-950 border border-slate-800 flex items-center justify-center">
                      <IconComponent className="w-4 h-4 text-asi-red" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-gold-400 uppercase tracking-wider mb-1 font-bold">{activity.title}</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{activity.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      case 7: // Journey Begins (Radar targeted visual)
        return (
          <motion.div
            key="scene-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-4xl text-center space-y-6"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-gold-400 uppercase">OFFICIAL INAUGURATION</span>
            
            {/* Concentric radar visuals */}
            <div className="relative w-28 h-28 flex items-center justify-center my-2">
              <div className="absolute w-28 h-28 rounded-full border border-asi-red/20 animate-ping" />
              <div className="absolute w-20 h-20 rounded-full border border-gold-400/30 animate-pulse" />
              <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-gold-400 flex items-center justify-center shadow-2xl">
                <Activity className="w-6 h-6 text-gold-400" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {scenes.scene8JourneyBegins.title}
            </h2>
            
            <div className="flex items-center space-x-3 py-2 text-xs font-mono text-[#FF3B30] tracking-[0.25em] uppercase font-bold">
              {scenes.scene8JourneyBegins.steps.join('  ·  ')}
            </div>
            
            <div className="w-20 h-px bg-slate-800 my-2" />
            
            <div className="space-y-2">
              <p className="text-sm font-mono tracking-widest text-slate-400 uppercase">
                {scenes.scene8JourneyBegins.tagline}
              </p>
              <h3 className="text-2xl sm:text-4xl font-mono text-gold-400 font-bold tracking-widest">
                {scenes.scene8JourneyBegins.date}
              </h3>
              <p className="text-[11px] font-mono tracking-[0.15em] text-slate-500 uppercase">
                VENUE: {scenes.scene8JourneyBegins.institution}
              </p>
            </div>
          </motion.div>
        );

      case 8: // Loop Transition
        return (
          <motion.div
            key="scene-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6 max-w-4xl"
          >
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-asi-red/40 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-asi-red/40 flex items-center justify-center shadow-lg">
                <Cpu className="w-8 h-8 text-asi-red" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-wider text-white leading-tight uppercase">
              {scenes.scene9Loop.title}
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-gold-400 uppercase font-bold">
              {scenes.scene9Loop.subtitle}
            </p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-50 bg-[#060810] flex flex-col justify-start items-stretch overflow-hidden cursor-none select-none"
    >
      {/* ── STATIC HEADER BAR (Contains logos & pre-event label & controls) ── */}
      <header className="relative z-40 w-full h-22 px-8 flex items-center justify-between border-b border-gold-500/20 bg-slate-950/80 backdrop-blur-xl shadow-lg shrink-0">
        <div className="flex items-center space-x-5">
          {/* ASI Official Logo Badge */}
          <div className="bg-white/95 px-4 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center justify-center">
            <img
              src={EVENT_CONFIG.logos.asiLogoPath}
              alt="Analytics Society of India Official Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </div>
          <div className="h-9 w-px bg-gold-500/30" />
          {/* Real Official SIET College Emblem */}
          <div className="flex items-center space-x-3">
            <img
              src={EVENT_CONFIG.logos.collegeLogoPath}
              alt="Sri Shakthi Institute of Engineering and Technology Emblem"
              className="h-11 w-auto object-contain drop-shadow-[0_0_10px_rgba(226,184,87,0.5)]"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold tracking-wider text-slate-100 uppercase">
                {EVENT_CONFIG.institution}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Mode Indicator Badge */}
        <div className="hidden lg:flex items-center space-x-2.5 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-800/80">
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase font-bold">
            EXPLORE ASI
          </span>
        </div>

        {/* Right side: Mute & Exit Button (always accessible for organizers) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/60 hover:border-gold-500/50 hover:bg-slate-900 transition text-slate-300 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5 text-gold-400" />}
          </button>
          <button
            onClick={onExit}
            title="Exit Presentation (Esc)"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700/60 hover:border-asi-red/50 hover:bg-slate-900 transition text-slate-300 hover:text-asi-red cursor-pointer font-mono text-xs tracking-wider"
          >
            <X className="w-4 h-4" />
            <span>EXIT</span>
          </button>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER (Video / Fallback Slideshow occupies the rest of the height) ── */}
      <div className="flex-1 w-full relative flex flex-col justify-center items-center overflow-hidden">
        {/* ── VIDEO PLAYER MODE ── */}
        {!videoError && (
          <video
            ref={videoRef}
            src={EXPLORE_CONFIG.video.path}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
            style={{ display: isVideoLoaded ? 'block' : 'none' }}
          />
        )}

        {/* ── FALLBACK PRESENTATION SLIDESHOW MODE ── */}
        {(videoError || !isVideoLoaded) && (
          <div className="absolute inset-0 w-full h-full z-20 flex flex-col justify-center items-center px-8 bg-[#060810]">
            {/* Subtle Background Graphics */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
              <div className="absolute w-[600px] h-[600px] rounded-full border border-gold-500/20 top-1/4 left-1/4 animate-pulse" />
              <div className="absolute w-[400px] h-[400px] rounded-full border border-asi-red/20 bottom-1/4 right-1/4" />
            </div>

            <AnimatePresence mode="wait">
              {renderFallbackScene()}
            </AnimatePresence>

            {/* Interactive Progress Bar */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                key={currentScene}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="h-full bg-gold-400 shadow-[0_0_8px_#D4AF37]"
              />
            </div>

            {/* Slide Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              SCENE {currentScene + 1} / 9 · FALLBACK MODE ACTIVE
            </div>

            {/* Background Ambient Audio for Fallback Mode */}
            {EXPLORE_CONFIG.video.fallbackBgSoundtrack && (
              <audio
                ref={audioRef}
                src={EXPLORE_CONFIG.video.fallbackBgSoundtrack}
                loop
                autoPlay
                muted={isMuted}
              />
            )}
          </div>
        )}

        {/* ── VIDEO LOADING PLACEHOLDER ── */}
        {!isVideoLoaded && !videoError && (
          <div className="absolute inset-0 w-full h-full bg-[#060810] z-30 flex flex-col justify-center items-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-gold-500 animate-spin" />
            <span className="text-xs font-mono text-slate-500 tracking-[0.2em] uppercase animate-pulse">
              LOADING VIDEO PRESENTATION...
            </span>
          </div>
        )}
      </div>

      {/* Discreet Key Shortcut Hint (Bottom-Right, subtle) */}
      <div className="absolute bottom-6 right-6 z-40 text-[9px] font-mono text-slate-600 tracking-wider uppercase pointer-events-none opacity-40 select-none">
        PRESS ESC TO RETURN TO HOME
      </div>
    </div>
  );
};
