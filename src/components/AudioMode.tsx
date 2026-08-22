import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Upload,
  Music,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileAudio,
  Trash2,
  Radio,
  Sparkles
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/eventConfig';
import { audioEngine } from '../utils/audioEngine';
import {
  saveAudioTrack,
  getAudioTrack,
  deleteAudioTrack,
  type StoredTrackInfo
} from '../utils/audioStorage';

interface AudioModeProps {
  onExit: () => void;
}

interface AudioTrackState {
  id: 'tamil_thai_vazhthu' | 'national_anthem';
  title: string;
  nativeTitle: string;
  category: string;
  badgeColor: string;
  accentColor: string;
  author: string;
  defaultPath: string;
  fileInfo: StoredTrackInfo | null;
  objectUrl: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  volume: number;
}

const INITIAL_TRACKS: Record<'tamil_thai_vazhthu' | 'national_anthem', Omit<AudioTrackState, 'fileInfo' | 'objectUrl' | 'isPlaying' | 'currentTime' | 'duration' | 'isMuted' | 'volume'>> = {
  tamil_thai_vazhthu: {
    id: 'tamil_thai_vazhthu',
    title: 'Tamil Thai Vazhthu',
    nativeTitle: 'தமிழ்த்தாய் வாழ்த்து',
    category: 'State Invocation Anthem',
    badgeColor: 'border-gold-500/40 text-gold-400 bg-gold-500/10',
    accentColor: '#E2B857',
    author: 'Manonmaniam Sundaram Pillai',
    defaultPath: '/assets/audio/tamil-thai-vazhthu.mp3',
  },
  national_anthem: {
    id: 'national_anthem',
    title: 'National Anthem of India',
    nativeTitle: 'Jana Gana Mana',
    category: 'National Anthem',
    badgeColor: 'border-asi-red/40 text-red-400 bg-asi-red/10',
    accentColor: '#E5232A',
    author: 'Rabindranath Tagore',
    defaultPath: '/assets/audio/national-anthem.mp3',
  },
};

export const AudioMode: React.FC<AudioModeProps> = ({ onExit }) => {
  const [tracks, setTracks] = useState<Record<string, AudioTrackState>>({
    tamil_thai_vazhthu: {
      ...INITIAL_TRACKS.tamil_thai_vazhthu,
      fileInfo: null,
      objectUrl: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isMuted: false,
      volume: 1,
    },
    national_anthem: {
      ...INITIAL_TRACKS.national_anthem,
      fileInfo: null,
      objectUrl: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isMuted: false,
      volume: 1,
    },
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({
    tamil_thai_vazhthu: null,
    national_anthem: null,
  });
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({
    tamil_thai_vazhthu: null,
    national_anthem: null,
  });

  // Load stored tracks from IndexedDB on mount
  useEffect(() => {
    async function loadSavedAudio() {
      for (const key of ['tamil_thai_vazhthu', 'national_anthem'] as const) {
        try {
          const stored = await getAudioTrack(key);
          if (stored && stored.blob) {
            const url = URL.createObjectURL(stored.blob);
            setTracks((prev) => ({
              ...prev,
              [key]: {
                ...prev[key],
                fileInfo: stored,
                objectUrl: url,
              },
            }));
          }
        } catch (e) {
          console.warn(`Could not load stored audio for ${key}`, e);
        }
      }
    }
    loadSavedAudio();

    return () => {
      // Clean up object URLs on unmount
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
        }
      });
    };
  }, []);

  // Keyboard shortcut listener (ESC or Backspace)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Show notification
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Stop the other track when one starts playing
  const handlePlay = (id: 'tamil_thai_vazhthu' | 'national_anthem') => {
    const otherId = id === 'tamil_thai_vazhthu' ? 'national_anthem' : 'tamil_thai_vazhthu';
    const otherAudio = audioRefs.current[otherId];
    if (otherAudio) {
      otherAudio.pause();
    }

    const currentAudio = audioRefs.current[id];
    const track = tracks[id];

    if (!track.objectUrl && !track.defaultPath) {
      audioEngine.playReveal();
      showToast(`Please upload your ${track.title} MP3 file below to play.`, 'info');
      return;
    }

    if (currentAudio) {
      currentAudio.play().catch(() => {
        audioEngine.playConfirmation();
        showToast(`Ready to play: Upload your ${track.title} MP3 file below.`, 'info');
      });
    }
  };

  const handlePause = (id: 'tamil_thai_vazhthu' | 'national_anthem') => {
    const currentAudio = audioRefs.current[id];
    if (currentAudio) {
      currentAudio.pause();
    }
  };

  const handleTogglePlay = (id: 'tamil_thai_vazhthu' | 'national_anthem') => {
    audioEngine.playTouch();
    const track = tracks[id];
    if (track.isPlaying) {
      handlePause(id);
    } else {
      handlePlay(id);
    }
  };

  const handleSeek = (id: string, newTime: number) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = newTime;
      setTracks((prev) => ({
        ...prev,
        [id]: { ...prev[id], currentTime: newTime },
      }));
    }
  };

  const handleRestart = (id: string) => {
    audioEngine.playTouch();
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const handleFileUpload = async (id: 'tamil_thai_vazhthu' | 'national_anthem', file: File) => {
    if (!file) return;

    try {
      // Save permanently to IndexedDB
      const storedInfo = await saveAudioTrack(id, file);
      const url = URL.createObjectURL(file);

      // Stop currently playing
      const currentAudio = audioRefs.current[id];
      if (currentAudio) {
        currentAudio.pause();
      }

      setTracks((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fileInfo: storedInfo,
          objectUrl: url,
          currentTime: 0,
          isPlaying: false,
        },
      }));

      audioEngine.playConfirmation();
      showToast(`Saved "${file.name}" permanently for ${tracks[id].title}!`, 'success');
    } catch (err) {
      console.error('File upload error:', err);
      showToast(`Failed to upload audio file.`, 'error');
    }
  };

  const handleRemoveTrack = async (id: 'tamil_thai_vazhthu' | 'national_anthem') => {
    audioEngine.playTouch();
    try {
      await deleteAudioTrack(id);
      const currentAudio = audioRefs.current[id];
      if (currentAudio) {
        currentAudio.pause();
      }
      setTracks((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fileInfo: null,
          objectUrl: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0,
        },
      }));
      showToast(`Removed custom audio for ${tracks[id].title}.`, 'info');
    } catch (err) {
      console.error('Failed to remove audio:', err);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative z-30 w-full h-[calc(100vh-5.5rem)] overflow-y-auto px-4 sm:px-8 py-4 select-none flex flex-col justify-between"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-24 left-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center space-x-3 text-sm font-medium ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-900/30'
                : notification.type === 'error'
                ? 'bg-red-950/90 border-red-500/50 text-red-200 shadow-red-900/30'
                : 'bg-slate-900/90 border-gold-500/50 text-gold-200 shadow-gold-900/30'
            }`}
          >
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            {notification.type === 'info' && <Sparkles className="w-5 h-5 text-gold-400" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <button
          onClick={() => {
            audioEngine.playTouch();
            onExit();
          }}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-gold-500/40 bg-slate-900/90 hover:bg-gold-500/10 text-gold-300 hover:text-gold-200 transition-all text-xs sm:text-sm font-mono tracking-wider uppercase cursor-pointer group shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-gold-400" />
          <span>Back to Inauguration</span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-gold-500/30">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
              Ceremonial Audio Player
            </span>
          </div>
        </div>
      </div>

      {/* Header Title Section */}
      <div className="text-center my-2">
        <span className="text-xs font-mono tracking-[0.25em] text-gold-400 uppercase font-semibold">
          {EVENT_CONFIG.institution}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white mt-0.5 uppercase drop-shadow-md">
          Ceremonial Audio Suite
        </h1>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mt-0.5 font-sans">
          Official Anthems &amp; Invocations for the Analytics Society of India Student Chapter Inauguration
        </p>
      </div>

      {/* Main Dual Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full mx-auto my-auto">
        {(['tamil_thai_vazhthu', 'national_anthem'] as const).map((trackId) => {
          const track = tracks[trackId];
          const audioSrc = track.objectUrl || track.defaultPath;
          const isUploaded = !!track.fileInfo;

          return (
            <motion.div
              key={trackId}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl border transition-all duration-300 overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)',
                borderColor: track.isPlaying ? track.accentColor : 'rgba(212, 175, 55, 0.25)',
                boxShadow: track.isPlaying
                  ? `0 0 35px ${track.accentColor}33, inset 0 1px 0 rgba(255,255,255,0.1)`
                  : '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Hidden HTML5 Audio Element */}
              <audio
                ref={(el) => {
                  audioRefs.current[trackId] = el;
                }}
                src={audioSrc}
                preload="metadata"
                onPlay={() =>
                  setTracks((prev) => ({
                    ...prev,
                    [trackId]: { ...prev[trackId], isPlaying: true },
                  }))
                }
                onPause={() =>
                  setTracks((prev) => ({
                    ...prev,
                    [trackId]: { ...prev[trackId], isPlaying: false },
                  }))
                }
                onEnded={() =>
                  setTracks((prev) => ({
                    ...prev,
                    [trackId]: { ...prev[trackId], isPlaying: false, currentTime: 0 },
                  }))
                }
                onTimeUpdate={(e) => {
                  const target = e.currentTarget;
                  setTracks((prev) => ({
                    ...prev,
                    [trackId]: {
                      ...prev[trackId],
                      currentTime: target.currentTime,
                      duration: target.duration || prev[trackId].duration,
                    },
                  }));
                }}
                onLoadedMetadata={(e) => {
                  const target = e.currentTarget;
                  setTracks((prev) => ({
                    ...prev,
                    [trackId]: {
                      ...prev[trackId],
                      duration: target.duration || 0,
                    },
                  }));
                }}
              />

              {/* Hidden File Input */}
              <input
                type="file"
                ref={(el) => {
                  fileInputRefs.current[trackId] = el;
                }}
                accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(trackId, file);
                  }
                  e.target.value = '';
                }}
              />

              {/* Ambient Glow */}
              <div
                className="absolute -right-20 -top-20 w-48 h-48 rounded-full pointer-events-none opacity-20 blur-3xl"
                style={{ backgroundColor: track.accentColor }}
              />

              {/* Card Header & Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider border ${track.badgeColor}`}>
                    {track.category}
                  </span>

                  <div className="flex items-center space-x-2">
                    {isUploaded ? (
                      <span className="flex items-center space-x-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Custom Audio Saved</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[11px] font-mono text-gold-400/80 bg-gold-950/40 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                        <Music className="w-3 h-3" />
                        <span>Ready to Play</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Track Titles */}
                <h2 className="text-xl sm:text-2xl font-black tracking-wide text-white flex items-center space-x-2">
                  <span>{track.title}</span>
                </h2>
                <div className="text-base sm:text-lg font-semibold tracking-wider text-gold-400 mt-0.5">
                  {track.nativeTitle}
                </div>
              </div>

              {/* Audio Spectrum Waveform Visualizer (Animated) */}
              <div className="my-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-mono text-slate-400">STATUS:</span>
                    <span
                      className={`text-[11px] font-mono font-bold ${
                        track.isPlaying ? 'text-emerald-400 animate-pulse' : 'text-slate-400'
                      }`}
                    >
                      {track.isPlaying ? '● PLAYING AUDIO' : '○ PAUSED / READY'}
                    </span>
                  </div>

                  <div className="text-xs font-mono tracking-widest text-gold-400 font-bold">
                    {formatTime(track.currentTime)} / {formatTime(track.duration || 52)}
                  </div>
                </div>

                {/* Animated Spectrum Wave Bars */}
                <div className="h-12 flex items-center justify-between gap-1 px-1 overflow-hidden">
                  {Array.from({ length: 32 }).map((_, barIdx) => {
                    const heightPercent = track.isPlaying
                      ? Math.sin((barIdx + 1) * 0.7 + Date.now() * 0.005) * 35 + 50 + (barIdx % 4) * 8
                      : 18 + (barIdx % 3) * 6;

                    return (
                      <motion.div
                        key={barIdx}
                        animate={{
                          height: track.isPlaying ? [`${heightPercent}%`, `${Math.max(15, (heightPercent + 40) % 95)}%`, `${heightPercent}%`] : `${heightPercent}%`,
                        }}
                        transition={{
                          duration: 0.4 + (barIdx % 5) * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="flex-1 rounded-full transition-all duration-200"
                        style={{
                          backgroundColor: track.isPlaying
                            ? barIdx % 2 === 0
                              ? track.accentColor
                              : '#E5232A'
                            : 'rgba(255, 255, 255, 0.15)',
                          minHeight: '6px',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Timeline Scrubber Bar */}
                <div className="mt-4 flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max={track.duration || 100}
                    step="0.1"
                    value={track.currentTime}
                    onChange={(e) => handleSeek(trackId, parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                  />
                </div>
              </div>

              {/* Playback Controls & Action Buttons */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Big Play / Pause Primary Button */}
                  <button
                    onClick={() => handleTogglePlay(trackId)}
                    className="flex-1 py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 text-white font-black tracking-widest uppercase transition-all duration-300 active:scale-95 cursor-pointer shadow-xl relative overflow-hidden group"
                    style={{
                      background: track.isPlaying
                        ? 'linear-gradient(135deg, #E5232A 0%, #B91C1C 100%)'
                        : 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                      border: `2px solid ${track.isPlaying ? '#EF4444' : track.accentColor}`,
                      boxShadow: track.isPlaying
                        ? '0 0 30px rgba(229,35,42,0.5)'
                        : '0 0 20px rgba(212,175,55,0.2)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: track.isPlaying ? 'rgba(0,0,0,0.3)' : 'rgba(212,175,55,0.15)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      {track.isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-gold-400 fill-gold-400 translate-x-0.5" />
                      )}
                    </div>
                    <span className="text-sm sm:text-base tracking-[0.2em]">
                      {track.isPlaying ? 'PAUSE PLAYBACK' : `PLAY ${track.title.toUpperCase()}`}
                    </span>
                  </button>

                  {/* Restart Track */}
                  <button
                    onClick={() => handleRestart(trackId)}
                    title="Restart from beginning"
                    className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/60 text-slate-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>

                {/* Demo MP3 Upload Box */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-dashed border-slate-700 hover:border-gold-500/50 transition-all flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1.5">
                      <FileAudio className="w-3.5 h-3.5 text-gold-400" />
                      <span>DEMO AUDIO FILE UPLOAD</span>
                    </span>

                    {isUploaded && (
                      <button
                        onClick={() => handleRemoveTrack(trackId)}
                        className="text-[10px] font-mono text-red-400 hover:text-red-300 flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>

                  {isUploaded && track.fileInfo ? (
                    <div className="flex items-center justify-between text-xs bg-slate-950/70 px-3 py-2 rounded-xl border border-emerald-500/30">
                      <span className="font-mono text-emerald-300 truncate max-w-[200px]" title={track.fileInfo.name}>
                        🎵 {track.fileInfo.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {(track.fileInfo.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                  ) : null}

                  <button
                    onClick={() => {
                      audioEngine.playTouch();
                      fileInputRefs.current[trackId]?.click();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-gold-500/40 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 hover:text-gold-200 transition-all text-xs font-mono font-bold tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <Upload className="w-4 h-4 text-gold-400" />
                    <span>{isUploaded ? 'REPLACE MP3 AUDIO FILE' : `UPLOAD ${track.title.toUpperCase()} (MP3)`}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
