import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { InaugurationStage } from './types/inauguration';
import { DataCanvasBackground } from './components/DataCanvasBackground';
import { HeaderBar } from './components/HeaderBar';
import { Stage1Dashboard } from './components/Stage1Dashboard';
import { Stage2Confirmation } from './components/Stage2Confirmation';
import { Stage3Countdown } from './components/Stage3Countdown';
import { Stage4Reveal } from './components/Stage4Reveal';
import { OrganizerControls } from './components/OrganizerControls';

export function App() {
  const [stage, setStage] = useState<InaugurationStage>('READY');
  const [touchRipple, setTouchRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  // Trigger interactive touch ripple on canvas
  const triggerTouchRipple = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if ('clientX' in e) {
      x = e.clientX;
      y = e.clientY;
    }

    setTouchRipple({ x, y, id: Date.now() });
  }, []);

  const handleInitiate = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    triggerTouchRipple(e);
    setStage('CONFIRMATION');
  }, [triggerTouchRipple]);

  const handleConfirm = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    triggerTouchRipple(e);
    setStage('COUNTDOWN');
  }, [triggerTouchRipple]);

  const handleCountdownComplete = useCallback(() => {
    setStage('INAUGURATED');
  }, []);

  const handleReset = useCallback(() => {
    setStage('READY');
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Dynamic Data Canvas Background Engine */}
      <DataCanvasBackground stage={stage} touchRipple={touchRipple} />

      {/* Top Header Navigation Bar */}
      <HeaderBar onReset={handleReset} />

      {/* State Machine Main Container */}
      <section className="relative z-10 flex-1 w-full h-full flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {stage === 'READY' && (
            <Stage1Dashboard key="stage1" onInitiate={handleInitiate} />
          )}

          {stage === 'CONFIRMATION' && (
            <Stage2Confirmation key="stage2" onConfirm={handleConfirm} />
          )}

          {stage === 'COUNTDOWN' && (
            <Stage3Countdown key="stage3" onComplete={handleCountdownComplete} />
          )}

          {stage === 'INAUGURATED' && (
            <Stage4Reveal key="stage4" />
          )}
        </AnimatePresence>
      </section>

      {/* Organizer Reset Mechanism (Ctrl + Shift + R or secret tap) */}
      <OrganizerControls onReset={handleReset} />
    </main>
  );
}

export default App;
