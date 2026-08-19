import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Gamepad2,
  Zap,
  CheckCircle,
  QrCode,
  Laptop,
  Users,
  Trophy,
} from 'lucide-react';
import { SmartBoardDisplay } from '../components/Quiz/SmartBoardDisplay';

interface QuizArenaPageProps {
  onExit?: () => void;
}

export const QuizArenaPage: React.FC<QuizArenaPageProps> = ({ onExit }) => {
  const [activeSection, setActiveSection] = useState<'smartboard' | 'host'>('smartboard');

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start p-3 sm:p-6 lg:p-8 relative z-10">
      {/* Navigation Sub-Tabs: Smart Board Display vs Host Quiz & Back Button */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between mb-4 border-b border-gold-500/20 pb-3 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveSection('smartboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'smartboard'
                ? 'bg-gradient-to-r from-asi-red to-amber-600 text-white shadow-lg shadow-asi-red/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>SMART BOARD DISPLAY</span>
          </button>

          <button
            onClick={() => setActiveSection('host')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSection === 'host'
                ? 'bg-gradient-to-r from-asi-red to-amber-600 text-white shadow-lg shadow-asi-red/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>HOST QUIZ</span>
          </button>
        </div>

        {/* Back to Dashboard Action */}
        <div className="flex items-center gap-3">
          {onExit && (
            <button
              onClick={onExit}
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950/70 hover:bg-slate-900 text-slate-400 hover:text-gold-300 text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
            >
              &larr; Exit to Dashboard
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Hub Active</span>
          </div>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {activeSection === 'smartboard' ? (
          <div className="w-full">
            <SmartBoardDisplay />
          </div>
        ) : (
          /* Host Quiz View */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl space-y-6 text-left py-4"
          >
            {/* Host Hero Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/30 via-slate-900/60 to-slate-900/90 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Quiz Host Control Center
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
                ASI QUIZ ARENA <span className="text-gradient-gold">HOST PORTAL</span>
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                Create and manage interactive live quiz rounds for chapter events. When you generate the live session QR code and Game PIN, copy the QR image and paste it directly into the <strong>Smart Board Display</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 mb-2">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">1. Generate Session</h4>
                  <p className="text-xs text-gray-400 font-light">Host launches the quiz arena session with Game PIN.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">2. Copy Dynamic QR</h4>
                  <p className="text-xs text-gray-400 font-light">Right-click or screenshot the generated quiz QR code.</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">3. Press Ctrl + V</h4>
                  <p className="text-xs text-gray-400 font-light">Smart Board immediately broadcasts QR for 150+ students.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveSection('smartboard')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-600/40 transition-all cursor-pointer"
                >
                  <Monitor className="w-4 h-4" /> Open Smart Board Display
                </button>
              </div>
            </div>

            {/* Quick Live Event Checklist */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Event Day Quick Guide
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Setup:</strong> No login, database, or cloud upload needed to display QR.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant Replacement:</strong> When a new round starts, simply press <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-white font-mono text-[10px]">Ctrl+V</kbd> to replace.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Full 16:9 Screen:</strong> Click "Enter Fullscreen" to hide all browser chrome on the projector.</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>High Scannability:</strong> High contrast white padding ensures rapid phone scanning across hall.</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
