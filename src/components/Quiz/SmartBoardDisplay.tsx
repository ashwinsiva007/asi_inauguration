import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Maximize2,
  Minimize2,
  Trash2,
  Copy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Hash,
  Eye,
} from 'lucide-react';
import { EVENT_CONFIG } from '../../config/eventConfig';

export const SmartBoardDisplay: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [gamePin, setGamePin] = useState<string>('531302');
  const [sessionTitle] = useState<string>('ASI QUIZ ARENA');
  const [subtitle] = useState<string>('DEMYSTIFYING ARTIFICIAL INTELLIGENCE');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(true);
  const [isPresentationOnly, setIsPresentationOnly] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show a temporary toast message
  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage({ text, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  }, []);

  // Process and load an image file
  const processImageFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image (PNG, JPG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setImageSrc(result);
        showToast('✓ IMAGE UPDATED', 'success');
      }
    };
    reader.onerror = () => {
      showToast('Failed to read image file', 'error');
    };
    reader.readAsDataURL(file);
  }, [showToast]);

  // Global Ctrl + V paste listener
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      // Don't intercept if user is typing into text inputs
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && target.id !== 'display-paste-surface') {
        return;
      }

      if (!e.clipboardData) return;

      const items = e.clipboardData.items;
      let foundImage = false;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            processImageFile(file);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        const text = e.clipboardData.getData('text');
        if (text && text.trim().length > 0) {
          // Subtle hint if user pasted text instead of image
          showToast('Paste an image or QR code.', 'info');
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, [processImageFile, showToast]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
    };
  }, []);

  // Toggle Fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        showToast(`Fullscreen error: ${err.message}`, 'error');
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processImageFile(file);
    }
  };

  // Upload button click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFile(e.target.files[0]);
    }
  };

  // Generate Sample Demo QR for instant testing
  const handleLoadSampleQR = () => {
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
      <rect width="300" height="300" fill="#FFFFFF"/>
      <rect x="25" y="25" width="70" height="70" fill="#000000" rx="8"/>
      <rect x="37" y="37" width="46" height="46" fill="#FFFFFF" rx="4"/>
      <rect x="47" y="47" width="26" height="26" fill="#000000" rx="2"/>
      
      <rect x="205" y="25" width="70" height="70" fill="#000000" rx="8"/>
      <rect x="217" y="37" width="46" height="46" fill="#FFFFFF" rx="4"/>
      <rect x="227" y="47" width="26" height="26" fill="#000000" rx="2"/>
      
      <rect x="25" y="205" width="70" height="70" fill="#000000" rx="8"/>
      <rect x="37" y="217" width="46" height="46" fill="#FFFFFF" rx="4"/>
      <rect x="47" y="227" width="26" height="26" fill="#000000" rx="2"/>
      
      <rect x="115" y="30" width="20" height="20" fill="#000000"/>
      <rect x="145" y="30" width="40" height="20" fill="#000000"/>
      <rect x="115" y="60" width="30" height="30" fill="#000000"/>
      <rect x="160" y="70" width="25" height="40" fill="#000000"/>
      
      <rect x="30" y="115" width="30" height="20" fill="#000000"/>
      <rect x="70" y="115" width="20" height="30" fill="#000000"/>
      <rect x="40" y="145" width="50" height="40" fill="#000000"/>
      
      <rect x="115" y="115" width="70" height="70" fill="#DC2626" rx="6"/>
      <circle cx="150" cy="150" r="22" fill="#FFFFFF"/>
      <text x="150" y="156" font-family="Arial, sans-serif" font-size="16" font-weight="900" fill="#DC2626" text-anchor="middle">ASI</text>
      
      <rect x="205" y="115" width="30" height="50" fill="#000000"/>
      <rect x="245" y="135" width="30" height="30" fill="#000000"/>
      <rect x="215" y="180" width="60" height="20" fill="#000000"/>
      
      <rect x="115" y="205" width="30" height="30" fill="#000000"/>
      <rect x="155" y="205" width="30" height="50" fill="#000000"/>
      <rect x="115" y="245" width="30" height="30" fill="#000000"/>
      <rect x="205" y="225" width="40" height="50" fill="#000000"/>
      <rect x="255" y="245" width="20" height="30" fill="#000000"/>
    </svg>`;
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgData)}`;
    setImageSrc(dataUrl);
    showToast('✓ Sample ASI Quiz QR Loaded', 'success');
  };

  // Reset/Clear
  const handleClear = () => {
    setImageSrc(null);
    showToast('Display cleared', 'info');
  };

  // Mouse activity tracker for fullscreen control hiding
  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
    if (isFullscreen || isPresentationOnly) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 3000);
    }
  };

  const isLivePresentation = isFullscreen || isPresentationOnly;

  return (
    <div
      onMouseMove={handleMouseMove}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full flex flex-col items-center justify-between transition-all duration-300 ${
        isLivePresentation
          ? 'fixed inset-0 z-50 bg-[#070B14] p-4 sm:p-8 overflow-hidden'
          : 'min-h-[calc(100vh-140px)] p-4 sm:p-6 max-w-6xl mx-auto'
      }`}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md border ${
              toastMessage.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : toastMessage.type === 'error'
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
                : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : toastMessage.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-indigo-400" />
            )}
            <span className="text-sm font-semibold tracking-wide">{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Drag & Drop Visual Overlay */}
      <AnimatePresence>
        {isDraggingOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-red-950/70 border-4 border-dashed border-red-500 rounded-3xl flex flex-col items-center justify-center backdrop-blur-md p-6 text-center"
          >
            <Upload className="w-16 h-16 text-red-400 animate-bounce mb-3" />
            <h3 className="text-2xl font-bold text-white tracking-wide">DROP IMAGE TO DISPLAY</h3>
            <p className="text-sm text-red-200 mt-1">Release to immediately present QR on Smart Board</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header / Branding (Always visible in clean format) */}
      <div className="w-full text-center space-y-1.5 pt-2 pb-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {EVENT_CONFIG.organization} &bull; {EVENT_CONFIG.subTitle}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md">
          {sessionTitle}
        </h1>
        <div className="flex items-center justify-center gap-2">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
          <span className="text-amber-400 font-semibold text-xs sm:text-sm tracking-widest uppercase">
            {subtitle}
          </span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-2 sm:my-4">
        {imageSrc ? (
          /* ================= DISPLAY MODE (IMAGE LOADED) ================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full flex flex-col items-center justify-center space-y-4"
          >
            {/* Action instruction above QR */}
            <div className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-xl bg-white/10 text-white font-extrabold text-lg sm:text-2xl tracking-wider shadow-md border border-white/20">
                SCAN TO JOIN
              </span>
            </div>

            {/* High-Contrast QR Display Box (Optimal for far distances & projectors) */}
            <div className="relative group p-4 sm:p-6 bg-white rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.25)] border-4 border-white/90 flex items-center justify-center max-w-[92vw] sm:max-w-md md:max-w-lg transition-transform duration-300">
              <img
                src={imageSrc}
                alt="Live Quiz QR Code"
                className="w-full h-auto max-h-[46vh] sm:max-h-[50vh] object-contain rounded-xl select-none"
                style={{ imageRendering: 'crisp-edges' }}
              />

              {/* Discreet operator overlay hover action in normal mode */}
              {!isLivePresentation && (
                <div className="absolute inset-0 bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                  <button
                    onClick={handleUploadClick}
                    className="px-3.5 py-2 rounded-xl bg-white text-gray-900 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Replace
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-3.5 py-2 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 shadow hover:bg-red-700 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" /> Clear
                  </button>
                </div>
              )}
            </div>

            {/* Game PIN Display */}
            {gamePin && gamePin.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center mt-1 space-y-0.5"
              >
                <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">
                  GAME PIN
                </span>
                <div className="px-6 py-1.5 rounded-2xl bg-gradient-to-r from-red-600/20 via-amber-500/20 to-red-600/20 border-2 border-amber-400/60 shadow-lg backdrop-blur">
                  <span className="text-3xl sm:text-5xl font-black tracking-widest text-amber-300 font-mono">
                    {gamePin.trim()}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Join Instructions */}
            <p className="text-xs sm:text-sm text-gray-300 font-medium tracking-wide flex items-center gap-2">
              <span>Open Camera</span>
              <span className="text-red-400">&rarr;</span>
              <span>Scan QR</span>
              <span className="text-red-400">&rarr;</span>
              <span className="text-amber-400 font-bold">Join Quiz</span>
            </p>
          </motion.div>
        ) : (
          /* ================= INITIAL UPLOAD / PASTE STATE ================= */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-red-600/30">
              <QrCode className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">SMART BOARD DISPLAY</h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Display the quiz QR code on the main screen for 150+ students to scan effortlessly.
              </p>
            </div>

            {/* Interactive Drop / Paste Card */}
            <div
              onClick={handleUploadClick}
              className="group cursor-pointer border-2 border-dashed border-red-500/40 hover:border-red-400 bg-red-950/20 hover:bg-red-950/30 p-8 rounded-2xl transition-all flex flex-col items-center justify-center space-y-3"
            >
              <div className="flex items-center gap-2 text-red-400 group-hover:scale-105 transition-transform">
                <Copy className="w-6 h-6" />
                <span className="font-bold text-lg">Drop an image here</span>
              </div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                OR PASTE AN IMAGE <kbd className="px-2 py-1 rounded bg-black/60 border border-white/20 text-white font-mono text-xs font-bold">CTRL + V</kbd>
              </div>
              <div className="text-xs text-gray-400 font-light">
                Supports PNG, JPG, JPEG, WEBP
              </div>
            </div>

            {/* Method Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleUploadClick}
                className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-600/40 hover:shadow-red-500/60 transition-all cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Upload Image
              </button>

              <button
                onClick={handleLoadSampleQR}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> Test Sample QR
              </button>
            </div>

            {/* Quick Game PIN Config in Empty State */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-amber-400" /> Game PIN (Optional):
              </span>
              <input
                type="text"
                value={gamePin}
                onChange={(e) => setGamePin(e.target.value)}
                placeholder="531302"
                className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/15 text-amber-300 font-mono text-sm font-bold w-36 text-center focus:outline-none focus:border-red-500"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Floating Control Bar (Auto-hides in fullscreen when idle) */}
      <AnimatePresence>
        {(!isLivePresentation || isControlsVisible) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`flex flex-wrap items-center justify-center gap-2.5 p-2.5 rounded-2xl border backdrop-blur-xl transition-all shadow-2xl ${
              isLivePresentation
                ? 'bg-slate-900/90 border-white/20 fixed bottom-6 z-50'
                : 'bg-slate-900/70 border-white/10 mt-3 w-full max-w-2xl'
            }`}
          >
            {/* Fullscreen Trigger */}
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
            </button>

            {/* Presentation Mode Toggle (No Browser bar distraction) */}
            <button
              onClick={() => setIsPresentationOnly(!isPresentationOnly)}
              className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPresentationOnly
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-gray-300 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{isPresentationOnly ? 'Standard View' : 'Presentation Mode'}</span>
            </button>

            {/* Replace / Upload button when image loaded */}
            {imageSrc && (
              <>
                <button
                  onClick={handleUploadClick}
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> Replace
                </button>

                <button
                  onClick={handleClear}
                  className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Clear
                </button>
              </>
            )}

            {/* Inline PIN Editor if in control mode */}
            {!isLivePresentation && (
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
                <span className="text-[11px] font-bold text-gray-400">PIN:</span>
                <input
                  type="text"
                  value={gamePin}
                  onChange={(e) => setGamePin(e.target.value)}
                  placeholder="PIN"
                  className="px-2 py-1 rounded bg-black/40 border border-white/15 text-amber-300 font-mono text-xs font-bold w-20 text-center focus:outline-none focus:border-red-500"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Exit Button for Fullscreen/Presentation mode when mouse moves */}
      {isLivePresentation && (
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
              }
              setIsPresentationOnly(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 border border-white/20 text-gray-300 hover:text-white text-xs font-semibold backdrop-blur flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </div>
      )}
    </div>
  );
};
